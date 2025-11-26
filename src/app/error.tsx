"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"
import { uiText } from "@/lib/data/site-config"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[v0] Error boundary caught:", error)
  }, [error])

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <AlertCircle className="h-24 w-24 text-red-500 mx-auto mb-6" aria-hidden="true" />
        <h1 className="text-4xl font-light mb-4">{uiText.errorPage.heading}</h1>
        <p className="text-lg text-muted-foreground mb-8">{uiText.errorPage.description}</p>
        {error.message && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-left">
            <p className="text-sm text-red-800 font-mono">{error.message}</p>
          </div>
        )}
        <div className="flex gap-4 justify-center">
          <Button size="lg" onClick={reset}>
            <RefreshCw className="mr-2 h-5 w-5" aria-hidden="true" />
            {uiText.errorPage.tryAgain}
          </Button>
          <Link href="/">
            <Button size="lg" variant="outline">
              <Home className="mr-2 h-5 w-5" aria-hidden="true" />
              {uiText.errorPage.goHome}
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
