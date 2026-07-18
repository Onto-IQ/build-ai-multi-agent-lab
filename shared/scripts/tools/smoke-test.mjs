#!/usr/bin/env node
/**
 * End-to-end smoke test: tools → cache → sample dining-options contract.
 * Run from repo root:
 *   node shared/scripts/tools/smoke-test.mjs
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { repoRoot, printJson } from './lib/common.mjs';

function runTool(script, argv) {
  const result = spawnSync(process.execPath, [script, ...argv], {
    cwd: repoRoot,
    encoding: 'utf8'
  });
  const stdout = result.stdout || '';
  let json = null;
  try {
    json = JSON.parse(stdout);
  } catch {
    json = null;
  }
  return {
    status: result.status,
    stdout,
    stderr: result.stderr || '',
    json
  };
}

const toolsDir = path.join(repoRoot, 'shared', 'scripts', 'tools');
const report = { ok: true, steps: [], sample_contract: null };

function step(name, fn) {
  process.stderr.write(`→ ${name}\n`);
  const out = fn();
  report.steps.push({ name, ...out });
  if (!out.pass) report.ok = false;
  return out;
}

const geocode = step('geocode Wat Pho', () => {
  const r = runTool(path.join(toolsDir, 'geocode.mjs'), ['วัดโพธิ์']);
  const pass = r.status === 0 && r.json?.ok && r.json.results?.length > 0;
  return {
    pass,
    status: r.status,
    cache_ref: r.json?.cache_ref,
    sample: r.json?.results?.[0] || null,
    error: pass ? null : r.stderr || r.stdout
  };
});

const watPho = geocode.sample || { lat: 13.74635, lon: 100.49274 };

await new Promise((r) => setTimeout(r, 500));

const pois = step('search restaurants near Wat Pho', () => {
  const r = runTool(path.join(toolsDir, 'search-pois.mjs'), [
    '--lat', String(watPho.lat),
    '--lon', String(watPho.lon),
    '--amenity', 'restaurant',
    '--radius-km', '1.2',
    '--limit', '15'
  ]);
  const pass = r.status === 0 && r.json?.ok && r.json.count >= 2;
  return {
    pass,
    status: r.status,
    cache_ref: r.json?.cache_ref,
    count: r.json?.count ?? 0,
    with_opening_hours: r.json?.with_opening_hours ?? 0,
    sample_names: (r.json?.pois || []).slice(0, 5).map((p) => p.name),
    error: pass ? null : r.stderr || r.json?.error || 'insufficient pois'
  };
});

const travel = step('travel Wat Pho → Silom', () => {
  const r = runTool(path.join(toolsDir, 'travel-time.mjs'), [
    '--from', `${watPho.lon},${watPho.lat}`,
    '--to', '100.53707,13.72920'
  ]);
  const pass = r.status === 0 && r.json?.ok && typeof r.json.duration_min === 'number';
  return {
    pass,
    status: r.status,
    cache_ref: r.json?.cache_ref,
    duration_min: r.json?.duration_min,
    distance_km: r.json?.distance_km,
    error: pass ? null : r.stderr || r.json?.error
  };
});

const weather = step('weather Bangkok', () => {
  const r = runTool(path.join(toolsDir, 'weather.mjs'), [
    '--lat', '13.7563',
    '--lon', '100.5018'
  ]);
  const pass = r.status === 0 && r.json?.ok && r.json.daily?.length > 0;
  return {
    pass,
    status: r.status,
    cache_ref: r.json?.cache_ref,
    sample_day: r.json?.daily?.[0] || null,
    error: pass ? null : r.stderr || r.json?.error
  };
});

// Build hybrid sample contract from live POIs + mock cost assumptions
const livePois = (() => {
  const cachePath = pois.cache_ref ? path.join(repoRoot, pois.cache_ref) : null;
  if (!cachePath || !fs.existsSync(cachePath)) return [];
  const envelope = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
  return envelope.data?.pois || [];
})();

const picked = livePois.filter((p) => p.name).slice(0, 2);
if (picked.length >= 2) {
  const now = new Date().toISOString();
  const contract = {
    schema_version: '1.0',
    trip_id: 'trip-001',
    generated_by: 'smoke-test/dining-tool-path',
    generated_at: now,
    source_mode: 'hybrid',
    candidates: picked.map((p, idx) => ({
      id: `dining-live-${idx + 1}`,
      name: p.name,
      category: p.amenity || 'restaurant',
      location: {
        name: 'near Wat Pho',
        lat: p.lat,
        lng: p.lon
      },
      operating_hours: {
        open: p.opening_hours ? 'see_opening_hours_raw' : 'unknown',
        close: p.opening_hours ? 'see_opening_hours_raw' : 'unknown',
        closed_days: [],
        raw: p.opening_hours
      },
      estimated_cost: {
        currency: 'THB',
        amount: idx === 0 ? 1200 : 800,
        breakdown: 'estimate from mock policy — OSM has no price'
      },
      tags: ['thai-or-local', 'near-wat-pho', idx === 0 ? 'primary' : 'backup'].concat(
        p.cuisine ? [String(p.cuisine).split(';')[0]] : []
      ),
      fit_score: idx === 0 ? 0.8 : 0.7,
      evidence: [
        'Selected via Overpass search_pois near geocoded Wat Pho',
        p.opening_hours
          ? `opening_hours raw: ${p.opening_hours}`
          : 'opening_hours missing in OSM — assumption required'
      ],
      backup_rank: idx + 1
    })),
    sources: [
      { type: 'tool', ref: geocode.cache_ref, tool: 'geocode_place' },
      { type: 'tool', ref: pois.cache_ref, tool: 'search_pois' },
      { type: 'tool', ref: travel.cache_ref, tool: 'get_travel_time' },
      { type: 'tool', ref: weather.cache_ref, tool: 'get_weather' },
      { type: 'mock-policy', ref: 'mock-data/dining-options.json', note: 'cost estimates only' }
    ],
    assumptions: [
      'Restaurant prices estimated — not from live API',
      'No reservation or booking is confirmed',
      travel.duration_min != null
        ? `Wat Pho → Silom driving ~${travel.duration_min} min (OSRM)`
        : 'Travel time unavailable from OSRM'
    ]
  };

  const outDir = path.join(repoRoot, 'shared', 'research');
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, 'smoke-dining-options.hybrid.json');
  fs.writeFileSync(outFile, `${JSON.stringify(contract, null, 2)}\n`, 'utf8');
  report.sample_contract = path.relative(repoRoot, outFile).replaceAll('\\', '/');

  const required = [
    'schema_version',
    'trip_id',
    'generated_by',
    'generated_at',
    'source_mode',
    'candidates',
    'sources'
  ];
  const missing = required.filter((k) => !(k in contract));
  const shapeOk =
    missing.length === 0 &&
    Array.isArray(contract.candidates) &&
    contract.candidates.length >= 2 &&
    Array.isArray(contract.sources);

  // Student-shaped output path (gitignored) — validates dining-options contract rules.
  const workspaceContract = path.join(
    repoRoot,
    'workspace',
    'contracts',
    'dining-options.json'
  );
  fs.mkdirSync(path.dirname(workspaceContract), { recursive: true });
  fs.writeFileSync(workspaceContract, `${JSON.stringify(contract, null, 2)}\n`, 'utf8');

  const validate = spawnSync(
    process.execPath,
    [
      path.join(repoRoot, 'shared', 'scripts', 'validate-json.mjs'),
      'workspace/contracts/dining-options.json'
    ],
    { cwd: repoRoot, encoding: 'utf8' }
  );
  const pass = shapeOk && validate.status === 0;
  report.steps.push({
    name: 'validate hybrid dining-options sample',
    pass,
    status: validate.status,
    stdout: validate.stdout.trim(),
    workspace_contract: 'workspace/contracts/dining-options.json',
    error: pass ? null : validate.stderr || validate.stdout || `missing=${missing.join(',')}`
  });
  if (!pass) report.ok = false;
} else {
  report.ok = false;
  report.steps.push({
    name: 'build hybrid dining-options sample',
    pass: false,
    error: 'need at least 2 named POIs from Overpass'
  });
}

const reportPath = path.join(repoRoot, 'shared', 'research', 'tool-smoke-test-report.json');
fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
printJson({
  ok: report.ok,
  report: path.relative(repoRoot, reportPath).replaceAll('\\', '/'),
  sample_contract: report.sample_contract,
  summary: report.steps.map((s) => ({ name: s.name, pass: s.pass }))
});
process.exit(report.ok ? 0 : 1);
