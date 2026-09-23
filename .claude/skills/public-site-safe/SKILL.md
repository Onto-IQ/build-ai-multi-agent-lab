---
name: public-site-safe
description: Guardrails for the personal branding site course — secrets, deploy claims, guestbook safety, ownership, swarm 20-turn ceiling.
---

# public-site-safe

ใช้กับทุกงาน implement / swarm / review / ship ใน repo นี้

## อนุญาต

- อ่าน/เขียนโค้ดตาม ownership ของ agent ที่เรียก
- ใช้ demo data (`demo@example.com`) บน guestbook
- Deploy ตรวจด้วย `curl` จริงแล้วค่อยบันทึกใน `docs/SHIP.md`

## ห้าม

- ขอ เก็บ หรือพิมพ์ API keys, PAT, Coolify webhook, รหัสผ่าน ในแชทหรือไฟล์ที่ commit
- Commit `.env`, `.mcp.json` (ถ้า gitignore), `node_modules`
- เคลมว่า ship สำเร็จถ้ายังไม่มี URL ที่ตอบ HTTP 200 จริง
- Leak stack trace / SQL error ให้ผู้ใช้เว็บ
- ใช้ MCP เป็นท่อส่งงานระหว่าง Claude ↔ OpenCode
- สร้าง JSON orchestration bus / Flux / room dispatch

## Guestbook / API

- Validate ความยาวและรูปแบบ input พื้นฐาน
- Error ฝั่งผู้ใช้สั้น ปลอดภัย
- ไม่เก็บ secret ใน SQLite

## Ownership

- UI → Claude `frontend`
- API/SQLite → OpenCode `backend`
- อย่าแย่งงานข้ามฝั่งโดยไม่จำเป็น

## Swarm (Lab 05b และงานหลายตัว)

- มี **done criteria** ชัดก่อนปล่อย
- **เพดาน 20 turns** — เมื่อครบ ให้หยุด สรุปสิ่งที่เสร็จ/ค้าง อย่าวิ่งต่อมั่ว
- ไม่ต้องกลัวเปลืองเพราะมีเพดาน — แต่ต้องเคารพเพดาน

ถ้าผู้ใช้ขอสิ่งที่ห้าม: ปฏิเสธสั้น ๆ อธิบายเหตุผล แล้วเสนอทางที่ปลอดภัยแทน
