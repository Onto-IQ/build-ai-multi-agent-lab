# Lab 7: Collaboration Layer (ไม่บังคับสมัครบัญชี)

**เวลา:** 30–40 นาที  
**นอก trip flow หลัก** — เน้นแนวคิดการประสานทีม

## เป้าหมาย

เข้าใจว่าทีม AI ประสานกันได้อย่างไรโดยไม่ยึด SaaS ภายนอกเป็นทางเดียว

## 3 ชั้นที่ต้องอธิบายได้

1. **Native Teams** — Claude Code Agent Teams และ/หรือ OpenCode multi-agent (shared task list, lead/teammate)
2. **JSON Contract / file handoff** — ownership ใน `shared/contracts/README.md` และไฟล์จริงใน `workspace/contracts/`
3. **กระดานงานแบบ local (optional)** — Flux หรือ Multica self-host ด้วย Docker

## เกณฑ์ผ่าน (บังคับ)

- [ ] อธิบายได้ว่าแต่ละชั้นแก้ปัญหาอะไร
- [ ] ชี้ ownership ของ contract อย่างน้อย 5 ไฟล์: trip-brief, activity-options, dining-options, audit-result, final-itinerary
- [ ] รันอย่างน้อยหนึ่งอย่าง:
  - Claude Code Agent Teams หรือ OpenCode multi-agent บนโจทย์ย่อยของทริป หรือ
  - จำลอง handoff ด้วยไฟล์ใน `workspace/contracts/` แล้วบันทึกลำดับใน `workspace/learning-log.md`

## Optional Track A — Flux (local / MCP)

1. ติดตั้ง Flux ตามเอกสารของเครื่องมือ (local/git-native)
2. สร้างบอร์ดอย่างน้อย 4 การ์ด: Triage, Activity, Dining, Audit
3. ให้ agent อัปเดตสถานะเมื่อสร้าง contract เสร็จ
4. แคปหน้าจอหรือบันทึกคำสั่งใน learning-log

ถ้าติดตั้งไม่สำเร็จภายในเวลา → ใช้ Fallback โดยไม่เสียคะแนนส่วนบังคับ

## Optional Track B — Multica Docker (self-host)

1. รัน Multica แบบ self-host (ไม่สมัคร cloud)
2. มอบหมายงานให้ agent อย่างน้อย 2 บทบาท
3. บันทึกข้อดี–ข้อจำกัดเทียบกับ native teams + JSON contract

ไม่ใช้ Multica cloud เป็นข้อบังคับของหลักสูตร

## Fallback (ถ้า infra ไม่พร้อม)

คัดลอกตารางนี้ไป `workspace/learning-log.md` แล้วอัปเดตสถานะ:

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

## ถัดไป

[Lab 8: Stop Condition](../lab-08-stop-condition/README.md)
