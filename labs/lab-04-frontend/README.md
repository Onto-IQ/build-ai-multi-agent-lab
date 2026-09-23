# Lab 04 — Frontend (Claude · Astro UI)

**เวลาเป้าหมาย:** 90–120 นาที  
**เครื่องมือ:** Claude Code **2.1.278+** · GitHub MCP (เปิด PR)  
**Issue:** `[Lab 04] Frontend pages` หรือ issue จาก Lab 03  
**Ownership:** Frontend / Claude

## เป้าหมาย

สร้าง UI หน้า **Home / About / Interests / Contact** ให้สะท้อน `docs/PROFILE.md` และ `docs/DECISIONS.md`  
แล้ว **เปิด PR** ใน repo ของคุณ  
**จุดที่ควรรู้สึกว้าว:** เนื้อหา interview + debate ปรากฏบน localhost โดยไม่ copy-paste มือทั้งหมด

---

## ได้รับมาจาก Lab ก่อน

- Lab 01–02: `docs/PROFILE.md`, `docs/DECISIONS.md`
- Lab 03: issues พร้อม acceptance (อ้างอิงใน PR)
- `npm test` smoke เขียวจาก SETUP

## ได้เพิ่มใน Lab นี้

- หน้า Astro ครบ 4 หลัก + nav ไป Guestbook
- **Pull Request** ฝั่ง Frontend (Claude)
- (ควรมี) screenshot ใน PR body

---

## ผลลัพธ์รูปธรรม (ไฟล์ที่ต้องมี)

| หลักฐาน | รายละเอียด |
|---|---|
| โค้ด UI | `src/pages/` หรือโครง template (index, about, interests, contact) |
| PR | เปิดใน repo ผู้เรียน · ลิงก์ issue Lab 04 |
| ทดสอบ | `npm test` เขียว |

**ยังไม่ผ่านถ้า…**

- PR ไป upstream Onto-IQ
- หน้าเปล่า / ไม่อ่าน PROFILE
- ไม่มี PR (แค่ local ไม่ push)

---

## Preflight

```powershell
npm test
npm run dev   # เปิด http://localhost:4321 ครั้งหนึ่ง
Test-Path .\docs\PROFILE.md
gh pr list
claude --version
```

แนะนำ branch:

```powershell
git checkout -b lab-04-frontend
```

---

## เลือกทาง A — TUI vs B — CLI

| ทาง | เหมาะกับ |
|---|---|
| **A — TUI** | Plan + แก้หลายไฟล์ · ดู preview |
| **B — CLI** | `claude -p` รอบละงานย่อย |

Prompt: [`prompts/01-frontend-pages.md`](prompts/01-frontend-pages.md)

---

## ขั้นตอน

### 1) ผูก issue

```powershell
gh issue list
gh issue view <n> --web
```

### 2) Claude implement

```powershell
claude
```

วาง [`01-frontend-pages.md`](prompts/01-frontend-pages.md)

### 3) ตรวจ local

```powershell
npm test
npm run dev
```

เช็ค: ชื่อ headline ตรง PROFILE · สีใกล้ tone · 4 หน้าไม่ 404

### 4) Push + PR

```powershell
git add -A
git status   # ไม่มี .env
git commit -m "feat(ui): Lab 04 personal pages from PROFILE"
git push -u origin lab-04-frontend
gh pr create --title "[Lab 04] Frontend pages" --body "## Summary
- Home/About/Interests/Contact from docs/PROFILE.md
- Closes #<issue>

## Test
npm test green
Screenshots: (แนบ)

## Notes
MCP used for PR if applicable"
```

### ทาง B — CLI ย่อย

```powershell
"Read docs/PROFILE.md. Update src/pages/index.astro headline only. npm test must pass." |
  claude -p --permission-mode acceptEdits --output-format text
```

ทำทีละหน้าแล้วรวม PR

---

## ตัวอย่างผลลัพธ์ที่คาดหวัง

- Home: `displayName` + `headline` ชัด · CTA ไป Contact
- About: เนื้อจาก `about` ใน PROFILE
- Interests: list 3–5 รายการ
- Contact: ฟอร์ม (submit อาจรอ Lab 05 ให้ test:labs เขียว)

---

## คำสั่งตรวจ

```powershell
npm test
npm run build
gh pr view --web
Select-String -Path .\src\pages\*.astro -Pattern "PROFILE|profile" -ErrorAction SilentlyContinue
```

---

## เกณฑ์ผ่าน Lab

- [ ] PR ใน repo คุณ · อ้าง issue / DECISIONS
- [ ] 4 หน้าหลัก + nav · เนื้อหาจาก PROFILE
- [ ] `npm test` เขียว · ไม่ commit secret
- [ ] PR body มีแผนสั้น + วิธีทดสอบ

## ยังไม่ผ่านถ้า…

- UI ยังเป็นข้อความ template เดิมทั้งหมด
- ลืม Guestbook link ใน nav (แม้ backend ยังไม่ครบ)
- `npm run build` แตกโดยไม่แก้

---

## Troubleshooting Windows

| อาการ | ทำอะไร |
|---|---|
| พอร์ต 4321 ถูกใช้ | `PORT=4322` ใน `.env` |
| Astro ไม่ hot reload | restart `npm run dev` |
| path `@/` import error | ดู `tsconfig` / alias ใน template |
| GitHub MCP เปิด PR ไม่ได้ | ใช้ `gh pr create` |
| line ending CRLF | `git config core.autocrlf true` (local เท่านั้น) |

---

---

## Ownership และขอบเขต

| ทำใน Lab 04 | ยังไม่ทำ (Lab 05+) |
|---|---|
| Layout, typography, 4 หน้า | insertContact logic เต็ม |
| อ่าน PROFILE / DECISIONS | SQLite migration |
| เปิด PR Frontend | ให้ test:labs เขียว |

ถ้า template มี `src/lib/profile.ts` หรือโหลด markdown — **ใช้ของเดิม** อย่าสร้าง parser ใหม่ยาว ๆ

### Agent View (ทางเลือก)

```powershell
claude agents
```

ใช้ดูว่า session Frontend แยกจาก Backend ชัดหรือไม่ — ไม่บังคับผ่าน

### PR checklist ( copy ลง body )

```markdown
- [ ] Closes #<issue>
- [ ] npm test green
- [ ] 4 pages manual on localhost:4321
- [ ] No .env in diff
- [ ] Screenshot attached
```

### สไตล์ที่ควรสอดคล้อง DECISIONS

- สีหลักจาก `tone.primaryColor` ใน PROFILE
- ข้อความ About ไม่ยาวเกิน 4 ย่อหน้า (UX จาก Lab 02)
- Contact มีฟิลด์ตาม template — อย่าเพิ่ม upload ไฟล์ใน v1

### ถ้า CI บน GitHub Actions ล้ม

- เปิด log Actions ใน repo คุณ — มักเป็น `npm test` หรือ build
- แก้บน branch PR แล้ว push — ไม่ต้องรอ merge Lab 05 ถ้า failure ไม่เกี่ยว API

---

**Lab ถัดไป:** [`lab-05-backend`](../lab-05-backend/README.md) — OpenCode + `test:labs`
