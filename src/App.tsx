import { useEffect } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from './components/Hero'
import ShelfNav from './components/ShelfNav'
import SideRails from './components/SideRails'

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.13,
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    let frame = 0
    const tick = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      lenis.off('scroll', ScrollTrigger.update)
      lenis.destroy()
    }
  }, [])

  return (
    <>
      <SideRails />
      <main className="home">
        <Hero />
        <ShelfNav />
        <section
          id="work"
          className="work-preview"
          aria-labelledby="work-title"
        >
          <p className="work-preview__eyebrow">A few things I&apos;ve made</p>
          <h2 id="work-title">Selected work</h2>
          <p>Case studies are getting their finishing touches.</p>
        </section>
      </main>
    </>
  )
}

export default App
