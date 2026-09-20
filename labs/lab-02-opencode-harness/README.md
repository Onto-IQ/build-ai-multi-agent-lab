# Lab 02 — OpenCode Harness (Plan vs Build Mode & Backend Specialist)

**เวลาเป้าหมาย:** 70 นาที  
**เครื่องมือหลัก:** OpenCode TUI (`opencode`), Backend Agent, Plan Mode (Tab), Command Center Checklist

---

## 🎯 วัตถุประสงค์การเรียนรู้ (Learning Objectives)

1. ทำความคุ้นเคยกับ **OpenCode TUI Interface** และสถาปัตยกรรม **Plan Mode vs Build Mode**
2. เข้าใจการแชร์สกิลข้ามค่าย: OpenCode สามารถอ่านสกิลใน `.claude/skills/` ได้โดยตรง
3. ฝึกใช้งาน **Backend Specialist** ในการวิเคราะห์โค้ดเดิม (`server.mjs`) และปลุกชีพ API `/api/prices` และ `/api/portfolio`
4. อัปเดตความคืบหน้าของระบบไปยัง **Command Center Checklist**

---

## 🧭 บริบท: ได้รับมาจากไหน & จะส่งต่ออะไร

```text
[จบ Lab 01]
  └─ UI Frontend พร้อมแสดงผลแล้ว แต่ฝั่ง Backend ยังคืน mock ว่างเปล่า
        │
        ▼  (คุณลงมือใน Lab 02)
[ใช้ OpenCode: สลับ Plan Mode ก่อน แล้วค่อยสั่ง Build Mode]
  ├─ Plan Mode (Tab): ให้ AI อ่าน server.mjs แล้วสรุปสิ่งที่ต้องทำโดย "ยังไม่แตะไฟล์"
  ├─ Build Mode (Tab): สั่ง backend agent เชื่อมราคา (CoinGecko / Fixture) + เปิดกระเป๋า 10,000 USDT
  └─ อัปเดต checklist ใน Command Center
        │
        ▼  (ส่งต่อเข้า Lab 03)
[ทั้ง Frontend และ Backend ขยับได้ด้วย Specialist ของตนเอง พร้อมเชื่อมข้าม CLI ใน Lab 03]
```

---

## 🛠️ ขั้นตอนการทดลอง (Hands-on Steps)

### ขั้นที่ 1: เปิด OpenCode TUI ใน Terminal แยก
เปิด Windows Terminal ใหม่ที่ root โฟลเดอร์ `build-ai-multi-agent-lab` แล้วรัน:

```powershell
opencode
```

### ขั้นที่ 2: กด `Tab` สลับไปที่ **Plan Mode** (โหมดวางแผน ปลอดภัย ไม่แก้ไฟล์)
สังเกตมุมล่างของหน้าต่าง OpenCode:
- กดปุ่ม `Tab` เพื่อสลับโหมดระหว่าง `Build` และ `Plan`
- ในโหมด **Plan** ลองถามคำถามนี้เพื่อวิเคราะห์ระบบ:

```text
อ่าน apps/trade-desk/backend/src/server.mjs แล้วช่วยวิเคราะห์ว่าฟังก์ชัน fetchLivePrices, fixturePrices, ensureLedger มีอยู่แล้วหรือไม่ และต้องปรับ route /api/prices กับ /api/portfolio อย่างไรให้แผงแสดงราคา BTC/ETH/SOL และเงินตั้งต้น 10000 USDT โดยไม่ต้องแก้โค้ดจริง
```
> 💡 **สิ่งที่คุณควรสังเกต:** ใน Plan Mode ตัว AI จะอ่านโค้ดและแจกแจงแผนทีละสเต็ปอย่างละเอียด แต่จะไม่พยายามใช้ Write/StrReplace แก้ไขไฟล์ของคุณเลย

### ขั้นที่ 3: สลับกลับ **Build Mode** แล้วสั่ง Backend Specialist
- กดปุ่ม `Tab` เพื่อสลับกลับมาที่ **Build Mode** (หรือใช้ agent `backend`)
- คัดลอกพรอมต์ตั้งต้นจาก [`prompts/01-prices-and-wallet.md`](prompts/01-prices-and-wallet.md) มาสั่งงาน:

