# External Sources Evaluation — Trip Coordinator Lab

**สถานะ:** ทดสอบแล้ว → ผลนำไปตัดสินเปลี่ยน scenario แล้ว  
**ทดสอบเมื่อ:** 2026-07-18 (UTC)  
**สคริปต์:** `shared/scripts/probe-external-sources.py` (+ `probe-bangkok-scenario.py`)  
**ผลดิบ:** `shared/research/external-sources-probe-result.json`  
**การตัดสินใจถัดไป:** ดู `shared/research/SCENARIO-DECISION.md` (ล็อก Bangkok Day Trip)

Scenario ที่ใช้ตอน probe รอบแรก: พัทยา / สวนนงนุช → ร้านไวน์ (เลิกใช้เป็นโจทย์หลักแล้ว)

---

## คำแนะนำสั้น ๆ (สำหรับตัดสินใจขั้นถัดไป)

| บทบาท | แหล่งที่ผ่าน | ใช้ใน Lab? |
|---|---|---|
| Geocode ชื่อสถานที่ | **Nominatim** | ใช่ (throttle + cache) |
| ค้น POI ร้าน/attraction | **Overpass (OSM)** | ใช่ (bbox แคบ + cache + fallback) |
| เวลาเดินทาง | **OSRM** public | ใช่ (หลัก) |
| สภาพอากาศ | **Open-Meteo** | ใช่ (เสริม soft preference) |
| Routing ทางเลือก | OpenRouteService | ไม่ — ต้อง API key |
| Geocode ทางเลือก | Open-Meteo Geocoding | ไม่ — ไม่เจอ “Nong Nooch” |
| ราคา / บรรยากาศโรแมนติก / มินิมาราธอน | mock + assumptions | คงไว้เป็นชั้น fallback |

**สถาปัตยกรรมที่แนะนำ:** hybrid  
`tool/MCP → API → external-cache → contract` และถ้า fail → `shared/mock-data/*`

---

## ผลทดสอบรายแหล่ง

### 1) Nominatim (OpenStreetMap) — ผ่าน สำหรับ geocode

| Query | ผล | พิกัดที่ได้ |
|---|---|---|
| `Nong Nooch` | OK (~750 ms) | 12.7688, 100.9340 (tourism/attraction) |
| `สวนนงนุช` | OK | 12.7647, 100.9361 (leisure/garden) — เหมาะที่สุด |
| `Pattaya Beach Thailand` | OK | 12.9366, 100.8860 (ได้ทั้ง hotel และ beach) |
| `Na Jomtien Pattaya` | OK แต่ไม่แม่นเป็น “ย่าน” | ได้ guest house / ร้าน ไม่ใช่ centroid ย่าน |

**ข้อควรรู้สำหรับห้องเรียน**

- ต้องส่ง `User-Agent` ระบุตัวตน และจำกัด ~1 request/วินาที
- ชื่ออังกฤษยาว ๆ เช่น `Nong Nooch Tropical Botanical Garden` อาจไม่มีผล → ใช้ชื่อสั้นหรือไทย
- พิกัดใน mock เดิม (`lng: 100.906`) เพี้ยนจาก OSM จริง (~100.934) — กระทบเวลาเดินทาง

**Verdict:** ใช้เป็น tool `geocode_place(name)` ได้ ถ้ามี cache และ allowlist คำค้น

---

### 2) Overpass API — ผ่าน สำหรับ POI (ระวัง rate limit)

Endpoint หลัก: `https://overpass-api.de/api/interpreter`

| Query | ผล | รายละเอียด |
|---|---|---|
| ชื่อ Nong Nooch / นงนุช ใน bbox ใต้พัทยา | OK (~1.0 s) | 10 elements ชื่อครบ |
| restaurant + bar แถวหาดพัทยา | OK (~1.3 s) | 25 ร้าน ชื่อครบ |
| tourism=attraction ใกล้นงนุช | OK หลังรอ (ครั้งแรก 429) | พบ สวนนงนุช, Ceramic Garden, Swiss Sheep Farm |
| cuisine ~ wine/italian/french/steak | OK | ได้ร้านอิตาเลียน/สเต็ก/พับ — **ไม่ใช่ “wine terrace โรแมนติก” ตาม mock** |
| shop=gift/souvenir | 429 เมื่อยิงถี่ | สอนเรื่อง rate limit + fallback ได้ดี |

**คุณภาพฟิลด์ (สำคัญมาก)**

- `opening_hours`: ต่ำมาก — ตัวอย่าง beach restaurants **1/25**
- `cuisine`: ปานกลาง — **8/25**
- ไม่มีราคา THB / cost_for_two
- Query กว้างหรือยิงถี่ → **HTTP 429 / 504**

**Verdict:** เหมาะสอน Tool Calling จริง แต่ **ห้ามใช้เป็น SoT เดียวสำหรับงบ/ชั่วโมงเปิด**  
Lab ต้องบังคับ: missing fields → `assumptions` / `violations` / fallback mock

---

### 3) OSRM (router.project-osrm.org) — ผ่านดีที่สุดสำหรับ travel time

| Route | เวลา | ระยะ |
|---|---|---|
| Nong Nooch → Pattaya Beach (พิกัด OSM) | **27.4 min** | 23.8 km |
| Nong Nooch → Na Jomtien (approx) | **14.0 min** | 6.6 km |
| Pattaya Beach → Na Jomtien (approx) | **16.7 min** | 18.4 km |
| mock coords เดิม → Beach | 17.8 min | 21.8 km |

