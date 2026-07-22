import Link from 'next/link'

export default function PoliciesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '6rem', minHeight: '100vh', background: 'var(--color-bg-primary)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '4rem', alignItems: 'start' }}>
        
        {/* Sidebar Nav */}
        <nav style={{ position: 'sticky', top: '6rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <h3 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', marginBottom: '1rem', fontWeight: 600 }}>Legal & Policies</h3>
          
          <Link href="/policies/terms-of-service" style={{ padding: '0.5rem', color: 'var(--color-text-secondary)', textDecoration: 'none', borderRadius: 'var(--radius-md)' }}>
            Terms of Service
          </Link>
          <Link href="/policies/privacy-policy" style={{ padding: '0.5rem', color: 'var(--color-text-secondary)', textDecoration: 'none', borderRadius: 'var(--radius-md)' }}>
            Privacy Policy
          </Link>
          <Link href="/policies/shipping-policy" style={{ padding: '0.5rem', color: 'var(--color-text-secondary)', textDecoration: 'none', borderRadius: 'var(--radius-md)' }}>
            Shipping Policy
          </Link>
          <Link href="/policies/refund-policy" style={{ padding: '0.5rem', color: 'var(--color-text-secondary)', textDecoration: 'none', borderRadius: 'var(--radius-md)' }}>
            Refund Policy
          </Link>
        </nav>

        {/* Content */}
        <div className="policy-content" style={{ maxWidth: 760 }}>
          {children}
        </div>

      </div>
      
      <style>{`
        .policy-content h1 { font-family: var(--font-serif); font-size: 2.5rem; margin-bottom: 2rem; }
        .policy-content h2 { font-size: 1.5rem; margin-top: 2.5rem; margin-bottom: 1rem; font-weight: 600; }
        .policy-content p { color: var(--color-text-secondary); line-height: 1.7; margin-bottom: 1.5rem; }
        .policy-content ul { color: var(--color-text-secondary); line-height: 1.7; margin-bottom: 1.5rem; padding-left: 1.5rem; }
        .policy-content li { margin-bottom: 0.5rem; }
        
        @media (max-width: 900px) {
          .container { grid-template-columns: 1fr !important; }
          nav { position: relative !important; top: 0 !important; flex-direction: row !important; overflow-x: auto; padding-bottom: 1rem; border-bottom: 1px solid var(--color-border); margin-bottom: 2rem; }
          nav h3 { display: none; }
          nav a { white-space: nowrap; }
        }
      `}</style>
    </div>
  )
}
