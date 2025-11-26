import type { LucideIcon } from "lucide-react"

interface Activity {
  title: string
  description: string
}

interface ActivitySectionProps {
  title: string
  icon: LucideIcon
  activities: Activity[]
}

export function ActivitySection({ title, icon: Icon, activities }: ActivitySectionProps) {
  return (
    <div>
      <h3 className="text-2xl md:text-3xl font-light mb-6 flex items-center">
        <Icon className="h-6 w-6 mr-2 text-primary" />
        {title}
      </h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            <div>
              <h4 className="font-medium">{activity.title}</h4>
              <p className="text-muted-foreground text-sm">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
