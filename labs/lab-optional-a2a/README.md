# Lab เสริม (Optional): A2A vs JSON Contract (+ คู่กับ MCP)

**เวลา:** 15–25 นาที (concept) · สูงสุด ~40 นาทีถ้า Instructor live demo Track A  
**สถานะ:** ไม่บังคับ — ไม่บล็อก Lab หลัก / ไม่เป็นเกณฑ์ Capstone  
**จังหวะแนะนำ:** หลัง Lab 7 (Collaboration Layer) หรือท้าย Module 6  
**คู่กับ:** [lab-optional-mcp-vs-cli](../lab-optional-mcp-vs-cli/README.md)  
**เครื่องมือ:** OpenCode (แนะนำ) · Claude Code อ่านอย่างเดียว · (ทางเลือก) A2A wrapper / client

## วางชั้นให้ถูกก่อนลงมือ

```text
MCP / CLI tool     = Agent → เครื่องมือ / ข้อมูลภายนอก     (แนวดิ่ง)
A2A                = Agent → Agent ข้ามระบบ                 (แนวนอน)
JSON contract      = ของส่งมอบ + ownership + audit          (แกนคอร์ส)
คน / Native teams  = orchestrator ในห้องเรียน               (ค่าเริ่มต้น)
```

คอร์สนี้**ไม่แทน** file handoff ด้วย A2A  
A2A คือชั้นถัดไปเมื่ออยากให้ agent เรียกกันเองโดยไม่ให้คนสลับ prompt ทุกขั้น

| Lab เสริม | คำถามหลัก |
|---|---|
| MCP vs CLI | เรียกข้อมูลยังไงให้ทั้งห้องไม่โดน rate limit |
| **A2A vs Contract** | ส่งงานข้าม agent ยังไง — โปรโตคอล vs ไฟล์ + คน |

## ทำไมคอร์สยังยึด JSON contract เป็นค่าเริ่มต้น

1. **ข้าม Claude Code ↔ OpenCode ได้ทันที** โดยไม่ต้องตั้ง A2A server ทั้งสองฝั่ง  
2. **Ownership ตรวจง่าย** — ใครเขียนไฟล์ไหน ชัดใน `shared/contracts/`  
3. **ห้องเรียนเสถียร** — ไม่พังเพราะพอร์ต / wrapper / เวอร์ชันโปรโตคอล  
4. **Audit + stop condition** ผูกกับไฟล์ได้ตรง ๆ (Lab 6/8)

```text
ค่าเริ่มต้นห้องเรียน
  คน prompt → owner เขียน workspace/contracts/*.json → ฝั่งถัดไปอ่าน

Lab เสริมนี้ (optional)
  ลองให้ Dining (หรือ Auditor) รับงานผ่าน A2A 1 ครั้ง
  หรือตอบ worksheet จากเอกสาร — ผลยังต้องคิดในกรอบ contract
```

## เป้าหมาย

- แยก MCP / A2A / JSON contract ได้ในหนึ่งประโยคต่อชั้น  
- เห็นว่า A2A เปลี่ยน**ช่องทางเรียก** ไม่ยกเลิก schema / ownership / stop  
- ทดลอง Track A (live บาง ๆ) **หรือ** Track B (เอกสาร)  
- บันทึกใน `workspace/learning-log.md`

## ไฟล์ในโฟลเดอร์นี้

- `prompts/compare-worksheet.md` — คำถามที่ต้องตอบใน learning-log  
- `examples/agent-card.dining.json` — **Agent Card ตัวอย่างแบบ static** (Track B / fallback demo)  
- `examples/sample-task.dining.json` — ตัวอย่าง Task ที่ orchestrator จะส่ง  
- `examples/README.md` — วิธีเปิดสอนเมื่อไม่มี live server  
- อ้าง collab 3 ชั้น: [lab-07-collab-layer](../lab-07-collab-layer/README.md)  
- อ้าง tool/MCP: [lab-optional-mcp-vs-cli](../lab-optional-mcp-vs-cli/README.md)  
- กฎ tool: [`shared/prompts/tool-calling-rules.md`](../../shared/prompts/tool-calling-rules.md)

## Prerequisites

อย่างน้อยหนึ่งอย่าง:

- มี `workspace/contracts/trip-brief.json` (จาก Lab 1) หรือ  
- มี `activity-options.json` + พร้อมจำลอง Dining (Lab 2)

ถ้ายังไม่มี contract — ใช้ scenario + example ใน `shared/contracts/` อ่านอย่างเดียว แล้วทำ Track B

## ขั้นตอน

### 1) Baseline file handoff (บังคับใน Lab เสริมนี้)

จำลองลำดับเดิม 1 รอบสั้น ๆ (ไม่ต้องรันทั้ง Capstone):

```text
Claude Code (ทำแล้ว / อ่านอย่างเดียว)
  trip-brief.json · activity-options.json
        │
        │  คนเป็นสายส่ง (ค่าเริ่มต้นคอร์ส)
        v
OpenCode Dining
  → dining-options.json  (owner = OpenCode)
```

ตอบใน learning-log: ขั้นไหนที่**คน**ต้องสลับเครื่องมือ

### 2) ทางเลือก A — Live thin demo (Instructor หรือผู้เรียนที่เครื่องพร้อม)

**Scope ที่อนุญาต:** เฉพาะ Dining (หรือ Auditor) **หนึ่ง** บทบาท — ห้ามทั้ง pipeline

โครงที่แนะนำ (ล็อกเวอร์ชันตามคู่มือห้อง):

