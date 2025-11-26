import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface BulletPoint {
  text: string
}

interface ContentImageSectionProps {
  title: string
  description: string
  bulletPoints?: BulletPoint[]
  ctaText?: string
  ctaLink?: string
  image: string
  imageAlt: string
  imagePosition?: "left" | "right"
}

export function ContentImageSection({
  title,
  description,
  bulletPoints,
  ctaText,
  ctaLink,
  image,
  imageAlt,
  imagePosition = "right",
}: ContentImageSectionProps) {
  const contentColumn = (
    <div>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">{title}</h2>
      <p className="text-xl text-muted-foreground mb-8">{description}</p>

      {bulletPoints && bulletPoints.length > 0 && (
        <div className="space-y-4 mb-8">
          {bulletPoints.map((point, index) => (
            <div key={index} className="flex items-center">
              <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
              <span>{point.text}</span>
            </div>
          ))}
        </div>
      )}

      {ctaText && ctaLink && (
        <Link href={ctaLink}>
          <Button size="lg">
            {ctaText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      )}
    </div>
  )

  const imageColumn = (
    <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
      <Image src={image || "/placeholder.svg"} alt={imageAlt} fill className="object-cover" />
    </div>
  )

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {imagePosition === "left" ? (
            <>
              {imageColumn}
              {contentColumn}
            </>
          ) : (
            <>
              {contentColumn}
              {imageColumn}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
