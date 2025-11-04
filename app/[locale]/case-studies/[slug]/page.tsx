import { Badge } from "@/components/ui/badge"
import { TechnologyBadge } from "@/components/ui/technology-badge"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getCaseStudyBySlug } from "@/lib/case-studies"
import { notFound } from "next/navigation"

interface CaseStudyPageProps {
  params: Promise<{ slug: string; locale: string }>
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { slug, locale } = await params
  const caseStudy = getCaseStudyBySlug(slug)

  if (!caseStudy) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/${locale}/#projects`}
            prefetch={true}
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            Back to Portfolio
          </Link>

          {caseStudy.title && (
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              {caseStudy.title}
            </h1>
          )}
        </div>
      </section>

      {/* Cap Section */}
      <section className="py-12 px-6 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-card-foreground mb-6">Summary</h2>
          <div className="w-24 h-1 bg-accent mb-8 rounded-full"></div>
          <p className="text-lg text-card-foreground leading-relaxed text-pretty">{caseStudy.cap}</p>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">Challenge</h2>
          <div className="w-24 h-1 bg-accent mb-8 rounded-full"></div>
          <p className="text-lg text-foreground leading-relaxed text-pretty">{caseStudy.challenge}</p>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-16 px-6 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-card-foreground mb-6">Approach</h2>
          <div className="w-24 h-1 bg-accent mb-8 rounded-full"></div>
          <p className="text-lg text-card-foreground leading-relaxed text-pretty whitespace-pre-line">
            {caseStudy.approach}
          </p>
        </div>
      </section>

      {/* Outcome Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6">Outcome</h2>
          <div className="w-24 h-1 bg-accent mb-8 rounded-full"></div>
          <p className="text-lg text-foreground leading-relaxed text-pretty">{caseStudy.outcome}</p>
        </div>
      </section>

      {/* Technical Highlights Section */}
      <section className="py-16 px-6 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-card-foreground mb-6">
            Technical Highlights
          </h2>
          <div className="w-24 h-1 bg-accent mb-8 rounded-full"></div>
          <p className="text-lg text-card-foreground leading-relaxed text-pretty whitespace-pre-line">
            {caseStudy.technicalHighlights}
          </p>
        </div>
      </section>

      {/* Tags Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-6">Tags</h3>
          <div className="w-24 h-1 bg-accent mb-8 rounded-full"></div>
          <div className="flex flex-wrap gap-2 mb-6">
            {caseStudy.tags.map((tag) => (
              <TechnologyBadge key={tag}>{tag}</TechnologyBadge>
            ))}
          </div>
          <Link
            href={`/${locale}/#projects`}
            prefetch={true}
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors group mt-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            Back to Portfolio
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

