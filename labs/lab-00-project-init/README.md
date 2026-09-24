# Lab 00 — เตรียมโปรเจกต์ + Plugin แบบ Project Scope

**ใช้เวลาประมาณ:** 45–60 นาที  
**เครื่องมือ:** VS Code (หรือ Cursor) · Windows Terminal · Claude Code · OpenCode · npm (เครื่องเปล่า? ทำ **ส่วน 0** ก่อน)  
**ผลลัพธ์หลัก:** `node_modules` จากเครื่องคุณ · `.claude/settings.json` · `opencode.json` · `/init` ทั้งสองฝั่ง

> Lab นี้สอนให้**เห็นไฟล์ใน repo เปลี่ยน** ไม่ใช่แค่ข้อความในแชท — เปิด VS Code ตามไปด้วย

---

## คุณจะได้อะไรจาก Lab นี้

1. ติดตั้ง dependencies ด้วย `npm install` (template **ไม่มี** `node_modules`)  
2. รัน `/init` ของ Claude และ OpenCode แล้ว**merge** กับกฎคอร์ส  
3. ติดตั้ง plugin แบบ **Project scope** (ผูก repo ไม่ใช่เครื่องทั้งเครื่อง)  
4. เลือกใช้ได้ทั้ง **TUI** และ **CLI**

**ความรู้ที่ควรติดตัว**

- `node_modules` ใหญ่และผูก OS — ห้ามใส่ใน Template / git  
- Project scope ≠ User (global) — เพื่อน clone repo แล้วตั้งค่าตามนี้ได้  
- Agent เขียนไฟล์ลงดิสก์ — ดู Explorer + Source Control ยืนยัน

---

## Workspace มาตรฐาน (ทำก่อนขั้นอื่น)

1. Clone repo จาก Template แล้ว `cd` ไปโฟลเดอร์ที่มี `package.json`  
2. เปิด editor ที่ root:

```powershell
code .
```

(หรือ Cursor: Open Folder ที่ root เดียวกัน)

3. ใน VS Code เปิด:
   - **Explorer** (ไฟล์ซ้าย)
   - **Source Control** (ดูว่าอะไรจะถูก commit)
4. เปิด **Windows Terminal** คนละหน้าต่าง — แท็บแยก `powershell` / `claude` / `opencode`  
   ไม่บังคับรัน TUI ใน integrated terminal ของ VS Code

**จุดเช็ก:** Explorer เห็น `package.json`, `labs/`, `CLAUDE.md`, `AGENTS.md` · ยัง**ไม่มี** `node_modules` หลัง clone สด

---

## ส่วน 0 — เครื่องเปล่า? ติดตั้ง/ซ่อมเครื่องมือด้วย `setup-windows.ps1`

ข้ามส่วนนี้ได้ถ้าคำสั่งเหล่านี้ขึ้นเวอร์ชันครบแล้ว: `node -v` · `git --version` · `gh --version` · `claude --version` · `opencode --version` · `bun --version`

เปิด **PowerShell** ปกติ (ไม่ต้อง as Administrator — สคริปต์ขอสิทธิ์เองผ่าน UAC) แล้วรัน:

```powershell
irm https://raw.githubusercontent.com/Onto-IQ/build-ai-multi-agent-lab/main/scripts/setup-windows.ps1 -OutFile "$env:TEMP\setup-windows.ps1"
powershell -ExecutionPolicy Bypass -File "$env:TEMP\setup-windows.ps1"
```

สคริปต์ติดตั้ง/ซ่อมให้จนครบแล้วพิมพ์ตารางสรุป — ตัวไหนผ่านอยู่แล้วจะ**ข้าม** (รันซ้ำได้เสมอ · `-DryRun` = ดูอย่างเดียว · `-SkipVSCode` = ใช้ Cursor):

| เครื่องมือ | ติดตั้งจาก | อยู่ที่ |
|---|---|---|
| Git · gh · Node 22 LTS + npm | winget | `C:\Program Files\...` |
| Bun | installer ทางการ | `%USERPROFILE%\.bun\bin` |
| Claude Code | native installer (**ไม่ผ่าน npm**) | `%USERPROFILE%\.local\bin\claude.exe` |
| OpenCode | GitHub Releases (native `.exe`) | `%LOCALAPPDATA%\Programs\opencode` |
| VS Code | winget | `%LOCALAPPDATA%\Programs\Microsoft VS Code` |

