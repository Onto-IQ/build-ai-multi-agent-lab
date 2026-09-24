# Lab 04 — ทำให้โปรไฟล์กลายเป็นหน้าเว็บ (Claude)

**ใช้เวลาประมาณ:** 90–120 นาที  
**เครื่องมือ:** Claude Code · GitHub MCP หรือ `gh` (เปิด PR)  
**Ownership:** Frontend / Claude  
**ผลลัพธ์หลัก:** หน้า Home / About / Interests / Contact + **PR ใน repo คุณ**

> เนื้อจาก Lab 01–02 ควรโผล่บน `localhost` — ไม่ต้องคัดลอกมือทั้งก้อน

---

## คุณจะได้อะไรจาก Lab นี้

1. ให้ Claude **implement UI** ตาม PROFILE + DECISIONS  
2. เปิด **Pull Request** ที่อ้าง issue / decisions  
3. แยกขอบเขต: หน้าเว็บตอนนี้ · API guestbook ทีหลัง (Lab 05)

**ความรู้ที่ควรติดตัว**

- **Ownership** ในคอร์ส: Frontend = Claude (`@frontend`) · Backend = OpenCode  
- Plan สั้น ๆ ก่อนแก้หลายไฟล์ ลดงานวน  
- `npm test` เขียว ≠ guestbook ครบ (`test:labs` อาจยังแดง)

> **ทวน Persistent Memory (Claude):** ก่อนลงมือ UI เรียก `@frontend` แล้วถามสิ่งที่จำจาก Lab 00 (หรือดู `.claude/agent-memory/frontend/`)  
> ถ้าจำไม่ได้ — สั่งให้บันทึกลง memory อีกรอบ แล้วทำงานต่อ · อย่าสร้างไฟล์ memory เองนอก harness

> **ทำไมต้องประสาน (เสา 3):** PR ของคุณต้องอ้าง issue / `DECISIONS.md` เดียวกับที่ Backend จะใช้อีกฝั่ง  
> คนละ agent · คนละความจำ — สิ่งที่เชื่อมคือเอกสารและ GitHub ไม่ใช่แชทร่วม  
> จบ Lab นี้ต้องเขียน **handoff** + อัปเดต Hot state แล้ว **commit ก่อน** เปิด OpenCode ใน Lab 05

---

## ก่อนเริ่ม

ต้องมี PROFILE + DECISIONS · แนะนำมี issue จาก Lab 03 · มี Hot state จาก Lab 00

```powershell
cd <โฟลเดอร์-repo-ของคุณ>
npm test
Test-Path .\docs\PROFILE.md, .\docs\DECISIONS.md, .\docs\STATUS.md, .\docs\OPEN_LOOPS.md
gh issue list
git checkout -b lab-04-frontend
```

ก่อนลงมือ: อ่าน `docs/STATUS.md` · สรุป Goal ≤ 8 บรรทัด (ตาม `AGENTS.md`)

ลองเปิดเว็บครั้งหนึ่ง:

```powershell
npm run dev
# เปิด http://localhost:4321 แล้วปิดได้เมื่อพร้อมให้ Claude ทำงาน
```

---

## เลือกวิธีทำ

| ทาง | เหมาะกับใคร |
|---|---|
| **A — TUI `claude` (แนะนำ)** | Plan + แก้หลายไฟล์ · ดู preview |
| **B — CLI** | สั่งทีละหน้าด้วย `claude -p` |

Prompt: [`01-frontend-pages.md`](prompts/01-frontend-pages.md)

---

## ทาง A — ขั้นตอนการทำ Lab

### ขั้นที่ 1 — ผูก issue

**ทำที่:** Windows Terminal (แท็บ `powershell`) — พิมพ์ตามนี้

```powershell
gh issue list
gh issue view <n> --web
```

จดหมายเลข issue ไว้ใส่ PR

### ขั้นที่ 2 — ให้ Claude ทำหน้า

**ทำที่:** Windows Terminal แท็บ `claude` — พิมพ์ `claude` แล้ววาง prompt

```powershell
claude
```

วาง prompt จาก `01-frontend-pages.md`  
(แนะนำเปิด Plan mode ถ้างานใหญ่ — Shift+Tab หรือ `/plan`)

### ขั้นที่ 3 — ตรวจด้วยตาบน localhost

**ทำที่:** Windows Terminal (แท็บ `powershell`) — พิมพ์ตามนี้ แล้วเปิดเบราว์เซอร์ที่ `http://localhost:4321`

