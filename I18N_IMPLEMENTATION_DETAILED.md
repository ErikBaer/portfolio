# i18n Implementierung - Detaillierter Schritt-für-Schritt Plan

## Status: 🚧 IN ARBEIT

**Ziel:** Vollständige i18n-Implementierung mit next-intl, Schritt für Schritt, mit Atomic Commits.

---

## ✅ Schritt 1: next-intl Installation & Basis-Konfiguration
**Status:** ✅ ABGESCHLOSSEN

- [x] next-intl Package installiert
- [x] `i18n.ts` Konfigurationsdatei erstellt
- [x] `messages` Verzeichnis erstellt
- [x] Basis-Middleware erstellt (vorübergehend deaktiviert)
- [x] Leere JSON-Dateien für en/de erstellt

**Commit:** `feat(i18n): Step 1 - Install next-intl and create base configuration`

---

## ✅ Schritt 2: Build-Script erweitern - Markdown → JSON
**Status:** ✅ ABGESCHLOSSEN

- [x] `generate-constants.ts` erweitert um JSON-Generierung
- [x] Unterstützung für mehrere Sprachen hinzugefügt
- [x] JSON-Dateien werden in `messages/` generiert
- [x] Bestehende `constants.ts` Generierung bleibt erhalten
- [x] `constants-content.en.md` und `constants-content.de.md` erstellt

**Commit:** `feat(i18n): Step 2 - Extend build script for Markdown → JSON generation`

---

## 🔄 Schritt 3: Routing-Struktur anpassen
**Status:** ⚠️ IN ARBEIT - Fehler müssen behoben werden

- [x] `app/[locale]` Verzeichnisstruktur erstellt
- [x] `app/[locale]/layout.tsx` mit next-intl Provider erstellt
- [x] Root `app/layout.tsx` angepasst
- [x] `app/page.tsx` → `app/[locale]/page.tsx` verschoben
- [x] `app/case-studies` → `app/[locale]/case-studies` verschoben
- [x] Middleware aktiviert
- [x] Links in Komponenten angepasst für Locale-Prefix
- [ ] **FEHLER:** 500-Fehler auf `/en` und `/de` - muss behoben werden
- [ ] Verifikation: Alle Routes funktionieren korrekt

**Nächste Aktion:** Fehler beheben - wahrscheinlich Problem mit `getMessages()` oder Import-Pfad

**Commit:** `feat(i18n): Step 3 - Implement routing structure with [locale] segment` (wird aktualisiert)

---

## ⏳ Schritt 4: Hardcodierte Strings extrahieren
**Status:** ⏳ PENDING

### 4.1: UI Strings identifizieren und extrahieren
- [ ] Alle hardcodierten Strings in `app/[locale]/page.tsx` identifizieren
- [ ] Strings in `messages/en.json` hinzufügen (sections, buttons, etc.)
- [ ] Strings in `messages/de.json` hinzufügen (deutsche Übersetzungen)
- [ ] Komponente anpassen: `useTranslations()` verwenden
- [ ] Verifikation: Seite lädt ohne Fehler, Strings werden angezeigt
- [ ] **Commit:** `feat(i18n): Step 4.1 - Extract UI strings from homepage`

### 4.2: Navigation Strings migrieren
- [ ] `components/navigation.tsx` - Strings identifizieren
- [ ] Navigation-Labels in JSON hinzufügen
- [ ] Komponente anpassen für Translations
- [ ] Verifikation: Navigation funktioniert, Labels übersetzt
- [ ] **Commit:** `feat(i18n): Step 4.2 - Migrate navigation strings`

### 4.3: Contact Form Strings migrieren
- [ ] `components/contact-form.tsx` - Alle Strings identifizieren
- [ ] Form-Labels, Placeholders, Buttons in JSON
- [ ] Komponente anpassen
- [ ] Verifikation: Form funktioniert, alle Strings übersetzt
- [ ] **Commit:** `feat(i18n): Step 4.3 - Migrate contact form strings`

### 4.4: Case Study Strings migrieren
- [ ] `app/[locale]/case-studies/[slug]/page.tsx` - Strings identifizieren
- [ ] Case Study UI-Strings in JSON
- [ ] Komponente anpassen
- [ ] Verifikation: Case Study Pages funktionieren
- [ ] **Commit:** `feat(i18n): Step 4.4 - Migrate case study strings`

---

## ⏳ Schritt 5: Content aus constants.ts migrieren
**Status:** ⏳ PENDING

