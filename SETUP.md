# SETUP — เตรียมสภาพแวดล้อม (Hands-on Setup)

**เวลาเป้าหมาย:** 30–40 นาที  
**เกณฑ์ผ่าน:** เปิด Trade Desk (:4173) + Command Center (:4174) ได้บนเบราว์เซอร์ และพิมพ์ `claude agents` แล้วเห็นตาราง Agent View บนเครื่องตัวเอง

> 💡 **หลักการของห้อง:** วิทยากรจะสาธิตสั้นๆ ไม่เกิน 2 นาที แล้วปล่อยให้คุณทำเอง  
> เพื่อนข้างๆ (Buddy) ให้คำปรึกษาได้ แต่คำสั่งทั้งหมดต้องรันบนเครื่องของคุณเองเท่านั้น

---

## 📌 สรุปพอร์ตและ URL ประจำคอร์ส

จำตารางนี้ไว้ — คุณจะใช้งานทั้ง 4 จุดตลอด 2 วัน:

| บริการ | คำสั่งรัน (จาก **lab root**) | URL ในเบราว์เซอร์ | สถานะเริ่มต้นที่คาดหวัง |
|---|---|---|---|
| **Trade Desk Backend** | `cd apps/trade-desk/backend; npm run dev` | http://127.0.0.1:4180/api/health | คืน JSON `{"ok":true,"service":"trade-desk-backend"}` |
| **Trade Desk Frontend** | `cd apps/trade-desk/frontend; npm run dev` | http://localhost:4173 | หน้าจอเทรดขึ้น แผงราคาเป็น `—` (รอเติม) |
| **Command Center API** | `cd apps/command-center; npm run server` | http://127.0.0.1:4181/api/state | คืน JSON events/checklist |
| **Command Center UI** | `cd apps/command-center; npm run dev` | http://localhost:4174 | หน้าจอจอมอนิเตอร์สีเข้ม checklist ยังว่าง |

---

## ขั้นตอนที่ 1: ตรวจสอบความพร้อมเครื่องมือแกน

เปิด **Windows Terminal (PowerShell)** ที่เครื่องของคุณ แล้วพิมพ์:

```powershell
node -v
git --version
claude --version
opencode --version
```

### 🔍 ผลลัพธ์ที่ถูกต้อง (Expected Output)
```text
v20.x.x (หรือ v22 / v24)
git version 2.x.x
2.1.278 (Claude Code)    <-- ต้องเป็น v2.1.139 ขึ้นไปสำหรับ Agent View
opencode v2.0.6           <-- รันคำสั่ง opencode run ได้
```

*หากคำสั่งใดแจ้งเตือนว่าไม่พบคำสั่ง (Not recognized) ให้ยกมือแจ้งผู้ช่วยสอนทันที*

---

## ขั้นตอนที่ 2: เตรียมโฟลเดอร์โปรเจกต์และไฟล์ `.env`

1. เปิด **VS Code** แล้วเลือก **Open Folder...** ชี้มาที่โฟลเดอร์ `build-ai-multi-agent-lab`
2. สร้างไฟล์การตั้งค่าสภาพแวดล้อม `.env` จากตัวอย่าง:

```powershell
Copy-Item .env.example .env
```

*(ไฟล์ `.env` มีการใส่ `.gitignore` ไว้แล้ว ปลอดภัย ไม่หลุดเข้า git)*

---

## ขั้นตอนที่ 3: ติดตั้ง Dependencies (ทำครั้งเดียว)

รันคำสั่งติดตั้งแพ็กเกจสำหรับทั้ง 3 โฟลเดอร์:

```powershell
# ติดตั้ง Backend Trade Desk
cd apps/trade-desk/backend; npm install; cd ../../..

# ติดตั้ง Frontend Trade Desk
cd apps/trade-desk/frontend; npm install; cd ../../..

# ติดตั้ง Command Center
cd apps/command-center; npm install; cd ../..
```

---

