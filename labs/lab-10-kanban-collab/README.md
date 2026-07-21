# Lab 10 — Kanban (Flux) go-live loop สำหรับ Agent Cost Board

**Outline 12:** Collaboration Layer + Kanban  
**ลำดับงาน:** ทั้งเส้น Interview → Ship  
**มาตรฐาน:** **go-live ได้** — เลื่อนการ์ดจากงานจริงด้วย named agent บนเครื่องมือที่ถูก ไม่ใช่ POC

### คุณอยู่ตรงไหน

`**Interview → Plan → Build → Test → Ship**` (บอร์ด Flux สะท้อนทั้งเส้น)

| | |
|---|---|
| **Identity + เครื่องมือ** | การ์ด 3 ใบแมปตายตัว — ดูตารางด้านล่าง (ไม่ทับซ้อน) |
| **รับมาจาก** | สัญญา Lab 05–09 + named agents จาก Lab 05 |
| **ส่งต่อไป** | การ์ด QA พร้อม Ship + snapshot → Lab 11 Deploy URL จริง |

## ได้รับมาจาก Lab ก่อน

- ทีม + ด่าน + แผงที่รวมแล้ว (Lab 05–09)
- สัญญาใน `workspace/contracts/`: `role-cards`, `handoff-fe`, `handoff-be`, `audit-result`, `synthesize-report`
- Agents: Claude `frontend` · OpenCode `backend` + `qa` (artifact จาก Lab 05 — ไม่ bicopy ข้ามเครื่องมือ)

## ได้เพิ่มใน Lab นี้

