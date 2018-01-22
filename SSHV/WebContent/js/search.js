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
					function jumpTo2() { 
						   var customerId=sessionStorage.customerId; 
						   if (customerId == undefined) { 
							   alert("抱歉，您还未登陆，无法根据您的兴趣点进行推送，请您登陆或者注册");
						    window.location.href="register.html";
						    } else{
						    	
						    }
						};

					function search1() {
						var s= $("#searchkeyword").val();
						if(s.length==0){
							alert("请键入你所要内容的关键字");
						}

						$
								.ajax({
									type : "POST",
									url : "searchByTitle.action",
									data : {
										title : $("#searchkeyword").val(),

									},
									dataType : "JSON",
									success : function(data) {
										$("#show").empty();
										var video = eval(data);
										if(video.length==0){
											alert("抱歉，系统数据库还未搜集到该内容，系统正在努力搜集这方面的内容！。。。");
										}else{
											
										
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
											var str1 = "<div class='col-md-4 column'><div class='list-group'><a  class='list-group-item active'><h4 class='list-group-item-heading' style='border-bottom-right-radius: 15px;border:5px;'>"
													+ title + "</h4></a>";
											var str2 = "<video style='width:290px;height:200px' controls='controls' preload='none' src='"
													+ video_url
													+ "' poster='"
													+ image_url + "'></video>";
											//有误，唯一性以后更正
											//var str3 = "</div><p><a class='btn' id='"+$.trim(video_id)+"'>详细内容»</a></p></div>";
											var str3 = "</div><p><a class='btn' >详细内容»</a></p></div>";

											var str = "<li>"
													+ title
													+ but
													+ "</li><video width='600px' height='300px' src='"
													+ video_url
													+ "' poster='"
													+ image_url
													+ "' controls='controls' preload='none'></video><hr/>";
											$("#show").append(
													str1 + str2 + but);
											$("a").click(function() {
												window.location.href = url;
											});

										}}

									}
								})

					}
					;
					function getpromotion() {
						jumpTo2();

						$
								.ajax({
									type : "POST",
									url : "getusersPromotionAction.action",
									data : {
										userid : $("label#userid").text(),

									},
									dataType : "JSON",
									success : function(data) {
										$("#show").empty();
										var video = eval(data);
										if(video.length==0){
											alert("系统还没有您的记录！无法分析你的兴趣点，进而无法帮你推荐！");
										}else{
											
									
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
											var str1 = "<div class='col-md-4 column'><div class='list-group'><a  class='list-group-item active'><h4 class='list-group-item-heading' style='border-bottom-right-radius: 15px;border:5px;'>"
													+ title + "</h4></a>";
											var str2 = "<video style='width:290px;height:200px' controls='controls' preload='none' src='"
													+ video_url
													+ "' poster='"
													+ image_url + "'></video>";
											//有误，唯一性以后更正
											//var str3 = "</div><p><a class='btn' id='"+$.trim(video_id)+"'>详细内容»</a></p></div>";
											var str3 = "</div><p><a class='btn' >详细内容»</a></p></div>";

											var str = "<li>"
													+ title
													+ but
													+ "</li><video width='600px' height='300px' src='"
													+ video_url
													+ "' poster='"
													+ image_url
													+ "' controls='controls' preload='none'></video><hr/>";
											$("#show").append(
													str1 + str2 +but);
											$("a").click(function() {
												window.location.href = url;
											});

										}}

									}
								})

					}
					;

					$("#sear").click(function() {

						search1();

					});
					$("#promotion").click(function() {

						getpromotion();

					});
				});
