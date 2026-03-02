# WriteON – Arbetslogg

## Status: Live på Railway
URL: https://writeon-production-d435.up.railway.app

---

## Gjort hittills

### API-migration: Anthropic → Google Gemini
- Bytte ut Claude-API:t mot Gemini Flash 1.5 i alla tre chat-funktioner:
  `sendCoachMessage()`, `sendCharMessage()` (båda instanserna)
- Nytt request-format: `system_instruction + contents` (Gemini-format)
- Ny svarsparsning: `data.candidates[0].content.parts[0].text`
- API-nyckel sparas i `localStorage` under nyckeln `writeon_gemini_key`
- Placeholder i input-fältet ändrad till `AIzaSy...` för att guida användaren

### Infrastruktur & deployment
- `server.js` serverar `index.html` som standalone-app (Express)
- Railway-deploy kopplad till `main`-branchen på GitHub
- No-cache meta-taggar tillagda så webbläsaren alltid laddar senaste versionen
- `node_modules` borttagen från git-spårning (`.gitignore`)
- README uppdaterad till Gemini-instruktioner

### Buggfixar
- **AI-coach svarade inte** – Båda coach-vyerna (inbäddad panel + fullskärm)
  delade identiska HTML-ID:n (`coachInput`, `coachMessages`, `coachQuickRow`).
  `getElementById` returnerade alltid det första (dolda) elementet, vilket
  resulterade i tom input och tyst avbrott.
  **Fix:** Lade till `coachContainer()` hjälpfunktion som hittar rätt aktiv
  container beroende på vilken vy som är synlig.

---

## Hur appen fungerar

- **Enda fil:** All logik i `index.html` (~4800 rader). `server.js` är bara en
  statisk filserver.
- **Inga backend-endpoints** – All AI-kommunikation sker direkt från webbläsaren
  till Gemini API.
- **Mock-läge** – Utan API-nyckel returneras hårdkodade svar (om Frank/dimman).
  Med giltig nyckel (`AIzaSy...`) används Gemini live.
- **6 AI-coacher:** Stephen King, Anne Lamott, Hemingway, Neil Gaiman,
  García Márquez, Joyce Carol Oates
- **Idébanken** skickas automatiskt som kontext till coachens system-prompt.

---

## Kvarstående / att göra

- [ ] Testa att AI-coachen faktiskt svarar efter buggfix (väntar på Railway-deploy)
- [ ] Fundera på om mock-svaren ska vara mer generella (inte specifika för Frank/dimman)
- [ ] Eventuellt: karaktärsbyggaren (`sendCharMessage`) behöver samma tester
- [ ] Eventuellt: lägg till timeout på Gemini-anrop så att `isCoachThinking`
      aldrig kan fastna om nätverket hänger

---

## Filstruktur

```
writeon/
├── index.html        ← HELA appen (HTML + CSS + JS i en fil)
├── server.js         ← Express, serverar index.html på port 3000
├── package.json
├── ARBETSLOGG.md     ← den här filen
├── README.md
└── SNABBSTART.md
```
