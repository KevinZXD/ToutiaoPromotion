getquestion();
$("label#user_name").html(sessionStorage.UserName);
$("label#user_id").html(sessionStorage.UserId);
function back(){
	history.back();
};
function getquestion() {

	$.ajax({
		type: "POST",
		url: "http://123.206.33.199/toutiao/getQuestionsAnswers.action",
		data: {
			tag: "question",
		},
		dataType: "JSON",
		success: function(data) {
			$("#content").empty();
			var question = eval(data);
			var len=question.length;
			if (len>60){
				len=60;
			}
			for(var i = 0; i < len; i++) {
				var id = question[i].id;
				var userid = question[i].userid;
				var contact = question[i].contact;
				var conten = question[i].question;
				var username = question[i].username;
				var publicdate = question[i].publicdate;
				var str1 = "<a class='item item-avatar' href='#'><img src='images/toutiao.png'> <h2>" + username + "</h2> <p>发表时间：" + publicdate + "</p>";
				var str2 = "<p>问题：" + conten + "</p></a>";
				var str3 = "<div class='item tabs tabs-secondary tabs-icon-left'><a class='tab-item' href='#'><i class='icon ion-thumbsup'></i> 喜欢";
				var str4 = "</a><a class='tab-item' onclick='getcomment("+id+")'><i class='icon ion-chatbox'></i> 评论</a><a class='tab-item' href='#' onclick=\"getshare('"+conten+"','当然这也需要你解答！','"+id+"')\">";
				var str5 = "<i class='icon ion-share'></i> 分享</a></div><div id='inputid"+id+"'></div> <div id='answers"+id+"'></div>  ";
				var str6="<div class='item' id='share"+id+"'></div>";
				$("#content").append(
					str1 + str2 + str3 + str4 + str5+str6);

			}
			
		}
	})
};