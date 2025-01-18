import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getTokenFromRequest, validateToken } from '@/lib/auth.server'

export async function middleware(request: NextRequest) {
  const token = getTokenFromRequest(request) as string | null
  const { pathname } = request.nextUrl
  const isAuthenticated = token ? await validateToken(token) : false

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard')) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Redirect authenticated users away from auth pages
  if ((pathname === '/login' || pathname === '/signup') && token) {
    // Only redirect if token is valid
    if (await validateToken(token)) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
}
