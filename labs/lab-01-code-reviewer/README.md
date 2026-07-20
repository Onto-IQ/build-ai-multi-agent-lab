# Lab 01 — Code Reviewer Agent (Claude Code)

**Outline:** Claude Code Specialist Agent  
**Workflow stage:** Interview / Plan  
**Wow:** Reviewer **cannot edit** — permission deny is the lesson

## Goal

สร้าง Specialist **Code Reviewer** บน Claude Code ที่รีวิวโค้ดใน `apps/sample-dashboard` แต่ไม่แก้ไฟล์เอง

## Steps

1. เปิด repo นี้ใน **VS Code** ที่ root
2. คัดลอก `.env.example` → `.env` (Task: `copy-env-example`)
3. สร้าง Code Reviewer agent (ชื่อ / หน้าที่ / สิทธิ์อ่านอย่างเดียวหรือ deny edit)
4. ให้รีวิว `apps/sample-dashboard/frontend/` และเขียนรายงานใน `workspace/contracts/code-review.json`

## Definition of Done

- [ ] มี agent definition ที่ระบุ role = Code Reviewer
- [ ] รายงานรีวิวอยู่ใน `workspace/contracts/` (หรือ learning-log)
- [ ] พิสูจน์ได้ว่า agent **ไม่ได้** แก้โค้ดให้เอง (deny / ask)
- [ ] จด learning-log 1 ย่อหน้า

## Fallback

ถ้า Claude Desktop ยังไม่พร้อม — เขียน reviewer prompt ในไฟล์แล้วรันใน Claude Code CLI ที่ root

## Legacy

Trip Triage lab: `labs/_legacy-trip/lab-01-triage/`
