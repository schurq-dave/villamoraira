import type React from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { navigationItems, languages } from "@/lib/data/navigation"
import { siteConfig, footerConfig, uiText } from "@/lib/data/site-config"

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation items={navigationItems} languages={languages} siteName={siteConfig.name} uiText={uiText} />
      <main className="flex-1">{children}</main>
      <Footer config={footerConfig} uiText={uiText} />
    </div>
  )
}
