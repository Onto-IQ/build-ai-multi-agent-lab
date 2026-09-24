# Lab 02 — ให้หลายมุมโต้กัน แล้วตัดสินใจเอง

**ใช้เวลาประมาณ:** 75–90 นาที  
**เครื่องมือ:** Claude Code (แนะนำ 2.1.278+) · Subagents (หลัก) · Agent Teams (ทางเลือก)  
**ผลลัพธ์หลัก:** `docs/DEBATE.md` + `docs/DECISIONS.md`

> Lab นี้ยัง**ไม่**แต่งหน้าเว็บ — ฝึก “หลายเสียง agent” แล้ว**คุณ**เป็นคนตัดสินใจ

---

## คุณจะได้อะไรจาก Lab นี้

1. **ประสบการณ์ multi-agent จริง** — Brand / UX / Devil ไม่ใช่แค่สลับหมวกในแชทเดียว  
2. **เอกสารตัดสินใจ** ที่ Lab 03–05 จะอ้างเป็น backlog และขอบเขตงาน  
3. ความรู้สึกว่า “มุมขัดกันได้” แล้วเลือกได้อย่างมีเหตุผล

**เสาที่ฝึก:** **Sub-Agent (เสา 2)** — spawn ใช้แล้วทิ้ง

**ความรู้ที่ควรติดตัว**

- ทำไมต้อง**แยกบทบาท/แยกเซสชัน** — context สะอาด ลดการประนีประนอมเองของโมเดลเดียว  
- **Sub-Agent ≠ agent ถาวร:** Brand/UX/Devil จบรอบแล้วทิ้ง · สิ่งที่ต้องจำต่อมีแค่ใน `docs/DEBATE.md` / `DECISIONS.md`  
- ต่างจาก `.claude/agents/frontend.md` / `.opencode/agents/backend.md` (Lab 00) ที่ใช้ซ้ำทั้งคอร์ส  
- ห้ามเอา debate persona ไปปนกับเซสชัน implement (Lab 04/05)  
- Subagents vs Agent Teams — Teams พังได้บน Windows; Subagents ผ่าน Lab ได้เท่ากัน  
- ความต่างของ **DEBATE (ความเห็น)** กับ **DECISIONS (คำตัดสิน)**

---

## ก่อนเริ่ม (ตรวจเร็ว)

ต้องมี [`Lab 01`](../lab-01-interview/README.md) เสร็จ — มี `docs/PROFILE.md`

```powershell
cd <โฟลเดอร์-repo-ของคุณ>
Test-Path .\docs\PROFILE.md
claude --version
```

เตรียมไฟล์ว่างสำหรับบันทึก:

```powershell
@'
# Debate — Personal Site

> Lab 02 — บันทึกจาก Subagents / Teams

'@ | Set-Content -Encoding utf8 .\docs\DEBATE.md
```

ถ้าจะลอง Agent Teams (ไม่บังคับ): ใน `.env` ควรมี `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` ตาม [`SETUP.md`](../../SETUP.md)

---

## เลือกวิธีทำ

| ทาง | เหมาะกับใคร | สั้น ๆ |
|---|---|---|
| **A — Subagents / เซสชันแยก (แนะนำ)** | คนที่อยากเห็นมุมขัดกันชัด | เปิด `claude` ใหม่ (หรือ `@`) ทีละบทบาท |
| **B — CLI** | คนที่คุ้น `claude -p` | ส่ง prompt ทีละไฟล์ |
| **C — Agent Teams (ทางเลือก)** | อยากลอง Teams | ใช้ prompt 05 — ถ้าไม่เสถียรใน 15 นาที กลับ A |

