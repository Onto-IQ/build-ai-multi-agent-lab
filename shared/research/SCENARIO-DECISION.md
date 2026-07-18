# Scenario Decision — Bangkok Day Trip

**ตัดสินใจเมื่อ:** 2026-07-18  
**สถานะ:** ล็อกแล้ว — แทนที่ Pattaya / Nong Nooch / wine marathon

## คำตัดสิน

ใช้ **Bangkok Rattanakosin Day Trip** เป็นโจทย์หลักของหลักสูตร

เหตุผลจากการทดสอบ SoT:

| เกณฑ์ | พัทยาเดิม | กรุงเทพ (วัดโพธิ์/วัดอรุณ) |
|---|---|---|
| Nominatim เจอจุดหลัก | บาง query พลาด | วัดโพธิ์ / วัดอรุณ / สีลม เจอชัด |
| Overpass ร้านอาหาร | มี แต่ hours บาง | ใกล้วัดโพธิ์ ได้ 20 ร้าน, cuisine=thai หลายรายการ |
| OSRM เวลาเดินทาง | ได้ แต่พิกัด mock เพี้ยน | ระยะสั้น 8–13 นาทีระหว่างจุดหลัก |
| เข้าสไลด์ Trip Coordinator | ได้ | ได้ — คงโครง Agent เดิม |

โครง Agent / ownership / JSON contract **ไม่เปลี่ยน** — เปลี่ยนเฉพาะเนื้อโจทย์และ mock

## โจทย์ภาษาไทย (canonical)

> เช้าอยากเที่ยววัดถ่ายรูปแถวเกาะรัตนโกสินทร์ (วัดโพธิ์หรือวัดอรุณ) นั่งชิลกับแฟน เที่ยงกินอาหารไทยรสดี บ่ายแวะซื้อของฝาก งบสองคนไม่เกิน 3,000 บาท กลับถึงที่พักย่านสีลมก่อน 20:00

## Hard / Soft

| ประเภท | รายการ |
|---|---|
| Hard | `total_cost <= 3000` |
| Hard | กิจกรรมเช้า (วัด/heritage) เริ่มก่อน 11:00 |
| Hard | ถึงจุดหมายตอนเปิดทำการ |
| Hard | กลับถึงสีลมก่อน 20:00 |
| Soft | อาหารไทย (`cuisine` thai) |
| Soft | ลดเวลาเดินทาง |
| Soft | บรรยากาศสงบ นั่งชิล (ไม่ใช้ wine/romantic เป็นหลัก) |

## แหล่งภายนอกที่จับคู่ได้

- Geocode: Nominatim (`วัดโพธิ์`, `วัดอรุณ`, `สีลม`)
- POI: Overpass restaurants/cafes รอบวัดโพธิ์
- Travel: OSRM (พิกัดอ้างอิงใน mock สอดคล้อง OSM)
- Weather: Open-Meteo (soft check outdoor เช้า)
- ราคา / ตั๋ววัดประมาณการ / บรรยากาศ: ยังเป็น mock + assumptions

## ไฟล์หลักที่สลับแล้ว

- `labs/lab-01-triage/scenarios/scenario-01-bangkok-rattanakosin.json`
- `shared/mock-data/*`
- `shared/contracts/*.example.json`
- Capstone mockup + Lab 4 memory + Lab 8 failure scenarios
- สไลด์ W1 memory ตัวอย่าง

สคริปต์ยืนยัน: `shared/scripts/probe-bangkok-scenario.py`  
Tool path (implementation): `shared/scripts/tools/` + `shared/prompts/tool-calling-rules.md`  
Smoke test: `node shared/scripts/tools/smoke-test.mjs`
