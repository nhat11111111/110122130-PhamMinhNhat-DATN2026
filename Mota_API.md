# 📋 Mô Tả API - Vĩnh Long Food Recommendation Website

## 📌 Tổng Quan

Tài liệu này mô tả chi tiết tất cả các API endpoints của website giới thiệu và tìm kiếm quán ăn, nhà hàng tại Vĩnh Long.

**Base URL:** `http://localhost:8000/api`

**Phương pháp xác thực:** Hiện tại API không yêu cầu token (mở rộng sau)

---

## 🔐 USERS API - Quản Lý Tài Khoản

### 1. Lấy Danh Sách Tất Cả Người Dùng
- **Endpoint:** `GET /api/users`
- **Mô tả:** Lấy danh sách tất cả người dùng trong hệ thống
- **Phương thức:** GET
- **Parameters:** Không
- **Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Admin User",
      "email": "admin@example.com",
      "username": "admin",
      "phone": "0123456789",
      "role": "admin",
      "status": "active",
      "created_at": "2026-05-26T10:00:00Z",
      "updated_at": "2026-05-26T10:00:00Z"
    }
  ],
  "count": 1
}
```

### 2. Tạo Người Dùng Mới
- **Endpoint:** `POST /api/users`
- **Mô tả:** Tạo một tài khoản người dùng mới
- **Phương thức:** POST
- **Request Body:**
```json
{
  "name": "Nguyễn Văn A",
  "email": "user@example.com",
  "username": "user123",
  "phone": "0987654321",
  "password": "password123",
  "role": "user",
  "status": "active"
}
```
- **Validation:**
  - `name`: Bắt buộc, string, tối đa 255 ký tự
  - `email`: Bắt buộc, email hợp lệ, duy nhất
  - `username`: Bắt buộc, string, duy nhất, tối đa 255 ký tự
  - `phone`: Tùy chọn, string, tối đa 20 ký tự
  - `password`: Bắt buộc, string, tối thiểu 6 ký tự
  - `role`: Bắt buộc, giá trị: `user`, `admin`, `moderator`
  - `status`: Bắt buộc, giá trị: `active`, `inactive`
- **Response (201):**
```json
{
  "success": true,
  "message": "Tạo người dùng thành công",
  "data": {
    "id": 2,
    "name": "Nguyễn Văn A",
    "email": "user@example.com",
    "username": "user123",
    "phone": "0987654321",
    "role": "user",
    "status": "active",
    "created_at": "2026-05-26T10:00:00Z",
    "updated_at": "2026-05-26T10:00:00Z"
  }
}
```

### 3. Lấy Chi Tiết Một Người Dùng
- **Endpoint:** `GET /api/users/{id}`
- **Mô tả:** Lấy thông tin chi tiết của một người dùng theo ID
- **Phương thức:** GET
- **Parameters:**
  - `id` (URL): ID người dùng (bắt buộc)
- **Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Admin User",
    "email": "admin@example.com",
    "username": "admin",
    "phone": "0123456789",
    "role": "admin",
    "status": "active",
    "created_at": "2026-05-26T10:00:00Z",
    "updated_at": "2026-05-26T10:00:00Z"
  }
}
```

### 4. Cập Nhật Người Dùng
- **Endpoint:** `PUT /api/users/{id}`
- **Mô tả:** Cập nhật thông tin của một người dùng
- **Phương thức:** PUT
- **Parameters:**
  - `id` (URL): ID người dùng (bắt buộc)
- **Request Body:** (Tất cả trường tùy chọn)
```json
{
  "name": "Tên Mới",
  "email": "newemail@example.com",
  "username": "newusername",
  "phone": "0999999999",
  "password": "newpassword123",
  "role": "moderator",
  "status": "inactive"
}
```
- **Response (200):**
```json
{
  "success": true,
  "message": "Cập nhật người dùng thành công",
  "data": {
    "id": 1,
    "name": "Tên Mới",
    "email": "newemail@example.com",
    "username": "newusername",
    "phone": "0999999999",
    "role": "moderator",
    "status": "inactive"
  }
}
```

### 5. Xóa Người Dùng
- **Endpoint:** `DELETE /api/users/{id}`
- **Mô tả:** Xóa một người dùng khỏi hệ thống
- **Phương thức:** DELETE
- **Parameters:**
  - `id` (URL): ID người dùng (bắt buộc)
