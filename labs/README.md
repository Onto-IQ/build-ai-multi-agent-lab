# Labs V4 — ลำดับการเรียน

Repo นี้ = สินค้า (Astro) + Labs  
Template: https://github.com/Onto-IQ/build-ai-multi-agent-lab  
SETUP: [`../SETUP.md`](../SETUP.md) · สี่เสา: [`../COURSE.md`](../COURSE.md)

ทำที่ **root** · เปิด **VS Code/Cursor** คู่ **Windows Terminal**

| Lab | Folder | เสาที่ฝึก | ผ่านเมื่อ |
|---|---|---|---|
| 00 | [`lab-00-project-init`](lab-00-project-init/) | 1 Multi-Agent | `node_modules` + project plugins + agents + Hot state (`STATUS`/`OPEN_LOOPS`) + consistency check |
| 01 | [`lab-01-interview`](lab-01-interview/) | — | `docs/PROFILE.md` + Brainstorm |
| 02 | [`lab-02-debate`](lab-02-debate/) | 2 Sub-Agent | `DEBATE.md` + `DECISIONS.md` (spawn แล้วทิ้ง) |
| 03 | [`lab-03-plan-issues`](lab-03-plan-issues/) | 3 ประสาน | Issues จาก DECISIONS |
| 04 | [`lab-04-frontend`](lab-04-frontend/) | 1 + 3 | 4 หน้า + PR + call BE ตรวจสัญญา + handoff `04-claude-to-opencode` |
| 05 | [`lab-05-backend`](lab-05-backend/) | 1 + 3 | `test:labs` เขียว + call FE ตรวจฟอร์ม + PR + อ่าน handoff/STATUS |
| 05b | [`lab-05b-swarm-to-green`](lab-05b-swarm-to-green/) | 4 Swarm | Swarm ≤ **20 turns** + บันทึกใน `docs/SWARM.md` |
| 06 | [`lab-06-playwright`](lab-06-playwright/) | 2 | E2E + `docs/QA.md` |
| 07 | [`lab-07-cross-model-review`](lab-07-cross-model-review/) | 3 | โต้วาทีข้ามโมเดล 2–3 รอบ + PR comment + Canonical state checklist |
| 08 | [`lab-08-ship`](lab-08-ship/) | — | URL 200 + API |

## วิธีอ่านแต่ละ Lab

| ไฟล์ | สำหรับใคร | ใส่อะไร |
|---|---|---|
| **`README.md`** | คุณ | ขั้นทำ, VS Code check, ความรู้ติดตัว |
| **`prompts/*.md`** | โมเดล | เฉพาะในกรอบ \`\`\`text |

**คำสั่งคน ≠ prompt โมเดล** · **plugin/agents ผูก repo**

## Shared state ใน `docs/` (Hot)

| ไฟล์ | หน้าที่ |
|---|---|
| [`STATUS.md.example`](../docs/STATUS.md.example) | snapshot ทำถึงไหน — อ่านทุก session · copy เป็น `STATUS.md` ใน Lab 00 |
| [`OPEN_LOOPS.md.example`](../docs/OPEN_LOOPS.md.example) | งานค้าง + owner · copy เป็น `OPEN_LOOPS.md` ใน Lab 00 |
| [`handoffs/`](../docs/handoffs/) | ส่งต่อข้าม Claude ↔ OpenCode โดยไม่เล่าปากเปล่า |

สร้างใน **Lab 00** · อัปเดตเมื่อสถานะเปลี่ยน · single-writer ตาม [`AGENTS.md`](../AGENTS.md) · รายละเอียดชั้น Rules/Context/State/Artifacts ดู [`COURSE.md`](../COURSE.md)
