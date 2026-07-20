# Lab 08 — ด่านคุณภาพ + ด่านต้นทุน

**Outline 10:** Gate / Guardrails  
**ลำดับงาน:** Test

## ได้รับมาจาก Lab ก่อน

- ผลงาน Frontend / Backend / QA จาก Lab 05–07
- สคริปต์ `shared/scripts/gate-quality.mjs` และ `gate-cost.md`

## ได้เพิ่มใน Lab นี้

ตั้ง**ด่านคุณภาพ**และ**ด่านต้นทุน** — ตั้งใจให้พังแล้วให้ด่านจับได้ แล้วแก้ให้ผ่านภายใน 2 รอบ

## เป้าหมาย

ทำให้ Quality Gate จับ error ได้ และหยุดปรับแก้เมื่อเกิน 2 รอบ

**จุดที่ควรรู้สึกว้าว:** ตั้งใจให้พัง แล้วด่านหยุด — ประหยัดโทเคนชัด

## ของที่ต้องเปิดก่อนเริ่ม

1. `apps/sample-dashboard/backend/status.broken.json`
2. `shared/scripts/gate-cost.md`
3. ตัวอย่าง `shared/contracts/audit-result.example.json`

## ขั้นตอนทีละข้อ

1. สำรอง `status.json` แล้วคัดลอก `status.broken.json` ทับ `status.json` (ตั้งใจให้พัง)
2. รัน:

```powershell
node shared/scripts/gate-quality.mjs
```

ต้องเห็น FAILED

3. วาง `prompts/01-auditor-fail.md` ให้เขียน `workspace/contracts/audit-result.json` สถานะ FAIL
4. แก้กลับให้ `status.json` ถูกต้อง (รอบที่ 1–2 เท่านั้น)
5. รัน gate อีกครั้งจน PASSED
6. อัปเดต audit-result เป็น PASS
7. จดว่าถ้าจะมีรอบที่ 3 ต้องถามคน

## ข้อความพร้อมวาง

- [`prompts/01-auditor-fail.md`](prompts/01-auditor-fail.md)
- [`prompts/02-fix-and-recheck.md`](prompts/02-fix-and-recheck.md)

## ผลที่คาดหวัง

- มีประสบการณ์ FAIL แล้ว PASS
- `audit-result.json` ผ่าน validator
- เคารพ max 2 รอบ

ดูตัวอย่างโครงที่ [`expected/audit-result.fail.json`](expected/audit-result.fail.json)

## เกณฑ์ผ่าน Lab

- [ ] มี Quality Gate ที่ fail ได้จริง
- [ ] มี Cost/Stop ที่หยุดได้จริง (ไม่เกิน 2 รอบ หรือ escalate คน)
- [ ] ระบุใน learning-log ว่าเมื่อไหร่ต้องถามคน
- [ ] มี `audit-result.json`

## ทางเลือกเมื่อเครื่องมือไม่พร้อม

รัน gate-quality.mjs ไม่ได้เพราะ Node พัง — ตรวจ status.json ด้วยตาตามกฎใน CHECKLIST แล้วยังต้องมี audit-result

## แก้ปัญหาเบื้องต้น

| อาการ | ทำอะไร |
|---|---|
| ลืมคืน status.json | คัดลอกจาก git หรือใส่ status=ok มือ |
| FAIL แต่ violations ว่าง | ใส่รายการผิดกฎอย่างน้อย 1 ข้อใน audit-result |
