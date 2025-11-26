import { morairaStrandenGids } from "./moraira-stranden-gids"
import type { Article } from "@/lib/types/Article"

export const articles: Article[] = [morairaStrandenGids]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug)
}

export function getAllArticles(): Article[] {
  return articles
}
