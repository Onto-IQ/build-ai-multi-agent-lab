# Lab 02 — OpenCode Specialist + เทียบ Claude Code

**Outline 4:** OpenCode Setup & Multi-model  
**ลำดับงาน:** Plan

## ได้รับมาจาก Lab ก่อน

- Code Reviewer บน Claude Code + `workspace/contracts/code-review.json` (Lab 01)
- กฎโปรเจกต์ใน `CLAUDE.md` / `AGENTS.md`

## ได้เพิ่มใน Lab นี้

ติดตั้ง/ใช้ **OpenCode** สร้าง specialist และทำตารางเทียบสองเครื่องมือ

## เป้าหมาย

ให้มี agent บน OpenCode ทำงานกับ Agent Cost Board ได้ และเปรียบเทียบกับ Lab 01

**จุดที่ควรรู้สึกว้าว:** เห็นตารางเทียบ model / สิทธิ์ / multi-agent / ต้นทุน ในหน้าเดียว

## ของที่ต้องเปิดก่อนเริ่ม

1. [`SETUP.md`](../../SETUP.md) ส่วน OpenCode
2. [`.opencode/agents/specialist.md`](../../.opencode/agents/specialist.md)
3. ผล Lab 01 (ถ้ามี)

## ขั้นตอนทีละข้อ

1. ตรวจ `opencode` ใน Terminal (Task: `env-checklist`)
2. เปิดโปรเจกต์นี้ด้วย OpenCode ตามที่ห้องสอน
3. ใช้หรือคัดลอก `.opencode/agents/specialist.md`
4. วางข้อความจาก `prompts/01-opencode-specialist.md` ให้ specialist อ่าน Frontend แล้วสรุป 5 บรรทัด
5. วาง `prompts/02-compare-table.md` แล้วให้เขียนตารางเทียบลง `workspace/learning-log.md`
6. (ถ้าห้องมี multi-model) สลับโมเดลหนึ่งครั้งแล้วจดผล

## ข้อความพร้อมวาง

- [`prompts/01-opencode-specialist.md`](prompts/01-opencode-specialist.md)
- [`prompts/02-compare-table.md`](prompts/02-compare-table.md)

## ผลที่คาดหวัง

- มีการใช้ OpenCode agent ในโปรเจกต์นี้
- learning-log มีตารางเทียบอย่างน้อย 4 แถว: model, สิทธิ์, multi-agent, ต้นทุน

## เกณฑ์ผ่าน Lab

- [ ] OpenCode ทำงานได้ในโปรเจกต์นี้
- [ ] มีตารางเทียบ Claude Code vs OpenCode ใน learning-log
- [ ] อัปเดต learning-log แล้ว

## ทางเลือกเมื่อเครื่องมือไม่พร้อม

ถ้าติดตั้ง OpenCode ไม่ทัน — เขียนตารางเทียบจากเอกสาร/เดโม่วิทยากร + จดว่าจะติดตั้งเมื่อไหร่ (ยังต้องมีตาราง)

## แก้ปัญหาเบื้องต้น

| อาการ | ทำอะไร |
|---|---|
| `opencode` missing | กลับไป SETUP + ขอวิทยากร |
| หา agents ไม่เจอ | ตรวจโฟลเดอร์ `.opencode/agents/` ที่ root |
