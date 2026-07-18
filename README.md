# Multi-Agent Personalized Trip & Dining Coordinator Lab

โปรเจกต์ Lab สำหรับการอบรม AI Multi-Agent Systems 2 วัน 12 ชั่วโมง ผู้เรียนจะสร้างระบบวางแผนทริปจากคำขอภาษาธรรมชาติ โดยแบ่งงานระหว่าง Claude Code และ OpenCode แล้วประสานกันผ่าน JSON contracts

## ภาพรวมระบบ

```text
User Request
    |
    v
Claude Code: Triage / Activity
    |  trip-brief.json + activity-options.json
    v
OpenCode: Dining / Logistics Audit
    |  dining-options.json + audit-result.json
    v
Claude Code: Coordinator / Final Synthesis
    |
    v
final-itinerary.json + Mockup
```

Claude Code รับผิดชอบการถอดความต้องการและกิจกรรมหลัก ส่วน OpenCode รับผิดชอบตัวเลือก dining และการตรวจงบประมาณ/เวลา ทั้งสองฝั่งสื่อสารผ่านไฟล์ใน `contracts/` และไม่แก้ไฟล์ของอีกฝั่งโดยตรง

## โครงสร้าง repository

```text
contracts/       ตัวอย่าง JSON contract ระหว่าง Agent
mock-data/       ข้อมูลจำลองสถานที่ กิจกรรม ร้านอาหาร และการเดินทาง
prompts/         Prompt สำหรับ Claude Code และ OpenCode
scenarios/       โจทย์ Lab และ failure cases
mockup/          หน้าเว็บแสดง itinerary แบบ static
scripts/         สคริปต์ตรวจ JSON และ contract
docs/            Instruction สำหรับผู้เรียน
```

## เริ่มต้นอย่างเร็ว

ตรวจ environment:

```bash
node --version
claude --version
opencode --version
```

ตรวจไฟล์ JSON ทั้ง repository:

```bash
node scripts/validate-json.mjs
```

เปิด Mockup โดยดับเบิลคลิก `mockup/index.html` หรือใช้ local server:

```bash
python -m http.server 8080 --directory mockup
```

แล้วเปิด `http://localhost:8080`

## ลำดับการทำ Lab

เริ่มจาก `docs/LAB-INSTRUCTIONS.md` แล้วทำตาม Lab 1 ถึง Lab 7 ตามลำดับ ผลลัพธ์ที่ผู้เรียนต้องสร้างคือ `trip-brief.json`, `activity-options.json`, `dining-options.json`, `audit-result.json` และ `final-itinerary.json` (ไฟล์ output จริงไม่รวมใน starter repository)

เส้นทางหลักใช้ข้อมูลจาก `mock-data/` เพื่อให้ทุกคนได้ผลลัพธ์ที่ทำซ้ำได้ API ภายนอกเป็น optional extension เท่านั้น หากใช้ API ต้องบันทึกแหล่งข้อมูลและวันเวลาที่เรียกไว้ใน output

## สัญญาการทำงานร่วมกัน

ห้าม Agent สองฝั่งแก้ไฟล์เดียวกันพร้อมกัน เจ้าของไฟล์คือ Claude Code: `trip-brief.json`, `activity-options.json`, `final-itinerary.json`; OpenCode: `dining-options.json`, `audit-result.json` การแก้ไขต้องทำผ่านไฟล์ชั่วคราวแล้วแทนที่เมื่อ output ผ่าน schema แล้ว

## Definition of Done

ระบบต้องรับคำขอภาษาไทย สร้าง structured trip brief มีข้อเสนอจาก Activity และ Dining Agent ตรวจงบประมาณ เวลาเปิด-ปิด และเวลาเดินทาง มี fallback อย่างน้อยหนึ่งกรณี หยุด refinement ไม่เกิน 2 รอบ สร้าง itinerary สุดท้ายเป็น JSON และแสดงผลใน Mockup พร้อม assumptions และข้อจำกัดของข้อมูลจำลอง

หมายเหตุ: `contracts/*.example.json` เป็น template/fixture สำหรับอ้างอิง ไม่ใช่ผลลัพธ์ของผู้เรียน คำสั่ง validator ตรวจ JSON syntax และรองรับการระบุไฟล์เฉพาะ เช่น `node scripts/validate-json.mjs contracts/trip-brief.json`
