# WriteON — Projektdagbok

## Senast uppdaterad
v18d — Pågående session

---

## Vad är WriteON?
AI-drivet skrivverktyg för svenska författare. Byggd som en enda HTML-fil (vanilla JS + CSS), hostad på Railway, kod på GitHub (github.com/inkycubans/writeon). Använder Gemini API (`gemini-2.5-flash-lite`).

**Målgrupp:** Svenska författare  
**Pris:** 79 kr/mån eller 790 kr/år, Founders: 49 kr/mån  
**Logga:** "Write" (vit/svart), "O" (orange #fcb136), "N" (teal #4a8981)

---

## Senaste fil
`index_writeon_v18d.html` — detta är den fil som ska pushas till GitHub/Railway.

---

## Arkitektur — SINGLE SOURCE OF TRUTH

All data lever i `projectData`. Alla vyer renderas dynamiskt från den.

```javascript
const projectData = {
  title: 'Fallet',
  wordGoal: 100000,
  chapters: [
    {
      id: 'chap-1', title: 'Kapitel 1',
      scenes: [
        { id: 'chap-1-scene-1', title: 'Scen 1', status: 'draft', drama: 'klimax', pov: 'Frank',
          synopsis: 'Frank hittar spåren vid hamnen...',
          notes: '', text: '<p>Frank stod vid kajen...</p>',
          words: 65,
          dateCreated: '2026-03-08T08:00', dateChanged: '2026-03-08T08:00' },
      ]
    },
    // Kapitel 2 (2 scener), Kapitel 3 (1 scen)
  ]
};
let activeScene = projectData.chapters[0].scenes[0];
```

---

## Vyer i appen

**Huvudmeny:** Manus | Scenkort | Outline | Brainstorm | AI-redaktör | Idébanken | Karaktärer | Research | 🍅 | Synopsis

**Vänster sidebar (binder):** Kapitel + scener, klickbara. Knappar: Nytt kapitel, + Ny scen, 🗑

**Inspektör (höger):** Status, Stämning, Synopsis, Notering per scen

---

## Manus — Scrivener-modellen (v18+)

Bytte från separata A4-sidor till Scrivener-modellen i v18:
- Klick på **kapitel** → hela kapitlet som ett långt dokument, `* * *` mellan scener
- Klick på **scen** → laddar kapitlet och scrollar till den scenen
- Aktiv scen markeras med turkos vänsterbård
- Vitt kort (`680px`, `min-height: 80vh`) på beige bakgrund
- Ingen sidbrytningslinje (bestämdes bort — ordräknare räcker)

---

## Outline

- Tabellvy med kolumner: TITEL, STATUS, STÄMNING, PERSPEKTIV, DATUM, ORD, ÄNDRAT
- Synopsis-rad under varje scen (enradig, klipps med `...`, expanderar vid klick)
- `table-layout: fixed` för att hålla kolumner på plats
- **KVARSTÅENDE BUGG:** Synopsis-text flödar fortfarande ut över kolumnerna — ska fixas nästa session
- Klick på scenrad → aktiverar scen i Inspektören UTAN att byta vy
- Dubbelklick → navigerar till Manus

---

## Synkstatus (v18d)

| Från | Till | Status |
|------|------|--------|
| Inspektör → Outline | Status, Stämning, Synopsis | ✓ Fungerar |
| Inspektör → Scenkort | Status, Stämning, Synopsis | ✓ Fungerar |
| Outline → Inspektör | Status, Stämning, Synopsis (live) | ✓ Fungerar |
| Manus skrivyta → Binder | Ordräknare | ✓ Fungerar |

---

## Below-manus panelen

AI-redaktör, Idébanken och Karaktärer visas under skrivytan som kollapsade sektioner. En kollapsrad `▼ AI-redaktör · Idébanken · Karaktärer` döljer hela panelen för mer skrivyta.

---

## Kärnfunktioner (JS)

```
allScenes()               — flat array av alla scener
chapterForScene(sceneId)  — hittar kapitel för en scen
touchScene(scene)         — uppdaterar dateChanged
getWritingArea()          — returnerar writingArea-elementet för activeScene

buildChapterDoc(chap)     — bygger hela kapitlet som ett div med * * * mellan scener
loadChapter(chap)         — renderar kapitlet i pageContainer
scrollToScene(sceneId)    — scrollar till rätt scen-block + markerar aktivt

selectSceneById(sceneId)  — byter aktiv scen, laddar kapitel om nödvändigt
selectChapterById(chapId) — laddar kapitlet, sätter activeScene till första scen

renderBinder()            — bygger kapitel/scen-lista i sidebar
renderOutline()           — bygger outline-tabell
renderCorkGrid()          — bygger scenkort
renderTimeline()          — bygger tidslinje

loadInspector(scene)      — laddar inspector-fält från scene-objekt
saveFromInspector()       — skriver inspector-fält → activeScene
syncViewsForScene(scene)  — uppdaterar binder, outline, scenkort från scene-data

addSceneToChapter(chapId)   — ny scen
addChapterToProject()       — nytt kapitel
toggleBelowManus()          — kollapsar/visar AI-panelen under manus
```

---

## CSS-layout

```
body (flex-col)
  app-shell (flex-row)
    writing-wrap (flex-row)
      sidebar (fast bredd, scrollbar)
      canvas-coach-wrap (flex:1, flex-col)
        canvas-wrap (flex:1, overflow-y:auto)  ← scrollar manuset
          pageContainer
            chapter-doc (680px, vitt kort, box-shadow)
              chapter-doc-title (kapitelrubrik, contentEditable)
              scene-block (per scen, data-scene-id)
                scene-writing-area (contentEditable, Lora-font)
              scene-divider (* * *)
        below-manus (max-height:38vh, kollapsbar)
      notes-panel (Inspektör, höger)
```

---

## Tekniska noter

- **API:** `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${key}`
- **API-nyckel:** localStorage `writeon_ai_key`
- **Encoding:** UTF-8 — använd ALLTID Python för filmanipulation, aldrig PowerShell direkt
- **Git:** `git pull --no-edit` + `git push` för att undvika merge-konflikter
- **Script-block:** 4 separata `<script>`-block i body (huvud, AI-redaktör IIFE, rename-handlers IIFE, drag-resize IIFE)

---

## NÄSTA STEG (prioritetsordning)

1. **FIXA:** Outline synopsis-text flödar ut över kolumnerna (kvarstående bugg)
2. **BYGG:** Dropbox autosync
   - Debounce 2–3 sekunder efter senaste tangenttryckning
   - Sparar `Fallet.json` till Dropbox automatiskt
   - "Återställ från Dropbox"-funktion
   - Kräver: Håkan skapar app på dropbox.com/developers och hämtar Access Token
   - Permissions: `files.content.write` + `files.content.read`

---

## Arbetsflöde

1. Ladda upp senaste HTML-filen + denna dagbok i varje ny session
2. Torrsimma i Claude → ladda ner HTML → pusha via VS Code till GitHub → Railway auto-deployer
3. Starta alltid med: **"Här är dagboken och senaste filen. [beskriv vad som ska göras]"**
