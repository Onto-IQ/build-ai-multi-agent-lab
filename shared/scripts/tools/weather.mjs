#!/usr/bin/env node
/**
 * Tool: get_weather (Open-Meteo)
 * Usage: node shared/scripts/tools/weather.mjs --lat 13.7563 --lon 100.5018
 */
import { fetchJson, fail, parseArgs, printJson, writeCache } from './lib/common.mjs';

const { args } = parseArgs(process.argv.slice(2));
const lat = Number(args.lat ?? 13.7563);
const lon = Number(args.lon ?? 100.5018);

if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
  fail('require numeric --lat and --lon');
}

const url = new URL('https://api.open-meteo.com/v1/forecast');
url.searchParams.set('latitude', String(lat));
url.searchParams.set('longitude', String(lon));
url.searchParams.set('daily', 'precipitation_sum,temperature_2m_max,precipitation_probability_max');
url.searchParams.set('timezone', 'Asia/Bangkok');
url.searchParams.set('forecast_days', '3');

try {
  const data = await fetchJson(url.toString());
  const daily = [];
  for (let i = 0; i < (data.daily?.time || []).length; i += 1) {
    daily.push({
      date: data.daily.time[i],
      precipitation_mm: data.daily.precipitation_sum?.[i] ?? null,
      temp_max_c: data.daily.temperature_2m_max?.[i] ?? null,
      precip_probability_max: data.daily.precipitation_probability_max?.[i] ?? null
    });
  }

  const cache_ref = writeCache(`weather_${lat}_${lon}`, {
    source: 'open-meteo',
    confidence: 0.9,
    query: { lat, lon },
    ok: true,
    data: { timezone: data.timezone, daily },
    notes: ['soft preference only — do not fail audit solely on weather']
  });

  printJson({
    tool: 'get_weather',
    ok: true,
    cache_ref,
    timezone: data.timezone,
    daily
  });
} catch (error) {
  const cache_ref = writeCache('weather_error', {
    source: 'open-meteo',
    confidence: 0,
    query: { lat, lon },
    ok: false,
    data: { error: String(error.message || error) },
    notes: ['weather unavailable — omit soft weather preference']
  });
  printJson({ tool: 'get_weather', ok: false, cache_ref, error: String(error.message || error) });
  process.exitCode = 1;
}