```powershell
npm test
npm run dev
```

เช็ค: ชื่อ/headline ตรง PROFILE · สีใกล้ tone · 4 หน้าไม่ 404 · มีลิงก์ Guestbook

### ขั้นที่ 4 — Call ข้าม harness: ขอมุม Backend ตรวจสัญญา API (หนึ่งครั้งพอ)

**ทำที่:** Windows Terminal (แท็บ `powershell`) — พิมพ์ตามนี้ (OpenCode ทำงาน headless ไม่ต้องเปิด TUI)

หน้า Contact/Guestbook ของคุณจะยิง API ที่ยังเป็น stub — ให้ฝั่ง **OpenCode (backend)** ตรวจว่าสัญญาที่ UI คาดไว้ (path, method, JSON fields, error) ตรงกับที่เขาจะ implement ใน Lab 05:

```powershell
opencode run "Read docs/DECISIONS.md, the Contact/Guestbook form code in src/pages/, and the API stubs in src/pages/api/*.ts. Check the contract the form expects vs the stub. Write docs/fe-be-contract-check.md in Thai with match / mismatch / suggestion. Do not edit any src/ file."
```

- **กติกา call ข้าม harness:** OpenCode (ฝั่งถูกเรียก) เขียนได้**เฉพาะ** `docs/fe-be-contract-check.md` — ไม่แตะไฟล์ UI
- อ่านรายงาน → ถ้ามี mismatch ให้ Claude ปรับฟอร์มให้ตรงสัญญาก่อนเปิด PR
- เวอร์ชัน "agent เรียกเอง": สั่ง `@frontend` ในเซสชัน `claude` ให้รันคำสั่งนี้ผ่าน skill `opencode` — Claude เป็นคนเรียก OpenCode เอง คุณเป็นกรรมการอ่านผล

### ขั้นที่ 5 — Push + เปิด PR

**ทำที่:** Windows Terminal (แท็บ `powershell`) — พิมพ์ตามนี้

```powershell
git add -A
git status   # ต้องไม่มี .env
git commit -m "feat(ui): Lab 04 personal pages from PROFILE"
git push -u origin lab-04-frontend
gh pr create --title "[Lab 04] Frontend pages" --body "$( @'
## Summary
- Home/About/Interests/Contact from docs/PROFILE.md
- Closes #<issue>

## Test
- [ ] npm test green
- [ ] 4 pages on localhost:4321
- [ ] No .env in diff
- [ ] Screenshot attached
'@ )"
```

### ขั้นที่ 6 — Handoff + Hot state (ก่อนสลับไป Lab 05)

**ทำที่:** Windows Terminal (แท็บ `powershell`) + แก้ไฟล์ใน VS Code

**Commit ก่อนสลับ harness** — อย่าให้ OpenCode เขียนทับ working tree ที่ยังไม่ commit

```powershell
Copy-Item .\docs\handoffs\TEMPLATE.md .\docs\handoffs\04-claude-to-opencode.md
# เติม What changed / Files / Verification / Request to next agent
# Request ตัวอย่าง: implement guestbook API ตาม DECISIONS + docs/fe-be-contract-check.md + test:labs — อย่าแก้ UI นอกจำเป็น
```

อัปเดต (คุณหรือ Claude — **single-writer** รอบนี้):

- `docs/STATUS.md` — Done = Lab 04 UI · Next = Lab 05 backend · Updated by = Claude
- `docs/OPEN_LOOPS.md` — ปิดงาน UI · เปิดแถว owner = OpenCode สำหรับ guestbook API

```powershell
git add docs/STATUS.md docs/OPEN_LOOPS.md docs/handoffs/04-claude-to-opencode.md
git commit -m "docs: Lab 04 handoff to OpenCode"
git push
```

---

## ทาง B — CLI ย่อย

**ทำที่:** Windows Terminal (แท็บ `powershell`) — พิมพ์ทีละบล็อก ต่อหนึ่งหน้า

**Home (headline):**

```powershell
cd <โฟลเดอร์-repo-ของคุณ>
"Read docs/PROFILE.md. Update src/pages/index.astro headline only. npm test must pass." |
  claude -p --permission-mode acceptEdits --output-format text
```

**About:**

```powershell
"Read docs/PROFILE.md. Build/update src/pages/about.astro from the Bio section. npm test must pass." |
  claude -p --permission-mode acceptEdits --output-format text
```

**Interests:**

