# Prompt — Role cards (Lab 05)

```text
Create workspace/contracts/role-cards.json for Agent Cost Board
using shared/contracts/role-cards.example.json as the schema.

Roles required: Frontend, Backend, QA
project_id must be "agent-cost-board".

Lock tools — agents must NOT overlap across tools:
- Frontend: tool "Claude Code", agent "frontend"
- Backend: tool "OpenCode", agent "backend"
- QA: tool "OpenCode", agent "qa"
Include "tool" and "agent" on each role (match the example).
Ensure no two roles write the same folder.

Also append to workspace/learning-log.md under "## Lab 05" a markdown table
foreshadowing Flux Lab 10 with columns:
role | write folder | agent name | tool on Flux card | future card title.
Do NOT open or call Flux in this lab.
Write a short Thai summary of ownership after saving the file.
```
