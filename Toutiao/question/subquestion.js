	function subquestion() {
		if($.trim($("textarea#question").val()).length==0||$.trim($("input#contact").val()).length==0){
			plus.nativeUI.toast("相关内容不能为空！");
		}else{
			
		
		$.ajax({
			type: "POST",
			url: "http://123.206.33.199/toutiao/insertQuestionsAnswers.action",
			data: {
				tag: "question",
				question: $("textarea#question").val(),
				contact: $("input#contact").val(),
				userid: $("label#user_id").text(),
				username: $("label#user_name").text(),

			},
			dataType: "JSON",
			error:function(){
				plus.nativeUI.toast("网络异常，问答提交失败!");
			},
			success: function(data) {

				$("textarea#question").empty();
				var tip = eval(data);
				if(tip.tip == true) {
					plus.nativeUI.toast("你的问题已收到，当网友回答后第一时间推送给你！")

				} else {
					plus.nativeUI.toast("问答提交失败!");
				}
			}
		})
	}};
	
	function jumpTo() {
		$("label#user_name").html(sessionStorage.UserName);
		$("label#user_id").html(sessionStorage.UserId);
		var customerId = sessionStorage.customerId;
		
		if(customerId == undefined) {
			alert("抱歉，您还未登陆，不能进行用户问答，请您登陆或者注册");
			window.location.href = "login.html";
		} else {

			subquestion();
		
		}
	};

