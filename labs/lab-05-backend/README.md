# Lab 05 — ทำให้ Guestbook ทำงานจริง (OpenCode)

**ใช้เวลาประมาณ:** 90–120 นาที  
**เครื่องมือ:** OpenCode **v2** (2.0.6+, npm `@opencode/cli`) · native agents (backend)  
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
OpenCode ต้องเป็น **v2** (`opencode --version` ขึ้น 2.x) · ใช้ native `backend` agent จาก template (Lab 00)

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

---

## เลือกวิธีทำ

| ทาง | เหมาะกับใคร |
|---|---|
| **A — TUI `opencode` (แนะนำ)** | แก้หลายไฟล์ · วน test |
| **B — `opencode run`** | งานย่อย one-shot |

Prompt: [`01-backend-guestbook.md`](prompts/01-backend-guestbook.md)

---

## ทาง A — ขั้นตอนการทำ Lab

### ขั้นที่ 1 — เปิด OpenCode ที่ root repo

**ทำที่:** Windows Terminal แท็บ `opencode` — พิมพ์ `opencode` แล้ววาง prompt

```powershell
opencode
```

วาง prompt จาก `01-backend-guestbook.md`

### ขั้นที่ 2 — วนจน test เขียว

**ทำที่:** Windows Terminal (แท็บ `powershell`) — พิมพ์ตามนี้ (หรือสั่งใน TUI ถ้าสั่งรันได้)

ใน terminal อีกอัน (หรือใน TUI ถ้าสั่งรันได้):

```powershell
npm run test:labs
npm test
```

อ่าน error แรก → ให้ OpenCode แก้ → รันซ้ำ จนเขียว

### ขั้นที่ 3 — ลองฟอร์มบนเครื่อง

**ทำที่:** Windows Terminal (แท็บ `powershell`) — พิมพ์ตามนี้ แล้วลองที่เบราว์เซอร์

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

### ขั้นที่ 4 — Call ข้าม harness: ขอมุม Frontend ตรวจการผูกฟอร์ม (หลังเขียว)

**ทำที่:** Windows Terminal (แท็บ `powershell`) — พิมพ์ตามนี้ (Claude ทำงาน headless ไม่ต้องเปิด TUI)

test เขียว = สัญญาฝั่ง server ถูก — แต่**ฟอร์มบนหน้าเว็บ**ยิงถูกปุ่มหรือเปล่า ให้ฝั่ง **Claude (frontend)** ตรวจย้อนกลับมาหนึ่งรอบ:

```powershell
claude -p "Read docs/DECISIONS.md, docs/handoffs/04-claude-to-opencode.md, docs/fe-be-contract-check.md (ถ้ามี), and the Contact/Guestbook form code in src/pages/. The API is now implemented in src/pages/api/*.ts and src/lib/db.ts. Check that form fields, HTTP method and error handling match the implemented contract. Write docs/be-fe-integration-check.md in Thai with match / mismatch / suggestion. Do not edit any src/ file." --permission-mode acceptEdits
```

- **กติกา call ข้าม harness:** Claude (ฝั่งถูกเรียก) เขียนได้**เฉพาะ** `docs/be-fe-integration-check.md` — ไม่แตะงาน API
- อ่านรายงาน → ถ้ามี mismatch ให้ OpenCode/คุณตัดสินว่าแก้ฝั่งไหน (API หรือฟอร์ม) แล้วทำใน ownership ของฝั่งนั้น
- เวอร์ชัน "agent เรียกเอง": ในเซสชัน `opencode` สั่งผ่าน skill `claude-code` — OpenCode เป็นคนเรียก Claude เอง

### ขั้นที่ 5 — เปิด PR

**ทำที่:** Windows Terminal (แท็บ `powershell`) — พิมพ์ตามนี้

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

### ขั้นที่ 6 — อัปเดต Hot state + commit ก่อนสลับ

**ทำที่:** Windows Terminal (แท็บ `powershell`) + แก้ไฟล์ใน VS Code — พิมพ์ตามนี้

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

