# Lab Instructions: Multi-Agent Trip & Dining Coordinator

## เป้าหมาย

สร้าง prototype ที่รับคำขอทริปภาษาไทย แล้วให้ Agent หลายตัวร่วมกันสร้าง itinerary ที่ผ่านเงื่อนไขกิจกรรม ร้านอาหาร เวลาเดินทาง และงบประมาณ โดยแบ่งการทำงานระหว่าง Claude Code และ OpenCode ผ่านไฟล์ JSON contract

ในหลักสูตร 2 วัน งานใน repo นี้ถูกแบ่งเป็น **Trip Step A–G** แล้วกระจายเข้า Lab 1–9 ของหลักสูตร ไม่ต้องรันทั้งชุดในครั้งเดียวตั้งแต่ต้น

## Mapping กับหลักสูตร AI Multi-Agent Systems

| Lab หลักสูตร | Trip Step | สิ่งที่ทำ | เวลาแนะนำ |
|---|---|---|---|
| Lab 1 | **A** | Triage Agent (Claude Code) → `trip-brief.json` | 40–45 นาที |
| Lab 2 | **C** | Dining Agent (OpenCode) → `dining-options.json` + เทียบกับ Lab 1 | 40–45 นาที |
| Lab 3 | **D** | Permission boundary + `docs/PERMISSION-CHECKLIST.md` | 30–40 นาที |
| Lab 4 | — | Memory (นอก trip flow): จำ preference ทริป ข้าม session | 30 นาที |
| Lab 5 | **B + C + E** | ทีม 3 ตัว: Activity + Dining + Auditor | 60 นาที |
| Lab 6 | **E–F** (บางส่วน) | OpenCode orchestration: audit → backup เป็นขั้น | 40 นาที |
| Lab 7 | — | Collaboration Layer: native teams + contract; optional board | 30–40 นาที |
| Lab 8 | **E–F** + scenario-02/03 | Loop vs stop, refinement ≤ 2 รอบ | 40–45 นาที |
| Lab 9 | **A–G** (Capstone) | รวมผลจน `final-itinerary.json` + Mockup + นำเสนอ | 60–75 นาที |

เอกสารเสริม:

- `docs/PERMISSION-CHECKLIST.md` — ใช้กับ Lab 3 / Trip Step D
- `docs/LAB7-COLLAB-LAYER.md` — ใช้กับ Lab 7

## กติกาสำคัญ

ทำงานรายบุคคล ใช้ scenario เดียวกันทุกคน (`scenarios/scenario-01-nong-nooch.json` เป็นเส้นทางหลัก) ใช้ข้อมูลจำลองเป็นหลัก และอย่าแก้ไฟล์ของ Agent อีกฝั่งโดยตรง หากผลลัพธ์ไม่ผ่าน schema ให้แก้ prompt หรือสร้าง output ใหม่ ไม่ควรแก้ JSON ด้วยมือเพื่อปกปิดปัญหาของ Agent

ในคู่มือหลักสูตรเรียกขั้นตอนว่า **Trip Step A–G** เพื่อไม่ให้เลข Lab ชนกับ Lab 1–9 ของหลักสูตร

## เตรียม repository

เปิด Terminal ในโฟลเดอร์ repository และตรวจว่าไฟล์เริ่มต้นอยู่ครบ:

```bash
node scripts/validate-json.mjs
```

อ่านไฟล์ต่อไปนี้ก่อนเริ่ม: `README.md`, `contracts/README.md`, `mock-data/README.md` และ `scenarios/scenario-01-nong-nooch.json`

---

## Trip Step A: Triage requirement ด้วย Claude Code (45 นาที)

ใช้ใน **Lab 1**

เปิด Claude Code ที่ root ของ repository อ่าน `prompts/claude-code/triage-agent.md` แล้วใช้ prompt นั้นกับ scenario ที่กำหนด เป้าหมายคือแปลงคำขอดิบเป็น `contracts/trip-brief.json`

