# Prompt — Handoff contract (Lab 06)

```text
Read first: workspace/contracts/role-cards.json and shared/contracts/handoff-fe.example.json.
JSON contracts are the source of truth for handoffs — do not use Kanban cards as a substitute.

Write workspace/contracts/handoff-fe.json using the example as the schema.

Describe what Claude Code agent "frontend" finished and what OpenCode agent "backend"
must fix next. project_id = agent-cost-board.

Required handoff content (multi-round):
- List open conflicts seen on the board (budget overrun, pending/fail gates, qa_ready false, status not ok).
- State what Backend must change in status.json / runs.json before QA can pass.
- State clearly that OpenCode will pick this up in Lab 07 as:
  --agent backend  then  --agent qa
(Do NOT tell OpenCode to run a frontend agent — Frontend stays on Claude.)

Do not claim Flux cards replace this handoff.
Do not claim the board is ship-ready if conflicts remain.

Then validate with: node shared/scripts/validate-json.mjs workspace/contracts/handoff-fe.json
If node is missing: propose install per AGENTS.md Node policy, ask human, do not install silently.
```
