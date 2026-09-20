# Learning Log — บันทึกการเดินทางสถาปัตยกรรม Multi-Agent

> 📓 **คำแนะนำสำหรับผู้เรียน:**  
> สมุดบันทึกเล่มนี้คือ Portfolio ส่วนตัวของคุณที่สรุปประสบการณ์ตรงจากการคุมทีม AI Multi-Agent ตลอด 2 วัน  
> เขียนสั้นๆ กระชับ แต่เน้น Insight เชิงวิศวกรรมจริงที่เกิดขึ้นบนเครื่องคุณ

---

## 📋 ข้อมูลผู้เรียน
- **ชื่อ-นามสกุล / ทีม:** 
- **Public URL ของ Trade Desk ที่ Ship สำเร็จ:** 

---

## Lab 01 — Claude Code Harness (Frontend Specialist & Agent View)
- **สิ่งที่สั่ง Frontend Agent:** 
- **การเปลี่ยนแปลงบนหน้าจอ (:4173):** 
- **สิ่งที่เห็นใน Agent View (`claude agents`):** 
- **Architectural Insight (ทำไมการตีกรอบ Bounded Context ถึงสำคัญ):** 

---

## Lab 02 — OpenCode Harness (Plan vs Build Mode & Backend Specialist)
- **สิ่งที่ได้จากการใช้ Plan Mode ก่อนเขียนโค้ด:** 
- **การทำงานของ API (/api/prices, /api/portfolio):** 
- **ข้อแตกต่างระหว่าง Claude Code กับ OpenCode ที่สังเกตได้:** 
- **Architectural Insight:** 

---

## Lab 03 — สั่งข้าม CLI (Cross-CLI Dispatch & Command Center Watch)
- **คำสั่ง CLI Dispatch ที่ใช้ (เช่น `opencode run` หรือ `claude -p`):** 
- **สิ่งที่เห็นบน Command Center Timeline (:4174):** 
- **ปัญหาทางเทคนิคที่พบ (เช่น การ escape ตัวอักษรบน shell) และวิธีแก้:** 
- **Architectural Insight (ข้อดีของการเชื่อมข้ามเครื่องมือผ่าน CLI):** 

---

## Lab 04 — สิทธิ์ Native & Paper-Only (Security Boundaries & Guardrails)
- **คำสั่งต้องห้ามที่ทดลองสั่ง (เช่น ขอ API Key จริง / สั่งลบโฟลเดอร์):** 
- **ปฏิกิริยาของระบบและ Agent (ถูกบล็อกอย่างไร):** 
- **ความแตกต่างระหว่าง Deny Rules ใน settings.json กับ Skill paper-only:** 
- **Architectural Insight (การออกแบบความปลอดภัยหลายชั้น Defense-in-Depth ใน Enterprise):** 

---

## Lab 05 — Claude Swarm หลาย Turn (Agent Teams & Subagents)
- **รูปแบบ Swarm ที่ใช้บนเครื่องคุณ (Agent Teams หรือ Subagents /bg):** 
- **ผลลัพธ์ของฟีเจอร์การส่งคำสั่งซื้อขาย (Order Ticket & History):** 
- **ปัญหา Agent หลุดโฟกัสหรือสับสนระหว่างหลาย Turn และวิธีที่คุณดึงสติ Agent:** 
- **Architectural Insight:** 

---

## Lab 06 — Swarm ข้ามเครื่องมือจนเกณฑ์ผ่าน (End-to-End Orchestration)
- **สถานะ Checklist ทั้ง 6 ข้อก่อนและหลังการรันลูป:** 
- **การประสานงานระหว่าง Claude (Frontend) และ OpenCode (Backend):** 
- **จำนวนรอบที่ใช้สั่งงานจริง และเหตุผลที่คุณเลือกหยุดเมื่อเกณฑ์ผ่าน:** 
- **Architectural Insight:** 

---

## Lab 07 — Ship & Showcase (ขึ้นระบบจริง & เวทีประลองผลงาน)
- **Production Build Status (`npm run build` ผ่านสมบูรณ์หรือไม่):** 
- **Public URL สาธารณะที่ Deploy สำเร็จ:** 
- **ฟีเจอร์หรือความประณีตที่เป็นหมัดเด็ดในการแข่งขัน Showcase:** 
- **Key Takeaway สูงสุดที่จะนำกลับไปใช้ในงานจริงที่องค์กร:** 
