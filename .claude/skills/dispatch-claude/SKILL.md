---
name: dispatch-claude
description: Call Claude Code headless from OpenCode via CLI for a named agent task. Use when Claude should own frontend or review work.
---

# dispatch-claude

เมื่อต้องการให้ Claude Code ทำงานชิ้นหนึ่งจาก OpenCode:

1. ยืนยันว่าอยู่ที่ root ของ lab repo
2. รัน:

```bash
claude -p --agent <agent-name> "<task>"
```

ตัวอย่าง agent: `frontend`, `reviewer`

3. หลังเรียกแล้ว ใช้ skill `log-dispatch` บันทึกเหตุการณ์ (from=opencode, to=claude)
4. อ่านผลในโฟลเดอร์ที่มอบหมาย — อย่าแย่งไฟล์ฝั่ง Claude ในรอบเดียวกัน

หมายเหตุ: `claude -p` ไม่ spawn Agent Teams — ใช้สำหรับงานชิ้นเดียวแบบ headless
