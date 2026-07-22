# Prompt / คำสั่ง — Deploy Hostinger (Lab 11 · ผู้เรียน)

วิทยากรเตรียม DNS + user บน VPS ไว้แล้ว — คุณไม่ต้องสร้าง user หรือตั้ง DNS

แทนที่ `learnerNN` ด้วย slot ของคุณ (`learner01` … `learner07`)  
รันจาก **root ของ repo** บน PowerShell

## 1) สร้าง SSH key (ครั้งแรก)

```powershell
ssh-keygen -t ed25519 -f $env:USERPROFILE\.ssh\id_ed25519 -N ([string]::Empty) -C "learnerNN-hostinger-lab"
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub
```

ส่งบรรทัด `.pub` ให้วิทยากร → รอให้ใส่ใน `authorized_keys` ของ slot คุณ แล้วค่อยขั้นถัดไป

## 2) ทดสอบ SSH

```powershell
ssh learnerNN@srv1801939.hstgr.cloud
# หรือ
ssh learnerNN@187.127.123.173
```

## 3) อัปแผงขึ้น Hostinger

อัปทั้ง `frontend/` + `backend/` (อย่าอัปแค่ frontend)

```powershell
scp -r apps/sample-dashboard/* learnerNN@srv1801939.hstgr.cloud:/var/www/learnerNN/
ssh learnerNN@srv1801939.hstgr.cloud "chmod 755 /var/www/learnerNN /var/www/learnerNN/frontend /var/www/learnerNN/backend; find /var/www/learnerNN -type f -exec chmod 644 {} \;"
```

## 4) ตรวจ URL สาธารณะ

```powershell
curl.exe -sI http://learnerNN.9expert.online/
```

ต้องได้ `302` ไป `/frontend/` หรือเปิดเบราว์เซอร์แล้วเห็น Agent Cost Board

`public_url` ที่ใช้ในสัญญา: `http://learnerNN.9expert.online/`

## 5) หลังมี URL จริง — เขียนสัญญา

วาง [`01-capstone-ship.md`](01-capstone-ship.md) ใน Claude (หรือใช้ CLI ใน Lab 11 README ทาง B2)
