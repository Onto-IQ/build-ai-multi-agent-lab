# Lab 02 — Multi-Agent Debate (Subagents / Agent Teams)

**เวลาเป้าหมาย:** 75–90 นาที  
**เครื่องมือ:** Claude Code **2.1.278+** · Subagents (หลัก) · Agent Teams (ทางเลือก)  
**Issue อ้างอิง:** `[Lab 02] Brand debate`

## เป้าหมาย

ฝึก **หลายตัวตน agent** โต้วาถีจาก `docs/PROFILE.md` แล้วสรุปเป็น **`docs/DEBATE.md`** และ **`docs/DECISIONS.md`**  
**จุดที่ควรรู้สึกว้าว:** มุม Brand / UX / Devil's Advocate ขัดกันจริง — แล้วคุณตัดสินใจเป็น D1–Dn

---

## ได้รับมาจาก Lab ก่อน

- [`Lab 01`](../lab-01-interview/README.md): มี `docs/PROFILE.md` + Brainstorm
- SETUP: `.env` มี `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` (ถ้าจะลอง Teams)

## ได้เพิ่มใน Lab นี้

- **`docs/DEBATE.md`** — บันทึกความเห็น 3 บทบาท
- **`docs/DECISIONS.md`** — ตารางการตัดสินใจ ≥ 6 แถว
- (ทางเลือก) ปรับ PROFILE เล็กน้อยตาม debate

---

## ผลลัพธ์รูปธรรม (ไฟล์ที่ต้องมี)

| ไฟล์ | เนื้อหาขั้นต่ำ |
|---|---|
| `docs/DEBATE.md` | หัวข้อ `## Brand Strategist`, `## UX Critic`, `## Devil's Advocate` |
| `docs/DECISIONS.md` | ตาราง D1–D6+, Out of scope, เกณฑ์พร้อม Lab 04 |

**ต้องเห็นด้วยตา:** อ่าน DEBATE แล้วเห็นความขัดแย้งอย่างน้อย 2 จุด · DECISIONS มีคำตัดสินชัด (ไม่ใช่ "แล้วแต่")

**ยังไม่ผ่านถ้า…**

- DEBATE เป็นคนเดียวเขียนคลอ (ไม่มี 3 มุม)
- ไม่มี DECISIONS หรือไม่มี ID D1–D6
- แก้โค้ด Astro แทนเอกสาร

---

## Preflight

```powershell
# repo สินค้า
Test-Path .\docs\PROFILE.md
Get-Content .\docs\PROFILE.md | Select-Object -First 15
claude --version
```

เตรียมไฟล์เปล่า:

```powershell
@'
# Debate — Personal Site

> Lab 02 — บันทึกจาก Subagents / Teams

'@ | Set-Content -Encoding utf8 .\docs\DEBATE.md
```

ตรวจ Agent Teams (ไม่บังคับ):

```powershell
Select-String -Path .\.env -Pattern "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS"
```

---

## เลือกทาง A — TUI vs B — CLI

| ทาง | เหมาะกับ | หมายเหตุ |
|---|---|---|
| **A — TUI** | Subagents แยกเซสชัน / `@` | แนะนำ — context สะอาด |
| **B — CLI** | `claude -p` ทีละบทบาท | ย้ำบทบาททุกรอบ |

Prompts:

- [`prompts/01-brand-strategist.md`](prompts/01-brand-strategist.md)
- [`prompts/02-ux-critic.md`](prompts/02-ux-critic.md)
- [`prompts/03-devils-advocate.md`](prompts/03-devils-advocate.md)
- [`prompts/04-synthesize-decisions.md`](prompts/04-synthesize-decisions.md)
- [`prompts/05-agent-teams-fallback.md`](prompts/05-agent-teams-fallback.md)

---

## ขั้นตอน

### ทาง A — TUI (Subagents หลัก)

#### 1) Brand Strategist

เปิด `claude` ใหม่ (หรือ subagent) → วาง [`01-brand-strategist.md`](prompts/01-brand-strategist.md)

#### 2) UX Critic

เซสชันใหม่หรือ subagent ใหม่ → [`02-ux-critic.md`](prompts/02-ux-critic.md)

#### 3) Devil's Advocate

→ [`03-devils-advocate.md`](prompts/03-devils-advocate.md)

#### 4) สังเคราะห์

เซสชัน facilitator (คุณหรือ Claude หลัก) → [`04-synthesize-decisions.md`](prompts/04-synthesize-decisions.md)

#### 5) (ทางเลือก) Agent Teams

ถ้า Teams พร้อม → [`05-agent-teams-fallback.md`](prompts/05-agent-teams-fallback.md)  
**ถ้าไม่เสถียรภายใน 15 นาที** → ใช้ Subagents อย่างเดียว

#### 6) Commit

```powershell
git add docs/DEBATE.md docs/DECISIONS.md docs/PROFILE.md
git commit -m "docs: debate and decisions from Lab 02"
```

---

