jQuery(function($) {
	//override dialog's title function to allow for HTML titles
	$.widget("ui.dialog", $.extend({}, $.ui.dialog.prototype, {
		_title: function(title) {
			var $title = this.options.title || '&nbsp;'
			if (("title_html" in this.options) && this.options.title_html == true)
				title.html("<div class='widget-header'><h4 class='smaller'>" + $title + "</h4></div>");
			else title.text($title);
		}
	}));
});

// 加载页面
function load(url,where){
	var where = where || '';
	var html = '';
	$.ajax({
		type: "GET",
		url: url,
		async:false,	
		data: where,
		success: function(data){
			html = data;
		}
	});
	return html;
}

/**
 * 弹窗方法：验证提示(verify)
 * 参数配置：where:验证条件
 *			title:错误提示
 * 			time:提示时间
 */
 var tcVerify = function(where, title, time) {
 	var title = title || '填写数据不正确！';
 	var time = time || 2;
 	title = '<font color="#ba1704">' + title + '</font>';
 	if(!!where){
 		art.dialog.tips(title,time);
 		return false;
 	}
 	return true;
 }

 function tcADialog($obj) {

 	var tcADialog = new Object();

	/**
	 * 判断当前url是否存在参数
	 */
	 tcADialog.indexOf = function(){   
	 	var s = $obj.url.indexOf('?');   
	 	if(s === -1){
   			// 没有参数
   			return '?';
   		}else{
   			// 有参数
   			return '&';
   		}
   	}

	/**
	 * 弹窗方法：添加（add）
	 * 参数配置：title:弹窗标题
	 * 			width:弹窗宽度(整数，可选)
	 * 			url:数据处理地址
	 * 			cfun:回调函数 可在提交之前做验证 回调函数返回FALSE Ajax就不执行 true 执行
	 */
	 tcADialog.add = function() {
	 	var url = $obj.url + ( $obj.where ? (this.indexOf()+$obj.where) : '' );
	 	var width = 400;
	 	var height = 300;
	 	if ($obj.width) {
	 		width = $obj.width;
	 	}
	 	if ($obj.height) {
	 		height = $obj.height;
	 	}
	 	$("#dialog-confirm").load(url);

	 	$("#dialog-confirm").removeClass('hide').dialog({
	 		resizable: false,
	 		width: width,
	 		height:height,
	 		modal: true,
	 		title: $obj.title,
	 		title_html: true,
			// closeOnEscape:false,
			close: function() {
				$("#dialog-confirm").html('');
			},
			buttons: [{
				text: '取消',
				"class": "btn btn-grey btn-xs",
				click: function() {

					$(this).dialog("close");
				}
			}, {
				text: '提交',
				"class": "btn btn-primary btn-xs",
				click: function() {
					var queryString = $("#dialogForm").serialize();
					if( $obj.cfun && ($obj.cfun() === false) ){
						return;	
					}
					$.ajax({
						timeout: 0,
						type: "POST",
						url: url,
						data: queryString,
						dataType: "JSON",
						success: function(data) {
							// alert(data);
							if (data === 'succeed') {
								$("#dialog-confirm").addClass('hide').dialog("close");

								art.dialog.tips('<font color="#14a303">' + $obj.title + '成功</font>', 3);
								setTimeout(function() {
									location.reload();
								}, 400);


							} else if (data === 'error') {
								art.dialog.tips('<font color="#ba1704">' + $obj.title + '失败</font>', 3);
							} else {
								art.dialog.tips('<font color="#d14c32">' + data + '</font>', 3);
							}
						}
					});
				}
			}]
		});
}


	/**
	 * 弹窗方法：修改(edit)
	 * 参数配置：title:弹窗标题
	 * 			width:弹窗宽度(整数，可选)
	 * 			height:弹窗高度（整数，可选）
	 * 			url:数据处理地址
	 * 			where:update条件
	 * 			cfun:回调函数 可在提交之前做验证 回调函数返回FALSE Ajax就不执行 true 执行
	 */
	 tcADialog.edit = function() {
	 	var url = $obj.url + ( $obj.where ? (this.indexOf()+$obj.where) : '' );
	 	var width = 400;
	 	var height = 300;
	 	if ($obj.width) {
	 		width = $obj.width;
	 	}
	 	if ($obj.height) {
	 		height = $obj.height;
	 	}
	 	$("#dialog-confirm").load(url);

	 	$("#dialog-confirm").removeClass('hide').dialog({
	 		resizable: false,
	 		width: width,
	 		height:height,
	 		modal: true,
	 		title: $obj.title,
	 		title_html: true,
	 		close: function() {
	 			$("#dialog-confirm").html('');
	 		},
	 		buttons: [{
	 			text: '取消',
	 			"class": "btn btn-grey btn-xs",
	 			click: function() {
	 				$(this).dialog("close");
	 			}
	 		}, {
	 			text: '提交',
	 			"class": "btn btn-primary btn-xs tc-submit",
	 			click: function() {
	 				var queryString = $("#dialogForm").serialize();
					// alert($obj.where);
					if( $obj.cfun && ($obj.cfun() === false) ){
						return;
					}
					$.ajax({
						timeout: 0,
						type: "POST",
						url: url,
						data: queryString,
						dataType: "JSON",
						success: function(data) {
							// alert(data.ipduan);
							if (data === 'succeed') {
								$("#dialog-confirm").addClass('hide').dialog("close");
								art.dialog.tips('<font color="#14a303">' + $obj.title + '成功</font>', 3);
								setTimeout(function() {
									location.reload();
								}, 400);

							} else if (data === 'error') {
								art.dialog.tips('<font color="#ba1704">' + $obj.title + '失败</font>', 3);
							} else {
								art.dialog.tips('<font color="#d14c32">' + data + '</font>', 3);
							}
						}
					});
				}
			}]
		});
}

	/**
	 * 弹窗方法：删除(del)
	 * 参数配置：title:弹窗标题
	 * 			url:数据处理地址
	 * 			tips:提示删除内容
	 * 			where:update条件
	 */
	 tcADialog.del = function() {
		// alert($obj.url);
		var url = $obj.url + ( $obj.where ? (this.indexOf()+$obj.where) : '' );
		$("#dialog-confirm").html('<div class="alert alert-info bigger-110">您正在删除 <font color="#ff5200">' + $obj.tips + '</font> 此操作将不可恢复，请谨慎操作.' + '</div>' + '<div class="space-6"></div>' + '<p class="bigger-110 center grey">' + '<i class="ace-icon fa fa-hand-o-right blue bigger-120"></i>' + '是否确定删除?' + '</p>');

		$("#dialog-confirm").removeClass('hide').dialog({
			resizable: false,
			modal: true,
			width: 300,
			height:250,
			title: $obj.title,
			title_html: true,
			buttons: [{
				html: "<i class='ace-icon fa fa-times bigger-110'></i>&nbsp; 取消",
				"class": "btn btn-xs",
				click: function() {
					$(this).dialog("close");
				}
			}, {
				html: "<i class='ace-icon fa fa-trash-o bigger-110'></i>&nbsp; 确定删除",
				"class": "btn btn-danger btn-xs",
				click: function() {
					
					$(this).dialog("close");
					$.ajax({
						timeout: 0,
						type: "POST",
						url: url,
						data: "&" + $obj.where,
						dataType: "JSON",
						success: function(data) {
							console.log(data);
							// alert(data.ipduan);
							if (data === 'succeed') {
								$("#dialog-confirm").addClass('hide').dialog("close");
								art.dialog.tips('<font color="#14a303">' + $obj.title + '成功</font>', 3);
								setTimeout(function() {
									location.reload();
								}, 400);

							} else if (data === 'error') {
								art.dialog.tips('<font color="#ba1704">' + $obj.title + '失败</font>', 3);
							} else {
								art.dialog.tips('<font color="#d14c32">' + data + '</font>', 3);
							}
						}
					});
				}
			}]
		});
}

	/**
	 * 弹窗方法：单项确认(one)
	 * 参数配置：title:弹窗标题
	 * 			url:数据处理地址
	 */
	 tcADialog.one = function() {
		// alert($obj.url);
		var url = $obj.url + ( $obj.where ? (this.indexOf()+$obj.where) : '' );
		$("#dialog-confirm").html('<div class="alert alert-info bigger-110">您正在操作 <font color="#ff5200">' + $obj.title + '</font> 此操作将不可恢复，请谨慎操作.' + '</div>' + '<div class="space-6"></div>' + '<p class="bigger-110 center grey">' + '<i class="ace-icon fa fa-hand-o-right blue bigger-120"></i>' + '是否确定继续?' + '</p>');

		$("#dialog-confirm").removeClass('hide').dialog({
			resizable: false,
			modal: true,
			width: 300,
			height:250,
			title: $obj.title,
			title_html: true,
			buttons: [{
				html: "<i class='ace-icon fa fa-times bigger-110'></i>&nbsp; 取消",
				"class": "btn btn-xs",
				click: function() {
					$(this).dialog("close");
				}
			}, {
				html: "<i class='ace-icon fa fa-trash-o bigger-110'></i>&nbsp; 确定继续",
				"class": "btn btn-danger btn-xs",
				click: function() {
					$(this).dialog("close");
					if($obj.title == "开通虚拟主机"){
						var dialog = art.dialog({
							title: '提示',
							content: '正在开通虚拟主机，请稍后...'
						});
					}
					$.ajax({
						timeout: 0,
						type: "POST",
						url: url,
						data: "&" + $obj.where,
						dataType: "JSON",
						success: function(data) {
							// alert(data);
							if (data === 'succeed') {
								if($obj.title == "开通虚拟主机"){
									dialog.content('虚拟主机开通成功').title('提示');
								}else{
									art.dialog.tips('<font color="#14a303">' + $obj.title + '成功</font>', 3);
								}
								setTimeout(function() {
									location.reload();
								}, 400);
							} else if (data === 'error') {
								if($obj.title == "开通虚拟主机"){
									dialog.content('虚拟主机开通失败').title('提示');
								}else{
									art.dialog.tips('<font color="#ba1704">' + $obj.title + '失败</font>', 3);
								}
								
							} else {
								art.dialog.tips('<font color="#d14c32">' + data + '</font>', 3);
							}
						}
					});
				}
			}]
		});
}

	/**
	 * 弹窗方法：信息显示(info)
	 * 参数配置：title:弹窗标题
	 * 			width:弹窗宽度(整数，可选)
	 * 			height:弹窗高度（整数，可选）
	 * 			url:数据获取地址
	 * 			where:查询条件
	 */
	 tcADialog.info = function() {
		// alert($obj.width);
		var url = $obj.url + ( $obj.where ? (this.indexOf()+$obj.where) : '' );
		var width = 400;
		var height = 300;
		if ($obj.width) {
			width = $obj.width;
		}
		if ($obj.height) {
			height = $obj.height;
		}
		$("#dialog-confirm").load(url);

		$("#dialog-confirm").removeClass('hide').dialog({
			resizable: false,
			width: width,
			height:height,
			modal: true,
			title: $obj.title,
			title_html: true,
			close: function() {
				$("#dialog-confirm").html('');
			},
			buttons: [{
				text: '关闭',
				"class": "btn btn-grey btn-xs",
				click: function() {
					$(this).dialog("close");
				}
			}]
		});
	}

	/**
	 * 弹窗方法：修改(edit)
	 * 参数配置：title:弹窗标题
	 * 			width:弹窗宽度(整数，可选)
	 * 			height:弹窗高度（整数，可选）
	 * 			url:数据处理地址
	 * 			where:update条件
	 * 			cfun:回调函数 可在提交之前做验证 回调函数返回FALSE Ajax就不执行 true 执行
	 */
	 tcADialog.wkReply = function() {
	 	var url = $obj.url + ( $obj.where ? (this.indexOf()+$obj.where) : '' );
	 	var submitUrl = $obj.submitUrl + ( $obj.where ? (this.indexOf()+$obj.where) : '' );
	 	var width = 400;
	 	var height = 300;
	 	if ($obj.width) {
	 		width = $obj.width;
	 	}
	 	if ($obj.height) {
	 		height = $obj.height;
	 	}
	 	$("#dialog-confirm").load(url);

	 	$("#dialog-confirm").removeClass('hide').dialog({
	 		resizable: false,
	 		width: width,
	 		height:height,
	 		modal: true,
	 		title: $obj.title,
	 		title_html: true,
	 		close: function() {
	 			$("#dialog-confirm").html('');
	 		},
	 		buttons: [{
	 			text: '取消',
	 			"class": "btn btn-grey btn-xs",
	 			click: function() {
	 				$(this).dialog("close");
	 			}
	 		}, {
	 			text: '提交',
	 			"class": "btn btn-primary btn-xs tc-submit",
	 			click: function() {
	 				var queryString = $("#dialogForm").serialize();
					// alert($obj.where);
					if( $obj.cfun && ($obj.cfun() === false) ){
						return;
					}
					$.ajax({
						timeout: 0,
						type: "POST",
						url: submitUrl,
						data: queryString,
						dataType: "JSON",
						success: function(data) {
							// alert(data.ipduan);
							if (data === 'succeed') {
								art.dialog.tips('<font color="#14a303">工单回复成功</font>', 3);
								setTimeout(function() {
									$("#dialog-confirm").html('');
									$("#dialog-confirm").load(url);
								}, 2000);

							} else if (data === 'error') {
								art.dialog.tips('<font color="#ba1704">工单回复失败</font>', 3);
							} else {
								art.dialog.tips('<font color="#d14c32">' + data + '</font>', 3);
							}
						}
					});
				}
			}]
		});
}


return tcADialog;
}


function viewUserInfo(uid){
	var a = tcADialog({
		title:'查看用户信息',
		width:780,
		height:650,
		where:'uid='+uid,
		url:'/user/userInfo.html'
	});
	a.info();
}

function rand_skey(passwd_id) {
	var pwchars = "abcdefhjmnpqrstuvwxyz23456789ABCDEFGHJKLMNPQRSTUVWYXZ";
	var passwordlength = 8;
	passwd_id.value = '';
	for (i = 0; i < passwordlength; i++) {
		passwd_id.value += pwchars.charAt(Math.floor(Math.random() * pwchars.length))
	}
	return true;
}
