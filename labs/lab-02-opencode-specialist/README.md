# Lab 02 — OpenCode Specialist + เทียบ Claude Code

**Outline 4:** OpenCode Setup & Multi-model  
**ลำดับงาน:** Plan

### คุณอยู่ตรงไหน

`Interview → **Plan** → Build → Test → Ship`

| | |
|---|---|
| **Identity + เครื่องมือ** | OpenCode · agent `specialist` — **ใช้ใน Lab 02 เท่านั้น** ไม่ใช่ทางหลักของ Lab 07/10 |
| **ส่งต่อไป** | ตารางเทียบใน learning-log → Lab 03 (สิทธิ์) |
| **ภาพรวมทีม** | ทีมจริง (FE=Claude, BE/QA=OpenCode) แตกที่ Lab 05 — ห้ามใช้ `specialist` สลับหมวกปิดงานทีม |

## ได้รับมาจาก Lab ก่อน

- Code Reviewer บน Claude Code + `workspace/contracts/code-review.json` (Lab 01)
- กฎโปรเจกต์ใน `CLAUDE.md` / `AGENTS.md`

## ได้เพิ่มใน Lab นี้

ติดตั้ง/ใช้ **OpenCode** สร้าง specialist และทำตารางเทียบสองเครื่องมือ

## เป้าหมาย

ให้มี agent บน OpenCode ทำงานกับ Agent Cost Board ได้ และเปรียบเทียบกับ Lab 01

**จุดที่ควรรู้สึกว้าว:** เห็นตารางเทียบ model / สิทธิ์ / multi-agent / ต้นทุน ในหน้าเดียว

## ผลลัพธ์รูปธรรม

1. **ต้องมีไฟล์/หลักฐานเหล่านี้**
   - ตารางเทียบ Claude vs OpenCode ใน `workspace/learning-log.md` (≥ 4 แถว) ภายใต้หัวข้อ Lab 02
2. **ต้องเห็นด้วยตาอะไร**
   - OpenCode สรุป Frontend / Agent Cost Board เป็นข้อ ๆ (ประมาณ 5 ข้อ)
3. **เช็คผ่านด้วยคำสั่งนี้**

```powershell
Select-String -Path workspace/learning-log.md -Pattern "Lab 02" -SimpleMatch
# อ่านไฟล์ — ต้องมีตารางเทียบ ≥ 4 แถว
```

4. **ยังไม่ผ่านถ้า…**
   - ไม่มีหัวข้อ Lab 02 / ตารางน้อยกว่า 4 แถว / ไม่เคยรัน OpenCode กับโปรเจกต์นี้

## เลือกวิธีรัน (อ่านก่อนเริ่ม)

| ทาง | เหมาะกับ | คำสั่งหลัก |
|---|---|---|
| **A — TUI** (แนะนำในห้อง) | เรียนทีละขั้น เห็น tool calls | `opencode` แล้ววาง prompt |
| **B — CLI** (`opencode run`) | สคริปต์ / ทำซ้ำ | `... \| opencode run --agent specialist ...` |

ไฟล์ร่วม:

- Agent: [`.opencode/agents/specialist.md`](../../.opencode/agents/specialist.md)
- Prompt สรุป: [`prompts/01-opencode-specialist.md`](prompts/01-opencode-specialist.md)
- Prompt ตารางเทียบ: [`prompts/02-compare-table.md`](prompts/02-compare-table.md)

> **คำเตือน PowerShell (สำคัญ):** อย่าส่ง prompt ยาวเป็น argument แบบ  
> `opencode run --agent specialist $prompt`  
> มัก**ค้างไม่มี stdout** — ให้ส่งผ่าน **pipeline / stdin** แทน (ดูทาง B)

---

## 0) Preflight

เปิด Terminal ที่ **root** ของ repo (มี `AGENTS.md`)

```powershell
Get-Location
Test-Path .\AGENTS.md
opencode --version

# agent specialist ต้องขึ้นใน list (ต้องมี YAML frontmatter ในไฟล์ agent)
opencode agent list 2>&1 | Select-String specialist

# โมเดลที่เครื่องนี้เห็นได้ (ตัวอย่าง classroom)
opencode models 2>&1 | Select-Object -First 10
```

ผลที่ต้องการ: มีบรรทัดประมาณ `specialist (primary)`  
ถ้าไม่มี → เปิด `.opencode/agents/specialist.md` ตรวจว่ามี frontmatter `description` + `mode: primary`

ทดสอบสั้น ๆ ว่า CLI ไม่ค้าง:

```powershell
"Reply with exactly: OC_OK" | opencode run --agent specialist --format default
```

ควรจบใน ~1 นาที และพิมพ์ `OC_OK`

---

## ทาง A — TUI (interactive)

### A1) เปิด OpenCode ที่ root

```powershell
opencode
```

### A2) เลือก agent `specialist`

ใน TUI สลับ/เลือก agent เป็น **specialist** (จาก `.opencode/agents/specialist.md`)  
หรือบอกในแชทว่าให้ทำตาม role ในไฟล์นั้น

### A3) สรุป Frontend (ห้ามแก้ไฟล์)

วางข้อความจาก [`prompts/01-opencode-specialist.md`](prompts/01-opencode-specialist.md):

```text
Read AGENTS.md and .opencode/agents/specialist.md.

Summarize apps/sample-dashboard/frontend/ in at most 5 bullet points in Thai.
Do not edit files. Focus on what the Agent Cost Board UI shows to the learner.
```

ได้สรุปภาษาไทยไม่เกิน 5 ข้อ

### A4) ตารางเทียบลง learning-log

