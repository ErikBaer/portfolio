// Case Studies Data Structure - CAP Format
// Cap → Challenge → Approach → Outcome → Technical Highlights → Tags

export interface CaseStudy {
  slug: string
  cap: string
  challenge: string
  approach: string
  outcome: string
  technicalHighlights: string
  tags: string[]
  title: string // Title for display
  // Fields for Featured Projects section
  description?: string // Short description for featured projects card
  content?: string // Content text for featured projects card
  featured?: boolean // Whether this case study should appear in Featured Projects
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "digital-banking-modernization",
    title: "Digital Banking Modernization",
    description: "From low-code dead end to scalable platform and financial success",
    content:
      "A struggling low-code banking app had become a bottleneck for innovation and growth, despite attracting a rapidly increasing user base. Through a strategic re-architecture and thin-slice modernization approach, we transformed instability into a foundation for rapid, secure, and autonomous delivery — turning a technical dead end into a flagship success story.",
    cap: "The digital banking platform of a major financial group had reached a technological dead end. A broad technical assessment evolved into a strategic modernization initiative, establishing a path to replatform the application landscape step by step and transitioning the organization from reactive firefighting to proactive engineering.",
    challenge:
      "The digital banking platform built on a low-code foundation could no longer sustain the growing user base and continuous demand for new features. Each update increased instability and outages, while rapid expansion left little room for structural course correction. The result: technical stagnation, operational strain, and a widening gap between ambition and execution.",
    approach:
      "A broad technical assessment evolved into a strategic modernization initiative. By identifying architectural bottlenecks and hidden dependencies, a path to replatform the application landscape step by step was established. The strategy centered on thin-slice modernization—progressively decoupling critical services from the legacy core via sidecar patterns, supported by modern CI/CD pipelines and Infrastructure-as-Code foundations. Transparent communication and demonstrable early wins helped rebuild stakeholder confidence and alignment.",
    outcome:
      "The modernization roadmap became the backbone of a multi-year transformation program. It enabled sustainable delivery practices, measurable improvements in stability, and a scalable foundation for new digital products. The organization transitioned from reactive firefighting to proactive engineering—turning a fragile low-code monolith into a cloud-native ecosystem built for iteration, autonomy, and growth. Today, the platform stands as a model of successful large-scale modernization within the financial sector.",
    technicalHighlights:
      "Gradual migration using sidecar and strangler patterns, introduction of Infrastructure-as-Code (Terraform) and modern CI/CD practices, strengthened observability, security, and release automation, focus on developer experience and engineering effectiveness as key design goals, strong emphasis on stakeholder alignment and value-based communication.",
    tags: [
      "Platform Engineering",
      "Cloud Modernization",
      "Financial Services",
      "Architecture Strategy",
      "CI/CD",
      "Infrastructure as Code",
      "DevEx",
    ],
    featured: true,
  },
  {
    slug: "enterprise-multi-agent-platform-infrastructure",
    title: "Multi-Agent Enterprise Platform Infrastructure",
    description: "Production-ready toolchain for complex multi-agent deployments",
    content:
      "Data-intensive enterprises repeatedly reinvent the wheel when building multi-agent systems, lacking standards and consistent deployment methods. I built the infrastructure foundation for a standardized platform that automates agent deployment with infrastructure provisioning and tool catalog integration—transforming experimental AI projects into production-ready systems.",
    cap: "I developed the infrastructure layer for an enterprise platform that standardizes multi-agent and AI agent deployments across data-intensive organizations. The solution eliminates the need to reinvent infrastructure patterns by providing fully automated, compliant, and production-ready agent deployment capabilities with integrated tool catalog and specialized dataset support.",
    challenge:
      "Enterprises, particularly data-intensive companies, face significant friction when building multi-agent and AI agent systems for chat applications and similar use cases. Each team reinvents the wheel with different agent frameworks, lacks standardization, uses inconsistent deployment methods, and struggles to transition from experimentation to production readiness. This fragmentation creates unnecessary complexity, security risks, and prevents scalable adoption of AI agent technologies across organizations.",
    approach:
      "I was responsible for building the infrastructure foundation of a standardized, generalized platform solution. The platform combines agent selection with pre-configured infrastructure templates as integrated packages, leveraging predefined patterns deployed through automated pipelines. Tools are configured at build time from a curated tool catalog, enabling dynamic agent creation across environments. The solution provides fully automated deployment with full compliance through guardrails while maintaining flexibility for production-ready systems. Built on Azure with AI Foundry, integrating Entra-AD and Data Lake on a Kubernetes platform, managed through Terraform and Helm charts, with Open Policy Agent for Policy-as-Code validation and a lightweight Enterprise Architecture Framework ensuring compliance.",
    outcome:
      "The platform infrastructure enables teams to define agents through a single configuration file and deploy them with fully automated infrastructure provisioning across environments. The solution ensures production readiness through built-in stability, security, resilience, and operational excellence. A self-service portal allows teams to configure and acquire agents along with templates that can be integrated into their repositories. The standardized approach eliminates repetitive infrastructure work, reduces time-to-production, and provides a consistent, secure foundation for enterprise-scale multi-agent deployments—enabling organizations to scale AI agent adoption without reinventing infrastructure patterns for each project.",
    technicalHighlights:
      "Azure AI Foundry integration with Entra-AD and Data Lake on Kubernetes platform, Infrastructure-as-Code with Terraform and Helm charts for automated deployment, Open Policy Agent for Policy-as-Code with automatic security validation, Lightweight Enterprise Architecture Framework for compliance assurance, advanced observability with OpenTelemetry tracing, multi-region disaster recovery strategies, autoscaling capabilities with comprehensive health checks, network isolation and per-environment account segregation, specific keys management with encryption at rest and in flight, automated key rotation and least privilege access controls, self-service portal for agent configuration and acquisition, template-based repository integration for streamlined setup.",
    tags: [
      "MLOps",
      "Multi-Agent Systems",
      "Self-Service",
      "Pydantic",
      "Gen AI",
      "Python",
      "Go",
      "Azure",
      "Kubernetes",
      "Terraform",
      "Helm",
      "Open Policy Agent",
    ],
    featured: true,
  },
  {
    slug: "financial-services-cloud-migration",
    title: "Financial Marketplace Cloud Migration",
    description: "Zero-downtime migration for mission-critical financial marketplace",
    content:
      "A financial marketplace needed to modernize infrastructure while maintaining 24/7 availability for mission-critical transactions. I architected a strategic hybrid migration combining bare-metal infrastructure for low-latency trading systems with cloud elasticity and distributed custom storage solutions.",
    cap: "I led the technical migration of an established financial marketplace to a hybrid bare-metal and high-availability cloud architecture. The migration strategy balanced stringent performance requirements with scalability needs, leveraging specialized IBM Storage solutions for mission-critical workloads while enabling cloud flexibility for dynamic services. The zero-downtime approach, built entirely on Infrastructure as Code, transformed legacy constraints into a modern, compliant, and scalable foundation.",
    challenge:
      "An established financial marketplace operated on monolithic legacy systems that created significant technical debt and limited growth potential. Critical trading and transaction systems required ultra-low latency and absolute reliability, while regulatory compliance demanded strict governance. Simultaneously, the marketplace faced increasing transaction volumes and needed scalable components for customer-facing services. The challenge: migrate to a modern architecture without disrupting 24/7 operations, meeting both performance-critical and scalability requirements, while ensuring full compliance with financial regulations. Any downtime or performance degradation would directly impact trading operations and business reputation.",
    approach:
      "As Technical Lead, I developed a strategic hybrid migration approach that recognized the diverse requirements of different system components. For mission-critical trading and database workloads requiring deterministic performance, I architected dedicated bare-metal infrastructure with specialized IBM Storage solutions optimized for ultra-low latency and high-throughput I/O operations. Concurrently, I designed cloud-native components for scalable customer services, API gateways, and analytics workloads. The entire migration strategy was built on Infrastructure as Code using Terraform, enabling version-controlled, reproducible deployments across environments. I implemented phased migration with automated cutover mechanisms, comprehensive testing in production-like environments, and rollback capabilities at every stage. The approach prioritized risk mitigation through incremental migration, validated each phase before proceeding, and ensured continuous business operations throughout the transformation.",
    outcome:
      "The hybrid architecture successfully transformed the marketplace infrastructure, delivering both performance optimization for critical workloads and cloud-native scalability for growth-oriented services. The migration achieved zero business disruption—all systems remained operational throughout the transition, with performance improvements in critical trading systems and enhanced scalability for customer-facing components. Infrastructure as Code established a foundation for consistent, auditable deployments, dramatically reducing configuration drift and manual errors. The new architecture met all regulatory compliance requirements while enabling rapid scaling for peak trading periods. The organization gained operational confidence, reduced infrastructure risks, and established a sustainable foundation for future growth—turning infrastructure from a constraint into a competitive advantage.",
    technicalHighlights:
      "Hybrid architecture strategically combining bare-metal infrastructure for performance-critical trading systems with cloud services for scalable components, specialized IBM Storage solutions optimized for ultra-low-latency database operations and high-throughput workloads, enterprise-grade high-availability configurations with automated failover for mission-critical systems, complete Infrastructure-as-Code transformation using Terraform for reproducible, version-controlled infrastructure deployments, zero-downtime migration methodology with phased cutover and automated rollback capabilities, compliance-conform architecture designed specifically for financial services regulations, automated deployment pipelines enabling consistent, auditable infrastructure changes, network optimization and data locality strategies for minimal latency across hybrid components, comprehensive disaster recovery and backup strategies ensuring business continuity, monitoring and alerting infrastructure for proactive operational management.",
    tags: [
      "IBM Storage",
      "Terraform",
      "Cloud Architecture",
      "Financial Services",
      "Hybrid Cloud",
      "Infrastructure as Code",
      "Migration Strategy",
      "High Availability",
    ],
    featured: true,
  },
  {
    slug: "observability-platform-insurance",
    title: "Integrated Observability Platform",
    description: "Unified view on development processes for global insurance company",
    content:
      "Technical implementation of a cloud-native observability platform enabling a consolidated view on builds, tickets and deployments from various systems. The solution increased transparency and traceability across the whole software development lifecycle, by integrating highly relevant information from numerous distributed systems in real-time.",
    cap: "I was responsible for the technical implementation of a cloud-native observability platform for a world-leading insurance company. The solution enabled a unified view on the development process and increased transparency and traceability.",
    challenge:
      "The world-leading insurance company operated numerous development teams with different toolchains. Information on builds, tickets, and deployments resided in separate systems. This lack of centralized overview led to unclear cycle times and limited controllability.",
    approach:
      "As Lead Developer, I was responsible for the architecture and implementation of the platform within a mixed team of internal and external developers. The solution was built modularly to iteratively integrate new data sources. Through a custom web UI, information from GitHub Actions, Jira, ArgoCD, Container Registry, and feature flag tools was provided in consolidated form.",
    outcome:
      "The platform enabled developers to track the status of their features across environments and deployment stages in a consolidated manner. For management, it provided transparency over previously scattered information in development and deployment processes.",
    technicalHighlights:
      "React-based web UI, Node.js backend with PostgreSQL and Elasticsearch, microservices as interface layer to GitHub Actions, Jira, ArgoCD, Container Registry and feature flags. Infrastructure and deployment via AWS ECS, automated with Terraform. Architecture designed for real-time integration, extensibility, and high usability for developers.",
    tags: [
      "Observability",
      "PlatformEngineering",
      "DeveloperExperience",
      "SelfService",
      "AWS",
      "Terraform",
      "Elasticsearch",
      "CloudNative",
      "JavaScript",
      "Go",
    ],
    featured: true,
  },
  {
    slug: "digital-transformation-global-enterprises",
    title: "Digital Transformation for Global Enterprises",
    description: "Leading modernization initiatives for Fortune 500 companies",
    content:
      "Leading modernization initiatives for Fortune 500 companies across Automotive, Transportation, Finance, and Healthcare sectors. Architected hybrid and multi-cloud environments with focus on Engineering Platforms, continuous delivery, and Developer Experience. Delivered strategic consulting to business decision-makers and technical leadership.",
    cap: "I led modernization initiatives for Fortune 500 companies across various industries. The focus was on architecting hybrid and multi-cloud environments with a focus on Engineering Platforms, continuous delivery, and Developer Experience.",
    challenge:
      "Large companies across various industries (Automotive, Transportation, Finance, Healthcare) faced the challenge of modernizing outdated IT infrastructures while maintaining business operations. Legacy systems, lack of cloud strategies, and limited Developer Experience hindered innovation speed.",
    approach:
      "As a Solutions Architect, I developed tailored modernization strategies for each company. The focus was on architecting hybrid and multi-cloud environments with Engineering Platforms as the core component. I implemented continuous deployment processes and improved Developer Experience through self-service mechanisms and automation. Strategic consulting for business decision-makers and technical leadership accompanied the technical implementations.",
    outcome:
      "The modernized environments enabled companies to achieve significantly faster innovation cycles and improved developer productivity. Through Engineering Platforms, teams could work autonomously and significantly reduced time-to-production. The hybrid and multi-cloud architectures provided flexibility and scalability for future requirements.",
    technicalHighlights:
      "Hybrid and multi-cloud architectures on AWS and Azure, Kubernetes for container orchestration, Terraform for Infrastructure as Code, GitLab CI for continuous integration and deployment. Engineering Platforms with self-service functionality, Developer Experience optimization through automation and intuitive workflows.",
    tags: ["AWS", "Azure", "Kubernetes", "Terraform", "GitLab CI", "Platform Engineering"],
    featured: true,
  },
  {
    slug: "smart-home-iot-platform",
    title: "Smart Home IoT Platform",
    description: "Turning Mirrors into Smart Coaches",
    content:
      "Architected and developed a full IoT fitness platform connecting Linux-based edge devices with customized OS via AWS IoT Core. Implemented secure fleet management with automated OTA updates, event-driven microservices, capabilities for video-conferencing and real-time 3D motion capture for AI-driven feedback on training performance.",
    cap: "I developed a complete IoT fitness platform that connects Linux-based edge devices with customized operating system and a micro-service backend via AWS IoT Core. The solution transformed mirrors into intelligent fitness coaches with real-time feedback and AI-powered movement analysis.",
    challenge:
      "The market needed an innovative IoT solution for fitness and health tracking that enabled complex movement analysis in real-time. Challenges included connecting edge devices with cloud services, secure device management, automatic updates for remote devices, and processing video and 3D movement data with AI algorithms.",
    approach:
      "As Lead Architect, I designed a complete IoT platform with Linux-based edge devices and customized operating system. AWS IoT Core served as the central connection point for secure device communication. I implemented a secure fleet management system with automated over-the-air updates. Event-driven microservices processed data streams for video conferencing and real-time 3D motion capture. AI algorithms analyzed movement patterns and provided personalized feedback for training performance.",
    outcome:
      "The platform enabled users to use their mirrors as intelligent fitness coaches. Real-time movement analysis with 3D motion capture provided precise feedback on training form. Video conferencing capabilities expanded possibilities for remote training and coaching. The secure fleet management ensured reliable device management and updates across large device fleets.",
    technicalHighlights:
      "AWS IoT Core for device connectivity, Linux-based edge devices with custom OS, secure fleet management with automated OTA updates, event-driven microservices for data processing, video streaming and conferencing capabilities, real-time 3D motion capture for movement analysis, AI-powered algorithms for training feedback, CI/CD pipelines for continuous deployment.",
    tags: ["AWS IoT Core", "Linux", "Microservices", "CI/CD", "Real-time Processing", "3D Motion Capture", "Bash"],
    featured: true,
  },
]

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug)
}

export function getAllCaseStudies(): CaseStudy[] {
  return CASE_STUDIES
}

// Type for Featured Projects (matching the structure used in constants.ts)
export interface FeaturedProject {
  title: string
  description: string
  content: string
  technologies: string[]
  slug: string
}

/**
 * Returns all case studies marked as featured, formatted for the Featured Projects section
 */
export function getFeaturedProjects(): FeaturedProject[] {
  return CASE_STUDIES.filter((study) => study.featured)
    .map((study) => ({
      title: study.title,
      description: study.description || study.cap.substring(0, 80) + "...",
      content: study.content || study.cap,
      technologies: study.tags,
      slug: study.slug,
    }))
}