- **Response (200):**
```json
{
  "success": true,
  "message": "Xóa người dùng thành công"
}
```

---

## 📂 CATEGORIES API - Quản Lý Danh Mục

### 1. Lấy Danh Sách Tất Cả Danh Mục
- **Endpoint:** `GET /api/categories`
- **Mô tả:** Lấy danh sách tất cả danh mục (quán ăn, khách sạn, v.v.)
- **Phương thức:** GET
- **Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Cơm Tấm",
      "description": "Cơm tấm các loại",
      "icon": "fas fa-bowl-rice",
      "status": "active",
      "created_at": "2026-05-26T10:00:00Z",
      "updated_at": "2026-05-26T10:00:00Z"
    }
  ],
  "count": 1
}
```

### 2. Tạo Danh Mục Mới
- **Endpoint:** `POST /api/categories`
- **Mô tả:** Tạo một danh mục mới
- **Request Body:**
```json
{
  "name": "Quán Cà Phê",
  "description": "Các quán cà phê tại Vĩnh Long",
  "icon": "fas fa-mug-hot",
  "status": "active"
}
```
- **Response (201):**
```json
{
  "success": true,
  "message": "Tạo danh mục thành công",
  "data": {
    "id": 2,
    "name": "Quán Cà Phê",
    "description": "Các quán cà phê tại Vĩnh Long",
    "icon": "fas fa-mug-hot",
    "status": "active"
  }
}
```

### 3. Lấy Chi Tiết Danh Mục
- **Endpoint:** `GET /api/categories/{id}`
- **Mô tả:** Lấy thông tin chi tiết một danh mục
- **Response (200):** Trả về thông tin danh mục

### 4. Cập Nhật Danh Mục
- **Endpoint:** `PUT /api/categories/{id}`
- **Mô tả:** Cập nhật thông tin danh mục
- **Response (200):** Trả về danh mục đã cập nhật

### 5. Xóa Danh Mục
- **Endpoint:** `DELETE /api/categories/{id}`
- **Mô tả:** Xóa một danh mục
- **Response (200):** Xác nhận xóa thành công

---

## 🍽️ PLACES API - Quản Lý Quán Ăn / Địa Điểm

### 1. Lấy Danh Sách Quán Ăn
- **Endpoint:** `GET /api/places`
- **Mô tả:** Lấy danh sách tất cả quán ăn, hỗ trợ filter
- **Query Parameters:**
  - `category_id` (tùy chọn): Lọc theo danh mục
  - `search` (tùy chọn): Tìm kiếm theo tên hoặc mô tả
- **Example:** `GET /api/places?category_id=1&search=cơm`
- **Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Quán Cơm Tấm Hoa Mai",
      "description": "Cơm tấm nướng ngon, giá rẻ",
      "category_id": 1,
      "address": "123 Đường Tương Tư, TP. Vĩnh Long",
      "latitude": 10.2672,
      "longitude": 106.1674,
      "phone": "0123456789",
      "email": "contact@comdai.vn",
      "website": "https://comdai.vn",
      "image": "https://example.com/image.jpg",
      "rating": 4.5,
      "status": "active"
    }
  ],
  "count": 1
}
```

### 2. Tạo Quán Ăn Mới
- **Endpoint:** `POST /api/places`
- **Request Body:**
```json
{
  "name": "Quán Cơm Tấm Hoa Mai",
  "description": "Cơm tấm nướng ngon, giá rẻ",
  "category_id": 1,
  "address": "123 Đường Tương Tư, TP. Vĩnh Long",
  "latitude": 10.2672,
  "longitude": 106.1674,
  "phone": "0123456789",
  "email": "contact@comdai.vn",
  "website": "https://comdai.vn",
  "image": "https://example.com/image.jpg",
  "rating": 4.5,
  "status": "active"
}
```
- **Response (201):** Trả về quán ăn vừa tạo

### 3. Lấy Chi Tiết Quán Ăn
- **Endpoint:** `GET /api/places/{id}`
- **Response (200):** Thông tin chi tiết quán ăn

### 4. Cập Nhật Quán Ăn
- **Endpoint:** `PUT /api/places/{id}`
- **Request Body:** (Tất cả trường tùy chọn)
- **Response (200):** Quán ăn đã cập nhật

### 5. Xóa Quán Ăn
- **Endpoint:** `DELETE /api/places/{id}`
- **Response (200):** Xác nhận xóa thành công

---

