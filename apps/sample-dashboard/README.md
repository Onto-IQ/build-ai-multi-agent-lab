# Agent Cost Board

แผงควบคุมต้นทุนและสถานะ**ทีม agent ของผู้เรียนเอง** (ที่สร้างใน Lab)  
โฟลเดอร์ทางเทคนิค: `apps/sample-dashboard/`

```text
apps/sample-dashboard/
  frontend/     # UI — Frontend agent เท่านั้น
  backend/      # status.json + runs.json — Backend agent เท่านั้น
  qa/           # เช็กลิสต์ — QA / Tester
  README.md
```

## ลำดับงาน (คอลัมน์ Flux)

Interview → Plan → Build → Test → Ship

## ข้อมูลที่แผงแสดง

- สถานะ Backend จาก `backend/status.json`
- ยอดโทเคนโดยประมาณและรายการรอบจาก `backend/runs.json`

ไม่ดึงเทเลเมทรีจากคลาวด์จริง — ผู้เรียน/agent บันทึกรอบเองหลังแต่ละ Lab

## Deploy (Capstone)

1. Deploy โฟลเดอร์ `frontend` (หรือ static ทั้งแอปตามที่โฮสต์รับ) ขึ้น Vercel หรือ Netlify  
2. ใส่ URL ใน `workspace/contracts/capstone-ship.json` และ `workspace/learning-log.md`  
3. แชร์ลิงก์ให้เพื่อนในห้อง
