# SETUP — Build AI Multi-Agent Lab (V4)

ที่นั่งมาตรฐาน: **VS Code หรือ Cursor** เปิดที่ root ของ repo + **Windows Terminal** แยกแท็บ (`powershell` / `claude` / `opencode`)  
Repo นี้ = **ทั้งสินค้า (Astro) + Labs + SETUP** ในที่เดียว  
กด **Use this template** จาก https://github.com/Onto-IQ/build-ai-multi-agent-lab (อย่า Fork)

Deploy ปลายทาง: `https://<STUDENT_SLUG>.9expert.online` (Coolify บน VPS ของคอร์ส)

เวอร์ชันที่ยืนยันในห้อง (อัปเดต 2026-09-23):

| เครื่องมือ | เวอร์ชัน |
|---|---|
| Node.js | 22+ (แนะนำ 22 หรือ 24 LTS) |
| Claude Code | 2.1.278+ |
| OpenCode | **v2** — 2.0.6+ (ทดสอบ 2.0.16) · ติดตั้ง `npm install -g @opencode/cli` · **winget = v1 ห้ามใช้** (TUI พัง) |
| Bun | 1.3.x (ไม่บังคับแล้วบน v2 — เดิมใช้ตอน OpenCode v1 ดึง plugin) |
| gh | 2.x |
| Playwright MCP | `@playwright/mcp@0.0.82` |
| oh-my-openagent | ❌ ยังไม่รองรับ v2 (ทดสอบ 2026-09-24) — ใช้ native agents แทน |
| superpowers | ติดตั้งใน **Lab 00** ด้วย `--scope project` |

> Template **ไม่มี** `node_modules` · **ไม่มี** `.claude/settings.json` / `opencode.json` สำเร็จรูป  
> สิ่งเหล่านั้นเกิดใน [`labs/lab-00-project-init`](labs/lab-00-project-init/README.md)

---

## เตรียมเครื่องเปล่าใน 1 คำสั่ง (ติดตั้ง/ซ่อมให้อัตโนมัติ)

เครื่องยัง**ไม่มี** Node / Git / gh / Bun / Claude Code / OpenCode หรือเคยติดตั้งแล้วคำสั่งเรียกไม่ขึ้น (ติดมาเป็น shim `.ps1`/`.cmd` แต่ PATH ไม่ map จริง) — เปิด **PowerShell** ปกติแล้วรัน:

```powershell
irm https://raw.githubusercontent.com/Onto-IQ/build-ai-multi-agent-lab/main/scripts/setup-windows.ps1 -OutFile "$env:TEMP\setup-windows.ps1"
powershell -ExecutionPolicy Bypass -File "$env:TEMP\setup-windows.ps1"
```

สคริปต์จะขอสิทธิ์ Administrator (UAC) เอง ติดตั้ง/ซ่อมให้จนครบ แล้วพิมพ์ตารางสรุปเวอร์ชัน:

- ติดตั้งเป็น **`.exe` จริง** — Claude Code / OpenCode / Bun ใช้ installer แบบ native (ไม่ผ่าน npm) จึงไม่มีปัญหา shim
- **ซ่อมเครื่องที่ลงพังได้**: PATH หาย → เติมให้ · npm global shim เดิม → ถอดแล้วลง native แทน · คำสั่งมีแต่เรียกแล้วค้าง/พัง → ติดตั้งทับ · Node < 22 → อัปเกรด
- รันซ้ำได้ — ตัวไหนผ่านอยู่แล้วจะข้าม (`-DryRun` เพื่อดูอย่างเดียว · `-SkipVSCode` ถ้าใช้ Cursor)

หลังสคริปต์จบ ทำ **login เองอีก 3 คำสั่ง** (เป็นขั้น interactive — สคริปต์ทำแทนไม่ได้):

```powershell
gh auth login        # GitHub.com → HTTPS → Login with a web browser
claude               # เปิดครั้งแรก จะพาล็อกอิน
opencode auth login  # เลือก provider
```

---

## 0) สิ่งที่ต้องมีก่อนเข้าห้อง

- Windows 10/11 · Git for Windows · บัญชี GitHub
- เครื่องเปล่า / เครื่องที่ติดตั้งพัง → รันสคริปต์ในหัวข้อ **เตรียมเครื่องเปล่าใน 1 คำสั่ง** (ด้านบน) แทนการติดตั้งเอง
- Claude Code และ OpenCode ล็อกอินแล้ว
- Bun
- VS Code หรือ Cursor
- วิทยากรแจก **STUDENT_SLUG** (`user01` … `user30`)

### ตรวจเครื่องมือ

```powershell
node -v
git --version
gh auth status
claude --version
opencode --version
bun --version
code --version   # หรือเปิด Cursor ได้
```

**ยังไม่ผ่านถ้า…** คำสั่งใดไม่เจอใน PATH / ยังไม่ล็อกอิน `gh`

---

## 1) สร้าง repo ของตัวเอง (Use this template)

1. เปิด https://github.com/Onto-IQ/build-ai-multi-agent-lab
2. กด **Use this template** → Create a new repository (เช่น `my-personal-site`)
3. Clone แล้วตั้ง default:

