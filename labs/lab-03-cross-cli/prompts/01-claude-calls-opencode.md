# Lab 03 prompt — Claude calls OpenCode

1. โหลด skill `dispatch-opencode` และ `log-dispatch`
2. จากเซสชัน Claude นี้ เรียก:

```bash
opencode run --agent backend "ตรวจ GET /api/prices, GET /api/portfolio และ POST /api/orders แล้วตอบสั้นๆ ว่าข้อไหนพร้อมแล้ว ข้อไหนยังเป็น starter — อย่าแก้ frontend และอย่าเติม paper order ใน Lab นี้"
```

3. รอผล แล้วบันทึก dispatch (from=claude, to=opencode) ด้วย `log-dispatch`
4. สรุปให้ผู้เรียนรีเฟรช Command Center :4174 แล้วชี้ลูกศรบนจอเขา
5. หยุดแล้วรอผู้เรียนสั่งชิ้นถัดไปเอง

---

นี่คือ**โครงเริ่ม** ไม่ใช่คำตอบสำเร็จรูป  
ผู้เรียนสั่งต่อได้ — ลูกศรต้องมาจากเครื่องเขา
