# Lab 06 — oh-my-openagent (หรือ native fallback)

**เวลาเป้าหมาย:** 90 นาที  
**เครื่องมือ:** oh-my-openagent@4.19.4 หรือ OpenCode `@`  
**Issue:** `[Lab 06] Monthly savings goal progress`

## ได้รับมาจาก Lab ก่อน

Claude swarm

## ได้เพิ่มใน Lab นี้

orchestration ฝั่ง OpenCode จาก community · มีทางถอย native

## ขั้นตอน

1. ยืนยัน `bunx oh-my-openagent doctor` หรือใช้ native `@` ถ้าปลั๊กอินล้ม
2. พรอมต์ [`prompts/01-savings-goal.md`](prompts/01-savings-goal.md)
3. `npm run test:lab06` เขียว
4. ใน PR บอกว่าใช้ปลั๊กอินหรือ fallback

## เกณฑ์ผ่าน Lab 06

- [ ] เทส Lab 06 เขียว + PR
- [ ] มีโน้ต orchestration path
- [ ] ไม่มี room-made dispatch skill