## ขั้นตอนที่ 4: เปิดรัน 4 เซิร์ฟเวอร์หลัก (แนะนำแยก 4 แท็บใน Terminal)

เปิด **Windows Terminal** แยกต่างหาก (คลิกขวา `+` เพื่อเปิดแท็บใหม่) — **ทุกแท็บต้อง `cd` มาที่ lab root ก่อน** (โฟลเดอร์ `build-ai-multi-agent-lab`):

### 🔹 แท็บ 1: Trade Desk Backend (API :4180)
```powershell
cd apps/trade-desk/backend
npm run dev
```
> ✅ **ผลที่เห็น:** `trade-desk backend http://127.0.0.1:4180`  
> ⚠️ Backend **ไม่ hot-reload** — หลัง agent แก้ `server.mjs` ให้กด `Ctrl+C` แล้วรัน `npm run dev` ใหม่

### 🔹 แท็บ 2: Trade Desk Frontend (UI :4173)
```powershell
cd apps/trade-desk/frontend
npm run dev
```
> ✅ **ผลที่เห็น:** `Local: http://localhost:4173/`

### 🔹 แท็บ 3: Command Center API (API :4181)
```powershell
cd apps/command-center
npm run server
```
> ✅ **ผลที่เห็น:** `command-center api http://127.0.0.1:4181`

### 🔹 แท็บ 4: Command Center UI (UI :4174)
```powershell
cd apps/command-center
npm run dev
```
> ✅ **ผลที่เห็น:** `Local: http://localhost:4174/`

---

## ขั้นตอนที่ 5: ตรวจผลในเบราว์เซอร์

เปิดเบราว์เซอร์ไปที่ 2 URL นี้พร้อมกัน:

1. **http://localhost:4173 (Trade Desk):**  
   คุณจะเห็นหัวข้อ *Crypto Trade Desk - Paper only* แผงราคายังเป็น `—` และสถานะฟีดแสดง `starter — แผงยังว่าง รอ Lab เติม`  
   *(นี่คือสถานะถูกต้อง! เราจงใจเว้นว่างไว้ให้คุณสั่ง Agent เติมใน Lab 01–02)*

2. **http://localhost:4174 (Command Center):**  
   คุณจะเห็นตารางเกณฑ์ผ่าน Trade Desk 6 ข้อเป็นวงกลมสีเทา `○` และลูกศร CLI ยังว่าง

---

## ขั้นตอนที่ 6: ตรวจสอบ Native Agent Harness

เปิดแท็บที่ 5 ใน Windows Terminal อยู่ที่ **root ของโปรเจกต์** เพื่อทดสอบ Agent ของทั้ง 2 ค่าย:

### 1) ตรวจสอบ Claude Code Agent View:
```powershell
claude agents
```
> ✅ **ผลที่เห็น:** หน้าต่าง Terminal จะสลับเป็นหน้าตาราง Agent View (ยังว่างอยู่ได้)  
> กด `Esc` หรือ `q` เพื่อกลับมาที่ Shell เมื่อเห็นตารางแล้ว

ทางเลือกตรวจแบบไม่เปิด TUI (ใช้ใน script ได้):
```powershell
claude agents --json
```
> ✅ **ผลที่เห็น:** `[]` หรือ JSON array ของ session — แปลว่าคำสั่งใช้งานได้

### 2) ตรวจสอบ OpenCode (TUI เป็นหลักใน SETUP):
```powershell
opencode
```
> ✅ **ผลที่เห็น:** เปิด TUI ได้ · กด `Tab` สลับ Build / Plan · ออกด้วย `Ctrl+C`

