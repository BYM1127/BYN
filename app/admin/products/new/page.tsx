import ProductForm from '@/components/admin/ProductForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewProductPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <Link href="/admin/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', textDecoration: 'none', marginBottom: '1rem' }}>
          <ArrowLeft size={16} /> Back to Products
        </Link>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Add New Product</h1>
      </div>
      
      <ProductForm />
    </div>
  )
}
