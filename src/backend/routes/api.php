<?php

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\PlaceController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\AccommodationController;
use Illuminate\Support\Facades\Route;

// API Routes - Tất cả các API endpoints đều bắt đầu với /api

// ===== USERS (Quản lý Tài khoản) =====
Route::prefix('users')->group(function () {
    // GET /api/users - Lấy danh sách tất cả người dùng
    Route::get('/', [UserController::class, 'index']);
    
    // POST /api/users - Tạo người dùng mới
    Route::post('/', [UserController::class, 'store']);
    
    // GET /api/users/{id} - Lấy chi tiết một người dùng
    Route::get('/{id}', [UserController::class, 'show']);
    
    // PUT /api/users/{id} - Cập nhật người dùng
    Route::put('/{id}', [UserController::class, 'update']);
    
    // DELETE /api/users/{id} - Xóa người dùng
    Route::delete('/{id}', [UserController::class, 'destroy']);
});

// ===== CATEGORIES (Danh mục) =====
Route::prefix('categories')->group(function () {
    // GET /api/categories - Lấy danh sách tất cả danh mục
    Route::get('/', [CategoryController::class, 'index']);
    
    // POST /api/categories - Tạo danh mục mới
    Route::post('/', [CategoryController::class, 'store']);
    
    // GET /api/categories/{id} - Lấy chi tiết danh mục
    Route::get('/{id}', [CategoryController::class, 'show']);
    
    // PUT /api/categories/{id} - Cập nhật danh mục
    Route::put('/{id}', [CategoryController::class, 'update']);
    
    // DELETE /api/categories/{id} - Xóa danh mục
    Route::delete('/{id}', [CategoryController::class, 'destroy']);
});

// ===== PLACES (Quán ăn / Địa điểm) =====
Route::prefix('places')->group(function () {
    // GET /api/places - Lấy danh sách tất cả quán ăn (hỗ trợ filter theo category_id, search)
    Route::get('/', [PlaceController::class, 'index']);
    
    // POST /api/places - Tạo quán ăn mới
    Route::post('/', [PlaceController::class, 'store']);
    
    // GET /api/places/{id} - Lấy chi tiết một quán ăn
    Route::get('/{id}', [PlaceController::class, 'show']);
    
    // PUT /api/places/{id} - Cập nhật quán ăn
    Route::put('/{id}', [PlaceController::class, 'update']);
    
    // DELETE /api/places/{id} - Xóa quán ăn
    Route::delete('/{id}', [PlaceController::class, 'destroy']);
});

// ===== ARTICLES (Tin tức / Bài viết) =====
Route::prefix('articles')->group(function () {
    // GET /api/articles - Lấy danh sách tất cả bài viết (hỗ trợ filter theo category_id, search, status)
    Route::get('/', [ArticleController::class, 'index']);
    
    // POST /api/articles - Tạo bài viết mới
    Route::post('/', [ArticleController::class, 'store']);
    
    // GET /api/articles/{id} - Lấy chi tiết bài viết
    Route::get('/{id}', [ArticleController::class, 'show']);
    
    // PUT /api/articles/{id} - Cập nhật bài viết
    Route::put('/{id}', [ArticleController::class, 'update']);
    
    // DELETE /api/articles/{id} - Xóa bài viết
    Route::delete('/{id}', [ArticleController::class, 'destroy']);
});

// ===== ACCOMMODATIONS (Lưu trú / Khách sạn) =====
Route::prefix('accommodations')->group(function () {
    // GET /api/accommodations - Lấy danh sách tất cả khách sạn (hỗ trợ filter theo category_id, search, giá, rating)
    Route::get('/', [AccommodationController::class, 'index']);
    
    // POST /api/accommodations - Tạo khách sạn mới
    Route::post('/', [AccommodationController::class, 'store']);
    
    // GET /api/accommodations/{id} - Lấy chi tiết khách sạn
    Route::get('/{id}', [AccommodationController::class, 'show']);
    
    // PUT /api/accommodations/{id} - Cập nhật khách sạn
    Route::put('/{id}', [AccommodationController::class, 'update']);
    
    // DELETE /api/accommodations/{id} - Xóa khách sạn
    Route::delete('/{id}', [AccommodationController::class, 'destroy']);
});

// ===== HEALTH CHECK =====
// GET /api/health - Kiểm tra trạng thái API
Route::get('/health', function () {
    return response()->json([
        'success' => true,
        'message' => 'API đang hoạt động bình thường',
        'status' => 'online',
        'timestamp' => now()
    ]);
});
