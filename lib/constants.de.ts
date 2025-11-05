// Import Featured Projects from case-studies
import { getFeaturedProjects } from "./case-studies"

/**
 * Deutsche Constants - Single Source of Truth für alle deutschen Inhalte
 */

// Personal Information
export const PERSONAL_INFO = {
  name: "Erik Baer",
  title: "Platform Lead & Solution Architect",
  shortDescription: "Als erfahrener Cloud Developer und Enterprise Solutions Architect mit Hintergrund im Strategic Management treibe ich die Transformation von Enterprise IT-Infrastruktur durch strategisches Platform Engineering voran. Ich ermögliche Teams und architekiere leistungsstarke Developer Platforms, die Produktivität freisetzen, Time-to-Market reduzieren und messbaren Geschäftswert für Fortune 500 Unternehmen in den Bereichen Finance, Healthcare und Automotive schaffen.",
  availability: "Verfügbar für neue Möglichkeiten",
} as const

// Metadata
export const METADATA = {
  title: "Lead Platform Engineer & Solution Architect Portfolio",
  description: "Persönliches Portfolio eines Lead Platform Engineers und Solution Architects, spezialisiert auf den Aufbau von Plattformen, die Innovation beschleunigen und sichere Bereitstellung ermöglichen.",
  generator: "v0.app",
} as const

// Navigation
export const NAVIGATION = {
  items: [
    { label: "Über mich", href: "#about" },
    { label: "Projekte", href: "#projects" },
    { label: "Kompetenzen", href: "#skills" },
    { label: "Interessen", href: "#interests" },
    { label: "Kontakt", href: "#contact" },
  ],
} as const

// Contact Information
export const CONTACT_INFO = {
  email: "",
  linkedin: "https://www.linkedin.com/in/erik-baer/",
  github: "https://github.com/ErikBaer",
} as const

// Featured Projects - imported from case-studies.ts
export const FEATURED_PROJECTS = getFeaturedProjects()

// Executive Summary
export const EXECUTIVE_SUMMARY = {
  expertiseAreas: [
    {
      title: "Platform Engineering",
      description: "Erstellung überzeugender Lösungen, die Produktivität freisetzen und gleichzeitig die Zufriedenheit der Entwickler verbessern",
      icon: "Code",
    },
    {
      title: "Cloud Architecture",
      description: "Design von Hybrid- und Multi-Cloud-Umgebungen mit Fokus auf Automatisierung und Best Practices",
      icon: "Database",
    },
    {
      title: "Technical Leadership",
      description: "Führung interdisziplinärer Teams und strategische Einführung von Plattformlösungen in Organisationen",
      icon: "Globe",
    }
  ],
  mainText: "Meine Arbeit verbindet effizient fundiertes Fachwissen in Softwareentwicklung und Continuous Delivery, DevOps sowie IT-Infrastruktur-Engineering mit beträchtlicher Erfahrung im Strategischen Business Development. Diese Denkweise wird durch meinen starken Antrieb ergänzt, wirkungsvollen Geschäftswert in komplexen Organisationen zu schaffen. Ich betrachte Plattformen als strategische Produkte, die gezielt technische Komplexität abstrahieren und Engineering-Teams größere Autonomie geben, sodass sie sich auf hochwertige Softwareentwicklung und effiziente Wertschöpfung konzentrieren können.",
} as const

// Technical Skills Categories
export const TECHNICAL_SKILLS = [
  {
    title: "Cloud Development",
    technologies: ["MS Azure","AWS","IBM Cloud","Multi-Cloud","Hybrid Cloud","Managed Services","Serverless","Javascript","Python","Go","Bash"],
  },
  {
    title: "Platform Engineering",
    technologies: ["Kubernetes","Service Mesh","Istio","Helm","Kustomize","Docker","Backstage","Humanitec","ELK","Grafana","DataDog","Opentrace"],
  },
  {
    title: "Continuous Delivery",
    technologies: ["Infrastructure as Code","Terraform","Continuous Integration","GitLab CI","Github Actions","Azure DevOps","Argo CD","Circle CI","TDD"],
  },
  {
    title: "Architecture & Design",
    technologies: ["System Architecture","API-Design","Domain Driven Design","Landing Zones","Well-Architected Framework","IoT","Automation","Product Thinking","PaaP"],
  },
  {
    title: "Security & Compliance",
    technologies: ["Zero-Trust","Least Privilege","Multi-Account","Threat Modelling","OAuth","Kyverno","OWASP","OPA","EntraAD","FinOps","GreenOps"],
  },
  {
    title: "Data & Artificial Intelligence",
    technologies: ["Deep Reinforcment Learning","MLOps","GenAI","Agentic Development","Multi-Agents","Fine-tuning","Data Mesh","Data Lake","SQL","Predictive Analytics"],
  }
] as const

