'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Scissors,
  Camera,
  Monitor,
  Menu,
  X,
  LogIn,
  LogOut,
  LayoutDashboard,
  ShoppingBag,
  ChevronDown,
} from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useCart } from '@/lib/context/CartContext'
import CartDrawer from '@/components/CartDrawer'

interface NavItem {
  label: string
  href: string
  icon?: React.ReactNode
  color?: string
  children?: { label: string; href: string }[]
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Crochet',
    href: '/crochet',
    icon: <Scissors size={14} />,
    color: 'var(--color-crochet)',
    children: [
      { label: 'Shop Ready-Made', href: '/crochet/shop' },
      { label: 'Design Your Own', href: '/crochet/design' },
    ],
  },
  {
    label: 'Photography',
    href: '/photography',
    icon: <Camera size={14} />,
    color: 'var(--color-photography)',
    children: [
      { label: 'Packages & Pricing', href: '/photography' },
      { label: 'Book a Session', href: '/photography/book' },
    ],
  },
  {
    label: 'Web Design',
    href: '/webdesign',
    icon: <Monitor size={14} />,
    color: 'var(--color-webdesign)',
    children: [
      { label: 'Services & Portfolio', href: '/webdesign' },
      { label: 'Start a Project', href: '/webdesign/enquire' },
    ],
  },
  { label: 'News / Blog', href: '/news' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
]

export default function Navbar() {
  const pathname = usePathname()
  const { user, profile, signOut, isAdmin } = useAuth()
  const { cartCount, setIsCartOpen } = useCart()
  const [scrolled, setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDrop, setOpenDrop]   = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 0.3s ease',
          ...(scrolled
            ? {
                background: 'rgba(9, 12, 20, 0.92)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
              }
            : { background: 'transparent' }),
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 1.5rem',
            height: '4.5rem',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--color-crochet), var(--color-photography), var(--color-webdesign))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#fff',
                fontFamily: 'var(--font-hand)',
                letterSpacing: '0.02em',
              }}
            >
              BYM
            </div>
            <span
              className="font-serif"
              style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-primary)' }}
            >
              BYM Studio
            </span>
          </Link>

          {/* Desktop nav */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
            className="desktop-nav"
          >
            {NAV_ITEMS.map((item) => (
              <div
                key={item.href}
                style={{ position: 'relative' }}
                onMouseEnter={() => item.children && setOpenDrop(item.href)}
                onMouseLeave={() => setOpenDrop(null)}
              >
                <Link
                  href={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.5rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: isActive(item.href)
                      ? (item.color ?? 'var(--color-text-primary)')
                      : 'var(--color-text-secondary)',
                    transition: 'all 0.2s',
                    background: isActive(item.href)
                      ? 'var(--color-border)'
                      : 'transparent',
                    textDecoration: 'none',
                  }}
                >
                  {item.icon && (
                    <span style={{ color: item.color ?? 'inherit' }}>{item.icon}</span>
                  )}
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      size={12}
                      style={{
                        transition: 'transform 0.2s',
                        transform: openDrop === item.href ? 'rotate(180deg)' : 'none',
                        marginLeft: 2,
                      }}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                {item.children && openDrop === item.href && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      marginTop: '0.5rem',
                      background: 'var(--color-bg-card)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '0.5rem',
                      minWidth: 180,
                      boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                      animation: 'fade-up 0.15s ease',
                    }}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        style={{
                          display: 'block',
                          padding: '0.6rem 1rem',
                          borderRadius: 'var(--radius-md)',
                          fontSize: '0.85rem',
                          color: 'var(--color-text-secondary)',
                          transition: 'all 0.15s',
                          textDecoration: 'none',
                          whiteSpace: 'nowrap',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--color-border)'
                          e.currentTarget.style.color = 'var(--color-text-primary)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent'
                          e.currentTarget.style.color = 'var(--color-text-secondary)'
                        }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ThemeToggle />
            
            <button
              onClick={() => setIsCartOpen(true)}
              className="btn btn-ghost btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', position: 'relative' }}
            >
              <ShoppingBag size={16} />
              {cartCount > 0 && (
                <span style={{ 
                  position: 'absolute', top: -4, right: -4, 
                  background: 'var(--color-crochet)', color: '#fff', 
                  fontSize: '0.65rem', fontWeight: 'bold', 
                  width: 16, height: 16, borderRadius: '50%', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center' 
                }}>
                  {cartCount}
                </span>
              )}
            </button>
            
            {user ? (
              <>
                {isAdmin && (
                  <Link href="/admin" className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <LayoutDashboard size={14} />
                    Admin
                  </Link>
                )}
                <Link href="/my-orders" className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ShoppingBag size={14} />
                  My Orders
                </Link>
                <button
                  onClick={() => signOut()}
                  className="btn btn-ghost btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer' }}
                >
                  <LogOut size={14} />
                  <span style={{ display: 'none' }}>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <LogIn size={14} />
                  Sign In
                </Link>
                <Link href="/contact" className="btn btn-primary btn-sm">
                  Get in Touch
                </Link>
              </>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0.4rem',
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Toggle menu"
              className="mobile-hamburger"
            >
              {mobileOpen ? (
                <X size={22} color="var(--color-text-primary)" />
              ) : (
                <Menu size={22} color="var(--color-text-primary)" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            background: 'rgba(9,12,20,0.98)',
            backdropFilter: 'blur(24px)',
            display: 'flex',
            flexDirection: 'column',
            padding: '5rem 1.5rem 2rem',
            animation: 'fade-in 0.2s ease',
            overflowY: 'auto',
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {NAV_ITEMS.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    color: isActive(item.href)
                      ? (item.color ?? 'var(--color-text-primary)')
                      : 'var(--color-text-secondary)',
                    background: isActive(item.href)
                      ? 'var(--color-border)'
                      : 'transparent',
                    textDecoration: 'none',
                  }}
                >
                  {item.icon && (
                    <span style={{ color: item.color ?? 'inherit' }}>{item.icon}</span>
                  )}
                  {item.label}
                </Link>
                {item.children && (
                  <div style={{ paddingLeft: '2.5rem', display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        style={{
                          padding: '0.6rem 1rem',
                          borderRadius: 'var(--radius-md)',
                          fontSize: '0.9rem',
                          color: 'var(--color-text-muted)',
                          textDecoration: 'none',
                          display: 'block',
                        }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {user ? (
              <>
                <Link href="/my-orders" className="btn btn-ghost">
                  My Orders
                </Link>
                {isAdmin && (
                  <Link href="/admin" className="btn btn-ghost">
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="btn btn-ghost"
                  style={{ cursor: 'pointer' }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="btn btn-ghost">
                  Sign In
                </Link>
                <Link href="/auth/register" className="btn btn-primary">
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      <CartDrawer />
      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
        }
        @media (min-width: 901px) {
          .mobile-hamburger { display: none !important; }
        }
      `}</style>
    </>
  )
}
