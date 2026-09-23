# Lab 07 — Cross-Model Review (OpenCode ↔ Claude)

**เวลาเป้าหมาย:** 60–75 นาที  
**เครื่องมือ:** OpenCode **2.0.6+** (`opencode run`) · Claude Code **2.1.278+** (`claude -p`)  
**Issue:** `[Lab 07] Cross-model review`  
**สินค้า:** [Onto-IQ/course-personal-site](https://github.com/Onto-IQ/course-personal-site)

## เป้าหมาย

ให้ **ฝั่งที่ไม่ได้เขียน PR หลัก** รีวิว diff อย่างอิสระ · โพสต์ **PR comment** · ฝั่งต้นทาง **rebut หรือแก้** · สรุป round-trip  
นี่คือ **เหตุผลเดียวที่ส่งงานข้าม CLI** ในคอร์ส — ลดจุดบอดด้วยมุมมองคนละโมเดล  
**จุดที่ควรรู้สึกว้าว:** OpenCode จับความเสี่ยงที่ Claude มองข้าม (หรือกลับกัน) โดยไม่ share context ผ่าน MCP

**ห้าม:** ใช้ MCP เป็นท่อให้ Claude เรียก OpenCode หรือกลับกัน · ห้าม JSON orchestration bus

---

## ได้รับมาจาก Lab ก่อน

- PR จาก [`Lab 04`](../lab-04-frontend/README.md) (Frontend / Claude) และ/หรือ [`Lab 05`](../lab-05-backend/README.md) (Backend / OpenCode)
- [`Lab 06`](../lab-06-playwright/README.md): `docs/QA.md` อ้างอิงได้
- `npm run test:labs` เขียวบน branch ที่รีวิว
- แท็บ Windows Terminal แยก: `claude` กับ `opencode`

## ได้เพิ่มใน Lab นี้

- Review artifact: `docs/review-opencode.md` และ/หรือ `docs/review-claude-rebuttal.md`
- **≥ 2 PR comments** (review + สรุป round-trip ภาษาไทย)
- (ถ้ามี) commit แก้ Must fix ที่ยอมรับ

---

## ผลลัพธ์รูปธรรม (ไฟล์ที่ต้องมี)

| รายการ | ที่อยู่ |
|---|---|
| Review จาก OpenCode | `docs/review-opencode.md` หรือ stdout ที่ archive ใน repo |
| Rebuttal จาก Claude | `docs/review-claude-rebuttal.md` |
| หลักฐาน GitHub | PR comment(s) บน PR จริง |
| (ชั่วคราว) diff | `docs/_pr-diff.txt` — ลบหรือ gitignore ได้หลัง Lab |

**ต้องเห็นด้วยตา:** บน GitHub PR มี comment ที่แยก Must/Should/Nit และมีสรุปว่ารับ/ไม่รับข้อใด

**ยังไม่ผ่านถ้า…**

- review อยู่แค่ในแชท ไม่ post PR
- ใช้ MCP ส่งไฟล์ระหว่างสอง CLI
- รีวิว copy เดียวกันทั้งสองฝั่ง · ไม่มี rebut

---

## Preflight

```powershell
# repo สินค้า
cd <your-personal-site-repo>
gh pr list
gh pr view <num> --json url,headRefName,baseRefName
claude --version
opencode --version
npm run test:labs
Test-Path .\docs\DECISIONS.md
```

เลือก PR หนึ่งตัว (เช่น `#3`) จาก Lab 04 หรือ 05

**แผนที่เครื่องมือ**

```text
PR author Claude  → Reviewer: opencode run
PR author OpenCode → Reviewer: claude -p
```

---

## เลือกทาง A — TUI vs B — CLI

| ทาง | เหมาะกับ | หมายเหตุ |
|---|---|---|
| **A — TUI** | วาง prompt ใน `opencode` / `claude` ทีละขั้น | อ่าน [`prompts/`](prompts/) |
| **B — CLI** | `opencode run` + `claude -p` + `gh pr comment` | แนะนำในห้องเรียน |

Prompts:

- [`prompts/01-opencode-review.md`](prompts/01-opencode-review.md)
- [`prompts/02-claude-rebuttal.md`](prompts/02-claude-rebuttal.md)

Handoff = **ข้อความ + git + gh** เท่านั้น

---

## ขั้นตอน

### 1) ดึง diff

```powershell
gh pr diff <num> | Out-File -Encoding utf8 .\docs\_pr-diff.txt
Get-Content .\docs\_pr-diff.txt | Select-Object -First 25
```

### 2) OpenCode รีวิว (เมื่อ PR จาก Claude)

**ทาง B — ตัวอย่าง**

```powershell
opencode run "อ่าน docs/_pr-diff.txt และ docs/DECISIONS.md เขียน docs/review-opencode.md ภาษาไทย หัวข้อ: สรุป, จุดแข็ง, ความเสี่ยง, Must fix, คำถามต่อ Claude. อย่าแก้ src/"
```

**ทาง A:** เปิด `opencode` แล้ววาง [`01-opencode-review.md`](prompts/01-opencode-review.md)

ตรวจ:

```powershell
Test-Path .\docs\review-opencode.md
Get-Content .\docs\review-opencode.md -Head 35
```

### 3) Claude rebut / fix

```powershell
claude -p "อ่าน docs/review-opencode.md และ docs/DECISIONS.md เขียน docs/review-claude-rebuttal.md ระบุยอมรับ/ปฏิเสธ/follow-up — แก้ Must ที่ยอมรับได้ถ้าจำเป็น" --permission-mode acceptEdits
```

หรือ TUI + [`02-claude-rebuttal.md`](prompts/02-claude-rebuttal.md)

```powershell
npm run test:labs
git push
```

### 4) โพสต์ PR comment

```powershell
@"
## Cross-model review (Lab 07)

### OpenCode
$(Get-Content docs/review-opencode.md -Raw)

### Claude
$(Get-Content docs/review-claude-rebuttal.md -Raw)

### ทำไม cross-model คุ้ม
- (เติม 2–3 bullet)
"@ | Set-Content -Encoding utf8 .\docs\_pr-comment.md

gh pr comment <num> --body-file .\docs\_pr-comment.md
```

### 5) Commit artifacts (ไม่บังคับ _pr-diff)

```powershell
git add docs/review-opencode.md docs/review-claude-rebuttal.md
git commit -m "docs: Lab 07 cross-model review artifacts"
git push
```

---

## ตัวอย่างผลลัพธ์ที่คาดหวัง

**`docs/review-opencode.md` (ย่อ)**

```markdown
## Must fix
- [ ] Validate message max length (DoS)

## Should
- แยก user-facing error จาก log

## Nit
- ชื่อ handler ...
```

**PR comment:** มีทั้ง review, rebut, bullet "ทำไมคุ้ม"

---

## คำสั่งตรวจ

```powershell
gh pr view <num> --comments
Test-Path docs/review-opencode.md, docs/review-claude-rebuttal.md
npm run test:labs
```

---

## เกณฑ์ผ่าน Lab

- [ ] Review จาก **เครื่องมืออีกฝั่ง** บน PR จริง
- [ ] Rebuttal หรือ fix อย่างน้อย 1 ประเด็น Must/Should
- [ ] Summary ภาษาไทยว่าทำไมใช้เครื่องมือที่สองคุ้ม
- [ ] ไม่มี MCP pipe ระหว่าง CLI

## ยังไม่ผ่านถ้า…

- รีวิว PR ตัวเองในแชทเดียวกับที่ implement โดยไม่แยกโมเดล
- ไม่มี comment บน GitHub
- สร้าง custom orchestration / Flux bus

---

## Troubleshooting Windows

| อาการ | ทำอะไร |
|---|---|
| `opencode run` ยาวเกิน | รีวิวเฉพาะ `course/` + `src/pages/api` |
| `gh pr comment` encoding พัง | `--body-file` UTF-8 |
| ไม่มี PR | เปิดจาก branch Lab 04/05 ก่อน |
| Claude เรียก opencode ใน subprocess | หยุด — copy findings เอง |
| diff ว่าง | `gh pr diff` บน PR ที่มี commit |

---

## บันทึก issue (แนะนำ)

```powershell
gh issue list --search "Lab 07"
gh issue comment <id> --body "Cross-model complete on PR #<num>"
```

---

**Lab ถัดไป:** [`lab-08-ship`](../lab-08-ship/README.md)
