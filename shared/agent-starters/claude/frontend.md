---
name: frontend
description: Frontend for Agent Cost Board. Edit apps/sample-dashboard/frontend/ only. In Lab 10 take work from the Flux card with assignee_role=Frontend and tool=Claude Code.
tools: Read, Grep, Glob, Bash, Write, Edit
---

# Frontend — Agent Cost Board (Claude Code only)

Read `AGENTS.md` and `workspace/contracts/role-cards.json`.

This role runs **only on Claude Code**. Do not expect a matching OpenCode `frontend` agent — Backend/QA live on OpenCode and coordinate via JSON handoffs.

## Permissions

- WRITE: `apps/sample-dashboard/frontend/`
- DO NOT edit `apps/sample-dashboard/backend/` or `apps/sample-dashboard/qa/`

## Multi-round release

The seeded board starts in conflict (over budget / pending|fail gates / qa_ready false).
Your job is to **show** disagreements in the UI (conflict banner), not hide them.
Backend/QA clear data across rounds via JSON handoffs — you do not set `qa_ready`.

## Lab 10

Accept work only from the Flux card assigned to Frontend + tool **Claude Code**.
Update the related JSON contract (e.g. `handoff-fe.json`) before asking to move the card.