```powershell
"Read docs/PROFILE.md. Build/update src/pages/interests.astro listing the Interests items. npm test must pass." |
  claude -p --permission-mode acceptEdits --output-format text
```

**Contact:**

```powershell
"Read docs/PROFILE.md. Build/update src/pages/contact.astro with the Contact info and a form that POSTs to the API stub. npm test must pass." |
  claude -p --permission-mode acceptEdits --output-format text
```

**จบด้วย ทาง A ขั้นที่ 3–6 ให้ครบ (บังคับตามตาราง "ผ่านเมื่อ"):** ตรวจบน localhost (3) · call ข้าม harness ให้ OpenCode ตรวจสัญญา API (4) · push + เปิด PR (5) · handoff + Hot state (6) — ทางนี้ทำแค่หน้าเว็บ ไม่ครบ Lab จนกว่าจะทำ 4 ขั้นนั้น

---

## ขอบเขต Lab นี้

| ทำใน Lab 04 | ยังไม่ทำ (Lab 05+) |
|---|---|
| Layout, typography, 4 หน้า | insertContact / SQLite เต็ม |
| อ่าน PROFILE / DECISIONS | ให้ `test:labs` เขียว |
| เปิด PR Frontend | |

ถ้า template มี loader โปรไฟล์อยู่แล้ว — **ใช้ของเดิม** อย่าสร้าง parser ใหม่ยาว ๆ

---

## สิ่งที่ได้รับหลังจบ Lab

| สิ่งที่ได้รับ | ผ่านเมื่อ |
|---|---|
| โค้ด UI | 4 หน้าหลัก + nav (รวมลิงก์ Guestbook) |
| เนื้อหา | ชื่อ/headline/interests สะท้อน PROFILE · ไม่มีข้อความอ้าง Lab/คอร์สหลุดในหน้าเว็บ |
| PR | เปิดใน repo คุณ · อ้าง issue · ไม่มี `.env` |
| ทดสอบ | `npm test` เขียว |
| Call ข้าม harness | มี `docs/fe-be-contract-check.md` (OpenCode เขียน) · mismatch แก้แล้ว |
| Handoff → Lab 05 | มี `docs/handoffs/04-claude-to-opencode.md` อ้าง contract check + อัปเดต STATUS/OPEN_LOOPS · **commit แล้ว** |

**ยังไม่ผ่านถ้า…** PR ไป Onto-IQ · หน้ายังเป็น template เดิมทั้งก้อน · มีแค่ local ไม่มี PR · หน้าเว็บมีข้อความอ้าง Lab/คอร์สหลุดออกไป (`npm test` จับ) · สลับไป OpenCode โดยไม่มี handoff / ไม่ commit

---

## ตรวจว่าผ่านหรือยัง

```powershell
npm test
npm run build
gh pr view --web
```

- [ ] PR ใน repo คุณ · อ้าง issue / DECISIONS  
- [ ] 4 หน้า + nav · เนื้อจาก PROFILE  
- [ ] `npm test` เขียว · ไม่ commit secret  
- [ ] PR body มีวิธีทดสอบ (+ screenshot แนะนำ)  
- [ ] มี `docs/fe-be-contract-check.md` จากฝั่ง OpenCode · ฝั่งถูกเรียกแตะเฉพาะไฟล์รายงาน  
- [ ] `docs/handoffs/04-claude-to-opencode.md` + STATUS/OPEN_LOOPS อัปเดตแล้ว · commit ก่อน Lab 05  

---

## ติดปัญหาบ่อย

| อาการ | ลองทำ |
|---|---|
| พอร์ต 4321 ถูกใช้ | ตั้ง `PORT=4322` ใน `.env` |
| Hot reload ค้าง | restart `npm run dev` |
| GitHub MCP เปิด PR ไม่ได้ | ใช้ `gh pr create` |
| `npm run build` แตก | อ่าน log · ให้ Claude แก้บน branch เดิม |
| OpenCode เริ่ม Lab 05 แล้วไม่รู้ขอบเขต | อ่าน `docs/handoffs/04-claude-to-opencode.md` + STATUS — อย่าเล่าปากเปล่าแทน |

ถ้า CI บน GitHub Actions ล้ม: เปิด log Actions · แก้แล้ว push — ไม่ต้องรอ Lab 05 ถ้า error ไม่เกี่ยว API

---

**Lab ถัดไป:** [`lab-05-backend`](../lab-05-backend/README.md)
