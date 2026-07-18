# Static A2A examples (Lab เสริม)

ใช้เมื่อ Track A (live server) ไม่พร้อม — Instructor เปิดไฟล์บนโปรเจคเตอร์ได้ทันที

| ไฟล์ | ใช้ทำอะไร |
|---|---|
| [`agent-card.dining.json`](agent-card.dining.json) | ตัวอย่าง Agent Card ของ Dining Agent (static) |
| [`sample-task.dining.json`](sample-task.dining.json) | ตัวอย่างข้อความ Task ที่ orchestrator จะส่ง |

## วิธีใช้ในห้อง

1. เปิด `agent-card.dining.json` — ชี้ `name`, `skills`, `supportedInterfaces`  
2. อธิบายว่าตอน live จะเสิร์ฟที่ `GET /.well-known/agent-card.json`  
3. เปิด `sample-task.dining.json` — นี่คือสิ่งที่**แทน**การที่คนสลับไป prompt OpenCode เอง  
4. ย้ำ: ผลยังต้องเข้า `dining-options.json` / schema เดิม

ฟิลด์ `_lab_meta` ใน Agent Card **ไม่ใช่**ส่วนของสเปก A2A — มีเพื่อสอน ownership เท่านั้น
