# Lab 05 — Backend (OpenCode · Guestbook / SQLite)

**เวลาเป้าหมาย:** 90–120 นาที  
**เครื่องมือ:** OpenCode **2.0.6+** · oh-my-openagent **4.19.4** (ทางเลือก)  
**Issue:** `[Lab 05] Guestbook API`  
**Ownership:** Backend / OpenCode

## เป้าหมาย

implement **`insertContact` / guestbook** กับ SQLite ตาม **course stubs** จน **`npm run test:labs` เขียว**  
แล้วเปิด **PR** ฝั่ง Backend  
**จุดที่ควรรู้สึกว้าว:** test:labs ที่เคยแดงตั้งแต่ SETUP กลายเป็นเขียวเพราะ agent ทำถูก contract

---

## ได้รับมาจาก Lab ก่อน

- Lab 04: UI + ฟอร์ม contact (หรือ placeholder)
- `docs/DECISIONS.md` เรื่อง guestbook / rate limit
- SETUP: `better-sqlite3` build ผ่าน

## ได้เพิ่มใน Lab นี้

- API/handler บันทึก guestbook
- **`npm run test:labs` green**
- PR Backend (แยกหรือต่อจาก FE ตามทีม)

---

## ผลลัพธ์รูปธรรม (ไฟล์ที่ต้องมี)

| หลักฐาน | รายละเอียด |
|---|---|
| Implementation | ไฟล์ตาม template (`src/` server routes, `course/` adapters) |
| Tests | `npm run test:labs` exit 0 |
| PR | repo ผู้เรียน · อธิบาย security input validation |

**ยังไม่ผ่านถ้า…**

- test:labs ยังแดง
- hardcode secret / เปิด CORS กว้างโดยไม่จำเป็น
- ใช้ Claude แก้ backend เป็นหลักโดยไม่มี PR OpenCode (เกณฑ์ ownership)

---

## Preflight

```powershell
opencode --version
npm run test:labs   # คาดว่าแดง — จด error แรก
npm test
Test-Path .\course\
```

oh-my-openagent (ไม่บังคับ):

```powershell
bunx oh-my-openagent@4.19.4 install --no-tui --platform=opencode
```

Fallback: native `@` ใน OpenCode

---

## เลือกทาง A — TUI vs B — CLI

| ทาง | เหมาะกับ |
|---|---|
| **A — TUI `opencode`** | แก้หลายไฟล์ · รัน test วน |
| **B — `opencode run`** | one-shot งานย่อย |

Prompt: [`prompts/01-backend-guestbook.md`](prompts/01-backend-guestbook.md)

---

## ขั้นตอน

### 1) Branch

```powershell
git checkout main
git pull
git checkout -b lab-05-backend
```

### 2) เปิด OpenCode

```powershell
opencode
```

วาง [`01-backend-guestbook.md`](prompts/01-backend-guestbook.md)

### 3) วน test

```powershell
npm run test:labs
npm test
npm run dev
# ทดสอบ POST ฟอร์ม manual หรือ curl
```

### 4) PR

```powershell
git add -A
git status
git commit -m "feat(api): guestbook SQLite Lab 05"
git push -u origin lab-05-backend
gh pr create --title "[Lab 05] Guestbook API" --body "## Summary
- insertContact / guestbook per course tests

## Test
npm run test:labs
npm test

## Security
- validation, no stack trace leak"
```

---

## ตัวอย่างผลลัพธ์ที่คาดหวัง

```text
> npm run test:labs
 PASS  course/guestbook.test.ts
 ...
Tests: N passed
```

ฟอร์มบน Contact ส่งแล้วได้ข้อความ success · มี row ใน SQLite (ตาม template)

---

## คำสั่งตรวจ

```powershell
npm run test:labs
npm test
npm run build
gh pr checks   # ถ้ามี CI
```

---

## เกณฑ์ผ่าน Lab

- [ ] `npm run test:labs` เขียวทั้งชุดที่ template กำหนด
- [ ] PR Backend · body บอกวิธีรัน test
- [ ] ไม่ leak `.env` · validate input
- [ ] ใช้ OpenCode เป็นหลัก (oh-my หรือ native @)

## ยังไม่ผ่านถ้า…

- skip test ด้วย `.only` / ปิด test file
- แก้ test ให้ผ่านโดยไม่ implement จริง
- better-sqlite3 ไม่ rebuild แล้วยอมแดง

---

## Troubleshooting Windows

| อาการ | ทำอะไร |
|---|---|
| better-sqlite3 fail | `npm approve-scripts better-sqlite3` · VS Build Tools |
| test:labs path ผิด | รันจาก root repo · ดู `package.json` scripts |
| opencode ไม่เห็น repo | `cd` root · เปิดใหม่ |
| oh-my ติด >15 นาที | ใช้ native @ · ยังผ่านได้ |
| port ชนกับ dev | ใช้ PORT ใน `.env` |

---

---

## ทำความเข้าใจ `npm run test:labs`

Template วาง **course stubs** ไว้ทดสอบสัญญา guestbook/contact — จนกว่า Lab 05 จะแดงเป็นเรื่องปกติจาก SETUP

```powershell
npm run test:labs 2>&1 | Select-Object -First 40
```

เมื่อเขียวแล้ว อย่าแก้ test เพื่อ “ลดงาน” — วิทยากรตรวจ diff test file

### oh-my-openagent vs native `@`

| วิธี | เมื่อใช้ |
|---|---|
| oh-my 4.19.4 | ต้องการ subagent หลายตัวใน OpenCode |
| native `@` | ติดตั้ง plugin ไม่สำเร็จภายใน 15 นาที |

### curl ทดสอบ local (ปรับ path)

```powershell
curl.exe -X POST "http://localhost:4321/api/guestbook" -H "Content-Type: application/json" -d "{\"name\":\"t\",\"email\":\"t@ex.com\",\"message\":\"hi\"}"
```

### ความปลอดภัยขั้นต่ำ

- Validate ความยาว message · email format พื้นฐาน
- ไม่ echo SQL error ให้ client
- ไม่เก็บ secret ใน SQLite

### Merge กับ Frontend PR

ถ้ามี conflict กับ `lab-04-frontend`: rebase บน main · ให้ OpenCode ช่วย resolve เฉพาะไฟล์ API  
หลัง merge ทั้งคู่ รัน `npm run test:labs` บน main อีกครั้งก่อน Lab 06

### Pin เวอร์ชัน (ห้องเรียน)

- OpenCode **2.0.6+**
- oh-my-openagent **4.19.4** (optional)

---

**Lab ถัดไป:** [`lab-06-playwright`](../lab-06-playwright/README.md)