จบแล้วตรวจ:

```powershell
node -v; git --version; gh --version; claude --version; opencode --version; bun --version; code --version
```

login เองอีก 3 คำสั่ง (เป็นขั้น interactive — สคริปต์ทำแทนไม่ได้):

```powershell
gh auth login        # GitHub.com → HTTPS → Login with a web browser
claude               # เปิดครั้งแรก จะพาล็อกอิน
opencode auth login  # เลือก provider
```

**ยังไม่ผ่านถ้า…** คำสั่งไหนยัง `not found` — ปิดแล้วเปิด Windows Terminal ใหม่ แล้ว**รันสคริปต์ซ้ำ**: มันจะเติม PATH ที่หาย · ถอด npm shim `.ps1`/`.cmd` เดิมแล้วลง native `.exe` แทน · ติดตั้งทับคำสั่งที่เรียกแล้วพัง · อัป Node ถ้าเก่ากว่า 22

---

## ส่วน A — `npm install` (ไม่มาจาก Template)

### A1 — ยืนยันว่ายังไม่มี `node_modules`

**ทำที่:** Windows Terminal (แท็บ `powershell`) — พิมพ์ตามนี้

```powershell
cd <โฟลเดอร์-repo-ของคุณ>
Test-Path .\node_modules
git ls-files node_modules
```

คาดหวัง: `Test-Path` = `False` · `git ls-files` ว่าง

### A2 — ติดตั้ง

**ทำที่:** Windows Terminal (แท็บ `powershell`) — พิมพ์ตามนี้

```powershell
npm install
npm test
```

### จุดเช็กใน VS Code

| ที่ดู | ควรเห็น |
|---|---|
| Explorer | มีโฟลเดอร์ `node_modules/` (ใหญ่ — ไม่ต้องไล่เปิด) |
| Source Control | **ไม่**ควรขึ้นรายการพันไฟล์จาก `node_modules` |

```powershell
git check-ignore -v node_modules
git status -sb
```

**ทำไม template ไม่ใส่ `node_modules`:** ไฟล์ใหญ่ · binary ผูก Windows/เครื่อง (เช่น `better-sqlite3`) · คนละเครื่องต้อง install เอง

---

## ส่วน B — Claude: `/init` + `.claude` + plugin Project

ทำงานที่ **root เท่านั้น** (อย่า `cd` เข้า `labs/` แล้วเปิด `claude`)

### B1 — เปิดและ trust

**ทำที่:** Windows Terminal แท็บ `claude` — พิมพ์ตามนี้

```powershell
claude
```

ถ้าถาม trust โฟลเดอร์ → ยอมรับสำหรับ repo นี้

### B2 — `/init` (TUI)

ในเซสชัน `claude` พิมพ์:

```text
/init
```

**สำคัญ:** template มี `CLAUDE.md` seed กฎคอร์สแล้ว  
- **อย่าให้ทับทั้งไฟล์จนหายตาราง Ownership / ห้าม MCP pipe**  
- ถ้า Claude เสนอเขียนใหม่ทั้งก้อน → ขอให้**merge**: เก็บบล็อกคอร์ส แล้วเติมโครงสร้าง/คำสั่งที่ `/init` แนะนำ — วาง prompt สำเร็จรูปจาก [`prompts/02-merge-claude-init.md`](prompts/02-merge-claude-init.md) ได้เลย  

ทางเลือก interactive (ถ้าวิทยากรบอกใช้):

```powershell
$env:CLAUDE_CODE_NEW_INIT = '1'
claude
```

แล้ว `/init` ตามนั้น

**Headless (ทดสอบแล้ว):** `/init` ไม่ทำงานใน `claude -p` (ถูกมองเป็นข้อความธรรมดา) — ใช้คำสั่งรวมแทน:

