import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ArrowRight } from "lucide-react"
import type { RelatedArticle } from "@/lib/types/Article"
import type { UIText } from "@/lib/types/UIText"

interface RelatedArticlesProps {
  articles: RelatedArticle[]
  uiText: UIText
}

export function RelatedArticles({ articles, uiText }: RelatedArticlesProps) {
  return (
    <section className="mt-16">
      <h2 className="text-3xl font-light mb-8">{uiText.article.relatedHeading}</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link key={article.slug} href={`/artikelen/${article.slug}`} className="group">
            <Card className="h-full hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden rounded-t-lg">
                <Image
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">
                  {article.category}
                </Badge>
                <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{article.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
