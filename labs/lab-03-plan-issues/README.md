# Lab 03 — จากเอกสารตัดสินใจ → Issue บน GitHub

**ใช้เวลาประมาณ:** 60–75 นาที  
**เครื่องมือ:** Claude Code · **GitHub MCP** · `gh` CLI  
**ผลลัพธ์หลัก:** Issues ≥ 4 อันใน **repo ของคุณ** + บันทึกเทียบ MCP vs `gh`

> จุดนี้คือ “แผนกลายเป็นงานที่ปิดได้” — ไม่ใช่แค่ไฟล์ markdown ในเครื่อง

---

## คุณจะได้อะไรจาก Lab นี้

1. **สร้าง issue จริง** จาก `docs/DECISIONS.md` ผ่าน GitHub MCP  
2. **เทียบ MCP กับ `gh`** — เมื่อไหร่ใช้อะไร  
3. Issue ที่อ่านแล้ว implement ได้โดยไม่ต้องถามซ้ำ (acceptance checklist)

**ความรู้ที่ควรติดตัว**

- MCP ในคอร์สนี้ใช้กับ**งานผลิต** (issue / PR / เบราว์เซอร์) — **ไม่**ใช้เป็นท่อ Claude ↔ OpenCode  
- Issue ดี = มี D-id + acceptance ที่เช็คได้ · ไม่ใช่ epic กว้างไม่จบ  
- PAT / สิทธิ์ผิด = หยุด อย่าเดาว่าสร้างสำเร็จ

> **ทำไมต้องประสาน (เสา 3):** `DECISIONS.md` → GitHub Issues = สัญญาข้ามคนและข้าม agent  
> Frontend (Lab 04) กับ Backend (Lab 05) จะปิด issue คนละใบจากเอกสารชุดเดียวกัน — ไม่ต้องนั่งอธิบายซ้ำในแชท

---

## ก่อนเริ่ม

ต้องมี [`Lab 02`](../lab-02-debate/README.md) — มี `docs/DECISIONS.md`  
SETUP: `.mcp.json`, `GITHUB_PERSONAL_ACCESS_TOKEN`, `gh repo set-default` ชี้ repo **คุณ**

```powershell
cd <โฟลเดอร์-repo-ของคุณ>
Test-Path .\docs\DECISIONS.md
gh auth status
gh repo view --json nameWithOwner
```

โหลด token แล้วเปิดรายการ MCP:

```powershell
Get-Content .\.env | ForEach-Object {
  if ($_ -match '^GITHUB_PERSONAL_ACCESS_TOKEN=(.+)$') {
    $env:GITHUB_PERSONAL_ACCESS_TOKEN = $matches[1]
  }
}
claude mcp list
```

ต้องเห็น GitHub MCP · ถ้าไม่เห็น → กลับ [`SETUP.md`](../../SETUP.md)

---

## เลือกวิธีทำ

| ทาง | เหมาะกับใคร |
|---|---|
| **A — TUI + MCP (แนะนำ)** | ให้ Claude สร้าง issue ผ่าน MCP แล้วคุณเปิดเว็บตรวจ |
| **B — `gh` เป็นหลัก** | คุณสร้าง issue ด้วย CLI · Claude ช่วยร่าง body |

Prompts: [`01-issues-from-decisions.md`](prompts/01-issues-from-decisions.md) · [`02-gh-compare.md`](prompts/02-gh-compare.md)

---

## ทาง A — ขั้นตอนการทำ Lab

### ขั้นที่ 1 — ดู decisions

**ทำที่:** Windows Terminal (แท็บ `powershell`) — พิมพ์ตามนี้

```powershell
Select-String -Path .\docs\DECISIONS.md -Pattern "\| D"
```

### ขั้นที่ 2 — สร้าง issues ด้วย MCP

**ทำที่:** Windows Terminal แท็บ `claude` — พิมพ์ `claude` แล้ววาง prompt

```powershell
claude
```

วาง prompt จาก `01-issues-from-decisions.md`  
รอจนได้ Issue # แล้วเปิดเบราว์เซอร์ตรวจ title/body

**Headless (ทดสอบแล้ว — โหลด token ตาม "ก่อนเริ่ม" ก่อน แล้วอนุญาตเฉพาะ tool ของ github MCP):**

```powershell
claude -p (Get-Content -Raw .\labs\lab-03-plan-issues\prompts\01-issues-from-decisions.md) --permission-mode acceptEdits --allowedTools "mcp__github"
```

### ขั้นที่ 3 — ยืนยันด้วย `gh` (คุณทำเอง)

**ทำที่:** Windows Terminal (แท็บ `powershell`) — พิมพ์ตามนี้

```powershell
gh issue list --limit 15
gh issue view <number> --web
```

### ขั้นที่ 4 — เทียบกับ `gh`

**ทำที่:** Windows Terminal (แท็บ `powershell`) — พิมพ์ตามนี้ (หรือแท็บ `claude` วาง `02-gh-compare.md`)

วาง `02-gh-compare.md` หรือสร้าง draft เอง:

```powershell
gh issue create --title "[Lab 03] Draft compare gh" `
  --body "Draft for learning — close if duplicate" --label enhancement
```

ให้มีหัวข้อ `## Lab 03 — MCP vs gh` ใน DECISIONS

### ขั้นที่ 5 — Commit เอกสาร

**ทำที่:** Windows Terminal (แท็บ `powershell`) — พิมพ์ตามนี้

