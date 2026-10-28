/* Vercel function: streams progress as NDJSON, then the finished guide.
   The Gemini key comes from the GEMINI_API_KEY environment variable and never reaches the browser. */
import { generateGuide } from '../lib/generate.js';

export const config = { maxDuration: 60 };
const hits = new Map(); /* best-effort per-IP limit on a warm instance */
const cache = new Map();

export default async function handler(req, res) {
  const url = new URL(req.url, 'http://x');
  const app = (url.searchParams.get('app') || '').trim().slice(0, 80);
  res.setHeader('content-type', 'application/x-ndjson; charset=utf-8');
  res.setHeader('cache-control', 'no-store');
  const send = o => res.write(JSON.stringify(o) + '\n');
  const key = process.env.GEMINI_API_KEY;
  if (!key) { send({ error: 'Live generation is not configured on this deployment (no GEMINI_API_KEY).' }); return res.end(); }
  if (!app) { send({ error: 'Type an app name or website.' }); return res.end(); }
  const ip = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '').split(',')[0].trim();
  const now = Date.now(), recent = (hits.get(ip) || []).filter(t => now - t < 10 * 60e3);
  if (recent.length >= 6) { send({ error: 'Rate limit: 6 guides per 10 minutes. Try again shortly.' }); return res.end(); }
  hits.set(ip, [...recent, now]);
  const ck = app.toLowerCase();
  if (cache.has(ck) && now - cache.get(ck).at < 6 * 3600e3) { send({ step: 'cache', label: 'Generated earlier today', state: 'done' }); send({ guide: cache.get(ck).guide }); return res.end(); }
  try {
    /* watchdog: always answer before the platform's time limit */
    const guide = await Promise.race([generateGuide(app, key, send), new Promise((_, rej) => setTimeout(() => rej(Object.assign(new Error('This one took too long. Try again, or try the app\'s website instead of its name.'), { status: 408 })), 55000))]);
    cache.set(ck, { at: Date.now(), guide });
    send({ guide });
  } catch (e) {
    send({ error: e.status === 429 ? 'The free AI model is busy right now. Try again in a minute.' : (e.message || 'Generation failed'), partial: e.partial || null });
  }
  res.end();
}
