//function customWaiting(n){
//	var w=plus.nativeUI.showWaiting("处理中，请等待...\n5", {loading:{icon:"images/waiting.png"}});
//	w.onclose=function(){
//		clearInterval(t);
//	}
//	
//	var t=setInterval(function(){
//		n--;
//		w.setTitle("处理中，请等待...\n"+n);
//		if(n<=0){
//			w.close();
//			clearInterval(t);
//			plus.nativeUI.toast("您的网速有问题哦！请稍后再试!");
//		}
//	},1000);
//};

function logout(){
	if(sessionStorage.UserName==undefined){
		plus.nativeUI.toast("您还未登陆过！，请到设置中重新登陆哦！");
	}else{
				plus.nativeUI.toast("注销成功！");
				sessionStorage.flag=undefined;
				sessionStorage.customerId = undefined;
				sessionStorage.UserId = undefined;
				sessionStorage.UserName = undefined;
				window.location.url = "main.html";
	}
	
};
function loginUser() {
var w=null;
var n=5;
	$.ajax({
		url: "http://123.206.33.199/toutiao/loginAction.action",
		type: "post",
		data: {
			email: $("#email").val(),
			password: $("#password").val(),
			contact: $("#account").val()

		},
		dataType: "json",
		beforeSend: function() {
			 w=plus.nativeUI.showWaiting("处理中，请等待...\n5", {loading:{icon:"images/waiting.png"}});
			w.onclose=function(){
		clearInterval(t);
	};
	
	var t=setInterval(function(){
		n--;
		w.setTitle("正在登陆中，请等待...\n"+n);
		if(n<=0){
			w.close();
			clearInterval(t);
			plus.nativeUI.toast("您的网速有问题哦！请稍后再试!");
		}
	},1000);
		},
		
		success: function(data) {
			//需要解析数据，判断处理情况，登陆是否正常
			
		w.close();
			if(data.email == 0) {
				plus.nativeUI.toast("该email未注册，请注册！");
				window.location.href = "reg.html";
			} else if(data.passwd == 0) {
				plus.nativeUI.toast("该密码有误！请重新输入！");
			} else if(data.contact == 0) {
				plus.nativeUI.toast("该用户名有误！请重新输入！");

			} else {
				plus.nativeUI.toast("登陆成功！");
				sessionStorage.flag=1;
				sessionStorage.customerId = 2;
				sessionStorage.UserId = data.userid;
				sessionStorage.UserName = $("#account").val();
				data.url = "main.html";
			

			}
			window.location.href = data.url;
		}

	});
}

function regUser(){	
var w=null;
var n=5;
	//校验Email, password，校验如果失败的话不提交

			$.ajax({
				url: "http://123.206.33.199/toutiao/registerAction.action",
				type: "post",
				data: {
					email: $("#email").val(),
					password:$("#password").val(),
					contact: $("#account").val(),
					company: "kevin",
					tele: $("#phone").val(),
					qq: $("#qq").val(),
					
				},
				dataType: "json",
				beforeSend: function(){
					//customWaiting(5);
							 w=plus.nativeUI.showWaiting("正在注册中，请等待...\n5", {loading:{icon:"images/waiting.png"}});
			w.onclose=function(){
		clearInterval(t);
	};
	
	var t=setInterval(function(){
		n--;
		w.setTitle("处理中，请等待...\n"+n);
		if(n<=0){
			w.close();
			clearInterval(t);
			plus.nativeUI.toast("您的网速有问题哦！请稍后再试!");
		}
	},1000);
				},
				success: function(data){
					//这里需要对后台传过来的数据进行解析，注册是否顺利
				//customWaiting(0);
				w.close();
					if(data.email==0){
						plus.nativeUI.toast("该email已经注册，请登陆！");	
					}
					else{
						plus.nativeUI.toast("注册成功！");	
						data.url="login.html";
					}
					window.location.href =data.url;
					
				}
			});
		}
	
