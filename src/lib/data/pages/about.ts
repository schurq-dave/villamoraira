import type { AboutPageData } from "@/lib/types/AboutPage"

export const aboutPageData: AboutPageData = {
  hero: {
    badge: "OVER ONS",
    title: "Wie zijn wij",
    description:
      "Wij zijn Wouter & Anouk. Sinds maart 2022 zijn wij de trotse eigenaren van deze fijne villa op loopafstand van onze favoriete strand El Portet in Moraira.",
    image: "/placeholder.svg?key=owners",
    imageAlt: "Wouter & Anouk",
  },
  story: {
    title: "Onze Passie voor Moraira",
    paragraphs: [
      "Wij genieten zelf al een paar jaar van dit leuke, authentieke vissersdorp pal aan zee met zijn geweldige klimaat. Dus toen de kans zich voordeed om op deze plek iets te kunnen kopen, twijfelden we geen moment.",
      "Na een volledige renovatie zowel binnen als buiten staat onze villa voor u klaar voor een geweldig verblijf hier aan de kust. We delen graag onze liefde voor deze prachtige plek met u!",
    ],
    image: "/beautiful-moraira-coastline-with-castle-and-medite.jpg",
    imageAlt: "Moraira coastline",
    ctaText: "Stel een vraag",
    ctaLink: "/contact",
  },
  values: {
    title: "Onze Waarden",
    description: "Wat ons drijft om de beste ervaring te bieden voor onze gasten",
    items: [
      {
        icon: "heart",
        title: "Persoonlijke Zorg",
        description: "We behandelen elke gast als familie en zorgen ervoor dat uw verblijf onvergetelijk wordt",
      },
      {
        icon: "home",
        title: "Kwaliteit & Comfort",
        description: "Onze villa is volledig gerenoveerd met hoogwaardige materialen en moderne voorzieningen",
      },
      {
        icon: "users",
        title: "Lokale Kennis",
        description: "We delen graag onze favoriete plekjes en insider tips om uw Moraira ervaring te verrijken",
      },
      {
        icon: "star",
        title: "Uitmuntende Service",
        description: "Van aankomst tot vertrek, we staan altijd klaar om uw verblijf perfect te maken",
      },
    ],
  },
  testimonials: {
    title: "Wat Onze Gasten Zeggen",
    description: "Lees wat andere gasten over hun ervaring bij ons zeggen",
    items: [
      {
        name: "Robert",
        date: "Augustus 2024",
        rating: 5,
        text: "Fantastische villa op een perfecte locatie. Wouter en Anouk zijn geweldige gastheren die echt meedenken. Zeker voor herhaling vatbaar!",
      },
      {
        name: "Kaylee",
        date: "Juli 2024",
        rating: 5,
        text: "Prachtige villa met alle comfort. De locatie is ideaal, op loopafstand van het strand en restaurants. Uitstekende service!",
      },
      {
        name: "Familie Jansen",
        date: "Juni 2024",
        rating: 5,
        text: "Onvergetelijke vakantie gehad! De villa is prachtig ingericht en de eigenaren zijn zeer behulpzaam. Moraira is een pareltje!",
      },
    ],
  },
  cta: {
    title: "Klaar voor Uw Droomvakantie?",
    description:
      "Laat ons u helpen bij het plannen van uw perfecte verblijf in Moraira. We staan klaar om al uw vragen te beantwoorden.",
    buttons: [
      { label: "Contact Opnemen", href: "/contact", variant: "primary" },
      { label: "Bekijk Onze Villas", href: "/villas" },
    ],
  },
  seo: {
    metaTitle: "Over Ons | Wouter & Anouk - Villa Moraira Eigenaren",
    metaDescription:
      "Ontmoet Wouter & Anouk, de eigenaren van onze luxe villa's in Moraira. Lees over onze passie voor dit prachtige vissersdorp en onze toewijding aan uitmuntende service.",
    slug: "/over-ons",
    keywords: ["villa eigenaren Moraira", "over ons", "Wouter Anouk", "villa verhuur Moraira"],
  },
}
