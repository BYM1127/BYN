'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Monitor, Send, ChevronDown } from 'lucide-react'

const TIERS = [
  { id: 'starter',   label: 'Starter Site — from R2,500' },
  { id: 'business',  label: 'Business Site — from R5,500' },
  { id: 'ecommerce', label: 'E-Commerce — from R9,000' },
  { id: 'webapp',    label: 'Custom Web App — quote on enquiry' },
  { id: 'other',     label: 'Not sure yet — let\'s discuss' },
]

const BUDGETS = [
  { id: 'under_500',  label: 'Under R2,500' },
  { id: '500_1000',   label: 'R2,500 – R5,500' },
  { id: '1000_2500',  label: 'R5,500 – R9,000' },
  { id: '2500_5000',  label: 'R9,000 – R20,000' },
  { id: 'over_5000',  label: 'R20,000+' },
  { id: 'discuss',    label: 'Open to discussion' },
]

const TIMELINES = [
  { id: '1',  label: 'ASAP — as fast as possible' },
  { id: '2',  label: '1–2 weeks' },
  { id: '3',  label: '3–4 weeks' },
  { id: '4',  label: '1–2 months' },
  { id: '5',  label: 'No rush — flexible' },
]

const FEATURES = [
  'Blog / News section',
  'E-commerce / Online store',
  'Booking / appointment system',
  'Photo gallery',
  'Contact / enquiry forms',
  'User login & accounts',
  'Multi-language support',
  'Custom admin panel',
  'API integrations',
  'Animations & interactions',
]

