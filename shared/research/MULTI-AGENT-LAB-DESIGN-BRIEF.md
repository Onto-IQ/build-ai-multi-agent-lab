# Multi-Agent Lab Design Brief (V2)

**Course:** Build AI Multi-Agent with Claude Code (VIBE-CODE-L2)  
**Lab repo:** [`build-ai-multi-agent-lab`](https://github.com/Onto-IQ/build-ai-multi-agent-lab)  
**ที่นั่ง:** VS Code (โปรเจกต์) + Windows Terminal แยก (TUI agent) · Node + git (**ไม่ใช้** Python venv)  
**Product:** **Paper Crypto Trade Desk** (`apps/trade-desk/`) — public price feed · paper orders เท่านั้น  
**Watch:** จอใกล้ = native · จอรวม = Command Center บาง (`apps/command-center/`)  
**มาตรฐานคอร์ส:** **go-live ไม่ใช่ POC** · ผู้เรียนทำบนเครื่องตัวเอง · URL สาธารณะจริงตอนจบ

## ทำไม redesign

รอบก่อนผู้เรียนได้ทฤษฎีและ harness ที่ห้องสร้างเอง (JSON contracts, gate 2 รอบ, Flux) มากกว่าทักษะที่เอาไปใช้วันจันทร์  
โจทย์ Agent Cost Board ไม่ใช่เว็บที่คุ้น · ด่านต้นทุนตัด swarm ก่อนงานเสร็จ

หลักการ V2: **ใช้ของที่เครื่องมือมีอยู่แล้ว · สั่งงานแบบโปรเจกต์จริง · หยุดเมื่อสินค้าผ่านเกณฑ์ · ผู้เรียนลงมือเอง**

## Pedagogy

บันไดความรู้ — แต่ละ Lab มี **ได้รับมาจาก Lab ก่อน** และ **ได้เพิ่มใน Lab นี้**  
สูตรห้อง: **โชว์สั้น (≤2 นาที ถ้าจำเป็น) → ผู้เรียนทำ → มีของเห็นบนเครื่องเขา → ทวนจากของเขา**

**โครงครบทุกขั้น** (แผงว่าง · agent · skill · พรอมต์เริ่ม) — **ผู้เรียนเป็นคนคุยกับ agent ต่อ**  
พรอมต์ไม่ใช่คำตอบสำเร็จรูป · เกณฑ์ร่วม = `done-when` · **Lab 07 โชว์แข่งผลงานคนละเครื่อง**

จบ Lab 07 = ครบสูตร harness → CLI ข้ามเครื่องมือ → สิทธิ์ → swarm → Ship URL จริงของตัวเอง

## Research snapshot (กลางปี 2026)

### Claude Code

| Mode | Classroom rule |
|---|---|
| **Agent View** (`claude agents`) | บังคับ — ผู้เรียนเปิดเอง (v2.1.139+) |
| **Subagents** | ทางผ่านเมื่อ Teams ไม่ขึ้น |
| **Agent Teams** | ลองได้; `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`; in-process panel ไม่บังคับ tmux |
| **Skills** | `.claude/skills/*/SKILL.md` — ชุดเดียวกับ OpenCode |
| **Headless CLI** | `claude -p --agent …` ให้ OpenCode เรียก |

Split-pane tmux **ไม่ทำงาน** ใน VS Code / Windows Terminal — ห้ามบังคับผู้เรียน

### OpenCode

| Mode | Classroom rule |
|---|---|
| **Build / Plan** | บังคับใช้ของ native (Tab สลับ) |
| **Subagents `@`** | ใช้เมื่อแยกงาน |
| **Skills** | อ่าน `.claude/skills/` ได้ |
| **CLI** | `opencode run --agent …` ให้ Claude เรียก |
| **Multi-model** | `-m` ได้เมื่อห้องจัดบัญชี |

### Watch layer (ไฮบริด)

| จอ | ใครใช้ | ทำอะไร |
|---|---|---|
| จอใกล้ | ผู้เรียนในเครื่องมือ | `claude agents` / Teams panel / OpenCode child session — ฟังคุยจริง |
| จอรวม | Command Center บางใน lab | roster ข้ามเครื่องมือ · ลูกศร CLI · ช่องว่างเกณฑ์ผ่าน · เส้นเวลาทั้งวัน |
| ข้อยกเว้นเดโม | วิทยากรเท่านั้น | tmux/cmux 30–60 วินาที แล้วผู้เรียนเปิด Agent View เอง |

ไม่บังคับ Vibe Kanban / oomp / Oh My OpenAgent เป็นเกณฑ์ผ่าน

### สแต็กเว็บ

Vite + React + Tailwind · `frontend/` แยกจาก `backend/` (Express + JSON ledger)  
Starter = โครงที่ดูแบบเทรดแล้ว แผงยังว่าง + offline price fixture  
Command Center ใช้สแต็กชุดเดียวกัน แต่หน้าเดียวบาง

## Outline map (9 หัวข้อ)

| Outline | Lab | หลักฐานบนเครื่องผู้เรียน |
|---|---|---|
| 1 โจทย์และจอมองทีม | เปิดสองจอ + `claude agents` | ตาราง Agent View ว่างบนเครื่องเขา |
| 2 SETUP | SETUP.md | สอง URL localhost จากเครื่องเขา |
| 3 Claude harness | Lab 01 | ชิ้นแรกบน Trade Desk + session ใน Agent View |
| 4 OpenCode harness | Lab 02 | ราคาหรือ fixture ชัดบนแผง |
| 5 สั่งข้าม CLI | Lab 03 | ลูกศร CLI ใน Command Center ของเขา |
| 6 สิทธิ์ + paper-only | Lab 04 | agent ถูกกันเมื่อสั่งสิ่งที่ห้าม |
| 7 Claude swarm | Lab 05 | มากกว่าหนึ่งแถว/teammate บนเครื่องเขา |
| 8 Swarm ข้ามเครื่องมือ | Lab 06 | `done-when` เขียวบน Trade Desk ของเขา |
| 9 Ship | Lab 07 | URL สาธารณะจริง + ผู้เรียนโชว์ |

## Skill ชุดห้อง

| Skill | หน้าที่ |
|---|---|
| `paper-only` | ห้าม private/trading endpoint · ห้ามขอ API key เทรด |
| `dispatch-opencode` | เรียก `opencode run --agent …` จาก Claude |
| `dispatch-claude` | เรียก `claude -p --agent …` จาก OpenCode |
| `log-dispatch` | บันทึกเฉพาะตอนเรียก CLI ข้ามเครื่องมือ |
| `done-when` | เกณฑ์ผ่าน Trade Desk · ใครปิดข้อสุดท้ายได้หยุด |

## Anti-goals

- ไม่บังคับ Multica / Flux / Vibe Kanban / oomp เป็นเกณฑ์ผ่าน  
- ไม่ให้ Agent Teams เป็นทางเดียวที่ผ่าน  
- ไม่สร้าง JSON contracts เป็นชั้น orchestration  
- ไม่จำกัดแก้ไม่เกิน 2 รอบเป็นเกณฑ์ผ่าน (swarm จนเกณฑ์ผ่านหรือหมดเวลาห้อง)  
- ไม่ยืนยัน deploy สำเร็จโดยไม่มี URL จริง  
- ไม่ผ่าน Lab ด้วยการดูจอวิทยากร / ก๊อปจาก buddy / มีแต่ learning-log ไม่มีของจับต้องได้  
- ไม่ส่งออเดอร์จริง · ไม่ขอ API key เทรด · ไม่ wallet connect  

## Local folder

โฟลเดอร์ local = `build-ai-multi-agent-lab`
