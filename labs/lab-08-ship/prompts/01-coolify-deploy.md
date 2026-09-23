# Prompt — Coolify deploy (Lab 08)

```text
เป้าหมาย Lab 08: deploy ไป https://<STUDENT_SLUG>.9expert.online ผ่าน Coolify

ตัวแปรจาก .env:
- STUDENT_SLUG=userNN
- SITE_URL=https://userNN.9expert.online

Checklist (ผู้เรียนทำกับวิทยากร):
1. astro build / Dockerfile ตาม template — รัน container local ถ้ามี
2. Coolify app ชี้ repo + branch + env (ไม่ commit secret)
3. หลัง deploy: curl -I ต้องได้ HTTP 200 ที่ SITE_URL
4. ทดสอบ API guestbook/contact บน production (POST demo แล้วลบได้)

Claude ช่วย: สรุป env ที่ต้องใส่ใน Coolify (ชื่อ key เท่านั้น ไม่ใส่ค่า secret ในแชท)
เขียน docs/SHIP.md สั้น ๆ: URL, วันที่ deploy, คำสั่ง curl ที่ใช้ตรวจ

Demo อ้างอิง: https://demo.9expert.online

ห้ามเคลม deploy สำเร็จถ้ายังไม่มี URL 200 จริง
```
