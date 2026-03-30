<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\OrderDetilsController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->prefix('user')->controller(UserController::class)->group(function () {
    Route::get('user',  'getuser');
    Route::put('update/{user}',  'update');
    Route::delete('destroy/{user}',  'delete');
    Route::get('allusers', 'users');
});
Route::prefix('auth')->controller(AuthController::class)->group(function () {
    Route::post('signup',  'signup');
    Route::post('login',  'login');
    Route::post('logout',  'logout');
});
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
Route::middleware('auth:sanctum')->controller(CartController::class)->prefix('carts')->group(function () {
    Route::get('/', 'index');
    Route::post('/', 'store');
    Route::get('/show/{cart}', 'show');
    Route::put('/update/{cart}', 'update');
    Route::delete('/destroy/{cart}', 'destroy');
});

Route::controller(OrderDetilsController::class)->prefix('orderdetils')->group(function () {
    Route::get('/', 'index');
    Route::get('/getallorders', 'allorder');
    Route::post('/', 'store');
    Route::get('/{id}', 'show');
    Route::put('/update/{orderdetils}', 'update');
    Route::delete('/destroy/{orderdetils}', 'destroy');
});


Route::middleware('auth:sanctum')->controller(FavoriteController::class)->prefix('favorites')->group(function () {
    Route::get('/', 'index');
    Route::post('/toggle/{productId}', 'store');
    Route::get('/show/{favorite}', 'show');
    Route::put('/update/{favorite}', 'update');
    Route::delete('/destroy/{favorite}', 'destroy');
});
