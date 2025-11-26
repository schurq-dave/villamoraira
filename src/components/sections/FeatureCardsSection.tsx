"use client"

import type { IconName } from "@/lib/utils/icons"
import { FeatureCard } from "@/components/cards/FeatureCard"
import { FeatureCardsCarousel } from "./FeatureCardsCarousel"
import { useEffect, useState } from "react"

interface Feature {
  icon: IconName
  title: string
  description: string
}

interface FeatureCardsSectionProps {
  title: string
  description?: string
  features: Feature[]
  columns?: 2 | 3 | 4
  background?: "default" | "muted"
}

export function FeatureCardsSection({
  title,
  description,
  features,
  columns = 3,
  background = "muted",
}: FeatureCardsSectionProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const gridCols = {
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
  }

  const featureCards = features.map((feature, index) => (
    <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
  ))

  return (
    <section className={`py-32 ${background === "muted" ? "bg-muted" : ""}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 max-w-3xl">{title}</h2>
          {description && <p className="text-lg text-muted-foreground max-w-2xl">{description}</p>}
        </div>

        <div className="lg:hidden">
          <FeatureCardsCarousel>{featureCards}</FeatureCardsCarousel>
        </div>

        <div className={`hidden lg:grid grid-cols-1 ${gridCols[columns]} gap-16`}>{featureCards}</div>
      </div>
    </section>
  )
}
