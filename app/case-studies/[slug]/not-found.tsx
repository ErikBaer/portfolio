import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex items-center justify-center min-h-[60vh] px-6">
        <div className="text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Case Study nicht gefunden
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Die angeforderte Case Study konnte nicht gefunden werden.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/case-studies">
              <Button variant="outline">Zurück zu Case Studies</Button>
            </Link>
            <Link href="/">
              <Button>Zur Startseite</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

