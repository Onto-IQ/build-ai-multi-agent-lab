# Lab architecture — Agent Cost Board

## Modular layout

```text
apps/sample-dashboard/   # ชื่อแสดงผล: Agent Cost Board
  frontend/
  backend/
  qa/
labs/lab-XX-*/           # workbook บันไดความรู้
shared/                  # สัญญาตัวอย่าง, prompts, สคริปต์ด่าน
workspace/               # ผลงานผู้เรียน
SETUP.md / CLAUDE.md / AGENTS.md
```

## Ownership

| Path | Writer |
|---|---|
| `apps/sample-dashboard/frontend/**` | Frontend |
| `apps/sample-dashboard/backend/**` | Backend |
| `apps/sample-dashboard/qa/**` | QA / Reviewer |
| `workspace/contracts/**` | ตาม `generated_by` |

## ด่านในห้อง

- `node shared/scripts/validate-json.mjs`
- `node shared/scripts/gate-quality.mjs`
- ปรับแก้ไม่เกิน 2 รอบ (`shared/scripts/gate-cost.md`)
- สิทธิ์ deny คำสั่งทำลายไฟล์สำคัญ

## ทางเลือกเมื่อเครื่องมือไม่พร้อม

| ชั้น | ทางเลือก |
|---|---|
| Claude Agent Teams | Subagents + สัญญา |
| OpenCode plugin | ลำดับมือ Frontend→Backend→QA |
| Flux | บอร์ดที่ห้องอนุญาต + kanban-snapshot |

## ลำดับงานบน Kanban

Interview → Plan → Build → Test → Ship
