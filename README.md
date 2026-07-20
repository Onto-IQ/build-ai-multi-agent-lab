# Build AI Multi-Agent Lab

Lab repo สำหรับหลักสูตร **Build AI Multi-Agent with Claude Code** (VIBE-CODE-L2)

GitHub: https://github.com/Onto-IQ/build-ai-multi-agent-lab

โจทย์ทั้งคอร์ส: สร้าง **Agent Cost Board** (แผงต้นทุน/สถานะทีม AI ของตัวเอง)  
โฟลเดอร์แอป: `apps/sample-dashboard/`

## เริ่มต้น (Outline 2)

1. อ่านและทำตาม [`SETUP.md`](SETUP.md)
2. เปิด root ของ repo นี้ใน **VS Code**
3. คัดลอก `.env.example` → `.env` (Task: `copy-env-example`)
4. รัน Task: `env-checklist`
5. เริ่ม [`labs/lab-01-code-reviewer/README.md`](labs/lab-01-code-reviewer/README.md)

อ่านกฎโปรเจกต์: [`CLAUDE.md`](CLAUDE.md) · [`AGENTS.md`](AGENTS.md)

## บันไดความรู้

แต่ละ Lab **ได้รับมาจาก Lab ก่อน** แล้ว **ได้เพิ่ม** ทักษะใหม่ — ไม่รีเซ็ตโจทย์  
จบ Lab 11 = ครบสูตร (specialist → สิทธิ์ → memory → ทีม → ด่าน → รวมผล → Flux → Ship)

## ลำดับงาน

```text
Interview → Plan → Build → Test → Ship
```

Kanban (**Flux**) บังคับใน Lab 10 — เป็นบอร์ดงานของ Agent Cost Board

## ชั้น orchestration

| ชั้น | เกณฑ์ผ่าน Lab |
|---|---|
| Specialist + สิทธิ์ + สัญญา + หยุด | บังคับ |
| Claude Agent Teams | ลองได้ — ทางเลือก Subagents ยังผ่าน |
| OpenCode plugins | pin ในห้อง — ทางเลือกลำดับมือยังผ่าน |
| Kanban (Flux) | บังคับ Lab 10 |

## Mapping Lab (ตรง Outline)

| Lab | โฟลเดอร์ | โฟกัส |
|---|---|---|
| 1 | [lab-01-code-reviewer](labs/lab-01-code-reviewer/README.md) | Code Reviewer (Claude Code) |
| 2 | [lab-02-opencode-specialist](labs/lab-02-opencode-specialist/README.md) | OpenCode + เทียบ |
| 3 | [lab-03-permission-boundary](labs/lab-03-permission-boundary/README.md) | สิทธิ์ |
| 4 | [lab-04-persistent-memory](labs/lab-04-persistent-memory/README.md) | Memory |
| 5 | [lab-05-solo-to-team-roles](labs/lab-05-solo-to-team-roles/README.md) | บทบาท Frontend / Backend / QA |
| 6 | [lab-06-claude-multi-agent](labs/lab-06-claude-multi-agent/README.md) | ทีมบน Claude |
| 7 | [lab-07-opencode-sequential](labs/lab-07-opencode-sequential/README.md) | ลำดับบน OpenCode |
| 8 | [lab-08-quality-cost-gate](labs/lab-08-quality-cost-gate/README.md) | ด่านคุณภาพ + ต้นทุน |
| 9 | [lab-09-synthesizer](labs/lab-09-synthesizer/README.md) | รวมผล |
| 10 | [lab-10-kanban-collab](labs/lab-10-kanban-collab/README.md) | Flux บอร์ดโปรเจกต์นี้ |
| 11 | [lab-11-capstone](labs/lab-11-capstone/README.md) | Capstone + Deploy |
| เสริม | [lab-optional-mcp-vs-cli](labs/lab-optional-mcp-vs-cli/README.md) | MCP vs คำสั่งใน repo |
| เสริม | [lab-optional-a2a](labs/lab-optional-a2a/README.md) | A2A vs สัญญาไฟล์ |

## โครงสร้าง

```text
apps/sample-dashboard/   Agent Cost Board (frontend / backend / qa)
labs/                    Lab 01–11 ตาม Outline
shared/                  สัญญาตัวอย่าง, prompts, สคริปต์ด่าน
workspace/               ผลงานผู้เรียน
SETUP.md                 Outline 2
CLAUDE.md / AGENTS.md    กฎโปรเจกต์และบทบาท
.env.example             → .env (อย่า commit)
.vscode/                 settings, extensions, tasks
```

## แก้ปัญหาเบื้องต้น (ผู้ที่ไม่ใช่โปรแกรมเมอร์)

1. อ่านข้อความ error ทั้งก้อน  
2. คัดลอกใส่แชท AI  
3. สั่งให้แก้ทีละจุด พร้อมบอกไฟล์ที่เกี่ยวข้อง  
4. รันซ้ำ / ตรวจ QA checklist  

อย่าพิมพ์แค่ “แก้ให้หน่อย” แบบไม่มี error