```powershell
claude -p "ทำ /init: วิเคราะห์ codebase แล้ว merge โครงสร้างที่มีประโยชน์เข้า CLAUDE.md ที่มีอยู่ (เขียนไฟล์จริง) — ห้ามลบ: Ownership Frontend=Claude · Backend=OpenCode · ห้ามใช้ MCP เป็นท่อส่งงาน · ห้าม commit .env" --permission-mode acceptEdits
```

### จุดเช็ก

| ที่ดู | ควรเห็น |
|---|---|
| Explorer | `CLAUDE.md` เปลี่ยน · อาจเริ่มมี `.claude/` |
| Source Control | diff ใน `CLAUDE.md` |
| เนื้อหา | ยังมี Ownership (Frontend=Claude / Backend=OpenCode) |

### B3 — ติดตั้ง superpowers แบบ Project (เลือกอย่างใดอย่างหนึ่ง)

**ทำที่:** CLI → Windows Terminal (แท็บ `powershell`) · TUI → แท็บ `claude`

**CLI (แนะนำในห้อง — ทำซ้ำได้ชัด):**

```powershell
claude plugin install superpowers@claude-plugins-official --scope project
```

**TUI:**

1. ใน `claude` พิมพ์ `/plugin`  
2. Discover → เลือก **superpowers** จาก `claude-plugins-official`  
3. เลือก scope **Project** — **ไม่ใช่ User**

### B4 — ตรวจ `.claude/settings.json`

**ทำที่:** Windows Terminal (แท็บ `powershell`) — พิมพ์ตามนี้

```powershell
Test-Path .\.claude\settings.json
Get-Content .\.claude\settings.json
```

ควรมี `enabledPlugins` ที่อ้าง superpowers  
ไฟล์นี้**ควร commit** ได้ (project scope สำหรับทีมใน repo)

### B5 — ทดลอง skill สั้น ๆ (เตรียม Lab 01)

ใน `claude` หรือ CLI:

```powershell
claude -p "ใช้ skill brainstorming จาก plugin superpowers สรุป Must/Nice/Later 3 ข้อสำหรับ personal site demo — อย่าเขียนไฟล์"
```

หรือวาง prompt จาก [`prompts/01-smoke-superpowers.md`](prompts/01-smoke-superpowers.md)

### B6 — Agent ถาวร + guardrail skill (เสา Multi-Agent)

Template มีไฟล์พร้อมแล้ว — ตรวจใน VS Code Explorer:

| ไฟล์ | บทบาท |
|---|---|
| `.claude/agents/frontend.md` | UI owner — ความจำแยกจาก backend |
| `.claude/agents/reviewer.md` | รีวิว Lab 07 |
| `.claude/skills/public-site-safe/SKILL.md` | ห้าม secret / เคลม deploy มั่ว / swarm ≤20 turns / ห้ามพูดถึง Lab ในหน้าเว็บ |
| `.claude/skills/opencode/SKILL.md` | เรียก OpenCode ข้าม harness (headless one-shot ผ่านไฟล์) |

```powershell
Test-Path .\.claude\agents\frontend.md, .\.claude\agents\reviewer.md
Test-Path .\.claude\skills\public-site-safe\SKILL.md
Test-Path .\.claude\skills\opencode\SKILL.md
```

ใน `claude` ลอง `@` แล้วเลือก **frontend** (หรือถามว่า agent frontend พร้อมไหม) — ตอบสั้น ๆ โดย**ไม่แก้ไฟล์**

**ความรู้:** นี่คือ Multi-Agent ถาวร (เสา 1) — ไม่ใช่ Sub-Agent ใช้แล้วทิ้ง (เสา 2 = Lab 02)

### B7 — ตรวจ Persistent Memory (Claude harness)

**ไม่สร้างชั้น memory เอง** — ใช้ของ Claude Code เท่านั้น

| ชั้น | ตรวจยังไง | อยู่ที่ |
|---|---|---|
| Agent memory (`memory: project`) | ไฟล์ + จำข้ามเซสชัน | `.claude/agent-memory/frontend/` |
| Auto memory | คำสั่ง `/memory` ใน TUI | `~/.claude/projects/.../memory/` (เครื่องคุณ — ไม่ต้อง commit) |

