import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Scissors,
  Camera,
  Monitor,
  ArrowRight,
  Star,
  Sparkles,
  Heart,
  Zap,
  Check,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'BYM Studio — Crochet · Photography · Web Design',
  description:
    'Handcrafted crochet pieces, professional photography sessions, and bespoke web design. Three creative services from one passionate studio.',
}

// ── Static data ────────────────────────────────────────────────────────────

const PILLARS = [
  {
    id: 'crochet',
    icon: <Scissors size={28} />,
    label: 'Crochet Studio',
    tagline: 'Handcrafted with Love',
    description:
      'Every stitch tells a story. Shop beautifully made crochet pieces or bring your vision to life with a fully custom commission — bags, blankets, tops, home décor, and more.',
    color: 'var(--color-crochet)',
    colorDim: 'var(--color-crochet-dim)',
    gradient: 'linear-gradient(135deg, var(--color-crochet), var(--color-crochet-light))',
    ctas: [
      { label: 'Shop the Collection', href: '/crochet/shop', primary: true },
      { label: 'Design Your Own', href: '/crochet/design', primary: false },
    ],
    features: ['Custom commissions', 'Ready-made pieces', 'Unique colorways', 'Fast turnaround'],
    emoji: '🧶',
  },
  {
    id: 'photography',
    icon: <Camera size={28} />,
    label: 'Photography',
    tagline: 'Moments Worth Keeping',
    description:
      'Professional photography sessions with full editing included. Portrait, family, maternity, events, and commercial shoots — every package is crafted to make you look extraordinary.',
    color: 'var(--color-photography)',
    colorDim: 'var(--color-photography-dim)',
    gradient: 'linear-gradient(135deg, var(--color-photography), var(--color-photography-light))',
    ctas: [
      { label: 'View Packages', href: '/photography', primary: true },
      { label: 'Book a Session', href: '/photography/book', primary: false },
    ],
    features: ['Full editing included', 'Multiple session types', 'Quick delivery', 'Professional quality'],
    emoji: '📷',
  },
  {
    id: 'webdesign',
    icon: <Monitor size={28} />,
    label: 'Web Design',
    tagline: 'Built to Impress',
    description:
      'From stunning landing pages to full e-commerce stores — I design and build fast, beautiful websites that convert visitors into customers. Worldwide clients, premium results.',
    color: 'var(--color-webdesign)',
    colorDim: 'var(--color-webdesign-dim)',
    gradient: 'linear-gradient(135deg, var(--color-webdesign), var(--color-webdesign-light))',
    ctas: [
      { label: 'See My Work', href: '/webdesign', primary: true },
      { label: 'Start a Project', href: '/webdesign/enquire', primary: false },
    ],
    features: ['Custom designs', 'Mobile-first', 'SEO optimised', 'Global clients'],
    emoji: '💻',
  },
]

const TESTIMONIALS = [
  {
    quote: 'The custom bag was exactly what I described — stunning quality and the colours were absolutely perfect.',
    author: 'Thandi M.',
    detail: 'Custom crochet commission',
    rating: 5,
    pillar: 'crochet',
  },
  {
    quote: 'My portraits came out better than I ever imagined. She captured exactly the vibe I was going for. Worth every cent.',
    author: 'Lerato K.',
    detail: 'Portrait session',
    rating: 5,
    pillar: 'photography',
  },
  {
    quote: 'She built my entire online store in two weeks. Beautiful, fast, and exactly what my brand needed. Sales went up immediately.',
    author: 'Amirah S.',
    detail: 'E-commerce website',
    rating: 5,
    pillar: 'webdesign',
  },
  {
    quote: 'Every stitch is made with such care. My baby blanket is already a family heirloom. I cry every time I look at it.',
    author: 'Sarah N.',
    detail: 'Custom baby blanket',
    rating: 5,
    pillar: 'crochet',
  },
  {
    quote: 'Professional, creative, and so easy to work with. The family photos are absolutely gorgeous.',
    author: 'The Dlamini Family',
    detail: 'Family photoshoot',
    rating: 5,
    pillar: 'photography',
  },
  {
    quote: 'My portfolio site gets compliments from every client. I\'ve had more enquiries since launch than in the whole year before.',
    author: 'Yusuf A.',
    detail: 'Portfolio website',
    rating: 5,
    pillar: 'webdesign',
  },
]

const PILLAR_COLORS: Record<string, string> = {
  crochet: 'var(--color-crochet)',
  photography: 'var(--color-photography)',
  webdesign: 'var(--color-webdesign)',
}

