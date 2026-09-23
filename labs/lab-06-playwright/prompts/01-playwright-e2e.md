# Prompt — Playwright MCP E2E (Lab 06)

คัดลอกเฉพาะบล็อกด้านล่างไปวางใน `claude`  
**(ต้องมี `npm run dev` รันอยู่แล้วใน terminal อีกอัน — ตาม README)**

```text
เป้าหมาย: ทดสอบ E2E บน http://localhost:4321 (หรือ PORT ใน .env) ด้วย Playwright MCP

ใช้ Playwright MCP:
1. เปิด Home — ตรวจ displayName/headline จาก PROFILE ปรากฏ
2. ไป About, Interests, Contact — ไม่มี 404
3. ส่งฟอร์ม contact/guestbook ด้วยข้อมูล demo — บันทึกผล (success หรือ error ที่คาด)
4. Screenshot อย่างน้อย 2 หน้า — เก็บใน docs/screenshots/ (สร้างโฟลเดอร์ถ้ายังไม่มี)

เขียนผลลง docs/QA.md หัวข้อ ## E2E Playwright (ตาราง step / result)
อย่าแก้ src/ ในรอบนี้ยกเว้นฉันขอให้แก้หลัง a11y
```
