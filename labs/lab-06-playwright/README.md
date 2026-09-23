# Lab 06 — Playwright MCP · E2E & a11y Debate

**เวลาเป้าหมาย:** 75–90 นาที  
**เครื่องมือ:** Claude Code **2.1.278+** · **Playwright MCP `@playwright/mcp@0.0.82`**  
**Issue:** `[Lab 06] QA Playwright`

## เป้าหมาย

ใช้ **Playwright MCP** ทดสอบ E2E บน dev server แล้วบันทึก **`docs/QA.md`**  
ตามด้วย **debate accessibility** (Advocate vs Pragmatist)  
**จุดที่ควรรู้สึกว้าว:** agent เปิดเบราว์เซอร์จริงผ่าน MCP — ไม่ใช่แค่ assume ว่าหน้า OK

---

## ได้รับมาจาก Lab ก่อน

- Lab 04–05: UI + guestbook · `npm run test:labs` เขียว
- SETUP: Playwright MCP ใน `.mcp.json` / `claude mcp add playwright`

## ได้เพิ่มใน Lab นี้

- **`docs/QA.md`** — E2E + a11y debate + action items P0/P1/P2
- (ควรมี) `docs/screenshots/*.png`

---

## ผลลัพธ์รูปธรรม (ไฟล์ที่ต้องมี)

| ไฟล์ | เนื้อหา |
|---|---|
| `docs/QA.md` | `## E2E Playwright`, `## a11y Debate`, `## a11y Action items` |
| Screenshots | ≥ 2 ไฟล์ใต้ `docs/screenshots/` |

**ยังไม่ผ่านถ้า…**

- ไม่มี QA.md หรือไม่มีหลักฐาน E2E
- ไม่รัน dev server แล้วเทส
- ใช้ Playwright MCP เป็นท่อส่งงานไป OpenCode

---

## Preflight

```powershell
claude mcp list    # ต้องมี playwright
npx -y @playwright/mcp@0.0.82 --help
npm run test:labs
```

Terminal **A** — dev server:

```powershell
npm run dev
```

Terminal **B** — `claude`

```powershell
$env:PORT = (Get-Content .env | Where-Object { $_ -match '^PORT=' }) -replace 'PORT=',''
if (-not $env:PORT) { $env:PORT = '4321' }
Write-Host "Base URL: http://localhost:$env:PORT"
```

---

## เลือกทาง A — TUI vs B — CLI

| ทาง | เหมาะกับ |
|---|---|
| **A — TUI + MCP tools** | ให้ Claude เรียก browser_navigate / snapshot |
| **B — CLI** | จำกัด — MCP ต้องผ่าน Claude session ที่เปิด MCP |

Prompts:

- [`prompts/01-playwright-e2e.md`](prompts/01-playwright-e2e.md)
- [`prompts/02-a11y-debate.md`](prompts/02-a11y-debate.md)

---

## ขั้นตอน

### 1) สร้าง QA scaffold

```powershell
@'
# QA — Personal Site

> Lab 06

'@ | Set-Content -Encoding utf8 .\docs\QA.md
New-Item -ItemType Directory -Force -Path .\docs\screenshots | Out-Null
```

### 2) E2E ผ่าน Playwright MCP

ใน `claude` วาง [`01-playwright-e2e.md`](prompts/01-playwright-e2e.md)

ติดตามให้ agent:

- navigate ทุกหน้าหลัก
- กรอกฟอร์ม demo
- บันทึกผลใน QA.md

### 3) a11y debate

วาง [`02-a11y-debate.md`](prompts/02-a11y-debate.md)  
แยก subagent 2 รอบถ้าต้องการ context สะอาด

### 4) (ทางเลือก) fix P0 เล็ก ๆ

```powershell
git checkout -b lab-06-qa-fix
# แก้ label / contrast 1 จุด
npm test
git commit -am "fix(a11y): Lab 06 P0 label"
```

### 5) Commit QA artifacts

```powershell
git add docs/QA.md docs/screenshots/
git commit -m "docs: Lab 06 QA and screenshots"
```

---

## ตัวอย่างผลลัพธ์ที่คาดหวัง

**`docs/QA.md` (ย่อ)**

```markdown
## E2E Playwright
| Step | Result |
|------|--------|
| Home headline | Pass — ตรง PROFILE |
| Contact submit | Pass — 200 + success message |

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

## คำสั่งตรวจ

```powershell
Test-Path .\docs\QA.md
Get-ChildItem .\docs\screenshots\
Select-String -Path .\docs\QA.md -Pattern "## E2E","## a11y"
npm run test:labs
```

---

## เกณฑ์ผ่าน Lab

- [ ] QA.md ครบ 3 หัวข้อหลัก · E2E บันทึก pass/fail ชัด
- [ ] Screenshots ≥ 2
- [ ] a11y debate มี Advocate + Pragmatist + ≥ 3 action items
- [ ] ใช้ Playwright MCP จริง (ไม่ใช่แค่ `npm test` แทน E2E)

## ยังไม่ผ่านถ้า…

- E2E เป็น hypothetical ไม่มี step จริง
- dev server ไม่รันระหว่างทดสอบ
- ไม่มี prioritization P0/P1/P2

---

## Troubleshooting Windows

| อาการ | ทำอะไร |
|---|---|
| Playwright MCP ไม่ขึ้น | `claude mcp add playwright -- npx -y @playwright/mcp@0.0.82` |
| navigate localhost fail | ตรวจ dev server · firewall · PORT ใน `.env` |
| screenshot ว่าง | รอ snapshot หลัง load · ลอง `browser_wait_for` |
| MCP timeout | ลด scope ทดสอบทีละหน้า |
| path screenshot | ใช้ `docs/screenshots/home.png` relative repo root |

---

---

## Playwright MCP 0.0.82 — สิ่งที่ควรรู้

- ติดตั้งผ่าน `npx -y @playwright/mcp@0.0.82` ตาม [`SETUP.md`](../../SETUP.md)
- MCP ควบคุมเบราว์เซอร์ผ่าน Claude — **ไม่แทน** unit test ใน `npm test`
- ถ้า tool `browser_snapshot` ล้ม: ลด viewport · ปิด animation ใน dev ถ้ามี

### โครง `docs/QA.md` เต็ม (แนะนำ)

```markdown
# QA — Personal Site
## Environment
- Date, Claude version, base URL

## E2E Playwright
(table steps)

## a11y Debate
### Advocate
### Pragmatist

## a11y Action items
P0 / P1 / P2

## Regressions for Lab 07
- (เว้นว่างหรือเติมหลัง review)
```

### ไม่ใช้ Playwright MCP เพื่อ

- ส่ง prompt ไป OpenCode
- แก้ไฟล์โดยไม่บันทึกใน QA.md
- ยืนยัน production (ทำใน Lab 08)

---

**Lab ถัดไป:** [`lab-07-cross-model-review`](../lab-07-cross-model-review/README.md)
