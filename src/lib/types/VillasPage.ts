export interface VillasPageData {
  hero: {
    title: string
    description: string
  }
  listings: {
    title: string
    count: string
    filterButtonText: string
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
