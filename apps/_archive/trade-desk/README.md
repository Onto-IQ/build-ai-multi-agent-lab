# Paper Crypto Trade Desk (Core Product)

สินค้าหลักของคอร์ส — เว็บแอปพลิเคชันเทรดคริปโตจำลอง (**Paper Trading**)  
ขับเคลื่อนด้วยราคา Public Feed (CoinGecko) พร้อม Offline Fixture Fallback และระบบบันทึกบัญชีจำลอง (JSON Ledger)

---

## 🏗️ โครงสร้างแอปพลิเคชัน

```text
apps/trade-desk/
├── frontend/   # Vite + React + Tailwind CSS (ดูแลโดย Claude Code / Frontend Agent)
│   ├── src/App.jsx           # หน้าจอเทรดหลัก (Ticker, Order Ticket, Portfolio, History)
│   └── package.json
└── backend/    # Node.js + Express + JSON Ledger (ดูแลโดย OpenCode / Backend Agent)
    ├── src/server.mjs        # REST API endpoints & Mark-to-Market calculation
    ├── data/
    │   └── prices.fixture.json # ข้อมูลราคาสำรองยามออฟไลน์หรือโดนบล็อกเน็ต
    └── package.json
```

---

## 🔌 ตาราง API Endpoints (REST Contract)

| Method | Endpoint | หน้าที่ | Response ตัวอย่าง |
|---|---|---|---|
| `GET` | `/api/health` | ตรวจสอบสถานะเซิร์ฟเวอร์ | `{"ok":true,"service":"trade-desk-backend"}` |
| `GET` | `/api/prices` | ราคากลาง BTC, ETH, SOL (live / fixture) | `{"mode":"live","prices":[{"symbol":"BTC","price":64200}]}` |
| `GET` | `/api/portfolio` | ข้อมูลยอดเงินสด USDT, เหรียญที่ถือ และ MTM | `{"usdt":10000,"positions":[],"markToMarket":10000}` |
| `GET` | `/api/orders` | ดึงประวัติคำสั่งซื้อขายทั้งหมด | `{"orders":[{"id":"1","symbol":"BTC","side":"buy",...}]}` |
| `POST` | `/api/orders` | ส่งคำสั่งซื้อหรือขาย (Paper Order) | `{"ok":true,"order":{...}}` (Status 201) |

---

## 🚀 วิธีเปิดรันในเครื่อง (Local Development)

### เทอร์มินัล 1: Backend API (:4180)
```powershell
cd apps/trade-desk/backend
npm install
npm run dev
```

### เทอร์มินัล 2: Frontend UI (:4173)
```powershell
cd apps/trade-desk/frontend
npm install
npm run dev
```

เปิดเบราว์เซอร์ที่: **http://localhost:4173**  
*(โครงหน้าเว็บมีพร้อม แต่แผงราคายังว่าง จงใจรอให้คุณสั่ง Agent เติมใน Lab 01–05)*

---

## 🎯 เกณฑ์ความสมบูรณ์ของสินค้า (`done-when` Checklist)

อัปเดตที่ Command Center (:4174) หรือ `workspace/command-center/checklist.json` — รายละเอียดเต็มใน skill `.claude/skills/done-when/SKILL.md`

| id | เกณฑ์ (starter = ยังไม่ผ่าน) |
|---|---|
| `prices` | ราคา BTC / ETH / SOL (live หรือ fixture) |
| `wallet` | กระเป๋า paper USDT เริ่มต้น |
| `order` | ส่งซื้อ/ขาย paper ได้ |
| `mtm` | mark-to-market บนพอร์ต |
| `history` | ประวัติออเดอร์ |
| `ship` | มี Public URL จริง (Lab 07) |

UX / ความสวยงาม **ไม่มีช่อง checklist แยก** — ใช้แข่งโชว์ Lab 07

---

## 🚫 ข้อห้ามเด็ดขาด (Security Guardrails)
- ห้ามขอหรือใส่ API Key ของ Exchange จริง
- ห้ามทำฟังก์ชันถอนเงินจริง (Withdraw) หรือเชื่อม Web3 Wallet จริง
- รองรับเฉพาะการจำลอง Paper Trading บน Ledger ภายในเครื่องเท่านั้น
