# Build AI Multi-Agent Lab (V4)

Template สำหรับคอร์ส **Build AI Multi-Agent with Claude Code**  
กด **Use this template** (อย่า Fork) → ได้ทั้งเว็บ Astro + Labs ใน repo เดียว

## สิ่งที่ได้

- Personal branding site (Astro + Node adapter) พร้อม Contact / Guestbook API stubs
- Labs 01–08 ละเอียดทำตามได้บน Windows
- Deploy ปลายทาง: `https://<STUDENT_SLUG>.9expert.online` (Coolify)

## เริ่มที่นี่

1. [`SETUP.md`](./SETUP.md) — ติดตั้งเครื่องมือ, `.env`, MCP, plugins
2. [`labs/README.md`](./labs/README.md) — ลำดับ Lab
3. [`AGENTS.md`](./AGENTS.md) — กติกา ownership / native harness

## คำสั่งเร็ว

```powershell
npm install
copy .env.example .env
node scripts/create-course-issues.mjs
npm test
npm run dev
```

## Ownership สั้นๆ

| งาน | เครื่องมือ |
|---|---|
| Interview / Debate / Frontend | Claude Code |
| Backend API + Vitest labs | OpenCode |
| E2E | Playwright MCP |
| Ship | Coolify |

อย่า commit `.env`
