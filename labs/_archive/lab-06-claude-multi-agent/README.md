# Lab 06 — Multi-Agent on Claude Code

**Outline 8:** Multi-Agent on Claude Code  
**ลำดับงาน:** Build

## ได้รับมาจาก Lab ก่อน

- `workspace/contracts/role-cards.json` (Lab 05)
- สิทธิ์ + memory + specialist Claude

## ได้เพิ่มใน Lab นี้

**รันหลาย agent บน Claude Code** (ลอง Agent Teams — ถ้าไม่ขึ้นใช้ Subagents) + สร้าง `handoff-fe.json` ให้ **OpenCode รับต่อใน Lab 07**

## เป้าหมาย

ให้ทีมช่วยงาน Agent Cost Board บน Claude โดยแยก context และไม่แย่งไฟล์ — แล้ว**ส่งต่อด้วยสัญญา JSON** ไม่ใช่ด้วยการ์ด Kanban

**จุดที่ควรรู้สึกว้าว:** หลายตัวทำงานโดยมีสัญญาชัด

## ผลลัพธ์รูปธรรม

1. **ต้องมีไฟล์/หลักฐานเหล่านี้**
   - `workspace/contracts/handoff-fe.json`
   - learning-log ระบุ Teams หรือ Subagents + ข้อความว่าส่งต่อ Lab 07 (OpenCode)
2. **ต้องเห็นด้วยตาอะไร**
   - หลักฐานรันทีม/subagent (stdout หรือ TUI)
3. **เช็คผ่านด้วยคำสั่งนี้**

```powershell
node shared/scripts/validate-json.mjs workspace/contracts/handoff-fe.json
Select-String -Path workspace/learning-log.md -Pattern "Lab 0[67]|OpenCode|Subagent|Teams" 
```

4. **ยังไม่ผ่านถ้า…**
   - ไม่มี handoff-fe / ไม่ระบุวิธีรัน / แย่ง ownership ข้ามโฟลเดอร์

> **สะพานข้ามเครื่องมือ:** Lab 06 = Claude เขียน handoff → Lab 07 = OpenCode อ่าน `handoff-fe.json` ก่อนลงมือ  
> Flux ยังไม่บังคับจนกว่า Lab 10 — อย่าใช้การ์ดแทน handoff

## เลือกวิธีรัน

| ทาง | เหมาะกับ | หมายเหตุ |
|---|---|---|
| **A — TUI** | ลอง **Agent Teams** จริงในห้อง | ต้องมี flag ใน `.env` |
| **B — CLI** (`claude -p`) | ทำซ้ำ / เก็บ stdout | มักใช้ **Subagents** (Teams ต้องการโต้ตอบ) — **ยังผ่าน Lab** |

ไฟล์ร่วม:

- `.env` → `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`
- [`workspace/contracts/role-cards.json`](../../workspace/contracts/role-cards.json) (จาก Lab 05)
- [`shared/contracts/handoff-fe.example.json`](../../shared/contracts/handoff-fe.example.json)
- Prompt: [`01-teams-or-subagents.md`](prompts/01-teams-or-subagents.md), [`02-handoff.md`](prompts/02-handoff.md)

---

## 0) Preflight

```powershell
Test-Path .\.env
# ตรวจว่ามีคีย์ (ไม่ต้องพิมพ์ค่า)
Select-String -Path .\.env -Pattern '^CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS='
Test-Path .\workspace\contracts\role-cards.json
Test-Path .\shared\contracts\handoff-fe.example.json
claude --version
node --version
```

ถ้ายังไม่มี `role-cards.json` → กลับ Lab 05  
ถ้าไม่มี `node` → ยังเขียน handoff ได้ แต่ validator จะรันไม่ได้จนกว่าจะติด Node

---

## ทาง A — TUI (ลอง Agent Teams)

### A1) เปิด Claude ที่ root พร้อม flag

ให้แน่ใจว่าโหลด `.env` (เปิด Terminal จาก VS Code ที่ root หรือ set เองใน session)

```powershell
claude
```

### A2) วางแผนทีม

วาง [`prompts/01-teams-or-subagents.md`](prompts/01-teams-or-subagents.md)

- ถ้า Teams ขึ้น → ใช้ทีม ≤ 3–4 ตาม role-cards  
- ถ้าไม่ขึ้น → บอกชัดว่าใช้ Subagents แล้วทำต่อ

### A3) Handoff contract

วาง [`prompts/02-handoff.md`](prompts/02-handoff.md)

```powershell
node shared/scripts/validate-json.mjs workspace/contracts/handoff-fe.json
```

