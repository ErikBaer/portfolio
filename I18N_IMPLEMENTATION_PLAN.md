# i18n Implementation Plan - Schritt für Schritt

## Übersicht
Dieser Plan implementiert `next-intl` strategisch und sorgfältig in die bestehende Codebase, ohne das bestehende System zu zerstören.

## Strategie
- **Inkrementell**: Jeder Schritt ist isoliert und testbar
- **Rückwärtskompatibel**: Bestehende Funktionalität bleibt erhalten
- **Minimal invasiv**: So wenig Änderungen wie möglich
- **Verifikation**: Nach jedem Schritt wird die Funktionalität geprüft

---

## Schritt 1: next-intl Installation & Basis-Konfiguration
**Ziel**: next-intl installieren und grundlegende Konfiguration erstellen

### Aufgaben:
1. `next-intl` Package installieren
2. `i18n.ts` Konfigurationsdatei erstellen
3. `messages` Verzeichnis erstellen
4. Basis-Middleware erstellen (für Locale-Detection)

### Dateien die erstellt werden:
- `i18n.ts` - Konfiguration
- `middleware.ts` - Locale-Routing
- `messages/en.json` - Englische Übersetzungen (initial leer)
- `messages/de.json` - Deutsche Übersetzungen (initial leer)

### Verifikation:
- ✅ Package installiert
- ✅ Konfiguration kompiliert ohne Fehler
- ✅ Middleware funktioniert (Locale wird erkannt)

---

## Schritt 2: Build-Script erweitern - Markdown → JSON
**Ziel**: Bestehendes Build-Script erweitern, um JSON-Dateien für next-intl zu generieren

### Aufgaben:
1. `generate-constants.ts` erweitern um JSON-Generierung
2. Unterstützung für mehrere Sprachen hinzufügen
3. JSON-Dateien in `messages/` generieren

### Dateien die geändert werden:
- `scripts/generate-constants.ts` - Erweitert
- `package.json` - Scripts anpassen (falls nötig)

### Dateien die erstellt werden:
- `content/constants-content.en.md` - Englische Content-Datei
- `content/constants-content.de.md` - Deutsche Content-Datei

### Verifikation:
- ✅ Script generiert `messages/en.json` und `messages/de.json`
- ✅ JSON-Struktur ist korrekt
- ✅ Bestehende `constants.ts` Generierung funktioniert weiterhin

---

## Schritt 3: Routing-Struktur anpassen
**Ziel**: App Router mit `[locale]` Segment einrichten

### Aufgaben:
1. `app/[locale]` Verzeichnisstruktur erstellen
2. `app/[locale]/layout.tsx` mit next-intl Provider erstellen
3. Root `app/layout.tsx` anpassen (Locale-Detection)
4. `app/page.tsx` → `app/[locale]/page.tsx` verschieben

### Dateien die erstellt werden:
- `app/[locale]/layout.tsx`
- `app/[locale]/page.tsx` (aus `app/page.tsx` verschoben)

### Dateien die geändert werden:
- `app/layout.tsx` - Root Layout anpassen
- `app/page.tsx` - Wird nach `[locale]` verschoben

### Verifikation:
- ✅ Routes funktionieren: `/en`, `/de`
- ✅ Default-Locale wird korrekt erkannt
- ✅ Navigation funktioniert
- ✅ Keine Breaking Changes in der UI

---

## Schritt 4: Hardcodierte Strings extrahieren
**Ziel**: Alle hardcodierten Strings aus Komponenten in Translation-Files verschieben

### Aufgaben:
1. Hardcodierte Strings in Komponenten identifizieren
2. Strings in `messages/en.json` und `messages/de.json` einfügen
3. Komponenten anpassen: `useTranslations()` verwenden

### Komponenten die geändert werden:
- `app/[locale]/page.tsx` - UI Strings
- `components/navigation.tsx` - Navigation Labels
- `components/contact-form.tsx` - Form Labels
- `app/[locale]/case-studies/[slug]/page.tsx` - Case Study Strings

### Verifikation:
- ✅ Alle Strings sind übersetzbar
- ✅ UI sieht identisch aus (Englisch)
- ✅ Komponenten funktionieren korrekt
- ✅ Keine hardcodierten Strings mehr in Komponenten

---

## Schritt 5: Content aus constants.ts migrieren
**Ziel**: Portfolio-Content aus `constants.ts` in Translation-Files verschieben

### Aufgaben:
1. Content aus `constants.ts` in JSON-Struktur überführen
2. Build-Script anpassen, um Content automatisch zu migrieren
3. Komponenten anpassen: `t('personalInfo.title')` statt `PERSONAL_INFO.title`

### Dateien die geändert werden:
- `scripts/generate-constants.ts` - Content → JSON
- `app/[locale]/page.tsx` - Translation-Keys verwenden
- Alle Komponenten die `constants.ts` importieren

### Verifikation:
- ✅ Content wird aus Translations geladen
- ✅ Deutsche Version zeigt deutsche Inhalte
- ✅ Englische Version zeigt englische Inhalte
- ✅ Bestehende Funktionalität bleibt erhalten

---

## Schritt 6: Case Studies mehrsprachig
**Ziel**: Case Studies in mehrsprachige Struktur überführen

### Aufgaben:
1. Case Studies in Markdown/JSON pro Sprache strukturieren
2. `lib/case-studies.ts` anpassen für Locale-Support
3. Case Study Pages anpassen für Locale-Routing

### Dateien die geändert werden:
- `lib/case-studies.ts` - Locale-Support hinzufügen
- `app/[locale]/case-studies/[slug]/page.tsx` - Locale verwenden

### Dateien die erstellt werden:
- `content/case-studies/` - Mehrsprachige Case Study Files (optional)

### Verifikation:
- ✅ Case Studies funktionieren in beiden Sprachen
- ✅ URLs funktionieren: `/en/case-studies/...`, `/de/case-studies/...`
- ✅ Content ist korrekt übersetzt

---

## Schritt 7: Metadata & SEO anpassen
**Ziel**: Metadata und SEO für alle Sprachen korrekt einrichten

### Aufgaben:
1. `generateMetadata()` in Layouts anpassen
2. Locale-spezifische Metadata
3. OpenGraph Tags für alle Sprachen
4. Sitemap und Robots.txt anpassen

### Dateien die geändert werden:
- `app/[locale]/layout.tsx` - `generateMetadata()`
- `app/sitemap.ts` - Locale-Support
- `app/robots.ts` - Locale-Support

### Verifikation:
- ✅ Metadata ist sprachspezifisch
- ✅ SEO-Tags sind korrekt
- ✅ Sitemap enthält alle Locales
- ✅ OpenGraph Tags funktionieren

---

## Schritt 8: Finale Verifikation & Cleanup
**Ziel**: Alles testen und aufräumen

### Aufgaben:
1. Vollständige Funktionalitätstests
2. Performance-Check
3. Code-Cleanup (unbenutzte Imports, etc.)
4. Dokumentation aktualisieren

### Verifikation:
- ✅ Alle Features funktionieren in beiden Sprachen
- ✅ Keine Console-Errors
- ✅ Build funktioniert ohne Fehler
- ✅ Performance ist akzeptabel
- ✅ Type-Safety ist gegeben

---

## Notizen
- Zwischen jedem Schritt wird die Funktionalität geprüft
- Bei Problemen: Rollback zum vorherigen funktionierenden Zustand
- Jeder Schritt ist isoliert und kann einzeln getestet werden

