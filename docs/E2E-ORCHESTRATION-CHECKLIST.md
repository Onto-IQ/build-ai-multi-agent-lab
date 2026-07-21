# E2E Orchestration Checklist — Flux + JSON + Claude/OpenCode

สำหรับวิทยากร / ผู้ตรวจ — ติ๊กตาม **ผลลัพธ์รูปธรรม / DoD** ทีละ Lab  
**Walkthrough ขับ CLI/TUI:** [`WALKTHROUGH-E2E.md`](WALKTHROUGH-E2E.md) (ผู้รันห้ามทำงาน Lab เอง — ส่ง prompt ให้ claude/opencode เท่านั้น)  
ผู้เรียนเก็บหลักฐานของตัวเองใต้ `workspace/e2e-reports/` (โฟลเดอร์นี้ถูก gitignore)

สภาพแวดล้อมก่อนรัน:

- [ ] `node`, `git`, `claude`, `opencode` พร้อม (ทุก OS)
- [ ] `.env` มีคีย์ที่ต้องใช้; Lab 10 ต้องมี `FLUX_*`
- [ ] MCP Claude + OpenCode ตาม `labs/lab-10-kanban-collab/FLUX-SETUP.md`
- [ ] อย่า commit `.env` / `.mcp.json` ที่มีคีย์
- [ ] Named agents ไม่ทับซ้อน: Claude=`frontend`+`synthesizer`(+`code-reviewer`); OpenCode=`backend`+`qa`(+`specialist` Lab 02 เท่านั้น)
- [ ] Driver = CLI/TUI only ตาม WALKTHROUGH (ไม่ Copy-Item agents / ไม่แก้แอปด้วยมือเพื่อผ่าน)

---

## SETUP

| ตรวจ | คำสั่ง / หลักฐาน | ผ่าน? |
|---|---|---|
| เวอร์ชันครบ | `node --version`; `git --version`; `claude --version`; `opencode --version` | [ ] |
| `.env` | มีไฟล์ `.env` จาก example | [ ] |
| Localhost แผง | `npx --yes serve apps/sample-dashboard -p 4173` → เปิด `/frontend/` | [ ] |

## Lab 01 — Code Reviewer (Claude)

| ตรวจ | คำสั่ง / หลักฐาน | ผ่าน? |
|---|---|---|
| สัญญา | `node shared/scripts/validate-json.mjs workspace/contracts/code-review.json` | [ ] |
| Deny edit | TUI/CLI ปฏิเสธแก้ frontend | [ ] |
| learning-log | ≥ 1 ย่อหน้า Lab 01 | [ ] |

## Lab 02 — OpenCode

| ตรวจ | คำสั่ง / หลักฐาน | ผ่าน? |
|---|---|---|
| สรุป UI | OpenCode TUI หรือ stdin `opencode run --agent specialist` | [ ] |
| ตารางเทียบ | learning-log Lab 02 ≥ 4 แถว | [ ] |
| ขอบเขต specialist | จดว่า `specialist` ไม่ใช่ทางหลัก Lab 07/10 | [ ] |

## Lab 03 — Permission

| ตรวจ | คำสั่ง / หลักฐาน | ผ่าน? |
|---|---|---|
| Deny ×2 | บันทึกผล `git push` + ลบ `shared/` | [ ] |
| shared ยังอยู่ | โฟลเดอร์ `shared/` ยังมีอยู่ | [ ] |
| best practices | 3 ข้อใน learning-log | [ ] |

## Lab 04 — Memory

| ตรวจ | คำสั่ง / หลักฐาน | ผ่าน? |
|---|---|---|
| MEMORY.md | ≥ 5 preferences ที่ root (ไฟล์นี้ gitignore) | [ ] |
| Recall | session ใหม่โดยไม่ใช้ `-c` | [ ] |
| learning-log | before/after | [ ] |

## Lab 05 — Role cards + named agents (ไม่ทับซ้อน)

| ตรวจ | คำสั่ง / หลักฐาน | ผ่าน? |
|---|---|---|
| สร้าง agent artifacts | Lab 05 CLI/TUI จาก starters → `.claude/agents/{frontend,synthesizer}.md` + `.opencode/agents/{backend,qa}.md` | [ ] |
| ไม่ทับซ้อน | **ไม่มี** `.opencode/agents/frontend.md` / `.claude/agents/backend.md` / `.claude/agents/qa.md` | [ ] |
| OpenCode list | `opencode agent list` เห็น `backend` + `qa` | [ ] |
| role-cards | `validate-json.mjs workspace/contracts/role-cards.json` — tool/agent ตรงแมป | [ ] |
| foreshadow Flux | ตาราง: บทบาท \| โฟลเดอร์ \| agent \| tool \| ชื่อการ์ด | [ ] |

