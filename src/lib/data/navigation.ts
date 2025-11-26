import type { NavigationItem, Language } from "@/lib/types/Navigation"

export const navigationItems: NavigationItem[] = [
  { name: "VILLAS", href: "/villas" },
  { name: "OVER ONS", href: "/over-ons" },
  { name: "MORAIRA", href: "/moraira" },
  { name: "BLOG", href: "/blog" },
  { name: "CONTACT", href: "/contact" },
]

export const languages: Language[] = [
  { code: "nl", name: "Nederlands", flag: "🇳🇱" },
  { code: "en", name: "English", flag: "🇬🇧" },
]

export const navigationData = {
  siteName: "Villa Moraira",
  mainNav: navigationItems,
  languages: languages,
}
