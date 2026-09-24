# Prompt — Frontend pages (Lab 04)

คัดลอกเฉพาะบล็อกด้านล่างไปวางใน `claude`  
**(branch / เปิด PR / ดู localhost — ตาม README)**

```text
เป้าหมาย: ทำหน้า Astro ให้สะท้อน docs/PROFILE.md และ docs/DECISIONS.md

ก่อนลงมือ: อ่าน docs/STATUS.md และ docs/OPEN_LOOPS.md — สรุป Goal ≤ 8 บรรทัด

Scope:
- หน้า Home, About, Interests, Contact (ตาม template)
- อ่านเนื้อหาจาก docs/PROFILE.md (หรือ loader ที่ template มีอยู่)
- สไตล์ตาม tone / สีใน PROFILE และ decisions ที่เกี่ยว
- Navigation ครบ 4 หน้า + ลิงก์ Guestbook (backend อาจยังไม่ครบ)

ขั้นตอน:
1. อ่าน issue ที่ map จาก Lab 03 หรือ [Lab 04]
2. วางแผนสั้น ๆ แล้ว implement
3. npm test ต้องเขียว
4. npm run test:labs อาจยังแดง — ไม่บังคับใน Lab นี้
5. เตรียมข้อความ PR body: อ้าง issue + วิธีทดสอบ + ช่อง screenshot
6. จบงาน: อัปเดต docs/STATUS.md + docs/OPEN_LOOPS.md และเขียน docs/handoffs/04-claude-to-opencode.md จาก TEMPLATE (Request = backend Lab 05)

ห้าม commit .env
ห้าม PR ไป Onto-IQ/build-ai-multi-agent-lab upstream
ห้ามแก้ guestbook/SQLite logic เต็ม — เก็บไว้ Lab 05
ห้ามเขียนข้อความถึง "Lab 0X" / คอร์ส / เวิร์กช็อป ลงใน markup ที่ render ออกหน้าเว็บ — ผู้ชมเว็บต้องไม่เห็นว่าเว็บมาจากคอร์ส (อ้าง Lab ได้เฉพาะคอมเมนต์โค้ด/PR/docs · npm test มี check จับข้อความหลุด)
STATUS/OPEN_LOOPS = single-writer รอบนี้ (คุณ/frontend เท่านั้น)
```
