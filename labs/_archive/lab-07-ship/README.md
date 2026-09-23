# Lab 07 — Ship & Showcase (ขึ้นระบบจริง & เวทีประลองผลงาน)

**เวลาเป้าหมาย:** 60 นาที  
**เครื่องมือหลัก:** Production Build (`npm run build`), Cloud Deploy (Vercel / Cloudflare Pages / GitHub Pages / Tunnel), Public URL, เวทีโชว์ผลงาน 3–5 นาที

---

## 🎯 วัตถุประสงค์การเรียนรู้ (Learning Objectives)

1. ฝึกกระบวนการ **Production Build & Verification** ของแอปพลิเคชันที่สร้างโดย Multi-Agent
2. ทำการ Deploy แอปขึ้นสู่ **Public URL สาธารณะจริง**
3. ยืนยันเกณฑ์เด็ดขาดของวิศวกร: **"ห้ามอ้างว่า Deploy เสร็จ ถ้ายังไม่มี URL ที่ทุกคนเปิดได้จริง"**
4. นำเสนอผลงานของตนเองบนเวทีประลอง (Showcase & Competition) เพื่อแลกเปลี่ยนประสบการณ์กับเพื่อนในห้อง

---

## 🧭 บริบท: สรุปการเดินทางสู่ Production

```text
[Lab 01-06 ผ่านครบ: Trade Desk สมบูรณ์บน Localhost]
        │
        ▼  (คุณลงมือใน Lab 07)
[1. สร้าง Production Bundle]
    cd apps/trade-desk/frontend && npm run build
        │
        ▼
[2. Deploy ขึ้น Public URL จริง]
    Vercel / Cloudflare Pages / Netlify / Cloudflare Tunnel
        │
        ▼
[3. อัปเดต Command Center Checklist]
    ship: true (เฉพาะเมื่อได้ URL แล้วเท่านั้น!)
        │
        ▼
[4. เวทีประลองผลงาน Showcase (3-5 นาทีต่อคน)]
```

---

## 🛠️ ขั้นตอนการทดลอง (Hands-on Steps)

### ขั้นที่ 1: ตรวจสอบและสร้าง Production Build
เปิด Windows Terminal ที่โฟลเดอร์ frontend:

```powershell
cd apps/trade-desk/frontend
npm run build
```

> 🔍 **สิ่งที่คุณควรสังเกต:** ระบบจะรัน Vite และสร้างโฟลเดอร์ `dist/` ที่บรรจุไฟล์ HTML, CSS, JS ขนาดกะทัดรัด พร้อมสำหรับการนำไปโฮสต์ หากมี TypeScript/Linter Error ให้เรียก Agent มาช่วยแก้จน Build ผ่านแบบไร้ Error

### ขั้นที่ 2: นำแอปขึ้นสู่ Public URL จริง
เลือกวิธี Deploy ตามที่ห้องจัดเตรียมไว้:
- **ตัวเลือก A (Vercel CLI หรือ Vercel Dashboard):** ลากโฟลเดอร์ `dist/` หรือสั่ง `npx vercel`
- **ตัวเลือก B (Cloudflare Pages / Netlify Drop):** ลากโฟลเดอร์ `dist/` วางบนเว็บโฮสติ้ง
- **ตัวเลือก C (Tunnel จากเครื่อง เช่น ngrok / cloudflared):** ในกรณีต้องการโชว์พร้อม Backend ในห้องอบรม

> ⚠️ **กฎเหล็กวิศวกรรม:** ห้ามถือว่า Deploy เสร็จถ้าเพื่อนข้างๆ หรืออาจารย์ยังเปิด URL นั้นจากมือถือไม่ได้!

### ขั้นที่ 3: อัปเดต Checklist ข้อสุดท้าย
เมื่อได้ URL จริงแล้ว:
- เปิด **http://localhost:4174** (Command Center)
- ติ๊กถูกที่ข้อ **`ship`** ให้ครบถ้วนทั้งกระดาน!
*(หรือแก้ `workspace/command-center/checklist.json` ให้ `"ship": true`)*

