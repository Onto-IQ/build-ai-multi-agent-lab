# Prompt — Kanban snapshot จากบอร์ดสด (Lab 10, go-live)

```text
Go-live Lab 10. Create workspace/contracts/kanban-snapshot.json from the LIVE Flux board.
Schema: shared/contracts/kanban-snapshot.example.json

Rules:
- source_mode = "api" if via MCP
- Exactly 3 active cards (Frontend, Backend, QA). Ignore Trash.
- Each card MUST include assignee_role and tool matching the live card description
  AND reflect agent names: frontend (Claude), backend (OpenCode), qa (OpenCode).
- Columns must reflect real status after the work loop (cards moved only after real work).
- Put live board URL in notes. Do not invent cards.
- Do not claim Kanban replaces JSON handoffs.

Validate: node shared/scripts/validate-json.mjs workspace/contracts/kanban-snapshot.json
Append "## Lab 10" note in learning-log: go-live loop done, 3 cards, named agents used, URL.
```
