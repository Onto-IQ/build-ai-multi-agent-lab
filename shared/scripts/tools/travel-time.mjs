#!/usr/bin/env node
/**
 * Tool: get_travel_time (OSRM driving)
 * Usage:
 *   node shared/scripts/tools/travel-time.mjs --from-lon 100.49274 --from-lat 13.74635 --to-lon 100.53707 --to-lat 13.72920
 *   node shared/scripts/tools/travel-time.mjs --from 100.49274,13.74635 --to 100.53707,13.72920
 */
import { fetchJson, fail, parseArgs, printJson, writeCache } from './lib/common.mjs';

const { args } = parseArgs(process.argv.slice(2));

function parsePoint(prefix) {
  if (args[prefix]) {
    const [lon, lat] = String(args[prefix]).split(',').map(Number);
    return { lon, lat };
  }
  const lon = Number(args[`${prefix}-lon`]);
  const lat = Number(args[`${prefix}-lat`]);
  return { lon, lat };
}

const from = parsePoint('from');
const to = parsePoint('to');

if (![from.lon, from.lat, to.lon, to.lat].every(Number.isFinite)) {
  fail('require --from lon,lat and --to lon,lat (OSRM order is lon,lat)');
}

const path = `${from.lon},${from.lat};${to.lon},${to.lat}`;
const url = `https://router.project-osrm.org/route/v1/driving/${path}?overview=false`;

try {
  const data = await fetchJson(url);
  if (data.code !== 'Ok' || !data.routes?.[0]) {
    throw new Error(`OSRM code=${data.code || 'unknown'}`);
  }
  const route = data.routes[0];
  const duration_min = Math.round((route.duration / 60) * 10) / 10;
  const distance_km = Math.round((route.distance / 1000) * 10) / 10;

  const cache_ref = writeCache(`travel_${from.lat}_${from.lon}_${to.lat}_${to.lon}`, {
    source: 'osrm',
    confidence: 0.9,
    query: { from, to, profile: 'driving' },
    ok: true,
    data: { duration_min, distance_km, code: data.code },
    notes: ['driving profile; traffic not included']
  });

  printJson({
    tool: 'get_travel_time',
    ok: true,
    cache_ref,
    from,
    to,
    duration_min,
    distance_km,
    profile: 'driving'
  });
} catch (error) {
  const cache_ref = writeCache('travel_error', {
    source: 'osrm',
    confidence: 0,
    query: { from, to },
    ok: false,
    data: { error: String(error.message || error) },
    notes: ['OSRM failed — fallback to shared/mock-data/travel-times.json']
  });
  printJson({
    tool: 'get_travel_time',
    ok: false,
    cache_ref,
    error: String(error.message || error)
  });
  process.exitCode = 1;
}
