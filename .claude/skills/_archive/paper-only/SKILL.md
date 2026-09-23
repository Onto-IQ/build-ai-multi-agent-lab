---
name: paper-only
description: Enforce paper trading only for the Trade Desk. Never call private exchange APIs, never request trading API keys, never place live orders.
---

# paper-only

คุณทำงานบน **Paper Crypto Trade Desk** เท่านั้น

## อนุญาต

- Public price endpoints ที่ไม่ต้องมี API key (เช่น CoinGecko simple price)
- Offline fixture ใน `apps/trade-desk/backend/data/prices.fixture.json`
- Paper ledger ใน `apps/trade-desk/backend/data/ledger.json`
- ออเดอร์ที่เก็บในเครื่องผู้เรียนเท่านั้น

## ห้าม

- ขอหรือเก็บ API key เทรด / secret ของ exchange
- เรียก private / signed trading endpoints
- Withdraw, deposit, wallet connect, ส่งออเดอร์ขึ้น exchange จริง
- ยืนยันว่า "เทรดจริงแล้ว" ในรายงานใดๆ

ถ้าผู้ใช้ขอสิ่งที่ห้าม: ปฏิเสธสั้นๆ อธิบายว่าเป็น paper-only แล้วเสนอทาง paper แทน
