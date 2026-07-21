# Lab 11 — Capstone (ครบสูตร + Deploy)

**Outline 13:** Capstone  
**ลำดับงาน:** Ship

## ได้รับมาจาก Lab ก่อน

- ทั้งบันได Lab 01–10: specialist, สิทธิ์, memory, ทีมสองเครื่องมือ, ด่าน, รวมผล, Flux
- บอร์ด Flux ของ Agent Cost Board

## ได้เพิ่มใน Lab นี้

ประกอบทุกชั้นแล้ว **Deploy & Share** + สูตรนำไปใช้กับบอร์ดงานอื่น

## เป้าหมาย

มี URL สาธารณะ บอร์ดถึงคอลัมน์ Ship และบันทึกต้นทุนที่เล่าต่อได้

**จุดที่ควรรู้สึกว้าว:** แชร์ลิงก์แผงของตัวเองในห้องได้

> **กฎโปรเจกต์:** ห้ามยืนยันว่า deploy สำเร็จถ้ายังไม่มี URL จริง (`CLAUDE.md`)  
> **มาตรฐาน go-live:** Lab 10 ต้องเหลือการ์ดหลัก 3 ใบ มอบหมายชัด เลื่อนหลังงานจริง — Lab 11 ต้องมี URL สาธารณะที่แผงโหลดได้จริง ไม่ใช่ POC

## ผลลัพธ์รูปธรรม

1. **ต้องมีไฟล์/หลักฐานเหล่านี้**
   - `workspace/contracts/capstone-ship.json` มี `public_url` จริงขึ้นต้น `http`
   - learning-log มีสูตรนำไปใช้
   - การ์ดบน Flux ใกล้/ถึงคอลัมน์ Ship (จาก Lab 10)
2. **ต้องเห็นด้วยตาอะไร**
   - เปิด URL สาธารณะแล้วแผง Agent Cost Board โหลดได้
3. **เช็คผ่านด้วยคำสั่งนี้**

```powershell
# เปิด public_url ในเบราว์เซอร์ / curl
node shared/scripts/validate-json.mjs workspace/contracts/capstone-ship.json
```

4. **ยังไม่ผ่านถ้า…**
   - URL ปลอม / ไม่มี deploy จริง / เขียน capstone-ship ทั้งที่ยัง BLOCKED / ข้าม Lab 10

## เลือกวิธีรัน

| ทาง | เหมาะกับ | หมายเหตุ |
|---|---|---|
| **A — TUI** | Deploy แล้วให้ Claude เขียนสัญญา | ต้องมี URL จริงก่อน |
| **B — CLI** | เขียน `capstone-ship.json` หลังมี URL | ถ้ายังไม่มี URL → จด BLOCKED ใน learning-log **อย่า**ใส่ URL ปลอม |

---

## Pre-flight (ติ๊กก่อน Deploy — ผูก Lab 10)

- [ ] Ownership Frontend / Backend / QA ชัด (`role-cards.json`)
- [ ] ด่านคุณภาพเคย FAIL และเคย PASS (`audit-result.json`)
- [ ] Lab 10: มีบอร์ด Flux สด + `kanban-snapshot.json` จากบอร์ดจริง
- [ ] Flux มีการ์ดถึงคอลัมน์ใกล้ Ship
- [ ] Synthesize แล้วเปิดแผงได้ (`synthesize-report.json`)
- [ ] บันทึกต้นทุน: ใช้ Subagents หรือ Teams เพราะอะไร

```powershell
Test-Path .\workspace\contracts\role-cards.json
Test-Path .\workspace\contracts\handoff-fe.json
Test-Path .\workspace\contracts\handoff-be.json
Test-Path .\workspace\contracts\audit-result.json
Test-Path .\workspace\contracts\synthesize-report.json
Test-Path .\workspace\contracts\kanban-snapshot.json
Select-String -Path .\.env -Pattern '^FLUX_WORKSPACE_URL='
```

---

## ทาง A — TUI

1. เลื่อนการ์ดบน Flux ไป Ship เมื่อด่านผ่าน  
2. Deploy **ทั้ง** `apps/sample-dashboard/` (มี `frontend/` + `backend/`) — Cloudflare Pages / Netlify / Azure Static Web Apps / host ห้อง  
   อย่าอัปแค่ `frontend/` อย่างเดียว (path `../backend` จะพัง)  
