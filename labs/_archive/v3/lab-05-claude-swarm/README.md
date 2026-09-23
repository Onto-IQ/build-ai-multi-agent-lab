# Lab 05 — Claude swarm (Teams หรือ Subagents + worktrees)

**เวลาเป้าหมาย:** 100 นาที  
**เครื่องมือ:** Claude Agent Teams หรือ parallel subagents · Playwright MCP  
**Issue:** `[Lab 05] Spending summary card`

## ได้รับมาจาก Lab ก่อน

สิทธิ์ + course stubs

## ได้เพิ่มใน Lab นี้

หลาย agent ขนาน · QA แนบหลักฐาน UI ด้วย Playwright MCP

## ขั้นตอน

1. ลอง Agent Teams (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`) — ถ้าไม่ขึ้นใช้ Subagents + git worktrees
2. พรอมต์ [`prompts/01-swarm-summary.md`](prompts/01-swarm-summary.md)
3. อิมพลีเมนต์ `course/src/spendingSummary.ts` + อัปเดต fixture ถ้าต้องการ
4. QA ใช้ Playwright MCP ถ่าย `course/fixtures/spending-summary.html` แนบใน PR

## เกณฑ์ผ่าน Lab 05

- [ ] `npm run test:lab05` เขียว
- [ ] มีภาพหน้าจอใน PR
- [ ] มีหลักฐานว่ามีมากกว่าหนึ่ง agent/teammate (commit หรือโน้ต PR)

## Fallback

Teams ไม่ขึ้น → Subagents ตามเครื่องผู้เรียน — ยังผ่าน Lab ได้