const STATS = [
  { value: '200+', label: 'Happy customers' },
  { value: '3', label: 'Creative services' },
  { value: '5★', label: 'Average rating' },
  { value: '🌍', label: 'Serving worldwide' },
]

// ── Page ───────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          padding: '8rem 1.5rem 5rem',
        }}
      >
        {/* Ambient orbs */}
        <div
          style={{
            position: 'absolute',
            top: '15%',
            left: '10%',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(224,122,95,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '30%',
            right: '5%',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(61,165,138,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '40%',
            width: 350,
            height: 350,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.09) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
          {/* Tag */}
          <div
            className="animate-fade-up"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(212,168,83,0.1)',
              border: '1px solid rgba(212,168,83,0.25)',
              borderRadius: 'var(--radius-full)',
              padding: '0.4rem 1.1rem',
              marginBottom: '1.75rem',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
            }}
          >
            <Sparkles size={12} />
            BYM Studio — BokasYarnMarket Studio
          </div>

          {/* Headline */}
          <h1
            className="font-serif animate-fade-up delay-100"
            style={{
              fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
              fontWeight: 700,
              lineHeight: 1.08,
              marginBottom: '1.5rem',
              maxWidth: 900,
              margin: '0 auto 1.5rem',
            }}
          >
            Crafted with Love.
            <br />
            <span className="text-gradient-crochet">Crochet</span>{' · '}
            <span className="text-gradient-photo">Photography</span>
            <br />
            <span className="text-gradient-web">Web Design</span>.
          </h1>

          {/* Subtitle */}
          <p
            className="animate-fade-up delay-200"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
              color: 'var(--color-text-secondary)',
              maxWidth: 600,
              margin: '0 auto 2.5rem',
              lineHeight: 1.7,
            }}
          >
            One passionate studio. Three creative services. Whether you want a handcrafted crochet piece,
            stunning portrait photos, or a website that wows — I've got you.
          </p>

          {/* CTA buttons */}
          <div
            className="animate-fade-up delay-300"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              justifyContent: 'center',
              marginBottom: '4rem',
            }}
          >
            <Link href="/crochet" className="btn btn-primary btn-lg">
              <Scissors size={18} /> Shop Crochet
            </Link>
            <Link href="/photography" className="btn btn-photo btn-lg">
              <Camera size={18} /> Book a Shoot
            </Link>
            <Link href="/webdesign" className="btn btn-web btn-lg">
              <Monitor size={18} /> Get a Website
            </Link>
          </div>

          {/* Stats row */}
          <div
            className="animate-fade-up delay-400"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '2.5rem',
            }}
          >
            {STATS.map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div
                  className="font-serif"
                  style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text-primary)' }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Three Pillars ──────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>
              What I Do
            </span>
            <h2 className="section-title font-serif">Three Ways I Can Help You</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Each service is crafted with the same dedication to quality and attention to detail.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {PILLARS.map((pillar, i) => (
              <div
                key={pillar.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '2rem',
                  alignItems: 'center',
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-2xl)',
                  padding: '2.5rem',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                }}
              >
                {/* Background glow */}
                <div
                  style={{
                    position: 'absolute',
                    top: i % 2 === 0 ? -60 : 'auto',
                    bottom: i % 2 !== 0 ? -60 : 'auto',
                    right: -60,
                    width: 250,
                    height: 250,
                    borderRadius: '50%',
                    background: `radial-gradient(circle, ${pillar.colorDim} 0%, transparent 70%)`,
                    pointerEvents: 'none',
                  }}
                />

                {/* Content */}
                <div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 56,
                      height: 56,
                      borderRadius: 'var(--radius-lg)',
                      background: pillar.colorDim,
                      color: pillar.color,
                      marginBottom: '1.25rem',
                    }}
                  >
                    {pillar.icon}
                  </div>
                  <div style={{ color: pillar.color, fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    {pillar.tagline}
                  </div>
                  <h3 className="font-serif" style={{ fontSize: '1.75rem', marginBottom: '0.85rem' }}>
                    {pillar.label}
                  </h3>
                  <p style={{ lineHeight: 1.7, marginBottom: '1.5rem' }}>
                    {pillar.description}
                  </p>

                  {/* Features list */}
                  <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.75rem', listStyle: 'none' }}>
                    {pillar.features.map((f) => (
                      <li
                        key={f}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          fontSize: '0.8rem',
                          color: 'var(--color-text-secondary)',
                          background: pillar.colorDim,
                          padding: '0.3rem 0.75rem',
                          borderRadius: 'var(--radius-full)',
                        }}
                      >
                        <Check size={11} style={{ color: pillar.color }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA buttons */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {pillar.ctas.map((cta) => (
                      <Link
                        key={cta.href}
                        href={cta.href}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          padding: cta.primary ? '0.65rem 1.5rem' : '0.65rem 1.25rem',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          background: cta.primary ? pillar.gradient : 'transparent',
                          color: cta.primary ? '#fff' : pillar.color,
                          border: cta.primary ? 'none' : `1px solid ${pillar.color}44`,
                          textDecoration: 'none',
                          transition: 'all 0.2s',
                        }}
                      >
                        {cta.label}
                        <ArrowRight size={14} />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Emoji deco */}
                <div
                  style={{
                    fontSize: 'clamp(6rem, 12vw, 10rem)',
                    textAlign: 'center',
                    opacity: 0.15,
                    userSelect: 'none',
                    pointerEvents: 'none',
                    filter: 'grayscale(0.3)',
                  }}
                >
                  {pillar.emoji}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>
              The Process
            </span>
            <h2 className="section-title font-serif">Simple as 1, 2, 3</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Getting started with BYM Studio is easy — no matter which service you choose.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              {
                step: '01',
                title: 'Choose Your Service',
                description: 'Browse crochet, photography, or web design — or mix and match for multiple needs.',
                icon: <Sparkles size={20} />,
                color: 'var(--color-gold)',
              },
              {
                step: '02',
                title: 'Share Your Vision',
                description: 'Fill in a quick form, describe what you want, and attach any inspiration images.',
                icon: <Heart size={20} />,
                color: 'var(--color-crochet)',
              },
              {
                step: '03',
                title: 'Get It Done',
                description: "I'll deliver with care and quality — and keep you updated every step of the way.",
                icon: <Zap size={20} />,
                color: 'var(--color-photography)',
              },
            ].map((step) => (
              <div
                key={step.step}
                className="card"
                style={{ padding: '2rem', position: 'relative' }}
              >
                <div
                  style={{
                    fontSize: '4rem',
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.04)',
                    fontFamily: 'var(--font-serif)',
                    lineHeight: 1,
                    marginBottom: '-1rem',
                  }}
                >
                  {step.step}
                </div>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 'var(--radius-lg)',
                    background: `${step.color}18`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: step.color,
                    marginBottom: '1rem',
                  }}
                >
                  {step.icon}
                </div>
                <h3 className="font-serif" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>
              Client Love
            </span>
            <h2 className="section-title font-serif">What People Are Saying</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Real words from real customers across all three services.
            </p>
          </div>

          <div className="grid-auto-fill">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.author}
                className="card"
                style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                {/* Stars */}
                <div className="stars">{'★'.repeat(t.rating)}</div>

                {/* Quote */}
                <p
                  className="font-serif"
                  style={{
                    fontSize: '1.05rem',
                    color: 'var(--color-text-primary)',
                    lineHeight: 1.6,
                    fontStyle: 'italic',
                    flex: 1,
                  }}
                >
                  "{t.quote}"
                </p>

                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>
                      {t.author}
                    </div>
                    <div style={{ fontSize: '0.775rem', color: 'var(--color-text-muted)', marginTop: '0.15rem' }}>
                      {t.detail}
                    </div>
                  </div>
                  <div
                    className="badge"
                    style={{
                      background: `${PILLAR_COLORS[t.pillar]}18`,
                      color: PILLAR_COLORS[t.pillar],
                      fontSize: '0.7rem',
                    }}
                  >
                    {t.pillar === 'webdesign' ? 'Web Design' : t.pillar.charAt(0).toUpperCase() + t.pillar.slice(1)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────── */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <div
            style={{
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-2xl)',
              padding: 'clamp(2.5rem, 6vw, 5rem)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Ambient orbs */}
            <div style={{ position: 'absolute', top: -80, left: -80, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(224,122,95,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -80, right: -80, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative' }}>
              <span
                className="font-hand"
                style={{ fontSize: '1.5rem', color: 'var(--color-gold)', display: 'block', marginBottom: '0.75rem' }}
              >
                Let's create something beautiful
              </span>
              <h2 className="font-serif" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', marginBottom: '1.25rem' }}>
                Ready to Get Started?
              </h2>
              <p style={{ maxWidth: 500, margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
                Whether it's a one-of-a-kind crochet piece, unforgettable photos, or a website that
                represents your brand perfectly — I'm here for it.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                <Link href="/contact" className="btn btn-gold btn-lg">
                  Get in Touch <ArrowRight size={18} />
                </Link>
                <Link href="/gallery" className="btn btn-ghost btn-lg">
                  Browse the Gallery
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