## Lab 06 — Claude handoff → Lab 07

| ตรวจ | คำสั่ง / หลักฐาน | ผ่าน? |
|---|---|---|
| Named ≥2 | ใช้ `frontend` + `code-reviewer` (Teams หรือ Subagents) | [ ] |
| งาน FE / handoff | หลักฐาน ownership FE + `validate-json.mjs handoff-fe.json` | [ ] |
| ส่งต่อ OpenCode | learning-log ระบุ Lab 07 · `--agent backend` | [ ] |
| ไม่ bicopy | ไม่สร้าง backend/qa บน Claude | [ ] |

## Lab 07 — OpenCode sequential (backend → qa)

| ตรวจ | คำสั่ง / หลักฐาน | ผ่าน? |
|---|---|---|
| อ่าน handoff-fe ก่อน | มีไฟล์ก่อนเริ่ม Backend | [ ] |
| BE→QA named | `--agent backend` แล้ว `--agent qa` (ไม่ใช้ `specialist` เป็นทางหลัก) | [ ] |
| runs + handoff-be | รอบใหม่; `validate-json.mjs handoff-be.json` | [ ] |
| QA checklist | โน้ตใน learning-log | [ ] |

## Lab 08 — Gate (`--agent qa`)

| ตรวจ | คำสั่ง / หลักฐาน | ผ่าน? |
|---|---|---|
| FAIL แล้ว PASS | Terminal FAILED → PASSED | [ ] |
| gate exit 0 | `node shared/scripts/gate-quality.mjs` | [ ] |
| audit PASS | `validate-json.mjs audit-result.json` | [ ] |
| OpenCode qa | ใช้ `--agent qa` เป็นทางหลัก | [ ] |

## Lab 09 — Synthesize (Claude `--agent synthesizer`)

| ตรวจ | คำสั่ง / หลักฐาน | ผ่าน? |
|---|---|---|
| named synthesizer | Claude `--agent synthesizer` | [ ] |
| เปิดแผง localhost | `http://localhost:4173/frontend/` เห็นสถานะ + ตารางรอบ | [ ] |
| synthesize-report | `validate-json.mjs synthesize-report.json` | [ ] |

## Lab 10 — Flux go-live loop

| ตรวจ | คำสั่ง / หลักฐาน | ผ่าน? |
|---|---|---|
| Preflight agents | ไฟล์ agent ตามแมป + list โหลดได้ | [ ] |
| บอร์ดสด + URL | เปิด `FLUX_WORKSPACE_URL` | [ ] |
| Active = 3 | แต่ละใบมี Assignee + Tool + **Agent** ตรงแมป | [ ] |
| FE: Claude frontend | เรียก agent ก่อนเลื่อน + หลักฐาน diff/JSON | [ ] |
| BE: OpenCode backend | เรียก agent ก่อนเลื่อน + หลักฐาน runs/handoff-be | [ ] |
| QA: OpenCode qa | gate จริงก่อนเลื่อน + audit สอดคล้อง | [ ] |
| คอลัมน์เปลี่ยนจากงานจริง | FE/BE เลื่อน ≥1 ขั้นหลังงาน; ไม่เลื่อนเล่น | [ ] |
| snapshot จากบอร์ด | `validate-json.mjs kanban-snapshot.json` (`source_mode: api`) | [ ] |

ไม่ผ่านถ้า: สร้างการ์ดเพื่องานนับ / เลื่อนโดยไม่ทำงาน / ใช้ `specialist` ปิด 3 การ์ด / snapshot จำลอง / ไม่มีบอร์ดสด

## Lab 11 — Ship

| ตรวจ | คำสั่ง / หลักฐาน | ผ่าน? |
|---|---|---|
| Pre-flight Lab 10 | snapshot + URL บอร์ด + การ์ดเลื่อนจากงานจริงแล้ว | [ ] |
| public URL จริง | แผงโหลดได้ (deploy ทั้ง `apps/sample-dashboard`) | [ ] |
| capstone-ship | `validate-json.mjs capstone-ship.json` | [ ] |

ถ้ายังไม่มี URL → BLOCKED — ห้ามใส่ URL ปลอม

---

## Runtime ข้ามแพลตฟอร์ม

- บังคับ: **Node + git** (ไม่ใช้ Python venv ใน lab นี้)
- Localhost: `npx --yes serve apps/sample-dashboard -p 4173`
- Validator/ด่าน: `node shared/scripts/*.mjs`
- Starters: `shared/agent-starters/claude/` และ `shared/agent-starters/opencode/`
