# V3 dry-run notes (instructor)

Verified on Windows (2026-09-23):

| Check | Result |
|---|---|
| Actual shallow clone | ~6s |
| `yarn install` | ~3.5 min (Yarn 4.17.1, Node 24) |
| Template repo | https://github.com/Onto-IQ/course-actual-budget `is_template=true` |
| Course overlay | issues + stubs + create-course-issues.mjs |
| `node --check scripts/create-course-issues.mjs` | OK |
| `course` fxRate test | pass |
| `course` moneyFormat test | fail until Lab 02 (expected) |
| Lab folders 01–08 + optional | present |
| Fallbacks documented | Lab 05 Teams→Subagents · Lab 06 plugin→native `@` |
| Room skills | archived under `.claude/skills/_archive/` |
| Trade Desk | archived under `apps/_archive/trade-desk` |

Not fully exercised in this pass (needs live classroom accounts): Claude Teams panel, oh-my-openagent install UI, Playwright headed screenshot, Fly/PikaPods deploy. Those keep documented fallbacks in each Lab README.
