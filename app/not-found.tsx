import { Button } from '@/components/ui/button'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="flex items-center justify-center min-h-[60vh] px-6">
        <div className="text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            404 - Page not found
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            The requested page could not be found. It may have been moved or no longer exists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button>Go to homepage</Button>
            </Link>
            <Link href="/#projects">
              <Button variant="outline">View projects</Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

