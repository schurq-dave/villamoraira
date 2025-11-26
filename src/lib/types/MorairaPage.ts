export interface MorairaPageData {
  hero: {
    title: string
    description: string
    image: string
    imageAlt: string
  }
  introduction: {
    title: string
    paragraphs: string[]
    stats: Array<{
      icon: string
      label: string
    }>
    image: string
    imageAlt: string
  }
  attractions: {
    title: string
    description: string
    items: Array<{
      title: string
      description: string
      image: string
      imageAlt: string
      icon: string
      distance: string
      badge?: string
    }>
  }
  activities: {
    title: string
    description: string
    water: {
      title: string
      icon: string
      items: Array<{
        title: string
        description: string
      }>
    }
    land: {
      title: string
      icon: string
      items: Array<{
        title: string
        description: string
      }>
    }
  }
  dining: {
    title: string
    description: string
    options: Array<{
      title: string
      description: string
    }>
  }
  transportation: {
    title: string
    description: string
    flight: {
      title: string
      icon: string
      options: Array<{
        title: string
        duration: string
        description: string
      }>
    }
    car: {
      title: string
      icon: string
      options: Array<{
        title: string
        duration: string
        description: string
      }>
    }
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
    image: string
  }
}
