'use client'

import { useState } from 'react'
import { CMSManager } from '@/components/admin/CMSManager'
import { OrderTable } from '@/components/admin/OrderTable'
import { Monitor, Image as ImageIcon } from 'lucide-react'

export default function AdminWebDesignPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'content'>('orders')

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="font-serif" style={{ fontSize: '2rem', marginBottom: '1rem' }}>Web Design Dashboard</h1>
        
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>
          <button 
            onClick={() => setActiveTab('orders')}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.5rem 1rem', background: 'transparent', border: 'none', cursor: 'pointer',
              fontWeight: 600, fontSize: '0.9rem',
              color: activeTab === 'orders' ? 'var(--color-webdesign)' : 'var(--color-text-secondary)',
              borderBottom: activeTab === 'orders' ? '2px solid var(--color-webdesign)' : '2px solid transparent',
              marginBottom: '-0.6rem'
            }}
          >
            <Monitor size={16} /> Manage Enquiries
          </button>
          
          <button 
            onClick={() => setActiveTab('content')}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.5rem 1rem', background: 'transparent', border: 'none', cursor: 'pointer',
              fontWeight: 600, fontSize: '0.9rem',
              color: activeTab === 'content' ? 'var(--color-webdesign)' : 'var(--color-text-secondary)',
              borderBottom: activeTab === 'content' ? '2px solid var(--color-webdesign)' : '2px solid transparent',
              marginBottom: '-0.6rem'
            }}
          >
            <ImageIcon size={16} /> Portfolio Content
          </button>
        </div>
      </div>

      {activeTab === 'orders' ? (
        <OrderTable pillar="webdesign" />
      ) : (
        <div style={{ margin: '-2rem' }}>
          <CMSManager pillar="webdesign" />
        </div>
      )}
    </div>
  )
}
