# Lab เสริม — MCP / เครื่องมือสำเร็จรูป vs คำสั่งใน repo

**เวลา:** 15–25 นาที  
**สถานะ:** ไม่บังคับ — ไม่บล็อก Lab หลัก  
**จังหวะแนะนำ:** หลัง Lab 02 หรือ Lab 08  
**เครื่องมือ:** Claude Code และ/หรือ OpenCode + (ทางเลือก) MCP 1 ตัว

## ทำไมคอร์สยึดคำสั่งใน repo เป็นค่าเริ่มต้น

1. ทั้งห้องรัน path เดียวกันได้ (`validate-json`, `gate-quality`)  
2. ไม่บังคับ API key / MCP setup คนละเครื่อง  
3. JSON contract ยังเป็นแกนส่งงาน  
4. Agent Cost Board ใช้ไฟล์ใน `apps/sample-dashboard/backend/` เป็นแหล่งข้อมูลทีมตัวเอง

## เป้าหมาย

- เทียบ MCP สำเร็จรูป กับคำสั่งใน `shared/scripts/`
- บันทึกข้อดี–ข้อเสียใน `workspace/learning-log.md`

## ขั้นตอน

### 1) Baseline (บังคับ)

```powershell
node shared/scripts/validate-json.mjs
node shared/scripts/gate-quality.mjs
```

### 2) ลองทางเลือก (อย่างน้อยหนึ่งอย่าง)

- ต่อ MCP ที่ห้องอนุญาต แล้วให้ agent อ่าน/สรุป `runs.json`  
หรือ  
- อ่านเอกสาร MCP แล้วตอบ worksheet โดยไม่ต่อของจริง

### 3) ตอบ worksheet

ดู [`prompts/compare-worksheet.md`](prompts/compare-worksheet.md)

## เกณฑ์ผ่าน Lab เสริม

- [ ] รัน baseline คำสั่งใน repo ได้
- [ ] มีบันทึกเทียบ MCP vs คำสั่งใน repo ใน learning-log
- [ ] ยอมรับว่าเกณฑ์ผ่าน Lab หลักยังเป็นสัญญาไฟล์ + สคริปต์ใน repo

## อย่าทำ

อย่าทำให้ Lab 01–11 พึ่ง MCP เป็นทางเดียว
