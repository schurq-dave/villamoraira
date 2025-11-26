export interface HomePageData {
  hero: {
    title: string
    description: string
    image: string
    imageAlt: string
    ctaText: string
    ctaLink: string
  }
  featuredVillas: {
    title: string
    description: string
    viewAllLink: string
    viewAllText: string
  }
  features: {
    title: string
    description: string
    items: Array<{
      icon: string
      title: string
      description: string
    }>
  }
  morairaSection: {
    title: string
    description: string
    bulletPoints: Array<{
      text: string
    }>
    ctaText: string
    ctaLink: string
    image: string
    imageAlt: string
  }
}
