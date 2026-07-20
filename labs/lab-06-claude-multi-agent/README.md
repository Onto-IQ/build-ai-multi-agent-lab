# Lab 06 — Multi-Agent on Claude Code

**Outline:** Multi-Agent on Claude Code  
**Workflow stage:** Build  
**Wow:** Agent Teams (หรือ Subagents fallback) แยก context

## Goal

รันทีมบน Claude Code สำหรับงานบน sample dashboard

1. ลอง **Agent Teams** ถ้าเปิด `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` ได้  
2. ถ้าไม่ขึ้น → **Subagents** (Researcher / Reviewer / Tester) แล้วยังผ่าน Lab

## Rules

- ทีม ≤ 3–4  
- Subagents ถูกกว่า — เริ่มจากตรงนี้ถ้าไม่จำเป็นต้องให้ peers คุยกัน  
- มี JSON/file contract หรือ ownership ชัดเจนเสมอ

## Definition of Done

- [ ] มีหลักฐานรัน Teams **หรือ** Subagents
- [ ] ระบุใน learning-log ว่าเลือกแบบไหนเพราะอะไร (cost note)
- [ ] ไม่แย่งไฟล์คนละ ownership

## Fallback

Teams ล่ม / ได้แค่ subagents → ผ่าน Lab ได้ถ้ามี contract + ผลงานครบ
