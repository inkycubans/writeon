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

*(Skriv ditt manus här imorgon)*

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
