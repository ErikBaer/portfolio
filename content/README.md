# Content Management

Dieses Verzeichnis enthält die Markdown-basierten Content-Dateien für das Portfolio.

## constants-content.md

Diese Datei enthält alle Textinhalte, die normalerweise in `lib/constants.ts` hardcodiert wären. Du kannst hier in Ruhe alle Texte bearbeiten, ohne TypeScript-Code anzufassen.

### Automatische Generierung

Das Script `scripts/generate-constants.ts` parst diese Markdown-Datei und generiert daraus automatisch `lib/constants.ts`.

### Verwendung

#### Development mit Hot Reload

```bash
npm run dev
```

Dieser Befehl:
- Generiert `constants.ts` einmal am Start
- Startet einen Watch-Modus, der die MD-Datei überwacht
- Startet Next.js Dev-Server
- **Hot Reload funktioniert**: Änderungen an `constants-content.md` generieren automatisch neue `constants.ts`, Next.js lädt dann automatisch neu

#### Einmalige Generierung

```bash
npm run generate-constants
```

Oder direkt:
```bash
npx tsx scripts/generate-constants.ts
```

#### Build

```bash
npm run build
```

Führt die Generierung automatisch vor dem Build aus.

#### Development ohne Watch (falls Probleme)

```bash
npm run dev:simple
```

Generiert einmal am Start, aber kein automatisches Watch.

### Format

- Alle Textinhalte stehen zwischen ``` Code-Blöcken
- Die Struktur (Überschriften, Labels) muss beibehalten werden
- Technologies sind kommagetrennt (z.B. "Tech1, Tech2, Tech3")

### Vorteile

✅ **Content-First**: Bearbeite Inhalte in Markdown statt TypeScript  
✅ **Build-Time Generierung**: TypeScript-Code wird zur Build-Zeit erzeugt  
✅ **Type-Safe**: Die generierte `constants.ts` bleibt vollständig typisiert  
✅ **Automatisch**: `npm run build` generiert automatisch vor dem Build  

