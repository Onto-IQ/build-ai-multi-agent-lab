# Lab 04 — Persistent Memory

**Outline 6:** Persistent Memory  
**ลำดับงาน:** Plan

### คุณอยู่ตรงไหน

`Interview → **Plan** → Build → Test → Ship`

| | |
|---|---|
| **Identity + เครื่องมือ** | ยังไม่สร้าง agent ใหม่ — ฝึก memory ข้าม session |
| **ส่งต่อไป** | `MEMORY.md` + learning-log → Lab 05 แตกทีม named agents |
| **ภาพรวมทีม** | ถัดไป Lab 05: สร้าง artifact ผ่าน CLI/TUI — Claude รับ `frontend`+`synthesizer`; OpenCode รับ `backend`+`qa` |

## ได้รับมาจาก Lab ก่อน

- Agent + สิทธิ์จาก Lab 01–03
- โปรเจกต์ Agent Cost Board

## ได้เพิ่มใน Lab นี้

ทำให้ agent **จำ preference โปรเจกต์ข้าม session** (ปิดแล้วเปิดใหม่ยังใช้ได้)

## เป้าหมาย

บันทึก preference เช่น สไตล์ UI, ห้ามให้ Frontend แก้ Backend แล้วทดสอบหลังเปิด session ใหม่

**จุดที่ควรรู้สึกว้าว:** ปิด–เปิด session แล้วยังจำ โดยไม่ต้องบอกซ้ำทั้งหมด

## ผลลัพธ์รูปธรรม

1. **ต้องมีไฟล์/หลักฐานเหล่านี้**
   - `MEMORY.md` ที่ root มีอย่างน้อย 5 preferences ของโปรเจกต์
   - `workspace/learning-log.md` มี before/after recall สำหรับ Lab 04
2. **ต้องเห็นด้วยตาอะไร**
   - Session ใหม่ตอบเรื่อง ownership / preference โดยไม่ต้องแปะ preference ทั้งชุดซ้ำ
3. **เช็คผ่านด้วยคำสั่งนี้**

```powershell
Test-Path .\MEMORY.md
# อ่าน MEMORY.md (≥ 5 preferences) + ส่วน Lab 04 ใน learning-log
```

4. **ยังไม่ผ่านถ้า…**
   - ไม่มี `MEMORY.md` / recall ได้แค่เพราะใช้ `-c` (session เดิม) / ไม่มี before-after ใน learning-log

## เลือกวิธีรัน

| ทาง | เหมาะกับ | คำสั่งหลัก |
|---|---|---|
| **A — TUI** | ปิด–เปิดแชทจริงในห้อง | `claude` → เซฟ → ออก → เปิดใหม่ |
| **B — CLI** | จำลอง “session ใหม่” ด้วย `-p` คนละรอบ (ไม่ใช้ `-c`) | สองคำสั่ง `-p` แยกกัน |

ไฟล์ร่วม:

- Starter: [`starters/MEMORY.md`](starters/MEMORY.md) → คัดลอกเป็น [`MEMORY.md`](../../MEMORY.md) ที่ root
- Prompt: [`prompts/01-save-preferences.md`](prompts/01-save-preferences.md), [`prompts/02-recall-test.md`](prompts/02-recall-test.md)

---

## 0) Preflight

```powershell
Test-Path .\MEMORY.md
# ถ้า False — คัดลอก starter
Copy-Item .\labs\lab-04-persistent-memory\starters\MEMORY.md .\MEMORY.md -ErrorAction SilentlyContinue
Get-Content .\MEMORY.md
claude --version
```

---

## ทาง A — TUI

### A1) Session ปัจจุบัน — บันทึก preference

```powershell
claude
```

วาง [`prompts/01-save-preferences.md`](prompts/01-save-preferences.md)  
ตรวจว่า `MEMORY.md` ที่ root มี 5 ข้อ และ/หรือเครื่องมือบันทึก built-in memory แล้ว

### A2) ปิด session แล้วเปิดใหม่

ออกจากแชท (`/exit` หรือปิดหน้าต่าง) แล้วที่ root เดิมอีกครั้ง:

```powershell
claude
```

### A3) Recall โดยไม่บอก preference ซ้ำ

