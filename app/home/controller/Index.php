<?php
namespace app\home\controller;

class Index extends Common{
    public function index(){

    	static::msg();
    	// $this->msg(4,55);
    }


    public function msgQueue(){
    	echo 343434;
    }

    public static function __callStatic($method,$args){
    	$f = new Index();
    	$f->msgQueue();
    }

    // public function __call($method,$args){
    // 	dump($args);
    // 	$this->msgQueue();
    // }

}
