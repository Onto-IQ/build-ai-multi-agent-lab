# Lab 05 — จากคนเดียวสู่ Frontend / Backend / QA

**Outline 7:** Solo → Multi-Agent roles  
**ลำดับงาน:** Plan → Build

## ได้รับมาจาก Lab ก่อน

- Specialist สองเครื่องมือ + สิทธิ์ + memory (Lab 01–04)
- โครงสร้างแอป Agent Cost Board

## ได้เพิ่มใน Lab นี้

ออกแบบ**ทีม 3 บทบาท**บนแอปเดียว (ยังไม่บังคับรันพร้อมกัน)

## เป้าหมาย

เขียน role cards ให้ Frontend / Backend / QA ไม่แย่งโฟลเดอร์กัน

**จุดที่ควรรู้สึกว้าว:** เห็น ownership ชัดก่อนรันทีมจริง

## ของที่ต้องเปิดก่อนเริ่ม

1. `apps/sample-dashboard/README.md`
2. `shared/contracts/role-cards.example.json`
3. (ถ้าเริ่ม Flux แล้ว) สร้างการ์ดเบา ๆ ได้ แต่บังคับครบที่ Lab 10

## ขั้นตอนทีละข้อ

1. อ่าน ownership ใน `AGENTS.md`
2. วาง `prompts/01-role-cards.md` ให้สร้าง `workspace/contracts/role-cards.json`
3. ตรวจด้วย validator
4. (ทางเลือก) วาง prompts ของแต่ละบทบาทเพื่อทดลองสั้น ๆ คนละครั้ง — ยังไม่ต้อง orchestration เต็ม
5. จด learning-log

## ข้อความพร้อมวาง

- [`prompts/01-role-cards.md`](prompts/01-role-cards.md)
- [`prompts/02-frontend-brief.md`](prompts/02-frontend-brief.md)
- [`prompts/03-backend-brief.md`](prompts/03-backend-brief.md)
- [`prompts/04-qa-brief.md`](prompts/04-qa-brief.md)

## ผลที่คาดหวัง

- `workspace/contracts/role-cards.json` มีอย่างน้อย 3 บทบาท ไม่ซ้ำโฟลเดอร์เขียน

## เกณฑ์ผ่าน Lab

- [ ] มี role cards (ชื่อ + หน้าที่ + ไฟล์ที่เขียนได้/ไม่ได้)
- [ ] ไม่มีสองบทบาทเขียนโฟลเดอร์เดียวกัน
- [ ] learning-log อัปเดต

## ทางเลือกเมื่อเครื่องมือไม่พร้อม

เขียน role-cards.json มือโดยคัดลอกจาก example แล้วแก้ชื่อเครื่องมือตามที่ห้องมี

## แก้ปัญหาเบื้องต้น

| อาการ | ทำอะไร |
|---|---|
| validator บอก roles < 3 | เพิ่มบทบาทให้ครบ Frontend / Backend / QA |