### A4) learning-log

จดว่าเลือก Teams หรือ Subagents เพราะอะไร + โน้ตต้นทุนสั้น ๆ

---

## ทาง B — CLI

> ส่ง prompt ผ่าน **stdin pipeline** เสมอ  
> ในโหมด `-p` ถ้า Teams ใช้ไม่ได้ ให้ใช้ Subagents / แผนทีมเล็ก — **ถือว่าผ่าน** ตาม README เกณฑ์ทางเลือก

### B1) แผน Teams หรือ Subagents

```powershell
# โหลด .env เข้า process (ไม่ echo ค่า)
Get-Content .env | ForEach-Object {
  if ($_ -match '^\s*#' -or $_ -match '^\s*$') { return }
  if ($_ -match '^\s*([A-Za-z0-9_]+)\s*=\s*(.*)$') {
    [System.Environment]::SetEnvironmentVariable($Matches[1], $Matches[2].Trim('"'), 'Process')
  }
}

$p1 = @'
Read workspace/contracts/role-cards.json and CLAUDE.md.

Goal: improve Agent Cost Board with at most 3-4 agents on Claude Code.

Prefer Agent Teams if enabled (CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1).
If Teams are unavailable in this non-interactive CLI session, use Subagents instead and say so clearly in Thai.

Respect ownership folders. Do not let two agents write the same path.
Keep the team small to control cost.
Do NOT edit apps/sample-dashboard/ in this turn.
'@

$p1 | claude -p --permission-mode acceptEdits --output-format text --no-session-persistence
```

### B2) เขียน handoff-fe.json

```powershell
$p2 = @'
Read handoff rules: JSON contracts are the source of truth for handoffs (not Kanban cards).

Write workspace/contracts/handoff-fe.json using
shared/contracts/handoff-fe.example.json as the schema.

Describe what Frontend finished and what Backend should do next
for Agent Cost Board. project_id = agent-cost-board.
State clearly in the handoff (or notes) that OpenCode will pick this up in Lab 07.
Validate with: node shared/scripts/validate-json.mjs workspace/contracts/handoff-fe.json
Do not edit apps/sample-dashboard/ beyond what ownership already allows for documenting handoff.
'@

$p2 | claude -p --permission-mode acceptEdits --output-format text --no-session-persistence

Test-Path .\workspace\contracts\handoff-fe.json
Get-Content .\workspace\contracts\handoff-fe.json
```

### B3) learning-log

```powershell
$plog = @'
Append "## Lab 06" to workspace/learning-log.md only.
Record whether Agent Teams or Subagents was used and why.
State that handoff-fe.json is ready for OpenCode Lab 07. Short Thai.
'@

$plog | claude -p --permission-mode acceptEdits --output-format text --no-session-persistence
```

---

## ผลที่คาดหวัง

- มีหลักฐานรัน Teams หรือ Subagents (stdout / learning-log)
- มี `workspace/contracts/handoff-fe.json` ผ่าน validator
- learning-log ระบุว่าส่งต่อ OpenCode Lab 07
- ไม่แย่ง ownership

## เกณฑ์ผ่าน Lab

ต้องตรงกับ **ผลลัพธ์รูปธรรม** ด้านบน 1:1

- [ ] มีหลักฐานรัน Teams หรือ Subagents
- [ ] learning-log ระบุวิธีรัน + ส่งต่อ Lab 07
- [ ] ไม่แย่งไฟล์คนละ ownership
- [ ] มี `handoff-fe.json` ผ่าน `validate-json.mjs`

## ทางเลือกเมื่อเครื่องมือไม่พร้อม

Teams ล่ม → Subagents ผ่าน Lab ได้ถ้ามีสัญญา + ผลงานตาม ownership

## แก้ปัญหาเบื้องต้น

| อาการ | ทำอะไร |
|---|---|
| Teams ไม่เปิด | ตรวจ `.env` flag แล้วสลับ Subagents |
| CLI บอกอ่าน `.env` ไม่ได้ / ติด permission | ใช้ Subagents; ใน TUI ลอง Teams อีกครั้ง |
| ไฟล์ชนกัน | ย้ำ role-cards และให้เขียนแค่โฟลเดอร์ตัวเอง |
| `node` missing | เขียน handoff ตาม schema ก่อน แล้วติด Node เพื่อ validator |
| CLI ค้างตอนเขียน learning-log | `Ctrl+C` แล้วรัน B3 ใหม่ด้วย prompt สั้น |
| PowerShell ค้างตอนส่ง prompt ยาวเป็น argument | ใช้ pipeline `"..." \| claude -p ...` |
