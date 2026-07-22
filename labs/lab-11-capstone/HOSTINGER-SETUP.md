# Hostinger classroom host — Lab 11

**วิทยากรเตรียมให้แล้ว (เล่าในห้อง):** DNS `*.9expert.online` · user `learner01`…`07` / `trainer` · nginx + redirect `/` → `/frontend/`

ผู้เรียนทำแค่: **ได้ slot → SSH → deploy → เขียนสัญญา**

| ใคร | ใช้ไฟล์ |
|---|---|
| ผู้เรียน | [`prompts/02-hostinger-deploy.md`](prompts/02-hostinger-deploy.md) → แล้ว [`prompts/01-capstone-ship.md`](prompts/01-capstone-ship.md) |
| วิทยากร (อ้างอิงสคริปต์สำรอง) | [`shared/scripts/hostinger-provision-*.sh`](../../shared/scripts/) — ไม่ใช่ขั้นตอน Lab ของผู้เรียน |

| ค่า | ล็อกในห้อง |
|---|---|
| SSH host | `srv1801939.hstgr.cloud` หรือ IP `187.127.123.173` |
| BASE_DOMAIN | `9expert.online` |
| Slot | `learner01` … `learner07` (วิทยากรแจก) |
| ตัวอย่างผู้สอน | [http://trainer.9expert.online/](http://trainer.9expert.online/) |
| `public_url` ของคุณ | `http://learnerNN.9expert.online/` |

> **กฎ go-live:** ห้ามใส่ URL ปลอมใน `capstone-ship.json`  
> **ความปลอดภัย:** ส่งเฉพาะไฟล์ `.pub` — ห้าม commit private key / รหัสผ่าน — ห้าม SSH เป็น `root`

---

## ผู้เรียนทำอะไร

แทนที่ `learnerNN` ด้วย slot ที่ได้ แล้วทำตาม [`prompts/02-hostinger-deploy.md`](prompts/02-hostinger-deploy.md)

1. สร้าง SSH key (PowerShell ใช้ passphrase ว่างแบบถูกต้อง) → ส่ง `.pub` ให้วิทยากร  
2. รอวิทยากรใส่ key เข้า slot ของคุณ → `ssh learnerNN@srv1801939.hstgr.cloud`  
3. อัปทั้ง `apps/sample-dashboard/` ไป `/var/www/learnerNN/` + `chmod 755` โฟลเดอร์  
4. เปิด `http://learnerNN.9expert.online/` ต้องเห็น Agent Cost Board  
5. วาง [`prompts/01-capstone-ship.md`](prompts/01-capstone-ship.md) เขียน `capstone-ship.json`

ค่าในสัญญา:

- `public_url` = `http://learnerNN.9expert.online/`
- `deploy_target` = `Hostinger classroom (learnerNN.9expert.online)`

```powershell
node shared/scripts/validate-json.mjs workspace/contracts/capstone-ship.json
```

---

## ตาราง slot

| Slot | SSH | public_url |
|---|---|---|
| trainer | `ssh trainer@srv1801939.hstgr.cloud` | [http://trainer.9expert.online/](http://trainer.9expert.online/) |
| learner01 | `ssh learner01@srv1801939.hstgr.cloud` | `http://learner01.9expert.online/` |
| learner02 | `ssh learner02@srv1801939.hstgr.cloud` | `http://learner02.9expert.online/` |
| learner03 | `ssh learner03@srv1801939.hstgr.cloud` | `http://learner03.9expert.online/` |
| learner04 | `ssh learner04@srv1801939.hstgr.cloud` | `http://learner04.9expert.online/` |
| learner05 | `ssh learner05@srv1801939.hstgr.cloud` | `http://learner05.9expert.online/` |
| learner06 | `ssh learner06@srv1801939.hstgr.cloud` | `http://learner06.9expert.online/` |
| learner07 | `ssh learner07@srv1801939.hstgr.cloud` | `http://learner07.9expert.online/` |

---

## แก้ปัญหาเบื้องต้น (ฝั่งผู้เรียน)

| อาการ | ทำอะไร |
|---|---|
| `Permission denied (publickey)` | ส่ง `.pub` ให้วิทยากรแล้วหรือยัง; ใช้ user `learnerNN` ไม่ใช่ `root`; บน PowerShell สร้าง key ด้วย `-N ([string]::Empty)` อย่าใช้ `-N '""'` |
| เปิด URL ไม่ขึ้น | ตรวจ slot/URL ให้ตรงตาราง; ถามวิทยากรเรื่อง DNS/nginx |
| แผงว่าง / JSON ไม่โหลด | อัปทั้ง `frontend` + `backend`; รัน `chmod 755` ตาม prompt (scp จาก Windows มักได้โฟลเดอร์ `700`) |
| `/` ไม่พาไปแผง | ต้องได้ redirect ไป `/frontend/` — ถ้าไม่ ให้แจ้งวิทยากร |
