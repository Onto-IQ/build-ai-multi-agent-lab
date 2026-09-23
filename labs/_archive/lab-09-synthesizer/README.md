# Lab 09 — Synthesizer

**Outline 11:** Synthesize Pattern  
**ลำดับงาน:** Test → Ship

## ได้รับมาจาก Lab ก่อน

- โมดูล Frontend / Backend ที่ทีมสร้าง + ด่านจาก Lab 08
- `audit-result` ที่เคย FAIL แล้ว PASS

## ได้เพิ่มใน Lab นี้

สร้าง **Synthesizer** รวมผลให้เปิดแผง Agent Cost Board ดูสถานะและรอบรันได้จริง

## เป้าหมาย

เปิด `frontend/index.html` แล้วเห็นข้อมูลจาก backend

**จุดที่ควรรู้สึกว้าว:** รวมแล้วเปิดดูได้ ไม่ใช่แค่ไฟล์แยก

## ผลลัพธ์รูปธรรม

1. **ต้องมีไฟล์/หลักฐานเหล่านี้**
   - `workspace/contracts/synthesize-report.json`
2. **ต้องเห็นด้วยตาอะไร**
   - Browser / Live Preview แสดงสถานะ + ตารางรอบจาก `status.json` / `runs.json`
3. **เช็คผ่านด้วยคำสั่งนี้**

```powershell
# เปิด open_path จากรายงาน (มักเป็น apps/sample-dashboard/frontend/index.html)
node shared/scripts/validate-json.mjs workspace/contracts/synthesize-report.json
```

4. **ยังไม่ผ่านถ้า…**
   - มีแค่รายงานโดยไม่เปิดแผง / แผงไม่ดึงข้อมูล backend / gate ยัง FAIL จาก Lab 08

> **Ship รอ Lab 11** — Lab นี้แค่รวมผลให้เปิดแผงได้ ไม่ deploy สาธารณะ  
> ใน Lab 10 การ์ดใกล้ Ship สะท้อนว่า synthesize แล้ว; URL จริงอยู่ Lab 11

## เลือกวิธีรัน

| ทาง | เหมาะกับ | หมายเหตุ |
|---|---|---|
| **A — TUI** | เปิดพรีวิวใน VS Code พร้อม Claude | เห็น UI จริง |
| **B — CLI** | ตรวจ wiring + เขียน synthesize-report | ถ้าเปิดเบราว์เซอร์ไม่ได้ ให้จดใน `notes` |

---

## 0) Preflight

```powershell
Get-Content .\apps\sample-dashboard\backend\status.json
Get-Content .\apps\sample-dashboard\backend\runs.json | Select-Object -First 20
Test-Path .\shared\contracts\synthesize-report.example.json
node shared/scripts/gate-quality.mjs
```

ถ้า gate ไม่ผ่าน → กลับ Lab 08  
ถ้าไม่มี `node` → ตรวจด้วยตาว่า `status=ok` และ `runs` มีอย่างน้อย 1 รายการ

---

## ทาง A — TUI

1. เปิด `claude` ที่ root  
2. วาง [`prompts/01-synthesize.md`](prompts/01-synthesize.md)  
3. เปิดแผงบน **localhost** (อย่าใช้ `file://`):

```bash
# จาก root ของ repo — ใช้ได้ทุก OS ที่มี Node
npx --yes serve apps/sample-dashboard -p 4173
```

เปิด [http://localhost:4173/frontend/](http://localhost:4173/frontend/)  
ทางเลือก: VS Code Live Preview ที่โฟลเดอร์ `apps/sample-dashboard`  
4. ตรวจว่าการ์ดสถานะ + ตารางรอบขึ้น  
5. มี `workspace/contracts/synthesize-report.json`

```powershell
$p = @'
You are the Synthesizer for Agent Cost Board.
Confirm frontend can read backend status.json and runs.json by reading the files and app.js fetch paths.
Fix only what is required to make the board render, without breaking ownership rules.
If nothing is broken, do not change apps/sample-dashboard/.
Then write workspace/contracts/synthesize-report.json using
shared/contracts/synthesize-report.example.json.
Set open_path to apps/sample-dashboard/frontend/index.html.
If you cannot literally open a browser in this CLI session, set ui_shows_* from code+data readiness and note limits in notes.
Append a short "## Lab 09" to workspace/learning-log.md.
'@

$p | claude -p --permission-mode acceptEdits --output-format text --no-session-persistence

Get-Content .\workspace\contracts\synthesize-report.json
```

เปิด UI เองหลัง CLI (ข้ามแพลตฟอร์ม):

```bash
npx --yes serve apps/sample-dashboard -p 4173
# เปิด http://localhost:4173/frontend/
```

---

## ข้อความพร้อมวาง

[`prompts/01-synthesize.md`](prompts/01-synthesize.md)

## ผลที่คาดหวัง

- แผงแสดงสถานะและตารางรอบได้ (หรือมีบันทึกเหตุผล + แผนแก้)
- มี `synthesize-report.json` ผ่าน validator
- เข้าใจว่า Ship / URL สาธารณะรอ Lab 11

ดู [`expected/synthesize-report.json`](expected/synthesize-report.json)

## เกณฑ์ผ่าน Lab

ต้องตรงกับ **ผลลัพธ์รูปธรรม** ด้านบน 1:1

- [ ] มี synthesizer prompt หรือ agent
- [ ] เปิดแผงแล้วเห็นสถานะ + ตารางรอบจาก backend (หรือบันทึกเหตุผลพร้อมแผนแก้)
- [ ] มี `synthesize-report.json` ผ่าน validator

## ทางเลือกเมื่อเครื่องมือไม่พร้อม

เปิดไฟล์ผ่าน browser ตรง ๆ ไม่ได้เพราะ fetch จำกัด — ใช้ `npx --yes serve apps/sample-dashboard -p 4173` หรือ VS Code Live Preview ที่โฟลเดอร์แอป

## แก้ปัญหาเบื้องต้น

| อาการ | ทำอะไร |
|---|---|
| หน้าเว็บว่าง | เปิด DevTools ดูว่า fetch `../backend/*.json` พังหรือไม่ |
| gate ไม่ผ่าน | กลับไป Lab 08 ก่อน |
| CLI อ้าง ui_shows_* โดยไม่เปิดเบราว์เซอร์ | เปิด `open_path` เองแล้วอัป notes ถ้าจำเป็น |
