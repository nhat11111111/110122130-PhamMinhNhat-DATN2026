<?php

use App\Http\Controllers\PlaceController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AccommodationController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PlaceController::class, 'index'])->name('places.index');
Route::get('/places/{place}', [PlaceController::class, 'show'])->name('places.show');
Route::get('/recommend', [PlaceController::class, 'recommend'])->name('places.recommend');
Route::get('/api/places', [PlaceController::class, 'apiPlaces'])->name('places.api');

// Articles (News) routes
Route::get('/tin-tuc', [ArticleController::class, 'index'])->name('articles.index');
Route::get('/tin-tuc/{article}', [ArticleController::class, 'show'])->name('articles.show');

// Accommodations (Stay) routes
Route::get('/luu-tru', [AccommodationController::class, 'index'])->name('accommodations.index');
Route::get('/luu-tru/{accommodation}', [AccommodationController::class, 'show'])->name('accommodations.show');
