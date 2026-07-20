# Lab 07 — Multi-Agent on OpenCode (ลำดับ)

**Outline 9:** Multi-Agent on OpenCode  
**ลำดับงาน:** Build → Test

## ได้รับมาจาก Lab ก่อน

- role cards + handoff จาก Lab 05–06
- OpenCode specialist จาก Lab 02

## ได้เพิ่มใน Lab นี้

รันทีมบน OpenCode แบบ**ลำดับ** Frontend → Backend → QA

## เป้าหมาย

เห็นลำดับชัดบน Agent Cost Board และให้ QA ใช้เช็กลิสต์จริง

**จุดที่ควรรู้สึกว้าว:** FE → BE → QA เห็นคิวงานชัด

## ของที่ต้องเปิดก่อนเริ่ม

1. `apps/sample-dashboard/qa/CHECKLIST.md`
2. prompts ทั้ง 3 ไฟล์ในโฟลเดอร์นี้

## ขั้นตอนทีละข้อ

1. รันตามลำดับด้วยมือ (หรือ plugin ถ้าห้อง pin ไว้)
2. วาง `prompts/01-frontend.md` แล้วรอจบ
3. วาง `prompts/02-backend.md`
4. วาง `prompts/03-qa.md`
5. ให้ Backend เติมรอบลง `runs.json` อย่างน้อย 1 รายการจากงานจริง
6. เขียน `handoff-be.json` ถ้ายังไม่มี
7. จดว่าใช้ plugin หรือลำดับมือ

## ข้อความพร้อมวาง

- [`prompts/01-frontend.md`](prompts/01-frontend.md)
- [`prompts/02-backend.md`](prompts/02-backend.md)
- [`prompts/03-qa.md`](prompts/03-qa.md)

## ผลที่คาดหวัง

- มีการเปลี่ยนแปลงตาม ownership คนละโฟลเดอร์
- QA อ้างอิง CHECKLIST.md
- learning-log ระบุ plugin หรือ manual sequential

## เกณฑ์ผ่าน Lab

- [ ] มีลำดับ Frontend → Backend → QA ที่ทำจริง
- [ ] QA ใช้ `apps/sample-dashboard/qa/CHECKLIST.md`
- [ ] learning-log ระบุวิธีรัน

## ทางเลือกเมื่อเครื่องมือไม่พร้อม

ติดตั้ง plugin ไม่ได้ → รันลำดับมือตาม prompts นี้ยังผ่าน

## แก้ปัญหาเบื้องต้น

| อาการ | ทำอะไร |
|---|---|
| ทำพร้อมกันแล้วไฟล์ชน | กลับไปทำทีละ prompt ตามลำดับ |
