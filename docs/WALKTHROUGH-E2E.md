# Walkthrough E2E — Lab 01→11 (CLI/TUI เท่านั้น)

สำหรับวิทยากร / ผู้ตรวจ / ผู้รัน smoke ทั้งคอร์ส  
ผู้เรียนทำตาม Lab README เป็นหลัก — เอกสารนี้คือ**ลำดับขับเครื่องมือ**ให้ครบ DoD

เช็คลิสต์ติ๊กผล: [`E2E-ORCHESTRATION-CHECKLIST.md`](E2E-ORCHESTRATION-CHECKLIST.md)

---

## กฎผู้รัน (บังคับ)

ผู้รันทำได้เฉพาะ:

- Terminal ที่ **root** ของ repo
- ส่ง prompt ผ่าน **stdin pipeline** เข้า `claude -p` / `opencode run` (หรือวางใน TUI)
- คำสั่งตรวจ: `Test-Path`, `node shared/scripts/*.mjs`, `git status`, `opencode agent list`
- เปิดเบราว์เซอร์ดู Flux / localhost

**ห้าม:**

- เขียน/แก้ `apps/sample-dashboard/**` หรือ `workspace/contracts/*.json` ด้วยมือ/editor/Write tool เพื่อบังคับผ่าน
- `Copy-Item` จาก `shared/agent-starters/` เป็นทางหลัก (Lab 05 ต้องให้ Claude/OpenCode สร้าง artifact)
- สร้าง/เลื่อนการ์ด Flux โดยไม่ผ่าน MCP ของ Claude/OpenCode
- ใส่ `public_url` ปลอมใน Lab 11

**ข้อยกเว้นที่อนุญาต:**

- `New-Item` โฟลเดอร์ว่าง (`workspace/contracts`)
- โหลด `.env` เข้า process
- Lab 08 เท่านั้น: `Copy-Item status.json` ↔ `.bak` / `status.broken.json` ตาม README

> PowerShell: อย่าส่ง prompt ยาวเป็น argument — ใช้ `$prompt | claude -p ...` / `$prompt | opencode run ...`

---

## SETUP

```powershell
Get-Location   # ต้องเห็น CLAUDE.md
claude --version
opencode --version
node --version
git --version
Test-Path .\.env
New-Item -ItemType Directory -Force -Path .\workspace\contracts | Out-Null
```

ถ้า `node` ไม่เจอ → ติดตั้งตาม [`SETUP.md`](../SETUP.md) ก่อน Lab ที่ต้อง validator/gate  
Localhost แผง (หลังมีข้อมูล backend): `npx --yes serve apps/sample-dashboard -p 4173` → `/frontend/`

---

## Lab 01 — Code Reviewer (Claude)

**คุณอยู่ตรงไหน:** Interview / Plan  
**ใครรัน:** `claude -p --agent code-reviewer`

```powershell
$review = Get-Content -Raw .\labs\lab-01-code-reviewer\prompts\01-review.md
# หรือใช้บล็อก CLI ใน labs/lab-01-code-reviewer/README.md ทาง B1
$review = @'
You are the Code Reviewer for Agent Cost Board.
Read CLAUDE.md and .claude/agents/code-reviewer.md.
Review only: apps/sample-dashboard/frontend/
Do NOT edit any files under apps/sample-dashboard/.
Write workspace/contracts/code-review.json using shared/contracts/code-review.example.json.
project_id = "agent-cost-board"; edit_attempted = false; at least 2 findings.
After writing, list findings briefly in Thai.
'@
$review | claude -p --agent code-reviewer --permission-mode acceptEdits --output-format text --no-session-persistence

$deny = @'
Read .claude/agents/code-reviewer.md. A learner asked you to edit apps/sample-dashboard/frontend/ to fix review findings.
As Code Reviewer, refuse and explain in Thai why you must not edit app source.
Do not edit any files under apps/sample-dashboard/. You may update workspace/learning-log.md under "## Lab 01" noting the deny outcome.
'@
$deny | claude -p --agent code-reviewer --permission-mode acceptEdits --output-format text --no-session-persistence
```

