import type { Villa } from "@/lib/types/Villa"

export const luxuryBeachVilla: Villa = {
  id: "1",
  slug: "luxury-beach-villa-moraira-el-portet",
  name: "Luxury Beach Villa Moraira El Portet",
  location: {
    address: "El Portet",
    city: "Moraira",
    region: "Alicante",
    country: "Spain",
  },
  pricing: {
    perNight: 170,
    perWeek: 1190,
    cleaningFee: 150,
    serviceFee: 95,
    currency: "EUR",
  },
  capacity: {
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
  },
  description: {
    short:
      "Luxury Beach Villa Moraira is located on the most exclusive beach location in Moraira, directly 250 meters from the El Portet beach.",
    full: [
      "Luxury Beach Villa Moraira is located on the most exclusive beach location in Moraira, directly 250 meters from the El Portet beach and the famous Moraira El Portet. The villa has a very good private location.",
      "The villa offers a beautiful accommodation for 8 people. The villa has a beautiful swimming pool with a view of the sea, a beautiful terrace with sea view, a beautiful garden with sea view, a beautiful living room with sea view, a beautiful kitchen with sea view, 4 beautiful bedrooms and 3 beautiful bathrooms.",
    ],
  },
  amenities: ["Free WiFi", "Private Pool", "Sea View", "Parking", "Air Conditioning", "Kitchen", "Terrace", "Garden"],
  houseRules: {
    checkIn: "After 4:00 PM",
    checkOut: "Before 10:00 AM",
    smoking: false,
    pets: false,
    parties: false,
  },
  images: {
    main: "/luxury-beach-villa-with-pool-overlooking-mediterra.jpg",
    gallery: [
      "/luxury-beach-villa-with-pool-and-sea-view-in-morai.jpg",
      "/placeholder.svg?key=interior1",
      "/placeholder.svg?key=bedroom1",
    ],
  },
  rating: {
    average: 4.9,
    count: 12,
  },
  featured: true,
  unavailableDates: [
    "2024-12-25",
    "2024-12-26",
    "2024-12-31",
    "2025-01-01",
    "2025-01-15",
    "2025-01-16",
    "2025-01-17",
    "2025-01-18",
    "2025-02-14",
    "2025-02-15",
    "2025-02-16",
  ],
  icalUrl: "https://calendar.google.com/calendar/ical/villa-moraira-el-portet/basic.ics",
  seo: {
    metaTitle: "Luxury Beach Villa Moraira El Portet | Villa Moraira Huren",
    metaDescription:
      "Luxury beach villa in El Portet, Moraira. 4 bedrooms, 3 bathrooms, private pool, sea views. Just 250m from the beach. Book your dream Mediterranean escape.",
    slug: "luxury-beach-villa-moraira-el-portet",
    keywords: ["luxury villa moraira", "el portet villa", "beach villa spain", "moraira rental"],
    ogImageUrl: "/luxury-beach-villa-with-pool-overlooking-mediterra.jpg",
  },
}
