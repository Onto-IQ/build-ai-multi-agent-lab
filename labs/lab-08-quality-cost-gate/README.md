# Lab 08 — ด่านคุณภาพ + ด่านต้นทุน

**Outline 10:** Gate / Guardrails  
**ลำดับงาน:** Test

### คุณอยู่ตรงไหน

`Interview → Plan → Build → **Test** → Ship`

| | |
|---|---|
| **Identity + เครื่องมือ** | OpenCode · `--agent qa` (ทางหลัก) — ด่านยังยึดสคริปต์ + `audit-result.json` |
| **รับมาจาก** | Lab 07 `handoff-be` + checklist |
| **ส่งต่อไป** | `audit-result.json` PASS → Lab 09 Claude `synthesizer` / Lab 10 การ์ด QA |

## ได้รับมาจาก Lab ก่อน

- ผลงาน Frontend / Backend / QA จาก Lab 05–07
- สคริปต์ `shared/scripts/gate-quality.mjs` และ `gate-cost.md`

## ได้เพิ่มใน Lab นี้

ตั้ง**ด่านคุณภาพ**และ**ด่านต้นทุน** — ตั้งใจให้พังแล้วให้ด่านจับได้ แล้วแก้ให้ผ่านภายใน 2 รอบ

## เป้าหมาย

ทำให้ Quality Gate จับ error ได้ และหยุดปรับแก้เมื่อเกิน 2 รอบ

**จุดที่ควรรู้สึกว้าว:** ตั้งใจให้พัง แล้วด่านหยุด — ประหยัดโทเคนชัด

## ผลลัพธ์รูปธรรม

1. **ต้องมีไฟล์/หลักฐานเหล่านี้**
   - ประสบการณ์ FAIL แล้ว PASS
   - `workspace/contracts/audit-result.json` สุดท้าย `status=PASS`
   - learning-log ระบุว่ารอบที่ 3 ต้องถามคน
2. **ต้องเห็นด้วยตาอะไร**
   - Terminal แสดง `Quality gate FAILED` แล้วภายหลัง `PASSED`
3. **เช็คผ่านด้วยคำสั่งนี้**

```powershell
node shared/scripts/gate-quality.mjs
node shared/scripts/validate-json.mjs workspace/contracts/audit-result.json
```

4. **ยังไม่ผ่านถ้า…**
   - มีแค่ PASS โดยไม่เคย FAIL / audit ไม่ผ่าน validator / ปรับแก้เกิน 2 รอบโดยไม่ escalate คน

> **Foreshadow Lab 10:** การ์ด QA บน Flux จะเลื่อนตามผลด่าน (FAIL ค้าง Test / PASS เลื่อนใกล้ Ship) — ด่านยังยึด `audit-result.json` เป็นแหล่งความจริง

## เลือกวิธีรัน

| ทาง | เหมาะกับ | หมายเหตุ |
|---|---|---|
| **A — TUI** | เห็น FAIL ชัดในห้อง | OpenCode เลือก agent `qa` + รัน `node ...gate-quality.mjs` ใน Terminal |
| **B — CLI** | เก็บ stdout เป็นหลักฐาน | คัดลอก broken → `opencode run --agent qa` FAIL → แก้ → PASS |

ต้องมี `node` เพื่อรัน gate จริง — ถ้าไม่มี ใช้ทางเลือกด้านล่าง (ยังต้องมี `audit-result.json`)

> ทางหลักของ Lab นี้คือ **OpenCode `--agent qa`** ตามแมปไม่ทับซ้อน (QA ไม่อยู่บน Claude)  
> ถ้า OpenCode ไม่พร้อมชั่วคราว: รัน gate ด้วยมือ + เขียน `audit-result.json` ตาม schema แล้วยังต้องผ่านเกณฑ์ด่าน

---

## 0) Preflight

```powershell
Test-Path .\apps\sample-dashboard\backend\status.broken.json
Test-Path .\shared\scripts\gate-quality.mjs
Test-Path .\shared\contracts\audit-result.example.json
Test-Path .\.opencode\agents\qa.md
opencode agent list 2>&1 | Select-String -Pattern '^qa '
node --version
opencode --version
```

---

## ทาง A — TUI

### A1) ตั้งใจให้พัง

```powershell
Copy-Item .\apps\sample-dashboard\backend\status.json .\apps\sample-dashboard\backend\status.json.bak -Force
Copy-Item .\apps\sample-dashboard\backend\status.broken.json .\apps\sample-dashboard\backend\status.json -Force
node shared/scripts/gate-quality.mjs
```

ต้องเห็น `Quality gate FAILED`

### A2) Auditor FAIL

```powershell
opencode
```

เลือก agent **qa** — วาง [`prompts/01-auditor-fail.md`](prompts/01-auditor-fail.md)

### A3) แก้ภายใน 2 รอบ แล้ว PASS

วาง [`prompts/02-fix-and-recheck.md`](prompts/02-fix-and-recheck.md)  
รัน `node shared/scripts/gate-quality.mjs` จน PASSED  
อัปเดต `audit-result.json` เป็น PASS

### A4) learning-log

