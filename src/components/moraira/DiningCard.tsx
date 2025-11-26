import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Utensils } from "lucide-react"

interface DiningCardProps {
  title: string
  description: string
}

export function DiningCard({ title, description }: DiningCardProps) {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center text-lg sm:text-xl">
          <Utensils className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary flex-shrink-0" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <p className="text-sm sm:text-base text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
