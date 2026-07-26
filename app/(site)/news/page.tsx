import Link from 'next/link'
import { Camera, ExternalLink, Video } from 'lucide-react'

export const metadata = {
  title: 'Studio News & Live Feeds | BYM Studio',
  description: 'Catch up on our latest crochet and photography projects directly from our Instagram and TikTok feeds.',
}

export default function NewsPage() {
  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '6rem', minHeight: '100vh', background: 'var(--color-bg-secondary)' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 className="font-serif text-[var(--color-text-primary)]" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Studio News & Updates</h1>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: 600, margin: '0 auto', fontSize: '1.1rem' }}>
            Catch up on our latest crochet creations and photography sessions directly from our social feeds!
          </p>
        </div>

        <div className="flex flex-col items-center justify-center max-w-2xl mx-auto gap-8 items-start">
          
          {/* TikTok Feed Section */}
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center justify-between mb-2">
              <h2 style={{ fontSize: '1.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-primary)' }}>
                <Video size={28} className="text-[#000000] dark:text-white" /> TikTok
              </h2>
              <a 
                href="https://www.tiktok.com/@bokasyarnmarket" 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-ghost btn-sm flex items-center gap-2 text-sm"
              >
                @bokasyarnmarket <ExternalLink size={14} />
              </a>
            </div>
            
            <div className="w-full flex justify-center bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)] overflow-hidden">
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

        <div className="mt-16 text-center">
          <p className="text-[var(--color-text-muted)] mb-4">Can't wait for the live feed?</p>
          <div className="flex justify-center gap-4">
            <a href="https://www.tiktok.com/@bokasyarnmarket" target="_blank" rel="noreferrer" className="btn btn-primary bg-black border-black text-white hover:bg-gray-800">
              <Video size={18} /> Follow on TikTok
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