### ขั้นที่ 4: เตรียมเนื้อหาสำหรับเวทีประลอง 3–5 นาที
ใช้พรอมต์จาก [`prompts/01-ship-notes.md`](prompts/01-ship-notes.md) ให้ Claude ช่วยสรุปเรื่องราวของคุณ:

```text
ช่วยสรุป Ship Notes สำหรับนำเสนอผลงาน Paper Crypto Trade Desk ของฉันในเวลา 3 นาที:
1. URL จริงของฉัน: [วาง URL ของคุณที่นี่]
2. ความโดดเด่นของ Trade Desk ฉัน (UX, ฟีเจอร์พิเศษ, การคำนวณ MTM)
3. สิ่งที่ฉันสั่ง Specialist (Claude vs OpenCode) แตกต่างกันอย่างไร
4. ความท้าทายที่เจอระหว่างทาง และวิธีที่ฉันพาทีม AI ก้าวข้ามมาได้
```

---

## 🏆 กติกาและเกณฑ์การแข่งขันโชว์ของ (Showcase Rubric)

กรรมการและเพื่อนร่วมห้องจะร่วมโหวตผลงานยอดเยี่ยม โดยพิจารณาจาก 4 เสาหลัก (เต็ม 100 คะแนน):

| เกณฑ์การประเมิน | สัดส่วน | สิ่งที่กรรมการมองหา |
|---|:---:|---|
| **1. Functional Completeness** | 25% | • `done-when` 6 ข้อเขียวครบ<br>• เปิดบน URL สาธารณะได้จริง<br>• ส่ง Order ซื้อขายแล้วยอดเงินและประวัติอัปเดตถูกต้อง |
| **2. UX & UI Craftsmanship** | 25% | • หน้าตาหน้าจอสวยงาม ประณีต ไม่ดูเป็นโครงเปล่า<br>• มี Badge สถานะชัดเจน มี Animation หรือการแจ้งเตือนที่ดี<br>• Responsive ใช้งานบนมือถือหรือจอต่างขนาดได้ดี |
| **3. Multi-Agent Orchestration** | 25% | • มีประวัติบันทึก CLI Dispatch ข้ามค่ายใน Command Center หลายรอบ<br>• แบ่งงาน Frontend / Backend ได้คมชัดตาม Bounded Context<br>• รู้วิธีใช้ Plan Mode, Agent View หรือ Subagents ในการแก้ปัญหา |
| **4. Architectural Pitch & Story** | 25% | • นำเสนอได้กระชับ ชัดเจน ในเวลา 3–5 นาที<br>• ถ่ายทอด Mindset ของ Lead Architect ได้ดี (สั่งงาน, คุมเกณฑ์, แก้ติดขัด) |

---

## 💡 สถาปัตยกรรม & Pro-Tips จาก Lead Architect

> **Takeaways สู่อนาคตการทำงานจริง:**  
> ทักษะที่ผู้เรียนได้รับจากคอร์สนี้ ไม่ใช่แค่การเขียนโค้ดร่วมกับ AI แต่คือ **Software Architecture Leadership ในยุค Agentic AI** ซึ่งประกอบด้วย:  
> 1. การแบ่งขอบเขตหน้าที่ (Bounded Context / Specialists)  
> 2. การสร้างรั้วความปลอดภัย (Security Deny Boundaries & Guardrails)  
> 3. การควบคุมด้วยผลลัพธ์ (Outcome-Driven via `done-when`)  
> 4. การประกอบชิ้นส่วนและส่งมอบงานจริง (Ship to Production)

---

## ✅ เกณฑ์ผ่าน Lab 07 (จบคอร์สอย่างสมบูรณ์)

บนเครื่องของคุณ:
- [ ] มี Public URL สาธารณะที่เปิดได้จริงจากภายนอก
- [ ] Command Center แสดง Checklist เขียวครบทั้ง 7 ข้อ (รวม `ship`)
- [ ] คุณได้ขึ้นนำเสนอผลงานของตนเอง 3–5 นาที
- [ ] บันทึกสรุปการเรียนรู้ขั้นสุดท้ายลงใน `workspace/learning-log.md`
