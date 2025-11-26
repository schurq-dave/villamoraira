import type { ContactPageData } from "@/lib/types/ContactPage"

export const contactPageDataEN: ContactPageData = {
  hero: {
    badge: "CONTACT",
    title: "Questions? We're happy to help!",
    description:
      "Fill out the form below and we'll get back to you as soon as possible. We're here to answer all your questions about our villas and Moraira.",
  },
  contactInfo: {
    phoneLabel: "Give us a call",
    emailLabel: "Send us an Email",
    locationLabel: "Our Location",
  },
  mapSection: {
    title: "Our Location",
    description:
      "Our villas are located in a prime location in Moraira, within walking distance of the beach and all amenities",
    placeholder: {
      title: "Interactive Map",
      description:
        "An interactive map of Moraira would be displayed here with the exact location of our villas",
    },
  },
  faq: [
    {
      question: "What is the minimum stay?",
      answer: "The minimum stay is 7 nights, from Saturday to Saturday.",
    },
    {
      question: "Are pets allowed?",
      answer: "Unfortunately, pets are not allowed in our villas.",
    },
    {
      question: "Is there parking available?",
      answer: "Yes, free private parking is available at both villas.",
    },
    {
      question: "When can I check in?",
      answer: "Check-in is possible from 4:00 PM, check-out before 10:00 AM.",
    },
  ],
  seo: {
    metaTitle: "Contact Us | Villa Moraira Rentals",
    metaDescription:
      "Get in touch with Villa Moraira Rentals for luxury villa rentals in Moraira. We respond within 24 hours to answer all your questions about our villas and services.",
    slug: "/en/contact",
    keywords: ["contact villa moraira", "villa rental inquiry", "moraira accommodation contact"],
  },
}

