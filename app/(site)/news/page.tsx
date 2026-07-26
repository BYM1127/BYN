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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Instagram Feed Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h2 style={{ fontSize: '1.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-primary)' }}>
                <Camera size={28} className="text-[#E1306C]" /> Instagram
              </h2>
              <a 
                href="https://www.instagram.com/bokasyarnmarket27?igsh=M2JiODh0NWRuZ2Q5" 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-ghost btn-sm flex items-center gap-2 text-sm"
              >
                @bokasyarnmarket27 <ExternalLink size={14} />
              </a>
            </div>
            
            <div className="w-full min-h-[600px] flex flex-col relative bg-[var(--color-bg-primary)] rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-[var(--color-bg-secondary)] border-2 border-dashed border-[var(--color-border)] rounded-xl">
                <Camera size={48} className="text-[#E1306C] mb-4" />
                <h3 className="text-xl font-bold mb-2 text-[var(--color-text-primary)]">Instagram Restriction</h3>
                <p className="text-[var(--color-text-secondary)] mb-4 max-w-sm">
                  Unlike TikTok, Instagram **completely blocks** websites from embedding live profiles directly. They only allow embedding single posts.
                </p>
                <p className="text-[var(--color-text-secondary)] mb-6 max-w-sm font-semibold">
                  To get around this block, you must use a free widget provider like Elfsight.com or Curator.io to generate an embed code.
                </p>
                <div className="flex gap-2 opacity-50">
                  <div className="w-12 h-12 bg-gray-300 rounded"></div>
                  <div className="w-12 h-12 bg-gray-300 rounded"></div>
                  <div className="w-12 h-12 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* TikTok Feed Section */}
          <div className="flex flex-col gap-4">
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
            <a href="https://www.instagram.com/bokasyarnmarket27?igsh=M2JiODh0NWRuZ2Q5" target="_blank" rel="noreferrer" className="btn btn-primary bg-[#E1306C] border-[#E1306C] text-white hover:opacity-90">
              <Camera size={18} /> Follow on Instagram
            </a>
            <a href="https://www.tiktok.com/@bokasyarnmarket" target="_blank" rel="noreferrer" className="btn btn-primary bg-black border-black text-white hover:bg-gray-800">
              <Video size={18} /> Follow on TikTok
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
