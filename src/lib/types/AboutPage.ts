export interface AboutPageData {
  hero: {
    badge: string
    title: string
    description: string
    image: string
    imageAlt: string
  }
  story: {
    title: string
    paragraphs: string[]
    image: string
    imageAlt: string
    ctaText: string
    ctaLink: string
  }
  values: {
    title: string
    description: string
    items: Array<{
      icon: string
      title: string
      description: string
    }>
  }
  testimonials: {
    title: string
    description: string
    items: Array<{
      name: string
      date: string
      rating: number
      text: string
    }>
  }
  cta: {
    title: string
    description: string
    buttons: Array<{
      label: string
      href: string
      variant?: "primary" | "default"
    }>
  }
  seo: {
    metaTitle: string
    metaDescription: string
    slug: string
    keywords: string[]
  }
}
