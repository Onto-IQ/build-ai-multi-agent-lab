# Lab 10 — Kanban (Flux) สำหรับ Agent Cost Board

**Outline 12:** Collaboration Layer + Kanban  
**ลำดับงาน:** ทั้งเส้น Interview → Ship

## ได้รับมาจาก Lab ก่อน

- ทีม + ด่าน + แผงที่รวมแล้ว (Lab 05–09)
- role cards / handoff / audit / synthesize ใน workspace

## ได้เพิ่มใน Lab นี้

ตั้ง **Flux** เป็นบอร์ดงานของ**โปรเจกต์ Agent Cost Board** แล้วมอบหมายการ์ดให้ agent

## เป้าหมาย

มีบอร์ดจริง คอลัมน์ 5 ขั้น มอบหมายอย่างน้อย 3 การ์ดที่ตรงงานแอป

**จุดที่ควรรู้สึกว้าว:** การ์ดขยับตอนมอบหมายงานให้ agent

## ของที่ต้องเปิดก่อนเริ่ม

1. [`FLUX-SETUP.md`](FLUX-SETUP.md)
2. ค่า `FLUX_*` ใน `.env` (ถ้าห้องจัดให้)
3. ตัวอย่าง `shared/contracts/kanban-snapshot.example.json`

## ขั้นตอนทีละข้อ

1. ทำตาม `FLUX-SETUP.md` จนมีบอร์ดชื่อเกี่ยวกับ Agent Cost Board
2. สร้างคอลัมน์: Interview · Plan · Build · Test · Ship
3. สร้างอย่างน้อย 3 การ์ด เช่น:
   - ปรับ Frontend แสดงยอดใช้
   - เติม runs.json
   - รันด่านแล้วเตรียม Deploy
4. มอบหมายการ์ดให้บทบาท/เครื่องมือ (Claude Code และ/หรือ OpenCode)
5. เชื่อม MCP ตามคู่มือ Flux ถ้าห้องใช้กับ Claude Code / VS Code
6. วาง `prompts/01-kanban-snapshot.md` เขียน `workspace/contracts/kanban-snapshot.json`
7. จดลิงก์บอร์ดหรือ screenshot ใน learning-log

## ข้อความพร้อมวาง

[`prompts/01-kanban-snapshot.md`](prompts/01-kanban-snapshot.md)

## ผลที่คาดหวัง

- บอร์ดจริงของโปรเจกต์นี้
- kanban-snapshot ผ่าน validator
- เข้าใจว่าบอร์ดไม่ใช่แหล่งความจริงของต้นทุน — สัญญา JSON มาก่อน

## เกณฑ์ผ่าน Lab

- [ ] มีบอร์ด Flux (หรือที่ห้องเทียบเท่า) พร้อมคอลัมน์ 5 ขั้น
- [ ] มีอย่างน้อย 3 การ์ดมอบหมายให้ agent/role
- [ ] อธิบายได้ว่าบอร์ดไม่แทนที่สัญญา/ownership
- [ ] มี kanban-snapshot + หลักฐานบอร์ดใน learning-log

## ไม่ผ่านถ้า

ไม่มี Kanban board เลย

## ทางเลือกเมื่อเครื่องมือไม่พร้อม

Flux บัญชีไม่พร้อม — ใช้บอร์ด Kanban อื่นที่ห้องอนุญาต (เช่น Multica self-host) แต่ต้องมีคอลัมน์ 5 ขั้นและการ์ด ≥ 3 แล้วจดชื่อเครื่องมือใน snapshot

## แก้ปัญหาเบื้องต้น

| อาการ | ทำอะไร |
|---|---|
| ไม่มี API key | ขอวิทยากร หรือใช้โหมดที่ห้องเตรียม |
| การ์ดไม่เกี่ยวกับแอป | ลบแล้วสร้างใหม่ให้ตรง Agent Cost Board |
