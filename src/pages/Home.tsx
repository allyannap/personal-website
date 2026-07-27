import { useEffect } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from '../components/Hero'
import ShelfNav from '../components/ShelfNav'
import SideRails from '../components/SideRails'
import Skills from '../components/Skills'
import Works from '../components/Works'
import Footer from '../components/Footer'

function Home() {
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

    if (window.location.hash) {
      const hash = window.location.hash
      requestAnimationFrame(() => {
        lenis.scrollTo(hash, { immediate: true })
      })
    }

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
        <Skills />
        <Works />
        <Footer />
      </main>
    </>
  )
}

export default Home
