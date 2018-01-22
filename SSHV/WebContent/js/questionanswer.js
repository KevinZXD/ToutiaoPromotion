$(document)
		.ready(
				
			
				function() {
					getquestion();
					$("label#user_name").html(sessionStorage.UserName);
					$("label#user_id").html(sessionStorage.UserId);
			
					
					function getquestion() {

						$
								.ajax({
									type : "POST",
									url : "getQuestionsAnswers.action",
									data : {
										tag : "question",
									},
									dataType : "JSON",
									success : function(data) {
										$("#subcontent").empty();
										var question = eval(data);
										for (var i = 0; i < question.length; i++) {
											var id = question[i].id;
											var userid = question[i].userid;
											var contact = question[i].contact;
											var conten = question[i].question;
											var username = question[i].username;
											var publicdate = question[i].publicdate;

											var str1 = "<div class='thumbnail' style='border-color:#245269;'><p>网友"
													+ username
													+ "于"
													+ publicdate + "发表该问答</p>";
											var str2 = "<h3>问题是</h3><h4>"
													+ conten
													+ "</h4><div id='buttonlist' ><span class='label label-default'  style='margin-left: 300px;cursor: pointer ;' onclick='answerid("
													+ id
													+ ")'>回答</span><span class='label label-default' style='margin-left: 30px;cursor: pointer ;' onclick='getanswersbyid("
													+ id + ")'>";

											var str21 = "网友答案</span><span class='label label-default' style='margin-left: 30px;cursor: pointer ;'>转发</span>";
											var str3 = "</div></div><div id='inputid"+id+"'></div>"+"<div id='answers"+id+"'></div>";
											$("#subcontent").append(
													str1 + str2+str21 + str3);

										}

									}
								})
					}
					;
					
					
					
					

				});
