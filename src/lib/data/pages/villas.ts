import type { VillasPageData } from "@/lib/types/VillasPage"

export const villasPageData: VillasPageData = {
  hero: {
    title: "Our Luxury Villas",
    description:
      "Discover our collection of handpicked luxury villas in Moraira, each offering unique charm and premium amenities",
  },
  listings: {
    title: "Available Villas",
    count: "2 luxury properties available",
    filterButtonText: "Filter",
  },
  cta: {
    title: "Ready to Book Your Dream Villa?",
    description: "Experience the perfect blend of luxury, comfort, and Mediterranean charm in our handpicked villas",
    buttons: [
      { label: "Get in Touch", href: "/contact", variant: "primary" },
      { label: "Discover Moraira", href: "/moraira" },
    ],
  },
  seo: {
    metaTitle: "Luxury Villas in Moraira | Premium Holiday Rentals",
    metaDescription:
      "Discover our collection of handpicked luxury villas in Moraira. Each villa offers unique charm, premium amenities, and stunning Mediterranean views. Book your dream vacation today.",
    slug: "/villas",
    keywords: ["luxury villas Moraira", "holiday rentals Moraira", "vacation homes Costa Blanca", "El Portet villas"],
  },
}
