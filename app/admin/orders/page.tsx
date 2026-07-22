import dbConnect from '@/lib/db'
import Order from '@/models/Order'

export const revalidate = 0

export default async function AdminOrdersPage() {
  await dbConnect()
  const orders = await Order.find({}).sort({ createdAt: -1 }).populate('userId', 'name email').lean()

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>Orders</h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>Manage your e-commerce orders and custom inquiries.</p>
      </div>

      <div className="card" style={{ padding: '1.5rem', overflowX: 'auto' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
              <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Order ID</th>
              <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Customer</th>
              <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Type</th>
              <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Total</th>
              <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order: any) => (
                <tr key={order._id.toString()} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>{order._id.toString().slice(-6).toUpperCase()}</td>
                  <td style={{ padding: '1rem' }}>{order.userId?.name || order.shippingAddress?.fullName || 'Guest'}</td>
                  <td style={{ padding: '1rem', textTransform: 'capitalize' }}>{order.pillar}</td>
                  <td style={{ padding: '1rem' }}>{order.totalAmount > 0 ? `R${order.totalAmount}` : '-'}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)' }}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
