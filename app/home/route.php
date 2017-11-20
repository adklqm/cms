<?php
use think\Route;

Route::get('/','index/index');
Route::get('/index','index/index');
Route::post('/index/msgQueue','index/msgQueue');
Route::get('/index/msg','index/msg');

?>