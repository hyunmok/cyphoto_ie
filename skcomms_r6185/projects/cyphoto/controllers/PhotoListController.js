/**
 *
 * PhotoListController.js
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
					작성
				[2011-03-14 오후 4:14:30/ Park, Soonyoung]

					Try, catch 를 사용하여 예외 에러 처리 추가 
					appErrTitle 와 appErrContext 추가하여 문구 처리
				[2011년 10월 27일 목요일 오후 2:15:24 / Park, Soonyoung]
			
					탈퇴한 사용자 예외처리 RetrieveFolderList 를 사용하여 처리하도록 변경
				[2011년 10월 27일 목요일 오후 3:29:17 / Park, Soonyoung]
				
 * @_tutorial		
 * @_version		
 * @_abstract
 * @_final			
 * @_internal
 * 
 * @internal ************************* [ file info. end ] *********************************
 */


/**
 * PhotoList Controller
 */


var PhotoListControllerClass = defineClass({

	extend : BaseControllerClass,

	name : 'PhotoListControllerClass',


	/**
	 * 생성자 : 컨트롤러 인스턴스 초기화
	 */
	construct : function(targetId, folderNo, itemNo){
		
		// 상위클래스에 체이닝
		this.superclass();
		this._init([
			'appErrTitle',
			'appErrContext',
		    'itemNo',
			'itemIndex',
			'userName',
			'menuOpen',
			'isPhotoList',
			'isFolderList'
		]);
		_this = this;
		if(params.folderName){
			$("#FolderName").html(params.folderName);
			$("#FolderNameNone").html(params.folderName);
		}
		if(!itemNo) itemNo = 0;
		this._set({itemNo:itemNo, isPhotoList : true, isFolderList : true, appErrTitle : '일시적인 장애입니다.', appErrContext : "<p class=\"desc_type1\">일시적인 장애로 인하여 선택하신 화면으로 이동하지 못했습니다.<br />이용 중에 불편을 끼쳐드려 진심으로 죄송합니다.<br /><br />잠시 후에 다시 시도해주세요.<br />고맙습니다.</p>"});
		
		//포토 모델 인스턴스 생성
		this.model = new PhotoModelClass();
		
		//미니홈피 모델 인스턴스
		this.minihpInfoModel = new MinihpInfoModelClass();
			
			/**
		* To Do : 
		*	-	사용자 정보 받아오는 API 추가
		*	-	Target Id 요청
		**/
		//로그인 여부 체크 및 method 설정
		//로그인
		skFn.debug.log("skFn.user.isLoggedIn()="+skFn.user.isLoggedIn());
		if(skFn.user.isLoggedIn()){
			if(targetId == skFn.user.getUserTid() && skFn.user.isPrivacyOpen() == false){
				var method = this.model.retrieveListIsPrivacy;
			}
			else{
				var method = this.model.retrieveList;
			}
			//item perPage 갯수와 AJAX call을 처리할 "retrieveList" method 를 포함한 model 객체를 세팅
			//PhotoListComponent 는 초기화 되며 model 객체가 사용할 perPage 를 자동으로 설정해준다.
			PhotoListComponent.init(3, _this.model, method);
			PhotoListComponent.setFolderNo(folderNo);
			PhotoListComponent.setTargetId(targetId);

			//탈퇴한 회원인지 확인
			this.minihpInfoModel.isMenuOpen(targetId, function(data){
				_this.displayMemberQuit(data, function(){
					//사용자 정보 가져온다.
					_this.minihpInfoModel.getMinihpInfo(targetId, function(data){
						_this.displayUserName(data, function(){
							//메뉴 오픈여부 확인
							_this.minihpInfoModel.isMenuOpen(targetId, function(data){
								_this.displayMenuClosed(data, function(){

									//ItemNo에 따라 Ajax Call 하고 callback 함수를 실행한다.
									// @ param	{integer}	itemNo
									// @ param	{function}	fnCallBack
									PhotoListComponent.retrieveListByItemNo(_this._get("itemNo"), _this.display);
								});
							});
						});
					});
				});
			});
		
			
		
		} 
		//비로그인
		else {
			var method = this.model.retrieveListNoLogin;
			//item perPage 갯수와 AJAX call을 처리할 "retrieveList" method 를 포함한 model 객체를 세팅
			//PhotoListComponent 는 초기화 되며 model 객체가 사용할 perPage 를 자동으로 설정해준다.
			
			PhotoListComponent.init(3, _this.model, method);
			PhotoListComponent.setFolderNo(folderNo);
			PhotoListComponent.setTargetId(targetId);
			
			//탈퇴한 회원인지 확인
			this.minihpInfoModel.isMenuOpenNoLogin(targetId, function(data){
				_this.displayMemberQuit(data, function(){
					_this.minihpInfoModel.getMinihpInfoNoLogin(targetId, function(data){
						_this.displayUserName(data, function(){
							//메뉴 오픈여부 확인
							_this.minihpInfoModel.isMenuOpenNoLogin(targetId, function(data){
								_this.displayMenuClosed(data, function(){
									//ItemNo에 따라 Ajax Call 하고 callback 함수를 실행한다.
									// @ param	{integer}	itemNo
									// @ param	{function}	fnCallBack
									//락을 건다.
									LoadingComponent.lock(true);

									PhotoListComponent.retrieveListByItemNo(_this._get("itemNo"), _this.display);
								});
							});
						});
					});
				});
			});
		}

		//마우스 이벤트 헨들러 등록


		
	},

	/*
		detail 로 이동 할 때, 자체적 메소드로 빼고

	*/

	/**
	 * 인스턴스 메써드
	 */
	methods : {
		gotoPrev : function(){
			var prevUrl = GnbComponent.getSelectedGnbMenu();
				switch (prevUrl) {
					case 'myphoto' : 
						navigation.gotoAppManage();
						break;
						
					case 'pado' : 
						navigation.gotoPadoList();
						break;
						
					case 'people' : 
						navigation.gotoPeopleList();
						break;
						
					case 'photo' : 
						navigation.gotoBlogPhotoList();
						break;
						
					case 'setup' : 
						navigation.gotoSetup();
						break;
			}	
		},
		gotoPhotoDetail : function(targetId, folderNo, folderName, itemNo){
			// LG QA 이슈로 수정(사진 데이터가 없는 경우 상세보기로 이동하지 않도록 수정)(7.5 by sophia) 

			if(!skTv.zone.isShown("PhotoListNone")) {
				window.location.href = "photo_detail.html?targetId="+targetId+"&itemNo="+itemNo+"&folderNo="+folderNo+"&folderName="+folderName;
			}
		},
		displayMemberQuit : function(data, fnCallBack){
			//오류 처리
			if(data.code != 0){
				// 팝업을 띄운다
				PopupComponent.showTextPopup( // showErrorPopup
					data.user_msg.title,
					data.user_msg.contents, // userError[jsonData.code]
					// ENTER, RETURN(ESC) 누를때 실행할 콜백함수
					function(){
						var refUrl = document.referrer.substring(0, document.URL.indexOf('?'));
						var refUrl = refUrl.substring(refUrl.lastIndexOf('/')+1, refUrl.indexOf('.html')).toLowerCase();
						if(refUrl == 'index'){
							navigation.gotoLogin('gotoPhotoList');
						}else{
							window.history.back(); 
						}
					}
				);
			}
			//정상응답
			else{
				if(!data.body.Fault){
					fnCallBack();
				}else{
					// 탈퇴한 사용자의 경우
					//if(data.body.Fault.Reason == '탈퇴회원 홈피입니다'){
						$("#ScenePhotoListNone div.nav_folder").css("visibility", "hidden");
						$("#ScenePhotoListNone div.description").html("탈퇴한 사용자 입니다.");
						$("#ScenePhotoListNone div.box_img").removeClass("focus");
						$("#ScenePhotoListNone div.box_img").css("visibility", "hidden");
						this._set({isFolderList : false});

						skTv.zone.hide('PhotoList');
						skTv.zone.show('PhotoListNone');
						skTv.zone.focus('Gnb');
					/*}else{
						fnCallBack();
					}*/
				}
			}
		},
		displayUserName : function(data, fnCallBack){
			//오류 처리
			if(data.code != 0){
				// 팝업을 띄운다
				PopupComponent.showTextPopup( // showErrorPopup
					data.user_msg.title,
					data.user_msg.contents, // userError[jsonData.code]
					// ENTER, RETURN(ESC) 누를때 실행할 콜백함수
					function(){
						var refUrl = document.referrer.substring(0, document.URL.indexOf('?'));
						var refUrl = refUrl.substring(refUrl.lastIndexOf('/')+1, refUrl.indexOf('.html')).toLowerCase();
						if(refUrl == 'index'){
							navigation.gotoLogin('gotoPhotoList');
						}else{
							window.history.back(); 
						}
					}
				);
			}
			//정상응답
			else{
				try{
					//정상 사용자의 경우
					if(data.body.ArrayOfCyProfile.CyProfile.name){
						this._set({userName : data.body.ArrayOfCyProfile.CyProfile.name});
						$("#PhotoUserName").html(this._get("userName"));
						$("#PhotoUserNameNone").html(this._get("userName"));
						fnCallBack();
					}
				}catch(e){
					// 팝업을 띄운다
					PopupComponent.showTextPopup( // showErrorPopup
						this._get('appErrTitle'),
						this._get('appErrContext'), // userError[jsonData.code]
						// ENTER, RETURN(ESC) 누를때 실행할 콜백함수
						function(){
							var refUrl = document.referrer.substring(0, document.URL.indexOf('?'));
							var refUrl = refUrl.substring(refUrl.lastIndexOf('/')+1, refUrl.indexOf('.html')).toLowerCase();
							if(refUrl == 'index'){
								navigation.gotoLogin('gotoPhotoList');
							}else{
								window.history.back(); 
							}
						}
					);
				}
			}
				
		},
		//메뉴 닫힘 상태를 보여주는 function
		displayMenuClosed : function(data, fnCallBack){
			//오류 처리
			if(data.code != 0){
				// 팝업을 띄운다
				PopupComponent.showTextPopup( // showErrorPopup
					data.user_msg.title,
					data.user_msg.contents, // userError[jsonData.code]
					// ENTER, RETURN(ESC) 누를때 실행할 콜백함수
					function(){
						var refUrl = document.referrer.substring(0, document.URL.indexOf('?'));
						var refUrl = refUrl.substring(refUrl.lastIndexOf('/')+1, refUrl.indexOf('.html')).toLowerCase();
						if(refUrl == 'index'){
							navigation.gotoLogin('gotoPhotoList');
						}else{
							window.history.back(); 
						}
					}
				);
			}
			//정상응답
			else{
				try{
					this._set({menuOpen : data.body.result});
					if(data.body.result == 'close'){
						$("#ScenePhotoListNone div.nav_folder").css("visibility", "hidden");
						$("#ScenePhotoListNone div.description").html(this._get("userName")+" 님은 사진첩 메뉴를 사용하지 않습니다.");
						$("#ScenePhotoListNone div.box_img").removeClass("focus");
						$("#ScenePhotoListNone div.box_img").css("visibility", "hidden");
						this._set({isFolderList : false});
						skTv.zone.hide('PhotoList');
						skTv.zone.show('PhotoListNone');
						skTv.zone.focus('Gnb');
					}
					else if (data.body.result == 'open'){
						fnCallBack();
					}
					else{
					}
				}catch(e){
					// 팝업을 띄운다
					PopupComponent.showTextPopup( // showErrorPopup
						this._get('appErrTitle'),
						this._get('appErrContext'), // userError[jsonData.code]
						// ENTER, RETURN(ESC) 누를때 실행할 콜백함수
						function(){
							var refUrl = document.referrer.substring(0, document.URL.indexOf('?'));
							var refUrl = refUrl.substring(refUrl.lastIndexOf('/')+1, refUrl.indexOf('.html')).toLowerCase();
							if(refUrl == 'index'){
								navigation.gotoLogin('gotoPhotoList');
							}else{
								window.history.back(); 
							}
						}
					);
				}
			}
		},
		/**
		 *	Show
		 *	이전, 다음 direction 혹은 folderNo를 받아 알맞은 결과를 출력한다.
		 *
		 * @param {String} direction : PREV | NEXT | FOLDER 
		 * @param {int}		folderNo 
		 * @return return  true | false
		 */

		show : function (direction, folderNo){
			
			skFn.debug.log('PhotoListControllerClass > show() is called');
			var _this = this;
			// handleShow 일때 initialize
			if(direction){
				//folderNo 를 받아왔을 때,
				if(direction == "FOLDER"){
					//초기화
					_this.model._set({folderNo:folderNo});
					PhotoListComponent.init(3, _this.model);				
					//락을 건다.
					LoadingComponent.lock(true);
					//받아옴
					PhotoListComponent.retrieveListByItemNo(0, _this.display);

				}
				//direction 이 존재할 때
				else{
					if(PhotoListComponent.isPageExist(direction) != 'NOT_EXIST'){
						//락을 건다.
						LoadingComponent.lock(true);
					}
					//페이지 이동
					PhotoListComponent.movePage(direction, function(){
						_this.animate(direction, _this.display);
					});
				}
				return true;
			}
			return false;
		},

		
		/**
		 *	focus On
		 *	
		 *	@return void
		 */
		focusOn : function(param, focus){
			if(PhotoListController._get("isPhotoList") == false){
				skTv.zone.focus('PhotoListNone');
			}else{
				var liNum;
				if(!param || param == null){
					if (!focus){
						focus = 0;
					}
					var focusNum = focus+3;
					skTv.zone.focus('PhotoList');
					$('#ul_photo li').removeClass("focus");
					$('#ul_photo li:eq('+focusNum+')').addClass("focus");
					
				}
				else if (typeof(param) == "object")
				{
					skTv.zone.focus('PhotoList');
					$('#ul_photo li').removeClass("focus");
					$(param).addClass("focus");
				}
				else{
					focus = this._get('itemIndex');
					for(var i = 0 ; i < 3; i++){
						liNum = i + 3;
						if ($('#ul_photo li:eq('+liNum+')').attr('class') == 'focus' || $('#ul_photo li:eq('+liNum+')').attr('class') == 'second focus'){
							if( (liNum == 3 && param == 'PREV') || (liNum ==5 && param == 'NEXT')){
								if(PhotoListComponent.isPageExist(param) != 'NOT_EXIST'){
									var focusIdx = liNum;
									if(liNum == 3) {
										--focusIdx;
										focus = 2;
									}
									else {
										++focusIdx;
										focus = 0;
									}
									
									this.show(param);								
								}
							}
							else{
								
								if(param == 'NEXT'){
									if($("ul.album_list > li:eq("+(++liNum)+")").css("visibility") == "visible"){
										$('#ul_photo li:eq('+(--liNum)+')').removeClass("focus");		
										$('#ul_photo li:eq('+(++liNum)+')').addClass("focus");
										focus++;
									}
								} else if (param =='PREV')	{
									if($("ul.album_list > li:eq("+(--liNum)+")").css("visibility") == "visible"){
										$('#ul_photo li:eq('+(++liNum)+')').removeClass("focus");		
										$('#ul_photo li:eq('+(--liNum)+')').addClass("focus");
										focus--;
									}
								}
								
							}
							break;
						}
					}
				}
				this._set({itemIndex : focus});
			}
			return false;
			
		},


		/**
		 * focus Off
		 * @return void
		 */
		focusOff : function(){
			this._set({itemIndex : 0});
			$("#BtnPrev").attr("class", "list_prev list_prev_off");
			$("#BtnNext").attr("class", "list_next list_next_off");
			$('#ul_photo li').removeClass("focus");			
		},
		noneFocusOn : function(){
			if(this._get("menuOpen") == 'close' || PhotoListComponent.getParam('folderNo') == 0 || PhotoListComponent.getParam('folderNo') == ''){
				skTv.zone.focus('Gnb');
			}
			else if($("#ScenePhotoListNone div.box_img").css("visibility") != "hidden"){
				$("#ScenePhotoListNone div.box_img").addClass("focus");
			}
		},
		noneFocusOff : function(){
			if($("#ScenePhotoListNone div.box_img").css("visibility") != "hidden"){
				$("#ScenePhotoListNone div.box_img").removeClass("focus");
			}
		},
		/**
		*	Show 에서 ajaxCall 로 요청한 결과값으로 UI Handling 하는 콜백 함수
		*
		*	@param	{String}	direction
		*	@return false
		*/
		display : function(direction){
			skFn.debug.log('PhotoListControllerClass > display() is called');

			//오류 처리
			if(PhotoListComponent.error.code != 0){
				// 팝업을 띄운다
				PopupComponent.showTextPopup( // showErrorPopup
					PhotoListComponent.error.user_msg.title,
					PhotoListComponent.error.user_msg.contents, // userError[jsonData.code]
					// ENTER, RETURN(ESC) 누를때 실행할 콜백함수
					function(){
						var refUrl = document.referrer.substring(0, document.URL.indexOf('?'));
						var refUrl = refUrl.substring(refUrl.lastIndexOf('/')+1, refUrl.indexOf('.html')).toLowerCase();
						if(refUrl == 'index'){
							navigation.gotoLogin('gotoPhotoList');
						}else{
							window.history.back(); 
						}
					}
				);
			}
			//정상응답
			else{
				try{
					//갱신할 페이지 넘버를 가지고 온다.
					var pageInfo = PhotoListComponent.getPageInfo();

					//현재 Page의 item을 받아온다.
					var photoList = PhotoListComponent.getCurrentItemList();
					
					
					if(photoList == false){
						//사진이 아예 없는 경우
						if(PhotoListComponent.getParam('folderNo') == 0 || PhotoListComponent.getParam('folderNo') == ''){
							$("#ScenePhotoListNone div.nav_folder").css("visibility", "visible");
							$("#ScenePhotoListNone div.description").html("등록된 사진이 없습니다.");
							$("#ScenePhotoListNone div.box_img").removeClass("focus");
							$("#ScenePhotoListNone div.box_img").css("display", "none");
							PhotoListController._set({isFolderList : false});
							skTv.zone.hide('PhotoList');
							skTv.zone.show('PhotoListNone');
							skTv.zone.focus('Gnb');
						}
						//폴더에 사진이 아예 없는 경우
						else{
							$("#ScenePhotoListNone div.nav_folder").css("visibility", "visible");
							$("#ScenePhotoListNone div.description").html("등록된 사진이 없습니다.");
							PhotoListController._set({isFolderList : true});
							skTv.zone.hide('PhotoList');
							skTv.zone.show('PhotoListNone');
							skTv.zone.focus('PhotoListNone');
						}
					}
					//있다면
					else{
						skTv.zone.hide('PhotoListNone');
						skTv.zone.show('PhotoList');
						skTv.zone.focus('PhotoList');
						var k = 0;
						$("#ScenePhotoList div.text_sum").attr("style", "visibility:visible");


						var infoList = $("#ul_photo div.info");	//인포 Element list cache

						var imgElementList = $("#ul_photo img");	//img Element list cache
						var imgElement = null;	// img element cache
						var liElementList = $("#ul_photo li");	//img Element list cache
						var liElement = null;	// li element cache
						for(var i = 0; i < 3; i++){
							for(var j = 0; j < PhotoListComponent.perPage; j++){
								//새로 생성한 <li>를 update 한다.
								if((direction == 'NEXT' && i == 2) || (direction == 'PREV' && i == 0) || !direction || parseInt(direction)){

									liElement = liElementList.eq(k);	//cache 저장
									imgElement = imgElementList.eq(k); //cache 저장
									
									if(photoList[i].item[j].itemSeq == null){
										liElement.css("visibility", "hidden");
										liElement.children().next().css('display', 'none');
										imgElement.css("display", "none");
									}
									else{
										//imgElementList[k].src = THUMB_IMG_URL_310X300+photoList[i].item[j].photoVmUrl;
										PhotoListComponent.resizeImg(310, 300, imgElementList[k], THUMB_IMG_URL_310X300+photoList[i].item[j].photoVmUrl);
										liElement.children().next().css('display', 'block');
										liElement.css("visibility", "visible");
										imgElement.css("display", "inline");
										imgElement.css("visibility", "visible");
										skFn.dom.setHtml(infoList.eq(k).children().children()[0], photoList[i].item[j].title);		//title
										skFn.dom.setHtml(infoList.eq(k).children().children().next()[0], photoList[i].item[j].writeDate);	//date
										
										//댓글이 1999 넘어갔을 때의 처리
										if(photoList[i].item[j].replyCount > 1999){
											infoList.eq(k).children().next().attr("class", "num1");
											skFn.dom.setHtml(infoList.eq(k).children().next()[0], '<strong>'+1999+'</strong>');
										}else{
											infoList.eq(k).children().next().attr("class", "num");
											skFn.dom.setHtml(infoList.eq(k).children().next()[0], '<strong>'+photoList[i].item[j].replyCount+'</strong>');												
										}
									}
								}
								k++;
							}
						}
						/*
						
						for(var i = 0; i < 3; i++){
							for(var j = 0; j < PhotoListComponent.perPage; j++){
								//새로 생성한 <li>를 update 한다.
								
								if((direction == 'NEXT' && i == 2) || (direction == 'PREV' && i == 0) || !direction || parseInt(direction)){
									if(photoList[i].item[j].itemSeq == null){
										$("ul.album_list > li:eq("+k+")").css("visibility", "hidden");
										$("ul.album_list > li:eq("+k+") img").css("display", "none");
									}
									else{
										$("ul.album_list > li:eq("+k+")").css("visibility", "visible");
										$("ul.album_list > li:eq("+k+") img").css("display", "inline");
										PhotoListComponent.resizeImg(310, 300,$("ul.album_list > li img")[k], THUMB_IMG_URL_310X300+photoList[i].item[j].photoVmUrl);
										$("ul.album_list > li div.title:eq("+k+")").html(photoList[i].item[j].title);
										$("ul.album_list > li div.date:eq("+k+")").html(photoList[i].item[j].writeDate);
										//댓글이 1999 넘어갔을 때의 처리
										if(photoList[i].item[j].replyCount > 1999){
											$("ul.album_list > li:eq("+k+") div.info > div:eq(1)").attr("class", "num1");
											$("ul.album_list > li:eq("+k+") div.info > div:eq(1)").html('1999');
										}else{
											$("ul.album_list > li:eq("+k+") div.info > div:eq(1)").attr("class", "num");
											$("ul.album_list > li:eq("+k+") div.info > div:eq(1)").html(photoList[i].item[j].replyCount);
										}
									}
								}
								k++;
							}
						}
						*/
						//오류 이미지 처리
						$("ul.album_list > li img").bind('error', function(event){
							this.src = '../image/img/img_photo_list_none.jpg';
						});

						//페이지 번호 및 총 사진 개수 갱신

						$("#PageNum").html(pageInfo.handler.cPage+'/'+pageInfo.handler.lastPage);
						$("#TotalCount").html("(총"+pageInfo.totalCount+"장)");
						//Focus 재배치
						if(direction == "NEXT"){
							if(skTv.zone.getCurZone() == 'PhotoList'){
								skTv.zone.hide('PhotoListNone');
								skTv.zone.show('PhotoList');
								skTv.zone.focus('PhotoList');
								$('#ul_photo li').removeClass("focus");
								$('#ul_photo li:eq(3)').addClass("focus");
							}						
							PhotoListController._set({itemIndex : 0});
						}
						else if (direction == "PREV")
						{
							if(skTv.zone.getCurZone() == 'PhotoList'){
								skTv.zone.hide('PhotoListNone');
								skTv.zone.show('PhotoList');
								skTv.zone.focus('PhotoList');
								$('#ul_photo li').removeClass("focus");
								$('#ul_photo li:eq(5)').addClass("focus");
							}					
							PhotoListController._set({itemIndex : 2});
						}else if(skTv.zone.getCurZone() == 'PhotoListNone'){
							skTv.zone.hide('PhotoListNone');
							skTv.zone.show('PhotoList');
							skTv.zone.focus('PhotoList');
							$('#ul_photo li').removeClass("focus");
							$('#ul_photo li:eq(3)').addClass("focus");
							PhotoListController._set({itemIndex : 0});
						}
					}
				}catch(e){
					// 팝업을 띄운다
					PopupComponent.showTextPopup( // showErrorPopup
						this._get('appErrTitle'),
						this._get('appErrContext'), // userError[jsonData.code]
						// ENTER, RETURN(ESC) 누를때 실행할 콜백함수
						function(){
							var refUrl = document.referrer.substring(0, document.URL.indexOf('?'));
							var refUrl = refUrl.substring(refUrl.lastIndexOf('/')+1, refUrl.indexOf('.html')).toLowerCase();
							if(refUrl == 'index'){
								navigation.gotoLogin('gotoPhotoList');
							}else{
								window.history.back(); 
							}
						}
					);
				}
			}
			if(direction != 'NEXT' && direction != 'PREV'){
				LoadingComponent.unlock();
				$("#ScenePhotoList").css("visibility","visible");
				$("#ScenePhotoList").css("display","block");
			}

			return false;
		},
		hidePhotoList : function(){
			$("#ScenePhotoList div.text_sum").attr("style", "visibility:hidden");
			$("#ScenePhotoList li").attr("style", "visibility:hidden");
			$("#ScenePhotoList img").attr("style", "visibility:hidden");
		},
		/**
		*	Animation 동작 함수.
		*
		*	@param	{String}	direction
		*	@param	{String}	function callback
		*	@return false
		*/
		animate : function(direction, fnCallBack) {
			skFn.debug.log('PhotoListControllerClass > animate() is called');
			var count = 0;
			var LI_html =	'<li>';
				LI_html +=	'	<div class="box">';
				LI_html +=	'		<table cellpadding="0" cellspacing="0">';
				LI_html +=	'			<tr>';
				LI_html +=	'				<td valign="middle" height="300">';
				LI_html +=	'					<img />';
				LI_html +=	'				</td>';
				LI_html +=	'			</tr>';
				LI_html +=	'		</table>';
				LI_html +=	'	</div>';
				LI_html +=	'	<div class="info">';
				LI_html +=	'		<div class="text">';
				LI_html +=	'			<div class="title"></div>';
				LI_html +=	'			<div class="date"></div>';
				LI_html +=	'		</div>';
				LI_html +=	'		<div class=""><strong></strong></div>';
				LI_html +=	'	</div>';
				LI_html +=	'</li>';
				LI_html +=	'<li class="second">';
				LI_html +=	'		<div class="box">';
				LI_html +=	'			<table cellpadding="0" cellspacing="0">';
				LI_html +=	'				<tr>';
				LI_html +=	'					<td valign="middle" height="300">';
				LI_html +=	'						<img />';
				LI_html +=	'					</td>';
				LI_html +=	'				</tr>';
				LI_html +=	'			</table>';
				LI_html +=	'		</div>';
				LI_html +=	'		<div class="info">';
				LI_html +=	'			<div class="text">';
				LI_html +=	'				<div class="title"></div>';
				LI_html +=	'				<div class="date"></div>';
				LI_html +=	'			</div>';
				LI_html +=	'			<div class=""><strong></strong></div>';
				LI_html +=	'		</div>';
				LI_html +=	'</li>';
				LI_html +=	'<li>';
				LI_html +=	'		<div class="box">';
				LI_html +=	'			<table cellpadding="0" cellspacing="0">';
				LI_html +=	'				<tr>';
				LI_html +=	'					<td valign="middle" height="300">';
				LI_html +=	'						<img />';
				LI_html +=	'					</td>';
				LI_html +=	'				</tr>';
				LI_html +=	'			</table>';
				LI_html +=	'		</div>';
				LI_html +=	'		<div class="info">';
				LI_html +=	'			<div class="text">';
				LI_html +=	'				<div class="title"></div>';
				LI_html +=	'				<div class="date"></div>';
				LI_html +=	'			</div>';
				LI_html +=	'			<div class=""><strong></strong></div>';
				LI_html +=	'		</div>';
				LI_html +=	'</li>';
			var count = 0;
			$('#ul_photo').css('position', 'relative');
			if (direction == 'NEXT'){
				$('#ul_photo').animate({left:-1130}, 600, 'swing', function(){
					count++;
					if (count == $('#ul_photo').length)
					{
						$('#ul_photo li:lt(3)').remove();
						$('#ul_photo li:last').after(LI_html);
						fnCallBack(direction);
						$('#ul_photo').css('left', '0px');
						LoadingComponent.unlock();
					}
				});				
			} else if(direction == 'PREV'){
				
				$('#ul_photo').animate({left:1130}, 600, 'swing', function(){					
					count++;
					if (count == $('#ul_photo').length)
					{
						$('#ul_photo li:gt(5)').remove();
						$('#ul_photo li:first').before(LI_html);
						fnCallBack(direction);
						$('#ul_photo').css('left', '0px');
						LoadingComponent.unlock();
					}
				});
			}

			/*if (direction == 'NEXT'){
				$('#ul_photo li:lt(3)').remove();
				$('#ul_photo li:last').after(LI_html);
				$('#ul_photo li').css('left', '0px');

				fnCallBack(direction);
				if(skEnv.device.vendor == "lgcns") {
					$('#ul_photo li').animate({left:-1130}, 0, 'linear', function(){
						count++;
						if (count == $('#ul_photo li').length)
						{
							for(var i = 0 ; i < 9 ; i++){
								//락 해제
								LoadingComponent.unlock();
								PhotoListComponent.resizeImg(310, 300, $("ul.album_list > li img")[i]);
							}
						}
					});
				}
				else {
					$('#ul_photo li').animate({left:-1130}, 600, 'swing', function(){
						count++;
						if (count == $('#ul_photo li').length)
						{
							for(var i = 0 ; i < 9 ; i++){
								//락 해제
								LoadingComponent.unlock();
								PhotoListComponent.resizeImg(310, 300, $("ul.album_list > li img")[i]);
							}
						}
					});				
				}
			} else if(direction == 'PREV'){
				$('#ul_photo li:gt(5)').remove();
				$('#ul_photo li:first').before(LI_html);
				$('#ul_photo li').css('left', '-2260px');
			
				fnCallBack(direction);
				if(skEnv.device.vendor == "lgcns") {
					$('#ul_photo li').animate({left:-1130}, 0, 'linear', function(){
						count++;
						if (count == $('#ul_photo li').length)
						{
							for(var i = 0 ; i < 9 ; i++){
								//락 해제
								LoadingComponent.unlock();
								PhotoListComponent.resizeImg(310, 300, $("ul.album_list > li img")[i]);
							}
						}
					});
				}
				else {
					$('#ul_photo li').animate({left:-1130}, 600, 'swing', function(){					
						count++;
						if (count == $('#ul_photo li').length)
						{
							for(var i = 0 ; i < 9 ; i++){
								//락 해제
								LoadingComponent.unlock();
								PhotoListComponent.resizeImg(310, 300, $("ul.album_list > li img")[i]);
							}
						}
					});
				}
			}*/
		},
		getFolderNo : function(){
			return this.model._get('folderNo');
		}
	}
});