import type { Metadata } from 'next'
import Link from 'next/link'
import { Heart, Scissors, Camera, Monitor, ArrowRight, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet the creative behind BYM Studio — a crochet artist, photographer, and web designer sharing her passion with the world.',
}

const VALUES = [
  { icon: '🧶', title: 'Handcrafted with Love', desc: 'Every crochet piece is made stitch by stitch, with genuine care for the person receiving it.' },
  { icon: '📷', title: 'Authentic Storytelling', desc: 'My photography captures real moments and real emotion — not just poses, but personality.' },
  { icon: '💻', title: 'Purpose-Built Design', desc: 'Websites I build have a goal: to represent your brand beautifully and convert visitors into clients.' },
  { icon: '🌍', title: 'Global, Local Heart', desc: 'Based in South Africa, serving clients worldwide. My work carries its roots wherever it goes.' },
]

const TIMELINE = [
  { year: '2019', title: 'The First Stitch', desc: 'What started as a hobby turned into something special — I crocheted my first bag and people wanted one too.' },
  { year: '2020', title: 'The Camera Joined In', desc: 'I picked up a camera and never looked back. Shooting portraits for friends grew into professional sessions.' },
  { year: '2022', title: 'Building the Web', desc: 'I taught myself web development and built my first client site. The response blew me away.' },
  { year: '2024', title: 'BYM Studio is Born', desc: 'Three passions, one studio. BokasYarnMarket evolved into BYM Studio — crochet, photography, and web design, all under one roof.' },
]

export default function AboutPage() {
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
        }}
      >
        <div style={{ position: 'absolute', top: -80, right: -80, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,168,83,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '4rem', alignItems: 'center' }}>
          <div>
            <span
              className="font-hand"
              style={{ fontSize: '1.5rem', color: 'var(--color-gold)', display: 'block', marginBottom: '0.75rem' }}
            >
              Hey, I'm Boka 👋
            </span>
            <h1
              className="font-serif"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1.25rem', lineHeight: 1.1 }}
            >
              The Creative Behind{' '}
              <span className="text-gradient-gold">BYM Studio</span>
            </h1>
            <p style={{ lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1.25rem' }}>
              I'm a South African crochet artist, photographer, and web designer who turned three passions
              into one studio. I believe that beautiful things — whether stitched by hand, captured through
              a lens, or built in code — have the power to change how people feel.
            </p>
            <p style={{ lineHeight: 1.8, marginBottom: '2rem' }}>
              BYM Studio started as BokasYarnMarket in 2019 when I made my first crochet bag and someone
              asked to buy it. Since then, it's grown into a full creative studio serving clients across
              South Africa and around the world.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn btn-gold">
                <Heart size={16} /> Get in Touch
              </Link>
              <Link href="/gallery" className="btn btn-ghost">
                See My Work <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Avatar placeholder */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
              style={{
                width: 'min(320px, 100%)',
                aspectRatio: '4/5',
                borderRadius: 'var(--radius-2xl)',
                background: 'linear-gradient(135deg, var(--color-crochet-dim), var(--color-photography-dim), var(--color-webdesign-dim))',
                border: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ fontSize: '6rem' }}>👩🏾‍🎨</div>
              <div style={{ textAlign: 'center' }}>
                <div className="font-serif" style={{ fontSize: '1.25rem', fontWeight: 700 }}>Boka</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>BYM Studio Founder</div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {[<Scissors key="s" size={16} style={{ color: 'var(--color-crochet)' }} />, <Camera key="c" size={16} style={{ color: 'var(--color-photography)' }} />, <Monitor key="m" size={16} style={{ color: 'var(--color-webdesign)' }} />].map((icon, i) => (
                  <div
                    key={i}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: 'var(--color-bg-card)',
                      border: '1px solid var(--color-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>
              <Sparkles size={11} style={{ marginRight: '0.35rem' }} /> What I Stand For
            </span>
            <h2 className="section-title font-serif">The Values Behind the Work</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '1.25rem' }}>
            {VALUES.map((v) => (
              <div key={v.title} className="card" style={{ padding: '1.75rem' }}>
                <div style={{ fontSize: '2.25rem', marginBottom: '0.85rem' }}>{v.icon}</div>
                <h3 className="font-serif" style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>{v.title}</h3>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container-narrow">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 className="section-title font-serif">The BYM Story</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>How three passions became one studio.</p>
          </div>
          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: 'calc(50% - 1px)', top: 0, bottom: 0, width: 2, background: 'linear-gradient(to bottom, var(--color-crochet), var(--color-photography), var(--color-webdesign))', opacity: 0.3 }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {TIMELINE.map((item, i) => (
                <div
                  key={item.year}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto 1fr',
                    gap: '2rem',
                    alignItems: 'center',
                  }}
                >
                  {/* Left side (alternating) */}
                  {i % 2 === 0 ? (
                    <>
                      <div className="card" style={{ padding: '1.5rem' }}>
                        <h3 className="font-serif" style={{ fontSize: '1.15rem', marginBottom: '0.4rem' }}>{item.title}</h3>
                        <p style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>{item.desc}</p>
                      </div>
                      <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--color-bg-card)', border: '3px solid var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span className="font-serif" style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-gold)' }}>{item.year}</span>
                      </div>
                      <div />
                    </>
                  ) : (
                    <>
                      <div />
                      <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--color-bg-card)', border: '3px solid var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span className="font-serif" style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-gold)' }}>{item.year}</span>
                      </div>
                      <div className="card" style={{ padding: '1.5rem' }}>
                        <h3 className="font-serif" style={{ fontSize: '1.15rem', marginBottom: '0.4rem' }}>{item.title}</h3>
                        <p style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>{item.desc}</p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm" style={{ padding: '3rem 1.5rem', background: 'var(--color-bg-secondary)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="font-serif" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>
            Let's Create Something Together
          </h2>
          <p style={{ maxWidth: 460, margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Whether it's crochet, photography, or a website — I'm ready when you are.
          </p>
          <Link href="/contact" className="btn btn-gold btn-lg">
            <Heart size={17} /> Let's Work Together
          </Link>
        </div>
      </section>
    </>
  )
}
