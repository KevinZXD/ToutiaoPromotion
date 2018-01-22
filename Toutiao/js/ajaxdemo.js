var network = true;
var index=0;
var ajax = function(index) {
	//利用askh5的演示接口数据
	var url = "http://123.206.33.199/toutiao/getVideos.action";
	//发送数据，随便填，反正返回的数据都是那个样

	var data = {
		index: index,
		table: "2",

	};
	$.post(url, data, success, 'json');
};
var search = function() {
	//利用askh5的演示接口数据
	var url = "http://123.206.33.199/toutiao/searchByTitle.action";
	//发送数据，随便填，反正返回的数据都是那个样
	var data = {
		title: $("#sea").val(),
     
	};
	
	$.post(url, data, success, 'json');
};
function getList() {
	if(network) {
		sessionStorage.flag=1;
		ajax(index);
		index=index+20;
	
	} else {
		plus.nativeUI.toast("当前网络不给力，请稍后再试");
	}
};
function getSearchList(){
	if(network) {
		search();
		console.log("search.....");
		
	} else {
		plus.nativeUI.toast("当前网络不给力，请稍后再试");
	}
};
//成功响应的回调函数
var success = function(response) 
{$("#content").empty();
sessionStorage.flag=1;
	var video = eval(response);
	for(var i = 0; i < video.length; i++) 
	{
		var title = video[i].title;
		var video_id = video[i].video_id;
		video_id1=$.trim(video_id);
		var image_url = video[i].image_url;
		var video_url = video[i].video_url;
		
		var url = "toutiao.html?title=" +
			title + "?videoid=" +
			video_id + "?image=" +
			image_url + "?video=" +
			video_url;
		var public_date = video[i].public_date;
		var ti = video[i].ti;
		// 这少了‘’导致出错好久
		var but = "<a href='" + url +
			"'>详细内容</a>";
		// var but="<a >详细内容</a>";
			var vv="</li><video class='full-image' style='height:20%; width:100%' src='"+ video_url+ "' poster='"+ image_url+ "' controls='controls' preload='none'></video>";
			var str1="<div class='list card'><div class='item item-avatar'><img src='images/person.png'>";
			var str2="<h2>Kevin ZXD</h2><p>发表日期  : "+public_date+"</p><p>标题  ： "+title+"</p></div><div class='item item-body'>"+vv;
			var str3="<p><a href='#' class='subdued'>1 喜欢</a><a href='#' class='subdued'>5 评论</a></p></div>";
			var str4="<div class='item tabs tabs-secondary tabs-icon-left'><a class='tab-item' href='#'><i class='icon ion-thumbsup'></i> 喜欢</a>";
			var str5="<a class='tab-item' href='#' onclick='getcomment("+video_id+")'><i class='icon ion-chatbox'></i> 评论</a><a class='tab-item' href='#' onclick=\"getshare('"+title+"','视频网址："+video_url+"','"+video_id1+"')\"><i class='icon ion-share'></i> 分享</a></div></div>";
			var str6="<div id='s"+video_id1+"'></div>";
			var str7="<div class ='list-inset' id='share"+video_id1+"'></div>";
			var str=str1+str2+str3+str4+str5+str6+str7;
			
		$("#content").append(str);
		

	}

};



// 扩展API准备完成后要执行的操作
function plusReady(){
	
    if(plus.networkinfo.getCurrentType() == plus.networkinfo.CONNECTION_NONE) {
			network = false;
		} else {
			//调用接口数据的入口方法
			if(sessionStorage.flag==1||sessionStorage.flag==undefined){
				getList();
			}else 	if(sessionStorage.flag==2){
		getNews();
	}else{
		getImages();
	}
			
			
		}
}

if(window.plus){
	
    plusReady();
}else{ 
    document.addEventListener( "plusready", plusReady, false );
}
