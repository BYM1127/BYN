'use client'

import { useState, useEffect } from 'react'
import { Sparkles, Scissors, Camera, Monitor, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getSiteSettings, SiteSettings } from '@/lib/firestore/settings'

export function DynamicHero() {
  const [settings, setSettings] = useState<SiteSettings | null>(null)
  
  useEffect(() => {
    async function fetchSettings() {
      const data = await getSiteSettings()
      setSettings(data)
    }
    fetchSettings()
  }, [])

  const tagline = settings?.heroTagline || 'BYM Studio — BokasYarnMarket Studio'
  const title = settings?.heroTitle || 'Crafted with Love.'
  const subtitle = settings?.heroSubtitle || "One passionate studio. Three creative services. Whether you want a handcrafted crochet piece, stunning portrait photos, or a website that wows — I've got you."

  return (
    <>
      {/* Tag */}
      <div
        className="animate-fade-up"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(212,168,83,0.1)',
          border: '1px solid rgba(212,168,83,0.25)',
          borderRadius: 'var(--radius-full)',
          padding: '0.4rem 1.1rem',
          marginBottom: '1.75rem',
          fontSize: '0.78rem',
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--color-gold)',
        }}
      >
        <Sparkles size={12} />
        {tagline}
      </div>

      {/* Headline */}
      <h1
        className="font-serif animate-fade-up delay-100"
        style={{
          fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
          fontWeight: 700,
          lineHeight: 1.08,
          marginBottom: '1.5rem',
          maxWidth: 900,
          margin: '0 auto 1.5rem',
          whiteSpace: 'pre-line',
        }}
      >
        {title}
        <br />
        <span className="text-gradient-crochet">Crochet</span>{' · '}
        <span className="text-gradient-photo">Photography</span>
        <br />
        <span className="text-gradient-web">Web Design</span>.
      </h1>

      {/* Subtitle */}
      <p
        className="animate-fade-up delay-200"
        style={{
          fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
          color: 'var(--color-text-secondary)',
          maxWidth: 600,
          margin: '0 auto 2.5rem',
          lineHeight: 1.7,
        }}
      >
        {subtitle}
      </p>

      {/* CTA buttons */}
      <div
        className="animate-fade-up delay-300"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'center',
          marginBottom: '4rem',
        }}
      >
        <Link href="/crochet" className="btn btn-primary btn-lg">
          <Scissors size={18} /> Shop Crochet
        </Link>
        <Link href="/photography" className="btn btn-photo btn-lg">
          <Camera size={18} /> Book a Shoot
        </Link>
        <Link href="/webdesign" className="btn btn-web btn-lg">
          <Monitor size={18} /> Get a Website
        </Link>
      </div>
    </>
  )
}
