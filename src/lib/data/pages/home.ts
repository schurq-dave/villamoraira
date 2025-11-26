import type { HomePageData } from "@/lib/types/HomePage"

export const homePageData: HomePageData = {
  hero: {
    title: "Discover your dream Mediterranean escape",
    description:
      "Experience luxury living in our exclusive Moraira villas. Stunning sea views, premium amenities, and unforgettable memories await.",
    image: "/images/moraira-beach-hero.png",
    imageAlt: "Beautiful Moraira Beach with Turquoise Waters",
    ctaText: "Explore Villas",
    ctaLink: "/villas",
  },
  featuredVillas: {
    title: "Our Featured Villas",
    description:
      "Handpicked luxury accommodations offering the perfect blend of comfort, style, and Mediterranean charm",
    viewAllLink: "/villas",
    viewAllText: "View All Villas",
  },
  features: {
    title: "Why Choose Villa Moraira Huren",
    description: "We provide exceptional service and unforgettable experiences for your Mediterranean getaway",
    items: [
      {
        icon: "star",
        title: "Premium Quality",
        description:
          "Handpicked luxury villas with the highest standards of comfort and elegance. Each property is carefully selected and maintained to ensure an exceptional stay.",
      },
      {
        icon: "mapPin",
        title: "Prime Locations",
        description:
          "Stunning beachfront and sea-view locations in the heart of beautiful Moraira. Wake up to breathtaking Mediterranean views and enjoy easy access to pristine beaches.",
      },
      {
        icon: "users",
        title: "Personal Service",
        description:
          "Dedicated concierge service to ensure your stay exceeds all expectations. From pre-arrival planning to on-site support, we're here to make your experience unforgettable.",
      },
    ],
  },
  morairaSection: {
    title: "Discover Beautiful Moraira",
    description:
      "Nestled along Spain's stunning Costa Blanca, Moraira offers pristine beaches, charming local culture, and world-class dining. Experience the perfect blend of relaxation and adventure in this Mediterranean paradise.",
    bulletPoints: [
      { text: "Crystal clear waters and golden beaches" },
      { text: "Authentic Spanish cuisine and local markets" },
      { text: "Historic castle and scenic coastal walks" },
      { text: "Water sports and outdoor activities" },
    ],
    ctaText: "Explore Moraira",
    ctaLink: "/moraira",
    image: "/beautiful-moraira-coastline-with-castle-and-medite.jpg",
    imageAlt: "Beautiful Moraira Coastline",
  },
}
