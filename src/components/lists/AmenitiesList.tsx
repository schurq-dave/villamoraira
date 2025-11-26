import { CheckCircle } from "lucide-react"

interface AmenitiesListProps {
  amenities: string[]
  columns?: 1 | 2 | 3
}

export function AmenitiesList({ amenities, columns = 2 }: AmenitiesListProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-4`}>
      {amenities.map((amenity, index) => (
        <div key={index} className="flex items-center">
          <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
          <span>{amenity}</span>
        </div>
      ))}
    </div>
  )
}
