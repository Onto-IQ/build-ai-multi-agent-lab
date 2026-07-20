# Lab 8: Loop vs Stop Condition

**เวลา:** 40–45 นาที  
**เครื่องมือ:** Claude Code + OpenCode  
**โฟกัส:** failure cases + refinement ≤ 2 รอบ + ต้นทุนโดยประมาณ

## เป้าหมาย

ทดลองงานที่ fail แล้วหยุดอย่างมีวินัย เทียบกับการวนลูปไม่มีจุดหยุด

## ไฟล์ในโฟลเดอร์นี้

- `scenarios/scenario-02-budget-fail.json`
- `scenarios/scenario-03-closed-day.json`

ใช้ prompt จาก Lab ก่อนหน้า:

- Auditor: `../lab-05-team-audit/prompts/logistics-auditor.md`
- Backup: `../lab-06-orchestration/prompts/dining-backup-agent.md`

## ขั้นตอน

1. รันอย่างน้อย 2 failure scenarios ในโฟลเดอร์นี้ (ปรับ trip brief / options ตามโจทย์)
2. ให้ Auditor รายงาน violations
3. ทำ backup + re-audit ไม่เกิน 2 รอบ
4. จดใน `workspace/learning-log.md`:
   - จำนวน refinement rounds
   - stop reason
   - cost = ค่าใช้จ่ายจริงหรือ `not measured`

## เกณฑ์ผ่าน

- [ ] ทดสอบงบเกิน และร้านปิด/เวลาไม่พออย่างน้อยอย่างละหนึ่ง
- [ ] หยุดไม่เกิน 2 รอบ พร้อมเหตุผล
- [ ] ไม่แก้ JSON ด้วยมือเพื่อปิดบังปัญหาของ Agent

## ถัดไป

[Lab 9: Capstone](../lab-09-capstone/README.md)
