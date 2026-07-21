# Prompt — สร้าง named agent artifacts (Lab 05)

ใช้ **CLI/TUI ของเครื่องมือที่ถูก** — ไฟล์ใต้ `.claude/agents/` และ `.opencode/agents/` (ยกเว้น Lab 01/02) เป็น **artifact ของผู้เรียน** ไม่ได้มากับ repo

## Claude — `frontend.md` (บังคับก่อน Lab 06)

ทำตาม [`00a-create-frontend.md`](00a-create-frontend.md) **ก่อน** (TUI + Approve แนะนำ)

จากนั้นสร้าง `synthesizer` ด้วยบล็อกด้านล่าง (หรือรวมในรอบ TUI เดียวกับ frontend)

## Claude Code — สร้าง `synthesizer` (+ ยืนยัน frontend)

TUI: `claude` แล้ววางข้อความด้านล่าง (**แนะนำ** — โหมด `-p` อาจรอ Approve เมื่อเขียน `.claude/agents/`)  
CLI:

```powershell
$createClaude = @'
Read shared/agent-starters/claude/frontend.md and shared/agent-starters/claude/synthesizer.md.

Create learner agent ARTIFACTS (do not edit the starters themselves):
1) Ensure .claude/agents/frontend.md exists (create from shared/agent-starters/claude/frontend.md if missing).
2) Write .claude/agents/synthesizer.md — same ownership/frontmatter as shared/agent-starters/claude/synthesizer.md.

Do NOT create .claude/agents/backend.md or .claude/agents/qa.md (those roles are OpenCode-only).
Do NOT overwrite .claude/agents/code-reviewer.md.
Reply Thai: paths written + confirm opencode must create backend/qa separately.
'@

$createClaude | claude -p --permission-mode acceptEdits --output-format text --no-session-persistence
```

ตรวจ:

```powershell
Test-Path .\.claude\agents\frontend.md
Test-Path .\.claude\agents\synthesizer.md
"ping" | claude -p --agent frontend --output-format text 2>&1 | Select-Object -First 5
```

## OpenCode — สร้าง `backend` + `qa`

TUI: `opencode` แล้ววางข้อความด้านล่าง  
CLI:

```powershell
$createOc = @'
Read shared/agent-starters/opencode/backend.md and shared/agent-starters/opencode/qa.md.
Create learner agent ARTIFACTS:
1) Write .opencode/agents/backend.md from the backend starter (keep YAML frontmatter).
2) Write .opencode/agents/qa.md from the qa starter (keep YAML frontmatter).
Do NOT create .opencode/agents/frontend.md or synthesizer.md (Claude-only roles).
Do NOT overwrite .opencode/agents/specialist.md.
Reply Thai: paths written.
'@

$createOc | opencode run --auto --format default -m "opencode/mimo-v2.5-free" --title "lab-05-create-agents"
```

ตรวจ:

```powershell
Test-Path .\.opencode\agents\backend.md
Test-Path .\.opencode\agents\qa.md
opencode agent list 2>&1 | Select-String -Pattern 'backend|qa|specialist'
```

> Fallback เมื่อเครื่องมือเขียนไฟล์ไม่ได้: อ่าน starter แล้วสร้างไฟล์ด้วยมือ/editor — ยังนับเป็น artifact ของผู้เรียน แต่ควรจดใน learning-log ว่าไม่ได้สร้างผ่าน TUI/CLI
