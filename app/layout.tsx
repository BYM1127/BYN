import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'BYM Studio — Crochet · Photography · Web Design',
    template: '%s | BYM Studio',
  },
  description:
    'BYM Studio by BokasYarnMarket — handcrafted crochet pieces, professional photography sessions, and bespoke web design. Three creative services, one passionate studio.',
  keywords: [
    'crochet', 'custom crochet', 'handmade', 'photography', 'portrait sessions',
    'web design', 'website development', 'BYM Studio', 'BokasYarnMarket',
  ],
  openGraph: {
    type: 'website',
    title: 'BYM Studio — Crochet · Photography · Web Design',
    description: 'Handcrafted crochet pieces, photography sessions, and bespoke web design by BYM Studio.',
    siteName: 'BYM Studio',
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
