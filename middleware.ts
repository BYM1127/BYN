import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const url = req.nextUrl.clone()
    const hostname = req.headers.get("host") || ""
    // Check if it's admin.domain.com OR adminbym.vercel.app
    const isAdminSubdomain = hostname.startsWith("admin.") || hostname.startsWith("adminbym")
    const pathname = url.pathname

    // 0. Bypass rewrite and role checks for API and Auth routes so they work normally
    if (pathname.startsWith("/api") || pathname.startsWith("/auth")) {
      return NextResponse.next()
    }

    // 1. If trying to access admin panel without admin role, redirect to main site home
    if ((isAdminSubdomain || pathname.startsWith("/admin")) && req.nextauth.token?.role !== "admin") {
      const mainDomainUrl = new URL("/", req.url)
      if (isAdminSubdomain) {
        mainDomainUrl.hostname = hostname.replace(/^admin\./, "")
      }
      return NextResponse.redirect(mainDomainUrl)
    }

    // 2. Handle admin subdomain routing
    if (isAdminSubdomain) {
      // Rewrite admin.domain.com/path to /admin/path internally
      url.pathname = `/admin${pathname === "/" ? "" : pathname}`
      return NextResponse.rewrite(url)
    }

    // 3. Handle main domain trying to access /admin directly (redirect to subdomain)
    if (pathname.startsWith("/admin")) {
      const hostWithoutWww = hostname.replace(/^www\./, "")
      const redirectUrl = new URL(req.url)
      redirectUrl.hostname = `admin.${hostWithoutWww}`
      redirectUrl.pathname = pathname.replace(/^\/admin/, "") || "/"
      return NextResponse.redirect(redirectUrl)
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const hostname = req.headers.get("host") || ""
        const isAdminSubdomain = hostname.startsWith("admin.") || hostname.startsWith("adminbym")
        const pathname = req.nextUrl.pathname
        
        // Always allow public routes
        if (pathname.startsWith("/auth") || pathname.startsWith("/api")) {
          return true
        }

        // Require token for admin subdomain, /admin path, /checkout, /my-orders
        if (
          isAdminSubdomain || 
          pathname.startsWith("/admin") || 
          pathname.startsWith("/checkout") || 
          pathname.startsWith("/my-orders")
        ) {
          return !!token
        }
        
        return true
      },
    },
    pages: {
      signIn: "/auth/login",
    },
  }
)

export const config = {
  // Apply middleware to everything except static files
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
