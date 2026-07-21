# Prompt — Auditor FAIL (Lab 08)

รันบน OpenCode: `--agent qa`

```text
You are OpenCode agent qa (Auditor) for Agent Cost Board.
Assume quality gate just failed because status.json is broken (status is not ok).

Write workspace/contracts/audit-result.json with status FAIL,
at least one violation, round = 1, max_refinement_rounds = 2.
Follow shared/contracts/audit-result.example.json fields.
recommended_action should tell humans what to fix.
Do not start endless retries. Do not fix status.json in this turn.
Do not use --agent specialist.
```
