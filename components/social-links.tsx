import { Github, Linkedin } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants'

export function SocialLinks() {
  return (
    <nav className="flex justify-center items-center gap-6" aria-label="Social media links">
      <a
        href={CONTACT_INFO.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:text-muted-foreground transition-colors duration-300 hover:scale-110 transform focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
        aria-label="Visit LinkedIn profile"
      >
        <Linkedin className="h-6 w-6" aria-hidden="true" />
      </a>
      <a
        href={CONTACT_INFO.github}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:text-muted-foreground transition-colors duration-300 hover:scale-110 transform focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
        aria-label="Visit GitHub profile"
      >
        <Github className="h-6 w-6" aria-hidden="true" />
      </a>
    </nav>
  )
}

