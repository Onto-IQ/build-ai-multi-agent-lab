# V4 Dry-run report

Date: 2026-09-23  
Instructor machine: Windows · Claude Code 2.1.278 · OpenCode 2.0.6 · bun 1.3.10 · Node 24

## Infrastructure

| Check | Result |
|---|---|
| VPS SSH `root@187.127.123.173` | OK (Ubuntu 24.04, 8 vCPU, 31GB RAM) |
| Coolify 4.3.23 install | OK (fixed mangled `.env` + SSH authorized_keys) |
| UFW 22/80/443/8000 | OK |
| Traefik proxy | OK healthy |
| `https://demo.9expert.online` | **200** (nginx smoke) |
| DNS user01–user30, coolify, demo | OK → 187.127.123.173 |

Coolify login: `admin@9expert.online` (secrets in local `.env.instructor` — not committed)

## Template

| Check | Result |
|---|---|
| Repo | https://github.com/Onto-IQ/course-personal-site (`is_template=true`) |
| `npm test` smoke | PASS |
| `npm run test:labs` on stubs | FAIL as designed (NOT_IMPLEMENTED) |
| Coach implement Lab05 db | PASS (2/2) |
| Dockerfile + better-sqlite3 prod dep | Fixed on `main` |

## Coach runs

| Lab | Evidence |
|---|---|
| 01 Interview | `docs/coach-runs/lab-01-interview/` — `claude -p` wrote PROFILE (Phak) |
| 02 Debate | Prompt in lab README; NOTES if transcript delayed |
| 05 Backend | Local implement + `test:labs` PASS; OpenCode prompt captured |
| 08 Ship | `https://user30.9expert.online` **200** · `POST /api/contact` **201** |

## Labs / docs

| Artifact | Status |
|---|---|
| SETUP.md V4 detail | Written |
| `.env.example` + `scripts/preflight.ps1` | Written |
| labs/lab-01 … lab-08 READMEs | Written (V1-style) |
| PPTX-MAPPING + `...-v4.pptx` | Updated key slides + notes |
| COURSE-OUTLINE.md + cursor rule | V4 |
| `หลักสูตร AI Multi-Agent.txt` | V4 |

## Known follow-ups before class

1. Redeploy learner apps after pulling latest `main` (SSR `prerender=false` + profile loader)
2. Finish Coolify domain HTTPS for dashboard (`coolify.9expert.online`) if desired — IP:8000 works
3. Pre-create Coolify apps for user01–user29 or teach self-serve in Lab 08
4. Do not spam recreate apps (Let's Encrypt weekly limit)
5. Optional: complete OpenCode coach transcript if the long `opencode run` session was interrupted

## Ship proof commands (re-run anytime)

```powershell
curl.exe -sk -o NUL -w "%{http_code}\n" https://user30.9expert.online/
curl.exe -sk -X POST https://user30.9expert.online/api/contact -H "content-type: application/json" -d "{\"name\":\"Lab08\",\"email\":\"lab08@example.com\",\"message\":\"ship check\"}"
```
