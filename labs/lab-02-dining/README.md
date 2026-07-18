# Lab 2: Dining Agent (OpenCode)

**เวลา:** 40–45 นาที  
**เครื่องมือ:** OpenCode  
**Input:** `workspace/contracts/trip-brief.json` (จาก Lab 1)  
**Output:** `workspace/contracts/dining-options.json`

## เป้าหมาย

สร้าง Dining Agent ใน OpenCode แล้วเปรียบเทียบกับ Triage Agent จาก Lab 1 (บทบาท คนละเครื่องมือ คนละ ownership)

## ไฟล์ในโฟลเดอร์นี้

- `prompts/dining-agent.md` — **source of truth** สำหรับ Dining Agent (Lab อื่นอ้างไฟล์นี้)

## ขั้นตอน

1. ทำงานจาก **root** ของ repository
2. ตรวจว่ามี trip brief จาก Lab 1
3. อ่านและรัน `prompts/dining-agent.md` ใน OpenCode
4. ตรวจผล:

```bash
node shared/scripts/validate-json.mjs workspace/contracts/dining-options.json
```

5. จดใน `workspace/learning-log.md`: ความต่างของ Claude Code vs OpenCode ที่สังเกตได้

## เกณฑ์ผ่าน

- [ ] มี dining options อย่างน้อย 2 candidates (หลัก + backup)
- [ ] ไม่แก้ไฟล์ของ Claude Code (`trip-brief`, `activity-options`, `final-itinerary`)
- [ ] ผ่าน validator

## ถัดไป

[Lab 3: Permission](../lab-03-permission/README.md)
