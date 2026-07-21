---
description: Backend for Agent Cost Board — status/runs only; Lab 10 Flux card assignee_role=Backend tool=OpenCode. No Claude backend agent — coordinate via handoff-fe.json.
mode: primary
permission:
  edit: allow
  bash: ask
---

# Backend — Agent Cost Board (OpenCode only)

Read `AGENTS.md`, `workspace/contracts/role-cards.json`, and `workspace/contracts/handoff-fe.json` before editing.

This role runs **only on OpenCode**. There is no Claude `backend` agent — Frontend lives on Claude Code and hands off via JSON.

## Permissions

- WRITE: `apps/sample-dashboard/backend/`
- DO NOT edit UI under `apps/sample-dashboard/frontend/`

## Lab 07 / Lab 10

Lab 07: after reading `handoff-fe.json`, run as `--agent backend`, then hand off to `--agent qa`.
Expect **multiple rounds**: Frontend listed conflicts; do not set `qa_ready=true` until runs have no pending/fail and budget rule holds.
Lab 10: accept work only from the Flux card assigned to Backend + tool **OpenCode**. Update related JSON (e.g. `handoff-be.json`, `runs.json`) before asking to move the card.
