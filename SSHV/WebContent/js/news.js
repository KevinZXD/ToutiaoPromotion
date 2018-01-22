$(document)
		.ready(

				function() {
					var limit=0;
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
					}
					;
					function getNews(limit) {
							
						$("#news").empty();
						
						$
								.ajax({
									type : "POST",
									url : "getNews.action",
									data : {
										limit : limit,
										title : $("label#title").text(),

									},
									dataType : "JSON",
									success : function(data) {
										
										var news = eval(data);
										for (var i = 0; i < news.length; i++) {
											var title = news[i].title;
											var say = news[i].content;
											var imageurl = news[i].image_url;
											var url = news[i].url;

											var str1 = "<div class='col-sm-6 col-md-3' style='width:364px;height: 266px;'><div class='thumbnail'><img src='"
													+ imageurl
													+ "' alt='载入中......'>";
											var str2 = "<div class='caption'><h4>"
													+ title
													+ "</h4><p><a href='"
													+ url
													+ "'>" + say;
											var str3 = "</a></p></div></div></div>";

											
											$("#news").append(str1+str2+str3);
										}

									}
								})
					}
					
					getNews(0);
					$("#next").click(function() {
						limit+=12;
						getNews(limit);
					});
					$("#back").click(function() {
						limit-=24;
						getNews(limit);
					});

				});
