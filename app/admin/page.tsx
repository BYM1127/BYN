import Link from 'next/link'
import { Scissors, Camera, Monitor, Star, ArrowRight, TrendingUp, Clock } from 'lucide-react'

const STATS = [
  { label: 'Crochet Orders', value: '12', change: '+3 this week', color: 'var(--color-crochet)', icon: <Scissors size={18} />, href: '/admin/crochet' },
  { label: 'Photo Bookings', value: '5', change: '+1 this week', color: 'var(--color-photography)', icon: <Camera size={18} />, href: '/admin/photography' },
  { label: 'Web Enquiries', value: '8', change: '+2 this week', color: 'var(--color-webdesign)', icon: <Monitor size={18} />, href: '/admin/web' },
  { label: 'Pending Reviews', value: '3', change: 'Need moderation', color: 'var(--color-gold)', icon: <Star size={18} />, href: '/admin/reviews' },
]

const RECENT_ORDERS = [
  { id: '1', name: 'Custom Boho Bag', customer: 'Thandi M.', status: 'in_production', pillar: 'crochet', date: '2026-07-14' },
  { id: '2', name: 'Portrait Session', customer: 'Lerato K.', status: 'confirmed', pillar: 'photography', date: '2026-07-13' },
  { id: '3', name: 'Business Website', customer: 'Amirah S.', status: 'quoted', pillar: 'webdesign', date: '2026-07-12' },
  { id: '4', name: 'Baby Blanket', customer: 'Sarah N.', status: 'pending_review', pillar: 'crochet', date: '2026-07-12' },
  { id: '5', name: 'Family Session', customer: 'Dlamini Family', status: 'pending', pillar: 'photography', date: '2026-07-11' },
]

const PILLAR_COLOR: Record<string, string> = { crochet: 'var(--color-crochet)', photography: 'var(--color-photography)', webdesign: 'var(--color-webdesign)' }
const STATUS_LABEL: Record<string, string> = { in_production: 'In Production', confirmed: 'Confirmed', quoted: 'Quoted', pending_review: 'Pending Review', pending: 'Pending' }

export default function AdminDashboardPage() {
  return (
    <div style={{ padding: '2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 className="font-serif" style={{ fontSize: '2rem', marginBottom: '0.35rem' }}>Dashboard</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
          Welcome back! Here's what's happening at BYM Studio.
        </p>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {STATS.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            style={{ textDecoration: 'none' }}
          >
            <div
              className="card"
              style={{ padding: '1.5rem', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-lg)', background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>
                  {s.icon}
                </div>
                <ArrowRight size={16} style={{ color: 'var(--color-text-muted)' }} />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: s.color, fontFamily: 'var(--font-serif)', marginBottom: '0.25rem' }}>
                {s.value}
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>{s.label}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <TrendingUp size={11} />{s.change}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent activity */}
      <div>
        <h2 style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '1.25rem', color: 'var(--color-text-secondary)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Recent Orders
        </h2>
        <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
          {RECENT_ORDERS.map((o, i) => (
            <div
              key={o.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.25rem',
                borderBottom: i < RECENT_ORDERS.length - 1 ? '1px solid var(--color-border)' : 'none',
                flexWrap: 'wrap',
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: PILLAR_COLOR[o.pillar], flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 140 }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>{o.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{o.customer}</div>
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Clock size={11} />{o.date}
              </div>
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                background: `${PILLAR_COLOR[o.pillar]}18`,
                color: PILLAR_COLOR[o.pillar],
              }}>
                {STATUS_LABEL[o.status] ?? o.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div style={{ marginTop: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        {[
          { label: 'Manage Crochet Orders', href: '/admin/crochet', color: 'var(--color-crochet)' },
          { label: 'Photography Bookings', href: '/admin/photography', color: 'var(--color-photography)' },
          { label: 'Web Enquiries', href: '/admin/web', color: 'var(--color-webdesign)' },
          { label: 'Moderate Reviews', href: '/admin/reviews', color: 'var(--color-gold)' },
        ].map((l) => (
          <Link
            key={l.href}
            href={l.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 1.25rem',
              background: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-xl)',
              textDecoration: 'none',
              color: l.color,
              fontWeight: 500,
              fontSize: '0.875rem',
              transition: 'all 0.2s',
            }}
          >
            {l.label}
            <ArrowRight size={15} />
          </Link>
        ))}
      </div>
    </div>
  )
}
