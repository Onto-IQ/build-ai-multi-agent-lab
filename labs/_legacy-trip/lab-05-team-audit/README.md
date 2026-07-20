# Lab 5: ทีม 3 ตัว — Activity + Dining + Auditor

**เวลา:** 60 นาที  
**เครื่องมือ:** Claude Code + OpenCode  
**Outputs:** `activity-options.json`, `dining-options.json` (อัปเดตถ้าจำเป็น), `audit-result.json` ใน `workspace/contracts/`

## เป้าหมาย

ให้ 3 Agent ตรวจ/เสนองานคนละด้าน พร้อมกันในโครงทริปเดียวกัน

## ไฟล์ในโฟลเดอร์นี้

- `prompts/activity-agent.md` — Claude Code (source of truth)
- `prompts/logistics-auditor.md` — OpenCode (source of truth; Lab 6 อ้างต่อ)

Dining Agent ใช้ต้นฉบับจาก Lab 2:

- `../lab-02-dining/prompts/dining-agent.md`

## ขั้นตอน

1. ทำงานจาก **root** ของ repository
2. Activity / Dining เรียก tool ตาม `shared/prompts/tool-calling-rules.md` ก่อนเขียน contract (mock = fallback)
3. Claude Code: รัน Activity Agent → `workspace/contracts/activity-options.json`
4. OpenCode: ตรวจ/อัปเดต Dining Agent ถ้ายังไม่มี dining options
5. OpenCode: รัน Auditor (ใช้ `travel-time` tool เมื่อมีพิกัด) → `workspace/contracts/audit-result.json`
6. ตรวจ:

```bash
node shared/scripts/validate-json.mjs workspace/contracts/activity-options.json
node shared/scripts/validate-json.mjs workspace/contracts/dining-options.json
node shared/scripts/validate-json.mjs workspace/contracts/audit-result.json
```

หมายเหตุ: audit เป็น `FAIL` ได้ถ้ามี `violations` ชัดเจน — ใช้ต่อใน Lab 6/8

## เกณฑ์ผ่าน

- [ ] มี activity options ≥ 2 candidates
- [ ] มี dining options ≥ 2 candidates
- [ ] มี audit-result พร้อม status PASS หรือ FAIL (+ violations ถ้า FAIL)
- [ ] ไม่ให้ Agent ใดข้าม ownership ไฟล์

## ถัดไป

[Lab 6: Orchestration](../lab-06-orchestration/README.md)
