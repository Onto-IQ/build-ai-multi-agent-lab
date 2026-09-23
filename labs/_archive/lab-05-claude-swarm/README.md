# Lab 05 — Claude Swarm หลาย Turn (Agent Teams & Subagents)

**เวลาเป้าหมาย:** 80 นาที  
**เครื่องมือหลัก:** Claude Code Agent Teams (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`), Subagents, Agent View (`claude agents`), Order Ticket Implementation

---

## 🎯 วัตถุประสงค์การเรียนรู้ (Learning Objectives)

1. สัมผัสพลังของ **Autonomous Multi-Agent Swarm** — ปล่อยให้ Agent หลายตัวทำงานประสานกันข้ามหลาย Turn
2. ทดลองเปิดฟีเจอร์ **Claude Code Agent Teams** ผ่านการตั้งค่า Environment Variable
3. รู้วิธีใช้ **Subagents / Background Tasks (`/bg`)** เป็นทางเลือกสำรองที่เสถียรบนเครื่องตัวเอง
4. สร้างฟีเจอร์สำคัญที่สุดของ Trade Desk: **การส่งคำสั่งซื้อขาย Paper Order (Buy/Sell) และบันทึกลง Order History จริง**

---

## 🧭 บริบท: ได้รับมาจากไหน & จะส่งต่ออะไร

```text
[จบ Lab 01–04]
  └─ ราคาขึ้นแล้ว กระเป๋าเงินมีแล้ว สิทธิ์ความปลอดภัยแน่นหนา
        │
        ▼  (คุณลงมือใน Lab 05)
[ปล่อย Claude Swarm จัดการระบบ Order แบบครบวงจร]
  ├─ ให้ Agent วางแผนและแก้ backend POST /api/orders ให้บันทึกออเดอร์ลง ledger
  ├─ ปรับปรุง frontend Order Form ให้ส่งคำสั่งซื้อขายได้จริง
  ├─ ปรับปรุง Order History ให้แสดงประวัติการเทรดที่เพิ่งส่งไป
  └─ ติดตามการทำงานผ่าน Agent View หรือ Teammate Panel
        │
        ▼  (ส่งต่อเข้า Lab 06 & 07)
[ระบบ Trade Desk เทรดซื้อขายจำลองได้ครบวงจร พร้อมเข้าสู่การเตรียม Ship]
```

---

## 🛠️ ขั้นตอนการทดลอง (Hands-on Steps)

### ขั้นที่ 1: ตรวจสอบการเปิดใช้งาน Agent Teams
เปิดไฟล์ `.env` ใน VS Code ตรวจดูว่ามีบรรทัดนี้:
```text
CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```
จากนั้นเปิด Windows Terminal ใหม่แล้วรัน `claude` เพื่อให้เซสชันโหลดค่าคอนฟิกใหม่

### ขั้นที่ 2: เริ่มต้น Swarm ด้วยพรอมต์หลัก
คัดลอกพรอมต์จาก [`prompts/01-swarm-trade-desk.md`](prompts/01-swarm-trade-desk.md) วางลงใน Claude:

```text
คุณเป็น Team Lead สำหรับ Paper Crypto Trade Desk
เป้าหมาย: ทำให้ระบบส่งคำสั่งซื้อขาย (Order Ticket) และประวัติคำสั่ง (Order History) ใช้งานได้จริงอย่างสมบูรณ์
1. โหลด skill paper-only และ done-when
2. วางแผนแบ่งงาน:
   - ฝั่ง Backend: แก้ไข POST /api/orders ให้รับ buy/sell, บันทึกลง ledger, ตัด/เพิ่มเงินในกระเป๋า และตอบ 201 Created
   - ฝั่ง Frontend: ผูกปุ่มส่ง Order Form, จัดการ Loading state, และดึง Order History มาแสดง
3. ประสานงานและแก้ไขโค้ดจนกว่าจะทดสอบส่งคำสั่งผ่านหน้าเว็บได้สำเร็จ
```

### ขั้นที่ 3: ติดตามการทำงานของทีม
- **กรณีที่ Agent Teams ทำงาน:** คุณจะเห็น Teammate Panel ด้านล่างหน้าต่าง terminal แสดงรายชื่อ Agent ที่กำลังแยกย้ายไปทำงาน สามารถคลิกดู Transcript ของแต่ละตัวได้
- **กรณีสำรอง (Fallback Subagents):** หาก Teams ไม่เริ่มต้นภายใน 5-10 นาที ให้ใช้พรอมต์จาก [`prompts/02-fallback-subagents.md`](prompts/02-fallback-subagents.md) เพื่อสั่งงานแบบ Specialist ทีละฝั่งหรือสั่งงานเบื้องหลังด้วย `/bg`

### ขั้นที่ 4: ตรวจสอบสถานะใน Agent View
เปิด Windows Terminal แยกอีกหน้าต่างแล้วรัน:
```powershell
claude agents
```
สังเกตรายการเซสชันและงานย่อยที่ถูกสร้างขึ้นในตาราง

### ขั้นที่ 5: รีสตาร์ท Backend (ถ้าแก้ `server.mjs`) แล้วทดสอบเทรด
แท็บ BE: `Ctrl+C` → `npm run dev` ใหม่ (backend ไม่ hot-reload)

เปิดเบราว์เซอร์ไปที่ **http://localhost:4173**:
1. ลองเลือกเหรียญ เช่น **BTC**
2. ใส่จำนวน เช่น `0.005`
3. กดปุ่ม **Buy (ซื้อ)**
4. **ตรวจสอบผลลัพธ์:**
   - ยอดเงิน USDT ในกระเป๋าต้องลดลงตามมูลค่าที่ซื้อ
   - จำนวนเหรียญ BTC ใน Positions ต้องเพิ่มขึ้น
   - ตาราง **Order History** ด้านล่างต้องมีแถวประวัติการซื้อขายปรากฏขึ้นทันที!

### ขั้นที่ 6: อัปเดต Command Center Checklist
เปิด **http://localhost:4174** แล้วทำเครื่องหมายติ๊กถูกในช่อง `order` และ `history`

---

## 💡 สถาปัตยกรรม & Pro-Tips จาก Lead Architect

> **วิธีป้องกัน Agent หลงทางในการรันหลาย Turn (Context Drift):**  
> เมื่อปล่อยให้ Agent ทำงานประสานกันหลายรอบ ตัวแปรที่สำคัญที่สุดคือ **ชัดเจนใน Done Criteria** การระบุในพรอมต์เสมอว่า *"งานนี้สำเร็จเมื่อทดสอบ POST /api/orders ตอบ 201 และตาราง Order History อัปเดตบนเบราว์เซอร์"* จะช่วยดึงสติของ Agent ทุกตัวให้อยู่กับเป้าหมายหลัก และหลีกเลี่ยงการเขียนโค้ดเกินจำเป็น (Overengineering)

---

## ✅ เกณฑ์ผ่าน Lab 05

บนเครื่องของคุณ:
- [ ] มีการทำงานประสานกันของ Agent มากกว่า 1 ตัว หรือสั่งงานต่อเนื่องหลาย Turn
- [ ] คุณสามารถเปิดดู Transcript หรือเปิดเช็กผ่าน `claude agents` ได้
- [ ] หน้า Trade Desk (:4173) สามารถส่ง Order ซื้อหรือขายได้จริง ยอดเงินเปลี่ยน และมีประวัติในตาราง History
- [ ] Command Center ติ๊กผ่านข้อ `order` และ `history`
- [ ] บันทึกผลลัพธ์ลงใน `workspace/learning-log.md`
