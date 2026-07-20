# Agent Cost Board Lab

โปรเจกต์นี้คือ lab ของหลักสูตร **Build AI Multi-Agent with Claude Code**  
ชื่อที่แสดงผลของแอป: **Agent Cost Board** (โฟลเดอร์ `apps/sample-dashboard/`)

## ลำดับงาน

Interview → Plan → Build → Test → Ship

## สิทธิ์เขียนไฟล์

| บทบาท | เขียนได้ | ห้ามเขียน |
|---|---|---|
| Frontend | `apps/sample-dashboard/frontend/` | `backend/`, `qa/` (ยกเว้นอ่าน) |
| Backend | `apps/sample-dashboard/backend/` | `frontend/` |
| QA / Reviewer | `apps/sample-dashboard/qa/`, `workspace/contracts/` (รายงาน) | โค้ด frontend/backend เพื่อข้ามด่าน |
| ผู้เรียน | `workspace/` ทั้งก้อนสำหรับผล Lab | อย่า commit `.env` |

รายละเอียดบทบาท: ดู `AGENTS.md`

## สัญญา JSON

- ตัวอย่าง: `shared/contracts/*.example.json`
- ผลงาน: `workspace/contracts/`
- ตรวจ: `node shared/scripts/validate-json.mjs`
- ด่านคุณภาพ: `node shared/scripts/gate-quality.mjs`
- ด่านต้นทุน: `shared/scripts/gate-cost.md` (ปรับแก้ไม่เกิน 2 รอบ)

## กฎสำคัญ

1. มอนิเตอร์ทีม agent **ของตัวเอง** — บันทึกรอบลง `backend/runs.json` ไม่ดึงเทเลเมทรีคลาวด์จริง
2. Flux (Lab 10) เป็นบอร์ดงานของโปรเจกต์นี้ ไม่แทนที่สัญญา JSON
3. ห้ามยืนยันว่า deploy สำเร็จถ้ายังไม่มี URL จริง
4. เริ่มที่ `SETUP.md` แล้วทำ Lab ตามลำดับบันไดความรู้

## พรอมต์ร่วม

`shared/prompts/tool-calling-rules.md`
