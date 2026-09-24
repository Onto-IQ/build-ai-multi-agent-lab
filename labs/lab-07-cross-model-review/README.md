# Lab 07 — ให้เครื่องมืออีกฝั่งรีวิวงานของคุณ

**ใช้เวลาประมาณ:** 60–75 นาที  
**เครื่องมือ:** OpenCode (`opencode run`) · Claude Code (`claude`) · `gh`  
**ผลลัพธ์หลัก:** `docs/review-*.md` + **PR comment จริงบน GitHub**

> นี่คือ lab ของ **reviewer** — โต้วาทีข้าม harness 2–3 รอบ เพื่อลดจุดบอดด้วยคนละโมเดล  
> Call ข้าม harness ในคอร์สนี้ = headless one-shot ผ่านไฟล์ (Lab 04/05 ใช้แล้ว) — ที่นี่ต่อเป็นหลายรอบ แต่**คุณยังเป็นกรรมการกดทีละรอบ**  
> **ห้าม**ใช้ MCP เป็นท่อให้ Claude เรียก OpenCode (หรือกลับกัน) · ห้าม daemon/loop

---

## คุณจะได้อะไรจาก Lab นี้

1. ดึง diff จาก PR แล้วให้**ฝั่งที่ไม่ได้เขียน**รีวิว  
2. ตอบกลับ (rebut) หรือแก้ Must fix  
3. โพสต์สรุป round-trip บน PR เป็นภาษาไทย

**ความรู้ที่ควรติดตัว**

- Cross-model = call ข้าม harness แบบ one-shot ผ่านไฟล์ — ไม่ต้องมี orchestration bus · **คุณ**เป็นกรรมการปิดรอบ  
- Must / Should / Nit ช่วยจัดลำดับก่อน ship  
- รีวิวในแชทอย่างเดียวไม่พอ — ต้องเห็นบน GitHub

> **ทำไมต้องประสาน (เสา 3):** ประโยชน์คือ**ลดจุดบอด**ด้วยคนละโมเดล โดย**ไม่** share context ผ่าน MCP  
> **PR comment** = หลักฐานรีวิวบน GitHub · **ไฟล์** `docs/review-*.md` (+ handoff ใน `docs/handoffs/` ถ้าสลับ CLI) = สิ่งที่ agent อ่านต่อ  
> คนละชั้นกับ handoff 04→05: ที่นั่นส่ง “งานถัดไป” · ที่นี่ส่ง “ผลการรีวิว” ขึ้น PR  
> **Commit ก่อนสลับ** OpenCode ↔ Claude · single-writer บน STATUS ถ้ามีการอัปเดตสถานะ

---

## ก่อนเริ่ม

ต้องมี PR จาก Lab 04 และ/หรือ Lab 05 · `test:labs` เขียวบน branch นั้น · อ่าน STATUS / OPEN_LOOPS

เปิด **2 แท็บ** Windows Terminal: อันหนึ่งพร้อม `claude` อีกอันพร้อม `opencode`

```powershell
cd <โฟลเดอร์-repo-ของคุณ>
gh pr list
claude --version
opencode --version
npm run test:labs
Get-Content .\docs\STATUS.md -Head 25
```

เลือกหมายเลข PR หนึ่งตัว (เช่น `#3`)

ก่อนสลับไป OpenCode รีวิว: `git status` ควรสะอาด (หรือ commit งานค้างก่อน) — **อย่า**ให้สอง harness เขียนไฟล์ร่วมพร้อมกัน

**แผนที่เครื่องมือ**

```text
PR ที่ Claude เขียนเป็นหลัก  → ให้ OpenCode รีวิว
PR ที่ OpenCode เขียนเป็นหลัก → ให้ Claude รีวิว
```

(ในห้องเรียนมักเริ่มจาก PR Frontend ของ Lab 04 → OpenCode รีวิว)

---

## เลือกวิธีทำ

| ทาง | เหมาะกับใคร |
|---|---|
| **A — TUI** | วาง prompt ใน `opencode` / `claude` ทีละขั้นตอน |
| **B — CLI (แนะนำในห้อง)** | `opencode run` + `claude -p` + `gh pr comment` |
| **C — ให้ agent เรียกเอง (ทางเลือก)** | ในเซสชัน `opencode` ใช้ skill `claude-code` · ในเซสชัน `claude` ใช้ skill `opencode` — agent รันคำสั่งข้ามเอง (ยัง one-shot ต่อรอบ ผ่านไฟล์ ตามกติกาใน [`COURSE.md`](../../COURSE.md)) |

Prompts: [`01-opencode-review.md`](prompts/01-opencode-review.md) · [`02-claude-rebuttal.md`](prompts/02-claude-rebuttal.md)  