ทดสอบ CLI runner (ใช้จริงใน Lab 03 — ไม่บังคับผ่านใน SETUP):
```powershell
opencode run --agent backend "ตอบคำเดียว: backend agent พร้อมหรือยัง"
```
> ✅ **ผลที่เห็นที่ดี:** ได้ข้อความตอบสั้นๆ จาก backend agent  
> ⚠️ ถ้าเจอ `Error: Internal server error` ซ้ำๆ — ยัง**ผ่าน SETUP** ได้ถ้า `opencode` TUI เปิดได้ · ใน Lab 03 ให้รัน `opencode run ...` เองใน Terminal แยก แล้วคัดลอกผลกลับไปให้ Claude ช่วย `log-dispatch`

---

## ✅ ตรวจเช็กลิสต์ความพร้อมก่อนเข้า Lab 01

- [ ] VS Code เปิดที่ root โฟลเดอร์ `build-ai-multi-agent-lab`
- [ ] Windows Terminal รันทั้ง 4 เซิร์ฟเวอร์ครบ และเห็น URL พร้อมใช้งาน
- [ ] เปิด http://localhost:4173 (Trade Desk) ได้
- [ ] เปิด http://localhost:4174 (Command Center) ได้
- [ ] คำสั่ง `claude agents` เปิดหน้าจอ Agent View ได้
- [ ] คำสั่ง `opencode` เปิด TUI ได้ (หรือ `opencode run` ตอบกลับได้)
- [ ] ไฟล์ `.env` ถูกสร้างขึ้นเรียบร้อย

---

## 🛠️ ตารางแก้ปัญหาด่วน (Troubleshooting)

| อาการที่เจอ | สาเหตุที่เป็นไปได้ | วิธีแก้ไขทันที |
|---|---|---|
| **EADDRINUSE: address already in use :::4180 (หรือ 4173/4174/4181)** | มีโปรเซสเก่ายังค้างฟังพอร์ตอยู่ | รันคำสั่งปิดพอร์ตใน PowerShell:<br>`Get-Process -Id (Get-NetTCPConnection -LocalPort 4180).OwningProcess \| Stop-Process -Force` (เปลี่ยน 4180 ตามพอร์ตที่มีปัญหา) |
| **แผงราคาเป็นขีด `—` หรือกด Order แล้ว Error 501** | ตกใจคิดว่าระบบพัง | **ถูกต้องแล้ว!** Starter ถูกออกแบบให้ว่างเพื่อให้คุณสั่ง Specialist ใน Lab 01, 02, และ 05 |
| **ยิง curl ใน PowerShell แล้วเจอ SyntaxError 400** | PowerShell ตีความ double quote `\"` ใน JSON เพี้ยน | ใช้ `Invoke-RestMethod` หรือดูตัวอย่างใน skill `log-dispatch` ห้ามพิมพ์ `curl -d "{\"key\":\"val\"}"` ตรงๆ ใน PowerShell |
| **claude agents แจ้งว่า Unknown command** | Claude Code เวอร์ชันเก่ากว่า 2.1.139 | รัน `claude update` หรือติดต่อผู้ช่วยสอนเพื่ออัปเกรด |
| **ปุ่มลูกศรเลื่อนใน TUI เพี้ยนใน VS Code** | Terminal ใน VS Code จับ ANSI sequence บางตัวไม่ครบ | ใช้ **Windows Terminal แยกต่างหาก** ตามข้อแนะนำของคอร์ส |
| **แก้ backend แล้ว API ยังเป็น starter (`mode: empty`)** | Backend ไม่ reload อัตโนมัติ | แท็บ BE: `Ctrl+C` แล้ว `npm run dev` ใหม่ · ทดสอบ http://127.0.0.1:4180/api/prices |
| **`opencode run` → Internal server error** | โมเดล/provider ของ OpenCode ตอบผิดพลาดชั่วคราว | ใช้ `opencode` TUI + agent `backend` แทน · Lab 03 รัน CLI เองแล้ว log-dispatch ด้วยมือได้ |
| **`claude -p` / model catalog error 400** | โมเดลใน settings ไม่ตรง catalog ของ Claude Code | ใช้เซสชัน `claude` ปกติแทน · ปรับโมเดลใน settings ตามที่ห้องแนะนำ |
