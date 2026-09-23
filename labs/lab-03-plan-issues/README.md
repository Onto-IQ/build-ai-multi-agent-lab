# Lab 03 — Plan → GitHub Issues (GitHub MCP)

**เวลาเป้าหมาย:** 60–75 นาที  
**เครื่องมือ:** Claude Code **2.1.278+** · **GitHub MCP** · `gh` CLI  
**Issue อ้างอิง:** `[Lab 03] Issues from decisions`

## เป้าหมาย

แปลง **`docs/DECISIONS.md`** เป็น **backlog จริงบน GitHub** ด้วย MCP  
แล้วเทียบประสบการณ์กับ **`gh issue create`**  
**จุดที่ควรรู้สึกว้าว:** acceptance criteria ใน issue อ่านแล้ว implement ได้โดยไม่ต้องถามซ้ำ

---

## ได้รับมาจาก Lab ก่อน

- Lab 01–02: `docs/PROFILE.md`, `docs/DECISIONS.md`, `docs/DEBATE.md`
- SETUP: `.mcp.json`, `GITHUB_PERSONAL_ACCESS_TOKEN`, `gh repo set-default` ชี้ repo คุณ
- มี issues จาก `create-course-issues` แล้ว (Lab 03 **เพิ่ม** issues จาก decisions)

## ได้เพิ่มใน Lab นี้

- Issues ≥ 4 อัน จาก decisions D1–D6
- ส่วน **`## Lab 03 — MCP vs gh`** ท้าย `docs/DECISIONS.md`

---

## ผลลัพธ์รูปธรรม (ไฟล์ที่ต้องมี)

| หลักฐาน | รายละเอียด |
|---|---|
| GitHub Issues | ≥ 4 issues ใหม่ใน **repo ของคุณ** · body มี acceptance checklist |
| เอกสาร | `docs/DECISIONS.md` มีตารางสรุป issue # + MCP vs gh |
| MCP | ใช้สร้าง issue จริง (ไม่ใช่แค่ draft ในแชท) |

**ยังไม่ผ่านถ้า…**

- issue ไป repo Onto-IQ / upstream
- MCP 401 แล้วเคลมผ่านโดยไม่แก้ PAT
- ไม่มี acceptance criteria ใน issue body

---

## Preflight

```powershell
# repo ของคุณ
Test-Path .\docs\DECISIONS.md
gh auth status
gh repo view --json nameWithOwner
claude mcp list
# ต้องเห็น github (หรือชื่อที่ตั้งไว้)
```

โหลด token ก่อนเปิด claude (ตัวอย่าง):

```powershell
Get-Content .\.env | ForEach-Object {
  if ($_ -match '^GITHUB_PERSONAL_ACCESS_TOKEN=(.+)$') { $env:GITHUB_PERSONAL_ACCESS_TOKEN = $matches[1] }
}
claude mcp list
```

---

## เลือกทาง A — TUI vs B — CLI

| ทาง | เหมาะกับ |
|---|---|
| **A — TUI** | MCP โต้ตอบ · แก้ body issue ทีละข้อ |
| **B — CLI** | สร้าง issue ด้วย `gh` เป็นหลัก · Claude ช่วยร่าง markdown |

Prompts:

- [`prompts/01-issues-from-decisions.md`](prompts/01-issues-from-decisions.md)
- [`prompts/02-gh-compare.md`](prompts/02-gh-compare.md)

**หมายเหตุ:** Lab 03 เน้น **MCP สำหรับงาน GitHub** — ไม่ใช้ MCP เป็นท่อส่งงาน Claude ↔ OpenCode

---

## ขั้นตอน

### 1) ตรวจ decisions

```powershell
Select-String -Path .\docs\DECISIONS.md -Pattern "\| D"
```

### 2) TUI + MCP

```powershell
claude
```

วาง [`01-issues-from-decisions.md`](prompts/01-issues-from-decisions.md)

รอจน agent รายงาน Issue # แล้วเปิดเบราว์เซอร์ตรวจ

### 3) ยืนยันด้วย gh

```powershell
gh issue list --limit 15
gh issue view <number> --web
```

### 4) เทียบ gh

วาง [`02-gh-compare.md`](prompts/02-gh-compare.md)  
หรือรันเอง:

```powershell
gh issue create --title "[Lab 03] Draft compare gh" --body "Draft for learning — close if duplicate" --label enhancement
```

### 5) Commit เอกสาร

