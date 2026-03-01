# WriteOn

Ett kraftfullt, AI-drivet skrivverktyg för författare som vill skriva romaner, noveller, filmmanus och teatermanus med hjälp av Claude AI.

## ✨ Funktioner

- 📝 **Skriv olika typer av verk**: Romaner, noveller, filmmanus, teatermanus
- 🤖 **AI-assistans**: Få hjälp av Claude att fortsätta skriva, förbättra text och dialog
- 💾 **Automatisk sparning**: Alla dina projekt sparas lokalt i webbläsaren
- 📥 **Export**: Exportera dina projekt till textfiler
- 🎨 **Professionellt gränssnitt**: Inspirerat av Final Draft och Scrivener
- 🔒 **Säker**: Din API-nyckel och projekt sparas endast lokalt på din dator

## 🚀 Snabbstart

### Förutsättningar

Du behöver:
- Node.js installerat (version 16 eller senare) - [Ladda ner här](https://nodejs.org/)
- En Anthropic API-nyckel - [Skapa konto här](https://console.anthropic.com)

### Installation

1. **Öppna terminalen/kommandotolken** i projektmappen

2. **Installera beroenden:**
   ```bash
   npm install
   ```

3. **Starta utvecklingsservern:**
   ```bash
   npm run dev
   ```

4. **Öppna appen i webbläsaren:**
   - Appen öppnas automatiskt på `http://localhost:3000`
   - Om inte, öppna länken manuellt

5. **Ange din API-nyckel:**
   - Första gången du öppnar appen ombeds du ange din Anthropic API-nyckel
   - Nyckeln sparas säkert i din webbläsares lokala lagring

## 📖 Hur man använder

### Skapa ett projekt
1. Klicka på "Nytt projekt"
2. Välj typ (Roman, Novell, Filmmanus eller Teatermanus)
3. Ange en titel
4. Börja skriva!

### AI-funktioner

**Fortsätt skriva** - Claude fortsätter där du slutade
- Skriv lite text
- Klicka på "Fortsätt skriva"
- Claude lägger till 150-200 ord som fortsätter din historia

**Förbättra text** - Gör din text mer levande
- Markera text (eller låt hela dokumentet bearbetas)
- Klicka på "Förbättra text"
- Claude förbättrar formuleringar och bildspråk

**Förbättra dialog** - Gör dialogen mer naturlig
- Markera text med dialog
- Klicka på "Förbättra dialog"
- Claude gör dialogen mer dynamisk

**Analysera struktur** - Få feedback på uppbyggnad
- Klicka på "Analysera struktur"
- Claude analyserar och ger konkreta förbättringsförslag

### Spara och exportera

- **Automatisk sparning**: Allt du skriver sparas automatiskt
- **Export**: Klicka på nedladdningsikonen för att exportera till .txt-fil
- **Radera**: Klicka på papperskorgsikonen för att radera ett projekt

## 🌐 Publicera på Netlify (Gratis!)

### Steg 1: Bygg projektet
```bash
npm run build
```
Detta skapar en `dist`-mapp med alla filer redo för publicering.

### Steg 2: Ladda upp till Netlify

**Alternativ A - Dra och släpp (Enklast):**
1. Gå till [netlify.com](https://netlify.com)
2. Skapa ett gratis konto
3. Klicka på "Add new site" → "Deploy manually"
4. Dra `dist`-mappen till upload-området
5. Klart! Du får en länk som `din-app.netlify.app`

**Alternativ B - GitHub (Rekommenderas för uppdateringar):**
1. Skapa ett GitHub-konto om du inte har ett
2. Skapa ett nytt repository
3. Ladda upp ditt projekt till GitHub
4. Gå till Netlify och välj "Import from Git"
5. Välj ditt repository
6. Build command: `npm run build`
7. Publish directory: `dist`
8. Klicka "Deploy"

Nu uppdateras sidan automatiskt varje gång du pushar ändringar till GitHub!

## 💰 Kostnader

- **Verktyget**: Helt gratis!
- **Hosting (Netlify)**: Gratis för personliga projekt
- **Anthropic API**: 
  - ~$3 per miljon input tokens
  - ~$15 per miljon output tokens
  - Uppskattat: $5-20/månad för normal användning

## 🔧 Teknisk information

### Projektstruktur
```
writeon/
├── src/
│   ├── App.jsx          # Huvudkomponent
│   ├── main.jsx         # Entry point
│   └── index.css        # Stilar
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite konfiguration
└── README.md           # Denna fil
```

### Använda teknologier
- **React** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Ikoner
- **Anthropic Claude API** - AI-funktioner

### Datalagringsformat

All data sparas i webbläsarens localStorage:
- `apiKey` - Din Anthropic API-nyckel
- `projects` - Array med alla dina projekt (JSON)

Varje projekt innehåller:
```javascript
{
  id: "timestamp",
  type: "novel" | "short-story" | "screenplay" | "stage-play",
  title: "Projektets titel",
  content: "Textinnehållet",
  created: "ISO timestamp",
  modified: "ISO timestamp"
}
```

## 🛠️ Utveckling

### Köra i utvecklingsläge
```bash
npm run dev
```

### Bygga för produktion
```bash
npm run build
```

### Förhandsgranska produktionsbygge
```bash
npm run preview
```

## ❓ Felsökning

### "API-anrop misslyckades"
- Kontrollera att din API-nyckel är korrekt
- Kontrollera att du har krediter kvar på ditt Anthropic-konto
- Kontrollera din internetanslutning

### "npm command not found"
- Du behöver installera Node.js först
- Ladda ner från [nodejs.org](https://nodejs.org)

### Projekten sparas inte
- Kontrollera att webbläsaren tillåter localStorage
- Testa i ett annat webbläsarfönster (inte inkognito)

## 🔐 Säkerhet och integritet

- Din API-nyckel sparas ENDAST lokalt i din webbläsare
- Inga data skickas någon annanstans än direkt till Anthropic API
- Dina projekt lagras lokalt på din dator
- Om du raderar webbläsardata försvinner projekten (gör export först!)

## 📝 Framtida förbättringar

Idéer för vidareutveckling:
- [ ] Export till DOCX och PDF
- [ ] Karaktärsdatabas
- [ ] Plottverktyg och strukturmallar
- [ ] Versionskontroll
- [ ] Mörkt tema
- [ ] Fler AI-funktioner (brainstorming, karaktärsanalys etc.)
- [ ] Cloud-synkning

## 🤝 Bidra

Detta är ett open source-projekt. Du är välkommen att:
- Rapportera buggar
- Föreslå nya funktioner
- Förbättra koden
- Dela med dig av dina erfarenheter

## 📄 Licens

MIT License - Du får använda, modifiera och distribuera detta projekt fritt.

## 🙏 Tack till

- Anthropic för Claude AI
- React-teamet
- Vite-communityn
- Tailwind CSS
- Alla open source-bidragsgivare

---

**Gjord med ❤️ för författare som vill ha AI-superkrafter**