// Leadership & Expertise Skills
export const LEADERSHIP_SKILLS = ["Technical Leadership","Stakeholder Management","Digital Transformation","Enterprise Modernisation","Team Mentoring","Cross-functional Collaboration","Performance Optimization","Scalability Planning","Cost Optimization","Migration Strategy"] as const

// Technical Interests Section Description
export const TECHNICAL_INTERESTS_DESCRIPTION = "Neben meiner beruflichen Arbeit erkunde ich innovative Technologien und Forschungsbereiche, die die Grenzen des Möglichen an der Schnittstelle von Modern Software Engineering, effektiver Infrastructure Automation und Artificial Intelligence erweitern." as const

// Technical Interests
export const TECHNICAL_INTERESTS = [
  {
    title: "AI Agent Development",
    description: "Aufbau intelligenter autonomer Systeme",
    content: "Erforschung der Entwicklung ausgeklügelter AI-Agenten mit Pydantic AI und LangChain Frameworks. Fokus auf die Erstellung autonomer Systeme, die komplexe Aufgaben mit minimalem menschlichen Eingriff analysieren, planen und ausführen können.",
    technologies: ["Pydantic AI","LangChain","LLM Integration","Agent Workflows"],
  },
  {
    title: "FinAI & Deep Reinforcement Learning",
    description: "KI-gestützte Finanzmarktanalyse und Handel",
    content: "Implementierung und Feinabstimmung von Deep Reinforcement Learning Modellen für Aktienmarktprognosen und algorithmischen Handel. Forschung konzentriert sich auf Multi-Agent-Systeme und risikobewusste Entscheidungsfindung in volatilen Finanzumgebungen.",
    technologies: ["Deep RL","PyTorch","Financial Modeling","Quantitative Analysis"],
  },
  {
    title: "Robotics & Autonomous Systems",
    description: "Hardware-Software-Integration und Steuerungssysteme",
    content: "Experimentieren mit Robotik-Plattformen und autonomen Navigationssystemen. Interessen umfassen Sensorfusion, Echtzeit-Steuerungsalgorithmen und die Schnittstelle von Edge Computing mit robotischen Anwendungen.",
    technologies: ["ROS2","Computer Vision","Sensor Fusion","Edge Computing"],
  },
  {
    title: "Progressive Web Applications",
    description: "Next.js PWAs für kommerzielle und Community-Nutzung",
    content: "Entwicklung einer Reihe von Progressive Web Applications mit Next.js für kommerzielle und Community-Projekte. Anwendungen umfassen Sportturnier-Organisationssysteme, Domain-Klassifizierungstools und Event-Eintrittsmanagement mit QR-Code-Integration.",
    technologies: ["Next.js","PWA","QR Integration","Community Projects"],
  }
] as const

// UI Translations (Buttons, Navigation, Form Labels, Section Headings)
export const UI = {
  // Buttons
  viewWork: 'Meine Arbeit',
  learnMore: 'Mehr erfahren',
  readCaseStudy: 'Case Study lesen',
  sendMessage: 'Nachricht senden',
  backToProjects: 'Zurück zu Projekten',
  goToHomepage: 'Zur Startseite',
  
  // Navigation
  navAbout: 'Über mich',
  navProjects: 'Projekte',
  navSkills: 'Kompetenzen',
  navInterests: 'Interessen',
  navContact: 'Kontakt',
  
  // Section Headings
  headingAbout: 'Ein Tech-Head mit Business-Verstand',
  headingFeaturedProjects: 'Ausgewählte Projekte',
  headingLeadership: 'Leadership & Expertise',
  headingTechnicalSkills: 'Technische Kompetenzen',
  headingTechnicalInterests: 'Technische Interessen',
  headingContact: 'Kontakt aufnehmen',
  
  // Form Labels
  formName: 'Name',
  formEmail: 'E-Mail',
  formMessage: 'Nachricht',
  formPlaceholderName: 'Ihr Name',
  formPlaceholderEmail: 'ihre@email.com',
  formPlaceholderMessage: 'Ihre Nachricht...',
} as const

