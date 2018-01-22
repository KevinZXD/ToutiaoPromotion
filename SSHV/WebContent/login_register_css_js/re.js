function jumpTo() { 
	   var customerId=sessionStorage.customerId; 
	   if (customerId == undefined) { 
		   alert("抱歉，请您注册登陆后再访问！");
	    window.location.href="register.html";
	    } else{
	    	
	    }
	}
jumpTo();