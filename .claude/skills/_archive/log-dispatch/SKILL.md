---
name: log-dispatch
description: Append a cross-tool CLI dispatch event to the Command Center log. Use only when calling the other tool via CLI.
disable-model-invocation: false
---

# log-dispatch

บันทึกเฉพาะตอนเรียก CLI ข้ามเครื่องมือ — ไม่ต้อง log ทุกประโยคในแชท

เพิ่มหนึ่งบรรทัด JSON ลง `workspace/command-center/events.jsonl`:

```json
{"at":"<ISO-8601>","type":"dispatch","from":"claude","to":"opencode","summary":"<สั้นๆ ว่าสั่งอะไร>"}
```

หรือ POST ไปที่ Command Center API ที่ `http://127.0.0.1:4181/api/events`

## Windows PowerShell (ห้องนี้ใช้ตัวนี้)

`curl -d "{\"type\":...}"` ใน PowerShell **พัง** — เครื่องหมายคำพูดทำให้ JSON แตก แล้ว API ตอบ 400

ใช้ `Invoke-RestMethod` หรือเขียนไฟล์:

```powershell
$body = @{
  type = 'dispatch'
  from = 'claude'
  to = 'opencode'
  summary = 'ตรวจ POST /api/orders'
} | ConvertTo-Json -Compress
Invoke-RestMethod -Method Post -Uri http://127.0.0.1:4181/api/events -ContentType 'application/json' -Body $body
```

หรือต่อท้ายไฟล์ตรงๆ (ไม่ผ่าน API ก็ได้):

```powershell
$line = @{
  at = (Get-Date).ToUniversalTime().ToString('o')
  type = 'dispatch'
  from = 'claude'
  to = 'opencode'
  summary = 'ตรวจ POST /api/orders'
} | ConvertTo-Json -Compress
Add-Content -Path workspace/command-center/events.jsonl -Value $line
```

## Bash / Git Bash / WSL

```bash
curl -s -X POST http://127.0.0.1:4181/api/events \
  -H "content-type: application/json" \
  -d '{"type":"dispatch","from":"claude","to":"opencode","summary":"wire prices API"}'
```

หลังบันทึก: ให้ผู้เรียนเปิด http://localhost:4174 แล้วชี้ลูกศรของตัวเอง
