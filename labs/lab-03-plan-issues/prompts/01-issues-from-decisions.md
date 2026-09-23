# Prompt — สร้าง GitHub issues จาก DECISIONS (Lab 03)

คัดลอกเฉพาะบล็อกด้านล่างไปวางใน `claude`  
**(ตรวจ PAT / MCP / `gh` — ตาม README ก่อนเริ่ม)**

```text
เป้าหมาย: แปลง docs/DECISIONS.md เป็น GitHub issues ใน repo นี้เท่านั้น

ขั้นตอน:
1. อ่าน docs/DECISIONS.md และ docs/PROFILE.md
2. ใช้ GitHub MCP สร้าง issue อย่างน้อย 4 อัน จากแถว D1–D6 (รวมหรือแยกตามความเหมาะสม)
   - title ขึ้นต้น [Lab 03] หรืออ้าง D-id เช่น [D2] Guestbook scope
   - body: เกณฑ์ผ่าน bullet, ลิงก์ docs/DECISIONS.md, acceptance checklist
   - label: ใช้ที่มีใน repo ถ้ามี (enhancement, docs)
3. อย่าแก้ issues ของ Onto-IQ template upstream
4. สรุปตาราง | Issue # | Title | มาจาก Decision | ลงท้าย docs/DECISIONS.md หรือรายงานในแชท

ถ้า MCP ได้ 401: หยุดทันที แจ้งว่าต้องตรวจ PAT — อย่าเดาว่าสร้างสำเร็จ
ห้ามใส่ secret / PAT ใน issue body
```
