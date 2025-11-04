import { PERSONAL_INFO } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="py-4 px-6 border-t border-border bg-card">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm text-muted-foreground">
          © 2025 {PERSONAL_INFO.name}
        </p>
      </div>
    </footer>
  )
}

