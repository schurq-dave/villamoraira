import { Star, MapPin, Users, type LucideIcon } from "lucide-react"

// Icon mapping for serializable icon names
const iconMap: Record<string, LucideIcon> = {
  star: Star,
  mapPin: MapPin,
  users: Users,
}

export function getIcon(iconName: string): LucideIcon {
  return iconMap[iconName] || Star
}

export type IconName = keyof typeof iconMap
