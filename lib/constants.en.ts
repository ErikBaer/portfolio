// Import Featured Projects from case-studies
import { getFeaturedProjects } from "./case-studies"

/**
 * English Constants - Single Source of Truth for all English content
 */

// Personal Information
export const PERSONAL_INFO = {
  name: "Erik Baer",
  title: "Platform Lead & Solution Architect",
  shortDescription: "I design and evolve cloud-native platform ecosystems that reduce complexity, strengthen engineering workflows, and enable teams to focus on high-impact product work. My approach combines hands-on engineering with a strategic understanding of how organisations shape and govern their technology landscape. This enables teams to align around clear principles and sustainable delivery practices, creating long-term value across the organisation.",
  availability: "Available for new opportunities",
} as const

// Metadata
export const METADATA = {
  title: "Lead Platform Engineer & Solution Architect Portfolio",
  description: "Personal portfolio of a Lead Platform Engineer and Solution Architect specializing in building platforms that accelerate innovation and secure delivery.",
  generator: "v0.app",
} as const

// Navigation
export const NAVIGATION = {
  items: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Interests", href: "#interests" },
    { label: "Contact", href: "#contact" },
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
      description: "Creating compelling solutions that unlock productivity while improving developer satisfaction",
      icon: "Code",
    },
    {
      title: "Cloud Architecture",
      description: "Designing hybrid and multi-cloud solutions with focus on automation and technical excellence",
      icon: "Database",
    },
    {
      title: "Technical Leadership",
      description: "Leading cross-functional teams and strategic adoption of platform solutions across organisations",
      icon: "Globe",
    }
  ],
  mainText: "My work efficiently combines deep expertise in cloud-native Software Development and Continuous Delivery, DevOps, as well as IT Infrastructure Engineering, with a considerable experience in Strategic Business Development. My mindset is guided by the strong drive to create impactful business value across complex organisations. I consider platforms as strategic products, that purposefully abstract technical complexity and provide engineering teams with greater autonomy, enabling them to focus on high-quality software development and efficient value creation.",
} as const

// Technical Skills Categories
export const TECHNICAL_SKILLS = [
  {
    title: "Cloud Development",
    technologies: [
      "Microsoft Azure",
      "AWS",
      "Cloud-Native",
      "Hybrid Cloud",
      "Managed Services",
      "Serverless",
      "Linux",
      "Docker",
      "Go",
      "Python",
      "Bash",
      "JavaScript",
    ],
  },
  {
    title: "Platform Engineering",
    technologies: [
      "Kubernetes (AKS/EKS)",
      "Helm",
      "Kustomize",
      "Istio",
      "Backstage",
      "Prometheus",
      "Grafana",
      "ELK",
      "OpenTelemetry",
      "DataDog"
    ],
  },
  {
    title: "Automation & CI/CD",
    technologies: [
      "Terraform",
      "CI/CD",
      "GitOps (Argo CD)",
      "GitHub Actions",
      "GitLab CI",
      "Policy as Code",
      "TDD",
      "Quality Gates",
    ],
  },
  {
    title: "Architecture & Design",
    technologies: [
      "Cloud Architecture",
      "Platform Architecture",
      "API Design",
      "DDD",
      "Landing Zones",
      "Networking",
      "Event-Driven",
      "IoT",
      "Platform as a Product",
    ],
  },
  {
    title: "Security & Governance",
    technologies: [
      "DevSecOps",
      "Zero Trust",
      "Least Privilege",
      "IAM",
      "Multi-Account",
      "OAuth / OIDC",
      "OPA",
      "Kyverno",
      "Entra ID",
      "FinOps",
      "Container Security",
    ],
  },
  {
    title: "Data & AI",
    technologies: [
      "GenAI",
      "Agentic AI",
      "MLOps",
      "Predictive Analytics",
      "Reinforcement Learning",
      "SQL",
      "Data Lake",
    ],
  },
] as const;

export const LEADERSHIP_SKILLS = [
  "Technical Leadership",
  "Platform Strategy",
  "Cloud Strategy",
  "Stakeholder Management",
  "Team Mentoring",
  "Enterprise Modernisation",
  "Migration Strategy",
  "Cross-Functional Collaboration",
  "Scalability Planning",
  "Cost Optimisation (FinOps)",
] as const;
// Technical Interests Section Description
export const TECHNICAL_INTERESTS_DESCRIPTION = "Beyond my professional work, I explore cutting-edge technologies and research areas that push the boundaries of what's possible at the intersection of Modern Software Engineering, effective Infrastructure Automation and Artificial Intelligence." as const

// Technical Interests
export const TECHNICAL_INTERESTS = [
  {
    title: "AI Agent Development",
    description: "Building intelligent autonomous systems",
    content: "Exploring the development of sophisticated AI agents using Pydantic AI and LangChain frameworks. Focused on creating autonomous systems that can reason, plan, and execute complex tasks with minimal human intervention.",
    technologies: ["Pydantic AI","LangChain","LLM Integration","Agent Workflows"],
  },
  {
    title: "FinAI & Deep Reinforcement Learning",
    description: "AI-driven financial market analysis and trading",
    content: "Implementing and fine-tuning deep reinforcement learning models for stock market prediction and algorithmic trading. Research focuses on multi-agent systems and risk-aware decision making in volatile financial environments.",
    technologies: ["Deep RL","PyTorch","Financial Modeling","Quantitative Analysis"],
  },
  {
    title: "Robotics & Autonomous Systems",
    description: "Hardware-software integration and control systems",
    content: "Experimenting with robotics platforms and autonomous navigation systems. Interests include sensor fusion, real-time control algorithms, and the intersection of edge computing with robotic applications.",
    technologies: ["ROS2","Computer Vision","Sensor Fusion","Edge Computing"],
  },
  {
    title: "Progressive Web Applications",
    description: "Next.js PWAs for commercial and community use",
    content: "Developed a range of Progressive Web Applications using Next.js for both commercial and community projects. Applications include sports tournament organization systems, domain classification tools, and event entry management with QR code integration.",
    technologies: ["Next.js","PWA","QR Integration","Community Projects"],
  }
] as const

// UI Translations (Buttons, Navigation, Form Labels, Section Headings)
export const UI = {
  // Buttons
  viewWork: 'View Work',
  learnMore: 'Learn More',
  readCaseStudy: 'Read Case Study',
  sendMessage: 'Send Message',
  backToProjects: 'Back to projects',
  goToHomepage: 'Go to homepage',
  
  // Navigation
  navAbout: 'About',
  navProjects: 'Projects',
  navSkills: 'Skills',
  navInterests: 'Interests',
  navContact: 'Contact',
  
  // Section Headings
  headingAbout: 'A tech head with a business mind',
  headingFeaturedProjects: 'Featured Projects',
  headingLeadership: 'Leadership & Expertise',
  headingTechnicalSkills: 'Technical Skills',
  headingTechnicalInterests: 'Technical Interests',
  headingContact: 'Get In Touch',
  
  // Form Labels
  formName: 'Name',
  formEmail: 'Email',
  formMessage: 'Message',
  formPlaceholderName: 'Your name',
  formPlaceholderEmail: 'your@email.com',
  formPlaceholderMessage: 'Your message...',
} as const