> ในห้องเรียน TUI: ใช้ข้อความตรงจาก `prompts/02-deny-edit.md` (สั่งแก้จริงแล้วต้องโดนปฏิเสธ) ได้เต็มกว่า

**ตรวจผ่าน:**

```powershell
node shared/scripts/validate-json.mjs workspace/contracts/code-review.json
git status --porcelain apps/sample-dashboard/frontend/
```

**ยังไม่ผ่านถ้า:** ไม่มีสัญญา / Reviewer แก้ frontend / ไม่มี deny

---

## Lab 02 — OpenCode specialist

**คุณอยู่ตรงไหน:** Plan  
**ใครรัน:** `opencode run --agent specialist`

```powershell
$p1 = @'
Read AGENTS.md and .opencode/agents/specialist.md.
Summarize apps/sample-dashboard/frontend/ in at most 5 bullet points in Thai.
Do not edit files.
'@
$p1 | opencode run --agent specialist --auto --format default -m "opencode/mimo-v2.5-free" --title "lab-02-summary"

$p2 = @'
Append a comparison table to workspace/learning-log.md under "## Lab 02".
Compare Claude Code vs OpenCode on: models, permissions, multi-agent, cost control (≥ 4 rows).
Note that specialist is for Lab 02 only — not the main path for Lab 07/10.
Do not edit apps/sample-dashboard/.
'@
$p2 | opencode run --agent specialist --auto --format default -m "opencode/mimo-v2.5-free" --title "lab-02-compare"
```

**ตรวจผ่าน:**

```powershell
Select-String -Path workspace/learning-log.md -Pattern "Lab 02" -SimpleMatch
```

---

## Lab 03 — Permission boundary

**คุณอยู่ตรงไหน:** Plan / Build  
**ใครรัน:** `claude -p` (ทางหลักในห้อง: TUI ลองคำสั่งต้องห้ามจริง)

```powershell
# ทางเต็ม (แนะนำใน TUI ห้องเรียน): วาง prompts/01-forbidden-git-push.md
# และ prompts/02-forbidden-delete-shared.md แล้วให้ agent พยายามคำสั่งจนโดน deny

# ทาง walkthrough เมื่อโฮสต์บล็อกการสั่ง git push จาก automation:
$p1 = @'
Read .claude/settings.json (or project permission config) and CLAUDE.md.
Without running git push or deleting anything: explain in Thai that git push
and deleting shared/ are forbidden for agents in this lab.
Append "## Lab 03" to workspace/learning-log.md with: (1) git push denied by settings
(2) delete shared/ denied (3) three permission best practices.
Only edit workspace/learning-log.md. Do not run git push. Do not delete shared/.
'@
$p1 | claude -p --permission-mode acceptEdits --output-format text --no-session-persistence
```

**ตรวจผ่าน:**

```powershell
Test-Path shared
Select-String -Path workspace/learning-log.md -Pattern "Lab 03"
```

---

## Lab 04 — Persistent memory

**คุณอยู่ตรงไหน:** Plan  
**ใครรัน:** `claude -p`

```powershell
$p1 = Get-Content -Raw .\labs\lab-04-persistent-memory\prompts\01-save-preferences.md
$p1 | claude -p --permission-mode acceptEdits --output-format text --no-session-persistence

$p2 = Get-Content -Raw .\labs\lab-04-persistent-memory\prompts\02-recall-test.md
$p2 | claude -p --permission-mode acceptEdits --output-format text --no-session-persistence
```

**ตรวจผ่าน:**

```powershell
Test-Path .\MEMORY.md
Select-String -Path workspace/learning-log.md -Pattern "Lab 04"
```

---

## Lab 05 — สร้าง agent artifacts + role-cards

