# Paper Crypto Trade Desk Lab

โปรเจกต์นี้คือ lab ของหลักสูตร **Build AI Multi-Agent with Claude Code (V2)**  
สินค้า: **Paper Crypto Trade Desk** (`apps/trade-desk/`)  
จอรวม: **Command Center** (`apps/command-center/`) — ไม่ใช่สินค้า

## ที่นั่งทำงาน

- **VS Code** — เปิดโฟลเดอร์ lab root · ดูไฟล์ / Git / เบราว์เซอร์
- **Windows Terminal แยก** — `claude` · `claude agents` · `opencode` (อย่ารัน TUI ใน Integrated Terminal เป็นหลัก)

## ลำดับงาน

Interview → Plan → Build → Test → Ship  
หยุดเมื่อ skill `done-when` ครบ หรือหมดเวลาห้อง — ไม่จำกัดแก้ 2 รอบ

โครงในแต่ละ Lab พร้อมแล้ว — **ผู้เรียนเป็นคนคุยกับ agent ต่อ** ไม่ใช่คัดลอกแล้วจบ  
เกณฑ์ร่วม (`done-when`) เหมือนกันทุกคน · เหนือกว่านั้นเป็นผลงานแข่งโชว์ตอน Lab 07

## สิทธิ์เขียนไฟล์

| บทบาท | เขียนได้ | ห้ามเขียน |
|---|---|---|
| Frontend | `apps/trade-desk/frontend/` | `backend/` |
| Backend | `apps/trade-desk/backend/` | `frontend/` |
| QA / Reviewer | รายงาน + checklist | โค้ดเพื่อข้ามเกณฑ์ผ่าน |
| ผู้เรียน | `workspace/` สำหรับผล Lab | อย่า commit `.env` |

## Native harness

- Skills: `.claude/skills/` (OpenCode อ่านได้)
- Agents: `.claude/agents/` · `.opencode/agents/`
- สั่งข้ามเครื่องมือ: `opencode run --agent …` / `claude -p --agent …`
- จอใกล้: `claude agents` / OpenCode session บนเครื่องผู้เรียน
- จอรวม: Command Center อ่าน events + checklist

## กฎสำคัญ

1. Paper only — ไม่ส่งออเดอร์จริง · ไม่ขอ API key เทรด
2. ผู้เรียนทำบนเครื่องตัวเอง — สั่ง agent เอง · ห้ามผ่าน Lab ด้วยการดูจอวิทยากร
3. ห้ามยืนยัน deploy สำเร็จถ้ายังไม่มี URL จริง
4. เริ่มที่ `SETUP.md` แล้วทำ Lab 01–07 ตามลำดับ
5. ห้ามบังคับ tmux ในห้อง Windows

## Go-live

| ผ่าน | ไม่ผ่าน |
|---|---|
| Trade Desk บน localhost จากเครื่องผู้เรียน | ดูของวิทยากรอย่างเดียว |
| Command Center มีลูกศร CLI ของผู้เรียน (Lab 03+) | snapshot ปลอม |
| `done-when` ครบหรือหมดเวลาแล้วยัง ship ของที่ทำได้ | ยืนยัน ship โดยไม่มี URL |
| ผู้เรียนโชว์ URL ของตัวเอง | วิทยากรเดโมแทน |
