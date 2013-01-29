/**
 *
 * PhotoSlideController.js
 *
 * 
 *
 * @internal ************************* [ file info. start ] *********************************
 *
 * @category		
 * @package		
 * @author		Park, Soonyoung <youngp@skcomms.co.kr>
 * @filesource

 * @_uses		
 * @_todo		
				
 * @_history

				[2011-03-14 오후 4:14:30/ Park, Soonyoung]

				
				
 * @_tutorial		
 * @_version		
 * @_abstract
 * @_final			
 * @_internal
 * 
 * @internal ************************* [ file info. end ] *********************************
 */


/**
 * Photo Slide Controller
 */

var PhotoSlideControllerClass = defineClass({

	extend : BaseControllerClass,

	name : 'PhotoSlideControllerClass',
	
	// memory leak 문제로 수정 = > 보기 모드, referrer 세팅(5/31 by sophia)
	//construct : function(targetId, folderNo, itemNo, themeId){
	construct : function(targetId, folderNo, itemNo, itemCount, referrer){
		// 상위클래스에 체이닝
		this.superclass();
		this._init([
		    'itemNo',			
			'itemIndex',		
			'itemCount',
			'itemTotalCount',

			//'helpBarTimeOutMilisec',	
			//'helpBarFadeMilisec',		

			'photoTimeOutMilisec',		
			'photoFadeMilisec',			

			'keyFadeMilisec',			
			'isKeyInput',				

			//'helpTimeOutId',			//helpBar setTimeout 시 사용할 변수
			'photoTimeOutId',			//photoSlide setTimeout 시 사용할 변수

			'isSlide',
			'pageReferrer'				// page Referrer (memory leak 문제로 추가(5/31 by sophia))

		]);
		if(!itemNo) itemNo = 0;
		var itemIndex = itemNo %2;

		this._set({
			itemNo : itemNo,							//초기 불러올 itemNo
			itemIndex : itemIndex,						//Controller에서 헨들링할 item index
			//itemCount : 1,								// 한장 혹은 두장보기 모드 셋팅
				
			//helpBarTimeOutMilisec : 5000,		//helpBar FadeOut 설정 시간
			//helpBarFadeMilisec : 1000,			//helpBar Fade in, out 속도

			// sophia test
			photoTimeOutMilisec:7000,			//photoFadeOut 설정 시간
			//photoTimeOutMilisec:2000,			//photoFadeOut 설정 시간
			photoFadeMilisec : 500,				//photoFade in, out 속도

			keyFadeMilisec : 200,				//키보드를 사용한 사진 이동 photoFade in, out 속도
			isKeyInput : false,					//키보트 눌렀는지 여부
			
			
			isSlide : true,						//슬라이드 멈춤, 재생 여부
			
			pageReferrer : referrer				// referrer 세팅(memory leak으로 slideshow에서 slideshow를 호출하는 경우가 있어 세팅이 필요함)
		});


		//memory leak 문제로 추가(5/31 by sophia)
		if(typeof itemCount == "undefined") {
			this._set({itemCount : 1});								// 한장보기  모드 셋팅
			
		}else {
			if(itemCount == "2") {
				this._set({itemCount : 2});								// 두장보기  모드 셋팅
			} else {
				this._set({itemCount : 1});								// 한장보기  모드 셋팅
			}
		}
		
		//$("#SceneHelpbar div.user_name").html(decodeURIComponent(skFn.user.getUserName()));
		
		// 모델 인스턴스 생성
		this.model = new PhotoModelClass();
		//item perPage 갯수와 AJAX call을 처리할 "retrieveList" method 를 포함한 model 객체를 세팅
		//PhotoListComponent 는 초기화 되며 model 객체가 사용할 perPage 를 자동으로 설정해준다.

		//memory leak 문제로 추가(5/31 by sophia)
		//var referrer = document.referrer;
		this._set({pageReferrer : referrer});	

		//로그인 여부 체크 및 method 설정
		var method;

		// 포토에서 온 경우 
		//memory leak 문제로 수정(5/31 by sophia)
		//if(referrer.match("blog_photo_list.html")){
		if(referrer.match("blog_photo_list.html") || (folderNo.length == 4 &&  folderNo.substring(0, 1) == '0')){
			if(params.folderName == 'stop'){
				this.toggleSlide(this);
			}
			method = this.model.blog_retrieveList;
		}else{
			if(skFn.user.isLoggedIn()){
				if(targetId == skFn.user.getUserTid() && skFn.user.isPrivacyOpen() == false){
					method = this.model.retrieveListIsPrivacy;
				} else{
					method = this.model.retrieveList;
				}
				
			//미니홈피 모델 인스턴스
			} else {
				method = this.model.retrieveListNoLogin;
			}
		}		
		
		
		PhotoListComponent.init(2, this.model, method);
		PhotoListComponent.setFolderNo(folderNo);
		PhotoListComponent.setThemeId(folderNo);
		PhotoListComponent.setTargetId(targetId);
		
		//ItemNo에 따라 Ajax Call 하고 callback 함수를 실행한다.
		// @ param	{integer}	itemNo
		// @ param	{function}	fnCallBack
		var _this = this;
		var mouseX;
		var mouseY;
		PhotoListComponent.retrieveListByItemNo(this._get("itemNo"), function(){
			_this.display('INIT', _this);	
		});
		//움직였을 때 timeout 초기화
		/*$("body")
			.bind("mouseover",function(event){
				if(event.pageX != mouseX || mouseY != event.pageY){
					mouseX = event.pageX;
					mouseY = event.pageY;
					PhotoSlideController.fadeHelpBar();	
				}
		});*/
/*
		//헬프바 - 1장보기
		$("#SceneHelpbar > div ul li > div.key4")
			.bind("mouseover", function(event){
				$("#SceneHelpbar > div ul li > div.key4").addClass("focus4");
			})
			.bind("mouseout", function(event){
				$("#SceneHelpbar > div ul li > div.key4").removeClass("focus4");
			})
			.bind("click", function(event){
				_this.setItemCount();
		});
		
		//헬프바 - 재생 / 멈춤
		$("#SceneHelpbar > div ul li > div.key2")
			.bind("mouseover", function(event){
				$("#SceneHelpbar > div ul li > div.key2").addClass("focus2");
			})
			.bind("mouseout", function(event){
				$("#SceneHelpbar > div ul li > div.key2").removeClass("focus2");
			})
			.bind("click", function(event){
				_this.toggleSlide(PhotoSlideController);
		});
		//헬프바 - 나가기
		$("#SceneHelpbar > div ul li > div.key3")
			.bind("mouseover", function(event){
				$("#SceneHelpbar > div ul li > div.key3").addClass("focus3");
			})
			.bind("mouseout", function(event){
				$("#SceneHelpbar > div ul li > div.key3").removeClass("focus3");
			})
			.bind("click", function(event){
				_this.goToReferrer();
		});
		*/
	},

	methods : {
		//memory leak 문제로 추가 => 1장보기/ 2장보기 세팅값 리턴 (5/31 by sophia)		
		getItemCount : function() {
			var _comp = this;
			return _comp._get("itemCount");
		},
		
		//goToReferrer 
		//esc 키를 눌렀을 때의 동작
		goToReferrer : function(){
			//memory leak 문제로 수정(5/31 by sophia)
			//var referrer = document.referrer;
			var referrer = PhotoSlideController._get("pageReferrer");	

			if(referrer.indexOf("?") != -1 ){
				referrer = referrer.slice(0, referrer.indexOf("?"));
			}
			
			// 포토에서 온 경우
			//memory leak 문제로 수정(5/31 by sophia)
			//if(referrer.match("blog_photo_list.html")){
			if(referrer.match("blog_photo_list.html") || (PhotoListComponent.getParam('folderNo').length == 4 &&  PhotoListComponent.getParam('folderNo').substring(0, 1) == '0')){
				//referrer += "?themeId="+PhotoListComponent.getParam('themeId')+"&itemNo="+PhotoListComponent.getItemNo(PhotoSlideController._get('itemIndex'));
				referrer = "blog_photo_list.html?themeId="+PhotoListComponent.getParam('themeId')+"&itemNo="+PhotoListComponent.getItemNo(PhotoSlideController._get('itemIndex'));
				
			} else {
				// Gnb 세팅 오류로 추가(6/7 by sophia)
				if(skFn.user.isLoggedIn() && (PhotoListComponent.getParam('targetId') == skFn.user.getUserTid())){
					skFn.cookie.set('f', 'photo_list');
				} else if (skFn.cookie.get('f') != 'people_list'){
					skFn.cookie.set('f', 'pado_list');
				}
				
				referrer += "?targetId=" + PhotoListComponent.getParam('targetId')+"&folderNo="+PhotoListComponent.getParam('folderNo')+"&folderName="+encodeURIComponent(params.folderName)+"&itemNo="+PhotoListComponent.getItemNo(PhotoSlideController._get('itemIndex'));
			}

			window.location.href = referrer;
		},
		goToPhotoDetail : function(){
			//memory leak 문제로 수정(5/31 by sophia)
			//var referrer = document.referrer;
			var referrer = PhotoSlideController._get("pageReferrer");	
			if(referrer.indexOf("?") != -1 ){
				referrer = referrer.slice(0, referrer.indexOf("?"));
			}
			
			// 포토에서 온 경우
			//memory leak 문제로 수정(5/31 by sophia)
			//if(referrer.match("blog_photo_list.html")){
			if(referrer.match("blog_photo_list.html") || (PhotoListComponent.getParam('folderNo').length == 4 &&  PhotoListComponent.getParam('folderNo').substring(0, 1) == '0')){
				//param = referrer+"?themeId="+PhotoListComponent.getParam('themeId')+"&itemNo="+PhotoListComponent.getItemNo(PhotoSlideController._get('itemIndex'));
				param = "blog_photo_list.html?themeId="+PhotoListComponent.getParam('themeId')+"&itemNo="+PhotoListComponent.getItemNo(PhotoSlideController._get('itemIndex'));
				
			}else{
				param = "./photo_detail.html?targetId=" + PhotoListComponent.getParam('targetId')+"&folderNo="+PhotoListComponent.getParam('folderNo')+"&folderName="+encodeURIComponent(params.folderName)+"&itemNo="+PhotoListComponent.getItemNo(PhotoSlideController._get('itemIndex'));
			}
			window.location.href = param;
		},
		show : function(direction){
			skFn.debug.log('PhotoSlideControllerClass > show('+direction+') is called');
			var result;
			var _this = this;
			if(_this._get("itemTotalCount") == 1 || (_this._get("itemTotalCount") == 2 && _this._get("itemCount") == 2)){
				return false;
			}
			//락 
			LoadingComponent.lock(true);

			

			//현재 Page의 item을 받아온다.
			//세개 중 가운데 Item (photoList.item[1]) 만 사용한다

			var index =  _this._get('itemIndex');
			var photoList = PhotoListComponent.getCurrentItemList();
			var slideArray = photoList[1];
			
			//갱신할 페이지 넘버를 가지고 온다.
			var pageInfo = PhotoListComponent.getPageInfo();
			
			if(direction == "NEXT"){
				pageInfo = PhotoListComponent.getPageInfo();
				if(index == 1 || slideArray.item[index+1].title == null || _this._get('itemCount') == 2){
					_this._set({itemIndex : 0});
					//마지막 페이지 일때
					if (pageInfo.handler.lastPage == pageInfo.handler.cPage)
					{
						PhotoListComponent.retrieveListByPage(1, function(){
							if(PhotoListComponent.isPageExist('PREV') != 'NOT_EXIST'){
								PhotoListComponent.movePage("PREV", function(){
									_this.display(direction, _this);
								});
							}else{
								_this.display(direction, _this);
							}
						});	
					}
					else{
						PhotoListComponent.movePage(direction, function(){
							_this.display(direction, _this);
						});
					}
				}
				else{
					index++;
					_this._set({itemIndex:index});
					_this.display(direction, _this);
				}
			}
			else if (direction == "PREV")
			{
				pageInfo = PhotoListComponent.getPageInfo();

				if(index == 0 || slideArray.item[index-1].title == null || _this._get('itemCount') == 2){
					_this._set({itemIndex : 1});
					if(pageInfo.handler.cPage == 1){
						PhotoListComponent.retrieveListByPage(pageInfo.api.lastPage, function(){
							if(PhotoListComponent.isPageExist('NEXT') != 'NOT_EXIST'){
								PhotoListComponent.movePage("NEXT", function(){
									if(PhotoListComponent.isPageExist('NEXT') != 'NOT_EXIST'){
										PhotoListComponent.movePage("NEXT", function(){
											_this.display(direction, _this);
										});
									}
									else{
										_this.display(direction, _this);
									}
								});
							}
							else{
								_this.display(direction, _this);
							}
						});
					}else{
						pageInfo = PhotoListComponent.getPageInfo();
						PhotoListComponent.movePage(direction, function(){
							_this.display(direction, _this);
						});
					}
				}
				else{
					index--;
					_this._set({itemIndex:index});
					_this.display(direction, _this);
				}
			}
		},
		
		// 1장보기/2장보기 (sophia 4.28)
		changeSlideViewType : function(){
			var itemCount = (this._get("itemCount") == 1) ? 2 : 1;
			var _this = this;
			var arrMenuInfo = new Array();

			if(this._get("itemTotalCount") <= itemCount && this._get("isSlide") == true){
				this.toggleSlide(this);
			}
			
			// helpbar 상태 변경
			if(itemCount == 1){
				//$("#HelpSingle").css("display", "inline");
				//$("#HelpDouble").css("display", "none");
				
				HelpComponent.changeShow({menuid:'0', icon:'icon_help4',name:'2장보기', action:'zone.PhotoSlide.handleKeyDown(skTv.keymap.RED);'})
			}
			else if(itemCount == 2){
				//$("#HelpSingle").css("display", "none");
				//$("#HelpDouble").css("display", "inline");
				
				HelpComponent.changeShow({menuid:'0', icon:'icon_help4',name:'1장보기', action:'zone.PhotoSlide.handleKeyDown(skTv.keymap.RED);'})
			}
			
			this._set({itemCount : itemCount});
			//clearTimeout(this._get("helpTimeOutId"));
			clearTimeout(this._get("photoTimeOutId"));
			
			//PhotoSlideController.fadeHelpBar();
			HelpComponent.showWithfade();
			
			_this._set({itemIndex:0});
			this.display("INIT", this);
		},
		
		/*
		 setItemCount : function(){
			var itemCount = (this._get("itemCount") == 1) ? 2 : 1;
			if(this._get("itemTotalCount") <= itemCount && this._get("isSlide") == true){
				this.toggleSlide(this);
			}
			var _this = this;
			if(itemCount == 1){
				$("#HelpSingle").css("display", "inline");
				$("#HelpDouble").css("display", "none");
			}
			else if(itemCount == 2){
				$("#HelpSingle").css("display", "none");
				$("#HelpDouble").css("display", "inline");
			}
			this._set({itemCount : itemCount});
			clearTimeout(this._get("helpTimeOutId"));
			clearTimeout(this._get("photoTimeOutId"));
			PhotoSlideController.fadeHelpBar();
			_this._set({itemIndex:0});
			this.display("INIT", this);
		},
		*/

		/**
		*	Show 에서 ajaxCall 로 요청한 결과값으로 UI Handling 하는 콜백 함수
		*
		*	@param	{String}	direction
		*	@return false
		*/
		display : function(direction, _this){
			skFn.debug.log('PhotoSlideControllerClass > display('+direction+') is called');
			//오류 처리
			if(PhotoListComponent.error.code != 0){
				// locking 되어있으면 lock을 풀어준다. (6/2 by sophia)
				LoadingComponent.unlock();
				
				// 팝업을 띄운다
				PopupComponent.showTextPopup( // showErrorPopup
					PhotoListComponent.error.user_msg.title,
					PhotoListComponent.error.user_msg.contents, // userError[jsonData.code]
					// ENTER, RETURN(ESC) 누를때 실행할 콜백함수
					function(){
						window.history.back(); 
					}
				);
			}
			//정상응답
			else{
				var index =  _this._get('itemIndex');
				var pageInfo = PhotoListComponent.getPageInfo();

				_this._set({itemTotalCount : pageInfo.totalCount});
				
				//현재 Page의 item을 받아온다.
				//세개 중 가운데 Item (photoList.item[1]) 만 사용한다
				var photoList = PhotoListComponent.getCurrentItemList();
				var slideArray = photoList[1];
				

				var imgElement = (_this._get('itemCount') == 1) ? $("#ScenePhotoSlide img:first") : $("#ScenePhotoSlide img");
				var photoFadeMilisec;
				var count = 0;
				
				var imgMaxSize = 528;
				
				if(_this._get("isKeyInput") == true) { 
					photoFadeMilisec = _this._get('keyFadeMilisec');
				} else{
					photoFadeMilisec = _this._get('photoFadeMilisec');
				}
				$("#ScenePhotoSlide div.photo_view").css("display", "none");

				$("#ScenePhotoSlide img").removeAttr("width");
				$("#ScenePhotoSlide img").removeAttr("height");
				if (direction == "INIT")
				{

				}
				if(_this._get('itemCount') == 1){
					$("#ScenePhotoSlide img:eq(0)").css("display", "inline");
					$("#ScenePhotoSlide img:eq(1)").css("display", "none");
					if (direction == "PREV")
					{
						while(slideArray.item[index].itemSeq == null){
							index--;
						}
					}else if (direction == "NEXT")
					{
						while(slideArray.item[index].itemSeq == null){
							index++;
						}
					}
					
					// memory leak 문제로 thumbnail server를 사용하기로 함. (6/3 by sophia)
					//_this.resizeImg(960, 720, $("#ScenePhotoSlide img")[0], slideArray.item[index].photoVmUrl, function(){
					_this.resizeImg(960, 720, $("#ScenePhotoSlide img")[0], THUMB_IMG_URL_960X720 + slideArray.item[index].photoVmUrl, function(){
						_this.alignMiddle(function(){
							$("#ScenePhotoSlide div.photo_view").css("display", "block");
							LoadingComponent.unlock();
						});
					});
				}
				//두장보기
				else{
					index = 1;
					imgMaxSize -= 40;
					$("#ScenePhotoSlide img:first").attr("title", slideArray.item[0].title);
					// memory leak 문제로 thumbnail server를 사용하기로 함. (6/3 by sophia)
					//_this.resizeImg(480, 360, $("#ScenePhotoSlide img")[0], slideArray.item[0].photoVmUrl, function(){
					_this.resizeImg(480, 360, $("#ScenePhotoSlide img")[0], THUMB_IMG_URL_480X360 + slideArray.item[0].photoVmUrl, function(){
						if(!slideArray.item[1].itemSeq){
							$("#ScenePhotoSlide img:eq(0)").css("display", "inline");
							$("#ScenePhotoSlide img:eq(1)").css("display", "none");
								
						}else{
	//				alert("2"+$("#ScenePhotoSlide div.photo_view").css("visibility"));
							$("#ScenePhotoSlide img:eq(0)").css("display", "inline");
							$("#ScenePhotoSlide img:eq(1)").css("display", "inline");
						}
						_this.alignMiddle(function(){
							if(slideArray.item[1].itemSeq){
								$("#ScenePhotoSlide img:eq(1)").attr("title", slideArray.item[1].title);

								// memory leak 문제로 thumbnail server를 사용하기로 함. (6/3 by sophia)
								//_this.resizeImg(480, 360, $("#ScenePhotoSlide img")[1], slideArray.item[1].photoVmUrl, function(){
								_this.resizeImg(480, 360, $("#ScenePhotoSlide img")[1], THUMB_IMG_URL_480X360 + slideArray.item[1].photoVmUrl, function(){
									_this.alignMiddle(function(){
										$("#ScenePhotoSlide div.photo_view").css("display", "block");
										LoadingComponent.unlock();
									});
								});
							} else {
								$("#ScenePhotoSlide div.photo_view").css("display", "block");
								LoadingComponent.unlock();
							}

						});
					});
				}
				
				_this._set({itemIndex:index});
				_this._set({isKeyInput : false});
				//
				if(direction == "INIT" && _this._get("itemTotalCount") == 1 && this._get("isSlide") == true){
					_this.toggleSlide(_this);
				} 
				//슬라이드 재생이 설정되어 있다면 재생 실행
				if(_this._get("isSlide") == true){
					_this.autoSlide(_this);
				}
			}
			
		},
		resizeImg : function(width, height, obj, url, fnCallBack){
			obj.style.visibility = "hidden";
			obj.style.verticalAlign = "middle";
			if(obj.src == url){
				if(obj.width > obj.height) {
					obj.height = (width * obj.height)/obj.width;
					obj.width = width;
					if(obj.height > height){
						obj.width = (height * obj.width) / obj.height;
						obj.height = height;
					}
				} else if(obj.width < obj.height){
					obj.width = (height * obj.width) / obj.height;
					obj.height = height;
					if(obj.width > width){
						obj.height = (width * obj.height)/obj.width;
						obj.width = width;
					}
				} else{
					obj.width = height;
					obj.height = height;
				}
				obj.style.visibility = 'visible';
				if(typeof(fnCallBack) == 'function'){
					fnCallBack();
				}
			}
			else{
				obj.removeAttribute("width");
				obj.removeAttribute("height");
				
				obj.src = url;

				obj.onload = function(){
					obj.style.visibility = "hidden";
					if(obj.width > obj.height) {
						obj.height = (width * obj.height)/obj.width;
						obj.width = width;
						if(obj.height > height){
							obj.width = (height * obj.width) / obj.height;
							obj.height = height;
						}
					} else if(obj.width < obj.height){
						obj.width = (height * obj.width) / obj.height;
						obj.height = height;
						if(obj.width > width){
							obj.height = (width * obj.height)/obj.width;
							obj.width = width;
						}
					} else{
						obj.width = height;
						obj.height = height;
					}
					obj.style.visibility = 'visible';
					if(typeof(fnCallBack) == 'function'){
						fnCallBack();
					}
				};
				obj.onerror = function(){
//					$("#SceneHelpbar div.user_name").html(obj.src);
					obj.style.visibility = 'visible';
					if(typeof(fnCallBack) == 'function'){						
						fnCallBack();
					}
				};
			}
			
		},
		alignMiddle : function(fnCallBack){
			var bodyHeight = $("body").css('height');
			bodyHeight = Number(bodyHeight.replace("px", ""));
			
			var objHeight = $("#ScenePhotoSlide div.photo_view").css('height');
			objHeight = Number(objHeight.replace("px", ""));

			var top = ((bodyHeight - objHeight) / 2);
			
			$("#ScenePhotoSlide div.photo_view").css("marginTop", top+"px");
			if(fnCallBack){
				fnCallBack();
			}
			
		},
		/**
		*	Helpbar FadeIn 후 FadeOut 타이머를 설정하는 함수
		*
		*	@function
		*	@return false
		*/
		/*
		fadeHelpBar : function(){
			HelpComponent.showWithfade();

			//var milisec = this._get("helpBarFadeMilisec");
			/*$("#SceneHelpbar").fadeIn(milisec);
			$("#BtnPrev").fadeIn(milisec);
			$("#BtnNext").fadeIn(milisec);*/
			/*
			$("#SceneHelpbar").css("visibility", "visible");
			$("#BtnPrev").css("visibility", "visible");
			$("#BtnNext").css("visibility", "visible");
			

			var helpTimeOutId = this._get("helpTimeOutId");

			if(helpTimeOutId){
				clearTimeout(helpTimeOutId);
				this._set({helpTimeOutId : null});
			}

			helpTimeOutId = setTimeout(function(){
				/*$("#SceneHelpbar").fadeOut(milisec);
				$("#BtnPrev").fadeOut(milisec);
				$("#BtnNext").fadeOut(milisec);*/
			/*
				$("#SceneHelpbar").css("visibility", "hidden");
				$("#BtnPrev").css("visibility", "hidden");
				$("#BtnNext").css("visibility", "hidden");
				}, this._get("helpBarTimeOutMilisec"));

			this._set({helpTimeOutId : helpTimeOutId});

			return false;
			*/
		//},
		
		
		toggleSlide : function(_this, command){
			if(typeof(command) == "string"){
				if(command == "play"){
					/*
					$("#SceneHelpbar > div ul li > div.key2 img")[0].src = "../image/icon/icon_help7.png";
					$("#SceneHelpbar > div ul li > div.key2 img")[1].src = "../image/icon/icon_help7.png";
					$("#SceneHelpbar > div ul li > div.key2 > span").html("멈춤");
					 */
					if(skEnv.device.vendor == "lgcns") {
						HelpComponent.changeShow({menuid:'1', icon:'icon_help2',name:'멈춤', action:'PhotoSlideController.toggleSlide(PhotoSlideController);'});					
					}
					else {
						HelpComponent.changeShow({menuid:'1', icon:'icon_help7',name:'멈춤', action:'PhotoSlideController.toggleSlide(PhotoSlideController);'});					
					}

					if(_this._get('isSlide') == false){
						_this._set({isSlide : true});
						_this.show("NEXT", _this);
					}

				}else if (command == "stop"){
					/*
					$("#SceneHelpbar > div ul li > div.key2 > img")[0].src = "../image/icon/icon_help8.png";
					$("#SceneHelpbar > div ul li > div.key2 > img")[1].src = "../image/icon/icon_help8.png";
					$("#SceneHelpbar > div ul li > div.key2 > span").html("재생");
					*/
					if(skEnv.device.vendor == "lgcns") {
						HelpComponent.changeShow({menuid:'1', icon:'icon_help2',name:'재생', action:'PhotoSlideController.toggleSlide(PhotoSlideController);'});
					}
					else {
						HelpComponent.changeShow({menuid:'1', icon:'icon_help8',name:'재생', action:'PhotoSlideController.toggleSlide(PhotoSlideController);'});					
					}					

					if(_this._get('isSlide') == true){
						_this._set({isSlide : false});
						clearTimeout(_this._get("photoTimeOutId"));
					}
				}
			}
			else{
				if(_this._get("isSlide") == true){
					/*
					$("#SceneHelpbar > div ul li > div.key2 > img")[0].src = "../image/icon/icon_help8.png";
					$("#SceneHelpbar > div ul li > div.key2 > img")[1].src = "../image/icon/icon_help8.png";
					$("#SceneHelpbar > div ul li > div.key2 > span").html("재생");
					*/
					if(skEnv.device.vendor == "lgcns") {
						HelpComponent.changeShow({menuid:'1', icon:'icon_help2',name:'재생', action:'PhotoSlideController.toggleSlide(PhotoSlideController);'});
					}
					else {
						HelpComponent.changeShow({menuid:'1', icon:'icon_help8',name:'재생', action:'PhotoSlideController.toggleSlide(PhotoSlideController);'});						
					}

					_this._set({isSlide : false});
					clearTimeout(_this._get("photoTimeOutId"));
				}
				else{
					/*
					$("#SceneHelpbar > div ul li > div.key2 img")[0].src = "../image/icon/icon_help7.png";
					$("#SceneHelpbar > div ul li > div.key2 img")[1].src = "../image/icon/icon_help7.png";
					$("#SceneHelpbar > div ul li > div.key2 > span").html("멈춤");
					*/
					if(skEnv.device.vendor == "lgcns") {
						HelpComponent.changeShow({menuid:'1', icon:'icon_help2',name:'멈춤', action:'PhotoSlideController.toggleSlide(PhotoSlideController);'});						
					}
					else {
						HelpComponent.changeShow({menuid:'1', icon:'icon_help7',name:'멈춤', action:'PhotoSlideController.toggleSlide(PhotoSlideController);'});					
					}					


					_this._set({isSlide : true});
					_this.show("NEXT", _this);
				}
			}
		},
		/**
		*	Autoslide FadeOut 타이머를 설정하는 함수
		*
		*	@function
		*	@return false
		*/
		autoSlide : function(_this){

			var photoTimeOutId = _this._get("photoTimeOutId");
			if(photoTimeOutId){
				clearTimeout(photoTimeOutId);
				_this._set({photoTimeOutId : null});
			}
			photoTimeOutId = setTimeout(function(){
				_this.show("NEXT");}
				, _this._get("photoTimeOutMilisec")
			);
			_this._set({photoTimeOutId : photoTimeOutId })
			
			return false;
		}
	}
});
