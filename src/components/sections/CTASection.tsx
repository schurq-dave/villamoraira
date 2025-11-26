import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface CTAButton {
  label: string
  href: string
  variant?: "primary" | "default"
}

interface CTASectionProps {
  title: string
  description: string
  buttons: CTAButton[]
  background?: "default" | "muted"
}

export function CTASection({ title, description, buttons, background = "muted" }: CTASectionProps) {
  return (
    <section className={`py-32 ${background === "muted" ? "bg-muted" : ""}`}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6">{title}</h2>
        <p className="text-xl text-muted-foreground mb-12 leading-relaxed">{description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {buttons.map((button, index) => (
            <Link key={index} href={button.href}>
              <Button size="lg" variant={button.variant || "default"}>
                {button.label}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
