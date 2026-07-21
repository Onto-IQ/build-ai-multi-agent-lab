# Prompt — สร้าง `.claude/agents/frontend.md` (บังคับก่อน Lab 06)

**Starter (อ่านอย่างเดียว):** [`shared/agent-starters/claude/frontend.md`](../../../shared/agent-starters/claude/frontend.md)  
**Artifact (ผู้เรียนสร้าง):** `.claude/agents/frontend.md` — **ไม่มีใน checkout**

## ทำไมต้องมี

Lab 06 / 10 เรียก `--agent frontend` บน Claude Code  
ถ้าไฟล์นี้ไม่มี → **หยุด** แล้วสร้างก่อน ห้ามสลับหมวกในแชทเดียวแทน

## ทางหลัก — TUI (แนะนำ)

```powershell
claude
```

วางข้อความ:

```text
Read shared/agent-starters/claude/frontend.md exactly.

Create the learner ARTIFACT file:
  .claude/agents/frontend.md
Copy ownership, Lab 10 note, and YAML frontmatter (name: frontend) from the starter.
Do NOT edit the starter file itself.
Do NOT create .claude/agents/backend.md or .claude/agents/qa.md (OpenCode-only).
Do NOT overwrite .claude/agents/code-reviewer.md.

When the write permission prompt appears, Approve it.
Reply Thai: confirm path + that opencode must create backend/qa separately.
```

ถ้า Claude ขอสิทธิ์เขียน `.claude/agents/` → **Approve** (โหมด `claude -p` มักค้างรออนุมัติ — ใช้ TUI)

## ทาง CLI (ถ้า TUI ไม่สะดวก)

```powershell
$createFe = @'
Read shared/agent-starters/claude/frontend.md.
Write .claude/agents/frontend.md as a learner artifact matching the starter
(YAML name: frontend, same Permissions and Lab 10 section).
Do not edit the starter. Do not create backend/qa on Claude.
Reply Thai: path written.
'@
$createFe | claude -p --permission-mode acceptEdits --output-format text --no-session-persistence
```

ถ้ายัง `FE=False` หลังรัน → กลับไป **TUI + Approve**

## ตรวจผ่าน

```powershell
Test-Path .\.claude\agents\frontend.md
"ping" | claude -p --agent frontend --output-format text 2>&1 | Select-Object -First 5
```

ผลที่ต้องการ: ไม่ขึ้น `--agent 'frontend' not found`

## คู่ขนาน

- `synthesizer.md`: ดู [`00-create-agents.md`](00-create-agents.md) (ใช้จริง Lab 09)  
- OpenCode `backend`/`qa`: บล็อก OpenCode ในไฟล์เดียวกัน
