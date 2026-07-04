const partners = [
  'Fortune 500',
  'MIT Technology Review',
  'OpenAI Partner',
  'Forbes AI 50',
  'Johns Hopkins AIHE',
  'Health Insight Ventures',
  'Fortune 500',
  'MIT Technology Review',
  'OpenAI Partner',
  'Forbes AI 50',
  'Johns Hopkins AIHE',
  'Health Insight Ventures',
]

export default function Partners() {
  return (
    <section
      id="partners"
      className="relative w-full overflow-hidden"
      style={{
        zIndex: 2,
        backgroundColor: 'var(--bg-base)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '28px 0',
      }}
    >
      <div className="marquee-track flex items-center whitespace-nowrap" style={{ width: 'max-content' }}>
        {partners.map((name, i) => (
          <span
            key={i}
            className="font-body inline-flex items-center mx-10"
            style={{
              fontSize: '14px',
              color: 'var(--text-secondary)',
              letterSpacing: '0.02em',
            }}
          >
            {name}
            <span
              className="inline-block ml-10"
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: 'var(--text-muted)',
              }}
            />
          </span>
        ))}
      </div>
    </section>
  )
}
