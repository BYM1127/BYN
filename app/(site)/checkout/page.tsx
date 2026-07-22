'use client'

import { useState } from 'react'
import { useCart } from '@/lib/context/CartContext'
import { useRouter } from 'next/navigation'
import { CreditCard, Package, Truck, Lock, Loader2 } from 'lucide-react'

export default function CheckoutPage() {
  const { cart, cartTotal, cartCount } = useCart()
  const router = useRouter()
  
  const [shippingRate, setShippingRate] = useState<number>(0)
  const [isCalculatingShipping, setIsCalculatingShipping] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    addressLine1: '',
    city: '',
    province: '',
    postalCode: ''
  })

  // Basic mockup of complex shipping calculation
  const calculateShipping = () => {
    if (!formData.postalCode || !formData.province) return
    setIsCalculatingShipping(true)
    
    setTimeout(() => {
      // Logic for complex shipping calculation based on weight, dims, and province
      let rate = 120 // Base rate
      if (formData.province.toLowerCase().includes('gauteng')) rate = 90
      if (cartTotal > 1500) rate = 0 // Free shipping over R1500
      
      setShippingRate(rate)
      setIsCalculatingShipping(false)
    }, 600)
  }

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          shippingAddress: formData,
          shippingCost: shippingRate,
        }),
      })
      
      const data = await res.json()
      if (data.provider === 'payfast' && data.url && data.fields) {
        // Construct a hidden form and submit it to PayFast via native POST
        const form = document.createElement('form')
        form.method = 'POST'
        form.action = data.url
        form.style.display = 'none'
        
        for (const key in data.fields) {
          const input = document.createElement('input')
          input.type = 'hidden'
          input.name = key
          input.value = data.fields[key]
          form.appendChild(input)
        }
        
        document.body.appendChild(form)
        form.submit()
      } else {
        alert('Payment provider error. Please try again later.')
        setIsProcessing(false)
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Something went wrong.')
      setIsProcessing(false)
    }
  }

  if (cartCount === 0) {
    return (
      <div style={{ paddingTop: '8rem', paddingBottom: '4rem', textAlign: 'center', minHeight: '80vh' }}>
        <Package size={48} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Your cart is empty</h1>
        <button onClick={() => router.push('/crochet/shop')} className="btn btn-primary">
          Return to Shop
        </button>
      </div>
    )
  }

  return (
    <div style={{ paddingTop: '6rem', paddingBottom: '4rem', minHeight: '100vh', background: 'var(--color-bg-secondary)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3rem', alignItems: 'start' }}>
        
        {/* Checkout Form */}
        <div style={{ padding: '2rem', background: 'var(--color-bg-primary)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Lock size={18} /> Secure Checkout
          </h1>
          
          <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Contact Information</h2>
              <input 
                type="email" required placeholder="Email address" className="input" 
                value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            
            <div>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '1rem' }}>Shipping Address</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <input type="text" required placeholder="Full Name" className="input" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
                <input type="text" required placeholder="Address Line 1" className="input" value={formData.addressLine1} onChange={e => setFormData({ ...formData, addressLine1: e.target.value })} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <input type="text" required placeholder="City" className="input" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} />
                  <input 
                    type="text" required placeholder="Province / State" className="input" 
                    value={formData.province} 
                    onChange={e => setFormData({ ...formData, province: e.target.value })}
                    onBlur={calculateShipping}
                  />
                </div>
                <input 
                  type="text" required placeholder="Postal Code" className="input" 
                  value={formData.postalCode} 
                  onChange={e => setFormData({ ...formData, postalCode: e.target.value })}
                  onBlur={calculateShipping}
                />
              </div>
            </div>

            <button type="submit" disabled={isProcessing} className="btn btn-primary" style={{ marginTop: '1rem', width: '100%', padding: '1rem', fontSize: '1.1rem' }}>
              {isProcessing ? <><Loader2 size={18} className="animate-spin-slow" /> Processing...</> : <><CreditCard size={18} /> Proceed to Payment</>}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div style={{ position: 'sticky', top: '6rem', padding: '2rem', background: 'var(--color-bg-primary)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '1.5rem' }}>Order Summary</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: 60, height: 60, borderRadius: 'var(--radius-md)', background: 'var(--color-bg-secondary)', position: 'relative' }}>
                  <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
                  <span style={{ position: 'absolute', top: -6, right: -6, background: 'var(--color-text-primary)', color: 'var(--color-bg-primary)', fontSize: '0.7rem', width: 18, height: 18, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.quantity}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{item.title}</div>
                  {item.variations && <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{Object.values(item.variations).join(' / ')}</div>}
                </div>
                <div style={{ fontWeight: 600 }}>R{item.price * item.quantity}</div>
              </div>
            ))}
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
              <span>Subtotal</span>
              <span>R{cartTotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Shipping {isCalculatingShipping && <Loader2 size={12} className="animate-spin-slow" />}
              </span>
              <span>
                {shippingRate === 0 && cartTotal > 1500 ? 'Free' : `R${shippingRate}`}
              </span>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 700, borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
            <span>Total</span>
            <span>R{cartTotal + shippingRate}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.75rem', marginTop: '1rem', justifyContent: 'center' }}>
            <Truck size={12} /> Free shipping on orders over R1500
          </div>
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
