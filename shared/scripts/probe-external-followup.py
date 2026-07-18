#!/usr/bin/env python3
"""Follow-up probes that need spacing after the main probe (rate limits)."""

from __future__ import annotations

import json
import time
import urllib.parse
import urllib.request

UA = "TripCoordinatorLabResearch/1.0 (course probe; local)"


def overpass(query: str) -> dict:
    data = urllib.parse.urlencode({"data": query}).encode()
    req = urllib.request.Request(
        "https://overpass-api.de/api/interpreter",
        data=data,
        headers={
            "User-Agent": UA,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    )
    with urllib.request.urlopen(req, timeout=40) as resp:
        return json.load(resp)


def main() -> None:
    time.sleep(3)
    q1 = (
        '[out:json][timeout:20];'
        '('
        'node["tourism"="attraction"](12.74,100.90,12.80,100.96);'
        'way["tourism"="attraction"](12.74,100.90,12.80,100.96);'
        ');'
        "out center 15;"
    )
    d1 = overpass(q1)
    els = d1.get("elements", [])
    print(f"southern_attractions count={len(els)}")
    for e in els[:10]:
        t = e.get("tags", {})
        c = e.get("center") or {}
        print(
            " ",
            t.get("name"),
            t.get("tourism"),
            e.get("lat") or c.get("lat"),
            e.get("lon") or c.get("lon"),
        )

    time.sleep(2)
    q2 = (
        '[out:json][timeout:20];'
        'node["amenity"~"^(bar|pub|restaurant)$"]'
        '["cuisine"~"wine|italian|french|steak",i]'
        "(12.75,100.85,12.95,100.95);"
        "out 20;"
    )
    d2 = overpass(q2)
    els2 = d2.get("elements", [])
    print(f"\nwine_ish cuisine count={len(els2)}")
    for e in els2[:12]:
        t = e.get("tags", {})
        print(
            " ",
            t.get("name"),
            t.get("amenity"),
            t.get("cuisine"),
            t.get("opening_hours"),
        )

    time.sleep(2)
    q3 = (
        '[out:json][timeout:20];'
        '('
        'node["shop"="gift"](12.75,100.85,12.95,100.95);'
        'node["shop"="souvenir"](12.75,100.85,12.95,100.95);'
        ');'
        "out 15;"
    )
    d3 = overpass(q3)
    els3 = d3.get("elements", [])
    print(f"\ngift_souvenir count={len(els3)}")
    for e in els3[:10]:
        t = e.get("tags", {})
        print(" ", t.get("name"), t.get("shop"), e.get("lat"), e.get("lon"))


if __name__ == "__main__":
    main()
