import type { Metadata } from "next"
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "./constants"

interface PageMetadataProps {
  title: string
  description: string
  path: string
  keywords?: string[]
  ogImage?: string
  locale?: "nl_NL" | "en_US"
}

export function generatePageMetadata({ title, description, path, keywords, ogImage }: PageMetadataProps): Metadata {
  const url = `${SITE_URL}${path}`
  const image = resolveOgImageUrl(ogImage)
  const ogLocale = inferOgLocale(path)

  return {
    title,
    description,
    keywords: keywords?.join(", "),
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image }],
      locale: ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  }
}

function resolveOgImageUrl(ogImage?: string) {
  if (!ogImage) return DEFAULT_OG_IMAGE

  // Sanity image URLs are typically absolute (https://cdn.sanity.io/...)
  if (/^https?:\/\//i.test(ogImage)) return ogImage

  // Support protocol-relative URLs if any
  if (ogImage.startsWith("//")) return `https:${ogImage}`

  // Treat as a local path
  const normalized = ogImage.startsWith("/") ? ogImage : `/${ogImage}`
  return `${SITE_URL}${normalized}`
}

function inferOgLocale(path: string): "nl_NL" | "en_US" {
  return path === "/en" || path.startsWith("/en/") ? "en_US" : "nl_NL"
}
