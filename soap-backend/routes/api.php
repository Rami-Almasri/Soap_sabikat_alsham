<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::controller(CategoryController::class)->prefix('categories')->group(function () {
    Route::get('/', 'index');
    Route::post('/', 'store');
    Route::get('/show/{category}', 'show');
    Route::put('/update/{category}', 'update');
    Route::delete('/destroy/{category}', 'destroy');
    Route::get('/everything', 'categorywithproduct');
});

Route::controller(ProductController::class)->prefix('products')->group(function () {
    Route::get('/', 'index');
    Route::post('/', 'store');
    Route::get('/show/{product}', 'show');
    Route::put('/update/{product}', 'update');
    Route::delete('/destroy/{product}', 'destroy');
    Route::get('/category/{category}', 'indexByCategory');
});

Route::middleware('auth:sanctum')->controller(CategoryController::class)->prefix('benefits')->group(function () {
    Route::get('/', 'index');
    Route::post('/', 'store');
    Route::get('/show/{benefit}', 'show');
    Route::put('/update/{benefit}', 'update');
    Route::delete('/destroy/{benefit}', 'destroy');
});
