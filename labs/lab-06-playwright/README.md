# Lab 06 — เปิดเบราว์เซอร์จริงด้วย Playwright MCP

**ใช้เวลาประมาณ:** 75–90 นาที  
**เครื่องมือ:** Claude Code · Playwright MCP `@playwright/mcp@0.0.82`  
**ผลลัพธ์หลัก:** `docs/QA.md` + รูป ≥ 2 ใบใน `docs/screenshots/`

> Unit test ผ่านแล้วก็ยังต้องเห็นหน้าจริง — Lab นี้ฝึกให้ agent “เปิดเว็บแล้วจดผล”

---

## คุณจะได้อะไรจาก Lab นี้

1. ใช้ **Playwright MCP** ไล่หน้า Home → Contact และส่งฟอร์ม demo  
2. บันทึกหลักฐานใน **QA.md** + screenshot  
3. ถก **a11y** สองมุม (Advocate vs Pragmatist) แล้วจัด P0/P1/P2

**ความรู้ที่ควรติดตัว**

- MCP เบราว์เซอร์ ≠ unit test — คนละชั้นของความมั่นใจ  
- ต้องมี **dev server รันอยู่** ก่อนให้ Claude เทส  
- Playwright MCP **ไม่ใช่** ท่อส่งงานไป OpenCode

---

## ก่อนเริ่ม

ควรมี UI + guestbook จาก Lab 04–05 · แนะนำผ่าน [`Lab 05b`](../lab-05b-swarm-to-green/README.md) ถ้าเคย swarm  
`test:labs` เขียว (หรือช่องว่างถูกบันทึกใน `docs/SWARM.md`)

**Terminal A** — เปิดเว็บทิ้งไว้:

```powershell
cd <โฟลเดอร์-repo-ของคุณ>
npm run test:labs
npm run dev
```

**Terminal B** — ตรวจ MCP แล้วเปิด Claude:

```powershell
claude mcp list    # ต้องมี playwright
npx -y @playwright/mcp@0.0.82 --help
```

ถ้ายังไม่มี Playwright MCP → ตาม [`SETUP.md`](../../SETUP.md)  
เช่น `claude mcp add playwright -- npx -y @playwright/mcp@0.0.82`

จด base URL (ค่าเริ่ม `http://localhost:4321` หรือตาม `PORT` ใน `.env`)

---

## สิ่งที่ต้องมีเมื่อจบ Lab

| สิ่งที่ต้องมี | ผ่านเมื่อ |
|---|---|
| `docs/QA.md` | มี `## E2E Playwright`, `## a11y Debate`, `## a11y Action items` |
| Screenshots | ≥ 2 ไฟล์ใต้ `docs/screenshots/` |
| E2E จริง | มี step pass/fail ไม่ใช่สมมติ |

**ยังไม่ผ่านถ้า…** ไม่รัน `npm run dev` ตอนเทส · ไม่มีหลักฐาน E2E · ไม่จัดลำดับ P0/P1/P2

---

## เลือกวิธีทำ

| ทาง | หมายเหตุ |
|---|---|
| **A — TUI + MCP (แนะนำ)** | Claude เรียก browser tools ได้เต็มที่ |
| **B — CLI** | จำกัด — MCP ต้องผ่าน session ที่เปิด MCP |

Prompts: [`01-playwright-e2e.md`](prompts/01-playwright-e2e.md) · [`02-a11y-debate.md`](prompts/02-a11y-debate.md)

---

## ทาง A — ทีละขั้น

### ขั้นที่ 1 — สร้างโครง QA

```powershell
@'
# QA — Personal Site

> Lab 06

'@ | Set-Content -Encoding utf8 .\docs\QA.md
New-Item -ItemType Directory -Force -Path .\docs\screenshots | Out-Null
```

### ขั้นที่ 2 — E2E (dev server ต้องยังรันอยู่)

ใน Terminal B:

```powershell
claude
```

วาง `01-playwright-e2e.md`  
ตามให้ครบ: ทุกหน้าหลัก · ส่งฟอร์ม · screenshot · เขียนลง QA.md

### ขั้นที่ 3 — a11y debate

วาง `02-a11y-debate.md`  
(แยก subagent 2 รอบได้ถ้าอยาก context สะอาด)

### ขั้นที่ 4 — (ทางเลือก) แก้ P0 เล็ก ๆ

```powershell
git checkout -b lab-06-qa-fix
# แก้ label / contrast 1 จุดหลังยืนยัน
npm test
git commit -am "fix(a11y): Lab 06 P0 label"
```

### ขั้นที่ 5 — Commit หลักฐาน

```powershell
git add docs/QA.md docs/screenshots/
git commit -m "docs: Lab 06 QA and screenshots"
```

---

## ตัวอย่าง QA ที่ดี

```markdown
## E2E Playwright
| Step | Result |
|------|--------|
| Home headline | Pass — ตรง PROFILE |
| Contact submit | Pass — success message |

## a11y Debate
### Advocate
- ปุ่ม submit ไม่มี accessible name ชัด
### Pragmatist
- แก้ label ก่อน ship; audit เต็มหลัง deploy

## a11y Action items
- P0: associate label for email field
- P1: focus ring on nav links
```

---

## ตรวจว่าผ่านหรือยัง

```powershell
Test-Path .\docs\QA.md
Get-ChildItem .\docs\screenshots\
Select-String -Path .\docs\QA.md -Pattern "## E2E","## a11y"
```

- [ ] QA.md ครบ 3 หัวข้อ · E2E มี pass/fail จริง  
- [ ] Screenshots ≥ 2  
- [ ] a11y มี Advocate + Pragmatist + ≥ 3 action items  
- [ ] ใช้ Playwright MCP จริง (ไม่แทนด้วยแค่ `npm test`)  

---

## ติดปัญหาบ่อย

| อาการ | ลองทำ |
|---|---|
| Playwright MCP ไม่ขึ้น | เพิ่ม MCP ตาม SETUP · เปิด `claude` ใหม่ |
| navigate localhost fail | ตรวจว่า Terminal A ยังรัน `npm run dev` · ดู PORT |
| screenshot ว่าง | รอโหลดหน้า · ลด scope ทีละหน้า |
| MCP timeout | เทสทีละหน้าแล้วค่อยรวมใน QA.md |

**ไม่ใช้ Playwright MCP เพื่อ:** ส่งงานไป OpenCode · ยืนยัน production (นั้นคือ Lab 08)

---

**Lab ถัดไป:** [`lab-07-cross-model-review`](../lab-07-cross-model-review/README.md)
