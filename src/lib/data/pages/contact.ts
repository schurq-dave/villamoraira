import type { ContactPageData } from "@/lib/types/ContactPage"

export const contactPageData: ContactPageData = {
  hero: {
    badge: "CONTACT",
    title: "Vragen? Wij helpen u graag!",
    description:
      "Vul onderstaand formulier in en we nemen z.s.m. contact met u op. We staan klaar om al uw vragen over onze villa's en Moraira te beantwoorden.",
  },
  contactInfo: {
    phoneLabel: "Give us call",
    emailLabel: "Send us Email",
    locationLabel: "Our Location",
  },
  mapSection: {
    title: "Onze Locatie",
    description:
      "Onze villa's bevinden zich op een toplocatie in Moraira, op loopafstand van het strand en alle voorzieningen",
    placeholder: {
      title: "Interactieve Kaart",
      description:
        "Hier zou een interactieve kaart van Moraira worden weergegeven met de exacte locatie van onze villa's",
    },
  },
  faq: [
    {
      question: "Wat is de minimale verblijfsduur?",
      answer: "De minimale verblijfsduur is 7 nachten, van zaterdag tot zaterdag.",
    },
    {
      question: "Zijn huisdieren toegestaan?",
      answer: "Helaas zijn huisdieren niet toegestaan in onze villa's.",
    },
    {
      question: "Is er parkeergelegenheid?",
      answer: "Ja, er is gratis privé parkeergelegenheid beschikbaar bij beide villa's.",
    },
    {
      question: "Wanneer kan ik inchecken?",
      answer: "Inchecken is mogelijk vanaf 16:00 uur, uitchecken voor 10:00 uur.",
    },
  ],
  seo: {
    metaTitle: "Contact Us | Villa Moraira Huren",
    metaDescription:
      "Get in touch with Villa Moraira Huren for luxury villa rentals in Moraira. We respond within 24 hours to answer all your questions about our villas and services.",
    slug: "/contact",
    keywords: ["contact villa moraira", "villa rental inquiry", "moraira accommodation contact"],
  },
}
