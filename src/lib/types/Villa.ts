export interface Villa {
  id: string
  slug: string
  name: string
  location: {
    address: string
    city: string
    region: string
    country: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  pricing: {
    perNight: number
    perWeek: number
    cleaningFee: number
    serviceFee: number
    currency: string
  }
  capacity: {
    guests: number
    bedrooms: number
    bathrooms: number
    beds?: number
  }
  description: {
    short: string
    full: string[]
  }
  amenities: string[]
  houseRules: {
    checkIn: string
    checkOut: string
    smoking: boolean
    pets: boolean
    parties: boolean
  }
  images: {
    main: string
    gallery: string[]
  }
  rating: {
    average: number
    count: number
  }
  featured: boolean
  unavailableDates: string[]
  icalUrl?: string
  seo: {
    metaTitle: string
    metaDescription: string
    slug: string
    keywords?: string[]
    ogImageUrl?: string
  }
}
