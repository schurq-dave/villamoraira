import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ChecklistGrid } from "@/components/lists/ChecklistGrid"
import { ImageGallery } from "@/components/villa/ImageGallery"
import {
  Star,
  Users,
  Bed,
  Bath,
  MapPin,
  ArrowLeft,
  Share,
  Heart,
  Sun,
  Car,
  Waves,
  Wifi,
  Snowflake,
  Flame,
  Utensils,
  TreePine,
  Mountain,
  PawPrint,
  Dumbbell,
  type LucideIcon,
} from "lucide-react"
import Link from "next/link"
import { BookingCalendarClient } from "./BookingCalendarClient"
import type { UIText } from "@/lib/types/UIText"
import PortableTextRenderer from "@/components/portable-text-renderer"

// Icon mapping for highlights
const iconMap: Record<string, LucideIcon> = {
  'map-pin': MapPin,
  'star': Star,
  'sun': Sun,
  'dumbbell': Dumbbell,
  'car': Car,
  'waves': Waves,
  'wifi': Wifi,
  'snowflake': Snowflake,
  'flame': Flame,
  'bed': Bed,
  'utensils': Utensils,
  'tree': TreePine,
  'mountain': Mountain,
  'paw-print': PawPrint,
  'users': Users,
}

interface Highlight {
  _key: string
  icon: string
  title: string
  description: unknown[] | string // Portable text OR plain text (for backward compatibility)
}

interface VillaDetailTemplateProps {
  villa: {
    name: string
    slug: string
    location: string
    badge: string
    badgeVariant?: "default" | "secondary"
    rating: number
    reviewCount: number
    pricePerWeek: number
    pricePerNight: number
    guests: number
    bedrooms: number
    bathrooms: number
    description: unknown[]
    highlights: Highlight[]
    houseRules: {
      checkIn: string
      checkOut: string
      smoking: boolean
      pets: boolean
    }
    images: {
      main: string
      gallery: string[]
    }
    reviews: Array<{
      author: string
      date: string
      rating: number
      content: string
    }>
    booking: {
      villaId: string
      pricePerNight: number
      pricePerWeek: number
      cleaningFee: number
      serviceFee: number
      rating: number
      maxGuests: number
      unavailableDates: string[]
      icalUrl?: string
    }
  }
  uiText: UIText
}

export function VillaDetailTemplate({ villa, uiText }: VillaDetailTemplateProps) {
  return (
    <>
      {/* Breadcrumb */}
      <div className="sr-only bg-muted py-4">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary">
              {uiText.villa.breadcrumbHome}
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/villas" className="text-muted-foreground hover:text-primary">
              {uiText.villa.breadcrumbVillas}
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{villa.name}</span>
          </div>
        </div>
      </div>

      {/* Villa Header */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-6">
            <Link href="/villas">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {uiText.villa.backToVillas}
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Share className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className={villa.badgeVariant === "secondary" ? "bg-secondary text-secondary-foreground" : ""}>
                  {villa.badge}
                </Badge>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="text-sm font-semibold">{villa.rating}</span>
                  <span className="text-sm text-muted-foreground ml-1">({villa.reviewCount} reviews)</span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-light mb-2">{villa.name}</h1>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{villa.location}</span>
              </div>
            </div>
            <div className="text-right mt-4 lg:mt-0">
              <div className="text-3xl font-bold text-primary">
                {uiText.pricing.currency}
                {villa.pricePerWeek.toLocaleString()}
              </div>
              <div className="text-muted-foreground">{uiText.pricing.perWeek}</div>
              <div className="text-sm text-muted-foreground">
                {uiText.pricing.currency}
                {villa.pricePerNight} {uiText.pricing.perNight}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Villa Images */}
      <section className="mb-12">
        <div className="max-w-7xl mx-auto px-6">
          <ImageGallery
            mainImage={villa.images.main}
            gallery={villa.images.gallery}
            villaName={villa.name}
            viewAllText={uiText.villa.viewAllPhotos}
          />
        </div>
      </section>

      {/* Villa Details */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Info */}
              <div className="flex items-center gap-8">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>
                    {villa.guests} {uiText.villa.guests}
                  </span>
                </div>
                <div className="flex items-center">
                  <Bed className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>
                    {villa.bedrooms} {uiText.villa.bedrooms}
                  </span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-5 w-5 mr-2 text-muted-foreground" />
                  <span>
                    {villa.bathrooms} {uiText.villa.bathrooms}
                  </span>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h2 className="text-2xl font-light mb-4">{uiText.villa.aboutHeading}</h2>
                <div className="text-muted-foreground leading-relaxed">
                  <PortableTextRenderer value={villa.description} />
                </div>
              </div>

              <Separator />

              {/* Highlights Section */}
              {villa.highlights && villa.highlights.length > 0 && (
                <>
                  <div>
                    <h2 className="text-2xl font-light mb-6">{uiText.villa.highlightsHeading || "Kenmerken"}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {villa.highlights.map((highlight) => {
                        const IconComponent = iconMap[highlight.icon] || Star
                        return (
                          <Card key={highlight._key} className="p-0 border-0 shadow-none bg-muted/50">
                            <CardHeader className="pb-2">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                                  <IconComponent className="h-5 w-5 text-primary" />
                                </div>
                                <CardTitle className="text-lg font-medium">{highlight.title}</CardTitle>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="text-sm text-muted-foreground leading-relaxed prose prose-sm max-w-none">
                                {typeof highlight.description === 'string' ? (
                                  // Plain text (existing data) - render with line breaks
                                  <div className="whitespace-pre-line">{highlight.description}</div>
                                ) : (
                                  // Portable text (new data)
                                  <PortableTextRenderer value={highlight.description} />
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </div>
                  <Separator />
                </>
              )}


              <div>
                <h2 className="text-2xl font-light mb-4">{uiText.villa.houseRulesHeading}</h2>
                <ChecklistGrid
                  items={[
                    { label: `${uiText.villa.checkIn}: ${villa.houseRules.checkIn}`, checked: true },
                    { label: `${uiText.villa.checkOut}: ${villa.houseRules.checkOut}`, checked: true },
                    { label: uiText.villa.noSmoking, checked: !villa.houseRules.smoking },
                    { label: uiText.villa.noPets, checked: !villa.houseRules.pets },
                  ]}
                  columns={1}
                />
              </div>

              {/* Reviews */}
              <div>
                <h2 className="text-2xl font-light mb-4">{uiText.villa.reviewsHeading}</h2>
                <div className="space-y-4">
                  {villa.reviews.map((review, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">{review.author}</CardTitle>
                            <CardDescription>{review.date}</CardDescription>
                          </div>
                          <div className="flex items-center">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{review.content}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <BookingCalendarClient {...villa.booking} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
