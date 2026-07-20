# Lab 03 — Permission Boundary

**Outline:** Permission Boundary  
**Workflow stage:** Plan / Build  
**Wow:** สั่งของต้องห้ามแล้วโดนบล็อก — FAIL โดยเจตนา

## Goal

กำหนดขอบเขตสิทธิ์ agent (ask / allow / deny) และพิสูจน์ว่าคำสั่งต้องห้ามถูกกัน

## Steps

1. จำกัดสิทธิ์ agent ไม่ให้ `git push`, ไม่ให้ลบโฟลเดอร์ `shared/`
2. สั่งให้ทำสิ่งต้องห้ามอย่างน้อย 2 ข้อ
3. บันทึกผล (ถูก ask / deny) ใน learning-log

## Definition of Done

- [ ] มี permission config ที่อ่านได้ใน repo
- [ ] มีหลักฐานว่าคำสั่งต้องห้ามไม่ผ่านแบบเงียบ ๆ
- [ ] Best-practice 3 ข้อสั้น ๆ ใน learning-log

## Legacy

`labs/_legacy-trip/lab-03-permission/`
