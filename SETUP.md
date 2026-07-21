# SETUP — Technical Environment (Outline 2)

ทำตามทีละข้อก่อนเข้า Lab 01  
**ข้ามแพลตฟอร์ม:** Windows / macOS / Linux ใช้ **Node + git** เป็น runtime เดียวกัน — **ไม่ใช้** Python `venv` ใน lab นี้

## ผลลัพธ์รูปธรรม (Setup)

1. **ต้องมีไฟล์/หลักฐานเหล่านี้** — `.env` (จาก `.env.example`); เครื่องมือพร้อม
2. **ต้องเห็นด้วยตาอะไร** — Terminal พิมพ์เวอร์ชัน `node` / `git` / `claude` / `opencode` ครบ; เปิดแผงบน localhost ได้
3. **เช็คผ่าน** — Task `env-checklist` หรือคำสั่งด้านล่าง
4. **ยังไม่ผ่านถ้า…** — ไม่มี `node` (validator/ด่านใช้ไม่ได้) หรือไม่มี `.env`

## 1) เปิดโฟลเดอร์ให้ถูกที่

1. เปิด **VS Code**
2. File → Open Folder → เลือก **root** ของ `build-ai-multi-agent-lab`  
   (ห้ามเปิดแค่โฟลเดอร์ `labs/`)
3. (ทางเลือก) เปิด `build-ai-multi-agent-lab.code-workspace`

## 2) ติดตั้งพื้นฐาน (Node บังคับ)

```bash
node --version
git --version
```

- **Node บังคับ** สำหรับ `shared/scripts/validate-json.mjs` และ `gate-quality.mjs`  
- ไม่ต้อง `npm install` ที่ root และ**ไม่ต้อง**สร้าง Python venv  
- ถ้าไม่มี Node หรือ Git ให้ติดตั้งก่อน — **ห้ามข้าม validator** ในเกณฑ์ผ่านเต็ม

## 3) Claude Code

```bash
claude --version
```

ถ้าคำสั่งไม่เจอ → บอกวิทยากร (อย่าข้ามไป Lab 01)

## 4) OpenCode

```bash
opencode --version
```

ใช้จริงใน Lab 02 — แต่ควรติดตั้งตั้งแต่ Setup

## 5) ไฟล์ `.env`

1. คัดลอก `.env.example` → `.env` หรือ Task: **copy-env-example**
2. ใส่คีย์ที่ห้องแจก (**อย่า commit** `.env`)
3. ค่าสำคัญ:
   - `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` (Lab 06)
   - `FLUX_API_KEY` / `FLUX_WORKSPACE_URL` (Lab 10 — ดู [`FLUX-SETUP.md`](labs/lab-10-kanban-collab/FLUX-SETUP.md))

## 6) ดูแผงบน localhost (แนะนำตั้งแต่ Setup / Lab 09)

แอปดึง `../backend/*.json` — **อย่าเปิด** `index.html` แบบ `file://`

จาก **root ของ repo**:

```bash
npx --yes serve apps/sample-dashboard -p 4173
```

เปิดเบราว์เซอร์: [http://localhost:4173/frontend/](http://localhost:4173/frontend/)

ทางเลือก: VS Code Live Preview / Live Server ที่โฟลเดอร์ `apps/sample-dashboard`

## 7) Flux MCP (เตรียมก่อน Lab 10 — สั้น ๆ)

รายละเอียด: [`labs/lab-10-kanban-collab/FLUX-SETUP.md`](labs/lab-10-kanban-collab/FLUX-SETUP.md)

- คีย์ขึ้นต้น `flux_` ใน `.env`
- **อย่า commit** `.mcp.json` (มีใน `.gitignore`)

จำ: **JSON = ส่งงาน/ด่าน**, **Flux = มอบหมาย/คิว** (ดู `CLAUDE.md`)

## 8) ตรวจเครื่องรวดเดียว

Task: **env-checklist** หรือ:

```bash
node --version
git --version
command -v claude || where claude
command -v opencode || where opencode
test -f .env || ls .env
```

PowerShell:

```powershell
node --version; git --version
Get-Command claude, opencode -ErrorAction SilentlyContinue
Test-Path .env
```

## เกณฑ์ผ่าน Outline 2

- [ ] เปิด root lab ใน VS Code ได้
- [ ] มีไฟล์ `.env`
- [ ] `node` และ `git` พร้อม
- [ ] `claude` และ `opencode` พิมพ์เวอร์ชันได้
- [ ] เปิดแผงบน localhost ได้ (หรือรู้คำสั่งในข้อ 6)
- [ ] รู้ว่าต่อไปอ่าน `labs/lab-01-code-reviewer/README.md`

## ผลงานผู้เรียน (เริ่มจากศูนย์)

โฟลเดอร์เหล่านี้ถูก gitignore — สร้างเองระหว่าง Lab:

| path | หมายเหตุ |
|---|---|
| `workspace/contracts/*.json` | สัญญาผลงาน |
| `workspace/e2e-reports/` | หลักฐานทดสอบ (ถ้ามี) |
| `MEMORY.md` | Lab 04 (คัดลอกจาก starter) |
| `.env` / `.mcp.json` | ความลับ — ห้าม commit |

## แก้ปัญหาเบื้องต้น

| อาการ | ทำอะไร |
|---|---|
| เปิดผิดโฟลเดอร์ | Open Folder ที่ root อีกครั้ง |
| ไม่มี `node` | ติดตั้งก่อน Lab 01 |
| แผงว่าง / fetch พัง | ใช้ `npx serve` ที่ `apps/sample-dashboard` ไม่ใช่ `file://` |
| PowerShell ส่ง prompt ยาวแล้วค้าง | ส่งผ่าน stdin pipeline (Lab 01–02) |
| มีคนบอกให้สร้าง venv | ไม่ต้อง — lab นี้ไม่มี Python app |
