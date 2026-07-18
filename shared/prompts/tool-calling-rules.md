# Tool Calling Rules (shared)

ใช้ร่วมกับ prompt ของ Activity / Dining / Auditor  
**JSON contract ยังเป็นแกน orchestration** — tool ใช้เพื่อดึงข้อมูลเข้า contract เท่านั้น

## ทำไมใช้ CLI + cache (ไม่ยิง API ตรงทั้งห้อง)

คอร์สเตรียม `shared/scripts/tools/*` และบังคับอ่าน/เขียน `external-cache/` เพื่อ **ลด rate limit** ของ Overpass / Nominatim / public OSRM เมื่อผู้เรียนหลายคนยิงพร้อมกัน

- โดน `429` / timeout → ใช้ cache หรือ `shared/mock-data/*` ทันที อย่าวนยิงซ้ำ  
- MCP หรือ API สำเร็จรูปอาจเรียกง่ายกว่า — ลองได้ใน Lab เสริม แต่**ไม่ใช่เกณฑ์ผ่านหลัก**  
- Lab เสริม: [`labs/lab-optional-mcp-vs-cli/README.md`](../../labs/lab-optional-mcp-vs-cli/README.md)

## สถาปัตยกรรม

```text
อ่าน contract ขาเข้า
  → ตรวจ external-cache ก่อน (กัน rate limit)
  → ถ้าไม่มี cache ค่อยเรียก tool (CLI ด้านล่าง)
  → เขียน cache ใหม่
  → map เข้า schema ของ contract ที่ตัวเองเป็น owner
  → ถ้า tool ล้ม / 429 / ข้อมูลไม่พอ → fallback shared/mock-data/*
  → ตั้ง source_mode + sources ให้ตรงความจริง
```

`source_mode` ที่อนุญาต: `api` | `cache` | `hybrid` | `mock`

## Tools (รันจาก root ของ repository)

| Tool | คำสั่ง | ใช้เมื่อ |
|---|---|---|
| `geocode_place` | `node shared/scripts/tools/geocode.mjs "วัดโพธิ์"` | แปลงชื่อสถานที่ → lat/lon |
| `search_pois` | `node shared/scripts/tools/search-pois.mjs --lat … --lon … --amenity restaurant` | หาร้าน / attraction จาก OSM |
| `get_travel_time` | `node shared/scripts/tools/travel-time.mjs --from lon,lat --to lon,lat` | เวลาเดินทาง (OSRM) |
| `get_weather` | `node shared/scripts/tools/weather.mjs --lat … --lon …` | อากาศ (soft เท่านั้น) |

Smoke test ทั้งชุด:

```bash
node shared/scripts/tools/smoke-test.mjs
```

## กติกาบังคับ

1. เรียก tool ก่อนอ่าน mock ในเส้นทางหลัก (ยกเว้น Triage ที่แปลงคำขออย่างเดียว)
2. ห้ามยิง Overpass/Nominatim ซ้ำถ้ามี cache ใหม่พอ (อ่าน `external-cache/` ก่อน)
3. OSM **ไม่มีราคา** — ใส่ `estimated_cost` จากนโยบาย mock หรือ assumptions ชัดเจน
4. `opening_hours` อาจว่าง — อย่าแต่งชั่วโมงเปิดถ้าไม่มีหลักฐาน; ใส่ `unknown` + assumption ได้
5. ระบุ `sources` ทุกรายการที่ใช่ (tool cache_ref และ/หรือ mock-data)
6. ห้ามยืนยันการจอง / ลงทะเบียน / จ่ายเงินจากผล tool
7. เขียนได้เฉพาะไฟล์ที่ตัวเองเป็น owner ใน `workspace/contracts/`
8. ถ้า tool fail ทั้งก้อน — fallback mock แล้วยังต้องผ่าน validator

## บทบาท × Tool

| Agent | Tool หลัก | Fallback |
|---|---|---|
| Activity | geocode + search_pois (`tourism=attraction` หรือ mock activities) + weather (soft) | `mock-data/activities.json` |
| Dining | geocode + search_pois (`amenity=restaurant\|cafe`) | `mock-data/dining-options.json` |
| Auditor | get_travel_time เพื่อตรวจ buffer / return-by | `mock-data/travel-times.json` |
| Triage / Coordinator | ไม่บังคับ tool | — |
