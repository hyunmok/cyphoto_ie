
var PadoControllerClass = defineClass({

	extend : BaseControllerClass,

	name : 'PadoControllerClass',

	/**
	 *
	 */
	construct : function(){
		
		this.superclass();
		
		this.model = new PadoModelClass();		
				
		//this.model._set({Id:'cyphone1@nate.com'});
		//this.model._set({targetId:'62285048'});
		this.model._set({perPage:24});		
		
		
		Count = 0;								//전체 수
		TotalOneDeg = 0;						//API 호출용 일촌 전체 수
		column_cnt = 8;							//가로 갯수(LG기준)
		raw_cnt = 3;							//세로 갯수(LG기준)
		pPage = column_cnt * raw_cnt;			//전체 갯수(LG기준 24개)
		cPage = 1;								//현재 페이지
		totalPage = 0;							//전체 페이지
		resultCnt = 0;							//API response 결과 갯수
		keyword = "";							//검색어
		searchType = "name";					//Fan에서 사용
		searchWord = "";						//Fan에서 사용
		
		index = 0;		
		page_flag = 0;
		
		pado_kind = "one";	//파도타기 종류. one : 일촌, fan : 팬
		
		zone_temp = "PadoList";	//zone setting
				
		//skFn.debug.log(skFn.debug.check(arrList,'arrList'));		
		
		
	},

	/**
	 * 
	 */
	methods : {
		
		/**
		 * ShowOnedegList : 일촌 목록 보여줌
		 * @param keyword : 키워드
		 * @return 
		 */
		ShowOnedegList : function(keyword){
			
			LoadingComponent.setLoadingImgTimer(0);
			LoadingComponent.setIsLoadingImg(true);
			LoadingComponent.lock(true);
			
			cPage = 1;
			pPage = 24;
			pado_kind = "one";
			
			this.model.retriveOnedegList(
				cPage,		
				pPage*2,		
				keyword,
				function(OneDegList){
					
					skFn.dom.setHtml('SortIndex19', "<div class='inner'>일촌</div>");
					
					if(typeof OneDegList=="object" && keyword==""){				//일촌 있음, 검색 아님						
						
						$("#ScenePadoList").css("visibility","visible");
						$("#text_search_list").css("visibility","hidden");			
						$("#ScenePadoListNone").css("visibility","hidden");
						$("#text_search_none").css("visibility","hidden");	
						
						Count = OneDegList[0].totCount;						//전체 일촌 수
						TotalOneDeg = Count;								//일촌 api 호출용 전체 일촌 수						
						totalPage = Math.ceil(Count/pPage);					//전체가 몇 페이지인가?
						
						var UL_HTML = PadoController.GetOnedegList(OneDegList);					
						UL_HTML = "<ul class='list_pado'>"+"</ul>"+UL_HTML;
						skFn.dom.setHtml("ul_list_pado", UL_HTML);
						
						var page_info = "";
						page_info = "<span class='num'>"+cPage+"/"+totalPage+"</span> <span class='sum'>(전체 "+Count+"명)</span>";
						skFn.dom.setHtml("page_info", page_info);
										
						page_flag = 0;	
						
						//Focus Setting
						skTv.zone.focus("PadoList");
						$("#ul_list_pado > ul:eq(1) > li:first").addClass("focus");
						
						//Gnb 이전 동작 Setting
						GnbComponent.setFunctionKey("skTv.keymap.RETURN", "navigation.gotoAppManage();"); 
						
						//Helpbar 이전 동작 Setting					
						HelpComponent.changeShow({menuid:"2", icon:'icon_help5',name:"이전", action:"navigation.gotoAppManage();"})
						
						//skFn.debug.log(skFn.debug.check(arrList,'arrList'));					
						//$('#img_photo_detail').attr({'src':photoData.ArrayOfPhotoItem.PhotoItem[0].photoVmUrl});
						
					} else if(typeof OneDegList=="object" && keyword!=""){		//일촌 있음, 검색임
						
						$("#ScenePadoList").css("visibility","visible");
						$("#text_search_list").css("visibility","visible");			
						$("#ScenePadoListNone").css("visibility","hidden");
						$("#text_search_none").css("visibility","hidden");	
						
						Count = OneDegList[0].totCount;			//전체 일촌 수									
						totalPage = Math.ceil(Count/pPage);		//전체가 몇 페이지인가?
						
						var resultHTML = "<span class='text_search_result'>\"<span class='text_name'>"+keyword+"</span>\"</span> 검색 결과 <span class='num_search_result'>"+Count+"</span>건";
						skFn.dom.setHtml("text_search_list", resultHTML);
						
						var UL_HTML = PadoController.GetOnedegList(OneDegList);					
						UL_HTML = "<ul class='list_pado'>"+"</ul>"+UL_HTML;
						skFn.dom.setHtml("ul_list_pado", UL_HTML);
						
						var page_info = "";
						page_info = "<span class='num'>"+cPage+"/"+totalPage+"</span> <span class='sum'>(전체 "+Count+"명)</span>";
						skFn.dom.setHtml("page_info", page_info);
										
						page_flag = 0;	
						
						//Focus Setting
						skTv.zone.focus("PadoList");
						$("#ul_list_pado > ul:eq(1) > li:first").addClass("focus");
						
						//Gnb 이전 동작 Setting
						GnbComponent.setFunctionKey("skTv.keymap.RETURN", "PadoController.ShowOnedegList(\"\");"); 
						
						//Helpbar 이전 동작 Setting
						HelpComponent. changeShow({menuid:"2", icon:'icon_help5',name:"이전", action:"PadoController.ShowOnedegList(\"\");"})
						
					} else if(typeof OneDegList=="string" && keyword==""){		//일촌 없음, 검색아님
						
						$('#ScenePadoList').css("visibility","hidden");
						$('#text_search_list').css("visibility","hidden");		
						$('#ScenePadoListNone').css("visibility","visible");		
						skFn.dom.setHtml("none_result", "일촌이 없습니다.");
						$('#text_search_none').css("visibility","hidden");	
						
						//Focus Setting
						index_temp = 20;
						skTv.zone.focus("PadoSort");
						$("[id^='SortIndex']").removeClass("focus");	
						$("#SortIndex" + index_temp).addClass('focus');					
						
						//Gnb 이전 동작 Setting
						GnbComponent.setFunctionKey("skTv.keymap.RETURN", "navigation.gotoAppManage();"); 
						
						//Helpbar 이전 동작 Setting
						HelpComponent.changeShow({menuid:"2", icon:'icon_help5',name:"이전", action:"navigation.gotoAppManage();"})
						
					} else if(typeof OneDegList=="string" && keyword!=""){		//일촌 없음, 검색임
						
						$("#ScenePadoList").css("visibility","hidden");
						$("#text_search_list").css("visibility","hidden");			
						$("#ScenePadoListNone").css("visibility","visible");
						$("#text_search_none").css("visibility","visible");	
						var resultHTML = "<span class='text_search_result'>\"<span class='text_name'>"+keyword+"</span>\"</span> 검색 결과 <span class='num_search_result'>0</span>건";
						skFn.dom.setHtml("text_search_none", resultHTML);
						skFn.dom.setHtml("none_result", "일촌이 없습니다.");	
						
						//Focus Setting
						index_temp = 20;
						skTv.zone.focus("PadoSort");
						$("[id^='SortIndex']").removeClass("focus");	
						$("#SortIndex" + index_temp).addClass('focus');
						
						//Gnb 이전 동작 Setting
						GnbComponent.setFunctionKey("skTv.keymap.RETURN", "PadoController.ShowOnedegList(\"\");"); 
						
						//Helpbar 이전 동작 Setting
						HelpComponent.changeShow({menuid:"2", icon:'icon_help5',name:"이전", action:"PadoController.ShowOnedegList(\"\");"})					
						
					}
					
					LoadingComponent.unlock();
					
					//over Setting
					//if ($("[id^='SortIndex']").hasClass('over') == false) { 
						index_temp = 20;						
						$("#SortIndex" + index_temp).addClass('over');							
					//}

					if(skEnv.device.vendor == "lgcns") {
						//Gnb Setting
						GnbComponent.setFunctionKey("skTv.keymap.RED", "PadoController.ShowFanList(0);");
						GnbComponent.setFunctionKey("skTv.keymap.GREEN", "PadoController.ShowOnedegPopup();");
									
						//HelpBar Setting					
						HelpComponent.changeShow({menuid:"0", icon:"icon_help4",name:"팬보기", action:"PadoController.ShowFanList(0);"});                    
						HelpComponent.changeShow({menuid:"1", icon:'icon_help2',name:"일촌검색", action:"PadoController.ShowOnedegPopup();"});					
					}
					else {
						//Gnb Setting
						GnbComponent.setFunctionKey("skTv.keymap.RED", "PadoController.ShowFanList(0);");
						GnbComponent.setFunctionKey("skTv.keymap.BLUE", "PadoController.ShowOnedegPopup();");
									
						//HelpBar Setting					
						HelpComponent.changeShow({menuid:"0", icon:"icon_help4",name:"팬보기", action:"PadoController.ShowFanList(0);"});                    
						HelpComponent.changeShow({menuid:"1", icon:'icon_help1',name:"일촌검색", action:"PadoController.ShowOnedegPopup();"});						
					}
				}				
				
			);
			
		},
		
		/**
		 * GetOnedegList : 일촌 목록을 DOM 형태로 만듦
		 * @param OneDegList : 일촌 목록
		 * @return listHTML : DOM HTML
		 */
		GetOnedegList : function(OneDegList){
			
			resultCnt = OneDegList.length;			
			
			var listHTML = "";
			var ListId = 9;
			for(var i=0; i<resultCnt; i++ ){
				
				ListId++;
				
				if(ListId==34) ListId = 10;
					
				listHTML += "<li id="+ OneDegList[i].Did  +" class=''>"
						 +	"<div class='inner'>"
				
				// API에서 탈퇴한 사용자의 이미지 경로가 전달이 되지 않아 예외처리 함. (6.30 by sophia)  
				if(OneDegList[i].img.length == 0) {
					listHTML += "<img src='../image/img/icon_profile_null.jpg' alt='' width='110' height='94' />";
				}else{
					listHTML += "<img src='" + THUMB_IMG_URL_110X94 + OneDegList[i].img + "' alt='' width='110' height='94' />";
				}
				
				listHTML += "<div class='text_user'>"+OneDegList[i].didname+"</div>"
						 +  "</div>"
						 +  "</li>";
				
				if(resultCnt>pPage && i==pPage-1){
					listHTML += "</ul><ul class='list_pado' >";
				}
			}
			listHTML = "<ul class='list_pado'>" + listHTML + "</ul>";
			
			return listHTML;
			
		},
		
		/**
		 * ShowIndex : 일촌 Index 보기
		 * @param index : 전체보기, ㄱ~ㅎ, 기타
		 * @return 
		 */
		ShowIndex : function(index){
			
			pado_kind = "one";
			var _controller = this;
			var uni_min = 0;
			var uni_max = 0;
			var index_count = 0;		
			
			if(TotalOneDeg>0){
				this.model.retriveOnedegIndex(
				'1',
				TotalOneDeg,
				'',
				index,
				pPage*2,
				function(OneDegList){
					
					skFn.dom.setHtml('SortIndex19', "<div class='inner'>일촌</div>");	
					
					if(typeof OneDegList=="object"){	//Index 일촌 있을 경우
						
						$('#ScenePadoList').css("visibility","visible");
						$('#text_search_list').css("visibility","hidden");		//누구누구의 검색결과 텍스트 숨김
						$('#ScenePadoListNone').css("visibility","hidden");
						$('#text_search_none').css("visibility","hidden");	
						
							
						var UL_HTML = PadoController.GetOnedegList(OneDegList);					
						UL_HTML = "<ul class='list_pado'>"+"</ul>"+UL_HTML;	
						skFn.dom.setHtml('ul_list_pado', UL_HTML);
							
						Count = OneDegList[0].totCount;				//선택한 index에 해당하는 일촌 수
						totalPage = Math.ceil(Count/pPage);			//전체가 몇 페이지인가?
						
						page_flag = index;
						
						//Focus Setting
						skTv.zone.focus("PadoList");
						$("#ul_list_pado > ul:eq(1) > li:first").addClass("focus");
							
						var page_info = "";
						page_info = "<span class='num'>"+cPage+"/"+totalPage+"</span> <span class='sum'>(전체 "+Count+"명)</span>";
						skFn.dom.setHtml("page_info", page_info);						
						
						
					} else {		//Index 일촌이 없을 경우
						
						$("#ul_list_pado > ul:eq(1) > li").removeClass('focus');
						
						$('#ScenePadoList').css("visibility","hidden");
						$('#text_search_list').css("visibility","hidden");		//누구누구의 검색결과 텍스트 숨김
						$('#ScenePadoListNone').css("visibility","visible");		
						skFn.dom.setHtml("none_result", "일촌이 없습니다.");
						$('#text_search_none').css("visibility","hidden");
						
					}
					
					if(skEnv.device.vendor == "lgcns") {
						//Gnb Setting
						GnbComponent.setFunctionKey("skTv.keymap.RED", "PadoController.ShowFanList(0);");
						GnbComponent.setFunctionKey("skTv.keymap.GREEN", "PadoController.ShowOnedegPopup();");
						GnbComponent.setFunctionKey("skTv.keymap.RETURN", "navigation.gotoAppManage();"); 
						
						//HelpBar Setting					
						HelpComponent.changeShow({menuid:"0", icon:"icon_help4",name:"팬보기", action:"PadoController.ShowFanList(0);"})                    
						HelpComponent.changeShow({menuid:"1", icon:'icon_help2',name:"일촌검색", action:"PadoController.ShowOnedegPopup();"})
						HelpComponent.changeShow({menuid:"2", icon:'icon_help5',name:"이전", action:"navigation.gotoAppManage();"})
					}
					else {
						//Gnb Setting
						GnbComponent.setFunctionKey("skTv.keymap.RED", "PadoController.ShowFanList(0);");
						GnbComponent.setFunctionKey("skTv.keymap.BLUE", "PadoController.ShowOnedegPopup();");
						GnbComponent.setFunctionKey("skTv.keymap.RETURN", "navigation.gotoAppManage();"); 
						
						//HelpBar Setting					
						HelpComponent.changeShow({menuid:"0", icon:"icon_help4",name:"팬보기", action:"PadoController.ShowFanList(0);"})                    
						HelpComponent.changeShow({menuid:"1", icon:'icon_help1',name:"일촌검색", action:"PadoController.ShowOnedegPopup();"})
						HelpComponent.changeShow({menuid:"2", icon:'icon_help5',name:"이전", action:"navigation.gotoAppManage();"})
					}
				}
					
				);
			}
			
			
		},	
		
		/**
		 * ShowFanList : 팬 리스트 보여줌
		 * @param 
		 * @return void
		 */
		ShowFanList : function(index, keyword){			
			
			LoadingComponent.setLoadingImgTimer(0);
			LoadingComponent.setIsLoadingImg(true);
			LoadingComponent.lock(true);
			
			pado_kind = "fan";
			cPage = 1;
			pPage = 24;
			
			if(index==0 && (keyword=="" || keyword==undefined)){	//'전체보기', 검색 아님				
				searchType = "name";
				searchWord = "";
			} else if(index > 0 && (keyword=="" || keyword==undefined)){	//'Index보기' 인 경우	
				searchType = "nameIndex";				
				switch(index){
					case 1 : searchWord = "가";
							 break;
					case 2 : searchWord = "나";
						     break;
					case 3 : searchWord = "다";
						     break;
					case 4 : searchWord = "라";
							 break;
					case 5 : searchWord = "마";
							 break;
					case 6 : searchWord = "바";
							 break;
					case 7 : searchWord = "사";
							 break;
					case 8 : searchWord = "아";
							 break;
					case 9 : searchWord = "자";
							 break;
					case 10 : searchWord = "차";
							 break;
					case 11 : searchWord = "카";
							 break;
					case 12 : searchWord = "타";
							 break;
					case 13 : searchWord = "파";
							 break;
					case 14 : searchWord = "하";
							 break;
					case 15 : searchWord = "a";
							 break;
				}//end switch
				
			} else if(keyword!="" || keyword!=undefined){		//검색인 경우				
				searchType = "name";
				searchWord = keyword;
			}//end if
			
			this.model.retriveFanList(
				cPage,
				pPage*2,
				searchType,
				searchWord,
				function(FanList){	
					
					skFn.dom.setHtml('SortIndex19', "<div class='inner'>팬(관심홈피)</div>");
					
					if(typeof FanList=="object" && (keyword=="" || keyword==undefined)){		//팬 있음. 검색(검색창) 아님.					
						//skFn.debug.log(skFn.debug.check(FanList, 'FanList'));											
										
						$('#ScenePadoList').css("visibility","visible");
						$('#text_search_list').css("visibility","hidden");		//누구누구의 검색결과 텍스트 숨김
						$('#ScenePadoListNone').css("visibility","hidden");
						$('#text_search_none').css("visibility","hidden");	
						
						Count = FanList[0].TotalCnt;			//전체 팬 수						
						totalPage = Math.ceil(Count/pPage);		//전체가 몇 페이지인가?
						
						var UL_HTML = PadoController.GetFanList(FanList);					
						UL_HTML = "<ul class='list_pado'>"+"</ul>"+UL_HTML;
						skFn.dom.setHtml('ul_list_pado', UL_HTML);
						
						var page_info = "";
						page_info = "<span class='num'>"+cPage+"/"+totalPage+"</span> <span class='sum'>(전체 "+Count+"명)</span>";
						skFn.dom.setHtml("page_info", page_info);
										
						page_flag = index;
						
						//Focus Setting
						skTv.zone.focus("PadoList");
						$("#ul_list_pado > ul:eq(1) > li:first").addClass('focus');
						
						//Gnb 이전 동작 Setting
						GnbComponent.setFunctionKey("skTv.keymap.RETURN", "navigation.gotoAppManage();"); 
						
						//Helpbar 이전 동작 Setting
						HelpComponent.changeShow({menuid:"2", icon:'icon_help5',name:"이전", action:"navigation.gotoAppManage();"})
						
							
					} else if(typeof FanList=="object" && (keyword!="" || keyword!=undefined)){		//팬 있음. 검색임.
					
						$('#ScenePadoList').css("visibility","visible");
						$('#text_search_list').css("visibility","visible");		
						$('#ScenePadoListNone').css("visibility","hidden");
						$('#text_search_none').css("visibility","hidden");
						
						Count = FanList[0].TotalCnt;			//전체 팬 수						
						totalPage = Math.ceil(Count/pPage);		//전체가 몇 페이지인가?
						
						var resultHTML = "<span class='text_search_result'>\"<span class='text_name'>"+keyword+"</span>\"</span> 검색 결과 <span class='num_search_result'>"+Count+"</span>건";
						skFn.dom.setHtml("text_search_list", resultHTML);
						
						var UL_HTML = PadoController.GetFanList(FanList);					
						UL_HTML = "<ul class='list_pado'>"+"</ul>"+UL_HTML;
						skFn.dom.setHtml('ul_list_pado', UL_HTML);		
						
						var page_info = "";
						page_info = "<span class='num'>"+cPage+"/"+totalPage+"</span> <span class='sum'>(전체 "+Count+"명)</span>";
						skFn.dom.setHtml("page_info", page_info);
										
						page_flag = index;				
						
						//Focus Setting
						skTv.zone.focus("PadoList");
						$("#ul_list_pado > ul:eq(1) > li:first").addClass('focus');		
					
						//Gnb 이전 동작 Setting
						GnbComponent.setFunctionKey("skTv.keymap.RETURN", "PadoController.ShowFanList(0);"); 
						
						//Helpbar 이전 동작 Setting
						HelpComponent.changeShow({menuid:"2", icon:'icon_help5',name:"이전", action:"PadoController.ShowFanList(0);"})
							
					} else if(typeof FanList=="string" && (keyword=="" || keyword==undefined)){		//팬 없음. 검색 아님.				
												
						$("#ul_list_pado > ul:eq(1) > li").removeClass('focus');
						
						$('#ScenePadoList').css("visibility","hidden");
						$('#text_search_list').css("visibility","hidden");		
						$('#ScenePadoListNone').css("visibility","visible");		
						skFn.dom.setHtml("none_result", "팬(관심홈피)이 없습니다.");
						$('#text_search_none').css("visibility","hidden");
						
						//Focus Setting
						index_temp = index+20;
						skTv.zone.focus("PadoSort");
						$("[id^='SortIndex']").removeClass("focus");	
						$("#SortIndex" + index_temp).addClass('focus');	
						
						//Gnb 이전 동작 Setting
						GnbComponent.setFunctionKey("skTv.keymap.RETURN", "navigation.gotoAppManage();"); 
						
						//Helpbar 이전 동작 Setting
						HelpComponent.changeShow({menuid:"2", icon:'icon_help5',name:"이전", action:"navigation.gotoAppManage();"})
					
					} else if(typeof FanList=="string" && (keyword!="" || keyword!=undefined)){		//팬 없음. 검색임.
						
						$("#ul_list_pado > ul:eq(1) > li").removeClass('focus');
						
						$('#ScenePadoList').css("visibility","hidden");
						$('#text_search_list').css("visibility","hidden");		
						$('#ScenePadoListNone').css("visibility","visible");		
						skFn.dom.setHtml("none_result", "팬(관심홈피)이 없습니다.");
						$('#text_search_none').css("visibility","visible");
						var resultHTML = "<span class='text_search_result'>\"<span class='text_name'>"+keyword+"</span>\"</span> 검색 결과 <span class='num_search_result'>0</span>건";
						skFn.dom.setHtml("text_search_none", resultHTML);						
						
						//Focus Setting
						index_temp = 20;
						skTv.zone.focus("PadoSort");
						$("[id^='SortIndex']").removeClass("focus");	
						$("#SortIndex" + index_temp).addClass('focus');
						
						//Gnb 이전 동작 Setting
						GnbComponent.setFunctionKey("skTv.keymap.RETURN", "PadoController.ShowFanList(0);"); 
						
						//Helpbar 이전 동작 Setting
						HelpComponent.changeShow({menuid:"2", icon:'icon_help5',name:"이전", action:"PadoController.ShowFanList(0);"})
						
					}//end if
					
					//over Setting
					if ($("[id^='SortIndex']").hasClass('over') == false) { 
						index_temp = index+20;						
						$("#SortIndex" + index_temp).addClass('over');							
					}					
					
					//LoadingComponent.setIsLoadingImg(false);
					LoadingComponent.unlock();					
					if(skEnv.device.vendor == "lgcns") {
						//Gnb Setting
						GnbComponent.setFunctionKey("skTv.keymap.RED", "PadoController.ShowOnedegList(\"\");"); 
						GnbComponent.setFunctionKey("skTv.keymap.GREEN", "PadoController.ShowFanPopup();"); 
						
						//HelpBar Setting
						HelpComponent.changeShow({menuid:"0", icon:"icon_help4",name:"일촌보기", action:"PadoController.ShowOnedegList(\"\");"})                    
						HelpComponent.changeShow({menuid:"1", icon:"icon_help2",name:"팬검색", action:"PadoController.ShowFanPopup();"})						
					}
					else {
						//Gnb Setting
						GnbComponent.setFunctionKey("skTv.keymap.RED", "PadoController.ShowOnedegList(\"\");"); 
						GnbComponent.setFunctionKey("skTv.keymap.BLUE", "PadoController.ShowFanPopup();"); 
						
						//HelpBar Setting
						HelpComponent.changeShow({menuid:"0", icon:"icon_help4",name:"일촌보기", action:"PadoController.ShowOnedegList(\"\");"})                    
						HelpComponent.changeShow({menuid:"1", icon:"icon_help1",name:"팬검색", action:"PadoController.ShowFanPopup();"})						
					}
				}
			);
		},
			
		/**
		 * GetFanList
		 * @param FanList : 팬리스트
		 * @return 
		 */
		GetFanList : function(FanList){
			
			resultCnt = FanList.length;			
			
			var listHTML = "";
			
			for(var i=0; i<resultCnt; i++ ){
				
				var ListId = i;		
					
				listHTML += "<li id="+ FanList[i].StarID + " class='' >"
						 +	"<div class='inner'>"						
						 +  "<img src='"+ FanList[i].StarImg.replace('http://mhft.cyworld.co.kr/cthumb_65x65/',THUMB_IMG_URL_110X94) +"' alt='' width='110' height='94' />"
						 +  "<div class='text_user'>"+FanList[i].StarNm+"</div>"
						 +  "</div>"
						 +  "</li>";
				
				if(resultCnt>pPage && i==pPage-1){
					listHTML += "</ul><ul class='list_pado' >";
				}
			}
			listHTML = "<ul class='list_pado'>" + listHTML + "</ul>";
			
			return listHTML;
			
		},	
		
		/**
		 * ShowOnedegPopup : 일촌 검색 팝업
		 * @param 
		 * @return 
		 */
		ShowOnedegPopup : function(){
			
			PopupComponent.showInputPopup(

							"일촌 검색",
							// title
							
							"일촌의 이름을 입력해주세요",
							// contents
							
							"OnedegKeyword",
							// inputName
							
							"text",
							// input type
							
							"korean",
							// 처음 보여줄 언어 Set(korean, english)
							
							function() {
							// Enter Callback	
								// 첫글자가 한글, 영문, 숫자 이외의 글자이면 검색되지 않도록 수정(7.5 by sophia)
								//var limit_char = /[~!\/\[\]\(\)\{\}\@#$^&*_\=+-|:;?%"<,.>'§¿¡€￡￥￦＼]/gi;		
								//var use_char =  /[.]|[@]|[_]|[\/]|[\^]|[~]|[?]|[!]|[']|["]|[(]|[)]|[-]|[#]|[:]|[;]|[+]|[&]|[*]|[=]|[<]|[>]|[\[]|[\]]|[{]|[}]|[,]|[§]|[%]|[¿]|[¡]|[€]|[£]|[$]|[¥]|[￦]|[\＼]|[\|]/g;
								var use_char =  /^[^\da-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/g;

								if($("#OnedegKeyword").val() == "") {
									PopupComponent.setInputPopupInfo("일촌의 이름을 입력해주세요.");									
									PopupComponent.setInputFocus();									
									return;
								
									// 첫글자가 한글, 영문, 숫자 이외의 글자이면 검색되지 않도록 수정(7.5 by sophia)
								//} else if(limit_char.test($("#OnedegKeyword").val())){
								} else if(use_char.test($("#OnedegKeyword").val())){
									PopupComponent.setInputPopupInfo("특수문자는 입력하실 수 없습니다.");
									PopupComponent.setInputFocus();									
									return;
								} else {				
									PadoController.ShowOnedegList($("#OnedegKeyword").val());
									skTv.zone.hide("InputPopup");									
									$("[id^='SortIndex']").removeClass("focus");	
									$("[id^='SortIndex']").removeClass("over");
									// 
									if(skEnv.device.vendor == "lgcns") {
										skTv.zone.show(zone_temp);
									}
								}
								
							},
							
							function() {
							// Close Callback
							
								skTv.zone.hide("InputPopup");
								if(skEnv.device.vendor == "lgcns") {
									skTv.zone.show(zone_temp);
								}
								skTv.zone.focus(zone_temp);
								
							},
							
							'10'
							// Input Max Length
							
							);
			if(skEnv.device.vendor == "lgcns") {
				skTv.zone.hide(zone_temp);
			}
		},
		
		/**
		 * ShowFanPopup : 팬 검색 팝업
		 * @param 
		 * @return 
		 */
		ShowFanPopup : function(){
			
			PopupComponent.showInputPopup(

							"팬(관심일촌) 검색",
							// title
							
							"팬(관심일촌)의 이름을 입력해주세요",
							// contents
							
							"FanKeyword",
							// inputName
							
							"text",
							// input type
							
							"korean",
							// 처음 보여줄 언어 Set(korean, english)
							
							function() {
							// Enter Callback		
								// 첫글자가 한글, 영문, 숫자 이외의 글자이면 검색되지 않도록 수정(7.5 by sophia)
								//var limit_char = /[~!\/\[\]\(\)\{\}\@#$^&*_\=+-|:;?%"<,.>'§¿¡€￡￥￦＼]/gi;		
								//var use_char =  /[.]|[@]|[_]|[\/]|[\^]|[~]|[?]|[!]|[']|["]|[(]|[)]|[-]|[#]|[:]|[;]|[+]|[&]|[*]|[=]|[<]|[>]|[\[]|[\]]|[{]|[}]|[,]|[§]|[%]|[¿]|[¡]|[€]|[£]|[$]|[¥]|[￦]|[\＼]|[\|]/g;
								var use_char =  /^[^\da-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]/g;
									
								if($("#FanKeyword").val() == "") {
									PopupComponent.setInputPopupInfo("팬(관심일촌)의 이름을 입력해주세요.");									
									PopupComponent.setInputFocus();									
									return;
								
								// 첫글자가 한글, 영문, 숫자 이외의 글자이면 검색되지 않도록 수정(7.5 by sophia)
								//} else if(limit_char.test($("#FanKeyword").val())){
								} else if(use_char.test($("#FanKeyword").val())){
									PopupComponent.setInputPopupInfo("특수문자는 입력하실 수 없습니다.");
									PopupComponent.setInputFocus();									
									return;
									
								} else {				
									PadoController.ShowFanList(0,$("#FanKeyword").val());
									skTv.zone.hide("InputPopup");
									$("[id^='SortIndex']").removeClass("focus");	
									$("[id^='SortIndex']").removeClass("over");
									if(skEnv.device.vendor == "lgcns") {
										skTv.zone.show(zone_temp);
									}
								}
								
							},
							
							function() {
							// Close Callback							
								skTv.zone.hide("InputPopup");
								if(skEnv.device.vendor == "lgcns") {
									skTv.zone.show(zone_temp);
								}
								skTv.zone.focus(zone_temp);								
							},
							
							'10'
							// Input Max Length
							
							);
			if(skEnv.device.vendor == "lgcns") {
				skTv.zone.hide(zone_temp);
			}
		},
		
		/**
		 * SetFocusRight : 오른쪽(Right) 페이지 이동 후 Focus Setting 
		 * @param 
		 * @return 
		 */
		SetFocusRight : function(path, list_no, last_page_yn){
			
			$('#ul_list_pado > ul > li').removeClass('focus');
			
			if(path=="K" && last_page_yn=="N"){				//key 이동, 마지막 페이지가 아닌 경우
				if(list_no==7){
					$("#ul_list_pado > ul:eq(1) > li:first").addClass('focus');	
				} else if(list_no==15){
					$("#ul_list_pado > ul:eq(1) > li:eq(8)").addClass('focus');
				} else if(list_no==23){
					$("#ul_list_pado > ul:eq(1) > li:eq(16)").addClass('focus');
				}				
			} else if(path=="K" && last_page_yn=="Y") {		//key 이동, 마지막 페이지인 경우		
				if(list_no==7){
					$("#ul_list_pado > ul:eq(1) > li:first").addClass('focus');	
				} else if(list_no==15){
					if($("#ul_list_pado > ul:eq(1) > li:eq(8)").length > 0){
						$("#ul_list_pado > ul:eq(1) > li:eq(8)").addClass('focus');
					} else {
						$("#ul_list_pado > ul:eq(1) > li:first").addClass('focus');
					}								
				} else if(list_no==23){
					if($("#ul_list_pado > ul:eq(1) > li:eq(16)").length > 0){
						$("#ul_list_pado > ul:eq(1) > li:eq(16)").addClass('focus');
					} else {
						$("#ul_list_pado > ul:eq(1) > li:first").addClass('focus');
					}
				}				
			} else if(path=="M"){		//Mouse 이동, 마지막 페이지가 아닌 경우				
				$('#ul_list_pado > ul:eq(1) > li:first').addClass('focus');
			} 		
		},
		
		
		MoveRight : function(path){	
			
			var list_no = -1;
			if ($("#ul_list_pado > ul:eq(1)> li").hasClass('focus')==true){ //focus가 list에 있는지 여부 판단
				list_no = $('#ul_list_pado > ul:eq(1) > li.focus').index();
			}
			
			if(cPage<totalPage){	//현재 페이지가 총 페이지보다 작은 경우					
				
				cPage++;				
				
				if (pado_kind == "one" && page_flag == 0) { 	//'일촌','전체보기'
					
					if (cPage < totalPage) {
					
						LoadingComponent.setLoadingImgTimer(0);
						LoadingComponent.setIsLoadingImg(true);
						LoadingComponent.lock(true);
						
						this.model.retriveOnedegList(
						cPage+1,
						pPage,
						keyword,
						function(OneDegList){
						
							if (OneDegList[0] != undefined) { 	//응답이 오면	
								var UL_HTML = PadoController.GetOnedegList(OneDegList);
								$('#ul_list_pado ul:first').remove();
								$("#ul_list_pado ul").css("left", "0px");
								$("#ul_list_pado ul:last").after(UL_HTML);
								
								if(skEnv.device.vendor == "lgcns") {
									$('#ul_list_pado ul').animate({left: -1130}, 0, 'linear', function(){
										LoadingComponent.unlock();
									});								
								}
								else {
									$('#ul_list_pado ul').animate({left: -1130}, 800, 'swing', function(){
										LoadingComponent.unlock();
									});
								}
								if (list_no != -1) {
									PadoController.SetFocusRight(path, list_no, "N");
								}
							}
						});
					} else {
						LoadingComponent.setLoadingImgTimer(0);
						LoadingComponent.setIsLoadingImg(true);
						LoadingComponent.lock(true);
						
						$('#ul_list_pado ul:first').remove();
						$("#ul_list_pado ul").css("left", "0px");
						$("#ul_list_pado ul:last").after("<ul class='list_pado'>" + "</ul>");
						
						if(skEnv.device.vendor == "lgcns") {
							$('#ul_list_pado ul').animate({left: -1131}, 0, 'linear', function(){
								LoadingComponent.unlock();
							});
						}
						else {
							$('#ul_list_pado ul').animate({left: -1131}, 800, 'swing', function(){
								LoadingComponent.unlock();
							});
						}
						if (list_no != -1) {
							PadoController.SetFocusRight(path, list_no, "Y");
						}
					}
					
				} else if (pado_kind == "one" && page_flag > 0) { 	//'일촌' 'Index보기'
						if (cPage < totalPage) {
						
							LoadingComponent.setLoadingImgTimer(0);
							LoadingComponent.setIsLoadingImg(true);
							LoadingComponent.lock(true);
							
							this.model.retriveOnedegIndex(
								cPage + 1,
								TotalOneDeg,
								'',
								index,
								pPage, function(OneDegList){
							
								var UL_HTML = PadoController.GetOnedegList(OneDegList);
								$('#ul_list_pado ul:first').remove();
								$("#ul_list_pado ul").css("left", "0px");
								$("#ul_list_pado ul:last").after(UL_HTML);
								if(skEnv.device.vendor == "lgcns") {
									$('#ul_list_pado ul').animate({left: -1131}, 0, 'linear', function(){
										LoadingComponent.unlock();
									});
								}
								else {
									$('#ul_list_pado ul').animate({left: -1131}, 800, 'swing', function(){
										LoadingComponent.unlock();
									});									
								}
								
								Count = OneDegList[0].totCount; 	//선택한 index에 해당하는 일촌 수
								totalPage = Math.ceil(Count / pPage); 	//전체가 몇 페이지인가?
								page_flag = index;
								
								if (list_no != -1) {
									PadoController.SetFocusRight(path, list_no, "N");
								}
								
							});
						} else {
						
							LoadingComponent.setLoadingImgTimer(0);
							LoadingComponent.setIsLoadingImg(true);
							LoadingComponent.lock(true);
							
							$('#ul_list_pado ul:first').remove();
							$("#ul_list_pado ul").css("left", "0px");
							$("#ul_list_pado ul:last").after("<ul class='list_pado'>" + "</ul>");
							if(skEnv.device.vendor == "lgcns") {
								$('#ul_list_pado ul').animate({left: -1131}, 0, 'linear', function(){
									LoadingComponent.unlock();
								});
							}
							else {
								$('#ul_list_pado ul').animate({left: -1131}, 800, 'swing', function(){
									LoadingComponent.unlock();
								});								
							}

							if (list_no != -1) {
								PadoController.SetFocusRight(path, list_no, "Y");
							}
						}
						
					} else if (pado_kind == "fan" ) { 	//'팬'
							if (cPage < totalPage) {
								
								LoadingComponent.setLoadingImgTimer(0);
								LoadingComponent.setIsLoadingImg(true);
								LoadingComponent.lock(true);
								
								var fanWord = "";
								
								if(searchType=="nameIndex"){
									fanWord = searchWord;	
								} else {
									fanWord = keyword;
								}
								
								this.model.retriveFanList(
								cPage+1,
								pPage,
								searchType,
								fanWord,
								function(FanList){									
									if (typeof FanList == "object") {
										var UL_HTML = PadoController.GetFanList(FanList);
										$('#ul_list_pado ul:first').remove();
										$("#ul_list_pado ul").css("left", "0px");
										$("#ul_list_pado ul:last").after(UL_HTML);
										if(skEnv.device.vendor == "lgcns") {
											$('#ul_list_pado ul').animate({left: -1131}, 0, 'linear', function(){
												LoadingComponent.unlock();
											});											
										}
										else {
											$('#ul_list_pado ul').animate({left: -1131}, 800, 'swing', function(){
												LoadingComponent.unlock();
											});											
										}										

										if (list_no != -1) {
											PadoController.SetFocusRight(path, list_no, "N");
										}
										
									}
									
								});
							} else {
								LoadingComponent.setLoadingImgTimer(0);
								LoadingComponent.setIsLoadingImg(true);
								LoadingComponent.lock(true);
								
								$('#ul_list_pado ul:first').remove();
								$("#ul_list_pado ul").css("left", "0px");
								$("#ul_list_pado ul:last").after("<ul class='list_pado'>" + "</ul>");
								if(skEnv.device.vendor == "lgcns") {
									$('#ul_list_pado ul').animate({left: -1131}, 0, 'linear', function(){
										LoadingComponent.unlock();
									});
								}
								else {
									$('#ul_list_pado ul').animate({left: -1131}, 800, 'swing', function(){
										LoadingComponent.unlock();
									});									
								}
								if (list_no != -1) {
									PadoController.SetFocusRight(path, list_no, "Y");
								}
							}
						} 
				
				var page_info = "";
				page_info = "<span class='num'>"+cPage+"/"+totalPage+"</span> <span class='sum'>(전체 "+Count+"명)</span>";
				skFn.dom.setHtml("page_info", page_info);	
				
			}//end if			
		},
		
		/**
		 * SetFocusLeft : 왼쪽(Left) 페이지 이동 후 Focus Setting 
		 * @param 
		 * @return 
		 */
		SetFocusLeft : function(path, list_no){			
			$('#ul_list_pado > ul > li').removeClass('focus');
			if(path=="K"){		//Key에 의한 이동
				if(list_no==0){
					$("#ul_list_pado > ul:eq(1) > li:eq(7)").addClass('focus');	
				} else if(list_no==8){
					$("#ul_list_pado > ul:eq(1) > li:eq(15)").addClass('focus');	
				} else if(list_no==16){
					$("#ul_list_pado > ul:eq(1) > li:eq(23)").addClass('focus');	
				}
			} else {			//Mouse에 의한 이동
				$("#ul_list_pado > ul:eq(1) > li:first").addClass('focus');
			}
			
		},
		
		
		MoveLeft : function(path){
			
			var list_no = -1;
			if ($("#ul_list_pado > ul:eq(1)> li").hasClass('focus')==true){ //focus가 list에 있는지 여부 판단
				list_no = $('#ul_list_pado > ul:eq(1) > li.focus').index();
			}			
			
			if(cPage!=1){				
				
				cPage--;											
				
				if(pado_kind=="one" && page_flag==0){		//'일촌','전체보기'
					if(cPage>1){
						
						LoadingComponent.setLoadingImgTimer(0);
						LoadingComponent.setIsLoadingImg(true);			
						LoadingComponent.lock(true);
						
						this.model.retriveOnedegList(
								cPage-1,		
								pPage,		
								keyword,
								function(OneDegList){							
									var _controller = this;							
									if(OneDegList[0]!=undefined){	//응답이 오면	
										var UL_HTML = PadoController.GetOnedegList(OneDegList);	
										$('#ul_list_pado ul:last').remove();
										$("#ul_list_pado ul").css("left","-2242px");
										$("#ul_list_pado ul:first").before(UL_HTML);
										if(skEnv.device.vendor == "lgcns") {
											$('#ul_list_pado ul').animate({left:-1131}, 0, 'linear', function(){	
												LoadingComponent.unlock();						
											});											
										}
										else {
											$('#ul_list_pado ul').animate({left:-1131}, 800, 'swing', function(){	
												LoadingComponent.unlock();						
											});											
										}
										
										if(list_no!=-1){
											PadoController.SetFocusLeft(path, list_no);
										}
										
									}
								}						
						);			
					} else {
						LoadingComponent.setLoadingImgTimer(0);
						LoadingComponent.setIsLoadingImg(true);			
						LoadingComponent.lock(true);
						
						$('#ul_list_pado ul:last').remove();
						$("#ul_list_pado ul").css("left","-2242px");	
						$("#ul_list_pado ul:first").before("<ul class='list_pado'>"+"</ul>");
						if(skEnv.device.vendor == "lgcns") {
							$('#ul_list_pado ul').animate({left:-1131}, 0, 'linear', function(){	
								LoadingComponent.unlock();					
							});							
						}
						else {
							$('#ul_list_pado ul').animate({left:-1131}, 800, 'swing', function(){	
								LoadingComponent.unlock();					
							});							
						}
						
						if(list_no!=-1){
							PadoController.SetFocusLeft(path, list_no);
						}
					}
					
				} else if(pado_kind=="one" && page_flag>0){		//'일촌', 'Index보기'
					
					if(cPage>1){
						
						LoadingComponent.setLoadingImgTimer(0);
						LoadingComponent.setIsLoadingImg(true);			
						LoadingComponent.lock(true);
						
						this.model.retriveOnedegIndex(
								'1',
								TotalOneDeg,
								'',
								index,
								pPage,
								function(OneDegList){
									
									var UL_HTML = PadoController.GetOnedegList(OneDegList);					
									$('#ul_list_pado ul:last').remove();
									$("#ul_list_pado ul").css("left","-2242px");
									$("#ul_list_pado ul:first").before(UL_HTML);
									if(skEnv.device.vendor == "lgcns") {
										$('#ul_list_pado ul').animate({left:-1131}, 0, 'linear', function(){	
											LoadingComponent.unlock();					
										});										
									}
									else {
										$('#ul_list_pado ul').animate({left:-1131}, 800, 'swing', function(){	
											LoadingComponent.unlock();					
										});										
									}											
									Count = OneDegList[0].totCount;						//선택한 index에 해당하는 일촌 수		
									totalPage = Math.ceil(Count/pPage);					//전체가 몇 페이지인가?	
										
									page_flag = index;		
									
									if(list_no!=-1){
										PadoController.SetFocusLeft(path, list_no);
									}
									
								}				
						);	
					} else {
						
						LoadingComponent.setLoadingImgTimer(0);
						LoadingComponent.setIsLoadingImg(true);			
						LoadingComponent.lock(true);
						
						$('#ul_list_pado ul:last').remove();
						$("#ul_list_pado ul").css("left","-2242px");	
						$("#ul_list_pado ul:first").before("<ul class='list_pado'>"+"</ul>");
						if(skEnv.device.vendor == "lgcns") {
							$('#ul_list_pado ul').animate({left:-1131}, 0, 'linear', function(){	
								LoadingComponent.unlock();					
							});							
						}
						else {
							$('#ul_list_pado ul').animate({left:-1131}, 800, 'swing', function(){	
								LoadingComponent.unlock();					
							});							
						}
						if(list_no!=-1){
							PadoController.SetFocusLeft(path, list_no);
						}
					}
				} else if(pado_kind=="fan"){		//'팬' 
					
						if(cPage>1){	
						
						LoadingComponent.setLoadingImgTimer(0);
						LoadingComponent.setIsLoadingImg(true);			
						LoadingComponent.lock(true);
									
						var fanWord = "";
								
						if(searchType=="nameIndex"){
							fanWord = searchWord;	
						} else {
							fanWord = keyword;
						}
								
						this.model.retriveFanList(
								cPage-1,
								pPage,
								searchType,
								fanWord,
								function(FanList){										
									if(typeof FanList=="object"){											
										var UL_HTML = PadoController.GetFanList(FanList);	
										$('#ul_list_pado ul:last').remove();
										$("#ul_list_pado ul").css("left","-2242px");
										$("#ul_list_pado ul:first").before(UL_HTML);
										if(skEnv.device.vendor == "lgcns") {
											$('#ul_list_pado ul').animate({left:-1131}, 0, 'linear', function(){
												LoadingComponent.unlock();							
											});												
										}
										else {
											$('#ul_list_pado ul').animate({left:-1131}, 800, 'swing', function(){
												LoadingComponent.unlock();							
											});												
										}
									}
									
									if(list_no!=-1){
										PadoController.SetFocusLeft(path, list_no);
									}
									
									//Count = FanList[0].TotalCnt;			//전체 팬 수						
									//totalPage = Math.ceil(Count/pPage);		//전체가 몇 페이지인가?
										
									//page_flag = index;	
																		
								}
						);
					} else {
						LoadingComponent.setLoadingImgTimer(0);
						LoadingComponent.setIsLoadingImg(true);			
						LoadingComponent.lock(true);
						
						$('#ul_list_pado ul:last').remove();
						$("#ul_list_pado ul").css("left","-2242px");	
						$("#ul_list_pado ul:first").before("<ul class='list_pado'>"+"</ul>");
						if(skEnv.device.vendor == "lgcns") {
							$('#ul_list_pado ul').animate({left:-1131}, 0, 'linear', function(){	
								LoadingComponent.unlock();						
							});
						}
						else {
							$('#ul_list_pado ul').animate({left:-1131}, 800, 'swing', function(){	
								LoadingComponent.unlock();						
							});
						}
												
						if(list_no!=-1){
							PadoController.SetFocusLeft(path, list_no);
						}
					}
				}
				var page_info = "";
				page_info = "<span class='num'>"+cPage+"/"+totalPage+"</span> <span class='sum'>(전체 "+Count+"명)</span>";
				skFn.dom.setHtml("page_info", page_info);
				
			}
		}

		
	}
});


