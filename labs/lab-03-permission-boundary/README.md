# Lab 03 — Permission Boundary

**Outline 5:** Permission Boundary  
**ลำดับงาน:** Plan / Build

## ได้รับมาจาก Lab ก่อน

- Agent บน Claude Code และ/หรือ OpenCode (Lab 01–02)
- ไฟล์ตั้งค่าเริ่มต้น: `.claude/settings.json`

## ได้เพิ่มใน Lab นี้

ตั้ง**ขอบเขตสิทธิ์** (ask / allow / deny) แล้วพิสูจน์ว่าคำสั่งอันตรายถูกกัน

## เป้าหมาย

จำกัดสิทธิ์ไม่ให้ `git push` และไม่ให้ลบโฟลเดอร์ `shared/` แล้วทดสอบสั่งของต้องห้าม

**จุดที่ควรรู้สึกว้าว:** สั่งของต้องห้ามแล้วโดนบล็อก — ล้มโดยเจตนาแล้วเรียนรู้

## ของที่ต้องเปิดก่อนเริ่ม

1. [`.claude/settings.json`](../../.claude/settings.json)
2. [`starters/permission-notes.md`](starters/permission-notes.md)

## ขั้นตอนทีละข้อ

1. อ่านและปรับ `.claude/settings.json` (หรือเทียบเท่าบน OpenCode) ให้ deny ตาม starters
2. วาง `prompts/01-forbidden-git-push.md`
3. วาง `prompts/02-forbidden-delete-shared.md`
4. บันทึกผล (ask / deny / ข้อความที่ขึ้น) ใน learning-log
5. เขียน best-practice 3 ข้อสั้น ๆ

## ข้อความพร้อมวาง

- [`prompts/01-forbidden-git-push.md`](prompts/01-forbidden-git-push.md)
- [`prompts/02-forbidden-delete-shared.md`](prompts/02-forbidden-delete-shared.md)

## ผลที่คาดหวัง

- มี permission config ใน repo ที่อ่านได้
- มีหลักฐานว่าคำสั่งต้องห้ามไม่ผ่านแบบเงียบ ๆ

## เกณฑ์ผ่าน Lab

- [ ] มี permission config ใน repo
- [ ] ทดสอบของต้องห้ามอย่างน้อย 2 ข้อแล้วบันทึกผล
- [ ] learning-log มี best-practice 3 ข้อ

## ทางเลือกเมื่อเครื่องมือไม่พร้อม

ถ้าเครื่องมือยังไม่ enforce deny จริง — จำลองโดยให้ agent อ่าน starters แล้วตอบว่าจะปฏิเสธ และจดว่าใน production ต้องผูก settings จริง

## แก้ปัญหาเบื้องต้น

| อาการ | ทำอะไร |
|---|---|
| สั่งแล้วทำได้เลย | ตรวจ path ของ settings ที่ root และรีสตาร์ท session |
| ไม่รู้จะ deny อะไร | ใช้รายการใน `starters/permission-notes.md` |