**คุณอยู่ตรงไหน:** Plan → Build  
**ใครรัน:** Claude สร้าง **frontend.md ก่อน** (TUI) → synthesizer → OpenCode สร้าง BE/qa → Claude role-cards

1. **บังคับ:** [`labs/lab-05-solo-to-team-roles/prompts/00a-create-frontend.md`](../labs/lab-05-solo-to-team-roles/prompts/00a-create-frontend.md)  
2. แล้ว [`00-create-agents.md`](../labs/lab-05-solo-to-team-roles/prompts/00-create-agents.md)  
3. ตรวจ:

```powershell
# OpenCode CLI สร้าง backend/qa ได้ในโหมด --auto
# Claude: เขียน .claude/agents/* มักต้อง **TUI + Approve** สิทธิ์เขียน

Test-Path .\.claude\agents\frontend.md
Test-Path .\.claude\agents\synthesizer.md
Test-Path .\.opencode\agents\backend.md
Test-Path .\.opencode\agents\qa.md
Test-Path .\.opencode\agents\frontend.md   # False
opencode agent list 2>&1 | Select-String -Pattern 'backend|qa|specialist'

$role = Get-Content -Raw .\labs\lab-05-solo-to-team-roles\prompts\01-role-cards.md
$role | claude -p --permission-mode acceptEdits --output-format text --no-session-persistence
# ถ้ามี node:
node shared/scripts/validate-json.mjs workspace/contracts/role-cards.json
```

**ยังไม่ผ่านถ้า:** ไม่มี `frontend.md` / ใช้ Copy-Item เป็นทางหลัก / agent ทับซ้อน / ไม่ foreshadow agent+tool  
**Walkthrough note:** ถ้า automation บล็อก Approve เขียน `.claude/agents/` → จบขั้น Claude ใน **TUI** ก่อนไป Lab 06  
**Node:** ถ้าไม่มี `node` → เสนอติดตั้งตาม SETUP แล้วถามคน (ห้ามติดตั้งเงียบ)

---

## Lab 06 — Claude frontend + code-reviewer → handoff-fe

**คุณอยู่ตรงไหน:** Build  
**ใครรัน:** `claude -p --agent frontend` (และ code-reviewer ตาม prompt)

```powershell
$p1 = Get-Content -Raw .\labs\lab-06-claude-multi-agent\prompts\01-teams-or-subagents.md
$p1 | claude -p --agent frontend --permission-mode acceptEdits --output-format text --no-session-persistence

$p2 = Get-Content -Raw .\labs\lab-06-claude-multi-agent\prompts\02-handoff.md
$p2 | claude -p --agent frontend --permission-mode acceptEdits --output-format text --no-session-persistence

node shared/scripts/validate-json.mjs workspace/contracts/handoff-fe.json
```

---

## Lab 07 — OpenCode backend → qa

**คุณอยู่ตรงไหน:** Build → Test  
**ใครรัน:** `opencode run --agent backend` แล้ว `--agent qa`

```powershell
Get-Content .\workspace\contracts\handoff-fe.json

$be = Get-Content -Raw .\labs\lab-07-opencode-sequential\prompts\02-backend.md
$be | opencode run --agent backend --auto --format default -m "opencode/mimo-v2.5-free" --title "lab-07-backend"

node shared/scripts/validate-json.mjs workspace/contracts/handoff-be.json

$qa = Get-Content -Raw .\labs\lab-07-opencode-sequential\prompts\03-qa.md
$qa | opencode run --agent qa --auto --format default -m "opencode/mimo-v2.5-free" --title "lab-07-qa"
```

**ห้าม:** `--agent specialist` หรือทำ FE บน OpenCode

---

## Lab 08 — Gate (`--agent qa`)

**คุณอยู่ตรงไหน:** Test  
**ใครรัน:** shell ตั้ง broken (ยกเว้น) → OpenCode `--agent qa`

