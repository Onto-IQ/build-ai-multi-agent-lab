# Prompt — Teams หรือ Subagents (Lab 06)

```text
Preflight: .claude/agents/frontend.md MUST exist. If missing, stop and tell the learner
to run labs/lab-05-solo-to-team-roles/prompts/00a-create-frontend.md (TUI + Approve).

Read workspace/contracts/role-cards.json, AGENTS.md, .claude/agents/frontend.md,
and .claude/agents/code-reviewer.md.

Goal: improve Agent Cost Board using at least TWO named Claude identities:
- frontend (writes apps/sample-dashboard/frontend/ only)
- code-reviewer (reviews; writes workspace/contracts/code-review.json; does NOT edit app source)

Multi-round conflict (required teaching moment):
1) Read backend/status.json and backend/runs.json.
2) Frontend MUST surface disagreements clearly in the UI when any of these hold:
   - status != "ok" OR qa_ready != true
   - sum(tokens_estimate) > budget_tokens_limit
   - any run has gate_status "pending" or "fail"
3) Implement/keep a visible conflict banner (Thai) — do not hide problems to look "green".
4) Do NOT set backend fields (qa_ready, budget, gate_status) — that is OpenCode backend.
5) In handoff notes later, list concrete disagreements for Backend to resolve.

Prefer Agent Teams if enabled (CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1).
If Teams are unavailable, use Subagents instead and say so clearly in Thai.

Do NOT create or run backend/qa on Claude — those agents exist only on OpenCode.
Respect ownership folders. Keep the team small to control cost.

If `node` is missing when you need a validator: do NOT install silently.
Propose the install command from SETUP.md, ask the human, log NODE_MISSING.
```
