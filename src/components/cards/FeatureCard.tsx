import { getIcon, type IconName } from "@/lib/utils/icons"

interface FeatureCardProps {
  icon: IconName
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const Icon = getIcon(icon)

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary/10 rounded-full flex items-center justify-center">
        <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
      </div>
      <h3 className="text-xl sm:text-2xl font-light">{title}</h3>
      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}
