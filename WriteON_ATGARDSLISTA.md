# WriteON – Åtgärds- och bristlista (utkast)

*Sammanställd 2026-06-15. Bygger på dagböckerna + jämförelse mot LivingWriter, NovelPad och Sudowrite.*

---

## DEL A — Kända buggar (fixade eller under arbete)

| # | Problem | Status |
|---|---------|--------|
| A1 | Nya projekt sparades inte (auth.currentUser null) | ✅ Fixat |
| A2 | Nya projekt syntes inte utan ut-/inloggning | ✅ Fixat |
| A3 | loadManuscript kraschade på nytt projekt | ✅ Fixat |
| A4 | Titel uppe till vänster byttes inte vid projektbyte | ✅ Fixat |
| A5 | Aktivt projekt omarkerat i listan | ✅ Fixat (mörk ruta + bock) |
| A6 | Utskrift tog med hela skärmen / blev tom | ✅ Fixat (print-CSS) |
| A7 | Ta bort projekt saknades | ✅ Tillagt (papperskorg + bekräftelse) |

---

## DEL B — Brister att åtgärda (internt, känt sedan tidigare)

| # | Brist | Prioritet |
|---|-------|-----------|
| B1 | Hårdkodad "Fallet"-data spökar (Frank-synopsis syns i nya projekt) | **Hög** |
| B2 | Outline-synopsis flödar över kolumnerna | Medel |
| B3 | "Öppna…" (välj fil från disk) ej kopplad till Firebase-projekt | Medel |
| B4 | Dubbel inloggningsvisning (uppe + nere till höger) | Låg |
| B5 | "Synkad 16:38" är hårdkodad gammal text, ej riktig status | Låg |
| B6 | Importera (Word/text) ofärdig — bör döljas tills klar | Låg |

---

## DEL C — Vad konkurrenterna har som WriteON saknar

### Från LivingWriter (den närmaste motsvarigheten — webbaserad Scrivener-ersättare)
- **Story-strukturmallar** (Hjältens resa, Tre akter, Save the Cat m.fl.) — färdiga ramverk att fylla i. WriteON har struktur-AI men inga klickbara mallar.
- **Plot Board** — drag-och-släpp-rutnät (Standard + Freeform) för story-beats. WriteON har Scenkort men inte ett renodlat plot-rutnät med subplots.
- **Story Elements / world-bible** — karaktärer OCH platser/föremål i en kunskapsbank, åtkomlig från sidopanel medan man skriver. WriteON har Karaktärer + Research men inte sammanhållen "story bible".
- **Realtidssamarbete / co-authoring** — flera skribenter samtidigt. WriteON är solo.
- **Import som läser rubriknivåer** som kapitel/scen-brytningar. WriteON-import är ofärdig.
- **iOS/Android/Desktop-appar** med synk. WriteON är webb-only (men nu molnsparat).

### Från NovelPad (stark på organisation och spårning)
- **Karaktärsspårning** — se alla scener där en viss karaktär förekommer; läs boken ur en karaktärs perspektiv. WriteON saknar detta helt.
- **Plot/subplot-spårning** — tilldela scener till handlingstrådar, se varje tråd kronologiskt. Kraftfullare än nuvarande Scenkort.
- **Insights-board** — korsreferera scen-attribut (längd, status, POV) för översikt. WriteON saknar.
- **Side-by-side-revisioner** per scen — obegränsade versioner, växla med en klick. WriteON har versionshistorik på karaktärsfält men inte per scen i manuset.
- **"Rewind to any save"** — spola tillbaka till vilken sparning som helst. WriteON har Revisioner men oklart hur granulärt.
- **Visuell tidslinje** för framsteg + adaptiva mål. WriteON har ordräknare men ingen tidslinje.
- **Färgkodning** av scener för status/trådar.

### Från Sudowrite (AI-djup — här ligger WriteONs verkliga konkurrensmöjlighet)
- **Story Bible som AI-kontext** — AI:n läser automatiskt karaktärer, world-building, synopsis, outline INNAN den genererar. WriteON skickar Idébanken men inte en full story bible.
- **Lång kontext** — läser upp till ~20 000 ord föregående text + länkade kapitel, så AI:n "kan" hela storyn. WriteON skickar troligen bara aktuell scen/markering.
- **Style Examples / röstmatchning** — klistra in egna textprover, AI:n matchar din ton. *Detta matchar exakt dina egna referenstext-arbetsflöden ("Speglingstestet", "Röst-checken").* Hög potential för WriteON.
- **Creativity Dial** — reglage för hur kreativ/strikt AI:n ska vara.
- **Guided Write** — skriv en instruktion ("misstänkten erkänner men avslöjar ett andra brott") → AI fortsätter scenen enligt beatet.
- **Describe** — markera ord → få sinnesintryck/konkreta detaljer. *Matchar din "Gestaltnings-detektiv" och "Mikroobjektiv".*
- **Margin-feedback** — redaktörsnoteringar i marginalen som refererar story bible.

---

## DEL D — Föreslagen prioritetsordning (enklast/störst nytta först)

1. **Städa bort hårdkodad Fallet-data** (B1) — nya projekt ska börja blanka. Liten fix, stor effekt på upplevd kvalitet.
2. **Story Bible-fält + skicka som AI-kontext** (Sudowrite-inspirerat) — bygg vidare på Karaktärer/Research, mata in i AI-redaktörens prompt. Spelar till WriteONs styrka.
3. **Style Examples / referenstext-matchning** — låt användaren spara egna textprover som AI:n matchar mot. Matchar Håkans egna arbetssätt direkt.
4. **Karaktärsspårning** (NovelPad) — "visa alla scener där X förekommer". Konkret, avgränsat, högt värde.
5. **Plot/subplot-trådar på scenkort** — utöka befintliga Scenkort med trådtilldelning + färgkodning.
6. **Story-strukturmallar** (LivingWriter) — klickbara ramverk (Tre akter etc.) som fyller Outline.
7. **Per-scen-revisioner med rewind** (NovelPad) — utöka Revisioner till manustext per scen.

---

## Anteckningar
- WriteONs unika vinkel: **svenskspråkig** AI-redaktör med 34 underfunktioner (struktur, dramaturgi, gestaltning, dialog, språkputs, fakta/logik). Ingen av konkurrenterna har detta djup på svenska. Det är produktens kärna — vårda och fördjupa den hellre än att kopiera allt.
- Sudowrite är närmast i AI-ambition; LivingWriter i UX-polering; NovelPad i organisation. WriteON kan låna selektivt från alla tre utan att tappa sin egen identitet.