```powershell
git add docs/DECISIONS.md
git commit -m "docs: Lab 03 issue planning notes"
```

---

### ทาง B — CLI (gh หลัก)

```powershell
# ให้ Claude ร่าง body เป็นไฟล์ชั่วคราว
claude -p --permission-mode acceptEdits "Read docs/DECISIONS.md. Write issue-bodies/d2-guestbook.md with acceptance criteria for decision D2 only."
gh issue create --title "[D2] Guestbook scope" --body-file issue-bodies/d2-guestbook.md
```

ทำซ้ำสำหรับ decisions อื่น · ยังต้องมีส่วน MCP vs gh ใน DECISIONS

---

## ตัวอย่างผลลัพธ์ที่คาดหวัง

**Issue body (ย่อ)**

```markdown
## Context
จาก docs/DECISIONS.md D2 — เปิด guestbook v1 พร้อม rate limit

## Acceptance
- [ ] ฟอร์ม contact บันทึกลง SQLite
- [ ] ไม่ leak stack trace ต่อผู้ใช้
- [ ] npm run test:labs ผ่านเมื่อ implement (Lab 05)
```

**`docs/DECISIONS.md` ท้ายไฟล์**

```markdown
## Lab 03 — MCP vs gh
- MCP: สร้าง 4 issues ใน ~3 นาที ...
- gh: ควบคุม script ได้ ...
```

---

## คำสั่งตรวจ

```powershell
(gh issue list --state open --limit 50 | Measure-Object -Line).Lines
Select-String -Path .\docs\DECISIONS.md -Pattern "## Lab 03 — MCP vs gh"
npm test
```

---

## เกณฑ์ผ่าน Lab

- [ ] ≥ 4 issues ใหม่ map กับ decisions · มี acceptance checklist
- [ ] Issues อยู่ repo ของผู้เรียน · ไม่มี secret ใน body
- [ ] มี `## Lab 03 — MCP vs gh` ≥ 5 bullet
- [ ] ใช้ GitHub MCP สร้างอย่างน้อย 1 issue (แนะนำทั้งหมด)

## ยังไม่ผ่านถ้า…

- แค่ list ในแชทไม่มี issue บน GitHub
- copy acceptance จาก template โดยไม่อ้าง D-id
- ใช้ MCP เรียก OpenCode / Claude อีกฝั่ง (ผิดจุดประสงค์คอร์ส)

---

## Troubleshooting Windows

| อาการ | ทำอะไร |
|---|---|
| GitHub MCP 401 | สร้าง PAT ใหม่ · scope Issues R/W · อัป `.mcp.json` |
| `gh` ชี้ repo ผิด | `gh repo set-default owner/repo` |
| MCP ไม่ list | `copy .mcp.json.example .mcp.json` · restart `claude` |
| สร้าง issue ซ้ำ | ปิด duplicate · อ้าง # ใน DECISIONS |
| fine-grained PAT จำกัด repo | เลือกเฉพาะ repo ของคุณใน token settings |

---

---

## บทบาท GitHub MCP ในคอร์ส

MCP ใช้กับ **งานผลิต** (อ่าน/สร้าง issue, PR, Playwright) — Lab 03 ฝึก **backlog จากเอกสาร**  
Issue ที่สร้างควร **ปิดได้ด้วย PR เดียวหรือสอง PR** (FE/BE) ไม่ใช่ epic ใหญ่ไม่จบ

### ตัวอย่าง mapping Decision → Issue

| Decision ID | Title ตัวอย่าง | ปิดโดย Lab |
|---|---|---|
| D1 headline/copy | `[D1] Align Home hero with PROFILE` | 04 |
| D2 guestbook | `[D2] Guestbook API + validation` | 05 |
| D3 visual tone | `[D3] Theme color from tone.primaryColor` | 04 |
| D4 a11y | `[D4] Form labels and focus states` | 04/06 |

### คำสั่ง gh เพิ่มเติม

```powershell
gh issue list --label enhancement
gh issue view 12 --json title,body,url
gh api repos/{owner}/{repo}/issues --jq '.[].number' | Select-Object -First 10
```

### หมายเหตุ PAT

- Fine-grained: เลือก repo เดียว · Issues + Contents + Pull requests
- หมุน token หลังคอร์ส · อย่า paste ใน issue body

---

**Lab ถัดไป:** [`lab-04-frontend`](../lab-04-frontend/README.md)