## ทาง B — `opencode run` (one-shot)

**ทำที่:** Windows Terminal (แท็บ `powershell`) — พิมพ์ตามนี้ ทีละบล็อก

สั่ง OpenCode implement จาก prompt ไฟล์โดยไม่เปิด TUI:

```powershell
cd <โฟลเดอร์-repo-ของคุณ>
opencode run "$(Get-Content -Raw .\labs\lab-05-backend\prompts\01-backend-guestbook.md)"
```

วน test จนเขียว (ถ้ายังแดง สั่งแก้ต่อด้วย `opencode run "..."` อีกรอบ):

```powershell
npm run test:labs
npm test
```

เขียวแล้ว: เปิด PR + อัปเดต Hot state ให้ครบ **เหมือนทาง A ขั้นที่ 5–6** (PR ต้องระบุ ownership Backend / OpenCode + วิธีรัน test) · ขั้นที่ 4 (call ข้าม harness ฝั่ง Claude ตรวจฟอร์ม) ยังต้องทำเหมือนเดิม

---

## ทำความเข้าใจ `test:labs`

Template วาง **course stubs** ไว้ทดสอบสัญญา guestbook/contact  
แดงตั้งแต่ SETUP เป็นเรื่องปกติ — เขียวหลัง Lab 05 แปลว่าทำถูก contract

อย่าแก้ไฟล์ test เพื่อ “ลดงาน” — วิทยากรดู diff

### native `@` บน v2

| วิธี | เมื่อใช้ |
|---|---|
| native `backend` agent จาก template | ค่าหลักของคอร์สบน OpenCode v2 |
| oh-my-openagent | ยังไม่รองรับ v2 (ทดสอบ 2026-09-24) — อย่าใช้ |

---

## สิ่งที่ได้รับหลังจบ Lab

| สิ่งที่ได้รับ | ผ่านเมื่อ |
|---|---|
| Implementation | guestbook/contact บันทึก SQLite ตาม template |
| Tests | `npm run test:labs` exit 0 |
| PR | repo คุณ · บอกวิธีรัน test + โน้ต security |
| Ownership | ใช้ OpenCode เป็นหลัก |
| Call ข้าม harness | มี `docs/be-fe-integration-check.md` (Claude เขียน) · mismatch ตัดสินแล้ว |
| Hot state | อัปเดต STATUS/OPEN_LOOPS หลังเขียว · commit ก่อนสลับ harness |

**ยังไม่ผ่านถ้า…** test ยังแดง · hardcode secret · ให้ Claude ทำ backend ทั้งก้อนโดยไม่มีงาน OpenCode · แก้ test ให้ผ่านปลอม · เริ่มโดยไม่ได้อ่าน handoff/STATUS

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
- [ ] มี `docs/be-fe-integration-check.md` จากฝั่ง Claude · ฝั่งถูกเรียกแตะเฉพาะไฟล์รายงาน  
- [ ] อ่าน handoff Lab 04 แล้ว · อัปเดต STATUS/OPEN_LOOPS · commit ก่อนสลับ  

ถ้า conflict กับ branch Lab 04: rebase บน main · ให้ OpenCode ช่วยเฉพาะไฟล์ API · รัน `test:labs` อีกครั้งก่อน Lab 06

---

## ติดปัญหาบ่อย

| อาการ | ลองทำ |
|---|---|
| better-sqlite3 fail | `npm approve-scripts better-sqlite3` · VS Build Tools |
| opencode ไม่เห็น repo | `cd` ไป root ที่มี `package.json` · เปิดใหม่ |
| TUI ขึ้น "TinyCC is disabled" | ใช้ v1 อยู่ — `npm install -g @opencode/cli` แล้วเปิด terminal ใหม่ |
| พอร์ตชน | เปลี่ยน `PORT` ใน `.env` |

---

**Lab ถัดไป:** [`lab-05b-swarm-to-green`](../lab-05b-swarm-to-green/README.md) — แล้วค่อย [`lab-06-playwright`](../lab-06-playwright/README.md)
