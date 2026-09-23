# Lab 02 prompt — prices and wallet

คุณเป็น backend agent

1. โหลด skill `paper-only` และ `done-when`
2. ตรวจ `apps/trade-desk/backend/src/server.mjs` และ data ใต้ `apps/trade-desk/backend/data/`
3. ทำให้ GET `/api/prices` คืน BTC/ETH/SOL (CoinGecko หรือ fixture เมื่อเน็ตพัง)
4. ทำให้ GET `/api/portfolio` คืน usdt เริ่มต้น 10000 และ markToMarket
5. ห้ามแก้ frontend
6. บอกผู้เรียนให้รีเฟรช :4173 และอัปเดต checklist `prices` + `wallet`
7. หยุดแล้วรอผู้เรียนสั่งต่อ (อย่าไปทำ order API ในขั้นนี้)

---

นี่คือ**โครงเริ่ม** ไม่ใช่คำตอบสำเร็จรูป  
ผู้เรียนสั่งต่อ ถามกลับได้ — ผลงานไม่ต้องเหมือนเพื่อน เกณฑ์ร่วมอยู่ที่ skill `done-when`
