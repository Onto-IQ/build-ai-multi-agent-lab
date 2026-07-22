# Lab 06 — Multi-Agent on Claude Code

**Outline 8:** Multi-Agent on Claude Code  
**ลำดับงาน:** Build

### คุณอยู่ตรงไหน

`Interview → Plan → **Build** → Test → Ship`

| | |
|---|---|
| **Identity + เครื่องมือ** | Claude เท่านั้น · ≥2 named: `frontend` + `code-reviewer` (Teams หรือ Subagents) |
| **ส่งต่อไป** | `handoff-fe.json` → Lab 07 OpenCode `backend` (แล้ว `qa`) |
| **ห้าม** | สร้าง/เรียก `backend` หรือ `qa` บน Claude — บทบาทเหล่านั้นอยู่ OpenCode |

## ได้รับมาจาก Lab ก่อน

- `workspace/contracts/role-cards.json` + named agents จาก Lab 05
- `.claude/agents/frontend.md`, `.claude/agents/code-reviewer.md`

## ได้เพิ่มใน Lab นี้

รัน **≥ 2 named agent identities บน Claude** (`frontend` + `code-reviewer`) แล้วเขียน `handoff-fe.json` ให้ **OpenCode รับต่อใน Lab 07**

## เป้าหมาย

แยก context บน Claude ด้วยชื่อ agent จริง แล้ว**ส่งต่อด้วยสัญญา JSON** ไม่ใช่การ์ด Kanban และไม่ bicopy บทบาทไป OpenCode

**จุดที่ควรรู้สึกว้าว:** `frontend` ทำงาน → มี handoff ให้ `backend` บนเครื่องมืออื่นอ่านต่อได้

## ผลลัพธ์รูปธรรม

1. **ต้องมีไฟล์/หลักฐานเหล่านี้**
   - หลักฐานใช้ **`frontend` และ `code-reviewer`** (Teams หรือ Subagents) — ไม่ใช่แชทเดียวสลับหมวกเป็นหลัก
   - งาน FE ตาม ownership (หรือสรุปผล FE ใน handoff ชัด)
   - `workspace/contracts/handoff-fe.json`
   - learning-log ระบุชื่อ agent ที่ใช้ + ส่งต่อ Lab 07 (OpenCode `backend`)
2. **ต้องเห็นด้วยตาอะไร**
   - stdout/TUI ระบุ named agents ≥ 2
3. **เช็คผ่านด้วยคำสั่งนี้**

```powershell
Test-Path .\.claude\agents\frontend.md
Test-Path .\.claude\agents\code-reviewer.md
node shared/scripts/validate-json.mjs workspace/contracts/handoff-fe.json
Select-String -Path workspace/learning-log.md -Pattern "frontend|code-reviewer|Lab 07|OpenCode|Subagent|Teams"
```

4. **ยังไม่ผ่านถ้า…**
   - ไม่มี `.claude/agents/frontend.md` / ไม่มี handoff-fe / ใช้แค่แชทเดียวไม่มี named identities / แย่ง ownership backend/qa บน Claude
   - แผงยังไม่แสดง**แถบขัดแย้ง**เมื่องบเกินหรือมี `gate_status=pending` (ดูโจทย์ multi-round ใน `apps/sample-dashboard/README.md`)

> **สะพานข้ามเครื่องมือ:** Lab 06 = Claude เขียน handoff → Lab 07 = OpenCode อ่านแล้วรัน `backend` → `qa`  
> Flux ยังไม่บังคับจนกว่า Lab 10 — อย่าใช้การ์ดแทน handoff

## เลือกวิธีรัน

| ทาง | เหมาะกับ | หมายเหตุ |
|---|---|---|
| **A — TUI** | ลอง **Agent Teams** จริงในห้อง | ต้องมี flag ใน `.env` |
| **B — CLI** (`claude -p`) | ทำซ้ำ / เก็บ stdout | มักใช้ **Subagents** — **ยังผ่าน Lab** |

ไฟล์ร่วม:

- `.env` → `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`
- Agents: `.claude/agents/frontend.md`, `.claude/agents/code-reviewer.md`
- [`shared/contracts/handoff-fe.example.json`](../../shared/contracts/handoff-fe.example.json)
- Prompt: [`01-teams-or-subagents.md`](prompts/01-teams-or-subagents.md), [`02-handoff.md`](prompts/02-handoff.md)

---

## 0) Preflight

```powershell
Test-Path .\.env
Select-String -Path .\.env -Pattern '^CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS='
Test-Path .\workspace\contracts\role-cards.json
Test-Path .\.claude\agents\frontend.md
Test-Path .\.claude\agents\code-reviewer.md
Test-Path .\shared\contracts\handoff-fe.example.json
claude --version
node --version
```

**ถ้า `Test-Path .\.claude\agents\frontend.md` เป็น False → หยุด**  
สร้างตาม [`../lab-05-solo-to-team-roles/prompts/00a-create-frontend.md`](../lab-05-solo-to-team-roles/prompts/00a-create-frontend.md) (TUI + Approve) แล้วค่อยกลับมา Lab 06  
ห้ามใช้แชทเดียวสลับหมวกแทน `--agent frontend`

