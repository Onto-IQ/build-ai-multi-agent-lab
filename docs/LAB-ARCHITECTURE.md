# Lab architecture — Agent Cost Board

## Modular layout

```text
apps/sample-dashboard/   # ชื่อแสดงผล: Agent Cost Board
  frontend/
  backend/
  qa/
labs/lab-XX-*/           # workbook บันไดความรู้
shared/                  # สัญญาตัวอย่าง, prompts, สคริปต์ด่าน, agent-starters
workspace/               # ผลงานผู้เรียน
SETUP.md / CLAUDE.md / AGENTS.md
```

## Ownership

| Path | Writer |
|---|---|
| `apps/sample-dashboard/frontend/**` | Frontend (Claude Code · agent `frontend`) |
| `apps/sample-dashboard/backend/**` | Backend (OpenCode · agent `backend`) |
| `apps/sample-dashboard/qa/**` | QA (OpenCode · agent `qa`) |
| `workspace/contracts/**` | ตาม `generated_by` |

## Agent identity ↔ Flux card ↔ JSON

บทบาทหนึ่งอยู่เครื่องมือเดียว (ไม่ bicopy agent ข้าม Claude/OpenCode) — ดูตารางใน [`AGENTS.md`](../AGENTS.md)

| ชั้น | ความหมาย |
|---|---|
| Agent file | ตัวตน + สิทธิ์สั้น ๆ ในเครื่องมือ |
| สัญญา JSON | แหล่งความจริงของ ownership / handoff / ด่าน / ship |
| Flux card | คิวมอบหมาย Lab 10 — ต้องระบุ role + tool + ชื่อ agent ให้ตรงแมป |

Starters: `shared/agent-starters/claude/` (`frontend`, `synthesizer`) และ `shared/agent-starters/opencode/` (`backend`, `qa`) — ผู้เรียนสร้างเป็น artifacts ใน Lab 05 ผ่าน CLI/TUI

## ด่านในห้อง

- `node shared/scripts/validate-json.mjs`
- `node shared/scripts/gate-quality.mjs`
- ปรับแก้ไม่เกิน 2 รอบ (`shared/scripts/gate-cost.md`)
- สิทธิ์ deny คำสั่งทำลายไฟล์สำคัญ

## ทางเลือกเมื่อเครื่องมือไม่พร้อม

| ชั้น | ทางเลือก |
|---|---|
| Claude Agent Teams | Subagents บน Claude (`frontend` + `code-reviewer`) + สัญญา |
| OpenCode plugin | ลำดับมือ `backend` → `qa` (อ่าน `handoff-fe` ก่อน) |
| Flux | บอร์ดสดที่ห้องอนุญาต + kanban-snapshot จาก API — ห้าม snapshot ปลอม |

## ลำดับงานบน Kanban

Interview → Plan → Build → Test → Ship
