<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::view('/{path?}', 'app');

//Admin CRUD
Route::get('api/admin/{email}/{password}','Api\AdminController@getAdmin');

Route::post("api/logout", "Api\AdminController@logout");


// Category CRUD
Route::resource('api/categories', 'Api\CategoryController');

Route::get('api/categoriesWithCoverImage','Api\CategoryController@getCategoriesWithCoverImage');


// Images CRUD
Route::resource('api/images', 'Api\ImageController');

Route::get('api/category-images/{category_id}', 'Api\ImageController@imagesByCategory');


// Profile CRUD
Route::resource('api/profile', 'Api\ProfileController');

// Message CRUD
Route::resource('api/messages', 'Api\MessageController');





