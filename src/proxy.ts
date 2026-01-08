import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This Proxy only handles /en/* routes.
// Dutch (default) routes are handled by root pages directly.

export function proxy(request: NextRequest) {
  // Forward locale information upstream so the root layout can set <html lang="..."> correctly.
  // Per Next.js docs, use NextResponse.next({ request: { headers } }) to forward upstream headers.
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-locale", "en")

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  // Only match /en/* paths
  matcher: ["/en/:path*"],
}


