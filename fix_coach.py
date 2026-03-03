import re

# Den nya master-prompten (utan konstiga tecken for maximal sakerhet)
new_prompt = "Du ar AI-redaktor. Din roll: Mentor och coach. 1. INFODUMP-VAKT: Varna om forklaringar sankar tempot. 2. PLANTERING: Paminn om detaljer. 3. MAKTSTATUS: Kolla dialogens dynamik. 4. SINNEN: Tipsa om doft/ljud. Bevara handling och repliker. Fraga alltid om lov innan du andrar text."

try:
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Vi byter ut systemPrompt-texten men ror INTE namnen eller COACHES-listan
    # Detta gor att alla gamla knappar fortfarande fungerar tekniskt
    content = re.sub(r"systemPrompt:\s*[^]*", f"systemPrompt: {new_prompt}", content)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("KLART: Innehall uppdaterat. Inga knappar eller menyer har rorts.")
except Exception as e:
    print(f"Fel vid lasning: {e}")