เทียบ mock เดิม: `Pattaya → Nong Nooch = 35 min` — คนละสมมติฐานพิกัด/เส้นทาง

- ไม่ต้อง API key
- latency ~600–650 ms
- `route` และ `table` ใช้ได้

**Verdict:** ใช้เป็น tool `get_travel_time(from, to)` แทน `travel-times.json` ได้เลย  
ยังควรเก็บ mock matrix เป็น fallback เมื่อ public OSRM ล่ม

---

### 4) Open-Meteo — ผ่าน สำหรับ weather / ไม่ผ่านสำหรับ geocode สถานที่ท่องเที่ยว

**Forecast** (`api.open-meteo.com`) — OK, ไม่ต้อง key, timezone `Asia/Bangkok` ใช้ได้  
ตัวอย่าง: 2026-07-18 tmax 32.3°C, precip ~0

**Geocoding** (`geocoding-api.open-meteo.com`) — FAIL สำหรับ `Nong Nooch` (0 results)

**Verdict:** ใช้เฉพาะ weather soft-check (วิ่ง outdoor เช้า) — ไม่แทน Nominatim

---

### 5) OpenRouteService — ไม่เหมาะเป็นค่าเริ่มต้นของ Lab

- เรียกไม่มี key → **HTTP 401 Authorization field missing**
- คุณภาพดี แต่เพิ่มภาระแจก key / โควต้าทั้งห้อง

**Verdict:** optional instructor-demo เท่านั้น ไม่ใส่เกณฑ์ผ่าน

---

## สิ่งที่แหล่งภายนอกทำไม่ได้ (ต้องคง mock)

1. **งบและราคา** — OSM/OSRM ไม่มี `cost_for_two`  
2. **บรรยากาศ romantic / quiet / wine terrace** ตาม soft preferences ของ scenario  
3. **อีเวนต์มินิมาราธอนเช้า** — ไม่ใช่ POI ถาวรใน OSM  
4. **ชั่วโมงเปิดครบ** — coverage ต่ำ → Auditor ยังต้องพึ่ง mock หรือ `unknown`  
5. **ความเสถียรทั้งห้อง** — Overpass 429 เมื่อยิงพร้อมกัน

ดังนั้น mock ไม่ใช่ของทิ้ง — เป็น **ชั้นความจริงสำหรับฟิลด์ที่โลกภายนอกไม่ให้** และ **fallback**

---

## ชุด SoT ที่เสนอสำหรับขั้นถัดไป (ยังไม่ implement)

```text
geocode_place     → Nominatim (+ cache, 1 rps)
search_pois       → Overpass bbox แคบ (+ cache, fallback mock dining/activities)
get_travel_time   → OSRM (+ fallback travel-times.json)
get_weather       → Open-Meteo (optional soft preference)
prices/atmosphere/events → mock + assumptions ใน contract
```

`source_mode` ที่ควรรองรับเมื่อปรับ Lab:

| ค่า | ความหมาย |
|---|---|
| `mock` | ใช้เฉพาะไฟล์ใน `shared/mock-data` |
| `api` | เรียกสดในรอบนั้น |
| `cache` | อ่านจาก `shared/mock-data/external-cache/` |
| `hybrid` | ผสม api/cache/mock ในไฟล์เดียว — ระบุต่อ candidate ใน `sources` |

---

## ความเสี่ยงห้องเรียน & วิธีกัน

| ความเสี่ยง | วิธีกัน |
|---|---|
| ทั้งห้องยิง Overpass พร้อมกัน | pre-warm cache ใน `external-cache/` ก่อน Lab; หรือ Instructor แจก cache ชุดเดียว |
| Nominatim โดนบล็อก | User-Agent ชัด + sleep 1s + cache |
| OSRM public ล่ม | fallback `travel-times.json` |
| ผู้เรียนคิดว่าร้านจาก OSM จองได้ | คงกฎ: ห้ามยืนยันจอง; `user_confirmation_required: true` |
| พิกัด mock เดิมเพี้ยน | อัปเดตพิกัดนงนุชให้ใกล้ OSM เมื่อจะผูก OSRM |

---

## วิธีรันทดสอบซ้ำ

จาก root ของ `multi-agent-trip-coordinator-lab`:

```bash
python shared/scripts/probe-external-sources.py
# ถ้าระหว่างวันอยากเช็ค attraction/cuisine เพิ่ม (รอ rate limit):
python shared/scripts/probe-external-followup.py
```

---

## สรุปตัดสินใจ

| แหล่ง | คะแนนห้องเรียน | ใช้เป็น |
|---|---|---|
| OSRM | A | travel time หลัก |
| Open-Meteo forecast | A | weather เสริม |
| Nominatim | A− | geocode (throttle) |
| Overpass | B+ | POI (cache บังคับ) |
| OpenRouteService | C | optional มี key |
| Open-Meteo geocoding | D | ไม่ใช้กับ scenario นี้ |

**ขั้นถัดไป (ยังไม่ทำในรอบนี้):**  
ออกแบบ Lab เสริม / ปรับ prompt ให้ Dining–Activity เรียก tool ตามชุดด้านบน แล้วอัปเดตสไลด์ Module 1 + mock-data README
