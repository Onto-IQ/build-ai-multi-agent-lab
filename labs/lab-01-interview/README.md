# Lab 01 — Interview & Plan (Claude Code + superpowers)

**เวลาเป้าหมาย:** 60–90 นาที  
**เครื่องมือ:** Claude Code **2.1.278+** · plugin **superpowers** (brainstorming)  
**สินค้า:** [Onto-IQ/build-ai-multi-agent-lab](https://github.com/Onto-IQ/build-ai-multi-agent-lab) (repo ของคุณ)  
**Issue อ้างอิง:** `[Lab 01] Profile interview` (ถ้ามีใน repo หลัง `create-course-issues`)

## เป้าหมาย

ฝึก **Plan mode** และการสัมภาษณ์กับ Claude เพื่อกำหนดตัวตนบนเว็บ personal branding  
แล้วแปลงคำตอบเป็น **`docs/PROFILE.md`** ที่ Lab ถัดไป (Debate, Frontend) จะอ้างอิง  
**จุดที่ควรรู้สึกว้าว:** Claude ถามเป็นลำดับ ไม่เดาโปรไฟล์ให้เอง — และ superpowers ช่วยขยายไอเดียโดยยังไม่แตะ UI

---

## ได้รับมาจาก Lab ก่อน

- ทำ [`SETUP.md`](../../SETUP.md) ครบ: Use this template แล้ว clone, `npm install`, `.env`, `create-course-issues`
- repo ของคุณรัน `npm run dev` ที่ http://localhost:4321 ได้
- ติดตั้ง superpowers: `/plugin install superpowers@claude-plugins-official`
- ทำงานที่ root ของ repo นี้ (มี package.json และ labs/)

## ได้เพิ่มใน Lab นี้

- ทักษะ **สัมภาษณ์ + แผน** ก่อนเขียนโค้ด
- ไฟล์ **`docs/PROFILE.md`** (แหล่งความจริงด้านเนื้อหา/โทน)
- ส่วน **`## Brainstorm`** จาก superpowers (Must / Nice / Later)

---

## ผลลัพธ์รูปธรรม (ไฟล์ที่ต้องมี)

| รายการ | ที่อยู่ | หมายเหตุ |
|---|---|---|
| โปรไฟล์ | `docs/PROFILE.md` | มี YAML frontmatter หรือหัวข้อชัด, เนื้อหาไทย |
| Brainstorm | ท้าย `docs/PROFILE.md` | หัวข้อ `## Brainstorm` อย่างน้อย 5 bullet |
| (ควรมี) Issue | GitHub issue Lab 01 | เปิดหรืออ้างอิงใน commit message ครั้งถัดไป |

**ต้องเห็นด้วยตา**

- เปิด `docs/PROFILE.md` แล้วอ่านได้ครบ: ชื่อ, headline, about, interests, contact, tone
- หน้า Home ใน dev อาจยังเป็นของ template — **ไม่บังคับ** ให้ sync UI ใน Lab 01

**ยังไม่ผ่านถ้า…**

- ไม่มี `docs/PROFILE.md` หรือเป็น placeholder ว่าง ๆ
- ไม่มีหลักฐานว่าใช้ Plan / interview (อย่างน้อย 8 คำถามใน log หรือสรุปในไฟล์)
- commit `.env` หรือ PAT

---

## Preflight

รันใน **root repo ของคุณ** (โฟลเดอร์ที่มี `package.json` — ไม่ใช่แค่ `build-ai-multi-agent-lab/labs/`)

```powershell
Get-Location
Test-Path .\package.json
Test-Path .\.env
claude --version    # ต้อง >= 2.1.278
npm test            # smoke ควรเขียว
npm run dev         # เปิดครั้งหนึ่ง แล้ว Ctrl+C
```

ที่ root ของ repo นี้:

```powershell
.\scripts\preflight.ps1
```

สร้างโฟลเดอร์ docs ถ้ายังไม่มี:

```powershell
New-Item -ItemType Directory -Force -Path .\docs | Out-Null
```

ถ้า `claude` ไม่เจอ → กลับ SETUP ข้อ 0  
ถ้า superpowers ไม่ขึ้น → ติดตั้ง plugin แล้วเปิด `claude` ใหม่

---

## เลือกทาง A — TUI vs B — CLI

ผลสุดท้ายเหมือนกัน: มี `docs/PROFILE.md` คุณภาพสัมภาษณ์

| ทาง | เหมาะกับ | คำสั่งหลัก |
|---|---|---|
| **A — TUI** (แนะนำ) | สัมภาษณ์โต้ตอบ, Plan mode, superpowers | `claude` แล้ววาง prompt |
| **B — CLI** (`claude -p`) | ทำซ้ำ / บันทึกสคริปต์ | pipeline ไป `claude -p` |

Prompt ไฟล์:

- [`prompts/01-plan-interview.md`](prompts/01-plan-interview.md)
- [`prompts/02-brainstorm-superpowers.md`](prompts/02-brainstorm-superpowers.md)

---

## ขั้นตอน (มีหมายเลข)

### ทาง A — TUI

#### 1) เปิด Claude ที่ repo ของคุณ

```powershell
cd <your-personal-site-repo>
claude
```

ยืนยันว่า working directory ถูก (มี `astro.config.mjs`)

#### 2) เปิด Plan mode + สัมภาษณ์

วางเนื้อหาใน [`prompts/01-plan-interview.md`](prompts/01-plan-interview.md) (บล็อกใน ```text)

ตอบคำถามทีละข้อ — ใช้ข้อมูลจริงหรือ persona demo ก็ได้ แต่**สม่ำเสมอ**ตลอดคอร์ส

#### 3) ตรวจ draft PROFILE

```powershell
Test-Path .\docs\PROFILE.md
Get-Content .\docs\PROFILE.md | Select-Object -First 40
```

#### 4) รัน superpowers brainstorming

วาง [`prompts/02-brainstorm-superpowers.md`](prompts/02-brainstorm-superpowers.md)

#### 5) Commit ใน repo ของคุณ (เมื่อพร้อม)

```powershell
git add docs/PROFILE.md
git status
git commit -m "docs: add PROFILE from Lab 01 interview"
```

(วิทยากรอาจขอ push — ทำเมื่อสั่ง)

---

### ทาง B — CLI

#### 1) สัมภาษณ์แบบ one-shot (แทนโต้ตอบ)

**PowerShell:** ใช้ here-string + pipeline

```powershell
$prompt = Get-Content -Raw .\..\build-ai-multi-agent-lab\labs\lab-01-interview\prompts\01-plan-interview.md
# แทรงคำตอบของคุณใน prompt หรือ append ด้านล่าง:
$answers = @'
displayName: ...
headline: ...
(สรุปคำตอบ interview 8 หัวข้อ)
'@
($prompt + "`n`nคำตอบผู้เรียน:`n" + $answers) |
  claude -p --permission-mode acceptEdits --output-format text
```

ปรับ path ของ prompt ใต้ `labs/lab-01-interview/prompts/` ให้ตรงเครื่องคุณ

#### 2) Brainstorm CLI

```powershell
$brain = Get-Content -Raw .\..\build-ai-multi-agent-lab\labs\lab-01-interview\prompts\02-brainstorm-superpowers.md
$brain | claude -p --permission-mode acceptEdits --output-format text
```

#### 3) ตรวจไฟล์เหมือนทาง A

---

## ตัวอย่างผลลัพธ์ที่คาดหวัง

**ต้นฉบับย่อของ `docs/PROFILE.md` (ตัวอย่าง ไม่ต้อง copy ตรง)**

```markdown
---
displayName: "สมชาย ใจดี"
headline: "Solution Architect ที่รัก Data & AI"
tagline: "จาก on-prem สู่ cloud-native"
about: |
  สวัสดีครับ ผมทำงานด้าน...
interests:
  - title: "Microsoft Fabric"
    blurb: "Medallion, OneLake"
contact:
  email: "demo@example.com"
  github: "https://github.com/you"
tone:
  primaryColor: "#2563eb"
  voice: "เป็นกันเอง แต่มีโครงสร้าง"
---

## Brainstorm
- Must: หน้า Contact + Guestbook ที่ปลอดภัย
- Nice: timeline โปรเจกต์
- Later: blog MDX
```

---

## คำสั่งตรวจ

```powershell
# อยู่ repo ของคุณ
Test-Path .\docs\PROFILE.md
Select-String -Path .\docs\PROFILE.md -Pattern "displayName|headline|## Brainstorm"
npm test
git check-ignore -v .env
```

ถ้ามี issue Lab 01:

```powershell
gh issue view --web
```

---

## เกณฑ์ผ่าน Lab

- [ ] มี `docs/PROFILE.md` ครบฟิลด์หลัก (ชื่อ, headline, about, interests ≥ 3, contact, tone)
- [ ] มี `## Brainstorm` และอ้าง Must/Nice/Later
- [ ] มีหลักฐาน Plan/interview (TUI log หรือสรุปใน about)
- [ ] `npm test` smoke เขียว · `.env` ไม่ถูก commit
- [ ] (แนะนำ) commit แล้ว push ไป repo ของคุณ

## ยังไม่ผ่านถ้า…

- PROFILE เป็นภาษาอังกฤษล้วนโดยไม่มีเหตุผล / ว่างเปล่า
- ข้าม interview แล้วให้ AI เดาชื่อและเรื่องเล่า
- แก้หน้า Astro แทนเอกสาร (scope Lab 04)
- ใส่ email/เบอร์จริงที่ไม่ต้องการเผยแพร่

---

## Troubleshooting Windows

| อาการ | ทำอะไร |
|---|---|
| เปิด `claude` ผิดโฟลเดอร์ | `cd` ไป repo ของคุณ ปิดแล้วเปิด `claude` ใหม่ |
| Plan mode ไม่ขึ้น | อัปเดต Claude Code ≥ 2.1.278 · ลอง `/plan` |
| superpowers ไม่มี brainstorming | `/plugin install superpowers@claude-plugins-official` แล้ว restart TUI |
| `claude -p` ไม่เขียนไฟล์ | เพิ่ม `--permission-mode acceptEdits` |
| PowerShell ตัด prompt ยาว | ใช้ `$x \| claude -p` ไม่ใช่ argument เดียวยาวมาก |
| path ของ labs ผิด | ยืนยันว่าอยู่ที่ root ที่มี `package.json` และ `labs/` |
| พอร์ต 4321 ไม่ขึ้น | ตั้ง `PORT` ใน `.env` ตาม SETUP |

---

**Lab ถัดไป:** [`lab-02-debate`](../lab-02-debate/README.md) — ใช้ `docs/PROFILE.md` เป็นวัตถุโต้วาถี
