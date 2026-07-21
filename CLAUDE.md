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

## JSON vs Kanban (Flux)

| เมื่อไหร่ | ใช้อะไร |
|---|---|
| ตกลง ownership / ส่งงานต่อ / ผ่านด่าน / ship | **สัญญา JSON** ใน `workspace/contracts/` |
| มอบหมายใครทำ / ขั้นไหน / มองเห็นคิว | **Flux Kanban** (บังคับ Lab 10) |

ห้าม: ใช้การ์ด Flux แทน `handoff-*.json`; ผ่าน Lab 10 ด้วย snapshot โดยไม่มีบอร์ดสด  
ลำดับที่ต้องการใน Lab 10: แตกการ์ด → Claude/OpenCode ตาม ownership → เขียน/อัปเดต JSON → เลื่อนการ์ดตามสถานะจริง → ด่านผ่านแล้วค่อย Ship (Lab 11)

## กฎสำคัญ

1. มอนิเตอร์ทีม agent **ของตัวเอง** — บันทึกรอบลง `backend/runs.json` ไม่ดึงเทเลเมทรีคลาวด์จริง
2. Flux (Lab 10) เป็นบอร์ดงานของโปรเจกต์นี้ ไม่แทนที่สัญญา JSON
3. ห้ามยืนยันว่า deploy สำเร็จถ้ายังไม่มี URL จริง
4. เริ่มที่ `SETUP.md` แล้วทำ Lab ตามลำดับบันไดความรู้
5. **มาตรฐาน go-live ไม่ใช่ POC:** ผู้เรียนต้องนำสูตรกลับไปใช้ปิดงานจริงได้ — ห้ามผ่าน Lab ด้วยการสาธิต MCP / สร้างการ์ดเท็จ / เลื่อนการ์ดโดยไม่ทำงานตาม ownership
6. **Runtime:** Node + git บน Windows/macOS/Linux — ไม่ใช้ Python venv ใน lab นี้; ดูแผงด้วย localhost (`npx serve apps/sample-dashboard`)

## Go-live (บังคับทั้งคอร์ส)

| ผ่าน | ไม่ผ่าน |
|---|---|
| งานบนการ์ดทำจริง → อัปเดต JSON → เลื่อนคอลัมน์ตามสถานะ | สร้างการ์ดเพื่องานนับ / snapshot ปลอม / บอร์ดรกแล้วจบ Lab |
| มอบหมายชัด: บทบาท + เครื่องมือบนการ์ด | ไม่รู้ว่าใครรับใบไหน |
| Lab 11 มี `public_url` จริงขึ้นต้น `http` | URL ตัวอย่าง / ยังไม่ deploy แต่เคลม Ship |

## พรอมต์ร่วม

`shared/prompts/tool-calling-rules.md`
