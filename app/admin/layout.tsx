'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard, Scissors, Camera, Monitor, Settings, Star,
  ImageIcon, LogOut, Users, ShoppingBag, Newspaper, Activity,
  Menu, X
} from 'lucide-react'
import { AuthProvider, useAuth } from '@/lib/auth-context'

const NAV = [
  { label: 'Dashboard', href: '/', icon: <LayoutDashboard size={16} />, exact: true },
  { label: 'Activity Logs', href: '/activity', icon: <Activity size={16} />, color: 'var(--color-gold)' },
  { label: 'Products', href: '/products', icon: <ShoppingBag size={16} />, color: 'var(--color-crochet)' },
  { label: 'Orders', href: '/orders', icon: <Scissors size={16} /> },
  { label: 'News / Blog', href: '/news', icon: <Newspaper size={16} /> },
  { label: 'Photography', href: '/photography', icon: <Camera size={16} />, color: 'var(--color-photography)' },
  { label: 'Web Projects', href: '/web', icon: <Monitor size={16} />, color: 'var(--color-webdesign)' },
  { label: 'Gallery', href: '/gallery', icon: <ImageIcon size={16} /> },
  { label: 'Reviews', href: '/reviews', icon: <Star size={16} /> },
  { label: 'Customers', href: '/customers', icon: <Users size={16} /> },
  { label: 'Settings', href: '/settings', icon: <Settings size={16} /> },
]

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href
  return pathname === href || pathname.startsWith(href + '/')
}

function SidebarContent({ pathname, profile, onSignOut, onClose }: {
  pathname: string
  profile: any
  onSignOut: () => void
  onClose?: () => void
}) {
  return (
    <>
      {/* Logo */}
      <div style={{ padding: '0 1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-crochet), var(--color-photography), var(--color-webdesign))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-hand)' }}>BYM</div>
          <span className="font-serif" style={{ fontWeight: 700, fontSize: '1rem' }}>Admin</span>
        </Link>
        {onClose && (
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: '0.35rem' }}>
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '0 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
        {NAV.map((item) => {
          const active = isActive(pathname, item.href, item.exact)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.65rem 0.75rem',
                borderRadius: 'var(--radius-lg)',
                fontSize: '0.875rem',
                color: active ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                textDecoration: 'none',
                transition: 'all 0.2s',
                background: active ? 'rgba(255,255,255,0.06)' : 'transparent',
                borderLeft: active ? `3px solid ${item.color || 'var(--color-gold)'}` : '3px solid transparent',
                fontWeight: active ? 600 : 400,
              }}
            >
              <span style={{ color: active ? (item.color || 'var(--color-gold)') : (item.color ?? 'inherit') }}>{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>{profile?.displayName || 'Admin'}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>Studio Admin</div>
        </div>
        <button onClick={onSignOut} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: '0.35rem' }}>
          <LogOut size={16} />
        </button>
      </div>
    </>
  )
}

function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, profile, loading, signOut, isAdmin } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.replace('/')
    }
  }, [user, loading, isAdmin, router])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  if (loading) {
    return (
      <div style={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', background: 'var(--color-bg-primary)' }}>
        <div style={{ color: 'var(--color-text-muted)' }}>Loading admin…</div>
      </div>
    )
  }

  if (!user || !isAdmin) return null

  const handleSignOut = () => signOut().then(() => router.push('/'))

  return (
    <>
      {/* Mobile topbar */}
      <div
        className="admin-mobile-topbar"
        style={{
          display: 'none',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'var(--color-bg-secondary)',
          borderBottom: '1px solid var(--color-border)',
          padding: '0.75rem 1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-crochet), var(--color-photography), var(--color-webdesign))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.55rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-hand)' }}>BYM</div>
          <span className="font-serif" style={{ fontWeight: 700, fontSize: '0.9rem' }}>Admin</span>
        </Link>
        <button onClick={() => setMobileOpen(true)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-primary)', padding: '0.35rem' }}>
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(0,0,0,0.6)',
          }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className="admin-mobile-drawer"
        style={{
          position: 'fixed', top: 0, left: 0, bottom: 0,
          width: 280, zIndex: 101,
          background: 'var(--color-bg-secondary)',
          borderRight: '1px solid var(--color-border)',
          display: 'flex', flexDirection: 'column',
          padding: '1.5rem 0',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
        }}
      >
        <SidebarContent
          pathname={pathname}
          profile={profile}
          onSignOut={handleSignOut}
          onClose={() => setMobileOpen(false)}
        />
      </aside>

      {/* Desktop layout */}
      <div className="admin-desktop-grid" style={{ minHeight: '100dvh', display: 'grid', gridTemplateColumns: '240px 1fr', background: 'var(--color-bg-primary)' }}>
        {/* Desktop Sidebar */}
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
          <SidebarContent
            pathname={pathname}
            profile={profile}
            onSignOut={handleSignOut}
          />
        </aside>

        {/* Main */}
        <main style={{ overflow: 'auto' }}>
          {children}
        </main>
      </div>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .admin-mobile-topbar { display: flex !important; }
          .admin-desktop-grid { display: block !important; }
          .admin-desktop-grid > aside { display: none !important; }
        }
      `}</style>
    </>
  )
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminShell>{children}</AdminShell>
    </AuthProvider>
  )
}