วาง [`prompts/03-learning-log.md`](prompts/03-learning-log.md) (หรือข้ามได้ถ้า [`02-fix-and-recheck.md`](prompts/02-fix-and-recheck.md) อัป log ครบแล้ว):

```text
Append "## Lab 08" to workspace/learning-log.md.
Record that quality gate went FAIL then PASS within max 2 refinement rounds.
State clearly: if a 3rd round is needed, ask a human (do not auto-fix forever).
Short Thai. Only edit workspace/learning-log.md.
Do not use --agent specialist.
```

คืนไฟล์สำรองถ้ายังเหลือ:

```powershell
Copy-Item .\apps\sample-dashboard\backend\status.json.bak .\apps\sample-dashboard\backend\status.json -Force -ErrorAction SilentlyContinue
```

---

## ทาง B — CLI

### B1) ตั้งใจให้พัง + (ถ้ามี node) รัน gate

```powershell
Copy-Item .\apps\sample-dashboard\backend\status.json .\apps\sample-dashboard\backend\status.json.bak -Force
Copy-Item .\apps\sample-dashboard\backend\status.broken.json .\apps\sample-dashboard\backend\status.json -Force
node shared/scripts/gate-quality.mjs
```

### B2) เขียน audit FAIL

```powershell
$p1 = @'
You are OpenCode agent qa (Auditor) for Agent Cost Board.
Assume quality gate just failed because status.json is broken (status is not ok).

Write workspace/contracts/audit-result.json with status FAIL,
at least one violation, round = 1, max_refinement_rounds = 2.
Follow shared/contracts/audit-result.example.json fields.
recommended_action should tell humans what to fix.
Do not start endless retries. Do not fix status.json in this turn.
Do not use --agent specialist.
'@

$p1 | opencode run --agent qa --auto --format default -m "opencode/mimo-v2.5-free" --title "lab-08-audit-fail"
```

### B3) แก้ + PASS (≤ 2 รอบ)

```powershell
$p2 = @'
You are OpenCode agent qa. Fix apps/sample-dashboard/backend/status.json so the quality gate can pass (status must be "ok" with a clear message).
Keep this within refinement round 2 maximum.
If node is available run: node shared/scripts/gate-quality.mjs
If node is missing, verify status.json by eye and say NODE_MISSING.
Update workspace/contracts/audit-result.json to PASS if checks pass (round = 2).
If you would need a 3rd refinement round, stop and ask the human instead.
Append "## Lab 08" to workspace/learning-log.md: when to ask a human (round 3).
Do not use --agent specialist.
'@

$p2 | opencode run --agent qa --auto --format default -m "opencode/mimo-v2.5-free" --title "lab-08-audit-pass"
```

ตรวจ:

```powershell
Get-Content .\apps\sample-dashboard\backend\status.json
Get-Content .\workspace\contracts\audit-result.json
```

---

## ข้อความพร้อมวาง

- [`prompts/01-auditor-fail.md`](prompts/01-auditor-fail.md)
- [`prompts/02-fix-and-recheck.md`](prompts/02-fix-and-recheck.md)
- [`prompts/03-learning-log.md`](prompts/03-learning-log.md) — บันทึก learning-log แยก (ถ้าต้องการ)

## ผลที่คาดหวัง

- มีประสบการณ์ FAIL แล้ว PASS
- `workspace/contracts/audit-result.json` โครงตรง example และสถานะสุดท้าย PASS
- เคารพ max 2 รอบ
- เข้าใจว่าใน Lab 10 การ์ด QA เลื่อนตามผลด่าน

ดูตัวอย่างโครง FAIL ที่ [`expected/audit-result.fail.json`](expected/audit-result.fail.json)

## เกณฑ์ผ่าน Lab

ต้องตรงกับ **ผลลัพธ์รูปธรรม** ด้านบน 1:1

- [ ] มี Quality Gate ที่ fail ได้จริง แล้วผ่านภายหลัง (`gate-quality.mjs` exit 0)
- [ ] มี Cost/Stop ที่หยุดได้จริง (ไม่เกิน 2 รอบ หรือ escalate คน)
- [ ] learning-log ระบุว่ารอบที่ 3 ต้องถามคน
- [ ] `audit-result.json` สถานะสุดท้าย PASS และผ่าน validator

## ทางเลือกเมื่อเครื่องมือไม่พร้อม

รัน `gate-quality.mjs` ไม่ได้เพราะไม่มี Node — ตรวจ `status.json` ด้วยตาตามกฎใน CHECKLIST / สคริปต์ แล้วยังต้องมี `audit-result.json` ทั้งช่วง FAIL และ PASS

## แก้ปัญหาเบื้องต้น

| อาการ | ทำอะไร |
|---|---|
| ลืมคืน `status.json` | คัดลอกจาก `.bak` / git หรือใส่ `status=ok` มือ |
| FAIL แต่ violations ว่าง | ใส่รายการผิดกฎอย่างน้อย 1 ข้อใน audit-result |
| `node` missing | ใช้ทางเลือกด้านบน + ติด Node ก่อน Lab ที่ต้อง validator จริง |
| PowerShell ส่ง prompt ไม่ถึง | ใช้ stdin pipeline |
