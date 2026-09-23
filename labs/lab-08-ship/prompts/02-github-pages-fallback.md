# Fallback — GitHub Pages static (Lab 08)

ใช้เมื่อ Coolify / DNS ไม่พร้อม — **ไม่มี API guestbook บน Pages**

```text
ช่วยตั้งค่า static export (ถ้า template รองรับ) + GitHub Actions deploy Pages

ข้อจำกัด: อธิบายชัดว่า guestbook API ไม่ทำงานบน static host
เกณฑ์ผ่าน fallback: มี URL Pages 200 + หน้า 4 หลักครบ + บันทึกใน docs/SHIP.md ว่าเป็น fallback

คำสั่งตรวจ:
curl -I https://<user>.github.io/<repo>/
```
