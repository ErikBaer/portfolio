import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TechnologyBadge } from "@/components/ui/technology-badge"
import { ArrowRight, Github, Linkedin, Mail, ExternalLink, Code, Database, Globe } from "lucide-react"
import { Navigation } from "@/components/navigation"
import {
  PERSONAL_INFO,
  CONTACT_INFO,
  FEATURED_PROJECTS,
  TECHNICAL_SKILLS,
  LEADERSHIP_SKILLS,
  TECHNICAL_INTERESTS,
  TECHNICAL_INTERESTS_DESCRIPTION,
  EXECUTIVE_SUMMARY,
} from "@/lib/constants"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground mb-4 text-balance">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-xl md:text-2xl text-accent mb-6 text-balance font-medium">
              {PERSONAL_INFO.title}
            </p>
          </div>

          <div className="mb-12">
            <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
              {PERSONAL_INFO.shortDescription}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="group bg-primary hover:bg-secondary text-primary-foreground hover:text-secondary-foreground px-4 py-3 transition-all duration-300 hover:shadow-lg"
              asChild
            >
              <a href="#projects">
                View Work
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-4 py-3 border-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 bg-transparent"
              asChild
            >
              <a href="#skills">
                Learn More
              </a>
            </Button>
          </div>

          <div className="flex justify-center gap-6 mt-12">
            <a
              href={CONTACT_INFO.linkedin}
              className="text-muted-foreground hover:text-accent transition-colors duration-300 hover:scale-110 transform"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href={CONTACT_INFO.github}
              className="text-muted-foreground hover:text-accent transition-colors duration-300 hover:scale-110 transform"
              aria-label="GitHub Profile"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="text-muted-foreground hover:text-accent transition-colors duration-300 hover:scale-110 transform"
              aria-label="Email Contact"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </section>

      {/* Executive Summary Section */}
      <section id="about" className="py-16 px-6 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-3 text-card-foreground">
            Executive Summary
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-12 rounded-full"></div>
          <Card className="border-border bg-card shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {EXECUTIVE_SUMMARY.expertiseAreas.map((area) => {
                  const IconComponent = area.icon === "Code" ? Code : area.icon === "Database" ? Database : Globe
                  return (
                    <div key={area.title} className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center hover:bg-accent/20 transition-all duration-300 group">
                        <IconComponent className="w-8 h-8 text-primary group-hover:text-accent transition-colors duration-300" />
                      </div>
                      <h4 className="font-semibold mb-2 text-card-foreground">{area.title}</h4>
                      <p className="text-sm text-secondary leading-relaxed">{area.description}</p>
                    </div>
                  )
                })}
              </div>
              <div className="text-center">
                <p className="text-card-foreground leading-relaxed max-w-3xl mx-auto whitespace-pre-line">
                  {EXECUTIVE_SUMMARY.mainText}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-3 text-foreground">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-12 rounded-full"></div>

          <div className="grid grid-cols-2 gap-8">
            {FEATURED_PROJECTS.map((project) => (
              <Card
                key={project.slug}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border bg-card flex flex-col"
              >
              <CardHeader>
                <CardTitle className="font-serif text-xl text-card-foreground">
                    {project.title}
                </CardTitle>
                  <CardDescription className="text-secondary">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                  <p className="text-sm text-card-foreground leading-relaxed mb-4">{project.content}</p>
                <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <TechnologyBadge key={tech}>{tech}</TechnologyBadge>
                    ))}
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button variant="link" className="group/btn p-0 h-auto text-accent hover:text-accent/80 font-medium" asChild>
                  <a href={`/case-studies/${project.slug}`}>
                    Read Case Study
                    <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-3 text-card-foreground">
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-12 rounded-full"></div>

          <div className="flex flex-wrap justify-center gap-3">
            {TECHNICAL_SKILLS.map((skill) => (
              <Card key={skill.title} className="border-border bg-background flex-1 min-w-[280px] max-w-[320px] hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                  <CardTitle className="font-serif text-lg text-foreground">{skill.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                    {skill.technologies.map((tech) => (
                      <TechnologyBadge key={tech}>{tech}</TechnologyBadge>
                    ))}
                </div>
              </CardContent>
            </Card>
            ))}
          </div>

          {/* Leadership & Soft Skills */}
          <div className="mt-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-3 text-card-foreground">
              Leadership & Expertise
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-8 rounded-full"></div>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {LEADERSHIP_SKILLS.map((skill) => (
              <Badge
                  key={skill}
                variant="outline"
                className="text-sm px-4 py-2 border-accent text-accent bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                  {skill}
              </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Interests Section */}
      <section id="interests" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-3 text-foreground">
            Technical Interests
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-4 rounded-full"></div>
          <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty">
            {TECHNICAL_INTERESTS_DESCRIPTION}
          </p>

          <div className="grid grid-cols-2 gap-8">
            {TECHNICAL_INTERESTS.map((interest) => (
              <Card
                key={interest.title}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border bg-card flex flex-col"
              >
              <CardHeader>
                <CardTitle className="font-serif text-xl text-card-foreground">
                    {interest.title}
                </CardTitle>
                  <CardDescription className="text-secondary">{interest.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                  <p className="text-sm text-card-foreground leading-relaxed mb-4">{interest.content}</p>
                <div className="flex flex-wrap gap-2">
                    {interest.technologies.map((tech) => (
                      <TechnologyBadge key={tech}>{tech}</TechnologyBadge>
                    ))}
                </div>
              </CardContent>
            </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-3 text-foreground">Get In Touch</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-12 rounded-full"></div>

          <div className="text-center space-y-8">
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
              Open to discussing platform engineering opportunities and technical leadership roles.
            </p>

            {/* Contact Details */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors group"
              >
                <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>{CONTACT_INFO.email}</span>
              </a>

              <a
                href={CONTACT_INFO.linkedin}
                className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors group"
              >
                <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>LinkedIn</span>
              </a>

              <a
                href={CONTACT_INFO.github}
                className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors group"
              >
                <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>GitHub</span>
              </a>
            </div>

            {/* Availability Status */}
            <div className="pt-4">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-accent/10 border border-accent">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <p className="text-sm text-foreground">{PERSONAL_INFO.availability}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 {PERSONAL_INFO.name}. Built with Next.js and deployed on Vercel.
          </p>
        </div>
      </footer>
    </div>
  )
}
