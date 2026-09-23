# Lab 05 — จากคนเดียวสู่ Frontend / Backend / QA

**Outline 7:** Solo → Multi-Agent roles  
**ลำดับงาน:** Plan → Build

## ได้รับมาจาก Lab ก่อน

- Specialist สองเครื่องมือ + สิทธิ์ + memory (Lab 01–04)
- โครงสร้างแอป Agent Cost Board

## ได้เพิ่มใน Lab นี้

ออกแบบ**ทีม 3 บทบาท**บนแอปเดียว (ยังไม่บังคับรันพร้อมกัน)

## เป้าหมาย

เขียน role cards ให้ Frontend / Backend / QA ไม่แย่งโฟลเดอร์กัน

**จุดที่ควรรู้สึกว้าว:** เห็น ownership ชัดก่อนรันทีมจริง

## ผลลัพธ์รูปธรรม

1. **ต้องมีไฟล์/หลักฐานเหล่านี้**
   - `workspace/contracts/role-cards.json` มี Frontend / Backend / QA — `writes` ไม่ทับกัน
   - ตาราง foreshadow ใน learning-log: 3 บทบาท → การ์ดที่จะสร้างบน Flux ใน Lab 10
2. **ต้องเห็นด้วยตาอะไร**
   - สรุป ownership ภาษาไทยจาก agent (ใครเขียนโฟลเดอร์ไหน)
3. **เช็คผ่านด้วยคำสั่งนี้**

```powershell
node shared/scripts/validate-json.mjs workspace/contracts/role-cards.json
```

4. **ยังไม่ผ่านถ้า…**
   - มีสองบทบาทเขียนโฟลเดอร์เดียวกัน / ไม่มี role-cards / ไม่ foreshadow การ์ด Flux

> Lab นี้**ยังไม่บังคับ**เปิด Flux — แค่เตรียมแมปบทบาท → การ์ดสำหรับ Lab 10

## JSON vs Kanban (foreshadow)

| ตอนนี้ (Lab 05) | ภายหลัง (Lab 10) |
|---|---|
| สัญญา `role-cards.json` = แหล่งความจริงของ ownership | แตกการ์ด Frontend / Backend / QA บน Flux ตาม role-cards |
| ยังไม่เลื่อนการ์ด | การ์ด = มอบหมาย/คิว — ไม่แทนที่ JSON |

## เลือกวิธีรัน

| ทาง | เหมาะกับ | คำสั่งหลัก |
|---|---|---|
| **A — TUI** | เรียนในห้อง วาง prompt | `claude` |
| **B — CLI** | ทำซ้ำ / ตรวจไฟล์เร็ว | `"..." \| claude -p --permission-mode acceptEdits` |

ไฟล์ร่วม:

- ตัวอย่างสัญญา: [`shared/contracts/role-cards.example.json`](../../shared/contracts/role-cards.example.json)
- Prompt หลัก: [`prompts/01-role-cards.md`](prompts/01-role-cards.md)
- (ทางเลือก) briefs: [`02-frontend-brief.md`](prompts/02-frontend-brief.md), [`03-backend-brief.md`](prompts/03-backend-brief.md), [`04-qa-brief.md`](prompts/04-qa-brief.md)

---

## 0) Preflight

```powershell
Test-Path .\AGENTS.md
Test-Path .\shared\contracts\role-cards.example.json
New-Item -ItemType Directory -Force -Path .\workspace\contracts | Out-Null
claude --version
node --version
```

ถ้า `node` ไม่เจอ → ติดตั้งตาม [`SETUP.md`](../../SETUP.md) ก่อนรัน validator

---

## ทาง A — TUI

### A1) อ่าน ownership

เปิด [`AGENTS.md`](../../AGENTS.md) และ `apps/sample-dashboard/README.md` (ถ้ามี)

### A2) สร้าง role cards

```powershell
claude
```

วาง [`prompts/01-role-cards.md`](prompts/01-role-cards.md)

### A3) ตรวจ validator

```powershell
node shared/scripts/validate-json.mjs workspace/contracts/role-cards.json
```

ตรวจมือเร็ว ๆ: แต่ละ role ต้องมี `writes` ไม่ทับกัน (Frontend / Backend / QA)

