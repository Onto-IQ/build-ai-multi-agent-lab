# Course: Personal Branding Site (V4)

Template สำหรับคอร์ส **Build AI Multi-Agent with Claude Code**  
โจทย์: เว็บประชาสัมพันธ์ตัวตน + เรื่องที่สนใจ ที่ทำงานได้จริง (Contact / Guestbook API)  
Deploy: `https://<STUDENT_SLUG>.9expert.online` ผ่าน Coolify

## Ownership

| Area | Owner tool |
|---|---|
| Interview / Debate / Frontend pages | Claude Code (+ superpowers) |
| API / SQLite / Vitest | OpenCode (+ oh-my-openagent optional) |
| E2E / a11y | Playwright MCP + either CLI |
| Cross-model review | `opencode run` แล้ว `claude -p` (ไม่ใช้ MCP เป็นท่อส่งงาน) |
| Ship | Coolify → slug.9expert.online |

## Workflow

Interview → Plan → Build → Test → Ship  
หยุดเมื่อ issue acceptance ผ่าน — ไม่ใช่เมื่อครบโควต้ารอบ

## Native harness only

- ใช้ Skills จาก community (superpowers) และ native agents
- Cross-CLI เฉพาะรีวิวอิสระ (Lab 07)
- ห้ามสร้าง JSON contracts / Flux / room dispatch เป็น orchestration
- อย่า commit `.env` หรือความลับ
- PR เปิดเข้า learner repo เท่านั้น

## Commands

```bash
npm install
cp .env.example .env
npm run dev
npm test          # smoke (เขียว)
npm run test:labs # Lab 05 (แดงจนกว่าจะ implement)
npm run build && npm start
node scripts/create-course-issues.mjs
```

## Docs for agents

Full Astro docs: https://docs.astro.build
