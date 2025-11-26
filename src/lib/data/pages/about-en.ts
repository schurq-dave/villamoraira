import type { AboutPageData } from "@/lib/types/AboutPage"

export const aboutPageDataEN: AboutPageData = {
  hero: {
    badge: "ABOUT US",
    title: "Who are we",
    description:
      "We are Wouter & Anouk. Since March 2022, we have been the proud owners of this beautiful villa within walking distance of our favorite beach El Portet in Moraira.",
    image: "/placeholder.svg?key=owners",
    imageAlt: "Wouter & Anouk",
  },
  story: {
    title: "Our Passion for Moraira",
    paragraphs: [
      "We have been enjoying this charming, authentic fishing village right by the sea with its wonderful climate for several years. So when the opportunity arose to buy something here, we didn't hesitate for a moment.",
      "After a complete renovation both inside and out, our villa is ready for you to have a great stay here on the coast. We love to share our passion for this beautiful place with you!",
    ],
    image: "/beautiful-moraira-coastline-with-castle-and-medite.jpg",
    imageAlt: "Moraira coastline",
    ctaText: "Ask a question",
    ctaLink: "/contact",
  },
  values: {
    title: "Our Values",
    description: "What drives us to provide the best experience for our guests",
    items: [
      {
        icon: "heart",
        title: "Personal Care",
        description: "We treat every guest like family and ensure your stay is unforgettable",
      },
      {
        icon: "home",
        title: "Quality & Comfort",
        description: "Our villa has been completely renovated with high-quality materials and modern amenities",
      },
      {
        icon: "users",
        title: "Local Knowledge",
        description: "We love to share our favorite spots and insider tips to enrich your Moraira experience",
      },
      {
        icon: "star",
        title: "Excellent Service",
        description: "From arrival to departure, we are always ready to make your stay perfect",
      },
    ],
  },
  testimonials: {
    title: "What Our Guests Say",
    description: "Read what other guests have to say about their experience with us",
    items: [
      {
        name: "Robert",
        date: "August 2024",
        rating: 5,
        text: "Fantastic villa in a perfect location. Wouter and Anouk are great hosts who really think along. Definitely worth repeating!",
      },
      {
        name: "Kaylee",
        date: "July 2024",
        rating: 5,
        text: "Beautiful villa with all comforts. The location is ideal, within walking distance of the beach and restaurants. Excellent service!",
      },
      {
        name: "The Jansen Family",
        date: "June 2024",
        rating: 5,
        text: "Had an unforgettable holiday! The villa is beautifully furnished and the owners are very helpful. Moraira is a gem!",
      },
    ],
  },
  cta: {
    title: "Ready for Your Dream Vacation?",
    description:
      "Let us help you plan your perfect stay in Moraira. We are ready to answer all your questions.",
    buttons: [
      { label: "Get in Touch", href: "/contact", variant: "primary" },
      { label: "View Our Villas", href: "/villas" },
    ],
  },
  seo: {
    metaTitle: "About Us | Wouter & Anouk - Villa Moraira Owners",
    metaDescription:
      "Meet Wouter & Anouk, the owners of our luxury villas in Moraira. Read about our passion for this beautiful fishing village and our dedication to excellent service.",
    slug: "/en/about-us",
    keywords: ["villa owners Moraira", "about us", "Wouter Anouk", "villa rental Moraira"],
  },
}

