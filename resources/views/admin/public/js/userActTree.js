var DataSourceTree = function(options) {
	this._data 	= options.data;
	this._delay = options.delay;
}

DataSourceTree.prototype.data = function(options, callback) {
	var self = this;
	var $data = null;

	if(!("name" in options) && !("type" in options)){
		$data = this._data;//the root tree
		callback({ data: $data });
		return;
	}
	else if("type" in options && options.type == "folder") {
		if("additionalParameters" in options && "children" in options.additionalParameters)
			$data = options.additionalParameters.children;
		else $data = {}//no data
	}
	
	if($data != null)//this setTimeout is only for mimicking some random delay
		setTimeout(function(){callback({ data: $data });} , parseInt(Math.random() * 500) + 200);

	//we have used static data here
	//but you can retrieve your data dynamically from a server using ajax call
	//checkout examples/treeview.html and examples/treeview.js for more info
};

var tree_data = {
	'userinfo' : {name: '详细信息', type: 'item'},
	'presale' : {name: '售前记录', type: 'item'},
	'services' : {name: '服务项目', type: 'folder'},
	'return' : {name: '售后回访', type: 'item'},
	'workorder' : {name: '售后工单', type: 'item'},
	'contact' : {name: '联系人', type: 'item'},
	'financial' : {name: '财务信息', type: 'item'},
}

tree_data['services']['additionalParameters'] = {
	'children' : {
		'domain' : {name: '域名', type: 'item'},
		'yun' : {name: '云服务器', type: 'item'},
		'hyy' : {name: '行业云', type: 'item'},
		'vhost' : {name: '虚拟主机', type: 'item'},
		'vps' : {name: 'VPS主机', type: 'item'},
		'tuoguan' : {name: '服务器托管', type: 'item'},
		'zuyong' : {name: '服务器租用', type: 'item'}
	}
}




var treeDataSource = new DataSourceTree({data: tree_data});









var ace_icon = ace.vars['icon'];
//class="'+ace_icon+' fa fa-file-text grey"
//becomes
//class="ace-icon fa fa-file-text grey"
var tree_data_2 = {
	'userinfo' : {name: '<i class="'+ace_icon+' fa fa-file-text blue"></i> <a href="javascript:open(\'userInfo\');">用户信息</a>', type: 'item'},
	'presale' : {name: '<i class="'+ace_icon+' fa fa-fax blue"></i> <a href="javascript:open(\'domain\');">售前拜访</a>', type: 'item'},
	'workflow' : {name: '<i class="'+ace_icon+' fa fa-briefcase blue"></i> <a href="javascript:open(\'uWorkflow\');">工作流</a>', type: 'item'},
	'order' : {name: '订单管理', type: 'folder', 'icon-class':'blue'},
	'services' : {name: '服务项目', type: 'folder', 'icon-class':'blue'},
	'workorder' : {name: '<i class="'+ace_icon+' fa fa-list-alt blue"></i> <a href="javascript:open(\'uWorkorder\');">售后工单</a>', type: 'item'},
	'return' : {name: '<i class="'+ace_icon+' fa fa-heart blue"></i> <a href="javascript:open(\'uVisit\');">售后回访</a>', type: 'item'},
	'contact' : {name: '<i class="'+ace_icon+' fa fa-user blue"></i> <a href="javascript:open(\'uContacts\');">联系人</a>', type: 'item'},
	'financial' : {name: '财务信息', type: 'folder', 'icon-class':'blue'},

	
}
tree_data_2['order']['additionalParameters'] = {
	'children' : {
		'uOrderNoPay' : {name: '<a href="javascript:open(\'uOrderNoPay\');">未结算订单</a>', type: 'item'},
		'uOrderPay' : {name: '<a href="javascript:open(\'uOrderPay\');">已结算订单</a>', type: 'item'},
	}
}
tree_data_2['services']['additionalParameters'] = {
	'children' : {
		'domain' : {name: '<a href="javascript:open(\'uDomain\');">域名业务</a>', type: 'item'},
		'yun' : {name: '<a href="javascript:open(\'uYun\');">云服务器</a>', type: 'item'},
		'hyy' : {name: '<a href="javascript:open(\'uHyun\');">行业云</a>', type: 'item'},
		'vhost' : {name: '<a href="javascript:open(\'uVhost\');">虚拟主机</a>', type: 'item'},
		'vps' : {name: '<a href="javascript:open(\'uVps\');">VPS主机</a>', type: 'item'},
		'tuoguan' : {name: '<a href="javascript:open(\'uTuoguan\');">服务器托管</a>', type: 'item'},
		'zuyong' : {name: '<a href="javascript:open(\'uServer\');">服务器租用</a>', type: 'item'}
	}
}
tree_data_2['financial']['additionalParameters'] = {
	'children' : {
		'moneyin' : {name: '<a href="javascript:open(\'uMoneyin\');">充值记录</a>', type: 'item'},
		'moneyout' : {name: '<a href="javascript:open(\'uMoneyout\');">消费记录</a>', type: 'item'},
		'cost' : {name: '<a href="javascript:open(\'cost\');">销售成本</a>', type: 'item'},

	}
}


var treeDataSource2 = new DataSourceTree({data: tree_data_2});