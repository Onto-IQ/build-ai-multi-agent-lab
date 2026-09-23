# Lab 08 — Ship (Coolify · 9expert.online)

**เวลาเป้าหมาย:** 90–120 นาที  
**แพลตฟอร์ม:** Coolify บน VPS คอร์ส · `STUDENT_SLUG=user01`–`user30`  
**URL:** `https://<STUDENT_SLUG>.9expert.online`  
**Demo อ้างอิง:** https://demo.9expert.online (ของห้อง — ไม่แทน slug คุณ)  
**ทางสำรอง:** GitHub Pages static (ไม่มี API guestbook)

## เป้าหมาย

Deploy สินค้าให้มี **URL สาธารณะจริง** · **`curl` HTTP 200** · **API contact/guestbook ทำงาน** · บันทึก **`docs/SHIP.md`**  
**จุดที่ควรรู้สึกว้าว:** เพื่อนในห้องเปิด `https://userNN.9expert.online` แล้วส่ง guestbook ได้

**ห้ามเคลม deploy สำเร็จ** ถ้ายังไม่มี URL ที่ตอบ 200 จริง

---

## ได้รับมาจาก Lab ก่อน

- Lab 04–07: merge PR หลัก · QA · cross-model
- `npm run test:labs` เขียว
- `.env`: `STUDENT_SLUG`, `SITE_URL` ตรงที่วิทยากรแจก
- DNS `userNN.9expert.online` ชี้ VPS (วิทยากร/คุณตรวจ)

## ได้เพิ่มใน Lab นี้

- Production deployment บน Coolify
- หลักฐาน curl + POST API
- `docs/SHIP.md` (และอาจ `docs/ship-curl-headers.txt` ถ้าเก็บ header)

---

## ผลลัพธ์รูปธรรม (ไฟล์ที่ต้องมี)

| รายการ | หลักฐาน |
|---|---|
| URL | `https://userNN.9expert.online` เปิดในเบราว์เซอร์ |
| HTTP | `curl -I` → 200 (หรืออธิบาย 304) |
| API | `POST /api/contact` (หรือ path ตาม template) → 201/200 |
| เอกสาร | `docs/SHIP.md` มี URL, เวลา, คำสั่งที่ใช้ |

**ยังไม่ผ่านถ้า…**

- มีแค่ localhost / screenshot
- commit webhook Coolify / รหัส admin
- 502/404 ทั้งชั่วโมงโดยไม่ escalate

---

## Preflight

```powershell
cd <your-personal-site-repo>
Get-Content .env | Select-String 'STUDENT_SLUG','SITE_URL'
npm run test:labs
npm run build
gh pr list --state merged
git checkout main
git pull
```

ตรวจ DNS (ถ้า record มีแล้ว):

```powershell
$slug = (Get-Content .env | Where-Object { $_ -match '^STUDENT_SLUG=' }) -replace 'STUDENT_SLUG=',''
Resolve-DnsName "$slug.9expert.online" -Type A -ErrorAction SilentlyContinue
Write-Host "Target: https://$slug.9expert.online"
```

---

## เลือกทาง A — TUI vs B — CLI

| ทาง | เหมาะกับ |
|---|---|
| **A — TUI Claude** | checklist env Coolify · ร่าง SHIP.md |
| **B — CLI** | `curl`, `gh`, deploy webhook (secret ใน GitHub only) |

Prompts:

- [`prompts/01-coolify-deploy.md`](prompts/01-coolify-deploy.md)
- [`prompts/02-github-pages-fallback.md`](prompts/02-github-pages-fallback.md)

---

## ขั้นตอน

### 1) Merge และ build ท้ายสุด

```powershell
npm run test:labs
npm run build
git status
```

### 2) สร้าง/อัปเดต App บน Coolify

ทำกับวิทยากรหรือตาม playbook ห้อง:

1. Coolify → Project คอร์ส → **New Resource** → Application จาก GitHub repo คุณ
2. Branch: `main` · Build: **Dockerfile** (ใน template)
3. Domain: `https://userNN.9expert.online`
4. Port container: `4321`
5. Volume: `DATA_DIR=/data` สำหรับ SQLite guestbook
6. Env (ใน UI — **ห้าม commit**): `SITE_URL`, `HOST=0.0.0.0`, `PORT=4321`, `DATA_DIR=/data`, keys อื่นตาม template
7. Deploy · ดู log จน healthy

