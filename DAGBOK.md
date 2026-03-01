# WriteON – Arbetslogg

---

## Session 2026-03-01

### Vad vi gjorde

#### Backup-dialogen (Revisioner)
- Bytte ut det hemska monospace-typsnittet mot DM Sans genomgående
- Lade till fältet **Antal kopior** (1–50) så man kan styra hur många versioner som sparas
- Knapparna heter nu "Stäng" och "Spara kopia nu"
- Revisioner-knappen i menyraden öppnar nu backup-dialogen direkt

#### Navigationsraden
- **☁ Molnet**-knappen flyttad från toolbaren till menyraden, bredvid Revisioner
- När en mapp är kopplad visas "☁ Molnet ✓" (grön text)
- Ny **Fil**-dropdown längst till vänster i menyraden med följande alternativ:
  - Nytt projekt *(rensar editorn efter bekräftelse)*
  - Öppna… *(läser in .html eller .txt från disk)*
  - Öppna senaste ▸ *(ej implementerat ännu)*
  - Spara *(öppnar formatväljare)*
  - Spara som… *(öppnar formatväljare)*
  - Importera *(öppnar .html/.txt/.doc)*
  - Exportera / Kompilera… *(öppnar formatväljare)*
  - Skriv ut *(window.print)*

#### Formatväljare vid sparande
En modal visas med tre format att välja på:
- **📄 .TXT** – Ren text, inga stilar. Passar Anteckningar, TextEdit osv.
- **📝 .DOC** – Word/LibreOffice-kompatibelt (HTML med Office-namespace)
- **🌐 .HTML** – Webb-format med all formatering bevarad

#### Tangentbordsgenvägar
| Genväg | Funktion |
|--------|----------|
| Ctrl+S | Spara (formatväljare) |
| Ctrl+Shift+S | Spara som (formatväljare) |
| Ctrl+O | Öppna fil |
| Ctrl+P | Skriv ut |

---

## Nästa session – Att göra

### Film- och teatermanus (HÖGSTA PRIORITET)
WriteON ska ha förstklassigt stöd för att skriva film- och teatermanus — inte bara romaner. Det är en kärnfunktion.

**Fountain-formatet** (`.fountain`) är industristandard för filmmanuskript. Det är ren text med enkla regler:
- `INT. KONTOR - DAG` → scenhuvud
- `FRANK` (ensam på rad med versaler) → replikgivare
- `(mumlar)` → parentes/regianvisning
- Vanlig text → handling/beskrivning
- `> FADE OUT. <` → övergångar

**Inför nästa session — studera dessa tre:**

| App | Vad att titta på |
|-----|-----------------|
| **Final Draft** | Branschstandard för filmmanuskript. Hur hanterar de scenhuvud, replik, parentes, övergångar? Tangentbordsflöde — hur hoppar man snabbt mellan element? |
| **Scrivener** | Har både roman- och manusläge. Hur växlar man? Hur ser deras kompilera-funktion ut för screenplay? |
| **Living Writer** | Webbaserat, modernt. Hur integrerar de manus-element i sitt gränssnitt? Liknar WriteON mest av de tre. |

**Att implementera:**
- Eget manusläge (växla mellan roman/film/teater)
- Auto-formatering: tryck Tab för att växla element (scenhuvud → handling → replikgivare → replik → parentes)
- Export till `.fountain` och korrekt PDF-formatering (Courier 12pt, specifika marginaler)
- Eventuellt: FDX-format (Final Draft XML) för kompatibilitet

### Kompilera / Exportera – implementerat samma session

Exportdialogen uppdaterades med 6 riktiga format via CDN-bibliotek:

| Format | Bibliotek | Öppnas i |
|--------|-----------|----------|
| **PDF** | jsPDF + html2canvas | Alla PDF-läsare |
| **DOCX** | docx.js 8.x | Word, LibreOffice, Pages |
| **ePub** | JSZip (manuell ePub-struktur) | Kindle, Kobo, Apple Books |
| **TXT** | – | Anteckningar, TextEdit |
| **Markdown** | – (inbyggd konvertering) | Notion, Obsidian, GitHub |
| **HTML** | – | Alla webbläsare |

DOCX exporteras med Garamond 12pt, 1,9 radavstånd, styckeindragning.

---
