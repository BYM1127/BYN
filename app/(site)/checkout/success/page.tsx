'use client'

import { useEffect } from 'react'
import { useCart } from '@/lib/context/CartContext'
import Link from 'next/link'
import { CheckCircle, ShoppingBag } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id') || searchParams.get('mock_order_id')

  useEffect(() => {
    // Clear the cart when the user reaches the success page
    clearCart()
  }, [clearCart])

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '6rem', minHeight: '80vh', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <CheckCircle size={80} style={{ color: '#4ade80', marginBottom: '1.5rem' }} />
      <h1 className="font-serif" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Order Confirmed!</h1>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.1rem', maxWidth: 600, marginBottom: '2rem' }}>
        Thank you for your purchase. We have received your order and are getting it ready for you. You will receive an email confirmation shortly.
      </p>
      
      {sessionId && (
        <div style={{ background: 'var(--color-bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-lg)', marginBottom: '2rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
          Order Reference: {sessionId}
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link href="/crochet/shop" className="btn btn-primary">
          <ShoppingBag size={18} /> Continue Shopping
        </Link>
        <Link href="/my-orders" className="btn btn-ghost">
          View My Orders
        </Link>
      </div>
    </div>
  )
}
