# workspace — ผลงานผู้เรียน

```text
workspace/
  contracts/       สัญญา JSON ของแต่ละ Lab (code-review, role-cards, audit-result, ...)
  learning-log.md  บันทึกสั้น ๆ หลังแต่ละ Lab
```

คัดลอกโครงจาก `shared/contracts/*.example.json`  
ตรวจด้วย `node shared/scripts/validate-json.mjs`

อย่า commit ไฟล์สัญญาที่มีข้อมูลส่วนตัวหรือคีย์
