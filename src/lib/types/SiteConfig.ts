export interface SiteConfig {
  name: string
  description: string
  url: string
  contact: {
    email: string
    phone: string
    address: string
  }
  social: {
    facebook?: string
    instagram?: string
    twitter?: string
  }
  seo: {
    defaultTitle: string
    defaultDescription: string
    defaultImage: string
    keywords: string[]
  }
}
