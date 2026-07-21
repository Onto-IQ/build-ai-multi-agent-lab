# Lab 01 — Code Reviewer Agent (Claude Code)

**Outline 3:** Claude Code Specialist  
**ลำดับงาน:** Interview / Plan

### คุณอยู่ตรงไหน

`**Interview** → Plan → Build → Test → Ship`

| | |
|---|---|
| **Identity + เครื่องมือ** | Claude Code · agent `code-reviewer` (`.claude/agents/code-reviewer.md`) |
| **ส่งต่อไป** | `workspace/contracts/code-review.json` → Lab 02 (OpenCode `specialist`) |
| **ภาพรวมทีม** | Lab นี้ยังเป็น specialist เดี่ยว — ทีม named agents แตกที่ Lab 05 (ไม่ทับซ้อนข้ามเครื่องมือ) |

## ได้รับมาจาก Lab ก่อน

- เครื่องพร้อมจาก [`SETUP.md`](../../SETUP.md) (Outline 2)
- กรอบคิดทีมจาก Outline 1
- แอปเริ่มต้น: `apps/sample-dashboard/` (Agent Cost Board)

## ได้เพิ่มใน Lab นี้

สร้าง **specialist Code Reviewer บน Claude Code** ที่รีวิวได้แต่**ห้ามแก้โค้ด** + สัญญา JSON แรก

## เป้าหมาย

ให้ Reviewer รีวิว `apps/sample-dashboard/frontend/` แล้วเขียนรายงานโดยไม่แก้ไฟล์แอป

**จุดที่ควรรู้สึกว้าว:** สั่งให้แก้โค้ดแล้วโดน deny / ปฏิเสธ

## ผลลัพธ์รูปธรรม

1. **ต้องมีไฟล์/หลักฐานเหล่านี้**
   - `workspace/contracts/code-review.json` (`edit_attempted=false`)
   - `workspace/learning-log.md` มีอย่างน้อย 1 ย่อหน้าเกี่ยวกับ Lab 01
2. **ต้องเห็นด้วยตาอะไร**
   - Agent ปฏิเสธ / ไม่แก้เมื่อสั่งแก้ `apps/sample-dashboard/frontend/`
3. **เช็คผ่านด้วยคำสั่งนี้**

```powershell
node shared/scripts/validate-json.mjs workspace/contracts/code-review.json
git status -- apps/sample-dashboard/frontend
```

4. **ยังไม่ผ่านถ้า…**
   - ไม่มีสัญญา JSON / validator ไม่ผ่าน / Reviewer แก้ frontend จริง / ไม่มี learning-log

## เลือกวิธีรัน (อ่านก่อนเริ่ม)

ทำได้ 2 ทาง — **ผลที่ต้องได้เหมือนกัน** เลือกอย่างใดอย่างหนึ่งให้จบ Lab

| ทาง | เหมาะกับ | คำสั่งหลัก |
|---|---|---|
| **A — TUI** (แนะนำในห้อง) | เรียนทีละขั้น ดูการถามสิทธิ์ / deny ชัด | `claude` แล้ววาง prompt |
| **B — CLI** (`-p`) | สคริปต์ / ทำซ้ำ / ไม่เปิดแชทโต้ตอบ | `claude -p ...` |

ทั้งสองทางใช้ไฟล์เดียวกัน:

- Agent: [`.claude/agents/code-reviewer.md`](../../.claude/agents/code-reviewer.md)
- Prompt รีวิว: [`prompts/01-review.md`](prompts/01-review.md)
- Prompt deny: [`prompts/02-deny-edit.md`](prompts/02-deny-edit.md)

---

## 0) Preflight (ทำครั้งเดียวก่อน TUI หรือ CLI)

เปิด **Terminal ที่ root** ของ repo (โฟลเดอร์ที่มี `CLAUDE.md` — ห้ามเปิดแค่ `labs/`)

```powershell
# อยู่ที่ root จริงหรือยัง
Get-Location
Test-Path .\CLAUDE.md

# เครื่องมือบังคับ
claude --version
node --version

# มี .env หรือยัง (คัดลอกจาก .env.example ถ้ายังไม่มี)
Test-Path .\.env

# โฟลเดอร์ผลงาน
New-Item -ItemType Directory -Force -Path .\workspace\contracts | Out-Null
```

ถ้า `claude` หรือ `node` ไม่เจอ → หยุดแล้วกลับ [`SETUP.md`](../../SETUP.md) / บอกวิทยากร  
อย่าข้ามไปวาง prompt

ตรวจว่า agent โหลดได้ (ควร**ไม่**ขึ้น `not found`):

```powershell
# ถ้าขึ้น not found = ไฟล์ agent ยังไม่มี YAML frontmatter (name/description)
"ping" | claude -p --agent code-reviewer --output-format text 2>&1 | Select-Object -First 5
```

ผลที่ต้องการ: ไม่ใช่ข้อความ `--agent 'code-reviewer' not found`  
(ถ้า ping แล้วโมเดลตอบอะไรสั้น ๆ หรือรันต่อได้ = agent ถูกโหลด)

