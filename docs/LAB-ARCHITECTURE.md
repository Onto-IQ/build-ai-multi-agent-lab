# Lab Architecture (V2)

## Product

- `apps/trade-desk` — Paper Crypto Trade Desk (Vite/React + Express)
- `apps/command-center` — thin cross-tool watch UI

## Harness

- Claude: `.claude/agents`, `.claude/skills`, `claude agents`, Teams/Subagents
- OpenCode: `.opencode/agents`, built-in Build/Plan, reads `.claude/skills`
- Bridge: CLI only (`opencode run` / `claude -p`) + `log-dispatch` events

## Watch

```text
Learner machine
├── Windows Terminal: claude / claude agents / opencode   (near view)
├── Browser :4173 Trade Desk                              (product)
└── Browser :4174 Command Center                          (far view)
```

## Labs

01 Claude harness → 02 OpenCode → 03 cross CLI → 04 permission → 05 Claude swarm → 06 cross-tool until done-when → 07 ship

## Retired (V1)

`apps/sample-dashboard`, labs 08–11, optional A2A/MCP, JSON contract orchestration, Flux-required Lab 10
