# Prompt — OpenCode review Claude PR (Lab 07)

คัดลอกเฉพาะบล็อกด้านล่างไปวางใน `opencode`  
**(ดึง `docs/_pr-diff.txt` ด้วย `gh` และโพสต์ PR comment — ตาม README)**

```text
รีวิว PR จาก Lab 04 หรือ 05 แบบอิสระ

Input:
- docs/_pr-diff.txt
- docs/DECISIONS.md
- docs/STATUS.md · docs/OPEN_LOOPS.md (บริบทสถานะ — อย่าสมมุติจากแชท Claude)
- docs/QA.md ถ้ามี

โฟกัส:
- correctness ของ course stubs / tests
- security: SQL injection, secret leak, error messages
- scope creep นอก DECISIONS

Output ไฟล์ docs/review-opencode.md ภาษาไทย:
- สรุป, จุดแข็ง, ความเสี่ยง
- Must fix / Should / Nit
- คำถามต่อ Claude
- ท้ายไฟล์ต้องมีหัวข้อ:

## Canonical state updated
- [ ] docs/STATUS.md
- [ ] docs/OPEN_LOOPS.md
- [ ] docs/DECISIONS.md (ถ้ามี decision ใหม่)

อ่านอย่างเดียว — อย่าแก้ src/ ในรอบนี้
ห้ามเรียก Claude หรือ MCP เป็นท่อไป CLI อื่น
```
