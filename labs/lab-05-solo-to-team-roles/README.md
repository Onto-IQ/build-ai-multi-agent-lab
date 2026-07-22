# Lab 05 — จากคนเดียวสู่ Frontend / Backend / QA

**Outline 7:** Solo → Multi-Agent roles  
**ลำดับงาน:** Plan → Build

### คุณอยู่ตรงไหน

`Interview → **Plan** → **Build** → Test → Ship`

| | |
|---|---|
| **Identity + เครื่องมือ** | **สร้าง** named agent artifacts ผ่าน CLI/TUI — Claude: `frontend`+`synthesizer` · OpenCode: `backend`+`qa` (ไม่ทับซ้อน) |
| **ส่งต่อไป** | `role-cards.json` + ไฟล์ agent โหลดได้ → Lab 06 (Claude) / Lab 07 (OpenCode) |
| **ประสานงาน** | บทบาทหนึ่งอยู่เครื่องมือเดียว — Lab 10 การ์ดต้องตรง agent+tool ในตาราง foreshadow |

## ได้รับมาจาก Lab ก่อน

- Specialist สองเครื่องมือ + สิทธิ์ + memory (Lab 01–04)
- โครงสร้างแอป Agent Cost Board
- **Starters (เทมเพลตใน repo):** [`shared/agent-starters/`](../../shared/agent-starters/)  
- **Artifacts (สร้างเอง):** ไฟล์ใต้ `.claude/agents/` / `.opencode/agents/` สำหรับทีม — **ยังไม่มีใน checkout** จนกว่าจะสร้างใน Lab นี้

## ได้เพิ่มใน Lab นี้

1. **สร้าง** agent identity จาก starters ผ่าน **CLI/TUI** ของเครื่องมือที่ถูก (ไม่ bicopy ข้ามเครื่องมือ)  
2. เขียน `role-cards.json` ให้ FE/BE/QA ไม่แย่งโฟลเดอร์ และระบุ **tool + agent** ตามแมป  
3. foreshadow การ์ด Flux Lab 10 (ยังไม่เปิด Flux)

## เป้าหมาย

เห็น**ทีมที่มีชื่อในเครื่องมือ**เพราะผู้เรียนสร้าง artifact เอง — ไม่ใช่ไฟล์ที่มากับ repo แล้วสลับหมวก

**จุดที่ควรรู้สึกว้าว:** สร้าง agent ผ่าน Claude/OpenCode แล้ว `agent list` / `--agent` เห็นชื่อจริง

## ผลลัพธ์รูปธรรม

1. **ต้องมีไฟล์/หลักฐานเหล่านี้**
   - Artifact ที่ผู้เรียนสร้าง: `.claude/agents/frontend.md`, `.claude/agents/synthesizer.md`
   - Artifact ที่ผู้เรียนสร้าง: `.opencode/agents/backend.md`, `.opencode/agents/qa.md`
   - **ห้ามมี** agent บทบาทซ้ำข้ามเครื่องมือ (เช่น ไม่มี `.opencode/agents/frontend.md`)
   - `workspace/contracts/role-cards.json` — Frontend/Backend/QA, `writes` ไม่ทับ, `tool`/`agent` ตรงแมป
   - ตาราง foreshadow ใน learning-log: **บทบาท | โฟลเดอร์ | ชื่อ agent | tool | ชื่อการ์ด Flux**
2. **ต้องเห็นด้วยตาอะไร**
   - สร้างผ่าน CLI/TUI แล้ว `opencode agent list` มี `backend` และ `qa`
   - สรุป ownership ภาษาไทย (ใครเขียนโฟลเดอร์ไหน / เครื่องมือไหน)
3. **เช็คผ่านด้วยคำสั่งนี้**

```powershell
Test-Path .\.claude\agents\frontend.md
Test-Path .\.claude\agents\synthesizer.md
Test-Path .\.opencode\agents\backend.md
Test-Path .\.opencode\agents\qa.md
# ต้องเป็น False ทั้งคู่:
Test-Path .\.opencode\agents\frontend.md
Test-Path .\.claude\agents\backend.md
opencode agent list 2>&1 | Select-String -Pattern '^(backend|qa|specialist) '
node shared/scripts/validate-json.mjs workspace/contracts/role-cards.json
```

