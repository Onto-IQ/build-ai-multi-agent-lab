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

## ดูบน localhost (ทุก OS)

`frontend` ดึง `../backend/*.json` — **ห้าม**เปิด `index.html` แบบ `file://`

จาก root ของ repo:

```bash
npx --yes serve apps/sample-dashboard -p 4173
```

เปิด [http://localhost:4173/frontend/](http://localhost:4173/frontend/)

ไม่ต้อง Python venv / ไม่ต้อง `npm install` ที่ root — มี **Node** พอสำหรับ `npx` และสคริปต์ด่าน

## Deploy (Capstone / go-live)

1. Deploy **ทั้ง** `apps/sample-dashboard/` (ต้องมี `frontend/` + `backend/`)  
   แนะนำ: Cloudflare Pages / Netlify / Azure Static Web Apps — ตั้ง publish root ที่ `apps/sample-dashboard` แล้วเปิด `…/frontend/`
2. ตรวจว่าแผงโหลดสถานะ + ตารางรอบจาก JSON จริง
3. ใส่ URL ใน `workspace/contracts/capstone-ship.json` และ `workspace/learning-log.md`
4. แชร์ลิงก์ให้เพื่อนในห้อง
