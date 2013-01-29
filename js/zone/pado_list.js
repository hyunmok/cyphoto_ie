var zone = {
			
			PadoSort : {

				initialize : function(){
					PadoController = new PadoControllerClass();
				},
				handleShow : function(){					
					PadoController.ShowOnedegList("");					
				},
				handleHide : function(){

				},
				handleFocus : function(){					
					$("[id^='SortIndex']").removeClass("focus");					
					$("#SortIndex" + index_temp).addClass("focus");	
					zone_temp = "PadoSort";		//zone setting	
				},
				handleBlur : function(){
					$("[id^='SortIndex']").removeClass("focus");
				},
				handleKeyDown : function(keyCode){	
					var index_no = parseInt($("#pado_sort .focus").attr("id").substring(9,11));			
					switch (keyCode) {
						case skTv.keymap.UP:	
							$("[id^='SortIndex']").removeClass("focus");				
							skTv.zone.focus('Gnb');							
							break;	
						case skTv.keymap.LEFT:	
							if (index_no != 19) {	//오른쪽 가장 마지막에 포커스가 있지 않을 경우만 실행
								$('#SortIndex' + index_no).removeClass('focus');							
								$('#SortIndex' + (index_no - 1)).addClass('focus');
							} else if (index_no == 19){
								$('#SortIndex' + index_no).removeClass('focus');							
								$('#SortIndex' + 35).addClass('focus');
							}
							break;				
						case skTv.keymap.RIGHT:												
							if (index_no != 35) {	//오른쪽 가장 마지막에 포커스가 있지 않을 경우만 실행
								$('#SortIndex' + index_no).removeClass('focus');							
								$('#SortIndex' + (index_no + 1)).addClass('focus');
							} else if (index_no == 35){
								$('#SortIndex' + index_no).removeClass('focus');							
								$('#SortIndex' + 19).addClass('focus');
							}
							break;
						case skTv.keymap.DOWN:		
							if($('#ScenePadoList').css("visibility")=="visible"){	//list에 목록이 있는 경우만 아래로 이동 가능
								skTv.zone.focus('PadoList');
								$("[id^='SortIndex']").removeClass("focus");
								$("#ul_list_pado > ul:eq(1) > li").removeClass("focus");
								$("#ul_list_pado > ul:eq(1) > li:first").addClass('focus');	
							}							
							break;	
						case skTv.keymap.ENTER:
							cPage = 1;
							keyword = "";
							$("[id^='SortIndex']").removeClass("over");
                          	$('#SortIndex' + index_no).addClass("over");
							index_temp = index_no;
							if(index_no==19){				//select_box를 선택한 경우								
								skTv.zone.show("PadoSelect");
								skTv.zone.focus("PadoSelect");
							} else if (index_no==20 && pado_kind=="one"){		//'전체보기'이고 '일촌'인 경우
								PadoController.ShowOnedegList("");
								index = index_no - 20;
							} else if (index_no>20 && pado_kind=="one"){		//Index보기이고 '일촌'인 경우		
								PadoController.ShowIndex(index_no-20);
								index = index_no - 20;
							} else if (pado_kind=="fan"){						// '팬'인 경우
								PadoController.ShowFanList(index_no-20);
							}
							break;
						case skTv.keymap.RED:
							if(pado_kind=="one"){	//현재 '일촌' 상태인 경우
								PadoController.ShowFanList(0);							
							} else {				//현재 '팬' 상태인 경우
								PadoController.ShowOnedegList("");
							}
							break;
						case skTv.keymap.BLUE:
							if(pado_kind=="one"){	//현재 '일촌' 상태인 경우
								PadoController.ShowOnedegPopup();							
							} else {				//현재 '팬' 상태인 경우
								PadoController.ShowFanPopup();
							}
							break;	
						case skTv.keymap.RETURN:
							$("#helpbar_menu2").trigger("onclick");
							break;
						case skTv.keymap.RW:		//page up key						 	
							PadoController.MoveLeft('M');			// << 버튼 눌렀을 때 마우스 클릭과 동일한 로직 적용					
							break;	
						case skTv.keymap.FF:		//page down key						 	
							PadoController.MoveRight('M');			// >> 버튼 눌렀을 때 마우스 클릭과 동일한 로직 적용		
							break;
					}
				},
				handleMouse : {					
                    "[id^='SortIndex']" : {
					    "mouseover" : function(){	
							skTv.zone.focus("PadoSort");													
                           	var index_no = parseInt($(this).attr("id").substring(9,11));
							$("[id^='SortIndex']").removeClass("focus");
							$("#ul_list_pado > ul:eq(1) > li").removeClass("focus");
							$(this).addClass("focus");
                         },
                         "mouseout" : function(){						 	
                         },
                         "click" : function(){
						 	var index_no = parseInt($(this).attr("id").substring(9,11));
							cPage = 1;		//Index(Sort)영역을 클릭하면 무조건 1page부터 나옴
							keyword = "";
							index_temp = index_no;
							index = index_no - 20;							
							if(index==0 && pado_kind=="one"){			//'전체보기', '일촌'
								$("[id^='SortIndex']").removeClass("over");
                          		$(this).addClass("over");
								PadoController.ShowOnedegList("");	
							} else if(index>0 && pado_kind=="one"){		//'index보기', '일촌'
								$("[id^='SortIndex']").removeClass("over");
                          		$(this).addClass("over");
								PadoController.ShowIndex(index);				
							} else if(index>=0 && pado_kind=="fan"){	//'팬'
								$("[id^='SortIndex']").removeClass("over");
                          		$(this).addClass("over");
								PadoController.ShowFanList(index);		
							} else if(index<0){
								skTv.zone.show('PadoSelect'); 
								skTv.zone.focus('PadoSelect');
							}
                         }
                    }
            	}

			},
			
			PadoSelect : {

				initialize : function(){
					
				},
				handleShow : function(){
					$('#SortIndex' + 19).removeClass('focus');					
				},
				handleHide : function(){
					//$('#SortIndex' + 19).addClass('focus');
				},
				handleFocus : function(){
					
				},
				handleBlur : function(){
					skTv.zone.hide('PadoSelect');
					//$('#SortIndex' + 19).removeClass('focus');
				},
				handleKeyDown : function(keyCode){
					switch (keyCode) {
					case skTv.keymap.UP:	
						if($('.layer_select li'+'.focus')[0]!=$('.layer_select li'+':first')[0]){		//focus를 가진 요소가 첫번째 요소가 아닌 경우
							$('.layer_select li'+'.focus').attr({'class':''}).prev().attr({'class':'focus'});
						}						
						break;
					case skTv.keymap.DOWN:		
						if($('.layer_select li'+'.focus')[0]!=$('.layer_select li'+':last')[0]){		//focus를 가진 요소가 마지막 요소가 아닌 경우
							$('.layer_select li'+'.focus').attr({'class':''}).next().attr({'class':'focus'});
						}
						break;
					case skTv.keymap.ENTER:
						if($('.layer_select li'+'.focus')[0]==$('.layer_select li'+':first')[0]){		//focus를 가진 요소가 첫번째 요소인 경우
							index_temp = 20;
							//skTv.zone.focus('PadoSort');
							$("[id^='SortIndex']").removeClass("over");
							PadoController.ShowOnedegList("");							
						} else if($('.layer_select li'+'.focus')[0]==$('.layer_select li'+':last')[0]){
							index_temp = 20;
							//skTv.zone.focus('PadoSort');
							$("[id^='SortIndex']").removeClass("over");
							PadoController.ShowFanList(0);							
						}	
						break;
					
					}
				},
				handleMouse : {					
                    ".layer_select li:first" : {
					    "mouseover" : function(){														
                          	$("[id^='SortIndex']").removeClass("focus");
							$("#ul_list_pado > ul:eq(1) > li").removeClass("focus");
							$(".layer_select li:last").removeClass("focus");
							$(this).addClass("focus"); 
                         },
                         "mouseout" : function(){						 	
                         },
                         "click" : function(){
						 	index_temp = 20;
							//skTv.zone.focus('PadoSort');
							$("[id^='SortIndex']").removeClass("over");
						 	PadoController.ShowOnedegList("");
							
                         }
                    },
					".layer_select li:last" : {
					    "mouseover" : function(){														
                          	$("[id^='SortIndex']").removeClass("focus");
							$("#ul_list_pado > ul:eq(1) > li").removeClass("focus");
							$(".layer_select li:first").removeClass("focus");
							$(this).addClass("focus"); 
                         },
                         "mouseout" : function(){						 	
                         },
                         "click" : function(){
						 	index_temp = 20;
							//skTv.zone.focus('PadoSort');
							$("[id^='SortIndex']").removeClass("over");
						 	PadoController.ShowFanList(0);							
                         }
                    }
            	}
			},
			
			PadoList : {

				initialize : function(){
					
				},
				handleShow : function(){
					
				},
				handleHide : function(){

				},
				handleFocus : function(){
					$("#ul_list_pado > ul:eq(1) > li:first").addClass('focus');
					zone_temp = "PadoList";		//zone setting					
				},
				handleBlur : function(){					
					if ($("#ul_list_pado > ul > li").hasClass('focus')==true){		//Blur 직전 포커스가 list에 있었다면				
						$('#ul_list_pado > ul > li').removeClass('focus');			//list에 있던 포커스를 없앰
					}
				},
				handleKeyDown : function(keyCode){
					//var list_no = parseInt($('#ul_list_pado > ul:eq(1) > li.focus').attr('id').substring(6,8));	//포커스된 ListId의 번호 두 자리를 가져옴
					var list_no = $('#ul_list_pado > ul:eq(1) > li.focus').index();					
					switch (keyCode) {										
						case skTv.keymap.UP:							
							if(list_no>=8 && list_no<=24){			//첫째줄이 아닌 경우
								$('#ul_list_pado > ul:eq(1) > li.focus').removeClass('focus');
								$('#ul_list_pado > ul:eq(1) > li:eq('+(list_no-8)+')').addClass('focus');
							} else {								//첫째 줄인 경우
								skTv.zone.focus('PadoSort');
								$("[id^='SortIndex']").removeClass("focus");
								$("#ul_list_pado > ul:eq(1) > li").removeClass("focus");
								$('#SortIndex'+index_temp).addClass('focus');	//SortIndex는 19부터 시작
							}							
							break;
						case skTv.keymap.LEFT:
							if(cPage!=1){		//1 페이지가 아니라면
								if (list_no!=0 && list_no!=8 && list_no!=16) {			//왼쪽 세로 컬럼이 아닌 경우
								$('#ul_list_pado > ul:eq(1) > li.focus').removeClass('focus');
								$('#ul_list_pado > ul:eq(1) > li:eq('+(list_no-1)+')').addClass('focus');
								} else {
								PadoController.MoveLeft('K');						//왼쪽 세로 컬럼일 경우 페이지 이동함
								}
							} else {			//1페이지라면
								if(list_no > $('#ul_list_pado > ul:eq(1) > li:first').index()){	
									$('#ul_list_pado > ul:eq(1) > li.focus').removeClass('focus');
									$('#ul_list_pado > ul:eq(1) > li:eq('+(list_no-1)+')').addClass('focus');
								}
							}
							break;
						case skTv.keymap.RIGHT:		
							//var test = $("#ul_list_pado > ul:eq(1) > li:nth-child(7n)");
							if(cPage!=totalPage){		//마지막 페이지가 아니라면									
								if (list_no!=7 && list_no!=15 && list_no!=23) {			//오른쪽 세로 컬럼이  아니라면	
									$('#ul_list_pado > ul:eq(1) > li.focus').removeClass('focus');
									$('#ul_list_pado > ul:eq(1) > li:eq('+(list_no+1)+')').addClass('focus');
								} else {
									PadoController.MoveRight('K');						//오른쪽 세로 컬럼일 경우 페이지 이동함
								}
							} else {					//마지막 페이지라면
								if(list_no < $('#ul_list_pado > ul:eq(1) > li:last').index()){	
									$('#ul_list_pado > ul:eq(1) > li.focus').removeClass('focus');
									$('#ul_list_pado > ul:eq(1) > li:eq('+(list_no+1)+')').addClass('focus');
								}
							}
							break;	
						case skTv.keymap.DOWN:			
							if ($('#ul_list_pado > ul:eq(1) > li:eq('+(list_no+8)+')').length > 0 ){		//아랫 줄에 li가 존재하면
								$('#ul_list_pado > ul:eq(1) > li.focus').removeClass('focus');
								$('#ul_list_pado > ul:eq(1) > li:eq('+(list_no+8)+')').addClass('focus');								
							}	
							break;
						case skTv.keymap.ENTER:
							var PadoTid = $('#ul_list_pado > ul:eq(1) > li.focus').attr('id');							
							if(PadoTid.substr(0,1)=="7"){
								PopupComponent.showTextPopup(
								"알림",
								"타운홈피 서비스 준비중입니다.<br /> 서비스 이용에 불편을 드려 죄송합니다.",
								function(){
									skTv.zone.focus("PadoList");
									$('#ul_list_pado > ul:eq(1) > li:first').addClass('focus');
								}
								);
							} else {
								navigation.gotoPhotoList(PadoTid);		
							}							
							break;							
						case skTv.keymap.RED:		//F4
							if(pado_kind=="one"){	//현재 '일촌' 상태인 경우
								PadoController.ShowFanList(0);							
							} else {				//현재 '팬' 상태인 경우
								PadoController.ShowOnedegList("");
							}
							break;
						case skTv.keymap.BLUE:		//F9
							if(pado_kind=="one"){	//현재 '일촌' 상태인 경우
								PadoController.ShowOnedegPopup();							
							} else {				//현재 '팬' 상태인 경우
								PadoController.ShowFanPopup();
							}
							break;	
						case skTv.keymap.RETURN:						 	
							$("#helpbar_menu2").trigger("onclick");							
							break;
						case skTv.keymap.RW:						 	
							PadoController.MoveLeft('M');			// << 버튼 눌렀을 때 마우스 클릭과 동일한 로직 적용					
							break;
						case skTv.keymap.FF:						 	
							PadoController.MoveRight('M');			// >> 버튼 눌렀을 때 마우스 클릭과 동일한 로직 적용		
							break;
							
					}
				},
				
				handleMouse : {					
                    "#ul_list_pado > ul:eq(1) > li" : {
					    "mouseover" : function(){																				
                          	$("#move_left").attr({'class':'list_prev list_prev_off'});
							$("#move_right").attr({'class':'list_next list_next_off'});
							
							skTv.zone.focus("PadoList");						
							$("[id^='SortIndex']").removeClass("focus");
							$("#ul_list_pado > ul:eq(1) > li").removeClass("focus");
							$(this).addClass("focus");
                         },
                         "mouseout" : function(){						 	
                         },
                         "click" : function(){						 	
                         	PadoTid = $(this).attr("id");
							if(PadoTid.substr(0,1)=="7"){
								PopupComponent.showTextPopup(
								"알림",
								"타운홈피 서비스 준비중입니다.<br /> 서비스 이용에 불편을 드려 죄송합니다.",
								function(){
									skTv.zone.focus("PadoList");
									$('#ul_list_pado > ul:eq(1) > li:first').addClass('focus');
								}
								);
							} else {
								navigation.gotoPhotoList(PadoTid);		
							}
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
							PadoController.MoveLeft('M');
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
							PadoController.MoveRight('M');
                         }
                    }
            	}
				
			},
			
			PadoListNone : {

				initialize : function(){
					
				},
				handleShow : function(){
					
				},
				handleHide : function(){

				},
				handleFocus : function(){
					zone_temp = "PadoListNone";		//zone setting		
				},
				handleBlur : function(){
					
				},
				handleKeyDown : function(keyCode){
					switch (keyCode) {
						
					}
				}
			},
			
		}	
		