**อย่าสับสนกับ PR:**  
- ผลรีวิวหลัก = `docs/review-*.md` แล้ว **โพสต์เป็น PR comment** (เกณฑ์ผ่าน Lab นี้)  
- `docs/handoffs/07-*.md` = **ทางเลือก** เมื่อต้องการ Request to next agent สั้น ๆ ก่อนสลับ CLI — ไม่แทน PR comment  
ดูตารางแยกชั้นที่ [`docs/handoffs/README.md`](../../docs/handoffs/README.md)

---

## ขั้นตอนการทำ Lab (กรณี OpenCode รีวิว PR ของ Claude)

### ขั้นที่ 1 — ดึง diff (คุณทำ)

**ทำที่:** Windows Terminal (แท็บ `powershell`) — พิมพ์ตามนี้

```powershell
gh pr diff <num> | Out-File -Encoding utf8 .\docs\_pr-diff.txt
Get-Content .\docs\_pr-diff.txt | Select-Object -First 25
```

### ขั้นที่ 2 — OpenCode รีวิว

**ทำที่:** ทาง A → แท็บ `opencode` · ทาง B → แท็บ `powershell` · ทาง C → แท็บ `claude`

**ทาง A:** เปิด `opencode` → วาง `01-opencode-review.md`

**ทาง B:**

```powershell
opencode run "Read docs/_pr-diff.txt and docs/DECISIONS.md. Write docs/review-opencode.md in Thai with Must/Should/Nit. Do not edit src/."
```

**ทาง C — ให้ agent เรียกเอง:** อยู่ในเซสชัน `claude` ที่ root แล้วพิมพ์ให้ Claude ใช้ skill `opencode` เรียก OpenCode รีวิวเอง เช่น

```text
ใช้ skill opencode เรียก OpenCode one-shot: อ่าน docs/_pr-diff.txt และ docs/DECISIONS.md
แล้วเขียน docs/review-opencode.md (ภาษาไทย, Must/Should/Nit) — ห้ามแก้ src/
จากนั้นอ่านไฟล์สรุปให้ฉันฟังสั้น ๆ
```

(ยังเป็น one-shot ต่อรอบ ผ่านไฟล์ ตามกติกา — คุณเป็นกรรมการอ่านผล ไม่ใช่ loop)

ตรวจไฟล์:

```powershell
Get-Content .\docs\review-opencode.md -Head 35
```

ถ้าต้องการ handoff ชัดก่อน Claude ตอบ:

```powershell
Copy-Item .\docs\handoffs\TEMPLATE.md .\docs\handoffs\07-opencode-to-claude.md
# เติม Request = rebut / fix Must · Verification = อ่านอย่างเดียวรอบนี้
git add docs/review-opencode.md docs/handoffs/07-opencode-to-claude.md
git commit -m "docs: Lab 07 OpenCode review handoff"
```

### ขั้นที่ 3 — Claude ตอบ / แก้

**ทำที่:** ทาง A → แท็บ `claude` · ทาง B → แท็บ `powershell` · ทาง C → แท็บ `opencode`

**ทาง A:** เปิด `claude` → วาง `02-claude-rebuttal.md`

**ทาง B:**

```powershell
claude -p "Read docs/review-opencode.md and docs/DECISIONS.md. Write docs/review-claude-rebuttal.md. Fix valid Must items or rebut." --permission-mode acceptEdits
```

**ทาง C — ให้ agent เรียกเอง:** อยู่ในเซสชัน `opencode` ที่ root แล้วพิมพ์ให้ OpenCode ใช้ skill `claude-code` เรียก Claude ตอบเอง เช่น

```text
ใช้ skill claude-code เรียก Claude one-shot: อ่าน docs/review-opencode.md และ docs/DECISIONS.md
แล้วเขียน docs/review-claude-rebuttal.md — Fix valid Must items หรือ rebut
จากนั้นสรุปผลให้ฉันฟังสั้น ๆ
```

แล้ว:

```powershell
npm run test:labs
git push
```

### ขั้นที่ 4 — รอบสอง (แนะนำ): ฝั่งรีวิวปิดวารอบ

**ทำที่:** Windows Terminal (แท็บ `powershell`) — พิมพ์ตามนี้ (OpenCode ทำงาน headless)

ฝั่งที่รีวิวอ่าน rebuttal แล้วตัดสินทีละข้อ — จุดที่ "บทสนทนา" กลายเป็นหลักฐานบน git:

```powershell
opencode run "Read docs/review-opencode.md and docs/review-claude-rebuttal.md. For each Must item decide accept (fixed) / accept (valid rebuttal) / reject with a reason, in Thai. Append a '## Round 2 — close' section to docs/review-opencode.md. Do not edit any src/ file."
```

- **จำกัด 2–3 รอบพอ** — ถ้ารอบถัดไปยังไม่จบ ให้ผู้เรียนชี้ขาด (คนตัดสิน ไม่ใช่ loop อัตโนมัติ)
- ทุกรอบต้องลงไฟล์ `docs/review-*.md` — บทสนทนาทั้งหมดกลายเป็น artifact ที่ commit ได้
- ถ้าฝั่งรีวิวขอแก้ Must เพิ่ม → กลับไปขั้นที่ 3 อีกรอบตาม ownership เดิม

