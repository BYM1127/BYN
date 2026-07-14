import type { Metadata } from 'next'
import Link from 'next/link'
import { Camera, Clock, ImageIcon, Star, Check, ArrowRight, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Photography',
  description:
    'Professional photography sessions with full editing. Portraits, family, maternity, events, and commercial shoots. Book your session with BYM Studio today.',
}

const PACKAGES = [
  {
    id: 'portrait',
    name: 'Portrait Session',
    emoji: '🌟',
    duration: 60,
    photos: 20,
    turnaround: 7,
    price: 800,
    popular: false,
    description: 'Perfect for individuals — headshots, personal branding, or just beautiful portraits that capture your personality.',
    includes: [
      '1-hour outdoor or studio session',
      '20 fully edited digital photos',
      '7-day turnaround',
      'Online gallery delivery',
      'Personal styling tips call',
    ],
  },
  {
    id: 'couples',
    name: 'Couples Session',
    emoji: '💑',
    duration: 90,
    photos: 30,
    turnaround: 7,
    price: 1200,
    popular: true,
    description: 'Celebrate your love story. Engagement shoots, anniversary sessions, or just because you\'re adorable together.',
    includes: [
      '90-minute outdoor session',
      '30 fully edited digital photos',
      '7-day turnaround',
      'Online gallery delivery',
      'Location scouting assistance',
      'Pre-shoot style consultation',
    ],
  },
  {
    id: 'family',
    name: 'Family Session',
    emoji: '👨‍👩‍👧‍👦',
    duration: 90,
    photos: 35,
    turnaround: 10,
    price: 1400,
    popular: false,
    description: 'Capture the chaos and the love. Family sessions at a comfortable pace, perfect for everyone from babies to grandparents.',
    includes: [
      '90-minute session',
      '35 fully edited digital photos',
      '10-day turnaround',
      'Online gallery delivery',
      'Kid-friendly pacing',
      'Multiple outfit changes welcome',
    ],
  },
  {
    id: 'maternity',
    name: 'Maternity Session',
    emoji: '🤰',
    duration: 75,
    photos: 25,
    turnaround: 7,
    price: 1100,
    popular: false,
    description: 'Honour this magical time. Soft, timeless maternity portraits that you\'ll treasure for a lifetime.',
    includes: [
      '75-minute session',
      '25 fully edited digital photos',
      '7-day turnaround',
      'Online gallery delivery',
      'Posing guidance throughout',
      'Partner or toddler included',
    ],
  },
  {
    id: 'event',
    name: 'Event Coverage',
    emoji: '🎉',
    duration: 240,
    photos: 80,
    turnaround: 14,
    price: 2800,
    popular: false,
    description: 'Birthdays, graduations, lobola, celebrations — full event coverage with documentary-style storytelling.',
    includes: [
      '4-hour event coverage',
      '80 fully edited digital photos',
      '14-day turnaround',
      'Online gallery delivery',
      'Second shooter (large events)',
      'Custom USB or digital delivery',
    ],
  },
  {
    id: 'commercial',
    name: 'Commercial / Product',
    emoji: '📦',
    duration: 180,
    photos: 40,
    turnaround: 10,
    price: 2200,
    popular: false,
    description: 'Product photography, brand content, and commercial shoots for businesses and entrepreneurs who want to stand out.',
    includes: [
      '3-hour studio session',
      '40 fully edited product / brand images',
      '10-day turnaround',
      'Web & print ready files',
      'Styling and props included',
      'Commercial usage license',
    ],
  },
]

const PROCESS = [
  { step: '01', title: 'Choose a Package', desc: 'Browse the session types and pick what fits best — or contact me to create a custom package.' },
  { step: '02', title: 'Book Your Date', desc: 'Fill out the booking form with your preferred dates and any special requests.' },
  { step: '03', title: 'Show Up & Shine', desc: 'I\'ll guide you through the whole session. Just be yourself — the magic happens naturally.' },
  { step: '04', title: 'Receive Your Gallery', desc: 'Your beautifully edited photos are delivered to your private online gallery within the agreed timeframe.' },
]

