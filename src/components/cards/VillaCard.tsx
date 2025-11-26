"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Users, Bed, Bath, Wifi, Car, Waves, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import type { UIText } from "@/lib/types/UIText"

interface VillaCardProps {
  slug: string
  name: string
  location: {
    address: string
    city: string
  }
  images: {
    main: string
  }
  pricing: {
    perWeek: number
    currency: string
  }
  capacity: {
    guests: number
    bedrooms: number
    bathrooms: number
  }
  rating: {
    average: number
  }
  amenities: string[]
  featured?: boolean
  description?: string
  uiText: UIText
  href?: string // Optional custom href for localized URLs
}

export function VillaCard({
  slug,
  name,
  location,
  images,
  pricing,
  capacity,
  rating,
  amenities,
  featured,
  description,
  uiText,
  href,
}: VillaCardProps) {
  const [imageError, setImageError] = useState(false)
  const fallbackImage = "/luxury-villa.png"

  // Use custom href if provided, otherwise default to /villas/[slug]
  const villaHref = href || `/villas/${slug}`

  return (
    <Link href={villaHref} className="block" aria-label={`View details for ${name}`}>
      <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 p-0 cursor-pointer h-full">
        <div className="relative h-56 sm:h-64 md:h-72 lg:h-80 overflow-hidden">
          <Image
            src={imageError ? fallbackImage : images.main || fallbackImage}
            alt={`${name} - Luxury villa in ${location.city} with ${capacity.bedrooms} bedrooms and pool`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={80}
          />
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
            <Badge
              className="bg-secondary text-secondary-foreground px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm"
              aria-label={featured ? "Featured villa" : "Popular villa"}
            >
              {featured ? "FEATURED" : "POPULAR"}
            </Badge>
          </div>
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
            <div
              className="flex items-center bg-white/90 rounded-full px-2.5 py-1 sm:px-3 sm:py-1"
              aria-label={`Rating: ${rating.average} out of 5 stars`}
            >
              <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400 mr-1" aria-hidden="true" />
              <span className="text-xs sm:text-sm font-semibold">{rating.average}</span>
            </div>
          </div>
        </div>
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0">
            <div className="flex-1">
              <CardTitle className="text-xl sm:text-2xl">{name}</CardTitle>
              <CardDescription className="flex items-center mt-2">
                <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 flex-shrink-0" aria-hidden="true" />
                <span className="text-sm">
                  {location.address}, {location.city}
                </span>
              </CardDescription>
            </div>
            <div className="text-left sm:text-right">
              <div
                className="text-xl sm:text-2xl font-bold text-primary"
                aria-label={`Price: ${pricing.perWeek} euros per week`}
              >
                {pricing.currency === "EUR" ? uiText.pricing.currency : "$"}
                {pricing.perWeek.toLocaleString("nl-NL")}
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground" aria-hidden="true">
                {uiText.pricing.perWeek}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          {description && <p className="text-sm sm:text-base text-muted-foreground mb-4">{description}</p>}
          <div className="flex items-center gap-3 sm:gap-4 mb-4 flex-wrap" role="list" aria-label="Villa capacity">
            <div className="flex items-center" role="listitem">
              <Users className="h-4 w-4 mr-1.5 text-muted-foreground flex-shrink-0" aria-hidden="true" />
              <span className="text-sm whitespace-nowrap">
                {capacity.guests} {uiText.villa.guests}
              </span>
            </div>
            <div className="flex items-center" role="listitem">
              <Bed className="h-4 w-4 mr-1.5 text-muted-foreground flex-shrink-0" aria-hidden="true" />
              <span className="text-sm whitespace-nowrap">
                {capacity.bedrooms} {uiText.villa.bedrooms}
              </span>
            </div>
            <div className="flex items-center" role="listitem">
              <Bath className="h-4 w-4 mr-1.5 text-muted-foreground flex-shrink-0" aria-hidden="true" />
              <span className="text-sm whitespace-nowrap">
                {capacity.bathrooms} {uiText.villa.bathrooms}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap" aria-label="Key amenities">
            <Wifi className="h-4 w-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
            <Car className="h-4 w-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
            <Waves className="h-4 w-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
            <span className="text-sm text-muted-foreground">{amenities.slice(0, 3).join(", ")}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
