# Multi-Agent Lab Design Brief (July 2026)

**Course:** Build AI Multi-Agent with Claude Code (VIBE-CODE-L2)  
**Lab repo:** [`build-ai-multi-agent-lab`](https://github.com/Onto-IQ/build-ai-multi-agent-lab)  
**IDE:** VS Code-first · `.env` + `.vscode` tasks

## Research snapshot

### Multi-agent needs that keep failing in the wild

1. Ownership / file collision  
2. Stop conditions & token cost  
3. Permission boundaries  
4. Visibility (Kanban)  
5. Cross-tool handoff (Claude Code ↔ OpenCode)  
6. Persistent memory across sessions  
7. Synthesize into something that actually runs  

### Claude Code

| Mode | Behavior | Cost | Classroom rule |
|---|---|---|---|
| **Subagents** | Parent–child; results return to lead | Lower | Default for focused work |
| **Agent Teams** | Peer messaging, shared tasks, separate instances | Higher (often multi×) | Demo / optional try; enable `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`; **fallback = Subagents** |

Keep teams ≤ 3–4. Prefer stronger model on lead, cheaper on teammates.

Sources: [Agent Teams docs](https://code.claude.com/docs/en/agent-teams)

### OpenCode

- Primary: **Build** / **Plan** (Plan defaults edit/bash to ask)  
- Built-in subagents: General, Explore, Scout  
- Custom agents via markdown / `opencode agent create`  
- Per-agent `model` + fine-grained `permission`  
- Plugins for orchestration / background / workflow: **pin classroom version**; **fallback = manual sequential runbook**

Source: [OpenCode Agents](https://opencode.ai/docs/agents/)

### Kanban

| Tool | Role |
|---|---|
| **Flux** | Required default (MCP + agent-friendly board) |
| Multica | Compare / optional self-host — not required cloud signup |
| AgentOps / Ruflow | Short observability compare |

### Orchestration layers (teach this wall rule)

1. Start with Subagents / specialists (cheaper, safer)  
2. Open Agent Teams when peers must debate / split context  
3. Open OpenCode plugins when native sequential is not enough  
4. Always keep **contract + stop + Kanban** as safety net  

## Pedagogy themes (embedded, not a separate course)

| Theme | Where it lands |
|---|---|
| Interview → Plan → Build → Test → Ship | Opening, Module 1, Kanban columns, Capstone Ship |
| Roles: Researcher / Reviewer / Tester (+ FE/BE/QA) | Claude Teams + OpenCode multi-agent labs |
| Hooks → automatic QA | Gate lab + validate scripts |
| Modular / scalability | `apps/` + `shared/` ownership |
| Debug for non-programmers | Setup + wrap-up formula |
| Deploy & Share | Capstone: Vercel/Netlify ~5 min + URL + git basics + cost note |

## Wow moments (word-of-mouth)

- Permission **deny** while reviewing  
- Memory survives session restart  
- Quality/Cost Gate stops a deliberate failure  
- Flux card moves while agents work  
- Synthesize → app runs  
- Capstone public URL shared in class  

## Lab map (Outline-aligned names)

| # | Folder | Outline workshop |
|---|---|---|
| Setup | README + `.vscode` | Technical Environment |
| 1 | `lab-01-code-reviewer` | Code Reviewer (Claude Code) |
| 2 | `lab-02-opencode-specialist` | OpenCode Setup & compare |
| 3 | `lab-03-permission-boundary` | Permission Boundary |
| 4 | `lab-04-persistent-memory` | Persistent Memory |
| 5 | `lab-05-solo-to-team-roles` | Solo → FE/BE/QA |
| 6 | `lab-06-claude-multi-agent` | Multi-Agent on Claude Code |
| 7 | `lab-07-opencode-sequential` | Multi-Agent on OpenCode |
| 8 | `lab-08-quality-cost-gate` | Gate / Guardrails |
| 9 | `lab-09-synthesizer` | Synthesize Pattern |
| 10 | `lab-10-kanban-collab` | Collaboration Layer (Flux required) |
| 11 | `lab-11-capstone` | Capstone + Deploy & Share |
| legacy | `labs/_legacy-trip/` | Previous trip coordinator labs |

## Anti-goals

- Do not require Multica cloud signup to pass  
- Do not make Agent Teams the only pass path  
- Do not teach deep git branching — Non-Coder essentials only  
- Do not promise production bookings / unpaid live APIs without cache/mock  

## Local rename note

GitHub remotes renamed to `build-ai-multi-agent-lab`.  
If Windows still locks the old folder name, use junction `build-ai-multi-agent-lab` → old path until a full folder rename is possible.
