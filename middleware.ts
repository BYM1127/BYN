import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // If the user is trying to access the admin panel but is not an admin, redirect them to the home page
    if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url))
    }
  },
  {
    callbacks: {
      // Require the user to be logged in (have a token) for any route matched by this middleware
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/auth/login",
    },
  }
)

export const config = {
  // Apply middleware to these sensitive routes
  matcher: ["/checkout/:path*", "/my-orders/:path*", "/admin/:path*"],
}
