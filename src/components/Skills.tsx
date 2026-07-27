import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import selfPortrait from '../assets/doodles/self-portrait.png'
import cornellSeal from '../assets/doodles/cornell-seal.png'
import campusPhoto from '../assets/photos/campus.jpg'

gsap.registerPlugin(ScrollTrigger)

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
  const sectionRef = useRef<HTMLElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const campusShiftRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    const intro = introRef.current
    const grid = gridRef.current
    const campusShift = campusShiftRef.current
    if (!section || !intro || !grid || !campusShift) return

    const media = gsap.matchMedia()

    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to([intro, grid, campusShift], {
        y: -72,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
        },
      })
    })

    return () => media.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="skills"
      aria-labelledby="skills-title"
    >
      <div ref={introRef} className="skills__intro">
        <h2 id="skills-title">Skills</h2>
        <img
          className="skills__portrait"
          src={selfPortrait}
          alt=""
          aria-hidden="true"
        />
      </div>

      <div ref={gridRef} className="skills__grid">
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
            {title === 'Engineering & Tools' ? (
              <div className="skills__notes" aria-hidden="true">
                <div className="skills__paper-note">
                  <span className="skills__tape skills__tape--top" />
                  <svg viewBox="0 0 180 110">
                    <path d="M18 85c-16-14 4-27 14-8 8 16-12 21-17 4-7-25 12-53 35-48 25 5 17 44 2 41-19-4-12-55 16-57 31-2 29 51 7 50-25-1-19-58 11-60 33-2 35 48 12 53-22 5-23-33 2-40 19-6 30 5 38 17" />
                  </svg>
                  <span className="skills__tape skills__tape--corner" />
                </div>
                <span className="skills__sticky skills__sticky--yellow" />
                <div className="skills__sticky skills__sticky--blue">
                  <img src={cornellSeal} alt="" />
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div ref={campusShiftRef} className="skills__campus-shift" aria-hidden="true">
        <figure className="skills__campus">
          <img src={campusPhoto} alt="" />
        </figure>
      </div>
    </section>
  )
}

export default Skills
