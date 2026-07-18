#!/usr/bin/env python3
"""Quick validation that Bangkok Day Trip anchors work with external SoT."""

from __future__ import annotations

import json
import time
import urllib.parse
import urllib.request

UA = "TripCoordinatorLabResearch/1.0 (bangkok scenario)"


def get_json(url: str) -> tuple[dict | list, int]:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    t0 = time.perf_counter()
    with urllib.request.urlopen(req, timeout=35) as resp:
        data = json.load(resp)
    return data, int((time.perf_counter() - t0) * 1000)


def overpass(query: str) -> dict:
    body = urllib.parse.urlencode({"data": query}).encode()
    req = urllib.request.Request(
        "https://overpass-api.de/api/interpreter",
        data=body,
        headers={
            "User-Agent": UA,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    )
    with urllib.request.urlopen(req, timeout=40) as resp:
        return json.load(resp)


def main() -> None:
    places = ["วัดโพธิ์", "Wat Pho", "วัดอรุณ", "Lumphini Park", "สีลม"]
    print("=== Nominatim ===")
    coords = {}
    for q in places:
        time.sleep(1.1)
        url = (
            "https://nominatim.openstreetmap.org/search?"
            + urllib.parse.urlencode(
                {"q": q, "format": "json", "limit": 1, "countrycodes": "th"}
            )
        )
        data, ms = get_json(url)
        if not data:
            print(f"FAIL {q} ({ms}ms)")
            continue
        hit = data[0]
        lat, lon = float(hit["lat"]), float(hit["lon"])
        coords[q] = (lat, lon)
        print(f"OK {q}: {lat:.5f},{lon:.5f} ({ms}ms) {hit.get('type')}")

    # Prefer Wat Pho / Wat Arun / Silom
    wat_pho = coords.get("วัดโพธิ์") or coords.get("Wat Pho")
    wat_arun = coords.get("วัดอรุณ")
    silom = coords.get("สีลม")
    lumpini = coords.get("Lumphini Park")

    print("\n=== Overpass restaurants near Wat Pho ===")
    if wat_pho:
        lat, lon = wat_pho
        # ~1.2km box
        q = (
            f"[out:json][timeout:20];"
            f'node["amenity"~"^(restaurant|cafe)$"]({lat-0.01},{lon-0.01},{lat+0.01},{lon+0.01});'
            f"out 20;"
        )
        time.sleep(1)
        d = overpass(q)
        els = d.get("elements", [])
        oh = sum(1 for e in els if e.get("tags", {}).get("opening_hours"))
        thai = sum(
            1
            for e in els
            if "thai" in (e.get("tags", {}).get("cuisine") or "").lower()
        )
        print(f"count={len(els)} opening_hours={oh} cuisine_thai={thai}")
        for e in els[:8]:
            t = e.get("tags", {})
            print(
                " ",
                t.get("name"),
                t.get("amenity"),
                t.get("cuisine"),
                t.get("opening_hours"),
            )

    print("\n=== OSRM matrix ===")
    # lon,lat order
    points = []
    labels = []
    for label, key in [
        ("WatPho", wat_pho),
        ("WatArun", wat_arun),
        ("Lumphini", lumpini),
        ("Silom", silom),
    ]:
        if key:
            points.append(f"{key[1]},{key[0]}")
            labels.append(label)
    if len(points) >= 2:
        url = (
            "https://router.project-osrm.org/table/v1/driving/"
            + ";".join(points)
            + "?annotations=duration,distance"
        )
        data, ms = get_json(url)
        print(f"code={data.get('code')} ({ms}ms)")
        for i, a in enumerate(labels):
            for j, b in enumerate(labels):
                if i < j:
                    mins = data["durations"][i][j] / 60
                    km = data["distances"][i][j] / 1000
                    print(f"  {a}->{b}: {mins:.1f} min / {km:.1f} km")

    print("\n=== Open-Meteo Bangkok ===")
    url = (
        "https://api.open-meteo.com/v1/forecast?"
        + urllib.parse.urlencode(
            {
                "latitude": 13.7563,
                "longitude": 100.5018,
                "daily": "precipitation_sum,temperature_2m_max",
                "timezone": "Asia/Bangkok",
                "forecast_days": 2,
            }
        )
    )
    data, ms = get_json(url)
    print(f"OK timezone={data.get('timezone')} ({ms}ms)")
    for i, day in enumerate(data["daily"]["time"]):
        print(
            f"  {day} precip={data['daily']['precipitation_sum'][i]} "
            f"tmax={data['daily']['temperature_2m_max'][i]}"
        )


if __name__ == "__main__":
    main()
