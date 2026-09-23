# Lab 03 — สั่งข้าม CLI (Cross-CLI Dispatch & Command Center Watch)

**เวลาเป้าหมาย:** 55 นาที  
**เครื่องมือหลัก:** Claude Code CLI (`claude`), OpenCode CLI Runner (`opencode run`), Command Center Timeline & Arrows

---

## 🎯 วัตถุประสงค์การเรียนรู้ (Learning Objectives)

1. เข้าใจกลไกการสื่อสารข้ามเครื่องมือแบบ **CLI-to-CLI Dispatch** โดยไม่ต้องพึ่ง Middleware หรือ Message Queue ภายนอก
2. เรียนรู้วิธีให้ Claude Code เรียกคำสั่ง `opencode run` เพื่อมอบหมายงานให้ Backend Specialist
3. ใช้ทักษะ `log-dispatch` เพื่อส่งบันทึกเหตุการณ์ (Audit Trail) ไปยัง Command Center
4. สังเกตการแสดงผล **Timeline และลูกศรข้ามค่าย** บนหน้าจอ Command Center (:4174)

---

## 🧭 บริบท: ได้รับมาจากไหน & จะส่งต่ออะไร

```text
[จบ Lab 01 & 02]
  ├─ Frontend ปรับปรุงได้ผ่าน Claude Code
  └─ Backend ปรับปรุงได้ผ่าน OpenCode
        │
        ▼  (คุณลงมือใน Lab 03)
[สั่งข้ามเครื่องมือ: Claude เรียก opencode run]
  ├─ Claude ใช้ skill dispatch-opencode
  ├─ Claude สั่งรันคำสั่ง opencode run --agent backend ตรวจความพร้อม API
  └─ บันทึกลง workspace/command-center/events.jsonl (ผ่าน skill log-dispatch)
        │
        ▼  (ส่งต่อเข้า Lab 04 & 05)
[Command Center แสดงลูกศร claude ──► opencode เป็นหลักฐานยืนยัน]
```

---

## 🛠️ ขั้นตอนการทดลอง (Hands-on Steps)

### ขั้นที่ 1: เปิด Claude Code ที่ Root โปรเจกต์
เปิด Windows Terminal ที่ root โฟลเดอร์ `build-ai-multi-agent-lab` แล้วรัน:

```powershell
claude
```

### ขั้นที่ 2: มอบหมายให้ Claude สั่งงาน OpenCode
คัดลอกพรอมต์จาก [`prompts/01-claude-calls-opencode.md`](prompts/01-claude-calls-opencode.md) วางลงใน Claude:

```text
คุณเป็นหัวหน้าทีมในเซสชัน Claude นี้
1. โหลด skill dispatch-opencode และ log-dispatch
2. สั่ง OpenCode ตรวจสอบ backend ผ่าน CLI ด้วยคำสั่ง:
   opencode run --agent backend "ตรวจ GET /api/prices, GET /api/portfolio และ POST /api/orders แล้วตอบสั้นๆ ว่าข้อไหนพร้อมแล้ว ข้อไหนยังเป็น starter — อย่าแก้ frontend และอย่าเติม paper order ใน Lab นี้"
3. เมื่อได้ผลลัพธ์ ให้บันทึกเหตุการณ์ dispatch ผ่าน skill log-dispatch
4. สรุปผลการตรวจสอบให้ผู้ใช้ทราบ
```

### ขั้นที่ 3: ตรวจสอบการทำงานของ Claude
- Claude จะขอสิทธิ์รันคำสั่ง Terminal (กด `y` ยืนยัน)
- Claude จะเรียกคำสั่ง `opencode run` ไปยัง backend agent ในเครื่องของคุณ
- Backend agent ใน OpenCode จะรันงาน วิเคราะห์ API แล้วคืนข้อความสรุปกลับมาให้ Claude
- Claude จะบันทึกเหตุการณ์ลงใน `workspace/command-center/events.jsonl`

**ทางเลือกเมื่อ `opencode run` ล้ม (Internal server error):**
1. เปิด Terminal แยกที่ lab root แล้วรันคำสั่งใน prompt เอง
2. คัดลอกผลสรุปกลับไปให้ Claude ในเซสชันเดิม
3. ใช้ skill `log-dispatch` หรือ `Invoke-RestMethod` ไปที่ `:4181/api/events` — **ยังผ่าน Lab ได้** ถ้ามีลูกศร dispatch ของคุณบน :4174

### ขั้นที่ 4: ตรวจสอบลูกศรบน Command Center
เปิดเบราว์เซอร์ไปที่ **http://localhost:4174** (Command Center):
- ดูที่ส่วน **CLI Dispatches / Timeline**
- คุณจะต้องเห็นกล่องเหตุการณ์และลูกศร:
  ```text
  [claude] ────────► [opencode]
  ตรวจ GET /api/prices, GET /api/portfolio และ POST /api/orders
  ```

---

## 💡 สถาปัตยกรรม & Pro-Tips จาก Lead Architect

> **ทำไมใช้ CLI Subshell แทนการทำ Central Message Broker?**  
> ในการพัฒนา Local Multi-Agent สถาปัตยกรรมที่เรียบง่ายและเสถียรที่สุดคือการใช้ **Standard Input/Output (stdio) และ CLI interface** ของแต่ละเครื่องมือ การสร้าง Queue หรือ REST API ตัวกลางครอบ AI มักทำให้เกิด Single Point of Failure และสูญเสีย Interactive Context ของแต่ละ CLI

### ⚠️ ข้อควรระวังเฉพาะของ Windows PowerShell:
หากต้องการยิงบันทึกด้วยมือผ่าน Terminal:
- ❌ **ห้ามใช้:** `curl -d "{\"type\":\"dispatch\"...}"` (PowerShell จะทำให้ JSON แตกและ Server ตอบ 400 Bad Request)
- ✅ **ให้ใช้:** `Invoke-RestMethod` ของ PowerShell หรือเขียนต่อท้ายไฟล์ `events.jsonl` โดยตรง:
```powershell
$line = @{
  at = (Get-Date).ToUniversalTime().ToString('o')
  type = 'dispatch'
  from = 'claude'
  to = 'opencode'
  summary = 'ตรวจสอบสถานะ backend API'
} | ConvertTo-Json -Compress

Add-Content -Path workspace/command-center/events.jsonl -Value $line
```

---

## ✅ เกณฑ์ผ่าน Lab 03

บนเครื่องของคุณ:
- [ ] มีการสั่งรัน CLI ข้ามค่ายเกิดขึ้นจริง (Claude เรียก OpenCode หรือ OpenCode เรียก Claude)
- [ ] Command Center (:4174) แสดงลูกศร Dispatch พร้อมเวลาและข้อความสรุป
- [ ] ไฟล์ `workspace/command-center/events.jsonl` มีบันทึกบรรทัดใหม่เพิ่มขึ้น
- [ ] บันทึกสิ่งที่สังเกตได้ลงใน `workspace/learning-log.md`
