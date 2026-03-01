# 🚀 SNABBSTART - Kom igång på 5 minuter!

## Steg 1: Installera Node.js (om du inte redan har det)

1. Gå till https://nodejs.org/
2. Ladda ner LTS-versionen (rekommenderas)
3. Installera programmet
4. Starta om datorn

**Testa att det fungerar:**
Öppna terminal/kommandotolk och skriv:
```bash
node --version
```
Du bör se ett versionsnummer (t.ex. v18.17.0)

## Steg 2: Skaffa API-nyckel

1. Gå till https://console.anthropic.com
2. Skapa konto (om du inte har ett)
3. Gå till "API Keys"
4. Klicka "Create Key"
5. Kopiera nyckeln (den börjar med `sk-ant-...`)
6. **VIKTIGT**: Spara nyckeln säkert - du kan inte se den igen!

## Steg 3: Starta WriteOn

### På Windows:
1. Högerklicka i projektmappen `writeon`
2. Välj "Öppna i Terminal" eller "Open in Command Prompt"
3. Kör:
```bash
npm install
npm run dev
```

### På Mac:
1. Öppna Terminal
2. Navigera till projektmappen:
```bash
cd /sökväg/till/writeon
```
3. Kör:
```bash
npm install
npm run dev
```

## Steg 4: Använd WriteOn!

1. Webbläsaren öppnas automatiskt på `http://localhost:3000`
2. Klistra in din API-nyckel
3. Klicka "Spara och börja skriva"
4. Skapa ditt första projekt!

## ✅ Klart!

Du är nu redo att skriva med AI-assistans!

---

## 🆘 Problem?

### "npm command not found"
- Du behöver installera Node.js först (se Steg 1)

### "Port 3000 is already in use"
- Stäng andra program som använder port 3000
- Eller ändra porten i `vite.config.js`

### API-nyckeln fungerar inte
- Kontrollera att du kopierade hela nyckeln
- Kontrollera att du har krediter på ditt Anthropic-konto
- Försök skapa en ny nyckel

### Appen laddas inte
- Kontrollera internetanslutning
- Försök starta om servern (Ctrl+C och sedan `npm run dev` igen)

---

## 📤 Publicera online (Gratis!)

När du är redo att dela din app:

1. Kör:
```bash
npm run build
```

2. Gå till https://netlify.com
3. Skapa gratis konto
4. Dra `dist`-mappen till Netlify
5. Klart! Du får en publik länk

---

**Behöver mer hjälp? Läs README.md för fullständig dokumentation!**
