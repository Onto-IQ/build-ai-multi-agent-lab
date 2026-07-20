# Lab 11 — Capstone (ครบสูตร + Deploy)

**Outline 13:** Capstone  
**ลำดับงาน:** Ship

## ได้รับมาจาก Lab ก่อน

- ทั้งบันได Lab 01–10: specialist, สิทธิ์, memory, ทีมสองเครื่องมือ, ด่าน, รวมผล, Flux
- บอร์ด Flux ของ Agent Cost Board

## ได้เพิ่มใน Lab นี้

ประกอบทุกชั้นแล้ว **Deploy & Share** + สูตรนำไปใช้กับบอร์ดงานอื่น

## เป้าหมาย

มี URL สาธารณะ บอร์ดถึงคอลัมน์ Ship และบันทึกต้นทุนที่เล่าต่อได้

**จุดที่ควรรู้สึกว้าว:** แชร์ลิงก์แผงของตัวเองในห้องได้

## ของที่ต้องเปิดก่อนเริ่ม

1. Pre-flight ด้านล่าง
2. `shared/contracts/capstone-ship.example.json`

## Pre-flight (ติ๊กก่อน Deploy)

- [ ] Ownership Frontend / Backend / QA ชัด (role-cards)
- [ ] ด่านคุณภาพเคย FAIL และเคย PASS
- [ ] Flux มีการ์ดถึงคอลัมน์ใกล้ Ship
- [ ] Synthesize แล้วเปิดแผงได้
- [ ] บันทึกต้นทุน: ใช้ Subagents หรือ Teams เพราะอะไร

## ขั้นตอนทีละข้อ

1. เลื่อนการ์ดบน Flux ชุดเดิมไป Ship เมื่อด่านผ่าน
2. Deploy `apps/sample-dashboard/frontend` (หรือตามที่โฮสต์รับ) ขึ้น **Vercel** หรือ **Netlify** (~5 นาที)
3. คัดลอก public URL
4. วาง `prompts/01-capstone-ship.md` เขียน `workspace/contracts/capstone-ship.json`
5. แชร์ลิงก์ให้เพื่อนในห้องอย่างน้อย 1 คน
6. Git พื้นฐาน: `status` → `add` → `commit` อย่างน้อย 1 ครั้ง (push ถ้ามี remote ห้องเรียน)
7. จดสูตรนำไปใช้ใน learning-log (ด้านล่าง)

## สูตรนำไปใช้ (ใส่ใน learning-log)

```text
สร้างบอร์ด Flux ใหม่
  → แตกการ์ด + บทบาท
  → มอบหมาย Claude Code และ/หรือ OpenCode
  → ส่งงานด้วยสัญญา JSON + สิทธิ์เขียนไฟล์
  → ด่านคุณภาพ/ต้นทุน แล้วค่อย Ship
```

## ข้อความพร้อมวาง

[`prompts/01-capstone-ship.md`](prompts/01-capstone-ship.md)

## ผลที่คาดหวัง

- URL เปิดได้
- capstone-ship ผ่าน validator
- พร้อมนำเสนอ 5 นาที: ปัญหา / ด่าน / สิ่งที่บอกต่อ

## เกณฑ์ผ่าน Lab

- [ ] Pre-flight ผ่าน
- [ ] มี public URL
- [ ] มีบันทึกต้นทุน + หลักฐานบอร์ด
- [ ] มี `capstone-ship.json`
- [ ] นำเสนอได้สั้น ๆ

## ทางเลือกเมื่อเครื่องมือไม่พร้อม

Vercel/Netlify ล็อกอินไม่ได้ — ใช้ static host ที่ห้องเตรียม หรือแชร์ zip + บันทึกเหตุผล (ถามวิทยากรว่าผ่านแทนได้หรือไม่)

## แก้ปัญหาเบื้องต้น

| อาการ | ทำอะไร |
|---|---|
| หน้า deploy เปล่า | ตรวจว่าอัปโหลดโฟลเดอร์ frontend ถูก และ path JSON ยังชี้ backend ได้หรือต้องปรับโฮสต์ |
| ไม่มี gate PASS | กลับ Lab 08 |
