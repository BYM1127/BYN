'use client'

import { useState, useEffect } from 'react'
import { getSiteSettings, updateSiteSettings, SiteSettingsData as SiteSettings } from '@/lib/actions/settings'
import { Save, Loader2, Globe } from 'lucide-react'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    heroTagline: '',
    heroTitle: '',
    heroSubtitle: '',
    contactEmail: '',
    aboutText: '',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function loadSettings() {
      const data = await getSiteSettings()
      if (data) {
        setSettings({
          heroTagline: data.heroTagline || '',
          heroTitle: data.heroTitle || '',
          heroSubtitle: data.heroSubtitle || '',
          contactEmail: data.contactEmail || '',
          aboutText: data.aboutText || '',
        })
      }
      setLoading(false)
    }
    loadSettings()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateSiteSettings(settings)
      alert('Settings saved successfully!')
    } catch (error) {
      console.error(error)
      alert('Failed to save settings. Make sure Firebase is configured.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading settings...</div>
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 800 }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="font-serif" style={{ fontSize: '2rem', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Globe size={24} /> Site Settings
        </h1>
        <p style={{ color: 'var(--color-text-muted)' }}>
          Update the global text and configuration for your website. Changes will reflect instantly on the public site.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Hero Section */}
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
            Homepage Hero Section
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="label">Hero Tagline (e.g. "BYM Studio — BokasYarnMarket Studio")</label>
              <input 
                name="heroTagline" 
                type="text" 
                className="input" 
                value={settings.heroTagline} 
                onChange={handleChange} 
                placeholder="BYM Studio — BokasYarnMarket Studio"
              />
            </div>

            <div>
              <label className="label">Hero Title (Main Heading)</label>
              <textarea 
                name="heroTitle" 
                className="input" 
                value={settings.heroTitle} 
                onChange={handleChange} 
                rows={3}
                placeholder="Crafted with Love."
              />
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                Note: The Crochet, Photography, and Web Design gradients are automatically appended below this title.
              </p>
            </div>

            <div>
              <label className="label">Hero Subtitle</label>
              <textarea 
                name="heroSubtitle" 
                className="input" 
                value={settings.heroSubtitle} 
                onChange={handleChange} 
                rows={3}
                placeholder="One passionate studio. Three creative services..."
              />
            </div>
          </div>
        </div>

        {/* Global Details */}
        <div style={{ marginTop: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
            Global Details
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="label">Contact Email</label>
              <input 
                name="contactEmail" 
                type="email" 
                className="input" 
                value={settings.contactEmail} 
                onChange={handleChange} 
                placeholder="hello@bymstudio.com"
              />
            </div>
          </div>
        </div>

        <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" disabled={saving} className="btn btn-primary">
            {saving ? <><Loader2 size={16} className="animate-spin-slow" /> Saving...</> : <><Save size={16} /> Save Settings</>}
          </button>
        </div>
      </form>
    </div>
  )
}
