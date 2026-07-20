import selfPortrait from '../assets/doodles/self-portrait.png'

const skillGroups = [
  {
    title: 'Languages',
    items: ['Python', 'R', 'SQL', 'Java', 'JavaScript', 'HTML/CSS', 'Swift'],
  },
  {
    title: 'AI & Machine Learning',
    items: [
      'AI Agents',
      'RAG',
      'Generative AI',
      'Machine Learning',
      'NLP',
      'scikit-learn',
      'TensorFlow',
    ],
  },
  {
    title: 'Data Science',
    items: [
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Seaborn',
      'Data Analysis',
      'Data Visualization',
    ],
  },
  {
    title: 'Engineering & Tools',
    items: [
      'APIs',
      'Git',
      'GitHub',
      'Cursor',
      'Claude Code',
      'Jupyter Notebook',
      'VS Code',
      'RStudio',
    ],
  },
]

function Skills() {
  return (
    <section className="skills" aria-labelledby="skills-title">
      <div className="skills__intro">
        <h2 id="skills-title">Skills</h2>
        <p className="skills__lede">
          Tools for turning data and ideas<br></br>
          into human-centered systems.
        </p>
        <img
          className="skills__portrait"
          src={selfPortrait}
          alt=""
          aria-hidden="true"
        />
      </div>

      <div className="skills__grid">
        {skillGroups.map(({ title, items }) => (
          <div className="skills__group" key={title}>
            <h3 className="skills__group-title">{title}</h3>
            <ul className="skills__list">
              {items.map((item) => (
                <li className="skills__item" key={item}>
                  <span className="skills__item-label">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
