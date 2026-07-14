'use client'

import { useState, useEffect } from 'react'
import { getPortfolioItems, addPortfolioItem, updatePortfolioItem, deletePortfolioItem, PortfolioItem } from '@/lib/firestore'
import { uploadImage } from '@/lib/firestore/storage'
import { Plus, Edit2, Trash2, Image as ImageIcon, Loader2 } from 'lucide-react'

interface CMSManagerProps {
  pillar: 'crochet' | 'photography' | 'webdesign' | 'gallery'
}

export function CMSManager({ pillar }: CMSManagerProps) {
  const [items, setItems] = useState<PortfolioItem[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null)

  // Form State
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [tags, setTags] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState('')

  const fetchItems = async () => {
    setLoading(true)
    try {
      const data = await getPortfolioItems(pillar)
      setItems(data)
    } catch (error) {
      console.error('Error fetching items:', error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchItems()
  }, [pillar])

  const resetForm = () => {
    setEditingItem(null)
    setTitle('')
    setDescription('')
    setCategory('')
    setPrice('')
    setTags('')
    setImageFile(null)
    setImageUrl('')
    setIsModalOpen(false)
  }

  const openEdit = (item: PortfolioItem) => {
    setEditingItem(item)
    setTitle(item.title)
    setDescription(item.description || '')
    setCategory(item.category)
    setPrice(item.price ? item.price.toString() : '')
    setTags(item.tags.join(', '))
    setImageUrl(item.imageUrl)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return
    await deletePortfolioItem(id)
    fetchItems()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)

    try {
      let finalImageUrl = imageUrl

      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile, pillar)
      }

      const itemData = {
        pillar,
        title,
        description,
        category,
        imageUrl: finalImageUrl,
        price: price ? parseFloat(price) : undefined,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        rating: 5,
        reviews: 0,
      }

      if (editingItem && editingItem.id) {
        await updatePortfolioItem(editingItem.id, itemData)
      } else {
        await addPortfolioItem(itemData)
      }

      resetForm()
      fetchItems()
    } catch (error) {
      console.error('Error saving item:', error)
      alert('Failed to save item. Make sure Firebase Storage is enabled and rules allow writes.')
    } finally {
      setUploading(false)
    }
  }

  if (loading) return <div style={{ padding: '2rem', color: 'var(--color-text-muted)' }}>Loading {pillar} inventory...</div>

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Manage {pillar.charAt(0).toUpperCase() + pillar.slice(1)}</h2>
        <button onClick={() => { resetForm(); setIsModalOpen(true) }} className="btn btn-primary btn-sm">
          <Plus size={16} /> Add New Item
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {items.map(item => (
          <div key={item.id} className="card" style={{ overflow: 'hidden' }}>
            <div style={{ aspectRatio: '1', background: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)', position: 'relative' }}>
              {item.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-text-muted)' }}>
                  <ImageIcon size={32} />
                </div>
              )}
            </div>
            <div style={{ padding: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <h3 style={{ fontWeight: 600 }}>{item.title}</h3>
                {item.price && <span style={{ color: 'var(--color-gold)', fontWeight: 600 }}>${item.price}</span>}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>{item.category}</p>
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => openEdit(item)} className="btn btn-ghost btn-sm" style={{ flex: 1 }}>
                  <Edit2 size={14} /> Edit
                </button>
                <button onClick={() => item.id && handleDelete(item.id)} className="btn btn-ghost btn-sm" style={{ color: 'var(--color-error)' }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-xl)' }}>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1rem' }}>No items found.</p>
            <button onClick={() => { resetForm(); setIsModalOpen(true) }} className="btn btn-ghost btn-sm">Add your first item</button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="card" style={{ width: '100%', maxWidth: 500, padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>{editingItem ? 'Edit Item' : 'Add New Item'}</h3>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="label">Title</label>
                <input required type="text" className="input" value={title} onChange={e => setTitle(e.target.value)} />
              </div>
              
              <div>
                <label className="label">Category</label>
                <input required type="text" className="input" value={category} onChange={e => setCategory(e.target.value)} placeholder="e.g. bags, blankets" />
              </div>
              
              <div>
                <label className="label">Price (Optional)</label>
                <input type="number" step="0.01" className="input" value={price} onChange={e => setPrice(e.target.value)} />
              </div>

              <div>
                <label className="label">Tags (comma separated)</label>
                <input type="text" className="input" value={tags} onChange={e => setTags(e.target.value)} placeholder="boho, summer, casual" />
              </div>

              <div>
                <label className="label">Description</label>
                <textarea className="input" value={description} onChange={e => setDescription(e.target.value)} rows={3} />
              </div>

              <div>
                <label className="label">Image</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  className="input" 
                  onChange={e => setImageFile(e.target.files ? e.target.files[0] : null)}
                  style={{ padding: '0.5rem' }} 
                />
                {imageUrl && !imageFile && <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>Current image will be kept if no new file is selected.</p>}
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={resetForm} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
                <button type="submit" disabled={uploading} className="btn btn-primary" style={{ flex: 1 }}>
                  {uploading ? <><Loader2 size={16} className="animate-spin-slow" /> Saving...</> : 'Save Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
