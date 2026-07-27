import Link from 'next/link'
import { Scissors, Camera, Monitor, Star, ArrowRight, TrendingUp, Clock, Package, DollarSign } from 'lucide-react'
import dbConnect from '@/lib/db'
import Order from '@/models/Order'

export const revalidate = 0

const PILLAR_COLOR: Record<string, string> = {
  crochet: 'var(--color-crochet)',
  photography: 'var(--color-photography)',
  webdesign: 'var(--color-webdesign)',
}
const PILLAR_ICON: Record<string, React.ReactNode> = {
  crochet: <Scissors size={18} />,
  photography: <Camera size={18} />,
  webdesign: <Monitor size={18} />,
}
const PILLAR_LABEL: Record<string, string> = {
  crochet: 'Crochet Orders',
  photography: 'Photo Bookings',
  webdesign: 'Web Enquiries',
}
const PILLAR_HREF: Record<string, string> = {
  crochet: '/admin/crochet',
  photography: '/admin/photography',
  webdesign: '/admin/web',
}

const STATUS_LABEL: Record<string, string> = {
  in_production: 'In Production',
  confirmed: 'Confirmed',
  quoted: 'Quoted',
  pending_review: 'Pending Review',
  pending: 'Pending',
  accepted: 'Accepted',
  deposit_paid: 'Deposit Paid',
  ready: 'Ready',
  delivered: 'Delivered',
  completed: 'Completed',
  cancelled: 'Cancelled',
  processing: 'Processing',
  shipped: 'Shipped',
  reviewing: 'Reviewing',
}

export default async function AdminDashboardPage() {
  await dbConnect()

  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

  // Live stats
  const [
    crochetTotal, crochetWeek,
    photoTotal, photoWeek,
    webTotal, webWeek,
    pendingReview,
    recentOrders,
    revenueResult,
  ] = await Promise.all([
    Order.countDocuments({ pillar: 'crochet' }),
    Order.countDocuments({ pillar: 'crochet', createdAt: { $gte: oneWeekAgo } }),
    Order.countDocuments({ pillar: 'photography' }),
    Order.countDocuments({ pillar: 'photography', createdAt: { $gte: oneWeekAgo } }),
    Order.countDocuments({ pillar: 'webdesign' }),
    Order.countDocuments({ pillar: 'webdesign', createdAt: { $gte: oneWeekAgo } }),
    Order.countDocuments({ status: 'pending_review' }),
    Order.find({}).sort({ createdAt: -1 }).limit(5).populate('userId', 'displayName email').lean(),
    Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]),
  ])

  const stats = [
    { label: PILLAR_LABEL.crochet, value: crochetTotal.toString(), change: `+${crochetWeek} this week`, color: PILLAR_COLOR.crochet, icon: PILLAR_ICON.crochet, href: PILLAR_HREF.crochet },
    { label: PILLAR_LABEL.photography, value: photoTotal.toString(), change: `+${photoWeek} this week`, color: PILLAR_COLOR.photography, icon: PILLAR_ICON.photography, href: PILLAR_HREF.photography },
    { label: PILLAR_LABEL.webdesign, value: webTotal.toString(), change: `+${webWeek} this week`, color: PILLAR_COLOR.webdesign, icon: PILLAR_ICON.webdesign, href: PILLAR_HREF.webdesign },
    { label: 'Pending Review', value: pendingReview.toString(), change: 'Need attention', color: 'var(--color-gold)', icon: <Star size={18} />, href: '/admin/orders' },
  ]

  const totalRevenue = revenueResult?.[0]?.total || 0

  return (
    <div style={{ padding: '2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 className="font-serif" style={{ fontSize: '2rem', marginBottom: '0.35rem' }}>Dashboard</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
          Welcome back! Here&apos;s what&apos;s happening at BYM Studio.
        </p>
      </div>

      {/* Stats grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        {stats.map((s) => (
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

      {/* Revenue card */}
      {totalRevenue > 0 && (
        <div className="card" style={{ padding: '1.5rem', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-lg)', background: 'var(--color-gold-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold)' }}>
            <DollarSign size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, marginBottom: '0.15rem' }}>Total Revenue (Paid)</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--font-serif)', color: 'var(--color-gold)' }}>R{totalRevenue.toLocaleString()}</div>
          </div>
        </div>
      )}

      {/* Recent activity */}
      <div>
        <h2 style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '1.25rem', color: 'var(--color-text-secondary)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Recent Orders
        </h2>
        <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
          {recentOrders.length === 0 ? (
            <div style={{ padding: '3rem 2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
              <Package size={36} style={{ opacity: 0.4, margin: '0 auto 0.75rem' }} />
              <p>No orders yet. They will appear here once customers start ordering.</p>
            </div>
          ) : (
            recentOrders.map((o: any, i: number) => {
              const name = o.userId?.displayName || o.shippingAddress?.fullName || o.data?.name || 'Guest'
              const itemName = o.lineItems?.[0]?.title || o.data?.product || o.data?.package || o.data?.projectType || 'Order'
              const pillarColor = PILLAR_COLOR[o.pillar] || 'var(--color-text-muted)'

              return (
                <div
                  key={o._id.toString()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1rem 1.25rem',
                    borderBottom: i < recentOrders.length - 1 ? '1px solid var(--color-border)' : 'none',
                    flexWrap: 'wrap',
                  }}
                >
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: pillarColor, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 140 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-text-primary)' }}>{itemName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{name}</div>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Clock size={11} />{o.createdAt ? new Date(o.createdAt).toLocaleDateString() : '—'}
                  </div>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    background: `${pillarColor}18`,
                    color: pillarColor,
                  }}>
                    {STATUS_LABEL[o.status] ?? o.status}
                  </span>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Quick links */}
      <div style={{ marginTop: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1rem' }}>
        {[
          { label: 'Manage Crochet Orders', href: '/admin/crochet', color: 'var(--color-crochet)' },
          { label: 'Photography Bookings', href: '/admin/photography', color: 'var(--color-photography)' },
          { label: 'Web Enquiries', href: '/admin/web', color: 'var(--color-webdesign)' },
          { label: 'Manage Gallery', href: '/admin/gallery', color: 'var(--color-gold)' },
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
