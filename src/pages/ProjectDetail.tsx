import { Link, Navigate, useParams } from 'react-router-dom'
import { Fragment } from 'react'
import SideRails from '../components/SideRails'
import { highlightName, projects } from '../data/projects'

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.27-.01-1-.02-1.97-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.08.78 2.18 0 1.57-.01 2.83-.01 3.22 0 .31.21.67.8.56A10.51 10.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M8 3h5v5" />
      <path d="M13 3 6 10" />
      <path d="M11 8v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4" />
    </svg>
  )
}

function LaptopPlaceholder({ side }: { side: 'left' | 'right' }) {
  return (
    <div className={`case-study__laptop case-study__laptop--${side}`} aria-hidden="true">
      <div className="case-study__laptop-screen">
        <span className="case-study__laptop-glow" />
        <span className="case-study__laptop-chip" />
        <span className="case-study__laptop-line" />
        <span className="case-study__laptop-line case-study__laptop-line--short" />
      </div>
      <div className="case-study__laptop-base" />
    </div>
  )
}

function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((entry) => entry.slug === slug)

  if (!project) {
    return <Navigate to="/" replace />
  }

  const descriptionParagraphs = Array.isArray(project.description)
    ? project.description
    : [project.description]

  const pillTags = project.focusAreas ?? project.tags

  const metaItems = [
    { label: 'Timeline', value: project.duration ?? project.year },
    {
      label: 'Team',
      value: project.team ? (
        <>
          {project.team.map(({ name, role }, index) => (
            <Fragment key={name}>
              {index > 0 ? <br /> : null}
              {name === highlightName ? <strong>{name}</strong> : name} – {role}
            </Fragment>
          ))}
        </>
      ) : (
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
    {
      label: 'Tools',
      value: project.tools ? (
        <span className="case-study__tools-grid">
          {project.tools.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </span>
      ) : (
        project.tags.join(', ')
      ),
    },
    ...(project.award ? [{ label: 'Recognition', value: project.award }] : []),
  ]

  return (
    <>
      <SideRails />
      <div className="case-study-page">
        <div className="case-study__blob" aria-hidden="true" />
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

          <div className="case-study__hero">
            <LaptopPlaceholder side="left" />

            <header className="case-study__header">
              <h1>{project.title}</h1>
              {project.summary ? <p className="case-study__summary">{project.summary}</p> : null}

              <ul className="case-study__tags" aria-label={`${project.title} focus areas`}>
                {pillTags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>

              {project.links?.length ? (
                <div className="case-study__links">
                  {project.links.map(({ label, href }) => (
                    <a
                      className={`case-study__link${
                        label === 'GitHub' ? ' case-study__link--github' : ''
                      }`}
                      href={href}
                      key={label}
                      aria-label={label}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noreferrer' : undefined}
                    >
                      {label === 'GitHub' ? <GithubIcon /> : <ExternalLinkIcon />}
                    </a>
                  ))}
                </div>
              ) : null}
            </header>

            <LaptopPlaceholder side="right" />
          </div>

          <div className="case-study__meta">
            {metaItems.map(({ label, value }) => (
              <div className="case-study__meta-item" key={label}>
                <p className="case-study__meta-label">{label}</p>
                <div className="case-study__meta-value">{value}</div>
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
      </div>
    </>
  )
}

export default ProjectDetail
