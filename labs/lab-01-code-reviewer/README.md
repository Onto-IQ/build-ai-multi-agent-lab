# Lab 01 — Code Reviewer Agent (Claude Code)

**Outline 3:** Claude Code Specialist  
**ลำดับงาน:** Interview / Plan

## ได้รับมาจาก Lab ก่อน

- เครื่องพร้อมจาก [`SETUP.md`](../../SETUP.md) (Outline 2)
- กรอบคิดทีมจาก Outline 1
- แอปเริ่มต้น: `apps/sample-dashboard/` (Agent Cost Board)

## ได้เพิ่มใน Lab นี้

สร้าง **specialist Code Reviewer บน Claude Code** ที่รีวิวได้แต่**ห้ามแก้โค้ด** + สัญญา JSON แรก

## เป้าหมาย

ให้ Reviewer รีวิว `apps/sample-dashboard/frontend/` แล้วเขียนรายงานโดยไม่แก้ไฟล์แอป

**จุดที่ควรรู้สึกว้าว:** สั่งให้แก้โค้ดแล้วโดน deny / ปฏิเสธ

## ของที่ต้องเปิดก่อนเริ่ม

1. VS Code ที่ **root** ของ repo
2. [`CLAUDE.md`](../../CLAUDE.md) และ [`.claude/agents/code-reviewer.md`](../../.claude/agents/code-reviewer.md)
3. ตัวอย่างสัญญา: `shared/contracts/code-review.example.json`

## ขั้นตอนทีละข้อ

1. เปิด Terminal ที่ root แล้วตรวจว่ามี `.env`
2. เปิด Claude Code ที่ root ของโปรเจกต์นี้
3. ใช้ agent/definition จาก `.claude/agents/code-reviewer.md` (หรือวางข้อความจาก `prompts/01-review.md`)
4. สั่งรีวิว Frontend ตาม prompt
5. ให้เขียนผลไปที่ `workspace/contracts/code-review.json`
6. ลองสั่งให้ “แก้ไฟล์ frontend ให้หน่อย” — ต้องถูกปฏิเสธหรือ ask/deny
7. ตรวจสัญญา:

```powershell
node shared/scripts/validate-json.mjs workspace/contracts/code-review.json
```

8. จด `workspace/learning-log.md` สั้น ๆ

## ข้อความพร้อมวาง

ดู [`prompts/01-review.md`](prompts/01-review.md) และ [`prompts/02-deny-edit.md`](prompts/02-deny-edit.md)

## ผลที่คาดหวัง

- มี `workspace/contracts/code-review.json` โครงใกล้ [`expected/code-review.json`](expected/code-review.json)
- `edit_attempted` เป็น `false`
- Frontend ไฟล์เดิมไม่ถูกแก้โดย Reviewer

## เกณฑ์ผ่าน Lab

- [ ] มี agent/definition ระบุ role = Code Reviewer
- [ ] มี `workspace/contracts/code-review.json` ผ่าน validator
- [ ] พิสูจน์ได้ว่า agent ไม่แก้โค้ดให้เองเมื่อถูกสั่งแก้
- [ ] learning-log มีอย่างน้อย 1 ย่อหน้า

## ทางเลือกเมื่อเครื่องมือไม่พร้อม

ถ้า Claude Desktop/Teams ยังไม่พร้อม — วาง reviewer prompt ในไฟล์ แล้วรัน Claude Code CLI ที่ root

## แก้ปัญหาเบื้องต้น

| อาการ | ทำอะไร |
|---|---|
| หาไฟล์สัญญาไม่เจอ | สร้างโฟลเดอร์ `workspace/contracts/` แล้วคัดลอกจาก example |
| validator fail | เทียบฟิลด์กับ `shared/contracts/code-review.example.json` |
| agent แก้โค้ดอยู่ดี | ย้ำสิทธิ์ใน `.claude/agents/code-reviewer.md` และ settings |
