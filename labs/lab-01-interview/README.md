# Lab 01 — สัมภาษณ์ตัวเอง แล้วได้โปรไฟล์เว็บ

**ใช้เวลาประมาณ:** 45–75 นาที  
**เครื่องมือ:** Claude Code (แนะนำเวอร์ชัน 2.1.278 ขึ้นไป)  
**ผลลัพธ์หลัก:** ไฟล์ `docs/PROFILE.md` ใน repo ของคุณ

> Lab นี้ยัง**ไม่**แต่งหน้าเว็บ — โฟกัสที่ “รู้ว่าจะเล่าตัวเองยังไง” ก่อน แล้วค่อยให้ AI ช่วยออกแบบ/เขียนโค้ดใน Lab ถัดไป

---

## คุณจะได้อะไรจาก Lab นี้

1. **ประสบการณ์คุยกับ AI แบบมีแผน** — ไม่ใช่สั่ง “เขียนเว็บให้หน่อย” แล้วจบ  
2. **เอกสารโปรไฟล์** ที่เป็นแหล่งความจริงของทั้งคอร์ส (Debate / หน้าเว็บ / API จะอ้างไฟล์นี้)  
3. **ไอเดีย Must / Nice / Later** จาก skill brainstorming (plugin superpowers)

**ความรู้ที่ควรติดตัวออกจากห้อง**

- ทำไมต้อง **Plan ก่อน Build** — ลดการแก้ไปมาและลดค่าใช้จ่ายโมเดล  
- ความต่างของ **คำสั่งให้คน (คุณ)** กับ **prompt ให้โมเดล** — อย่าปนกันในกล่องเดียวกัน  
- ข้อมูลส่วนตัวบนเว็บสาธารณะควรคิดก่อนใส่

---

## ก่อนเริ่ม (ตรวจเร็ว 2 นาที)

ทำงานที่**โฟลเดอร์รากของ repo คุณ** (มีไฟล์ `package.json` และโฟลเดอร์ `labs`)  
เปิด VS Code ที่ root คู่ Windows Terminal ตาม Lab 00

1. ทำ [`SETUP.md`](../../SETUP.md) และผ่าน [`Lab 00`](../lab-00-project-init/README.md) แล้ว  
   (มี `node_modules`, `.claude/settings.json` project + superpowers, `opencode.json`)  
2. รันเช็ก (PowerShell):

```powershell
.\scripts\preflight.ps1
npm test
Test-Path .\.claude\settings.json
```

**ยังไม่พร้อมถ้า…** ยังไม่จบ Lab 00 / `claude` ไม่ขึ้น / ไม่มี `.env` / `npm test` ไม่ผ่าน → อย่าข้ามมา Lab นี้

---

## เลือกวิธีทำ (เลือกอย่างใดอย่างหนึ่ง)

| ทาง | เหมาะกับใคร | ทำยังไงสั้น ๆ |
|---|---|---|
| **A — คุยในหน้าต่าง Claude (แนะนำ)** | คนที่อยากสัมภาษณ์ทีละคำถาม | เปิด `claude` → เปิด Plan mode → วาง prompt → ตอบทีละข้อ |
| **B — สั่งแบบคำสั่งเดียว** | คนที่คุ้น PowerShell / อยากทำซ้ำ | ส่ง prompt + คำตอบรวมผ่าน `claude -p` |

ไฟล์ prompt (คัดลอกเฉพาะส่วนในกรอบ):

- [`prompts/01-plan-interview.md`](prompts/01-plan-interview.md) — สัมภาษณ์ + เขียน PROFILE  
- [`prompts/02-brainstorm-superpowers.md`](prompts/02-brainstorm-superpowers.md) — ขยายไอเดีย Must/Nice/Later  

---

## ทาง A — ขั้นตอนการทำ Lab (แนะนำในห้อง)

### ขั้นที่ 1 — เปิด Claude ในโฟลเดอร์ถูกที่

**ทำที่:** Windows Terminal (แท็บใหม่) — พิมพ์ตามนี้

```powershell
cd <โฟลเดอร์-repo-ของคุณ>
claude
```

ต้องเห็นว่าโฟลเดอร์นี้มี `package.json` และ `astro.config.mjs`  
ถ้าเปิดผิดที่ → พิมพ์ `exit` แล้ว `cd` ใหม่ก่อนเปิด `claude` อีกครั้ง

