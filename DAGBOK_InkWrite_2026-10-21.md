# InkWrite – dagbok och överlämning (21 oktober 2026)

Läs detta först i nästa chatt. Appen hette tidigare WriteON.

## Läget just nu

- **Namn:** InkWrite (stort W, som i loggan).
- **Adress:** https://www.inkwrite.se fungerar, med giltigt certifikat. Railway-adressen writeon-production-d435.up.railway.app fungerar också.
- **Kod:** GitHub `inkycubans/writeon`, gren `main`. Railway bygger automatiskt vid push.
- **Railway:** projekt `pure-learning`, tjänst `writeon`. Variabler: ANTHROPIC_API_KEY, ALLOWED_EMAILS, OPUS_EMAILS. CANONICAL_HOST är *inte* satt än.
- **Firebase:** projekt `writeon-506d0`, Frankfurt. Ett konto: arblom62@gmail.com.
- **Mail:** info@inkwrite.se finns hos Inleed (Roundcube). Ingen vidarebefordran inställd än.

## Ej uppladdat ännu

- **index.html** med rättelserna av inloggningen (Glömt lösenordet och rutan som stängdes). Commit-meddelande:
  `Inloggning: tydligare Glömt lösenordet, rutan stängs inte av misstag`

## Gjort i den här chatten

**Funktioner**
- Sök och ersätt i scen, kapitel eller hela boken (Ctrl+F). Ersätt alla tar ögonblicksbilder först.
- Kommentarer: knapparna heter Kommentera och Klar.
- Projektmål: mål i ord, tecken eller sidor, dagsmål, slutdatum, diagram med y-axel, skrivtempo ("1 500 ord per dag, fem dagar i veckan i två månader"). Måltavlan i menyn blir grön när dagens mål är nått.
- Inspektören: bredare och dragbar panel, stor Synopsis och Notering som fyller höjden, delare mellan dem, övriga fält under Detaljer.
- Dramabågen: förklarande rutor första gången.

**Fixarlistan (punkt 1–8)**
- Öppna tar emot Word (.docx). Gamla .doc ger en förklaring.
- Karaktärer ligger direkt under Manus i sidolisten.
- Idébanken omgjord: Synopsis först, Genre, Ton och berättarröst, Miljöer, Idéer. Inga & i rubriker.
- Karaktärer: en huvudperson från början, nya roller, Yrke, Relationer, förslag i rutorna. Generera fick egna regler (gav konstiga svar förut).
- Research: Källa ingår i Fakta, länkar syns med sidans bild och rubrik (via servern), symbol vid scenen.
- Assistenten heter Redaktören, med valknappar i tre grupper. Skrivrutan växer.
- Dubbletter borta: Prata med karaktär, Idébanken i högerspalten, dubbla ingångar.

**Presentationssidan**
- Byggd efter LivingWriters upplägg: rubrik, tre kort, fyra block, unika funktioner, målgrupper, pris, vanliga frågor.
- Språkknapp SV | EN uppe till höger, helt översatt till engelska.
- Bilder: rubrikbild (kust i dimma), fyra svartvita illustrationer, fem skärmbilder av appen med novellen *Sumpans bästa tomte*. Skärmbilderna visar svensk app.

**Namn och domän**
- WriteON blev InkWrite överallt. Logga i ljust och mörkt läge (`bilder/logo_ljust.png`, `bilder/logo_morkt.png`).
- inkwrite.se registrerad. inkwrite.com hann någon annan ta.
- DNS hos Inleed: CNAME `www` → `pnxpkxbl.up.railway.app`, TXT för verifiering. Inleed vidarebefordrar inkwrite.se till www.inkwrite.se.
- `server.js` har vidarebefordran till huvudadressen, vilande tills CANONICAL_HOST sätts.

**Engelska i appen**
- Del 1: menyer, sidolist, projektpanel, inspektör, formatmeny.
- Del 2: dialogrutor, felmeddelanden, statusrader.
- Del 3: Projektmål, Karaktärer, Research, Idébanken, Dramabågen.
- Språket väljs i profilmenyn och sparas i kontot (Firebase), så det följer med till andra datorer.

**Inloggning**
- Glömt lösenordet: tydlig bekräftelse, spärr i en minut mot dubbla mail (bara senaste länken fungerar), mailet på svenska.
- Inloggningsrutan stängs bara med krysset eller Esc. Tydliga felmeddelanden.

## Att göra

1. **Ladda upp** senaste index.html (se ovan).
2. **Logga in igen:** Glömt lösenordet med hela adressen arblom62@gmail.com, klicka en gång, använd senaste mailet, titta i skräpposten.
3. **Firebase → Authentication → Settings → Authorized domains:** lägg till `www.inkwrite.se`.
4. **Firebase → Authentication → Templates → Password reset:** sätt avsändarnamn till InkWrite.
5. **Firebase-reglerna:** kontrollera att `users/{uid}/settings` får skrivas, annars sparas språkvalet bara i webbläsaren.
6. **CANONICAL_HOST på Railway:** sätt till `www.inkwrite.se` (inte inkwrite.se, eftersom huvudadressen inte kan peka på Railway).
7. **Engelska del 4:** Redaktören (valknappar, instruktioner, svar på engelska) och hjälpfönstret.
8. **Engelska skärmbilder** till presentationssidan när appen är helt översatt.
9. **Äkta Redaktörsvar** till skärmbilden `redaktoren.jpg` (bilden visar ett exempelsvar).
10. **Mail:** vidarebefordran från info@inkwrite.se, och senare egen avsändare på inkwrite.se så att mail inte hamnar i skräpposten.
11. **Testare:** lägg in deras adresser i ALLOWED_EMAILS på Railway.
12. **Dramabågen:** Håkan kör igenom den och säger vad som behöver ändras.

## Arbetssätt

- Claude levererar filer. Håkan lägger dem i mappen WriteON_real_1 och laddar upp i VS Code: commit-meddelande i rutan, **Commit**, sedan **Sync Changes**.
- Varje leverans ska ha ett färdigt commit-meddelande att klistra in.
- Claude kontrollerar efteråt på GitHub och Railway.
