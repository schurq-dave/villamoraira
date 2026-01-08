import type { MetadataRoute } from "next"
import { blogPosts } from "@/lib/data/blog/posts"
import { sanityFetch } from "@/lib/sanity/fetch"
import { SITE_SETTINGS_QUERY, VILLA_SITEMAP_QUERY } from "@/lib/sanity/queries"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await sanityFetch<any>({
    query: SITE_SETTINGS_QUERY,
    params: { language: "nl" },
    tags: ["siteSettings"],
    revalidate: 3600,
  })

  const baseUrl = (settings?.siteUrl || "https://villamorairahuren.nl").replace(/\/+$/, "")

  // Static pages (both locales)
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/en`,
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
      url: `${baseUrl}/en/villas`,
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
      url: `${baseUrl}/en/blog`,
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
      url: `${baseUrl}/en/about-us`,
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
      url: `${baseUrl}/en/moraira`,
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
    {
      url: `${baseUrl}/en/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ]

  // Villa detail pages (from Sanity, both locales)
  const villas = await sanityFetch<Array<{ slug: string; language: string; _updatedAt: string }>>({
    query: VILLA_SITEMAP_QUERY,
    tags: ["villa"],
    revalidate: 3600,
  })

  const villaPages = (villas || [])
    .filter((v) => v?.slug)
    .map((villa) => {
      const isEn = villa.language === "en"
      return {
        url: `${baseUrl}${isEn ? "/en" : ""}/villas/${villa.slug}`,
        lastModified: villa._updatedAt ? new Date(villa._updatedAt) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      }
    })

  // Blog pages
  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...villaPages, ...blogPages]
}
