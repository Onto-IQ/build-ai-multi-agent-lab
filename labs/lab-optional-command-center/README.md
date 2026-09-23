# Lab ทางเลือก — Command Center (จอรวม)

**ไม่บังคับ · ไม่ใช่เกณฑ์ผ่าน Lab ใด**

## จุดประสงค์

จอ observability บาง ๆ อ่านสถานะ git/PR/session — **ไม่ใช่สินค้า**

## วิ่ง

จาก root lab repo:

```powershell
cd apps/command-center
npm install
npm run dev
```

ปรับให้ชี้ไปที่ path ของ repo สินค้าผู้เรียนถ้าจำเป็น (ดู README ใน `apps/command-center`)

## สิ่งที่ต้องจำ

- สินค้าจริง = Actual/course PRs + URL
- อย่าติ๊กเกณฑ์ผ่าน Lab จากจอนี้
- อย่าสร้างชั้น orchestration ใหม่ใน Command Center
