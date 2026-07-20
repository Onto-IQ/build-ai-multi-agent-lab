# Lab 09 — Synthesizer

**Outline 11:** Synthesize Pattern  
**ลำดับงาน:** Test → Ship

## ได้รับมาจาก Lab ก่อน

- โมดูล Frontend / Backend ที่ทีมสร้าง + ด่านจาก Lab 08
- `audit-result` ที่เคย FAIL แล้ว PASS

## ได้เพิ่มใน Lab นี้

สร้าง **Synthesizer** รวมผลให้เปิดแผง Agent Cost Board ดูสถานะและรอบรันได้จริง

## เป้าหมาย

เปิด `frontend/index.html` แล้วเห็นข้อมูลจาก backend

**จุดที่ควรรู้สึกว้าว:** รวมแล้วเปิดดูได้ ไม่ใช่แค่ไฟล์แยก

## ของที่ต้องเปิดก่อนเริ่ม

1. `apps/sample-dashboard/frontend/index.html`
2. `shared/contracts/synthesize-report.example.json`

## ขั้นตอนทีละข้อ

1. ตรวจว่า `status.json` เป็น ok และ `runs.json` มีข้อมูล
2. รัน `node shared/scripts/gate-quality.mjs` ให้ผ่าน
3. วาง `prompts/01-synthesize.md`
4. เปิดหน้าเว็บ (ดับเบิลคลิก หรือ Live Server / static server สั้น ๆ)
5. เขียน `workspace/contracts/synthesize-report.json`
6. จดผลใน learning-log

## ข้อความพร้อมวาง

[`prompts/01-synthesize.md`](prompts/01-synthesize.md)

## ผลที่คาดหวัง

- แผงแสดงสถานะและตารางรอบได้
- มี synthesize-report ผ่าน validator

ดู [`expected/synthesize-report.json`](expected/synthesize-report.json)

## เกณฑ์ผ่าน Lab

- [ ] มี synthesizer prompt หรือ agent
- [ ] แอปแสดงสถานะจาก backend ได้ หรือมีบันทึกเหตุผลพร้อมแผนแก้
- [ ] มี synthesize-report ใน workspace

## ทางเลือกเมื่อเครื่องมือไม่พร้อม

เปิดไฟล์ผ่าน browser ตรง ๆ ไม่ได้เพราะ fetch จำกัด — ใช้ VS Code Live Preview หรือ `npx serve` ที่โฟลเดอร์แอป

## แก้ปัญหาเบื้องต้น

| อาการ | ทำอะไร |
|---|---|
| หน้าเว็บว่าง | เปิด DevTools ดูว่า fetch `../backend/*.json` พังหรือไม่ |
| gate ไม่ผ่าน | กลับไป Lab 08 ก่อน |
