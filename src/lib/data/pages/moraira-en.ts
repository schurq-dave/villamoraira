import type { MorairaPageData } from "@/lib/types/MorairaPage"

export const morairaPageDataEN: MorairaPageData = {
  hero: {
    title: "Discover Moraira",
    description:
      "A charming fishing village on the Costa Blanca with crystal clear waters, authentic culture and Mediterranean charm",
    image: "/beautiful-moraira-coastline-with-castle-and-medite.jpg",
    imageAlt: "Beautiful Moraira coastline",
  },
  introduction: {
    title: "Welcome to Moraira",
    paragraphs: [
      "Moraira is considered Spain's picturesque secret. While most of the Costa Blanca is characterized by tourist development, Moraira has retained its authentic charm. This picturesque fishing village offers a perfect combination of tranquility, culture and natural beauty.",
      "With its crystal clear waters, charming harbor, historic castle and excellent restaurants, Moraira offers everything you need for an unforgettable Mediterranean vacation.",
    ],
    stats: [
      { icon: "sun", label: "320 days of sun per year" },
      { icon: "users", label: "8,000 inhabitants" },
    ],
    image: "/placeholder.svg?key=moraira-harbor",
    imageAlt: "Moraira harbor",
  },
  attractions: {
    title: "Attractions",
    description: "Discover the most beautiful places and activities that Moraira has to offer",
    items: [
      {
        title: "El Portet Beach",
        description:
          "A beautiful sheltered beach with crystal clear water, perfect for families. Surrounded by impressive cliffs and excellent beach bars.",
        image: "/placeholder.svg?key=el-portet",
        imageAlt: "El Portet Beach",
        icon: "waves",
        distance: "5 min walk from our villa",
        badge: "POPULAR",
      },
      {
        title: "Moraira Castle",
        description:
          "A historic 18th century castle that guarded the coast against pirates. Offers beautiful views over the Mediterranean Sea and is free to visit.",
        image: "/placeholder.svg?key=castle",
        imageAlt: "Moraira Castle",
        icon: "mountain",
        distance: "10 min walk",
      },
      {
        title: "Picturesque Harbor",
        description:
          "The charming harbor of Moraira with traditional fishing boats, cozy terraces and fresh seafood restaurants. Perfect for an evening stroll.",
        image: "/placeholder.svg?key=harbor",
        imageAlt: "Moraira Harbor",
        icon: "camera",
        distance: "15 min walk",
      },
    ],
  },
  activities: {
    title: "Activities",
    description: "From relaxation to adventure - there is something for everyone in Moraira",
    water: {
      title: "Water Activities",
      icon: "waves",
      items: [
        {
          title: "Snorkeling & Diving",
          description: "Discover the underwater world in the crystal clear waters around Moraira",
        },
        { title: "Kayaking", description: "Explore the coastline and hidden coves by kayak" },
        { title: "Stand-up Paddleboarding", description: "Enjoy SUP in the calm waters of El Portet" },
        { title: "Boat Rental", description: "Rent a boat and discover the Costa Blanca from the water" },
      ],
    },
    land: {
      title: "Land Activities",
      icon: "mountain",
      items: [
        {
          title: "Hiking",
          description: "Beautiful coastal paths and mountain hikes with spectacular views",
        },
        { title: "Cycling", description: "Explore the hinterland and vineyards by bike" },
        { title: "Golf", description: "Several golf courses in the area with beautiful views" },
        { title: "Markets", description: "Visit local markets for fresh produce and artisan goods" },
      ],
    },
  },
  dining: {
    title: "Culinary Experiences",
    description: "Taste the authentic flavors of the Mediterranean in Moraira's best restaurants",
    options: [
      {
        title: "Seafood Restaurants",
        description: "Enjoy fresh fish and seafood directly from local fishermen in the harbor restaurants",
      },
      {
        title: "Tapas Bars",
        description: "Discover authentic Spanish tapas in cozy bars where locals and tourists come together",
      },
      {
        title: "Fine Dining",
        description: "Experience culinary highlights in Michelin-recommended restaurants with sea views",
      },
    ],
  },
  transportation: {
    title: "How to Get There",
    description: "Moraira is easily accessible from various European cities",
    flight: {
      title: "By Plane",
      icon: "plane",
      options: [
        {
          title: "Alicante Airport (ALC)",
          duration: "1 hour drive to Moraira",
          description: "Direct flights from Amsterdam, Brussels, Düsseldorf and many other European cities",
        },
        {
          title: "Valencia Airport (VLC)",
          duration: "1.5 hour drive to Moraira",
          description: "Alternative option with good connections",
        },
      ],
    },
    car: {
      title: "By Car",
      icon: "car",
      options: [
        {
          title: "From the Netherlands",
          duration: "Approximately 13-15 hours drive",
          description: "Via France and the AP-7 highway along the Spanish coast",
        },
        {
          title: "Car Rental",
          duration: "",
          description: "Available at all airports and in Moraira itself for local exploration",
        },
      ],
    },
  },
  cta: {
    title: "Ready to Discover Moraira?",
    description: "Book your stay in our luxury villa and experience the magic of this beautiful Mediterranean paradise",
    buttons: [
      { label: "Ask a Question", href: "/contact", variant: "primary" },
      { label: "View Our Villas", href: "/villas" },
    ],
  },
  seo: {
    metaTitle: "Discover Moraira | Beaches, Activities & Culinary Experiences",
    metaDescription:
      "Discover everything about Moraira: beautiful beaches, authentic culture, culinary highlights and activities. Your complete guide for an unforgettable holiday on the Costa Blanca.",
    slug: "/en/moraira",
    keywords: ["Moraira Spain", "Costa Blanca", "El Portet beach", "Moraira activities", "Moraira restaurants"],
    image: "/beautiful-moraira-coastline-with-castle-and-medite.jpg",
  },
}

