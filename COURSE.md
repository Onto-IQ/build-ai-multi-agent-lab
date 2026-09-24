# Course: Personal Branding Site (V4)

Template สำหรับคอร์ส **Build AI Multi-Agent with Claude Code**  
โจทย์: เว็บประชาสัมพันธ์ตัวตน + เรื่องที่สนใจ ที่ทำงานได้จริง (Contact / Guestbook API)  
Deploy: `https://<STUDENT_SLUG>.9expert.online` ผ่าน Coolify

## สี่เสาหลักของคอร์ส

| # | เสา | ความหมายสั้น | ฝึกหนักที่ |
|---|---|---|---|
| 1 | **Multi-Agent** | แต่ละตัวมี**หน้าที่**และ**ความจำแยก** (คนละ agent / คนละ CLI) | Lab 00 agents · 04 · 05 |
| 2 | **Sub-Agent** | Spawn ใช้แล้วทิ้ง — state ที่เหลือต้องอยู่ในไฟล์ `docs/` | Lab 02 · 06 a11y |
| 3 | **การประสานงาน** | ประโยชน์อยู่ที่ handoff ไฟล์ + issues / **PR** / review — คนละชั้นกัน ไม่ใช่แชทเดียวรู้หมด | Lab 03 · 04↔05 · 07 |
| 4 | **Swarm + เพดาน** | ปล่อยหลายตัวได้โดยไม่กลัวเปลือง — **หยุดที่ 20 turns** หรือเมื่อ done | Lab 05b |

**ความจำร่วม** = `docs/` + git/PR · **ความจำแยก** = เซสชัน/agent คนละตัว · **อย่า**ยัดทุกบทบาทในแชทเดียว  

**Harness memory (ไม่สร้างชั้นเอง)** — harness = ความจำถาวรที่ตัวเครื่องมือมีให้ในตัว: Claude ใช้ `memory: project` + `/memory` · OpenCode ใช้ `AGENTS.md` + resume session — ตรวจใน Lab 00 · **ห้าม**สร้างระบบส่งต่อความจำระหว่าง agent เอง

## สี่ชั้นความรู้ในโฟลเดอร์ (folder-centric)

ย้าย “ความจริงของโปรเจกต์” ออกจากแชท มาอยู่ในไฟล์ที่ทั้ง Claude และ OpenCode อ่านชุดเดียวกัน — คนละบทบาทได้ แต่**ห้าม**คนละชุดความจริง

| ชั้น | หน้าที่ | ใน repo นี้ | แก้บ่อยแค่ไหน |
|---|---|---|---|
| **Rules** | กติกาถาวร | `AGENTS.md` · `CLAUDE.md` · skill `public-site-safe` | น้อย |
| **Context** | ภาพรวม / ขอบเขต | `COURSE.md` · `docs/PROFILE.md` · `docs/DECISIONS.md` | เป็นระยะ |
| **State** (Hot) | ทำถึงไหน · งานค้าง · blockers | `docs/STATUS.md` · `docs/OPEN_LOOPS.md` | ทุก session |
| **Artifacts** | ชิ้นงานจริง | `src/` · `tests/` · `docs/QA.md` · PR | ตลอดเวลา |

**Proposed vs Approved:** brainstorm / โต้วาทีอยู่ที่ `docs/DEBATE.md` — สิ่งที่อนุมัติแล้วเท่านั้นเข้า `docs/DECISIONS.md`

### Hot / Warm / Cold (งบ context)

| ระดับ | อ่านเมื่อไหร่ | ไฟล์ |
|---|---|---|
| **Hot** | ทุก session ก่อนลงมือ | `STATUS.md` · `OPEN_LOOPS.md` · handoff ล่าสุดใน `docs/handoffs/` |
| **Warm** | ตามงาน | `PROFILE` · `DECISIONS` · Ownership ใน `AGENTS.md` |
| **Cold** | ค้นเมื่อจำเป็น | `docs/_cli-*` · logs เก่า · archive |

