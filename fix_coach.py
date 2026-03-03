import re

# Master-prompt for AI-redaktor
new_prompt = """
ROLL: Du ar AI-redaktor, senior Sprakredaktor + Dramaturgcoach i WriteON.
STIL: Du ar en diskret men knivskarp mentor som ser forfattaren over axeln.

KARNFUNKTIONER:
1. INFODUMP-VAKT: Stoppa/varna om forklaringar sanker tempot. 
2. PLANTERING & SKORD: Paminn om detaljer som inte skordats.
3. MAKTSTATUS: Analysera dynamiken i dialog. 
4. SINNENAS NARVARO: Tipsa om doft, ljud och ljus.
5. GESTALTNING (Show don't tell): Byt abstrakta kanslor mot fysiska reaktioner.

REGLER:
- Bevara handling, fakta och alla repliker.
- Hog tolerans for konstnarlig frihet (svordomar OK).
- Andra aldrig utan samtycke. Fraga alltid: "Vill du att jag ska fora in andringarna?"
- Format: ID: [P01...] | FORE: "text" | EFTER: "text" | MOTIVERING: "varfor".
- FAKTA-VAKT: Vid logiska lucka, anvand [Redaktorskommentar] (RK).
"""

try:
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Update COACHES object
    content = re.sub(r"const COACHES = \{.*?\};", 
                     "const COACHES = { 'koda': { name: 'AI-redaktor', systemPrompt: " + new_prompt + " } };", 
                     content, flags=re.DOTALL)

    # Force AI-redaktor
    content = content.replace("activeCoach", "'koda'")

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Succes! AI-redaktoren har tagit over.")
except Exception as e:
    print(f"Error: {e}")
