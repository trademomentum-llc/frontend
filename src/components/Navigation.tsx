import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Insights', href: '#insights' },
  { label: 'Partners', href: '#partners' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 w-full transition-all duration-500"
      style={{
        zIndex: 50,
        backgroundColor: scrolled ? 'rgba(245, 245, 240, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        <a
          href="#"
          className="font-display text-lg"
          style={{ color: 'var(--text-primary)', fontWeight: 400 }}
        >
          Momentum AI
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-sm transition-opacity duration-300 hover:opacity-60"
              style={{ color: 'var(--text-secondary)' }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="font-body text-sm px-5 py-2 transition-all duration-300 hover:opacity-80"
          style={{
            backgroundColor: 'var(--accent-blue)',
            color: '#FFFFFF',
            borderRadius: '999px',
          }}
        >
          Get in touch
        </a>
      </div>
    </nav>
  )
}
