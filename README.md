# Build AI Multi-Agent Lab (V2)

ยินดีต้อนรับสู่ Lab หลักสูตร **Build AI Multi-Agent with Claude Code & OpenCode**  
เป้าหมายของคอร์สนี้ไม่ใช่แค่การนั่งดู AI ตอบแชท แต่คือการ **สวมบทบาท Lead Architect สั่งงานทีม AI Multi-Agent บนเครื่องตัวเอง** เพื่อสร้างเว็บเทรดจำลองระดับโปรดักชัน (**Paper Crypto Trade Desk**) และพาขึ้นระบบจริง (Ship to Public URL)

---

## 🧭 แผนที่ภาพรวม (Architecture & Mental Model)

ระบบที่เราจะสร้างและใช้งานตลอด 2 วันประกอบด้วย 3 เลเยอร์หลัก:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        WATCH LAYER (จอมอนิเตอร์)                        │
│   [จอใกล้: เครื่องมือแท้]                  [จอรวม: ภาพรวมข้ามเครื่องมือ]   │
│   • claude agents (Agent View)          • Command Center (:4174)       │
│   • OpenCode TUI sessions                 - เส้นเวลา & ลูกศร CLI         │
│                                           - done-when Checklist        │
└───────────────────▲──────────────────────────────────▲─────────────────┘
                    │                                  │
┌───────────────────┴──────────────────────────────────┴─────────────────┐
│                    NATIVE AGENT HARNESS (ตัวขับเคลื่อน)                 │
│   Claude Code (Frontend / Reviewer)     OpenCode (Backend / QA)        │
│   • .claude/agents/frontend.md          • .opencode/agents/backend.md  │
│   • .claude/skills/paper-only           • Build Mode vs Plan Mode (Tab)│
│   • Claude Agent Teams / Subagents      • Multi-model & @ references   │
│         ▲                                      ▲                       │
│         └─────── opencode run (CLI) ───────────┘                       │
│         ┌─────── claude -p    (CLI) ───────────┐                       │
└─────────┼──────────────────────────────────────┼───────────────────────┘
          │                                      │
┌─────────▼──────────────────────────────────────▼───────────────────────┐
│                       PRODUCT (สินค้าจริงที่ต้องส่งมอบ)                   │
│   Paper Crypto Trade Desk (Vite + React + Express + JSON Ledger)       │
│   • Frontend (:4173) : Ticker, Order Ticket, Portfolio, History        │
│   • Backend (:4180)  : CoinGecko Feed / Fixture Fallback / Ledger API  │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🖥️ วิธีจัดโต๊ะทำงาน (Recommended Workspace Layout)

เพื่อให้ทำงานกับ Multi-Agent ได้อย่างราบรื่น ไม่งงหน้าต่าง แนะนำจัดพื้นที่หน้าจอดังนี้:

```text
┌───────────────────────────┬────────────────────────────────────────────┐
│      VS Code (จอซ้าย)     │         Windows Terminal (จอรอบข้าง/ขวา)    │
│  • เปิดโฟลเดอร์ lab root   │  [Tab 1]: BE  (node server :4180)          │
│  • ดูโค้ด Git, diff, ไฟล์  │  [Tab 2]: FE  (vite dev :4173)             │
│  • เปิดเบราว์เซอร์ดูผลงาน   │  [Tab 3]: CC  (API :4181 + UI :4174)       │
│                           │  [Tab 4]: AGENT 1 (claude / claude agents) │
│                           │  [Tab 5]: AGENT 2 (opencode TUI)           │
└───────────────────────────┴────────────────────────────────────────────┘
```

---

## 🎯 โครงห้อง vs งานของผู้เรียน (เราเตรียมอะไร คุณทำอะไร)

