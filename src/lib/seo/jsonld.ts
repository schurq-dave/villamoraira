import { SITE_URL, SITE_NAME } from "./constants"
import { siteConfig } from "@/lib/data/site-config"
import type { Villa } from "@/lib/types/Villa"
import type { BlogPost } from "@/lib/types/BlogPost"

function resolveUrl(baseUrl: string, urlOrPath: string) {
  const base = (baseUrl || "").replace(/\/+$/, "")
  if (!urlOrPath) return base
  if (/^https?:\/\//i.test(urlOrPath)) return urlOrPath
  if (urlOrPath.startsWith("//")) return `https:${urlOrPath}`
  const normalized = urlOrPath.startsWith("/") ? urlOrPath : `/${urlOrPath}`
  return `${base}${normalized}`
}

export function generateOrganizationSchema(options?: {
  siteUrl?: string
  siteName?: string
  logoUrl?: string
  contact?: { email?: string; phone?: string }
  social?: { facebook?: string; instagram?: string }
}) {
  const baseUrl = (options?.siteUrl || SITE_URL).replace(/\/+$/, "")
  const name = options?.siteName || SITE_NAME
  const logo = options?.logoUrl ? options.logoUrl : resolveUrl(baseUrl, "/logo.png")
  const email = options?.contact?.email || siteConfig.contact.email
  const telephone = options?.contact?.phone || siteConfig.contact.phone
  const sameAs = [
    options?.social?.facebook || siteConfig.social.facebook,
    options?.social?.instagram || siteConfig.social.instagram,
  ].filter(Boolean)

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url: baseUrl,
    logo,
    contactPoint: {
      "@type": "ContactPoint",
      email,
      telephone,
      contactType: "Customer Service",
    },
    ...(sameAs.length ? { sameAs } : {}),
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

export function generateProductSchema(villa: Villa, siteUrl?: string) {
  const baseUrl = siteUrl || SITE_URL
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: villa.name,
    description: villa.description.short,
    image: resolveUrl(baseUrl, villa.images.main),
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

export function generateBreadcrumbSchema(items: { name: string; url: string }[], siteUrl?: string) {
  const baseUrl = siteUrl || SITE_URL
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: resolveUrl(baseUrl, item.url),
    })),
  }
}

export function generateArticleSchema(post: BlogPost, siteUrl?: string) {
  const baseUrl = siteUrl || SITE_URL
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: resolveUrl(baseUrl, post.image),
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
}, siteUrl?: string) {
  const baseUrl = siteUrl || SITE_URL
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
    ...(place.image && { image: resolveUrl(baseUrl, place.image) }),
  }
}

export function generateItemListSchema(
  items: {
    name: string
    url: string
    description?: string
    image?: string
  }[],
  siteUrl?: string,
) {
  const baseUrl = siteUrl || SITE_URL
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: resolveUrl(baseUrl, item.url),
      ...(item.description && { description: item.description }),
      ...(item.image && { image: resolveUrl(baseUrl, item.image) }),
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
