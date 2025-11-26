import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import type { ReactNode } from "react"

interface HeroSectionProps {
  badge?: string
  title: string
  subtitle?: string
  description?: string
  image?: string
  imageAlt?: string
  overlay?: boolean
  children?: ReactNode
  variant?: "default" | "split" | "fullscreen"
}

export function HeroSection({
  badge,
  title,
  subtitle,
  description,
  image,
  imageAlt = "Hero image",
  overlay = false,
  children,
  variant = "default",
}: HeroSectionProps) {
  if (variant === "fullscreen" && image) {
    return (
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={image || "/placeholder.svg"}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={85}
          />
          {overlay && <div className="absolute inset-0 bg-black/40" />}
        </div>

        <div className="relative z-10 text-white max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl">
            {badge && <Badge className="mb-6 bg-secondary text-secondary-foreground px-3 py-1.5">{badge}</Badge>}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6">{title}</h1>
            {subtitle && <p className="text-xl md:text-2xl opacity-90 max-w-2xl">{subtitle}</p>}
          </div>
        </div>
      </section>
    )
  }

  if (variant === "split") {
    return (
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-8 mb-12">
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight font-light">{title}</h1>
            </div>
            <div className="flex flex-col justify-center">
              {description && <p className="text-lg text-muted-foreground mb-6">{description}</p>}
              {children}
            </div>
          </div>

          {image && (
            <div className="relative aspect-square md:aspect-auto md:h-[600px] rounded-3xl overflow-hidden">
              <Image
                src={image || "/placeholder.svg"}
                alt={imageAlt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
              />
            </div>
          )}
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12 items-end">
          <div>
            {badge && <Badge className="mb-6 bg-secondary text-secondary-foreground px-3 py-1.5">{badge}</Badge>}
            <h1 className="text-4xl md:text-6xl font-light mb-6">{title}</h1>
          </div>
          <div>{description && <p className="text-lg text-muted-foreground">{description}</p>}</div>
        </div>
      </div>
    </section>
  )
}
