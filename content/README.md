# Content Management

Dieses Verzeichnis kann für zukünftige Content-Dateien verwendet werden.

## Aktuelle Content-Struktur

Alle Content-Werte werden jetzt direkt in TypeScript-Dateien verwaltet:

### Locale-basierte Constants

- **`lib/constants.de.ts`** - Single Source of Truth für alle deutschen Inhalte
- **`lib/constants.en.ts`** - Single Source of Truth für alle englischen Inhalte
- **`lib/constants.ts`** - Zentrale Datei, die je nach Locale die richtige Datei lädt

### Struktur

Beide Locale-Dateien enthalten die gleichen Keys mit unterschiedlichen Werten:

- `PERSONAL_INFO` - Persönliche Informationen
- `METADATA` - SEO-Metadaten
- `NAVIGATION` - Navigationsstruktur
- `CONTACT_INFO` - Kontaktinformationen
- `EXECUTIVE_SUMMARY` - Executive Summary und Expertise Areas
- `TECHNICAL_SKILLS` - Technische Kompetenzen
- `LEADERSHIP_SKILLS` - Leadership Skills
- `TECHNICAL_INTERESTS` - Technische Interessen
- `TECHNICAL_INTERESTS_DESCRIPTION` - Beschreibung der Interessen
- `UI` - UI-Übersetzungen (Buttons, Labels, Headings)

### Verwendung

#### In Client Components

```typescript
import { useI18nSafe } from '@/lib/use-i18n-safe'

export function MyComponent() {
  const { constants, t } = useI18nSafe()
  
  // Verwende constants für Content
  const { PERSONAL_INFO, TECHNICAL_SKILLS } = constants
  
  // Verwende t() für UI-Übersetzungen
  const heading = t('headingAbout')
}
```

#### In Server Components

```typescript
import { PERSONAL_INFO, CONTACT_INFO } from '@/lib/constants'

// Verwendet automatisch die Default-Locale (en)
export function MyServerComponent() {
  return <div>{PERSONAL_INFO.name}</div>
}
```

### Vorteile

✅ **Direkte TypeScript-Dateien**: Keine Generierung, keine Build-Steps  
✅ **Type-Safe**: Vollständige TypeScript-Unterstützung  
✅ **Locale-basiert**: Separate Dateien für jede Sprache  
✅ **Einfache Wartung**: Direkt bearbeitbar, keine Markdown-Parsing  
✅ **Single Source of Truth**: Jede Locale hat ihre eigene Datei  
