function getNews() {
	sessionStorage.flag= 2;
	var x = 0;
	var y = 100;
	var rand = parseInt(Math.random() * (x - y + 1) + y);
	$("#content").empty();

	$
		.ajax({
			type: "POST",
			url: "http://123.206.33.199/toutiao/getNews.action",
			data: {
				limit: rand,
				title: "title",

			},
			dataType: "JSON",
			success: function(data) {
				network = true;
				sessionStorage.flag = 2;
				var news = eval(data);
				for(var i = 0; i < news.length; i++) {
					var id = news[i].id;
					var title = news[i].title;
					var say = news[i].content;
					var imageurl = news[i].image_url;
					var url = news[i].url;
					
					var vv = "</li><a onclick=\"getshow('" + url + "')\"><img class='full-image' style='height:20%; width:100%' src='" + imageurl + "' /></a>";
					var str1 = "<div class='list card'><div class='item item-avatar'><img src='images/person.png'>";
					var str2 = "<h2>Kevin ZXD</h2><p>热点资讯标题  ： " + title + "</p></div><div class='item item-body'>" + vv;
					var str3 = "<p>新闻简要： " + say + "<p><a href='#' class='subdued'>1 喜欢</a><a href='#' class='subdued'>5 评论</a></p></div>";
					var str4 = "<div class='item tabs tabs-secondary tabs-icon-left'><a class='tab-item' href='#'><i class='icon ion-thumbsup'></i> 喜欢</a>";
					var str5 = "<a class='tab-item' href='#' onclick='getcomment(" + id + ")'><i class='icon ion-chatbox'></i> 评论</a><a class='tab-item' href='#' onclick=\"getshare('"+title+"','"+url+"','"+id+"')\"><i class='icon ion-share'></i> 分享</a></div></div>";
					var str6 = "<div id='s" + id + "'></div>";
					var str7="<div class ='list-inset' id='share"+id+"'></div>";
					var str = str1 + str2 + str3 + str4 + str5 + str6+str7;

					$("#content").append(str);
				}

			}
		})
};



function getImages() {
	sessionStorage.flag=3 ;
	var x = 0;
	var y = 100;
	var rand = parseInt(Math.random() * (x - y + 1) + y);

	$("#content").empty();

	$
		.ajax({
			type: "POST",
			url: "http://123.206.33.199/toutiao/getImages.action",
			data: {
				limit: rand,
				title: $("label#title").text(),

			},
			dataType: "JSON",
			success: function(data) {
				network = true;
				sessionStorage.flag = 3;
				var images = eval(data);
				for(var i = 0; i < images.length; i++) {
					var id = images[i].id;
					var title = images[i].title;
					var imageurl = images[i].image_url;
					var url = images[i].url;
					
					var vv = "</li><a onclick=\"getshow('" + imageurl + "')\"><img src='" + url + "'   class='full-image' style='height:20%; width:100%'/></a>";
					
					var str1 = "<div class='list card'><div class='item item-avatar'><img src='images/person.png'>";
					var str2 = "<h2>Kevin ZXD</h2><p>今日美图标题  ： " + title + "</p></div><div class='item item-body'>" + vv;
					var str3 = "<p><a href='#' class='subdued'>1 喜欢</a><a href='#' class='subdued'>5 评论</a></p></div>";
					var str4 = "<div class='item tabs tabs-secondary tabs-icon-left'><a class='tab-item' href='#'><i class='icon ion-thumbsup'></i> 喜欢</a>";
					var str5 = "<a class='tab-item' href='#' onclick='getcomment(" + id + ")'><i class='icon ion-chatbox'></i> 评论</a><a class='tab-item' href='#' onclick=\"getshare('"+title+"','"+imageurl+"','"+id+"')\"><i class='icon ion-share'></i> 分享</a></div></div>";
					var str6 = "<div id='s" + id + "'></div>";
					var str7="<div class ='list-inset' id='share"+id+"'></div>";
					var str = str1 + str2 + str3 + str4 + str5 + str6+str7;
					

					$("#content").append(str);
				}

			}
		})

};
