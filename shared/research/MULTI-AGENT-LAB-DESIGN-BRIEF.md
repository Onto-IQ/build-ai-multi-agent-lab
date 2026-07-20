# Multi-Agent Lab Design Brief (July 2026)

**Course:** Build AI Multi-Agent with Claude Code (VIBE-CODE-L2)  
**Lab repo:** [`build-ai-multi-agent-lab`](https://github.com/Onto-IQ/build-ai-multi-agent-lab)  
**IDE:** VS Code-first · `.env` + `.vscode` tasks  
**Product thread:** **Agent Cost Board** (`apps/sample-dashboard/`) — monitors the learner's own agents

## Pedagogy

บันไดความรู้ — แต่ละ Lab มี **ได้รับมาจาก Lab ก่อน** และ **ได้เพิ่มใน Lab นี้**  
จบ Lab 11 = ครบสูตร specialist → สิทธิ์ → memory → ทีม → ด่าน → รวมผล → Flux → Ship

## Research snapshot

### Claude Code

| Mode | Classroom rule |
|---|---|
| **Subagents** | Default / ทางเลือกเมื่อ Teams ไม่ขึ้น |
| **Agent Teams** | ลองได้; `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`; ทางเลือก = Subagents |

### OpenCode

Custom agents + permission · plugins pin ในห้อง · ทางเลือก = ลำดับมือ Frontend→Backend→QA

### Kanban

**Flux** บังคับ Lab 10 เป็นบอร์ดงาน Agent Cost Board · Multica เปรียบเทียบได้

## Contract map

| ไฟล์ | Lab |
|---|---|
| `code-review` | 01 |
| `role-cards` | 05 |
| `handoff-fe` / `handoff-be` | 06–07 |
| `audit-result` | 08 |
| `synthesize-report` | 09 |
| `kanban-snapshot` | 10 |
| `capstone-ship` | 11 |

## Anti-goals

- ไม่บังคับ Multica cloud signup  
- ไม่ให้ Agent Teams เป็นทางเดียวที่ผ่าน  
- ไม่ต่อ observability คลาวด์จริงในห้อง  
- ไม่ใช้ทริปเก่า / trip-brief เป็นเส้นทางหลัก  

## Local folder

โฟลเดอร์ local = `build-ai-multi-agent-lab`
