---
name: public-site-safe
description: Guardrails for personal branding site — secrets, deploy claims, guestbook safety, ownership, swarm 20-turn ceiling.
---

# public-site-safe

(สำเนาสำหรับ OpenCode project skills — เนื้อหาเดียวกับ `.claude/skills/public-site-safe`)

## Call ข้าม harness

- Headless one-shot (`claude -p` / `opencode run`) ผ่านไฟล์ใน `docs/` ได้ — ฝั่งที่ถูกเรียกเขียนได้**เฉพาะไฟล์รายงาน**ที่ prompt ระบุ · ห้าม daemon/loop

## ห้าม

- Secret / PAT / webhook ในแชทหรือ commit
- **ข้อความถึง Lab / คอร์ส ใน markup ที่ render ออกหน้าเว็บ** (`src/pages` ฯลฯ) — ผู้ชมต้องไม่เห็น · อ้าง Lab ได้เฉพาะคอมเมนต์โค้ด/PR/docs (`npm test` มี check จับ)
- เคลม deploy โดยไม่มี HTTP 200 จริง
- Leak stack/SQL · MCP เป็นท่อ Claude↔OpenCode · orchestration bus

## Swarm

หยุดเมื่อ done **หรือ** ครบ **20 turns** แล้วสรุปช่องว่าง

## Ownership

UI = Claude frontend · API/SQLite = OpenCode backend
