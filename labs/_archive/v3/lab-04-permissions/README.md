# Lab 04 — Permissions, hooks, paper-only, MCP allow/deny

**เวลาเป้าหมาย:** 70 นาที  
**เครื่องมือ:** Claude settings · OpenCode permission · MCP  
**Issue:** `[Lab 04] Permission boundary`

## ได้รับมาจาก Lab ก่อน

สอง harness พร้อมใช้

## ได้เพิ่มใน Lab นี้

สิทธิ์ native · กัน `.env` · กัน lockfile · MCP แยก allow/deny · paper-only โดยไม่ใช้ skill ห้อง

## ขั้นตอน

1. พรอมต์ [`prompts/01-harden.md`](prompts/01-harden.md)
2. ตั้ง `.claude/settings.json` และ config OpenCode
3. พิสูจน์ว่า agent ถูกกันเมื่ออ่าน `.env` หรือแก้ `yarn.lock` / `package-lock.json`
4. GitHub MCP: เปิด PR ได้ แต่ไม่ให้ merge/ลบ branch ถ้าตั้งได้
5. เปิด PR ส่ง config (ไม่มี secret)

## เกณฑ์ผ่าน Lab 04

- [ ] มีไฟล์สิทธิ์ใน PR
- [ ] มีหลักฐานถูก deny (ตัดทอน transcript)
- [ ] เขียนชัดว่าใช้ demo data only
