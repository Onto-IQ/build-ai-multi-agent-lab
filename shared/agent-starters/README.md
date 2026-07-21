# Agent starters (เทมเพลต) → artifacts ใน Lab 05

| ชั้น | อยู่ที่ | ใครสร้าง |
|---|---|---|
| **Starter** | `shared/agent-starters/` (ใน repo) | คอร์ส — อ่านอย่างเดียว |
| **Artifact** | `.claude/agents/` / `.opencode/agents/` | **ผู้เรียน** สร้างผ่าน CLI/TUI ใน Lab 05 |

Checkout ใหม่จะมีแค่ Lab 01–02:

- `.claude/agents/code-reviewer.md`
- `.opencode/agents/specialist.md`

## สร้างใน Lab 05 (ไม่ทับซ้อน)

| Starter | Artifact ที่ผู้เรียนสร้าง | ห้ามสร้างที่ |
|---|---|---|
| `claude/frontend.md` | `.claude/agents/frontend.md` | `.opencode/agents/` |
| `claude/synthesizer.md` | `.claude/agents/synthesizer.md` | `.opencode/agents/` |
| `opencode/backend.md` | `.opencode/agents/backend.md` | `.claude/agents/` |
| `opencode/qa.md` | `.opencode/agents/qa.md` | `.claude/agents/` |

ทำตาม [`labs/lab-05-solo-to-team-roles/prompts/00-create-agents.md`](../../labs/lab-05-solo-to-team-roles/prompts/00-create-agents.md)

ไฟล์ artifact ทีมถูก gitignore — อย่า commit เข้า repo คอร์ส

ดูแมปเต็มใน [`AGENTS.md`](../../AGENTS.md)
