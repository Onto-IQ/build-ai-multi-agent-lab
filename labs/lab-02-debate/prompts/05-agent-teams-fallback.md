# Fallback — Claude Agent Teams (Lab 02)

ใช้เมื่อ Subagents 3 รอบเสถียรกว่า หรือเมื่อ `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` ใน `.env`

```text
เปิด claude agents (Agent View) ถ้ามี

จำลองทีม 3 บทบาทในเซสชันเดียวหรือแยก teammate:
1) Brand Strategist
2) UX Critic  
3) Devil's Advocate

Input: docs/PROFILE.md

ลำดับ:
- ให้แต่ละบทบาทพูดสลับกันอย่างน้อย 2 รอบ
- facilitator สรุปลง docs/DEBATE.md (หัวข้อตาม prompts 01–03)
- จากนั้นใช้ prompts/04-synthesize-decisions.md

ถ้า Teams ล่มบน Windows: กลับไป Subagents ทีละตัว — ยังผ่าน Lab ได้
ห้ามบังคับ tmux
```
