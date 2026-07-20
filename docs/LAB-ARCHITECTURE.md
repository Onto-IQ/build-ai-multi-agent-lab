# Lab architecture (Outline-aligned)

## Modular layout

```text
apps/sample-dashboard/
  frontend/   # FE agent only
  backend/    # BE agent only
  qa/         # QA / Tester / Reviewer notes
labs/lab-XX-*/
shared/       # schemas, prompts, scripts, hooks stubs
workspace/    # learner outputs
```

## Ownership

| Path | Writer |
|---|---|
| `apps/sample-dashboard/frontend/**` | Frontend |
| `apps/sample-dashboard/backend/**` | Backend |
| `apps/sample-dashboard/qa/**` | QA / Reviewer |
| `workspace/contracts/**` | ตาม `generated_by` |

## Hooks (classroom-sized)

- `node shared/scripts/validate-json.mjs` before Ship  
- Permission deny on destructive actions  
- Cost/stop: max 2 refinement rounds  
- Optional: add project hooks when Claude Code / OpenCode versions in class support them  

## Fallback matrix

| Feature | Fallback |
|---|---|
| Claude Agent Teams | Subagents + contract |
| OpenCode orchestration plugin | Manual FE→BE→QA sequential |
| Flux cloud | Flux local/git or instructor demo board + learner worksheet |

## Workflow on Kanban

Interview → Plan → Build → Test → Ship
