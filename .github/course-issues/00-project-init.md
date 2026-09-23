---
title: "Lab 00: Project init + project-scope plugins"
labels: [lab, documentation]
---

## Goal

เตรียมโปรเจกต์หลัง clone Template: `npm install`, Claude/OpenCode `/init`, plugin แบบ **project scope**, เปิด VS Code ดูไฟล์เปลี่ยน

## Acceptance

- [ ] มี `node_modules` จาก `npm install` และไม่ถูก track ใน git
- [ ] มี `.claude/settings.json` จาก project-scope plugins (superpowers)
- [ ] มี agents (`frontend` / `backend`) + skill `public-site-safe`
- [ ] Claude: `memory: project` + จำข้ามเซสชันหรือมี `.claude/agent-memory/` · รู้จัก `/memory`
- [ ] OpenCode: resume session ได้ · เซสชันใหม่โหลด `AGENTS.md` (ไม่ติด memory plugin แข่ง)
- [ ] มี `opencode.json` (copy จาก example และ/หรือ `opencode plugin add`)
- [ ] `/init` Claude + OpenCode แล้ว กฎ Ownership / สี่เสาใน seed ยังอยู่
- [ ] Commit Lab 00 โดยไม่มี `.env` / `node_modules`

## Docs

ดู `labs/lab-00-project-init/README.md`
