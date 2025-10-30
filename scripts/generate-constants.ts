#!/usr/bin/env tsx
/**
 * Build-time script to parse constants-content.md and generate constants.ts
 * 
 * Run with: npm run generate-constants
 * Or: npx tsx scripts/generate-constants.ts
 */

import { readFileSync, writeFileSync } from "fs"
import { join } from "path"

interface ParsedContent {
  personalInfo: {
    name: string
    title: string
    shortDescription: string
    availability: string
  }
  metadata: {
    title: string
    description: string
  }
  executiveSummary: {
    expertiseAreas: Array<{
      title: string
      description: string
      icon: string
    }>
    mainText: string
  }
  contactInfo: {
    email: string
    linkedin: string
    github: string
  }
  technicalInterestsDescription: string
  technicalInterests: Array<{
    title: string
    description: string
    content: string
    technologies: string[]
  }>
  technicalSkills: Array<{
    title: string
    technologies: string[]
  }>
  leadershipSkills: string[]
}

function extractCodeBlock(content: string, startMarker: string, endMarker: string = "```"): string {
  const startIdx = content.indexOf(startMarker)
  if (startIdx === -1) return ""
  
  const codeStart = content.indexOf("```", startIdx)
  if (codeStart === -1) return ""
  
  const codeEnd = content.indexOf(endMarker, codeStart + 3)
  if (codeEnd === -1) return ""
  
  // Extract content and preserve line breaks
  let extracted = content.substring(codeStart + 3, codeEnd)
  
  // Remove leading/trailing whitespace but preserve line breaks in content
  // Keep at least one leading newline if multiple exist, normalize trailing
  extracted = extracted.replace(/^[\r\n]+/, "") // Remove leading newlines only
  extracted = extracted.replace(/[\r\n]+$/, "") // Remove trailing newlines only
  extracted = extracted.trimEnd() // Remove trailing spaces but keep content
  
  return extracted
}

function extractBetweenMarkers(content: string, startMarker: string, endMarker: string): string {
  const startIdx = content.indexOf(startMarker)
  if (startIdx === -1) return ""
  
  const endIdx = content.indexOf(endMarker, startIdx + startMarker.length)
  if (endIdx === -1) return ""
  
  return content.substring(startIdx + startMarker.length, endIdx).trim()
}

