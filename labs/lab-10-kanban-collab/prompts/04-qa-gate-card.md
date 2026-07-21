# Prompt — QA + ด่าน + เลื่อนการ์ด (Lab 10, go-live)

รันด้วย `opencode run --agent qa ...`

```text
Go-live Lab 10. You are OpenCode agent "qa" on Agent Cost Board.
1) Find the single QA card on Flux; confirm Assignee=QA, Tool=OpenCode, Agent=qa.
2) Run: node shared/scripts/gate-quality.mjs (must actually run).
3) Update workspace/contracts/audit-result.json to match the gate.
4) move_card ONLY after gate:
   - FAIL → Test (never Ship)
   - PASS → toward Ship (Lab 11 still needs real public URL)
5) Do not edit frontend/ or backend/ source to force a pass.
6) Do not use --agent specialist. Do not create extra cards.

Reply Thai: gate result + card column.
```
