# Multi-Agent Personalized Trip & Dining Coordinator Lab

โปรเจกต์ Lab สำหรับหลักสูตร AI Multi-Agent Systems (2 วัน) ผู้เรียนสร้างระบบวางแผนทริปโดยแบ่งงานระหว่าง Claude Code กับ OpenCode ผ่าน JSON contracts

โครงสร้างเป็น **โฟลเดอร์ต่อ Lab** — เริ่มจาก `labs/lab-01-triage/README.md` แล้วเดินตามลำดับ

## ภาพรวมระบบ

```text
User Request
    |
    v
Claude Code: Triage / Activity
    |  workspace/contracts/trip-brief.json + activity-options.json
    v
OpenCode: Dining / Logistics Audit
    |  dining-options.json + audit-result.json
    v
Claude Code: Coordinator / Final Synthesis
    |
    v
final-itinerary.json + labs/lab-09-capstone/mockup
```

## โครงสร้าง repository

```text
labs/            Lab 01–09 แต่ละโฟลเดอร์มี README + ไฟล์ที่จำเป็น
shared/          contracts examples, mock-data, scripts
workspace/       output ของผู้เรียน (contracts + learning-log)
docs/            index สั้น ๆ ชี้ไป labs/*
```

## Mapping Lab

| Lab | โฟลเดอร์ | โฟกัส |
|---|---|---|
| 1 | [labs/lab-01-triage](labs/lab-01-triage/README.md) | Triage (Claude Code) |
| 2 | [labs/lab-02-dining](labs/lab-02-dining/README.md) | Dining (OpenCode) |
| 3 | [labs/lab-03-permission](labs/lab-03-permission/README.md) | Permission boundary |
| 4 | [labs/lab-04-memory](labs/lab-04-memory/README.md) | Memory ข้าม session |
| 5 | [labs/lab-05-team-audit](labs/lab-05-team-audit/README.md) | ทีม 3 ตัว |
| 6 | [labs/lab-06-orchestration](labs/lab-06-orchestration/README.md) | Audit → backup เป็นขั้น |
| 7 | [labs/lab-07-collab-layer](labs/lab-07-collab-layer/README.md) | Collaboration Layer |
| 8 | [labs/lab-08-stop-condition](labs/lab-08-stop-condition/README.md) | Loop vs stop |
| 9 | [labs/lab-09-capstone](labs/lab-09-capstone/README.md) | Capstone + Mockup |

## เริ่มต้นอย่างเร็ว

ตรวจ environment:

```bash
node --version
claude --version
opencode --version
```

ตรวจ JSON ใน shared / labs / workspace:

```bash
node shared/scripts/validate-json.mjs
```

สำคัญ: เปิด Claude Code / OpenCode ที่ **root ของ repository** เสมอ path ใน prompt อ้างจาก root

## สัญญาการทำงานร่วมกัน

ห้าม Agent สองฝั่งแก้ไฟล์เดียวกันพร้อมกัน

- Claude Code เป็นเจ้าของ: `trip-brief.json`, `activity-options.json`, `final-itinerary.json`
- OpenCode เป็นเจ้าของ: `dining-options.json`, `audit-result.json`

รายละเอียด schema: [shared/contracts/README.md](shared/contracts/README.md)

## Definition of Done (Lab 9)

รับคำขอภาษาไทย มี trip brief, ข้อเสนอ activity/dining, audit งบ/เวลา, fallback อย่างน้อยหนึ่งกรณี, refinement ≤ 2 รอบ, final itinerary + Mockup พร้อม assumptions และไม่ยืนยันจองจริงจาก mock data
