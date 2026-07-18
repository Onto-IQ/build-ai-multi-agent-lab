# Lab เสริม (Optional): MCP / API สำเร็จรูป vs CLI ของคอร์ส

**เวลา:** 15–25 นาที  
**สถานะ:** ไม่บังคับ — ไม่บล็อก Lab 3–9  
**จังหวะแนะนำ:** หลัง Lab 2 (Dining) หรือท้าย Module 3  
**เครื่องมือ:** Claude Code และ/หรือ OpenCode + (ทางเลือก) MCP server 1 ตัว

## ทำไมคอร์สใช้ CLI + cache เป็นค่าเริ่มต้น

เรา**ตั้งใจไม่**ให้ทุกคนยิง Overpass / Nominatim / OSRM ตรง ๆ พร้อมกันทั้งห้อง เพราะ:

1. **Rate limit / 429** — Overpass และ Nominatim จำกัดคำขอต่อ IP/ช่วงเวลา เมื่อ 20–40 คนยิงพร้อมกัน Lab พังก่อนได้เรียน ownership  
2. **ทำซ้ำได้** — ผลถูกเก็บใน `shared/mock-data/external-cache/` เครื่องช้าหรือเน็ตสะดุดยังรันต่อได้  
3. **ไม่บังคับ API key** — ชุด OSM / OSRM / Open-Meteo ใช้สอนได้โดยไม่ติด billing  
4. **ล็อกคำสั่งในเกณฑ์ผ่าน** — Instructor ตรวจ path เดียวกันได้ทุกเครื่อง  

```text
ค่าเริ่มต้นห้องเรียน (เกณฑ์ผ่าน Lab 2/5)
  shared/scripts/tools/*  →  cache  →  JSON contract
  ถ้า API ล้ม / 429      →  mock-data fallback

Lab เสริมนี้ (optional)
  ลอง MCP หรือ API สำเร็จรูป 1 ทาง
  แล้วเทียบกับ CLI ของคอร์ส — ผลยังต้องคิดในกรอบ contract
```

**JSON contract ยังเป็นแกน orchestration** ไม่ว่าจะเรียก tool จาก MCP หรือ CLI

## เป้าหมาย

- เข้าใจว่า MCP/API สำเร็จรูปเรียกง่ายกว่า แต่เสี่ยง rate limit / key / setup คนละเครื่อง  
- ทดลองอย่างน้อยหนึ่งทางเลือกนอก CLI ของคอร์ส (หรือจำลองด้วยการอ่านเอกสารถ้า infra ไม่พร้อม)  
- บันทึกข้อดี–ข้อเสียใน `workspace/learning-log.md`

## ไฟล์ในโฟลเดอร์นี้

- `prompts/compare-worksheet.md` — คำถามที่ต้องตอบใน learning-log  
- กฎ tool หลัก: [`shared/prompts/tool-calling-rules.md`](../../shared/prompts/tool-calling-rules.md)

## ขั้นตอน

### 1) Baseline (บังคับใน Lab เสริมนี้ — ใช้ของคอร์ส)

รันจาก root:

```bash
node shared/scripts/tools/geocode.mjs "วัดโพธิ์"
node shared/scripts/tools/search-pois.mjs --lat 13.74635 --lon 100.49274 --amenity restaurant --radius-km 1.2 --limit 5
```

สังเกต: มี `cache_ref` ใต้ `shared/mock-data/external-cache/` หรือไม่  
ถ้ารันซ้ำครั้งที่ 2 โดย**อ่าน cache ก่อน** แทนการยิง API ใหม่ — นั่นคือวิธีกัน rate limit ของคอร์ส

### 2) ทางเลือก A — ลอง MCP สำเร็จรูป (ถ้าเครื่องพร้อม)

เลือก **อย่างน้อย 1** ที่ Instructor อนุญาตในห้อง เช่น:

- MCP ที่ค้นที่ / maps / fetch ที่ทีมใช้ได้จริง  
- หรือ MCP ที่มากับเครื่องมือ (Claude Code / OpenCode) โดยไม่ต้องซื้อ key ใหม่

ทำอย่างน้อย:

1. ให้ Agent เรียก tool จาก MCP เพื่อหาสถานที่หรือร้านใกล้รัตนโกสินทร์  
2. **อย่าเขียนทับ** `dining-options.json` ของ Lab 2 ด้วยของ MCP โดยไม่ผ่าน schema  
3. จดชื่อ MCP, ชื่อ tool, และว่าต้องใช้ API key หรือไม่

ถ้าติดตั้ง MCP ไม่สำเร็จภายใน ~10 นาที → ข้ามไปทางเลือก B ได้เต็มคะแนน Lab เสริม

### 3) ทางเลือก B — อ่านเอกสารเทียบ (ไม่ต้องติดตั้ง)

อ่านแล้วตอบ worksheet:

- MCP/API สำเร็จรูปได้เปรียบอะไร  
- ทำไมคอร์สยังยึด CLI + cache เป็นเกณฑ์ผ่าน  
- ถ้าทั้งห้องยิง Overpass พร้อมกันโดยไม่มี cache จะเกิดอะไร

### 4) บันทึก learning-log

คัดลอกหัวข้อจาก `prompts/compare-worksheet.md` ไปใส่ `workspace/learning-log.md`

## เกณฑ์ผ่าน Lab เสริม

- [ ] รัน baseline CLI ได้อย่างน้อย 1 คำสั่ง (หรืออ้างอิง cache ที่มีอยู่แล้วถ้าโดน 429)  
- [ ] ทำ Track A **หรือ** B  
- [ ] ตอบใน learning-log ได้ชัดว่า **ทำไมคอร์สใช้ CLI+cache เพื่อลด rate limit**  
- [ ] ยอมรับว่าผลจาก MCP/API ก็ยังต้อง map เข้า JSON contract ก่อนส่งต่อ Agent

## สิ่งที่ห้าม

- อย่าทำให้ Lab 2–9 พึ่ง MCP เป็นทางเดียว — เกณฑ์ผ่านหลักยังเป็น CLI/cache/mock  
- อย่ายิง Overpass/Nominatim ในลูปซ้ำโดยไม่ดู cache  
- ห้ามยืนยันจองจากผล MCP หรือ CLI

## ถัดไป

กลับเข้าเส้นทางหลัก: [Lab 3: Permission](../lab-03-permission/README.md)
