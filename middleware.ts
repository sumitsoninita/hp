import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if the path is a protected route
  if (pathname.startsWith('/student') || pathname.startsWith('/admin')) {
    // For protected routes, we'll handle authentication in the client-side components
    // since we're using localStorage for auth state
    return NextResponse.next()
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/student/:path*',
    '/admin/:path*',
  ]
}