### A4) (ทางเลือก) ทดลอง brief คนละรอบ

วาง prompts 02–04 คนละเซสชันสั้น ๆ — ยังไม่ต้อง orchestration เต็ม (Lab 06–07)

### A5) foreshadow Flux + learning-log

จดใน `workspace/learning-log.md` ภายใต้ `## Lab 05`:

| บทบาท | โฟลเดอร์เขียน | การ์ดที่จะสร้างบน Flux (Lab 10) |
|---|---|---|
| Frontend | `apps/sample-dashboard/frontend/` | เช่น “FE: ชัดเจนตารางรอบ” |
| Backend | `apps/sample-dashboard/backend/` | เช่น “BE: บันทึกรอบใน runs.json” |
| QA | `apps/sample-dashboard/qa/` + สัญญา audit | เช่น “QA: รัน gate-quality” |

ยัง**ไม่ต้อง**เปิด Flux ใน Lab นี้

---

## ทาง B — CLI

```powershell
$p1 = @'
Create workspace/contracts/role-cards.json for Agent Cost Board
using shared/contracts/role-cards.example.json as the schema.

Roles required: Frontend, Backend, QA
project_id must be "agent-cost-board".
Ensure no two roles write the same folder.
Write a short Thai summary of ownership after saving the file.
'@

$p1 | claude -p --permission-mode acceptEdits --output-format text --no-session-persistence

Test-Path .\workspace\contracts\role-cards.json
Get-Content .\workspace\contracts\role-cards.json

node shared/scripts/validate-json.mjs workspace/contracts/role-cards.json
```

learning-log:

```powershell
$plog = @'
Append "## Lab 05" to workspace/learning-log.md.
Note that role-cards.json was created for Frontend/Backend/QA with non-overlapping writes.
Add a markdown table foreshadowing Flux Lab 10 cards (role → folder → future card title).
One short Thai paragraph. Only edit workspace/learning-log.md.
'@

$plog | claude -p --permission-mode acceptEdits --output-format text --no-session-persistence
```

> PowerShell: ส่ง prompt ผ่าน pipeline เท่านั้น — อย่าแปะ here-string ยาวเป็น argument

---

## ข้อความพร้อมวาง

- [`prompts/01-role-cards.md`](prompts/01-role-cards.md)
- [`prompts/02-frontend-brief.md`](prompts/02-frontend-brief.md)
- [`prompts/03-backend-brief.md`](prompts/03-backend-brief.md)
- [`prompts/04-qa-brief.md`](prompts/04-qa-brief.md)

## ผลที่คาดหวัง

- `workspace/contracts/role-cards.json` มีอย่างน้อย 3 บทบาท ไม่ซ้ำโฟลเดอร์เขียน
- validator ผ่าน
- learning-log มีตาราง foreshadow การ์ด Flux สำหรับ Lab 10

## เกณฑ์ผ่าน Lab

ต้องตรงกับ **ผลลัพธ์รูปธรรม** ด้านบน 1:1

- [ ] มี `role-cards.json` ผ่าน `validate-json.mjs` (Frontend / Backend / QA)
- [ ] ไม่มีสองบทบาทเขียนโฟลเดอร์เดียวกัน
- [ ] learning-log มีตาราง foreshadow บทบาท → การ์ด Flux (Lab 10)

## ทางเลือกเมื่อเครื่องมือไม่พร้อม

เขียน `role-cards.json` มือโดยคัดลอกจาก example แล้วแก้ชื่อเครื่องมือตามที่ห้องมี

## แก้ปัญหาเบื้องต้น

| อาการ | ทำอะไร |
|---|---|
| validator บอก roles < 3 | เพิ่มบทบาทให้ครบ Frontend / Backend / QA |
| `node` missing | กลับ SETUP — หรือตรวจ ownership ด้วยตาจาก `writes` ชั่วคราวแล้วติด node ก่อน Lab 08 |
| โฟลเดอร์เขียนทับกัน | เทียบกับ `AGENTS.md` แล้วให้ agent แก้ไฟล์สัญญาใหม่ |
| PowerShell ค้าง/ไม่ส่ง prompt | ใช้ `"..." \| claude -p ...` |
