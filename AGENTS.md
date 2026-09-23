# Agents — Build AI Multi-Agent Lab (V4)

กติการ่วมสำหรับ **Claude Code** และ **OpenCode** ใน repo นี้  
สินค้า = เว็บ personal branding (Astro) ใน root นี้เอง — ไม่มี repo สินค้าแยก

## Ownership

| Artifact | Owner |
|---|---|
| UI pages (`src/pages/*.astro`, `src/layouts/`) | Claude Code |
| API + SQLite (`src/lib/db.ts`, `src/pages/api/*`) | OpenCode |
| E2E / a11y (`playwright/`, `docs/QA.md`) | Playwright MCP + either CLI |
| Profile / debate docs (`docs/PROFILE.md`, `DEBATE.md`, `DECISIONS.md`) | Claude (Lab 01–02) |
| Ship (`docs/SHIP.md`, Coolify) | Lab 08 |

## Workflow

```text
Interview → Plan → Build → Test → Ship
```

หยุดเมื่อ GitHub issue acceptance ผ่าน — ไม่ใช่เมื่อครบโควต้ารอบ

## Native harness only

- ใช้ Skills จาก community (superpowers) และ native agents / Subagents / `@` ของแต่ละเครื่องมือ
- Cross-CLI (`opencode run` แล้ว `claude -p`) **เฉพาะ Lab 07** สำหรับรีวิวอิสระ
- ห้ามสร้างชั้น orchestration แข่ง (JSON bus / Flux / room dispatch)
- MCP ใช้กับงานผลิต (GitHub Issues/PR, Playwright) — **ไม่ใช่ท่อส่งงานระหว่างสอง CLI**

## คำสั่งหลัก

```powershell
npm install
npm run dev          # http://localhost:4321
npm test             # smoke — ต้องเขียว
npm run test:labs    # Lab 05 — แดงจนกว่าจะ implement db
npm run build
npm start
node scripts/create-course-issues.mjs
```

## ห้าม

- Commit `.env`, PAT, Coolify webhook
- ยืนยัน deploy สำเร็จถ้ายังไม่มี URL จริง (`https://<STUDENT_SLUG>.9expert.online`)
- บังคับ tmux ในห้อง Windows (Agent Teams ใช้ in-process)
- เปิด PR เข้า `Onto-IQ/*` — PR เข้า **repo ของผู้เรียนเท่านั้น**

## Labs

เริ่มที่ [`SETUP.md`](./SETUP.md) แล้วทำตาม [`labs/README.md`](./labs/README.md)
