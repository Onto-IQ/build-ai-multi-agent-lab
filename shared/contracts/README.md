# JSON Contracts — Agent Cost Board

สัญญาไฟล์เป็นแหล่งความจริงระหว่าง agent  
ผลงานผู้เรียนเขียนที่ `workspace/contracts/` (คัดลอกโครงจาก `*.example.json` ที่นี่)

ทุกไฟล์ต้องมี: `schema_version`, `project_id`, `generated_by`, `generated_at`, `source_mode`

`source_mode` ที่อนุญาต: `mock` | `cache` | `hybrid` | `api` | `manual`

| ไฟล์ตัวอย่าง | Lab | ความหมาย |
|---|---|---|
| `code-review.example.json` | 01 | รายงานรีวิว (Reviewer ไม่แก้โค้ด) |
| `role-cards.example.json` | 05 | บทบาท Frontend / Backend / QA |
| `handoff-fe.example.json` | 06–07 | ส่งงานต่อจาก Frontend |
| `handoff-be.example.json` | 06–07 | ส่งงานต่อจาก Backend |
| `audit-result.example.json` | 08 | ผลด่านคุณภาพ/ต้นทุน |
| `synthesize-report.example.json` | 09 | รวมผลให้เปิดแผงได้ |
| `kanban-snapshot.example.json` | 10 | สรุปบอร์ด Flux |
| `capstone-ship.example.json` | 11 | URL สาธารณะ + บันทึกต้นทุน (ในห้อง: Hostinger `learnerNN.9expert.online`) |

ตรวจสัญญา:

```bash
node shared/scripts/validate-json.mjs
node shared/scripts/validate-json.mjs workspace/contracts/code-review.json
```

ด่านคุณภาพของแอป:

```bash
node shared/scripts/gate-quality.mjs
```
