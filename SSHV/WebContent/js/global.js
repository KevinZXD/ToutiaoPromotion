	$(function(){
		$(".carousel").carousel();
		$(".b-menu .bm-node").hover(
			function() { $(this).addClass('open') },
			function() { $(this).removeClass('open') }
		);
	
		$(".b-menu li.bm-node:first").addClass('m-first');
		$(".b-menu li.bm-node:last").addClass('m-last');
	
		$('.js-newhot').each(function(index){
			$(this).find('li:lt(3)').addClass('newhot');
		});
	});