1. ยืนยัน OpenCode ใช้ได้: `opencode --version`  
2. รัน OpenCode server (เช่น `opencode serve`)  
3. ห่อ Dining เป็น A2A agent (ตัวอย่าง ecosystem: wrapper แบบ `a2a-opencode` หรือ A2A SDK client ที่ Instructor กำหนด)  
4. ชี้ `directory` / working dir ไปที่ **root** ของ lab repo  
5. Orchestrator หรือ `curl`/client ส่ง **Task** ความหมายประมาณ:
   - อ่าน `workspace/contracts/trip-brief.json` (+ activity ถ้ามี)  
   - เรียก tool ตามกฎคอร์ส (CLI+cache; mock เป็น fallback)  
   - คืนผลที่ map ได้เข้า schema dining **หรือ** เขียน `dining-options.json` ตาม ownership  
6. เปิด Agent Card (เช่น `/.well-known/agent-card.json`) ให้ห้องเห็นว่า “discover ได้”

**นาทีที่ 10 ยังไม่ขึ้น** → ตัดไป Track B ทันที (ได้เต็มส่วน Lab เสริม)

Checklist Track A

- [ ] เห็น Agent Card หรือ endpoint สุขภาพของ A2A server  
- [ ] ส่ง Task ได้ 1 ครั้งและได้ข้อความ/artifact กลับ  
- [ ] ผลถูก map เข้ากรอบ contract (เขียนไฟล์หรืออธิบาย mapping ก็ได้)  
- [ ] **ไม่ได้** ให้ Claude Code กับ OpenCode เป็น A2A peer ครบวงจรทั้งทริป

### 3) ทางเลือก B — อ่านเอกสารเทียบ (ไม่ต้องติดตั้ง)

เปิดไฟล์ static แล้วตอบ worksheet:

1. [`examples/agent-card.dining.json`](examples/agent-card.dining.json) — ดู `name`, `skills`, `supportedInterfaces`  
2. [`examples/sample-task.dining.json`](examples/sample-task.dining.json) — เทียบกับ “คนสลับไป prompt OpenCode”  
3. ตอบคำถาม:
   - A2A ต่างจาก MCP อย่างไร  
   - A2A ต่างจาก JSON contract / file handoff อย่างไร  
   - ทำไมคอร์สยังให้คน + ไฟล์เป็นเกณฑ์ผ่านเมื่อข้าม Claude ↔ OpenCode  
   - ถ้าจะเอา A2A เข้าองค์กร ควรคงอะไรจากคอร์สนี้ไว้ (ownership, stop, schema)

หมายเหตุ: ฟิลด์ `_lab_meta` ใน Agent Card **ไม่ใช่**สเปก A2A — มีเพื่อสอน ownership ในห้องเท่านั้น

### 4) ตารางคู่ Lab เสริม (บังคับคิด — แม้ทำแค่ A2A)

เติมใน learning-log (มีใน worksheet):

| ชั้น | ตัวอย่างในคอร์ส | แก้ปัญหา |
|---|---|---|
| CLI + cache | `shared/scripts/tools/*` | ข้อมูลจริง + ลด rate limit |
| MCP | Lab เสริม MCP | Agent เรียก tool แบบมาตรฐานสำเร็จรูป |
| JSON contract | `workspace/contracts/*` | ส่งของ + ownership ข้ามเครื่องมือ |
| A2A | Lab เสริมนี้ | Agent มอบ Task ข้ามระบบโดยไม่ต้องคนส่งทุกขั้น |

### 5) บันทึก learning-log

คัดลอกหัวข้อจาก `prompts/compare-worksheet.md` ไป `workspace/learning-log.md`

## เกณฑ์ผ่าน Lab เสริม

- [ ] อธิบาย baselined file handoff ได้ว่าคนสลับตรงไหน  
- [ ] ทำ Track A **หรือ** B  
- [ ] ตอบได้ชัดว่า **MCP ≠ A2A** และ **A2A ≠ ยกเลิก JSON contract**  
- [ ] ยอมรับว่าเกณฑ์ผ่าน Lab หลักยังเป็นคน + contract (+ CLI/cache สำหรับข้อมูล)

## สิ่งที่ห้าม

- อย่าทำให้ Lab 2–9 / Capstone พึ่ง A2A เป็นทางเดียว  
- อย่าขยาย demo เป็น Triage→Activity→Dining→Audit→Final ผ่าน A2A ในชั่วโมงสอน  
- อย่าให้ Dining เขียนทับไฟล์ฝั่ง Claude Code  
- ห้ามยืนยันจองจริงจากผล A2A / tool / mock  
- อย่าบังคับทั้งห้องติดตั้ง wrapper เดียวกันถ้าเน็ต/สิทธิ์เครื่องไม่พร้อม — ใช้ Track B

## Instructor demo script (ย่อ)

| นาที | การกระทำ |
|---|---|
| 0–3 | สไลด์ 1 ใบ: MCP vs A2A vs Contract |
| 3–6 | ชี้ไฟล์ contract ที่มีอยู่ — “นี่คือ baseline” |
| 6–16 | Track A: Agent Card → ส่ง Task Dining → โชว์ผล |
| 16–18 | Fallback พูด: ถ้าพัง ห้องยังจบด้วยไฟล์ได้ |
| 18–25 | ผู้เรียนเติม worksheet · Q&A |

ถ้าเครื่อง demo พังที่นาที 8 → เปิด `examples/agent-card.dining.json` + `examples/sample-task.dining.json` แล้วย้าย Track B

## ถัดไป

- กลับเส้นทางหลัก: [Lab 8: Stop Condition](../lab-08-stop-condition/README.md)  
  หรือถ้าแทรกหลัง Lab 7 แล้วยังไม่ทำ Lab 8 ให้ไป Lab 8 ตามลำดับ  
- เทียบคู่: [Lab เสริม MCP vs CLI](../lab-optional-mcp-vs-cli/README.md)
