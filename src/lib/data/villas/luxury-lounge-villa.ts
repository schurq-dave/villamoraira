import type { Villa } from "@/lib/types/Villa"

export const luxuryLoungeVilla: Villa = {
  id: "2",
  slug: "luxury-lounge-villa",
  name: "Luxury Lounge Villa Moraira Beach",
  location: {
    address: "Moraira Beach",
    city: "Moraira",
    region: "Alicante",
    country: "Spain",
  },
  pricing: {
    perNight: 150,
    perWeek: 1050,
    cleaningFee: 120,
    serviceFee: 85,
    currency: "EUR",
  },
  capacity: {
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
  },
  description: {
    short: "Modern luxury villa with stunning lounge areas and contemporary design, perfect for relaxation.",
    full: [
      "This modern luxury villa features exceptional lounge areas with contemporary design and premium furnishings. Located in the heart of Moraira, it offers the perfect blend of comfort and style.",
      "The villa includes spacious living areas, a fully equipped modern kitchen, private pool, and beautiful outdoor terraces. Perfect for families or groups seeking a sophisticated Mediterranean retreat.",
    ],
  },
  amenities: [
    "Free WiFi",
    "Private Pool",
    "Modern Kitchen",
    "Parking",
    "Air Conditioning",
    "BBQ Area",
    "Outdoor Dining",
    "Smart TV",
  ],
  houseRules: {
    checkIn: "After 3:00 PM",
    checkOut: "Before 11:00 AM",
    smoking: false,
    pets: false,
    parties: false,
  },
  images: {
    main: "/luxury-lounge-villa-with-modern-design-and-pool-in.jpg",
    gallery: ["/placeholder.svg?key=lounge1", "/placeholder.svg?key=lounge2", "/placeholder.svg?key=lounge3"],
  },
  rating: {
    average: 4.8,
    count: 8,
  },
  featured: true,
  unavailableDates: ["2024-12-24", "2024-12-25", "2025-01-01"],
  seo: {
    metaTitle: "Luxury Lounge Villa Moraira Beach | Villa Moraira Huren",
    metaDescription:
      "Modern luxury villa in Moraira with exceptional lounge areas. 3 bedrooms, 2 bathrooms, private pool. Contemporary design meets Mediterranean charm.",
    slug: "luxury-lounge-villa",
    keywords: ["modern villa moraira", "luxury lounge villa", "contemporary villa spain"],
    ogImageUrl: "/luxury-lounge-villa-with-modern-design-and-pool-in.jpg",
  },
}