Harness memory (Claude agent-memory / OpenCode resume) **คนละชั้น**กับ shared docs — สิ่งที่ต้องโชว์ข้าม CLI ให้เขียนลง docs ไม่สร้าง bus เอง

## Ownership

| Area | Owner tool |
|---|---|
| Project init / agents / skills | Lab 00 |
| Interview / Debate / Frontend | Claude Code (`frontend` agent + superpowers) |
| API / SQLite / Vitest | OpenCode (`backend` agent — native, v2) |
| Swarm to green (≤20 turns) | Lab 05b |
| E2E / a11y | Playwright MCP + either CLI |
| Cross-harness calls (FE ↔ BE ↔ reviewer) | headless one-shot `opencode run` / `claude -p` · ท่อ = ไฟล์ `docs/` |
| Cross-model review | `opencode run` แล้ว `claude -p` (ไม่ใช้ MCP เป็นท่อ) |
| Ship | Coolify → slug.9expert.online |

## Workflow

```text
00 Init → 01 Interview → 02 Debate → 03 Issues → 04 FE → 05 BE → 05b Swarm → 06 QA → 07 Review → 08 Ship
```

หยุดเมื่อ issue acceptance ผ่าน — หรือเมื่อ swarm ครบเพดาน 20 turns (สรุปช่องว่าง)

## Call ข้าม harness (Multi-agent ของจริง)

Agent ของเรา**คุยกันเองได้** — แต่ละตัวยังรันบน harness ตนเอง (ไม่มีตัวกลางภายนอก):

| จาก | เรียก | ด้วย | จุดในคอร์ส |
|---|---|---|---|
| Frontend (Claude) | Backend (OpenCode) | skill `opencode` → `opencode run` | Lab 04 ตรวจสัญญา API ก่อน handoff |
| Backend (OpenCode) | Frontend (Claude) | skill `claude-code` → `claude -p` | Lab 05 ตรวจการผูกฟอร์มหลังเขียว |
| รีวิวข้ามโมเดล | กันและกัน | `opencode run` + `claude -p` | Lab 07 โต้วาที 2–3 รอบ |

**กติกาเดียวกันทุก call:** headless one-shot เท่านั้น · ท่อ = ไฟล์ใน `docs/` · ฝั่งที่ถูกเรียกเขียนได้**เฉพาะไฟล์รายงาน**ที่ prompt ระบุ — ห้ามแตะไฟล์ ownership ของผู้เรียก · ผู้เรียนเป็นกรรมการปิดรอบ · ยังห้าม MCP เป็นท่อ / bus / daemon

## Native harness only

- Plugins **project scope** (Lab 00)
- Skill `public-site-safe` — ห้าม secret / เคลม deploy มั่ว / swarm เกิน 20 turns
- Persistent memory ผ่าน **harness** (Claude agent-memory · OpenCode session) — ไม่สร้างชั้น memory เอง
- Call ข้าม harness ได้ — แต่ละตัวยังรันบน harness ตนเอง (`claude -p` / `opencode run` one-shot ผ่านไฟล์) · ฝั่งที่ถูกเรียกเขียนได้เฉพาะไฟล์รายงาน
- ห้ามสร้างระบบส่งข้อความ/สถานะระหว่าง CLI เอง (เช่น ใช้ไฟล์ JSON เป็นท่อส่งงาน)
- อย่า commit `.env`, ความลับ, `node_modules`
- PR เข้า learner repo เท่านั้น

## Commands

```bash
npm install          # Lab 00 — ไม่มีใน template
cp .env.example .env
npm run dev
npm test             # smoke (เขียว)
npm run test:labs    # Lab 05 / 05b
npm run build && npm start
node scripts/create-course-issues.mjs
```

## Docs for agents

Astro: https://docs.astro.build  
Path: [`SETUP.md`](./SETUP.md) → [`labs/lab-00-project-init`](./labs/lab-00-project-init/README.md) → [`labs/README.md`](./labs/README.md)
