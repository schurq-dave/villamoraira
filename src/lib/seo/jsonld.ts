import { SITE_URL, SITE_NAME } from "./constants"
import { siteConfig } from "@/lib/data/site-config"
import type { Villa } from "@/lib/types/Villa"
import type { BlogPost } from "@/lib/types/BlogPost"

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      email: siteConfig.contact.email,
      telephone: siteConfig.contact.phone,
      contactType: "Customer Service",
    },
    sameAs: [siteConfig.social.facebook, siteConfig.social.instagram],
  }
}

export function generateWebPageSchema(title: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
  }
}

export function generateProductSchema(villa: Villa) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: villa.name,
    description: villa.description.short,
    image: `${SITE_URL}${villa.images.main}`,
    offers: {
      "@type": "Offer",
      price: villa.pricing.perNight,
      priceCurrency: villa.pricing.currency,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: villa.rating.average,
      reviewCount: villa.rating.count,
    },
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  }
}

export function generateArticleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}${post.image}`,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
  }
}

export function generatePlaceSchema(place: {
  name: string
  description: string
  address: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  geo?: {
    latitude: number
    longitude: number
  }
  telephone?: string
  image?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: place.name,
    description: place.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: place.address.streetAddress,
      addressLocality: place.address.addressLocality,
      addressRegion: place.address.addressRegion,
      postalCode: place.address.postalCode,
      addressCountry: place.address.addressCountry,
    },
    ...(place.geo && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: place.geo.latitude,
        longitude: place.geo.longitude,
      },
    }),
    ...(place.telephone && { telephone: place.telephone }),
    ...(place.image && { image: `${SITE_URL}${place.image}` }),
  }
}

export function generateItemListSchema(
  items: {
    name: string
    url: string
    description?: string
    image?: string
  }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: `${SITE_URL}${item.url}`,
      ...(item.description && { description: item.description }),
      ...(item.image && { image: `${SITE_URL}${item.image}` }),
    })),
  }
}

export function generateFAQPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}
