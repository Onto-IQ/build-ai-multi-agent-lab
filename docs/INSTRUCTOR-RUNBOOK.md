# Instructor Runbook (V2)

คอร์ส: Build AI Multi-Agent with Claude Code  
มาตรฐาน: ผู้เรียนทำบนเครื่องตัวเอง · โชว์วิทยากร ≤ 2 นาทีต่อหัวข้อ แล้วปล่อยทำ

## โครงครบ · ผู้เรียนสั่งเอง · ท้ายคอร์สแข่งกัน

- แต่ละ Lab มีโครงพร้อม (แผง · agent · skill · พรอมต์เริ่ม) — **อย่าฉายคำตอบสำเร็จรูป**
- ผู้เรียนต้องคุยกับ agent ต่อเองหลังวางพรอมต์เริ่ม ถามกลับได้ ปรับ UX ได้
- เกณฑ์ผ่านร่วม = skill `done-when` · Lab 07 โชว์แข่งของตัวเอง ไม่ใช่เดสก์กลางของห้อง

## กฎห้อง

- Buddy ช่วยได้ — **ห้ามทำแทนจนผ่าน Lab** และห้ามสั่ง agent แทนบนเครื่องเขา
- หลักฐานผ่าน = ของบนเครื่องผู้เรียน (URL, Agent View, ลูกศร Command Center, แผงที่ขยับ)
- Agent Teams ไม่ขึ้น → ผู้เรียนใช้ Subagents บนเครื่องเขา ไม่ใช่นั่งดูเครื่องวิทยากร
- ข้อยกเว้นเดโมอย่างเดียว: tmux/cmux 30–60 วินาที แล้วให้ทุกคนเปิด `claude agents` เองทันที

## เวลาแนะนำ

| ช่วง | นาที |
|---|---|
| วัน 1 เปิด + SETUP | 40 |
| Lab 01 Claude | 70 |
| Lab 02 OpenCode | 70 |
| Lab 03 CLI | 55 |
| Lab 04 สิทธิ์ | 40 |
| ทวนสองจอ | 15 |
| วัน 2 Lab 05 swarm | 80 |
| Lab 06 ข้ามเครื่องมือ | 100 |
| Lab 07 ship + ผู้เรียนโชว์ | 60 |
| wrap | 20 |

## Fallback

| อาการ | การตอบ |
|---|---|
| SETUP เกิน 30 นาที | จัด buddy · ข้ามส่วนสวยงาม · ให้สอง URL ขึ้นก่อน |
| CoinGecko บล็อก | Lab 02 ต่อ fixture ใน `data/prices.fixture.json` — นับผ่านเกณฑ์ราคาได้ |
| `curl` JSON 400 บน PowerShell | ชี้ skill `log-dispatch` ใช้ `Invoke-RestMethod` |
| แก้ backend แล้ว API ยัง `empty` | backend ไม่ hot-reload — สั่ง restart `npm run dev` แท็บ BE |
| `opencode run` Internal server error | ให้ใช้ `opencode` TUI + backend agent; Lab 03 รัน CLI เองแล้ว log-dispatch มือ |
| `claude agents` ไม่มี | อัปเดต Claude Code; ถ้ายังไม่ได้ ให้ใช้ `claude agents --json` หรือเซสชัน `claude` ปกติ |
| `claude -p` model catalog 400 | ใช้เซสชัน interactive; ปรับโมเดลใน settings ตามห้อง |
| Teams ไม่ขึ้นนาทีที่ 10 | สลับ Subagents ทันทีบนเครื่องผู้เรียน |
| หมดเวลา Lab 06 | ship ของที่ทำได้ · checklist ไม่ครบได้ถ้าโชว์ช่องว่างชัด |
| ปุ่ม TUI ชนใน VS Code | ย้ายไป Windows Terminal |

## ตรวจเกณฑ์ผ่านเร็ว

1. ถาม URL localhost จากเครื่องเขา (ไม่ใช่จอคุณ)
2. ให้เขาหันจอแสดง Agent View หรือลูกศร Command Center
3. Lab 07: เปิด URL สาธารณะด้วยกัน — ไม่มี URL = ยังไม่ผ่าน ship
4. โชว์แข่ง: ถามว่าสั่ง agent อย่างไร — ถ้าทุกจอเหมือนกันเป๊ะ ให้สงสัยว่าคัดลอกคำตอบกลาง

## สิ่งที่เลิกสอนเป็นแกน

JSON contracts เป็น orchestration · gate 2 รอบ · Flux บังคับ · Agent Cost Board
