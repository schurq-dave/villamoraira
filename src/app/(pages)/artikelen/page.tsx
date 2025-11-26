import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { getAllArticles } from "@/lib/data/articles"
import { artikelenPageData } from "@/lib/data/pages/artikelen"
import { uiText } from "@/lib/data/site-config"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import { Breadcrumb } from "@/components/Breadcrumb"

export const metadata: Metadata = {
  title: artikelenPageData.seo.metaTitle,
  description: artikelenPageData.seo.metaDescription,
  keywords: artikelenPageData.seo.keywords,
}

export default function ArtikelenPage() {
  const articles = getAllArticles()

  const breadcrumbItems = [
    { name: uiText.common.home, url: "/" },
    { name: uiText.article.breadcrumbArticles, url: "/artikelen" },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-8 mb-6 text-balance">
            {artikelenPageData.hero.title}
          </h1>
          <p className="text-xl text-foreground/70 max-w-3xl text-pretty">{artikelenPageData.hero.description}</p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link key={article.slug} href={`/artikelen/${article.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <div className="relative h-64 w-full">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.imageAlt}
                    fill
                    className="object-cover rounded-t-lg"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">
                    {article.category}
                  </Badge>
                  <CardTitle className="text-2xl line-clamp-2">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/70 line-clamp-3 mb-4">{article.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-foreground/60">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(article.publishDate).toLocaleDateString("nl-NL", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
