const indexAreas = [
  { number: '/00', label: 'All projects', color: '#7a7770' },
  { number: '/01', label: 'AI & Engineering', color: '#35658c' },
  { number: '/02', label: 'Data Science', color: '#9b7bb5' },
  { number: '/03', label: 'Design', color: '#65a59a' },
]

const indexYears = ['2026', '2025', '2024']

const projects = [
  {
    number: '01',
    area: 'AI & Engineering',
    year: '2026',
    title: 'Project One',
    description:
      'A concise description of the problem, the system, and the impact of the work.',
    tags: ['Python', 'LLM / RAG'],
    tone: 'blue',
  },
  {
    number: '02',
    area: 'Data Science',
    year: '2025',
    title: 'Project Two',
    description:
      'A concise description of the data, the approach, and what the project revealed.',
    tags: ['Python', 'Data'],
    tone: 'violet',
  },
  {
    number: '03',
    area: 'Design',
    year: '2024',
    title: 'Project Three',
    description:
      'A concise description of the idea, the process, and the final experience.',
    tags: ['Research', 'Prototype'],
    tone: 'green',
  },
]

function Works() {
  return (
    <section id="work" className="works" aria-labelledby="works-title">
      <header className="works__heading">
        <h2 id="works-title">Works</h2>
      </header>

      <div className="works__layout">
        <aside className="works__index" aria-label="Project index preview">
          <h3>Index.</h3>
          <p className="works__index-copy">
            My adventure exploring different realms within tech.
          </p>

          <div className="works__index-group">
            <p className="works__index-label">By area</p>
            <ul>
              {indexAreas.map(({ number, label, color }) => (
                <li key={label}>
                  <span>{number}</span>
                  <i style={{ backgroundColor: color }} aria-hidden="true" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="works__index-group">
            <p className="works__index-label">By year</p>
            <ul>
              {indexYears.map((year, index) => (
                <li key={year}>
                  <span>/{String(index).padStart(2, '0')}</span>
                  <i className="works__index-spacer" aria-hidden="true" />
                  <span>{year}</span>
                </li>
              ))}
            </ul>
          </div>

          <span className="works__index-note">filters coming soon ↗</span>
        </aside>

        <div className="works__projects">
          {projects.map((project) => (
            <article className="project-card" key={project.number}>
              <div
                className={`project-card__visual project-card__visual--${project.tone}`}
                aria-hidden="true"
              >
                <div className="project-card__mockup">
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div className="project-card__content">
                <div className="project-card__meta">
                  <span>{project.area}</span>
                  <span>/{project.year}</span>
                </div>

                <div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>

                <div className="project-card__footer">
                  <ul aria-label={`${project.title} technologies`}>
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <span className="project-card__arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Works