Webhook (ถ้ามี): เก็บใน GitHub Secret `COOLIFY_DEPLOY_WEBHOOK` — ไม่ใส่ใน repo

วาง [`01-coolify-deploy.md`](prompts/01-coolify-deploy.md) ใน `claude` เพื่อ list **ชื่อ** env

### 3) ตรวจ HTTP + API

```powershell
$base = "https://userNN.9expert.online"
curl.exe -I $base
curl.exe -sS -o NUL -w "%{http_code}`n" $base
curl.exe -sS -X POST "$base/api/contact" `
  -H "content-type: application/json" `
  -d '{"name":"Lab08","email":"lab08@example.com","message":"ship check"}'
```

ปรับ path/body ตาม template จริง

### 4) เขียน SHIP.md

```powershell
@'
# SHIP — Lab 08

- URL:
- Deployed (UTC+7):
- Homepage curl:
- Contact POST result:
- STUDENT_SLUG:
- Notes:
'@ | Set-Content -Encoding utf8 .\docs\SHIP.md
```

ให้ Claude ช่วยเติมจากผล curl (ไม่ใส่ secret)

```powershell
git add docs/SHIP.md
git commit -m "docs: Lab 08 ship evidence"
git push
```

### 5) Fallback GitHub Pages

ถ้า Coolify/DNS ไม่พร้อม → [`02-github-pages-fallback.md`](prompts/02-github-pages-fallback.md)  
บันทึกใน SHIP.md ว่า **fallback** · API ไม่ครบ · ต้องได้รับทราบจากวิทยากร

---

## ตัวอย่างผลลัพธ์ที่คาดหวัง

**`docs/SHIP.md`**

```markdown
# SHIP — Lab 08
- URL: https://user12.9expert.online
- Deployed: 2026-09-23 14:00 UTC+7 (Coolify)
- Homepage: curl -I → HTTP/1.1 200 OK
- Contact POST → {"ok":true}
- STUDENT_SLUG=user12
```

---

## คำสั่งตรวจ

```powershell
curl.exe -sS -o NUL -w "%{http_code}\n" https://userNN.9expert.online/
Test-Path .\docs\SHIP.md
Select-String -Path .\docs\SHIP.md -Pattern "https://"
npm run test:labs
git check-ignore -v .env
```

---

## เกณฑ์ผ่าน Lab

- [ ] URL slug ตัวเอง · curl 200
- [ ] API guestbook/contact บน production สำเร็จ
- [ ] `docs/SHIP.md` ครบ
- [ ] `npm run test:labs` เขียวบน commit ที่ deploy
- [ ] ไม่ leak secret

## ยังไม่ผ่านถ้า…

- ใช้ demo.9expert.online แทน slug ตัวเอง
- Pages fallback แล้วเคลม API ครบโดยไม่บอกวิทยากร
- ยืนยัน ship โดยไม่มี URL จริง

---

## Troubleshooting Windows

| อาการ | ทำอะไร |
|---|---|
| 502/503 | Coolify logs · PORT 4321 · rebuild |
| SSL pending | รอ Let's Encrypt 2–5 นาที |
| API 404 prod | ตรวจ SSR/server adapter · merge Lab 05 |
| DNS NXDOMAIN | แจ้งวิทยากร — A record → VPS |
| curl SSL error | ตรวจว่า domain ตรง SERVE · ไม่ใช่ IP ผิด |
| SQLite ว่างหลัง restart | ตรวจ volume `/data` ใน Coolify |

---

## โชว์ท้ายคอร์ส (2–3 นาที)

1. เปิด URL บนมือถือ
2. ส่ง guestbook 1 ข้อความ demo
3. เล่า 1 เรื่องจาก Lab 07 ที่เปลี่ยนโค้ด

---

## Coolify vs GitHub Pages

| | Coolify (เต็ม) | Pages fallback |
|---|---|---|
| Static 4 หน้า | ✓ | ✓ |
| Guestbook API | ✓ | ✗ |
| เกณฑ์ slug.9expert | ✓ | ไม่แทน |

---

**จบสูตร V4** — Optional: [`lab-optional-command-center`](../lab-optional-command-center/README.md)
