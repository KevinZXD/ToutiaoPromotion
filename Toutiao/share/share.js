function shareTo(stype,title,pageurl){
	var url='http://123.206.33.199/toutiao/shortvideo.html';
    var summary = "欢迎来到头条推荐系统，找寻你想找的内容,在搜索框输入  '"+title+"' 就可得到你要的内容";
    var desc = "欢迎来到头条推荐系统，在搜索框输入  '"+title+"' 就可得到你要的内容";
	var pics="http://123.206.33.199/toutiao/img/toutiao.jpg"
    if(stype=='qzone'){
    	
    	sessionStorage.url='https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+url+'?sharesource=qzone&title='+title+'&pics='+pics+'&summary='+summary+pageurl;
      console.log(sessionStorage.url);
        window.location.href="outer.html";
    }
    //新浪微博接口的传参
    if(stype=='sina'){
    	sessionStorage.url='http://service.weibo.com/share/share.php?url='+url+'?sharesource=weibo&title='+title+'&pic='+pics+'&appkey=2706825840';
window.location.href="outer.html";
    }
    //qq好友接口的传参
    if(stype == 'qq'){
    	sessionStorage.url='http://connect.qq.com/widget/shareqq/index.html?url='+url+'?sharesource=qzone&pics='+pics+'&summary='+summary+'&desc='+desc+pageurl;
        window.location.href="outer.html";
    }
    if(stype == 'wechat'){
    	sessionStorage.url='http://123.206.33.199/toutiao/img/qrcode.jpg';
       window.location.href="outer.html";
    }
   
    
}