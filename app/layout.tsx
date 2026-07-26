import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/lib/auth-context'
import { ThemeProvider } from '@/components/ThemeProvider'
import WhatsAppButton from '@/components/WhatsAppButton'
import Chatbot from '@/components/Chatbot'

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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <AuthProvider>
            <CartProvider>
              {children}
              <WhatsAppButton />
              <Chatbot />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
