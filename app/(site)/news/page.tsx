import Link from 'next/link'
import { Video, Calendar, ArrowRight, Image as ImageIcon } from 'lucide-react'
import dbConnect from '@/lib/db'
import NewsPost from '@/models/NewsPost'
import Image from 'next/image'

export const metadata = {
  title: 'Studio News & Live Feeds | BYM Studio',
  description: 'Catch up on our latest crochet and photography projects.',
}

async function getNews() {
  try {
    await dbConnect()
    const news = await NewsPost.find({ published: true }).sort({ createdAt: -1 })
    return JSON.parse(JSON.stringify(news))
  } catch (error) {
    console.error('Failed to fetch news:', error)
    return []
  }
}

export default async function NewsPage() {
  const newsPosts = await getNews()

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '6rem', minHeight: '100vh', background: 'var(--color-bg-secondary)' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 className="font-serif text-[var(--color-text-primary)]" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Studio Updates</h1>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: 600, margin: '0 auto', fontSize: '1.1rem' }}>
            Catch up on our latest crochet creations, photography sessions, and live TikTok feed!
          </p>
        </div>

        {/* Gallery Section */}
        <div className="mb-16">
          <h2 style={{ fontSize: '1.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-primary)', marginBottom: '1.5rem' }}>
            <ImageIcon size={28} className="text-[var(--color-photography)]" /> Studio Highlights
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden shadow-md group">
                <Image 
                  src={`https://picsum.photos/seed/${i + 50}/600/600`} 
                  alt={`Studio Highlight ${i}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          
          {/* Latest Articles Section (2/3 width) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h2 style={{ fontSize: '1.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
              <Calendar size={28} className="text-[var(--color-crochet)]" /> Latest Articles
            </h2>
            
            {newsPosts.length === 0 ? (
              <div className="card text-center p-12 bg-[var(--color-bg-primary)] border border-[var(--color-border)]">
                <h3 className="text-xl font-bold mb-2 text-[var(--color-text-primary)]">No updates yet</h3>
                <p className="text-[var(--color-text-secondary)]">Check back soon for the latest news from the studio!</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {newsPosts.map((post: any) => (
                  <article key={post._id} className="card p-6 bg-[var(--color-bg-primary)] border border-[var(--color-border)] hover:border-[var(--color-crochet)] transition-colors shadow-sm">
                    <div className="flex flex-col md:flex-row gap-6">
                      {post.imageUrl && (
                        <div className="w-full md:w-1/3 aspect-[4/3] relative rounded-lg overflow-hidden shrink-0">
                          <Image src={post.imageUrl} alt={post.title} fill className="object-cover" />
                        </div>
                      )}
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="text-sm text-[var(--color-text-muted)] mb-2 flex items-center gap-2">
                          <Calendar size={14} />
                          {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-[var(--color-text-primary)]">{post.title}</h3>
                        <div 
                          className="text-[var(--color-text-secondary)] line-clamp-3 mb-4 prose prose-sm dark:prose-invert"
                          dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                        <button className="text-[var(--color-crochet)] font-semibold flex items-center gap-2 hover:gap-3 transition-all mt-auto w-fit">
                          Read full article <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* TikTok Feed Section (1/3 width) */}
          <div className="lg:col-span-1 flex flex-col gap-4 sticky top-24">
            <div className="flex items-center justify-between mb-2">
              <h2 style={{ fontSize: '1.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-primary)' }}>
                <Video size={28} className="text-[#000000] dark:text-white" /> TikTok
              </h2>
            </div>
            
            <div className="w-full flex justify-center bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] overflow-hidden shadow-sm">
              <blockquote 
                className="tiktok-embed" 
                cite="https://www.tiktok.com/@bokasyarnmarket" 
                data-unique-id="bokasyarnmarket" 
                data-embed-type="creator" 
                style={{ maxWidth: '100%', minWidth: '288px' }}
              >
                <section>
                  <a target="_blank" href="https://www.tiktok.com/@bokasyarnmarket?refer=creator_embed">@bokasyarnmarket</a>
                </section>
              </blockquote>
              <script async src="https://www.tiktok.com/embed.js"></script>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
