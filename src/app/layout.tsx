import type React from "react"
import type { Metadata } from "next"
import { headers } from "next/headers"
import "./globals.css"
import { ScrollToTop } from "@/components/ScrollToTop"

export const metadata: Metadata = {
  title: "Villa Moraira Huren - Luxury Beach Villas in Moraira, Spain",
  description:
    "Discover luxury beach villas in the beautiful coastal town of Moraira, Spain. Perfect for your Mediterranean getaway with stunning sea views and premium amenities.",
  generator: "v0.app",
  keywords: "villa rental, Moraira, Spain, luxury accommodation, beach villa, Mediterranean vacation",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Default locale is Dutch. Middleware sets x-locale=en for /en/* routes.
  const locale = (await headers()).get("x-locale") || "nl"

  return (
    <html lang={locale}>
      <head>
        <link
          rel="preload"
          href="/fonts/Manrope-VariableFont_wght.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <script src="https://cdn.bookzo.nl/bookzo-elements/bookzo-elements.js" async defer />
      </head>
      <body className="font-sans antialiased">
        <ScrollToTop />
        {children}
      </body>
    </html>
  )
}