ตรวจด้วยตนเองว่า output แยก `hard_constraints` และ `soft_preferences` ถูกต้อง มีงบรวม จำนวนผู้เดินทาง ช่วงเวลา พื้นที่ และสิ่งที่ต้องทำ ถ้าข้อมูลสำคัญหาย ให้ปรับ prompt แล้วรันใหม่

ตรวจ schema:

```bash
node scripts/validate-json.mjs contracts/trip-brief.json
```

## Trip Step B: Activity Specialist ด้วย Claude Code (45 นาที)

ใช้ใน **Lab 5** (และรวมใน Lab 9)

อ่าน `prompts/claude-code/activity-agent.md` ให้ Agent อ่าน `trip-brief.json` และ `mock-data/activities.json` แล้วสร้าง `contracts/activity-options.json`

ต้องมี candidate อย่างน้อย 2 รายการ ระบุช่วงเวลา ค่าใช้จ่าย ตำแหน่ง สมมติฐาน และคะแนนความเหมาะสม Activity Agent เสนอทางเลือกได้ แต่ไม่มีสิทธิ์สรุป itinerary สุดท้าย

## Trip Step C: Dining Specialist ด้วย OpenCode (45 นาที)

ใช้ใน **Lab 2**, **Lab 5**

เปิด OpenCode ที่ root เดียวกัน อ่าน `prompts/opencode/dining-agent.md` ให้ Agent อ่าน `trip-brief.json` และ `mock-data/dining-options.json` แล้วสร้าง `contracts/dining-options.json`

ต้องมีร้านหลักและ backup อย่างน้อยอย่างละ 1 รายการ ระบุเวลาทำการ ราคา บรรยากาศ พื้นที่ และเหตุผลที่ตรงกับ preference ถ้าใช้ข้อมูลจาก API ภายนอก ให้ใส่ source และ retrieved_at ใน output

## Trip Step D: Permission Boundary และ Contract Test (45 นาที)

ใช้ใน **Lab 3**

อ่าน `prompts/opencode/permission-test.md` และตั้งค่าตาม `docs/PERMISSION-CHECKLIST.md` แล้วทดสอบว่า Dining Agent ทำได้เฉพาะการอ่าน trip brief และ mock data กับเขียน dining options ไม่สามารถแก้ `activity-options.json` หรือ `final-itinerary.json`

จดผลทดสอบอย่างน้อย 4 กรณีใน `learning-log.md` ได้แก่ allowed read, allowed write, forbidden write และ missing input ตรวจไฟล์ทั้งหมดด้วย:

```bash
node scripts/validate-json.mjs
```

## Trip Step E: Logistics & Budget Auditor ด้วย OpenCode (60 นาที)

ใช้ใน **Lab 5**, **Lab 6**, **Lab 8**

อ่าน `prompts/opencode/logistics-auditor.md` ให้ Agent อ่าน trip brief, activity options, dining options และ `mock-data/travel-times.json` แล้วสร้าง `contracts/audit-result.json`

Auditor ต้องตรวจ hard constraints ก่อน soft preferences และต้องรายงาน violation ที่ตรวจสอบได้ ห้ามเลือกสถานที่ใหม่เอง หากไม่ผ่านต้องส่ง `recommended_action` และข้อกำหนดสำหรับ backup options กลับมา

จงทดสอบอย่างน้อย 2 failure cases: งบประมาณเกิน และร้านปิด/เวลาไม่พอ ใช้ scenario files ใน `scenarios/` (`scenario-02-budget-fail`, `scenario-03-closed-day`)

## Trip Step F: Backup และ Final Synthesis ด้วย Claude Code (60 นาที)

ใช้ใน **Lab 6**, **Lab 8**, **Lab 9**

หาก audit ไม่ผ่าน ให้ใช้ `prompts/opencode/dining-backup-agent.md` สร้างตัวเลือกสำรองใน `dining-options.json` หรือไฟล์ draft แล้วรัน audit ใหม่ จำกัด refinement ไม่เกิน 2 รอบ

เมื่อ audit ผ่าน อ่าน `prompts/claude-code/final-coordinator.md` ให้ Coordinator รวมข้อมูลและสร้าง `contracts/final-itinerary.json` ต้องมี timeline, budget summary, travel notes, assumptions, data freshness และข้อจำกัดที่ผู้ใช้ควรยืนยันเอง