วาง**เฉพาะ** [`prompts/02-recall-test.md`](prompts/02-recall-test.md)  
ห้ามแปะรายการ 5 ข้อซ้ำ

ผลที่ต้องการ: ตอบ ownership + cost rules ได้ และเสนอ Frontend improvement โดยไม่แตะ backend

### A4) learning-log

วาง [`prompts/03-learning-log.md`](prompts/03-learning-log.md):

```text
Append "## Lab 04" to workspace/learning-log.md.
Record before/after for the recall test (new session without repeating preferences).
Add a short Thai comparison: built-in memory vs MEMORY.md file in repo.
Only edit workspace/learning-log.md.
```

---

## ทาง B — CLI (จำลองปิด–เปิด session)

บน CLI แต่ละครั้งของ `claude -p` **โดยไม่ใส่ `-c`** = session ใหม่

### B1) บันทึก preference

```powershell
$p1 = @'
Save these project preferences for Agent Cost Board into durable memory
AND into MEMORY.md at the repo root (create/update the file):

1) Thai UI labels
2) Frontend must not write backend/
3) Backend must not write frontend/
4) Quality gate before Ship
5) Max 2 refinement rounds

Confirm what you stored. Do not start coding features yet.
'@

$p1 | claude -p --permission-mode acceptEdits --output-format text --no-session-persistence
```

### B2) Session ใหม่ — recall

```powershell
$p2 = @'
What are the Agent Cost Board ownership and cost rules for this project?
Answer from memory / MEMORY.md without me repeating them.
Then propose one small Frontend improvement that still respects ownership.
Do not edit backend files.
Do not edit any files in this turn — answer only.
'@

# สำคัญ: อย่าใช้ -c / --continue
$p2 | claude -p --output-format text --no-session-persistence
```

ถ้าตอบ ownership/cost ได้โดยที่คุณไม่ได้แปะ 5 ข้อซ้ำ = ผ่านจุดว้าวของ Lab

### B3) learning-log

```powershell
Get-Content -Raw .\labs\lab-04-persistent-memory\prompts\03-learning-log.md |
  claude -p --permission-mode acceptEdits --output-format text --no-session-persistence
```

---

## ข้อความพร้อมวาง

- [`prompts/01-save-preferences.md`](prompts/01-save-preferences.md)
- [`prompts/02-recall-test.md`](prompts/02-recall-test.md)
- [`prompts/03-learning-log.md`](prompts/03-learning-log.md) — บันทึก learning-log (TUI/CLI)

## ผลที่คาดหวัง

- Agent เรียกใช้ preference หลังเปิดใหม่ได้
- มีบันทึกเปรียบเทียบใน learning-log

## เกณฑ์ผ่าน Lab

ต้องตรงกับ **ผลลัพธ์รูปธรรม** ด้านบน 1:1

- [ ] `MEMORY.md` ที่ root มี ≥ 5 preferences
- [ ] Preference ถูกใช้หลังเปิด session ใหม่ (ไม่พึ่ง `-c`)
- [ ] learning-log มี before/after recall + เปรียบเทียบ built-in vs ไฟล์ใน repo

## ทางเลือกเมื่อเครื่องมือไม่พร้อม

ใช้ไฟล์ `MEMORY.md` ใน repo เป็นแหล่งจำอย่างเดียว แล้วให้ agent อ่านไฟล์ทุกครั้งที่เปิด session  
(ใน prompt รอบใหม่ขึ้นต้นว่า `Read MEMORY.md first.`)

## แก้ปัญหาเบื้องต้น

| อาการ | ทำอะไร |
|---|---|
| จำไม่ได้หลังเปิดใหม่ | ตรวจว่า `MEMORY.md` ถูกเซฟที่ root; ในรอบใหม่สั่ง `Read MEMORY.md first` |
| จำของคนละโปรเจกต์ | ระบุ `project_id = agent-cost-board` ในไฟล์ |
| CLI ดึงแชทเก่ายังจำจากบทสนทนา | อย่าใช้ `-c`; ใช้ `--no-session-persistence` |
| PowerShell ส่ง prompt ไม่ถึง | ใช้ pipeline `"..." \| claude -p ...` |
