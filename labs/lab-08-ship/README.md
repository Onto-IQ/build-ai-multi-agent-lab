# Lab 08 — Ship ขึ้นเน็ตจริง (Coolify)

**ใช้เวลาประมาณ:** 90–120 นาที  
**แพลตฟอร์ม:** Coolify บน VPS คอร์ส · slug `user01`–`user30`  
**URL ของคุณ:** `https://<STUDENT_SLUG>.9expert.online`  
**Demo ห้อง (ไม่ใช่ของคุณ):** https://demo.9expert.online  
**ทางสำรอง:** GitHub Pages (ไม่มี API guestbook)

> ผ่าน Lab เมื่อมี URL สาธารณะตอบได้จริง — ไม่ใช่แค่ screenshot localhost

---

## คุณจะได้อะไรจาก Lab นี้

1. Deploy แอปขึ้น **Coolify** ตาม slug ที่วิทยากรแจก  
2. ตรวจด้วย **curl** + ลอง guestbook บน production  
3. บันทึกหลักฐานใน **`docs/SHIP.md`**

**ความรู้ที่ควรติดตัว**

- Deploy สำเร็จ = มีหลักฐาน HTTP 200 (และ API ถ้าระบบรองรับ)  
- Secret อยู่ใน Coolify / GitHub Secrets — **ห้าม commit**  
- Pages fallback ≠ เกณฑ์เต็มของคอร์ส — ต้องบอกวิทยากร

---

## ก่อนเริ่ม

ควร merge PR หลักจาก Lab 04–07 · `test:labs` เขียวบน `main`

```powershell
cd <โฟลเดอร์-repo-ของคุณ>
Get-Content .env | Select-String 'STUDENT_SLUG','SITE_URL'
npm run test:labs
npm run build
git checkout main
git pull
```

ตรวจ DNS (เมื่อวิทยากรตั้งแล้ว):

```powershell
$slug = (Get-Content .env | Where-Object { $_ -match '^STUDENT_SLUG=' }) -replace 'STUDENT_SLUG=',''
Resolve-DnsName "$slug.9expert.online" -Type A -ErrorAction SilentlyContinue
Write-Host "Target: https://$slug.9expert.online"
```

---

## สิ่งที่ต้องมีเมื่อจบ Lab

| สิ่งที่ต้องมี | ผ่านเมื่อ |
|---|---|
| URL | `https://userNN.9expert.online` เปิดได้ |
| HTTP | `curl -I` ได้ 200 (หรืออธิบาย 304) |
| API | POST contact/guestbook สำเร็จบน production |
| เอกสาร | `docs/SHIP.md` มี URL, เวลา, คำสั่งที่ใช้ |

**ยังไม่ผ่านถ้า…** ใช้แค่ localhost · ใช้ demo.9expert แทน slug ตัวเอง · commit webhook/รหัส admin · เคลมสำเร็จโดยไม่มี 200

---

## เลือกวิธีทำ

| ทาง | บทบาท |
|---|---|
| **Coolify (หลัก)** | ทำกับวิทยากรตามเช็คลิสต์ด้านล่าง · Claude ช่วยร่าง SHIP.md |
| **GitHub Pages (สำรอง)** | เมื่อ Coolify/DNS ไม่พร้อม · บันทึกว่า fallback |

Prompts: [`01-coolify-deploy.md`](prompts/01-coolify-deploy.md) · [`02-github-pages-fallback.md`](prompts/02-github-pages-fallback.md)

---

## ทีละขั้น — Coolify (หลัก)

### ขั้นที่ 1 — Build ท้ายสุดบนเครื่อง

```powershell
npm run test:labs
npm run build
git status
```

### ขั้นที่ 2 — สร้าง/อัปเดต App บน Coolify (ทำกับวิทยากร)

