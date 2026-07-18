# Lab 1: Triage Agent (Claude Code)

**เวลา:** 40–45 นาที  
**เครื่องมือ:** Claude Code  
**Output:** `workspace/contracts/trip-brief.json`

## เป้าหมาย

แปลงคำขอทริปภาษาไทยเป็น trip brief ที่แยก `hard_constraints` กับ `soft_preferences` ได้ชัดเจน

## ไฟล์ในโฟลเดอร์นี้

- `prompts/triage-agent.md` — prompt หลัก
- `scenarios/scenario-01-nong-nooch.json` — โจทย์ตั้งต้นของหลักสูตร

## ขั้นตอน

1. เปิด Terminal ที่ **root** ของ repository (ไม่ใช่ในโฟลเดอร์ lab นี้)
2. อ่าน `prompts/triage-agent.md` และ scenario ในโฟลเดอร์นี้
3. รัน Triage Agent ใน Claude Code ตาม prompt
4. ตรวจผล:

```bash
node shared/scripts/validate-json.mjs workspace/contracts/trip-brief.json
```

## เกณฑ์ผ่าน

- [ ] มี `workspace/contracts/trip-brief.json` ผ่าน validator
- [ ] แยก hard/soft ถูกต้อง มีงบ จำนวนคน ช่วงเวลา พื้นที่ และกิจกรรมที่ต้องมี
- [ ] ไม่เลือกสถานที่หรือสรุป itinerary ในขั้นตอนนี้

## ถัดไป

[Lab 2: Dining](../lab-02-dining/README.md)
