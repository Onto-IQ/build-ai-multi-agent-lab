# Lab 05 prompt — swarm Trade Desk

สร้าง agent team (หรือทีมงานขนาน) เพื่อปิดช่อง order + history บน Paper Trade Desk

บทบาทอย่างน้อย:

- frontend: ต่อ order ticket กับ POST `/api/orders` และโชว์ประวัติ
- reviewer: ตรวจ paper-only และ edge case (ยอดไม่พอ / sell เกิน)

กฎ:

- โหลด skill `paper-only` และ `done-when`
- ห้ามแก้ backend ในรอบนี้ถ้ายังไม่จำเป็น — ถ้าต้องแก้ backend ให้บอกผู้เรียนไปใช้ dispatch ไป OpenCode
- ทำงานหลาย turn จนผู้เรียนส่ง paper order บน :4173 ได้ หรือสรุปสิ่งที่ค้างชัดเจน
- เตือนผู้เรียนให้เปิด panel / `claude agents` บนเครื่องเขา
- อย่าทำทั้งเดสก์ให้ “เหมือนคำตอบกลาง” — ให้ผู้เรียนสั่งต่อหลาย turn

---

นี่คือ**โครงเริ่ม** ไม่ใช่คำตอบสำเร็จรูป  
ผู้เรียนสั่งต่อเอง ผลงานไม่ต้องเหมือนเพื่อน เกณฑ์ร่วมอยู่ที่ skill `done-when`
