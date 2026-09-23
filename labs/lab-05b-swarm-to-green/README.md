# Lab 05b — Swarm ดันงานให้เขียว (เพดาน 20 turns)

**ใช้เวลาประมาณ:** 45–75 นาที  
**เครื่องมือ:** Claude Code และ/หรือ OpenCode · Subagents หรือ Agent Teams  
**เสาที่ฝึก:** **4 — Swarm** (ไม่กลัวเปลือง เพราะมีเพดาน)  
**ผลลัพธ์หลัก:** `docs/SWARM.md` + `npm run test:labs` เขียว (หรือสรุปช่องว่างเมื่อครบ 20 turns)

> ปล่อยหลายตัวได้ — แต่**หยุดที่ 20 turns** หรือเมื่อ done criteria ครบ  
> ใช้ skill **`public-site-safe`**

---

## คุณจะได้อะไรจาก Lab นี้

1. สัมผัส **swarm** (หลายตัว / หลาย turn) บน guestbook หรือช่องว่างหลัง Lab 05  
2. เคารพ**เพดาน 20 turns** — ไม่ปล่อยลูปไม่สิ้นสุด  
3. บันทึกว่าใช้กี่ turn · เสร็จอะไร · ค้างอะไร

**ความรู้ที่ควรติดตัว**

- Swarm ≠ ไม่มีขีดจำกัด — เพดานทำให้กล้าลองโดยไม่กลัวเปลือง  
- Done criteria ชัดก่อนปล่อย ลด context drift  
- Agent Teams บน Windows พังได้ → Subagents ขนาน / สลับยังผ่านได้  
- ต่างจาก Lab 02: ที่นี่เป็น swarm เพื่อ**ปิดเกณฑ์** ไม่ใช่แค่ถก

---

## ก่อนเริ่ม

- ผ่าน [`Lab 05`](../lab-05-backend/README.md) หรืออย่างน้อยมี stub guestbook  
- มี agents จาก [`Lab 00`](../lab-00-project-init/README.md)  
- เปิด VS Code ที่ root + Windows Terminal

```powershell
cd <โฟลเดอร์-repo-ของคุณ>
npm run test:labs
# จดว่าเขียวหรือแดง — และ error แรกถ้าแดง
```

ถ้า `test:labs` เขียวอยู่แล้ว: ใช้ swarm เก็บงานค้างเล็กน้อย (validation, error message, docs) หรือรีวิวผ่านเกณฑ์ใน `docs/DECISIONS.md` ภายใน 20 turns แล้วบันทึกใน `SWARM.md`

---

## สิ่งที่ต้องมีเมื่อจบ Lab

| สิ่งที่ต้องมี | ผ่านเมื่อ |
|---|---|
| `docs/SWARM.md` | มี done criteria, จำนวน turns (≤20 หรือหยุดที่เพดาน), สรุปเสร็จ/ค้าง |
| ผลงาน | `test:labs` เขียว **หรือ** สรุปช่องว่างชัดเมื่อครบ 20 |
| Guardrail | ไม่ commit secret · ใช้ `public-site-safe` |

**ยังไม่ผ่านถ้า…** ปล่อยลูปไม่มีเพดาน · ไม่มี `SWARM.md` · ไม่มี done criteria

---

## ทีละขั้น

### 1) เขียน done criteria (คุณทำก่อนปล่อย)

ตัวอย่าง:

```text
สำเร็จเมื่อ: npm run test:labs เขียว และฟอร์ม guestbook ส่ง demo ได้บน localhost
เพดาน: 20 turns รวมทุกตัวใน swarm นี้
```

### 2) สร้างโครง SWARM.md

```powershell
@'
# SWARM — Lab 05b

## Done criteria
- 

## Ceiling
- Max turns: 20

## Log
| Turn range | Who | What |
|---|---|---|
| 1–… | | |

## Outcome
- Turns used:
- test:labs:
- Gaps:
'@ | Set-Content -Encoding utf8 .\docs\SWARM.md
```

### 3) ปล่อย swarm

**ทาง A — Subagents / หลายเซสชัน (แนะนำบน Windows):**  
เปิด `claude` หรือ `opencode` ตาม ownership งานที่ค้าง · วาง [`prompts/01-swarm-to-green.md`](prompts/01-swarm-to-green.md)  
สลับ/ขนานได้ แต่**นับ turn รวม ≤ 20**

**ทาง B — Agent Teams (ทางเลือก):**  
ถ้า Teams พร้อม ให้ facilitator ใช้ prompt เดียวกัน · ถ้าไม่เสถียรใน 15 นาที กลับทาง A

ระหว่างรัน: อัปเดตตารางใน `docs/SWARM.md` คร่าว ๆ (ไม่ต้องละเอียดทุกข้อความ)

### 4) หยุดเมื่อเขียว หรือครบ 20

```powershell
npm run test:labs
npm test
```

เติม Outcome ใน `SWARM.md` · commit:

```powershell
git add docs/SWARM.md
git add -u
git status   # ไม่มี .env
git commit -m "docs: Lab 05b swarm log (≤20 turns)"
```

---

## ตรวจว่าผ่านหรือยัง

```powershell
Test-Path .\docs\SWARM.md
Select-String -Path .\docs\SWARM.md -Pattern "20|Turns used|Done criteria"
npm run test:labs
```

- [ ] มี done criteria ก่อนปล่อย  
- [ ] turns ≤ 20 หรือหยุดที่เพดานพร้อมสรุปช่องว่าง  
- [ ] `docs/SWARM.md` ครบ  
- [ ] ไม่ leak secret  

---

## ติดปัญหาบ่อย

| อาการ | ลองทำ |
|---|---|
| นับ turn ไม่รู้ | นับรอบที่คุณส่งข้อความ / รอบที่ agent ตอบเป็น 1 turn คร่าว ๆ |
| Teams พัง | Subagents · ยังผ่าน Lab |
| เลย 20 โดยไม่ตั้งใจ | หยุดทันที · บันทึกใน SWARM ว่าเกินแล้วตัดงาน |
| แดงเพราะ UI | ให้ `@frontend` ช่วยไม่เกินเพดานที่เหลือ |

---

**Lab ถัดไป:** [`lab-06-playwright`](../lab-06-playwright/README.md)
