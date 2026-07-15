'use client'

import { useState, useEffect } from 'react'
import { getOrdersByPillar, updateOrderStatus, OrderStatus } from '@/lib/actions/orders'
import { Clock, CheckCircle, Package, Truck, FileText, Star, Trash2 } from 'lucide-react'

interface OrderTableProps {
  pillar: string
}

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending_review: 'Pending Review',
  quoted: 'Quoted',
  accepted: 'Accepted',
  deposit_paid: 'Deposit Paid',
  in_production: 'In Production',
  ready: 'Ready for Dispatch',
  delivered: 'Delivered',
  confirmed: 'Confirmed',
  reviewing: 'Reviewing',
  completed: 'Completed',
  cancelled: 'Cancelled',
}

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending_review: 'var(--color-warning)',
  quoted: 'var(--color-photography-light)',
  accepted: 'var(--color-success)',
  deposit_paid: 'var(--color-success)',
  in_production: 'var(--color-crochet)',
  ready: 'var(--color-crochet-light)',
  delivered: 'var(--color-webdesign-light)',
  confirmed: 'var(--color-success)',
  reviewing: 'var(--color-warning)',
  completed: 'var(--color-success)',
  cancelled: 'var(--color-error)',
}

export function OrderTable({ pillar }: OrderTableProps) {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const data = await getOrdersByPillar(pillar)
      setOrders(data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchOrders()
  }, [pillar])

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus)
      // Optimistic update
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
    } catch (error) {
      console.error('Failed to update status', error)
      alert('Failed to update status. Is Firebase configured?')
    }
  }

  if (loading) return <div style={{ padding: '2rem', color: 'var(--color-text-muted)' }}>Loading orders...</div>

  if (orders.length === 0) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', background: 'var(--color-bg-card)', border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-xl)' }}>
        <Package size={48} style={{ color: 'var(--color-text-muted)', margin: '0 auto 1rem', opacity: 0.5 }} />
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>No orders yet</h3>
        <p style={{ color: 'var(--color-text-secondary)' }}>Customer orders for {pillar} will appear here.</p>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)' }}>
              <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Order ID</th>
              <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Customer</th>
              <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Details</th>
              <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Date</th>
              <th style={{ padding: '1rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={order.id} style={{ borderBottom: i === orders.length - 1 ? 'none' : '1px solid var(--color-border)' }}>
                <td style={{ padding: '1rem', fontSize: '0.85rem', fontFamily: 'monospace' }}>
                  {order.id.slice(0, 8)}
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontWeight: 600 }}>{order.data?.name || 'Unknown'}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{order.data?.email}</div>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.85rem' }}>
                  {order.data?.product || order.data?.package || order.data?.projectType || 'General Enquiry'}
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.2rem', maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {order.data?.details || order.data?.message}
                  </div>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                  {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'Just now'}
                </td>
                <td style={{ padding: '1rem' }}>
                  <select 
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                    style={{
                      padding: '0.4rem 0.75rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      background: 'transparent',
                      border: `1px solid ${STATUS_COLORS[order.status as OrderStatus] || 'var(--color-border)'}`,
                      color: STATUS_COLORS[order.status as OrderStatus] || 'var(--color-text-primary)',
                      cursor: 'pointer',
                      outline: 'none',
                    }}
                  >
                    {Object.entries(STATUS_LABELS).map(([val, label]) => (
                      <option key={val} value={val} style={{ color: '#000' }}>{label}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
