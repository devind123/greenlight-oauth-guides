/* Vercel function: the side-panel agent's fallback for questions the built-in answers don't cover.
   The model may only use the guide data the page sends, and may only cite URLs from it. */
import { askGuide } from '../lib/generate.js';

export const config = { maxDuration: 60 };
const hits = new Map();

export default async function handler(req, res) {
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.setHeader('cache-control', 'no-store');
  const key = process.env.GEMINI_API_KEY;
  if (req.method !== 'POST') { res.statusCode = 405; return res.end('{}'); }
  if (!key) return res.end(JSON.stringify({ error: 'not configured' }));
  let body = '';
  for await (const c of req) { body += c; if (body.length > 40000) break; }
  let q = '', ctx = '';
  try { const j = JSON.parse(body); q = String(j.q || '').trim(); ctx = String(j.ctx || ''); } catch (e) { }
  if (!q || !ctx) return res.end(JSON.stringify({ error: 'missing question' }));
  const ip = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim();
  const now = Date.now(), recent = (hits.get(ip) || []).filter(t => now - t < 10 * 60e3);
  if (recent.length >= 20) return res.end(JSON.stringify({ error: 'rate limit' }));
  hits.set(ip, [...recent, now]);
  try { res.end(JSON.stringify(await askGuide(key, q, ctx))); }
  catch (e) { res.end(JSON.stringify({ error: e.status === 429 ? 'busy' : 'failed' })); }
}