1. เปิด `.claude/agents/frontend.md` ใน VS Code — ต้องมี `memory: project` ใน frontmatter  
2. ใน `claude` เรียก `@frontend` แล้ววางข้อความประมาณ:

```text
จำไว้ว่าโทนสีหลักของเว็บนี้ให้ตาม docs/PROFILE.md
บันทึกลง persistent memory ของ agent frontend แล้วตอบสั้น ๆ ว่าจำอะไร
อย่าแก้ไฟล์ src/
```

3. พิมพ์ `exit` ปิดเซสชัน · เปิด `claude` ใหม่ที่ root  
4. เรียก `@frontend` อีกรอบ:

```text
จาก memory ของคุณ โทนสีเว็บนี้ควรยึดอะไร เป็นหลัก? อย่าให้ฉัน paste ซ้ำ
```

ต้องอ้างได้โดยไม่ให้คุณบอกใหม่  

5. ดูใน Explorer / SCM:

```powershell
Get-ChildItem -Recurse .\.claude\agent-memory -ErrorAction SilentlyContinue
```

ควรเห็นโฟลเดอร์/ไฟล์ เช่น `MEMORY.md` ใต้ `frontend` (ชื่ออาจต่างเล็กน้อยตามเวอร์ชัน)

6. ใน TUI พิมพ์ `/memory` — ยืนยันว่า auto memory เปิด (หรือจดว่าปิดถ้าตั้งใจ)

**ยังไม่ผ่านข้อนี้ถ้า…** จำข้ามเซสชันไม่ได้และไม่มีไฟล์ใต้ `.claude/agent-memory/` · หรือไปติดตั้ง memory bus แยก

---

## ส่วน C — OpenCode: `/init` + `opencode.json` + `.opencode`

### C1 — `/init` (TUI)

**ทำที่:** Windows Terminal แท็บ `opencode` — พิมพ์ตามนี้

```powershell
opencode
```

> ต้องเป็น OpenCode **v2** (`opencode --version` ขึ้น 2.x) — v1 (1.18.x หรือที่ติดจาก winget) จะขึ้น `Failed to initialize OpenTUI render library … TinyCC is disabled` เมื่อเปิด TUI แก้ด้วย `npm install -g @opencode/cli` แล้วเปิด terminal ใหม่

ใน TUI พิมพ์ `/init`  
merge กับ [`AGENTS.md`](../../AGENTS.md) seed — **อย่าลบ** Ownership / Native harness only — วาง prompt สำเร็จรูปจาก [`prompts/03-merge-opencode-init.md`](prompts/03-merge-opencode-init.md) ได้เลย

### จุดเช็ก

| ที่ดู | ควรเห็น |
|---|---|
| Explorer | `AGENTS.md` เปลี่ยน · อาจมี `.opencode/` |
| Source Control | diff ใน `AGENTS.md` |

### C2 — ตั้งค่า `opencode.json` (MCP) — v2 ใช้ native agents

**ทำที่:** Windows Terminal (แท็บ `powershell`) — รันจาก **root** ของ repo

```powershell
copy .\opencode.json.example .\opencode.json
```

ไฟล์ตัวอย่างมี MCP stubs (GitHub + Playwright) — ไม่มี plugin เสริม

> **ทำไมไม่ติดตั้ง oh-my-openagent:** ทดสอบจริง 2026-09-24 — oh-my-openagent ทั้ง `4.19.4` (stable) และ `5.0.0-beta.89` **ยังไม่รองรับ plugin API ของ v2** (ล่มทันทีด้วย `PluginModule.LoadError`) คอร์สจึงใช้ **native agents** จาก template เป็นค่าหลัก (ไม่ใช่ fallback แล้ว) — ถ้าอนาคต oh-my รองรับ v2 วิทยากรจะประกาศให้

### C3 — ตรวจผล

**ทำที่:** Windows Terminal (แท็บ `powershell`) — พิมพ์ตามนี้

```powershell
Test-Path .\opencode.json
Get-Content .\opencode.json
Test-Path .\.opencode
```

Smoke:

```powershell
opencode run "Reply with one sentence: confirm native agents (@backend) are available. Do not edit files."
```

