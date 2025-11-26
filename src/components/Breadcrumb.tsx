import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  name: string
  url?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center space-x-2 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" aria-hidden="true" />}
            {item.url && index < items.length - 1 ? (
              <Link
                href={item.url}
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-current={index === items.length - 1 ? "page" : undefined}
              >
                {item.name}
              </Link>
            ) : (
              <span className="text-foreground font-medium" aria-current="page">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
