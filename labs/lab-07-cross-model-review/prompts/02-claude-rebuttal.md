# Prompt — Claude rebuttal + PR summary (Lab 07)

รันในแท็บ **claude** · repo สินค้า

```text
อ่าน docs/review-opencode.md (ผู้เรียนวาง findings จาก OpenCode)

งาน:
1. ตอบทีละ Must fix — แก้โค้ด หรือ rebut ด้วยเหตุผล
2. ถ้าแก้: รัน npm run test:labs แล้ว push
3. เขียน docs/review-claude-rebuttal.md — ยอมรับ / ปฏิเสธ / follow-up
4. ร่าง PR comment สรุป round-trip ภาษาไทย (OpenCode → Claude) + ทำไม cross-model คุ้ม 2–3 bullet

ใช้ TUI หรือ claude -p

ห้าม orchestrate opencode จาก MCP — ผู้เรียน copy findings เอง
```

**ตัวอย่าง PowerShell:**

```powershell
$prompt = @'
Read docs/review-opencode.md and docs/DECISIONS.md.
Write docs/review-claude-rebuttal.md.
Fix valid Must items or rebut. Draft PR comment summary in Thai.
'@
$prompt | claude -p --permission-mode acceptEdits --output-format text
```
