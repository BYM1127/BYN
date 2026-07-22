'use client'

import { useCart } from '@/lib/context/CartContext'
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart()
  const router = useRouter()

  if (!isCartOpen) return null

  return (
    <>
      <div 
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100 }} 
        onClick={() => setIsCartOpen(false)}
      />
      
      <div 
        style={{ 
          position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '400px',
          background: 'var(--color-bg-primary)', zIndex: 101, boxShadow: '-4px 0 24px rgba(0,0,0,0.2)',
          display: 'flex', flexDirection: 'column'
        }}
      >
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShoppingBag size={20} /> Your Cart
          </h2>
          <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}>
            <X size={24} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--color-text-muted)', marginTop: '2rem' }}>
              <ShoppingBag size={48} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
              <p>Your cart is empty.</p>
              <button 
                onClick={() => { setIsCartOpen(false); router.push('/crochet/shop') }} 
                className="btn btn-primary" style={{ marginTop: '1.5rem' }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-secondary)', overflow: 'hidden' }}>
                    <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h3 style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.title}</h3>
                      <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-error)' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                      {item.variations && Object.entries(item.variations).map(([k, v]) => `${k}: ${v}`).join(', ')}
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-full)', padding: '0.2rem' }}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem', color: 'var(--color-text-primary)' }}>
                          <Minus size={14} />
                        </button>
                        <span style={{ fontSize: '0.85rem', fontWeight: 500, minWidth: '1.2rem', textAlign: 'center' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem', color: 'var(--color-text-primary)' }}>
                          <Plus size={14} />
                        </button>
                      </div>
                      <div style={{ fontWeight: 600 }}>R{item.price * item.quantity}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div style={{ padding: '1.5rem', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-secondary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: 600 }}>
              <span>Subtotal</span>
              <span>R{cartTotal}</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', textAlign: 'center' }}>
              Shipping and taxes calculated at checkout.
            </p>
            <button 
              onClick={() => { setIsCartOpen(false); router.push('/checkout') }}
              className="btn btn-primary" 
              style={{ width: '100%', padding: '1rem', justifyContent: 'center' }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  )
}
