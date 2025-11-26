import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { LucideIcon } from "lucide-react"

interface TransportOption {
  title: string
  duration: string
  description: string
}

interface TransportationInfoProps {
  title: string
  icon: LucideIcon
  options: TransportOption[]
}

export function TransportationInfo({ title, icon: Icon, options }: TransportationInfoProps) {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icon className="h-6 w-6 mr-2 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {options.map((option, index) => (
          <div key={index}>
            {index > 0 && <Separator className="mb-4" />}
            <div>
              <h4 className="font-medium mb-2">{option.title}</h4>
              <p className="text-muted-foreground text-sm mb-2">{option.duration}</p>
              <p className="text-muted-foreground text-sm">{option.description}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
