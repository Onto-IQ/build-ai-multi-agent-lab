# Prompt — Backend guestbook (Lab 05 · OpenCode)

รันใน **OpenCode 2.0.6+** ที่ root repo สินค้า

```text
เป้าหมาย Lab 05: implement insertContact / guestbook SQLite ตาม course stubs จน npm run test:labs เขียว

อ่าน:
- course/ tests ที่เกี่ยว (guestbook, contact)
- docs/DECISIONS.md (D ที่เกี่ยว guestbook)
- AGENTS.md / CLAUDE.md ใน repo ถ้ามี

งาน:
1. ทำให้ API route / server handler บันทึก guestbook ลง SQLite (better-sqlite3)
2. ไม่ log secret · validate input · ข้อความ error ปลอดภัย
3. รัน npm run test:labs จน green
4. เปิด PR — ระบุว่า ownership Backend / OpenCode

ทางเลือก plugin: oh-my-openagent@4.19.4 — ถ้าติดตั้งไม่ได้ ใช้ native @ subagents

ห้ามแก้ UI นอก scope test ยกเว้นจำเป็นสำหรับฟอร์ม contact
ห้ามใช้ MCP เรียก Claude แทนการ implement
```
