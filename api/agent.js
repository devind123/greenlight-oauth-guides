/* Vercel function: the side-panel agent's brain. The model picks an action; the page runs it. */
import { routeAgent } from '../lib/generate.js';

export const config = { maxDuration: 30 };
const hits = new Map();

export default async function handler(req, res) {
  res.setHeader('content-type', 'application/json; charset=utf-8');
  res.setHeader('cache-control', 'no-store');
  if (req.method !== 'POST') { res.statusCode = 405; return res.end('{}'); }
  const key = process.env.GEMINI_API_KEY;
  if (!key) return res.end(JSON.stringify({ error: 'not configured' }));
  let body = '';
  for await (const c of req) { body += c; if (body.length > 80000) break; }
  let m = '', h = [], ctx = null;
  try { const j = JSON.parse(body); m = String(j.message || '').trim(); h = Array.isArray(j.history) ? j.history : []; ctx = j.context || null; } catch (e) { }
  if (!m || !ctx) return res.end(JSON.stringify({ error: 'missing message' }));
  const ip = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim();
  const now = Date.now(), recent = (hits.get(ip) || []).filter(t => now - t < 10 * 60e3);
  if (recent.length >= 40) return res.end(JSON.stringify({ error: 'rate limit' }));
  hits.set(ip, [...recent, now]);
  try { res.end(JSON.stringify(await routeAgent(key, m, h, ctx))); }
  catch (e) { res.end(JSON.stringify({ error: e.status === 429 ? 'busy' : 'failed' })); }
}
