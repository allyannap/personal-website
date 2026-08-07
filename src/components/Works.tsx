import { Fragment, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { revealWordsOnScroll } from '../utils/textReveal'
import { highlightName, projects } from '../data/projects'

gsap.registerPlugin(ScrollTrigger)

const indexAreas = [
  { label: 'All projects', color: '#7a7770' },
  { label: 'AI & Engineering', color: '#35658c' },
  { label: 'Data Science', color: '#9b7bb5' },
  { label: 'Design', color: '#65a59a' },
]

const areaTone: Record<string, string> = {
  'AI & Engineering': 'blue',
  'Data Science': 'violet',
  Design: 'green',
}

const indexYears = ['2026', '2025', '2024']

function yearMatchesFilter(projectYear: string, selectedYear: string) {
  return selectedYear === '2024'
    ? Number(projectYear) <= 2024
    : projectYear === selectedYear
}

function Authors({ names }: { names: string[] }) {
  return (
    <p className="project-card__authors">
      {names.map((name, index) => (
        <Fragment key={name}>
          {index > 0 ? ', ' : null}
          {name === highlightName ? <strong>{name}</strong> : name}
        </Fragment>
      ))}
    </p>
  )
}

function Works() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const mapTitleRef = useRef<HTMLHeadingElement>(null)
  const mapCopyRef = useRef<HTMLParagraphElement>(null)
  const [selectedArea, setSelectedArea] = useState('All projects')
  const [selectedYears, setSelectedYears] = useState<string[]>([])

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const media = gsap.matchMedia()
    const cleanups: Array<() => void> = []

    media.add('(prefers-reduced-motion: no-preference)', () => {
      if (headingRef.current) cleanups.push(revealWordsOnScroll(headingRef.current, section))
      if (mapTitleRef.current) cleanups.push(revealWordsOnScroll(mapTitleRef.current, section))
      if (mapCopyRef.current) cleanups.push(revealWordsOnScroll(mapCopyRef.current, section))
    })

    return () => {
      cleanups.forEach((cleanup) => cleanup())
      media.revert()
    }
  }, [])

  const toggleYear = (year: string) => {
    setSelectedYears((current) =>
      current.includes(year)
        ? current.filter((value) => value !== year)
        : [...current, year],
    )
  }

  const filteredProjects = projects.filter(
    ({ area, year }) =>
      (selectedArea === 'All projects' || area === selectedArea) &&
      (selectedYears.length === 0 ||
        selectedYears.some((selectedYear) => yearMatchesFilter(year, selectedYear))),
  )

  return (
    <section ref={sectionRef} id="work" className="works" aria-labelledby="works-title">
      <header className="works__heading">
        <h2 ref={headingRef} id="works-title">Works</h2>
      </header>

      <div className="works__layout">
        <aside className="works__index" aria-label="Project filters">
          <h3 ref={mapTitleRef}>Project map.</h3>
          <p ref={mapCopyRef} className="works__index-copy">
            My adventure exploring different realms within tech.
          </p>

          <p className="works__index-label">By area</p>
          <div className="works__map" role="group" aria-label="Filter projects by area">
            <svg
              className="works__map-paths"
              viewBox="0 0 240 220"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M120 0 L120 27" />
              <path d="M120 27 C96 45 55 51 52 86" />
              <path d="M120 27 C151 50 190 77 187 122" />
              <path d="M52 86 C69 130 104 155 122 190" />
              <path d="M187 122 C173 156 143 172 122 190" />
              <path d="M122 190 L122 220" />
            </svg>
            <ul>
              {indexAreas.map(({ label, color }) => (
                <li key={label}>
                  <button
                    type="button"
                    className="works__map-stop"
                    aria-pressed={selectedArea === label}
                    onClick={() => setSelectedArea(label)}
                  >
                    <i style={{ backgroundColor: color }} aria-hidden="true" />
                    <span>{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="works__years" role="group" aria-label="Filter projects by year">
            <p className="works__index-label">By date</p>
            <div>
              {indexYears.map((year) => (
                <button
                  type="button"
                  key={year}
                  className="works__ticket"
                  aria-pressed={selectedYears.includes(year)}
                  onClick={() => toggleYear(year)}
                >
                  <span className="works__ticket-tack" aria-hidden="true" />
                  <span className="works__ticket-label">
                    {year === '2024' ? '≤ 2024' : year}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <p className="works__filter-status" aria-live="polite">
            Showing {filteredProjects.length}{' '}
            {filteredProjects.length === 1 ? 'project' : 'projects'}
          </p>
        </aside>

        <div className="works__projects">
          {filteredProjects.map((project) => {
            const cardClassName = `project-card${
              project.links?.length ? ' project-card--linked' : ''
            }${project.slug || project.href ? ' project-card--clickable' : ''}`

            const cardContent = (
              <>
                <div
                  className={`project-card__visual project-card__visual--${
                    areaTone[project.area] ?? 'blue'
                  }`}
                  aria-hidden={!project.award ? true : undefined}
                >
                  {project.image ? (
                    <img
                      className={`project-card__image${
                        project.imageFramed ? ' project-card__image--framed' : ''
                      }`}
                      src={project.image}
                      alt=""
                    />
                  ) : (
                    <div className="project-card__mockup">
                      <span />
                      <span />
                      <span />
                    </div>
                  )}
                  {project.award ? (
                    <p className="project-card__award">{project.award}</p>
                  ) : null}
                </div>

                <div className="project-card__content">
                  <div className="project-card__meta">
                    <span>{project.area}</span>
                    <span className="project-card__year">
                      <i className="project-card__year-dot" aria-hidden="true" />
                      /{project.year}
                    </span>
                  </div>

                  <div
                    className={`project-card__body${
                      Array.isArray(project.description) && project.description.length > 1
                        ? ' project-card__body--split'
                        : ''
                    }`}
                  >
                    <h3>{project.title}</h3>
                    <Authors names={project.authors} />
                    {(Array.isArray(project.description)
                      ? project.description
                      : [project.description]
                    ).map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="project-card__footer">
                    <ul aria-label={`${project.title} technologies`}>
                      {project.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                    {!project.slug && project.links?.length ? (
                      <div className="project-card__actions">
                        {project.links.map(({ label, href }) => (
                          <a
                            key={label}
                            className="project-card__action"
                            href={href}
                            target={href.startsWith('http') ? '_blank' : undefined}
                            rel={href.startsWith('http') ? 'noreferrer' : undefined}
                          >
                            {label}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <span className="project-card__arrow" aria-hidden="true">
                        <svg viewBox="0 0 16 16">
                          <path d="M4.2 11.8 11.8 4.2" />
                          <path d="M5.8 4.2h6v6" />
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
              </>
            )

            if (project.slug) {
              return (
                <Link className={cardClassName} key={project.number} to={`/work/${project.slug}`}>
                  {cardContent}
                </Link>
              )
            }

            if (project.href) {
              return (
                <a
                  className={cardClassName}
                  key={project.number}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {cardContent}
                </a>
              )
            }

            return (
              <article className={cardClassName} key={project.number}>
                {cardContent}
              </article>
            )
          })}
          {filteredProjects.length === 0 && (
            <p className="works__empty">
              Off the map for now. Try a different filter.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default Works
