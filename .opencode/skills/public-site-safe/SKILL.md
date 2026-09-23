---
name: public-site-safe
description: Guardrails for personal branding site — secrets, deploy claims, guestbook safety, ownership, swarm 20-turn ceiling.
---

# public-site-safe

(สำเนาสำหรับ OpenCode project skills — เนื้อหาเดียวกับ `.claude/skills/public-site-safe`)

## ห้าม

- Secret / PAT / webhook ในแชทหรือ commit
- เคลม deploy โดยไม่มี HTTP 200 จริง
- Leak stack/SQL · MCP เป็นท่อ Claude↔OpenCode · orchestration bus

## Swarm

หยุดเมื่อ done **หรือ** ครบ **20 turns** แล้วสรุปช่องว่าง

## Ownership

UI = Claude frontend · API/SQLite = OpenCode backend
