# Prompt — Plan mode + Interview (Lab 01)

วางในเซสชัน `claude` ที่ **root ของ repo สินค้า** (มี `package.json`, `astro.config.mjs`)

```text
เปิด Plan mode ก่อน (Shift+Tab หรือ /plan ตามเวอร์ชัน Claude Code 2.1.278)

เป้าหมาย Lab 01: สัมภาษณ์ฉันเพื่อสร้าง personal branding site จาก template course-personal-site
แล้วเขียนผลลัพธ์เป็น docs/PROFILE.md ภาษาไทย (หัวข้อและเนื้อหาอ่านง่าย)

กฎ:
- อ่าน SETUP ใน lab repo ถ้าจำเป็น แต่แก้ไฟล์เฉพาะใน repo สินค้านี้
- ถามทีละหัวข้อ อย่างน้อย 8 คำถาม ครอบคลุม: ชื่อที่แสดง, headline, เรื่องเล่าสั้น About,
  ความสนใจ 3–5 ข้อ, ช่องทางติดต่อ, โทนภาพ/สีที่ชอบ, สิ่งที่ไม่อยากโชว์บนเว็บ
- หลังได้คำตอบครบ ให้สรุปแผนสั้น ๆ แล้วเขียน docs/PROFILE.md ตาม schema ด้านล่าง
- อย่าแก้หน้า Astro ใน Lab นี้ — แค่เอกสาร PROFILE

Schema docs/PROFILE.md (ใช้ frontmatter YAML ถ้าต้องการ):
---
displayName: ""
headline: ""
tagline: ""
about: |
  (2–4 ย่อหน้า)
interests:
  - title: ""
    blurb: ""
contact:
  email: ""          # ใช้ที่อยู่ demo ได้ถ้าไม่ต้องการของจริง
  github: ""
  linkedin: ""
tone:
  primaryColor: ""   # hex หรือชื่อโทน
  voice: ""          # เช่น เป็นกันเอง / มืออาชีพ
---

เมื่อเขียนไฟล์เสร็จ บอก path และ bullet 3 จุดที่โดดเด่นของโปรไฟล์
```
