import type { SiteConfig } from "@/lib/types/SiteConfig"
import type { FooterConfig } from "@/lib/types/Footer"
import { uiText } from "./ui-text"

export const siteConfig: SiteConfig = {
  name: "Villa Moraira Huren",
  description: "Luxury villa rentals in Moraira, Costa Blanca, Spain",
  url: "https://villamorairahuren.nl",
  contact: {
    email: "info@villamorairahuren.nl",
    phone: "+31 6 1234 5678",
    address: "Moraira, Alicante, Spain",
  },
  social: {
    facebook: "https://facebook.com/villamorairahuren",
    instagram: "https://instagram.com/villamorairahuren",
  },
  seo: {
    defaultTitle: "Villa Moraira Huren | Luxury Villa Rentals in Moraira",
    defaultDescription:
      "Discover luxury villa rentals in Moraira, Costa Blanca. Beautiful Mediterranean villas with private pools, stunning sea views, and premium amenities.",
    defaultImage: "/villa-pool-hero.jpg",
    keywords: [
      "villa moraira",
      "moraira rentals",
      "luxury villas spain",
      "costa blanca villas",
      "holiday homes moraira",
    ],
  },
}

export const footerConfig: FooterConfig = {
  companyName: "Villa Moraira Huren",
  companyDescription: "Luxury beach villas in the heart of Moraira, offering unforgettable Mediterranean experiences.",
  social: {
    facebook: "https://facebook.com/villamorairahuren",
    instagram: "https://instagram.com/villamorairahuren",
    twitter: "https://twitter.com/villamorairahuren",
  },
  quickLinks: [
    { label: "Our Villas", href: "/villas" },
    { label: "About Us", href: "/over-ons" },
    { label: "Discover Moraira", href: "/moraira" },
    { label: "Contact", href: "/contact" },
  ],
  services: ["Villa Rentals", "Concierge Services", "Local Experiences", "Property Management"],
  contact: {
    address: "Moraira, Alicante, Spain",
    phone: "+34 XXX XXX XXX",
    email: "info@villamorairahuren.nl",
  },
  copyright: "© 2025 Villa Moraira Huren. All rights reserved.",
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
}

export { uiText }
