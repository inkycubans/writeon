# WriteON

Ett kraftfullt AI-drivet skrivverktyg för författare — med AI-coach, karaktärsbyggare, idébank och mycket mer. Drivs av Google Gemini AI.

## ✨ Funktioner

- 📝 **Skriv ditt manus** med professionellt redigeringsverktyg
- 🤖 **AI-coach** — välj mellan Stephen King, Hemingway, Gaiman m.fl.
- 💡 **Idébanken** — samla genre, synopsis, karaktärer och världsbygge
- 👤 **Karaktärsbyggaren** — bygg komplexa karaktärer med AI-hjälp
- 🔍 **Research** — samla fakta och inspiration
- 🎨 **Scenkort & Outline** — strukturera din berättelse
- 💾 **Automatisk synkning** — allt sparas i webbläsaren
- 🌙 **Mörkt/ljust tema**

## 🚀 Komma igång

### 1. Öppna appen

Gå till: `https://writeon-production-d435.up.railway.app`

### 2. Skaffa en Gemini API-nyckel (gratis)

1. Gå till [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Klicka **"Create API key"**
3. Kopiera nyckeln (börjar med `AIzaSy...`)

### 3. Klistra in nyckeln i appen

1. Öppna **AI-coach** i appen
2. Scrolla ner i vänstra panelen till **API-NYCKEL**
3. Klistra in din `AIzaSy...`-nyckel
4. Klicka **Spara**
5. Nyckeln sparas automatiskt för nästa gång

## 💰 Kostnader

- **WriteON**: Helt gratis
- **Gemini API**: Gratis upp till generösa gränser — mer än tillräckligt för skrivande

## 🔧 Teknisk information

### Köra lokalt

```bash
npm install
node server.js
```

Öppna sedan `http://localhost:3000`

### Projektstruktur

```
writeon/
├── index.html      # Hela appen (standalone)
├── server.js       # Express-server
├── package.json
└── src/            # React-källkod (äldre version)
```

### Teknologier

- Vanilla JavaScript (standalone `index.html`)
- Express.js (server)
- Google Gemini API (`gemini-1.5-flash-latest`)

## 🔐 Säkerhet

- Din API-nyckel sparas **endast lokalt** i din webbläsare (localStorage)
- Anrop går direkt från din webbläsare till Google Gemini
- Inga data lagras på servern

---

**Gjord med ❤️ för författare**
