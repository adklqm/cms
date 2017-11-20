<?php
use think\Route;

Route::get('/','index/index');
Route::get('/index','index/index');
Route::post('/','index/index');
Route::get('/test','index/test');
Route::post('/test','index/test');

Route::get('/login/index','login/index');
Route::get('/login','login/index');
Route::post('/login/handle','login/handle');
Route::get('/login/handle','login/handle');//测试用

?>