## Trip Step G: แสดงผล Mockup และนำเสนอ (45 นาที)

ใช้ใน **Lab 9 (Capstone)**

เปิด `mockup/index.html` แล้วตรวจว่าหน้าแสดงข้อมูลสอดคล้องกับ `contracts/final-itinerary.json` Mockup รุ่นเริ่มต้นเป็นหน้า static ที่อ่านง่ายโดยไม่ต้องติดตั้ง dependency ให้แก้ข้อความและตัวเลขใน `mockup/index.html` เพื่อใช้ผลลัพธ์ของตนเอง แล้วเปิดหน้าใหม่ (หากเปิดผ่าน `file://` ไม่ได้ ให้ใช้ local server ตาม README)

น้ำหนักการประเมินอยู่ที่ agent / contract / stop condition มากกว่าการตกแต่ง HTML

การนำเสนอใช้เวลา 5 นาที: อธิบาย input, การแบ่งบทบาท, JSON contract, failure case, stop condition และเหตุผลที่เลือกใช้ Claude Code กับ OpenCode คนละงาน

---

## Lab 4 (Memory) — นอก trip flow

ไม่บังคับสร้าง contract ใหม่ ให้ Agent จำข้อมูลอย่างน้อย: งบไม่เกิน 5,000 บาท, prefer romantic wine, คู่รัก 2 คน แล้วปิด/เปิด session ใหม่แล้วยังอ้างข้อมูลนี้ได้เมื่อสร้างหรือปรับ `trip-brief` / dining preference บันทึกวิธีที่ใช้น memory และผลทดสอบใน `learning-log.md`

## Lab 7 (Collaboration Layer) — นอก trip flow หลัก

ทำตาม `docs/LAB7-COLLAB-LAYER.md`

- **บังคับ:** อธิบาย 3 ชั้น + โชว์ contract ownership หรือรัน native teams
- **Optional:** Flux หรือ Multica Docker
- **Fallback:** ใช้ `learning-log.md` เป็นกระดานคนก็ถือว่าผ่านเกณฑ์หลัก

## รูปแบบไฟล์ learning-log.md

บันทึก prompt version, เวลาเริ่ม/จบ, model/tool ที่ใช้, ปัญหาที่พบ, จำนวนรอบ refinement และค่าใช้จ่ายโดยประมาณ หากไม่มีข้อมูลต้นทุนจริงให้เขียนว่า `not measured` ห้ามอ้างว่าเป็นค่าใช้จ่ายจริง

แนะนำหัวข้ออย่างน้อย: `Lab / Trip Step`, `permission tests`, `refinement rounds`, `stop reason`, `cost`

## เกณฑ์ส่งงาน (Lab 9 / Capstone)

ส่งมอบ `contracts/trip-brief.json`, `contracts/activity-options.json`, `contracts/dining-options.json`, `contracts/audit-result.json`, `contracts/final-itinerary.json`, prompt ที่ปรับแก้, `learning-log.md`, หลักฐาน failure test และภาพหน้าจอ Mockup

ระหว่างคอร์สส่งงานย่อยตาม Lab ได้ โดยไม่ต้องรอ Capstone

## เกณฑ์ประเมิน

การแปลง requirement และการแยก hard/soft constraints 20 คะแนน การแบ่งบทบาทและการใช้ JSON contract 20 คะแนน การตรวจเวลา/งบ/สถานะร้านและ fallback 25 คะแนน permission และ stop condition 20 คะแนน คุณภาพ itinerary และการนำเสนอ 15 คะแนน

## Extension สำหรับผู้เรียนระดับสูง

เพิ่ม optional API adapter โดยเก็บผลจาก API เป็นไฟล์ใน `mock-data/external-cache/` ไม่ให้ agent เรียก API แบบไร้ขอบเขต เพิ่ม confidence scoring เปรียบเทียบ itinerary 2 แบบ หรือเพิ่ม user confirmation gate ก่อนยืนยันร้านอาหารและเวลาจริง
