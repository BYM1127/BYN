'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { User, Phone, Mail, ShoppingBag, Settings, LogOut, CheckCircle, AlertCircle, Camera, Loader2, ShieldCheck } from 'lucide-react'
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
            setDisplayName(data.displayName || user.displayName || '')
            setPhone(data.phone || '')
          }
        })
    }
  }, [user])

  if (loading || !user) {
    return (
      <div style={{ paddingTop: '8rem', minHeight: '100vh', display: 'flex', justifyContent: 'center', background: 'var(--color-bg-secondary)' }}>
        <Loader2 className="w-10 h-10 animate-spin text-[var(--color-crochet)]" />
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
  const isAdmin = fullProfile?.role === 'admin' || user.role === 'admin'

  return (
    <div style={{ paddingTop: '7rem', paddingBottom: '6rem', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Background Orbs */}
      <div style={{ position: 'absolute', top: -150, left: -100, width: 500, height: 500, background: 'radial-gradient(circle, rgba(224,122,95,0.1) 0%, transparent 70%)', borderRadius: '50%', zIndex: -1 }}></div>
      <div style={{ position: 'absolute', bottom: -100, right: -50, width: 400, height: 400, background: 'radial-gradient(circle, rgba(132,165,157,0.1) 0%, transparent 70%)', borderRadius: '50%', zIndex: -1 }}></div>

      <div className="container" style={{ maxWidth: '1000px' }}>
        
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-serif text-4xl font-bold text-[var(--color-text-primary)]">
            My Space
          </h1>
          {isAdmin && (
            <Link href="/admin" className="flex items-center gap-2 px-4 py-2 bg-[var(--color-photography-dim)] text-[var(--color-photography)] rounded-full text-sm font-semibold hover:bg-[var(--color-photography)] hover:text-white transition-all shadow-sm">
              <ShieldCheck size={16} /> Admin Dashboard
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar */}
          <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
            {/* User Card */}
            <div className="relative p-8 flex flex-col items-center text-center overflow-hidden rounded-[2rem] border border-[var(--color-border)] shadow-xl" style={{ background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(20px)' }}>
              
              <div 
                className="relative w-28 h-28 rounded-full mb-5 flex items-center justify-center text-4xl font-bold text-white shadow-2xl transition-transform hover:scale-105 duration-300"
                style={{ background: 'linear-gradient(135deg, var(--color-crochet), var(--color-photography))' }}
              >
                {firstLetter}
                <button className="absolute bottom-0 right-0 p-2 bg-white text-[var(--color-text-primary)] rounded-full shadow-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                  <Camera size={14} />
                </button>
              </div>
              <h2 className="text-2xl font-bold mb-1 text-[var(--color-text-primary)] tracking-tight">{fullProfile?.displayName || user.displayName || 'User'}</h2>
              <p className="text-sm text-[var(--color-text-muted)] mb-5">{user.email}</p>
              
              <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent mb-5"></div>
              
              <div className="bg-[var(--color-bg-secondary)] px-5 py-2.5 rounded-full text-xs font-semibold text-[var(--color-text-secondary)] shadow-inner border border-gray-100/50">
                Member since {memberSince}
              </div>
            </div>

            {/* Quick Links */}
            <div className="rounded-[1.5rem] overflow-hidden border border-[var(--color-border)] shadow-lg" style={{ background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(20px)' }}>
              <Link href="/my-orders" className="flex items-center gap-4 p-5 hover:bg-white/60 transition-all border-b border-[var(--color-border)] text-[var(--color-text-primary)] font-semibold group">
                <div className="p-2 rounded-lg bg-[var(--color-crochet-dim)] text-[var(--color-crochet)] group-hover:scale-110 transition-transform">
                  <ShoppingBag size={18} />
                </div>
                My Orders
              </Link>
              <button 
                onClick={() => { signOut(); router.push('/'); }}
                className="w-full flex items-center gap-4 p-5 hover:bg-red-50/50 transition-all text-[var(--color-text-primary)] font-semibold text-left group"
              >
                <div className="p-2 rounded-lg bg-red-50 text-red-500 group-hover:scale-110 transition-transform">
                  <LogOut size={18} />
                </div>
                Sign Out
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-1 lg:col-span-8">
            <div className="p-8 md:p-10 rounded-[2rem] border border-[var(--color-border)] shadow-xl relative overflow-hidden h-full" style={{ background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(20px)' }}>
              
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[var(--color-gold)] to-transparent opacity-5 rounded-bl-[100%] pointer-events-none"></div>

              <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-2xl font-bold flex items-center gap-3 text-[var(--color-text-primary)]">
                  <div className="p-2.5 rounded-xl bg-[var(--color-photography-dim)] text-[var(--color-photography)] shadow-sm">
                    <Settings size={20} />
                  </div>
                  Account Details
                </h2>
                {!isEditing && (
                  <button 
                    onClick={() => {
                      setDisplayName(fullProfile?.displayName || user.displayName || '');
                      setPhone(fullProfile?.phone || '');
                      setIsEditing(true);
                    }}
                    className="px-5 py-2 rounded-full font-semibold text-sm border-2 border-[var(--color-photography)] text-[var(--color-photography)] hover:bg-[var(--color-photography)] hover:text-white transition-all shadow-sm hover:shadow-md"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              {message && (
                <div className={`p-4 rounded-xl mb-8 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${
                  message.type === 'success' 
                    ? 'bg-green-50 text-green-700 border border-green-200 shadow-sm' 
                    : 'bg-red-50 text-red-700 border border-red-200 shadow-sm'
                }`}>
                  {message.type === 'success' ? <CheckCircle size={20} className="text-green-500" /> : <AlertCircle size={20} className="text-red-500" />}
                  <span className="text-sm font-semibold">{message.text}</span>
                </div>
              )}

              {isEditing ? (
                <form onSubmit={handleSave} className="flex flex-col gap-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold mb-2 text-[var(--color-text-secondary)] uppercase tracking-wider">Display Name</label>
                      <div className="relative group">
                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] group-focus-within:text-[var(--color-photography)] transition-colors" />
                        <input 
                          type="text" 
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          className="w-full bg-white/80 border-2 border-transparent shadow-sm rounded-xl py-3 pl-12 pr-4 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-photography)] focus:bg-white transition-all font-medium"
                          required
                          placeholder="Your full name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 text-[var(--color-text-secondary)] uppercase tracking-wider">Phone Number</label>
                      <div className="relative group">
                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] group-focus-within:text-[var(--color-photography)] transition-colors" />
                        <input 
                          type="tel" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className="w-full bg-white/80 border-2 border-transparent shadow-sm rounded-xl py-3 pl-12 pr-4 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-photography)] focus:bg-white transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold mb-2 text-[var(--color-text-secondary)] uppercase tracking-wider">Email Address</label>
                      <div className="relative">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                        <input 
                          type="email" 
                          value={user.email || ''}
                          disabled
                          className="w-full bg-gray-100/50 border-2 border-transparent shadow-inner rounded-xl py-3 pl-12 pr-4 text-[var(--color-text-muted)] cursor-not-allowed font-medium"
                        />
                      </div>
                      <p className="text-xs text-[var(--color-text-muted)] mt-2 font-medium">Email address cannot be changed.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6 pt-6 border-t border-[var(--color-border)]">
                    <button 
                      type="submit" 
                      disabled={isSaving}
                      className="px-8 py-3 bg-[var(--color-photography)] text-white rounded-xl font-bold shadow-lg shadow-[var(--color-photography-dim)] hover:translate-y-[-2px] hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-wait flex items-center gap-2"
                    >
                      {isSaving && <Loader2 size={16} className="animate-spin" />}
                      {isSaving ? 'Saving Changes...' : 'Save Changes'}
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setIsEditing(false)}
                      disabled={isSaving}
                      className="px-8 py-3 bg-white text-[var(--color-text-secondary)] border border-gray-200 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col gap-8 relative z-10 mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="bg-white/50 p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="text-xs uppercase tracking-widest font-bold text-[var(--color-text-muted)] mb-2">Display Name</div>
                      <div className="text-lg text-[var(--color-text-primary)] font-semibold">{fullProfile?.displayName || user.displayName || 'Not set'}</div>
                    </div>
                    
                    <div className="bg-white/50 p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="text-xs uppercase tracking-widest font-bold text-[var(--color-text-muted)] mb-2">Email Address</div>
                      <div className="text-lg text-[var(--color-text-primary)] font-semibold">{user.email}</div>
                    </div>
                    
                    <div className="bg-white/50 p-6 rounded-2xl border border-gray-100 shadow-sm sm:col-span-2">
                      <div className="text-xs uppercase tracking-widest font-bold text-[var(--color-text-muted)] mb-2">Phone Number</div>
                      <div className="text-lg text-[var(--color-text-primary)] font-semibold">{fullProfile?.phone || <span className="text-gray-400 italic">Not provided</span>}</div>
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