### ขั้นที่ 5 — โพสต์บน PR (คุณทำ)

**ทำที่:** Windows Terminal (แท็บ `powershell`) — พิมพ์ตามนี้

```powershell
@"
## Cross-model review (Lab 07)

### OpenCode
$(Get-Content docs/review-opencode.md -Raw)

### Claude
$(Get-Content docs/review-claude-rebuttal.md -Raw)

### Round 2 — close (ถ้าทำ)
# คัดลอกส่วน '## Round 2 — close' จาก docs/review-opencode.md มาแปะตรงนี้

### ทำไม cross-model คุ้ม
- (เติม 2–3 bullet)
"@ | Set-Content -Encoding utf8 .\docs\_pr-comment.md

gh pr comment <num> --body-file .\docs\_pr-comment.md
```

### ขั้นที่ 6 — Commit artifacts

**ทำที่:** Windows Terminal (แท็บ `powershell`) — พิมพ์ตามนี้

```powershell
git add docs/review-opencode.md docs/review-claude-rebuttal.md
# ถ้าทำรอบสอง: git add ครอบคลุม docs/review-opencode.md อยู่แล้ว (append ในไฟล์เดิม)
# ถ้าอัปเดต Hot state หลังแก้ Must:
# git add docs/STATUS.md docs/OPEN_LOOPS.md docs/handoffs/07-opencode-to-claude.md
git commit -m "docs: Lab 07 cross-model review artifacts"
git push
```

ตรวจท้ายไฟล์ review/rebuttal ว่ามีหัวข้อประมาณนี้:

```markdown
## Canonical state updated
- [ ] docs/STATUS.md
- [ ] docs/OPEN_LOOPS.md
- [ ] docs/DECISIONS.md (ถ้ามี decision ใหม่)
```

---

## ตัวอย่าง Must fix ที่ดี

```markdown
## Must fix
- [ ] Validate message max length (DoS)

## Should
- แยก user-facing error จาก log

## Nit
- ชื่อ handler ...
```

---

## สิ่งที่ได้รับหลังจบ Lab

| สิ่งที่ได้รับ | ผ่านเมื่อ |
|---|---|
| Review | `docs/review-opencode.md` (หรือเทียบเท่า) |
| Rebuttal | `docs/review-claude-rebuttal.md` |
| (แนะนำ) รอบสอง | `docs/review-opencode.md` มีหัวข้อ **Round 2 — close** ตัดสินครบทุก Must |
| Canonical checklist | ท้าย review/rebuttal มีหัวข้อ **Canonical state updated** (STATUS / OPEN_LOOPS / DECISIONS) |
| หลักฐาน GitHub | ≥ 1–2 PR comments (review + สรุป) |
| (ชั่วคราว) | `docs/_pr-diff.txt` — ลบหรือไม่ commit ก็ได้ |

**ยังไม่ผ่านถ้า…** รีวิวอยู่แค่ในแชท · ใช้ MCP pipe ระหว่าง CLI · ไม่มี rebut · ไม่มี checklist Canonical state updated

---

## ตรวจว่าผ่านหรือยัง

```powershell
gh pr view <num> --comments
Test-Path docs/review-opencode.md, docs/review-claude-rebuttal.md
npm run test:labs
```

- [ ] Review จาก**เครื่องมืออีกฝั่ง** บน PR จริง  
- [ ] Rebut หรือ fix อย่างน้อย 1 ประเด็น  
- [ ] (ถ้าทำรอบสอง) ผลปิดรอบอยู่ในไฟล์ `docs/review-opencode.md` ไม่ใช่แชท  
- [ ] สรุปภาษาไทยว่าทำไมใช้เครื่องมือที่สองคุ้ม  
- [ ] มี **Canonical state updated** ใน review หรือ rebuttal  
- [ ] ไม่มี MCP pipe ระหว่าง CLI · commit ก่อนสลับ harness  

---

## ติดปัญหาบ่อย

| อาการ | ลองทำ |
|---|---|
| `opencode run` ช้า/ยาว | รีวิวเฉพาะ `tests/labs/` + `src/pages/api/` + ไฟล์ที่ diff แตะ |
| encoding เพี้ยนใน PR | ใช้ `--body-file` UTF-8 |
| ไม่มี PR | เปิดจาก branch Lab 04/05 ก่อน |
| ฝั่งถูกเรียกแกะไฟล์เกินขอบเขต | ย้ำใน prompt ว่าเขียนได้เฉพาะไฟล์รายงาน · rollback ใน Source Control แล้วรันใหม่ |
| STATUS ถูกเขียนทับเงียบ ๆ | single-writer — สลับ harness หลัง commit เท่านั้น |

---

**Lab ถัดไป:** [`lab-08-ship`](../lab-08-ship/README.md)
