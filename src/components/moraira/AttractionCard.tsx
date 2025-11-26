import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, type LucideIcon } from "lucide-react"
import Image from "next/image"

interface AttractionCardProps {
  title: string
  description: string
  image: string
  imageAlt: string
  icon: LucideIcon
  distance: string
  badge?: string
}

export function AttractionCard({
  title,
  description,
  image,
  imageAlt,
  icon: Icon,
  distance,
  badge,
}: AttractionCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
      <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={imageAlt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {badge && (
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
            <Badge className="bg-secondary text-secondary-foreground px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm">
              {badge}
            </Badge>
          </div>
        )}
      </div>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center text-lg sm:text-xl">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary flex-shrink-0" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4">{description}</p>
        <div className="flex items-center text-xs sm:text-sm text-muted-foreground">
          <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
          <span>{distance}</span>
        </div>
      </CardContent>
    </Card>
  )
}
