# Lab 06 — Multi-Agent on Claude Code

**Outline 8:** Multi-Agent on Claude Code  
**ลำดับงาน:** Build

## ได้รับมาจาก Lab ก่อน

- `workspace/contracts/role-cards.json` (Lab 05)
- สิทธิ์ + memory + specialist Claude

## ได้เพิ่มใน Lab นี้

**รันหลาย agent บน Claude Code** (ลอง Agent Teams — ถ้าไม่ขึ้นใช้ Subagents) + ส่งงานด้วยสัญญา

## เป้าหมาย

ให้ทีมช่วยงาน Agent Cost Board บน Claude โดยแยก context และไม่แย่งไฟล์

**จุดที่ควรรู้สึกว้าว:** หลายตัวทำงานโดยมีสัญญาชัด

## ของที่ต้องเปิดก่อนเริ่ม

1. `.env` มี `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` (สำหรับลอง Teams)
2. `role-cards.json`
3. ตัวอย่าง `shared/contracts/handoff-fe.example.json`

## ขั้นตอนทีละข้อ

1. อ่าน role cards
2. ลองเปิด Agent Teams ตามที่ห้องสอน — ทีม ≤ 3–4
3. ถ้า Teams ไม่ขึ้น → ใช้ Subagents (Researcher / Reviewer / Tester หรือ Frontend/Backend/QA)
4. วาง `prompts/01-teams-or-subagents.md`
5. ให้เขียน `workspace/contracts/handoff-fe.json` และ/หรือ `handoff-be.json`
6. จด learning-log ว่าเลือก Teams หรือ Subagents เพราะอะไร (บันทึกต้นทุน)

## ข้อความพร้อมวาง

- [`prompts/01-teams-or-subagents.md`](prompts/01-teams-or-subagents.md)
- [`prompts/02-handoff.md`](prompts/02-handoff.md)

## ผลที่คาดหวัง

- มีหลักฐานรัน Teams หรือ Subagents
- มีไฟล์ handoff อย่างน้อย 1 ไฟล์ผ่าน validator

## เกณฑ์ผ่าน Lab

- [ ] มีหลักฐานรัน Teams หรือ Subagents
- [ ] learning-log ระบุว่าเลือกแบบไหนเพราะอะไร
- [ ] ไม่แย่งไฟล์คนละ ownership
- [ ] มี handoff contract

## ทางเลือกเมื่อเครื่องมือไม่พร้อม

Teams ล่ม → Subagents ผ่าน Lab ได้ถ้ามีสัญญา + ผลงานตาม ownership

## แก้ปัญหาเบื้องต้น

| อาการ | ทำอะไร |
|---|---|
| Teams ไม่เปิด | ตรวจ `.env` flag แล้วสลับ Subagents |
| ไฟล์ชนกัน | ย้ำ role-cards และให้เขียนแค่โฟลเดอร์ตัวเอง |
