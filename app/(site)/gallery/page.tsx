'use client'

import { useState } from 'react'
import { ImageIcon, Scissors, Camera, Monitor } from 'lucide-react'

type Filter = 'all' | 'crochet' | 'photography' | 'webdesign'

const ITEMS = [
  { id: '1', pillar: 'crochet',     title: 'Sage Green Tote',         emoji: '👜', tags: ['bags', 'sage'] },
  { id: '2', pillar: 'photography', title: 'Golden Hour Portrait',     emoji: '🌅', tags: ['portrait', 'outdoor'] },
  { id: '3', pillar: 'webdesign',   title: 'Bloom & Co. Website',      emoji: '🌸', tags: ['business', 'florist'] },
  { id: '4', pillar: 'crochet',     title: 'Rainbow Baby Blanket',     emoji: '🌈', tags: ['baby', 'blanket'] },
  { id: '5', pillar: 'photography', title: 'Family at Sunset',         emoji: '👨‍👩‍👧', tags: ['family', 'outdoor'] },
  { id: '6', pillar: 'webdesign',   title: 'TechStart Africa',         emoji: '💡', tags: ['saas', 'startup'] },
  { id: '7', pillar: 'crochet',     title: 'Chunky Bucket Bag',        emoji: '🎒', tags: ['bags', 'chunky'] },
  { id: '8', pillar: 'photography', title: 'Maternity Glow Session',   emoji: '🌸', tags: ['maternity', 'studio'] },
  { id: '9', pillar: 'webdesign',   title: 'Mama\'s Kitchen Store',    emoji: '🍲', tags: ['ecommerce', 'food'] },
  { id: '10', pillar: 'crochet',    title: 'Granny Square Cardigan',   emoji: '👗', tags: ['tops', 'granny'] },
  { id: '11', pillar: 'photography',title: 'Couples Session',          emoji: '💑', tags: ['couples', 'outdoor'] },
  { id: '12', pillar: 'webdesign',  title: 'Lebo Photography Site',    emoji: '📸', tags: ['portfolio', 'booking'] },
  { id: '13', pillar: 'crochet',    title: 'Plant Hanger Set',         emoji: '🌿', tags: ['home', 'decor'] },
  { id: '14', pillar: 'photography',title: 'Product Shoot — Jewellery', emoji: '💎', tags: ['commercial', 'product'] },
  { id: '15', pillar: 'crochet',    title: 'Boho Wall Hanging',         emoji: '🏡', tags: ['home', 'wall art'] },
]

const FILTER_OPTIONS: { value: Filter; label: string; icon: React.ReactNode; color: string }[] = [
  { value: 'all',         label: 'All Work',    icon: <ImageIcon size={14} />,  color: 'var(--color-gold)' },
  { value: 'crochet',     label: 'Crochet',     icon: <Scissors size={14} />,   color: 'var(--color-crochet)' },
  { value: 'photography', label: 'Photography', icon: <Camera size={14} />,     color: 'var(--color-photography)' },
  { value: 'webdesign',   label: 'Web Design',  icon: <Monitor size={14} />,    color: 'var(--color-webdesign)' },
]

const PILLAR_COLOR: Record<string, string> = {
  crochet:     'var(--color-crochet)',
  photography: 'var(--color-photography)',
  webdesign:   'var(--color-webdesign)',
}
const PILLAR_DIM: Record<string, string> = {
  crochet:     'var(--color-crochet-dim)',
  photography: 'var(--color-photography-dim)',
  webdesign:   'var(--color-webdesign-dim)',
}
const PILLAR_LABEL: Record<string, string> = {
  crochet:     'Crochet',
  photography: 'Photography',
  webdesign:   'Web Design',
}

export default function GalleryPage() {
  const [filter, setFilter] = useState<Filter>('all')

  const filtered = filter === 'all' ? ITEMS : ITEMS.filter((i) => i.pillar === filter)

  return (
    <>
      {/* Header */}
      <section style={{ paddingTop: '8rem', paddingBottom: '3rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', background: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)', textAlign: 'center' }}>
        <div className="container">
          <span className="badge badge-gold" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            <ImageIcon size={11} style={{ marginRight: '0.35rem' }} /> Portfolio Gallery
          </span>
          <h1 className="font-serif" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '0.75rem' }}>
            Our Creative Work
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: 480, margin: '0 auto' }}>
            A look at crochet pieces, photography sessions, and website projects from BYM Studio.
          </p>
        </div>
      </section>

      {/* Filter tabs */}
      <div style={{ background: 'var(--color-bg-secondary)', padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)', position: 'sticky', top: '4.5rem', zIndex: 50, backdropFilter: 'blur(16px)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {FILTER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilter(opt.value)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.5rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  border: '1px solid',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  borderColor: filter === opt.value ? opt.color : 'var(--color-border)',
                  background: filter === opt.value ? `${opt.color}18` : 'transparent',
                  color: filter === opt.value ? opt.color : 'var(--color-text-secondary)',
                }}
              >
                {opt.icon} {opt.label}
                <span style={{ marginLeft: '0.25rem', fontSize: '0.75rem', opacity: 0.7 }}>
                  ({opt.value === 'all' ? ITEMS.length : ITEMS.filter((i) => i.pillar === opt.value).length})
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery grid */}
      <section style={{ padding: '2.5rem 1.5rem 5rem' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {filtered.map((item, i) => (
              <div
                key={item.id}
                style={{
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  aspectRatio: i % 5 === 0 ? '4/5' : '1',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = `0 12px 40px ${PILLAR_DIM[item.pillar]}`
                  e.currentTarget.style.borderColor = `${PILLAR_COLOR[item.pillar]}44`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = ''
                  e.currentTarget.style.boxShadow = ''
                  e.currentTarget.style.borderColor = 'var(--color-border)'
                }}
              >
                {/* Image placeholder */}
                <div
                  style={{
                    flex: 1,
                    background: `linear-gradient(135deg, ${PILLAR_DIM[item.pillar]}, rgba(255,255,255,0.01))`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3.5rem',
                  }}
                >
                  {item.emoji}
                </div>

                {/* Caption */}
                <div style={{ padding: '0.85rem 1rem', borderTop: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--color-text-primary)' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '0.1rem' }}>
                      {item.tags.join(' · ')}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: PILLAR_COLOR[item.pillar],
                      background: PILLAR_DIM[item.pillar],
                      padding: '0.2rem 0.6rem',
                      borderRadius: 'var(--radius-full)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {PILLAR_LABEL[item.pillar]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
