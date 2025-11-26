import type { MorairaPageData } from "@/lib/types/MorairaPage"

export const morairaPageData: MorairaPageData = {
  hero: {
    title: "Ontdek Moraira",
    description:
      "Een charmant vissersdorp aan de Costa Blanca met kristalhelder water, authentieke cultuur en mediterrane charme",
    image: "/beautiful-moraira-coastline-with-castle-and-medite.jpg",
    imageAlt: "Beautiful Moraira coastline",
  },
  introduction: {
    title: "Welkom in Moraira",
    paragraphs: [
      "Moraira wordt gezien als het schilderachtige geheim van Spanje. Terwijl de meeste van de Costa Blanca wordt gekenmerkt door toeristische ontwikkeling, heeft Moraira zijn authentieke charme behouden. Dit pittoreske vissersdorp biedt een perfecte combinatie van rust, cultuur en natuurlijke schoonheid.",
      "Met zijn kristalheldere wateren, charmante haven, historische kasteel en uitstekende restaurants, biedt Moraira alles wat u nodig heeft voor een onvergetelijke mediterrane vakantie.",
    ],
    stats: [
      { icon: "sun", label: "320 dagen zon per jaar" },
      { icon: "users", label: "8.000 inwoners" },
    ],
    image: "/placeholder.svg?key=moraira-harbor",
    imageAlt: "Moraira harbor",
  },
  attractions: {
    title: "Bezienswaardigheden",
    description: "Ontdek de mooiste plekken en activiteiten die Moraira te bieden heeft",
    items: [
      {
        title: "El Portet Strand",
        description:
          "Een prachtig beschut strandje met kristalhelder water, perfect voor families. Omringd door indrukwekkende kliffen en met uitstekende strandtenten.",
        image: "/placeholder.svg?key=el-portet",
        imageAlt: "El Portet Beach",
        icon: "waves",
        distance: "5 min lopen van onze villa",
        badge: "POPULAIR",
      },
      {
        title: "Kasteel van Moraira",
        description:
          "Een historisch kasteel uit de 18e eeuw dat de kust bewaakte tegen piraten. Biedt prachtige uitzichten over de Middellandse Zee en is gratis te bezoeken.",
        image: "/placeholder.svg?key=castle",
        imageAlt: "Moraira Castle",
        icon: "mountain",
        distance: "10 min lopen",
      },
      {
        title: "Pittoreske Haven",
        description:
          "De charmante haven van Moraira met traditionele vissersbootjes, gezellige terrassen en verse zeevruchten restaurants. Perfect voor een avondwandeling.",
        image: "/placeholder.svg?key=harbor",
        imageAlt: "Moraira Harbor",
        icon: "camera",
        distance: "15 min lopen",
      },
    ],
  },
  activities: {
    title: "Activiteiten",
    description: "Van ontspanning tot avontuur - er is voor ieder wat wils in Moraira",
    water: {
      title: "Wateractiviteiten",
      icon: "waves",
      items: [
        {
          title: "Snorkelen & Duiken",
          description: "Ontdek de onderwaterwereld in de kristalheldere wateren rond Moraira",
        },
        { title: "Kajakken", description: "Verken de kustlijn en verborgen baaien per kajak" },
        { title: "Stand-up Paddleboarding", description: "Geniet van SUP in de kalme wateren van El Portet" },
        { title: "Bootverhuur", description: "Huur een boot en ontdek de Costa Blanca vanaf het water" },
      ],
    },
    land: {
      title: "Landactiviteiten",
      icon: "mountain",
      items: [
        {
          title: "Wandelen",
          description: "Prachtige kustpaden en bergwandelingen met spectaculaire uitzichten",
        },
        { title: "Fietsen", description: "Verken het achterland en de wijngaarden op de fiets" },
        { title: "Golf", description: "Verschillende golfbanen in de omgeving met prachtige uitzichten" },
        { title: "Markten", description: "Bezoek de lokale markten voor verse producten en ambachtelijke waren" },
      ],
    },
  },
  dining: {
    title: "Culinaire Ervaringen",
    description: "Proef de authentieke smaken van de Middellandse Zee in Moraira's beste restaurants",
    options: [
      {
        title: "Zeevruchten Restaurants",
        description: "Geniet van verse vis en zeevruchten direct van de lokale vissers in de havens restaurants",
      },
      {
        title: "Tapas Bars",
        description: "Ontdek authentieke Spaanse tapas in gezellige bars waar locals en toeristen samenkomen",
      },
      {
        title: "Fine Dining",
        description: "Ervaar culinaire hoogstandjes in restaurants met Michelin-aanbevelingen en zeezicht",
      },
    ],
  },
  transportation: {
    title: "Hoe Kom Je Er?",
    description: "Moraira is gemakkelijk bereikbaar vanuit verschillende Europese steden",
    flight: {
      title: "Per Vliegtuig",
      icon: "plane",
      options: [
        {
          title: "Alicante Airport (ALC)",
          duration: "1 uur rijden naar Moraira",
          description: "Directe vluchten vanuit Amsterdam, Brussel, Düsseldorf en vele andere Europese steden",
        },
        {
          title: "Valencia Airport (VLC)",
          duration: "1,5 uur rijden naar Moraira",
          description: "Alternatieve optie met goede verbindingen",
        },
      ],
    },
    car: {
      title: "Per Auto",
      icon: "car",
      options: [
        {
          title: "Vanuit Nederland",
          duration: "Ongeveer 13-15 uur rijden",
          description: "Via Frankrijk en de AP-7 snelweg langs de Spaanse kust",
        },
        {
          title: "Autohuur",
          duration: "",
          description: "Beschikbaar op alle luchthavens en in Moraira zelf voor lokale verkenning",
        },
      ],
    },
  },
  cta: {
    title: "Klaar om Moraira te Ontdekken?",
    description: "Boek uw verblijf in onze luxe villa en ervaar zelf de magie van dit prachtige mediterrane paradijs",
    buttons: [
      { label: "Stel Een Vraag", href: "/contact", variant: "primary" },
      { label: "Bekijk Onze Villas", href: "/villas" },
    ],
  },
  seo: {
    metaTitle: "Ontdek Moraira | Stranden, Activiteiten & Culinaire Ervaringen",
    metaDescription:
      "Ontdek alles over Moraira: prachtige stranden, authentieke cultuur, culinaire hoogstandjes en activiteiten. Uw complete gids voor een onvergetelijke vakantie aan de Costa Blanca.",
    slug: "/moraira",
    keywords: ["Moraira Spanje", "Costa Blanca", "El Portet strand", "Moraira activiteiten", "Moraira restaurants"],
    image: "/beautiful-moraira-coastline-with-castle-and-medite.jpg",
  },
}
