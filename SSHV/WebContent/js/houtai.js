$(document)
		.ready(
				function() {
					var index = 0;
				
				
						refrash();
					function refrash() {
						$("#content").empty();
						$("#head_top").empty();
						$("span#titlename").empty();
						$
								.ajax({
									type : "POST",
									url : "getVideos.action",
									data : {
										index : index,
										table:"sequence"
									},
									dataType : "JSON",
									success : function(data) {
										$("span#titlename").text("自动化爬虫信息搜集展示");
										var video = eval(data);
										var headstr="<tr><th>视频id</th><th>视频标题</th><th>播放时常</th><th>用户发布时间</th></tr>";
										 $("#head_top").append(headstr);
										for (var i = 0; i < video.length; i++) {
											var title = video[i].title;
											var video_id = video[i].video_id;
											var image_url = video[i].image_url;
											var video_url = video[i].video_url;			
											var public_date = video[i].public_date;
											var ti = video[i].ti;
											
											var html = "<tr>" +
											"<td class='text-center' id='45'>"+video_id+"</td>" +
											"<td class='text-center'>" + title + "</td>" +
											
											"<td class='text-center'>" + ti + "</td>" +
											"<td class='text-center'>" + public_date + "</td>" +
											"</tr>";
										 
											
											$("#content").append(html);
										}
										index = index + 30;
									}
								})
					}
					function getusers() {
						$("#content").empty();
						$("#head_top").empty();
						$("span#titlename").empty();
						
						$
								.ajax({
									type : "POST",
									url : "getusersAction.action",
									data : {
										video_id : "all"

									},
									dataType : "JSON",
									success : function(data) {
										$("span#titlename").text("注册用户基本信息展示");
										var users = eval(data);
										var headstr="<tr><th>用户邮箱</th><th>用户名</th><th>用户密码</th><th>工作单位</th><th>手机</th><th>QQ</th></tr>";
										 $("#head_top").append(headstr);
										
										for (var i = 0; i < users.length; i++) {
											var email = users[i].email;
											var username = users[i].contact;
											var password = users[i].password;
											var company = users[i].company;
											var tele=users[i].tele;
											var qq=users[i].qq;
											var html = "<tr>" +
											"<td class='text-center' id='45'>"+email+"</td>" +
											"<td class='text-center'>" + username + "</td>" +
											
											"<td class='text-center'>" + password + "</td>" +
											"<td class='text-center'>" + company + "</td>" +
											"<td class='text-center'>" + tele + "</td>" +
											"<td class='text-center'>" + qq + "</td>" +
											"</tr>";
										 
											
											$("#content").append(html);
																					}

									}
								})
					}
					
					function getcomment() {
						$("#content").empty();
						$("#head_top").empty();
						$("span#titlename").empty();
						
						$
								.ajax({
									type : "POST",
									url : "getVideosComments.action",
									data : {
										video_id : "all"

									},
									dataType : "JSON",
									success : function(data) {
										$("span#titlename").text("用户评论信息展示");
										var discuss = eval(data);
										var headstr="<tr><th>用户id</th><th>用户名</th><th>视频id</th><th>评论内容</th><th>用户发布时间</th></tr>";
										 $("#head_top").append(headstr);
										
										for (var i = 0; i < discuss.length; i++) {
											var user_name = discuss[i].user_name;
											var say = discuss[i].content;
											var userid = discuss[i].user_id;
											var videoid = discuss[i].video_id;
											var publicdate=discuss[i].public_data;
											var html = "<tr>" +
											"<td class='text-center' id='45'>"+userid+"</td>" +
											"<td class='text-center'>" + user_name + "</td>" +
											
											"<td class='text-center'>" + videoid + "</td>" +
											"<td class='text-center'>" + say + "</td>" +
											"<td class='text-center'>" + publicdate + "</td>" +
											"</tr>";
										 
											
											$("#content").append(html);
																					}

									}
								})
					}
					
					function getnews() {
						$("#content").empty();
						$("#head_top").empty();
						$("span#titlename").empty();
						
						$
								.ajax({
									type : "POST",
									url : "getNews.action",
									data : {
										limit : "12",
										title : "any"

									},
									dataType : "JSON",
									success : function(data) {
										$("span#titlename").text("热点新闻咨询信息展示");
										var news = eval(data);
										var headstr="<tr><th>热点新闻id</th><th>新闻标题</th><th>新闻链接</th></tr>";
										 $("#head_top").append(headstr);
										
										for (var i = 0; i < news.length; i++) {
											var id = news[i].id;
											var title = news[i].title;
											var url = news[i].url;
											var html = "<tr>" +
											"<td class='text-center' id='45'>"+id+"</td>" +
											"<td class='text-center'>" + title + "</td>" +
											"<td class='text-center'>" + url + "</td>" +
											"</tr>";	
											$("#content").append(html);
																					}

									}
								})
					}
					
					function getimages() {
						$("#content").empty();
						$("#head_top").empty();
						$("span#titlename").empty();
						
						$
								.ajax({
									type : "POST",
									url : "getImages.action",
									data : {
										limit : "12",
										title : "any"

									},
									dataType : "JSON",
									success : function(data) {
										$("span#titlename").text("图片信息展示");
										var images = eval(data);
										var headstr="<tr><th>图片id</th><th>图片标题</th><th>图片链接</th></tr>";
										 $("#head_top").append(headstr);
										
										for (var i = 0; i < images.length; i++) {
											var id = images[i].id;
											var title = images[i].title;
											var url = images[i].image_url;
											var html = "<tr>" +
											"<td class='text-center' id='45'>"+id+"</td>" +
											"<td class='text-center'>" + title + "</td>" +
											"<td class='text-center'>" + url + "</td>" +
											"</tr>";
											$("#content").append(html);
																					}

									}
								})
					}
					
					function gettags() {
						$("#content").empty();
						$("#head_top").empty();
						$("span#titlename").empty();
						
						$
								.ajax({
									type : "POST",
									url : "getTags.action",
									data : {
										userid :"1001",

									},
									dataType : "JSON",
									success : function(data) {
										$("span#titlename").text("标签库信息展示");
										var tags = eval(data);
										var headstr="<tr><th>标签id</th><th>标签名</th></tr>";
										 $("#head_top").append(headstr);
										
										for (var i = 0; i < tags.length; i++) {
											var id = tags[i].tag_id;
											var title = tags[i].tag_name;
											
											var html = "<tr>" +
											"<td class='text-center' id='45'>"+id+"</td>" +
											"<td class='text-center'>" + title + "</td>" +
										
											"</tr>";
											$("#content").append(html);
																					}

									}
								})
					}
					
					function getfeedback() {
						$("#content").empty();
						$("#head_top").empty();
						$("span#titlename").empty();
						
						$
								.ajax({
									type : "POST",
									url : "getFeedback.action",
									data : {
										userid :"1001",

									},
									dataType : "JSON",
									success : function(data) {
										$("span#titlename").text("用户反馈信息展示");
										var feedback = eval(data);
										var headstr="<tr><th>用户id</th><th>用户名</th><th>用户联系方式</th><th>用户反馈内容</th></tr>";
										 $("#head_top").append(headstr);
										
										for (var i = 0; i < feedback.length; i++) {
											var id = feedback[i].userid;
											var name = feedback[i].username;
											var advice=feedback[i].advice;
											var contact =feedback[i].contact;
											
											var html = "<tr>" +
											"<td class='text-center' id='45'>"+id+"</td>" +
											"<td class='text-center'>" + name + "</td>" +
											"<td class='text-center'>" + contact + "</td>" +
											"<td class='text-center'>" + advice + "</td>" +
											"</tr>";
											$("#content").append(html);
																					}

									}
								})
					}
					
					function getuserinterest() {
						$("#content").empty();
						$("#head_top").empty();
						$("span#titlename").empty();
						
						$
								.ajax({
									type : "POST",
									url : "getUserInterest.action",
									data : {
										userid :"1001",

									},
									dataType : "JSON",
									success : function(data) {
										$("span#titlename").text("用户兴趣点挖掘信息展示");
										var interest = eval(data);
										var headstr="<tr><th>用户id</th><th>兴趣点1</th><th>兴趣点2</th><th>兴趣点3</th><th>兴趣点4</th><th>兴趣点5</th><th>兴趣点6</th></tr>";
										 $("#head_top").append(headstr);
										
										for (var i = 0; i < interest.length; i++) {
											var id = interest[i].user_id;
											var tag1 = interest[i].tag_id1;
											var tag2 = interest[i].tag_id2;
											var tag3 = interest[i].tag_id3;
											var tag4 = interest[i].tag_id4;
											var tag5 = interest[i].tag_id5;
											var tag6 = interest[i].tag_id6;
											
											var html = "<tr>" +
											"<td class='text-center' id='45'>"+id+"</td>" +
											"<td class='text-center'>" + tag1 + "</td>" +
											"<td class='text-center'>" + tag2 + "</td>" +
											"<td class='text-center'>" + tag3 + "</td>" +
											"<td class='text-center'>" + tag4 + "</td>" +
											"<td class='text-center'>" + tag5 + "</td>" +
											"<td class='text-center'>" + tag6 + "</td>" +
											"</tr>";
											$("#content").append(html);
																					}

									}
								})
					}
					$("#interest").click(function() {
						getuserinterest();
						$("#page").attr("hidden","true");
						
					});
					$("#feedback").click(function() {
						getfeedback();
						$("#page").attr("hidden","true");
						
					});
					
					$("#tags").click(function() {
						gettags();
						$("#page").attr("hidden","true");
						
					});
					$("#images").click(function() {
						getimages();
						$("#page").attr("hidden","true");
						
					});
					$("#news").click(function() {
						getnews();
						$("#page").attr("hidden","true");
						
					});

					$("#comments").click(function() {
						getcomment();
						$("#page").attr("hidden","true");
						
					});
					$("#users").click(function() {
						getusers();
						$("#page").attr("hidden","true");
						
					});
					$("#spider").click(function() {
						refrash();
						
					});
					$("#back").click(function() {
						index=index-60;
						refrash();
					});
					$("#next").click(function() {
						refrash();
					});
				
				});