4. **ยังไม่ผ่านถ้า…**
   - ไม่สร้าง agent artifacts / มีไฟล์บทบาทซ้ำสองเครื่องมือ / role-cards ไม่ระบุ tool ตามแมป / ไม่ foreshadow คอลัมน์ชื่อ agent + tool

> Lab นี้**ยังไม่บังคับ**เปิด Flux — แค่เตรียมแมปบทบาท → agent → การ์ดสำหรับ Lab 10

## แมปที่ล็อก (ไม่ทับซ้อน)

| บทบาท | tool | agent file | การ์ด Lab 10 |
|---|---|---|---|
| Frontend | Claude Code | `frontend` | การ์ด FE |
| Backend | OpenCode | `backend` | การ์ด BE |
| QA | OpenCode | `qa` | การ์ด QA |
| (สนับสนุน) | Claude Code | `synthesizer` | ไม่เป็นใบ WIP ที่ 4 |

## JSON vs Kanban (foreshadow)

| ตอนนี้ (Lab 05) | ภายหลัง (Lab 10) |
|---|---|
| สัญญา `role-cards.json` = แหล่งความจริงของ ownership | แตกการ์ด 3 ใบบน Flux ตาม role + tool + agent |
| ไฟล์ agent = ตัวตนในเครื่องมือ | เรียก named agent บนเครื่องมือที่ถูกก่อนเลื่อนการ์ด |
| ยังไม่เลื่อนการ์ด | การ์ด = มอบหมาย/คิว — ไม่แทนที่ JSON |

## เลือกวิธีรัน

| ทาง | เหมาะกับ | คำสั่งหลัก |
|---|---|---|
| **A — TUI** | เรียนในห้อง วาง prompt | `claude` |
| **B — CLI** | ทำซ้ำ / ตรวจไฟล์เร็ว | `"..." \| claude -p --permission-mode acceptEdits` |

ไฟล์ร่วม:

- **Starters (อ่านอย่างเดียว):** [`shared/agent-starters/`](../../shared/agent-starters/)
- **สร้าง agents:** [`prompts/00a-create-frontend.md`](prompts/00a-create-frontend.md) (บังคับ) · [`prompts/00-create-agents.md`](prompts/00-create-agents.md)
- ตัวอย่างสัญญา: [`shared/contracts/role-cards.example.json`](../../shared/contracts/role-cards.example.json)
- Prompt role-cards: [`prompts/01-role-cards.md`](prompts/01-role-cards.md)
- (ทางเลือก) briefs: [`02-frontend-brief.md`](prompts/02-frontend-brief.md), [`03-backend-brief.md`](prompts/03-backend-brief.md), [`04-qa-brief.md`](prompts/04-qa-brief.md)

---

## 0) Preflight

```powershell
Test-Path .\AGENTS.md
Test-Path .\shared\agent-starters\claude\frontend.md
Test-Path .\shared\agent-starters\opencode\backend.md
Test-Path .\shared\contracts\role-cards.example.json
New-Item -ItemType Directory -Force -Path .\workspace\contracts | Out-Null
New-Item -ItemType Directory -Force -Path .\.claude\agents, .\.opencode\agents | Out-Null
# Checkout ยังไม่ควรมี team agents (artifact ยังไม่สร้าง):
Test-Path .\.claude\agents\frontend.md   # คาด False จนกว่าขั้น 1
Test-Path .\.opencode\agents\backend.md  # คาด False จนกว่าขั้น 1
claude --version
opencode --version
node --version
```

ถ้า `node` ไม่เจอ → ติดตั้งตาม [`SETUP.md`](../../SETUP.md) ก่อนรัน validator

---

## 1) สร้าง named agent artifacts ผ่าน CLI/TUI (บังคับ)

