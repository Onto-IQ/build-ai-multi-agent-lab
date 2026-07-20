# Build AI Multi-Agent Lab

Lab repo สำหรับหลักสูตร **Build AI Multi-Agent with Claude Code** (VIBE-CODE-L2)

GitHub: https://github.com/Onto-IQ/build-ai-multi-agent-lab

## เริ่มต้นด้วย VS Code (บังคับในห้อง)

1. **File → Open Folder** เลือก root ของ repo นี้ (ไม่ใช่โฟลเดอร์ย่อย)
2. คัดลอก `.env.example` → `.env`  
   หรือรัน Task: `copy-env-example`
3. รัน Task: `env-checklist`
4. เริ่ม `labs/lab-01-code-reviewer/README.md`

หรือเปิด `build-ai-multi-agent-lab.code-workspace`

## Workflow ที่สอน

```text
Interview → Plan → Build → Test → Ship
```

Kanban (ค่าเริ่มต้น **Flux**) บังคับใน Lab 10 — คอลัมน์ตาม 5 ขั้นด้านบน

## Orchestration layers

| ชั้น | เกณฑ์ผ่าน |
|---|---|
| Specialist + permission + contract + stop | บังคับ |
| Claude Agent Teams | ลองได้ — fallback Subagents |
| OpenCode orchestration plugins | pin ในห้อง — fallback Sequential ด้วยมือ |
| Kanban (Flux) | บังคับใน Lab 10 |

## Mapping Lab (ตรง Outline)

| Lab | โฟลเดอร์ | โฟกัส |
|---|---|---|
| 1 | [lab-01-code-reviewer](labs/lab-01-code-reviewer/README.md) | Code Reviewer (Claude Code) |
| 2 | [lab-02-opencode-specialist](labs/lab-02-opencode-specialist/README.md) | OpenCode + เทียบ |
| 3 | [lab-03-permission-boundary](labs/lab-03-permission-boundary/README.md) | Permission |
| 4 | [lab-04-persistent-memory](labs/lab-04-persistent-memory/README.md) | Memory |
| 5 | [lab-05-solo-to-team-roles](labs/lab-05-solo-to-team-roles/README.md) | FE / BE / QA roles |
| 6 | [lab-06-claude-multi-agent](labs/lab-06-claude-multi-agent/README.md) | Claude Teams / Subagents |
| 7 | [lab-07-opencode-sequential](labs/lab-07-opencode-sequential/README.md) | OpenCode sequential |
| 8 | [lab-08-quality-cost-gate](labs/lab-08-quality-cost-gate/README.md) | Quality + Cost Gate |
| 9 | [lab-09-synthesizer](labs/lab-09-synthesizer/README.md) | Synthesize |
| 10 | [lab-10-kanban-collab](labs/lab-10-kanban-collab/README.md) | Kanban (Flux) |
| 11 | [lab-11-capstone](labs/lab-11-capstone/README.md) | Capstone + Deploy & Share |
| เสริม | [lab-optional-mcp-vs-cli](labs/lab-optional-mcp-vs-cli/README.md) | MCP vs CLI |
| เสริม | [lab-optional-a2a](labs/lab-optional-a2a/README.md) | A2A vs contract |

Legacy trip labs: [`labs/_legacy-trip/`](labs/_legacy-trip/)

## โครงสร้าง

```text
apps/sample-dashboard/   modular FE / BE / QA
labs/                    Lab 01–11 ตาม Outline
shared/                  contracts, prompts, scripts
workspace/               output ผู้เรียน
.env.example             → .env (อย่า commit)
.vscode/                 settings, extensions, tasks
```

## Debug สำหรับ Non-Programmer

1. อ่านข้อความ error ทั้งก้อน  
2. คัดลอกใส่แชท AI  
3. สั่งให้แก้ **ทีละจุด** พร้อมบอกไฟล์ที่เกี่ยวข้อง  
4. รันซ้ำ / ตรวจ QA checklist  

อย่าพิมพ์แค่ “แก้ให้หน่อย” แบบไม่มี error

## Design brief

ดู `docs/research/` ใน course repo หรือคัดลอก brief ใน `shared/research/` เมื่อ sync
