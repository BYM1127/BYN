import dbConnect from '@/lib/db'
import NewsPost from '@/models/NewsPost'
import { Plus } from 'lucide-react'

export const revalidate = 0

export default async function AdminNewsPage() {
  await dbConnect()
  const posts = await NewsPost.find({}).sort({ createdAt: -1 }).lean()

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>News & Blog</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>Manage your news posts and social media feed settings.</p>
        </div>
        <button className="btn btn-primary btn-sm">
          <Plus size={16} /> New Post
        </button>
      </div>

      <div className="card" style={{ padding: '1.5rem', overflowX: 'auto' }}>
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
              <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Title</th>
              <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Slug</th>
              <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Status</th>
              <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                  No posts found.
                </td>
              </tr>
            ) : (
              posts.map((post: any) => (
                <tr key={post._id.toString()} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{post.title}</td>
                  <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>/{post.slug}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', background: post.isPublished ? 'rgba(74, 222, 128, 0.1)' : 'rgba(248, 113, 113, 0.1)', color: post.isPublished ? '#4ade80' : '#f87171' }}>
                      {post.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>{new Date(post.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Social Media Integration Box */}
      <div className="card" style={{ padding: '1.5rem', marginTop: '2rem', background: 'rgba(255,255,255,0.02)' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>Social Media Live Feed Widget</h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
          Your public News page is set to display an automated Instagram/Facebook feed (Option B). 
          To connect your account, you will need to sign up for <a href="https://elfsight.com" target="_blank" style={{ color: 'var(--color-crochet)', textDecoration: 'underline' }}>Elfsight</a> or a similar widget provider, generate your feed embed code, and paste it into the News page component.
        </p>
      </div>
    </div>
  )
}
