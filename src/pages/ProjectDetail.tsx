import { Link, Navigate, useParams } from 'react-router-dom'
import { Fragment } from 'react'
import SideRails from '../components/SideRails'
import { highlightName, projects } from '../data/projects'

function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((entry) => entry.slug === slug)

  if (!project) {
    return <Navigate to="/" replace />
  }

  const descriptionParagraphs = Array.isArray(project.description)
    ? project.description
    : [project.description]

  const metaItems = [
    { label: 'Timeframe', value: project.year },
    {
      label: 'Team',
      value: (
        <>
          {project.authors.map((name, index) => (
            <Fragment key={name}>
              {index > 0 ? ', ' : null}
              {name === highlightName ? <strong>{name}</strong> : name}
            </Fragment>
          ))}
        </>
      ),
    },
    { label: 'Focus', value: project.area },
    { label: 'Tools', value: project.tags.join(', ') },
    ...(project.award ? [{ label: 'Recognition', value: project.award }] : []),
  ]

  return (
    <>
      <SideRails />
      <main className="case-study">
        <Link className="case-study__back" to="/#work">
          <span className="case-study__back-arrow" aria-hidden="true">
            <svg viewBox="0 0 16 16">
              <path d="M11.8 4.2 4.2 11.8" />
              <path d="M10.2 11.8h-6v-6" />
            </svg>
          </span>
          Back to work
        </Link>

        <header className="case-study__header">
          <p className="case-study__eyebrow">
            {project.area} <span>/{project.year}</span>
          </p>
          <h1>{project.title}</h1>
          {project.summary ? <p className="case-study__summary">{project.summary}</p> : null}

          <ul className="case-study__tags" aria-label={`${project.title} technologies`}>
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </header>

        <div
          className={`case-study__visual project-card__visual--${project.tone}`}
          aria-hidden={!project.award ? true : undefined}
        >
          {project.image ? (
            <img className="project-card__image" src={project.image} alt="" />
          ) : (
            <div className="project-card__mockup">
              <span />
              <span />
              <span />
            </div>
          )}
          {project.award ? <p className="project-card__award">{project.award}</p> : null}
        </div>

        <div className="case-study__meta">
          {metaItems.map(({ label, value }) => (
            <div className="case-study__meta-item" key={label}>
              <p className="case-study__meta-label">{label}</p>
              <p className="case-study__meta-value">{value}</p>
            </div>
          ))}
        </div>

        <section className="case-study__glance" aria-labelledby="case-study-glance-title">
          <p className="case-study__glance-label" id="case-study-glance-title">
            At a glance
          </p>
          {descriptionParagraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </section>
      </main>
    </>
  )
}

export default ProjectDetail
