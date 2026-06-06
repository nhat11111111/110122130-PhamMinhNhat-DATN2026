# 🍽️ Vĩnh Long Food Recommendation Website

Website giới thiệu và tìm kiếm quán ăn, nhà hàng ở Vĩnh Long với bản đồ tương tác.

## 📋 Yêu Cầu Tiên Quyết

- **PHP** 8.0 trở lên
- **MySQL** 5.7+ hoặc **MariaDB**
- **XAMPP** hoặc **WAMP** (để chạy Apache + MySQL + PHP)

## 🚀 Hướng Dẫn Chạy Website

### Bước 1: Chuẩn Bị Môi Trường

#### Khởi động XAMPP
- Mở XAMPP Control Panel
- Start **Apache** module
- Start **MySQL** module

#### Tạo Database
```bash
# Mở MySQL Command Line Client hoặc Terminal
mysql -u root -p
```

Sau đó chạy lệnh SQL:
```sql
CREATE DATABASE vinh_long_tourist CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE vinh_long_tourist;
SOURCE database/vinh-long-tourist.sql;
EXIT;
```

> **Ghi chú:** Nếu MySQL không có password, bỏ qua `password` hoặc nhấn Enter

### Bước 2: Cấu Hình .env

```bash
# Sao chép file cấu hình template
cp .env.example .env
```

Mở file `.env` và cập nhật:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=vinh_long_tourist
DB_USERNAME=root
DB_PASSWORD=
```

### Bước 3: Chạy PHP Development Server

Mở Command Prompt/PowerShell tại thư mục dự án:

```bash
php -S localhost:8000 -t public/
```

Output mong đợi:
```
Development Server (http://127.0.0.1:8000)
Press Ctrl-C to quit.
```

### Bước 4: Truy Cập Website

Mở trình duyệt web và truy cập:
```
http://localhost:8000
```

## 🎯 Tính Năng Chính

- ✅ Trang chủ với bản đồ Vĩnh Long
- ✅ Danh sách quán ăn, nhà hàng
- ✅ Tìm kiếm và lọc theo danh mục
- ✅ API để lấy dữ liệu

## 🔌 Test API

```bash
# Lấy tất cả quán ăn
curl http://localhost:8000/api/listings

# Lấy danh mục
curl http://localhost:8000/api/categories

# Kiểm tra trạng thái API
curl http://localhost:8000/api/status
```

## 📁 Cấu Trúc Thư Mục

```
vinhlong-food-reco/
├── public/                    ← Root folder
│   ├── index.html            ← Trang chủ
│   ├── api.php               ← API routes
│   ├── css/
│   │   ├── app.css
│   │   └── print.css
│   └── js/
│       ├── app.js
│       └── map-helper.js     ← Google Maps helper
├── src/
│   ├── backend/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   └── frontend/
│       ├── components/
│       ├── pages/
│       └── utils/
├── database/
│   └── vinh-long-tourist.sql ← SQL schema
├── .env.example              ← Cấu hình template
├── .env                      ← Cấu hình thực tế (không commit)
└── README.md
```

## 🛠️ Lệnh Hữu Ích

| Lệnh | Mô Tả |
|------|-------|
| `php -S localhost:8000 -t public/` | Chạy web server trên port 8000 |
| `php -S localhost:3000 -t public/` | Chạy web server trên port 3000 |


## 🐛 Xử Lý Lỗi Thường Gặp

### "Can't connect to MySQL server"
- Kiểm tra MySQL đã start trong XAMPP
- Kiểm tra DB_HOST, DB_USERNAME, DB_PASSWORD trong .env

### "No such file or directory: database/vinh-long-tourist.sql"
- Kiểm tra file SQL tồn tại trong thư mục `database/`
- Chạy lệnh SQL từ đúng thư mục dự án

### Port 8000 đã được sử dụng
- Dùng port khác: `php -S localhost:3000 -t public/`

## 📱 Ghi Chú

- Frontend: HTML5 + CSS3 + Vanilla JavaScript
- Backend: PHP với Database MySQL
- Maps: Google Maps API
- Responsive Design cho mobile, tablet, desktop

## 👨‍💻 Tác Giả

**Phạm Minh Nhật** - Khóa luận tốt nghiệp


## ⚡ Cách Chạy Website
**Đầu tiên mở terminal trong thư mục chứa code, sau đó chạy lệnh sau**  
 php -S localhost:8000 -t public

## ✨ Hoàn Thành!

Website bây giờ đang chạy tại localhost:8000! 🎉

---
**💡 Tip:** Dùng Ctrl+C để dừng server.

**🔄 Reload page** nếu cập nhật chức năng.