| สิ่งที่ห้องเตรียมให้ (Scaffolding) | สิ่งที่ผู้เรียนต้องลงมือทำเอง (Learner's Drive) |
|---|---|
| • แผง UI โครงสร้างพร้อม แต่จงใจเว้นว่างไว้<br>• Specialist Agents & Skills ประจำเครื่องมือ<br>• พรอมต์ตั้งต้นสำหรับแต่ละขั้นตอน (`labs/*/prompts/`)<br>• เกณฑ์วัดความสำเร็จร่วมกัน (`done-when` Checklist) | • **คุยและสัมภาษณ์ต่อกับ Agent** (ไม่หยุดแค่ Copy-Paste พรอมต์แรก)<br>• **ตัดสินใจ Plan & Approve** สถาปัตยกรรมย่อยของแอป<br>• **ทดลองสั่งงานหลาย Turn** และแก้ไขเมื่อ Agent หลงทาง<br>• **แข่งขันปรับแต่ง UX/UI & ฟีเจอร์ Paper** เพื่อนำไปโชว์ใน Lab 07 |

---

## 🏆 เกณฑ์การแข่งขันโชว์ของ (Showcase & Competition Rubric - Lab 07)

ตอนท้ายของคอร์ส ทุกคนจะมีสิทธิ์นำเสนอ Trade Desk ของตัวเองบน Public URL จริง 3–5 นาที โดยให้คะแนนตาม 4 มิติ:

1. **Functional Completion (ความครบถ้วน):** เกณฑ์ใน `done-when` ทั้ง 6 ข้อเขียวครบ ทำงานได้จริงบน URL สาธารณะ
2. **UX & UI Craftsmanship (ความประณีต):** การออกแบบหน้าจอให้อ่านง่าย มีสถานะ Loading/Error/Feed badge ที่ชัดเจน สวยงาม
3. **Agent Orchestration Mastery (ชั้นเชิงการสั่งงาน):** มีบันทึกลูกศร CLI ข้ามเครื่องมือใน Command Center ชัดเจน การใช้ Specialist ได้ถูกงาน
4. **Architectural Pitch (การนำเสนอ):** เล่ากระบวนการ Interview → Plan → Build → Test → Ship วิธีแก้ปัญหาเวลา Agent ติดขัด

---

## 🗺️ เส้นทางการเรียนรู้ 7 ก้าว (Lab Roadmap)

```text
[SETUP] เตรียม 4 เซิร์ฟเวอร์ + เช็ก claude agents & opencode
   │
   ▼
[Lab 01] Claude Code Harness ──► ปลุก Frontend Specialist + จัดการ Ticker Badge
   │
   ▼
[Lab 02] OpenCode Harness   ──► ใช้ Plan Mode วิเคราะห์ + ปลุก Backend Feed & Wallet
   │
   ▼
[Lab 03] Cross-CLI Dispatch ──► สะพานข้ามเครื่องมือ Claude สั่ง OpenCode ผ่าน CLI
   │
   ▼
[Lab 04] Security & Paper   ──► ทดสอบขอบเขต Deny Rules & Safe Paper Trading
   │
   ▼
[Lab 05] Claude Swarm       ──► ปล่อยทีมหลาย Turn (Teams / Subagents) เติมออเดอร์
   │
   ▼
[Lab 06] Cross-Tool Swarm   ──► ผสานสองเครื่องมือนำทัพจน done-when ครบทุกข้อ
   │
   ▼
[Lab 07] Ship & Showcase    ──► Build + Deploy URL จริง + ขึ้นเวทีโชว์แข่งขัน
```

---

## 📁 โครงสร้างโฟลเดอร์

```text
build-ai-multi-agent-lab/
├── apps/
│   ├── trade-desk/           # แอปสินค้าหลัก (Frontend Vite + Backend Express)
│   │   ├── frontend/         # โค้ด UI (เจ้าของหลัก: Claude Code / Frontend Agent)
│   │   └── backend/          # โค้ด API & Ledger (เจ้าของหลัก: OpenCode / Backend Agent)
│   └── command-center/       # จอภาพรวมข้ามเครื่องมือ (บาง ไม่เก็บ state ซับซ้อน)
├── .claude/
│   ├── agents/               # นิยาม Specialist ของ Claude (frontend.md, reviewer.md)
│   ├── skills/               # Reusable Skills (paper-only, done-when, dispatch-*, log-dispatch)
│   └── settings.json         # สิทธิ์ Native Deny Rules (ความปลอดภัย)
├── .opencode/
│   └── agents/               # นิยาม Specialist ของ OpenCode (backend.md, qa.md)
├── labs/                     # คำแนะนำและพรอมต์ประจำแต่ละ Lab (lab-01 ถึง lab-07)
├── workspace/
│   ├── command-center/       # events.jsonl (ประวัติ CLI) และ checklist.json
│   └── learning-log.md       # สมุดบันทึกผลการทดลองประจำตัวผู้เรียน
├── AGENTS.md                 # กติการ่วมข้ามเครื่องมือ (Specialist boundary)
├── CLAUDE.md                 # กฎประจำโปรเจกต์สำหรับ Claude Code
└── SETUP.md                  # คู่มือเตรียมเครื่องเริ่มต้นอย่างละเอียด
```

---

## 🚀 เริ่มต้นใช้งาน

เปิดอ่านคู่มือเตรียมเครื่องที่ [`SETUP.md`](SETUP.md) แล้วเริ่มลงมือได้ทันที!
