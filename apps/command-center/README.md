<!-- V3 optional watch only — never a pass gate -->

# Command Center (Thin Watch Layer)

จอภาพรวมและมอนิเตอร์ข้ามเครื่องมือ (**ไม่ใช่ตัวสินค้า** และไม่ทำหน้าที่แทน Agent View แท้)  
ทำหน้าที่แสดงผลสถานะ Checklist ความสำเร็จของสินค้า (`done-when`) และสายธารการสั่งงานข้ามค่าย (Cross-CLI Dispatch Timeline)

---

## 🏗️ โครงสร้างแอปพลิเคชัน

```text
apps/command-center/
├── server/
│   └── index.mjs    # Express API (:4181) อ่าน events.jsonl และ checklist.json
├── src/
│   ├── App.jsx      # หน้าจอ Dashboard แสดงผล Timeline & Checklist (:4174)
│   └── index.css
└── package.json
```

---

## 🚀 วิธีเปิดรันในเครื่อง

### เทอร์มินัล 3: Command Center API (:4181)
```powershell
cd apps/command-center
npm install
npm run server
```

### เทอร์มินัล 4: Command Center Frontend (:4174)
```powershell
cd apps/command-center
npm run dev
```

เปิดเบราว์เซอร์ที่: **http://localhost:4174**

---

## 📊 แหล่งข้อมูลที่ Command Center อ่าน (Data Sources)

1. **`workspace/command-center/events.jsonl`** — บันทึกเหตุการณ์การสั่งงานข้ามเครื่องมือ (ส่งผ่าน skill `log-dispatch` หรือ API POST `/api/events`)
2. **`workspace/command-center/checklist.json`** — สถานะความสมบูรณ์ของ 6 เกณฑ์หลัก (`prices`, `wallet`, `order`, `mtm`, `history`, `ui`, `ship`)

---

## 💡 กฎการออกแบบ & สถาปัตยกรรม (Architectural Philosophy)

- **Thin & Unopinionated:** Command Center จะไม่มี Logic ซับซ้อน และไม่ทำตัวเป็น Orchestrator กลาง
- **Dual Screen Watching:**
  - **จอใกล้ (In-Depth):** ให้ใช้ `claude agents` หรือ OpenCode TUI ในการอ่านแชทจริงและดู Transcript
  - **จอรวม (Big Picture):** ให้ใช้ Command Center ดูจังหวะการ Dispatches ข้ามเครื่องมือ และตรวจสอบ Checklist ร่วม