> **Starter ≠ artifact:** `shared/agent-starters/` อยู่ใน repo เป็นเทมเพลต  
> ไฟล์ใต้ `.claude/agents/{frontend,synthesizer}.md` และ `.opencode/agents/{backend,qa}.md` ผู้เรียน**สร้างเอง**ใน Lab นี้ (gitignore แล้ว)

ทำตาม [`prompts/00a-create-frontend.md`](prompts/00a-create-frontend.md) **ก่อน** (ขั้นสร้าง `frontend.md`) แล้วทำตาม [`prompts/00-create-agents.md`](prompts/00-create-agents.md):

1. **Claude TUI/CLI** — อ่าน starter แล้วเขียน `.claude/agents/frontend.md` + `synthesizer.md`  
2. **OpenCode TUI/CLI** — อ่าน starter แล้วเขียน `.opencode/agents/backend.md` + `qa.md`  
3. ตรวจโหลดได้:

```powershell
Test-Path .\.claude\agents\frontend.md
Test-Path .\.claude\agents\synthesizer.md
Test-Path .\.opencode\agents\backend.md
Test-Path .\.opencode\agents\qa.md
# ต้องเป็น False:
Test-Path .\.opencode\agents\frontend.md
Test-Path .\.claude\agents\backend.md
Test-Path .\.claude\agents\qa.md

"ping" | claude -p --agent frontend --output-format text 2>&1 | Select-Object -First 5
opencode agent list 2>&1 | Select-String -Pattern 'backend|qa|specialist'
```

คงไว้จาก Lab 01–02 (มากับคอร์ส): `.claude/agents/code-reviewer.md` · `.opencode/agents/specialist.md`

---

## ทาง A — TUI

### A0) สร้าง agents ก่อน (ขั้น 1)

ทำ Claude แล้ว OpenCode ตาม [`prompts/00-create-agents.md`](prompts/00-create-agents.md)

### A1) อ่าน ownership + แมปเครื่องมือ

เปิด [`AGENTS.md`](../../AGENTS.md) (ตาราง Agent identity ↔ tool ↔ Flux)

### A2) สร้าง role cards

```powershell
claude
```

วาง [`prompts/01-role-cards.md`](prompts/01-role-cards.md)

### A3) ตรวจ validator + แมป

```powershell
node shared/scripts/validate-json.mjs workspace/contracts/role-cards.json
Get-Content .\workspace\contracts\role-cards.json
```

ตรวจมือ: Frontend → tool Claude Code / agent `frontend`; Backend → OpenCode / `backend`; QA → OpenCode / `qa`

### A4) (ทางเลือก) ทดลอง brief ตามเครื่องมือ

- Frontend brief → Claude `--agent frontend` (หรือวาง prompt 02)
- Backend / QA brief → OpenCode `--agent backend` / `--agent qa` (prompts 03–04)

ยังไม่ต้อง orchestration เต็ม (Lab 06–07)

### A5) foreshadow Flux + learning-log

วาง [`prompts/05-learning-log.md`](prompts/05-learning-log.md) (หรือรวมอยู่ใน [`prompts/01-role-cards.md`](prompts/01-role-cards.md) แล้วข้ามได้ถ้าตารางครบ):

ตารางที่ต้องมีใน `workspace/learning-log.md` ภายใต้ `## Lab 05`:

| บทบาท | โฟลเดอร์เขียน | ชื่อ agent | tool บนการ์ด Flux | ชื่อการ์ดที่จะสร้าง |
|---|---|---|---|---|
| Frontend | `apps/sample-dashboard/frontend/` | `frontend` | Claude Code | เช่น “FE: ชัดเจนตารางรอบ” |
| Backend | `apps/sample-dashboard/backend/` | `backend` | OpenCode | เช่น “BE: บันทึกรอบใน runs.json” |
| QA | `apps/sample-dashboard/qa/` + สัญญา audit | `qa` | OpenCode | เช่น “QA: รัน gate-quality” |

ยัง**ไม่ต้อง**เปิด Flux ใน Lab นี้

---

## ทาง B — CLI

