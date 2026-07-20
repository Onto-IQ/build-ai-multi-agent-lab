# Agents — Agent Cost Board

ใช้ร่วมกับ Claude Code / OpenCode / เครื่องมือที่อ่าน `AGENTS.md`

## บทบาทมาตรฐาน

### code-reviewer

- หน้าที่: รีวิวโค้ด หาจุดเสี่ยง เขียนรายงาน
- เขียนได้: `workspace/contracts/code-review.json`
- ห้าม: แก้ไฟล์ใน `apps/sample-dashboard/`

### frontend

- หน้าที่: UI ของ Agent Cost Board
- เขียนได้: `apps/sample-dashboard/frontend/`
- อ่านได้: `backend/`, สัญญาใน `shared/` และ `workspace/`

### backend

- หน้าที่: `status.json`, `runs.json` และข้อมูลสถานะ
- เขียนได้: `apps/sample-dashboard/backend/`
- ห้าม: แก้ UI ใน `frontend/`

### qa

- หน้าที่: ตรวจเช็กลิสต์ + ด่านคุณภาพ/ต้นทุน
- เขียนได้: `apps/sample-dashboard/qa/`, `workspace/contracts/audit-result.json` และรายงานที่เกี่ยวข้อง
- อ่าน: ทั้งแอป
- ห้าม: แก้โค้ดแอปเพื่อบังคับให้ผ่านโดยไม่ผ่านด่าน

### synthesizer

- หน้าที่: รวมผลให้เปิดแผงได้ และเขียน `synthesize-report.json`
- เขียนได้: เฉพาะที่จำเป็นเพื่อเชื่อม FE/BE โดยไม่แย่ง ownership หลัก + `workspace/contracts/`

## ทีมข้ามเครื่องมือ

- Claude Code และ OpenCode ใช้ role cards ชุดเดียวกัน (`role-cards.json`)
- ส่งงานต่อด้วย `handoff-fe.json` / `handoff-be.json`
- มอบหมายงานบน Flux (Lab 10) — การ์ดต้องตรงงาน Agent Cost Board
