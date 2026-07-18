# Mock Data

ข้อมูลชุดนี้เป็นข้อมูลจำลองเพื่อให้ Lab ทำซ้ำได้ทุกคนและไม่ติด API key/quota ใช้ `source_mode: mock` ใน output เสมอ ห้ามนำข้อมูลจำลองไปแสดงต่อผู้ใช้เสมือนเป็นข้อมูลยืนยันจริง

path จาก root ของ repository: `shared/mock-data/`

ไฟล์หลักคือ `activities.json`, `dining-options.json`, `travel-times.json` และ `souvenir-stops.json` ทุกสถานที่มี id และเวลาที่ใช้เดินทางเป็นนาที

ผู้เรียนระดับสูงอาจเรียก API เสริมได้ แต่ต้องเก็บผลลัพธ์เป็น cache ใน `shared/mock-data/external-cache/` พร้อม `source`, `retrieved_at` และ `confidence` และยังต้องให้ workflow ทำงานได้เมื่อ API ล้มเหลว