`opencode --version` ต้องขึ้น 2.x — ถ้าขึ้น 1.x ให้ `npm install -g @opencode/cli` แล้วเปิด terminal ใหม่

### C4 — Backend agent + skill (OpenCode)

ตรวจใน Explorer:

| ไฟล์ | บทบาท |
|---|---|
| `.opencode/agents/backend.md` | API/SQLite owner |
| `.opencode/skills/public-site-safe/SKILL.md` | guardrail เดียวกับฝั่ง Claude |
| `.opencode/skills/claude-code/SKILL.md` | เรียก Claude Code ข้าม harness (headless one-shot ผ่านไฟล์) |

```powershell
Test-Path .\.opencode\agents\backend.md
Test-Path .\.opencode\skills\public-site-safe\SKILL.md
Test-Path .\.opencode\skills\claude-code\SKILL.md
```

เปิดแท็บ `opencode` คนละแท็บจาก `claude` — นี่คือ**ความจำแยก**ระดับเครื่องมือ

### C5 — ตรวจ Persistent Memory (OpenCode harness)

OpenCode **ไม่มี** `memory: project` แบบ Claude — ของถาวรที่คอร์สใช้คือ harness ดังนี้:

| ชั้น | ความหมาย | ตรวจยังไง |
|---|---|---|
| คำสั่งถาวร | `AGENTS.md` + `.opencode/agents/backend.md` | เซสชันใหม่ยังเคารพกฎ ownership |
| Session harness | ประวัติในเซสชัน OpenCode | **resume session เดิม** แล้วยังเห็นบริบท |

1. ใน `opencode` (agent/backend ตามที่เรียกได้) พูดสั้น ๆ:

```text
จำในเซสชันนี้ว่า guestbook ใช้ SQLite ตาม DATA_DIR — ยังไม่ต้องแก้โค้ด
```

2. **Resume session เดิม** (จากรายการ session ใน TUI หรือคำสั่ง resume ของ OpenCode 2.0.6+ ถ้ามี) — ถามว่า guestbook เก็บที่ไหน ต้องตอบจากบริบทเดิมได้  

3. เปิด**เซสชันใหม่** แล้วถามข้อเดิมอีกครั้ง:
   - ยังต้องเคารพ `AGENTS.md` / backend agent  
   - **ไม่บังคับ**ให้ recall ข้อจำปากเปล่าจากเซสชันเก่าแบบ Claude agent-memory  
   - สิ่งที่ต้องอยู่ข้ามเซสชันใหม่ → เขียนลง `docs/` หรือโค้ด (ความจำร่วมของคอร์ส)

4. **ห้าม**ติดตั้ง `opencode-agent-memory` / Mem0 / ชั้น memory แข่งเป็นเกณฑ์ผ่าน (เกินจำเป็น — คอร์สไม่ใช้)

**ความรู้:** Claude = agent-memory ไฟล์โปรเจกต์ · OpenCode = AGENTS + resume session · ทั้งคู่ไม่ใช่ memory bus ที่เราสร้างเอง

---

### C6 — Hot state + Consistency check (shared folder)

ความจริงร่วมข้าม Claude ↔ OpenCode อยู่ที่ **ไฟล์** ไม่ใช่แชท — สร้าง Hot state ตาม [`COURSE.md`](../../COURSE.md) (ชั้น State)

### สร้างไฟล์

**ทำที่:** Windows Terminal (แท็บ `powershell`) — พิมพ์ตามนี้

```powershell
Copy-Item .\docs\STATUS.md.example .\docs\STATUS.md
Copy-Item .\docs\OPEN_LOOPS.md.example .\docs\OPEN_LOOPS.md
# แก้ STATUS: Current goal = "Lab 00 เสร็จ · พร้อม Lab 01" · Updated by = human
# แก้ OPEN_LOOPS: ลบ L1 เมื่อ copy แล้ว · เพิ่มแถว Lab 01 ถ้าต้องการ
```

ตรวจว่ามีเทมเพลต handoff:

```powershell
Test-Path .\docs\handoffs\TEMPLATE.md
```

