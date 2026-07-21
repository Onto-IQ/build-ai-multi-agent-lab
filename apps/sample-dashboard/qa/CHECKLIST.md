# QA Checklist — Agent Cost Board

ติ๊กโดยบทบาท **qa** (OpenCode) ก่อนผ่านด่านและก่อน Ship  
มาตรฐานคอร์ส: **หลายรอบ** — FE/BE/QA ขัดแย้งกันได้จนกว่าข้อมูลกับ UI จะสอดคล้อง แล้วค่อย PASS

## รอบที่ 1 (คาดว่า FAIL ได้)

- [ ] อ่าน `handoff-fe.json` / `handoff-be.json` แล้วรู้ว่าใครค้างเรื่องอะไร
- [ ] แผงแสดง**แถบขัดแย้ง**เมื่องบเกิน / มี `pending`|`fail` / `qa_ready` ยังไม่ true
- [ ] `gate-quality.mjs` **FAILED** อย่างน้อยหนึ่งครั้งก่อนรอบแก้ (หลักฐาน stdout)

## คุณภาพ (ต้องครบก่อน PASS)

- [ ] `backend/status.json` มี `status=ok`, `message`, `budget_tokens_limit` (ตัวเลข), `qa_ready=true`
- [ ] `backend/runs.json` มี `runs` ≥ 1 และ**ไม่มี** `gate_status` เป็น `pending` หรือ `fail`
- [ ] ยอดโทเคนรวม ≤ `budget_tokens_limit` **หรือ** มี `budget_exception_ack=true` หลังคุยคน/QA
- [ ] Frontend เปิดแล้วแสดงสถานะ + ยอดโทเคน + เพดาน + ตารางรอบ + แถบขัดแย้งเมื่อยังไม่พร้อม
- [ ] สัญญาใน `workspace/contracts/` ผ่าน `node shared/scripts/validate-json.mjs`

## ต้นทุน / รอบปรับแก้

- [ ] รอบปรับแก้ของงานเดียวกันไม่เกิน 2 (ดู `shared/scripts/gate-cost.md`)
- [ ] รอบที่ 3 → หยุดถามคน
- [ ] มีบันทึกรอบใน `runs.json` และ learning-log

## สิทธิ์เขียนไฟล์

- [ ] Frontend ไม่แก้ `backend/`
- [ ] Backend ไม่แก้ `frontend/`
- [ ] QA ไม่แก้โค้ดแอปเพื่อ “ผ่านให้สวย” โดยข้ามด่าน

## คำสั่งตรวจเร็ว

```bash
node shared/scripts/gate-quality.mjs
```

ถ้าขึ้น `NODE_MISSING` / ไม่เจอ `node` → เสนอติดตั้งตาม `SETUP.md` แล้ว**ถามคน** ห้ามติดตั้งเงียบ
