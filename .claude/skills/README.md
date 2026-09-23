# Skills (V3)

ห้อง**ไม่**วาง skill orchestration ของตัวเองใน path ใช้งานแล้ว

ชุด V2 (`dispatch-*`, `done-when`, `log-dispatch`, `paper-only`) ถูกย้ายไป [\_archive/](_archive/)

## ใช้แทน

| แหล่ง | วิธีติดตั้ง |
|---|---|
| obra/superpowers | ใน Claude: `/plugin install superpowers@claude-plugins-official` |
| oh-my-openagent | `bunx oh-my-openagent@4.19.4 install …` (ดู SETUP.md) |
| สิทธิ์ paper-only | native `.claude/settings.json` + OpenCode permission (Lab 04) |
| เกณฑ์ผ่าน | acceptance criteria ใน GitHub issue + เทสใน `course/` |

อย่าสร้างชั้นกลางส่งงานระหว่าง Claude กับ OpenCode ยกเว้น one-shot review ใน Lab 07
