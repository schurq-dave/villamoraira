import type { Villa } from "@/lib/types/Villa"
import { luxuryBeachVilla } from "./luxury-beach-villa"
import { luxuryLoungeVilla } from "./luxury-lounge-villa"

export const villas: Villa[] = [luxuryBeachVilla, luxuryLoungeVilla]

export function getVillaBySlug(slug: string): Villa | undefined {
  return villas.find((villa) => villa.slug === slug)
}

export function getFeaturedVillas(): Villa[] {
  return villas.filter((villa) => villa.featured)
}
