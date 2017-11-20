<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006-2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: 流年 <liu21st@gmail.com>
// +----------------------------------------------------------------------

// 应用公共文件

/*
 * 调试用方法，需要开启调试模式
 * @param  mixed  $args
 */
if(! function_exists("dd")){
    function dd(...$args){
        if(! config('app_debug')){
            exit(0);
        }
        $_args = $args;
        foreach ($_args as $value) {
            var_dump($value);
        }
        die;
    }
}

/*
 * 返回json数据
 */
if(! function_exists('returnJson')){
    function returnJson($code = 0,$msg = '',$data = null)
    {
        return json_encode(['code' => $code,'msg' => $msg,'data' => $data],JSON_UNESCAPED_UNICODE);
    }
}
    
/*
 * 生成分类树(多维)
 */
if(! function_exists('categoryTree')){
    function categoryTree($category,$pid = 0,$pk = 'id',$pidname = 'pid',$access=null
    ){
        $arr = [];
        foreach($category as $v){
            if(is_array($access)){
                $v['access'] = in_array($v[$pk],$access) ? 1:0;
            }
            if($v[$pidname] == $pid){
                $v['child'] =  categoryTree($category,$v[$pk],$pk,$pidname,$access);
                $arr[] = $v; 
            }
        }
        return $arr;
    }
}
    

/*
 * 生成分类树(一维)
 */
if(! function_exists('categoryLevel')){
    function categoryLevel($category,$pid = 0,$level = 0,$pk = 'id',$pidname = 'pid',$pre='----'
    ){
        $arr = [];
        foreach($category as $v){
            if($v[$pidname] == $pid){
                $v['level'] = $level + 1;
                $v['pre'] = str_repeat($pre,$level);
                $arr[] = $v;
                $arr = array_merge(
                    $arr,
                    categoryLevel($category,$v[$pk],$level+1,$pk,$pidname,$pre)
                );
            }
        }
        return $arr;
    }
}

/*
 * 判断是否为ajax访问
 */
if(! function_exists('isAjax')){
    function isAjax()
    {
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){
            return true;
        }
        return false;
    }
}
    

/*
 * 把数据库查询对象转为数组
 * 
 */
if(! function_exists('toArray')){
    function toArray($obj)
    {
        return json_decode(json_encode($obj),true);
    }
}