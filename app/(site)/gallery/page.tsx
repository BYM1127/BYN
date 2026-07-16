'use client'

import { useState } from 'react'
import { ImageIcon, Scissors, Camera, Monitor } from 'lucide-react'

type Filter = 'all' | 'crochet' | 'photography' | 'webdesign'

const ITEMS = [
  { id: '1', pillar: 'crochet', title: 'Summer Boho Tote Bag', imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop', emoji: '👜', tags: ['bags', 'summer'] },
  { id: '2', pillar: 'photography', title: 'Golden Hour Portrait', imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop', emoji: '🌅', tags: ['portrait', 'outdoor'] },
  { id: '3', pillar: 'webdesign', title: 'BMZtrial1', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop', projectUrl: 'https://github.com/BYM1127/BMZtrial1', emoji: '🌸', tags: ['business', 'github'] },
  { id: '4', pillar: 'crochet', title: 'Chunky Hand-Knit Throw', imageUrl: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=600&auto=format&fit=crop', emoji: '🌈', tags: ['home', 'blanket'] },
  { id: '5', pillar: 'photography', title: 'Family at Sunset', imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop', emoji: '👨‍👩‍👧', tags: ['family', 'outdoor'] },
  { id: '6', pillar: 'webdesign', title: 'DkLC - Catering', imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=600&auto=format&fit=crop', projectUrl: 'https://github.com/BYM1127/DkLC', emoji: '🍲', tags: ['catering', 'github'] },
  { id: '7', pillar: 'crochet', title: 'Granny Square Crop Top', imageUrl: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=600&auto=format&fit=crop', emoji: '👗', tags: ['tops', 'vintage'] },
  { id: '8', pillar: 'photography', title: 'Maternity Glow Session', imageUrl: 'https://images.unsplash.com/photo-1519064438302-7634f1b40d6c?q=80&w=600&auto=format&fit=crop', emoji: '🤰', tags: ['maternity', 'studio'] },
  { id: '9', pillar: 'webdesign', title: 'IMELA-PROJECTS', imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600&auto=format&fit=crop', projectUrl: 'https://github.com/BYM1127/IMELA-PROJECTS', emoji: '💡', tags: ['electrical', 'solar'] },
  { id: '10', pillar: 'crochet', title: 'Plush Baby Bear Beanie', imageUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=600&auto=format&fit=crop', emoji: '🍼', tags: ['baby', 'beanie'] },
  { id: '11', pillar: 'photography', title: 'Event Coverage', imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop', emoji: '🎉', tags: ['events', 'coverage'] },
  { id: '12', pillar: 'crochet', title: 'Textured Throw Pillow', imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=600&auto=format&fit=crop', emoji: '🏡', tags: ['home', 'decor'] },
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
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))',
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
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {item.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '3.5rem' }}>{item.emoji}</div>
                  )}
                  {item.projectUrl && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', opacity: 0, transition: 'opacity 0.2s', cursor: 'pointer' }}
                         onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                         onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
                         onClick={(e) => { e.stopPropagation(); window.open(item.projectUrl, '_blank') }}
                    >
                      <span className="btn btn-web btn-sm">View on GitHub</span>
                    </div>
                  )}
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
