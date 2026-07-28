'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Wand2,
  ChevronRight,
  ChevronLeft,
  Check,
  Upload,
  Send,
  X,
  ImageIcon,
} from 'lucide-react'

// ── Wizard data ────────────────────────────────────────────────────────────

const PIECE_TYPES = [
  { value: 'bag',       label: 'Bag / Purse',      emoji: '👜' },
  { value: 'blanket',   label: 'Blanket',           emoji: '🛏️' },
  { value: 'top',       label: 'Top / Cardigan',    emoji: '👗' },
  { value: 'home',      label: 'Home Décor',        emoji: '🏡' },
  { value: 'baby',      label: 'Baby Item',         emoji: '🍼' },
  { value: 'accessory', label: 'Accessory',         emoji: '🎀' },
  { value: 'toy',       label: 'Amigurumi / Toy',   emoji: '🧸' },
  { value: 'other',     label: 'Something Else',    emoji: '✨' },
]

const STITCH_STYLES = [
  {
    value: 'single_stitch',
    label: 'Single Crochet Stitch',
    desc: 'Dense, tight, and durable stitch structure ideal for sturdy items and bags.',
    image: '/stitches/single-stitch.avif',
  },
  {
    value: 'half_double_stitch',
    label: 'Half Double Crochet Stitch',
    desc: 'Slightly open stitch offering a soft drape with great warmth.',
    image: '/stitches/half-double-stitch.jfif',
  },
  {
    value: 'double_stitch',
    label: 'Double Crochet Stitch',
    desc: 'Classic, fluid stitch pattern with a comfortable drape.',
    image: '/stitches/double-stitch.jfif',
  },
  {
    value: 'treble_stitch',
    label: 'Treble Crochet Stitch',
    desc: 'Tall, openwork stitch creating light and breezy fabrics.',
    image: '/stitches/trebble-stitch.jfif',
  },
  {
    value: 'granny_stitch',
    label: 'Granny Stitch',
    desc: 'Iconic 3-dc cluster motif stitch with timeless appeal.',
    image: '/stitches/granny-stitch.jfif',
  },
  {
    value: 'drunken_granny',
    label: 'Drunken Granny Stitch',
    desc: 'Off-kilter diagonal granny cluster pattern adding playful movement.',
    image: '/stitches/drunken-granny-stitch.jfif',
  },
  {
    value: 'waffle_stitch',
    label: 'Waffle Stitch',
    desc: 'Deep 3D squishy waffle grid texture, extra cozy, thick and warm.',
    image: '/stitches/waffle-stitch.jfif',
  },
  {
    value: 'jasmine_stitch',
    label: 'Jasmine Star Puff Stitch',
    desc: 'Intricate 3D star-burst flower puff stitch.',
    image: '/stitches/jasmine-stitch.webp',
  },
  {
    value: 'catherines_wheel',
    label: 'Catherine\'s Wheel Stitch',
    desc: 'Decorative circular starburst wheel motif pattern.',
    image: '/stitches/catherines-wheel.webp',
  },
  {
    value: 'arcade_stitch',
    label: 'Arcade Stitch',
    desc: 'Scalloped arch shell pattern with delicate openwork lace openings.',
    image: '/stitches/arcade-stitch.jpg',
  },
  {
    value: 'diamond_trellis',
    label: 'Diamond Trellis Stitch',
    desc: 'Raised front-post cable lattice forming geometric diamond diamonds.',
    image: '/stitches/diamond-trellis-stitch.webp',
  },
  {
    value: 'gingham_stitch',
    label: 'Gingham Check Stitch',
    desc: 'Two-tone tapestry check pattern creating a classic gingham look.',
    image: '/stitches/gingham-stitch.jfif',
  },
  {
    value: 'houndstooth_stitch',
    label: 'Houndstooth Pattern Stitch',
    desc: 'Sophisticated dual-color tessellated houndstooth check.',
    image: '/stitches/houndstooth-stitch.webp',
  },
  {
    value: 'harlequin_stitch',
    label: 'Harlequin Diamond Shell Stitch',
    desc: 'Bold diamond shell clusters with scalloped edges.',
    image: '/stitches/harlequin-stitch.jpeg',
  },
  {
    value: 'mosaic_stitch',
    label: 'Mosaic Pattern Stitch',
    desc: 'Intricate colorwork geometric block pattern.',
    image: '/stitches/mosaic-stitch.jfif',
  },
  {
    value: 'larksfoot_stitch',
    label: 'Larksfoot Feather Stitch',
    desc: 'Striking spiked feather cluster pattern.',
    image: '/stitches/larksfoot-stitch.jfif',
  },
  {
    value: 'lacy_shell_ripple',
    label: 'Lacy Shell Ripple Stitch',
    desc: 'Wavy undulating fan shell ripple design with delicate lace gaps.',
    image: '/stitches/lacy-shell-ripple-stitch.jfif',
  },
  {
    value: 'iris_stitch',
    label: 'Iris Shell Stitch',
    desc: 'V-stitch variation creating open floral lace columns.',
    image: '/stitches/iris-stitch.jfif',
  },
  {
    value: 'blossom_stitch',
    label: 'Blossom Floral Stitch',
    desc: 'Textured floral petal clusters with gentle openwork.',
    image: '/stitches/blossom-stitch.jfif',
  },
  {
    value: 'trinity_stitch',
    label: 'Trinity Star Stitch',
    desc: 'Dense 3-sc decrease starburst texture with zero holes.',
    image: '/stitches/trinity-stitch.jpg',
  },
  {
    value: 'solomons_knot',
    label: 'Solomon\'s Knot Lace Stitch',
    desc: 'Ultra-lightweight mesh lattice loop pattern.',
    image: '/stitches/solomons-knot-stitch.jpg',
  },
  {
    value: 'lemon_peel',
    label: 'Lemon Peel Texture Stitch',
    desc: 'Subtle nubby texture alternating single and double crochet stitches.',
    image: '/stitches/lemon-peel-stitch.jfif',
  },
  {
    value: 'sedge_stitch',
    label: 'Sedge Textured Stitch',
    desc: 'Plush diagonal textured grain pattern.',
    image: '/stitches/sedge-stitch.jfif',
  },
  {
    value: 'grit_stitch',
    label: 'Grit Stitch',
    desc: 'Sturdy, dense pebbled grain texture.',
    image: '/stitches/grit-stitch.jpg',
  },
  {
    value: 'waistcoat_stitch',
    label: 'Waistcoat / Knit-Look Stitch',
    desc: 'Dense V-shaped stitch mimicking traditional stockinette knit.',
    image: '/stitches/waistcoat-stitch.jfif',
  },
  {
    value: 'custom_reference',
    label: 'Custom Pattern (From My Reference Picture)',
    desc: 'Upload a photo of your own preferred stitch pattern in Step 5.',
    image: '/stitches/arcade-stitch.jpg',
  },
]