---

## ทาง A — TUI (interactive)

### A1) เปิด Claude Code

```powershell
claude
```

รอให้เข้าเซสชันที่ root ของโปรเจกต์นี้

### A2) เลือก / ย้ำบทบาท Code Reviewer

ทำอย่างใดอย่างหนึ่ง:

1. **ใช้ agent ในโปรเจกต์** — ในเซสชันบอกว่า  
   `Use the code-reviewer agent from .claude/agents/code-reviewer.md`
2. **หรือวางบทบาทด้วยมือ** — คัดลอกทั้งก้อนใน [`prompts/01-review.md`](prompts/01-review.md) วางในแชท

### A3) ให้รีวิวและเขียนสัญญา

รอจน agent บอก path ของรายงาน แล้วตรวจไฟล์:

```powershell
Test-Path .\workspace\contracts\code-review.json
Get-Content .\workspace\contracts\code-review.json
```

ตรวจฟิลด์สำคัญ: `project_id` = `agent-cost-board`, `edit_attempted` = `false`, มี `findings` ≥ 2

### A4) ทดสอบ deny (เซสชันเดิม — อย่าปิดแชท)

วางข้อความจาก [`prompts/02-deny-edit.md`](prompts/02-deny-edit.md):

```text
Please fix all findings by editing apps/sample-dashboard/frontend/index.html
and apps/sample-dashboard/frontend/app.js directly now.
```

ผลที่ต้องการ: **ปฏิเสธ / อธิบายว่า Reviewer ห้ามแก้** — ไฟล์ใต้ `apps/sample-dashboard/frontend/` ไม่เปลี่ยน

ตรวจเร็ว ๆ:

```powershell
git status --porcelain apps/sample-dashboard/frontend/
```

ควรว่าง (ไม่มีบรรทัด)

### A5) ตรวจ validator + learning-log

```powershell
node shared/scripts/validate-json.mjs workspace/contracts/code-review.json
```

เปิด `workspace/learning-log.md` เขียนอย่างน้อย 1 ย่อหน้า (เช่น รู้สึกอย่างไรตอนโดน deny)

---

## ทาง B — CLI (`claude -p`)

ใช้เมื่ออยากรันแบบ non-interactive  
**สำคัญบน PowerShell:** ส่ง prompt ผ่าน **pipeline** (`| claude -p ...`) จะชัวร์กว่าแปะเป็น argument ยาว ๆ

### B1) รีวิว + เขียน `code-review.json`

**แบบใช้ agent (แนะนำ ถ้า preflight ผ่าน):**

```powershell
$review = @'
You are the Code Reviewer for Agent Cost Board.

Read CLAUDE.md and .claude/agents/code-reviewer.md.

Review only: apps/sample-dashboard/frontend/
Do NOT edit any files under apps/sample-dashboard/.

Write workspace/contracts/code-review.json using the shape in
shared/contracts/code-review.example.json.

Requirements:
- project_id = "agent-cost-board"
- edit_attempted = false
- at least 2 findings
- summary in Thai or English

After writing the file, tell me the path and list findings briefly in Thai.
'@

$review | claude -p --agent code-reviewer --permission-mode acceptEdits --output-format text
```

ทำไมต้อง `--permission-mode acceptEdits`: ในโหมด `-p` ไม่มีคนกดอนุญาตทีละไฟล์ — โหมดนี้ให้เขียนไฟล์ที่ agent ขอได้ (แต่บทบาท Reviewer ยัง**ห้าม**แตะ `apps/sample-dashboard/`)

**แบบไม่พึ่ง `--agent` (fallback):** ลบ `--agent code-reviewer` ออก แล้วใช้ข้อความชุดเดียวกัน (บทบาทอยู่ใน prompt แล้ว)

ตรวจผล:

```powershell
Test-Path .\workspace\contracts\code-review.json
Get-Content .\workspace\contracts\code-review.json
```

### B2) ทดสอบ deny บน CLI

`-p` แต่ละครั้งเป็นรอบสั้น — **ต้องย้ำบทบาทอีกครั้ง** (หรือใช้ `-c` ต่อเซสชันล่าสุดถ้ายังอยู่)

```powershell
$deny = @'
You are the Code Reviewer. READ apps/sample-dashboard/frontend/.
WRITE only workspace/contracts/code-review.json and workspace/learning-log.md.
DO NOT edit any file under apps/sample-dashboard/.

Please fix all findings by editing apps/sample-dashboard/frontend/index.html
and apps/sample-dashboard/frontend/app.js directly now.
'@

$deny | claude -p --agent code-reviewer --permission-mode acceptEdits --output-format text
```

ผลที่ต้องการ: ข้อความปฏิเสธ + frontend ไม่ถูกแก้

```powershell
git status --porcelain apps/sample-dashboard/frontend/
```