export default function PhotographyPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          position: 'relative',
          paddingTop: '9rem',
          paddingBottom: '5rem',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        <div style={{ position: 'absolute', top: -120, left: '20%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(61,165,138,0.1) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -80, right: '10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(61,165,138,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'var(--color-photography-dim)',
              border: '1px solid rgba(61,165,138,0.25)',
              borderRadius: 'var(--radius-full)',
              padding: '0.4rem 1.1rem',
              marginBottom: '1.5rem',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-photography)',
            }}
          >
            <Camera size={12} /> Photography
          </div>
          <h1
            className="font-serif"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', marginBottom: '1.25rem', lineHeight: 1.1 }}
          >
            Moments Worth{' '}
            <span className="text-gradient-photo">Keeping Forever</span>
          </h1>
          <p
            style={{
              lineHeight: 1.75,
              marginBottom: '2.5rem',
              fontSize: '1.1rem',
              maxWidth: 600,
              margin: '0 auto 2.5rem',
            }}
          >
            Professional photography sessions with full editing included. Every shot is crafted to make you
            look extraordinary — because you are.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/photography/book" className="btn btn-photo btn-lg">
              <Camera size={18} /> Book a Session
            </Link>
            <Link href="/gallery" className="btn btn-ghost btn-lg">
              <ImageIcon size={18} /> View Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-photo" style={{ marginBottom: '1rem' }}>
              Packages & Pricing
            </span>
            <h2 className="section-title font-serif">Session Packages</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              All prices in ZAR. Every package includes full professional editing.
            </p>
          </div>

          <div className="grid-auto-fill">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                style={{
                  background: 'var(--color-bg-card)',
                  border: `1px solid ${pkg.popular ? 'rgba(61,165,138,0.5)' : 'var(--color-border)'}`,
                  borderRadius: 'var(--radius-2xl)',
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                }}
              >
                {pkg.popular && (
                  <div
                    style={{
                      background: 'linear-gradient(135deg, var(--color-photography), var(--color-photography-light))',
                      color: '#fff',
                      textAlign: 'center',
                      padding: '0.4rem',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    <Sparkles size={11} style={{ marginRight: 4 }} />
                    Most Popular
                  </div>
                )}

                <div style={{ padding: '1.75rem' }}>
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div>
                      <span style={{ fontSize: '2rem' }}>{pkg.emoji}</span>
                      <h3 className="font-serif" style={{ fontSize: '1.25rem', marginTop: '0.4rem' }}>
                        {pkg.name}
                      </h3>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        R{pkg.price.toLocaleString()}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>per session</div>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {pkg.description}
                  </p>

                  {/* Quick stats */}
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                    {[
                      { icon: <Clock size={13} />, label: `${pkg.duration} min` },
                      { icon: <ImageIcon size={13} />, label: `${pkg.photos} photos` },
                      { icon: <Star size={13} />, label: `${pkg.turnaround} days` },
                    ].map((s) => (
                      <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--color-photography)', background: 'var(--color-photography-dim)', padding: '0.3rem 0.65rem', borderRadius: 'var(--radius-full)' }}>
                        {s.icon} {s.label}
                      </div>
                    ))}
                  </div>

                  {/* Includes */}
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {pkg.includes.map((item) => (
                      <li key={item} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                        <Check size={13} style={{ color: 'var(--color-photography)', flexShrink: 0, marginTop: '0.1rem' }} />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/photography/book?package=${pkg.id}`}
                    className="btn btn-photo"
                    style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}
                  >
                    Book This Session <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Custom package note */}
          <div
            style={{
              marginTop: '2rem',
              padding: '1.75rem 2rem',
              background: 'var(--color-bg-card)',
              border: '1px solid rgba(61,165,138,0.2)',
              borderRadius: 'var(--radius-xl)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
            }}
          >
            <div>
              <h3 style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.35rem' }}>
                Need Something Custom?
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                Have a specific vision? I can create a package tailored exactly to your needs.
              </p>
            </div>
            <Link href="/contact" className="btn btn-ghost">
              Let's Talk <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 className="section-title font-serif">How It Works</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              From booking to beautiful photos in four simple steps.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {PROCESS.map((p) => (
              <div key={p.step} className="card" style={{ padding: '1.75rem', position: 'relative' }}>
                <div style={{ fontSize: '3.5rem', fontWeight: 700, color: 'rgba(61,165,138,0.1)', fontFamily: 'var(--font-serif)', lineHeight: 1, marginBottom: '-0.5rem' }}>
                  {p.step}
                </div>
                <h3 className="font-serif" style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>{p.title}</h3>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-sm" style={{ padding: '3rem 1.5rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="font-serif" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>
            Ready to Book?
          </h2>
          <p style={{ maxWidth: 500, margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Availability is limited — reserve your session date today.
          </p>
          <Link href="/photography/book" className="btn btn-photo btn-lg">
            <Camera size={18} /> Book Your Session
          </Link>
        </div>
      </section>
    </>
  )
}
