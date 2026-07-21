# Agent Cost Board

แผงควบคุมต้นทุนและสถานะ**ทีม agent ของผู้เรียนเอง** (ที่สร้างใน Lab)  
โฟลเดอร์ทางเทคนิค: `apps/sample-dashboard/`

```text
apps/sample-dashboard/
  frontend/     # UI — Claude agent frontend เท่านั้น
  backend/      # status.json + runs.json — OpenCode agent backend เท่านั้น
  qa/           # เช็กลิสต์ — OpenCode agent qa
  README.md
```

## โจทย์ multi-agent (หลายรอบก่อนปล่อยผ่าน)

Checkout เริ่มด้วย**สถานะขัดแย้งโดยเจตนา**:

- `status.status` = `degraded`, `qa_ready` = `false`
- ผลรวมโทเคนใน `runs.json` **เกิน** `budget_tokens_limit`
- มีรอบที่ `gate_status` เป็น `pending` / `fail`

เป้าหมายการสอน: Frontend / Backend / QA **เห็นปัญหาคนละมุม** → ส่งงานด้วย `handoff-*.json` → แก้ทีละรอบ → `gate-quality` ผ่านเมื่อสอดคล้องกันเท่านั้น

| รอบ | ใคร | คาดหวัง |
|---|---|---|
| 1 | Claude `frontend` | แสดงแถบขัดแย้งบน UI; เขียน `handoff-fe` ชี้ของที่ BE ต้องแก้ |
| 2 | OpenCode `backend` | ปรับงบ/รอบ/`qa_ready`; อาจยังไม่ผ่านด่านครบ |
| 3 | OpenCode `qa` | รัน gate → FAIL ได้; ห้ามแก้แอปเพื่อบังคับผ่าน |
| ≤2 refinement | FE/BE ตาม ownership | แก้จน gate PASS — รอบ 3 ถามคน |

## ลำดับงาน (คอลัมน์ Flux)

Interview → Plan → Build → Test → Ship

## ข้อมูลที่แผงแสดง

- สถานะ Backend จาก `backend/status.json` (`status`, `message`, `budget_tokens_limit`, `qa_ready`)
- ยอดโทเคน / เพดาน / แถบขัดแย้ง / ตารางรอบจาก `backend/runs.json`

ไม่ดึงเทเลเมทรีจากคลาวด์จริง — ผู้เรียน/agent บันทึกรอบเองหลังแต่ละ Lab

## ดูบน localhost (ทุก OS)

`frontend` ดึง `../backend/*.json` — **ห้าม**เปิด `index.html` แบบ `file://`

จาก root ของ repo:

```bash
npx --yes serve apps/sample-dashboard -p 4173
```

เปิด [http://localhost:4173/frontend/](http://localhost:4173/frontend/)

ต้องมี **Node** — ถ้าไม่มี: agent เสนอคำสั่งติดตั้งแล้วถามคน (ดู `AGENTS.md`) ห้ามติดตั้งเงียบ

## Deploy (Capstone / go-live)

1. Deploy **ทั้ง** `apps/sample-dashboard/` (ต้องมี `frontend/` + `backend/`)  
2. ตรวจว่าแผงโหลดสถานะ + ตารางรอบจาก JSON จริง และไม่มีแถบขัดแย้งค้าง  
3. ใส่ URL ใน `workspace/contracts/capstone-ship.json` และ `workspace/learning-log.md`
