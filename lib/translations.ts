/**
 * Übersetzungen - Strukturelle Elemente der Seite
 * Navigation, Headings, Buttons, Form Labels
 */

export const translations = {
  de: {
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
  },
  en: {
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
  },
} as const

export type TranslationKey = keyof typeof translations.de

