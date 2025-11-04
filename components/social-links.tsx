import { Github, Linkedin } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants'

export function SocialLinks() {
  return (
    <div className="flex justify-center items-center gap-6">
      <a
        href={CONTACT_INFO.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:text-muted-foreground transition-colors duration-300 hover:scale-110 transform"
        aria-label="LinkedIn Profile"
      >
        <Linkedin className="h-6 w-6" />
      </a>
      <a
        href={CONTACT_INFO.github}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:text-muted-foreground transition-colors duration-300 hover:scale-110 transform"
        aria-label="GitHub Profile"
      >
        <Github className="h-6 w-6" />
      </a>
    </div>
  )
}