function parseMarkdownFile(filePath: string): ParsedContent {
  const content = readFileSync(filePath, "utf-8")

  // Parse PERSONAL_INFO
  const personalInfoSection = extractBetweenMarkers(content, "## PERSONAL_INFO", "---")
  const name = extractCodeBlock(personalInfoSection, "### name")
  const title = extractCodeBlock(personalInfoSection, "### title")
  const shortDescription = extractCodeBlock(personalInfoSection, "### shortDescription")
  const availability = extractCodeBlock(personalInfoSection, "### availability")

  // Parse METADATA
  const metadataSection = extractBetweenMarkers(content, "## METADATA", "---")
  const metadataTitle = extractCodeBlock(metadataSection, "### title")
  const metadataDescription = extractCodeBlock(metadataSection, "### description")

  // Parse EXECUTIVE_SUMMARY
  const executiveSummarySection = extractBetweenMarkers(content, "## EXECUTIVE_SUMMARY", "---")
  const mainText = extractCodeBlock(executiveSummarySection, "### mainText")
  
  const expertiseAreas: ParsedContent["executiveSummary"]["expertiseAreas"] = []
  const areaRegex = /#### area_(\d+)\s*\n\*\*title:\*\* (.+?)\s*\n\*\*description:\*\* (.+?)\s*\n\*\*icon:\*\* (.+?)(?=\n|$)/g
  let areaMatch
  while ((areaMatch = areaRegex.exec(executiveSummarySection)) !== null) {
    expertiseAreas.push({
      title: areaMatch[2].trim(),
      description: areaMatch[3].trim(),
      icon: areaMatch[4].trim(),
    })
  }

  // Parse CONTACT_INFO
  const contactSection = extractBetweenMarkers(content, "## CONTACT_INFO", "---")
  const email = extractCodeBlock(contactSection, "### email")
  const linkedin = extractCodeBlock(contactSection, "### linkedin")
  const github = extractCodeBlock(contactSection, "### github")

  // Parse TECHNICAL_INTERESTS_DESCRIPTION
  const technicalInterestsDescSection = extractBetweenMarkers(content, "## TECHNICAL_INTERESTS_DESCRIPTION", "---")
  const technicalInterestsDescription = technicalInterestsDescSection.match(/```\s*([\s\S]*?)```/)?.[1]?.trim() || ""

  // Parse TECHNICAL_INTERESTS
  // Find the section after TECHNICAL_INTERESTS_DESCRIPTION (not TECHNICAL_INTERESTS_DESCRIPTION itself)
  const technicalInterestsDescIdx = content.indexOf("## TECHNICAL_INTERESTS_DESCRIPTION")
  const technicalInterestsStartIdx = content.indexOf("## TECHNICAL_INTERESTS", technicalInterestsDescIdx + 1)
  
  if (technicalInterestsStartIdx === -1) {
    console.warn("⚠️  TECHNICAL_INTERESTS section not found")
  }
  
  // Find the next section marker or end of content
  let technicalInterestsEndIdx = content.indexOf("\n## ", technicalInterestsStartIdx + 1)
  if (technicalInterestsEndIdx === -1) {
    technicalInterestsEndIdx = content.length
  } else {
    // Include the newline before the next section
    technicalInterestsEndIdx = content.lastIndexOf("\n---", technicalInterestsEndIdx)
    if (technicalInterestsEndIdx === -1) {
      technicalInterestsEndIdx = content.length
    }
  }
  
  const technicalInterestsSection = content.substring(
    technicalInterestsStartIdx,
    technicalInterestsEndIdx
  )
  
  const technicalInterests: ParsedContent["technicalInterests"] = []
  // More flexible regex that allows for optional whitespace and newlines
  const interestRegex = /### interest_(\d+)\s*\n\*\*title:\*\*\s*(.+?)\s*\n\*\*description:\*\*\s*(.+?)\s*\n\*\*content:\*\*\s*```\s*([\s\S]*?)```\s*\n\*\*technologies:\*\*\s*```\s*([\s\S]*?)```/g
  let interestMatch
  let matchCount = 0
  while ((interestMatch = interestRegex.exec(technicalInterestsSection)) !== null) {
    matchCount++
    const technologies = interestMatch[5].trim().split(",").map((t) => t.trim()).filter((t) => t)
    technicalInterests.push({
      title: interestMatch[2].trim(),
      description: interestMatch[3].trim(),
      content: interestMatch[4].trim(),
      technologies,
    })
  }
  
  if (matchCount === 0 && technicalInterestsSection.length > 50) {
    console.warn("⚠️  No TECHNICAL_INTERESTS parsed. Section preview:", technicalInterestsSection.substring(0, 200))
  }

  // Parse TECHNICAL_SKILLS
  const technicalSkillsSection = extractBetweenMarkers(content, "## TECHNICAL_SKILLS", "---")
  const technicalSkills: ParsedContent["technicalSkills"] = []
  const skillRegex = /### skill_(\d+)\s*\n\*\*title:\*\* (.+?)\s*\n\*\*technologies:\*\*\s*```\s*([\s\S]*?)```/g
  let skillMatch
  while ((skillMatch = skillRegex.exec(technicalSkillsSection)) !== null) {
    const technologies = skillMatch[3].trim().split(",").map((t) => t.trim())
    technicalSkills.push({
      title: skillMatch[2].trim(),
      technologies,
    })
  }

  // Parse LEADERSHIP_SKILLS
  const leadershipSkillsSection = extractBetweenMarkers(content, "## LEADERSHIP_SKILLS", "---")
  const leadershipSkills = extractCodeBlock(leadershipSkillsSection, "").split(",").map((s) => s.trim())

  return {
    personalInfo: { name, title, shortDescription, availability },
    metadata: { title: metadataTitle, description: metadataDescription },
    executiveSummary: { expertiseAreas, mainText },
    contactInfo: { email, linkedin, github },
    technicalInterestsDescription,
    technicalInterests,
    technicalSkills,
    leadershipSkills,
  }
}

