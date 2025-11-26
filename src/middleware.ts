import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This middleware only handles /en/* routes
// Dutch (default) routes are handled by root pages directly

export function middleware(request: NextRequest) {
  // The middleware is minimal - just let requests pass through
  // The [lang] folder handles /en/* routes
  // Root pages handle Dutch routes
  return NextResponse.next()
}

export const config = {
  // Only match /en/* paths
  matcher: ['/en/:path*'],
}

