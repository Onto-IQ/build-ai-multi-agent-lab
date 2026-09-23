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

## สิ่งที่ต้องมีเมื่อจบ Lab

| สิ่งที่ต้องมี | ผ่านเมื่อ |
|---|---|
| โค้ด UI | 4 หน้าหลัก + nav (รวมลิงก์ Guestbook) |
| เนื้อหา | ชื่อ/headline/interests สะท้อน PROFILE |
| PR | เปิดใน repo คุณ · อ้าง issue · ไม่มี `.env` |
| ทดสอบ | `npm test` เขียว |
| Handoff → Lab 05 | มี `docs/handoffs/04-claude-to-opencode.md` + อัปเดต STATUS/OPEN_LOOPS · **commit แล้ว** |

**ยังไม่ผ่านถ้า…** PR ไป Onto-IQ · หน้ายังเป็น template เดิมทั้งก้อน · มีแค่ local ไม่มี PR · สลับไป OpenCode โดยไม่มี handoff / ไม่ commit

---

## เลือกวิธีทำ

| ทาง | เหมาะกับใคร |
|---|---|
| **A — TUI `claude` (แนะนำ)** | Plan + แก้หลายไฟล์ · ดู preview |
| **B — CLI** | สั่งทีละหน้าด้วย `claude -p` |

Prompt: [`01-frontend-pages.md`](prompts/01-frontend-pages.md)

---

## ทาง A — ทีละขั้น

### ขั้นที่ 1 — ผูก issue

```powershell
gh issue list
gh issue view <n> --web
```

จดหมายเลข issue ไว้ใส่ PR

### ขั้นที่ 2 — ให้ Claude ทำหน้า

```powershell
claude
```

วาง prompt จาก `01-frontend-pages.md`  
(แนะนำเปิด Plan mode ถ้างานใหญ่ — Shift+Tab หรือ `/plan`)

### ขั้นที่ 3 — ตรวจด้วยตาบน localhost

```powershell
npm test
npm run dev
```

เช็ค: ชื่อ/headline ตรง PROFILE · สีใกล้ tone · 4 หน้าไม่ 404 · มีลิงก์ Guestbook

### ขั้นที่ 4 — Push + เปิด PR

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

### ขั้นที่ 5 — Handoff + Hot state (ก่อนสลับไป Lab 05)

**Commit ก่อนสลับ harness** — อย่าให้ OpenCode เขียนทับ working tree ที่ยังไม่ commit

```powershell
Copy-Item .\docs\handoffs\TEMPLATE.md .\docs\handoffs\04-claude-to-opencode.md
# เติม What changed / Files / Verification / Request to next agent
# Request ตัวอย่าง: implement guestbook API ตาม DECISIONS + test:labs — อย่าแก้ UI นอกจำเป็น
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

```powershell
"Read docs/PROFILE.md. Update src/pages/index.astro headline only. npm test must pass." |
  claude -p --permission-mode acceptEdits --output-format text
```

ทำทีละหน้าแล้วรวม PR

---

## ขอบเขต Lab นี้

| ทำใน Lab 04 | ยังไม่ทำ (Lab 05+) |
|---|---|
| Layout, typography, 4 หน้า | insertContact / SQLite เต็ม |
| อ่าน PROFILE / DECISIONS | ให้ `test:labs` เขียว |
| เปิด PR Frontend | |

ถ้า template มี loader โปรไฟล์อยู่แล้ว — **ใช้ของเดิม** อย่าสร้าง parser ใหม่ยาว ๆ

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
