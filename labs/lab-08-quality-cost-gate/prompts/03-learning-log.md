# Prompt — บันทึก learning-log (Lab 08)

วางใน TUI (OpenCode · agent `qa`) หลัง gate PASS — หรือใช้กับ CLI:

```text
Append "## Lab 08" to workspace/learning-log.md.
Record that quality gate went FAIL then PASS within max 2 refinement rounds.
State clearly: if a 3rd round is needed, ask a human (do not auto-fix forever).
Short Thai. Only edit workspace/learning-log.md.
Do not use --agent specialist.
```

> [`02-fix-and-recheck.md`](02-fix-and-recheck.md) ก็สั่งอัป learning-log แล้ว — ใช้ไฟล์นี้ถ้าต้องการรอบแยกเฉพาะ log
