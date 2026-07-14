import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Protected route prefixes
const PROTECTED_ROUTES = ['/my-orders', '/admin']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r))
  if (!isProtected) return NextResponse.next()

  // Check for Firebase session cookie (set by client after auth)
  const sessionCookie = request.cookies.get('__session')?.value

  if (!sessionCookie) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Admin route protection
  if (pathname.startsWith('/admin')) {
    const isAdminCookie = request.cookies.get('__admin')?.value
    if (!isAdminCookie) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/my-orders/:path*', '/admin/:path*'],
}