const COLOUR_OPTIONS = [
  { value: 'terracotta',  label: 'Terracotta',   hex: '#E07A5F' },
  { value: 'sage',        label: 'Sage Green',   hex: '#7B9E87' },
  { value: 'cream',       label: 'Cream',        hex: '#F5EFE6' },
  { value: 'charcoal',    label: 'Charcoal',     hex: '#3D3D4E' },
  { value: 'navy',        label: 'Navy',         hex: '#2D3A6B' },
  { value: 'dusty_rose',  label: 'Dusty Rose',   hex: '#D4A5A5' },
  { value: 'mustard',     label: 'Mustard',      hex: '#D4A853' },
  { value: 'forest',      label: 'Forest Green', hex: '#2D5A27' },
  { value: 'blush',       label: 'Blush',        hex: '#F2C4CE' },
  { value: 'cobalt',      label: 'Cobalt Blue',  hex: '#2962FF' },
  { value: 'lavender',    label: 'Lavender',     hex: '#B39DDB' },
  { value: 'custom',      label: 'Custom Palette / Tell me', hex: '#8B5CF6' },
]

const SIZES = [
  { value: 'xs',     label: 'Extra Small' },
  { value: 'small',  label: 'Small' },
  { value: 'medium', label: 'Medium' },
  { value: 'large',  label: 'Large' },
  { value: 'xl',     label: 'Extra Large' },
  { value: 'custom', label: 'Custom size — I\'ll describe below' },
]

