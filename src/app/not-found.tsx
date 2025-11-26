import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"
import { uiText } from "@/lib/data/site-config"

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-9xl font-light text-primary mb-4">{uiText.notFoundPage.code}</h1>
        <h2 className="text-4xl font-light mb-4">{uiText.notFoundPage.heading}</h2>
        <p className="text-lg text-muted-foreground mb-8">{uiText.notFoundPage.description}</p>
        <div className="flex gap-4 justify-center">
          <Link href="/">
            <Button size="lg">
              <Home className="mr-2 h-5 w-5" aria-hidden="true" />
              {uiText.notFoundPage.goHome}
            </Button>
          </Link>
          <Link href="/villas">
            <Button size="lg" variant="outline">
              <Search className="mr-2 h-5 w-5" aria-hidden="true" />
              {uiText.notFoundPage.browseVillas}
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