3. คัดลอก **public URL จริง** (หน้า `/frontend/` ที่แผงโหลดได้)  
4. เปิด `claude` วาง [`prompts/01-capstone-ship.md`](prompts/01-capstone-ship.md)  
5. แชร์ลิงก์ให้เพื่อนอย่างน้อย 1 คน  
6. Git: `status` → `add` → `commit` (push ตามที่ห้องอนุญาต)  
7. จดสูตรนำไปใช้ใน learning-log

---

## ทาง B — CLI

### B1) ยังไม่มี URL — บันทึก BLOCKED (ถูกต้องตามกฎ)

```powershell
$p = @'
IMPORTANT: do NOT claim deploy succeeded without a real public URL.
If no real URL exists, do NOT write capstone-ship.json with a fake URL.
Append "## Lab 11" to workspace/learning-log.md with status BLOCKED and pre-flight checklist from existing artifacts.
'@

$p | claude -p --permission-mode acceptEdits --output-format text --no-session-persistence
```

### B2) มี URL จริงแล้ว — เขียนสัญญา

แทนที่ `https://YOUR-REAL-URL` ด้วยลิงก์ที่ได้จากโฮสต์:

```powershell
$p = @'
Write workspace/contracts/capstone-ship.json using
shared/contracts/capstone-ship.example.json.

Fill in:
- public_url = https://YOUR-REAL-URL
- deploy_target (Vercel or Netlify or classroom host)
- gate_status PASS
- kanban_column Ship
- cost_note explaining Subagents vs Teams choice
- shared_with_classmate true/false

project_id = agent-cost-board
If node is available, validate with node shared/scripts/validate-json.mjs workspace/contracts/capstone-ship.json
Update learning-log Lab 11 from BLOCKED to DONE.
'@

$p | claude -p --permission-mode acceptEdits --output-format text --no-session-persistence
```

---

## สูตรนำไปใช้ (ใส่ใน learning-log)

```text
สร้างบอร์ด Flux ใหม่
  → แตกการ์ด + บทบาท (ตาม role-cards)
  → มอบหมาย Claude Code และ/หรือ OpenCode
  → ลงมือตาม ownership → อัปเดตสัญญา JSON
  → เลื่อนการ์ดตามสถานะจริง
  → ด่านคุณภาพ/ต้นทุน แล้วค่อย Ship (มี URL จริง)
```

## ข้อความพร้อมวาง

[`prompts/01-capstone-ship.md`](prompts/01-capstone-ship.md)

## ผลที่คาดหวัง

- URL เปิดได้จริง
- `capstone-ship.json` ผ่าน validator
- พร้อมนำเสนอ 5 นาที: ปัญหา / ด่าน / สิ่งที่บอกต่อ

## เกณฑ์ผ่าน Lab

ต้องตรงกับ **ผลลัพธ์รูปธรรม** ด้านบน 1:1

- [ ] Pre-flight ผ่าน (รวม Lab 10 บอร์ดสด)
- [ ] มี public URL จริงขึ้นต้น `http` และแผงโหลดได้
- [ ] มีบันทึกต้นทุน + หลักฐานบอร์ด
- [ ] มี `capstone-ship.json` ผ่าน validator
- [ ] นำเสนอได้สั้น ๆ + สูตรนำไปใช้ใน learning-log

## ทางเลือกเมื่อเครื่องมือไม่พร้อม

Vercel/Netlify ล็อกอินไม่ได้ — ใช้ static host ที่ห้องเตรียม หรือแชร์ zip + บันทึกเหตุผล (ถามวิทยากรว่าผ่านแทนได้หรือไม่)

## แก้ปัญหาเบื้องต้น

| อาการ | ทำอะไร |
|---|---|
| หน้า deploy เปล่า | ตรวจว่าอัปโหลดโฟลเดอร์ frontend ถูก และ path JSON ยังชี้ backend ได้หรือต้องปรับโฮสต์ |
| ไม่มี gate PASS | กลับ Lab 08 |
| Agent ใส่ example.vercel.app | ปฏิเสธ — ต้องเป็น URL จริงของคุณ |
