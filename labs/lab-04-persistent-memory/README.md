# Lab 04 — Persistent Memory

**Outline 6:** Persistent Memory  
**ลำดับงาน:** Plan

## ได้รับมาจาก Lab ก่อน

- Agent + สิทธิ์จาก Lab 01–03
- โปรเจกต์ Agent Cost Board

## ได้เพิ่มใน Lab นี้

ทำให้ agent **จำ preference โปรเจกต์ข้าม session** (ปิดแล้วเปิดใหม่ยังใช้ได้)

## เป้าหมาย

บันทึก preference เช่น สไตล์ UI, ห้ามให้ Frontend แก้ Backend แล้วทดสอบหลังเปิด session ใหม่

**จุดที่ควรรู้สึกว้าว:** ปิด–เปิด session แล้วยังจำ โดยไม่ต้องบอกซ้ำทั้งหมด

## ของที่ต้องเปิดก่อนเริ่ม

1. [`starters/MEMORY.md`](starters/MEMORY.md) — คัดลอกไปที่ root เป็น `MEMORY.md` ถ้ายังไม่มี
2. เครื่องมือ memory ของ Claude Code / OpenCode ตามที่ห้องสอน

## ขั้นตอนทีละข้อ

1. คัดลอก/ปรับ `starters/MEMORY.md` → `MEMORY.md` ที่ root (หรือใช้ memory ในตัวของเครื่องมือ)
2. วาง `prompts/01-save-preferences.md` ใน session ปัจจุบัน
3. **ปิด session** แล้วเปิดใหม่ที่ root เดิม
4. วาง `prompts/02-recall-test.md` โดย**ไม่**วาง preference ทั้งก้อนซ้ำ
5. จด before/after ใน learning-log + เปรียบเทียบสั้น ๆ: built-in memory vs ไฟล์ใน repo

## ข้อความพร้อมวาง

- [`prompts/01-save-preferences.md`](prompts/01-save-preferences.md)
- [`prompts/02-recall-test.md`](prompts/02-recall-test.md)

## ผลที่คาดหวัง

- Agent เรียกใช้ preference หลังเปิดใหม่ได้
- มีบันทึกเปรียบเทียบใน learning-log

## เกณฑ์ผ่าน Lab

- [ ] Preference ถูกใช้หลังเปิด session ใหม่
- [ ] มีเปรียบเทียบ built-in memory vs ไฟล์ใน repo
- [ ] learning-log มี before/after

## ทางเลือกเมื่อเครื่องมือไม่พร้อม

ใช้ไฟล์ `MEMORY.md` ใน repo เป็นแหล่งจำอย่างเดียว แล้วให้ agent อ่านไฟล์ทุกครั้งที่เปิด session

## แก้ปัญหาเบื้องต้น

| อาการ | ทำอะไร |
|---|---|
| จำไม่ได้หลังเปิดใหม่ | ตรวจว่า MEMORY.md ถูก commit/เซฟที่ root และชี้ให้ agent อ่าน |
| จำของคนละโปรเจกต์ | ระบุ project_id = agent-cost-board ในไฟล์ |
