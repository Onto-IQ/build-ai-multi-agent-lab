#!/usr/bin/env python3
"""Probe external SoT candidates for the Trip Coordinator Lab.

Run from anywhere; does not modify lab contracts.
Usage: python shared/scripts/probe-external-sources.py
"""

from __future__ import annotations

import json
import time
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any

UA = "TripCoordinatorLabResearch/1.0 (course probe; local)"
TIMEOUT = 35


@dataclass
class ProbeResult:
    name: str
    ok: bool
    latency_ms: int
    notes: list[str] = field(default_factory=list)
    sample: Any = None
    error: str | None = None


def http_json(
    url: str,
    *,
    method: str = "GET",
    data: bytes | None = None,
    headers: dict[str, str] | None = None,
) -> tuple[Any, int]:
    hdrs = {"User-Agent": UA, "Accept": "application/json"}
    if headers:
        hdrs.update(headers)
    req = urllib.request.Request(url, data=data, headers=hdrs, method=method)
    started = time.perf_counter()
    with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
        body = resp.read()
        latency = int((time.perf_counter() - started) * 1000)
    return json.loads(body.decode("utf-8")), latency


def probe_nominatim() -> list[ProbeResult]:
    results: list[ProbeResult] = []
    queries = [
        "Nong Nooch",
        "สวนนงนุช",
        "Pattaya Beach Thailand",
        "Na Jomtien Pattaya",
    ]
    for q in queries:
        time.sleep(1.1)  # Nominatim usage policy ~1 req/s
        url = (
            "https://nominatim.openstreetmap.org/search?"
            + urllib.parse.urlencode(
                {"q": q, "format": "json", "limit": 2, "countrycodes": "th"}
            )
        )
        try:
            data, ms = http_json(url)
            notes = []
            if not data:
                notes.append("no results")
                results.append(ProbeResult(f"Nominatim:{q}", False, ms, notes))
                continue
            top = data[0]
            notes.append(
                f"{top.get('display_name', '')[:80]} | "
                f"{top.get('lat')},{top.get('lon')} | "
                f"{top.get('class')}/{top.get('type')}"
            )
            if len(data) > 1:
                notes.append(f"alt_count={len(data)}")
            results.append(
                ProbeResult(f"Nominatim:{q}", True, ms, notes, sample=top)
            )
        except Exception as exc:  # noqa: BLE001
            results.append(ProbeResult(f"Nominatim:{q}", False, 0, error=str(exc)))
    return results


