

function getanswersbyid(id){
						$
						.ajax({
							type : "POST",
							url : "http://123.206.33.199/toutiao/getQuestionsAnswers.action",
							data : {
								tag : "answersbyid",
								questionid:id,
							},
							dataType : "JSON",
							success : function(data) {
								$("#answers"+id).empty();
								var answers = eval(data);
								var len=answers.length;
								if(len==0){
									plus.nativeUI.toast("对不起，该问题还没有网友回答，您是第一个");
									answerid(id);
								}else{
									if(len>12){
										len=12;
									}
									var close="<button onclick='closeanswer("+id+")' class='button button-calm'   style=' margin-left:640px;cursor: pointer ;'>关闭网友答案</button>";
									
								
								for (var i = 0; i < len; i++) {
								var questionid=answers[i].questionid;
								var userid=answers[i].userid;
								var username=answers[i].username;
								var publicdate=answers[i].publicdate;
								var answe=answers[i].answers;
								
			var str1="<a class='item item-avatar' href='#'><img src='images/person.png'><h2>"+username+"</h2><p>发表时间："+publicdate+"</p>";
	         var str2="<p>解答："+answe+"</p></a>";
								
								
								$("#answers"+id).append(str1+str2);
								}
								$("#answers"+id).append(close);
								
							}
							}
						
						
						
						});
						
					};
					function getcomment(id){
					$("#share" + id).empty();
						getanswersbyid(id);
							answerid(id);
					}
					function answerid(id){
						
						
						$("#inputid"+id).empty();
						
				
						
					var str1="<div id='inputid'><label class='item item-input'><textarea id='con"+id+"' placeholder='请输入您的解答'></textarea>";
       				var str2="<label class='button button-calm' onclick='answerbyid("+id+")'>发表</label> <label class='button button-calm' onclick='closeinput("+id+")'>取消</label></label></div>";
	
						
						
			        $("#inputid"+id).append(str1+str2);
					 };
					
					function answerbyid(id) {
						 var customerId=sessionStorage.customerId; 
						 
						   if (customerId == undefined) { 
							   plus.nativeUI.toast("抱歉，请您注册登陆后再发表评论！");
						    window.location.href="reg.html";
						   } else{
						
						$.ajax({
							type : "POST",
							url : "http://123.206.33.199/toutiao/insertQuestionsAnswers.action",
							data : {
								tag:"answers",
								questionid : id,
								userid : $("label#user_id").text(),
								answers : $("textarea#con"+id).val(),
								username : $("label#user_name").text(),
								question:"重新设计",

							},
							dataType : "JSON",
							success : function(data) {
								
								$("textarea#con"+id).empty();
								var tip = eval(data);
								if(tip.tip==true){
									plus.nativeUI.toast("你的回答已提交");
									getanswersbyid(id);
									
								}else{
									plus.nativeUI.toast("你的回答未成功提交！");
								}
							}
						})

					}};
					
					function closeanswer(id){
						$("#answers"+id).empty();
					};
					function closeinput(id){
						
						$("#inputid"+id).empty();
					};
