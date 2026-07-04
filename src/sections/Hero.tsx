import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import VortexGateway from '../components/VortexGateway'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade out headline on scroll
      gsap.to(headlineRef.current, {
        opacity: 0,
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      gsap.to(subtextRef.current, {
        opacity: 0,
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '50% top',
          scrub: 1,
        },
      })

      gsap.to(ctaRef.current, {
        opacity: 0,
        y: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '40% top',
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: '100vh', position: 'sticky', top: 0, zIndex: 0 }}
    >
      <VortexGateway />

      {/* Content overlay */}
      <div
        className="relative flex flex-col items-center justify-center text-center px-6"
        style={{ zIndex: 1, height: '100%' }}
      >
        <p
          className="font-body uppercase tracking-widest mb-6"
          style={{
            fontSize: '12px',
            letterSpacing: '0.2em',
            color: 'var(--text-secondary)',
          }}
        >
          Next-Gen AI Governance
        </p>

        <div ref={headlineRef}>
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(4rem, 8vw, 9rem)',
              fontWeight: 400,
              lineHeight: 1.05,
              color: 'var(--text-primary)',
            }}
          >
            Intelligence
            <br />
            that <em style={{ fontStyle: 'italic' }}>endures.</em>
          </h1>
        </div>

        <p
          ref={subtextRef}
          className="font-body mt-8"
          style={{
            fontSize: '16px',
            color: 'var(--text-secondary)',
            maxWidth: '400px',
            lineHeight: 1.6,
          }}
        >
          Strategic advisory and compliance architecture for autonomous systems.
        </p>

        <div ref={ctaRef} className="flex gap-4 mt-10">
          <a
            href="#contact"
            className="font-body inline-block px-6 py-3 text-sm font-medium transition-all duration-300 hover:opacity-80"
            style={{
              backgroundColor: 'var(--text-primary)',
              color: 'var(--bg-surface)',
              borderRadius: '999px',
            }}
          >
            Start a conversation
          </a>
          <a
            href="#projects"
            className="font-body inline-block px-6 py-3 text-sm font-medium transition-all duration-300 hover:opacity-70"
            style={{
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
              borderRadius: '999px',
            }}
          >
            Explore projects
          </a>
        </div>
      </div>
    </section>
  )
}