### ขั้นที่ 2 — เปิด Plan mode (ทำเอง ก่อนวาง prompt)

**ทำที่:** ในหน้าต่าง `claude` ที่เปิดจากขั้นที่ 1

ทำอย่างใดอย่างหนึ่ง:

- กด **Shift+Tab** จนโหมดเป็น Plan หรือ  
- พิมพ์ `/plan` แล้ว Enter  

**ทำไมต้องทำขั้นนี้:** Plan mode ให้ Claude วางแผนและถามก่อนเขียนไฟล์ — เหมาะกับงาน “สัมภาษณ์” มากกว่าโหมดที่รีบสร้างโค้ดทันที

### ขั้นที่ 3 — วาง prompt สัมภาษณ์

**ทำที่:** ในหน้าต่าง `claude` — วางแล้วกด Enter

1. เปิดไฟล์ [`prompts/01-plan-interview.md`](prompts/01-plan-interview.md)  
2. คัดลอก**เฉพาะ**ข้อความในกรอบ \`\`\`text ... \`\`\`  
3. วางใน Claude แล้ว Enter  

### ขั้นที่ 4 — ตอบคำถามอย่างน้อย 8 ข้อ

**ทำที่:** ในหน้าต่าง `claude` (บทสนทนาเดิม) — พิมพ์คำตอบทีละข้อ

- ตอบด้วยข้อมูลจริงหรือ persona สาธิตก็ได้ แต่**ใช้ชุดเดียวกันทั้งคอร์ส**  
- ถ้าไม่แน่ใจเรื่องสี/โทน บอกว่า “อยากได้โทนสะอาด อ่านง่าย ไม่ฉูดฉาด” ก็พอ  
- อีเมลบนเว็บสาธารณะ: ใช้ `demo@example.com` ได้ถ้ายังไม่อยากโชว์ของจริง  

เมื่อ Claude สรุปแผนและเขียนไฟล์แล้ว ไปขั้นถัดไป

### ขั้นที่ 5 — เปิดไฟล์ดูด้วยตา

**ทำที่:** Windows Terminal (แท็บ `powershell`) — พิมพ์ตามนี้ (หรือเปิดใน VS Code)

```powershell
notepad .\docs\PROFILE.md
```

หรือใน VS Code: เปิด `docs/PROFILE.md`  
อ่านคร่าว ๆ ว่าชื่อ / headline / interests มีเนื้อหาจริง

### ขั้นที่ 6 — Brainstorm ด้วย superpowers

1. ยังอยู่ในเซสชัน `claude` (ถ้าปิดไปแล้วเปิดใหม่ที่โฟลเดอร์เดิม)  
2. วาง prompt จาก [`prompts/02-brainstorm-superpowers.md`](prompts/02-brainstorm-superpowers.md)  
3. ตรวจว่าท้าย `docs/PROFILE.md` มี `## Brainstorm`

**ความรู้เสริม:** brainstorming ช่วย “แยกว่าอะไรต้องมีวันนี้ / อะไรเก็บไว้ทีหลัง” — ลด scope บวมก่อน Ship

### ขั้นที่ 7 — บันทึกงาน (commit)

**ทำที่:** Windows Terminal (แท็บ `powershell`) — พิมพ์ตามนี้

```powershell
git add docs/PROFILE.md
git status
git commit -m "docs: add PROFILE from Lab 01 interview"
```

push เมื่อวิทยากรบอก (อย่า push `.env`)

---

## ทาง B — CLI สั้น ๆ (ทางเลือก)

**ทำที่:** Windows Terminal (แท็บ `powershell`) — พิมพ์ตามนี้

เหมาะเมื่อคุณ**เตรียมคำตอบสัมภาษณ์ไว้แล้ว**ในไฟล์ข้อความ

```powershell
cd <โฟลเดอร์-repo-ของคุณ>
$prompt = Get-Content -Raw .\labs\lab-01-interview\prompts\01-plan-interview.md
$answers = @'
## คำตอบของฉัน
Name: ...
Headline: ...
Bio: ...
Audience: ...
Interests: ...
Contact: ...
Tone: ...
'@
($prompt + "`n`n" + $answers) | claude -p --permission-mode acceptEdits --output-format text
```

แล้วตามด้วย prompt brainstorm:

