export interface ContactPageData {
  hero: {
    badge: string
    title: string
    description: string
  }
  contactInfo: {
    phoneLabel: string
    emailLabel: string
    locationLabel: string
  }
  mapSection: {
    title: string
    description: string
    placeholder: {
      title: string
      description: string
    }
  }
  faq: Array<{
    question: string
    answer: string
  }>
  seo: {
    metaTitle: string
    metaDescription: string
    slug: string
    keywords: string[]
  }
}