function EnquiryForm() {
  const params = useSearchParams()
  const defaultTier = params.get('tier') ?? ''

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    tier: defaultTier,
    budget: '',
    timeline: '',
    description: '',
    referenceUrl1: '',
    referenceUrl2: '',
    features: [] as string[],
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  const toggleFeature = (val: string) =>
    setForm((p) => ({
      ...p,
      features: p.features.includes(val) ? p.features.filter((f) => f !== val) : [...p.features, val],
    }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.description) {
      setError('Please fill in your name, email, and project description.')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      await new Promise((r) => setTimeout(r, 1200))
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 1.5rem', maxWidth: 500, margin: '0 auto' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🚀</div>
        <h2 className="font-serif" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          Enquiry Received!
        </h2>
        <p style={{ lineHeight: 1.7, marginBottom: '2rem' }}>
          Thank you, <strong>{form.name}</strong>! I've received your project enquiry and will send you a
          quote within 24 hours. Let's build something great together.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/webdesign" className="btn btn-web">View Services</Link>
          <Link href="/" className="btn btn-ghost">Back to Home</Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 660, margin: '0 auto' }}>
      {/* Contact */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 className="font-serif" style={{ fontSize: '1.35rem', marginBottom: '1.25rem' }}>Your Details</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1rem' }}>
          <div>
            <label className="label" htmlFor="name">Full Name *</label>
            <input id="name" className="input" type="text" placeholder="Jane Doe" value={form.name} onChange={(e) => update('name', e.target.value)} required />
          </div>
          <div>
            <label className="label" htmlFor="email">Email Address *</label>
            <input id="email" className="input" type="email" placeholder="jane@email.com" value={form.email} onChange={(e) => update('email', e.target.value)} required />
          </div>
          <div>
            <label className="label" htmlFor="phone">Phone / WhatsApp</label>
            <input id="phone" className="input" type="tel" placeholder="+27 000 000 0000" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
          </div>
          <div>
            <label className="label" htmlFor="biz">Business / Brand Name</label>
            <input id="biz" className="input" type="text" placeholder="Your brand name (if any)" value={form.businessName} onChange={(e) => update('businessName', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Project details */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 className="font-serif" style={{ fontSize: '1.35rem', marginBottom: '1.25rem' }}>Project Details</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label className="label" htmlFor="tier">Project Type</label>
            <div style={{ position: 'relative' }}>
              <select id="tier" className="input" value={form.tier} onChange={(e) => update('tier', e.target.value)} style={{ appearance: 'none', paddingRight: '2.5rem' }}>
                <option value="">Select a service tier…</option>
                {TIERS.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
              <ChevronDown size={16} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', pointerEvents: 'none' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1rem' }}>
            <div>
              <label className="label" htmlFor="budget">Budget Range</label>
              <div style={{ position: 'relative' }}>
                <select id="budget" className="input" value={form.budget} onChange={(e) => update('budget', e.target.value)} style={{ appearance: 'none', paddingRight: '2.5rem' }}>
                  <option value="">Select budget…</option>
                  {BUDGETS.map((b) => <option key={b.id} value={b.id}>{b.label}</option>)}
                </select>
                <ChevronDown size={16} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', pointerEvents: 'none' }} />
              </div>
            </div>
            <div>
              <label className="label" htmlFor="timeline">Ideal Timeline</label>
              <div style={{ position: 'relative' }}>
                <select id="timeline" className="input" value={form.timeline} onChange={(e) => update('timeline', e.target.value)} style={{ appearance: 'none', paddingRight: '2.5rem' }}>
                  <option value="">Select timeline…</option>
                  {TIMELINES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
                </select>
                <ChevronDown size={16} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', pointerEvents: 'none' }} />
              </div>
            </div>
          </div>
          <div>
            <label className="label" htmlFor="description">Project Description *</label>
            <textarea
              id="description"
              className="input"
              placeholder="Tell me about your project — what is the site for, who is your audience, what should it do, what does your brand look and feel like?"
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              style={{ minHeight: 150 }}
              required
            />
          </div>
        </div>
      </div>

      {/* Features wanted */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 className="font-serif" style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>Features Needed (tick all that apply)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))', gap: '0.6rem' }}>
          {FEATURES.map((feat) => (
            <button
              key={feat}
              type="button"
              onClick={() => toggleFeature(feat)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.65rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                background: form.features.includes(feat) ? 'var(--color-webdesign-dim)' : 'var(--color-bg-card)',
                border: `1px solid ${form.features.includes(feat) ? 'rgba(139,92,246,0.5)' : 'var(--color-border)'}`,
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '0.82rem',
                color: 'var(--color-text-primary)',
                textAlign: 'left',
              }}
            >
              <div style={{ width: 16, height: 16, borderRadius: 3, border: `2px solid ${form.features.includes(feat) ? 'var(--color-webdesign)' : 'var(--color-border)'}`, background: form.features.includes(feat) ? 'var(--color-webdesign)' : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                {form.features.includes(feat) && <span style={{ color: '#fff', fontSize: 10 }}>✓</span>}
              </div>
              {feat}
            </button>
          ))}
        </div>
      </div>

      {/* Reference sites */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 className="font-serif" style={{ fontSize: '1.35rem', marginBottom: '1rem' }}>Reference / Inspiration Websites (optional)</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <input className="input" type="url" placeholder="https://example.com — a site you love the style of" value={form.referenceUrl1} onChange={(e) => update('referenceUrl1', e.target.value)} />
          <input className="input" type="url" placeholder="https://another-example.com — another reference" value={form.referenceUrl2} onChange={(e) => update('referenceUrl2', e.target.value)} />
        </div>
      </div>

      {error && (
        <div style={{ padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.25)', color: 'var(--color-error)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
          {error}
        </div>
      )}

      <button type="submit" disabled={submitting} className="btn btn-web btn-lg" style={{ width: '100%', cursor: submitting ? 'wait' : 'pointer' }}>
        {submitting ? 'Sending…' : <><Send size={17} /> Send Project Enquiry</>}
      </button>
      <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '1rem' }}>
        No payment required. I'll send a free quote within 24 hours.
      </p>
    </form>
  )
}

export default function WebEnquirePage() {
  return (
    <>
      <section style={{ paddingTop: '8rem', paddingBottom: '3rem', paddingLeft: '1.5rem', paddingRight: '1.5rem', background: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)', textAlign: 'center' }}>
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-webdesign-dim)', border: '1px solid rgba(139,92,246,0.25)', borderRadius: 'var(--radius-full)', padding: '0.4rem 1.1rem', marginBottom: '1.25rem', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-webdesign)' }}>
            <Monitor size={12} /> New Project Enquiry
          </div>
          <h1 className="font-serif" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', marginBottom: '0.75rem' }}>
            Start Your Project
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: 520, margin: '0 auto' }}>
            Tell me about your website idea and I'll send a free, no-obligation quote within 24 hours.
          </p>
        </div>
      </section>
      <section style={{ padding: '3rem 1.5rem 5rem' }}>
        <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading form…</div>}>
          <EnquiryForm />
        </Suspense>
      </section>
    </>
  )
}
