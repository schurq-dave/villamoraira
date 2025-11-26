import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, Tag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { UIText } from "@/lib/types/UIText"

interface FeaturedPostCardProps {
  slug: string
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
  image: string
  uiText: UIText
}

export function FeaturedPostCard({
  slug,
  title,
  excerpt,
  category,
  author,
  date,
  readTime,
  image,
  uiText,
}: FeaturedPostCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="block">
      <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 p-0 cursor-pointer">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="relative h-96 lg:h-auto overflow-hidden">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-secondary text-secondary-foreground px-3 py-1.5">{uiText.blog.featured}</Badge>
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <Badge variant="outline" className="w-fit mb-4 px-3 py-1.5">
              <Tag className="h-3 w-3 mr-1" />
              {category}
            </Badge>
            <h3 className="text-3xl md:text-4xl font-light mb-4 group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-muted-foreground mb-6 text-lg">{excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {author}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {date}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {readTime}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
