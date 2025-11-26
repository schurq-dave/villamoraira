import type { FooterConfig } from "@/lib/types/Footer"

export const footerData: FooterConfig = {
  companyName: "Villa Moraira",
  companyDescription:
    "Luxe villa's in het hart van Moraira. Geniet van een onvergetelijke vakantie aan de Costa Blanca met prachtige stranden, authentieke cultuur en mediterrane charme.",
  social: {
    facebook: "https://facebook.com/villamoraira",
    instagram: "https://instagram.com/villamoraira",
    twitter: "https://twitter.com/villamoraira",
  },
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "Villas", href: "/villas" },
    { label: "Over Ons", href: "/over-ons" },
    { label: "Moraira", href: "/moraira" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  services: ["Luxury Villa Rentals", "Concierge Services", "Property Management", "Local Experiences"],
  contact: {
    email: "info@villamorairahuren.nl",
    phone: "+34 XXX XXX XXX",
    address: "El Portet, Moraira, Alicante, Spain",
  },
  copyright: `© ${new Date().getFullYear()} Villa Moraira. All rights reserved.`,
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
}
