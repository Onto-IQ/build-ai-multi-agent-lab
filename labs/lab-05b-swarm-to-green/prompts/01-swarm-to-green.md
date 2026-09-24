# Prompt — Swarm to green (Lab 05b)

คัดลอกเฉพาะบล็อกด้านล่างไปวางใน facilitator / agent หลัก  
**(นับ turn และอัปเดต docs/SWARM.md — ตาม README)**

```text
เป้าหมาย: swarm หลายตัว (หรือหลายรอบ) เพื่อทำให้ guestbook/API ตาม course stubs พร้อม

Done criteria (ปรับให้ตรงสถานะจริงถ้าจำเป็น):
- npm run test:labs เขียว
- ส่งฟอร์ม guestbook/contact demo บน localhost ได้ หรืออธิบายช่องว่างถ้าระบบยังไม่พร้อม UI

เพดานบังคับ:
- รวมไม่เกิน 20 turns แล้วหยุด
- เมื่อครบ 20 หรือเสร็จก่อน: อัปเดต docs/SWARM.md (turns used, outcome, gaps)
- อย่าวิ่งต่อหลังเพดาน

กฎ:
- ใช้ skill public-site-safe
- เคารพ ownership: UI = Claude frontend · API/SQLite = OpenCode backend
- ห้ามแก้ไฟล์ test ให้ผ่านโดยไม่ implement
- ห้าม commit .env / พิมพ์ secret
- ห้ามใช้ MCP เป็นท่อ Claude ↔ OpenCode

เริ่มจากอ่าน docs/DECISIONS.md และ error จาก npm run test:labs แล้วแบ่งงานสั้น ๆ
```
