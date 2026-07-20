# ด่านต้นทุน (Cost Gate)

ใช้ร่วมกับ Lab 08 และ Capstone

## กฎที่บังคับในห้อง

1. ปรับแก้ / refinement ของงานเดียวกัน **ไม่เกิน 2 รอบ**
2. รอบที่ 3 ขึ้นไป → หยุด แล้วถามคน (human-in-the-loop)
3. บันทึกจำนวนรอบใน `workspace/contracts/audit-result.json` ฟิลด์ `round` และ `max_refinement_rounds`
4. ถ้าใช้ Agent Teams แล้วต้นทุนพุ่ง → ทางเลือก Subagents (ถูกกว่า) แล้วจดใน learning-log

## เช็กลิสต์สั้น

- [ ] รู้ว่าตอนนี้อยู่รอบที่เท่าไร
- [ ] ยังไม่เกิน 2 รอบ หรือหยุดแล้วถามคนแล้ว
- [ ] มีบันทึกต้นทุนโดยประมาณใน `apps/sample-dashboard/backend/runs.json` หรือ learning-log
