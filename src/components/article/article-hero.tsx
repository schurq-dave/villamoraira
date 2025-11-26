import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import type { UIText } from "@/lib/types/UIText"

interface ArticleHeroProps {
  title: string
  subtitle?: string
  category: string
  publishDate: string
  readTime: string
  image: string
  imageAlt: string
  uiText: UIText
}

export function ArticleHero({
  title,
  subtitle,
  category,
  publishDate,
  readTime,
  image,
  imageAlt,
  uiText,
}: ArticleHeroProps) {
  const formattedDate = new Date(publishDate).toLocaleDateString("nl-NL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <section className="relative w-full bg-muted py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[60vh]">
          {/* Text Content */}
          <div className="flex flex-col justify-center">
            <Badge variant="secondary" className="w-fit mb-6">
              {category}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-6 text-balance">{title}</h1>
            {subtitle && (
              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 text-pretty">{subtitle}</p>
            )}
            <div className="flex flex-wrap gap-6 text-muted-foreground text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>
                  {readTime} {uiText.common.readTime}
                </span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={imageAlt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
