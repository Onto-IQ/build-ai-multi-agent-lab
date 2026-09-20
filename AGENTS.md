# Agents

กติการ่วมสำหรับ Claude Code และ OpenCode — ใช้ native agents ของแต่ละเครื่องมือ

## บทบาท

| ชื่อ | เครื่องมือ | โฟลเดอร์ |
|---|---|---|
| `frontend` | Claude Code (`.claude/agents/frontend.md`) | `apps/trade-desk/frontend/` |
| `reviewer` | Claude Code (`.claude/agents/reviewer.md`) | อ่านอย่างเดียว |
| `backend` | OpenCode (`.opencode/agents/backend.md`) | `apps/trade-desk/backend/` |
| `qa` | OpenCode (`.opencode/agents/qa.md`) | checklist / รายงาน |
| Build / Plan | OpenCode built-in | Plan ห้ามแก้ไฟล์โดยไม่ถาม |

## Skills ร่วม

วางที่ `.claude/skills/` — OpenCode โหลดได้

- `paper-only`
- `dispatch-opencode`
- `dispatch-claude`
- `log-dispatch`
- `done-when`

## JSON vs Command Center

| เมื่อไหร่ | ใช้อะไร |
|---|---|
| ฟัง agent คุย / เปิด transcript | **native** (`claude agents` / OpenCode session) |
| มองข้ามเครื่องมือ + เกณฑ์ผ่าน | **Command Center** |
| ส่งงานข้ามเครื่องมือ | **CLI** ไม่ใช่สัญญา JSON กลาง |

## โครง vs สั่งงาน

Agent + skill + แผงว่าง = ของห้อง  
ผู้เรียนเป็นคน Interview / Plan / สั่งต่อ — อย่าทำโจทย์ให้จบในพรอมต์เดียวถ้าผู้เรียนยังคุยต่อได้  
ผลงานแต่ละเครื่องไม่ต้องเหมือนกัน เกณฑ์ร่วมอยู่ที่ skill `done-when`

## ห้าม

- แก้ไฟล์คนละฝั่งพร้อมกัน
- สร้าง harness กลางแทน Skills/Agents ของเครื่องมือ
- บังคับ Flux / tmux เป็นเกณฑ์ผ่าน
- ทำ Trade Desk ให้ “เหมือนคำตอบกลางของห้อง” จนทุกเครื่องหน้าตาเดียวกันโดยผู้เรียนไม่ได้สั่ง
