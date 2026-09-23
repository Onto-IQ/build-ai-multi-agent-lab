# Build AI Multi-Agent Lab (V4)

Template สำหรับคอร์ส **Build AI Multi-Agent with Claude Code**  
กด **Use this template** (อย่า Fork) → ได้ทั้งเว็บ Astro + Labs ใน repo เดียว

## สิ่งที่ได้

- Personal branding site (Astro + Node adapter) พร้อม Contact / Guestbook API stubs
- Labs **00–08** (+ **05b Swarm ≤20 turns**) บน Windows
- สี่เสา: Multi-Agent · Sub-Agent · ประสานงาน · Swarm+เพดาน — ดู [`COURSE.md`](./COURSE.md)
- Template **ไม่มี** `node_modules` — ติดตั้งใน Lab 00
- Deploy: `https://<STUDENT_SLUG>.9expert.online` (Coolify)

## เริ่มที่นี่

1. [`SETUP.md`](./SETUP.md) — เครื่องมือเครื่องคุณ, `.env`, MCP, เปิด VS Code + Windows Terminal  
2. [`labs/lab-00-project-init`](./labs/lab-00-project-init/README.md) — `npm install`, `/init`, plugins แบบ project  
3. [`labs/README.md`](./labs/README.md) — ลำดับ Lab ถัดไป  
4. [`AGENTS.md`](./AGENTS.md) — กติกา ownership / native harness  

## คำสั่งเร็ว

```powershell
code .
copy .env.example .env
# แล้วทำ Lab 00 (npm install + project plugins)
node scripts/create-course-issues.mjs
npm test
npm run dev
```

## Ownership สั้นๆ

| งาน | เครื่องมือ |
|---|---|
| Project init / plugins / agents | Lab 00 |
| Interview / Debate / Frontend | Claude Code |
| Backend API + Vitest labs | OpenCode |
| Swarm ≤20 turns | Lab 05b |
| E2E | Playwright MCP |
| Ship | Coolify |

อย่า commit `.env` หรือ `node_modules`