```powershell
Get-Content -Raw .\labs\lab-01-interview\prompts\02-brainstorm-superpowers.md |
  claude -p --permission-mode acceptEdits --output-format text
```

ตรวจไฟล์เหมือนทาง A ขั้นที่ 5–7

---

## ตัวอย่างว่า PROFILE ดีหน้าตาประมาณไหน

ไม่ต้อง copy ตรง ๆ — ใช้เป็นแนวว่า “ละเอียดพอไหม”

```markdown
# PROFILE

## Name
สมชาย ใจดี

## Headline
Solution Architect ที่สนใจ Data และ AI agents

## Bio
ทำงานด้านระบบองค์กรมาหลายปี สนใจพาทีมจากเดโม LLM ไปสู่งานที่ใช้จริงได้…
(อีก 1–2 ย่อหน้า)

## Audience
วิศวกรและผู้จัดการผลิตภัณฑ์ที่อยากทดลอง multi-agent อย่างมีขอบเขต

## Interests
- Microsoft Fabric และ lakehouse
- AI-assisted developer workflow
- การออกแบบ workshop ที่ทำตามได้

## Contact
- email: demo@example.com
- github: https://github.com/you

## Tone
- สีหลัก: น้ำเงินสงบ อ่านง่าย
- น้ำเสียง: เป็นกันเอง แต่มีโครง

## Brainstorm
- Must: หน้า Contact ที่ส่งข้อความได้จริง
- Nice: Guestbook + โชว์ interests เป็นการ์ด
- Later: บล็อกหรือคลังบทความ
```

---

## สิ่งที่ได้รับหลังจบ Lab

| สิ่งที่ได้รับ | อยู่ที่ | ผ่านเมื่อ |
|---|---|---|
| โปรไฟล์ | `docs/PROFILE.md` | มีชื่อ, headline, bio, audience, interests ≥ 3, contact, tone |
| Brainstorm | ท้ายไฟล์เดียวกัน | มีหัวข้อ `## Brainstorm` และ Must / Nice / Later |
| (แนะนำ) | Git commit | commit ข้อความประมาณ `docs: add PROFILE from Lab 01` |

**ยังไม่ผ่านถ้า…**

- ให้ AI เดาชื่อและเรื่องเล่าโดยคุณไม่ตอบสัมภาษณ์  
- ไฟล์ว่างหรือมีแค่หัวข้อไม่มีเนื้อหา  
- เผลอ commit `.env` หรือรหัสลับ  
- ไปแก้หน้า `.astro` ใน Lab นี้ (เก็บไว้ Lab 04)

---

## ตรวจว่าผ่าน Lab หรือยัง

```powershell
Test-Path .\docs\PROFILE.md
Select-String -Path .\docs\PROFILE.md -Pattern "## Name|## Headline|## Interests|## Brainstorm"
npm test
git check-ignore -v .env
```

เช็คลิสต์:

- [ ] มี `docs/PROFILE.md` ครบหัวข้อหลัก  
- [ ] มี `## Brainstorm` (Must / Nice / Later)  
- [ ] คุณตอบสัมภาษณ์จริง ไม่ให้ AI เดาทั้งก้อน  
- [ ] `npm test` ผ่าน · `.env` ไม่ถูก commit  
- [ ] (แนะนำ) มี git commit แล้ว  

---

## ติดปัญหาบ่อย (Windows)

| อาการ | ลองทำ |
|---|---|
| หา `claude` ไม่เจอ | ปิดเปิด Windows Terminal · ตรวจ SETUP ข้อเครื่องมือ |
| Plan mode ไม่ขึ้น | อัปเดต Claude Code · ลองพิมพ์ `/plan` |
| วาง prompt แล้ว Claude รีบสร้างหน้าเว็บ | ย้ำว่า “Lab นี้ห้ามแก้ `.astro`” หรือเริ่มเซสชันใหม่ใน Plan mode |
| superpowers ไม่มี brainstorming | กลับ [`Lab 00`](../lab-00-project-init/README.md) · ติดตั้งใหม่ `--scope project` |
| ไม่แน่ใจว่าอยู่โฟลเดอร์ถูกไหม | `Get-Location` แล้วดูว่ามี `package.json` กับ `labs\` |

---

## Lab ถัดไป

[`lab-02-debate`](../lab-02-debate/README.md) — ให้หลายบทบาทถกจาก `docs/PROFILE.md` จนได้ `docs/DECISIONS.md`