ถ้า `node` ไม่เจอ → ดูนโยบาย Node ใน `AGENTS.md` (เสนอคำสั่งติดตั้งแล้ว**ถามคน** — ห้ามติดตั้งเงียบ)

---

## ทาง A — TUI (ลอง Agent Teams)

### A1) เปิด Claude ที่ root

```powershell
claude
```

### A2) รัน named identities

วาง [`prompts/01-teams-or-subagents.md`](prompts/01-teams-or-subagents.md)

- ใช้ **`frontend` + `code-reviewer`** (Teams หรือ Subagents)
- ถ้า Teams ไม่ขึ้น → บอกชัดว่าใช้ Subagents แล้วทำต่อ
- งาน FE อยู่ใน `apps/sample-dashboard/frontend/` เท่านั้น

### A3) Handoff contract

วาง [`prompts/02-handoff.md`](prompts/02-handoff.md)

```powershell
node shared/scripts/validate-json.mjs workspace/contracts/handoff-fe.json
```

### A4) learning-log

วาง [`prompts/03-learning-log.md`](prompts/03-learning-log.md):

```text
Append "## Lab 06" to workspace/learning-log.md only.
Record named agents used (frontend, code-reviewer), Teams or Subagents,
and that handoff-fe.json is ready for OpenCode backend Lab 07.
Short Thai. Only edit workspace/learning-log.md.
```

---

## ทาง B — CLI

> ส่ง prompt ผ่าน **stdin pipeline** เสมอ

### B1) frontend + code-reviewer (Subagents / Teams)

```powershell
Get-Content .env | ForEach-Object {
  if ($_ -match '^\s*#' -or $_ -match '^\s*$') { return }
  if ($_ -match '^\s*([A-Za-z0-9_]+)\s*=\s*(.*)$') {
    [System.Environment]::SetEnvironmentVariable($Matches[1], $Matches[2].Trim('"'), 'Process')
  }
}

$p1 = @'
Read workspace/contracts/role-cards.json, AGENTS.md, and .claude/agents/frontend.md.

You MUST use at least two named Claude identities: frontend and code-reviewer
(Agent Teams if enabled, otherwise Subagents). Say clearly in Thai which mode you used.

- frontend: improve Agent Cost Board UI under apps/sample-dashboard/frontend/ only
- code-reviewer: review FE changes; write/update workspace/contracts/code-review.json if needed; do NOT edit app source

Do NOT create or impersonate backend/qa agents on Claude — those roles are OpenCode-only.
Keep the team small to control cost.
'@

$p1 | claude -p --agent frontend --permission-mode acceptEdits --output-format text --no-session-persistence
```

ถ้า `--agent frontend` not found → ตรวจไฟล์ Lab 05 แล้วใช้ prompt เดียวกันโดยไม่ใส่ `--agent` แต่ย้ำให้อ่านไฟล์ agent ทั้งสอง

### B2) เขียน handoff-fe.json

```powershell
$p2 = @'
Read handoff rules: JSON contracts are the source of truth (not Kanban).

Write workspace/contracts/handoff-fe.json using
shared/contracts/handoff-fe.example.json as the schema.

Describe what Claude frontend finished and what OpenCode backend should do next.
project_id = agent-cost-board.
State clearly that OpenCode --agent backend will pick this up in Lab 07 (then qa).
Validate with: node shared/scripts/validate-json.mjs workspace/contracts/handoff-fe.json
'@

$p2 | claude -p --agent frontend --permission-mode acceptEdits --output-format text --no-session-persistence

Test-Path .\workspace\contracts\handoff-fe.json
```

### B3) learning-log

```powershell
Get-Content -Raw .\labs\lab-06-claude-multi-agent\prompts\03-learning-log.md |
  claude -p --permission-mode acceptEdits --output-format text --no-session-persistence
```

---

## ข้อความพร้อมวาง

- [`prompts/01-teams-or-subagents.md`](prompts/01-teams-or-subagents.md)
- [`prompts/02-handoff.md`](prompts/02-handoff.md)
- [`prompts/03-learning-log.md`](prompts/03-learning-log.md) — บันทึก learning-log (TUI/CLI)

## ผลที่คาดหวัง

- หลักฐาน named agents ≥ 2 บน Claude
- `handoff-fe.json` ผ่าน validator
- learning-log ระบุส่งต่อ OpenCode `backend`

## เกณฑ์ผ่าน Lab

- [ ] ใช้ `frontend` + `code-reviewer` (Teams หรือ Subagents)
- [ ] มี `handoff-fe.json` ผ่าน `validate-json.mjs`
- [ ] learning-log ระบุวิธีรัน + ส่งต่อ Lab 07
- [ ] ไม่แย่ง ownership backend/qa บน Claude

## ทางเลือกเมื่อเครื่องมือไม่พร้อม

Teams ล่ม → Subagents ผ่าน Lab ได้ถ้ามีสัญญา + ผลงานตาม ownership

## แก้ปัญหาเบื้องต้น

| อาการ | ทำอะไร |
|---|---|
| `--agent frontend` not found | กลับ Lab 05 สร้าง `.claude/agents/frontend.md` ผ่าน CLI/TUI |
| Teams ไม่เปิด | ตรวจ `.env` แล้วสลับ Subagents |
| PowerShell ค้าง | ใช้ pipeline `"..." \| claude -p ...` |
