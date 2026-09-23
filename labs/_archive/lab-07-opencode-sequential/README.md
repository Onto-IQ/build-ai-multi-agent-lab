# Lab 07 — Multi-Agent on OpenCode (ลำดับ)

**Outline 9:** Multi-Agent on OpenCode  
**ลำดับงาน:** Build → Test

## ได้รับมาจาก Lab ก่อน

- role cards + handoff จาก Lab 05–06
- OpenCode specialist จาก Lab 02

## ได้เพิ่มใน Lab นี้

รันทีมบน OpenCode แบบ**ลำดับ** โดย**อ่าน `handoff-fe.json` จาก Lab 06 (Claude) ก่อน** แล้ว Frontend → Backend → QA + เขียน `handoff-be.json`

## เป้าหมาย

เห็นลำดับชัดบน Agent Cost Board และให้ QA ใช้เช็กลิสต์จริง — สะพานข้ามเครื่องมือผ่าน **JSON ไม่ใช่ Kanban**

**จุดที่ควรรู้สึกว้าว:** FE → BE → QA เห็นคิวงานชัด

## ผลลัพธ์รูปธรรม

1. **ต้องมีไฟล์/หลักฐานเหล่านี้**
   - อ่าน `workspace/contracts/handoff-fe.json` ก่อนลงมือ
   - diff ตาม ownership; `apps/sample-dashboard/backend/runs.json` มีรอบใหม่ ≥ 1
   - `workspace/contracts/handoff-be.json`
   - QA โน้ตใน learning-log จาก `CHECKLIST.md`
2. **ต้องเห็นด้วยตาอะไร**
   - ลำดับ FE→BE→QA จบจริง (คนละรอบ / คนละคำสั่ง)
3. **เช็คผ่านด้วยคำสั่งนี้**

```powershell
Test-Path .\workspace\contracts\handoff-fe.json
node shared/scripts/validate-json.mjs workspace/contracts/handoff-be.json
git status -- apps/sample-dashboard/frontend apps/sample-dashboard/backend apps/sample-dashboard/qa
```

4. **ยังไม่ผ่านถ้า…**
   - ข้ามการอ่าน handoff-fe / ทำ FE+BE พร้อมกันแล้วชนไฟล์ / ไม่มี handoff-be / QA แก้โค้ดแอปเพื่อบังคับผ่าน

> ใน Lab 10 การ์ดบน Flux จะสะท้อนสถานะงานเดียวกัน — แต่การส่งงานข้ามเครื่องมือยังใช้ JSON

## เลือกวิธีรัน

| ทาง | เหมาะกับ | คำสั่งหลัก |
|---|---|---|
| **A — TUI** | เรียนในห้องทีละขั้น | `opencode` แล้ววาง prompt คนละรอบ |
| **B — CLI** | ทำซ้ำ / สคริปต์ | สามครั้ง `opencode run` **ตามลำดับ** (รอจบก่อนเริ่มอันถัดไป) |

> **PowerShell:** ส่ง prompt ผ่าน stdin เท่านั้น — อย่าใช้ `opencode run $prompt` แบบ argument ยาว (จะค้าง — ดู Lab 02)  
> งานที่เขียนไฟล์: ใส่ `--auto`

ไฟล์ร่วม:

- [`apps/sample-dashboard/qa/CHECKLIST.md`](../../apps/sample-dashboard/qa/CHECKLIST.md)
- [`prompts/01-frontend.md`](prompts/01-frontend.md) → [`02-backend.md`](prompts/02-backend.md) → [`03-qa.md`](prompts/03-qa.md)
- ผล handoff: `workspace/contracts/handoff-be.json`

---

## 0) Preflight

```powershell
opencode --version
opencode models 2>&1 | Select-Object -First 8
Test-Path .\apps\sample-dashboard\qa\CHECKLIST.md
Test-Path .\workspace\contracts\handoff-fe.json
# บังคับ: อ่าน handoff จาก Lab 06 ก่อนเริ่ม FE
Get-Content .\workspace\contracts\handoff-fe.json
```

ถ้ายังไม่มี `handoff-fe.json` → กลับ Lab 06 ให้ Claude เขียนก่อน

ทดสอบสั้น ๆ ก่อนเริ่มลำดับ:

```powershell
"Reply with exactly: OC_OK" | opencode run --auto --format default -m "opencode/mimo-v2.5-free"
```

ถ้าขึ้น `Error: No provider available` → สลับ `-m` เป็นโมเดลอื่นจาก `opencode models` แล้วลองใหม่ **ก่อน**เริ่ม FE

---

## ทาง A — TUI

### A1) อ่าน handoff แล้ว Frontend

```powershell
opencode
```

สั่งก่อนลงมือ: อ่าน `workspace/contracts/handoff-fe.json` ให้จบ  
แล้ววาง [`prompts/01-frontend.md`](prompts/01-frontend.md) — รอจบ ห้ามเริ่ม Backend กลางคัน

