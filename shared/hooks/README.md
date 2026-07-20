# Hooks (แนวคิดในห้อง)

ใช้เป็นด่านอัตโนมัติก่อน Ship:

1. `node shared/scripts/validate-json.mjs`
2. `node shared/scripts/gate-quality.mjs`
3. เช็กลิสต์ใน `apps/sample-dashboard/qa/CHECKLIST.md`
4. ปรับแก้ไม่เกิน 2 รอบ (`shared/scripts/gate-cost.md`)
5. สิทธิ์ deny คำสั่งทำลายไฟล์สำคัญ

ผูกกับ project hooks ของ Claude Code / OpenCode ได้เมื่อเวอร์ชันในห้องรองรับ
