import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { User, Calendar } from "lucide-react"
import type { ArticleAuthor } from "@/lib/types/Article"
import type { UIText } from "@/lib/types/UIText"

interface AuthorCardProps {
  author: ArticleAuthor
  lastUpdated: string
  uiText: UIText
}

export function AuthorCard({ author, lastUpdated, uiText }: AuthorCardProps) {
  const formattedDate = new Date(lastUpdated).toLocaleDateString("nl-NL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Card className="bg-muted/50">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          {author.avatar ? (
            <Image
              src={author.avatar || "/placeholder.svg"}
              alt={author.name}
              width={48}
              height={48}
              className="rounded-full"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-primary" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground mb-1">{uiText.article.authorLabel}</p>
            <h3 className="font-semibold text-base mb-1">{author.name}</h3>
            {author.bio && <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{author.bio}</p>}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {uiText.article.lastUpdated}: {formattedDate}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