ไฟล์ prompt (คัดลอกเฉพาะในกรอบ \`\`\`text):

- [`01-brand-strategist.md`](prompts/01-brand-strategist.md)
- [`02-ux-critic.md`](prompts/02-ux-critic.md)
- [`03-devils-advocate.md`](prompts/03-devils-advocate.md)
- [`04-synthesize-decisions.md`](prompts/04-synthesize-decisions.md)
- [`05-agent-teams-fallback.md`](prompts/05-agent-teams-fallback.md) — ทางเลือก

---

## ทาง A — ขั้นตอนการทำ Lab (แนะนำในห้อง)

### ขั้นที่ 1 — Brand Strategist

**ทำที่:** Windows Terminal แท็บ `claude` — ทำตามลำดับ

1. เปิด `claude` ที่โฟลเดอร์ repo  
2. (แนะนำ) พิมพ์ `@` แล้วเลือก/สร้าง subagent **หรือ** เปิดเซสชันใหม่  
3. วาง prompt จาก `01-brand-strategist.md`  
4. เปิด `docs/DEBATE.md` ดูว่ามีหัวข้อ Brand แล้ว

### ขั้นที่ 2 — UX Critic

**ทำที่:** เซสชัน/subagent **ใหม่** ใน `claude` — วาง prompt

เซสชัน/subagent **ใหม่** → วาง `02-ux-critic.md` → ตรวจหัวข้อ UX ใน DEBATE

### ขั้นที่ 3 — Devil's Advocate

**ทำที่:** เซสชัน/subagent **ใหม่** อีกตัว — วาง prompt

เซสชัน/subagent **ใหม่** → วาง `03-devils-advocate.md` → ตรวจหัวข้อ Devil

**ทำไมแยกเซสชัน:** ถ้าใช้แชทเดียวสลับหมวก โมเดลมัก “กลมกลืน” จนความขัดแย้งหาย  
**ใช้แล้วทิ้ง:** หลังจบ 3 มุม ไม่ต้องเก็บเซสชัน Brand ไว้ — เปิดใหม่สำหรับ synthesize ได้ · ของมีค่าอยู่ในไฟล์

### ขั้นที่ 4 — สังเคราะห์เป็น DECISIONS

**ทำที่:** เซสชัน facilitator (คุณ หรือ `claude` หลัก) — วาง prompt

เซสชัน facilitator (คุณหรือ Claude หลัก) → วาง `04-synthesize-decisions.md`  
อ่านตาราง D1–D6 แล้ว**แก้คำตัดสินเอง**ถ้ายังคลุมเครือ

### ขั้นที่ 5 — (ทางเลือก) Agent Teams

**ทำที่:** Agent Teams ตาม SETUP — วาง prompt

ถ้า Teams พร้อม: เปิดตาม SETUP แล้ววาง `05-agent-teams-fallback.md`  
**ถ้าไม่เสถียรภายใน 15 นาที** → ใช้ Subagents อย่างเดียว ยังผ่าน Lab  
**อย่าบังคับ tmux บน Windows**

(ทางนี้มีหัวข้อเต็มใน **ทาง C** ด้านล่าง)

### ขั้นที่ 6 — Commit

**ทำที่:** Windows Terminal (แท็บ `powershell`) — พิมพ์ตามนี้

```powershell
git add docs/DEBATE.md docs/DECISIONS.md docs/PROFILE.md
git status
git commit -m "docs: debate and decisions from Lab 02"
```

---

## ทาง B — CLI

**ทำที่:** Windows Terminal (แท็บ `powershell`) — พิมพ์ทีละบล็อก ตามลำดับ (แต่ละบล็อก = 1 เซสชัน one-shot แยกจากกันตามหลักแยกบทบาท)

**1) Brand Strategist:**

```powershell
cd <โฟลเดอร์-repo-ของคุณ>
Get-Content -Raw .\labs\lab-02-debate\prompts\01-brand-strategist.md |
  claude -p --permission-mode acceptEdits --output-format text
```

**2) UX Critic:**

```powershell
Get-Content -Raw .\labs\lab-02-debate\prompts\02-ux-critic.md |
  claude -p --permission-mode acceptEdits --output-format text
```

**3) Devil's Advocate:**

```powershell
Get-Content -Raw .\labs\lab-02-debate\prompts\03-devils-advocate.md |
  claude -p --permission-mode acceptEdits --output-format text
```

ระหว่างทาง เปิด `docs/DEBATE.md` ดูว่าครบ 3 หัวข้อแล้ว

**4) สังเคราะห์เป็น DECISIONS:**

```powershell
Get-Content -Raw .\labs\lab-02-debate\prompts\04-synthesize-decisions.md |
  claude -p --permission-mode acceptEdits --output-format text
```

อ่านตาราง D1–D6 แล้ว**แก้คำตัดสินเอง**ถ้ายังคลุมเครือ · จบด้วย commit เหมือนทาง A ขั้นที่ 6

---

## ทาง C — Agent Teams (ทางเลือก)

**ทำที่:** Windows Terminal แท็บ `claude` (ต้องมี `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` ใน `.env` ตามหัวข้อ "ก่อนเริ่ม")

1. เปิด `claude` ที่ root repo — พิมพ์:

```powershell
claude
```

2. วาง prompt จาก [`prompts/05-agent-teams-fallback.md`](prompts/05-agent-teams-fallback.md) — prompt ตัวนี้จะจัดทีม Brand / UX / Devil และสังเคราะห์ `docs/DECISIONS.md` ตามโครงเดียวกับ `04-synthesize-decisions.md` ให้เอง  
3. **ถ้าไม่เสถียรภายใน 15 นาที** → กลับไปทาง A (Subagents) — ยังผ่าน Lab เท่ากัน  
4. **อย่าบังคับ tmux บน Windows** · Teams พังได้ = ปกติของ Windows ไม่ใช่ความผิดของคุณ

จบแล้วตรวจเหมือนทาง A: มี `docs/DEBATE.md` ครบ 3 มุม + `docs/DECISIONS.md` ตาราง D1–D6 · commit ตามทาง A ขั้นที่ 6

---

## ตัวอย่าง DECISIONS ที่ “ตัดสินจริง”

```markdown
| D1 | headline | ใช้ headline สั้น + tagline ยาว | อ่านบนมือถือ | Brand + UX |
| D2 | guestbook | เปิด v1 แต่มี rate limit | spam | Devil |
| D3 | สีหลัก | #2563eb | สอดคล้อง tone | Brand |
```

แต่ละแถวต้องตอบได้ว่า “เลือกอะไร / ทำไม / มุมไหนผลัก”

---

## PROFILE เชื่อมกับมุมไหน

| หัวข้อ PROFILE | Brand | UX | Devil |
|---|---|---|---|
| headline | positioning | scan มือถือ | overclaim |
| interests | ความเชี่ยวชาญ | จำนวนรายการ | ข้อมูลเกินจำเป็น |
| contact | trust | ฟอร์มสั้น | spam / privacy |
| Brainstorm Must | ลด scope | ลด cognitive load | ตัด feature เสี่ยง |

---

## สิ่งที่ได้รับหลังจบ Lab

| สิ่งที่ได้รับ | อยู่ที่ | ผ่านเมื่อ |
|---|---|---|
| ความเห็น 3 มุม | `docs/DEBATE.md` | มี `## Brand Strategist`, `## UX Critic`, `## Devil's Advocate` |
| การตัดสินใจ | `docs/DECISIONS.md` | ตาราง D1–D6+, Out of scope, เกณฑ์พร้อม Lab 04 |
| (แนะนำ) | Git commit | `docs: debate and decisions from Lab 02` |

**ยังไม่ผ่านถ้า…** DEBATE เป็นคนเดียวเขียนคลอ · ไม่มี D1–D6 · ไปแก้ไฟล์ `.astro`

---

## ตรวจว่าผ่านหรือยัง

```powershell
Test-Path .\docs\DEBATE.md, .\docs\DECISIONS.md
Select-String -Path .\docs\DEBATE.md -Pattern "## Brand Strategist","## UX Critic","## Devil"
Select-String -Path .\docs\DECISIONS.md -Pattern "\| D[1-6] "
npm test
```

- [ ] DEBATE ครบ 3 หัวข้อ · มีความขัดแย้งที่บันทึกจริง  
- [ ] DECISIONS ≥ 6 แถว · Out of scope · เกณฑ์พร้อม Lab 04  
- [ ] ใช้ Subagents หรือ Teams — ไม่ใช่แชทเดียวสลับหมวกโดยไม่แยกรอบ  
- [ ] (แนะนำ) มี git commit  

---

## ติดปัญหาบ่อย (Windows)

| อาการ | ลองทำ |
|---|---|
| Agent Teams ไม่ขึ้น | ใช้ Subagents 3 รอบ — ผ่านเท่ากัน |
| Subagent ลืม append DEBATE | ย้ำ “append under ## …” · เปิดไฟล์ดูก่อนปิด |
| context ปนกัน | เปิด `claude` ใหม่ต่อบทบาท |
| CLI เขียนทับไฟล์ | backup `DEBATE.md` ก่อนรัน |

### คำถามทบทวน

1. มุมไหนขัดกันมากที่สุด — คุณเลือกใครใน D-id ไหน?  
2. Subagents 3 เซสชันต่างจากแชทเดียวสลับหมวกอย่างไร?  
3. Out of scope มีอะไรเสียดาย — เก็บเป็น issue ภายหลังได้ไหม?

---

**Lab ถัดไป:** [`lab-03-plan-issues`](../lab-03-plan-issues/README.md)
