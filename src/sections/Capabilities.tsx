import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Capability {
  title: string
  items: string[]
}

const capabilities: Capability[] = [
  {
    title: 'Strategy',
    items: [
      'AI Roadmapping',
      'Risk Management',
      'Investment Advisory',
      'Market Positioning',
    ],
  },
  {
    title: 'Governance',
    items: [
      'Policy Frameworks',
      'Model Evaluation',
      'Bias Auditing',
      'Stakeholder Alignment',
    ],
  },
  {
    title: 'Compliance',
    items: [
      'Regulatory Mapping',
      'Documentation Cadence',
      'Audit Readiness',
      'Cross-Border Standards',
    ],
  },
  {
    title: 'Architecture',
    items: [
      'System Design',
      'Pipeline Engineering',
      'MLOps Integration',
      'Scalability Planning',
    ],
  },
]

function SplitText({ text }: { text: string }) {
  return (
    <>
      {text.split('').map((char, i) => (
        <span key={i}>{char === ' ' ? '\u00A0' : char}</span>
      ))}
    </>
  )
}

export default function Capabilities() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="relative w-full"
      style={{
        zIndex: 2,
        backgroundColor: 'var(--bg-base)',
        padding: 'clamp(120px, 12vw, 160px) 0',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div ref={headerRef} className="mb-20">
          <span className="section-number block mb-4">01</span>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(2.5rem, 4vw, 4rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              color: 'var(--text-primary)',
            }}
          >
            Capabilities
          </h2>
        </div>

        {/* 4-column grid with vertical lines */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0"
          style={{ borderTop: '1px solid var(--border-subtle)' }}
        >
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="pt-10 pb-10 lg:pr-8"
              style={{
                borderLeft: '1px solid var(--border-subtle)',
                paddingLeft: '24px',
              }}
            >
              <h3
                className="font-display mb-8"
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  color: 'var(--text-primary)',
                }}
              >
                {cap.title}
              </h3>

              <ul className="space-y-4">
                {cap.items.map((item) => (
                  <li key={item} className="stagger-reveal">
                    <span
                      className="stagger-reveal__text--original font-body"
                      style={{
                        fontSize: '14px',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {item}
                    </span>
                    <span
                      className="stagger-reveal__text font-body"
                      style={{
                        fontSize: '14px',
                        color: 'var(--text-primary)',
                      }}
                    >
                      <SplitText text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
