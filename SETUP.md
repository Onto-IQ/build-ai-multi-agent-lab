# SETUP — Build AI Multi-Agent Lab (V4)

ที่นั่ง: **VS Code** + **Windows Terminal** แยกแท็บ (`claude` / `claude agents` / `opencode`)  
สินค้า: เว็บจาก template **[Onto-IQ/course-personal-site](https://github.com/Onto-IQ/course-personal-site)** (Astro personal branding)  
Lab นี้ (`build-ai-multi-agent-lab`) = คู่มือ + labs + Command Center ทางเลือก — **ไม่ใช่ตัวสินค้า**

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
| superpowers | ผ่าน `/plugin install superpowers@claude-plugins-official` |

---

## 0) สิ่งที่ต้องมีก่อนเข้าห้อง

- Windows 10/11
- Git for Windows (ต้องมี Git Bash — ใช้ `sh` ได้)
- บัญชี GitHub + `gh` CLI ล็อกอินแล้ว
- Claude Code ล็อกอินแล้ว (`claude`)
- OpenCode ล็อกอินแล้ว (`opencode`)
- Bun
- วิทยากรแจก **STUDENT_SLUG** (`user01` … `user30`)

### ตรวจเครื่องมือ (ต้องผ่านทุกบรรทัด)

```powershell
node -v
git --version
gh auth status
claude --version
opencode --version
bun --version
```

**ยังไม่ผ่านถ้า…**

- `claude` / `opencode` / `gh` ไม่เจอใน PATH
- `gh auth status` ยังไม่ล็อกอิน
- Node ต่ำกว่า 22

รันเช็กเร็ว:

```powershell
# จาก root ของ build-ai-multi-agent-lab
.\scripts\preflight.ps1
```

---

## 1) สร้าง repo สินค้าของตัวเอง (Use this template — ห้าม Fork)

1. เปิด https://github.com/Onto-IQ/course-personal-site
2. กด **Use this template** → **Create a new repository**
   - ชื่อแนะนำ: `my-personal-site` หรือ `personal-site-<ชื่อ>`
   - Visibility: Public หรือ Private ก็ได้
3. Clone **repo ของคุณ** แล้วตั้ง default ให้ `gh`:

```powershell
gh repo clone <you>/<your-repo>
cd <your-repo>
gh repo set-default <you>/<your-repo>
```

4. เปิด GitHub Actions ใน Settings → Actions ถ้ายังปิดอยู่
5. สร้าง course issues (ครั้งเดียว):

```powershell
node scripts/create-course-issues.mjs
```

ผลที่ควรเห็น: URL ของ issue 8 อันใน repo ของคุณ

**ยังไม่ผ่านถ้า…**

- สร้างจาก Fork แทน Template (issues/workflow อาจเพี้ยน และ PR อาจเผลอชี้ไป Onto-IQ)
- `gh repo set-default` ยังไม่ชี้ repo ของคุณ
- `create-course-issues` ล้มเพราะยังไม่ล็อกอิน `gh`

---

## 2) ติดตั้ง dependencies และรันเว็บ

ใน root ของ **repo สินค้า** (ไม่ใช่ lab repo):

```powershell
npm install
npm test
npm run dev
```

เปิดเบราว์เซอร์: http://localhost:4321

ผลที่ควรเห็น:

- หน้า Home มีชื่อ / headline จาก `docs/PROFILE.md`
- เมนู Home / About / Interests / Contact / Guestbook
- `npm test` เขียว (smoke)
- `npm run test:labs` **แดง** จนกว่าจะทำ Lab 05 — เป็นเรื่องปกติ

**ยังไม่ผ่านถ้า…**

- พอร์ต 4321 ถูกใช้แล้ว → เปลี่ยนใน `.env` เป็น `PORT=4322` แล้วรันใหม่
- `npm install` พังที่ `better-sqlite3` → ติดตั้ง Build Tools for Visual Studio หรือใช้เครื่องที่มี `python` + `make` แล้ว `npm approve-scripts better-sqlite3` + `npm rebuild better-sqlite3`

หยุด dev server ด้วย `Ctrl+C` เมื่อไม่ใช้

---

## 3) `.env` ให้ครบ (บังคับ)

```powershell
copy .env.example .env
notepad .env
```

ใส่ค่าอย่างน้อย:

```env
STUDENT_SLUG=userNN
SITE_URL=https://userNN.9expert.online
GITHUB_PERSONAL_ACCESS_TOKEN=github_pat_...
CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

### วิธีได้ GitHub PAT (fine-grained)

1. https://github.com/settings/personal-access-tokens
2. Generate new token → เลือก **เฉพาะ repo ของคุณ**
3. Permissions: Issues Read/Write, Pull requests Read/Write, Contents Read
4. วางใน `.env` — **ห้าม commit**

ตรวจว่า git ไม่ติดตาม `.env`:

```powershell
git check-ignore -v .env
git status --short
```

**ยังไม่ผ่านถ้า…** `.env` โผล่ใน `git status` เป็นไฟล์ใหม่ที่ยังไม่ ignore

---

## 4) MCP — GitHub + Playwright (งานผลิต ไม่ใช่ท่อส่งข้าม CLI)

### Claude Code

```powershell
# จาก root ของ repo สินค้า
copy .mcp.json.example .mcp.json
# แก้ token ใน .mcp.json หรือ export จาก .env ก่อนเปิด claude
claude mcp list
```

หรือเพิ่มทีละตัว:

```powershell
claude mcp add --transport http github https://api.githubcopilot.com/mcp/
```

(ใส่ Authorization header ตามเอกสาร Claude MCP ของคุณ)

Playwright:

```powershell
claude mcp add playwright -- npx -y @playwright/mcp@0.0.82
```

### OpenCode

ไฟล์ `opencode.json` ใน template มี mcp github + playwright อยู่แล้ว  
ตรวจว่า env `GITHUB_PERSONAL_ACCESS_TOKEN` ถูกโหลดก่อน `opencode`

```powershell
opencode mcp list
```

**ยังไม่ผ่านถ้า…**

- MCP ใช้ส่งงานระหว่าง Claude ↔ OpenCode (ผิดจุดประสงค์คอร์ส)
- Playwright MCP ไม่ขึ้น — ลอง `npx -y @playwright/mcp@0.0.82 --help`

---

## 5) Community plugins (pin)

### Claude — superpowers

ในเซสชัน `claude`:

```text
/plugin install superpowers@claude-plugins-official
```

ตรวจ: มี skill brainstorming ใช้งานได้

### OpenCode — oh-my-openagent (optional แต่แนะนำ Lab 05+)

```powershell
bunx oh-my-openagent@4.19.4 install --no-tui --platform=opencode
```

ถ้าพัง → ใช้ native `@` subagents ของ OpenCode (ไม่มี oh-my ก็ผ่าน Lab ได้)

**ยังไม่ผ่านถ้า…** บังคับตัวเองติด plugin จนเสียเวลาเกิน 15 นาที — ใช้ fallback native แล้วไปต่อ

---

## 6) Permissions / Agent Teams (Windows)

- อย่าบังคับ `tmux` ในห้อง Windows
- Agent Teams: ใส่ `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` ใน `.env` แล้วเปิด `claude` ใหม่
- ถ้า Teams ไม่เสถียร → Lab 02 ใช้ **Subagents 3 ตัว** เป็นทางหลัก

---

## 7) โคลนคู่มือ Lab (repo นี้) คู่กัน

```powershell
gh repo clone Onto-IQ/build-ai-multi-agent-lab
cd build-ai-multi-agent-lab
git checkout v4
```

เปิด VS Code workspace ที่ชี้ทั้ง **repo สินค้า** และ **lab repo**  
ทำ Lab จาก `labs/lab-01-…` โดยรันคำสั่งใน **repo สินค้า**

---

## 8) Preflight สรุปก่อน Lab 01

ใน repo สินค้า:

```powershell
npm test
Test-Path .\.env
Test-Path .\docs\PROFILE.md
gh issue list --limit 10
claude --version
opencode --version
```

ใน lab repo:

```powershell
.\scripts\preflight.ps1
```

เมื่อครบแล้วไปที่ [`labs/README.md`](labs/README.md)

---

## Troubleshooting เร็ว

| อาการ | แก้ |
|---|---|
| `claude` ไม่เจอ | ปิดเปิด Terminal / ตรวจ PATH `%USERPROFILE%\.local\bin` |
| GitHub MCP 401 | PAT หมดอายุ หรือ scope ไม่ครบ |
| พอร์ต 4321 ซ้ำ | เปลี่ยน `PORT` ใน `.env` |
| Coolify deploy ภายหลัง (Lab 08) | ตรวจ DNS `userNN.9expert.online` ชี้ VPS แล้วค่อย deploy |
| อยาก static สำรอง | `astro build` แบบ static + GitHub Pages (ไม่มี API) |

## ความลับ

- ห้าม commit `.env`, PAT, Coolify webhook, รหัส FTP
- หลังจบคอร์ส: หมุน/ลบ PAT และแจ้งวิทยากรถ้าต้องการปิด slug
