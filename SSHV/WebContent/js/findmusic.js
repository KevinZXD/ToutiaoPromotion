   $(document).ready(function () {  
		var authors=[];
		var songs={};
            $('#search').click(function () {  
			$("#message_area").empty();
				$("#player").empty();
			var url1="http://s.music.163.com/search/get/?type=1&s="+$("#keywords").val()+"&limit=15";
              $.ajax({  
                     type: "GET",  
                     url: url1,
                     dataType: "JSONP",  
                     success: function(data){  
                        var json=eval(data);
						var list_music=json['result']['songs'];
						$.each(list_music,function(index,Name){
						var music_url=list_music[index].audio;
						var music=list_music[index].name;
						var pic_url=list_music[index]['album'].picUrl;
						var author=list_music[index]['artists'][0].name;
						songs.name=author;
						songs.picurl=pic_url;
						songs.url=music_url;
						authors.push(songs);
						var str = $("<ul><li><a id="+author+" href='#'>"+music+"( "+author+" )"+"</a></li></ul>");  
							$("#message_area").append(str);
		         $('#'+author).click(function(){
					 $("#player").empty();
			
				$("#player").append("<audio src="+music_url+" controls='controls'autoplay='autoplay'></audio>");
					$('body').css("background-image","url("+pic_url+")");
				});
		
							
						}
						);
                     }	
					 	
                     }); 
		
				
            }); 	
			
			$("#keywords").focus();
			//当输入框变化时触发
			$("#keywords").keyup(function(){
				if($("#keywords").val()!= ""){
					$("#message_area").show();
				}else{
					$("#message_area").empty();
					$("#player").empty();
				}
			})
			$('#keywords').bind('input propertychange', function() {
  $("#message_area").show();
});

			$("#keywords").blur(function(){	
			$("#message_area").empty();
				$("#player").empty();
			})
		});
