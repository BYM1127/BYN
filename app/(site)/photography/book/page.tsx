'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Camera, Send, Check, ChevronDown } from 'lucide-react'

const PACKAGES = [
  { id: 'portrait',   label: 'Portrait Session (R800)' },
  { id: 'couples',    label: 'Couples Session (R1,200)' },
  { id: 'family',     label: 'Family Session (R1,400)' },
  { id: 'maternity',  label: 'Maternity Session (R1,100)' },
  { id: 'event',      label: 'Event Coverage (R2,800)' },
  { id: 'commercial', label: 'Commercial / Product (R2,200)' },
  { id: 'custom',     label: 'Custom Package — Let\'s Discuss' },
]

const ADDONS = [
  { value: 'extra_edits',  label: '+10 extra edited photos (+R200)' },
  { value: 'rush',         label: 'Rush delivery — 3 days (+R300)' },
  { value: 'prints',       label: 'Printed photo album (+R500)' },
  { value: 'video',        label: 'Short highlight reel (+R600)' },
  { value: 'location_fee', label: 'Out-of-area travel fee (quote on enquiry)' },
]

function BookingForm() {
  const params = useSearchParams()
  const defaultPackage = params.get('package') ?? ''

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    packageId: defaultPackage,
    preferredDate: '',
    alternativeDate: '',
    location: '',
    addOns: [] as string[],
    specialRequests: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  const toggleAddon = (val: string) => {
    setForm((p) => ({
      ...p,
      addOns: p.addOns.includes(val) ? p.addOns.filter((a) => a !== val) : [...p.addOns, val],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.packageId || !form.preferredDate) {
      setError('Please fill in all required fields.')
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
        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📷</div>
        <h2 className="font-serif" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          Booking Request Sent!
        </h2>
        <p style={{ lineHeight: 1.7, marginBottom: '2rem' }}>
          Thank you, <strong>{form.name}</strong>! I'll review your booking request and confirm your
          session date within 24 hours. Check your email for a confirmation.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/photography" className="btn btn-photo">
            View Packages
          </Link>
          <Link href="/gallery" className="btn btn-ghost">
            Browse Gallery
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 640, margin: '0 auto' }}>
      {/* Contact info */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 className="font-serif" style={{ fontSize: '1.35rem', marginBottom: '1.25rem' }}>
          Your Details
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1rem' }}>
          <div>
            <label className="label" htmlFor="name">Full Name *</label>
            <input id="name" className="input" type="text" placeholder="Jane Doe" value={form.name} onChange={(e) => update('name', e.target.value)} required />
          </div>
          <div>
            <label className="label" htmlFor="email">Email Address *</label>
            <input id="email" className="input" type="email" placeholder="jane@email.com" value={form.email} onChange={(e) => update('email', e.target.value)} required />
          </div>
          <div>
            <label className="label" htmlFor="phone">WhatsApp / Phone *</label>
            <input id="phone" className="input" type="tel" placeholder="+27 000 000 0000" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Session details */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 className="font-serif" style={{ fontSize: '1.35rem', marginBottom: '1.25rem' }}>
          Session Details
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label className="label" htmlFor="package">Session Package *</label>
            <div style={{ position: 'relative' }}>
              <select
                id="package"
                className="input"
                value={form.packageId}
                onChange={(e) => update('packageId', e.target.value)}
                required
                style={{ appearance: 'none', paddingRight: '2.5rem' }}
              >
                <option value="">Select a package…</option>
                {PACKAGES.map((p) => (
                  <option key={p.id} value={p.id}>{p.label}</option>
                ))}
              </select>
              <ChevronDown size={16} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', pointerEvents: 'none' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1rem' }}>
            <div>
              <label className="label" htmlFor="preferred-date">Preferred Date *</label>
              <input id="preferred-date" className="input" type="date" value={form.preferredDate} onChange={(e) => update('preferredDate', e.target.value)} required />
            </div>
            <div>
              <label className="label" htmlFor="alt-date">Alternative Date</label>
              <input id="alt-date" className="input" type="date" value={form.alternativeDate} onChange={(e) => update('alternativeDate', e.target.value)} />
            </div>
          </div>
          <div>
            <label className="label" htmlFor="location">Preferred Location</label>
            <input id="location" className="input" type="text" placeholder="e.g. 'Johannesburg CBD, Sandton park, my home'" value={form.location} onChange={(e) => update('location', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Add-ons */}
      <div style={{ marginBottom: '2rem' }}>
        <h2 className="font-serif" style={{ fontSize: '1.35rem', marginBottom: '1.25rem' }}>
          Add-Ons (Optional)
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {ADDONS.map((addon) => (
            <button
              key={addon.value}
              type="button"
              onClick={() => toggleAddon(addon.value)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-lg)',
                background: form.addOns.includes(addon.value) ? 'var(--color-photography-dim)' : 'var(--color-bg-card)',
                border: `1px solid ${form.addOns.includes(addon.value) ? 'rgba(61,165,138,0.5)' : 'var(--color-border)'}`,
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  border: `2px solid ${form.addOns.includes(addon.value) ? 'var(--color-photography)' : 'var(--color-border)'}`,
                  background: form.addOns.includes(addon.value) ? 'var(--color-photography)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.2s',
                }}
              >
                {form.addOns.includes(addon.value) && <Check size={12} color="#fff" />}
              </div>
              <span style={{ fontSize: '0.875rem', color: 'var(--color-text-primary)' }}>{addon.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Special requests */}
      <div style={{ marginBottom: '2rem' }}>
        <label className="label" htmlFor="special-requests">Special Requests / More Info</label>
        <textarea
          id="special-requests"
          className="input"
          placeholder="Tell me anything extra — outfit ideas, props, specific shots you want, your vision for the session…"
          value={form.specialRequests}
          onChange={(e) => update('specialRequests', e.target.value)}
          style={{ minHeight: 120 }}
        />
      </div>

      {error && (
        <div style={{ padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.25)', color: 'var(--color-error)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn btn-photo btn-lg"
        style={{ width: '100%', cursor: submitting ? 'wait' : 'pointer' }}
      >
        {submitting ? 'Sending request…' : <><Send size={17} /> Send Booking Request</>}
      </button>

      <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '1rem' }}>
        No payment required now — I'll confirm availability and send an invoice.
      </p>
    </form>
  )
}

export default function PhotographyBookPage() {
  return (
    <>
      {/* Header */}
      <section
        style={{
          paddingTop: '8rem',
          paddingBottom: '3rem',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          background: 'var(--color-bg-secondary)',
          borderBottom: '1px solid var(--color-border)',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-photography-dim)', border: '1px solid rgba(61,165,138,0.25)', borderRadius: 'var(--radius-full)', padding: '0.4rem 1.1rem', marginBottom: '1.25rem', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-photography)' }}>
            <Camera size={12} /> Book a Session
          </div>
          <h1 className="font-serif" style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', marginBottom: '0.75rem' }}>
            Reserve Your Session
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: 500, margin: '0 auto' }}>
            Fill in the form below and I'll confirm your date within 24 hours.
          </p>
        </div>
      </section>

      {/* Form */}
      <section style={{ padding: '3rem 1.5rem 5rem' }}>
        <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading form…</div>}>
          <BookingForm />
        </Suspense>
      </section>
    </>
  )
}
