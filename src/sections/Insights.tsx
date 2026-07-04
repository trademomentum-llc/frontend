import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const insights = [
  {
    num: '01',
    text: 'The ethics of autonomous decision-making in enterprise.',
  },
  {
    num: '02',
    text: 'Mapping the regulatory landscape for foundation models.',
  },
  {
    num: '03',
    text: 'Why interpretability is the new infrastructure.',
  },
  {
    num: '04',
    text: 'Building trust into generative AI pipelines.',
  },
]

export default function Insights() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.08,
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="insights"
      ref={sectionRef}
      className="relative w-full"
      style={{
        zIndex: 2,
        backgroundColor: 'var(--bg-base)',
        padding: 'clamp(120px, 12vw, 160px) 0',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left: sticky title */}
          <div className="lg:w-1/3 lg:sticky lg:top-32 lg:self-start">
            <span className="section-number block mb-4">03</span>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                fontWeight: 400,
                lineHeight: 1.1,
                color: 'var(--text-primary)',
              }}
            >
              Insights
            </h2>
            <p
              className="font-body mt-6"
              style={{
                fontSize: '14px',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
              }}
            >
              Perspectives on the evolving landscape of AI governance,
              compliance, and responsible innovation.
            </p>
          </div>

          {/* Right: insight cards */}
          <div className="lg:w-2/3 space-y-0">
            {insights.map((insight, i) => (
              <div
                key={insight.num}
                ref={(el) => { cardsRef.current[i] = el }}
                className="group py-10 cursor-pointer transition-all duration-300"
                style={{
                  borderTop: '1px solid var(--border-subtle)',
                }}
              >
                <div className="flex items-start gap-8">
                  <span
                    className="font-display flex-shrink-0"
                    style={{
                      fontSize: '1.25rem',
                      color: 'var(--text-muted)',
                      minWidth: '36px',
                    }}
                  >
                    {insight.num}
                  </span>
                  <p
                    className="font-body group-hover:opacity-70 transition-opacity duration-300"
                    style={{
                      fontSize: 'clamp(16px, 1.5vw, 20px)',
                      color: 'var(--text-primary)',
                      lineHeight: 1.5,
                      fontWeight: 400,
                    }}
                  >
                    {insight.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
