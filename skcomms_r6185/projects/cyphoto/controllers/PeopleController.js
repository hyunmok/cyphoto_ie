
var PeopleControllerClass = defineClass({

	extend : BaseControllerClass,

	name : 'PeopleControllerClass',

	/**
	 *
	 */
	construct : function(){
		
		this.superclass();
		
		this.model = new PeopleModelClass();		
		
		cPage = 1;					//현재 페이지	
		pPage = 6;					//페이지당 아이템 갯수
		
		totalPage = 0;				//전체 페이지
		totalStar = 0;				//전체 스타수
		resultCnt = 0;				//API response 결과 갯수
		
		zone_temp = "PeopleList";	//zone setting
	},

	/**
	 * 
	 */
	methods : {
		
		/**
		 * ShowPeople : People 목록 보여줌
		 * @param 
		 * @return 
		 */
		ShowPeople : function(){	
		
				//LoadingComponent.setLoadingImgTimer(0);
				//LoadingComponent.setIsLoadingImg(true);			
				//LoadingComponent.lock(true);
				
				//Gnb Return zone Setting
				GnbComponent.setReturnZone("PeopleList");
					
				$('#ScenePeopleList').css("visibility","visible");
				$('#ScenePeopleSearchList').css("visibility","hidden");		
				$('#ScenePeopleSearchListNone').css("visibility","hidden");	
				
				Count = peopleThemaCount;			//전체 테마 수
				totalStar = peopleStarCount;
				totalPage = Math.ceil(Count/pPage);
				
				//var DIV_HTML = "<div class='all_people'><div style=''>&nbsp;"+"</div></div>"+eval("DIV_HTML"+cPage)+eval("DIV_HTML"+(cPage+1));
				var DIV_HTML = "<div class='all_people'><div style=''>&nbsp;"+"</div></div>"+FIRST_HTML;
				skFn.dom.setHtml("list_people", DIV_HTML);
				
				skTv.zone.focus('PeopleList');	
				$("div.all_people:eq(1)").removeClass("focus");
				$("div.all_people:eq(1) li:first").addClass("focus");
				
				var page_info = "";
				page_info = "<span class='num'>"+cPage+"/"+totalPage+"</span> <span class='sum'>(전체 "+totalStar+"명)</span>";
				skFn.dom.setHtml("page_info", page_info);	
				
				//LoadingComponent.unlock();
						
				//Gnb Setting
				GnbComponent.setFunctionKey("skTv.keymap.RETURN", "navigation.gotoAppManage();"); 
						
				//HelpBar Setting
				HelpComponent.changeShow({menuid:"1", icon:"icon_help5",name:"이전", action:"navigation.gotoAppManage();"})				
			
			
			/*		
			this.model.retriveThemeList(
				cPage,
				pPage*2,
				function(ThemaList){					
					
					//Gnb Return zone Setting
					GnbComponent.setReturnZone("PeopleList");
					
					$('#ScenePeopleList').css("visibility","visible");
					$('#ScenePeopleSearchList').css("visibility","hidden");		
					$('#ScenePeopleSearchListNone').css("visibility","hidden");					
								
					Count = ThemaList[0].theme_total_cnt;			//전체 테마 수
					totalStar = ThemaList[0].star[0].star_total_cnt;
					totalPage = Math.ceil(Count/pPage);
						
					var DIV_HTML = PeopleController.GetPeopleList(ThemaList);						
					DIV_HTML = "<div class='all_people'><div style=''>&nbsp;"+"</div></div>"+DIV_HTML;
					skFn.dom.setHtml("list_people", DIV_HTML);
					
					skTv.zone.focus('PeopleList');	
					$("div.all_people:eq(1)").removeClass("focus");
					$("div.all_people:eq(1) li:first").addClass("focus");
						
					var page_info = "";
					page_info = "<span class='num'>"+cPage+"/"+totalPage+"</span> <span class='sum'>(전체 "+totalStar+"명)</span>";
					skFn.dom.setHtml("page_info", page_info);						
						
					LoadingComponent.unlock();
					
					//Gnb Setting
					GnbComponent.setFunctionKey("skTv.keymap.RETURN", "navigation.gotoAppManage();"); 
					
					//HelpBar Setting
					HelpComponent.changeShow({menuid:"1", icon:"icon_help5",name:"이전", action:"navigation.gotoAppManage();"})
				}
				
			);*/			
			
		},
		
		
		GetPeopleList : function(ThemaList){
			
			resultCnt = ThemaList.length;
			
			var listHTML = "";
			
			for(var i=0; i<resultCnt; i++){	
				
				if (ThemaList[i].theme_type=="3") {		//Theme Type이 펼침형(3)인 경우
				
					listHTML +=		"<div class='pie'>"
							 +			"<div class='title'>"
							 +				ThemaList[i].theme_nm
							 +			"</div>"
							 +			"<ul class='list_people'>"
							 //+				"<li class='focus'>"
							 +				"<li class='' id='"+ThemaList[i].star[0].star_id+"' style='background-image: url(\""+ThemaList[i].star[0].star_thumb+"\")'>"
							 +					"<div class='inner'>"+ThemaList[i].star[0].star_nm+"</div>"
							 +				"</li>"
							 +				"<li class='' id='"+ThemaList[i].star[1].star_id+"' style='background-image: url(\""+ThemaList[i].star[1].star_thumb+"\")'>"
							 +					"<div class='inner'>"+ThemaList[i].star[1].star_nm+"</div>"
							 +				"</li>"
							 +				"<li class='' id='"+ThemaList[i].star[2].star_id+"' style='background-image: url(\""+ThemaList[i].star[2].star_thumb+"\")'>"
							 +					"<div class='inner'>"+ThemaList[i].star[2].star_nm+"</div>"
							 +				"</li>"
							 +				"<!-- 마지막 li에는 last 클래스 꼭 붙여주세요. -->"
							 +				"<li class='last' id='"+ThemaList[i].star[3].star_id+"' style='background-image: url(\""+ThemaList[i].star[3].star_thumb+"\")'>"
							 +					"<div class='inner'>"+ThemaList[i].star[3].star_nm+"</div>"
							 +				"</li>"
							 +			"</ul>"
							 +		"</div>";
				
				} else if(ThemaList[i].theme_type=="2"){	//Theme Type이 라이벌형(2)인 경우
					
					listHTML +=		"<div class='pie'>"
							 +			"<div class='title'>"
							 +				ThemaList[i].theme_nm
							 +			"</div>"
							 +			"<ul class='list_people'>"
							 //+				"<li class='focus'>"
							 +				"<li class='' id='"+ThemaList[i].star[0].star_id+"' style='background-image: url(\""+ThemaList[i].star[0].star_thumb+"\")'>"
							 +					"<div class='inner'>"+ThemaList[i].star[0].star_nm+"</div>"
							 +					"</div>"
							 +				"</li>"
							 +				"<li class='' id='"+ThemaList[i].star[1].star_id+"'  style='background-image: url(\""+ThemaList[i].star[1].star_thumb+"\")'>"
							 +					"<div class='inner'>"+ThemaList[i].star[1].star_nm+"</div>"
							 +				"</li>"
							 +			"</ul>"
							 +		"</div>";
				}	
				
					 
				if(resultCnt>pPage && i==pPage-1){
					listHTML += "</div><div class='all_people'>"
				}
					
			}
			
			listHTML = "<div class='all_people'>" + listHTML + "</div>"				
			
			return listHTML;
			
		},
		
		/**
		 * SetFocusRight : 오른쪽(Right) 페이지 이동 후 Focus Setting 
		 * @param 
		 * @return 
		 */
		SetFocusRight : function(path, ul_no, last_page_yn){
			
			$("div.all_people li.focus").removeClass("focus");
			
			if(path=="K" && last_page_yn=="N"){				//key 이동, 마지막 페이지가 아닌 경우
				if(ul_no==1){
					$("div.all_people:eq(1) ul.list_people:eq(0) > li:first").addClass("focus");
				} else if(ul_no==3){
					$("div.all_people:eq(1) ul.list_people:eq(2) > li:first").addClass("focus");
				} else if(ul_no==5){
					$("div.all_people:eq(1) ul.list_people:eq(4) > li:first").addClass("focus");
				}				
			} else if(path=="K" && last_page_yn=="Y") {		//key 이동, 마지막 페이지인 경우		
				if(ul_no==1){
					$("div.all_people:eq(1) ul.list_people:eq(0) > li:first").addClass("focus");
				} else if(ul_no==3){
					if($("div.all_people:eq(1) ul.list_people:eq(2) > li:first").length > 0){
						$("div.all_people:eq(1) ul.list_people:eq(2) > li:first").addClass('focus');
					} else {
						$("div.all_people:eq(1) ul.list_people:eq(0) > li:first").addClass("focus");
					}								
				} else if(ul_no==5){
					if($("div.all_people:eq(1) ul.list_people:eq(4) > li:first").length > 0){
						$("div.all_people:eq(1) ul.list_people:eq(4) > li:first").addClass('focus');
					} else {
						$("div.all_people:eq(1) ul.list_people:eq(0) > li:first").addClass("focus");
					}
				}				
			} else if(path=="M"){		//Mouse 이동, 마지막 페이지가 아닌 경우	
				$("div.all_people:eq(1) ul.list_people:eq(0) > li:first").addClass("focus");
			} 	
			
				
		},
		
		/**
		 * MoveRight : 오른쪽(Right) 페이지 이동  
		 * @param    : path - 키보드 : K, 마우스 : M
		 * @return 
		 */
		MoveRight : function(path){
			
			var ul_no = -1;			
			if($("div.all_people:eq(1) li.focus").hasClass("focus")==true){
				var ul_no = $("div.all_people:eq(1) ul.list_people:has('li.focus')").index("div.all_people:eq(1) ul.list_people");		//li 포커스를 가진 ul의 index	
				
			}
			
			if (cPage < totalPage) {		
			
				cPage++;
				
				if (cPage < totalPage) {
					
					LoadingComponent.setLoadingImgTimer(0);
					LoadingComponent.setIsLoadingImg(true);			
					LoadingComponent.lock(true);

					if(skEnv.device.vendor == "lgcns") {
						$.getScript("http://lg.tvapp.nate.com/lg/cyphoto/js/people/peopleHTML"+(cPage+1)+".js", function(){
							var DIV_HTML = eval("DIV_HTML"+(cPage+1));						
							$("#list_people > div:first ").remove();	
							$("#list_people > div").css("left", "0px");	
							$("#list_people > div:last ").after(DIV_HTML);
							$("#list_people > div").animate({left: -1110}, 0, 'linear', function(){
								LoadingComponent.unlock();	
							});
							
							if (ul_no != -1) {
								PeopleController.SetFocusRight(path, ul_no, "N");
							}
							
							var page_info = "";
							page_info = "<span class='num'>"+cPage+"/"+totalPage+"</span> <span class='sum'>(전체 "+totalStar+"명)</span>";
							skFn.dom.setHtml("page_info", page_info);
						});						
					}
					else {
						$.getScript("http://lg.tvapp.nate.com/lg/cyphoto/js/people/peopleHTML"+(cPage+1)+".js", function(){						
							var DIV_HTML = eval("DIV_HTML"+(cPage+1));						
							$("#list_people > div:first ").remove();	
							$("#list_people > div").css("left", "0px");	
							$("#list_people > div:last ").after(DIV_HTML);	
							$("#list_people > div").animate({left: -1110}, 800, 'swing', function(){
								LoadingComponent.unlock();	
							});
							
							if (ul_no != -1) {
								PeopleController.SetFocusRight(path, ul_no, "N");
							}
							
							var page_info = "";
							page_info = "<span class='num'>"+cPage+"/"+totalPage+"</span> <span class='sum'>(전체 "+totalStar+"명)</span>";
							skFn.dom.setHtml("page_info", page_info);
						});							
					}
					
					/*
					this.model.retriveThemeList(
					cPage+1,
					pPage,
					function(ThemaList){
						
						var DIV_HTML = PeopleController.GetPeopleList(ThemaList);
						$(".wrap_list_people > #list_people > div:first ").remove();	
						$(".wrap_list_people > #list_people > div").css("left", "0px");	
						$(".wrap_list_people > #list_people > div:last ").after(DIV_HTML);	
						$(".wrap_list_people > #list_people > div").animate({left: -1110}, 900, 'swing', function(){
							LoadingComponent.unlock();	
						});
						
						if (ul_no != -1) {
							PeopleController.SetFocusRight(path, ul_no, "N");
						}
						var page_info = "";
						page_info = "<span class='num'>" + cPage + "/" + totalPage + "</span> <span class='sum'>(전체 " + totalStar + "명)</span>";
						skFn.dom.setHtml("page_info", page_info);
						
						
					});*/
				} else {
					
					LoadingComponent.setLoadingImgTimer(0);
					LoadingComponent.setIsLoadingImg(true);			
					LoadingComponent.lock(true);
					
					$("#list_people > div:first").remove();
					$("#list_people > div").css("left", "0px");
					$("#list_people > div:last").after("<div class='all_people'><div style=''>&nbsp;" + "</div></div>");
					if(skEnv.device.vendor == "lgcns") {
						$("#list_people > div").animate({left: -1110}, 0, 'linear', function(){
							LoadingComponent.unlock();	
						});						
					}
					else {
						$("#list_people > div").animate({left: -1110}, 800, 'swing', function(){
							LoadingComponent.unlock();	
						});						
					}
					if (ul_no != -1) {
						PeopleController.SetFocusRight(path, ul_no, "Y");
					}
					var page_info = "";
					page_info = "<span class='num'>" + cPage + "/" + totalPage + "</span> <span class='sum'>(전체 " + totalStar + "명)</span>";
					skFn.dom.setHtml("page_info", page_info);
				}
				
				
			}
			
			
		},
		
		/**
		 * SetFocusLeft : 왼쪽(Left) 페이지 이동 후 Focus Setting 
		 * @param 
		 * @return 
		 */
		SetFocusLeft : function(path, ul_no){
						
			$("div.all_people li.focus").removeClass("focus");
			
			if(path=="K"){		//Key에 의한 이동
				if(ul_no==0){
					$("div.all_people:eq(1) ul.list_people:eq(1) > li:last").addClass("focus");
				} else if(ul_no==2){
					$("div.all_people:eq(1) ul.list_people:eq(3) > li:last").addClass("focus");
				} else if(ul_no==4){
					$("div.all_people:eq(1) ul.list_people:eq(5) > li:last").addClass("focus");
				}
			} else {			//Mouse에 의한 이동
				$("div.all_people:eq(1) ul.list_people:eq(0) > li:first").addClass("focus");
			}
			
		},
		
		MoveLeft : function(path){
			var ul_no = -1;
			//var li_no = -1;
			if($("div.all_people:eq(1) li.focus").hasClass("focus")==true){
				var ul_no = $("div.all_people:eq(1) ul.list_people:has('li.focus')").index("div.all_people:eq(1) ul.list_people");		//li 포커스를 가진 ul의 index	
				//var li_no = $("div.all_people:eq(1) li.focus").index();							//li 포커스 index
			}
			
			if(cPage!=1){
				
				cPage--;
				
				if (cPage > 1) {
					
					LoadingComponent.setLoadingImgTimer(0);
					LoadingComponent.setIsLoadingImg(true);			
					LoadingComponent.lock(true);
					if(skEnv.device.vendor == "lgcns") {
						$.getScript("http://lg.tvapp.nate.com/lg/cyphoto/js/people/peopleHTML"+(cPage-1)+".js", function(){		
							var DIV_HTML = eval("DIV_HTML"+(cPage-1));
							$("#list_people > div:first").before(DIV_HTML);							
							$("#list_people > div:last").remove();
							$("#list_people > div").css("left", "-2220px");							
							$("#list_people > div").animate({left: -1110}, 0, 'linear', function(){
								LoadingComponent.unlock();
							});
							
							if (ul_no != -1) {
								PeopleController.SetFocusLeft(path, ul_no);
							}
						});						
					}
					else {
						$.getScript("http://lg.tvapp.nate.com/lg/cyphoto/js/people/peopleHTML"+(cPage-1)+".js", function(){	
							var DIV_HTML = eval("DIV_HTML"+(cPage-1));
							$("#list_people > div:first").before(DIV_HTML);							
							$("#list_people > div:last").remove();
							$("#list_people > div").css("left", "-2220px");							
							$("#list_people > div").animate({left: -1110}, 800, 'swing', function(){
								LoadingComponent.unlock();
							});
							
							if (ul_no != -1) {
								PeopleController.SetFocusLeft(path, ul_no);
							}
						});							
					}
					/*
					this.model.retriveThemeList(
						cPage-1,
						pPage,
						function(ThemaList){
						
							var DIV_HTML = PeopleController.GetPeopleList(ThemaList);
							$("#list_people > div:first").before(DIV_HTML);							
							$("#list_people > div:last").remove();
							$("#list_people > div").css("left", "-2220px");							
							$("#list_people > div").animate({left: -1110}, 900, 'swing', function(){
								LoadingComponent.unlock();
							});
							if (ul_no != -1) {
								PeopleController.SetFocusLeft(path, ul_no);
							}
							
						});*/
				} else {
					
					LoadingComponent.setLoadingImgTimer(0);
					LoadingComponent.setIsLoadingImg(true);			
					LoadingComponent.lock(true);
					
					$("#list_people > div:last").remove();
					$("#list_people > div").css("left", "-2220px");
					$("#list_people > div:first").before("<div class='all_people'><div style=''>&nbsp;" + "</div></div>");
					if(skEnv.device.vendor == "lgcns") {
						$("#list_people > div").animate({left: -1110}, 0, 'linear', function(){
							LoadingComponent.unlock();
						});						
					}
					else {
						$("#list_people > div").animate({left: -1110}, 800, 'swing', function(){
							LoadingComponent.unlock();
						});						
					}
					if (ul_no != -1) {
						PeopleController.SetFocusLeft(path, ul_no);
					}
				}
				
				var page_info = "";
				page_info = "<span class='num'>" + cPage + "/" + totalPage + "</span> <span class='sum'>(전체 " + totalStar + "명)</span>";
				skFn.dom.setHtml("page_info", page_info);
				
			}	
		},
		
		/**
		 * ShowSearchPopup : 피플 검색 팝업
		 * @param 
		 * @return 
		 */
		ShowSearchPopup : function(){
			PopupComponent.showInputPopup(

							"스타홈피 검색",
							// title
							
							"스타홈피의 이름을 입력해주세요.",
							// contents
							
							"PeopleKeyword",
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

								if($("#PeopleKeyword").val() == "") {
									PopupComponent.setInputPopupInfo("스타홈피의 이름을 입력해주세요.");									
									PopupComponent.setInputFocus();									
									return;
								
									// 첫글자가 한글, 영문, 숫자 이외의 글자이면 검색되지 않도록 수정(7.5 by sophia)
								//} else if(limit_char.test($("#PeopleKeyword").val())){
								} else if(use_char.test($("#PeopleKeyword").val())){
									PopupComponent.setInputPopupInfo("특수문자는 입력하실 수 없습니다.");
									PopupComponent.setInputFocus();									
									return;
									
								} else {				
									PeopleController.SearchPeople($("#PeopleKeyword").val());
									skTv.zone.hide("InputPopup");
									if(skEnv.device.vendor == "lgcns") {
										skTv.zone.show(zone_temp);
									}
									//skTv.zone.focus("PeopleSearchList");
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
		 * SearchPeople : People 검색
		 * @param keyword : 검색할 단어
		 * @return 
		 */
		SearchPeople : function(keyword){
			
			LoadingComponent.setLoadingImgTimer(0);
			LoadingComponent.setIsLoadingImg(true);			
			LoadingComponent.lock(true);
			
			this.model.searchStarList(
				1,
				pPage,
				keyword,
				function(ThemaList){
					if (typeof ThemaList == "object") {		//검색 결과  있는  경우
						
						skTv.zone.focus("PeopleSearchList");
						
						//Gnb Return zone Setting
						GnbComponent.setReturnZone("PeopleSearchList");
						
						$('#ScenePeopleList').css("visibility", "hidden");					//List 
						$('#ScenePeopleSearchList').css("visibility", "visible");			//검색결과있음						
						$('#ScenePeopleSearchListNone').css("visibility", "hidden"); 		//검색결과없음
						
						Count = ThemaList[0].total_row_cnt; 		//검색 결과 수
						totalPage = Math.ceil(Count / 24); 			//전체 페이지
						
						var resultHTML = "<span class='text_search_result'>\"<span class='text_name'>"+keyword+"</span>\"</span> 검색 결과 <span class='num_search_result'>"+Count+"</span>건";
						skFn.dom.setHtml("search_result", resultHTML);
						
						var LI_HTML = PeopleController.GetSearchResult(ThemaList);
						skFn.dom.setHtml("ul_list_people", LI_HTML);
					
					} else {								//검색 결과 없는  경우
						
						//skTv.zone.focus("PeopleSearchListNone");
						// LG QA 진행시 기획 요청으로 수정함.(7.4 by sophia)
						skTv.zone.focus("Gnb");
						
						//Gnb Return zone Setting
						// LG QA 진행시 기획 요청으로 수정함.(7.4 by sophia)
						//GnbComponent.setReturnZone("PeopleSearchListNone");
						GnbComponent.setReturnZone("Gnb");
												
						$('#ScenePeopleList').css("visibility", "hidden");					//List 
						$('#ScenePeopleSearchList').css("visibility", "hidden");			//검색결과있음
						$('#ScenePeopleSearchListNone').css("visibility", "visible"); 		//검색결과없음
						
						var resultHTML = "<span class='text_search_result'>\"<span class='text_name'>"+keyword+"</span>\"</span> 검색 결과 <span class='num_search_result'>0</span>건";
						skFn.dom.setHtml("search_result_none", resultHTML);

					}
					LoadingComponent.unlock();
				}				
								
			);
			
			//Gnb Setting
			GnbComponent.setFunctionKey("skTv.keymap.RETURN", "PeopleController.ShowPeople();"); 
			
			//HelpBar Setting
			HelpComponent.changeShow({menuid:"1", icon:"icon_help5",name:"이전", action:"PeopleController.ShowPeople();"})
		},
		
		/**
		 * GetSearchResult : 검색결과를 DOM 형태로 만듦
		 * @param 
		 * @return 
		 */
		GetSearchResult : function(ThemaList){
				
			resultCnt = ThemaList.length;
			
			var listHTML = "";
			
			var liClassName = '';
			
			for(var i=0; i<resultCnt; i++){	

				if(i==0){
					liClassName = 'focus';
				}else{
					liClassName = '';
				}
				
				listHTML +=		"<li class='"+liClassName+"' id='"+ThemaList[i].star_id+"'  style='background-image: url(\""+ThemaList[i].image_path+"\")'>"
						 +			"<div class='inner'>"+ThemaList[i].star_nm+"</div>"
						 +		"</li>"
				
					 
				//if(resultCnt>pPage && i==pPage-1){
				//	listHTML += "</div><div class='all_people'>"
				//}
					
			}
			
			listHTML = "<ul class='list_search'>" + listHTML + "</ul>"				
			
			return listHTML;
		}	
	}
	
		
	
});


