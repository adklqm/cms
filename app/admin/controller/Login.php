<?php
namespace app\admin\controller;
use think\Controller;

class Login extends Controller{

	public function index(){

		if(session('adminrole.uid')){
			$this->redirect('index/index');
		}

	}


	public function handle(){
		// if(request()->isAjax()){
			$username 	= input('username');
			$pwd 		= input('pwd');

			$user = model('Member')->where('username',$username)
				->where('password',md5($pwd))->find();

			if($user){
				session('adminrole.uid',$user['id']);
				return 'succed';
			}else{
				return 'error';
			}
			
		// }
		// return 'error';
	}

}

?>