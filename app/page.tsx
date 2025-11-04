import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TechnologyBadge } from "@/components/ui/technology-badge"
import { ArrowRight, ExternalLink, Layers, CircuitBoard, Users } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { ContactForm } from "@/components/contact-form"
import { SocialLinks } from "@/components/social-links"
import { Footer } from "@/components/footer"
import {
  PERSONAL_INFO,
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

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="group bg-primary hover:bg-secondary text-primary-foreground hover:text-secondary-foreground px-6 py-3 transition-all duration-300 hover:shadow-lg min-w-[140px]"
              asChild
            >
              <a href="#projects" className="flex items-center justify-center gap-2">
                View Work
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-6 py-3 border-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 bg-transparent min-w-[140px]"
              asChild
            >
              <a href="#skills" className="flex items-center justify-center">
                Learn More
              </a>
            </Button>
          </div>

          <SocialLinks />
        </div>
      </section>

      {/* Executive Summary Section */}
      <section id="about" className="py-16 px-6 bg-card">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-3 text-card-foreground">
            A tech head with a business mind
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-12 rounded-full"></div>
          <Card className="border-border bg-background shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                {EXECUTIVE_SUMMARY.expertiseAreas.map((area) => {
                  const IconComponent = area.icon === "Code" ? Layers : area.icon === "Database" ? CircuitBoard : Users
                  return (
                    <div key={area.title} className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-card rounded-full flex items-center justify-center hover:bg-accent/20 transition-all duration-300 group">
                        <IconComponent className="w-8 h-8 text-secondary group-hover:text-accent transition-colors duration-300" />
                      </div>
                      <h4 className="text-base font-semibold mb-2 text-foreground">{area.title}</h4>
                      <p className="text-sm text-secondary leading-relaxed">{area.description}</p>
                    </div>
                  )
                })}
              </div>
              <div className="text-center">
                <p className="text-foreground leading-relaxed max-w-3xl mx-auto whitespace-pre-line">
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
          {/* Leadership & Soft Skills */}
          <div id="leadership">
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

          {/* Technical Skills */}
          <div className="mt-12">
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
      <section id="contact" className="py-16 px-6 bg-card">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-3 text-card-foreground">Get In Touch</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-12 rounded-full"></div>
          <Card className="border-border bg-background shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-8">
              <div className="text-center space-y-8">
                <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                  Whether you're looking to collaborate, discuss platform engineering challenges, or explore new opportunities—I'm here for the conversation. Let's talk!
                </p>

                {/* Social Links */}
                <SocialLinks />

                <ContactForm />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
