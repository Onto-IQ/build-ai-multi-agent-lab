# Lab 9: Capstone — Trip Coordinator

**เวลา:** 60–75 นาที  
**เครื่องมือ:** Claude Code + OpenCode  
**Output สุดท้าย:** `workspace/contracts/final-itinerary.json` + Mockup + นำเสนอ 5 นาที

## เป้าหมาย

รวมผล Lab 1–8 เป็น itinerary ที่เสนอได้ (ไม่ยืนยันจองจริง) และแสดงใน Mockup

## ไฟล์ในโฟลเดอร์นี้

- `prompts/final-coordinator.md`
- `mockup/index.html` — หน้าแสดงผล static

## ขั้นตอน

1. ตรวจว่า workspace มีครบ: trip-brief, activity-options, dining-options, audit-result
2. ถ้า audit ยัง FAIL และยังไม่ครบ 2 รอบ → กลับไป Lab 6/8
3. รัน Final Coordinator → `workspace/contracts/final-itinerary.json`
4. อัปเดตข้อความใน `mockup/index.html` ให้สอดคล้องผลของตน
5. เปิด Mockup:

```bash
python -m http.server 8080 --directory labs/lab-09-capstone/mockup
```

เปิด `http://localhost:8080`

6. นำเสนอ 5 นาที: input, บทบาท, JSON contract, failure case, stop condition, เหตุผลแบ่ง Claude Code / OpenCode

## Checklist ส่งงาน

- [ ] `workspace/contracts/trip-brief.json`
- [ ] `workspace/contracts/activity-options.json`
- [ ] `workspace/contracts/dining-options.json`
- [ ] `workspace/contracts/audit-result.json`
- [ ] `workspace/contracts/final-itinerary.json`
- [ ] prompt ที่ปรับแก้ (ถ้ามี)
- [ ] `workspace/learning-log.md`
- [ ] หลักฐาน failure test
- [ ] ภาพหน้าจอ Mockup

## เกณฑ์ประเมิน (รวม Capstone)

| หัวข้อ | คะแนน |
|---|---|
| Requirement + hard/soft | 20 |
| บทบาท + JSON contract | 20 |
| เวลา/งบ/ร้าน + fallback | 25 |
| Permission + stop condition | 20 |
| คุณภาพ itinerary + นำเสนอ | 15 |

น้ำหนักอยู่ที่ agent / contract / stop condition มากกว่าการตกแต่ง HTML
