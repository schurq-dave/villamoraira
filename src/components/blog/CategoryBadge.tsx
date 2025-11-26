import { Badge } from "@/components/ui/badge"
import { Tag } from "lucide-react"

interface CategoryBadgeProps {
  category: string
  variant?: "default" | "outline"
}

export function CategoryBadge({ category, variant = "outline" }: CategoryBadgeProps) {
  return (
    <Badge variant={variant} className="w-fit px-3 py-1.5">
      <Tag className="h-3 w-3 mr-1" />
      {category}
    </Badge>
  )
}
