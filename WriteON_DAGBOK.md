# WriteON Projektdagbok — Senaste sessionen

## Projektöversikt
- **App:** WriteON — AI-drivet skrivverktyg för svenska författare
- **Stack:** Single HTML-fil (vanilla JS + CSS), Railway, GitHub
- **AI:** Gemini API (`gemini-2.5-flash-lite`)
- **Railway:** `writeon-production-d435.up.railway.app`
- **GitHub:** `github.com/inkycubans/writeon`
- **Dropbox App key:** `eflbkkx6hhk190b`

---

## Gjort i senaste sessionerna

### AI-markerings-popup ✅
- Popup dyker upp automatiskt när man markerar text i manuset (minst 2 tecken)
- Mörk teal-bakgrund, symboler med tooltip
- **Knappar:** ✦ Skriv om · ◎ Analys · ✂ Putsa · ≈ Synonym · ✓ Rättstavning · 💬 Dialog
- Dialog-knappen visas bara om texten innehåller citattecken eller tankstreck
- Resultatet visas i Inspektörpanelen till höger
- **Ersätt i texten** / **Stäng** — ersätter direkt i manuset
- Rättstavning: Ersätt-knapp visas bara vid enstaka ord (`fel → rätt`)
- Analys och Synonym visar bara lista, ingen Ersätt-knapp

### AI-redaktör-boxen under manus borttagen ✅
- Idébanken och Karaktärer kvar under manus
- AI-funktionalitet lever nu helt i popup + Inspektören

### Verktygsfält ✅
- **B / I / U** fungerar med `execCommand`
- **Font-storlek** påverkar bara markerad text (inte hela scenen)
- **Typsnitt:** Lora, Georgia, Times New Roman, Verdana, Playfair Display, Garamond
- **Styckeformat:** Normaltext (12pt), Rubrik 1 (20pt fet), Rubrik 2 (16pt fet), Citat (12pt kursiv)
- Penna och X-knapp borttagna
- Länk och Bild borttagna
- A-knapp (versalt) borttagen — Shift fungerar redan

### Stavningskontroll ✅
- Webbläsarens inbyggda stavningskontroll aktiverad (rött vågigt streck)
- CSS tillagd för att säkerställa att strecket visas

---

## Kända buggar / Pending

### Dropbox (oförändrat från föregående session)
- DOCX-uppladdning fungerar inte — fix: byt `arrayBuffer` mot `Uint8Array`
- OAuth fungerar inte stabilt — fix: lägg till `/dropbox-callback` i `server.js`
- Autosync fungerar i teorin men token saknas ofta

---

## Nästa session — att göra

### Prioritet 1: Dropbox DOCX-fix
```javascript
const ab = await blob.arrayBuffer();
const uint8 = new Uint8Array(ab);
await uploadToDropbox(key, folder + '/' + title + '.docx', uint8,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
```

### Prioritet 2: OAuth via server.js
Lägg till `/dropbox-callback`-route i `server.js` som byter `code` mot token server-side.

### Prioritet 3: Eventuella finputsar på popup
- Popup-placering på mobil/liten skärm
- Aktiv state på B/I/U-knapparna (markeras när texten redan är fet/kursiv)

---

## Viktiga tekniska detaljer

### localStorage-nycklar
- `writeon_gemini_key` — Gemini API-nyckel (används av popup + karaktärsfunktioner)
- `writeon_dropbox_key` — Dropbox token
- `writeon_dropbox_refresh` — Dropbox refresh token
- `writeon_dropbox_folder` — vald mapp (t.ex. `/WriteON`)

### Dropbox App Console
- **Redirect URI:** `https://writeon-production-d435.up.railway.app`
- **Permissions:** `files.content.write` + `files.content.read` ✅
- **Allow public clients (PKCE):** Allow ✅

### Viktiga funktioner
- `runAiOnSelection(typ)` — kör AI på markerad text (popup)
- `aiReplaceText()` — ersätter markerad text med AI-resultat
- `closeInspAi()` — stänger AI-sektionen i inspektören
- `syncToDropbox(key)` — sparar JSON + DOCX till Dropbox
- `hardResetDropbox()` — rensar all token-data

---

## Starta nästa session med
1. Ladda upp senaste `index.html`
2. Ladda upp denna `WriteON_DAGBOK.md`
3. Säg: "Fortsätt med Dropbox DOCX-fix och OAuth via server.js"
