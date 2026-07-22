# Lab 07 — Multi-Agent on OpenCode (ลำดับ)

**Outline 9:** Multi-Agent on OpenCode  
**ลำดับงาน:** Build → Test

### คุณอยู่ตรงไหน

`Interview → Plan → **Build** → **Test** → Ship`

| | |
|---|---|
| **Identity + เครื่องมือ** | OpenCode เท่านั้น · `--agent backend` → `--agent qa` (ห้าม `specialist` เป็นทางหลัก) |
| **รับมาจาก** | อ่าน `handoff-fe.json` ที่ Claude Lab 06 เขียนก่อนลงมือ |
| **ส่งต่อไป** | `handoff-be.json` + `runs.json` → Lab 08 (`--agent qa` ด่าน) |
| **ห้าม** | ทำ Frontend ซ้ำบน OpenCode — FE อยู่ Claude แล้ว |

## ได้รับมาจาก Lab ก่อน

- `handoff-fe.json` จาก Lab 06 (Claude `frontend`)
- `.opencode/agents/backend.md`, `.opencode/agents/qa.md` (artifact จาก Lab 05)

## ได้เพิ่มใน Lab นี้

รันทีมบน OpenCode แบบ**ลำดับ**: อ่าน handoff จาก Claude → **Backend → QA** + เขียน `handoff-be.json`

## เป้าหมาย

เห็นสะพานข้ามเครื่องมือผ่าน **JSON** — OpenCode ไม่ bicopy Frontend แต่รับงานต่อจาก Claude

**จุดที่ควรรู้สึกว้าว:** อ่าน handoff ของ Claude แล้ว `backend` / `qa` คนละรอบปิดงานได้จริง

## ผลลัพธ์รูปธรรม

1. **ต้องมีไฟล์/หลักฐานเหล่านี้**
   - อ่าน `workspace/contracts/handoff-fe.json` ก่อนลงมือ
   - รัน `--agent backend` แล้ว `--agent qa` คนละรอบ (ไม่ใช้ `--agent specialist` เป็นทางหลัก)
   - `apps/sample-dashboard/backend/runs.json` มีรอบใหม่ ≥ 1
   - `workspace/contracts/handoff-be.json`
   - QA โน้ตใน learning-log จาก `CHECKLIST.md`
2. **ต้องเห็นด้วยตาอะไร**
   - ลำดับ Backend → QA จบจริง (คนละคำสั่ง)
3. **เช็คผ่านด้วยคำสั่งนี้**

```powershell
Test-Path .\workspace\contracts\handoff-fe.json
opencode agent list 2>&1 | Select-String -Pattern '^(backend|qa) '
node shared/scripts/validate-json.mjs workspace/contracts/handoff-be.json
git status -- apps/sample-dashboard/backend apps/sample-dashboard/qa
```

4. **ยังไม่ผ่านถ้า…**
   - ข้ามการอ่าน handoff-fe / ใช้ `specialist` สลับหมวกเป็นทางหลัก / ไม่มี handoff-be / QA แก้โค้ดแอปเพื่อบังคับผ่าน / ทำ FE บน OpenCode เป็นขั้นบังคับ

> ใน Lab 10 การ์ด BE/QA บน Flux ใช้ agent ชื่อเดียวกัน — การส่งงานข้ามเครื่องมือยังใช้ JSON

## เลือกวิธีรัน

| ทาง | เหมาะกับ | คำสั่งหลัก |
|---|---|---|
| **A — TUI** | เรียนในห้องทีละขั้น | `opencode` เลือก agent `backend` แล้ว `qa` |
| **B — CLI** | ทำซ้ำ / สคริปต์ | สองครั้ง `opencode run --agent backend` แล้ว `--agent qa` |

> **PowerShell:** ส่ง prompt ผ่าน stdin เท่านั้น — อย่าใช้ argument ยาว (จะค้าง — ดู Lab 02)  
> งานที่เขียนไฟล์: ใส่ `--auto`

ไฟล์ร่วม:

- [`apps/sample-dashboard/qa/CHECKLIST.md`](../../apps/sample-dashboard/qa/CHECKLIST.md)
- [`prompts/01-read-handoff.md`](prompts/01-read-handoff.md) → [`02-backend.md`](prompts/02-backend.md) → [`03-qa.md`](prompts/03-qa.md)
- ผล handoff: `workspace/contracts/handoff-be.json`

---

## 0) Preflight

```powershell
opencode --version
opencode agent list 2>&1 | Select-String -Pattern 'backend|qa|specialist'
Test-Path .\.opencode\agents\backend.md
Test-Path .\.opencode\agents\qa.md
Test-Path .\apps\sample-dashboard\qa\CHECKLIST.md
Test-Path .\workspace\contracts\handoff-fe.json
Get-Content .\workspace\contracts\handoff-fe.json
```

ถ้ายังไม่มี `handoff-fe.json` → กลับ Lab 06  
ถ้า `backend`/`qa` ไม่ขึ้น list → กลับ Lab 05 สร้าง artifacts ผ่าน CLI/TUI

ทดสอบสั้น ๆ:

```powershell
"Reply with exactly: OC_OK" | opencode run --agent backend --auto --format default -m "opencode/mimo-v2.5-free"
```

---

## ทาง A — TUI

### A1) อ่าน handoff

```powershell
opencode
```

