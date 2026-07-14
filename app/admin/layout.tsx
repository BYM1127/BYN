'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard, Scissors, Camera, Monitor, Settings, Star,
  ImageIcon, LogOut, ChevronRight, Users
} from 'lucide-react'
import { AuthProvider, useAuth } from '@/lib/auth-context'

const NAV = [
  { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={16} /> },
  { label: 'Crochet Orders', href: '/admin/crochet', icon: <Scissors size={16} />, color: 'var(--color-crochet)' },
  { label: 'Photography', href: '/admin/photography', icon: <Camera size={16} />, color: 'var(--color-photography)' },
  { label: 'Web Projects', href: '/admin/web', icon: <Monitor size={16} />, color: 'var(--color-webdesign)' },
  { label: 'Gallery', href: '/admin/gallery', icon: <ImageIcon size={16} /> },
  { label: 'Reviews', href: '/admin/reviews', icon: <Star size={16} /> },
  { label: 'Customers', href: '/admin/customers', icon: <Users size={16} /> },
  { label: 'Settings', href: '/admin/settings', icon: <Settings size={16} /> },
]

function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, profile, loading, signOut, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.replace('/')
    }
  }, [user, loading, isAdmin, router])

  if (loading) {
    return (
      <div style={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', background: 'var(--color-bg-primary)' }}>
        <div style={{ color: 'var(--color-text-muted)' }}>Loading admin…</div>
      </div>
    )
  }

  if (!user || !isAdmin) return null

  return (
    <div style={{ minHeight: '100dvh', display: 'grid', gridTemplateColumns: '240px 1fr', background: 'var(--color-bg-primary)' }}>
      {/* Sidebar */}
      <aside
        style={{
          background: 'var(--color-bg-secondary)',
          borderRight: '1px solid var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          padding: '1.5rem 0',
          position: 'sticky',
          top: 0,
          height: '100dvh',
          overflowY: 'auto',
        }}
      >
        {/* Logo */}
        <div style={{ padding: '0 1.25rem', marginBottom: '2rem' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-crochet), var(--color-photography), var(--color-webdesign))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-hand)' }}>BYM</div>
            <span className="font-serif" style={{ fontWeight: 700, fontSize: '1rem' }}>Admin</span>
          </Link>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '0 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.65rem 0.75rem',
                borderRadius: 'var(--radius-lg)',
                fontSize: '0.875rem',
                color: 'var(--color-text-secondary)',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                e.currentTarget.style.color = 'var(--color-text-primary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'var(--color-text-secondary)'
              }}
            >
              <span style={{ color: item.color ?? 'inherit' }}>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* User */}
        <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>{profile?.displayName || 'Admin'}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>Studio Admin</div>
          </div>
          <button onClick={() => signOut().then(() => router.push('/'))} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: '0.35rem' }}>
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ overflow: 'auto' }}>
        {children}
      </main>
    </div>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminShell>{children}</AdminShell>
    </AuthProvider>
  )
}