วาง [`prompts/02-compare-table.md`](prompts/02-compare-table.md) ใน**เซสชันเดิม** (หรือเซสชันใหม่ก็ได้):

```text
Append a comparison table to workspace/learning-log.md under "## Lab 02".
...
```

ตรวจไฟล์:

```powershell
Get-Content .\workspace\learning-log.md
```

ต้องมีหัวข้อ `## Lab 02` และตาราง markdown อย่างน้อย 4 แถว: model, สิทธิ์, multi-agent, ต้นทุน

### A5) (ถ้าห้องมี multi-model) สลับโมเดลหนึ่งครั้ง

ใน TUI สลับ model แล้วถามสั้น ๆ เช่น `Reply with exactly: MODEL_OK` — จดชื่อ model ที่ใช้ลง learning-log หนึ่งบรรทัด

---

## ทาง B — CLI (`opencode run`)

### B0) กฎที่ไม่ให้ค้าง

1. ส่งข้อความด้วย **stdin**: `"..." | opencode run ...` หรือ here-string ผ่าน pipeline  
2. งานที่ต้องเขียนไฟล์: ใส่ `--auto` (ไม่งั้นอาจรออนุมัติสิทธิ์แล้วดูเหมือนค้าง)  
3. ถ้าระบบห้องมีโมเดลฟรี ระบุ `-m` ให้ชัด เช่น `-m opencode/mimo-v2.5-free`  
4. ถ้าเกิน ~3 นาทียังเงียบ → `Ctrl+C` แล้วตรวจว่าไม่ได้ส่ง prompt เป็น positional argument

### B1) สรุป Frontend

```powershell
$prompt1 = @'
Read AGENTS.md and .opencode/agents/specialist.md.

Summarize apps/sample-dashboard/frontend/ in at most 5 bullet points in Thai.
Do not edit files. Focus on what the Agent Cost Board UI shows to the learner.
'@

$prompt1 | opencode run --agent specialist --auto --format default -m "opencode/mimo-v2.5-free" --title "lab-02-specialist"
```

### B2) เขียนตารางเทียบ

```powershell
$prompt2 = @'
Append a comparison table to workspace/learning-log.md under "## Lab 02".

Compare Claude Code (Lab 01) vs OpenCode (this lab) with at least these rows:
1) model / multi-model
2) permission style
3) multi-agent support
4) cost / when to use which

Use a markdown table. Keep it short. Write in Thai.
'@

$prompt2 | opencode run --agent specialist --auto --format default -m "opencode/mimo-v2.5-free" --title "lab-02-compare"
```

ตรวจ:

```powershell
Select-String -Path .\workspace\learning-log.md -Pattern "Lab 02|Model|Permission|Multi-agent|Cost" 
Get-Content .\workspace\learning-log.md
```

### B3) Fallback ถ้า `--agent specialist` มีปัญหา

ใช้ agent เริ่มต้น (`build`) แต่ย้ำให้讀ไฟล์ specialist:

```powershell
"Read .opencode/agents/specialist.md then reply with exactly: FALLBACK_OK" | opencode run --format default
```

แล้วยังใช้ `$prompt1` / `$prompt2` แบบ pipeline โดย**ไม่ใส่** `--agent` ก็ได้ (บทบาทอยู่ในข้อความ)

---

## ข้อความพร้อมวาง

- [`prompts/01-opencode-specialist.md`](prompts/01-opencode-specialist.md)
- [`prompts/02-compare-table.md`](prompts/02-compare-table.md)

## ผลที่คาดหวัง

- มีการใช้ OpenCode agent (`specialist`) ในโปรเจกต์นี้
- `workspace/learning-log.md` มีตารางเทียบอย่างน้อย 4 แถวภายใต้ `## Lab 02`

## เกณฑ์ผ่าน Lab

ต้องตรงกับ **ผลลัพธ์รูปธรรม** ด้านบน 1:1

- [ ] OpenCode สรุป Frontend/Agent Cost Board ได้ (เห็นใน TUI หรือ stdout)
- [ ] มีตารางเทียบ Claude vs OpenCode ≥ 4 แถวใน `workspace/learning-log.md` ภายใต้ Lab 02
- [ ] อัปเดต learning-log แล้ว

## ทางเลือกเมื่อเครื่องมือไม่พร้อม

ถ้าติดตั้ง OpenCode ไม่ทัน — เขียนตารางเทียบจากเอกสาร/เดโม่วิทยากร + จดว่าจะติดตั้งเมื่อไหร่ (ยังต้องมีตาราง)

## แก้ปัญหาเบื้องต้น

| อาการ | ทำอะไร |
|---|---|
| `opencode` missing | กลับ SETUP + ขอวิทยากร |
| `specialist` ไม่ขึ้นใน `opencode agent list` | ใส่ YAML frontmatter (`description`, `mode: primary`) ใน `.opencode/agents/specialist.md` |
| **CLI ค้าง ไม่มี stdout** | สาเหตุพบบ่อย: ส่ง prompt ยาวเป็น argument ใน PowerShell → เปลี่ยนเป็น `"..." \| opencode run ...` แล้วใส่ `--auto` |
| ค้างตอนจะเขียนไฟล์ | เพิ่ม `--auto` หรืออนุมัติ permission ใน TUI |
| โมเดลช้า / error | ลอง `-m opencode/mimo-v2.5-free` หรือดู `opencode models` |
| หา agents ไม่เจอ | ตรวจโฟลเดอร์ `.opencode/agents/` ที่ **root** ของ repo |
| ตารางไม่โผล่ใน learning-log | เปิดไฟล์ด้วย editor ที่รองรับ UTF-8; รัน B2 ซ้ำ |
