			var video_id = null;
			var video_id1 = null;

			$("label#user_name").html(sessionStorage.UserName);
			$("label#user_id").html(sessionStorage.UserId);
			$("#account").html(sessionStorage.UserName);

			function getshow(url) {
				
				
				sessionStorage.url = url;
				window.location.href = "outer.html";

			};

			function comment() {
				if($.trim($("#t" + video_id1).val()).length == 0) {
					plus.nativeUI.toast("您的评论内容不能为空！");
				} else if(sessionStorage.customerId != 2) {
					plus.nativeUI.toast("您还未登录，请登录后再发表评论！");
					window.location.href = "login.html";
				} else {

					$.ajax({
						type: "POST",
						url: "http://123.206.33.199/toutiao/insertComment.action",
						data: {
							content: $.trim($("#t" + video_id1).val()),
							video_id: video_id, //$("label#video_id").text(),
							user_id: $("label#user_id").text(),
							user_name: $("label#user_name").text()

						},
						dataType: "JSON",
						success: function(data) {
							$("#t" + video_id1).empty();
							var tip = eval(data);
							if(tip.tip == true) {
								plus.nativeUI.toast("发表成功");
								getcomment(video_id);

							} else {
								plus.nativeUI.toast("发表失败!");
							}
						}
					})
				};
			}
			function getshare(title,picurl,video_id1){
				$("#s" + video_id1).empty();
				$("#share" + video_id1).empty();
				$("#inputid" + video_id1).empty();
				$("#answers" + video_id1).empty();
				var str1="<div class='fl'><strong>分享到：</strong></div>";
				var str2="<div class='fl' onclick=\"shareTo('qzone','"+title+"','"+picurl+"')\"><img src='share/qqzoneshare.png' width='30'></div>";
				var str3="<div class='fl' onclick=\"shareTo('qq','"+title+"','"+picurl+"')\"><img src='share/qqshare.png' width='32'></div>";
				var str4="<div class='fl' onclick=\"shareTo('sina','"+title+"','"+picurl+"')\"><img src='share/sinaweiboshare.png' width='36'></div>";
				var str5="<div class='fl' onclick=\"shareTo('wechat','"+title+"','"+picurl+"')\"><img src='share/wechatshare.png' width='32'></div>";
				
				$("#share" + video_id1).append(str1+str2+str3+str4+str5);
			};
			function getcomment(videoid) {
				video_id = videoid;
				video_id1 = $.trim(videoid);
				$("#s" + video_id1).empty();
				$("#share" + video_id1).empty();
				$
					.ajax({
						type: "POST",
						url: "http://123.206.33.199/toutiao/getVideosComments.action",
						data: {
							video_id: videoid,

						},
						dataType: "JSON",
						success: function(data) {
							var str1 = "<div class='content has-header'><div class='list list-inset'><label class='item item-input'><input type='text' id='t" + video_id1 + "' placeholder='输入您的评论'>";
							var str2 = "<label id='subcommit' onclick='comment()' class='button button - calm '>发表评论</label><label  onclick='closecomment(" + video_id1 + ")' class='button button - calm '>关闭</label></label></div></div><div class='content has-header ionic-pseudo'>";

							var str3 = "<div class='list list-inset' style='margin-bottom: 60px;'>";
							var str = "";
							var str4 = "</div></div>";

							var discuss = eval(data);
							if(discuss.length == 0) {
								plus.nativeUI.toast("还未有人发表过评论！你是第一个")
								$("#s" + video_id1).append(str1 + str2 + str3 + str4);

							} else {

								var len = discuss.length;
								if(len > 12) {
									len = 12;
								}
								for(var i = 0; i < len; i++) {
									var user_name = discuss[i].user_name;
									var say = discuss[i].content;
									var discusslist = "<a class='item item-avatar' href='#'><img src='images/toutiao.png'><h2>该用户 " + user_name + " 发表了该评论 </h2>";
									var discusscontent = "<p>" + say + " 回复" + "</p></a>";
									str = discusslist + discusscontent + str;

								}

								$("#s" + video_id1).append(str1 + str2 + str3 + str + str4);
							}

						}
					})
			}

			function closecomment(video) {

				$("#s" + video).empty();
			};

			$("#subcomment").click(function() {
				comment();
			});