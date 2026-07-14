'use client'

import Link from 'next/link'
import { ShoppingBag, Scissors, Camera, Monitor, Clock, ArrowRight, LogIn } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { AuthProvider } from '@/lib/auth-context'

// Mock order data (would come from Firestore in production)
const MOCK_CROCHET = [
  { id: 'c1', orderNumber: 'BOK-C001', name: 'Custom Boho Tote', status: 'in_production', date: '2026-07-01', price: 'R450', pillar: 'crochet' as const },
  { id: 'c2', orderNumber: 'BOK-C002', name: 'Baby Blanket', status: 'quoted', date: '2026-07-08', price: 'R320', pillar: 'crochet' as const },
]
const MOCK_PHOTO = [
  { id: 'p1', orderNumber: 'BOK-P001', name: 'Portrait Session', status: 'confirmed', date: '2026-07-20', price: 'R800', pillar: 'photography' as const },
]
const MOCK_WEB = [
  { id: 'w1', orderNumber: 'BOK-W001', name: 'Business Website', status: 'reviewing', date: '2026-07-10', price: 'R5,500', pillar: 'webdesign' as const },
]

type Pillar = 'crochet' | 'photography' | 'webdesign'

const STATUS_LABEL: Record<string, string> = {
  pending_review: 'Pending Review',
  quoted: 'Quote Ready',
  accepted: 'Accepted',
  deposit_paid: 'Deposit Paid',
  in_production: 'In Production',
  ready: 'Ready',
  delivered: 'Delivered',
  confirmed: 'Confirmed',
  reviewing: 'Under Review',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

const STATUS_COLOR: Record<string, string> = {
  pending_review: 'var(--color-warning)',
  quoted: 'var(--color-photography)',
  accepted: 'var(--color-success)',
  deposit_paid: 'var(--color-success)',
  in_production: 'var(--color-crochet)',
  ready: 'var(--color-success)',
  delivered: 'var(--color-text-muted)',
  confirmed: 'var(--color-success)',
  reviewing: 'var(--color-warning)',
  completed: 'var(--color-text-muted)',
  cancelled: 'var(--color-error)',
}

const PILLAR_COLOR: Record<Pillar, string> = {
  crochet: 'var(--color-crochet)',
  photography: 'var(--color-photography)',
  webdesign: 'var(--color-webdesign)',
}

const PILLAR_ICON: Record<Pillar, React.ReactNode> = {
  crochet: <Scissors size={14} />,
  photography: <Camera size={14} />,
  webdesign: <Monitor size={14} />,
}

function OrderCard({ order }: { order: typeof MOCK_CROCHET[0] }) {
  const color = PILLAR_COLOR[order.pillar]
  return (
    <div
      className="card"
      style={{
        padding: '1.25rem 1.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-lg)', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, flexShrink: 0 }}>
        {PILLAR_ICON[order.pillar]}
      </div>
      <div style={{ flex: 1, minWidth: 160 }}>
        <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', fontSize: '0.95rem' }}>{order.name}</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.2rem', display: 'flex', gap: '0.75rem' }}>
          <span>{order.orderNumber}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={11} />{order.date}</span>
        </div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontWeight: 700, color: 'var(--color-text-primary)', fontSize: '0.95rem' }}>{order.price}</div>
        <div
          style={{
            marginTop: '0.25rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.3rem',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: STATUS_COLOR[order.status] ?? 'var(--color-text-muted)',
            background: `${STATUS_COLOR[order.status]}18` ?? 'rgba(255,255,255,0.04)',
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--radius-full)',
          }}
        >
          {STATUS_LABEL[order.status] ?? order.status}
        </div>
      </div>
    </div>
  )
}

function OrdersContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading…</div>
  }

  if (!user) {
    return (
      <div style={{ padding: '5rem 1.5rem', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🔒</div>
        <h2 className="font-serif" style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>Sign In Required</h2>
        <p style={{ marginBottom: '2rem', maxWidth: 400, margin: '0 auto 2rem' }}>
          You need to be signed in to view your orders.
        </p>
        <Link href="/auth/login?redirect=/my-orders" className="btn btn-primary">
          <LogIn size={16} /> Sign In
        </Link>
      </div>
    )
  }

  const allOrders = [...MOCK_CROCHET, ...MOCK_PHOTO, ...MOCK_WEB]

  return (
    <section style={{ padding: '3rem 1.5rem 6rem' }}>
      <div className="container">
        {allOrders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
            <h3 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>No Orders Yet</h3>
            <p style={{ marginBottom: '2rem' }}>Ready to place your first order?</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/crochet/shop" className="btn btn-primary"><Scissors size={15} /> Shop Crochet</Link>
              <Link href="/photography/book" className="btn btn-photo"><Camera size={15} /> Book a Session</Link>
              <Link href="/webdesign/enquire" className="btn btn-web"><Monitor size={15} /> Start a Website</Link>
            </div>
          </div>
        ) : (
          <>
            {/* Summary cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
              {[
                { label: 'Total Orders', value: allOrders.length, color: 'var(--color-gold)' },
                { label: 'Crochet', value: MOCK_CROCHET.length, color: 'var(--color-crochet)' },
                { label: 'Photography', value: MOCK_PHOTO.length, color: 'var(--color-photography)' },
                { label: 'Web Projects', value: MOCK_WEB.length, color: 'var(--color-webdesign)' },
              ].map((s) => (
                <div key={s.label} className="card" style={{ padding: '1.25rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 700, color: s.color, fontFamily: 'var(--font-serif)' }}>{s.value}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Crochet orders */}
            {MOCK_CROCHET.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', fontWeight: 600, color: 'var(--color-crochet)', marginBottom: '1rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  <Scissors size={15} /> Crochet Orders
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {MOCK_CROCHET.map((o) => <OrderCard key={o.id} order={o} />)}
                </div>
              </div>
            )}

            {/* Photography bookings */}
            {MOCK_PHOTO.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', fontWeight: 600, color: 'var(--color-photography)', marginBottom: '1rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  <Camera size={15} /> Photography Bookings
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {MOCK_PHOTO.map((o) => <OrderCard key={o.id} order={o} />)}
                </div>
              </div>
            )}

            {/* Web design enquiries */}
            {MOCK_WEB.length > 0 && (
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1rem', fontWeight: 600, color: 'var(--color-webdesign)', marginBottom: '1rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  <Monitor size={15} /> Web Design Projects
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {MOCK_WEB.map((o) => <OrderCard key={o.id} order={o} />)}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default function MyOrdersPage() {
  return (
    <AuthProvider>
      <div style={{ minHeight: '100dvh', background: 'var(--color-bg-primary)' }}>
        {/* Header */}
        <section style={{ paddingTop: '7rem', paddingBottom: '2.5rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', background: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)' }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--color-gold)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                <ShoppingBag size={14} /> My Orders
              </div>
              <h1 className="font-serif" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>Your Orders & Bookings</h1>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href="/crochet/design" className="btn btn-primary btn-sm"><Scissors size={13} /> New Crochet Order</Link>
              <Link href="/photography/book" className="btn btn-photo btn-sm"><Camera size={13} /> Book Session</Link>
              <Link href="/webdesign/enquire" className="btn btn-web btn-sm"><Monitor size={13} /> Web Project</Link>
            </div>
          </div>
        </section>

        <OrdersContent />
      </div>
    </AuthProvider>
  )
}
