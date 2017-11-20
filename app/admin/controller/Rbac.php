<?php
namespace app\admin\controller;

class Rbac extends Common{

    /**
     * 给用户分配角色
     * @Author   Hybrid
     * @DateTime 2017-11-07
     * @return   [type]     [description]
     */
    public static function changeGroup($uid,$group_id)
    {
        if(!is_integer($uid) || !is_integer($group_id)){
            return returnJson(0,'用户或角色选择错误');
        }

        if(config('rbac.administrator') == $uid){
            return returnJson(0,'不能变更超级管理员的的用户角色');
        }
        $relation_model = model('RbacUserRelationGroup');
        $is_assign = $relation_model->where('uid',$uid)->where('group_id',$group_id)->count();
        if($is_assign){
            return returnJson(1,'用户角色分配成功');
        }

        $result = $relation_model->save(['uid'=>$uid,'group_id'=>$group_id]);
        if($result){
            return returnJson(1,'用户角色分配成功');
        }
        return returnJson(0,'用户角色分配失败');
    }

    /**
     * 修改用户组权限
     * @Author   Hybrid
     * @DateTime 2017-11-07
     * @return   [type]     [description]
     */
    public static function changeAccess($access,$group_id)
    {
        if(!is_array($access) || empty($access)){
            return returnJson(0,'权限不能为空');
        }
        if(!is_integer($group_id)){
            return returnJson(0,'必须选择一个角色');
        }
        if(config('rbac.administrator_group') == $group_id){
            return returnJson(0,'无法对超级管理员进行权限分配');
        }

        $relation_model = model('RbacGroupRelationRule');
        $original_access = $relation_model->where('group_id',$group_id)->column('rule_id');

        //未发生变动的权限
        $intersect = array_intersect($access,$original_access);

        //新增的权限
        $add      = array_diff($access,$original_access);
        if(!empty($add)){
            $data = [];
            foreach($add as $value){
                $data['rule_id'] = $value;
                $data['group_id'] = $group_id;
            }        
            $relation_model->save($data);
        }

        //被移除的权限
        $remove    = array_diff($original_access,$access);
        if(!empty($remove)){
            $relation_model->where('rule_id','in',$remove)->where('group_id',$group_id)->delete();
        }

        return returnJson(1,'权限分配成功');
    }

    /*
     * 获取角色组中用户
     * @param int $group_id
     * @return array
     */
    public static function getUser($group_id)
    {
        $user = model('RbacUserRelationGroup')->where('group_id',$group_id)->column('uid');
        return $user ? : [];
    }    

    /*
     * 获取用户所属用户组
     * @param int $uid
     * @return array
     */
    public static function getGroup($uid){
        $group = model('RbacUserRelationGroup')->where('uid',$uid)->column('group_id');
        return $group ? : [];
    }
    

    /*
     * 用户的权限集合
     * @param int       $uid
     * @param array 	$access
     */
    public static function getAccess($uid)
    {
        $access = model('RbacUserRole')->alias('r')
            ->join('__RBAC_ROLE_RULE__ a','r.role_id = a.role_id')
            ->where('r.uid',$uid)->column('a.id');
        return $access ? : [];
    }


    /*
     * 检查用户是否拥有某项权限
     * @param 	int 	$uid
     * @param 	mixed 	$rule  数组或整数
     * @return 	boolean
     */
    public static function validateAccess($uid,$rule,$access = false)
    {
        // 如果属于超级管理员，不进行权限验证
        $m_user_role = model('RbacUserRole');
        $is_admin = $m_user_role->where('role_id',config('rbac.administrator_id'))
            ->where('uid',$uid)->count();
        if($is_admin){
            return true;
        }

        //获取此用户的权限集合，如果没有给用户的出权限集合
        $access || $access = static::getAccess($uid);

        if(is_integer($rule)){
            return in_array($rule,$access) ? true : false;
        }

        if(is_array($rule)){
            $auth = model('RbacRule')->where('model',$rule['m'])
                ->where('controller',$rule['c'])->where('action',$rule['a'])->value('id');
            if(!$auth){
                return false;
            }
            return in_array($auth,$access) ? true : false;
        }
        return false;
    }

}