# Worksheet: A2A vs JSON Contract (+ คู่กับ MCP)

คัดลอกบล็อกด้านล่างไป `workspace/learning-log.md` แล้วเติมคำตอบ

```md
### Lab เสริม — A2A vs Contract (optional)

- วันที่:
- เครื่องมือที่ใช้ (Claude Code / OpenCode / อื่น ๆ):
- Track ที่ทำ: A (live A2A) / B (เอกสารอย่างเดียว)
- เคยทำ Lab เสริม MCP vs CLI แล้วหรือยัง: ใช่ / ไม่ / ทำพร้อมกัน

#### Baseline file handoff
- มีไฟล์อะไรใน `workspace/contracts/` ตอนเริ่ม:
- ขั้นที่คนต้องสลับจาก Claude Code → OpenCode:
- Owner ของ dining-options / audit-result:

#### Agent Card (Track A หรือ B)
- เปิดไฟล์ / URL ไหน: `examples/agent-card.dining.json` หรือ live `/.well-known/agent-card.json`
- ชื่อ agent (`name`):
- skill id ที่เกี่ยวกับ Dining:
- `supportedInterfaces` มี binding อะไรบ้าง:
- จาก card นี้ agent **เขียนไฟล์ไหนได้** (ดู skills หรือ `_lab_meta`):

#### ถ้าทำ Track A (live)
- ชื่อ A2A wrapper / SDK / client:
- URL Agent Card หรือ health:
- Task ที่ส่ง (สรุป 1–2 ประโยค):
- ได้ artifact / ข้อความกลับหรือไม่:
- ผล map เข้า contract อย่างไร (เขียนไฟล์ / อธิบาย mapping):
- ปัญหาที่เจอ (พอร์ต, permission, เวอร์ชัน):

#### ถ้าทำ Track B (static)
- อ่าน `examples/sample-task.dining.json` แล้วสรุป 1 ประโยคว่า Task แทนขั้นตอนไหนของคน:

#### ตารางชั้น (บังคับ)
| ชั้น | ใช้เมื่อ | ความเสี่ยงหลัก |
|---|---|---|
| CLI + cache | | |
| MCP | | |
| JSON contract | | |
| A2A | | |

#### เปรียบเทียบสั้น
| มุม | คน + JSON contract (ค่าเริ่มต้นคอร์ส) | A2A |
|---|---|---|
| ใครเริ่มขั้นถัดไป | | |
| ข้าม Claude ↔ OpenCode | | |
| ตรวจ ownership / audit | | |
| ความยากตอนสอนทั้งห้อง | | |

#### คำถามบังคับ (ตอบสั้น ๆ)
1. MCP กับ A2A ต่างกันอย่างไร — ตอบให้มีคำว่า **tool** และ **agent** อย่างละครั้ง
2. ถ้า Dining รับงานผ่าน A2A ได้แล้ว ยังต้องมี `dining-options.json` (หรือ schema เทียบเท่า) ไหม เพราะอะไร
3. ทำไมคอร์สนี้ยังไม่ย้ายเกณฑ์ผ่าน Capstone ไปพึ่ง A2A ทั้ง pipeline
4. (คู่กับ Lab เสริม MCP) ถ้าองค์กรจะใช้ทั้ง MCP และ A2A ควรเริ่มชั้นไหนก่อนในโจทย์แบบ Trip Coordinator นี้
```
