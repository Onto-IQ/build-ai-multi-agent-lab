# FLUX-SETUP — บอร์ดงาน Agent Cost Board

Flux ([flux.umin.ai](https://flux.umin.ai)) เป็น**ชั้นมอบหมายงาน**ของโปรเจกต์นี้  
ไม่ใช่บอร์ดเดโม่คนละเรื่อง และ**ไม่ใช่**แค่ไฟล์ `kanban-snapshot.json`

## JSON vs Kanban (อ่านก่อนตั้งบอร์ด)

| เมื่อไหร่ | ใช้อะไร |
|---|---|
| ownership / ส่งงานต่อ / ด่าน / ship | สัญญา JSON ใน `workspace/contracts/` |
| มอบหมายใครทำ / ขั้นไหน / มองเห็นคิว | Flux Kanban |

Lab 10 loop (go-live): การ์ดหลัก 3 ใบเท่านั้น → มอบหมาย **role + tool + ชื่อ agent** ตามแมปไม่ทับซ้อน → เรียก named agent → ทำงานจริง → อัปเดต JSON → เลื่อนตามสถานะ → snapshot จากบอร์ดสด  
ห้ามสร้างการ์ดเพื่องานนับ / เลื่อนโดยไม่มีหลักฐานงาน / ใช้ `specialist` ปิดทั้งบอร์ด

### มอบหมาย tool ↔ agent file (ล็อก)

| การ์ด | Tool บนการ์ด | Agent ที่ต้องเรียก | ไฟล์ |
|---|---|---|---|
| Frontend | Claude Code | `frontend` | `.claude/agents/frontend.md` |
| Backend | OpenCode | `backend` | `.opencode/agents/backend.md` |
| QA | OpenCode | `qa` | `.opencode/agents/qa.md` |

Synthesizer (Claude) สนับสนุน Lab 09 — **ไม่** สร้างเป็นใบ WIP ที่ 4

## สิ่งที่ต้องได้เมื่อจบคู่มือนี้

1. มีบอร์ดชื่อเกี่ยวกับ Agent Cost Board บน Flux จริง
2. คอลัมน์: Interview → Plan → Build → Test → Ship
3. การ์ดอย่างน้อย 3 ใบที่ตรงงานแอป (Frontend / Backend / QA)
4. **เลื่อนการ์ดอย่างน้อย 1 ใบ** (พิสูจน์ว่าบอร์ดใช้ได้)
5. (แนะนำในห้อง) เชื่อม **MCP** กับ Claude Code และ/หรือ OpenCode

## ค่าใน `.env`

```env
FLUX_API_KEY=flux_...          # Settings → API Keys (ต้องมี scope Write ถ้าจะสร้าง/เลื่อนการ์ด)
FLUX_WORKSPACE_URL=https://flux.umin.ai/board/<shortId>/board/<shortId>
```

- เปิด `FLUX_WORKSPACE_URL` ในเบราว์เซอร์ต้องเห็นบอร์ด (HTML 200)
- คีย์ขึ้นต้นด้วย `flux_` ใช้เป็น `Authorization: Bearer ...`

## ขั้นตอนแนะนำ (เบราว์เซอร์)

1. สมัคร/เข้า [Flux](https://flux.umin.ai) ตามที่วิทยากรแจก  
2. สร้าง API key (Read สำหรับดูอย่างเดียว, **Read+Write** สำหรับสร้าง/เลื่อนการ์ด)  
3. ใส่คีย์ + URL บอร์ดลง `.env`  
4. สร้างบอร์ดชื่อเช่น `Agent Cost Board — <ชื่อผู้เรียน>`  
5. ตั้งคอลัมน์ 5 ขั้นตามลำดับงานคอร์ส  
6. สร้างการ์ด**หลัก 3 ใบเท่านั้น** (Frontend / Backend / QA) — ใส่ในคำอธิบาย:
   `Assignee: <role> | Tool: <Claude Code|OpenCode> | Agent: <frontend|backend|qa> | Contract: <path>`
   - Frontend → Tool Claude Code · Agent `frontend`
   - Backend → Tool OpenCode · Agent `backend`
   - QA → Tool OpenCode · Agent `qa`
7. มอบหมายให้ตรงแมป — เปิดบอร์ดแล้วต้องบอกได้ว่าใบไหนเรียก agent อะไร  
8. **เรียก named agent ทำงานจริงก่อน** แล้วค่อยเลื่อนการ์ด  
9. คัดลอก URL บอร์ดใส่ `workspace/learning-log.md` ก่อนเขียน snapshot  

> มีแค่ `kanban-snapshot.json` โดยไม่มีบอร์ดสด = **ยังไม่จบ FLUX-SETUP**  
> บอร์ดรก / การ์ดเพื่องานนับ / เลื่อนเล่น = **ไม่ผ่านมาตรฐาน go-live**

## เชื่อม Claude Code ผ่าน MCP (ทดสอบแล้วใช้ได้)

Flux MCP: `https://flux.umin.ai/api/mcp`

**อย่า commit คีย์** — `.mcp.json` อยู่ใน `.gitignore` (ดู `.mcp.json.example`)

```powershell
$fluxKey = (Select-String -Path .env -Pattern '^FLUX_API_KEY=(.*)$').Matches.Groups[1].Value.Trim().Trim('"')
claude mcp add --transport http flux https://flux.umin.ai/api/mcp -s project --header "Authorization: Bearer $fluxKey"
```

- ครั้งแรกใน TUI อาจขึ้น **Pending approval** → เปิด `claude` แล้ว Approve `flux`
- สคริปต์ `-p` ในห้องทดสอบ: ใช้ `--dangerously-skip-permissions` ได้เฉพาะเครื่องตัวเอง

```text
Create a card in Build on Agent Cost Board, then move it to Test.
```

ผลทดสอบ E2E: Claude สร้าง **PB-8** แล้วเลื่อน Build → Test สำเร็จ

## เชื่อม OpenCode ผ่าน MCP (ทดสอบแล้วใช้ได้)

```powershell
$fluxKey = (Select-String -Path .env -Pattern '^FLUX_API_KEY=(.*)$').Matches.Groups[1].Value.Trim().Trim('"')
opencode mcp add flux --url https://flux.umin.ai/api/mcp --header "Authorization=Bearer $fluxKey"
opencode mcp list
```

```powershell
"Create card on Agent Cost Board Build then move to Test. Reply Thai." | opencode run --auto -m opencode/big-pickle
```

ถ้า `No provider available` ให้สลับ `-m`  
ผลทดสอบ E2E: OpenCode สร้าง **PB-9** แล้วเลื่อน Build → Test สำเร็จ

## เครื่องมือ MCP (12 ตัว)

| กลุ่ม | ตัวอย่าง |
|---|---|
| อ่าน | `list_workspaces`, `list_boards`, `get_board`, `list_cards`, `get_card`, `search_cards` |
| เขียน | `create_card`, `update_card`, `move_card`, `create_column`, `add_comment`, `reorder_cards` |

> **ไม่มี `delete_card`** — ลบใน UI ของ Flux หรือสร้างคอลัมน์ `Trash` แล้ว `move_card` เข้า Trash

## กับดักจากทดสอบจริง

| อาการ | แก้ |
|---|---|
| `create_card` พังกับ shortId | ใช้ **board UUID** จาก `get_board.id` |
| `move_card` error | ใช้ `target_column_id` |
| Claude MCP Pending approval | Approve ใน TUI หรือ `--dangerously-skip-permissions` เฉพาะทดสอบ |
| REST ใต้ URL บอร์ดคืน HTML | ใช้ MCP เท่านั้น |
| อยากลบการ์ด | Trash column / ลบในเว็บ |

## ความสัมพันธ์กับชั้นอื่น

| ชั้น | หน้าที่ |
|---|---|
| Flux | มองเห็นงาน + มอบหมาย + เลื่อนการ์ด |
| Agent Cost Board | แสดงต้นทุน/สถานะทีมตัวเอง |
| JSON ใน workspace | แหล่งความจริงส่งงานต่อ |

## หลังจบคอร์ส

สร้างบอร์ดใหม่ → มอบหมาย Claude + OpenCode ผ่าน MCP → ใช้สัญญา + ด่านสูตรเดิม
