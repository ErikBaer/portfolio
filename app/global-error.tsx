'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Global error:', error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="mb-6 flex justify-center">
              <AlertCircle className="h-16 w-16 text-destructive" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Critical Error
            </h1>
            <p className="text-muted-foreground mb-8">
              A critical error occurred. The application could not be loaded.
            </p>
            {error.digest && (
              <p className="text-sm text-muted-foreground mb-4">
                Error ID: {error.digest}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={reset} variant="default">
                Try again
              </Button>
              <Button onClick={() => (window.location.href = '/')} variant="outline">
                Go to homepage
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}

