'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, SlidersHorizontal, Star, ArrowRight, Scissors } from 'lucide-react'

type Category = 'all' | 'bags' | 'blankets' | 'tops' | 'home_decor' | 'baby' | 'accessories'

const CATEGORIES: { value: Category; label: string; emoji: string }[] = [
  { value: 'all',         label: 'All Pieces',   emoji: '✨' },
  { value: 'bags',        label: 'Bags',         emoji: '👜' },
  { value: 'blankets',    label: 'Blankets',     emoji: '🛏️' },
  { value: 'tops',        label: 'Tops',         emoji: '👗' },
  { value: 'home_decor',  label: 'Home Décor',   emoji: '🏡' },
  { value: 'baby',        label: 'Baby',         emoji: '🍼' },
  { value: 'accessories', label: 'Accessories',  emoji: '🎀' },
]

// Static showcase products (would come from Firestore in production)
const PRODUCTS = [
  { id: '1', name: 'Boho Tote Bag', category: 'bags',        price: 450,  rating: 5, reviews: 24, tags: ['bohemian', 'everyday'], emoji: '👜' },
  { id: '2', name: 'Rainbow Throw Blanket', category: 'blankets',    price: 780,  rating: 5, reviews: 18, tags: ['colourful', 'cosy'],     emoji: '🌈' },
  { id: '3', name: 'Crochet Crop Top', category: 'tops',        price: 380,  rating: 4, reviews: 11, tags: ['summer', 'festival'],   emoji: '👗' },
  { id: '4', name: 'Plant Pot Hanger', category: 'home_decor',  price: 220,  rating: 5, reviews: 31, tags: ['boho', 'decor'],         emoji: '🌿' },
  { id: '5', name: 'Baby Bunny Set', category: 'baby',        price: 320,  rating: 5, reviews: 42, tags: ['gift', 'newborn'],       emoji: '🐰' },
  { id: '6', name: 'Mini Coin Purse', category: 'accessories', price: 150,  rating: 4, reviews: 19, tags: ['compact', 'cute'],       emoji: '👛' },
  { id: '7', name: 'Chunky Bucket Bag', category: 'bags',        price: 590,  rating: 5, reviews: 8,  tags: ['statement', 'chunky'],  emoji: '🎒' },
  { id: '8', name: 'Neutral Baby Blanket', category: 'baby',        price: 420,  rating: 5, reviews: 55, tags: ['neutral', 'gift'],       emoji: '🍼' },
  { id: '9', name: 'Macramé Wall Art', category: 'home_decor',  price: 340,  rating: 4, reviews: 14, tags: ['wall art', 'boho'],      emoji: '🏡' },
  { id: '10', name: 'Open-Knit Cardigan', category: 'tops',        price: 520,  rating: 5, reviews: 7,  tags: ['layering', 'casual'],   emoji: '🧥' },
  { id: '11', name: 'Beaded Headband', category: 'accessories', price: 180,  rating: 4, reviews: 22, tags: ['summer', 'beach'],       emoji: '🎀' },
  { id: '12', name: 'XL Comfort Blanket', category: 'blankets',    price: 950,  rating: 5, reviews: 9,  tags: ['luxury', 'large'],       emoji: '🛏️' },
]

const SORT_OPTIONS = [
  { value: 'popular',   label: 'Most Popular' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'newest',    label: 'Newest First' },
]

export default function CrochetShopPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [sortBy, setSortBy] = useState('popular')

  const filtered = PRODUCTS.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  ).sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price
    if (sortBy === 'price_desc') return b.price - a.price
    if (sortBy === 'popular') return b.reviews - a.reviews
    return 0
  })

  return (
    <>
      {/* Header */}
      <section
        style={{
          paddingTop: '8rem',
          paddingBottom: '3rem',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          background: 'var(--color-bg-secondary)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--color-crochet)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                <Scissors size={14} /> Crochet Studio
              </div>
              <h1 className="font-serif" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', marginBottom: '0.5rem' }}>
                The Collection
              </h1>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem' }}>
                {PRODUCTS.length} handcrafted pieces, each made with love.
              </p>
            </div>
            <Link href="/crochet/design" className="btn btn-primary">
              <Scissors size={15} /> Custom Order
            </Link>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section style={{ position: 'sticky', top: '4.5rem', zIndex: 50, background: 'rgba(9,12,20,0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--color-border)', padding: '1rem 1.5rem' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', overflowX: 'auto', scrollbarWidth: 'none' }}>
            <SlidersHorizontal size={16} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
            <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0.4rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    border: '1px solid',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                    borderColor: activeCategory === cat.value ? 'var(--color-crochet)' : 'var(--color-border)',
                    background: activeCategory === cat.value ? 'var(--color-crochet-dim)' : 'transparent',
                    color: activeCategory === cat.value ? 'var(--color-crochet)' : 'var(--color-text-secondary)',
                  }}
                >
                  {cat.emoji} {cat.label}
                </button>
              ))}
            </div>
            <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input"
                style={{ padding: '0.4rem 0.75rem', fontSize: '0.82rem', width: 'auto' }}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section style={{ padding: '2.5rem 1.5rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {filtered.map((product) => (
              <div
                key={product.id}
                className="card"
                style={{ overflow: 'hidden', cursor: 'pointer' }}
              >
                {/* Product image placeholder */}
                <div
                  style={{
                    background: 'linear-gradient(135deg, var(--color-crochet-dim) 0%, rgba(212,168,83,0.08) 100%)',
                    aspectRatio: '1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4rem',
                    borderBottom: '1px solid var(--color-border)',
                  }}
                >
                  {product.emoji}
                </div>

                <div style={{ padding: '1.25rem' }}>
                  {/* Tags */}
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '0.68rem',
                          color: 'var(--color-text-muted)',
                          background: 'rgba(255,255,255,0.04)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: 'var(--radius-full)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--color-text-primary)', marginBottom: '0.35rem' }}>
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.85rem' }}>
                    <div className="stars" style={{ fontSize: '0.75rem' }}>
                      {'★'.repeat(product.rating)}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Price and CTA */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        R{product.price.toLocaleString()}
                      </span>
                    </div>
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        // Navigate to contact/enquire for this product
                        window.location.href = `/contact?product=${encodeURIComponent(product.name)}`
                      }}
                    >
                      <ShoppingBag size={13} /> Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '5rem 1rem', color: 'var(--color-text-muted)' }}>
              No pieces found in this category yet.
            </div>
          )}

          {/* Custom order CTA */}
          <div
            style={{
              marginTop: '3rem',
              background: 'var(--color-bg-card)',
              border: '1px solid rgba(224,122,95,0.25)',
              borderRadius: 'var(--radius-2xl)',
              padding: '2.5rem',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🧶</div>
            <h3 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>
              Don't See What You're Looking For?
            </h3>
            <p style={{ marginBottom: '1.5rem', maxWidth: 480, margin: '0 auto 1.5rem' }}>
              Every piece can be made in custom colours, sizes, and styles. Commission your perfect
              creation using the design wizard.
            </p>
            <Link href="/crochet/design" className="btn btn-primary">
              Design Your Own <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
