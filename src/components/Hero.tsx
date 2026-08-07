import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { revealWordsOnScroll } from '../utils/textReveal'
import friendsPhoto from '../assets/photos/friends.jpg'
import gradPhoto from '../assets/photos/grad.jpg'
import slopePhoto from '../assets/photos/slope.jpg'
import waterfallPhoto from '../assets/photos/waterfall.jpg'

gsap.registerPlugin(ScrollTrigger)

function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const photosRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const bioRef = useRef<HTMLParagraphElement>(null)

  useLayoutEffect(() => {
    const hero = heroRef.current
    const photos = photosRef.current
    if (!hero || !photos) return

    const media = gsap.matchMedia()
    const cleanups: Array<() => void> = []

    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.to(photos, {
        y: -72,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      })

      if (eyebrowRef.current) cleanups.push(revealWordsOnScroll(eyebrowRef.current, hero))
      if (titleRef.current) cleanups.push(revealWordsOnScroll(titleRef.current, hero))
      if (bioRef.current) cleanups.push(revealWordsOnScroll(bioRef.current, hero))
    })

    return () => {
      cleanups.forEach((cleanup) => cleanup())
      media.revert()
    }
  }, [])

  return (
    <section
      ref={heroRef}
      id="home"
      className="hero"
      aria-labelledby="hero-title"
    >
      <div className="hero__canvas">
        <div id="about" className="hero__intro">
          <p ref={eyebrowRef} className="hero__eyebrow">Hi, I&apos;m</p>
          <h1 ref={titleRef} id="hero-title">Allyanna</h1>
          <p ref={bioRef} className="hero__bio">
            I build <span className="hero__keyword--blue">agentic systems</span>{' '}
            at the intersection of{' '}
            <span className="hero__keyword--gray">AI</span>,{' '}
            <span className="hero__keyword--gray">data</span>, and{' '}
            <span className="hero__keyword--gray">engineering</span>.
          </p>
        </div>

        <div
          ref={photosRef}
          className="hero__photos"
          aria-label="A few moments from my life"
        >
          <figure className="hero__photo hero__photo--left">
            <img src={waterfallPhoto} alt="A summer day at a waterfall" />
          </figure>
          <figure className="hero__photo hero__photo--center">
            <img
              src={gradPhoto}
              alt="Allyanna at graduation beneath cherry blossoms"
            />
          </figure>
          <div className="hero__photo-stack">
            <figure className="hero__photo hero__photo--edge">
              <img
                src={friendsPhoto}
                alt="Allyanna and friends on Cornell's campus"
              />
            </figure>
            <figure className="hero__photo hero__photo--edge">
              <img
                src={slopePhoto}
                alt="Friends relaxing on a grassy slope at sunset"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
