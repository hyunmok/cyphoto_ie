var zone = {	
			
			PeopleList : {

				initialize : function(){					
					PeopleController = new PeopleControllerClass();					
				},
				handleShow : function(){					
					PeopleController.ShowPeople();	
				},
				handleHide : function(){

				},
				handleFocus : function(){	
					$("div.all_people:eq(1) li").removeClass("focus");
					$("div.all_people:eq(1) li:first").addClass("focus");
					zone_temp = "PeopleList";		//zone setting
				},
				handleBlur : function(){
					$("div.all_people:eq(1) li.focus").removeClass("focus");
				},
				handleKeyDown : function(keyCode){	
					//var ul_no = $("ul.list_people:has('li.focus')").index("ul.list_people");		//li 포커스를 가진 ul의 index
					var ul_no = $("div.all_people:eq(1) ul.list_people:has('li.focus')").index("div.all_people:eq(1) ul.list_people");		//li 포커스를 가진 ul의 index	
					var li_no = $("div.all_people:eq(1) li.focus").index();							//li 포커스 index
					switch (keyCode) {
						case skTv.keymap.UP:								
							if(ul_no>1 && $("div.all_people:eq(1) ul.list_people:eq("+(ul_no-2)+") > li:eq("+li_no+")").length>0){				//가장 윗줄이 아니고, 위에 같은 위치 li 있음
								$("div.all_people:eq(1) li.focus").removeClass("focus");
								$("div.all_people:eq(1) ul.list_people:eq("+(ul_no-2)+") > li:eq("+li_no+")").addClass('focus');
							} else if(ul_no>1 && $("div.all_people:eq(1) ul.list_people:eq("+(ul_no-2)+") > li:eq("+li_no+")").length<=0){		//가장 윗줄이 아니고, 위에 같은 위치 li 없음
								$("div.all_people:eq(1) li.focus").removeClass("focus");
								$("div.all_people:eq(1) ul.list_people:eq("+(ul_no-2)+") > li:last").addClass('focus');
							} else if(ul_no<2){								
								$("div.all_people:eq(1) li.focus").removeClass("focus");				
								skTv.zone.focus('Gnb');	
							}
							break;	
						case skTv.keymap.LEFT:	
							if(li_no==0){			//first li라면	
								if(ul_no%2==0){		//짝수 ul이라면	
									PeopleController.MoveLeft('K');		
								} else {			//홀수 ul이라면
									$("div.all_people:eq(1) li.focus").removeClass("focus");
									$("div.all_people:eq(1) ul.list_people:eq("+(ul_no-1)+") > li:last").addClass("focus");	
								}
							} else {
								$("div.all_people:eq(1) li.focus").removeClass("focus").prev().addClass("focus");		
							}
							break;				
						case skTv.keymap.RIGHT:	
							var ul_no = $("div.all_people:eq(1) ul.list_people:has('li.focus')").index("div.all_people:eq(1) ul.list_people");		//li 포커스를 가진 ul의 index							
							var li_no = $("div.all_people:eq(1) li.focus").index();							//li 포커스 index							
													
							if($("div.all_people:eq(1) ul.list_people:eq("+ul_no+") > li:last").index()==li_no){		//last li라면																		
								if(ul_no%2==0 && $("div.all_people:eq(1) ul.list_people:eq("+(ul_no+1)+") > li:first").length>0){		//짝수 ul이라면	
									$("div.all_people:eq(1) li.focus").removeClass("focus");
									$("div.all_people:eq(1) ul.list_people:eq("+(ul_no+1)+") > li:first").addClass("focus");											
								} else {			//홀수 ul이라면
									PeopleController.MoveRight('K');
								}
							} else {								
								$("div.all_people:eq(1) li.focus").removeClass("focus").next().addClass("focus");		
							}							
								
							break;
						case skTv.keymap.DOWN:							
							if(ul_no<4 && $("div.all_people:eq(1) ul.list_people:eq("+(ul_no+2)+") > li:eq("+li_no+")").length>0){			//가장 아랫줄이 아니고, 아래에 같은 위치 li 있음
								$("div.all_people:eq(1) li.focus").removeClass("focus");
								$("div.all_people:eq(1) ul.list_people:eq("+(ul_no+2)+") > li:eq("+li_no+")").addClass('focus');
							} else if(ul_no<4 && $("div.all_people:eq(1) ul.list_people:eq("+(ul_no+2)+") > li:eq("+li_no+")").length<=0){
								$("div.all_people:eq(1) li.focus").removeClass("focus");
								$("div.all_people:eq(1) ul.list_people:eq("+(ul_no+2)+") > li:last").addClass('focus');
							}							
							break;	
						case skTv.keymap.ENTER:
							var PeopleTid = $("div.all_people:eq(1) li.focus").attr("id");							
							navigation.gotoPhotoList(PeopleTid);		
							break;
						case skTv.keymap.BLUE:		//F9						
							PeopleController.ShowSearchPopup();							
							break;
						case skTv.keymap.RETURN:							
							$("#helpbar_menu1").trigger("click");
							break;
						case skTv.keymap.RW:		//page up key						 	
							PeopleController.MoveLeft('M');				// << 버튼 눌렀을 때 마우스 클릭과 동일한 로직 적용					
							break;	
						case skTv.keymap.FF:		//page down key						 	
							PeopleController.MoveRight('M');			// >> 버튼 눌렀을 때 마우스 클릭과 동일한 로직 적용		
							break;
					}
				},
				
				handleMouse : {					
                    //".wrap_list_people div.all_people:eq(1) li" : {
                    ".wrap_list_people .list_people li" : {
					    "mouseover" : function(){	
							$("#move_left").attr({'class':'list_prev list_prev_off'});
							$("#move_right").attr({'class':'list_next list_next_off'});
							
							skTv.zone.focus('PeopleList');													
                          	$("div.all_people:eq(1) li").removeClass("focus");
							$(this).addClass("focus"); 
                         },
                         "mouseout" : function(){						 	
                         },
                         "click" : function(){						 	
							navigation.gotoPhotoList($(this).attr("id"));
                         }
                    },
					"#move_left" : {
					    "mouseover" : function(){
							if(cPage!=1){														
                          		$(this).attr({'class':'list_prev list_prev_on'});
								$("#move_right").attr({'class':'list_next list_next_off'});
							}
                         },
                         "mouseout" : function(){
						 	$(this).attr({'class':'list_prev list_prev_off'});						 	
                         },
                         "click" : function(){						 	
							PeopleController.MoveLeft('M');
                         }
                    },
					"#move_right" : {
					    "mouseover" : function(){								
							if(cPage!=totalPage){
								$(this).attr({'class':'list_next list_next_on'});
								$("#move_left").attr({'class':'list_prev list_prev_off'});
							}	
                         },
                         "mouseout" : function(){
						 	$(this).attr({'class':'list_next list_next_off'});					 	
                         },
                         "click" : function(){						 	
							PeopleController.MoveRight('M');
                         }
                    }
            	}				
            	
			},
			
			PeopleSearchList : {

				initialize : function(){
					
				},
				handleShow : function(){
										
				},
				handleHide : function(){

				},
				handleFocus : function(){
					$("#ul_list_people li:first").addClass("focus")	
					zone_temp = "PeopleSearchList";		//zone setting		
				},
				handleBlur : function(){
					$("#ul_list_people li.focus").removeClass("focus")
				},
				handleKeyDown : function(keyCode){
					switch (keyCode) {
						case skTv.keymap.UP:	
							skTv.zone.focus('Gnb');					
							break;
						case skTv.keymap.DOWN:		
							
							break;
						case skTv.keymap.LEFT:	
							if($("#ul_list_people li.focus")[0]!=$("#ul_list_people li:first")[0]){
								$("#ul_list_people li.focus").removeClass("focus").prev().addClass("focus");
							}	
							break;
						case skTv.keymap.RIGHT:	
							if($("#ul_list_people li.focus")[0]!=$("#ul_list_people li:last")[0]){
								$("#ul_list_people li.focus").removeClass("focus").next().addClass("focus");
							}	
							break;
						case skTv.keymap.ENTER:
							var PeopleTid = $("#ul_list_people li.focus").attr('id');	
							navigation.gotoPhotoList(PeopleTid);
							break;
						case skTv.keymap.BLUE:		//F9	
							PeopleController.ShowSearchPopup();							
							break;	
						case skTv.keymap.RETURN:
							$("#helpbar_menu1").trigger("click");
							break;
						case skTv.keymap.RW:		//page up key						 	
							PeopleController.MoveLeft('M');				// << 버튼 눌렀을 때 마우스 클릭과 동일한 로직 적용					
							break;	
						case skTv.keymap.FF:		//page down key						 	
							PeopleController.MoveRight('M');			// >> 버튼 눌렀을 때 마우스 클릭과 동일한 로직 적용		
							break;
					}
				},
				handleMouse : {					
                    "#ul_list_people .list_search li" : {
					    "mouseover" : function(){	
							skTv.zone.focus("PeopleSearchList");				
                          	$("#ul_list_people li").removeClass("focus");
							$(this).addClass("focus"); 
                         },
                         "mouseout" : function(){						 	
                         },
                         "click" : function(){						 	
							navigation.gotoPhotoList($(this).attr("id"));
                         }
                    }
            	}
			},
			
			PeopleSearchListNone : {

				initialize : function(){
					
				},
				handleShow : function(){
					
				},
				handleHide : function(){

				},
				handleFocus : function(){
					zone_temp = "PeopleSearchListNone";		//zone setting					
				},
				handleBlur : function(){					
					
				},
				handleKeyDown : function(keyCode){					
					switch (keyCode) {					
						case skTv.keymap.UP:							
							skTv.zone.focus('Gnb');								
							break;
						case skTv.keymap.BLUE:		//F9						
							PeopleController.ShowSearchPopup();							
							break;
						case skTv.keymap.RETURN:	//ESC							
							$("#helpbar_menu1").trigger("click");
							break;
					}
				}
			}			
			
		}