### Consistency check (บังคับ)

**ทำที่:** แท็บ `claude` และแท็บ `opencode` — วางคำถามเดียวกันทีละตัว

ถาม**ทั้งสอง** harness คำถามเดียวกัน (copy วางทีละตัว):

```text
อ่าน docs/STATUS.md และ docs/OPEN_LOOPS.md (และ AGENTS.md ถ้าจำเป็น)
สรุปไม่เกิน 8 บรรทัด: Current goal, open loops หลัก, blockers
ห้ามสมมุติจากแชทอื่น — ตอบจากไฟล์เท่านั้น
```

| ตรวจ | ผ่านเมื่อ |
|---|---|
| Claude (`claude` หรือ `claude -p`) | สรุปตรงกับ STATUS/OPEN_LOOPS ที่คุณเขียน |
| OpenCode (`opencode` หรือ `opencode run`) | สรุป**สอดคล้อง**กับ Claude (ชุดความจริงเดียวกัน) |

**ยังไม่ผ่านข้อนี้ถ้า…** คำตอบสองฝั่งขัดกันเพราะไปเดาจากแชท · หรือยังไม่มี `STATUS.md` / `OPEN_LOOPS.md`

**ความรู้:** Adapter (`AGENTS.md` / `CLAUDE.md`) ชี้ไปไฟล์กลาง — อย่าคัดลอก STATUS ซ้ำใน adapter · single-writer เมื่ออัปเดตภายหลัง

---

## ส่วน D — MCP เบา ๆ + Commit

ถ้ายังไม่มี `.mcp.json` (จาก SETUP):

**ทำที่:** Windows Terminal (แท็บ `powershell`) — พิมพ์ตามนี้

```powershell
copy .\.mcp.json.example .\.mcp.json
```

ไฟล์นี้**อย่า commit** (อยู่ใน `.gitignore`)

### Commit สิ่งที่ควรเข้า git

**ทำที่:** Windows Terminal (แท็บ `powershell`) — พิมพ์ตามนี้

```powershell
git status -sb
git add .claude/settings.json opencode.json CLAUDE.md AGENTS.md
git add .claude/agents .claude/skills .opencode/agents .opencode/skills
git add docs/STATUS.md docs/OPEN_LOOPS.md docs/STATUS.md.example docs/OPEN_LOOPS.md.example docs/handoffs
# ถ้ามีหลักฐาน agent-memory จาก B7 และอยากเก็บใน repo:
# git add .claude/agent-memory
git status
git commit -m "chore: Lab 00 project init, agents, hot state, and public-site-safe"
```

**ห้าม `git add`:** `node_modules/`, `.env`, `.mcp.json`, `.claude/settings.local.json`, `.claude/agent-memory-local/`

---

## สิ่งที่ได้รับหลังจบ Lab

| สิ่งที่ได้รับ | ผ่านเมื่อ |
|---|---|
| Dependencies | มี `node_modules` จาก `npm install` · `npm test` เขียว |
| Claude project | มี `.claude/settings.json` · superpowers · agents `frontend`/`reviewer` · skill `public-site-safe` |
| OpenCode project | มี `opencode.json` · agent `backend` · skill `public-site-safe` · skill `claude-code` (native agents บน v2) |
| Init | `/init` Claude + OpenCode แล้ว · กฎ ownership ใน seed ยังอยู่ |
| Hot state | มี `docs/STATUS.md` + `docs/OPEN_LOOPS.md` (จาก example) |
| Consistency | Claude กับ OpenCode ตอบ Goal / next จากไฟล์ชุดเดียวกัน (ไม่จากแชทคนละฝั่ง) |
| Git สะอาด | ไม่ commit `node_modules` / `.env` |

**ยังไม่ผ่านถ้า…** ติดตั้ง plugin เป็น User scope · ไม่เปิดโฟลเดอร์ดูไฟล์ · `node_modules` ถูก add เข้า git · ไม่มี STATUS/OPEN_LOOPS · สอง harness ตอบสถานะคนละเรื่องโดยไม่มีไฟล์รอง

---

## ตรวจว่าผ่าน Lab หรือยัง