def probe_overpass() -> list[ProbeResult]:
    results: list[ProbeResult] = []
    endpoints = [
        "https://overpass-api.de/api/interpreter",
        "https://overpass.kumi.systems/api/interpreter",
    ]
    queries = {
        "nong_nooch_name": (
            '[out:json][timeout:20];'
            'node["name"~"Nong Nooch|นงนุช",i](12.74,100.90,12.80,100.96);'
            "out 10;"
        ),
        "beach_restaurants": (
            '[out:json][timeout:20];'
            '('
            'node["amenity"="restaurant"](12.88,100.86,12.95,100.90);'
            'node["amenity"="bar"](12.88,100.86,12.95,100.90);'
            ');'
            "out 25;"
        ),
        "southern_attractions": (
            '[out:json][timeout:20];'
            '('
            'node["tourism"="attraction"](12.74,100.90,12.80,100.96);'
            'way["tourism"="attraction"](12.74,100.90,12.80,100.96);'
            ');'
            "out center 15;"
        ),
    }

    # Primary endpoint for all queries; secondary only for restaurant probe
    for qname, qtext in queries.items():
        endpoint = endpoints[0]
        try:
            encoded = urllib.parse.urlencode({"data": qtext}).encode()
            data, ms = http_json(
                endpoint,
                method="POST",
                data=encoded,
                headers={"Content-Type": "application/x-www-form-urlencoded"},
            )
            els = data.get("elements", [])
            notes = [f"endpoint={endpoint}", f"elements={len(els)}"]
            with_oh = sum(1 for e in els if e.get("tags", {}).get("opening_hours"))
            with_cuisine = sum(1 for e in els if e.get("tags", {}).get("cuisine"))
            with_name = sum(1 for e in els if e.get("tags", {}).get("name"))
            notes.append(
                f"named={with_name}/{len(els)} "
                f"opening_hours={with_oh}/{len(els)} "
                f"cuisine={with_cuisine}/{len(els)}"
            )
            samples = []
            for e in els[:5]:
                tags = e.get("tags", {})
                lat = e.get("lat") or (e.get("center") or {}).get("lat")
                lon = e.get("lon") or (e.get("center") or {}).get("lon")
                samples.append(
                    {
                        "name": tags.get("name"),
                        "amenity": tags.get("amenity"),
                        "tourism": tags.get("tourism"),
                        "cuisine": tags.get("cuisine"),
                        "opening_hours": tags.get("opening_hours"),
                        "lat": lat,
                        "lon": lon,
                    }
                )
            results.append(
                ProbeResult(
                    f"Overpass:{qname}",
                    True,
                    ms,
                    notes,
                    sample=samples,
                )
            )
        except Exception as exc:  # noqa: BLE001
            results.append(
                ProbeResult(f"Overpass:{qname}", False, 0, error=str(exc))
            )
            # fallback endpoint for beach restaurants
            if qname == "beach_restaurants":
                try:
                    encoded = urllib.parse.urlencode({"data": qtext}).encode()
                    data, ms = http_json(
                        endpoints[1],
                        method="POST",
                        data=encoded,
                        headers={
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                    )
                    els = data.get("elements", [])
                    results.append(
                        ProbeResult(
                            "Overpass:beach_restaurants:fallback",
                            True,
                            ms,
                            [f"endpoint={endpoints[1]}", f"elements={len(els)}"],
                            sample=[
                                e.get("tags", {}).get("name") for e in els[:5]
                            ],
                        )
                    )
                except Exception as exc2:  # noqa: BLE001
                    results.append(
                        ProbeResult(
                            "Overpass:beach_restaurants:fallback",
                            False,
                            0,
                            error=str(exc2),
                        )
                    )
    return results


def probe_osrm() -> list[ProbeResult]:
    results: list[ProbeResult] = []
    # Nominatim-aligned coords for Nong Nooch / Pattaya Beach
    pairs = [
        ("NongNooch->PattayaBeach", "100.936,12.765", "100.884,12.940"),
        ("NongNooch->NaJomtienApprox", "100.936,12.765", "100.910,12.800"),
        ("PattayaBeach->NaJomtienApprox", "100.884,12.940", "100.910,12.800"),
        ("mockCoords NongNooch->Beach", "100.906,12.765", "100.878,12.934"),
    ]
    for label, a, b in pairs:
        url = (
            f"https://router.project-osrm.org/route/v1/driving/{a};{b}"
            "?overview=false"
        )
        try:
            data, ms = http_json(url)
            route = data["routes"][0]
            mins = round(route["duration"] / 60, 1)
            km = round(route["distance"] / 1000, 1)
            results.append(
                ProbeResult(
                    f"OSRM:{label}",
                    data.get("code") == "Ok",
                    ms,
                    [f"{mins} min", f"{km} km", f"code={data.get('code')}"],
                    sample={"duration_min": mins, "distance_km": km},
                )
            )
        except Exception as exc:  # noqa: BLE001
            results.append(ProbeResult(f"OSRM:{label}", False, 0, error=str(exc)))

    table_url = (
        "https://router.project-osrm.org/table/v1/driving/"
        "100.936,12.765;100.884,12.940;100.910,12.800"
        "?annotations=duration,distance"
    )
    try:
        data, ms = http_json(table_url)
        names = ["NongNooch", "PattayaBeach", "NaJomtienApprox"]
        notes = [f"code={data.get('code')}"]
        sample = {}
        for i, a in enumerate(names):
            for j, b in enumerate(names):
                if i < j:
                    mins = round(data["durations"][i][j] / 60, 1)
                    km = round(data["distances"][i][j] / 1000, 1)
                    notes.append(f"{a}->{b}: {mins} min / {km} km")
                    sample[f"{a}->{b}"] = {"min": mins, "km": km}
        results.append(
            ProbeResult("OSRM:table", data.get("code") == "Ok", ms, notes, sample)
        )
    except Exception as exc:  # noqa: BLE001
        results.append(ProbeResult("OSRM:table", False, 0, error=str(exc)))
    return results


def probe_open_meteo() -> list[ProbeResult]:
    results: list[ProbeResult] = []
    # Weather
    url = (
        "https://api.open-meteo.com/v1/forecast?"
        + urllib.parse.urlencode(
            {
                "latitude": 12.934,
                "longitude": 100.878,
                "hourly": "precipitation_probability,temperature_2m",
                "daily": "precipitation_sum,temperature_2m_max",
                "timezone": "Asia/Bangkok",
                "forecast_days": 3,
            }
        )
    )
    try:
        data, ms = http_json(url)
        notes = [f"timezone={data.get('timezone')}"]
        daily = data.get("daily", {})
        for i, day in enumerate(daily.get("time", [])):
            notes.append(
                f"{day} precip={daily['precipitation_sum'][i]}mm "
                f"tmax={daily['temperature_2m_max'][i]}C"
            )
        results.append(
            ProbeResult("OpenMeteo:forecast", True, ms, notes, sample=daily)
        )
    except Exception as exc:  # noqa: BLE001
        results.append(ProbeResult("OpenMeteo:forecast", False, 0, error=str(exc)))

    # Geocoding (no key)
    geo_url = (
        "https://geocoding-api.open-meteo.com/v1/search?"
        + urllib.parse.urlencode(
            {"name": "Nong Nooch", "count": 5, "language": "en", "format": "json"}
        )
    )
    try:
        data, ms = http_json(geo_url)
        hits = data.get("results") or []
        notes = [f"results={len(hits)}"]
        sample = []
        for r in hits[:5]:
            notes.append(
                f"{r.get('name')} | {r.get('latitude')},{r.get('longitude')} | "
                f"{r.get('country')} {r.get('admin1')}"
            )
            sample.append(r)
        results.append(
            ProbeResult(
                "OpenMeteo:geocoding",
                bool(hits),
                ms,
                notes,
                sample=sample,
            )
        )
    except Exception as exc:  # noqa: BLE001
        results.append(ProbeResult("OpenMeteo:geocoding", False, 0, error=str(exc)))
    return results


def probe_ors_no_key() -> ProbeResult:
    url = (
        "https://api.openrouteservice.org/v2/directions/driving-car"
        "?start=100.936,12.765&end=100.884,12.940"
    )
    try:
        data, ms = http_json(url)
        return ProbeResult(
            "OpenRouteService:no_key",
            True,
            ms,
            ["unexpected success without key"],
            sample=data,
        )
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")[:200]
        return ProbeResult(
            "OpenRouteService:no_key",
            False,
            0,
            [f"HTTP {exc.code} (expected without API key)", body],
            error=f"HTTP {exc.code}",
        )
    except Exception as exc:  # noqa: BLE001
        return ProbeResult("OpenRouteService:no_key", False, 0, error=str(exc))


def main() -> int:
    all_results: list[ProbeResult] = []
    print("Probing external sources for Trip Coordinator Lab...")
    print(f"UTC: {datetime.now(timezone.utc).isoformat()}")

    print("\n[1/5] Nominatim...")
    all_results.extend(probe_nominatim())
    print("[2/5] Overpass...")
    all_results.extend(probe_overpass())
    print("[3/5] OSRM...")
    all_results.extend(probe_osrm())
    print("[4/5] Open-Meteo...")
    all_results.extend(probe_open_meteo())
    print("[5/5] OpenRouteService (expect key required)...")
    all_results.append(probe_ors_no_key())

    print("\n" + "=" * 72)
    print("SUMMARY")
    print("=" * 72)
    for r in all_results:
        status = "OK " if r.ok else "FAIL"
        print(f"[{status}] {r.name} ({r.latency_ms} ms)")
        for n in r.notes:
            print(f"       - {n}")
        if r.error:
            print(f"       ! {r.error}")

    ok = sum(1 for r in all_results if r.ok)
    fail = sum(1 for r in all_results if not r.ok)
    print(f"\nTotals: ok={ok} fail={fail}")

    # Machine-readable dump next to script output path hint
    out = {
        "probed_at": datetime.now(timezone.utc).isoformat(),
        "user_agent": UA,
        "results": [
            {
                "name": r.name,
                "ok": r.ok,
                "latency_ms": r.latency_ms,
                "notes": r.notes,
                "error": r.error,
                "sample": r.sample,
            }
            for r in all_results
        ],
    }
    out_path = (
        __file__.replace("probe-external-sources.py", "")
        + "../research/external-sources-probe-result.json"
    )
    # Normalize path
    from pathlib import Path

    path = Path(__file__).resolve().parent.parent / "research" / "external-sources-probe-result.json"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\nWrote {path}")
    return 0 if ok >= 6 else 1


if __name__ == "__main__":
    raise SystemExit(main())
