<?php
namespace app\admin\controller;
use think\Controller;

abstract class Common extends Controller{

    protected $G_UID  = 0;
    protected $G_MENU = '';    

    public function __construct(){
        parent::__construct();
        //登录检查
        session('S_ADMIN_ROLE.UID',1);
        $this->_isLogin();
        //用户权限检查
        $this->_isAuth();
        //获取菜单
        $this->_getMenu();

        $this->assign('menu',$this->G_MENU);
    }

    /**
     * 检查用户是否已登录
     */
    private function _isLogin()
    {
        $uid         = intval(session('S_ADMIN_ROLE.UID'));
        $this->G_UID = $uid;
        //已登录
        if($uid){
            return $uid;
        }

        //未登录
        header('Location:login/index');
        exit(0);
        
    }

    /**
     * 检查访问权限
     */
    private function _isAuth()
    {
        $access     = $this->_getAccess();
        $uid        = $this->G_UID;

        $rule['m'] = request()->module();
        $rule['c'] = request()->controller();
        $rule['a'] = request()->action();

        $auth       = Rbac::validateAccess($uid,$rule,$access);

        // $auth = false;
        if($auth){
            return true;
        }

        //无访问权限，ajax请求
        if(request()->isAjax()){
            echo '<strong style="color:red">你没有权限</strong>';
        //无访问权限，正常请求
        }else{
            $this->error('你没有权限');
            // echo static::returnJson(0,'你没有权限');
        }

    }

    /*
     *获取当前用户菜单
     */
    private function _getMenu()
    {
        $access       = $this->_getAccess();
        $rules 	      = model('RbacRule')->where('id','in',$access)->where('is_menu',1)->select();
        $this->G_MENU = static::directoryTree( json_decode(json_encode($rules),true) );
    }

    /*
     * 获取当前登录用户的权限
     * @return array $access
     */
    private function _getAccess()
    {
        $auth_type  = config('rbac.auth_type');
        $access     = session('S_ADMIN_ROLE.ACCESS');

        if(1 == $auth_type || empty($access)){
            $access = Rbac::getAccess($this->G_UID);
            empty($access) || session('S_ADMIN_ROLE.ACCESS',implode(',',$access));
            return $access;
        }

        $access = explode(',',$access);
        array_walk($access,function(&$item){
            $item = intval($item);
        });
        return $access;  
    }

    protected static function directoryTree($category,$pid = 0,$pk = 'id',$pidname = 'pid',$access=null
    ){
        $arr = [];
        foreach($category as $v){
            if(is_array($access)){
                $v['access'] = in_array($v[$pk],$access) ? 1:0;
            }
            if($v[$pidname] == $pid){
                $v['child'] =  static::directoryTree($category,$v[$pk],$pk,$pidname,$access);
                $arr[] = $v; 
            }
        }
        return $arr;
    }
}