## 📰 ARTICLES API - Quản Lý Tin Tức / Bài Viết

### 1. Lấy Danh Sách Bài Viết
- **Endpoint:** `GET /api/articles`
- **Query Parameters:**
  - `category_id` (tùy chọn): Lọc theo danh mục
  - `search` (tùy chọn): Tìm kiếm theo tiêu đề hoặc nội dung
  - `status` (tùy chọn): Lọc theo trạng thái (draft, published, archived)
- **Example:** `GET /api/articles?category_id=1&status=published`
- **Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Những Quán Cơm Tấm Ngon Nhất Vĩnh Long",
      "content": "Bài viết về các quán cơm tấm...",
      "author_id": 1,
      "category_id": 1,
      "image": "https://example.com/image.jpg",
      "slug": "those-quan-com-tam-ngon-nhat-vinh-long",
      "status": "published",
      "views": 150,
      "created_at": "2026-05-26T10:00:00Z",
      "updated_at": "2026-05-26T10:00:00Z"
    }
  ],
  "count": 1
}
```

### 2. Tạo Bài Viết Mới
- **Endpoint:** `POST /api/articles`
- **Request Body:**
```json
{
  "title": "Những Quán Cơm Tấm Ngon Nhất Vĩnh Long",
  "content": "Bài viết về các quán cơm tấm...",
  "author_id": 1,
  "category_id": 1,
  "image": "https://example.com/image.jpg",
  "slug": "those-quan-com-tam-ngon-nhat-vinh-long",
  "status": "published"
}
```
- **Response (201):** Bài viết vừa tạo

### 3. Lấy Chi Tiết Bài Viết
- **Endpoint:** `GET /api/articles/{id}`
- **Mô tả:** Lấy bài viết và tăng view count
- **Response (200):** Thông tin bài viết

### 4. Cập Nhật Bài Viết
- **Endpoint:** `PUT /api/articles/{id}`
- **Response (200):** Bài viết đã cập nhật

### 5. Xóa Bài Viết
- **Endpoint:** `DELETE /api/articles/{id}`
- **Response (200):** Xác nhận xóa thành công

---

## 🏨 ACCOMMODATIONS API - Quản Lý Khách Sạn / Lưu Trú

### 1. Lấy Danh Sách Khách Sạn
- **Endpoint:** `GET /api/accommodations`
- **Query Parameters:**
  - `category_id` (tùy chọn): Lọc theo loại lưu trú
  - `search` (tùy chọn): Tìm kiếm theo tên hoặc mô tả
  - `min_price` (tùy chọn): Giá tối thiểu
  - `max_price` (tùy chọn): Giá tối đa
  - `min_rating` (tùy chọn): Xếp hạng tối thiểu
- **Example:** `GET /api/accommodations?min_price=100000&max_price=1000000&min_rating=3`
- **Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Khách Sạn ABC",
      "description": "Khách sạn 3 sao tại Vĩnh Long",
      "category_id": 1,
      "address": "456 Đường Nguyễn Huệ, TP. Vĩnh Long",
      "latitude": 10.2700,
      "longitude": 106.1700,
      "phone": "0234567890",
      "email": "hotel@abc.vn",
      "website": "https://abc-hotel.vn",
      "image": "https://example.com/hotel.jpg",
      "rating": 4.2,
      "price_per_night": 500000,
      "rooms": 50,
      "status": "active"
    }
  ],
  "count": 1
}
```

### 2. Tạo Khách Sạn Mới
- **Endpoint:** `POST /api/accommodations`
- **Request Body:**
```json
{
  "name": "Khách Sạn ABC",
  "description": "Khách sạn 3 sao tại Vĩnh Long",
  "category_id": 1,
  "address": "456 Đường Nguyễn Huệ, TP. Vĩnh Long",
  "latitude": 10.2700,
  "longitude": 106.1700,
  "phone": "0234567890",
  "email": "hotel@abc.vn",
  "website": "https://abc-hotel.vn",
  "image": "https://example.com/hotel.jpg",
  "rating": 4.2,
  "price_per_night": 500000,
  "rooms": 50,
  "status": "active"
}
```
- **Response (201):** Khách sạn vừa tạo

### 3. Lấy Chi Tiết Khách Sạn
- **Endpoint:** `GET /api/accommodations/{id}`
- **Response (200):** Thông tin chi tiết khách sạn

### 4. Cập Nhật Khách Sạn
- **Endpoint:** `PUT /api/accommodations/{id}`
- **Response (200):** Khách sạn đã cập nhật

