import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { AuthProvider } from '@/lib/auth-context'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Navbar />
      <main style={{ minHeight: '100dvh' }}>{children}</main>
      <Footer />
    </AuthProvider>
  )
}