ตั้ง **Flux** ([flux.umin.ai](https://flux.umin.ai)) เป็นบอร์ดงานแล้วรัน **loop ปิดงานจริง**:

```text
WIP = 3 การ์ด (FE / BE / QA) เท่านั้น
  → แต่ละใบระบุ assignee_role + tool + ชื่อ agent
  → เรียก named agent บนเครื่องมือที่ถูก
  → มีหลักฐานงานจริง (diff / JSON / gate)
  → อัปเดตสัญญาที่ผูกใบนั้น
  → ค่อยเลื่อนคอลัมน์ตามสถานะจริง
  → QA + gate PASS → การ์ด QA ใกล้/ถึง Ship
  → (Lab 11) Deploy URL จริง
```

## เป้าหมาย

บอร์ดสดที่**อ่านแล้วรู้ว่าเรียก agent ชื่ออะไร บนเครื่องมือไหน** และเห็นการ์ดขยับเพราะงานเสร็จ

**จุดที่ควรรู้สึกว้าว:** การ์ดเลื่อนหลัง named agent ทำงาน — ไม่ใช่เลื่อนเล่น

## แมปการ์ด ↔ agent ↔ tool (ล็อก)

| การ์ด | assignee_role | tool | agent ที่ต้องเรียกก่อนเลื่อน | สัญญาที่ผูก |
|---|---|---|---|---|
| Frontend | Frontend | Claude Code | `frontend` | `handoff-fe.json` / งาน FE |
| Backend | Backend | OpenCode | `backend` | `handoff-be.json` / `runs.json` |
| QA | QA | OpenCode | `qa` | `audit-result.json` + gate PASS |

**ห้าม:** ใช้ `specialist` ปิด 3 การ์ด · เรียก backend/qa บน Claude · ทำ FE บน OpenCode · สร้างใบ synthesizer เป็น WIP ที่ 4

## JSON vs Kanban

| เมื่อไหร่ | ใช้อะไร |
|---|---|
| ownership / ส่งงานต่อ / ด่าน / ship | สัญญา JSON ใน `workspace/contracts/` |
| มอบหมายใครทำ / ขั้นไหน / มองเห็นคิว | **Flux Kanban** |

ห้าม: ใช้การ์ดแทน `handoff-*.json`; ผ่าน Lab ด้วย snapshot โดยไม่มีบอร์ดสด; **สร้างการ์ดเพื่องานนับ**; **เลื่อนโดยไม่เรียก named agent**

## ผลลัพธ์รูปธรรม (go-live)

1. **ต้องมีไฟล์/หลักฐานเหล่านี้**
   - บอร์ด Flux สด + URL ใน learning-log
   - **การ์ด active พอดี 3 ใบ** — คำอธิบายมี `Assignee | Tool | Agent | Contract`
   - **หลักฐานงานจริง** ต่อใบก่อนเลื่อน (diff / JSON / gate stdout)
   - FE และ BE เลื่อน ≥1 ขั้น**หลัง**เรียก agent ตามแมป; QA อยู่ Test หรือ Ship **หลัง** gate สอดคล้อง `audit-result`
   - `kanban-snapshot.json` จากบอร์ดสด (`source_mode: api`) สะท้อน 3 ใบ + คอลัมน์หลังงานจริง
2. **ต้องเห็นด้วยตาอะไร**
   - เปิดบอร์ดแล้วบอกได้ว่าใบไหนเรียก agent อะไร
   - คอลัมน์เปลี่ยนตามงานจริง (ไม่ใช่เลื่อนเล่น)
3. **เช็คผ่านด้วยคำสั่งนี้**

```powershell
# เปิด FLUX_WORKSPACE_URL — นับการ์ดนอก Trash = 3
Test-Path .\.claude\agents\frontend.md
Test-Path .\.opencode\agents\backend.md
Test-Path .\.opencode\agents\qa.md
opencode agent list 2>&1 | Select-String -Pattern '^(backend|qa) '
node shared/scripts/validate-json.mjs workspace/contracts/kanban-snapshot.json
node shared/scripts/gate-quality.mjs
```

4. **ยังไม่ผ่านถ้า…**
   - เลื่อนก่อนมี diff/JSON/gate · เรียก agent คนละเครื่องกับแมป · ใช้ `specialist` ปิดทีม  
   - snapshot จำลอง / ไม่มีบอร์ดสด / บอร์ดรก (>3 active)

## เลือกวิธีรัน

| ทาง | เหมาะกับ | หมายเหตุ |
|---|---|---|
| **A — เบราว์เซอร์ + Claude MCP + OpenCode MCP** | **ทางหลัก (go-live)** | เห็นการ์ดขยับหลังงานจริง |
| **B — CLI / MCP** | สคริปต์หลังมีบอร์ดสะอาด | ใช้ findings ใน FLUX-SETUP |

ไฟล์ร่วม: [`FLUX-SETUP.md`](FLUX-SETUP.md) · prompts ใน `prompts/`

---

## 0) Preflight (บังคับก่อนแตกการ์ด)

```powershell
node --version
claude --version
opencode --version
Select-String -Path .\.env -Pattern '^FLUX_(API_KEY|WORKSPACE_URL)='
Test-Path .\.claude\agents\frontend.md
Test-Path .\.opencode\agents\backend.md
Test-Path .\.opencode\agents\qa.md
# ต้อง False:
Test-Path .\.opencode\agents\frontend.md
Test-Path .\.claude\agents\backend.md
opencode agent list 2>&1 | Select-String -Pattern 'backend|qa|specialist'
Test-Path .\workspace\contracts\role-cards.json
Test-Path .\workspace\contracts\handoff-fe.json
Test-Path .\workspace\contracts\handoff-be.json
Test-Path .\workspace\contracts\audit-result.json
Test-Path .\workspace\contracts\synthesize-report.json
```

ถ้า agent หรือสัญญาขาด → กลับ Lab 05–09  
ทำตาม [`FLUX-SETUP.md`](FLUX-SETUP.md) จน MCP พร้อม  

**ถ้างบอร์ดรก:** ย้ายการ์ดที่ไม่ใช่ FE/BE/QA เข้า Trash ก่อนเริ่ม loop  

**ถ้าไม่มี `FLUX_*`:** ห้ามเคลมผ่าน Lab 10 (fail-closed)

---

## ลำดับบังคับ (loop ปิดงานจริง)

ทำตามหมายเลข — **ห้าม**เขียน snapshot ก่อนทำงานและเลื่อนตามสถานะ

### 1) แตก/คงการ์ดหลัก 3 ใบเท่านั้น

คอลัมน์: Interview → Plan → Build → Test → Ship  

ในคำอธิบายการ์ดใส่:  
`Assignee: <Frontend|Backend|QA> | Tool: <Claude Code|OpenCode> | Agent: <frontend|backend|qa> | Contract: <path>`

วาง [`prompts/01-create-cards.md`](prompts/01-create-cards.md)

### 2) Claude `--agent frontend` — ทำงานแล้วค่อยเลื่อน

ห้าม `move_card` ก่อนมีผลงานใน repo  
วาง [`prompts/02-claude-frontend-card.md`](prompts/02-claude-frontend-card.md)

### 3) OpenCode `--agent backend` — ทำงานแล้วค่อยเลื่อน

อ่าน `handoff-fe.json` ก่อน · ห้ามแก้ `frontend/` · ห้าม `specialist`  
วาง [`prompts/03-opencode-backend-card.md`](prompts/03-opencode-backend-card.md)

### 4) OpenCode `--agent qa` — gate จริงแล้วค่อยเลื่อน

`node shared/scripts/gate-quality.mjs`  
- FAIL → การ์ดอยู่ใน Test (ห้าม Ship)  
- PASS → เลื่อนใกล้/ถึง Ship  
วาง [`prompts/04-qa-gate-card.md`](prompts/04-qa-gate-card.md)

### 5) Snapshot จากบอร์ดสด (หลัง loop)

ต้องมี **พอดี 3 การ์ด active** ใน snapshot (ไม่นับ Trash)  
วาง [`prompts/05-kanban-snapshot.md`](prompts/05-kanban-snapshot.md)

```powershell
node shared/scripts/validate-json.mjs workspace/contracts/kanban-snapshot.json
```

---

## ทาง A — เบราว์เซอร์ + ทั้งสองเครื่องมือ (แนะนำ)

1. เปิด `FLUX_WORKSPACE_URL` — ทำความสะอาดให้เหลือ 3 ใบตามแมป  
2. Claude `--agent frontend`: รับ FE → ทำงาน → อัป JSON → เลื่อน  
3. OpenCode `--agent backend`: รับ BE → ทำงาน → อัป JSON → เลื่อน  
4. OpenCode `--agent qa`: gate → อัป `audit-result` → เลื่อนตามผล  
5. Snapshot + URL ใน learning-log  

### ตัวอย่าง Claude

```text
Go-live Lab 10: only 3 active cards (FE/BE/QA). Trash extras.
Use Claude agent frontend only for the Frontend card.
Do real ownership work, update handoff-fe.json,
THEN move_card to match status. Never move without work evidence.
```

### ตัวอย่าง OpenCode Backend

```powershell
$p = @'
Go-live Lab 10. You are --agent backend only.
Read handoff-fe.json first. Take Backend card only.
Update runs.json + handoff-be.json for real, THEN move_card.
Do not edit frontend/. Do not use specialist. Do not create extra cards. Reply Thai.
'@
$p | opencode run --agent backend --auto -m opencode/big-pickle
```

### ตัวอย่าง OpenCode QA

```powershell
$p = @'
Go-live Lab 10. You are --agent qa only.
Take QA card. Run node shared/scripts/gate-quality.mjs.
Update audit-result.json to match. THEN move_card only if PASS allows Ship/Test.
Do not use specialist. Reply Thai.
'@
$p | opencode run --agent qa --auto -m opencode/big-pickle
```

---

## ทาง B — CLI / MCP JSON-RPC

1. `get_board` → board **UUID**  
2. `create_card` / `move_card` (`target_column_id`)  
3. ไม่มี `delete_card` → Trash  
4. Snapshot หลังงานจริงเท่านั้น  

รายละเอียด: [`FLUX-SETUP.md`](FLUX-SETUP.md)

---

## ผลที่คาดหวัง

- บอร์ด 3 ใบ มอบหมาย agent+tool ชัด คอลัมน์ตรงงาน  
- Claude `frontend` และ OpenCode `backend`/`qa` ปิดงานบนการ์ดของตัวเองได้จริง  
- JSON กับคอลัมน์สอดคล้องกัน  
- พร้อมต่อ Lab 11

## เกณฑ์ผ่าน Lab

- [ ] บอร์ดสด + URL; active = 3; แต่ละใบมี Assignee + Tool + Agent  
- [ ] แต่ละใบเรียก named agent ตามแมปก่อนเลื่อน + มีหลักฐานงานจริง  
- [ ] QA สอดคล้อง `gate-quality` + `audit-result`  
- [ ] `kanban-snapshot.json` จากบอร์ดสดผ่าน validator  
- [ ] อธิบายได้ว่า JSON = ความจริง, Flux = คิว — และสูตรนี้ปิดงานนอกห้องได้  

## ไม่ผ่านถ้า

- ไม่มีบอร์ดสด / snapshot จำลอง  
- สร้างการ์ดเพื่องานนับ หรือเลื่อนโดยไม่ทำงาน / ไม่เรียก named agent  
- ใช้ `specialist` หรือ agent คนละเครื่องกับแมป  
- POC เท่ ๆ แต่บอร์ดรกและงานไม่ปิด

## ทางเลือกเมื่อเครื่องมือไม่พร้อม

Flux บัญชีไม่พร้อม — ใช้บอร์ด Kanban อื่นที่ห้องอนุญาตได้ แต่**กฎ go-live เหมือนกัน** (3 ใบ, มอบหมาย agent+tool, เลื่อนหลังงานจริง)  
ไม่มีคีย์ → **ไม่เคลมผ่าน**

## แก้ปัญหาเบื้องต้น

| อาการ | ทำอะไร |
|---|---|
| บอร์ดรก | Trash การ์ดที่ไม่ใช่ FE/BE/QA หลัก |
| agent ไม่โหลด | กลับ Lab 05 สร้าง artifacts ผ่าน CLI/TUI จาก starters |
| อยากผ่านเร็วด้วยเลื่อนเล่น | ห้าม — ไม่ผ่านเกณฑ์ go-live |
| create_card พัง | ใช้ board **UUID** จาก `get_board` |
| Claude MCP Pending approval | Approve ใน TUI |
| OpenCode model flake | สลับ `-m` + stdin + `--auto` |
