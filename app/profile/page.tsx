'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { User, Phone, Mail, ShoppingBag, Settings, LogOut, CheckCircle, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [phone, setPhone] = useState('')
  const [fullProfile, setFullProfile] = useState<any>(null)
  
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login?callbackUrl=/profile')
    }
  }, [loading, user, router])

  useEffect(() => {
    if (user) {
      fetch('/api/user/profile')
        .then(res => res.json())
        .then(data => {
          if (!data.error) {
            setFullProfile(data)
            setDisplayName(data.displayName || '')
            setPhone(data.phone || '')
          }
        })
    }
  }, [user])

  if (loading || !user) {
    return (
      <div style={{ paddingTop: '8rem', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
        <div className="w-8 h-8 border-4 border-[var(--color-crochet)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage(null)

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName, phone }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Failed to update profile')

      if (data.user) {
        setFullProfile({ ...fullProfile, ...data.user })
      }
      
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
      setIsEditing(false)
      
      setTimeout(() => setMessage(null), 3000)
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setIsSaving(false)
    }
  }

  // Get first letter for avatar fallback
  const firstLetter = fullProfile?.displayName?.charAt(0)?.toUpperCase() || user?.displayName?.charAt(0)?.toUpperCase() || 'U'
  const memberSince = fullProfile?.createdAt ? new Date(fullProfile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently'

  return (
    <div style={{ paddingTop: '7rem', paddingBottom: '6rem', minHeight: '100vh', background: 'var(--color-bg-secondary)' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        
        <h1 className="font-serif text-3xl font-bold mb-8 text-[var(--color-text-primary)]">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Sidebar */}
          <div className="col-span-1 flex flex-col gap-4">
            {/* User Card */}
            <div className="card p-6 flex flex-col items-center text-center">
              <div 
                className="w-24 h-24 rounded-full mb-4 flex items-center justify-center text-3xl font-bold text-white shadow-lg"
                style={{ background: 'linear-gradient(135deg, var(--color-crochet), var(--color-photography))' }}
              >
                {firstLetter}
              </div>
              <h2 className="text-xl font-bold mb-1 text-[var(--color-text-primary)]">{fullProfile?.displayName || user.displayName || 'User'}</h2>
              <p className="text-sm text-[var(--color-text-muted)] mb-4">{user.email}</p>
              <div className="bg-[var(--color-bg-secondary)] px-4 py-2 rounded-full text-xs font-semibold text-[var(--color-text-secondary)]">
                Member since {memberSince}
              </div>
            </div>

            {/* Quick Links */}
            <div className="card overflow-hidden">
              <Link href="/my-orders" className="flex items-center gap-3 p-4 hover:bg-[var(--color-bg-secondary)] transition-colors border-b border-[var(--color-border)] text-[var(--color-text-primary)] font-medium">
                <ShoppingBag size={18} className="text-[var(--color-crochet)]" />
                My Orders
              </Link>
              <button 
                onClick={() => { signOut(); router.push('/'); }}
                className="w-full flex items-center gap-3 p-4 hover:bg-[var(--color-bg-secondary)] transition-colors text-[var(--color-text-primary)] font-medium text-left"
              >
                <LogOut size={18} className="text-red-500" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-1 md:col-span-2">
            <div className="card p-6 md:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2 text-[var(--color-text-primary)]">
                  <Settings size={20} className="text-[var(--color-photography)]" />
                  Account Details
                </h2>
                {!isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="btn btn-ghost btn-sm text-[var(--color-photography)]"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              {message && (
                <div className={`p-4 rounded-lg mb-6 flex items-center gap-3 ${
                  message.type === 'success' 
                    ? 'bg-green-500/10 text-green-600 border border-green-500/20' 
                    : 'bg-red-500/10 text-red-600 border border-red-500/20'
                }`}>
                  {message.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                  <span className="text-sm font-medium">{message.text}</span>
                </div>
              )}

              {isEditing ? (
                <form onSubmit={handleSave} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-[var(--color-text-secondary)]">Display Name</label>
                    <div className="relative">
                      <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                      <input 
                        type="text" 
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg py-2.5 pl-10 pr-4 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-crochet)]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-[var(--color-text-secondary)]">Phone Number</label>
                    <div className="relative">
                      <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                      <input 
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg py-2.5 pl-10 pr-4 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-crochet)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-[var(--color-text-secondary)]">Email Address</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                      <input 
                        type="email" 
                        value={user.email || ''}
                        disabled
                        className="w-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg py-2.5 pl-10 pr-4 text-[var(--color-text-muted)] cursor-not-allowed opacity-70"
                      />
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1.5">Email address cannot be changed.</p>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button 
                      type="submit" 
                      disabled={isSaving}
                      className="btn btn-primary"
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setIsEditing(false)}
                      disabled={isSaving}
                      className="btn btn-ghost"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <div className="text-xs uppercase tracking-wider font-bold text-[var(--color-text-muted)] mb-1">Display Name</div>
                      <div className="text-[var(--color-text-primary)] font-medium">{fullProfile?.displayName || user.displayName || 'Not set'}</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider font-bold text-[var(--color-text-muted)] mb-1">Email Address</div>
                      <div className="text-[var(--color-text-primary)] font-medium">{user.email}</div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider font-bold text-[var(--color-text-muted)] mb-1">Phone Number</div>
                      <div className="text-[var(--color-text-primary)] font-medium">{fullProfile?.phone || 'Not set'}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
