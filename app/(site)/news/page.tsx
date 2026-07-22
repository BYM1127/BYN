import dbConnect from '@/lib/db'
import NewsPost from '@/models/NewsPost'
import Link from 'next/link'
import { Instagram, Facebook, ArrowRight, Rss } from 'lucide-react'

export const revalidate = 60 // Revalidate every minute

export default async function NewsPage() {
  await dbConnect()
  const posts = await NewsPost.find({ isPublished: true }).sort({ createdAt: -1 }).lean()

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '6rem', minHeight: '100vh', background: 'var(--color-bg-secondary)' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 className="font-serif" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Studio News</h1>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: 600, margin: '0 auto', fontSize: '1.1rem' }}>
            Updates, behind-the-scenes, and the latest from BYM Studio.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3rem', alignItems: 'start' }}>
          
          {/* Main Blog Content */}
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Rss size={20} style={{ color: 'var(--color-crochet)' }} /> Latest Articles
            </h2>
            
            {posts.length === 0 ? (
              <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                No news posts yet. Check back soon!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {posts.map((post: any) => (
                  <article key={post._id.toString()} className="card" style={{ padding: '2rem' }}>
                    {post.imageUrl && (
                      <div style={{ width: '100%', height: 240, background: 'var(--color-bg-secondary)', marginBottom: '1.5rem', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                        <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>{post.title}</h3>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
                      {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    {post.excerpt && <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>{post.excerpt}</p>}
                    <Link href={`/news/${post.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-crochet)', fontWeight: 600, textDecoration: 'none' }}>
                      Read More <ArrowRight size={16} />
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar - Social Media Feed */}
          <div style={{ position: 'sticky', top: '6rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Instagram size={18} /> Social Feed
            </h2>
            
            <div className="card" style={{ padding: '1.5rem', overflow: 'hidden' }}>
              {/* 
                === ELFSIGHT WIDGET INTEGRATION ===
                Paste your Elfsight or Curator.io embed code below. 
                Example: <div className="elfsight-app-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" data-elfsight-app-lazy></div>
              */}
              
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', textAlign: 'center', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--color-border)' }}>
                <Instagram size={32} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
                  Your live Instagram and TikTok feed will appear here.
                </p>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  (Awaiting Widget Integration Code)
                </div>
              </div>
            </div>
            
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
                <Instagram size={16} /> Instagram
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm" style={{ flex: 1, justifyContent: 'center' }}>
                TikTok
              </a>
            </div>
          </div>
          
        </div>
      </div>
      
      <style>{`
        @media (max-width: 900px) {
          .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
