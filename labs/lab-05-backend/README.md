# Lab 05 — ทำให้ Guestbook ทำงานจริง (OpenCode)

**ใช้เวลาประมาณ:** 90–120 นาที  
**เครื่องมือ:** OpenCode **2.0.6+** · oh-my-openagent **4.19.4** (ทางเลือก)  
**Ownership:** Backend / OpenCode  
**ผลลัพธ์หลัก:** `npm run test:labs` เขียว + PR ฝั่ง Backend

> ตั้งแต่ SETUP ชุด `test:labs` มักแดง — Lab นี้คือตอนที่มันควรเขียวเพราะ API ถูกสัญญา

---

## คุณจะได้อะไรจาก Lab นี้

1. ใช้ **OpenCode** implement backend ตาม course stubs  
2. เห็น **contract ทดสอบ** บังคับงาน agent ไม่ให้เดาสุ่ม  
3. PR ที่แยก ownership จาก Frontend (Lab 04)

**ความรู้ที่ควรติดตัว**

- ทำไมคอร์สแยก CLI คนละฝั่ง — ลดจุดบอดและฝึก handoff  
- อย่าแก้ไฟล์ test ให้ผ่านโดยไม่ implement  
- ความปลอดภัยขั้นต่ำ: validate input · ไม่ leak stack/SQL · ไม่เก็บ secret ใน DB · skill `public-site-safe`

> **ทวน Persistent Memory (OpenCode):** ถ้าต่องาน guestbook จากเมื่อวาน — **resume session เดิม** ของ harness  
> เซสชันใหม่ยังโหลด `AGENTS.md` / `backend` agent แต่ข้อจำปากเปล่าต้องอยู่ใน `docs/` หรือโค้ด · อย่าติด plugin memory แข่ง

> **ทำไมต้องประสาน (เสา 3):** คุณรับไม้ต่อจาก Lab 04 ผ่าน **handoff + STATUS + issue + DECISIONS** — ไม่ได้ถือ context UI ทั้งก้อน  
> หลัง Lab นี้มี **Lab 05b Swarm** ถ้ายังเขียวไม่ครบหรืออยากฝึกหลายตัวภายใต้เพดาน 20 turns  
> **Commit ก่อนสลับ** กลับ Claude (หรือเข้า swarm) — single-writer บน STATUS/OPEN_LOOPS

---

## ก่อนเริ่ม

แนะนำมี UI/ฟอร์มจาก Lab 04 · มี decisions เรื่อง guestbook · อ่าน handoff จาก Lab 04  
oh-my-openagent ควรติดตั้งแล้วใน [`Lab 00`](../lab-00-project-init/README.md) (project `opencode.json`)

```powershell
cd <โฟลเดอร์-repo-ของคุณ>
opencode --version
Test-Path .\opencode.json
Test-Path .\docs\handoffs\04-claude-to-opencode.md, .\docs\STATUS.md, .\docs\OPEN_LOOPS.md
Get-Content .\docs\handoffs\04-claude-to-opencode.md -Head 40
Get-Content .\docs\STATUS.md -Head 30
npm test
npm run test:labs   # คาดว่าแดง — จด error แรกไว้
git checkout main
git pull
git checkout -b lab-05-backend
```

ถ้ายังไม่มี handoff จาก Lab 04 — ให้สร้างจาก [`docs/handoffs/TEMPLATE.md`](../../docs/handoffs/TEMPLATE.md) ก่อน (อย่าเริ่มจากแชทเปล่า)

ถ้า oh-my ยังไม่พร้อม: ใช้ native `@` ใน OpenCode (fallback จาก Lab 00) — อย่าใช้ `bunx oh-my-openagent install` เป็นทางหลัก (user-global)

---

## สิ่งที่ต้องมีเมื่อจบ Lab

| สิ่งที่ต้องมี | ผ่านเมื่อ |
|---|---|
| Implementation | guestbook/contact บันทึก SQLite ตาม template |
| Tests | `npm run test:labs` exit 0 |
| PR | repo คุณ · บอกวิธีรัน test + โน้ต security |
| Ownership | ใช้ OpenCode เป็นหลัก |
| Hot state | อัปเดต STATUS/OPEN_LOOPS หลังเขียว · commit ก่อนสลับ harness |

**ยังไม่ผ่านถ้า…** test ยังแดง · hardcode secret · ให้ Claude ทำ backend ทั้งก้อนโดยไม่มีงาน OpenCode · แก้ test ให้ผ่านปลอม · เริ่มโดยไม่ได้อ่าน handoff/STATUS