```text
คุณเป็น backend agent ของ Paper Crypto Trade Desk
1. โหลด skill paper-only
2. ตรวจ apps/trade-desk/backend/src/server.mjs
3. ปรับ route GET /api/prices ให้ดึง live ถ้าเน็ตได้ หรือ fallback fixture ใน data/prices.fixture.json
4. ปรับ GET /api/portfolio ให้คืนเงินกระเป๋าตั้งต้น 10000 USDT ผ่าน ensureLedger
5. ห้ามแตะ apps/trade-desk/frontend/
```

### ขั้นที่ 4: รีสตาร์ท Backend แล้วทดสอบ API
Backend รันด้วย `node src/server.mjs` — **ไม่ reload เอง** หลัง agent แก้ไฟล์:
1. ไปแท็บ BE (`apps/trade-desk/backend`) กด `Ctrl+C`
2. รัน `npm run dev` ใหม่
3. ทดสอบ API ที่เพิ่งแก้:
- เปิดเบราว์เซอร์ไปที่ http://127.0.0.1:4180/api/prices ควรได้ JSON รายการราคา BTC, ETH, SOL
- เปิดไปที่ http://127.0.0.1:4180/api/portfolio ควรได้ JSON `usdt: 10000`
- รีเฟรชหน้า Trade Desk ที่ **http://localhost:4173** แผงราคาและยอดเงิน USDT ต้องโชว์ตัวเลขจริง ไม่ใช่ขีด `—`

### ขั้นที่ 5: อัปเดต Command Center Checklist
เปิดเบราว์เซอร์ไปที่ **http://localhost:4174** (Command Center):
- ติ๊กถูกที่ช่อง `prices` และ `wallet` ให้เป็นสีเขียว
*(หรือเปิดไฟล์ `workspace/command-center/checklist.json` แก้ไขเป็น `"prices": true`, `"wallet": true`)*

---

## 💡 สถาปัตยกรรม & Pro-Tips จาก Lead Architect

> **ทำไมต้องฝึก Plan Mode ก่อน Build Mode?**  
> ปัญหาคลาสสิกของ Developer ที่ใช้ AI คือ "Prompt-and-Pray" สั่งให้ทำทันทีแล้ว AI ไปแก้ผิดจุด รื้อสถาปัตยกรรมเดิมจนพัง การบังคับใช้ **Plan Mode** เปรียบเสมือนการทำ *Architecture Review & RFC* ก่อนเริ่มเขียนโค้ดจริง ช่วยให้มั่นใจว่า AI เข้าใจ Logic ทั้งหมดก่อนลงมือ

### ⌨️ คีย์ลัด & คำสั่งใน OpenCode:
- `Tab` — สลับระหว่าง Build Mode และ Plan Mode ทันที
- `/undo` — ย้อนกลับการแก้ไขโค้ดรอบล่าสุด หาก AI ทำงานผิดพลาด
- สกิลร่วมอยู่ที่ `.claude/skills/` — ในพรอมต์ให้เขียน「โหลด skill paper-only」ชัดๆ

### ถ้า `opencode run` ใน SETUP/Lab 03 ล้ม (Internal server error)
ใช้ TUI นี้แทน: อยู่ใน `opencode` → agent `backend` → วางพรอมต์ Lab 02 แล้ว Build — **ยังนับผ่าน Lab 02 ได้**

---

## ✅ เกณฑ์ผ่าน Lab 02

บนเครื่องของคุณ:
- [ ] แผง Trade Desk (:4173) แสดงราคา BTC, ETH, SOL (live หรือ fixture)
- [ ] ยอดเงิน USDT เริ่มต้น 10,000 ปรากฏบนหน้าจอ
- [ ] คุณได้กดสลับไปใช้ **Plan Mode** อย่างน้อย 1 ครั้งก่อนสั่ง Build
- [ ] Command Center (:4174) มีเครื่องหมายเขียวผ่านในข้อ `prices` และ `wallet`
- [ ] ไฟล์ใน `apps/trade-desk/frontend/` ไม่มีการถูกแก้ไข
- [ ] บันทึกประสบการณ์ลงใน `workspace/learning-log.md`
