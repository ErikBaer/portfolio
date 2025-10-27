import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface TechnologyBadgeProps {
  children: React.ReactNode
  className?: string
}

export function TechnologyBadge({ children, className }: TechnologyBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs border-accent text-accent bg-background hover:bg-accent hover:text-accent-foreground transition-colors",
        className
      )}
    >
      {children}
    </Badge>
  )
}