const STEPS = [
  { id: 1, label: 'Piece Type',   desc: 'What are you after?' },
  { id: 2, label: 'Stitch Style', desc: 'Pick a pattern vibe' },
  { id: 3, label: 'Colours',      desc: 'Choose your palette' },
  { id: 4, label: 'Size & Fit',   desc: 'How big / what fit?' },
  { id: 5, label: 'Your Vision',  desc: 'Details & reference photo' },
  { id: 6, label: 'Review',       desc: 'Confirm & submit' },
]

interface WizardState {
  pieceType: string
  stitchStyle: string
  colours: string[]
  size: string
  customSizeNote: string
  inspirationNote: string
  customerNotes: string
  referenceLink: string
  referenceImage: string
  name: string
  email: string
  phone: string
}

const EMPTY: WizardState = {
  pieceType: '',
  stitchStyle: '',
  colours: [],
  size: '',
  customSizeNote: '',
  inspirationNote: '',
  customerNotes: '',
  referenceLink: '',
  referenceImage: '',
  name: '',
  email: '',
  phone: '',
}

export default function CrochetDesignPage() {
  const [step, setStep] = useState(1)
  const [state, setState] = useState<WizardState>({ ...EMPTY })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const update = (partial: Partial<WizardState>) =>
    setState((prev) => ({ ...prev, ...partial }))

  const toggleColour = (val: string) => {
    setState((prev) => ({
      ...prev,
      colours: prev.colours.includes(val)
        ? prev.colours.filter((c) => c !== val)
        : prev.colours.length < 4
        ? [...prev.colours, val]
        : prev.colours,
    }))
  }

  const canProceed = () => {
    if (step === 1) return Boolean(state.pieceType)
    if (step === 2) return Boolean(state.stitchStyle)
    if (step === 3) return state.colours.length > 0
    if (step === 4) return Boolean(state.size)
    if (step === 5) return true
    if (step === 6) return Boolean(state.name && state.email)
    return true
  }

  const handleSubmit = async () => {
    if (!state.name || !state.email) {
      setError('Please fill in your name and email.')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/notify-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'crochet', ...state }),
      })
      if (!res.ok) throw new Error('Failed to send order request')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div
        style={{
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem 1.5rem',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 500 }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🎉</div>
          <h1 className="font-serif" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            Order Received!
          </h1>
          <p style={{ lineHeight: 1.7, marginBottom: '2rem' }}>
            Thank you, <strong>{state.name}</strong>! Your custom crochet request has been received. I'll review your reference pictures and order details, then get back to you within 48 hours with a quote.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/crochet" className="btn btn-primary">
              Back to Crochet Studio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Header */}
      <section
        style={{
          paddingTop: '7rem',
          paddingBottom: '2rem',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
          borderBottom: '1px solid var(--color-border)',
          background: 'var(--color-bg-secondary)',
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--color-crochet)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            <Wand2 size={14} /> Custom Order Wizard
          </div>
          <h1 className="font-serif" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', marginBottom: '0.5rem' }}>
            Design Your Own Crochet Piece
          </h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Answer 6 quick questions, pick your stitch pattern, or upload a reference photo.
          </p>
        </div>
      </section>

      {/* Progress bar */}
      <div style={{ background: 'var(--color-bg-secondary)', padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {STEPS.map((s) => (
              <button
                key={s.id}
                onClick={() => s.id < step && setStep(s.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.5rem 0.75rem',
                  borderRadius: 'var(--radius-lg)',
                  background: 'transparent',
                  border: 'none',
                  cursor: s.id < step ? 'pointer' : 'default',
                  opacity: s.id > step ? 0.4 : 1,
                  flexShrink: 0,
                  transition: 'opacity 0.2s',
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    background:
                      s.id < step
                        ? 'var(--color-crochet)'
                        : s.id === step
                        ? 'var(--color-crochet-dim)'
                        : 'var(--color-bg-card)',
                    color:
                      s.id < step
                        ? '#fff'
                        : s.id === step
                        ? 'var(--color-crochet)'
                        : 'var(--color-text-muted)',
                    border: s.id === step ? '1px solid var(--color-crochet)' : '1px solid transparent',
                  }}
                >
                  {s.id < step ? <Check size={12} /> : s.id}
                </div>
                <span style={{ fontSize: '0.7rem', color: s.id === step ? 'var(--color-crochet)' : 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
                  {s.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Wizard content */}
      <section style={{ padding: '3rem 1.5rem' }}>
        <div className="container-narrow">

          {/* Step 1: Piece Type */}
          {step === 1 && (
            <div>
              <h2 className="font-serif" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>What type of piece would you like?</h2>
              <p style={{ marginBottom: '2rem' }}>Choose the main category. You can give more detail later.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 150px), 1fr))', gap: '1rem' }}>
                {PIECE_TYPES.map((pt) => (
                  <button
                    key={pt.value}
                    onClick={() => update({ pieceType: pt.value })}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '1.5rem 1rem',
                      borderRadius: 'var(--radius-xl)',
                      background: state.pieceType === pt.value ? 'var(--color-crochet-dim)' : 'var(--color-bg-card)',
                      border: `1px solid ${state.pieceType === pt.value ? 'var(--color-crochet)' : 'var(--color-border)'}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'center',
                    }}
                  >
                    <span style={{ fontSize: '2.25rem' }}>{pt.emoji}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 500, color: state.pieceType === pt.value ? 'var(--color-crochet)' : 'var(--color-text-primary)' }}>
                      {pt.label}
                    </span>
                    {state.pieceType === pt.value && <Check size={14} style={{ color: 'var(--color-crochet)' }} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Stitch Style */}
          {step === 2 && (
            <div>
              <h2 className="font-serif" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Select your Stitch Pattern</h2>
              <p style={{ marginBottom: '2rem' }}>Choose a stitch pattern below or select "Custom Pattern" to upload your own reference image in Step 5.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
                {STITCH_STYLES.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => update({ stitchStyle: s.value })}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 'var(--radius-xl)',
                      background: state.stitchStyle === s.value ? 'var(--color-crochet-dim)' : 'var(--color-bg-card)',
                      border: `2px solid ${state.stitchStyle === s.value ? 'var(--color-crochet)' : 'var(--color-border)'}`,
                      boxShadow: state.stitchStyle === s.value ? '0 4px 16px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.02)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'left',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <div style={{ position: 'relative', width: '100%', height: '140px', overflow: 'hidden', background: 'var(--color-bg-secondary)' }}>
                      <img
                        src={s.image}
                        alt={s.label}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                        loading="lazy"
                      />
                    </div>
                    <div style={{ padding: '1.25rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                        <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', fontSize: '0.9rem' }}>{s.label}</div>
                        {state.stitchStyle === s.value && <Check size={16} style={{ color: 'var(--color-crochet)', flexShrink: 0 }} />}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{s.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Colours */}
          {step === 3 && (
            <div>
              <h2 className="font-serif" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Choose your colours</h2>
              <p style={{ marginBottom: '2rem' }}>Pick up to 4 colours. You can mix and match!</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 140px), 1fr))', gap: '0.75rem' }}>
                {COLOUR_OPTIONS.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => toggleColour(c.value)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-lg)',
                      background: state.colours.includes(c.value) ? 'var(--color-crochet-dim)' : 'var(--color-bg-card)',
                      border: `1px solid ${state.colours.includes(c.value) ? 'var(--color-crochet)' : 'var(--color-border)'}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ width: 20, height: 20, borderRadius: '50%', background: c.hex, border: '2px solid rgba(255,255,255,0.15)', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>{c.label}</span>
                    {state.colours.includes(c.value) && <Check size={12} style={{ color: 'var(--color-crochet)', marginLeft: 'auto' }} />}
                  </button>
                ))}
              </div>
              {state.colours.length > 0 && (
                <p style={{ marginTop: '1rem', fontSize: '0.82rem', color: 'var(--color-crochet)' }}>
                  {state.colours.length} colour{state.colours.length > 1 ? 's' : ''} selected (max 4)
                </p>
              )}
            </div>
          )}

          {/* Step 4: Size */}
          {step === 4 && (
            <div>
              <h2 className="font-serif" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Size & Fit</h2>
              <p style={{ marginBottom: '2rem' }}>Select a size or describe your exact measurements below.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {SIZES.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => update({ size: s.value })}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1rem 1.5rem',
                      borderRadius: 'var(--radius-xl)',
                      background: state.size === s.value ? 'var(--color-crochet-dim)' : 'var(--color-bg-card)',
                      border: `1px solid ${state.size === s.value ? 'var(--color-crochet)' : 'var(--color-border)'}`,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>{s.label}</span>
                    {state.size === s.value && <Check size={16} style={{ color: 'var(--color-crochet)' }} />}
                  </button>
                ))}
              </div>
              <label className="label" htmlFor="custom-size">
                Custom measurements / extra size notes (optional)
              </label>
              <textarea
                id="custom-size"
                className="input"
                placeholder="e.g. 'Fits a 3-year-old, approx 55 cm blanket, UK size 14 bust'…"
                value={state.customSizeNote}
                onChange={(e) => update({ customSizeNote: e.target.value })}
                style={{ minHeight: 90 }}
              />
            </div>
          )}

          {/* Step 5: Vision & Reference Picture */}
          {step === 5 && (
            <div>
              <h2 className="font-serif" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Your Vision & Reference Picture</h2>
              <p style={{ marginBottom: '2rem' }}>Upload a reference picture of what you want made or describe specific details.</p>

              {/* Reference Picture File Upload */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label className="label">Upload Reference Picture (optional)</label>
                <div
                  style={{
                    border: '2px dashed var(--color-border)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '1.5rem',
                    textAlign: 'center',
                    background: 'var(--color-bg-card)',
                    transition: 'all 0.2s',
                  }}
                >
                  {state.referenceImage ? (
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <img
                        src={state.referenceImage}
                        alt="Reference upload preview"
                        style={{ maxHeight: 200, borderRadius: 'var(--radius-lg)', objectFit: 'cover', border: '1px solid var(--color-border)' }}
                      />
                      <button
                        type="button"
                        onClick={() => update({ referenceImage: '' })}
                        style={{
                          position: 'absolute',
                          top: -8,
                          right: -8,
                          background: 'var(--color-error)',
                          color: '#fff',
                          borderRadius: '50%',
                          border: 'none',
                          width: 26,
                          height: 26,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                        }}
                        title="Remove image"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <label
                      style={{
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: '50%',
                          background: 'var(--color-crochet-dim)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Upload size={20} style={{ color: 'var(--color-crochet)' }} />
                      </div>
                      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        Click to upload reference image
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                        Upload a photo of a stitch, pattern, or finished piece you love (PNG, JPG, WEBP)
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const reader = new FileReader()
                            reader.onloadend = () => {
                              update({ referenceImage: reader.result as string })
                            }
                            reader.readAsDataURL(file)
                          }
                        }}
                      />
                    </label>
                  )}
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label className="label" htmlFor="inspiration-note">
                  Inspiration & Details
                </label>
                <textarea
                  id="inspiration-note"
                  className="input"
                  placeholder="Describe the overall feel, specific features, intended use, gifting occasion, or anything else that would help me bring your vision to life…"
                  value={state.inspirationNote}
                  onChange={(e) => update({ inspirationNote: e.target.value })}
                  style={{ minHeight: 110 }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label className="label" htmlFor="customer-notes">
                  Additional Notes
                </label>
                <textarea
                  id="customer-notes"
                  className="input"
                  placeholder="Any yarn allergies? Budget target? Deadline? Special packaging requests?"
                  value={state.customerNotes}
                  onChange={(e) => update({ customerNotes: e.target.value })}
                  style={{ minHeight: 90 }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label className="label" htmlFor="reference-link">
                  Pinterest, Instagram or Video Link (optional)
                </label>
                <input
                  id="reference-link"
                  className="input"
                  type="url"
                  placeholder="Paste a link to Pinterest, Instagram, TikTok, or an image URL..."
                  value={state.referenceLink}
                  onChange={(e) => update({ referenceLink: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* Step 6: Review */}
          {step === 6 && (
            <div>
              <h2 className="font-serif" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Review & Submit</h2>
              <p style={{ marginBottom: '2rem' }}>Check your order summary, add your contact info, and submit.</p>

              {/* Order summary */}
              <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                <h3 style={{ fontWeight: 600, marginBottom: '1rem', fontSize: '0.9rem', color: 'var(--color-text-secondary)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  Order Summary
                </h3>
                {[
                  { label: 'Piece Type',   value: PIECE_TYPES.find((p) => p.value === state.pieceType)?.label },
                  { label: 'Stitch Style', value: STITCH_STYLES.find((s) => s.value === state.stitchStyle)?.label },
                  { label: 'Colours',      value: state.colours.map((c) => COLOUR_OPTIONS.find((o) => o.value === c)?.label).join(', ') },
                  { label: 'Size',         value: SIZES.find((s) => s.value === state.size)?.label },
                  {
                    label: 'Reference Image',
                    value: state.referenceImage ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img src={state.referenceImage} alt="Uploaded reference" style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', objectFit: 'cover' }} />
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-crochet)', fontWeight: 600 }}>Reference photo attached</span>
                      </div>
                    ) : '—',
                  },
                  { label: 'Reference Link', value: state.referenceLink ? <a href={state.referenceLink} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-crochet)', textDecoration: 'underline' }}>View Link</a> : '—' },
                  { label: 'Vision',       value: state.inspirationNote || '—' },
                ].map((row) => (
                  <div key={row.label} style={{ display: 'flex', gap: '1rem', padding: '0.6rem 0', borderBottom: '1px solid var(--color-border)' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', minWidth: 120 }}>{row.label}</span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-primary)', flex: 1 }}>{row.value || '—'}</span>
                  </div>
                ))}
              </div>

              {/* Contact info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label className="label" htmlFor="contact-name">Full Name *</label>
                  <input id="contact-name" className="input" type="text" placeholder="Your full name" value={state.name} onChange={(e) => update({ name: e.target.value })} />
                </div>
                <div>
                  <label className="label" htmlFor="contact-email">Email Address *</label>
                  <input id="contact-email" className="input" type="email" placeholder="your@email.com" value={state.email} onChange={(e) => update({ email: e.target.value })} />
                </div>
                <div>
                  <label className="label" htmlFor="contact-phone">Phone / WhatsApp (optional)</label>
                  <input id="contact-phone" className="input" type="tel" placeholder="+27 000 000 0000" value={state.phone} onChange={(e) => update({ phone: e.target.value })} />
                </div>
              </div>

              {error && (
                <div style={{ padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.25)', color: 'var(--color-error)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  {error}
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
            <button
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="btn btn-ghost"
              style={{ cursor: step === 1 ? 'not-allowed' : 'pointer', opacity: step === 1 ? 0.4 : 1 }}
            >
              <ChevronLeft size={16} /> Back
            </button>

            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
              Step {step} of {STEPS.length}
            </span>

            {step < STEPS.length ? (
              <button
                onClick={() => canProceed() && setStep((s) => s + 1)}
                disabled={!canProceed()}
                className="btn btn-primary"
                style={{ cursor: canProceed() ? 'pointer' : 'not-allowed', opacity: canProceed() ? 1 : 0.5 }}
              >
                Next <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting || !canProceed()}
                className="btn btn-primary"
                style={{ cursor: 'pointer' }}
              >
                {submitting ? 'Sending…' : <><Send size={15} /> Submit Order Request</>}
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
