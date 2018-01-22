$(document).ready(function(){
	
	//获取JS传递的语言参数
	var utils = new Utils();
	var args = utils.getScriptArgs();	
	
	
	//隐藏Loading/注册失败 DIV
	$(".loading").hide();
	$(".login-error").hide();
	registError = $("<label class='error repeated'></label>");
	
	//加载国际化语言包资源
	utils.loadProperties(args.lang);
	
	//输入框激活焦点、移除焦点
	jQuery.focusblur = function(focusid) {
		var focusblurid = $(focusid);
		var defval = focusblurid.val();
		focusblurid.focus(function(){
			var thisval = $(this).val();
			if(thisval==defval){
				$(this).val("");
			}
		});
		focusblurid.blur(function(){
			var thisval = $(this).val();
			if(thisval==""){
				$(this).val(defval);
			}
		});
	 
	};
	/*下面是调用方法*/
	$.focusblur("#email");
	
	//获取表单验证对象[填写验证规则]
	var validate = $("#signupForm").validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			password: {
				required: true,
				minlength: 4,
				maxlength: 16
			},
			passwordAgain: {
				required: true,
				minlength: 4,
				maxlength: 16,
				equalTo: "#password"
			},
			contact: {
				required: true
			},
			company: {
				required: true
			},
			tel: {
				required: true,
				digits:true
			},
			qq: {
				required: true,
				digits:true
			}
		},
		messages: {
			email: {
				required: $.i18n.prop("请输入邮箱，邮箱不能为空！"),
				email: $.i18n.prop("邮箱的格式不正确")
			},
			password: {
				required: $.i18n.prop("请输入密码，密码不能为空！"),
				minlength: jQuery.format($.i18n.prop("密码格式为4-8位以字母，下划线，数字的集合")),
				maxlength: jQuery.format($.i18n.prop("密码长度有误"))
			},
			passwordAgain: {
				required: $.i18n.prop("请再次输入密码"),
				minlength: jQuery.format($.i18n.prop("注意密码格式")),
				maxlength: jQuery.format($.i18n.prop("密码长度有误")),
				equalTo: jQuery.format($.i18n.prop("两次密码不一致"))
			},
			contact: {
				required: $.i18n.prop("请输入联系人！")
			}
			
		}
	});
	
	
	//输入框激活焦点、溢出焦点的渐变特效
	if($("#email").val()){
		$("#email").prev().fadeOut();
	};
	$("#email").focus(function(){
		$(this).prev().fadeOut();
	});
	$("#email").blur(function(){
		if(!$("#email").val()){
			$(this).prev().fadeIn();
		};		
	});
	if($("#password").val()){
		$("#password").prev().fadeOut();
	};
	$("#password").focus(function(){
		$(this).prev().fadeOut();
	});
	$("#password").blur(function(){
		if(!$("#password").val()){
			$(this).prev().fadeIn();
		};		
	});
	if($("#passwordAgain").val()){
		$("#passwordAgain").prev().fadeOut();
	};
	$("#passwordAgain").focus(function(){
		$(this).prev().fadeOut();
	});
	$("#passwordAgain").blur(function(){
		if(!$("#passwordAgain").val()){
			$(this).prev().fadeIn();
		};		
	});
	if($("#contact").val()){
		$("#contact").prev().fadeOut();
	};
	$("#contact").focus(function(){
		$(this).prev().fadeOut();
	});
	$("#contact").blur(function(){
		if(!$("#contact").val()){
			$(this).prev().fadeIn();
		};		
	});
	
	
	//ajax提交注册信息
	$("#submit").bind("click", function(){
		
		regist(validate);
	});
	
	$("body").each(function(){
		$(this).keydown(function(){
			if(event.keyCode == 13){
				regist(validate);
			}
		});
	});
	
});

function regist(validate){	
	//校验Email, password，校验如果失败的话不提交
	if(validate.form()){
		if($("#checkBox").attr("checked")){
			
			var md5 = new MD5();
			$.ajax({
				url :"loginAction.action",
				type: "post",
				data: {
					email: $("#email").val(),
					//password: md5.MD5($("#password").val()),
					password:$("#password").val(),
					contact: $("#contact").val()
					
				},
				dataType: "json",
				beforeSend: function(){
					$('.loading').show();
					
					
				},
				success: function(data){
					//需要解析数据，判断处理情况，登陆是否正常
					$('.loading').hide();
					
					if(data.email==0){
						alert("该email未注册，请注册！");	
						window.location.href ="register.html";
					}
					else if(data.passwd==0){
						alert("该密码有误！请重新输入！");
					}
					else if(data.contact==0){
						alert("该用户名有误！请重新输入！");
						
					}else{
						alert("登陆成功！");
						
						sessionStorage.customerId =2;
						sessionStorage.UserId=data.userid;
						sessionStorage.UserName=$("#contact").val()
						data.url ="shortvideo.html"
						document.cookie="username="+$("#contact").val();
						document.cookie="userid="+data.userid;
						
					}
					window.location.href =data.url;
				}
				
			});
		}else{
			//勾选隐私政策和服务条款
			$(".login-error").show();
			$(".login-error").html($.i18n.prop("请勾选隐私政策和服务条款"));
		}
	}
}

var Utils = function(){};

Utils.prototype.loadProperties = function(lang){
	jQuery.i18n.properties({// 加载资浏览器语言对应的资源文件
		name:'ApplicationResources',
		language: lang,
		path:'resources/i18n/',
		mode:'map',
		callback: function() {// 加载成功后设置显示内容
		} 
	});	
};

Utils.prototype.getScriptArgs = function(){//获取多个参数
    var scripts=document.getElementsByTagName("script"),
    //因为当前dom加载时后面的script标签还未加载，所以最后一个就是当前的script
    script=scripts[scripts.length-1],
    src=script.src,
    reg=/(?:\?|&)(.*?)=(.*?)(?=&|$)/g,
    temp,res={};
    while((temp=reg.exec(src))!=null) res[temp[1]]=decodeURIComponent(temp[2]);
    return res;
};
