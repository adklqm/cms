<?php
namespace app\admin\controller;

class Index extends Common{
    public function index(){

        $d = db('wxt')->select();
        
        $n = '';
        $u = '';
        $o = '';
        $t = '';

        foreach($d as $v){
            $n .= $v['name'].',';
            $u .= $v['unionid'].',';
            $o .= $v['openid'].',';
            $t .= $v['tel'].',';
        }

        dump(trim($n,','));
        dump(trim($u,','));
        dump(trim($o,','));
        dump(trim($t,','));
    }

    public function test(){
        echo 3;
    }
}
