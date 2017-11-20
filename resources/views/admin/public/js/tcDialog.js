function tcAjaxList($obj) {

	var tcAjaxList = new Object();

	tcAjaxList.add = function() {

	}
	return tcAjaxList;
}

function tcADialog($obj) {

	var tcADialog = new Object();
	$obj.formname = $obj.formname ? $obj.formname : "form#dialogForm";	


	/**
	 * 判断当前url是否存在参数
	 */
	tcADialog.indexOf = function() {
	 	var s = $obj.url.indexOf('?');
	 	if (s === -1) {
			// 没有参数
			return '?';
		} else {
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
	 	var url = $obj.url + ($obj.where ? (this.indexOf() + $obj.where) : '');
	 	bootbox.dialog({
	 		message: tcLoad(url),
	 		title: $obj.title,
	 		width: $obj.width,
	 		height: $obj.height,
	 		buttons: {
	 			confirm: {
	 				label: "提交",
	 				className: "btn-primary",
	 				callback: function() {
	 					if ($obj.cfun && ($obj.cfun() === false)) {
	 						return false;
	 					}
	 					var queryString = $($obj.formname).serialize();
	 					$.post(url, queryString, function(data) {

	 						if(typeof $obj.resultCallback === 'function'){
	 							data = $obj.resultCallback(data);
	 						}

	 						if (data === 'succeed') {
	 							$.niftyNoty({
	 								type: 'succeed',
	 								icon: 'fa fa-check',
	 								message: "<strong>Heads up!</strong>" + $obj.title + "成功",
	 								container: 'floating',
	 								timer: 3000
	 							});

	 							if( typeof $obj.submitAfterCallback === 'function' && $obj.submitAfterCallback() === false){
	 								return false;
	 							}

	 							if ($obj.divid) {
	 								$("#" + $obj.divid).load($obj.reload);
	 							} else {
	 								setTimeout(function() {
	 									location.reload();
	 								}, 400);
	 							}
	 						} else if (data === 'error') {
	 							$.niftyNoty({
	 								type: 'danger',
	 								icon: 'fa fa-times',
	 								message: "<strong>Heads up!</strong>" + $obj.title + "失败",
	 								container: 'floating',
	 								timer: 3000
	 							});
	 						} else {
	 							$.niftyNoty({
	 								type: 'danger',
	 								icon: 'fa fa-times',
	 								message: "<strong>Heads up!</strong>" + data,
	 								container: 'floating',
	 								timer: 3000
	 							});
	 						}
	 					});
	 				}
	 			}
	 		}
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
	 	var url = $obj.url + ($obj.where ? (this.indexOf() + $obj.where) : '');
	 	bootbox.dialog({
	 		message: tcLoad(url),
	 		title: $obj.title,
	 		width: $obj.width,
	 		height: $obj.height,
	 		buttons: {
	 			confirm: {
	 				label: "提交",
	 				className: "btn-primary",
	 				callback: function() {
	 					if ($obj.cfun && ($obj.cfun() === false)) {
	 						return false;
	 					}
	 					var queryString = $($obj.formname).serialize();
	 					$.post(url, queryString, function(data) {
	 						if (data === 'succeed') {
	 							$.niftyNoty({
	 								type: 'success',
	 								icon: 'fa fa-check',
	 								message: "<strong>Heads up!</strong>" + $obj.title + "成功",
	 								container: 'floating',
	 								timer: 3000
	 							});

	 							if( typeof $obj.submitAfterCallback === 'function' && $obj.submitAfterCallback() === false){
	 								return false;
	 							}

	 							if ($obj.divid) {
	 								$("#" + $obj.divid).load($obj.reload);
	 							} else {
	 								setTimeout(function() {
	 									location.reload();
	 								}, 400);
	 							}
	 						} else if (data === 'error') {
	 							$.niftyNoty({
	 								type: 'danger',
	 								icon: 'fa fa-times',
	 								message: "<strong>Heads up!</strong>" + $obj.title + "失败",
	 								container: 'floating',
	 								timer: 3000
	 							});
	 						} else {
	 							$.niftyNoty({
	 								type: 'danger',
	 								icon: 'fa fa-times',
	 								message: "<strong>Heads up!</strong>" + data,
	 								container: 'floating',
	 								timer: 3000
	 							});
	 						}
	 					});
	 				}
	 			}
	 		}
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
		var url = $obj.url + ($obj.where ? (this.indexOf() + $obj.where) : '');
		bootbox.confirm({
			title: $obj.title,
			width: $obj.width,
			message: '<p class="text-center">您正在删除 ' + $obj.tips + ' 此操作将不可恢复，请谨慎操作.' + '</p>' + '<div class="space-6"></div>' + '<p class="text-center">' + '<i class="ace-icon fa fa-hand-o-right blue bigger-120"></i>' + '是否确定删除?' + '</p>',
			buttons: {
				confirm: {}
			},
			callback: function(result) {
				if (result) {
					$.ajax({
						timeout: 0,
						type: "POST",
						url: url,
						data: "&" + $obj.where,
						dataType: "JSON",
						success: function(data) {
							if (data === 'succeed') {
								$.niftyNoty({
									type: 'success',
									icon: 'fa fa-check',
									message: "<strong>Heads up!</strong>" + $obj.title + "成功",
									container: 'floating',
									timer: 3000
								});

								if( typeof $obj.submitAfterCallback === 'function' && $obj.submitAfterCallback() === false){
									return false;
								}

								if ($obj.divid) {
									$("#" + $obj.divid).load($obj.reload);
								} else {
									setTimeout(function() {
										location.reload();
									}, 400);
								}
							} else if (data === 'error') {
								$.niftyNoty({
									type: 'danger',
									icon: 'fa fa-times',
									message: "<strong>Heads up!</strong>" + $obj.title + "失败",
									container: 'floating',
									timer: 3000
								});
							} else {
								$.niftyNoty({
									type: 'danger',
									icon: 'fa fa-times',
									message: "<strong>Heads up!</strong>" + data,
									container: 'floating',
									timer: 3000
								});
							}
						}
					});
}
},
animateIn: 'rubberBand',
animateOut: 'wobble'
});

}

	/**
	 * 弹窗方法：单项确认(one)
	 * 参数配置：title:弹窗标题
	 * 			url:数据处理地址
	 */
	 tcADialog.one = function() {
	 	var url = $obj.url + ($obj.where ? (this.indexOf() + $obj.where) : '');
	 	if ($obj.title == "开通虚拟主机") {
	 		bootbox.confirm({
	 			title: $obj.title,
	 			width: $obj.width,
	 			message: '<p class="text-center">正在开通虚拟主机，请稍后...</p>',
	 			buttons: {
	 				confirm: {}
	 			},
	 			callback: function(result) {
	 				if (result) {
	 					$.ajax({
	 						timeout: 0,
	 						type: "POST",
	 						url: url,
	 						data: "&" + $obj.where,
	 						dataType: "JSON",
	 						success: function(data) {
	 							if (data === 'succeed') {
	 								$.niftyNoty({
	 									type: 'success',
	 									icon: 'fa fa-check',
	 									message: "<strong>Heads up!</strong>" + $obj.title + "成功",
	 									container: 'floating',
	 									timer: 3000
	 								});
	 								setTimeout(function() {
	 									location.reload();
	 								}, 400);
	 							} else if (data === 'error') {
	 								$.niftyNoty({
	 									type: 'danger',
	 									icon: 'fa fa-times',
	 									message: "<strong>Heads up!</strong>" + $obj.title + "失败",
	 									container: 'floating',
	 									timer: 3000
	 								});
	 							} else {
	 								$.niftyNoty({
	 									type: 'danger',
	 									icon: 'fa fa-times',
	 									message: "<strong>Heads up!</strong>" + data,
	 									container: 'floating',
	 									timer: 3000
	 								});
	 							}
	 						}
	 					});
}
},
animateIn: 'rubberBand',
animateOut: 'wobble'
});
} else {
	bootbox.confirm({
		title: $obj.title,
		width: $obj.width,
		message: '<p class="text-center">您正在操作 ' + $obj.title + ' 此操作将不可恢复，请谨慎操作.' + '</p><p class="text-center">' + '<i class="fa fa-hand-o-right"></i>' + '是否确定继续?' + '</p>',
		buttons: {
			confirm: {}
		},
		callback: function(result) {
			if (result) {
				$.ajax({
					timeout: 0,
					type: "POST",
					url: url,
					data: "&" + $obj.where,
					dataType: "JSON",
					success: function(data) {
						if (data === 'succeed') {
							$.niftyNoty({
								type: 'success',
								icon: 'fa fa-check',
								message: "<strong>Heads up!</strong>" + $obj.title + "成功",
								container: 'floating',
								timer: 3000
							});
							setTimeout(function() {
								location.reload();
							}, 400);
						} else if (data === 'error') {
							$.niftyNoty({
								type: 'danger',
								icon: 'fa fa-times',
								message: "<strong>Heads up!</strong>" + $obj.title + "失败",
								container: 'floating',
								timer: 3000
							});
						} else {
							tips(data, false, false, 'warning', false);
						}
					}
				});
			}
		},
		animateIn: 'rubberBand',
		animateOut: 'wobble'
	});
}

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
		var url = $obj.url + ($obj.where ? (this.indexOf() + $obj.where) : '');
		var width = 400;
		var height = null;
		if ($obj.width) {
			width = $obj.width;
		}
		if ($obj.height) {
			height = $obj.height;
		}

		bootbox.dialog({
			message: tcLoad(url),
			title: $obj.title,
			width: width,
			height: height,
			buttons: {
				cancel: {
					label: "关闭",
					className: "btn-default",

				}
			}
		});


	}

	/**
	 * 弹窗方法：用户信息显示(userinfo)
	 * 参数配置：title:弹窗标题
	 * 			width:弹窗宽度(整数，可选)
	 * 			height:弹窗高度（整数，可选）
	 * 			url:数据获取地址
	 * 			where:查询条件
	 */
	 tcADialog.userinfo = function() {
		// alert($obj.width);
		var url = $obj.url + ($obj.where ? (this.indexOf() + $obj.where) : '');
		var width = 400;
		var height = null;
		if ($obj.width) {
			width = $obj.width;
		}
		if ($obj.height) {
			height = $obj.height;
		}

		bootbox.dialog({
			message: tcLoad(url),
			title: $obj.title,
			width: width,
			height: height,
			buttons: {
				cancel: {
					label: "关闭",
					className: "btn-default",

				}
			}
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
	 	var url = $obj.url + ($obj.where ? (this.indexOf() + $obj.where) : '');
	 	var submitUrl = $obj.submitUrl + ($obj.where ? (this.indexOf() + $obj.where) : '');

	 	bootbox.dialog({
	 		message: tcLoad(url),
	 		title: $obj.title,
	 		width: $obj.width,
	 		height: $obj.height,
	 		buttons: {
	 			confirm: {
	 				label: "提交",
	 				className: "btn-primary",
	 				callback: function() {
	 					var queryString = $($obj.formname).serialize();
	 					if ($obj.cfun && ($obj.cfun() === false)) {
	 						return;
	 					}
	 					$.post(submitUrl, queryString, function(data) {
	 						if (data === 'succeed') {
	 							$.niftyNoty({
	 								type: 'success',
	 								icon: 'fa fa-check',
	 								message: "<strong>Heads up!</strong>" + $obj.title + "成功",
	 								container: 'floating',
	 								timer: 3000
	 							});
	 							if ($obj.divid) {
	 								$("#" + $obj.divid).load($obj.reload);
	 							} else {
	 								setTimeout(function() {
	 									location.reload();
	 								}, 400);
	 							}
	 						} else if (data === 'error') {
	 							$.niftyNoty({
	 								type: 'danger',
	 								icon: 'fa fa-times',
	 								message: "<strong>Heads up!</strong>" + $obj.title + "失败",
	 								container: 'floating',
	 								timer: 3000
	 							});
	 							return false;
	 						} else {
	 							$.niftyNoty({
	 								type: 'danger',
	 								icon: 'fa fa-times',
	 								message: "<strong>Heads up!</strong>" + data,
	 								container: 'floating',
	 								timer: 3000
	 							});
	 							return false;
	 						}
	 					});
}
}
}
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
	 * 			okValue:回复按钮名称
	 * 			tips:操作完成后的说明
	 */
	 tcADialog.reply = function() {
	 	var url = $obj.url + ($obj.where ? (this.indexOf() + $obj.where) : '');
	 	var submitUrl = $obj.submitUrl + ($obj.where ? (this.indexOf() + $obj.where) : '');
	 	if ($obj['tips'] == null) {
	 		$obj.tips = '';
	 	}
	 	if ($obj['okValue'] == null) {
	 		$obj.okValue = '';
	 	}

	 	var d = dialog({
	 		title: $obj.title,
	 		width: $obj.width,
	 		height: $obj.height,
	 		content: tcLoad(url),
	 		okValue: '回复' + $obj.okValue,
	 		ok: function() {
	 			if ($obj.cfun && ($obj.cfun() === false)) {
	 				return;
	 			}
	 			var queryString = $($obj.formname).serialize();
	 			$.post(submitUrl, queryString, function(data) {
	 				if (data === 'succeed') {
	 					d.close().remove();
	 					tips('回复' + $obj.tips + '成功', false, false, 'success', false);
	 					setTimeout(function() {
	 						location.reload();
	 					}, 1000);
						// d.content(tcLoad(url));
					} else if (data === 'error') {
						tips('回复' + $obj.tips + '失败', false, false, 'error', false);
						return false;
					} else {
						tips(data, false, false, 'warning', false);
						return false;
					}
				});
	 			return false;
	 		},
	 		cancelValue: '取消',
	 		cancel: function() {
	 			$("#dialog-confirm").html('');
	 			d.close().remove();
	 		}
	 	}).showModal();

	 }


	 return tcADialog;
	}

	function viewUserInfo(uid) {
		var a = tcADialog({
			title: '查看用户信息',
			width: 780,
			height: 650,
			where: 'uid=' + uid,
			url: '/user/userInfo.html'
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

	document.write("<script type='text/javascript' src='/Adm/View/default/Public/Js/common.js'></script>");