# Prompt — Claude rebuttal (Lab 07)

คัดลอกเฉพาะบล็อกด้านล่างไปวางใน `claude`  
**(โพสต์ PR comment ด้วย `gh` — ตาม README)**

```text
อ่าน docs/review-opencode.md และ docs/DECISIONS.md
ถ้ามี docs/handoffs/07-opencode-to-claude.md — อ่านด้วย
อ่าน docs/STATUS.md · docs/OPEN_LOOPS.md ก่อนสรุป

งาน:
1. ตอบทีละ Must fix — แก้โค้ดหรือ rebut ด้วยเหตุผล
2. ถ้าแก้: ให้แน่ใจว่า npm run test:labs ยังเขียว
3. เขียน docs/review-claude-rebuttal.md — ยอมรับ / ปฏิเสธ / follow-up
4. ร่างข้อความสรุป round-trip ภาษาไทย 2–3 bullet ว่าทำไม cross-model คุ้ม (ฉันจะวางบน PR เอง)
5. ท้าย rebuttal ใส่หัวข้อ:

## Canonical state updated
- [ ] docs/STATUS.md
- [ ] docs/OPEN_LOOPS.md
- [ ] docs/DECISIONS.md (ถ้ามี decision ใหม่)

และติ๊กตามที่อัปเดตจริง (single-writer รอบนี้)

ห้ามเรียกหรือ orchestrate opencode
ห้ามใช้ MCP เป็นท่อไป CLI อื่น
```
