# JSON Contract Guide

ไฟล์ในโฟลเดอร์นี้คือจุดเชื่อมระหว่าง Claude Code และ OpenCode ทุก output ต้องเป็น JSON ที่อ่านได้และตรงกับ schema ที่ระบุ

ใช้คู่กับหลักสูตร Lab 5 / Lab 7 / Lab 9 และ Trip Step A–G ใน `docs/LAB-INSTRUCTIONS.md`

## Ownership

| Contract | Owner | Consumer |
|---|---|---|
| `trip-brief.json` | Claude Code / Triage | Activity, Dining, Auditor |
| `activity-options.json` | Claude Code / Activity | Auditor, Coordinator |
| `dining-options.json` | OpenCode / Dining | Auditor, Coordinator |
| `audit-result.json` | OpenCode / Auditor | Coordinator, Backup Agents |
| `final-itinerary.json` | Claude Code / Coordinator | Mockup, User |

## หลักการ

ทุก contract ต้องมี `schema_version`, `trip_id`, `generated_by`, `generated_at` และ `source_mode` เพื่อให้ตรวจย้อนกลับได้ ใช้ ISO 8601 สำหรับเวลาและ THB สำหรับเงิน ระบุข้อมูลที่เป็น mock data หรือข้อมูลจาก API ใน `source_mode` และ `sources`

คำสั่งตรวจ schema แบบพื้นฐาน:

```bash
node scripts/validate-json.mjs
```

ใน Lab ใช้ schema เป็นข้อตกลง ไม่ใช่แค่รูปแบบไฟล์ ตัวอย่างเช่น Auditor ต้องส่ง `violations` เมื่อไม่ผ่าน และ Coordinator ต้องไม่ประกาศว่า itinerary ยืนยันแล้วหากข้อมูลร้านหรือเวลาเป็น mock
