import Link from 'next/link'
import { Scissors, Camera, Monitor, Heart, Mail, Instagram } from 'lucide-react'

const PILLARS = [
  {
    icon: <Scissors size={16} />,
    label: 'Crochet Studio',
    color: 'var(--color-crochet)',
    links: [
      { label: 'Shop Ready-Made', href: '/crochet/shop' },
      { label: 'Design Your Own', href: '/crochet/design' },
      { label: 'How It Works', href: '/crochet' },
    ],
  },
  {
    icon: <Camera size={16} />,
    label: 'Photography',
    color: 'var(--color-photography)',
    links: [
      { label: 'Packages & Pricing', href: '/photography' },
      { label: 'Book a Session', href: '/photography/book' },
      { label: 'Portfolio Gallery', href: '/gallery' },
    ],
  },
  {
    icon: <Monitor size={16} />,
    label: 'Web Design',
    color: 'var(--color-webdesign)',
    links: [
      { label: 'Services', href: '/webdesign' },
      { label: 'My Portfolio', href: '/webdesign' },
      { label: 'Start a Project', href: '/webdesign/enquire' },
    ],
  },
]

const STUDIO_LINKS = [
  { label: 'About BYM Studio', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
  { label: 'Sign In', href: '/auth/login' },
]

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--color-bg-secondary)',
        borderTop: '1px solid var(--color-border)',
        padding: '4rem 1.5rem 2rem',
      }}
    >
      <div className="container">
        {/* Top grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem',
          }}
        >
          {/* Brand column */}
          <div>
            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginBottom: '1rem',
                textDecoration: 'none',
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background:
                    'linear-gradient(135deg, var(--color-crochet), var(--color-photography), var(--color-webdesign))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#fff',
                  fontFamily: 'var(--font-hand)',
                }}
              >
                BYM
              </div>
              <span
                className="font-serif"
                style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-text-primary)' }}
              >
                BYM Studio
              </span>
            </Link>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, maxWidth: 240, marginBottom: '1.5rem' }}>
              Handcrafted crochet, professional photography, and bespoke web design — all from one passionate studio.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-text-secondary)',
                  transition: 'all 0.2s',
                }}
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="mailto:hello@bymstudio.co"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-text-secondary)',
                  transition: 'all 0.2s',
                }}
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Pillar columns */}
          {PILLARS.map((pillar) => (
            <div key={pillar.label}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                  color: pillar.color,
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {pillar.icon}
                {pillar.label}
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {pillar.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--color-text-muted)',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Studio links */}
          <div>
            <div
              style={{
                marginBottom: '1rem',
                color: 'var(--color-gold)',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Studio
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {STUDIO_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--color-text-muted)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
          }}
        >
          <p
            style={{
              fontSize: '0.8rem',
              color: 'var(--color-text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            &copy; {new Date().getFullYear()} BYM Studio. Made with
            <Heart size={12} style={{ color: 'var(--color-crochet)' }} />
            by BokasYarnMarket Studio.
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            All custom pieces are handmade with love.
          </p>
        </div>
      </div>
    </footer>
  )
}
