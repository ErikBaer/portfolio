import { Skeleton } from '@/components/ui/skeleton'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section Skeleton */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-6 w-32 mb-8" />
          <Skeleton className="h-12 w-3/4 mb-6" />
        </div>
      </section>

      {/* Content Sections Skeleton */}
      <section className="py-12 px-6 bg-card">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-8 w-48 mb-6" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-8" />
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-8 w-48 mb-6" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-4/5 mb-8" />
        </div>
      </section>

      <section className="py-16 px-6 bg-card">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-8 w-48 mb-6" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-8" />
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="flex flex-wrap gap-2 mb-6">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

