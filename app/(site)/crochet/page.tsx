import type { Metadata } from 'next'
import Link from 'next/link'
import { Scissors, ShoppingBag, Wand2, Check, ArrowRight, Clock, Star, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Crochet Studio',
  description:
    'Shop handcrafted crochet pieces or commission a fully custom creation. BYM Studio makes bags, blankets, tops, home décor, and more — all by hand with love.',
}

const CATEGORIES = [
  { label: 'Bags & Purses', emoji: '👜', count: 24 },
  { label: 'Blankets', emoji: '🛏️', count: 18 },
  { label: 'Tops & Cardigans', emoji: '👗', count: 15 },
  { label: 'Home Décor', emoji: '🏡', count: 21 },
  { label: 'Baby Items', emoji: '🍼', count: 12 },
  { label: 'Accessories', emoji: '🎀', count: 30 },
]

const CUSTOM_STEPS = [
  { step: '01', title: 'Choose Your Piece', desc: 'Tell me what type of crochet item you have in mind — bag, blanket, top, and more.' },
  { step: '02', title: 'Pick Style & Colour', desc: 'Select your stitch style, colour palette, and any special details you love.' },
  { step: '03', title: 'Share Your Vision', desc: 'Upload inspiration images or sketch your idea. The more detail, the better!' },
  { step: '04', title: 'Review & Confirm', desc: 'I\'ll send you a quote within 48 hours. Once confirmed, crafting begins.' },
  { step: '05', title: 'Track Progress', desc: 'Follow your order from production to your doorstep in your personal dashboard.' },
  { step: '06', title: 'Receive Your Piece', desc: 'Your one-of-a-kind crochet creation arrives, wrapped with love.' },
]

const HIGHLIGHTS = [
  { icon: <Heart size={20} />, label: 'Made with Love', desc: 'Every piece is crafted by hand with genuine care and attention.' },
  { icon: <Star size={20} />, label: 'Premium Quality', desc: 'Only the best yarns and materials go into every creation.' },
  { icon: <Clock size={20} />, label: 'Timely Delivery', desc: 'Regular progress updates and honest turnaround timelines.' },
  { icon: <Check size={20} />, label: 'Custom to You', desc: 'No two pieces are the same — yours is truly unique.' },
]

export default function CrochetPage() {
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
        <div style={{ position: 'absolute', top: -100, right: -100, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(224,122,95,0.12) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'var(--color-crochet-dim)',
                border: '1px solid rgba(224,122,95,0.25)',
                borderRadius: 'var(--radius-full)',
                padding: '0.4rem 1.1rem',
                marginBottom: '1.5rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-crochet)',
              }}
            >
              <Scissors size={12} /> Crochet Studio
            </div>
            <h1
              className="font-serif"
              style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)', marginBottom: '1.25rem', lineHeight: 1.1 }}
            >
              Handcrafted Crochet,{' '}
              <span className="text-gradient-crochet">Made for You</span>
            </h1>
            <p style={{ lineHeight: 1.75, marginBottom: '2rem', fontSize: '1.05rem' }}>
              Shop ready-made pieces from my collection, or commission something entirely unique. From cosy
              blankets to stylish bags — every stitch is made with love and the finest quality yarns.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Link href="/crochet/shop" className="btn btn-primary btn-lg">
                <ShoppingBag size={18} /> Shop the Collection
              </Link>
              <Link
                href="/crochet/design"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 1.75rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  border: '1px solid rgba(224,122,95,0.4)',
                  color: 'var(--color-crochet)',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
              >
                <Wand2 size={18} /> Design Your Own
              </Link>
            </div>
          </div>

          {/* Emoji grid decoration */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
              maxWidth: 360,
              margin: '0 auto',
            }}
          >
            {['🧶', '👜', '🛏️', '👗', '🏡', '🎀'].map((emoji, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  aspectRatio: '1',
                  transition: 'transform 0.3s',
                  animationDelay: `${i * 100}ms`,
                }}
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What I Make */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title font-serif">What I Make</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Browse ready-made pieces across all categories — or request anything custom.
            </p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.label}
                href="/crochet/shop"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1.5rem 1rem',
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  textDecoration: 'none',
                  transition: 'all 0.25s',
                  textAlign: 'center',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(224,122,95,0.4)'
                  e.currentTarget.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)'
                  e.currentTarget.style.transform = 'none'
                }}
              >
                <span style={{ fontSize: '2.25rem' }}>{cat.emoji}</span>
                <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-text-primary)' }}>
                  {cat.label}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  {cat.count} pieces
                </span>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link href="/crochet/shop" className="btn btn-primary">
              View Full Shop <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title font-serif">Why Choose BYM Crochet?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {HIGHLIGHTS.map((h) => (
              <div key={h.label} className="card" style={{ padding: '1.75rem' }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--color-crochet-dim)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-crochet)',
                    marginBottom: '1rem',
                  }}
                >
                  {h.icon}
                </div>
                <h3 className="font-serif" style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>
                  {h.label}
                </h3>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Order Process */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <span className="badge badge-crochet" style={{ marginBottom: '1rem' }}>Custom Orders</span>
            <h2 className="section-title font-serif">How Custom Orders Work</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Six simple steps from your idea to your beautiful finished piece.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
            {CUSTOM_STEPS.map((s) => (
              <div
                key={s.step}
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '1.5rem',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '1.25rem',
                    right: '1.25rem',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'rgba(224,122,95,0.15)',
                    fontFamily: 'var(--font-serif)',
                  }}
                >
                  {s.step}
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--color-text-primary)' }}>
                  {s.title}
                </h4>
                <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link href="/crochet/design" className="btn btn-primary btn-lg">
              <Wand2 size={18} /> Start Your Custom Order
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
