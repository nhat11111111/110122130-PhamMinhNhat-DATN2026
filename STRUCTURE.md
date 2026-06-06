# 📁 CẤUTRUCTHƯ MỤC - VINH LONG TOURIST SYSTEM

## Cấu Trúc Dự Án 

```
vinhlong-food-reco/
├── src/
│   ├── backend/                    # Backend - API & Business Logic
│   │   ├── app/
│   │   │   ├── Http/
│   │   │   │   ├── Controllers/    # API Controllers
│   │   │   │   └── Middleware/     # HTTP Middleware
│   │   │   ├── Models/             # Database Models
│   │   │   ├── Services/           # Business Logic Services
│   │   │   ├── Providers/          # Service Providers
│   │   │   └── Database.php        # Database Helper
│   │   ├── config/                 # Configuration Files
│   │   ├── database/               # Database Schema & Migrations
│   │   │   ├── migrations/
│   │   │   ├── seeders/
│   │   │   └── schema.sql
│   │   ├── routes/                 # API Routes
│   │   ├── middleware/             # Custom Middleware
│   │   └── tests/                  # Backend Tests
│   │
│   └── frontend/                   # Frontend - UI & Client
│       ├── api/                    # API Client Code
│       ├── components/             # Reusable Components
│       ├── pages/                  # Page Components
│       ├── assets/
│       │   ├── css/                # Stylesheets
│       │   ├── js/                 # JavaScript Files
│       │   └── images/             # Images & Media
│       ├── utils/                  # Utility Functions
│       └── views/                  # Template Views
│
├── public/                         # Web Root
│   ├── index.php                   # Entry Point
│   ├── api.php                     # API Entry Point
│   ├── css/                        # Compiled Styles
│   ├── js/                         # Compiled Scripts
│   └── images/                     # Public Images
│
├── tests/                          # Tests
│   ├── unit/                       # Unit Tests
│   └── feature/                    # Feature Tests
│
├── bootstrap/                      # Bootstrap Files
├── storage/                        # Storage (Logs, Cache, Uploads)
├── vendor/                         # Composer Dependencies
├── docs/                           # Documentation
│
├── .env                            # Environment Variables
├── .env.example                    # Environment Template
├── composer.json                   # PHP Dependencies
├── package.json                    # NPM Dependencies
├── phpunit.xml                     # PHPUnit Configuration
├── vite.config.js                  # Vite Configuration
├── artisan                         # Laravel Artisan CLI
│
└── README.md, INSTALLATION.md, etc.

```

## 📋 Mô Tả Từng Thư Mục

| Thư Mục | Mô Tả |
|---------|-------|
| `src/backend/app/` | Ứng dụng backend chính |
| `src/backend/config/` | Tệp cấu hình ứng dụng |
| `src/backend/database/` | Schema và seeder dữ liệu |
| `src/backend/routes/` | Định nghĩa các routes API |
| `src/frontend/components/` | Các component UI tái sử dụng |
| `src/frontend/pages/` | Các trang chính |
| `src/frontend/assets/` | CSS, JS, hình ảnh |
| `public/` | Web root - những file công khai |
| `tests/` | Unit tests và feature tests |
| `docs/` | Tài liệu dự án |



