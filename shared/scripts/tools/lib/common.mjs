import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(__dirname, '..', '..', '..', '..');
export const cacheDir = path.join(repoRoot, 'shared', 'mock-data', 'external-cache');
export const UA = 'TripCoordinatorLabTools/1.0 (course; +https://localhost/lab)';

export function ensureCacheDir() {
  fs.mkdirSync(cacheDir, { recursive: true });
}

export function parseArgs(argv) {
  const args = {};
  const positionals = [];
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token.startsWith('--')) {
      const key = token.slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith('--')) {
        args[key] = true;
      } else {
        args[key] = next;
        i += 1;
      }
    } else {
      positionals.push(token);
    }
  }
  return { args, positionals };
}

export async function fetchJson(url, { method = 'GET', body, headers = {}, timeoutMs = 35000 } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method,
      body,
      headers: { 'User-Agent': UA, Accept: 'application/json', ...headers },
      signal: controller.signal
    });
    const text = await response.text();
    let data;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = { raw: text };
    }
    if (!response.ok) {
      const err = new Error(`HTTP ${response.status} for ${url}`);
      err.status = response.status;
      err.body = data;
      throw err;
    }
    return data;
  } finally {
    clearTimeout(timer);
  }
}

export function writeCache(name, payload) {
  ensureCacheDir();
  // Hash keeps Windows/Unicode filenames stable; human query stays inside JSON.
  const digest = crypto
    .createHash('sha1')
    .update(String(name))
    .update(JSON.stringify(payload.query ?? null))
    .digest('hex')
    .slice(0, 12);
  const prefix = String(name)
    .replace(/[^a-zA-Z0-9_-]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 40) || 'cache';
  const safe = `${prefix}_${digest}`;
  const filePath = path.join(cacheDir, `${safe}.json`);
  const envelope = {
    source: payload.source,
    retrieved_at: new Date().toISOString(),
    confidence: payload.confidence ?? 0.7,
    query: payload.query ?? null,
    ok: payload.ok !== false,
    data: payload.data,
    notes: payload.notes ?? []
  };
  fs.writeFileSync(filePath, `${JSON.stringify(envelope, null, 2)}\n`, 'utf8');
  return path.relative(repoRoot, filePath).replaceAll('\\', '/');
}

export function printJson(value) {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
}

export function fail(message, code = 1) {
  console.error(`ERROR: ${message}`);
  process.exit(code);
}
