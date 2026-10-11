// WriteON — server
// 1) Serverar appen (index.html)
// 2) /api/ai: skickar AI-anrop vidare till Claude. API-nyckeln ligger som
//    Railway-variabel (ANTHROPIC_API_KEY) och når aldrig webbläsaren.
//    Bara inloggade användare (Firebase) får anropa.
const express = require('express');
const path = require('path');
const https = require('https');

const app = express();
app.use(express.json({ limit: '2mb' }));

// ── Inställningar (Railway → Variables) ─────────────────────────────────────
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';
const FIREBASE_WEB_KEY  = process.env.FIREBASE_WEB_API_KEY || 'AIzaSyC_q5vcLW1MvXxgythlXcEasw9uI-ICEPE'; // publik webbnyckel
const ALLOWED_EMAILS    = (process.env.ALLOWED_EMAILS || '').split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
const MODELS = {
  sonnet: process.env.CLAUDE_MODEL_SONNET || 'claude-sonnet-5-5',
  opus:   process.env.CLAUDE_MODEL_OPUS   || 'claude-opus-5-5',
};
const MAX_INPUT_CHARS = 400000;   // ca 100 000 ord — en hel roman får plats
const MAX_OUTPUT      = 4000;     // tak för svarets längd (tokens)
const RATE_LIMIT      = 40;       // anrop per användare …
const RATE_WINDOW_MS  = 10 * 60 * 1000;  // … per 10 minuter

// ── Hjälpfunktion: POST med JSON via Nodes inbyggda https ───────────────────
function postJSON(url, headers, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const u = new URL(url);
    const req = https.request({
      hostname: u.hostname, path: u.pathname + u.search, method: 'POST',
      headers: { 'content-type': 'application/json', 'content-length': Buffer.byteLength(data), ...headers },
      timeout: 120000,
    }, res => {
      let raw = '';
      res.on('data', c => raw += c);
      res.on('end', () => {
        let json = null;
        try { json = JSON.parse(raw); } catch (e) {}
        resolve({ status: res.statusCode, json, raw });
      });
    });
    req.on('timeout', () => req.destroy(new Error('Tidsgräns nådd')));
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// ── Inloggningskontroll: verifierar Firebase-token (cache 5 min) ────────────
const tokenCache = new Map();
async function verifyUser(req) {
  const m = (req.headers.authorization || '').match(/^Bearer (.+)$/);
  if (!m) return null;
  const token = m[1];
  const hit = tokenCache.get(token);
  if (hit && hit.until > Date.now()) return hit.email;
  const r = await postJSON(
    'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=' + FIREBASE_WEB_KEY, {}, { idToken: token });
  const email = r.status === 200 && r.json && r.json.users && r.json.users[0] && r.json.users[0].email;
  if (!email) return null;
  tokenCache.set(token, { email: email.toLowerCase(), until: Date.now() + 5 * 60 * 1000 });
  if (tokenCache.size > 500) tokenCache.delete(tokenCache.keys().next().value);
  return email.toLowerCase();
}

// ── Enkel begränsning per användare ─────────────────────────────────────────
const usage = new Map();
function rateLimited(email) {
  const now = Date.now();
  const list = (usage.get(email) || []).filter(t => now - t < RATE_WINDOW_MS);
  if (list.length >= RATE_LIMIT) { usage.set(email, list); return true; }
  list.push(now); usage.set(email, list);
  return false;
}

// ── Är AI kopplad? (för appen att visa status) ──────────────────────────────
app.get('/api/ai/status', (req, res) => {
  res.json({ configured: !!ANTHROPIC_API_KEY, models: Object.keys(MODELS) });
});

// ── AI-anrop ────────────────────────────────────────────────────────────────
// Body: { system?: string, messages: [{role:'user'|'assistant', content:string}], model?: 'sonnet'|'opus', max_tokens?: number }
app.post('/api/ai', async (req, res) => {
  try {
    if (!ANTHROPIC_API_KEY) return res.status(503).json({ error: 'AI är inte kopplad ännu (ANTHROPIC_API_KEY saknas på servern).' });

    const email = await verifyUser(req);
    if (!email) return res.status(401).json({ error: 'Du behöver vara inloggad för att använda AI.' });
    if (ALLOWED_EMAILS.length && !ALLOWED_EMAILS.includes(email)) return res.status(403).json({ error: 'Kontot har inte tillgång till AI.' });
    if (rateLimited(email)) return res.status(429).json({ error: 'För många AI-anrop på kort tid. Vänta några minuter.' });

    const { system, messages, model, max_tokens } = req.body || {};
    if (!Array.isArray(messages) || !messages.length) return res.status(400).json({ error: 'Inget att skicka.' });
    const clean = messages
      .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
      .map(m => ({ role: m.role, content: m.content }));
    if (!clean.length || clean[0].role !== 'user') return res.status(400).json({ error: 'Första meddelandet måste komma från användaren.' });
    const size = clean.reduce((s, m) => s + m.content.length, 0) + (typeof system === 'string' ? system.length : 0);
    if (size > MAX_INPUT_CHARS) return res.status(413).json({ error: 'Texten är för lång för ett AI-anrop.' });

    const body = {
      model: MODELS[model] || MODELS.sonnet,
      max_tokens: Math.max(100, Math.min(Number(max_tokens) || 2000, MAX_OUTPUT)),
      messages: clean,
    };
    if (typeof system === 'string' && system.trim()) body.system = system;

    const r = await postJSON('https://api.anthropic.com/v1/messages',
      { 'x-api-key': ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' }, body);

    if (r.status !== 200 || !r.json) {
      const msg = (r.json && r.json.error && r.json.error.message) || ('Fel från Claude (' + r.status + ')');
      console.error('[AI] Fel', r.status, msg);
      return res.status(502).json({ error: msg });
    }
    const text = (r.json.content || []).filter(b => b.type === 'text').map(b => b.text).join('\n').trim();
    console.log('[AI]', email, body.model, 'in', r.json.usage && r.json.usage.input_tokens, 'ut', r.json.usage && r.json.usage.output_tokens);
    res.json({ text, model: r.json.model, usage: r.json.usage || null, stop_reason: r.json.stop_reason });
  } catch (e) {
    console.error('[AI] Serverfel', e);
    res.status(500).json({ error: 'Serverfel: ' + e.message });
  }
});

// ── Appen ───────────────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname)));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`WriteON körs på port ${PORT} · AI ${ANTHROPIC_API_KEY ? 'kopplad' : 'ej kopplad'}`));
