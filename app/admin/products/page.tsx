import dbConnect from '@/lib/db'
import Product from '@/models/Product'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 0

export default async function AdminProductsPage() {
  await dbConnect()
  const products = await Product.find({}).sort({ createdAt: -1 }).lean()

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>Products</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>Manage your e-commerce inventory.</p>
        </div>
        <Link href="/admin/products/new" className="btn btn-primary btn-sm">
          <Plus size={16} /> Add Product
        </Link>
      </div>

      <div className="card" style={{ padding: '1.5rem', overflowX: 'auto' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
              <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Product</th>
              <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Category</th>
              <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Price</th>
              <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Stock</th>
              <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                  No products found. Click "Add Product" to create your first item.
                </td>
              </tr>
            ) : (
              products.map((product: any) => (
                <tr key={product._id.toString()} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: 40, height: 40, background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                      {product.imageUrl && <img src={product.imageUrl} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                    </div>
                    <Link href={`/admin/products/${product._id}`} style={{ fontWeight: 600, color: 'var(--color-text-primary)', textDecoration: 'none' }}>
                      {product.title}
                    </Link>
                  </td>
                  <td style={{ padding: '1rem' }}>{product.category}</td>
                  <td style={{ padding: '1rem' }}>R{product.price}</td>
                  <td style={{ padding: '1rem' }}>{product.stockQuantity}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', background: product.isPublished ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)', color: product.isPublished ? '#4ade80' : '#f87171' }}>
                      {product.isPublished ? 'Published' : 'Draft'}
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
