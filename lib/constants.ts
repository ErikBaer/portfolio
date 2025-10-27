// Personal Information
export const PERSONAL_INFO = {
  name: "Erik  Baer",
  title: "Senior Platform Engineer & Tech Lead",
  shortDescription: "Experienced Cloud Developer and Enterprise Solutions Architect creating powerful developer platforms that unite excellent Developer Experience, Self-Service architectures, and consistent Product Thinking. Specializing in comprehensive automation and intuitive self-service mechanisms for rapid iterations, high productivity, security, and stability.",
  availability: "Available for new opportunities",
} as const

// Metadata
export const METADATA = {
  title: "Senior Platform Engineer | Tech Lead Portfolio",
  description: "Personal portfolio of a Senior Platform Engineer and Tech Lead specializing in building platforms that accelerate innovation and secure delivery.",
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
  email: "alex.thompson@example.com",
  linkedin: "https://linkedin.com/in/alexthompson",
  github: "https://github.com/alexthompson",
} as const

// Featured Projects
export const FEATURED_PROJECTS = [
  {
    title: "Digital Transformation for Global Enterprises",
    description: "Leading modernization initiatives for Fortune 500 companies",
    content:
      "Leading modernization initiatives for Fortune 500 companies across Automotive, Transportation, Finance, and Healthcare sectors. Architected hybrid and multi-cloud environments with focus on Engineering Platforms, continuous delivery, and Developer Experience. Delivered strategic consulting to business decision-makers and technical leadership.",
    technologies: ["AWS", "Azure", "Kubernetes", "Terraform", "GitLab CI", "Platform Engineering"],
    slug: "digital-transformation-global-enterprises",
  },
  {
    title: "Smart Home IoT Platform - Smirror",
    description: "Complete IoT fitness platform with AI-powered movement feedback",
    content:
      "Architected and developed a complete IoT fitness platform featuring single-board computers with custom Linux OS, real-time 3D motion capturing with AI-powered movement feedback, and event-driven microservice architecture. Implemented fleet management via AWS IoT Core with OTA updates and automated deployment across device groups.",
    technologies: ["AWS IoT Core", "Linux", "Microservices", "CI/CD", "Real-time Processing", "3D Motion Capture"],
    slug: "smart-home-iot-platform-smirror",
  },
  {
    title: "Financial Services Cloud Migration",
    description: "Hybrid cloud architecture for financial services provider",
    content:
      "Led technical migration of a financial services provider to a hybrid bare-metal and high-availability cloud architecture. Optimized system architecture with specialized IBM storage and database solutions. Implemented comprehensive observability platform for international insurance company with full Infrastructure as Code approach.",
    technologies: ["IBM Storage", "Terraform", "Observability", "Cloud Architecture", "Financial Services"],
    slug: "financial-services-cloud-migration",
  },
  {
    title: "Solar Cadastre 3D Analysis Platform",
    description: "Solar potential analysis system with 3D modeling",
    content:
      "Developed innovative solar potential analysis system based on 3D laser scan models with minute-accurate solar irradiation simulation. Created comprehensive API backend for interactive web portal serving citizens across multiple city areas. Later expanded regionally by Regionalverband Ruhr into their official solar cadastre offering.",
    technologies: ["3D Modeling", "Solar Simulation", "API Development", "GIS", "Web Portal", "Data Analysis"],
    slug: "solar-cadastre-3d-analysis-platform",
  },
] as const

// Technical Skills Categories
export const TECHNICAL_SKILLS = [
  {
    title: "Cloud Development",
    technologies: ["Microsoft Azure", "Amazon Web Services", "Multi-Cloud", "Hybrid Cloud", "Landing Zones"],
  },
  {
    title: "Platform Engineering",
    technologies: [
      "Kubernetes",
      "Service Mesh",
      "Istio",
      "Container Orchestration",
      "Engineering Platforms",
      "Developer Experience",
    ],
  },
  {
    title: "Continuous Delivery",
    technologies: ["Infrastructure as Code", "Terraform", "CI/CD", "GitLab CI", "Continuous Delivery", "Observability"],
  },
  {
    title: "Architecture & Design",
    technologies: [
      "System Architecture",
      "Technical Leadership",
      "Stakeholder Management",
      "Enterprise Modernization",
      "Solution Architecture",
    ],
  },
  {
    title: "Security & Compliance",
    technologies: ["Security", "Compliance", "FinOps", "GreenOps", "IT Security", "Best Practices"],
  },
  {
    title: "Artificial Intelligence",
    technologies: [
      "Software Development",
      "Deep Learning",
      "AI Agents",
      "IoT",
      "Microservices",
      "Event-Driven Architecture",
    ],
  },
] as const

// Leadership & Expertise Skills
export const LEADERSHIP_SKILLS = [
  "Platform Engineering",
  "Technical Leadership",
  "System Architecture",
  "Team Mentoring",
  "Cross-functional Collaboration",
  "Incident Response",
  "Performance Optimization",
  "Scalability Planning",
  "Cost Optimization",
  "Migration Strategy",
] as const

// Technical Interests Section Description
export const TECHNICAL_INTERESTS_DESCRIPTION = "Beyond my professional work, I explore cutting-edge technologies and research areas that push the boundaries of what's possible at the intersection of Modern Software Engineering, effective Infrastruture Automation and Artificial Intelligence."

// Technical Interests
export const TECHNICAL_INTERESTS = [
  {
    title: "AI Agent Development",
    description: "Building intelligent autonomous systems",
    content:
      "Exploring the development of sophisticated AI agents using Pydantic AI and LangChain frameworks. Focused on creating autonomous systems that can reason, plan, and execute complex tasks with minimal human intervention.",
    technologies: ["Pydantic AI", "LangChain", "LLM Integration", "Agent Workflows"],
  },
  {
    title: "FinAI & Deep Reinforcement Learning",
    description: "AI-driven financial market analysis and trading",
    content:
      "Implementing and fine-tuning deep reinforcement learning models for stock market prediction and algorithmic trading. Research focuses on multi-agent systems and risk-aware decision making in volatile financial environments.",
    technologies: ["Deep RL", "PyTorch", "Financial Modeling", "Quantitative Analysis"],
  },
  {
    title: "Robotics & Autonomous Systems",
    description: "Hardware-software integration and control systems",
    content:
      "Experimenting with robotics platforms and autonomous navigation systems. Interests include sensor fusion, real-time control algorithms, and the intersection of edge computing with robotic applications.",
    technologies: ["ROS2", "Computer Vision", "Sensor Fusion", "Edge Computing"],
  },
  {
    title: "Progressive Web Applications",
    description: "Next.js PWAs for commercial and community use",
    content:
      "Developed a range of Progressive Web Applications using Next.js for both commercial and community projects. Applications include sports tournament organization systems, domain classification tools, and event entry management with QR code integration.",
    technologies: ["Next.js", "PWA", "QR Integration", "Community Projects"],
  },
] as const
