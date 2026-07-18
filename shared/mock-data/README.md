# Mock Data

ข้อมูลชุดนี้เป็นข้อมูลจำลองเพื่อให้ Lab ทำซ้ำได้ทุกคนและไม่ติด API key/quota ใช้ `source_mode: mock` ใน output เสมอ ห้ามนำข้อมูลจำลองไปแสดงต่อผู้ใช้เสมือนเป็นข้อมูลยืนยันจริง

**Scenario ปัจจุบัน:** Bangkok Rattanakosin day trip (วัดโพธิ์ / วัดอรุณ → อาหารไทย → ของฝาก → กลับสีลม)  
ดูรายละเอียดการตัดสินใจที่ `shared/research/SCENARIO-DECISION.md`

path จาก root ของ repository: `shared/mock-data/`

ไฟล์หลักคือ `activities.json`, `dining-options.json`, `travel-times.json` และ `souvenir-stops.json` พิกัดหลักจัดให้ใกล้ค่าจาก Nominatim/OSM; ราคาและบาง `closed_days` เป็น teaching fixtures

เส้นทางหลักของ Activity / Dining / Auditor: เรียก tool ใน `shared/scripts/tools/` (ดู `shared/prompts/tool-calling-rules.md`) แล้วเก็บผลใน `shared/mock-data/external-cache/` พร้อม `source`, `retrieved_at` และ `confidence`  

ใช้ CLI + cache โดยเจตนาเพื่อ**ลด rate limit** เมื่อทั้งห้องเรียก Overpass/Nominatim พร้อมกัน (มักเจอ HTTP 429)  
MCP/API สำเร็จรูปเปรียบเทียบได้ใน [`labs/lab-optional-mcp-vs-cli/`](../../labs/lab-optional-mcp-vs-cli/README.md) แต่ไม่ใช่เกณฑ์ผ่านหลัก  

ไฟล์ mock ในโฟลเดอร์นี้ยังจำเป็นสำหรับ **fallback** และฟิลด์ที่ API ไม่มี (เช่น ราคาประมาณการ)

ทดสอบ tool ทั้งชุด:

```bash
node shared/scripts/tools/smoke-test.mjs
```