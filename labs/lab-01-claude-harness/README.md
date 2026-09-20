# Lab 01 — Claude Code Harness (Frontend Specialist & Agent View)

**เวลาเป้าหมาย:** 70 นาที  
**เครื่องมือหลัก:** Claude Code CLI (`claude`), Frontend Agent, Agent View (`claude agents`)

---

## 🎯 วัตถุประสงค์การเรียนรู้ (Learning Objectives)

1. เข้าใจโครงสร้าง **Native Agent Harness** ของ Claude Code (`.claude/agents/` และ `.claude/skills/`)
2. ฝึกสั่งงานแบบ **Specialist with Bounded Context** — ให้ Frontend Agent ดูแลเฉพาะส่วน UI โดยไม่ก้าวก่าย Backend
3. เรียนรู้การใช้งาน **Agent View (`claude agents`)** เพื่อติดตามสถานะเซสชันของ Agent บนเครื่องตัวเอง
4. เริ่มต้นวงจรทำงาน **Interview → Plan → Build** ด้วยตนเอง

---

## 🧭 บริบท: ได้รับมาจากไหน & จะส่งต่ออะไร

```text
[SETUP ผ่านแล้ว]
  └─ :4173 เปิดได้ แต่สถานะฟีดยังเป็นข้อความนิ่ง "starter — แผงยังว่าง รอ Lab เติม"
        │
        ▼  (คุณลงมือใน Lab 01)
[สั่ง Frontend Agent ใน Claude Code]
  ├─ ควบคุมด้วยกฎ skill paper-only
  ├─ แก้ไข App.jsx ให้มี Badge แสดงสถานะ live / fixture / error ที่สวยงามและชัดเจน
  └─ เปิด Agent View ตรวจสอบ
        │
        ▼  (ส่งต่อเข้า Lab 02)
[Trade Desk พร้อมรับข้อมูลราคาจริงจาก Backend ใน Lab 02]
```

---

## 🛠️ ขั้นตอนการทดลอง (Hands-on Steps)

### ขั้นที่ 1: เปิดเซสชัน Claude Code ด้วย Frontend Specialist
เปิด Windows Terminal ใหม่ที่ root โฟลเดอร์ `build-ai-multi-agent-lab` แล้วรัน:

```powershell
claude --agent frontend
```
*(หรือพิมพ์ `claude` แล้วในเซสชันสามารถตรวจดู Specialist ได้)*

### ขั้นที่ 2: ตรวจสอบ Reusable Skills ที่พร้อมใช้งาน
1. ใน VS Code เปิดโฟลเดอร์ `.claude/skills/` — ต้องเห็นอย่างน้อย `paper-only`, `done-when`, `dispatch-opencode`, `log-dispatch`
2. ในเซสชัน Claude พิมพ์ในข้อความแรกของพรอมต์ว่า **「โหลด skill paper-only」** (พรอมต์ใน `prompts/` มีให้แล้ว)

> 💡 Slash command แสดงรายการ skill อาจแตกต่างตามเวอร์ชัน Claude Code — **เกณฑ์ผ่าน Lab ไม่ได้ผูกกับ `/skills`** แต่ผูกกับว่า agent ทำงานภายใต้ `paper-only` และไม่แตะ backend

### ขั้นที่ 3: สั่งงานด้วยพรอมต์ตั้งต้น (แล้วคุยต่อยอดด้วยตนเอง)
คัดลอกเนื้อหาจาก [`prompts/01-ticker-status.md`](prompts/01-ticker-status.md) วางลงใน Claude:

```text
คุณเป็น frontend agent ของ Paper Crypto Trade Desk
1. โหลด skill paper-only
2. อ่าน apps/trade-desk/frontend/src/App.jsx
3. ทำให้ผู้ใช้เห็นสถานะฟีด (live / fixture / error) ชัดเจนขึ้นบน UI เช่น แสดง Badge สีเขียว/ส้ม/แดง โดยไม่แก้ backend
4. ตรวจบน http://localhost:4173
5. สรุปสั้นๆ ว่าแก้ไฟล์ไหน และผู้เรียนควรเห็นอะไรบนจอ
```

### ขั้นที่ 4: สวมบทบาท Architect สั่งต่อยอด (อย่าหยุดแค่รอบแรก!)
เมื่อ Claude เสนอการแก้ไข แนะนำให้คุยต่อยอดเพื่อสร้างเอกลักษณ์ของ Trade Desk ตัวเอง เช่น:
- *"ช่วยปรับขนาดตัวอักษรและเพิ่มไอคอนสถานะเล็กๆ ให้ดูเป็น Professional Trading Terminal"*
- *"ถ้าฟีดเป็น error ให้แสดงข้อความเตือนผู้ใช้ด้วยสีส้มอ่อน ไม่ให้บังหน้าจอหลัก"*

### ขั้นที่ 5: ตรวจผลงานบนเบราว์เซอร์
เปิดเบราว์เซอร์ไปที่ **http://localhost:4173**  
กด Refresh คุณจะต้องเห็นสถานะฟีดเปลี่ยนไปตามที่คุณสั่ง Agent ปรับปรุง

### ขั้นที่ 6: เปิด Agent View ตรวจสอบงานเบื้องหลัง
เปิดแท็บใหม่ใน Windows Terminal ที่ root โฟลเดอร์ แล้วรัน:
```powershell
claude agents
```
คุณจะเห็นตารางของ Claude Agent View ซึ่งจะใช้เป็นจอหลักในการมอนิเตอร์เซสชันและ subagents ในแล็บถัดๆ ไป

### ขั้นที่ 7: บันทึกผลใน Learning Log
เปิดไฟล์ `workspace/learning-log.md` ใน VS Code แล้วเขียนบันทึกสั้นๆ ใต้หัวข้อ `## Lab 01`

---

## 💡 สถาปัตยกรรม & Pro-Tips จาก Lead Architect

> **ทำไมต้องแยก Frontend Agent ออกมา?**  
> ในโปรเจกต์ขนาดใหญ่ การให้ AI ตัวเดียวเห็นทั้งระบบมักนำไปสู่ปัญหา "แก้หน้าบ้านแล้วไปพังหลังบ้าน" หรือแก้ไขไฟล์ชนกัน การกำหนด `frontend.md` ให้มี Bounded Context เฉพาะ `apps/trade-desk/frontend/` พร้อมคำสั่งเด็ดขาดว่า *ห้ามแก้ backend* ช่วยลดความเสี่ยงข้อผิดพลาดได้มากกว่า 80%

### ⌨️ Slash Commands ที่มีประโยชน์ใน Lab นี้:
- `/plan [งาน]` — ให้ Agent วางแผนก่อนแก้โค้ดจริง
- `/compact` — ย่อบทสนทนาเมื่อประวัติการคุยเริ่มยาว เพื่อคืนโทเคนบริบท
- `/tasks` — ตรวจดูงานเบื้องหลังที่กำลังรันอยู่

---

## ✅ เกณฑ์ผ่าน Lab 01

บนเครื่องของคุณ:
- [ ] หน้า Trade Desk (:4173) แสดง Badge หรือสถานะฟีดที่อ่านง่ายชัดเจนขึ้น
- [ ] ไฟล์ใน `apps/trade-desk/backend/` ไม่มีการถูกแก้ไขหรือกระทบกระเทือน
- [ ] คุณสามารถเปิดคำสั่ง `claude agents` เพื่อดูตาราง Agent View ได้ด้วยตัวเอง
- [ ] มีบันทึกผลการทดลองใน `workspace/learning-log.md`
