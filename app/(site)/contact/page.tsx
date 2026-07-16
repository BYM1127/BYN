'use client'

import { useState } from 'react'
import { Mail, Phone, Share2, MessageCircle, Send, MapPin } from 'lucide-react'

const CONTACT_ITEMS = [
  {
    icon: <Mail size={20} />,
    label: 'Email',
    value: 'hello@bymstudio.co',
    href: 'mailto:hello@bymstudio.co',
    color: 'var(--color-gold)',
  },
  {
    icon: <Phone size={20} />,
    label: 'WhatsApp',
    value: '+27 000 000 0000',
    href: 'https://wa.me/27000000000',
    color: 'var(--color-photography)',
  },
  {
    icon: <Share2 size={20} />,
    label: 'Instagram',
    value: '@bymstudio',
    href: 'https://instagram.com/bymstudio',
    color: 'var(--color-crochet)',
  },
  {
    icon: <MapPin size={20} />,
    label: 'Location',
    value: 'South Africa · Serving Worldwide',
    href: undefined,
    color: 'var(--color-webdesign)',
  },
]

const ENQUIRY_TYPES = [
  { value: 'crochet',     label: '🧶 Crochet Order' },
  { value: 'photography', label: '📷 Photography Booking' },
  { value: 'webdesign',   label: '💻 Web Design Project' },
  { value: 'general',     label: '✉️ General Enquiry' },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitted(true)
    setSubmitting(false)
  }

  return (
    <>
      {/* Header */}
      <section
        style={{
          paddingTop: '9rem',
          paddingBottom: '4rem',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          textAlign: 'center',
          background: 'var(--color-bg-secondary)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container">
          <span className="badge badge-gold" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            <Mail size={11} style={{ marginRight: '0.35rem' }} /> Get in Touch
          </span>
          <h1 className="font-serif" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '0.75rem' }}>
            Let's Start a Conversation
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: 500, margin: '0 auto' }}>
            Whether you have a question, an idea, or you're ready to order — I'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '4rem 1.5rem 6rem' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '3rem',
              alignItems: 'start',
            }}
          >
            {/* Left: contact info */}
            <div>
              <h2 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '1.75rem' }}>
                Contact Details
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                {CONTACT_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem 1.25rem',
                      background: 'var(--color-bg-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 'var(--radius-xl)',
                      transition: 'all 0.2s',
                      ...(item.href ? { cursor: 'pointer' } : {}),
                    }}
                    onClick={() => item.href && window.open(item.href, '_blank')}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 'var(--radius-lg)',
                        background: `${item.color}18`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: item.color,
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--color-text-primary)', fontWeight: 500 }}>
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/27000000000?text=Hi%20BYM%20Studio%2C%20I%27d%20like%20to%20enquire%20about…"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-photo"
                style={{ width: '100%', justifyContent: 'center', textDecoration: 'none', display: 'flex' }}
              >
                <MessageCircle size={17} /> Chat on WhatsApp
              </a>
            </div>

            {/* Right: contact form */}
            <div>
              <h2 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '1.75rem' }}>
                Send a Message
              </h2>

              {submitted ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '3rem 2rem',
                    background: 'var(--color-bg-card)',
                    border: '1px solid rgba(212,168,83,0.25)',
                    borderRadius: 'var(--radius-2xl)',
                  }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✉️</div>
                  <h3 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>
                    Message Sent!
                  </h3>
                  <p style={{ lineHeight: 1.7, color: 'var(--color-text-secondary)' }}>
                    Thanks for reaching out, <strong style={{ color: 'var(--color-text-primary)' }}>{form.name}</strong>!
                    I'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label className="label" htmlFor="c-name">Your Name</label>
                    <input id="c-name" className="input" type="text" placeholder="Jane Doe" value={form.name} onChange={(e) => update('name', e.target.value)} required />
                  </div>
                  <div>
                    <label className="label" htmlFor="c-email">Email Address</label>
                    <input id="c-email" className="input" type="email" placeholder="jane@email.com" value={form.email} onChange={(e) => update('email', e.target.value)} required />
                  </div>
                  <div>
                    <label className="label" htmlFor="c-type">I'm enquiring about…</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                      {ENQUIRY_TYPES.map((t) => (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => update('type', t.value)}
                          style={{
                            padding: '0.6rem 0.85rem',
                            borderRadius: 'var(--radius-lg)',
                            border: `1px solid ${form.type === t.value ? 'var(--color-gold)' : 'var(--color-border)'}`,
                            background: form.type === t.value ? 'var(--color-gold-dim)' : 'var(--color-bg-card)',
                            color: form.type === t.value ? 'var(--color-gold)' : 'var(--color-text-secondary)',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            fontWeight: 500,
                            transition: 'all 0.2s',
                            textAlign: 'left',
                          }}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="label" htmlFor="c-message">Message</label>
                    <textarea
                      id="c-message"
                      className="input"
                      placeholder="Tell me what's on your mind…"
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      style={{ minHeight: 140 }}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-gold btn-lg"
                    style={{ cursor: submitting ? 'wait' : 'pointer' }}
                  >
                    {submitting ? 'Sending…' : <><Send size={16} /> Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
