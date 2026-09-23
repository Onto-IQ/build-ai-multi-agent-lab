# Handoffs

ส่งต่องานข้าม Claude ↔ OpenCode (และข้าม Lab) ด้วยไฟล์ในโฟลเดอร์นี้ — ไม่ใช้แชทหรือ MCP เป็นท่อ

## Handoff file vs Pull Request (ไม่ทับกัน)

| | **Handoff** (`docs/handoffs/*.md`) | **Pull Request** (GitHub) |
|---|---|---|
| หน้าที่ | สรุปสั้นให้ **agent/CLI ถัดไป** เริ่มงานได้ทันที | สัญญาโค้ด: diff · review · merge · acceptance |
| ผู้อ่านหลัก | Claude / OpenCode / คุณตอนสลับ harness | เพื่อนในห้อง · วิทยากร · CI · ประวัติบน GitHub |
| ใส่เมื่อไหร่ | ก่อนสลับ CLI หรือส่งต่อ Lab (เช่น 04→05) | เมื่อพร้อมให้รีวิว/รวมโค้ด (Lab 04, 05, 07) |
| แทนกันได้ไหม | **ไม่ได้** — PR ไม่บอก “Request to next agent” ชัดเสมอ | **ไม่ได้** — handoff ไม่ใช่หลักฐาน merge |

**ลำดับที่ถูกต้อง:** ทำงาน → อัปเดต STATUS/OPEN_LOOPS → เขียน handoff (ถ้าสลับ harness) → **commit** → เปิด/อัปเดต PR ตาม Lab  
PR body อาจ**อ้าง** path handoff ได้ แต่ไม่ต้องคัดลอกทั้งก้อนซ้ำ

1. คัดลอก [`TEMPLATE.md`](TEMPLATE.md)
2. ตั้งชื่อเช่น `04-claude-to-opencode.md` · `07-opencode-to-claude.md`
3. อัปเดต `docs/STATUS.md` + `docs/OPEN_LOOPS.md` ให้ตรงกับ handoff
4. **Commit ก่อนสลับ harness** (ดู Lab 04 / 05 / 07)

เกณฑ์: อีกฝั่งอ่าน handoff + Hot state แล้วทำต่อได้โดยไม่ต้องถามคุณเล่าใหม่
