import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Users, TrendingUp, CheckCircle } from "lucide-react"
import Link from "next/link"

// This would typically come from a CMS or database
const getCaseStudy = (slug: string) => {
  const caseStudies: Record<string, any> = {
    "cloud-migration-platform": {
      title: "Cloud Migration Platform",
      subtitle: "Enterprise-scale migration orchestration system",
      duration: "18 months",
      team: "8 engineers",
      technologies: ["AWS", "Kubernetes", "Terraform", "Go", "PostgreSQL", "Redis"],
      hero: {
        challenge: "Legacy infrastructure blocking innovation",
        solution: "Automated migration orchestration platform",
        impact: "200+ applications migrated with 75% time reduction",
      },
      challenge: {
        title: "The Challenge",
        content: [
          "Our enterprise client was running 200+ critical business applications on aging on-premises infrastructure that was becoming increasingly expensive to maintain and scale. The legacy systems were creating bottlenecks for development teams, with deployment cycles taking weeks instead of hours.",
          "The primary challenges included:",
          "• **Technical Debt**: Monolithic applications with tightly coupled dependencies\n• **Scalability Issues**: Infrastructure couldn't handle peak traffic loads\n• **Security Concerns**: Outdated systems with known vulnerabilities\n• **Operational Overhead**: Manual processes requiring 24/7 monitoring\n• **Cost Escalation**: Hardware refresh cycles and maintenance contracts",
        ],
      },
      approach: {
        title: "Our Approach",
        content: [
          "We designed a comprehensive migration strategy that prioritized business continuity while modernizing the entire technology stack. The approach was built around three core principles: automation, observability, and gradual migration.",
          "**Phase 1: Assessment & Planning**\nConducted detailed application dependency mapping and performance profiling to create migration blueprints for each workload.",
          "**Phase 2: Platform Development**\nBuilt a custom orchestration platform using Go and Kubernetes that could handle complex migration workflows with rollback capabilities.",
          "**Phase 3: Pilot Migration**\nStarted with non-critical applications to validate our approach and refine the automation tooling.",
          "**Phase 4: Production Migration**\nExecuted migrations in carefully planned waves, maintaining zero-downtime for critical business systems.",
        ],
      },
      outcome: {
        title: "Results & Impact",
        metrics: [
          { label: "Applications Migrated", value: "200+", icon: CheckCircle },
          { label: "Time Reduction", value: "75%", icon: TrendingUp },
          { label: "Cost Savings", value: "$2.4M/year", icon: TrendingUp },
          { label: "Uptime Maintained", value: "99.99%", icon: CheckCircle },
        ],
        content: [
          "The migration platform exceeded all success criteria and became a template for future enterprise transformations:",
          "**Operational Excellence**: Achieved 99.99% uptime during migration with zero data loss incidents.",
          "**Performance Gains**: Average application response time improved by 40% post-migration.",
          "**Developer Productivity**: Deployment frequency increased from weekly to multiple times per day.",
          "**Security Posture**: Implemented automated security scanning and compliance monitoring across all workloads.",
          "**Knowledge Transfer**: Trained the client's internal team to maintain and extend the platform independently.",
        ],
      },
    },
  }

  return caseStudies[slug] || null
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const caseStudy = getCaseStudy(params.slug)

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-2xl font-bold text-foreground mb-4">Case Study Not Found</h1>
          <Link href="/">
            <Button variant="outline">Return to Portfolio</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Portfolio
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              {caseStudy.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6 text-balance">{caseStudy.subtitle}</p>
          </div>

          <div className="flex flex-wrap gap-6 mb-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Duration: {caseStudy.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Team: {caseStudy.team}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-12">
            {caseStudy.technologies.map((tech: string) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>

          {/* Hero Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-serif text-card-foreground">Challenge</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{caseStudy.hero.challenge}</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-serif text-card-foreground">Solution</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{caseStudy.hero.solution}</p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-serif text-card-foreground">Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{caseStudy.hero.impact}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-16 px-6 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-card-foreground mb-8">{caseStudy.challenge.title}</h2>
          <div className="prose prose-lg max-w-none">
            {caseStudy.challenge.content.map((paragraph: string, index: number) => (
              <div key={index} className="mb-6">
                {paragraph.includes("•") ? (
                  <div className="text-card-foreground leading-relaxed">
                    {paragraph.split("\n").map((line: string, lineIndex: number) => (
                      <div key={lineIndex} className={line.startsWith("•") ? "ml-4 mb-2" : "mb-4"}>
                        {line.includes("**") ? (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                            }}
                          />
                        ) : (
                          line
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-card-foreground leading-relaxed">
                    {paragraph.includes("**") ? (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: paragraph.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                        }}
                      />
                    ) : (
                      paragraph
                    )}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8">{caseStudy.approach.title}</h2>
          <div className="prose prose-lg max-w-none">
            {caseStudy.approach.content.map((paragraph: string, index: number) => (
              <div key={index} className="mb-6">
                <p className="text-foreground leading-relaxed">
                  {paragraph.includes("**") ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: paragraph.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                      }}
                    />
                  ) : (
                    paragraph
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcome Section */}
      <section className="py-16 px-6 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-card-foreground mb-8">{caseStudy.outcome.title}</h2>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {caseStudy.outcome.metrics.map((metric: any, index: number) => (
              <Card key={index} className="text-center border-border bg-background">
                <CardContent className="pt-6">
                  <metric.icon className="h-8 w-8 text-accent mx-auto mb-3" />
                  <div className="text-2xl font-bold text-foreground mb-1">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="prose prose-lg max-w-none">
            {caseStudy.outcome.content.map((paragraph: string, index: number) => (
              <div key={index} className="mb-6">
                <p className="text-card-foreground leading-relaxed">
                  {paragraph.includes("**") ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: paragraph.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                      }}
                    />
                  ) : (
                    paragraph
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="font-serif text-2xl font-bold text-foreground mb-4">Interested in Similar Results?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how I can help architect and implement platform solutions that drive your business forward.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                Get In Touch
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg" className="px-8 bg-transparent">
                View More Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
