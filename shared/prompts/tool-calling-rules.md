# กฎการเรียกเครื่องมือและสัญญา JSON

คอร์สนี้ใช้ **JSON contract** เป็นแกนส่งงานระหว่าง agent  
แผง **Agent Cost Board** อ่านข้อมูลจาก `apps/sample-dashboard/backend/` ที่ทีมผู้เรียนเขียนเอง

## ลำดับที่แนะนำ

```text
อ่านสัญญาขาเข้า (ถ้ามี)
  → ทำงานตามบทบาท / สิทธิ์เขียนไฟล์
  → เขียนสัญญาขาออกใน workspace/contracts/
  → ถ้ารอบงานเกี่ยวกับต้นทุน ให้เติม backend/runs.json
  → รัน node shared/scripts/validate-json.mjs เมื่อมีสัญญาใหม่
  → ก่อน Ship รัน node shared/scripts/gate-quality.mjs
```

## เครื่องมือในห้อง

| เครื่องมือ | ใช้เมื่อ |
|---|---|
| `node shared/scripts/validate-json.mjs` | ตรวจโครงสัญญา |
| `node shared/scripts/gate-quality.mjs` | ด่านคุณภาพก่อน Ship |
| `shared/scripts/gate-cost.md` | กฎปรับแก้ไม่เกิน 2 รอบ |
| Flux (Lab 10) | มอบหมายงานบนบอร์ดโปรเจกต์ |

## Named agents (ไม่ทับซ้อน)

| บทบาท | เครื่องมือ | Agent |
|---|---|---|
| Frontend | Claude Code | `frontend` |
| Backend | OpenCode | `backend` |
| QA | OpenCode | `qa` |
| Synthesizer | Claude Code | `synthesizer` |

ส่งงานข้ามเครื่องมือด้วย `handoff-*.json` — ห้าม bicopy agent ชื่อเดียวกันทั้งสองฝั่ง  
Lab 10: เรียก named agent ตามการ์ดก่อนเลื่อนคอลัมน์

Lab เสริม MCP vs CLI อยู่ที่ `labs/lab-optional-mcp-vs-cli/` — ไม่ใช่เกณฑ์ผ่านหลัก

## เมื่อเครื่องมือขาด (เช่น ไม่มี Node)

| สถานการณ์ | ทำ |
|---|---|
| ต้องรัน `validate-json` / `gate-quality` / `npx serve` แต่ไม่มี `node` | จด `NODE_MISSING` · เสนอคำสั่งจาก `SETUP.md` · **ถามคน** ก่อนติดตั้ง |
| คนยังไม่ติดตั้ง | ห้ามเคลมด่าน PASS / ห้ามข้าม gate |

ห้ามติดตั้ง Node (หรือแพ็กเกจระบบอื่น) เงียบ ๆ

| บทบาท | เขียนได้ |
|---|---|
| Frontend | `apps/sample-dashboard/frontend/` |
| Backend | `apps/sample-dashboard/backend/` |
| QA / Reviewer | `apps/sample-dashboard/qa/` + `workspace/contracts/` (รายงาน) |
| ผู้เรียนทุกคน | `workspace/` สำหรับผล Lab |

ห้ามยืนยันว่า deploy สำเร็จถ้ายังไม่มี URL จริงใน `capstone-ship` / learning-log