function generateConstantsFile(parsed: ParsedContent): string {

  return `// Import Featured Projects from case-studies
import { getFeaturedProjects } from "./case-studies"

// Personal Information
export const PERSONAL_INFO = {
  name: ${JSON.stringify(parsed.personalInfo.name)},
  title: ${JSON.stringify(parsed.personalInfo.title)},
  shortDescription: ${JSON.stringify(parsed.personalInfo.shortDescription)},
  availability: ${JSON.stringify(parsed.personalInfo.availability)},
} as const

// Metadata
export const METADATA = {
  title: ${JSON.stringify(parsed.metadata.title)},
  description: ${JSON.stringify(parsed.metadata.description)},
  generator: "v0.app",
} as const

// Navigation
export const NAVIGATION = {
  items: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Skills", href: "#skills" },
    { label: "Interests", href: "#interests" },
    { label: "Contact", href: "#contact" },
  ],
} as const

// Contact Information
export const CONTACT_INFO = {
  email: ${JSON.stringify(parsed.contactInfo.email)},
  linkedin: ${JSON.stringify(parsed.contactInfo.linkedin)},
  github: ${JSON.stringify(parsed.contactInfo.github)},
} as const

// Featured Projects - imported from case-studies.ts
export const FEATURED_PROJECTS = getFeaturedProjects()

// Executive Summary
export const EXECUTIVE_SUMMARY = {
  expertiseAreas: [
${parsed.executiveSummary.expertiseAreas
  .map(
    (area) => `    {
      title: ${JSON.stringify(area.title)},
      description: ${JSON.stringify(area.description)},
      icon: ${JSON.stringify(area.icon)},
    }`,
  )
  .join(",\n")}
  ],
  mainText: ${JSON.stringify(parsed.executiveSummary.mainText)},
} as const

// Technical Skills Categories
export const TECHNICAL_SKILLS = [
${parsed.technicalSkills
  .map(
    (skill) => `  {
    title: ${JSON.stringify(skill.title)},
    technologies: ${JSON.stringify(skill.technologies)},
  }`,
  )
  .join(",\n")}
] as const

// Leadership & Expertise Skills
export const LEADERSHIP_SKILLS = ${JSON.stringify(parsed.leadershipSkills)} as const

// Technical Interests Section Description
export const TECHNICAL_INTERESTS_DESCRIPTION = ${JSON.stringify(parsed.technicalInterestsDescription)} as const

// Technical Interests
export const TECHNICAL_INTERESTS = [
${parsed.technicalInterests
  .map(
    (interest) => `  {
    title: ${JSON.stringify(interest.title)},
    description: ${JSON.stringify(interest.description)},
    content: ${JSON.stringify(interest.content)},
    technologies: ${JSON.stringify(interest.technologies)},
  }`,
  )
  .join(",\n")}
] as const
`
}

function main() {
  const contentPath = join(process.cwd(), "content", "constants-content.md")
  const outputPath = join(process.cwd(), "lib", "constants.ts")

  console.log("📖 Reading content from:", contentPath)
  const parsed = parseMarkdownFile(contentPath)
  
  console.log("✍️  Generating constants.ts...")
  const generated = generateConstantsFile(parsed)
  
  console.log("💾 Writing to:", outputPath)
  writeFileSync(outputPath, generated, "utf-8")
  
  console.log("✅ Successfully generated constants.ts from constants-content.md!")
}

main()

