# Prompt — Fix and recheck (Lab 08)

รันบน OpenCode: `--agent qa`

```text
You are OpenCode agent qa coordinating multi-round release readiness.
Fix apps/sample-dashboard/backend/status.json so the quality gate can pass:
- status must be "ok" with a clear message
- budget_tokens_limit numeric
- qa_ready true only when runs have no pending/fail and budget rule is satisfied
  (within budget OR budget_exception_ack=true after noting human/QA ack in learning-log)
Keep this within refinement round 2 maximum.
If node is available run: node shared/scripts/gate-quality.mjs
If node is missing, verify by eye, propose SETUP install, ask human — do not install silently.
Update workspace/contracts/audit-result.json to PASS if checks pass (round = 2).
If you would need a 3rd refinement round, stop and ask the human instead.
Append "## Lab 08" to workspace/learning-log.md: when to ask a human (round 3).
Do not use --agent specialist. Do not edit frontend/ to force a pass.
You may ask Backend (via notes in learning-log / handoff) to adjust runs — do not silently rewrite FE.
```
