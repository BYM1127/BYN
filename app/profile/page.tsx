'use client'

import { useState, useEffect, useRef } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  User, LayoutDashboard, Users, FileText, Image as ImageIcon, 
  Settings, Globe, Moon, BookOpen, HelpCircle, LifeBuoy, 
  MessageCircle, Phone as PhoneIcon, X, Upload, Loader2, Link2, Search,
  Menu
} from 'lucide-react'
import { uploadImage } from '@/lib/actions/storage'

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  
  const [profile, setProfile] = useState<any>(null)
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    nickname: '',
    displayName: '',
    website: '',
    telegram: '',
    whatsapp: '',
    bio: ''
  })
  
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

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
            setProfile(data)
            setFormData({
              username: data.username || '',
              firstName: data.firstName || '',
              lastName: data.lastName || '',
              nickname: data.nickname || '',
              displayName: data.displayName || user.displayName || '',
              website: data.website || '',
              telegram: data.telegram || '',
              whatsapp: data.whatsapp || data.phone || '',
              bio: data.bio || ''
            })
          }
        })
    }
  }, [user])

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage(null)

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, phone: formData.whatsapp }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to update profile')
      
      setProfile(data.user)
      setMessage({ type: 'success', text: 'Profile updated successfully!' })
      setTimeout(() => setMessage(null), 3000)
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message })
    } finally {
      setIsSaving(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsChangingPassword(true)
    setPasswordMessage(null)

    try {
      const res = await fetch('/api/user/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword, newPassword }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to update password')
      
      setPasswordMessage({ type: 'success', text: 'Password updated successfully!' })
      setOldPassword('')
      setNewPassword('')
      setTimeout(() => setPasswordMessage(null), 3000)
    } catch (err: any) {
      setPasswordMessage({ type: 'error', text: err.message })
    } finally {
      setIsChangingPassword(false)
    }
  }

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploadingPhoto(true)
    try {
      const uploadData = new FormData()
      uploadData.append('file', file)
      uploadData.append('folder', 'profiles')
      
      const photoURL = await uploadImage(uploadData)
      
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, phone: formData.whatsapp, photoURL }),
      })
      
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to save photo URL')
      
      setProfile(data.user)
    } catch (err: any) {
      alert(err.message)
    } finally {
      setIsUploadingPhoto(false)
    }
  }

  const firstLetter = profile?.displayName?.charAt(0)?.toUpperCase() || (user as any)?.displayName?.charAt(0)?.toUpperCase() || 'U'
  const displayAvatar = profile?.photoURL || (user as any)?.photoURL

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 pt-[70px]">
      
      {/* Top Navigation Bar */}
      <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 fixed top-[70px] left-0 right-0 z-20">
        <div className="flex items-center gap-4">
          <button className="lg:hidden text-gray-500" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu size={24} />
          </button>
          <div className="font-bold text-xl tracking-tight flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-lg">&lt;</span>
            My Profile
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/profile" className="text-gray-900 font-bold border-b-2 border-blue-600 pb-1 mt-1">Dashboard</Link>
          <Link href="/news" className="hover:text-blue-600">News</Link>
          <Link href="/contact" className="hover:text-blue-600">Support</Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-sm overflow-hidden border border-gray-300">
            {displayAvatar ? <img src={displayAvatar} alt="avatar" className="w-full h-full object-cover" /> : firstLetter}
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-134px)] mt-[64px] relative">
        
        {/* Left Sidebar */}
        <div className={`${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform fixed lg:static top-[134px] left-0 z-10 w-64 h-full bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0`}>
          <div className="p-4">
            <div className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl bg-gray-50 mb-6">
              <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold overflow-hidden border border-gray-200 shrink-0">
                {displayAvatar ? <img src={displayAvatar} alt="avatar" className="w-full h-full object-cover" /> : firstLetter}
              </div>
              <div className="overflow-hidden">
                <div className="font-bold text-sm truncate">{profile?.displayName || user?.displayName || 'User'}</div>
                <div className="text-xs text-gray-500 truncate">{user?.email}</div>
              </div>
            </div>

            <div className="mb-6">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-3">Navigate</div>
              <nav className="flex flex-col gap-1">
                <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-blue-600 text-white font-medium text-sm shadow-sm">
                  <LayoutDashboard size={18} /> Dashboard
                </Link>
                {user.role === 'admin' && (
                  <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 font-medium text-sm transition-colors">
                    <Users size={18} /> Admin Panel
                  </Link>
                )}
                <Link href="/my-orders" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 font-medium text-sm transition-colors">
                  <FileText size={18} /> Orders
                </Link>
                <Link href="/gallery" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 font-medium text-sm transition-colors">
                  <ImageIcon size={18} /> Gallery
                </Link>
              </nav>
            </div>

            <div className="mb-6">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-3">More</div>
              <nav className="flex flex-col gap-1">
                <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 font-medium text-sm transition-colors">
                  <Settings size={18} /> Settings
                </Link>
                <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 font-medium text-sm transition-colors">
                  <Moon size={18} /> Night Mode
                </Link>
                <Link href="/contact" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-100 font-medium text-sm transition-colors">
                  <HelpCircle size={18} /> Help Center
                </Link>
              </nav>
            </div>
            
            <button 
              onClick={() => { signOut(); router.push('/'); }}
              className="w-full py-2.5 text-red-500 font-bold text-sm bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              Sign Out
            </button>
            
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50/50 p-4 lg:p-8">
          
          <div className="max-w-6xl mx-auto">
            
            {/* Header Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-4 mb-8 gap-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gray-100 rounded-lg"><User size={20} className="text-gray-600"/></div>
                <h1 className="text-xl font-bold">Profile Details</h1>
              </div>
              <div className="flex items-center gap-4 self-end sm:self-auto">
                <div className="hidden sm:flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
                  <button className="px-4 py-1.5 text-sm font-bold bg-white shadow-sm border border-gray-200 rounded-md text-gray-800">General</button>
                  <button className="px-4 py-1.5 text-sm font-bold text-gray-500 hover:text-gray-800">Security</button>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleSaveProfile} className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col lg:flex-row overflow-hidden">
              
              {/* Left Column: Account Management */}
              <div className="w-full lg:w-[350px] p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col">
                <h2 className="text-sm font-bold text-gray-800 mb-6">Account Management</h2>
                
                {/* Photo Upload */}
                <div className="mb-6 relative group">
                  <div className="w-full aspect-[4/5] bg-[#ebd8d0] rounded-xl overflow-hidden relative shadow-inner">
                    {displayAvatar ? (
                      <img src={displayAvatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-100">
                        <User size={48} className="mb-2 text-gray-300" />
                        <span className="text-sm font-medium">No photo</span>
                      </div>
                    )}
                    
                    {isUploadingPhoto && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
                        <Loader2 className="w-8 h-8 animate-spin text-white" />
                      </div>
                    )}
                  </div>
                  
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handlePhotoUpload}
                  />
                  
                  <button 
                    type="button" 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full mt-4 py-3 bg-white border-2 border-gray-100 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-200 transition-all shadow-sm"
                  >
                    Upload Photo
                  </button>
                </div>

                {/* Password Change */}
                <div className="mt-8">
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-gray-500 mb-2">Old Password</label>
                    <input 
                      type="password" 
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-gray-500 mb-2">New Password</label>
                    <input 
                      type="password" 
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"
                    />
                  </div>
                  
                  {passwordMessage && (
                    <div className={`text-xs font-bold p-2 mb-3 rounded-lg ${passwordMessage.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                      {passwordMessage.text}
                    </div>
                  )}
                  
                  <button 
                    type="button"
                    onClick={handleChangePassword}
                    disabled={isChangingPassword || !oldPassword || !newPassword}
                    className="w-full py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm disabled:opacity-50"
                  >
                    {isChangingPassword ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Change Password'}
                  </button>
                </div>
              </div>

              {/* Right Column: Profile Information */}
              <div className="flex-1 p-6 lg:p-8 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-sm font-bold text-gray-800">Profile Information</h2>
                  <button 
                    type="submit" 
                    disabled={isSaving}
                    className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-sm disabled:opacity-70 flex items-center gap-2"
                  >
                    {isSaving && <Loader2 size={16} className="animate-spin" />}
                    Save Changes
                  </button>
                </div>
                
                {message && (
                  <div className={`p-3 mb-6 rounded-lg text-sm font-bold ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {message.text}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-8">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2">Username</label>
                    <input name="username" value={formData.username} onChange={handleInputChange} type="text" className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2">First Name</label>
                    <input name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2">Nickname</label>
                    <input name="nickname" value={formData.nickname} onChange={handleInputChange} type="text" className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2">Role</label>
                    <select disabled className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-500 appearance-none cursor-not-allowed">
                      <option>{profile?.role === 'admin' ? 'Administrator' : 'Subscriber'}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2">Last Name</label>
                    <input name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2">Display Name Publicly as</label>
                    <input name="displayName" value={formData.displayName} onChange={handleInputChange} type="text" className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all" required />
                  </div>
                </div>

                <div className="h-px w-full bg-gray-100 mb-8"></div>

                <h2 className="text-sm font-bold text-gray-800 mb-6">Contact Info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-8">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2">Email (required)</label>
                    <input type="email" value={user.email || ''} disabled className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-500 cursor-not-allowed" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2">WhatsApp</label>
                    <input name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} type="text" placeholder="+1..." className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2">Website</label>
                    <input name="website" value={formData.website} onChange={handleInputChange} type="url" placeholder="https://" className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2">Telegram</label>
                    <input name="telegram" value={formData.telegram} onChange={handleInputChange} type="text" placeholder="@username" className="w-full p-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all" />
                  </div>
                </div>

                <div className="h-px w-full bg-gray-100 mb-8"></div>

                <h2 className="text-sm font-bold text-gray-800 mb-6">About the User</h2>
                <div className="mb-8">
                  <label className="block text-xs font-bold text-gray-500 mb-2">Biographical Info</label>
                  <textarea 
                    name="bio" 
                    value={formData.bio} 
                    onChange={handleInputChange} 
                    rows={6}
                    placeholder="Tell us a little bit about yourself..."
                    className="w-full p-4 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all resize-y"
                  ></textarea>
                </div>
                
              </div>
            </form>
            
            <div className="mt-8 flex justify-center pb-8">
              <div className="text-xs font-medium text-gray-400">© 2026 Bokas Yarn Market and Studio. All rights reserved.</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
