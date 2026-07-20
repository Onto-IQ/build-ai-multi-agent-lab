# Lab เสริม — A2A vs JSON Contract

**เวลา:** 15–25 นาที  
**สถานะ:** ไม่บังคับ — ไม่บล็อก Capstone  
**จังหวะแนะนำ:** หลัง Lab 10  
**คู่กับ:** [lab-optional-mcp-vs-cli](../lab-optional-mcp-vs-cli/README.md)

## วางชั้นให้ถูก

```text
MCP / สคริปต์ใน repo  = Agent → เครื่องมือ
A2A                   = Agent → Agent ข้ามระบบ
JSON contract         = ของส่งมอบ + ownership + ด่าน
คน / Flux             = มอบหมายงานในห้อง
```

คอร์สนี้**ไม่แทน**การส่งงานด้วยไฟล์ด้วย A2A  
A2A เป็นชั้นถัดไปเมื่ออยากให้ agent เรียกกันเอง

## เป้าหมาย

- แยก MCP / A2A / JSON contract ได้สั้น ๆ  
- เห็นว่า A2A เปลี่ยนช่องทางเรียก ไม่ยกเลิก schema / ownership / ด่าน  
- บันทึกใน learning-log

## Prerequisites

มีอย่างน้อยหนึ่งสัญญาใน `workspace/contracts/` จาก Lab หลัก (เช่น `role-cards.json` หรือ `handoff-fe.json`)  
หรืออ่านตัวอย่างใน `shared/contracts/`

## ขั้นตอน

1. Baseline: อธิบายการส่งงาน Frontend → Backend ด้วยไฟล์ handoff  
2. Track A (ถ้ามีเดโม): ลอง A2A 1 ครั้ง  
   Track B: ตอบ worksheet จากเอกสาร + ตัวอย่างใน `examples/`  
3. สรุปว่าทำไมเกณฑ์ผ่าน Lab หลักยังเป็นคน + สัญญาไฟล์ (+ Flux มอบหมาย)

## ไฟล์

- [`prompts/compare-worksheet.md`](prompts/compare-worksheet.md)
- [`examples/`](examples/) — ตัวอย่าง Agent Card / Task แบบ static (ปรับเป็นบทบาท Backend ของ Agent Cost Board ได้)

## เกณฑ์ผ่าน Lab เสริม

- [ ] แยกสามชั้นได้
- [ ] มีบันทึกใน learning-log
- [ ] ยอมรับว่า Lab หลักยังผ่านด้วยสัญญาไฟล์