```powershell
# สร้าง agent artifacts ก่อน — ทำตาม prompts/00-create-agents.md (Claude แล้ว OpenCode)

$p1 = @'
Create workspace/contracts/role-cards.json for Agent Cost Board
using shared/contracts/role-cards.example.json as the schema.

Roles required: Frontend, Backend, QA
project_id must be "agent-cost-board".
Lock tools (non-overlapping): Frontend=Claude Code agent frontend;
Backend=OpenCode agent backend; QA=OpenCode agent qa.
Include "tool" and "agent" fields on each role matching the example.
Ensure no two roles write the same folder.
Write a short Thai summary of ownership after saving the file.
'@

$p1 | claude -p --permission-mode acceptEdits --output-format text --no-session-persistence

node shared/scripts/validate-json.mjs workspace/contracts/role-cards.json
```

learning-log:

```powershell
Get-Content -Raw .\labs\lab-05-solo-to-team-roles\prompts\05-learning-log.md |
  claude -p --permission-mode acceptEdits --output-format text --no-session-persistence
```

> PowerShell: ส่ง prompt ผ่าน pipeline เท่านั้น — อย่าแปะ here-string ยาวเป็น argument

---

## ข้อความพร้อมวาง

- [`prompts/00a-create-frontend.md`](prompts/00a-create-frontend.md)
- [`prompts/00-create-agents.md`](prompts/00-create-agents.md)
- [`prompts/01-role-cards.md`](prompts/01-role-cards.md)
- [`prompts/02-frontend-brief.md`](prompts/02-frontend-brief.md)
- [`prompts/03-backend-brief.md`](prompts/03-backend-brief.md)
- [`prompts/04-qa-brief.md`](prompts/04-qa-brief.md)
- [`prompts/05-learning-log.md`](prompts/05-learning-log.md) — foreshadow + learning-log (TUI/CLI)

## ผลที่คาดหวัง

- สร้าง agent artifacts ผ่าน CLI/TUI แล้วโหลดได้ และไม่ทับซ้อนข้ามเครื่องมือ
- `role-cards.json` มี tool/agent ตรงแมป + validator ผ่าน
- learning-log มีตาราง foreshadow ครบคอลัมน์ agent + tool

## เกณฑ์ผ่าน Lab

ต้องตรงกับ **ผลลัพธ์รูปธรรม** ด้านบน 1:1

- [ ] สร้าง agent artifacts จาก starters ผ่าน CLI/TUI (ไม่ bicopy ข้ามเครื่องมือ)
- [ ] มี `role-cards.json` ผ่าน `validate-json.mjs` (Frontend / Backend / QA + tool ตามแมป)
- [ ] learning-log มีตาราง foreshadow: บทบาท | โฟลเดอร์ | agent | tool | ชื่อการ์ด

## ทางเลือกเมื่อเครื่องมือไม่พร้อม

เขียน `role-cards.json` มือจาก example; สร้างไฟล์ agent ด้วย editor จากเนื้อใน `shared/agent-starters/` แล้วจดใน learning-log ว่าไม่ได้สร้างผ่าน TUI/CLI

## แก้ปัญหาเบื้องต้น

| อาการ | ทำอะไร |
|---|---|
| `backend`/`qa` ไม่ขึ้นใน `opencode agent list` | ยังไม่ได้สร้าง artifact → กลับขั้น 1; ตรวจ YAML frontmatter |
| `--agent frontend` not found / เขียน `.claude/agents/` รอ approve | ใช้ **TUI** `claude` แล้ว Approve สิทธิ์เขียน — `acceptEdits` ใน `-p` อาจไม่พอสำหรับ path นี้ |
| validator บอก roles < 3 | เพิ่มบทบาทให้ครบ Frontend / Backend / QA |
| สับสนว่า FE อยู่ OpenCode? | ไม่ — FE เป็น Claude เท่านั้น (ดู `AGENTS.md`) |
| PowerShell ค้าง/ไม่ส่ง prompt | ใช้ `"..." \| claude -p ...` |
