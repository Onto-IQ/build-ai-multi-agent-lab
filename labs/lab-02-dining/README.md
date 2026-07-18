# Lab 2: Dining Agent (OpenCode)

**เวลา:** 40–45 นาที  
**เครื่องมือ:** OpenCode  
**Input:** `workspace/contracts/trip-brief.json` (จาก Lab 1)  
**Output:** `workspace/contracts/dining-options.json`

## เป้าหมาย

สร้าง Dining Agent ใน OpenCode ที่ **ดึงร้านผ่าน tool** แล้วเขียนผลลง JSON contract (orchestration ยังเป็นไฟล์)  
เปรียบเทียบกับ Triage Agent จาก Lab 1 (บทบาท คนละเครื่องมือ คนละ ownership)

## ไฟล์ในโฟลเดอร์นี้

- `prompts/dining-agent.md` — **source of truth** สำหรับ Dining Agent (Lab อื่นอ้างไฟล์นี้)
- กฎ tool ร่วม: `shared/prompts/tool-calling-rules.md`

## ขั้นตอน

1. ทำงานจาก **root** ของ repository
2. ตรวจว่ามี trip brief จาก Lab 1
3. (แนะนำ) ลอง tool ก่อนรัน Agent:

```bash
node shared/scripts/tools/geocode.mjs "วัดโพธิ์"
node shared/scripts/tools/search-pois.mjs --lat 13.74635 --lon 100.49274 --amenity restaurant --radius-km 1.2
```

4. อ่านและรัน `prompts/dining-agent.md` ใน OpenCode
5. ตรวจผล:

```bash
node shared/scripts/validate-json.mjs workspace/contracts/dining-options.json
```

6. จดใน `workspace/learning-log.md`: ใช้ `source_mode` อะไร / fallback หรือไม่ / ความต่าง Claude vs OpenCode

## เกณฑ์ผ่าน

- [ ] มี dining options อย่างน้อย 2 candidates (หลัก + backup)
- [ ] พยายามเรียก tool ในเส้นทางหลัก (ถ้า fail ต้อง fallback mock และระบุใน `sources`)
- [ ] ไม่แก้ไฟล์ของ Claude Code (`trip-brief`, `activity-options`, `final-itinerary`)
- [ ] ผ่าน validator
- [ ] ไม่ยืนยันจองร้าน

## ถัดไป

- (Optional, 15–25 นาที) [Lab เสริม: MCP vs CLI + rate limit](../lab-optional-mcp-vs-cli/README.md)  
- [Lab 3: Permission](../lab-03-permission/README.md)