```powershell
gh repo clone <you>/<your-repo>
cd <your-repo>
gh repo set-default <you>/<your-repo>
```

4. เปิด editor ที่ **root** (เห็น `package.json`):

```powershell
code .
```

5. เปิด **Windows Terminal** คนละหน้าต่างสำหรับ CLI/TUI ของ agent  
6. เปิด GitHub Actions ใน Settings → Actions ถ้ายังปิด  
7. สร้าง course issues (หลังมี `node_modules` จาก Lab 00 หรือหลัง `npm install`):

```powershell
node scripts/create-course-issues.mjs
```

**ยังไม่ผ่านถ้า…** สร้างจาก Fork แทน Template / `gh repo set-default` ยังไม่ชี้ repo ของคุณ

จุดเช็กใน VS Code: Explorer เห็น `labs/`, `CLAUDE.md` · **ยังไม่มี** `node_modules` จนกว่าจะ install

---

## 2) `.env` ให้ครบ (ก่อนหรือคู่กับ Lab 00)

```powershell
copy .env.example .env
notepad .env
```

อย่างน้อย:

```env
STUDENT_SLUG=userNN
SITE_URL=https://userNN.9expert.online
GITHUB_PERSONAL_ACCESS_TOKEN=github_pat_...
CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

### GitHub PAT (fine-grained)

1. https://github.com/settings/personal-access-tokens
2. จำกัดเฉพาะ repo ของคุณ · Issues + Pull requests + Contents Read
3. วางใน `.env` — **ห้าม commit**

```powershell
git check-ignore -v .env
git status --short
```

**ยังไม่ผ่านถ้า…** `.env` โผล่ใน `git status` เป็นไฟล์ที่ track ได้

---

## 3) MCP — GitHub + Playwright (copy ตัวอย่าง)

```powershell
copy .mcp.json.example .mcp.json
```

หลัง Lab 00 มี `node_modules` / เปิด `claude` ได้:

```powershell
claude mcp list
opencode mcp list
```

Playwright (ถ้ายังไม่มี):

```powershell
claude mcp add playwright -- npx -y @playwright/mcp@0.0.82
```

**ยังไม่ผ่านถ้า…** ใช้ MCP เป็นท่อส่งงานระหว่าง Claude ↔ OpenCode  
`.mcp.json` อย่า commit (อยู่ใน `.gitignore`)

---

## 4) Lab 00 — ติดตั้งโปรเจกต์ + plugin (บังคับ)

ทำ [`labs/lab-00-project-init/README.md`](labs/lab-00-project-init/README.md) ให้ครบ:

- `npm install` → `node_modules` (ไม่มาจาก template)
- Claude `/init` + `claude plugin install … --scope project`
- OpenCode `/init` — ต้องเป็น **v2** (`opencode --version` = 2.x) · native agents จาก template เป็นค่าหลัก
- ดูการเปลี่ยนแปลงใน **Explorer + Source Control**

ตัวอย่าง config (อ้างอิง — Lab 00 สร้างของจริง):

- [`.claude/settings.json.example`](.claude/settings.json.example)
- [`opencode.json.example`](opencode.json.example)

**อย่าข้าม Lab 00 ไป Lab 01**

---

## 5) Preflight ก่อน Lab 01

```powershell
.\scripts\preflight.ps1
npm test
Test-Path .\.env
Test-Path .\.claude\settings.json
Test-Path .\opencode.json
Test-Path .\labs\lab-00-project-init\README.md
gh issue list --limit 10
```

ไปที่ [`labs/README.md`](labs/README.md)

---

## Troubleshooting

| อาการ | แก้ |
|---|---|
| `claude` ไม่เจอ | ปิดเปิด Terminal · PATH `%USERPROFILE%\.local\bin` |
| ติดตั้งแล้วได้ shim `.ps1`/`.cmd` เรียกไม่ขึ้น | รัน `setup-windows.ps1` ซ้ำ — มีขั้นเติม PATH และถอด npm shim แล้วลง native `.exe` แทน |
| `opencode` TUI ขึ้น "TinyCC is disabled" | กำลังใช้ v1 — `npm install -g @opencode/cli` (v2) แล้วเปิด terminal ใหม่ · ถอน v1: `winget uninstall SST.opencode` |
| winget ไม่มีในเครื่อง | ติดตั้ง **App Installer** จาก Microsoft Store แล้วรันสคริปต์ซ้ำ (OpenCode/claude/bun ไม่ต้องใช้ winget ก็ลงได้) |
| GitHub MCP 401 | PAT หมดอายุ / scope ไม่ครบ |
| พอร์ตซ้ำ | เปลี่ยน `PORT` ใน `.env` |
| `node_modules` ใน git | อย่า add — ตรวจ `.gitignore` |
| plugin ติดแบบ User | ถอนแล้วติดตั้งใหม่ `--scope project` (Lab 00) |
| Coolify (Lab 08) | ตรวจ DNS `userNN.9expert.online` ก่อน deploy |

## ความลับ

ห้าม commit `.env`, PAT, webhook · หลังจบคอร์สหมุน/ลบ PAT
