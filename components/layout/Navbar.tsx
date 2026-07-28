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
  ShoppingBag,
  ChevronDown,
} from 'lucide-react'
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
  const { cartCount, setIsCartOpen } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDrop, setOpenDrop] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

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
          background: scrolled ? 'var(--color-nav-bg)' : 'var(--color-nav-bg)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--color-border)',
          boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.06)' : 'none',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 1rem',
            height: '4.25rem',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group hover:opacity-80 transition-opacity"
            aria-label="BYM Studio Home"
          >
            <img
              src="/logo-light.png"
              alt="Bokas Yarn Market & Studio"
              className="h-8 sm:h-10 w-auto object-contain logo-light"
            />
            <img
              src="/logo-dark.png"
              alt="Bokas Yarn Market & Studio"
              className="h-8 sm:h-10 w-auto object-contain logo-dark"
            />
          </Link>

          {/* Desktop Navigation Links */}
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
                    transition: 'all 0.2s ease',
                    background: isActive(item.href)
                      ? 'var(--color-border)'
                      : 'transparent',
                    textDecoration: 'none',
                  }}
                >
                  {item.icon && (
                    <span style={{ color: item.color ?? 'inherit' }}>
                      {item.icon}
                    </span>
                  )}
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      size={12}
                      style={{
                        transition: 'transform 0.2s',
                        transform:
                          openDrop === item.href ? 'rotate(180deg)' : 'none',
                        marginLeft: 2,
                      }}
                    />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {item.children && openDrop === item.href && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      paddingTop: '0.5rem',
                    }}
                  >
                    <div
                      style={{
                        background: 'var(--color-bg-card)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '0.5rem',
                        minWidth: 190,
                        boxShadow: '0 16px 40px rgba(0,0,0,0.15)',
                        animation: 'fade-up 0.15s ease',
                      }}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setOpenDrop(null)}
                          style={{
                            display: 'block',
                            padding: '0.6rem 1rem',
                            borderRadius: 'var(--radius-md)',
                            fontSize: '0.85rem',
                            color: 'var(--color-text-primary)',
                            transition: 'all 0.15s ease',
                            textDecoration: 'none',
                            whiteSpace: 'nowrap',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background =
                              'var(--color-bg-secondary)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent'
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Action Items */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Shopping Cart"
              style={{
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-primary)',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: -3,
                    right: -3,
                    background: 'var(--color-crochet)',
                    color: '#ffffff',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid var(--color-bg-card)',
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Contact Button */}
            <Link
              href="/contact"
              className="btn btn-primary btn-sm cta-desktop"
              style={{ display: 'inline-flex', marginLeft: '0.25rem' }}
            >
              Get in Touch
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
              aria-label="Toggle navigation menu"
              className="mobile-hamburger"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            background: 'var(--color-bg-primary)',
            color: 'var(--color-text-primary)',
            display: 'flex',
            flexDirection: 'column',
            padding: '5rem 1.25rem 2rem',
            animation: 'fade-in 0.2s ease',
            overflowY: 'auto',
          }}
        >
          <nav
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            {NAV_ITEMS.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-lg)',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    color: isActive(item.href)
                      ? (item.color ?? 'var(--color-text-primary)')
                      : 'var(--color-text-primary)',
                    background: isActive(item.href)
                      ? 'var(--color-bg-card)'
                      : 'transparent',
                    border: '1px solid',
                    borderColor: isActive(item.href)
                      ? 'var(--color-border)'
                      : 'transparent',
                    textDecoration: 'none',
                  }}
                >
                  {item.icon && (
                    <span style={{ color: item.color ?? 'inherit' }}>
                      {item.icon}
                    </span>
                  )}
                  {item.label}
                </Link>

                {item.children && (
                  <div
                    style={{
                      paddingLeft: '2.5rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.25rem',
                      marginTop: '0.25rem',
                    }}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        style={{
                          padding: '0.65rem 1rem',
                          borderRadius: 'var(--radius-md)',
                          fontSize: '0.9rem',
                          color: 'var(--color-text-secondary)',
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

          <div
            style={{
              marginTop: 'auto',
              paddingTop: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              borderTop: '1px solid var(--color-border)',
            }}
          >
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '0.85rem',
                fontSize: '1rem',
                justifyContent: 'center',
              }}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      )}

      <CartDrawer />

      <style>{`
        @media (max-width: 960px) {
          .desktop-nav { display: none !important; }
        }
        @media (min-width: 961px) {
          .mobile-hamburger { display: none !important; }
        }
        @media (max-width: 480px) {
          .cta-desktop { display: none !important; }
        }
      `}</style>
    </>
  )
}
