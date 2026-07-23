'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UserPlus, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

export default function RegisterPage() {
  const { signUp, user, loading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user && !authLoading) {
      router.push('/')
    }
  }, [user, authLoading, router])

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm) { setError('Passwords do not match.'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setError('')
    setLoading(true)
    try {
      await signUp(form.email, form.password, form.name)
      router.push('/')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed'
      setError(msg.includes('already') ? 'An account with this email already exists.' : msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', padding: '2rem 1.5rem' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-crochet), var(--color-photography), var(--color-webdesign))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-hand)', margin: '0 auto 1rem' }}>
            BYM
          </div>
          <h1 className="font-serif" style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>Create Account</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            Join BYM Studio to track your orders
          </p>
        </div>

        <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-2xl)', padding: '2rem' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="label" htmlFor="reg-name">Full Name</label>
              <input id="reg-name" className="input" type="text" placeholder="Jane Doe" value={form.name} onChange={(e) => update('name', e.target.value)} required />
            </div>
            <div>
              <label className="label" htmlFor="reg-email">Email Address</label>
              <input id="reg-email" className="input" type="email" placeholder="your@email.com" value={form.email} onChange={(e) => update('email', e.target.value)} required />
            </div>
            <div>
              <label className="label" htmlFor="reg-pass">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="reg-pass"
                  className="input"
                  type={showPass ? 'text' : 'password'}
                  placeholder="Minimum 6 characters"
                  value={form.password}
                  onChange={(e) => update('password', e.target.value)}
                  required
                  style={{ paddingRight: '3rem' }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
                  {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>
            <div>
              <label className="label" htmlFor="reg-confirm">Confirm Password</label>
              <input id="reg-confirm" className="input" type="password" placeholder="Repeat password" value={form.confirm} onChange={(e) => update('confirm', e.target.value)} required />
            </div>

            {error && (
              <div style={{ padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.25)', color: 'var(--color-error)', fontSize: '0.875rem' }}>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ width: '100%', cursor: loading ? 'wait' : 'pointer', marginTop: '0.5rem' }}>
              {loading ? 'Creating account…' : <><UserPlus size={17} /> Create Account</>}
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              Already have an account?{' '}
              <Link href="/auth/login" style={{ color: 'var(--color-crochet)', fontWeight: 500, textDecoration: 'none' }}>
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
