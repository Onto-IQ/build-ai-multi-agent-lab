# Prompt — แตกการ์ด Flux (Lab 10, go-live)

```text
Preflight: confirm .claude/agents/frontend.md exists (Lab 05 TUI). Confirm Flux MCP ready.
Standard: go-live, not POC. Agents must NOT overlap across tools.

Using Flux MCP on Agent Cost Board:
1) get_board / list columns Interview→Plan→Build→Test→Ship
2) Move any extra non-primary cards to Trash (keep WIP = 3).
3) Ensure exactly THREE active cards with LOCKED mapping:
   - Frontend | Tool: Claude Code | Agent: frontend | Contract: handoff-fe.json
   - Backend  | Tool: OpenCode    | Agent: backend  | Contract: handoff-be.json
   - QA       | Tool: OpenCode    | Agent: qa       | Contract: audit-result.json
   description MUST include:
   Assignee: <role> | Tool: <...> | Agent: <frontend|backend|qa> | Contract: <path>
4) Do NOT create a Synthesizer card (not a 4th WIP).
5) Do NOT create cards just to inflate count.
6) Do NOT move cards in this step except Trash cleanup.

Reply Thai: the 3 card ids, assignees, tools, agent names, columns.
```
