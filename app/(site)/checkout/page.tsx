'use client'

import { useState } from 'react'
import { useCart } from '@/lib/context/CartContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FileText, Package, Send, Loader2, CheckCircle2 } from 'lucide-react'

export default function QuoteCheckoutPage() {
  const { cart, cartTotal, cartCount, clearCart } = useCart()
  const router = useRouter()
  
  const [isProcessing, setIsProcessing] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    phone: '',
    addressLine1: '',
    city: '',
    province: '',
    postalCode: '',
    notes: '',
  })

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      const res = await fetch('/api/notify-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'crochet_quote',
          ...formData,
          items: cart,
          cartTotal,
        }),
      })

      if (res.ok) {
        setSubmitted(true)
        clearCart()
      } else {
        alert('Could not submit quote request. Please try again.')
      }
    } catch (error) {
      console.error('Quote request error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (submitted) {
    return (
      <div style={{ paddingTop: '8rem', paddingBottom: '6rem', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 520, width: '100%', padding: '2.5rem', background: 'var(--color-bg-card)', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--color-border)', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', width: 64, height: 64, borderRadius: '50%', background: 'rgba(129,178,154,0.15)', color: 'var(--color-photography)', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <CheckCircle2 size={36} />
          </div>
          
          <h1 className="font-serif" style={{ fontSize: '1.85rem', marginBottom: '0.75rem' }}>
            Quote Request Submitted!
          </h1>
          
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Thank you, <strong style={{ color: 'var(--color-text-primary)' }}>{formData.fullName}</strong>! We have received your order quote request.
            Boka will email your custom quote & delivery details to <strong style={{ color: 'var(--color-crochet)' }}>{formData.email}</strong> within 24 hours.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/crochet/shop" className="btn btn-primary">
              Back to Collection
            </Link>
            <Link href="/" className="btn btn-ghost">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (cartCount === 0) {
    return (
      <div style={{ paddingTop: '8rem', paddingBottom: '4rem', textAlign: 'center', minHeight: '80vh' }}>
        <Package size={48} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Your order is empty</h1>
        <button onClick={() => router.push('/crochet/shop')} className="btn btn-primary">
          Return to Collection
        </button>
      </div>
    )
  }

  return (
    <div style={{ paddingTop: '7rem', paddingBottom: '5rem', minHeight: '100vh', background: 'var(--color-bg-secondary)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3rem', alignItems: 'start' }}>
        
        {/* Form Container */}
        <div style={{ padding: '2rem', background: 'var(--color-bg-primary)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-crochet)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
              <FileText size={15} /> Order Request
            </div>
            <h1 className="font-serif" style={{ fontSize: '1.75rem', fontWeight: 700 }}>
              Get a Quote for Your Order
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', marginTop: '0.35rem' }}>
              Fill in your details below and we will prepare a custom order & delivery quote for you.
            </p>
          </div>
          
          <form onSubmit={handleSubmitQuote} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label className="label">Full Name *</label>
              <input 
                type="text" required placeholder="Your full name" className="input" 
                value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label className="label">Email Address *</label>
                <input 
                  type="email" required placeholder="your@email.com" className="input" 
                  value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Phone / WhatsApp *</label>
                <input 
                  type="tel" required placeholder="0793200067" className="input" 
                  value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
            
            <div>
              <label className="label">Delivery Address *</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <input type="text" required placeholder="Street Address" className="input" value={formData.addressLine1} onChange={e => setFormData({ ...formData, addressLine1: e.target.value })} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <input type="text" required placeholder="City" className="input" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} />
                  <input type="text" required placeholder="Province" className="input" value={formData.province} onChange={e => setFormData({ ...formData, province: e.target.value })} />
                </div>
                <input type="text" required placeholder="Postal Code" className="input" value={formData.postalCode} onChange={e => setFormData({ ...formData, postalCode: e.target.value })} />
              </div>
            </div>

            <div>
              <label className="label">Special Instructions or Custom Notes (optional)</label>
              <textarea 
                placeholder="Any custom color requests, urgency, or notes..." className="input" 
                value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })}
                style={{ minHeight: 90 }}
              />
            </div>

            <button type="submit" disabled={isProcessing} className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%', padding: '1rem', fontSize: '1rem', justifyContent: 'center' }}>
              {isProcessing ? <><Loader2 size={18} className="animate-spin-slow" /> Submitting Request...</> : <><Send size={16} /> Get a Quote for Your Order</>}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div style={{ position: 'sticky', top: '6rem', padding: '2rem', background: 'var(--color-bg-primary)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1.5rem' }}>Order Summary</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: 54, height: 54, borderRadius: 'var(--radius-md)', background: 'var(--color-bg-secondary)', position: 'relative', flexShrink: 0 }}>
                  <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
                  <span style={{ position: 'absolute', top: -6, right: -6, background: 'var(--color-crochet)', color: '#fff', fontSize: '0.7rem', width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                    {item.quantity}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{item.title}</div>
                  {item.variations && <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{Object.values(item.variations).join(' / ')}</div>}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-crochet)', fontWeight: 600 }}>Quote on Request</div>
              </div>
            ))}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 700, borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem' }}>
            <span>Order Total</span>
            <span style={{ color: 'var(--color-crochet)' }}>Custom Quote</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '0.75rem', textAlign: 'center', lineHeight: 1.5 }}>
            Final pricing and courier shipping options will be detailed in your custom quote.
          </p>
        </div>

      </div>
      
      <style>{`
        @media (max-width: 900px) {
          .container { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
