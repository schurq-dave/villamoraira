import { CheckCircle, X } from "lucide-react"

interface ChecklistItem {
  label: string
  checked: boolean
}

interface ChecklistGridProps {
  items: ChecklistItem[]
  columns?: 1 | 2 | 3
}

export function ChecklistGrid({ items, columns = 1 }: ChecklistGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-2`}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {item.checked ? (
            <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
          ) : (
            <X className="h-4 w-4 mr-2 text-red-500 flex-shrink-0" />
          )}
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  )
}
