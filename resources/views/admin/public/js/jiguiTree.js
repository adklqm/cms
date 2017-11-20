var ace_icon = ace.vars['icon'];
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