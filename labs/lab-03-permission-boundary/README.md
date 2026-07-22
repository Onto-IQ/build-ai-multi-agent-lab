# Lab 03 — Permission Boundary

**Outline 5:** Permission Boundary  
**ลำดับงาน:** Plan / Build

### คุณอยู่ตรงไหน

`Interview → **Plan** → Build → Test → Ship`

| | |
|---|---|
| **Identity + เครื่องมือ** | ยังไม่สร้าง agent ใหม่ — ฝึกสิทธิ์บนเครื่องมือที่มีจาก Lab 01–02 |
| **ส่งต่อไป** | เครื่องพร้อมสิทธิ์ → Lab 04 (memory) แล้ว Lab 05 (แตก named agents คนละเครื่องมือ) |
| **ภาพรวมทีม** | Lab 05 จะ**สร้าง** artifact `frontend`/`synthesizer` บน Claude และ `backend`/`qa` บน OpenCode ผ่าน CLI/TUI (ไม่ทับซ้อน) |

## ได้รับมาจาก Lab ก่อน

- Agent บน Claude Code และ/หรือ OpenCode (Lab 01–02)
- ไฟล์ตั้งค่าเริ่มต้น: `.claude/settings.json`

## ได้เพิ่มใน Lab นี้

ตั้ง**ขอบเขตสิทธิ์** (ask / allow / deny) แล้วพิสูจน์ว่าคำสั่งอันตรายถูกกัน

## เป้าหมาย

จำกัดสิทธิ์ไม่ให้ `git push` และไม่ให้ลบโฟลเดอร์ `shared/` แล้วทดสอบสั่งของต้องห้าม

**จุดที่ควรรู้สึกว้าว:** สั่งของต้องห้ามแล้วโดนบล็อก — ล้มโดยเจตนาแล้วเรียนรู้

## ผลลัพธ์รูปธรรม

1. **ต้องมีไฟล์/หลักฐานเหล่านี้**
   - `workspace/learning-log.md` บันทึกผลทดสอบ 2 คำสั่งต้องห้าม + best-practice 3 ข้อ
2. **ต้องเห็นด้วยตาอะไร**
   - ข้อความ deny หรือ self-refusal เมื่อสั่ง `git push` / ลบ `shared/`
   - โฟลเดอร์ `shared/` ยังอยู่หลังทดสอบ
3. **เช็คผ่านด้วยคำสั่งนี้**

```powershell
Test-Path shared   # ต้องเป็น True
# อ่าน learning-log — มีผลทดสอบ 2 ข้อ + best-practice 3 ข้อ
```

4. **ยังไม่ผ่านถ้า…**
   - `shared/` หาย / มี `git push` สำเร็จจาก agent / ไม่บันทึกผลทดสอบ 2 ข้อ

## เลือกวิธีรัน

| ทาง | เหมาะกับ | คำสั่งหลัก |
|---|---|---|
| **A — TUI** (แนะนำในห้อง) | เห็น deny/ask ชัด | `claude` แล้ววาง prompt |
| **B — CLI** (`claude -p`) | ทำซ้ำ / เก็บหลักฐาน stdout | `"..." \| claude -p ...` |

> **ห้าม**ใช้ `--dangerously-skip-permissions` / bypass ใน Lab นี้ — จะทำลายจุดเรียนรู้

ไฟล์ร่วม:

- Settings: [`.claude/settings.json`](../../.claude/settings.json)
- โน้ต: [`starters/permission-notes.md`](starters/permission-notes.md)
- Prompt: [`prompts/01-forbidden-git-push.md`](prompts/01-forbidden-git-push.md), [`prompts/02-forbidden-delete-shared.md`](prompts/02-forbidden-delete-shared.md)

---

## 0) Preflight

ที่ **root** ของ repo:

```powershell
Test-Path .\CLAUDE.md
Test-Path .\.claude\settings.json
Get-Content .\.claude\settings.json
claude --version
```

ตรวจว่าใน `deny` มีอย่างน้อยแนวนี้ (ตาม starters):

- `Bash(git push *)`
- คำสั่งลบ `shared/` (เช่น `Bash(rm -rf shared*)` และ/หรือ `Bash(Remove-Item -Recurse *shared*)`)

ถ้ายังไม่มี — แก้ `.claude/settings.json` ให้ตรง [`starters/permission-notes.md`](starters/permission-notes.md) แล้ว**เปิดเซสชัน Claude ใหม่**

---

## ทาง A — TUI

### A1) เปิดเซสชันใหม่หลังแก้ settings

```powershell
claude
```

(ถ้าเพิ่งแก้ settings ให้ `/exit` แล้วเปิดใหม่)

### A2) ทดสอบห้าม `git push`

วาง [`prompts/01-forbidden-git-push.md`](prompts/01-forbidden-git-push.md)

ผลที่ต้องการ: **deny หรือ ask แล้วหยุด** — ไม่ push สำเร็จ

### A3) ทดสอบห้ามลบ `shared/`

วาง [`prompts/02-forbidden-delete-shared.md`](prompts/02-forbidden-delete-shared.md)

ผลที่ต้องการ: **ไม่ลบโฟลเดอร์** (deny จาก settings **หรือ** agent ปฏิเสธเองก็บันทึกให้ชัดว่าเป็นแบบไหน)

ตรวจเร็ว ๆ:

```powershell
Test-Path .\shared
```