---

## เลือกวิธีทำ

| ทาง | เหมาะกับใคร |
|---|---|
| **A — TUI `opencode` (แนะนำ)** | แก้หลายไฟล์ · วน test |
| **B — `opencode run`** | งานย่อย one-shot |

Prompt: [`01-backend-guestbook.md`](prompts/01-backend-guestbook.md)

---

## ทาง A — ทีละขั้น

### ขั้นที่ 1 — เปิด OpenCode ที่ root repo

```powershell
opencode
```

วาง prompt จาก `01-backend-guestbook.md`

### ขั้นที่ 2 — วนจน test เขียว

ใน terminal อีกอัน (หรือใน TUI ถ้าสั่งรันได้):

```powershell
npm run test:labs
npm test
```

อ่าน error แรก → ให้ OpenCode แก้ → รันซ้ำ จนเขียว

### ขั้นที่ 3 — ลองฟอร์มบนเครื่อง

```powershell
npm run dev
```

ส่งข้อความ demo ที่หน้า Contact/Guestbook  
หรือ:

```powershell
curl.exe -X POST "http://localhost:4321/api/guestbook" `
  -H "Content-Type: application/json" `
  -d "{\"name\":\"t\",\"email\":\"t@ex.com\",\"message\":\"hi\"}"
```

(ปรับ path ตาม template จริง)

### ขั้นที่ 4 — เปิด PR

```powershell
git add -A
git status
git commit -m "feat(api): guestbook SQLite Lab 05"
git push -u origin lab-05-backend
gh pr create --title "[Lab 05] Guestbook API" --body "$( @'
## Summary
- insertContact / guestbook per course tests
- Ownership: Backend / OpenCode

## Test
npm run test:labs
npm test

## Security
- validation, no stack trace leak
'@ )"
```

### ขั้นที่ 5 — อัปเดต Hot state + commit ก่อนสลับ

```powershell
# อัปเดต STATUS: Done += Lab 05 test:labs · Next = 05b หรือ 06
# อัปเดต OPEN_LOOPS: ปิดแถว guestbook API · เปิด follow-up ถ้ามี
git add docs/STATUS.md docs/OPEN_LOOPS.md
# ถ้าส่งต่อ Lab 07 หรือ swarm — คัดลอก handoff จาก TEMPLATE
git status
git commit -m "docs: Lab 05 status after test:labs green"
git push
```

---

## ทำความเข้าใจ `test:labs`

Template วาง **course stubs** ไว้ทดสอบสัญญา guestbook/contact  
แดงตั้งแต่ SETUP เป็นเรื่องปกติ — เขียวหลัง Lab 05 แปลว่าทำถูก contract

อย่าแก้ไฟล์ test เพื่อ “ลดงาน” — วิทยากรดู diff

### oh-my vs native `@`

| วิธี | เมื่อใช้ |
|---|---|
| oh-my จาก Lab 00 (`opencode.json`) | ค่าหลักของคอร์ส |
| native `@` | Lab 00 / plugin พัง — ยังผ่าน Lab 05 ได้ |

---

## ตรวจว่าผ่านหรือยัง

```powershell
npm run test:labs
npm test
npm run build
```

- [ ] `test:labs` เขียวทั้งชุด  
- [ ] PR Backend · บอกวิธีรัน test  
- [ ] ไม่ leak `.env` · validate input  
- [ ] ใช้ OpenCode เป็นหลัก  
- [ ] อ่าน handoff Lab 04 แล้ว · อัปเดต STATUS/OPEN_LOOPS · commit ก่อนสลับ  

ถ้า conflict กับ branch Lab 04: rebase บน main · ให้ OpenCode ช่วยเฉพาะไฟล์ API · รัน `test:labs` อีกครั้งก่อน Lab 06

---

## ติดปัญหาบ่อย

| อาการ | ลองทำ |
|---|---|
| better-sqlite3 fail | `npm approve-scripts better-sqlite3` · VS Build Tools |
| opencode ไม่เห็น repo | `cd` ไป root ที่มี `package.json` · เปิดใหม่ |
| oh-my ติดนาน | ใช้ native `@` |
| พอร์ตชน | เปลี่ยน `PORT` ใน `.env` |

---

**Lab ถัดไป:** [`lab-05b-swarm-to-green`](../lab-05b-swarm-to-green/README.md) — แล้วค่อย [`lab-06-playwright`](../lab-06-playwright/README.md)