```powershell
git add docs/DECISIONS.md
git commit -m "docs: Lab 03 issue planning notes"
```

---

## ทาง B — CLI (`gh` หลัก)

**ทำที่:** Windows Terminal (แท็บ `powershell`) — พิมพ์ทีละบล็อก ต่อ decision

**D2 — Guestbook:**

```powershell
cd <โฟลเดอร์-repo-ของคุณ>
claude -p --permission-mode acceptEdits "Read docs/DECISIONS.md. Write issue-bodies/d2-guestbook.md with acceptance criteria for decision D2 only."
gh issue create --title "[D2] Guestbook scope" --body-file issue-bodies/d2-guestbook.md
```

**D1 — Headline:**

```powershell
claude -p --permission-mode acceptEdits "Read docs/DECISIONS.md. Write issue-bodies/d1-headline.md with acceptance criteria for decision D1 only."
gh issue create --title "[D1] Align Home hero with PROFILE" --body-file issue-bodies/d1-headline.md
```

**D3 — Visual:**

```powershell
claude -p --permission-mode acceptEdits "Read docs/DECISIONS.md. Write issue-bodies/d3-visual.md with acceptance criteria for decision D3 only."
gh issue create --title "[D3] Theme color from tone" --body-file issue-bodies/d3-visual.md
```

**D4 — a11y:**

```powershell
claude -p --permission-mode acceptEdits "Read docs/DECISIONS.md. Write issue-bodies/d4-a11y.md with acceptance criteria for decision D4 only."
gh issue create --title "[D4] Form labels and focus" --body-file issue-bodies/d4-a11y.md
```

**ยังต้องครบเกณฑ์ผ่าน 2 ข้อนี้ (ทำผ่านทาง A):**

- **ส่วน `## Lab 03 — MCP vs gh`** — เปิดแท็บ `claude` แล้ววาง [`prompts/02-gh-compare.md`](prompts/02-gh-compare.md) (เหมือนทาง A ขั้นที่ 4)  
- **≥ 1 issue สร้างผ่าน GitHub MCP** — เปิดแท็บ `claude` แล้ววาง [`prompts/01-issues-from-decisions.md`](prompts/01-issues-from-decisions.md) (เหมือนทาง A ขั้นที่ 2) — CLI อย่างเดียวสร้าง issue ทาง `gh` ไม่นับเป็นหลักฐาน MCP

ทำซ้ำ decisions อื่นถ้ามีเกิน 4 · ตรวจครบตามหัวข้อ "ตรวจว่าผ่านหรือยัง" ด้านล่าง

---

## ตัวอย่าง Issue ที่ดี

```markdown
## Context
จาก docs/DECISIONS.md D2 — เปิด guestbook v1 พร้อม rate limit

## Acceptance
- [ ] ฟอร์ม contact บันทึกลง SQLite
- [ ] ไม่ leak stack trace ต่อผู้ใช้
- [ ] npm run test:labs ผ่านเมื่อ implement (Lab 05)
```

### Mapping แนะนำ Decision → Issue

| Decision | Title ตัวอย่าง | ปิดโดย Lab |
|---|---|---|
| D1 headline | `[D1] Align Home hero with PROFILE` | 04 |
| D2 guestbook | `[D2] Guestbook API + validation` | 05 |
| D3 visual | `[D3] Theme color from tone` | 04 |
| D4 a11y | `[D4] Form labels and focus` | 04/06 |

---

## สิ่งที่ได้รับหลังจบ Lab

| สิ่งที่ได้รับ | ผ่านเมื่อ |
|---|---|
| Issues บน GitHub | ≥ 4 อันใน repo คุณ · body มี acceptance checklist |
| เอกสาร | ท้าย `docs/DECISIONS.md` มี `## Lab 03 — MCP vs gh` (≥ 5 bullet) |
| หลักฐาน MCP | ใช้อย่างน้อย 1 issue สร้างผ่าน MCP (แนะนำทั้งหมด) |

**ยังไม่ผ่านถ้า…** issue ไป Onto-IQ upstream · MCP 401 แล้วยังเคลมผ่าน · ไม่มี acceptance

---

## ตรวจว่าผ่านหรือยัง

```powershell
gh issue list --state open --limit 50
Select-String -Path .\docs\DECISIONS.md -Pattern "## Lab 03 — MCP vs gh"
npm test
```

- [ ] ≥ 4 issues map กับ decisions · มี acceptance  
- [ ] อยู่ repo คุณ · ไม่มี secret ใน body  
- [ ] มี `## Lab 03 — MCP vs gh`  
- [ ] ใช้ GitHub MCP จริงอย่างน้อย 1 ครั้ง  

---

## ติดปัญหาบ่อย

| อาการ | ลองทำ |
|---|---|
| GitHub MCP 401 | PAT ใหม่ · scope Issues · อัป `.mcp.json` · เปิด `claude` ใหม่ |
| `gh` ชี้ repo ผิด | `gh repo set-default owner/repo` |
| MCP ไม่ list | `copy .mcp.json.example .mcp.json` · restart `claude` |
| สร้างซ้ำ | ปิด duplicate · อ้าง # ใน DECISIONS |

**หมายเหตุ PAT:** fine-grained เลือก repo เดียว · หมุนหลังคอร์ส · อย่า paste ใน issue

---

**Lab ถัดไป:** [`lab-04-frontend`](../lab-04-frontend/README.md)
