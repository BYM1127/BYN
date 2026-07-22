'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createProduct, updateProduct, deleteProduct } from '@/lib/actions/products'
import { Loader2, Trash2 } from 'lucide-react'

export default function ProductForm({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const isEditing = !!initialData
  
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    price: initialData?.price || 0,
    category: initialData?.category || 'bags',
    imageUrl: initialData?.imageUrl || '',
    stockQuantity: initialData?.stockQuantity || 0,
    weightGrams: initialData?.weightGrams || 0,
    sku: initialData?.sku || '',
    isPublished: initialData?.isPublished ?? true,
    tags: initialData?.tags?.join(', ') || '',
  })
  
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    const payload = {
      ...formData,
      tags: formData.tags.split(',').map((t: string) => t.trim()).filter(Boolean),
    }

    try {
      if (isEditing) {
        const res = await updateProduct(initialData.id, payload)
        if (res.success) {
          router.push('/admin/products')
          router.refresh()
        } else alert('Error updating product: ' + res.error)
      } else {
        const res = await createProduct(payload)
        if (res.success) {
          router.push('/admin/products')
          router.refresh()
        } else alert('Error creating product: ' + res.error)
      }
    } catch (err) {
      alert('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product?')) return
    setDeleting(true)
    try {
      const res = await deleteProduct(initialData.id)
      if (res.success) {
        router.push('/admin/products')
        router.refresh()
      } else {
        alert('Error deleting product: ' + res.error)
      }
    } finally {
      setDeleting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: 800 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Title *</label>
          <input type="text" required className="input" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Category *</label>
          <select required className="input" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
            <option value="bags">Bags</option>
            <option value="blankets">Blankets</option>
            <option value="tops">Tops</option>
            <option value="home_decor">Home Décor</option>
            <option value="baby">Baby</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Description *</label>
        <textarea required className="input" rows={4} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Price (ZAR) *</label>
          <input type="number" required min="0" className="input" value={formData.price} onChange={e => setFormData({ ...formData, price: Number(e.target.value) })} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Stock Quantity *</label>
          <input type="number" required min="0" className="input" value={formData.stockQuantity} onChange={e => setFormData({ ...formData, stockQuantity: Number(e.target.value) })} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Weight (Grams)</label>
          <input type="number" min="0" className="input" value={formData.weightGrams} onChange={e => setFormData({ ...formData, weightGrams: Number(e.target.value) })} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Image URL *</label>
          <input type="url" required className="input" placeholder="https://..." value={formData.imageUrl} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>SKU (Optional)</label>
          <input type="text" className="input" value={formData.sku} onChange={e => setFormData({ ...formData, sku: e.target.value })} />
        </div>
      </div>
      
      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Tags (comma separated)</label>
        <input type="text" className="input" placeholder="bag, summer, boho" value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <input type="checkbox" id="isPublished" checked={formData.isPublished} onChange={e => setFormData({ ...formData, isPublished: e.target.checked })} style={{ width: 18, height: 18 }} />
        <label htmlFor="isPublished" style={{ fontWeight: 500, fontSize: '0.9rem' }}>Publish Product</label>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button type="submit" disabled={loading} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
          {loading ? <Loader2 size={18} className="animate-spin-slow" /> : (isEditing ? 'Update Product' : 'Create Product')}
        </button>
        {isEditing && (
          <button type="button" onClick={handleDelete} disabled={deleting} className="btn btn-ghost" style={{ color: 'var(--color-error)', border: '1px solid var(--color-error)' }}>
            {deleting ? <Loader2 size={18} className="animate-spin-slow" /> : <Trash2 size={18} />}
          </button>
        )}
      </div>
    </form>
  )
}
