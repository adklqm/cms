$(function(){
	var fooColExp = $('#table-list');
	fooColExp.footable({
		paginate:false
	}).trigger('');


	$('#table-foo-collapse').on('click', function(){
		fooColExp.trigger('footable_collapse_all');
	});
	$('#table-foo-expand').on('click', function(){
		fooColExp.trigger('footable_expand_all');
	});

	$("#checkItems").click(function(){
		$("#table-list label").each(function(){
			this.removeClass("active");
		});
		$("input[name='items']").each(function(){
			if (this.checked) {
				this.checked = false;
			}
			else {
				this.checked = true;
			}
		});
	});
	//自动更新顶部新工作流消息
	getNewWorkflow();
	setInterval(getNewWorkflow, 50000);
});

function getNewWorkflow(){
	var html = '';
	$.ajax({
		type: "GET",
		url: "/index/?method=getNewsWorkflow",
		async:false,	
		data: "",
		success: function(data){
			console.log(data);
			$(".wf-warning").html(data.length);
			$(".wf-top-newlist").empty();
			$.each(data, function(k,v){
				html += '<li>';
				html += '<a class="wfInfo-common" data-id="'+v.id+'" href="javascript:wfInfo(\''+v.id+'\',\''+v.type_name+'\');">';
				html += '<div class="clearfix">';
				html += '<span class="pull-left">';
				html += '<i class="text-info fa-lg fa fa-list-alt mar-rgt"></i>';
				html += v.type_name;
				html += '</span>';
				html += '<span class="pull-right badge badge-warning">受理中</span>';
				html += '</div>';
				html += '</a>';
				html += '</li>';
			});
			$('.wf-top-newlist').append(html);
		}
	});
}

// 倒计时弹框弹框
function tips(info,type,time,icon){
	(type == undefined) ? type="info" : type=type; 
	(time == undefined) ? time=3000 : time=time; 
	if(type == 'succeed'){
		type = 'success';
		icon = 'fa fa-check fa-lg';
	}
	if(type == 'error'){
		type = 'danger'
		icon = 'fa fa-times fa-lg';
	}
	if(type == 'warning'){
		icon = 'fa fa-warning fa-lg';
	}
	$.niftyNoty({
		type: type,
		icon: icon,
		message: info,
		container: 'floating',
		timer: time
	});
}

function wfInfo(id,title){
	tcSlide({
		level:1,
		title: title,
		where:'id='+id,
		url: '/workflow/info/',
	}).open();
}

function actTips(info, obj, id, time){
	var obj = obj || false;
	var t = time || 2;
	t *= 1000;
	if(obj !== false){obj.close().remove();}
	var d = dialog({content: info}).show();
	setTimeout(function(){
		d.close().remove();	
		if(obj !== false){
			$("#row_" + id).remove();
		}
	}, t);
}
// 加载页面
function tcLoad(url,where){
	var where = where || '',
	html = '';
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
 		time *= 1000;
 		var k = dialog({
 			title:"提示",
 			content: title
 		}).show();
 		setTimeout(function(){
 			k.close().remove();	
 		}, time);
 		return false;
 	}
 	return true;
 }

 function admPwdEdit(){
 	tcSlide({
 		level:1,
 		title:'后台用户密码修改',
 		width:30,
 		url:'/user/admPwdEdit/'
 	}).edit();
 }	

 function admUserEdit(){
 	tcSlide({
 		level:1,
 		title:'后台用户资料修改',
 		width:30,
 		url:'/user/admUserEdit/'
 	}).edit();	
 }

 function viewUserInfo(uid) {
 	tcSlide({
 		level:1,
 		title: '查看用户信息',
 		width: 50,
 		where: 'uid=' + uid,
 		url: '/user/userInfo.html'
 	}).open();
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

function selectOpposite(name, obj){
	if(name === undefined){
		name = 'table td input[type=checkbox]:not(:disabled)';
	}else{
		name = 'table td input[type=checkbox][data-name='+name+']:not(:disabled)';	
	}
 	if(obj === undefined){obj = $('#page-content').find(name);}
  	obj.each(function(){
  		if(this.checked){
  			$(this).parent().removeClass("active");
  		}else{
  			$(this).parent().addClass("active");
  		}
  		this.checked = !this.checked;
  	});
}

var getParam = function(name) {
	var search = document.location.search;
	var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
	var matcher = pattern.exec(search);
	var items = null;
	if (null != matcher) {
		try {
			items = decodeURIComponent(decodeURIComponent(matcher[1]));
		} catch (e) {
			try {
				items = decodeURIComponent(matcher[1]);
			} catch (e) {
				items = matcher[1];
			}
		}
	}
	return items;
};

