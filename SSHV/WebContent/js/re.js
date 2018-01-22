function jumpTo() { 
	   var name=sessionStorage.UserName; 
	   if (name != "kevin") { 
		   alert("抱歉，您没有权限进入后台管理");
	    window.location.href="shortvideo.html";
	    } 
	}
jumpTo();