### 5. Xóa Khách Sạn
- **Endpoint:** `DELETE /api/accommodations/{id}`
- **Response (200):** Xác nhận xóa thành công

---

## ✅ HEALTH CHECK API

### Kiểm Tra Trạng Thái API
- **Endpoint:** `GET /api/health`
- **Mô tả:** Kiểm tra xem API đang hoạt động hay không
- **Response (200):**
```json
{
  "success": true,
  "message": "API đang hoạt động bình thường",
  "status": "online",
  "timestamp": "2026-05-26T10:00:00Z"
}
```

---

## 🧪 Hướng Dẫn Test API

### Sử dụng cURL (Command Line)

```bash
# Test Health Check
curl http://localhost:8000/api/health

# Lấy danh sách người dùng
curl http://localhost:8000/api/users

# Tạo người dùng mới
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Nguyễn Văn A",
    "email": "user@example.com",
    "username": "user123",
    "password": "password123",
    "role": "user",
    "status": "active"
  }'

# Lấy danh mục
curl http://localhost:8000/api/categories

# Lấy quán ăn theo danh mục
curl "http://localhost:8000/api/places?category_id=1&search=cơm"

# Cập nhật người dùng
curl -X PUT http://localhost:8000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tên Mới",
    "status": "inactive"
  }'

# Xóa người dùng
curl -X DELETE http://localhost:8000/api/users/1
```

### Sử dụng Postman

1. Nhập URL: `http://localhost:8000/api/users`
2. Chọn phương thức: GET, POST, PUT, DELETE
3. Tab "Body" → Raw → JSON
4. Nhập dữ liệu JSON
5. Click "Send"

---

## 📊 Status Codes

| Mã | Ý Nghĩa | Mô Tả |
|---|---|---|
| 200 | OK | Yêu cầu thành công |
| 201 | Created | Tài nguyên được tạo thành công |
| 400 | Bad Request | Yêu cầu không hợp lệ |
| 404 | Not Found | Tài nguyên không tồn tại |
| 422 | Unprocessable Entity | Lỗi xác thực dữ liệu |
| 500 | Internal Server Error | Lỗi máy chủ |

---

## 🔄 Lưu Ý Quan Trọng

1. **CORS:** Nếu API bị chặn bởi CORS, cần cấu hình middleware CORS trong Laravel
2. **Authentication:** Sau này sẽ thêm JWT hoặc token-based authentication
3. **Rate Limiting:** Nên thêm rate limiting để bảo vệ API
4. **Validation:** Tất cả dữ liệu đầu vào đều được xác thực trên server
5. **Password:** Luôn được hash bằng bcrypt
6. **Error Handling:** Tất cả lỗi đều trả về JSON response với `success: false`

---

## 📁 Cấu Trúc Thư Mục API

```
src/backend/
├── api/                          (Thư mục API)
├── controllers/
│   ├── UserController.php        ← API Users
│   ├── PlaceController.php       ← API Places
│   ├── CategoryController.php    ← API Categories
│   ├── ArticleController.php     ← API Articles
│   └── AccommodationController.php ← API Accommodations
├── models/
│   ├── User.php
│   ├── Place.php
│   ├── Category.php
│   ├── Article.php
│   └── Accommodation.php
└── routes/
    ├── web.php                   ← Web routes
    └── api.php                   ← API routes
```

---

## 🎯 Các Tính Năng API

✅ **GET requests** - Lấy dữ liệu  
✅ **POST requests** - Tạo dữ liệu mới  
✅ **PUT requests** - Cập nhật dữ liệu  
✅ **DELETE requests** - Xóa dữ liệu  
✅ **Search & Filter** - Tìm kiếm và lọc dữ liệu  
✅ **Validation** - Xác thực dữ liệu đầu vào  
✅ **Error Handling** - Xử lý lỗi toàn diện  
✅ **JSON Response** - Trả về JSON format  

---

## 🚀 Tiếp Theo (Mở Rộng)

- [ ] Thêm authentication (JWT tokens)
- [ ] Rate limiting
- [ ] CORS configuration
- [ ] Pagination
- [ ] Sorting
- [ ] Advanced filtering
- [ ] API versioning
- [ ] API documentation (Swagger/OpenAPI)

---

**Cập nhật lần cuối:** 26/05/2026  
**Phiên bản API:** 1.0.0
