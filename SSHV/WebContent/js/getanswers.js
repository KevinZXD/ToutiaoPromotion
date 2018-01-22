

function getanswersbyid(id){
						$
						.ajax({
							type : "POST",
							url : "getQuestionsAnswers.action",
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
									alert("对不起，该问题还没有网友回答，您是第一个");
									answerid(id);
								}else{
									if(len>12){
										len=12;
									}
									var close="<button onclick='closeanswer("+id+")' class='label label-default' style='margin-left: 500px; cursor: pointer ;'>关闭网友答案</button>";
									
								
								for (var i = 0; i < len; i++) {
								var questionid=answers[i].questionid;
								var userid=answers[i].userid;
								var username=answers[i].username;
								var publicdate=answers[i].publicdate;
								var answe=answers[i].answers;
								var str1="<div class='thumbnail'><p>网友"+ username+" 于"+publicdate+"回答该问题</p> <p>"+answe+"</p> </div>";
								$("#answers"+id).append(str1);
								}
								$("#answers"+id).append(close);
								
							}
							}
						
						
						
						});
						
					};
					function answerid(id){
						 var customerId=sessionStorage.customerId; 
						   if (customerId == undefined) { 
							   alert("抱歉，请您注册登陆后再访问！");
						    window.location.href="register.html";
						    } else{
						    	
						   
						
						$("#inputid"+id).empty();
				var str1="<div id='inputid"+id+"'><form role='form'><div class='form-group'>";
                var str2="<label for='name'>请输入您的答案并提交</label><span onclick='answerbyid("+id+")' class='label label-default' style='margin-left: 350px; cursor: pointer ;'>提交该回答</span>";
               var str21="<span class='label label-default' style='margin-left: 50px; cursor: pointer ;' onclick='closeinput("+id+")'>关闭</span>";
                var str3="<textarea id='con"+id+"' class='form-control' rows='3'></textarea> </div></form></div>";
		        $("#inputid"+id).append(str1+str2+str21+str3);
					} }
					
					function answerbyid(id) {
						
						$.ajax({
							type : "POST",
							url : "insertQuestionsAnswers.action",
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
								
								$("input#tele").empty();
								var tip = eval(data);
								if(tip.tip==true){
									alert("你的回答已提交");
									getanswersbyid(id);
									
								}else{
									alert("你的回答未成功提交！");
								}
							}
						})

					};
					
					function closeanswer(id){
						$("#answers"+id).empty();
					}
					function closeinput(id){
						$("#inputid"+id).empty();
					}
