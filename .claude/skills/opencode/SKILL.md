---
name: opencode
description: เรียก OpenCode ข้าม harness แบบ headless one-shot (opencode run) เพื่อขอมุม backend/reviewer เช่น ตรวจสัญญา API ที่ฟอร์มจะยิง — ท่อคือไฟล์ใน docs/ ฝั่ง OpenCode เขียนได้เฉพาะไฟล์รายงานที่กำหนด
---

# opencode — call ข้าม harness (Claude → OpenCode)

ใช้เมื่องาน frontend/reviewer ต้องการ**มุม API / โครง SQLite / ความเห็น reviewer** จากฝั่ง OpenCode
แต่ละตัวยังรันบน harness ตนเอง — นี่คือ native-to-native ไม่ใช่ orchestration bus

## ขั้นตอน

1. เขียน prompt ลงไฟล์ชั่วคราว:

```powershell
@'
อ่านไฟล์ที่ระบุด้านล่าง แล้วเขียนรายงานภาษาไทยลงไฟล์เดียวที่กำหนด
ห้ามแก้ไฟล์อื่น — โดยเฉพาะ src/pages/ และ src/layouts/ (ownership ฝั่ง frontend)
'@ | Set-Content -Encoding utf8 .\docs\_call-opencode-prompt.md
```

2. รัน headless one-shot (OpenCode อ่าน prompt จากไฟล์):

```powershell
opencode run "Read docs/_call-opencode-prompt.md and the files it lists. Follow it exactly. Write only the single report file named there."
```

3. ใน prompt ต้องระบุ **ไฟล์รายงานเดียว** ที่ OpenCode เขียนได้ (เช่น `docs/fe-be-contract-check.md`)
4. อ่านรายงานกลับมาสรุปให้ผู้เรียน แล้วลบไฟล์ prompt ชั่วคราว · commit ไฟล์รายงานพร้อมงาน

## ข้อจำกัด

- **One-shot เท่านั้น** — ไม่วนซ้ำเอง ไม่สร้าง daemon/loop
- ห้ามส่ง secret / PAT / เนื้อหา `.env` ใน prompt
- OpenCode (callee) เขียนได้เฉพาะไฟล์รายงาน — ห้ามแตะ `src/pages/api/**`, `src/lib/db.ts` ของ caller
- ห้ามใช้ MCP เป็นท่อ Claude ↔ OpenCode
