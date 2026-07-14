'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { LogIn, Eye, EyeOff, Scissors, Camera, Monitor } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

function LoginForm() {
  const { signIn } = useAuth()
  const router = useRouter()
  const params = useSearchParams()
  const redirect = params.get('redirect') ?? '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      router.push(redirect)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Sign in failed'
      setError(msg.includes('invalid') || msg.includes('password') ? 'Invalid email or password.' : msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <label className="label" htmlFor="email">Email Address</label>
        <input id="email" className="input" type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
      </div>
      <div>
        <label className="label" htmlFor="password">Password</label>
        <div style={{ position: 'relative' }}>
          <input
            id="password"
            className="input"
            type={showPass ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            style={{ paddingRight: '3rem' }}
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
          >
            {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.25)', color: 'var(--color-error)', fontSize: '0.875rem' }}>
          {error}
        </div>
      )}

      <button type="submit" disabled={loading} className="btn btn-gold btn-lg" style={{ width: '100%', cursor: loading ? 'wait' : 'pointer', marginTop: '0.5rem' }}>
        {loading ? 'Signing in…' : <><LogIn size={17} /> Sign In</>}
      </button>

      <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
        Don't have an account?{' '}
        <Link href="/auth/register" style={{ color: 'var(--color-gold)', fontWeight: 500, textDecoration: 'none' }}>
          Create one
        </Link>
      </p>
    </form>
  )
}

export default function LoginPage() {
  return (
    <div style={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', padding: '2rem 1.5rem', background: 'var(--color-bg-primary)' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-crochet), var(--color-photography), var(--color-webdesign))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-hand)', margin: '0 auto 1rem' }}>
            BYM
          </div>
          <h1 className="font-serif" style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>Welcome Back</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Sign in to your BYM Studio account
          </p>
        </div>

        <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-2xl)', padding: '2rem' }}>
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '1rem', color: 'var(--color-text-muted)' }}>Loading…</div>}>
            <LoginForm />
          </Suspense>
        </div>

        {/* Pillars hint */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', marginTop: '2rem' }}>
          {[
            { icon: <Scissors size={14} />, color: 'var(--color-crochet)', label: 'Crochet' },
            { icon: <Camera size={14} />, color: 'var(--color-photography)', label: 'Photography' },
            { icon: <Monitor size={14} />, color: 'var(--color-webdesign)', label: 'Web Design' },
          ].map((p) => (
            <div key={p.label} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: p.color }}>
              {p.icon} {p.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
