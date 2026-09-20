---
name: dispatch-opencode
description: Call OpenCode from Claude via CLI for a named agent task. Use when another tool should own a backend or sequential slice of work.
---

# dispatch-opencode

เมื่อต้องการให้ OpenCode ทำงานชิ้นหนึ่งจาก Claude:

1. ยืนยันว่าอยู่ที่ root ของ lab repo
2. รัน:

```bash
opencode run --agent <agent-name> "<task>"
```

ตัวอย่าง agent: `backend`, `qa`

3. หลังเรียกแล้ว ใช้ skill `log-dispatch` บันทึกเหตุการณ์ (from=claude, to=opencode)
4. อ่านผลงานในโฟลเดอร์ที่มอบหมาย — อย่าแก้ไฟล์ฝั่งที่มอบให้ OpenCode ในรอบเดียวกัน

อย่าสร้างไฟล์สัญญา JSON กลางเป็นชั้น orchestration — CLI คือสะพาน
