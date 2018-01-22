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
					function jumpTo3() { 
						   var customerId=sessionStorage.customerId; 
						   if (customerId == undefined) { 
							   alert("抱歉，您还未登陆，您还不能发表评论，请您登陆或者注册");
						    window.location.href="register.html";
						    } else{
						    	comment();
						    }
						};
					$("label#user_name").html(getCookie("username"));
					$("label#user_id").html(getCookie("userid"));
					
					function comment() {
						

						$("#textarea#cont").empty();

						$.ajax({
							type : "POST",
							url : "insertComment.action",
							data : {
								content : $("textarea#cont").val(),
								video_id : $.query.get("videoid"),//$("label#video_id").text(),
								user_id : $("label#user_id").text(),
								user_name : $("label#user_name").text()

							},
							dataType : "JSON",
							success : function(data) {
								$("#textarea#cont").empty();
								var tip = eval(data);
								if(tip.tip==true){
									$("#myAlert1").attr("hidden",false);
									
								}else{
									$("#myAlert2").attr("hidden",false);
								}
							}
						})
					};
					function produce() {
						var customerId=sessionStorage.customerId; 
						   if (customerId == undefined) { 
							   alert("抱歉，您还未登陆，您还不能发表评论，请您登陆或者注册");
						    window.location.href="register.html";
						    } else{
						    	$("#subitem1").html($("#videotitle").text());
								$("#myAlert1").attr("hidden",true);
								$("#myAlert2").attr("hidden",true);
								$("#textarea#cont").val('');
						    }
						
					}
					;

					function getData1() {
						var title = $.query.get("title");
						var imageurl = $.query.get("image");
						var videourl = $.query.get("video");
						var videoid = $.query.get("videoid");
						$("#videotitle").html(title);
						$("label#video_id").text(videoid);
						$("#myvideo").attr("src",videourl);
						$("#myvideo").attr("poster",imageurl);
						$("#myvideo1").attr("src",videourl);
						$("#myvideo1").attr("poster",imageurl);

					}
					
					function getcomment() {

						$("#group_diss").empty();
						$("#subitem").html($("#videotitle").text());
						$
								.ajax({
									type : "POST",
									url : "getVideosComments.action",
									data : {
										video_id : $("label#video_id").text(),

									},
									dataType : "JSON",
									success : function(data) {
										var discuss = eval(data);
										if(discuss.length==0){
											$("#myAlert3").attr("hidden",false);
										}else{
											$("#myAlert3").attr("hidden",true);
										}
										for (var i = 0; i < discuss.length; i++) {
											var user_name = discuss[i].user_name;
											var say = discuss[i].content;
											var str = "<h4 class='list-group-item-heading'>用户"
													+ user_name
													+ "发表评论</h4><p class='list-group-item-text'>"
													+ say + "</p>";
											$("#group_diss").append(str);
										}

									}
								})
					}
					getData1();

					$("#getcom").click(function() {
						getcomment();
					});
					$("#writecomment").click(function() {
						produce();
						
					});

					$("#sub").click(function() {
						jumpTo3();
					});
					

				});
