import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  name: string
  tagline: string
  description: string
  category: string
  status: string
}

const projects: Project[] = [
  {
    name: 'Jasterish',
    tagline: 'Adaptive Language Intelligence',
    description:
      'A next-generation natural language understanding system designed for enterprise compliance and regulatory document analysis. Jasterish interprets complex legal and scientific text with contextual awareness.',
    category: 'NLP / Compliance',
    status: 'Active Development',
  },
  {
    name: 'Morphlex',
    tagline: 'Dynamic Knowledge Graph Engine',
    description:
      'An adaptive knowledge representation system that continuously reshapes its understanding graph as new data streams in. Morphlex enables real-time insight extraction from unstructured biomedical research.',
    category: 'Knowledge Graphs',
    status: 'Pilot Phase',
  },
  {
    name: 'Return42',
    tagline: 'Intelligent Decision Recovery',
    description:
      'A safety-first AI framework that detects when autonomous systems diverge from intended behavior and executes graceful recovery protocols. Built for high-stakes clinical and financial environments.',
    category: 'AI Safety / Governance',
    status: 'Active Development',
  },
  {
    name: 'NeuroDiOS',
    tagline: 'Neurological Diagnostic Intelligence',
    description:
      'An AI-powered diagnostic operating system for neurological conditions. NeuroDiOS integrates multi-modal patient data — imaging, genomics, and digital biomarkers — to assist clinical decision-making.',
    category: 'Healthcare AI',
    status: 'Clinical Validation',
  },
  {
    name: 'IHEP',
    tagline: 'Inclusive Health Equity Platform',
    description:
      'The Inclusive Health Equity Platform addresses bias in healthcare AI by ensuring diverse population representation in training data, model validation, and deployment monitoring across underserved communities.',
    category: 'Health Equity',
    status: 'Active Deployment',
  },
  {
    name: 'Mission Valley',
    tagline: 'Autonomous Research Coordination',
    description:
      'A distributed AI orchestration system that coordinates multi-site research programs. Mission Valley aligns scientific milestones, regulatory compliance, and resource allocation across global research networks.',
    category: 'ResearchOps AI',
    status: 'Production',
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.1,
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="projects"
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
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 gap-6">
          <div>
            <span className="section-number block mb-4">02</span>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                fontWeight: 400,
                lineHeight: 1.1,
                color: 'var(--text-primary)',
              }}
            >
              AI Projects
            </h2>
          </div>
          <p
            className="font-body max-w-md"
            style={{
              fontSize: '15px',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
            }}
          >
            From concept to deployment — autonomous systems built for
            high-stakes environments.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ backgroundColor: 'var(--border-subtle)' }}>
          {projects.map((project, i) => (
            <div
              key={project.name}
              ref={(el) => { cardsRef.current[i] = el }}
              className="group p-8 md:p-10 transition-all duration-300"
              style={{ backgroundColor: 'var(--bg-base)' }}
            >
              <div className="flex items-start justify-between mb-6">
                <span
                  className="font-body text-xs uppercase tracking-widest"
                  style={{ color: 'var(--accent-amber)' }}
                >
                  {project.category}
                </span>
                <span
                  className="font-body text-xs"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {project.status}
                </span>
              </div>

              <h3
                className="font-display mb-2 group-hover:opacity-70 transition-opacity duration-300"
                style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontWeight: 400,
                  color: 'var(--text-primary)',
                }}
              >
                {project.name}
              </h3>

              <p
                className="font-body text-sm mb-4"
                style={{
                  color: 'var(--text-secondary)',
                  fontWeight: 500,
                }}
              >
                {project.tagline}
              </p>

              <p
                className="font-body"
                style={{
                  fontSize: '14px',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                }}
              >
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
