import type { BlogPageData } from "@/lib/types/BlogPage"

export const blogPageData: BlogPageData = {
  seo: {
    metaTitle: "Moraira Travel Blog | Villa Tips & Local Guides",
    metaDescription:
      "Discover travel tips, local guides, and insider knowledge about Moraira and luxury villa living. Read our latest articles about beaches, dining, activities, and more.",
    slug: "blog",
    keywords: ["Moraira travel blog", "Costa Blanca guide", "villa rental tips", "Moraira beaches", "Spain travel"],
  },
  hero: {
    badge: "BLOG",
    title: "Moraira Travel & Villa Insights",
    description: "Discover travel tips, local guides, and insider knowledge about Moraira and luxury villa living",
  },
  categories: [
    { name: "Travel Guide", slug: "travel-guide" },
    { name: "Villa Tips", slug: "villa-tips" },
    { name: "Food & Dining", slug: "food-dining" },
    { name: "Family Travel", slug: "family-travel" },
    { name: "History & Culture", slug: "history-culture" },
  ],
}
