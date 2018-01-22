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
					function getimages(limit) {
							
						$("#images").empty();
						
						$
								.ajax({
									type : "POST",
									url : "getImages.action",
									data : {
										limit : limit,
										title : $("label#title").text(),

									},
									dataType : "JSON",
									success : function(data) {
										
										var images = eval(data);
										for (var i = 0; i < images.length; i++) {
											var title = images[i].title;
											var imageurl = images[i].image_url;
											var url = images[i].url;
											
										var str1="<div class='col-sm-6 col-md-3' style='width=200px;height:450px;'><div class='thumbnail'><a href='"+imageurl+"'>";
											var str2="<img src='"+url+"' width='200' height='300' />";
												var str3="</a><div class='caption'><h3 >"+title+"</h3></div></div></div>";
											
											

											
											$("#images").append(str1+str2+str3);
										}

									}
								})
					}
					
					getimages(0);
					$("#next").click(function() {
						limit+=12;
						getimages(limit);
					});
					$("#back").click(function() {
						limit-=24;
						getimages(limit);
					});

				});