### A2) Backend

วาง [`prompts/02-backend.md`](prompts/02-backend.md)  
ตรวจ `runs.json` มีรอบใหม่ และมี `workspace/contracts/handoff-be.json`

### A3) QA

วาง [`prompts/03-qa.md`](prompts/03-qa.md)  
QA ต้องอ่าน CHECKLIST — **ห้าม**แก้ frontend/backend เพื่อบังคับผ่าน

### A4) learning-log

จดว่าใช้ **manual sequential** หรือ plugin

---

## ทาง B — CLI (ลำดับมือ)

รันทีละบล็อก — ดูให้จบก่อนคัดลอกบล็อกถัดไป

### B1) Frontend

```powershell
$fe = @'
Read workspace/contracts/handoff-fe.json FIRST. Do not start without it.
You are Frontend only for Agent Cost Board. Respect ownership — do not edit backend/ or qa/.
Improve clarity of the runs table or status cards in apps/sample-dashboard/frontend/.
When done, summarize files touched for the next handoff.
'@

$fe | opencode run --agent specialist --auto --format default -m "opencode/mimo-v2.5-free" --title "lab-07-frontend"
```

### B2) Backend

```powershell
$be = @'
Read workspace/contracts/handoff-fe.json and any Frontend summary first.
You are Backend only for Agent Cost Board. Do not edit frontend/.
Update apps/sample-dashboard/backend/runs.json to include at least one new run
from this classroom session (Claude Code or OpenCode).
Keep status.json with status = "ok".
Write workspace/contracts/handoff-be.json when finished (schema: shared/contracts/handoff-be.example.json).
'@

$be | opencode run --agent specialist --auto --format default -m "opencode/mimo-v2.5-free" --title "lab-07-backend"
```

ตรวจ:

```powershell
Get-Content .\apps\sample-dashboard\backend\runs.json
Test-Path .\workspace\contracts\handoff-be.json
```

### B3) QA

```powershell
$qa = @'
You are QA only.
Use apps/sample-dashboard/qa/CHECKLIST.md.
Mark what passes/fails in a short note in workspace/learning-log.md under Lab 07.
Do not edit frontend/ or backend/ source to force a pass.
Note that this Lab used manual sequential OpenCode CLI (not plugin).
'@

$qa | opencode run --agent specialist --auto --format default -m "opencode/mimo-v2.5-free" --title "lab-07-qa"
```

### B4) ถ้าขั้นไหนขึ้น `No provider available`

1. รอสักครู่ แล้วรันขั้นนั้นซ้ำ  
2. หรือเปลี่ยน `-m` (ดู `opencode models`)  
3. หรือรันขั้นนั้นใน **TUI** แทน — ลำดับ FE→BE→QA ยังเหมือนเดิม  
4. จดใน learning-log ว่าขั้นไหน flake

---

## ผลที่คาดหวัง

- อ่าน `handoff-fe.json` ก่อนลงมือ
- มีการเปลี่ยนแปลงตาม ownership คนละโฟลเดอร์ (อย่างน้อย Backend มีรอบใน `runs.json`)
- มี `handoff-be.json` ผ่าน validator
- QA อ้างอิง CHECKLIST.md ใน learning-log
- learning-log ระบุ plugin หรือ manual sequential

## เกณฑ์ผ่าน Lab

ต้องตรงกับ **ผลลัพธ์รูปธรรม** ด้านบน 1:1

- [ ] อ่าน `handoff-fe.json` ก่อน แล้วมีลำดับ Frontend → Backend → QA ที่ทำจริง
- [ ] `runs.json` มีรอบใหม่ ≥ 1 และ `handoff-be.json` ผ่าน validator
- [ ] QA ใช้ `apps/sample-dashboard/qa/CHECKLIST.md` (ไม่แก้โค้ดแอปเพื่อบังคับผ่าน)
- [ ] learning-log ระบุวิธีรัน

## ทางเลือกเมื่อเครื่องมือไม่พร้อม

ติดตั้ง plugin ไม่ได้ → รันลำดับมือตาม prompts นี้ยังผ่าน  
ขั้น FE/BE flake บน CLI → ทำขั้นนั้นใน TUI แล้วกลับมา CLI ต่อได้

## แก้ปัญหาเบื้องต้น

| อาการ | ทำอะไร |
|---|---|
| ทำพร้อมกันแล้วไฟล์ชน | กลับไปทำทีละ prompt ตามลำดับ |
| CLI ค้าง | ใช้ stdin pipeline + `--auto` (Lab 02) |
| `Error: No provider available` | สลับ model / รอ / ใช้ TUI สำหรับขั้นนั้น |
| `node` missing ตอน QA รัน validator | จด BLOCKED ใน checklist แล้วตรวจสัญญาด้วยตา — ติด Node ก่อน Lab 08 |
