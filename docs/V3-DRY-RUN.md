# V3 dry-run report (instructor)

Date: 2026-09-23 · Windows 10 · Node v24.19.0

## Structural checklist

| Suite | Result |
|---|---|
| Template `is_template` + 10 course issues | PASS |
| `course` default `npm test` (fxRate) | PASS |
| `course` Lab 02/03/05/06 intentionally red | PASS |
| Lab stub golden path (implement → all green) | PASS (7/7) |
| `create-course-issues.mjs` syntax + frontmatter parse | PASS |
| Labs 01–08 structure (ได้รับมา/ได้เพิ่ม/เกณฑ์ผ่าน + prompts) | PASS |
| Room skills archived; Trade Desk archived | PASS |
| Slides 00–12 ↔ INDEX ↔ COURSE-OUTLINE | PASS |
| Pins reachable: oh-my-openagent@4.19.4, @playwright/mcp@0.0.82, superpowers latest tag v6.4.1 | PASS |
| Tools on PATH: node, git, gh, claude 2.1.278, opencode v2.0.6, bun 1.3.10 | PASS |
| Command Center `npm install` + `npm run build` | PASS |
| Docker compose file validity | PASS |
| Docker Desktop daemon | FAIL (not running) — optional path only |
| Claude/OpenCode MCP preconfigured | SKIP / empty until SETUP |

Structural automated run: **59 PASS / 0 FAIL / 0 SKIP** (saved earlier to `%TEMP%` style path `D:\dev\tmp\v3-dry-run-report.json`).

## Actual Budget runtime (critical)

| Step | Result | Notes |
|---|---|---|
| `yarn install` | PASS | ~2.5–3.5 min |
| `yarn start` from PowerShell without `sh` | FAIL | `'sh' is not recognized` |
| `yarn start` with Git `sh` + yarn shim | PARTIAL | Vite **http://localhost:3001/** responds HTTP 200 |
| loot-core backend | FAIL | `spawn yarn ENOENT` → UI may show `BackendInitFailure` |
| Dev Container / Docker run | NOT RUN | Docker CLI present; Desktop engine pipe missing |

### Mitigations applied after test

- [`SETUP.md`](../SETUP.md): Windows PATH recipe (Git bin + `%APPDATA%\npm` yarn shim) + failure table
- Lab 01: target file `AccountEmptyMessage.tsx`; UI verify optional if backend fails
- Template issue 01 + `COURSE.md` Windows note (PR to `Onto-IQ/course-actual-budget`)

## Lab pass paths verified without live agents

| Lab | What we proved |
|---|---|
| 01 | File target exists; pass criteria allow code-only on Windows backend failure |
| 02–06 | Failing stubs → reference implementations turn tests green |
| 07 | Docs require `opencode run` / `claude -p` (CLI present) |
| 08 | Ship rule documented; deploy not exercised live |
| Optional CC | Production build succeeds |

## Still needs a live classroom dry-run (human + accounts)

1. `/plugin install superpowers@claude-plugins-official`
2. `bunx oh-my-openagent@4.19.4 install …` end-to-end
3. `claude mcp add` GitHub + Playwright; permission deny demo (Lab 04)
4. Agent Teams panel / Playwright screenshot attach (Lab 05)
5. Cross-model review comment on a real PR (Lab 07)
6. Actual Dev Container or fixed yarn-spawn path until Lab 01 UI is reliable for every seat
7. Capstone public URL (Fly/PikaPods/Vercel)

## Verdict

Safe to teach **Labs 02–06 and tooling setup** on Windows today.  
**Lab 01 UI** is fragile until yarn-spawn/backend is fixed or Dev Container is the default seat path — code+PR fallback is documented.  
Do **not** claim full Actual demo-data walkthrough works on bare PowerShell without the SETUP Windows steps.
