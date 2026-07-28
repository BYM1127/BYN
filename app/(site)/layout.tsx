import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100dvh' }}>{children}</main>
      <Footer />
    </>
  )
}
