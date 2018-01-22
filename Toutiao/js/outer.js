
function showurl(){
	
		var url=sessionStorage.url;
		$("iframe").attr("src",url);
}

		function back(){
			
			history.back();
			
		}
		showurl();
