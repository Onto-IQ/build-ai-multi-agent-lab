# Lab 3: Permission Boundary

**เวลา:** 30–40 นาที  
**เครื่องมือ:** OpenCode  
**เอกสาร:** `PERMISSION-CHECKLIST.md`

## เป้าหมาย

ทดสอบว่า Dining Agent ทำได้เฉพาะสิ่งที่อนุญาต และถูกปฏิเสธเมื่อข้ามขอบเขต

## ไฟล์ในโฟลเดอร์นี้

- `prompts/permission-test.md`
- `PERMISSION-CHECKLIST.md`

## ขั้นตอน

1. ตั้งสิทธิ์ตาม checklist **ก่อน** รันเทส
2. รันเคสใน `prompts/permission-test.md`
3. บันทึก PASS/FAIL ใน `workspace/learning-log.md` ตามรูปแบบใน checklist
4. ตรวจไฟล์:

```bash
node shared/scripts/validate-json.mjs
```

## เกณฑ์ผ่าน

- [ ] ครบอย่างน้อย 4 เคส: allowed read, allowed write, forbidden write, missing input
- [ ] ไม่แก้ permission กลางทางโดยไม่บันทึก
- [ ] ไฟล์ที่ห้ามเขียนไม่ถูกแก้จริง

## ถัดไป

[Lab 4: Memory](../lab-04-memory/README.md)
