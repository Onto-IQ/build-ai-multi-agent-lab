---
name: claude-code
description: เรียก Claude Code ข้าม harness แบบ headless one-shot (claude -p) เพื่อขอมุม frontend/reviewer เช่น ตรวจการผูกฟอร์มกับ API — ท่อคือไฟล์ใน docs/ ฝั่ง Claude เขียนได้เฉพาะไฟล์รายงานที่กำหนด
---

# claude-code — call ข้าม harness (OpenCode → Claude)

ใช้เมื่องาน backend ต้องการ**มุม UI / การผูกฟอร์ม / ความเห็น reviewer** จากฝั่ง Claude
แต่ละตัวยังรันบน harness ตนเอง — นี่คือ native-to-native ไม่ใช่ orchestration bus

## ขั้นตอน

1. เขียน prompt ลงไฟล์ชั่วคราว (เลี่ยงปัญหา quote ยาว):

```powershell
@'
อ่านไฟล์ที่ระบุด้านล่าง แล้วเขียนรายงานภาษาไทยลงไฟล์เดียวที่กำหนด
ห้ามแก้ไฟล์อื่น — โดยเฉพาะ src/pages/ และ src/layouts/ (ownership ฝั่ง frontend)
'@ | Set-Content -Encoding utf8 .\docs\_call-claude-prompt.md
```

2. รัน headless one-shot:

```powershell
Get-Content .\docs\_call-claude-prompt.md -Raw | claude -p --permission-mode acceptEdits --output-format text
```

3. ใน prompt ต้องระบุ **ไฟล์รายงานเดียว** ที่ Claude เขียนได้ (เช่น `docs/be-fe-integration-check.md`)
4. อ่านรายงานกลับมาสรุปให้ผู้เรียน แล้วลบไฟล์ prompt ชั่วคราว · commit ไฟล์รายงานพร้อมงาน

## ข้อจำกัด

- **One-shot เท่านั้น** — ไม่วนซ้ำเอง ไม่สร้าง daemon/loop
- ห้าม `--dangerously-skip-permissions`
- ห้ามส่ง secret / PAT / เนื้อหา `.env` ใน prompt
- Claude (callee) เขียนได้เฉพาะไฟล์รายงาน — ห้ามแตะ `src/pages/api/**`, `src/lib/db.ts` ของ caller