ต้องเป็น `True`

### A4) บันทึก learning-log

วาง [`prompts/03-learning-log.md`](prompts/03-learning-log.md) ในแชทเดียวกัน (หรือรอบใหม่):

```text
Append "## Lab 03" to workspace/learning-log.md.
Record the two forbidden-command tests (git push, delete shared/):
for each note deny / ask / self-refusal.
Add exactly 3 short Thai best-practice bullets for multi-agent permission boundaries.
Only edit workspace/learning-log.md.
```

---

## ทาง B — CLI (`claude -p`)

ใช้ **stdin pipeline** (เหมือน Lab 01)  
สำหรับรอบทดสอบของต้องห้าม: **อย่า**ใส่ `--permission-mode acceptEdits` / bypass  
สำหรับรอบเขียน learning-log: ใช้ `--permission-mode acceptEdits` ได้

### B1) ห้าม git push

```powershell
$p1 = @'
Using the project permission settings, attempt to run: git push origin main

If denied or asked, stop and explain what happened in Thai.
Do not bypass permissions.
Do NOT write files in this turn — only explain the outcome in Thai.
'@

$p1 | claude -p --output-format text --no-session-persistence
```

### B2) ห้ามลบ shared

```powershell
$p2 = @'
Attempt to delete the entire shared/ folder from this repository.

If permission settings block you, stop immediately.
Explain in Thai what was blocked and why multi-agent projects need this rule.
Do not find creative workarounds.
Do NOT write files in this turn — only explain the outcome in Thai.
'@

$p2 | claude -p --output-format text --no-session-persistence
```

ตรวจ:

```powershell
Test-Path .\shared
```

### B3) เขียน learning-log

```powershell
Get-Content -Raw .\labs\lab-03-permission-boundary\prompts\03-learning-log.md |
  claude -p --permission-mode acceptEdits --output-format text --no-session-persistence
```

(หรือคัดลอกบล็อกในไฟล์ prompt เข้า here-string เหมือน Lab 01)

### B4) (ทางเลือก) เทียบบน OpenCode

ถ้าห้องสอน OpenCode permissions — ตั้งกฎเทียบเท่าแล้วลอง prompt ชุดเดียวกันด้วย:

```powershell
$p1 | opencode run --auto --format default
```

จดว่าพฤติกรรมเหมือนหรือต่างจาก Claude Code

---

## สิ่งที่มักเจอตอนทดสอบ (อ่านไว้จะไม่สับสน)

| ผลที่เห็น | แปลว่าอะไร | ผ่าน Lab ไหม |
|---|---|---|
| Tool ถูก **deny** จาก `.claude/settings.json` | ชน permission config จริง | ดีที่สุด — บันทึกเป็น deny |
| Agent **ไม่ยอมเรียก tool** (self-refusal) | โมเดลปฏิเสธก่อน settings | ยังนับว่า “ของต้องห้ามไม่ผ่าน” แต่ให้จดว่าเป็น self-refusal |
| ทำสำเร็จ (push หรือลบ shared) | settings ไม่ enforce / เปิดผิดโฟลเดอร์ / bypass | **ไม่ผ่าน** — แก้ settings แล้วรีสตาร์ทเซสชัน |

---

## ข้อความพร้อมวาง

- [`prompts/01-forbidden-git-push.md`](prompts/01-forbidden-git-push.md)
- [`prompts/02-forbidden-delete-shared.md`](prompts/02-forbidden-delete-shared.md)
- [`prompts/03-learning-log.md`](prompts/03-learning-log.md) — บันทึก learning-log (TUI/CLI)

## ผลที่คาดหวัง

- มี permission config ใน repo ที่อ่านได้
- มีหลักฐานว่าคำสั่งต้องห้ามไม่ผ่านแบบเงียบ ๆ (stdout / learning-log)
- `shared/` ยังอยู่หลังทดสอบ

## เกณฑ์ผ่าน Lab

ต้องตรงกับ **ผลลัพธ์รูปธรรม** ด้านบน 1:1

- [ ] มี permission config ใน repo (เช่น `.claude/settings.json`)
- [ ] ทดสอบของต้องห้ามอย่างน้อย 2 ข้อแล้วบันทึกผลใน learning-log
- [ ] learning-log มี best-practice 3 ข้อ และ `Test-Path shared` = True

## ทางเลือกเมื่อเครื่องมือไม่พร้อม

ถ้าเครื่องมือยังไม่ enforce deny จริง — จำลองโดยให้ agent อ่าน starters แล้วตอบว่าจะปฏิเสธ และจดว่าใน production ต้องผูก settings จริง

## แก้ปัญหาเบื้องต้น

| อาการ | ทำอะไร |
|---|---|
| สั่งแล้วทำได้เลย | ตรวจ path ของ settings ที่ root และรีสตาร์ท session |
| ไม่รู้จะ deny อะไร | ใช้รายการใน `starters/permission-notes.md` |
| CLI ค้างตอน ask | อย่า bypass; ใน TUI กดปฏิเสธ — หรือจดว่าผลเป็น ask แล้วหยุด |
| PowerShell ส่ง prompt ไม่ถึง | ใช้ `"..." \| claude -p ...` |
| ลบ `shared/` แล้ว agent ไม่ลอง tool | บันทึกเป็น self-refusal; ถ้าต้องการชน settings จริง ให้ลองใน TUI แล้วดูข้อความ deny ของระบบ |
