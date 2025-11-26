import type { MetadataRoute } from "next"
import { luxuryBeachVilla } from "@/lib/data/villas/luxury-beach-villa"
import { luxuryLoungeVilla } from "@/lib/data/villas/luxury-lounge-villa"
import { blogPosts } from "@/lib/data/blog/posts"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://villamorairahuren.nl"

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/villas`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/over-ons`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/moraira`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ]

  // Villa pages
  const villas = [luxuryBeachVilla, luxuryLoungeVilla]
  const villaPages = villas.map((villa) => ({
    url: `${baseUrl}/villas/${villa.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }))

  // Blog pages
  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...villaPages, ...blogPages]
}
