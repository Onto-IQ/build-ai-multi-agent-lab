# QA Checklist — Agent Cost Board

ติ๊กโดยบทบาท QA / Tester ก่อนผ่านด่านและก่อน Ship

## คุณภาพ

- [ ] `backend/status.json` มี `status` เป็น `ok` และมี `message`
- [ ] `backend/runs.json` มี `runs` อย่างน้อย 1 รายการ
- [ ] Frontend เปิดแล้วแสดงสถานะ Backend ได้
- [ ] Frontend แสดงยอดโทเคนและตารางรอบได้
- [ ] สัญญาใน `workspace/contracts/` ผ่าน `node shared/scripts/validate-json.mjs`

## ต้นทุน

- [ ] รอบปรับแก้ของงานเดียวกันไม่เกิน 2 (ดู `shared/scripts/gate-cost.md`)
- [ ] ถ้างบใกล้เพดานใน `status.json` → แจ้งคนก่อน Ship

## สิทธิ์เขียนไฟล์

- [ ] Frontend ไม่แก้ `backend/`
- [ ] Backend ไม่แก้ `frontend/`
- [ ] QA ไม่แก้โค้ดแอปเพื่อ “ผ่านให้สวย” โดยข้ามด่าน

## คำสั่งตรวจเร็ว

```bash
node shared/scripts/gate-quality.mjs
```
