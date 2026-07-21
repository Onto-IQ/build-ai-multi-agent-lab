# E2E Orchestration Checklist — Flux + JSON + Claude/OpenCode

สำหรับวิทยากร / ผู้ตรวจ — ติ๊กตาม **ผลลัพธ์รูปธรรม / DoD** ทีละ Lab  
ผู้เรียนเก็บหลักฐานของตัวเองใต้ `workspace/e2e-reports/` (โฟลเดอร์นี้ถูก gitignore)

สภาพแวดล้อมก่อนรัน:

- [ ] `node`, `git`, `claude`, `opencode` พร้อม (ทุก OS)
- [ ] `.env` มีคีย์ที่ต้องใช้; Lab 10 ต้องมี `FLUX_*`
- [ ] MCP Claude + OpenCode ตาม `labs/lab-10-kanban-collab/FLUX-SETUP.md`
- [ ] อย่า commit `.env` / `.mcp.json` ที่มีคีย์

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
| สรุป UI | OpenCode TUI หรือ stdin `opencode run` | [ ] |
| ตารางเทียบ | learning-log Lab 02 ≥ 4 แถว | [ ] |

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

## Lab 05 — Role cards

| ตรวจ | คำสั่ง / หลักฐาน | ผ่าน? |
|---|---|---|
| role-cards | `validate-json.mjs workspace/contracts/role-cards.json` | [ ] |
| foreshadow Flux | ตารางใน learning-log | [ ] |

## Lab 06 — Claude handoff → Lab 07

| ตรวจ | คำสั่ง / หลักฐาน | ผ่าน? |
|---|---|---|
| Teams หรือ Subagents | stdout / learning-log | [ ] |
| handoff-fe | `validate-json.mjs workspace/contracts/handoff-fe.json` | [ ] |
| ส่งต่อ OpenCode | learning-log ระบุ Lab 07 | [ ] |

## Lab 07 — OpenCode sequential

| ตรวจ | คำสั่ง / หลักฐาน | ผ่าน? |
|---|---|---|
| อ่าน handoff-fe ก่อน | มีไฟล์ก่อนเริ่ม FE | [ ] |
| FE→BE→QA | สามรอบตามลำดับ | [ ] |
| runs + handoff-be | รอบใหม่; `validate-json.mjs handoff-be.json` | [ ] |
| QA checklist | โน้ตใน learning-log | [ ] |

## Lab 08 — Gate

| ตรวจ | คำสั่ง / หลักฐาน | ผ่าน? |
|---|---|---|
| FAIL แล้ว PASS | Terminal FAILED → PASSED | [ ] |
| gate exit 0 | `node shared/scripts/gate-quality.mjs` | [ ] |
| audit PASS | `validate-json.mjs audit-result.json` | [ ] |

## Lab 09 — Synthesize

| ตรวจ | คำสั่ง / หลักฐาน | ผ่าน? |
|---|---|---|
| เปิดแผง localhost | `http://localhost:4173/frontend/` เห็นสถานะ + ตารางรอบ | [ ] |
| synthesize-report | `validate-json.mjs synthesize-report.json` | [ ] |

## Lab 10 — Flux go-live loop

| ตรวจ | คำสั่ง / หลักฐาน | ผ่าน? |
|---|---|---|
| บอร์ดสด + URL | เปิด `FLUX_WORKSPACE_URL` | [ ] |
| Active = 3 (FE/BE/QA) | มอบหมาย Assignee+Tool ชัด | [ ] |
| ทำงานแล้วค่อยเลื่อน | หลักฐาน diff/JSON/gate ก่อน move | [ ] |
| snapshot จากบอร์ด | `validate-json.mjs kanban-snapshot.json` | [ ] |

ไม่ผ่านถ้า: สร้างการ์ดเพื่องานนับ / เลื่อนโดยไม่ทำงาน / snapshot จำลอง

## Lab 11 — Ship

| ตรวจ | คำสั่ง / หลักฐาน | ผ่าน? |
|---|---|---|
| Pre-flight Lab 10 | snapshot + URL บอร์ด | [ ] |
| public URL จริง | แผงโหลดได้ (deploy ทั้ง `apps/sample-dashboard`) | [ ] |
| capstone-ship | `validate-json.mjs capstone-ship.json` | [ ] |

ถ้ายังไม่มี URL → BLOCKED — ห้ามใส่ URL ปลอม

---

## Runtime ข้ามแพลตฟอร์ม

- บังคับ: **Node + git** (ไม่ใช้ Python venv ใน lab นี้)
- Localhost: `npx --yes serve apps/sample-dashboard -p 4173`
- Validator/ด่าน: `node shared/scripts/*.mjs`
