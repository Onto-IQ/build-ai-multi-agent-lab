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
| OpenCode | 2.0.6+ |
| Bun | 1.3.x (ใช้ตอน OpenCode ดึง plugin) |
| gh | 2.x |
| Playwright MCP | `@playwright/mcp@0.0.82` |
| oh-my-openagent | `4.19.4` (ติดตั้งใน **Lab 00** แบบ project) |
| superpowers | ติดตั้งใน **Lab 00** ด้วย `--scope project` |

> Template **ไม่มี** `node_modules` · **ไม่มี** `.claude/settings.json` / `opencode.json` สำเร็จรูป  
> สิ่งเหล่านั้นเกิดใน [`labs/lab-00-project-init`](labs/lab-00-project-init/README.md)

---

## 0) สิ่งที่ต้องมีก่อนเข้าห้อง

- Windows 10/11 · Git for Windows · บัญชี GitHub
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
- OpenCode `/init` + `opencode plugin add oh-my-openagent@4.19.4`
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
| GitHub MCP 401 | PAT หมดอายุ / scope ไม่ครบ |
| พอร์ตซ้ำ | เปลี่ยน `PORT` ใน `.env` |
| `node_modules` ใน git | อย่า add — ตรวจ `.gitignore` |
| plugin ติดแบบ User | ถอนแล้วติดตั้งใหม่ `--scope project` (Lab 00) |
| Coolify (Lab 08) | ตรวจ DNS `userNN.9expert.online` ก่อน deploy |

## ความลับ

ห้าม commit `.env`, PAT, webhook · หลังจบคอร์สหมุน/ลบ PAT