เลือก agent **backend** — สั่งอ่าน `workspace/contracts/handoff-fe.json` ให้จบ (ดู [`prompts/01-read-handoff.md`](prompts/01-read-handoff.md))  
**ห้าม**เริ่มงานก่อนอ่านจบ

### A2) Backend

วาง [`prompts/02-backend.md`](prompts/02-backend.md)  
ตรวจ `runs.json` มีรอบใหม่ และมี `workspace/contracts/handoff-be.json`

### A3) QA

สลับ agent เป็น **qa** — วาง [`prompts/03-qa.md`](prompts/03-qa.md)  
QA อ่าน CHECKLIST — **ห้าม**แก้ frontend/backend เพื่อบังคับผ่าน

### A4) learning-log

วาง [`prompts/04-learning-log.md`](prompts/04-learning-log.md) (หรือข้ามได้ถ้า [`03-qa.md`](prompts/03-qa.md) อัป log ครบแล้ว):

```text
Append "## Lab 07" to workspace/learning-log.md.
Note this Lab used named agents: --agent backend then --agent qa (manual sequential)
after reading handoff-fe.json from Claude Lab 06.
Summarize what QA marked pass/fail from apps/sample-dashboard/qa/CHECKLIST.md.
Do not edit frontend/ or backend/ source. Only edit workspace/learning-log.md.
Reply short Thai.
```

---

## ทาง B — CLI (ลำดับมือ)

รันทีละบล็อก — รอจบก่อนบล็อกถัดไป

### B1) อ่าน handoff (บังคับก่อน Backend)

```powershell
Get-Content .\workspace\contracts\handoff-fe.json
# หรือวาง prompts/01-read-handoff.md ในรอบ backend แรก
```

### B2) Backend

```powershell
$be = Get-Content -Raw .\labs\lab-07-opencode-sequential\prompts\02-backend.md
# หรือใช้ข้อความด้านล่าง

$be = @'
Read workspace/contracts/handoff-fe.json FIRST (from Claude Lab 06). Do not start without it.
You are OpenCode agent backend only. Do not edit frontend/. Do not use specialist.
Update apps/sample-dashboard/backend/runs.json with at least one new run from this session.
Keep status.json status = "ok".
Write workspace/contracts/handoff-be.json (schema: shared/contracts/handoff-be.example.json).
'@

$be | opencode run --agent backend --auto --format default -m "opencode/mimo-v2.5-free" --title "lab-07-backend"
```

ตรวจ:

```powershell
Get-Content .\apps\sample-dashboard\backend\runs.json
Test-Path .\workspace\contracts\handoff-be.json
node shared/scripts/validate-json.mjs workspace/contracts/handoff-be.json
```

### B3) QA

```powershell
$qa = @'
You are OpenCode agent qa only. Do not use specialist.
Use apps/sample-dashboard/qa/CHECKLIST.md.
Mark what passes/fails in workspace/learning-log.md under Lab 07.
Do not edit frontend/ or backend/ source to force a pass.
Note this Lab used --agent backend then --agent qa after reading handoff-fe from Claude.
'@

$qa | opencode run --agent qa --auto --format default -m "opencode/mimo-v2.5-free" --title "lab-07-qa"
```

### B4) Fallback ถ้า named agent โหลดไม่ขึ้น

อ่านไฟล์ `.opencode/agents/backend.md` (หรือ `qa.md`) ใน prompt **ชั่วคราว** + จด learning-log  
**ไม่** นับ `--agent specialist` เป็นทางหลักของเกณฑ์ผ่าน

---

## ข้อความพร้อมวาง

- [`prompts/01-read-handoff.md`](prompts/01-read-handoff.md)
- [`prompts/02-backend.md`](prompts/02-backend.md)
- [`prompts/03-qa.md`](prompts/03-qa.md)
- [`prompts/04-learning-log.md`](prompts/04-learning-log.md) — บันทึก learning-log แยก (ถ้าต้องการ)

## ผลที่คาดหวัง

- อ่าน `handoff-fe.json` ก่อน
- Backend มีรอบใน `runs.json` + `handoff-be.json`
- QA อ้าง CHECKLIST ใน learning-log
- ไม่ใช้ `specialist` เป็นทางหลัก

## เกณฑ์ผ่าน Lab

- [ ] อ่าน `handoff-fe.json` ก่อน แล้วลำดับ `backend` → `qa`
- [ ] `runs.json` มีรอบใหม่ ≥ 1 และ `handoff-be.json` ผ่าน validator
- [ ] QA ใช้ CHECKLIST (ไม่แก้โค้ดแอปเพื่อบังคับผ่าน)
- [ ] learning-log ระบุ named agents ที่ใช้

## ทางเลือกเมื่อเครื่องมือไม่พร้อม

ขั้น flake บน CLI → ทำขั้นนั้นใน TUI ด้วย agent ชื่อเดียวกัน

## แก้ปัญหาเบื้องต้น

| อาการ | ทำอะไร |
|---|---|
| `backend`/`qa` ไม่ใน list | กลับ Lab 05 สร้าง artifacts + ตรวจ YAML frontmatter |
| ใช้ `specialist` ไปแล้ว | รันซ้ำด้วย `--agent backend` / `qa` แล้วจดใน log |
| CLI ค้าง | stdin pipeline + `--auto` (Lab 02) |
| ไม่มี handoff-fe | กลับ Lab 06 |
