import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if we're trying to access protected routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // Check for the session cookie
    const session = request.cookies.get('appwrite_session')
    
    if (!session) {
      // If there's no session, redirect to login
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  return NextResponse.next()
}

// Configure which routes use this middleware
export const config = {
  matcher: ['/dashboard/:path*']
} 