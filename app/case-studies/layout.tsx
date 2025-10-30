import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Case Studies | Senior Platform Engineer Portfolio",
  description:
    "Detaillierte Case Studies im CAP-Format: Challenge, Approach, Outcome und Technical Highlights meiner Projekte.",
}

export default function CaseStudiesLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}