### 5.1: Personal Info & Metadata migrieren
- [ ] Content aus `constants.ts` in `messages/en.json` und `messages/de.json` überführen
- [ ] `app/[locale]/page.tsx` anpassen: `t('personalInfo.name')` statt `PERSONAL_INFO.name`
- [ ] Verifikation: Homepage zeigt Content aus Translations
- [ ] **Commit:** `feat(i18n): Step 5.1 - Migrate personal info and metadata`

### 5.2: Executive Summary migrieren
- [ ] Executive Summary Content migrieren
- [ ] Komponente anpassen
- [ ] Verifikation: Executive Summary funktioniert
- [ ] **Commit:** `feat(i18n): Step 5.2 - Migrate executive summary content`

### 5.3: Technical Skills & Interests migrieren
- [ ] Technical Skills Content migrieren
- [ ] Technical Interests Content migrieren
- [ ] Komponenten anpassen
- [ ] Verifikation: Skills & Interests Sections funktionieren
- [ ] **Commit:** `feat(i18n): Step 5.3 - Migrate technical skills and interests`

### 5.4: Build-Script finalisieren
- [ ] Build-Script sicherstellen, dass alle Content-Felder in JSON generiert werden
- [ ] Verifikation: Script generiert korrekte JSON-Struktur
- [ ] **Commit:** `feat(i18n): Step 5.4 - Finalize build script for content migration`

---

## ⏳ Schritt 6: Case Studies mehrsprachig
**Status:** ⏳ PENDING

### 6.1: Case Studies Struktur anpassen
- [ ] `lib/case-studies.ts` für Locale-Support anpassen
- [ ] Case Studies Datenstruktur für Mehrsprachigkeit vorbereiten
- [ ] Verifikation: Case Studies funktionieren mit Locale
- [ ] **Commit:** `feat(i18n): Step 6.1 - Prepare case studies for i18n`

### 6.2: Case Studies Content migrieren
- [ ] Case Studies Content in JSON-Struktur überführen
- [ ] Deutsche Übersetzungen hinzufügen
- [ ] Komponenten anpassen
- [ ] Verifikation: Case Studies in beiden Sprachen funktionieren
- [ ] **Commit:** `feat(i18n): Step 6.2 - Migrate case studies content to i18n`

---

## ⏳ Schritt 7: Metadata & SEO anpassen
**Status:** ⏳ PENDING

### 7.1: Layout Metadata anpassen
- [ ] `app/[locale]/layout.tsx` - `generateMetadata()` implementieren
- [ ] Locale-spezifische Metadata
- [ ] Verifikation: Metadata ist korrekt für beide Sprachen
- [ ] **Commit:** `feat(i18n): Step 7.1 - Implement locale-specific metadata`

### 7.2: SEO & Sitemap anpassen
- [ ] `app/sitemap.ts` für Locale-Support anpassen
- [ ] `app/robots.ts` prüfen/anpassen
- [ ] OpenGraph Tags für alle Sprachen
- [ ] Verifikation: SEO-Tags sind korrekt
- [ ] **Commit:** `feat(i18n): Step 7.2 - Update SEO and sitemap for i18n`

---

## ⏳ Schritt 8: Finale Verifikation & Cleanup
**Status:** ⏳ PENDING

### 8.1: Vollständige Funktionalitätstests
- [ ] Alle Routes in beiden Sprachen testen
- [ ] Navigation funktioniert
- [ ] Case Studies funktionieren
- [ ] Forms funktionieren
- [ ] Keine Console-Errors
- [ ] **Commit:** `test(i18n): Step 8.1 - Complete functionality verification`

### 8.2: Code-Cleanup
- [ ] Unbenutzte Imports entfernen
- [ ] Alte `constants.ts` Imports entfernen (wenn vollständig migriert)
- [ ] Code-Dokumentation aktualisieren
- [ ] Verifikation: Code ist sauber
- [ ] **Commit:** `chore(i18n): Step 8.2 - Code cleanup and documentation`

### 8.3: Finale Verifikation
- [ ] Build funktioniert ohne Fehler
- [ ] Alle Tests bestehen
- [ ] Performance-Check
- [ ] Type-Safety verifiziert
- [ ] **Commit:** `feat(i18n): Step 8.3 - Final verification and completion`

---

## Notizen
- Jeder Schritt wird einzeln implementiert, verifiziert und committed
- Bei Fehlern: Rollback zum vorherigen funktionierenden Zustand
- Markdown wird nach jedem Schritt aktualisiert

