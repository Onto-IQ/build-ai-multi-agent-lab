#!/usr/bin/env node
/**
 * Tool: geocode_place
 * Usage: node shared/scripts/tools/geocode.mjs "วัดโพธิ์"
 *        node shared/scripts/tools/geocode.mjs --q "Wat Arun" --limit 3
 */
import { fetchJson, fail, parseArgs, printJson, writeCache } from './lib/common.mjs';

const { args, positionals } = parseArgs(process.argv.slice(2));
const q = args.q || positionals[0];
const limit = Number(args.limit || 3);

if (!q) {
  fail('missing query. Example: node shared/scripts/tools/geocode.mjs "วัดโพธิ์"');
}

const url = new URL('https://nominatim.openstreetmap.org/search');
url.searchParams.set('q', q);
url.searchParams.set('format', 'json');
url.searchParams.set('limit', String(limit));
url.searchParams.set('countrycodes', 'th');

try {
  // Nominatim usage policy: keep requests sparse in classroom (cache aggressively).
  await new Promise((r) => setTimeout(r, 1100));
  const hits = await fetchJson(url.toString());
  const results = (hits || []).map((h) => ({
    name: h.name || h.display_name?.split(',')[0],
    display_name: h.display_name,
    lat: Number(h.lat),
    lon: Number(h.lon),
    class: h.class,
    type: h.type,
    osm_type: h.osm_type,
    osm_id: h.osm_id
  }));

  const cache_ref = writeCache(`geocode_${q}`, {
    source: 'nominatim',
    confidence: results.length ? 0.85 : 0.2,
    query: { q, limit },
    ok: results.length > 0,
    data: { results },
    notes: results.length ? [] : ['no results — fallback to mock coords']
  });

  printJson({
    tool: 'geocode_place',
    ok: results.length > 0,
    cache_ref,
    results
  });
  if (!results.length) process.exitCode = 2;
} catch (error) {
  const cache_ref = writeCache(`geocode_${q}_error`, {
    source: 'nominatim',
    confidence: 0,
    query: { q, limit },
    ok: false,
    data: { error: String(error.message || error) },
    notes: ['geocode failed — use mock-data locations']
  });
  printJson({ tool: 'geocode_place', ok: false, cache_ref, error: String(error.message || error) });
  process.exitCode = 1;
}
