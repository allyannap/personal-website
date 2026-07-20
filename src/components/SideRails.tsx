const sectionLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Home', href: '#home' },
]

function SideRails() {
  return (
    <>
      <nav className="side-rail side-rail--left" aria-label="Page sections">
        {sectionLinks.map(({ label, href }) => (
          <a className="side-rail__link" href={href} key={label}>
            {label}
          </a>
        ))}
      </nav>

      <aside className="side-rail side-rail--right" aria-label="Site owner">
        <span className="side-rail__name">Allyanna Panganiban</span>
      </aside>
    </>
  )
}

export default SideRails
