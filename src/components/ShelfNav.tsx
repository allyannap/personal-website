import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import sitterDoodle from '../assets/doodles/sitter.svg'
import linkedinIcon from '../assets/doodles/linkedin.svg'
import instagramIcon from '../assets/doodles/instagram.svg'
import emailIcon from '../assets/doodles/email.svg'
import UbeLatte from './UbeLatte'

gsap.registerPlugin(ScrollTrigger)

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/allyannap/',
    icon: linkedinIcon,
    borderPath:
      'M7 4c8-1 27 0 34 1 3 0 4 2 4 5l-1 31c0 3-2 4-5 4L8 44c-3 0-4-2-4-5L5 9c0-3 1-5 2-5Z',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/allyanna',
    icon: instagramIcon,
    borderPath:
      'M6 5c9 0 14 1 20 0l15-1c2 1 3 3 3 6l1 30c0 3-2 5-5 5L8 44c-3 0-4-2-4-5L5 9c0-2 0-3 1-4Z',
  },
  {
    label: 'Email',
    href: 'mailto:amp388@cornell.edu',
    icon: emailIcon,
    borderPath:
      'M7 4c7 1 13 0 19 1l15-1c2 1 3 3 3 6l1 30c0 3-2 5-5 5L8 44c-3 0-4-2-4-5L5 9c0-3 1-4 2-5Z',
  },
]

function ShelfNav() {
  const shelfRef = useRef<HTMLElement>(null)
  const [sips, setSips] = useState(0)

  useLayoutEffect(() => {
    const shelf = shelfRef.current
    if (!shelf) return

    const media = gsap.matchMedia()

    media.add(
      '(min-width: 701px) and (prefers-reduced-motion: no-preference)',
      () => {
        const hero = document.querySelector('.hero')
        if (!hero) return

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: 'bottom 28%',
            end: 'bottom 116px',
            scrub: 0.18,
            invalidateOnRefresh: true,
          },
        })

        timeline
          .to(
            shelf,
            {
              width: '100%',
              height: 56,
              backgroundColor: '#f5f5f4',
              ease: 'none',
            },
            0,
          )
          .to(
            document.querySelector('.side-rail--left'),
            { top: 56, ease: 'none' },
            0,
          )
          .to(
            shelf.querySelector('.shelf-nav__plank'),
            {
              height: 1,
              backgroundColor: '#d0cdc6',
              borderWidth: 0,
              borderRadius: 0,
              boxShadow: 'none',
              ease: 'none',
            },
            0,
          )
          .to(
            shelf.querySelector('.shelf-nav__doodles'),
            { scale: 0.48, ease: 'none' },
            0,
          )
          .to(
            shelf.querySelectorAll(
              '.shelf-nav__latte-note, .shelf-nav__sip-hint',
            ),
            { autoAlpha: 0, y: -8, ease: 'power1.out' },
            0,
          )
          .to(
            shelf.querySelector('.shelf-nav__sitter'),
            {
              x: () => window.innerWidth * 0.62,
              y: 3,
              ease: 'none',
            },
            0,
          )
          .to(
            shelf.querySelector('.shelf-nav__left'),
            { left: 16, ease: 'none' },
            0,
          )
          .to(
            shelf.querySelectorAll('.shelf-nav__link'),
            { width: 28, ease: 'none' },
            0,
          )
          .to(
            shelf.querySelector('.shelf-nav__socials'),
            { right: 16, bottom: 10, ease: 'none' },
            0,
          )
      },
    )

    return () => media.revert()
  }, [])

  return (
    <nav ref={shelfRef} className="shelf-nav" aria-label="Social links">
      <div className="shelf-nav__plank" aria-hidden="true" />
      <div className="shelf-nav__left">
        <p className="shelf-nav__latte-note">
          ube latte
          <br />
          <span className="shelf-nav__latte-origin">from the Philippines</span>
          <svg
            className="shelf-nav__latte-arrow"
            viewBox="0 0 58 54"
            aria-hidden="true"
          >
            <path d="M18 14c3 14 12 24 25 28" />
            <path d="m35 33 9 9-11 6" />
          </svg>
        </p>
        <span className="shelf-nav__sip-hint">
          (click to
          <br />
          drink!)
        </span>
        <div className="shelf-nav__doodles">
          <button
            className="shelf-nav__latte"
            type="button"
            aria-disabled={sips === 3}
            aria-label={
              sips === 3
                ? 'The ube latte is empty'
                : `Sip the ube latte. ${3 - sips} sips remaining`
            }
            onClick={() => setSips((current) => Math.min(current + 1, 3))}
          >
            <UbeLatte level={sips} />
          </button>
          <img
            className="shelf-nav__sitter"
            src={sitterDoodle}
            alt=""
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="shelf-nav__socials">
        {socialLinks.map(({ label, href, icon, borderPath }) => (
          <a
            className="shelf-nav__link"
            href={href}
            key={label}
            aria-label={label}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noreferrer' : undefined}
          >
            <svg
              className="shelf-nav__link-fill"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path d={borderPath} />
            </svg>
            <img src={icon} alt="" aria-hidden="true" />
          </a>
        ))}
      </div>
    </nav>
  )
}

export default ShelfNav
