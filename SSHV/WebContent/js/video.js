$(document)
		.ready(
				function() {
					var index = 0;
					var index1 = 2000;
					refrash();

					function refrash() {
						$("#content").empty();
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
											// document.cookie = "title="+title;
											// document.cookie="image="+image_url;
											// document.cookie="video="+video_url
											// document.cookie="videoid="+video_id;//此处拼接内容
											//					

											var public_date = video[i].public_date;
											var ti = video[i].ti;
											// 这少了‘’导致出错好久
											var but = "<a href='" + url
													+ "'>详细内容</a>";
											// var but="<a >详细内容</a>";

											var str = "<li>"
													+ title
													+ but
													+ "</li><video width='600px' height='300px' src='"
													+ video_url
													+ "' poster='"
													+ image_url
													+ "' controls='controls' preload='none'></video><hr/>";
											$("#content").append(str);
											$("a").click(function() {
												window.location.href = url;
											});

										}
										index = index + 6;
									}
								})
					}

					$("#refresh1").click(function() {
						refrash();
					});
					$("#refresh2").click(function() {
						refrash();
					});
				});
