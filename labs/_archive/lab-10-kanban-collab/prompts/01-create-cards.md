# Prompt — แตกการ์ด Flux (Lab 10, go-live)

```text
Preflight: read workspace/contracts/role-cards.json and AGENTS.md.
Standard: go-live, not POC.

Using Flux MCP on Agent Cost Board:
1) get_board / list columns Interview→Plan→Build→Test→Ship
2) Move any extra non-primary cards to Trash (keep WIP = 3).
3) Ensure exactly THREE active cards: Frontend, Backend, QA.
   - use board UUID from get_board.id for create_card
   - description MUST include:
     Assignee: <Frontend|Backend|QA> | Tool: <Claude Code|OpenCode> | Contract: <workspace/contracts/...>
4) Do NOT create cards just to inflate count.
5) Do NOT move cards in this step except Trash cleanup.

Reply Thai: the 3 card ids, assignees, tools, columns.
```
