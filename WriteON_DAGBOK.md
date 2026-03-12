# WriteON Projektdagbok — Senaste sessionen

## Projektöversikt
- **App:** WriteON — AI-drivet skrivverktyg för svenska författare
- **Stack:** Single HTML-fil (vanilla JS + CSS), Railway, GitHub
- **AI:** Gemini API (`gemini-2.5-flash-lite`)
- **Railway:** `writeon-production-d435.up.railway.app`
- **GitHub:** `github.com/inkycubans/writeon`
- **Dropbox App key:** `eflbkkx6hhk190b`

---

## Vad som är gjort

### Dropbox-sync
- OAuth-flöde byggt men fungerar inte stabilt pga browser-begränsningar
- Token-inmatning finns i modalen (enkel lösning tills vidare)
- JSON sparas till `/WriteON/Fallet.json` ✅
- DOCX sparas INTE än ❌ — felet ligger i uppladdningen, inte i filgenereringen

### Kända buggar att fixa
1. **DOCX till Dropbox fungerar inte** — lösning: byt `arrayBuffer` mot `Uint8Array` i `uploadToDropbox()`
2. **OAuth fungerar inte** — lösning: lägg till OAuth-callback i `server.js` på Railway
3. **Spara-knappen** — `doAutoSave()` sparar lokalt men inte till Dropbox automatiskt

---

## Nästa session — att göra i ordning

### 1. Fixa DOCX-uppladdning till Dropbox
Byt ut i `syncToDropbox()`:
```javascript
const ab = await blob.arrayBuffer();
const uint8 = new Uint8Array(ab);
await uploadToDropbox(key, folder + '/' + title + '.docx', uint8, 
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
```

### 2. Fixa OAuth via server.js
Lägg till en `/dropbox-callback`-route i `server.js` som:
- Tar emot `code` från Dropbox
- Byter mot token server-side
- Skickar tillbaka token till klienten
- Så slipper användaren mata in token manuellt

### 3. Autosync efter varje skrivning
`scheduleDropboxSync()` är kopplad till `touchScene()` — fungerar redan i teorin men token saknas ofta

---

## Longer term — Jobblista

- [ ] Dropbox DOCX-uppladdning fungerar
- [ ] OAuth fungerar stabilt (via server.js)
- [ ] Backup-funktion: spara ZIP lokalt eller till Google Drive vid avslut
- [ ] Samarbetsfunktion: realtidsskrivning (kräver WebSockets — komplext)
- [ ] Token förnyas automatiskt (refresh token)

---

## Viktiga tekniska detaljer

### Dropbox App Console
- **Redirect URI:** `https://writeon-production-d435.up.railway.app`
- **Permissions:** `files.content.write` + `files.content.read` ✅
- **Chooser domain:** `writeon-production-d435.up.railway.app` ✅
- **Allow public clients (PKCE):** Allow ✅

### localStorage-nycklar
- `writeon_gemini_key` — Gemini API-nyckel
- `writeon_dropbox_key` — Dropbox token
- `writeon_dropbox_refresh` — Dropbox refresh token
- `writeon_dropbox_folder` — vald mapp (t.ex. `/WriteON`)
- `writeon_dropbox_folder_name` — mappnamn för visning

### Viktiga funktioner
- `syncToDropbox(key)` — sparar JSON + DOCX till Dropbox
- `uploadToDropbox(key, path, body, contentType)` — generisk upload
- `scheduleDropboxSync()` — debounce 3 sek, körs från `touchScene()`
- `connectDropbox()` — OAuth PKCE-flöde (fungerar ej lokalt)
- `hardResetDropbox()` — rensar all token-data och ansluter igen

---

## Starta nästa session med
1. Ladda upp senaste `index.html`
2. Ladda upp denna `WriteON_DAGBOK.md`
3. Säg: "Fortsätt med DOCX-fix och OAuth via server.js"
