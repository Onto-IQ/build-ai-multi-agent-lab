# Prompt — Backend guestbook (Lab 05 · OpenCode)

คัดลอกเฉพาะบล็อกด้านล่างไปวางใน `opencode`  
**(ติดตั้ง oh-my / เปิด TUI / เปิด PR — ตาม README)**

```text
เป้าหมาย: implement insertContact / guestbook SQLite ตาม course stubs จน npm run test:labs เขียว

อ่านก่อน (ห้ามสมมุติจากแชท Claude):
- docs/handoffs/04-claude-to-opencode.md (ถ้ามี)
- docs/STATUS.md · docs/OPEN_LOOPS.md
- course/ tests ที่เกี่ยว (guestbook, contact)
- docs/DECISIONS.md (D ที่เกี่ยว guestbook)
- AGENTS.md ใน repo ถ้ามี

งาน:
1. ทำให้ API route / server handler บันทึก guestbook ลง SQLite (better-sqlite3)
2. ไม่ log secret · validate input · ข้อความ error ปลอดภัย
3. รัน npm run test:labs จน green
4. เตรียมข้อความ PR — ระบุ ownership Backend / OpenCode + วิธีรัน test
5. อัปเดต docs/STATUS.md + docs/OPEN_LOOPS.md (single-writer รอบนี้ = OpenCode/คุณ)

ห้ามแก้ UI นอก scope test ยกเว้นจำเป็นสำหรับฟอร์ม contact
ห้ามแก้ไฟล์ test ให้ผ่านโดยไม่ implement จริง
ห้ามใช้ MCP เรียก Claude แทนการ implement
```
