# Docs index

เริ่มที่ [`../SETUP.md`](../SETUP.md) แล้วทำ Lab ตามลำดับบันไดความรู้

| Outline | Lab | ลิงก์ | ผลลัพธ์รูปธรรมหลัก |
|---|---|---|---|
| 3 | Lab 01 Code Reviewer | [lab-01-code-reviewer](../labs/lab-01-code-reviewer/README.md) | `code-review.json` + deny edit |
| 4 | Lab 02 OpenCode | [lab-02-opencode-specialist](../labs/lab-02-opencode-specialist/README.md) | ตารางเทียบใน learning-log |
| 5 | Lab 03 Permission | [lab-03-permission-boundary](../labs/lab-03-permission-boundary/README.md) | บันทึก deny ×2 + best practices |
| 6 | Lab 04 Memory | [lab-04-persistent-memory](../labs/lab-04-persistent-memory/README.md) | `MEMORY.md` + recall ข้าม session |
| 7 | Lab 05 Roles | [lab-05-solo-to-team-roles](../labs/lab-05-solo-to-team-roles/README.md) | `role-cards.json` |
| 8 | Lab 06 Claude multi-agent | [lab-06-claude-multi-agent](../labs/lab-06-claude-multi-agent/README.md) | `handoff-fe.json` → ส่งต่อ Lab 07 |
| 9 | Lab 07 OpenCode sequential | [lab-07-opencode-sequential](../labs/lab-07-opencode-sequential/README.md) | FE→BE→QA + `handoff-be.json` |
| 10 | Lab 08 Gate | [lab-08-quality-cost-gate](../labs/lab-08-quality-cost-gate/README.md) | FAIL→PASS + `audit-result.json` |
| 11 | Lab 09 Synthesize | [lab-09-synthesizer](../labs/lab-09-synthesizer/README.md) | เปิดแผง + `synthesize-report.json` |
| 12 | Lab 10 Flux | [lab-10-kanban-collab](../labs/lab-10-kanban-collab/README.md) | บอร์ดสด + เลื่อนการ์ด + snapshot |
| 13 | Lab 11 Capstone | [lab-11-capstone](../labs/lab-11-capstone/README.md) | URL จริง + `capstone-ship.json` |
| เสริม | MCP vs scripts | [lab-optional-mcp-vs-cli](../labs/lab-optional-mcp-vs-cli/README.md) | — |
| เสริม | A2A vs contract | [lab-optional-a2a](../labs/lab-optional-a2a/README.md) | — |

## JSON vs Kanban

- **JSON** = แหล่งความจริง (ownership, handoff, ด่าน, ship)
- **Flux** = มอบหมาย/มองเห็นคิว (บังคับ Lab 10) — ไม่แทนที่สัญญา
- Loop Lab 10: แตกการ์ด → Claude/OpenCode → อัปเดต JSON → เลื่อนการ์ด → ด่าน → Ship (Lab 11)

Shared: [contracts](../shared/contracts/), [scripts](../shared/scripts/)  
ผลงาน: [workspace](../workspace/) (สัญญา JSON ของผู้เรียนถูก gitignore — เริ่มจากศูนย์)  
เช็คลิสต์วิทยากร: [E2E-ORCHESTRATION-CHECKLIST.md](E2E-ORCHESTRATION-CHECKLIST.md)  
แผนปรับ named agents → Lab 10 go-live: [MULTI-AGENT-IDENTITY-PLAN.md](MULTI-AGENT-IDENTITY-PLAN.md)

โจทย์ทั้งคอร์ส: **Agent Cost Board** (`apps/sample-dashboard/`)  
Localhost: `npx --yes serve apps/sample-dashboard -p 4173` → `/frontend/`
