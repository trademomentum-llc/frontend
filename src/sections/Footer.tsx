export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative w-full"
      style={{
        zIndex: 2,
        backgroundColor: 'var(--bg-surface)',
        padding: 'clamp(120px, 15vw, 200px) 0 60px',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Large CTA */}
        <h2
          className="font-display mb-20"
          style={{
            fontSize: 'clamp(3rem, 5vw, 6rem)',
            fontWeight: 400,
            lineHeight: 1.1,
            color: 'var(--text-primary)',
          }}
        >
          Let's define the future.
        </h2>

        {/* Contact info */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20"
          style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '40px' }}
        >
          <div>
            <p
              className="font-body text-xs uppercase tracking-widest mb-3"
              style={{ color: 'var(--text-muted)' }}
            >
              Email
            </p>
            <a
              href="mailto:jason@trademomentumllc.com"
              className="font-body hover:opacity-70 transition-opacity duration-300"
              style={{ fontSize: '15px', color: 'var(--text-primary)' }}
            >
              jason@trademomentumllc.com
            </a>
          </div>
          <div>
            <p
              className="font-body text-xs uppercase tracking-widest mb-3"
              style={{ color: 'var(--text-muted)' }}
            >
              Phone
            </p>
            <a
              href="tel:+19175668112"
              className="font-body hover:opacity-70 transition-opacity duration-300"
              style={{ fontSize: '15px', color: 'var(--text-primary)' }}
            >
              +1 917 566 8112
            </a>
          </div>
          <div>
            <p
              className="font-body text-xs uppercase tracking-widest mb-3"
              style={{ color: 'var(--text-muted)' }}
            >
              Address
            </p>
            <p
              className="font-body"
              style={{ fontSize: '15px', color: 'var(--text-primary)' }}
            >
              12 W 129th St #1E
              <br />
              New York, NY 10027
            </p>
          </div>
        </div>

        {/* Links */}
        <div
          className="flex flex-wrap items-center justify-between gap-6"
          style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '32px' }}
        >
          <div className="flex gap-8">
            <a
              href="#"
              className="font-body text-sm hover:opacity-70 transition-opacity duration-300"
              style={{ color: 'var(--text-secondary)' }}
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="font-body text-sm hover:opacity-70 transition-opacity duration-300"
              style={{ color: 'var(--text-secondary)' }}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="font-body text-sm hover:opacity-70 transition-opacity duration-300"
              style={{ color: 'var(--text-secondary)' }}
            >
              Terms
            </a>
          </div>
          <p
            className="font-body text-xs"
            style={{ color: 'var(--text-muted)' }}
          >
            Momentum AI Group, 2025. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
