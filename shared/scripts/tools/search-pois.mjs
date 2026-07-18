#!/usr/bin/env node
/**
 * Tool: search_pois (Overpass)
 * Usage:
 *   node shared/scripts/tools/search-pois.mjs --lat 13.74635 --lon 100.49274 --amenity restaurant --radius-km 1.2
 *   node shared/scripts/tools/search-pois.mjs --lat 13.74635 --lon 100.49274 --tourism attraction --radius-km 1.5
 */
import { fetchJson, fail, parseArgs, printJson, writeCache } from './lib/common.mjs';

const { args } = parseArgs(process.argv.slice(2));
const lat = Number(args.lat);
const lon = Number(args.lon);
const radiusKm = Number(args['radius-km'] || 1.2);
const amenity = args.amenity || '';
const tourism = args.tourism || '';
const limit = Number(args.limit || 20);

if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
  fail('require --lat and --lon');
}
if (!amenity && !tourism) {
  fail('require --amenity and/or --tourism');
}

const d = radiusKm / 111; // rough degrees
const south = lat - d;
const north = lat + d;
const west = lon - d;
const east = lon + d;

const filters = [];
if (amenity) {
  filters.push(`node["amenity"="${amenity}"](${south},${west},${north},${east});`);
  filters.push(`way["amenity"="${amenity}"](${south},${west},${north},${east});`);
}
if (tourism) {
  filters.push(`node["tourism"="${tourism}"](${south},${west},${north},${east});`);
  filters.push(`way["tourism"="${tourism}"](${south},${west},${north},${east});`);
}

const query = `[out:json][timeout:25];(${filters.join('')});out center ${limit};`;

try {
  const data = await fetchJson('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ data: query }).toString()
  });

  const pois = (data.elements || []).map((e) => {
    const tags = e.tags || {};
    const center = e.center || {};
    return {
      osm_id: e.id,
      osm_type: e.type,
      name: tags.name || null,
      amenity: tags.amenity || null,
      tourism: tags.tourism || null,
      cuisine: tags.cuisine || null,
      opening_hours: tags.opening_hours || null,
      lat: e.lat ?? center.lat ?? null,
      lon: e.lon ?? center.lon ?? null
    };
  }).filter((p) => p.name);

  const withHours = pois.filter((p) => p.opening_hours).length;
  const cache_ref = writeCache(`pois_${amenity || tourism}_${lat}_${lon}`, {
    source: 'overpass',
    confidence: pois.length ? 0.75 : 0.2,
    query: { lat, lon, radiusKm, amenity, tourism, limit },
    ok: pois.length > 0,
    data: { count: pois.length, with_opening_hours: withHours, pois },
    notes: [
      `opening_hours coverage ${withHours}/${pois.length}`,
      'prices are NOT provided by OSM — estimate from mock or mark assumptions'
    ]
  });

  printJson({
    tool: 'search_pois',
    ok: pois.length > 0,
    cache_ref,
    count: pois.length,
    with_opening_hours: withHours,
    pois
  });
  if (!pois.length) process.exitCode = 2;
} catch (error) {
  const cache_ref = writeCache(`pois_error_${amenity || tourism}`, {
    source: 'overpass',
    confidence: 0,
    query: { lat, lon, radiusKm, amenity, tourism },
    ok: false,
    data: { error: String(error.message || error), status: error.status || null },
    notes: ['Overpass failed or rate-limited — fallback to shared/mock-data']
  });
  printJson({
    tool: 'search_pois',
    ok: false,
    cache_ref,
    error: String(error.message || error),
    status: error.status || null
  });
  process.exitCode = 1;
}