```powershell
Copy-Item .\apps\sample-dashboard\backend\status.json .\apps\sample-dashboard\backend\status.json.bak -Force
Copy-Item .\apps\sample-dashboard\backend\status.broken.json .\apps\sample-dashboard\backend\status.json -Force
node shared/scripts/gate-quality.mjs   # คาด FAILED

$fail = Get-Content -Raw .\labs\lab-08-quality-cost-gate\prompts\01-auditor-fail.md
$fail | opencode run --agent qa --auto --format default -m "opencode/mimo-v2.5-free" --title "lab-08-fail"

$fix = Get-Content -Raw .\labs\lab-08-quality-cost-gate\prompts\02-fix-and-recheck.md
$fix | opencode run --agent qa --auto --format default -m "opencode/mimo-v2.5-free" --title "lab-08-pass"

node shared/scripts/gate-quality.mjs   # คาด PASSED
node shared/scripts/validate-json.mjs workspace/contracts/audit-result.json
```

---

## Lab 09 — Synthesizer (Claude)

**คุณอยู่ตรงไหน:** Test → Ship (เตรียมแผง)  
**ใครรัน:** `claude -p --agent synthesizer`

```powershell
# Lab 09: ถ้ายังไม่มี .claude/agents/synthesizer.md (Lab 05 TUI ยังไม่สร้าง)
# ใช้ prompt ตามด้านล่างโดยไม่ใส่ --agent synthesizer แต่ย้ำบทบาทจาก starter
$p = @'
You are Claude Code synthesizer for Agent Cost Board.
Read shared/agent-starters/claude/synthesizer.md if agent file missing.
Confirm frontend can read backend status.json and runs.json.
Write workspace/contracts/synthesize-report.json using shared/contracts/synthesize-report.example.json.
Set open_path to apps/sample-dashboard/frontend/index.html.
Append short "## Lab 09" to workspace/learning-log.md.
'@
$p | claude -p --permission-mode acceptEdits --output-format text --no-session-persistence
```

---

## Lab 10 — Flux go-live

**คุณอยู่ตรงไหน:** Interview → Ship (บอร์ด)  
**ใครรัน:** Claude MCP (FE) + OpenCode MCP (BE/QA) ตาม prompts Lab 10 — **แนะนำ TUI** (Approve MCP + เลื่อนการ์ด)

Preflight: มี `FLUX_*` ใน `.env`; artifacts Lab 05 ครบ; สัญญา 05–09 ครบ; MCP ตาม [`FLUX-SETUP.md`](../labs/lab-10-kanban-collab/FLUX-SETUP.md)

ลำดับ prompts: `01-create-cards` → `02-claude-frontend-card` → `03-opencode-backend-card` → `04-qa-gate-card` → `05-kanban-snapshot`

**Walkthrough automation:** รอบนี้ถือ **BLOCKED** ถ้าไม่รัน MCP ใน TUI — ห้ามเขียน `kanban-snapshot.json` จำลอง

## Lab 11 — Capstone Ship

**คุณอยู่ตรงไหน:** Ship  
**ใครรัน:** `claude -p` ตาม [`01-capstone-ship.md`](../labs/lab-11-capstone/prompts/01-capstone-ship.md)

ถ้ายังไม่มี deploy → สถานะ **BLOCKED** (ห้ามใส่ URL ปลอม) — ถือว่าเกณฑ์เอกสารถูกต้อง

---

## บันทึกผลรอบ walkthrough

ตารางว่างตอน clone — วิทยากรกรอกหลังรันจริง (อย่า commit คำตอบนักเรียน)

| Lab | ผล | โน้ต |
|---|---|---|
| SETUP | | |
| 01 | | |
| 02 | | |
| 03 | | |
| 04 | | |
| 05 | | |
| 06 | | |
| 07 | | |
| 08 | | |
| 09 | | |
| 10 | | |
| 11 | | |

อัปตารางนี้หลังรันจริง — คำสั่งในเอกสารนี้ต้องตรงกับคำสั่งที่ผ่านแล้วเท่านั้น