```powershell
Test-Path .\node_modules
git ls-files node_modules   # ต้องว่าง
Test-Path .\.claude\settings.json
Test-Path .\opencode.json
Test-Path .\.claude\agents\frontend.md, .\.claude\skills\public-site-safe\SKILL.md
Test-Path .\.opencode\agents\backend.md
Test-Path .\docs\STATUS.md, .\docs\OPEN_LOOPS.md, .\docs\handoffs\TEMPLATE.md
Select-String -Path .\.claude\agents\frontend.md -Pattern "memory:\s*project"
Get-ChildItem -Recurse .\.claude\agent-memory -ErrorAction SilentlyContinue
.\scripts\preflight.ps1
npm test
```

- [ ] VS Code เปิดที่ root · เห็นไฟล์เปลี่ยนตามขั้น  
- [ ] `node_modules` จาก `npm install` · ไม่ได้อยู่ใน git  
- [ ] `.claude/settings.json` project + superpowers  
- [ ] มี `.claude/agents/frontend.md` (`memory: project`) + skill `public-site-safe` + skill `opencode`  
- [ ] Claude: `@frontend` จำข้ามเซสชันได้ **หรือ** มีไฟล์ใต้ `.claude/agent-memory/`  
- [ ] Claude: รู้จัก `/memory` (auto memory)  
- [ ] `opencode.json` + `.opencode/agents/backend.md` + skill `claude-code` (หรือ fallback บันทึกแล้ว)  
- [ ] OpenCode: resume session เห็นงานต่อได้ · เซสชันใหม่ยังโหลด `AGENTS.md`  
- [ ] มี `docs/STATUS.md` + `docs/OPEN_LOOPS.md`  
- [ ] Consistency check: Claude กับ OpenCode สรุป Goal/next จากไฟล์ชุดเดียวกัน  
- [ ] ตอบได้ว่า**ไม่ได้**สร้าง memory bus เอง  
- [ ] `/init` ทั้งสองฝั่ง · seed ownership / สี่เสา ยังอยู่  
- [ ] มี commit Lab 00  

---

## ติดปัญหาบ่อย

| อาการ | ลองทำ |
|---|---|
| `claude` ไม่โหลด project settings | เปิดจาก root · ไม่ใช่ subdirectory |
| ติด plugin เป็น User โดยไม่ตั้งใจ | ถอนแล้วติดตั้งใหม่ด้วย `--scope project` / TUI เลือก Project |
| `node_modules` โผล่ใน SCM | ตรวจ `.gitignore` มี `node_modules/` · อย่า `git add -A` มั่ว |
| `opencode` TUI ขึ้น "TinyCC is disabled" | กำลังใช้ v1 — `npm install -g @opencode/cli` (v2) แล้วเปิด terminal ใหม่ · ถอน v1 ที่ติดจาก winget: `winget uninstall SST.opencode` |
| oh-my-openagent โหลดไม่ขึ้น | ยังไม่รองรับ v2 (ทดสอบ 2026-09-24) — ใช้ native `@` agents เป็นค่าหลัก |
| VS Code ไม่เห็นไฟล์ใหม่ | คลิกใน Explorer หรือ Refresh · ดู SCM |
| `/init` ทับ CLAUDE.md ทั้งก้อน | Undo ใน SCM · merge มือตาม seed |
| agent-memory ไม่โผล่ | ยืนยัน `memory: project` · สั่งให้ agent บันทึก memory ชัด ๆ · อัปเดต Claude Code |
| OpenCode จำข้ามเซสชันใหม่ไม่ได้ | ปกติของ harness — ใช้ resume session หรือเขียนลง `docs/` · อย่าติด plugin memory แข่ง |
| Consistency ขัดกัน | ให้ทั้งคู่ตอบจาก STATUS/OPEN_LOOPS เท่านั้น · อัปเดตไฟล์ให้เป็นความจริงล่าสุดก่อนถามซ้ำ |

---

## Lab ถัดไป

[`lab-01-interview`](../lab-01-interview/README.md) — สัมภาษณ์ → `docs/PROFILE.md` (ใช้ brainstorming ที่ติดตั้งแล้ว)
