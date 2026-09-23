# SETUP — Build AI Multi-Agent Lab (V4)

ที่นั่ง: **VS Code** + **Windows Terminal** แยกแท็บ (`claude` / `claude agents` / `opencode`)  
Repo นี้ = **ทั้งสินค้า (Astro) + Labs + SETUP** ในที่เดียว  
กด **Use this template** จาก https://github.com/Onto-IQ/build-ai-multi-agent-lab (อย่า Fork)

Deploy ปลายทาง: `https://<STUDENT_SLUG>.9expert.online` (Coolify บน VPS ของคอร์ส)

เวอร์ชันที่ยืนยันในห้อง (อัปเดต 2026-09-23):

| เครื่องมือ | เวอร์ชัน |
|---|---|
| Node.js | 22+ (แนะนำ 22 หรือ 24 LTS) |
| Claude Code | 2.1.278+ |
| OpenCode | 2.0.6+ |
| Bun | 1.3.x (ติดตั้ง oh-my-openagent) |
| gh | 2.x |
| Playwright MCP | `@playwright/mcp@0.0.82` |
| oh-my-openagent | `4.19.4` |
| superpowers | `/plugin install superpowers@claude-plugins-official` |

---

## 0) สิ่งที่ต้องมีก่อนเข้าห้อง

- Windows 10/11 · Git for Windows · บัญชี GitHub
- Claude Code และ OpenCode ล็อกอินแล้ว
- Bun
- วิทยากรแจก **STUDENT_SLUG** (`user01` … `user30`)

### ตรวจเครื่องมือ

```powershell
node -v
git --version
gh auth status
claude --version
opencode --version
bun --version
```

**ยังไม่ผ่านถ้า…** คำสั่งใดไม่เจอใน PATH / ยังไม่ล็อกอิน `gh`

รันเช็กเร็ว (หลัง clone):

```powershell
.\scripts\preflight.ps1
```

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

4. เปิด GitHub Actions ใน Settings → Actions ถ้ายังปิด
5. สร้าง course issues:

```powershell
node scripts/create-course-issues.mjs
```

**ยังไม่ผ่านถ้า…** สร้างจาก Fork แทน Template / `gh repo set-default` ยังไม่ชี้ repo ของคุณ

---

## 2) ติดตั้ง dependencies และรันเว็บ

ที่ **root ของ repo นี้** (โฟลเดอร์ที่มี `package.json` และ `CLAUDE.md`):

```powershell
npm install
npm test
npm run dev
```

เปิด http://localhost:4321

ผลที่ควรเห็น:

- หน้า Home จาก `docs/PROFILE.md`
- `npm test` เขียว
- `npm run test:labs` **แดง** จนกว่า Lab 05 — ปกติ

**ยังไม่ผ่านถ้า…** พอร์ต 4321 ชน → เปลี่ยน `PORT` ใน `.env`  
ถ้า `better-sqlite3` พัง → `npm approve-scripts better-sqlite3` แล้ว `npm rebuild better-sqlite3`

---

## 3) `.env` ให้ครบ

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

## 4) MCP — GitHub + Playwright

```powershell
copy .mcp.json.example .mcp.json
claude mcp list
opencode mcp list
```

Playwright (ถ้ายังไม่มี):

```powershell
claude mcp add playwright -- npx -y @playwright/mcp@0.0.82
```

**ยังไม่ผ่านถ้า…** ใช้ MCP เป็นท่อส่งงานระหว่าง Claude ↔ OpenCode

---

## 5) Community plugins

ใน `claude`:

```text
/plugin install superpowers@claude-plugins-official
```

OpenCode (optional Lab 05+):

```powershell
bunx oh-my-openagent@4.19.4 install --no-tui --platform=opencode
```

ถ้าพังภายใน 15 นาที → ใช้ native `@` subagents แล้วไปต่อ

---

## 6) Preflight ก่อน Lab 01

```powershell
.\scripts\preflight.ps1
npm test
Test-Path .\.env
Test-Path .\docs\PROFILE.md
Test-Path .\labs\lab-01-interview\README.md
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
| Coolify (Lab 08) | ตรวจ DNS `userNN.9expert.online` ก่อน deploy |

## ความลับ

ห้าม commit `.env`, PAT, webhook · หลังจบคอร์สหมุน/ลบ PAT
