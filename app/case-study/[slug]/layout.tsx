import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Case Study | Senior Platform Engineer Portfolio",
  description: "Detailed case study showcasing platform engineering expertise and project outcomes.",
}

export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
