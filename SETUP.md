# SETUP — Build AI Multi-Agent Lab (V3)

ที่นั่ง: **VS Code** + **Windows Terminal** แยก (`claude` / `claude agents` / `opencode`)  
สินค้า: แอปจาก template **[Onto-IQ/course-actual-budget](https://github.com/Onto-IQ/course-actual-budget)** (pinned Actual Budget fork)  
Lab นี้ (`build-ai-multi-agent-lab`) = คู่มือ + labs + Command Center ทางเลือก — **ไม่ใช่ตัวสินค้า**

## 0) สิ่งที่ต้องมี

- Windows 10/11, Git, GitHub account, `gh` CLI
- Node.js **22+** (แนะนำ LTS 22 หรือ 24) — ตอนติดตั้งเลือก Tools for Native Modules
- Claude Code และ OpenCode ล็อกอินได้
- Bun (สำหรับติดตั้ง oh-my-openagent)
- (แนะนำ) Docker Desktop ถ้าจะใช้ GitHub MCP แบบ local — ปกติใช้ remote ก็พอ

ตรวจ:

```powershell
node -v
git --version
gh auth status
claude --version
opencode --version
```

## 1) สร้าง repo สินค้าของตัวเอง (Template ไม่ใช่ Fork)

1. เปิด https://github.com/Onto-IQ/course-actual-budget
2. กด **Use this template** → Create a new repository (ตั้งชื่อ เช่น `my-paper-budget`)
3. Clone **repo ของคุณ** แล้วตั้ง default ให้ `gh`:

```powershell
gh repo clone <you>/<my-paper-budget>
cd <my-paper-budget>
gh repo set-default <you>/<my-paper-budget>
```

4. เปิด GitHub Actions ใน repo ใหม่ถ้ายังไม่เปิด
5. สร้าง issues จากไฟล์คอร์ส (ครั้งเดียว):

```powershell
node scripts/create-course-issues.mjs
```

## 2) ติดตั้ง Actual (ใน repo สินค้า)

### Windows — PATH ที่ต้องมีก่อน `yarn start`

PowerShell อย่างเดียว**ไม่พอ**: สคริปต์ของ Actual เรียก `sh` และ spawn `yarn`

```powershell
# 1) ใส่ Git Bash ไว้ใน PATH ของ session นี้
$env:PATH = "C:\Program Files\Git\bin;" + $env:PATH

# 2) ทำ yarn shim (ครั้งเดียวต่อเครื่อง) — corepack อาจติด EPERM บน Windows
$npmBin = "$env:APPDATA\npm"
New-Item -ItemType Directory -Force -Path $npmBin | Out-Null
Copy-Item .\.yarn\releases\yarn-*.cjs "$npmBin\yarn.cjs" -Force
"@echo off`r`nnode `"%~dp0yarn.cjs`" %*" | Set-Content "$npmBin\yarn.cmd" -Encoding ASCII
$env:PATH = "$npmBin;" + $env:PATH
yarn --version
where.exe sh
```

จาก root ของ repo สินค้า:

```powershell
yarn install
yarn workspace @actual-app/core rebuild
yarn start
```

ตรวจ: เปิด http://localhost:3001/ ควรได้ HTTP 200  
**ใช้ข้อมูลตัวอย่างเท่านั้น** — ห้ามใส่รหัสธนาคารจริง / ห้าม bank sync จริง

### ปัญหาที่เจอบน Windows (วิทยากรตรวจแล้ว)

| อาการ | ความหมาย | ทางออก |
|---|---|---|
| `'sh' is not recognized` | ไม่มี Git Bash ใน PATH | ใส่ `C:\Program Files\Git\bin` |
| `loot-core backend failed to spawn: spawn yarn ENOENT` | โปรเซสลูกหา `yarn` ไม่เจอ | ทำ yarn shim ตามด้านบน · หรือเปิด **Dev Container** (`.devcontainer/`) · หรือ `docker compose` เมื่อ Docker Desktop รันอยู่ |
| UI ขึ้นแต่แอปขึ้น `BackendInitFailure` | frontend พร้อม แต่ backend ไม่ขึ้น | Lab 01 ยังผ่านได้ด้วยการแก้โค้ด + PR (ดู Lab 01) · Labs 02–06 ใช้ `course/` ไม่ต้องพึ่ง UI |

ค่าติดตั้งอ้างอิง (เครื่องวิทยากร): `yarn install` ~3–4 นาทีบน Windows หลัง shallow clone · Vite พร้อมที่ `:3001`

ทดสอบ course stubs:

```powershell
cd course
npm test          # เขียวบน template (fxRate stretch)
npm run test:labs # Lab 02–06 — แดงจนกว่าจะทำ issue สำเร็จ (เรื่องปกติ)
```

## 3) โคลน lab repo (คู่มือ)

```powershell
gh repo clone Onto-IQ/build-ai-multi-agent-lab
cd build-ai-multi-agent-lab
git checkout v3
code .
```

เปิด Command Center ทางเลือกได้ทีหลัง (Lab optional) — **ไม่ใช่เกณฑ์ผ่าน**

## 4) Community plugins (pin)

### Superpowers (Claude Code)

ในเซสชัน Claude Code:

```text
/plugin install superpowers@claude-plugins-official
```

Fallback: `/plugin marketplace add obra/superpowers-marketplace` แล้วติดตั้งจาก marketplace นั้น  
OpenCode pin อ้างอิง: `v6.4.1` (ดู `.opencode` INSTALL ของ superpowers)

### oh-my-openagent (เดิมเรียก oh-my-opencode)

```powershell
bunx oh-my-openagent@4.19.4 install --no-tui --platform=opencode --claude=yes --openai=no --gemini=no --copilot=no
opencode --version   # ต้องการ >= 1.4.0
bunx oh-my-openagent doctor
```

Fallback Lab 06: ใช้ native OpenCode `@` subagents อย่างเดียว

## 5) MCP (งานผลิต — ไม่ใช่ท่อส่งงานข้าม CLI)

### GitHub MCP (Claude)

```powershell
$pat = $env:GITHUB_PERSONAL_ACCESS_TOKEN  # สร้าง PAT แล้วใส่ใน env — ห้าม commit
claude mcp add github --transport http https://api.githubcopilot.com/mcp/ -H "Authorization: Bearer $pat"
```

### GitHub MCP (OpenCode) — ใน `opencode.json`

```json
{
  "mcp": {
    "github": {
      "type": "remote",
      "url": "https://api.githubcopilot.com/mcp/",
      "enabled": true,
      "oauth": false,
      "headers": {
        "Authorization": "Bearer {env:GITHUB_PERSONAL_ACCESS_TOKEN}"
      }
    }
  }
}
```

### Playwright MCP

```powershell
claude mcp add --scope project playwright npx -y @playwright/mcp@0.0.82
```

OpenCode: ใส่ `mcp.playwright` เป็น local command `npx -y @playwright/mcp@0.0.82`

## 6) กฎที่ต้องจำ

- PR เปิดเข้า **repo ของคุณ** เท่านั้น
- ไม่สร้าง harness แข่ง (ไม่มี JSON contract / dispatch skill ของห้อง)
- สั่งข้าม Claude ↔ OpenCode ได้เฉพาะตอน **รีวิวด้วยโมเดลอีกตัว** (Lab 07)
- ห้ามยืนยัน deploy สำเร็จถ้ายังไม่มี URL จริง

เมื่อพร้อม → เริ่ม [`labs/lab-01-claude-native/README.md`](labs/lab-01-claude-native/README.md)
