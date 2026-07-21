# Lab 10 — Kanban (Flux) go-live loop สำหรับ Agent Cost Board

**Outline 12:** Collaboration Layer + Kanban  
**ลำดับงาน:** ทั้งเส้น Interview → Ship  
**มาตรฐาน:** **go-live ได้** — ผู้เรียนนำบอร์ด + สัญญา JSON กลับไปปิดงานจริงได้ ไม่ใช่ POC สาธิต MCP

## ได้รับมาจาก Lab ก่อน

- ทีม + ด่าน + แผงที่รวมแล้ว (Lab 05–09)
- สัญญาใน `workspace/contracts/`: `role-cards`, `handoff-fe`, `handoff-be`, `audit-result`, `synthesize-report`

## ได้เพิ่มใน Lab นี้

ตั้ง **Flux** ([flux.umin.ai](https://flux.umin.ai)) เป็นบอร์ดงานของ**โปรเจกต์ Agent Cost Board** แล้วรัน **loop ปิดงานจริง**:

```text
WIP จำกัด: การ์ดหลัก 3 ใบ (FE / BE / QA) เท่านั้น
  → มอบหมายชัด (บทบาท + เครื่องมือบนการ์ด)
  → ลงมือตาม ownership จนมีผลใน repo
  → อัปเดตสัญญา JSON ที่ผูกกับการ์ดนั้น
  → เลื่อนการ์ดตามสถานะจริงเท่านั้น
  → QA + gate PASS → การ์ด QA ใกล้/ถึง Ship
  → (Lab 11) Deploy URL จริง
```

## เป้าหมาย

บอร์ดสดที่**อ่านแล้วรู้ทันทีว่าใครทำอะไร ค้างขั้นไหน** และ Claude กับ OpenCode ปิดงานบนการ์ดของตัวเองจนเลื่อนคอลัมน์ได้จริง

**จุดที่ควรรู้สึกว้าว:** การ์ดขยับเพราะงานเสร็จ — ไม่ใช่เพราะสั่งเลื่อนเล่น

## JSON vs Kanban

| เมื่อไหร่ | ใช้อะไร |
|---|---|
| ownership / ส่งงานต่อ / ด่าน / ship | สัญญา JSON ใน `workspace/contracts/` |
| มอบหมายใครทำ / ขั้นไหน / มองเห็นคิว | **Flux Kanban** |

ห้าม: ใช้การ์ดแทน `handoff-*.json`; ผ่าน Lab ด้วย snapshot โดยไม่มีบอร์ดสด; **สร้างการ์ดเพื่องานนับ**

## ผลลัพธ์รูปธรรม (go-live)

1. **ต้องมีไฟล์/หลักฐานเหล่านี้**
   - บอร์ด Flux สด + URL ใน learning-log
   - **การ์ด active พอดี 3 ใบ** (Frontend / Backend / QA) — การ์ดเกินย้าย Trash หรือลบใน UI
   - แต่ละใบมีมอบหมายชัดในคำอธิบายหรือฟิลด์: `assignee_role` + `tool` (Claude Code / OpenCode)
   - **หลักฐานงานจริง** ต่อใบก่อนเลื่อน (diff / JSON อัปเดต / gate stdout)
   - การ์ด FE และ BE ถูกเลื่อนอย่างน้อยหนึ่งขั้น**หลัง**ทำงาน; การ์ด QA อยู่ Test หรือ Ship **หลัง** `gate-quality` สอดคล้อง `audit-result`
   - `workspace/contracts/kanban-snapshot.json` จากบอร์ดสด (`source_mode: api`) สะท้อน 3 ใบนั้น
2. **ต้องเห็นด้วยตาอะไร**
   - เปิดบอร์ดแล้วบอกได้ทันทีว่าใครรับใบไหน
   - คอลัมน์สะท้อนสถานะงานจริง (ไม่มีกองการ์ดสาธิต)
3. **เช็คผ่านด้วยคำสั่งนี้**

```powershell
# เปิด FLUX_WORKSPACE_URL — นับการ์ดนอก Trash ต้อง = 3 และรู้ผู้รับงาน
node shared/scripts/validate-json.mjs workspace/contracts/kanban-snapshot.json
node shared/scripts/gate-quality.mjs
Test-Path .\workspace\contracts\handoff-fe.json
Test-Path .\workspace\contracts\handoff-be.json
Test-Path .\workspace\contracts\audit-result.json
```

4. **ยังไม่ผ่านถ้า…**
   - สร้างการ์ดเพื่องานนับ / เลื่อนการ์ดโดยไม่ทำงาน / ไม่รู้ว่าใครรับใบไหน  
   - snapshot จำลอง / ไม่มีบอร์ดสด / gate FAIL แต่การ์ด QA อยู่ Ship  
   - บอร์ดรก (>3 active นอก Trash) แล้วเคลมจบ Lab

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
Test-Path .\workspace\contracts\role-cards.json
Test-Path .\workspace\contracts\handoff-fe.json
Test-Path .\workspace\contracts\handoff-be.json
Test-Path .\workspace\contracts\audit-result.json
Test-Path .\workspace\contracts\synthesize-report.json
```

ถ้าสัญญา Lab 05–09 ขาด → กลับ Lab นั้นก่อน  
ทำตาม [`FLUX-SETUP.md`](FLUX-SETUP.md) จน MCP Claude + OpenCode พร้อม

**ถ้างบอร์ดรกจากรอบทดก่อน:** ย้ายการ์ดที่ไม่ใช่ FE/BE/QA หลักเข้า Trash ก่อนเริ่ม loop

---

## ลำดับบังคับ (loop ปิดงานจริง)

ทำตามหมายเลข — **ห้าม**เขียน snapshot ก่อนทำงานและเลื่อนตามสถานะ

### 1) แตก/คงการ์ดหลัก 3 ใบเท่านั้น

คอลัมน์: Interview → Plan → Build → Test → Ship  

| การ์ด (ชื่อชัด) | มอบหมายบังคับ | งานที่ถือว่า “เสร็จขั้นนี้” | สัญญาที่ต้องอัป |
|---|---|---|---|
| Frontend — … | Claude Code + role Frontend | มีผลใน `frontend/` หรือยืนยัน UI พร้อม + อัป handoff | `handoff-fe.json` |
| Backend — … | OpenCode + role Backend | มีรอบใน `runs.json` + handoff | `handoff-be.json` |
| QA — … | Claude หรือ OpenCode + role QA | รัน gate แล้วผลตรง `audit-result` | `audit-result.json` |

ในคำอธิบายการ์ดใส่บรรทัด:  
`Assignee: <Frontend|Backend|QA> | Tool: <Claude Code|OpenCode> | Contract: <path>`

วาง [`prompts/01-create-cards.md`](prompts/01-create-cards.md)

### 2) Claude รับการ์ด Frontend — ทำงานแล้วค่อยเลื่อน

ห้าม `move_card` ก่อนมีผลงาน/ยืนยันใน repo  
วาง [`prompts/02-claude-frontend-card.md`](prompts/02-claude-frontend-card.md)

### 3) OpenCode รับการ์ด Backend — ทำงานแล้วค่อยเลื่อน

อ่าน `handoff-fe.json` ก่อน · ห้ามแก้ `frontend/`  
วาง [`prompts/03-opencode-backend-card.md`](prompts/03-opencode-backend-card.md)

### 4) QA — gate จริงแล้วค่อยเลื่อน

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

1. เปิด `FLUX_WORKSPACE_URL` — ทำความสะอาดให้เหลือ 3 ใบ  
2. Claude: รับ FE → ทำงาน → อัป JSON → เลื่อน  
3. OpenCode: รับ BE → ทำงาน → อัป JSON → เลื่อน  
4. QA: gate → อัป `audit-result` → เลื่อนตามผล  
5. Snapshot + URL ใน learning-log  

### ตัวอย่าง Claude

```text
Go-live Lab 10: only 3 active cards (FE/BE/QA). Trash extras.
Take Frontend card. Do real ownership work, update handoff-fe.json,
THEN move_card to match status. Never move without work evidence.
```

### ตัวอย่าง OpenCode

```powershell
$p = @'
Go-live Lab 10. Read handoff-fe.json first. Take Backend card only.
Update runs.json + handoff-be.json for real, THEN move_card Build→Test.
Do not edit frontend/. Do not create extra cards. Reply Thai.
'@
$p | opencode run --auto -m opencode/big-pickle
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

- บอร์ดอ่านรู้เรื่อง: 3 ใบ, มอบหมายชัด, คอลัมน์ตรงงาน  
- Claude และ OpenCode ปิดงานบนการ์ดของตัวเองได้จริง  
- JSON กับคอลัมน์สอดคล้องกัน  
- พร้อมต่อ Lab 11 Deploy URL จริง (go-live)

## เกณฑ์ผ่าน Lab

ต้องตรงกับ **ผลลัพธ์รูปธรรม (go-live)** ด้านบน 1:1

- [ ] บอร์ดสด + URL; active cards = 3 (FE/BE/QA) มอบหมายชัด  
- [ ] แต่ละบทบาทมีหลักฐานงานจริงก่อนเลื่อนการ์ด  
- [ ] QA สอดคล้อง `gate-quality` + `audit-result`  
- [ ] `kanban-snapshot.json` ผ่าน validator จากบอร์ดสด  
- [ ] อธิบายได้ว่า JSON = ความจริง, Flux = มอบหมาย/คิว — และสูตรนี้ใช้ปิดงานนอกห้องได้  

## ไม่ผ่านถ้า

- ไม่มีบอร์ดสด / snapshot จำลอง  
- สร้างการ์ดเพื่องานนับ หรือเลื่อนโดยไม่ทำงาน  
- ไม่รู้ว่าใครรับการ์ดไหน  
- POC เท่ ๆ แต่บอร์ดรกและงานไม่ปิด

## ทางเลือกเมื่อเครื่องมือไม่พร้อม

Flux บัญชีไม่พร้อม — ใช้บอร์ด Kanban อื่นที่ห้องอนุญาตได้ แต่**กฎ go-live เหมือนกัน** (3 ใบ, มอบหมายชัด, เลื่อนหลังงานจริง)

## แก้ปัญหาเบื้องต้น

| อาการ | ทำอะไร |
|---|---|
| บอร์ดรก | Trash การ์ดที่ไม่ใช่ FE/BE/QA หลัก แล้วเริ่มใหม่ |
| ไม่รู้ใครรับงาน | ใส่ Assignee/Tool/Contract ในคำอธิบายการ์ด |
| อยากผ่านเร็วด้วยเลื่อนเล่น | ห้าม — ไม่ผ่านเกณฑ์ go-live |
| create_card พัง | ใช้ board **UUID** จาก `get_board` |
| move_card พัง | ใช้ `target_column_id` |
| Claude MCP Pending approval | Approve ใน TUI; skip permissions เฉพาะเครื่องตัวเองตอนทดสอบ |
| OpenCode model flake | สลับ `-m` + stdin + `--auto` |
| อยากลบการ์ด | Trash / UI — ไม่มี `delete_card` ใน MCP |
