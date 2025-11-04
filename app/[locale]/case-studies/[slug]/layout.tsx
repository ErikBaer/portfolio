import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Case Study | Senior Platform Engineer Portfolio",
  description: "Detaillierte Case Study im CAP-Format: Challenge, Approach, Outcome und Technical Highlights.",
}

export default function CaseStudyDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}

