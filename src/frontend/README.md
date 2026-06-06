# Frontend Structure

## 📁 Thư mục Frontend

Cấu trúc tổ chức mã frontend cho dự án Vĩnh Long Tourist:

```
src/frontend/
├── api/              # API client services
├── assets/           # Tài nguyên tĩnh (ảnh, fonts, etc.)
├── components/       # Reusable UI components
├── pages/            # Page-specific logic
├── resources/        # CSS, JavaScript files
│   ├── css/          # Stylesheet files
│   └── js/           # JavaScript modules
├── utils/            # Utility functions and helpers
└── README.md         # Tài liệu frontend
```

## 📝 Mô tả từng thư mục

### api/
Chứa các module để gọi API backend:
- `locations.js` - API calls cho danh sách địa điểm
- `posts.js` - API calls cho tin tức
- `users.js` - API calls cho xác thực người dùng

### assets/
Tài nguyên tĩnh của ứng dụng:
- Hình ảnh (PNG, JPG, SVG)
- Font chữ
- Icons

### components/
Các thành phần UI có thể tái sử dụng:
- Header
- Footer  
- Navigation
- LocationCard
- etc.

### pages/
Logic riêng cho từng trang:
- HomePage
- NewsPage
- LocationDetailPage
- etc.

### resources/css/
File stylesheet:
- `variables.css` - Biến CSS (màu, kích thước, etc.)
- `components.css` - Styles cho components
- `pages.css` - Styles cho pages
- `responsive.css` - Media queries

### resources/js/
Module JavaScript:
- `app.js` - Entry point
- `router.js` - Routing logic
- `handlers.js` - Event handlers
- `state.js` - State management

### utils/
Hàm tiện ích:
- `helpers.js` - Hàm helper
- `validators.js` - Validation functions
- `formatters.js` - Data formatting
- `constants.js` - Constants

## 🔗 Liên kết với public/

Frontend source code nằm ở `src/frontend/` nhưng:
- **Development**: Các file sẽ được import/sử dụng từ `src/frontend/`
- **Production**: Build process sẽ output files vào `public/` để serve

### Hiện tại:
- `public/index.html` - Main HTML file
- `public/js/app.js` - JavaScript logic
- `public/css/app.css` - Stylesheet

Có thể copy/reference files từ `src/frontend/` vào `public/` nếu cần.
