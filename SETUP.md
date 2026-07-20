# SETUP — Technical Environment (Outline 2)

ทำตามทีละข้อก่อนเข้า Lab 01

## 1) เปิดโฟลเดอร์ให้ถูกที่

1. เปิด **VS Code**
2. File → Open Folder → เลือก **root** ของ `build-ai-multi-agent-lab`  
   (ห้ามเปิดแค่โฟลเดอร์ `labs/`)
3. (ทางเลือก) เปิด `build-ai-multi-agent-lab.code-workspace`

## 2) ติดตั้งพื้นฐาน

ตรวจใน Terminal ของ VS Code:

```powershell
node --version
git --version
```

ถ้าไม่มี Node หรือ Git ให้ติดตั้งก่อน (วิทยากรในห้องช่วยได้)

## 3) Claude Code

1. ติดตั้งตามที่ห้องจัดให้ (CLI `claude`)
2. ตรวจ:

```powershell
claude --version
```

ถ้าคำสั่งไม่เจอ → บอกวิทยากร (อย่าข้ามไป Lab 01 โดยไม่มีทางรัน Claude Code)

## 4) OpenCode

1. ติดตั้งตามที่ห้องจัดให้ (CLI `opencode`)
2. ตรวจ:

```powershell
opencode --version
```

ใช้จริงใน Lab 02 — แต่ควรติดตั้งตั้งแต่ Setup

## 5) ไฟล์ `.env`

1. คัดลอก `.env.example` → `.env`  
   หรือรัน Task: **copy-env-example**
2. ใส่คีย์ที่ห้องแจก (อย่า commit `.env`)
3. ค่าสำคัญ:
   - `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` (ลองทีมใน Lab 06)
   - `FLUX_API_KEY` / `FLUX_WORKSPACE_URL` (ใช้ Lab 10)

## 6) ตรวจเครื่องรวดเดียว

รัน Task: **env-checklist**  
หรือ:

```powershell
node --version
git --version
Get-Command claude -ErrorAction SilentlyContinue
Get-Command opencode -ErrorAction SilentlyContinue
Test-Path .env
```

## เกณฑ์ผ่าน Outline 2

- [ ] เปิด root lab ใน VS Code ได้
- [ ] มีไฟล์ `.env`
- [ ] `node` และ `git` พร้อม
- [ ] รู้ว่าต่อไปอ่าน `labs/lab-01-code-reviewer/README.md`

## แก้ปัญหาเบื้องต้น

| อาการ | ทำอะไร |
|---|---|
| เปิดผิดโฟลเดอร์ | ปิดแล้ว Open Folder ที่ root อีกครั้ง |
| Task ไม่ขึ้น | เปิดโฟลเดอร์ที่มี `.vscode/tasks.json` |
| ไม่มี `claude` / `opencode` | ขอวิทยากรติดตั้ง — อย่าเดา path |
