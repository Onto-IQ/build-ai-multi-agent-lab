# Lab 6: OpenCode Orchestration — Audit → Backup

**เวลา:** 40 นาที  
**เครื่องมือ:** OpenCode (multi-agent / orchestration plugin ตามคู่มือห้องเรียน)  
**โฟกัส:** สั่งงานเป็นขั้น + มีจุดตรวจ ไม่รันยาวไร้ขอบเขต

## เป้าหมาย

เมื่อ audit เป็น `FAIL` ให้รัน backup dining แล้ว audit ใหม่เป็นขั้น ๆ

## ไฟล์ในโฟลเดอร์นี้

- `prompts/dining-backup-agent.md` — source of truth

อ้าง Auditor จาก Lab 5 (ไม่ duplicate):

- `../lab-05-team-audit/prompts/logistics-auditor.md`

## ลำดับขั้นที่ต้องทำ

1. อ่าน `workspace/contracts/audit-result.json`
2. ถ้า `FAIL` → รัน Backup Dining Agent
3. รัน Auditor อีกรอบ (อัปเดต `round`)
4. หยุดเมื่อ `PASS` หรือครบ **2 รอบ refinement**
5. จดจำนวนรอบและเหตุผลหยุดใน `workspace/learning-log.md`

Instructor ระบุเวอร์ชัน OpenCode plugin ที่ห้องใช้ในคู่มือวันสอน

## เกณฑ์ผ่าน

- [ ] มีลำดับขั้น audit → backup → re-audit ชัดเจน
- [ ] ไม่เกิน 2 รอบ refinement
- [ ] learning-log มี stop reason

## ถัดไป

[Lab 7: Collaboration Layer](../lab-07-collab-layer/README.md)
