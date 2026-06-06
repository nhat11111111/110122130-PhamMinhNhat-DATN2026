<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\PlaceController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\AccommodationController;
use App\Http\Controllers\Api\SearchController;

// Serve static HTML from public folder
Route::get('/', function () {
    return view('welcome');
});

// ===== API ROUTES (RESTful) =====
Route::prefix('api')->group(function () {
    
    // ===== USERS (Quản lý Tài khoản) =====
    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::post('/', [UserController::class, 'store']);
        Route::get('/{id}', [UserController::class, 'show']);
        Route::put('/{id}', [UserController::class, 'update']);
        Route::delete('/{id}', [UserController::class, 'destroy']);
    });

    // ===== CATEGORIES (Danh mục) =====
    Route::prefix('categories')->group(function () {
        Route::get('/', [CategoryController::class, 'index']);
        Route::post('/', [CategoryController::class, 'store']);
        Route::get('/{id}', [CategoryController::class, 'show']);
        Route::put('/{id}', [CategoryController::class, 'update']);
        Route::delete('/{id}', [CategoryController::class, 'destroy']);
    });

    // ===== PLACES (Quán ăn / Địa điểm) =====
    Route::prefix('places')->group(function () {
        Route::get('/', [PlaceController::class, 'index']);
        Route::post('/', [PlaceController::class, 'store']);
        Route::get('/{id}', [PlaceController::class, 'show']);
        Route::put('/{id}', [PlaceController::class, 'update']);
        Route::delete('/{id}', [PlaceController::class, 'destroy']);
    });

    // ===== ARTICLES (Tin tức / Bài viết) =====
    Route::prefix('articles')->group(function () {
        Route::get('/', [ArticleController::class, 'index']);
        Route::post('/', [ArticleController::class, 'store']);
        Route::get('/{id}', [ArticleController::class, 'show']);
        Route::put('/{id}', [ArticleController::class, 'update']);
        Route::delete('/{id}', [ArticleController::class, 'destroy']);
    });

    // ===== ACCOMMODATIONS (Lưu trú / Khách sạn) =====
    Route::prefix('accommodations')->group(function () {
        Route::get('/', [AccommodationController::class, 'index']);
        Route::post('/', [AccommodationController::class, 'store']);
        Route::get('/{id}', [AccommodationController::class, 'show']);
        Route::put('/{id}', [AccommodationController::class, 'update']);
        Route::delete('/{id}', [AccommodationController::class, 'destroy']);
    });

    // ===== SEARCH (Tìm kiếm) =====
    Route::get('/search', [SearchController::class, 'search']);

    // ===== HEALTH CHECK =====
    Route::get('/health', function () {
        return response()->json([
            'success' => true,
            'message' => 'API đang hoạt động bình thường',
            'status' => 'online',
            'timestamp' => now()
        ]);
    });
});

