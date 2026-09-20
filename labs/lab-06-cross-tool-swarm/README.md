# Lab 06 — Swarm ข้ามเครื่องมือจนเกณฑ์ผ่าน (End-to-End Orchestration)

**เวลาเป้าหมาย:** 100 นาที  
**เครื่องมือหลัก:** Claude Code (Frontend/Lead) × OpenCode (Backend/QA), Command Center Checklist, `done-when` Skill

---

## 🎯 วัตถุประสงค์การเรียนรู้ (Learning Objectives)

1. ฝึกเป็น **Lead Solution Architect** นำทัพ AI สองค่าย (Claude Code และ OpenCode) ทำงานร่วมกันแบบครบวงจร
2. ขับเคลื่อนระบบด้วยเกณฑ์ผลลัพธ์ **Done Criteria (`done-when`)** แทนการจำกัดโควตารอบแบบตายตัว
3. บันทึกเส้นทางการทำงานข้ามเครื่องมือ (Audit Trail) ผ่าน `log-dispatch` จนเห็นสายงานชัดเจนบน Command Center
4. ทำเครื่องหมายเกณฑ์ **done-when ก่อน ship** ให้ครบบน localhost

---

## 🧭 บริบท: ได้รับมาจากไหน & จะส่งต่ออะไร

```text
[ระบบ Trade Desk ทำงานได้แล้วเกือบทุกส่วน]
        │
        ▼  (คุณลงมือใน Lab 06: Lead Orchestrator)
[ตรวจ checklist ตาม skill done-when — 6 ข้อ]
  prices · wallet · order · mtm · history · ship (ship = Lab 07)
        │
        ▼
[Lab 06 เป้าหมาย: ให้ 5 ข้อแรกเป็น true บน localhost]
  UX / ความสวยงาม = แข่งโชว์ Lab 07 ไม่มีช่อง checklist แยก
        │
        ▼  (ส่งต่อเข้า Lab 07)
[Lab 07: build + deploy → ตั้ง ship: true + โชว์แข่ง]
```

---

## 🛠️ ขั้นตอนการทดลอง (Hands-on Steps)

### ขั้นที่ 1: สำรวจจุดที่ยังขาดใน Command Center
เปิด **http://localhost:4174** (Command Center):
- ตรวจดู Checklist ว่าข้อไหนยังเป็นวงกลมสีเทา `○`
- มักยังขาด **`mtm`** ถ้า portfolio ยังไม่คำนวณ mark-to-market บน UI/API
- ข้อ **`ship`** ยังเป็น false จนกว่าจะมี Public URL ใน Lab 07 — **ไม่ต้องติ๊กใน Lab 06**

### ขั้นที่ 2: สั่งงานแบบวนรอบ (Architectural Loop)
ใช้เครื่องมือนำ (แนะนำเปิด Claude Code) แล้วใช้พรอมต์จาก [`prompts/01-lead-until-done.md`](prompts/01-lead-until-done.md):

```text
คุณเป็น Lead Architect ทำงานร่วมกับ OpenCode
1. โหลด skill done-when, dispatch-opencode, และ log-dispatch
2. อ่าน checklist ปัจจุบันที่ workspace/command-center/checklist.json
3. มอบหมายงาน:
   - ฝั่ง Backend (สั่งผ่าน opencode run): ตรวจสอบฟังก์ชัน markToMarket ใน server.mjs ให้คืนมูลค่ารวมของพอร์ตโฟลิโออย่างถูกต้องใน GET /api/portfolio
   - ฝั่ง Frontend (แก้โดยตรง): แสดงผล Net Worth (Mark-to-Market) ด้านบนสุดของหน้าจอ Trade Desk
4. เมื่อแต่ละงานเสร็จ ให้บันทึกผ่าน log-dispatch
5. หลังแก้ backend ให้เตือนผู้เรียน restart npm run dev ที่แท็บ BE
6. หยุดเมื่อ prices, wallet, order, mtm, history เป็น true บน localhost
```

### ขั้นที่ 3: สลับไปใช้ OpenCode หรือสั่งผ่าน CLI
- ปล่อยให้ Claude สั่ง `opencode run --agent backend` หรือให้คุณรันใน Terminal แยกถ้า CLI ล้ม
- ทุกครั้งที่มีการสั่งงานข้ามเครื่องมือ ตรวจสอบว่ามีบันทึกส่งไปยัง Command Center

### ขั้นที่ 4: ตรวจสอบผลลัพธ์บน Trade Desk (:4173)
1. **ทดสอบซื้อเหรียญ:** ซื้อ 0.001 BTC (หรือมากกว่า)
2. **ดู Mark-to-Market:** ยอดรวมต้องสะท้อนเงินสด + มูลค่า position ตามราคาปัจจุบัน
3. **ปรับ UX (ทางเลือกแข่ง):** สี badge, empty state, ข้อความไทย — ไม่มีช่อง checklist `ui`

### ขั้นที่ 5: ติ๊ก Checklist ให้ครบ 5 ข้อแรก (ยกเว้น ship)
ใน Command Center (:4174) หรือไฟล์ `workspace/command-center/checklist.json`:

- `prices: true`
- `wallet: true`
- `order: true`
- `mtm: true`
- `history: true`
- `ship: false` ← รอ Lab 07

---

## 💡 สถาปัตยกรรม & Pro-Tips จาก Lead Architect

> **ความแตกต่างระหว่าง Prompt Engineer กับ AI Architect:**  
> Prompt Engineer จะหยุดเมื่อ AI บอกว่า "โค้ดเสร็จแล้ว" แต่ **AI Architect** จะเป็นผู้คุมเกณฑ์ (Gatekeeper) ตรวจสอบ Integration จริงบนเบราว์เซอร์ ทดสอบ Edge Cases (เช่น เงินไม่พอซื้อ) และสั่ง Refactor จน checklist ตรงกับ `done-when`

---

## ✅ เกณฑ์ผ่าน Lab 06

บนเครื่องของคุณ:
- [ ] คุณเป็นผู้นำทัพสั่งงานข้ามเครื่องมือหลาย Turn ด้วยตนเอง
- [ ] Command Center มีประวัติลูกศร CLI Dispatch เพิ่มขึ้นชัดเจน
- [ ] Checklist 5 ข้อแรกของ `done-when` เป็น true บน localhost (`ship` ยัง false ได้)
- [ ] Trade Desk คำนวณ Mark-to-Market และแสดงผลได้อย่างแม่นยำ
- [ ] บันทึกสิ่งที่ประทับใจและข้อควรระวังลงใน `workspace/learning-log.md`
