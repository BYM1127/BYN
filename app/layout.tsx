import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import WhatsAppButton from '@/components/WhatsAppButton'

import { CartProvider } from '@/lib/context/CartContext'

export const metadata: Metadata = {
  title: {
    default: 'Bokas Yarn Market and Studio — Crochet · Photography · Web Design',
    template: '%s | Bokas Yarn Market and Studio',
  },
  description:
    'Bokas Yarn Market and Studio — handcrafted crochet pieces, professional photography sessions, and bespoke web design. Three creative services, one passionate studio.',
  authors: [{ name: 'Bokas Yarn Market and Studio' }],
  creator: 'Bokas Yarn Market and Studio',
  publisher: 'Bokas Yarn Market and Studio',
  keywords: [
    'crochet', 'custom crochet', 'handmade', 'photography', 'portrait sessions',
    'web design', 'website development', 'Bokas Yarn Market', 'Bokas Yarn Market and Studio', 'BYM Studio',
  ],
  openGraph: {
    type: 'website',
    title: 'Bokas Yarn Market and Studio — Crochet · Photography · Web Design',
    description: 'Handcrafted crochet pieces, photography sessions, and bespoke web design by Bokas Yarn Market and Studio.',
    siteName: 'Bokas Yarn Market and Studio',
  },
  twitter: { card: 'summary_large_image' },
  verification: {
    google: '8vzcyzagAbVVTLWLaxAHfilUczZzXZrtaggkn9pqqQ0',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Bokas Yarn Market and Studio',
    alternateName: 'BYM Studio',
    url: 'https://bym-studio.vercel.app',
    logo: 'https://bym-studio.vercel.app/logo-dark.png',
    telephone: '0793200067',
    email: 'bokasyarnmarket@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'ZA',
    },
    areaServed: 'South Africa',
    sameAs: ['https://www.instagram.com/bokasyarnmarket27'],
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <CartProvider>
            {children}
            <WhatsAppButton />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