### ทาง B — CLI

รันทีละบทบาท (ย้ำ READ/WRITE path ใน prompt):

```powershell
$role = Get-Content -Raw .\path\to\labs\lab-02-debate\prompts\01-brand-strategist.md
$role | claude -p --permission-mode acceptEdits --output-format text
# ทำซ้ำ 02, 03 แล้ว 04
```

---

## ตัวอย่างผลลัพธ์ที่คาดหวัง

**`docs/DECISIONS.md` (ย่อ)**

```markdown
| D1 | headline | ใช้ headline สั้น + tagline ยาว | อ่านบนมือถือ | Brand + UX |
| D2 | guestbook | เปิด v1 แต่มี rate limit ฝั่ง backend | spam | Devil |
| D3 | สีหลัก | #2563eb | สอดคล้อง tone | Brand |
```

**`docs/DEBATE.md`:** แต่ละหัวข้อ ≥ 1 ย่อหน้ + bullet ข้อเสนอ

---

## คำสั่งตรวจ

```powershell
Test-Path .\docs\DEBATE.md, .\docs\DECISIONS.md
Select-String -Path .\docs\DEBATE.md -Pattern "## Brand Strategist","## UX Critic","## Devil"
Select-String -Path .\docs\DECISIONS.md -Pattern "\| D[1-6] "
npm test
```

---

## เกณฑ์ผ่าน Lab

- [ ] DEBATE ครบ 3 หัวข้อ · มีความขัดแย้งที่บันทึกจริง
- [ ] DECISIONS ≥ 6 แถว · มี Out of scope · มีเกณฑ์พร้อม Lab 04
- [ ] PROFILE ยังสอดคล้อง (หรืออธิบายการแก้ใน DECISIONS)
- [ ] ใช้ Subagents หรือ Teams — **ไม่** single-chat สลับหมวกโดยไม่แยกรอบ

## ยังไม่ผ่านถ้า…

- รวม debate เป็นย่อหน้าเดียวไม่มี 3 มุม
- DECISIONS เป็น copy จาก PROFILE ไม่มีการตัดสิน
- ใช้ tmux บังคับบน Windows แล้วติดค้างจนข้าม deliverable

---

## Troubleshooting Windows

| อาการ | ทำอะไร |
|---|---|
| Agent Teams ไม่ขึ้น | ใช้ Subagents 3 รอบ — เกณฑ์ผ่านเท่ากัน |
| Subagent ลืม append DEBATE | ย้ำ "append under ## ..." · เปิดไฟล์ดูก่อนปิดเซสชัน |
| context ปนกัน | เปิด `claude` ใหม่ต่อบทบาท |
| CLI เขียนทับไฟล์ | ใช้ `--permission-mode acceptEdits` + backup `DEBATE.md` |
| ภาษาไม่สม่ำเสมอ | บอก "ภาษาไทยทั้งไฟล์" ใน facilitator prompt |

---

---

## บทบาทในสายงาน V4

Lab 02 เป็น **จุดแรกที่ multi-agent มองเห็นเป็นคนละเสียง** — ก่อน Lab 03 จะแปลง decisions เป็น issue  
ถ้าคุณใช้ Agent Teams สำเร็จ ให้จดใน DECISIONS ว่าใช้ Teams หรือ Subagents (วิทยากรใช้สถิติปรับห้องเรียน)

### เชื่อมกับ `docs/PROFILE.md`

| หัวข้อ PROFILE | Brand มักพูดถึง | UX มักพูดถึง | Devil มักพูดถึง |
|---|---|---|---|
| headline | positioning | scan บนมือถือ | overclaim |
| interests | ความเชี่ยวชาญ | จำนวนรายการ | ข้อมูลเกินจำเป็น |
| contact | trust | ฟอร์มสั้น | spam / privacy |
| Brainstorm Must | ลด scope | ลด cognitive load | ตัด feature เสี่ยง |

### Checklist ก่อนปิด Lab

```powershell
(Get-Content .\docs\DEBATE.md | Measure-Object -Line).Lines -gt 30
(Get-Content .\docs\DECISIONS.md | Select-String "\| D").Count -ge 6
git diff docs/PROFILE.md   # ถ้ามี ต้องอธิบายใน DECISIONS
```

### คำถามทบทวน (ตอบในใจหรือ learning note)

1. มุมไหนขัดกันมากที่สุด — คุณเลือกใครชนะใน D-id ไหน?
2. ถ้าใช้ Subagents 3 เซสชัน ต่างจากแชทเดียวสลับหมวกอย่างไร?
3. Out of scope v1 มีอะไรที่เสียดาย — เก็บไว้ issue ภายหลังได้ไหม?

### อ้างอิง SETUP

- Agent Teams: [`SETUP.md`](../../SETUP.md) ข้อ 6
- ไม่บังคับ tmux บน Windows

---

**Lab ถัดไป:** [`lab-03-plan-issues`](../lab-03-plan-issues/README.md)
