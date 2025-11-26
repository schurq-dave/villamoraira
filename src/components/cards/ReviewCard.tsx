import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

interface ReviewCardProps {
  id: string
  name: string
  location: string
  date: string
  rating: number
  text: string
  image: string
}

export function ReviewCard({ name, location, date, rating, text, image }: ReviewCardProps) {
  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-5 sm:p-6 md:p-8">
        <div className="flex items-center mb-4 sm:mb-6">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <p className="text-muted-foreground mb-6 sm:mb-8 leading-relaxed text-base sm:text-lg">"{text}"</p>
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-full overflow-hidden flex-shrink-0">
            <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover" />
          </div>
          <div>
            <div className="font-normal text-sm sm:text-base">{name}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">{location}</div>
            <div className="text-xs text-muted-foreground">{date}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
