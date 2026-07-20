# Lab 08 — Quality Gate + Cost Gate

**Outline:** The Gate Pattern & AI Guardrails  
**Workflow stage:** Test  
**Wow:** ตั้งใจให้พัง แล้ว Gate หยุด — ประหยัด token ชัดเจน

## Goal

สร้างด่านคุณภาพและด่านต้นทุน

| Gate | ตัวอย่าง |
|---|---|
| Quality | validate JSON / checklist QA แดงแล้วห้าม Ship |
| Cost / Stop | refinement ≤ 2 รอบ หรือหยุดเมื่อ error ซ้ำ |
| Hooks (แนวคิด) | รันตรวจอัตโนมัติก่อนผ่านด่าน |

## Steps

1. ทำให้ Quality Gate จับ error ได้ (เช่น status.json พังโดยเจตนา)
2. ตั้ง Cost/Stop: สูงสุด 2 รอบแล้ว escalate คน
3. บันทึก violations ใน `workspace/contracts/audit-result.json` หรือ learning-log

## Definition of Done

- [ ] มี Quality Gate ที่ fail ได้จริง
- [ ] มี Cost/Stop ที่หยุดได้จริง
- [ ] Human-in-the-loop ถูกระบุเมื่อไหร่ต้องถามคน

## Legacy

`labs/_legacy-trip/lab-08-stop-condition/`
