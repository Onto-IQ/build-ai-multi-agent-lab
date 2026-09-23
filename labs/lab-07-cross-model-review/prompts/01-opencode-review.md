# Prompt — OpenCode review Claude PR (Lab 07)

รันใน **Windows Terminal แท็บ OpenCode** · repo สินค้า

```text
รีวิว PR จาก Lab 04 หรือ 05 (ฝั่ง Claude / Frontend) แบบอิสระ

Input:
- docs/_pr-diff.txt (จาก gh pr diff)
- docs/DECISIONS.md
- docs/QA.md ถ้ามี

ใช้ opencode run (OpenCode 2.0.6+) — อ่าน diff ไม่แก้ src/ ยกเว้น Must fix ที่ผู้เรียนอนุมัติแยก

โฟกัส:
- correctness ของ course stubs / tests
- security: SQL injection, secret leak, error messages
- scope creep นอก DECISIONS

Output ไฟล์ docs/review-opencode.md:
- สรุป, จุดแข็ง, ความเสี่ยง
- Must fix / Should / Nit (ภาษาไทย)
- คำถามต่อ Claude

ห้ามใช้ MCP เป็นท่อให้ Claude รันต่อ — จบ one-shot แล้วให้ผู้เรียน paste ไป PR
```

**ตัวอย่าง shell (ปรับ PR):**

```powershell
gh pr diff 3 | Out-File -Encoding utf8 .\docs\_pr-diff.txt
opencode run "Read docs/_pr-diff.txt and docs/DECISIONS.md. Write docs/review-opencode.md with Must/Should/Nit in Thai. Do not edit src/."
```
