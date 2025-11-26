import type { Metadata } from "next"
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "./constants"

interface PageMetadataProps {
  title: string
  description: string
  path: string
  keywords?: string[]
  ogImage?: string
}

export function generatePageMetadata({ title, description, path, keywords, ogImage }: PageMetadataProps): Metadata {
  const url = `${SITE_URL}${path}`
  const image = ogImage ? `${SITE_URL}${ogImage}` : DEFAULT_OG_IMAGE

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
      locale: "nl_NL",
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
