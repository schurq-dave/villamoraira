"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Tag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

interface BlogCardProps {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image: string
  featured?: boolean
}

export function BlogCard({ slug, title, excerpt, category, date, readTime, image, featured }: BlogCardProps) {
  const [imageError, setImageError] = useState(false)
  const fallbackImage = "/blog-post-concept.png"

  return (
    <Link href={`/blog/${slug}`} className="block" aria-label={`Read article: ${title}`}>
      <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 p-0 cursor-pointer h-full">
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
          <Image
            src={imageError ? fallbackImage : image || fallbackImage}
            alt={`Featured image for blog post: ${title}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={80}
          />
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
            <Badge
              variant={featured ? "default" : "secondary"}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm ${featured ? "bg-secondary text-secondary-foreground" : "bg-white/90 text-foreground"}`}
              aria-label={`Category: ${category}`}
            >
              <Tag className="h-3 w-3 mr-1" aria-hidden="true" />
              {category}
            </Badge>
          </div>
        </div>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl font-light group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-sm">{excerpt}</CardDescription>
        </CardHeader>
        <CardContent className="pb-4 sm:pb-6 px-4 sm:px-6">
          <div
            className="flex items-center gap-2 sm:gap-3 text-xs text-muted-foreground flex-wrap"
            aria-label="Post metadata"
          >
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" aria-hidden="true" />
              <time dateTime={date}>{date}</time>
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" aria-hidden="true" />
              <span>{readTime}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
