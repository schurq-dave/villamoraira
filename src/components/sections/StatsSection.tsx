interface Stat {
  value: string
  label: string
}

interface StatsSectionProps {
  stats: Stat[]
  background?: "default" | "muted"
}

export function StatsSection({ stats, background = "default" }: StatsSectionProps) {
  return (
    <section className={`py-20 ${background === "muted" ? "bg-muted" : ""}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-light text-primary mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
