/* Local dev: serves the static site and /api/generate with the same code Vercel runs.
   Reads GEMINI_API_KEY from .env.local (git-ignored). Usage: node dev-server.mjs */
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import handler from './api/generate.js';

const root = new URL('.', import.meta.url).pathname;
if (existsSync(join(root, '.env.local'))) for (const line of readFileSync(join(root, '.env.local'), 'utf8').split('\n')) {
  const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
}
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json', '.png': 'image/png' };
const port = +(process.env.PORT || 4321);
http.createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (path === '/api/generate') return handler(req, res);
  const file = normalize(join(root, path === '/' ? 'index.html' : path));
  if (!file.startsWith(root) || /\/(\.env|lib\/|api\/)/.test(file)) { res.writeHead(404); return res.end(); }
  try { const body = await readFile(file); res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' }); res.end(body); }
  catch (e) { res.writeHead(404); res.end('Not found'); }
}).listen(port, '127.0.0.1', () => console.log(`http://localhost:${port}  (key ${process.env.GEMINI_API_KEY ? 'loaded' : 'missing'})`));
