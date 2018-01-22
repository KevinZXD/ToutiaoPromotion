$(document)
		.ready(
				function() {

					function getCookie(cname) {
											var ss = document.cookie;
											var name = cname + "=";
											var ca = document.cookie.split(';');
											for (var i = 0; i < ca.length; i++) {
												var c = ca[i].trim();
												if (c.indexOf(name) == 0)
													return c.substring(name.length, c.length);
											}
											return "";
										};

					var index1 = 2000;
					refrash();
					$("span#adminName").html(getCookie("username"));
					$("label#user_name").html(getCookie("username"));
					$("label#user_id").html(getCookie("userid"));
					function refrash() {
						$("#show").empty();
						
						 var customerId=sessionStorage.customerId; 
						   if (customerId == 2) { 
							   $("#login").attr("hidden",true);
							 
						    } 
						    
						
						$
								.ajax({
									type : "POST",
									url : "getVideos.action",
									data : {
										index : index1,
										table:"2"
									},
									dataType : "JSON",
									success : function(data) {
										var video = eval(data);

									for (var i = 0; i < video.length; i++) {
											var title = video[i].title;
											var video_id = video[i].video_id;
											var image_url = video[i].image_url;
											var video_url = video[i].video_url;
											var url = "toutiao.html?title="
													+ title + "&videoid="
													+ video_id + "&image="
													+ image_url + "&video="
													+ video_url;
											var public_date = video[i].public_date;
											var ti = video[i].ti;
											// 这少了‘’导致出错好久
											var but = "<a href='" + url
													+ "'>详细内容</a>";
											// var but="<a >详细内容</a>";
											var str1 = "<div class='col-md-4 column'><div class='list-group'><a href='#' class='list-group-item active'><h4 class='list-group-item-heading' style='border-bottom-right-radius: 15px;border:5px;'>"
													+ title + "</h4></a>";
											var str2 = "<video style='width:290px;height:200px' controls='controls' preload='none' src='"
													+ video_url
													+ "' poster='"
													+ image_url + "'></video>";
											var str3 = "</div><p><a class='btn'>详细内容»</a></p></div>";

											var str = "<li>"
													+ title
													+ but
													+ "</li><video width='600px' height='300px' src='"
													+ video_url
													+ "' poster='"
													+ image_url
													+ "' controls='controls' preload='none'></video><hr/>";
											$("#show").append(
													str1+str2+but);
											$("a").click(function() {
												window.location.href = url;
											});

										}

									}
								})

					};
					function jumpTo1() { 
						   var customerId=sessionStorage.customerId; 
						   if (customerId == undefined) { 
							   alert("抱歉，您还未登陆，不能进行用户反馈，请您登陆或者注册");
						    window.location.href="register.html";
						    } else{
						    	feedback();
						    }
						};
						function jumpTo2() { 
							   var customerId=sessionStorage.customerId; 
							   if (customerId == undefined) { 
								   alert("抱歉，您还未登陆，不能进行用户问答，请您登陆或者注册");
							    window.location.href="register.html";
							    } else{
							    	subquestion();
							    }
							};
							
							
					function feedback() {
						
						
						
						$.ajax({
							type : "POST",
							url : "insertAdvice.action",
							data : {
								advice : $("textarea#cont").val(),
								contact : $("input#tele").val(),
								userid : $("label#user_id").text(),
								username : $("label#user_name").text()

							},
							dataType : "JSON",
							success : function(data) {
								
								$("input#tele").empty();
								var tip = eval(data);
								if(tip.tip==true){
									$("#myAlert1").attr("hidden",false);
									
								}else{
									$("#myAlert2").attr("hidden",false);
								}
							}
						})
					};
					
					
function subquestion() {
						
						
						
						$.ajax({
							type : "POST",
							url : "insertQuestionsAnswers.action",
							data : {
								tag:"question",
								question : $("textarea#question").val(),
								contact : $("input#tel").val(),
								userid : $("label#user_id").text(),
								username : $("label#user_name").text()

							},
							dataType : "JSON",
							success : function(data) {
								
								$("input#tel").empty();
								var tip = eval(data);
								if(tip.tip==true){
									$("#myAlert3").attr("hidden",false);
									
								}else{
									$("#myAlert4").attr("hidden",false);
								}
							}
						})
					};
					

					
					
					$("#subquestion").click(function() {
						jumpTo2();
						
					});
					$("#answer").click(function() {
						window.location.href="answers.html"
						
					});
					$("#ques").click(function() {
						 var customerId=sessionStorage.customerId; 
						   if (customerId == undefined) { 
							   alert("抱歉，您还未登陆，不能进行用户问答，请您登陆或者注册");
						    window.location.href="register.html";
						    } else{
						    	$("textarea#question").empty();
								$("input#tel").empty();
								$("#myAlert3").attr("hidden",true);
								$("#myAlert4").attr("hidden",true);
						    }
						
						
					});
			
					$("#writecomment").click(function() {
						 var customerId=sessionStorage.customerId; 
						   if (customerId == undefined) { 
							   alert("抱歉，您还未登陆，不能进行用户反馈，请您登陆或者注册");
						    window.location.href="register.html";
						    } else{
						    	$("textarea#cont").empty();
								$("input#tele").empty();
								$("#myAlert1").attr("hidden",true);
								$("#myAlert2").attr("hidden",true);
						    }
						
						
					});

					$("#feedback").click(function() {
						jumpTo1();
					});

					$("#fresh").click(function() {
						
						refrash();
						
					});

				});
