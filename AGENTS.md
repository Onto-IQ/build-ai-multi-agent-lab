# Agents — Agent Cost Board

ใช้ร่วมกับ Claude Code / OpenCode / เครื่องมือที่อ่าน `AGENTS.md`

## Agent identity ↔ tool ↔ Flux ↔ JSON (ไม่ทับซ้อน)

บทบาทหนึ่งอยู่**เครื่องมือเดียว** — ประสานงานผ่านสัญญา JSON + Flux ไม่สร้าง agent ชื่อเดียวกันทั้งสองฝั่ง

| บทบาท | เครื่องมือ | Agent file | การ์ด Flux (Lab 10) | สัญญาที่เกี่ยวข้อง |
|---|---|---|---|---|
| `code-reviewer` | Claude Code | `.claude/agents/code-reviewer.md` | — (Lab 01/06) | `code-review.json` |
| `frontend` | Claude Code | `.claude/agents/frontend.md` | Frontend · tool=Claude Code | `role-cards`, `handoff-fe` |
| `synthesizer` | Claude Code | `.claude/agents/synthesizer.md` | ไม่เป็นใบ WIP ที่ 4 | `synthesize-report` |
| `specialist` | OpenCode | `.opencode/agents/specialist.md` | — (Lab 02 เท่านั้น) | learning-log เทียบเครื่องมือ |
| `backend` | OpenCode | `.opencode/agents/backend.md` | Backend · tool=OpenCode | `handoff-be`, `runs.json` |
| `qa` | OpenCode | `.opencode/agents/qa.md` | QA · tool=OpenCode | `audit-result` + gate |

**ห้ามมี:** `.opencode/agents/frontend.md`, `.claude/agents/backend.md`, `.claude/agents/qa.md`, `.opencode/agents/synthesizer.md`

Starters (เทมเพลตใน repo): `shared/agent-starters/`  
Artifacts (ผู้เรียนสร้างใน Lab 05 ผ่าน CLI/TUI): `.claude/agents/{frontend,synthesizer}.md`, `.opencode/agents/{backend,qa}.md`

## บทบาทมาตรฐาน

### code-reviewer

- หน้าที่: รีวิวโค้ด หาจุดเสี่ยง เขียนรายงาน
- เครื่องมือ: **Claude Code เท่านั้น**
- เขียนได้: `workspace/contracts/code-review.json`
- ห้าม: แก้ไฟล์ใน `apps/sample-dashboard/`

### frontend

- หน้าที่: UI ของ Agent Cost Board
- เครื่องมือ: **Claude Code เท่านั้น**
- เขียนได้: `apps/sample-dashboard/frontend/`
- อ่านได้: `backend/`, สัญญาใน `shared/` และ `workspace/`

### backend

- หน้าที่: `status.json`, `runs.json` และข้อมูลสถานะ
- เครื่องมือ: **OpenCode เท่านั้น**
- เขียนได้: `apps/sample-dashboard/backend/`
- ห้าม: แก้ UI ใน `frontend/`

### qa

- หน้าที่: ตรวจเช็กลิสต์ + ด่านคุณภาพ/ต้นทุน
- เครื่องมือ: **OpenCode เท่านั้น**
- เขียนได้: `apps/sample-dashboard/qa/`, `workspace/contracts/audit-result.json` และรายงานที่เกี่ยวข้อง
- อ่าน: ทั้งแอป
- ห้าม: แก้โค้ดแอปเพื่อบังคับให้ผ่านโดยไม่ผ่านด่าน

### synthesizer

- หน้าที่: รวมผลให้เปิดแผงได้ และเขียน `synthesize-report.json`
- เครื่องมือ: **Claude Code เท่านั้น**
- เขียนได้: เฉพาะที่จำเป็นเพื่อเชื่อม FE/BE โดยไม่แย่ง ownership หลัก + `workspace/contracts/`
- ไม่สร้างใบ WIP ที่ 4 บน Flux

## Runtime / Node (นโยบาย)

ด่านและ validator ใช้ **Node** (`node shared/scripts/*.mjs`, `npx serve`)

เมื่อ `node` ไม่พร้อม:

1. Agent ที่ต้องการด่าน (มักเป็น **qa**) ตรวจแล้วจด `NODE_MISSING` ใน learning-log / รายงาน  
2. **เสนอ**คำสั่งติดตั้งตาม [`SETUP.md`](SETUP.md) (เช่น winget / ลิงก์ Node LTS)  
3. **ถามคนก่อน** — ห้ามติดตั้งเงียบ / ห้ามรัน installer โดยไม่ได้รับอนุญาต  
4. หลังคนติดตั้งแล้ว ค่อยรัน validator/gate ซ้ำ  

ห้ามข้ามด่านเพราะไม่มี Node แล้วเคลม PASS

- ส่งงานต่อด้วย `handoff-fe.json` / `handoff-be.json` (**สัญญา JSON = แหล่งความจริง**)
- Lab 06 (Claude `frontend` + `code-reviewer`) เขียน `handoff-fe.json` → Lab 07 (OpenCode `backend` → `qa`) อ่านแล้วทำต่อ
- มอบหมายงานบน Flux (Lab 10) — การ์ดต้องตรงแมป agent+tool ด้านบน (**Kanban = คิว/มอบหมาย ไม่แทน handoff**)
- **Go-live:** การ์ด active หลัก 3 ใบ (FE/BE/QA) มี Assignee + Tool + ชื่อ agent ชัด; เลื่อนหลังทำงานจริงด้วย named agent บนเครื่องมือที่ถูกเท่านั้น — ห้าม POC

### JSON vs Kanban

| ชั้น | ใช้เมื่อ | ตัวอย่าง |
|---|---|---|
| สัญญา JSON | ตกลง ownership, ส่งงานต่อ, ผ่านด่าน, ship | `role-cards`, `handoff-fe/be`, `audit-result`, `synthesize-report`, `capstone-ship` |
| Flux Kanban | ใครทำ / ขั้นไหน / มองเห็นคิวบน Interview→Ship | การ์ด Frontend / Backend / QA บนบอร์ด Agent Cost Board |
