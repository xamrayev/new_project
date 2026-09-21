/*
 * Minimal static server — no dependencies, enough to run the course locally.
 * Usage: node tools/serve.mjs [port]
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';

const ROOT = resolve(new URL('..', import.meta.url).pathname);
const PORT = Number(process.argv[2] || process.env.PORT || 4173);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

async function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]);
  const candidate = resolve(join(ROOT, normalize(clean)));
  if (!candidate.startsWith(ROOT)) return null;

  try {
    const info = await stat(candidate);
    if (info.isDirectory()) return resolveFile(join(clean, 'index.html'));
    return candidate;
  } catch (error) {
    return null;
  }
}

createServer(async (request, response) => {
  const file = await resolveFile(request.url === '/' ? '/index.html' : request.url);

  if (!file) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('404 Not Found');
    return;
  }

  const body = await readFile(file);
  response.writeHead(200, {
    'Content-Type': TYPES[extname(file)] || 'application/octet-stream',
    'Cache-Control': 'no-cache'
  });
  response.end(body);
}).listen(PORT, () => {
  console.log(`Курс запущен: http://localhost:${PORT}`);
});