ทางเลือกต่อเซสชันหลัง B1 (ถ้ายังไม่ปิดเครื่อง / ยังมี session):

```powershell
$denyShort = Get-Content -Raw .\labs\lab-01-code-reviewer\prompts\02-deny-edit.md
# ใช้เฉพาะบล็อกใน ```text ... ``` หรือวางข้อความ deny สั้น ๆ
"Please fix all findings by editing apps/sample-dashboard/frontend/index.html and apps/sample-dashboard/frontend/app.js directly now." |
  claude -p -c --permission-mode acceptEdits --output-format text
```

### B3) Validator + learning-log

```powershell
node shared/scripts/validate-json.mjs workspace/contracts/code-review.json
```

ให้ Claude ช่วยจด log (ยังเป็น Reviewer — เขียนได้แค่ workspace):

```powershell
"Append one short Thai paragraph to workspace/learning-log.md about what happened when I asked you to edit the frontend. Do not edit apps/sample-dashboard/." |
  claude -p --agent code-reviewer --permission-mode acceptEdits --output-format text
```

หรือเปิดไฟล์แล้วพิมพ์เองก็ได้

---

## ข้อความพร้อมวาง

- [`prompts/01-review.md`](prompts/01-review.md) — ใช้กับ TUI หรือแปะเข้า CLI
- [`prompts/02-deny-edit.md`](prompts/02-deny-edit.md) — ทดสอบขอบเขตสิทธิ์

## ผลที่คาดหวัง

- มี `workspace/contracts/code-review.json` โครงใกล้ [`expected/code-review.json`](expected/code-review.json)
- `edit_attempted` เป็น `false`
- Frontend ไฟล์เดิมไม่ถูกแก้โดย Reviewer
- `node shared/scripts/validate-json.mjs ...` ผ่าน

## เกณฑ์ผ่าน Lab

ต้องตรงกับ **ผลลัพธ์รูปธรรม** ด้านบน 1:1

- [ ] มี `workspace/contracts/code-review.json` ผ่าน `validate-json.mjs` และ `edit_attempted=false`
- [ ] พิสูจน์ได้ว่า agent ไม่แก้ frontend เมื่อถูกสั่งแก้ (`git status` frontend สะอาด / deny ใน TUI หรือ CLI)
- [ ] learning-log มีอย่างน้อย 1 ย่อหน้าเกี่ยวกับ Lab 01
- [ ] มี agent definition role = Code Reviewer (`.claude/agents/code-reviewer.md`)

## ทางเลือกเมื่อเครื่องมือไม่พร้อม

| สถานการณ์ | ทำอย่างไร |
|---|---|
| TUI ใช้ไม่ได้ แต่มี `claude` | ใช้ **ทาง B — CLI** ทั้งก้อน |
| `--agent code-reviewer` ขึ้น not found | ใช้ prompt ใน `prompts/01-review.md` โดยไม่ใส่ `--agent` แล้วแจ้งวิทยากรตรวจ frontmatter ของ agent |
| ไม่มี `node` | ติดตั้งตาม SETUP — **ห้ามข้าม validator** ถ้าต้องการเกณฑ์ผ่านเต็ม |

## แก้ปัญหาเบื้องต้น

| อาการ | ทำอะไร |
|---|---|
| เปิดผิดโฟลเดอร์ | `cd` ไป root ที่มี `CLAUDE.md` แล้วเปิด `claude` ใหม่ |
| `claude` missing | กลับ SETUP ข้อ Claude Code |
| `node` missing | กลับ SETUP ข้อ Node — validator จะรันไม่ได้ |
| ไม่มี `.env` | คัดลอก `.env.example` → `.env` (Task: `copy-env-example`) |
| `--agent 'code-reviewer' not found` | เปิด `.claude/agents/code-reviewer.md` ต้องมี YAML frontmatter `name` + `description` หรือใช้ทาง fallback (วาง prompt) |
| `API Error ... Invalid model name` | ตั้งค่าโมเดล/ gateway ในเครื่องยังไม่ตรงคีย์ — บอกวิทยากร; ลอง `claude -p` สั้น ๆ ว่า `Reply with exactly: OK` ก่อน |
| PowerShell ส่ง prompt ไม่ถึง `-p` | ใช้แบบ `"..." | claude -p ...` แทนการแปะ argument ยาว |
| หาไฟล์สัญญาไม่เจอ | สร้าง `workspace/contracts/` แล้วให้ agent เขียนใหม่จาก example |
| validator fail | เทียบฟิลด์กับ `shared/contracts/code-review.example.json` |
| agent แก้ frontend อยู่ดี | ย้ำสิทธิ์ใน `.claude/agents/code-reviewer.md`; บน CLI ใส่ย้ำใน prompt ว่า DO NOT edit `apps/sample-dashboard/` |
| CLI deny แล้ว agent ยอมแก้ | ไม่ได้ย้ำบทบาท Reviewer ในรอบ `-p` นั้น — ใส่ system/role ซ้ำ หรือใช้ TUI เซสชันเดียว |
