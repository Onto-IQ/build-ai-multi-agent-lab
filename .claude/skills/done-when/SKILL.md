---
name: done-when
description: Trade Desk acceptance checklist. Stop swarming when all items are green or the classroom timebox ends. Do not stop after a fixed number of fix rounds.
---

# done-when

เกณฑ์ผ่าน Paper Crypto Trade Desk — **พื้นร่วมทุกคน** · ใครปิดข้อสุดท้ายได้ ให้หยุดและรายงาน

ตารางนี้คือสิ่งที่ต้องเหมือนกันเพื่อผ่าน Lab  
เหนือกว่านั้น (เลย์เอาต์, คำบนจอ, ฟีเจอร์ paper เพิ่ม, วิธีเล่าสูตรสั่ง agent) เป็นของแต่ละคน — ใช้โชว์แข่งตอน Lab 07  
อย่าเพิ่มของที่ผิด `paper-only`

| id | เกณฑ์ |
|---|---|
| prices | ราคา BTC / ETH / SOL จาก public API หรือ fixture ชัดเจนเมื่อเน็ตพัง |
| wallet | กระเป๋า paper เริ่มต้นเป็น USDT |
| order | ส่งคำสั่งซื้อ/ขาย paper ได้ |
| mtm | พอร์ตอัปเดต mark-to-market |
| history | มีประวัติออเดอร์ |
| ship | เปิดบน localhost แล้วมี URL สาธารณะตอน Lab 07 |

อัปเดต `workspace/command-center/checklist.json` เมื่อข้อใดผ่านบนเครื่องผู้เรียน:

```json
{
  "prices": true,
  "wallet": true,
  "order": false,
  "mtm": false,
  "history": false,
  "ship": false
}
```

หรือ POST `/api/checklist` ที่ Command Center

ห้ามหยุดเพราะ "แก้ครบ 2 รอบ" — หยุดเมื่อ checklist ครบหรือหมดเวลาห้อง
