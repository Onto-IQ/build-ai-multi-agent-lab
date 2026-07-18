# External Data Tools

CLI ที่ Agent เรียกผ่าน Bash / shell เพื่อดึงข้อมูลจริง แล้วเขียนผลลง JSON contract

กฎรวม: [`shared/prompts/tool-calling-rules.md`](../../prompts/tool-calling-rules.md)

## คำสั่ง

```bash
# จาก root ของ multi-agent-trip-coordinator-lab
node shared/scripts/tools/geocode.mjs "วัดโพธิ์"
node shared/scripts/tools/search-pois.mjs --lat 13.74635 --lon 100.49274 --amenity restaurant --radius-km 1.2
node shared/scripts/tools/travel-time.mjs --from 100.49274,13.74635 --to 100.53707,13.72920
node shared/scripts/tools/weather.mjs --lat 13.7563 --lon 100.5018

# ทดสอบทั้งชุด + สร้าง hybrid dining-options ตัวอย่าง
node shared/scripts/tools/smoke-test.mjs
```

ผล cache อยู่ที่ `shared/mock-data/external-cache/`

## ข้อจำกัดห้องเรียน

- Nominatim: ~1 req/s + ต้องมี User-Agent (สคริปต์ใส่ให้แล้ว)
- Overpass: อาจได้ HTTP 429 — ใช้ cache / fallback mock
- OSRM / Open-Meteo: ไม่ต้อง API key