1. Coolify → Project คอร์ส → **New Resource** → Application จาก GitHub repo **คุณ**  
2. Branch: `main` · Build: **Dockerfile**  
3. Domain: `https://userNN.9expert.online`  
4. Port container: `4321`  
5. Volume สำหรับ SQLite: เช่น `DATA_DIR=/data`  
6. Env ใน UI เท่านั้น (**ห้าม commit**): `SITE_URL`, `HOST`, `PORT`, `DATA_DIR`, อื่นตาม template  
7. Deploy · ดู log จน healthy  

Webhook (ถ้ามี): เก็บใน GitHub Secret — ไม่ใส่ใน repo

เปิด `claude` แล้ววาง `01-coolify-deploy.md` เพื่อให้ช่วย**ลิสต์ชื่อ env** (ไม่ใส่ค่าลับ) และร่าง SHIP.md

### ขั้นที่ 3 — ตรวจ HTTP + API (คุณทำ)

แทน `userNN` ด้วย slug ของคุณ:

```powershell
$base = "https://userNN.9expert.online"
curl.exe -I $base
curl.exe -sS -o NUL -w "%{http_code}`n" $base
curl.exe -sS -X POST "$base/api/contact" `
  -H "content-type: application/json" `
  -d '{"name":"Lab08","email":"lab08@example.com","message":"ship check"}'
```

ปรับ path/body ตาม template จริง

### ขั้นที่ 4 — เขียนและ commit SHIP.md

```powershell
# ให้ Claude ช่วยเติมจากผล curl หรือเขียนเอง
git add docs/SHIP.md
git commit -m "docs: Lab 08 ship evidence"
git push
```

ตัวอย่าง:

```markdown
# SHIP — Lab 08
- URL: https://user12.9expert.online
- Deployed: 2026-09-23 14:00 UTC+7 (Coolify)
- Homepage: curl -I → HTTP/1.1 200 OK
- Contact POST → ok
- STUDENT_SLUG=user12
```

### ขั้นที่ 5 — Fallback Pages (ถ้าจำเป็น)

Coolify/DNS ไม่พร้อม → วาง `02-github-pages-fallback.md` · บันทึกใน SHIP.md ว่า **fallback** · API ไม่ครบ · แจ้งวิทยากร

| | Coolify (เต็ม) | Pages fallback |
|---|---|---|
| 4 หน้า | ✓ | ✓ |
| Guestbook API | ✓ | ✗ |
| เกณฑ์ slug.9expert | ✓ | ไม่แทน |

---

## ตรวจว่าผ่านหรือยัง

```powershell
curl.exe -sS -o NUL -w "%{http_code}\n" https://userNN.9expert.online/
Test-Path .\docs\SHIP.md
Select-String -Path .\docs\SHIP.md -Pattern "https://"
git check-ignore -v .env
```

- [ ] URL slug ตัวเอง · curl 200  
- [ ] API guestbook/contact บน production สำเร็จ  
- [ ] `docs/SHIP.md` ครบ  
- [ ] `test:labs` เขียวบน commit ที่ deploy  
- [ ] ไม่ leak secret  

---

## ติดปัญหาบ่อย

| อาการ | ลองทำ |
|---|---|
| 502/503 | Coolify logs · PORT 4321 · rebuild |
| SSL ยังไม่ขึ้น | รอ Let's Encrypt 2–5 นาที |
| API 404 บน prod | ตรวจ SSR/adapter · merge Lab 05 ครบหรือยัง |
| DNS NXDOMAIN | แจ้งวิทยากร — A record → VPS |
| SQLite ว่างหลัง restart | ตรวจ volume `/data` ใน Coolify |

---

## โชว์ท้ายคอร์ส (2–3 นาที)

1. เปิด URL บนมือถือ  
2. ส่ง guestbook 1 ข้อความ demo  
3. เล่า 1 เรื่องจาก Lab 07 ที่เปลี่ยนโค้ด  

---

**จบสูตร V4** — แสดง URL slug ของคุณ + guestbook demo ในรอบโชว์ท้ายคอร์ส
