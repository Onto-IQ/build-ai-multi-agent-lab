# Lab 7: Collaboration Layer (ไม่บังคับสมัครบัญชี)

เป้าหมาย: เข้าใจว่าทีม AI ประสานกันได้อย่างไรโดยไม่ยึด SaaS ภายนอกเป็นทางเดียว

## 3 ชั้นที่ต้องอธิบายได้

1. **Native Teams** — Claude Code Agent Teams และ/หรือ OpenCode multi-agent (shared task list, lead/teammate)
2. **JSON Contract / file handoff** — ownership ไฟล์ใน `contracts/` ตาม `contracts/README.md`
3. **กระดานงานแบบ local (optional)** — Flux หรือ Multica self-host ด้วย Docker

## เกณฑ์ผ่าน (บังคับ)

ทำครบข้อต่อไปนี้:

- [ ] อธิบายได้ว่าแต่ละชั้นแก้ปัญหาอะไร (การคุยกัน / สัญญาข้อมูล / มองเห็นงาน)
- [ ] ชี้ ownership ของ contract อย่างน้อย 5 ไฟล์: trip-brief, activity-options, dining-options, audit-result, final-itinerary
- [ ] รันอย่างน้อยหนึ่งอย่าง:
  - Claude Code Agent Teams หรือ OpenCode multi-agent บนโจทย์ย่อยของทริป หรือ
  - จำลอง handoff ด้วยการส่งต่อไฟล์ contract ระหว่าง Claude Code กับ OpenCode แล้วบันทึกลำดับใน `learning-log.md`

## Optional Track A — Flux (local / MCP)

ใช้เมื่อห้องพร้อมติดตั้ง CLI หรือ MCP

1. ติดตั้ง Flux ตามเอกสารของเครื่องมือ (local/git-native)
2. สร้างบอร์ดงานอย่างน้อย 4 การ์ด: Triage, Activity, Dining, Audit
3. ให้ agent อัปเดตสถานะการ์ดเมื่อสร้าง contract เสร็จ
4. แคปหน้าจอหรือบันทึกคำสั่งที่ใช้ใน `learning-log.md`

ถ้าติดตั้งไม่สำเร็จภายในเวลาที่กำหนด ให้สลับไป Fallback โดยไม่เสียคะแนนส่วนบังคับ

## Optional Track B — Multica Docker (self-host)

ใช้เมื่อห้องมี Docker และ instructor เตรียม compose/image ไว้แล้ว

1. รัน Multica แบบ self-host (ไม่สมัคร cloud)
2. มอบหมายงานให้ agent อย่างน้อย 2 บทบาท
3. สังเกตการอัปเดตสถานะ/ความคืบหน้า
4. บันทึกข้อดี–ข้อจำกัดเทียบกับ native teams + JSON contract

ไม่ใช้ Multica cloud เป็นข้อบังคับของหลักสูตร

## Fallback (ถ้า infra ไม่พร้อม)

ใช้ `learning-log.md` เป็นกระดานคน:

```md
### Collab board (fallback)
| Task | Owner | Status | Artifact |
|---|---|---|---|
| Triage | Claude Code | done | trip-brief.json |
| Activity | Claude Code | ... | activity-options.json |
| Dining | OpenCode | ... | dining-options.json |
| Audit | OpenCode | ... | audit-result.json |
| Final | Claude Code | ... | final-itinerary.json |
```

อัปเดตสถานะระหว่างทำ Lab 5/8/9 ถือว่าผ่านเกณฑ์หลักของ Lab 7

## สิ่งที่ควรได้จาก Lab นี้

- เลือกชั้นตามงาน: งานเร็วใช้ native, งานข้ามเครื่องมือใช้ contract, งานทีมใหญ่ค่อยเพิ่มกระดาน
- ไม่ผูกการจบหลักสูตรกับบัญชี SaaS
- เชื่อมกับ Module 7: กันแย่งไฟล์และวนลูปด้วย ownership + stop condition
