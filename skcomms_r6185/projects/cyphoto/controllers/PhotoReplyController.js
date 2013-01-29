/**
 *
 * PhotoReplyController.js
 *
 * 
 *
 * @internal ************************* [ file info. start ] *********************************
 *
 * @category		
 * @package		
 * @author		shim, heung woon <lumiel@skcomms.co.kr>
 * @filesource

 * @_uses		
 * @_todo		
				
 * @_history

				[2011-02-21 ���� 3:56:02 / shim]

				
				
 * @_tutorial		
 * @_version		
 * @_abstract
 * @_final			
 * @_internal
 * 
 * @internal ************************* [ file info. end ] *********************************
 */



/**
 * PhotoReply Controller
 */
var PhotoReplyControllerClass = defineClass({

	extend : BaseControllerClass,

	name : 'PhotoReplyControllerClass',

	/**
	 * ���� : ��Ʈ�ѷ� �ν��Ͻ� �ʱ�ȭ
	 */
	construct : function(){

		// ����Ŭ������ ü�̴�
		this.superclass();

		// �� �ν��Ͻ� ��
		this.model = new PhotoReplyModelClass();

		// �� ���� ����
		//this.model._set({targetId:'64551401'});
		
		//this.model._set({targetId:targetTid, perPage:photoReplyRerPage});
		//this.model._set({targetId:'64551401', cPage:'1', perPage:'40'});

		
		// 스크롤 컴포넌트 인스턴스 생성
		this.ScrollComponent = new ScrollComponentClass();
		

		this._init([
		    'loginTid',																// 로그인한 Tid
		    'targetTid',															// 사진첩 Target Tid
		    'photoItemSeq',															// 사진첩 ItemSeq
		    
			'photoReplyTotalPage',													// 사진첩 댓글 총 페이지수
			'photoReplyCurPage',													// 사진첩 댓글 현재 페이지
			'photoReplyTotalCount',													// 사진첩 댓글 개수

			'arrPhotoReplyDataList',
			'photoReplyDisplayPerPage',
			'replyMoveIndex',
			'replyApiDataIdx'
		]);
		
		this._set({loginTid:'', photoReplyTotalPage:0, photoReplyCurPage:1, photoReplyTotalCount:-1});

		this._set({arrPhotoReplyDataList:[], photoReplyDisplayPerPage:4, replyMoveIndex:0});
		this.model._set({loginId:'', targetId:'', cPage:'1', perPage:'40'});
		
		if(skFn.user.isLoggedIn() == true) {
			var _ctl_loginTid = skFn.user.getUserTid();
			this._set({loginTid:_ctl_loginTid});
		}
		
	},

	/**
	 * �ν��Ͻ� �޽��
	 */
	
	methods : {
		setParams : function(name, value){
			var _ctl = this;

			switch(name) {
				case "photoItemSeq" : 
					_ctl._set({"photoItemSeq":value});
					break;
					
				case "targetTid" : 
					_ctl._set({"targetTid":value});
					break;
				/*	
				case "loginTid" : 
					_ctl._set({"loginTid":value});
					break;
				*/
				case "replyMoveIndex" : 
					_ctl._set({"replyMoveIndex":value});
					break;
					
			}
		},
		/*
		 * 댓글 삭제
		 */
		deleteReply : function() {
			var _ctl = this;
			var _ctl_replySeq	=	skFn.array.isArray(_ctl.arrPhotoReplyDataList) ?
					_ctl.arrPhotoReplyDataList[_ctl.replyApiDataIdx+_ctl.replyMoveIndex].replySeq : _ctl.arrPhotoReplyDataList.replySeq;
			
			// 삭제하려는 다음 댓글의 부모댓글 Seq 
			var _ctl_nextParentReplySeq	=	"";
			
			if(skFn.array.isArray(_ctl.arrPhotoReplyDataList)) {
				if(parseInt(_ctl.replyApiDataIdx+_ctl.replyMoveIndex)+1 < _ctl.arrPhotoReplyDataList.length) {
					_ctl_nextParentReplySeq = _ctl.arrPhotoReplyDataList[_ctl.replyApiDataIdx+_ctl.replyMoveIndex+1].parentReplySeq;
				}
			}

			this.model.remove(_ctl_replySeq, 
								function(jsonData) {
									if(jsonData.code == "0"){
										if(jsonData.body.result == "1") {
											skTv.zone.hide('ReplyNameUI');
											skTv.zone.focus('ReplyList');
											_ctl.showPage("delete")
										} else {
											// 댓글의 댓글을 먼저 삭제해주세요. 처리
											PopupComponent.showTextPopup( // showErrorPopup
													'알림',
													'댓글의 댓글을 먼저 삭제해주세요.', // userError[jsonData.code]
													// ENTER, RETURN(ESC) 누를때 실행할 콜백함수
													function(){
														skTv.zone.hide('ReplyNameUI');
														skTv.zone.focus('ReplyList');
													}
												);
										}
										
									} else {
										// 자식 댓글이 있는 댓글을 삭제하는 경우는 무조건 아래 팝업을 띄워준다.(API 리턴값으로 확인 불가함.)
										if(_ctl_replySeq == _ctl_nextParentReplySeq) {
											// 댓글의 댓글을 먼저 삭제해주세요. 처리
											PopupComponent.showTextPopup( // showErrorPopup
													'알림',
													'댓글의 댓글을 먼저 삭제해주세요.', // userError[jsonData.code]
													// ENTER, RETURN(ESC) 누를때 실행할 콜백함수
													function(){
														skTv.zone.hide('ReplyNameUI');
														skTv.zone.focus('ReplyList');
													}
												);
											
										} else {
											// 에러 팝업을 띄운다
											PopupComponent.showTextPopup( // showErrorPopup
												jsonData.user_msg.title,
												jsonData.user_msg.contents, // userError[jsonData.code]
												function(){
													skTv.zone.hide('ReplyNameUI');
													skTv.zone.focus('ReplyList');
												}
											);
										}
									}
								}
			);
		},
		
		/*
		 * 댓글 쓰기 팝업 노출
		 */
		show_ReplyWritepopup : function(parentReplySeq){
			var _ctl 							= 	this;
			var _ctl_model  					= 	this.model;
			var model_cPage 					= 	this.model._get('cPage');
			var model_perPage					=	this.model._get('perPage');
			var ctl_photoReplyDisplayPerPage	=	_ctl._get('photoReplyDisplayPerPage')
			var _curZone						=	skTv.zone.getCurZone();
			
			if(skFn.user.isLoggedIn() == false) {
				// Input 팝업 컴포넌트 호출
				PopupComponent.showTextPopup(
						'알림',											// title
						'댓글작성은 로그인 후 이용하실 수 있습니다.',				// contents
						function() {									// Callback
							skTv.zone.focus(_curZone);
						}
				);
			} else {
				// Input 팝업 컴포넌트 호출
				PopupComponent.showInputPopup(
						'댓글 작성',										// title
						'댓글을 남겨주세요.',								// contents
						'txtReplyContents',								// inputName
						'text',											// input type
						'korean',										// 처음 보여줄 언어
						function() {									// Enter Callback
							if($("#txtReplyContents").val() == "") {
								PopupComponent.setInputPopupInfo("댓글 내용을 입력해주세요.");
								PopupComponent.setInputFocus();
								return;
								
							} else {
								_ctl.writeReply(parentReplySeq, $("#txtReplyContents").val(), function(){
									
									// TotalCount를 1로 세팅
									if(parentReplySeq == "") {
										_ctl._set({photoReplyTotalCount:1});
									}
									
									skTv.zone.hide('InputPopup');
									if(skTv.zone.isShown('ReplyNameUI')) {
										skTv.zone.hide('ReplyNameUI');
									}
									
									skTv.zone.focus('ReplyList');
								});
							}
						},
						function() {									// Close Callback
							skTv.zone.hide('InputPopup');
							skTv.zone.focus(_curZone);
						},
						'300'											// Max Length
				);
			}
		},
		
		/*
		 * 댓글 쓰기
		 */
		writeReply : function(parentReplySeq, inputContents, commitCallback){
			var _ctl 							= 	this;
			var _ctl_model  					= 	this.model;
			var model_cPage 					= 	this.model._get('cPage');
			var model_perPage					=	this.model._get('perPage');
			var ctl_photoReplyDisplayPerPage	=	_ctl._get('photoReplyDisplayPerPage');
			var _ctl_photoReplyCurPage			=	parseInt(_ctl._get('photoReplyCurPage'));
			var _ctl_photoReplyTotalCount		=	parseInt(_ctl._get('photoReplyTotalCount'));
			
			var _curZone						=	skTv.zone.getCurZone();
			var _ctl_photoReplyTotalPage;
			
			
			this.model.write(parentReplySeq, 
							inputContents, 
							function(jsonData){
								// 정상
								if(jsonData.code == 0){
									if(jsonData.body.result == "0") {
										PopupComponent.setInputPopupInfo("같은 내용의 댓글은 입력할 수 없습니다.");
										PopupComponent.setInputFocus();
										
									} else {
										if(parentReplySeq == "") {				// 댓글쓰기
											commitCallback();
											
											// 마지막 페이지를 계산해서 API에서 데이터를 가져와 Viewing한다.
											_ctl_photoReplyTotalPage = Math.ceil((parseInt(_ctl_photoReplyTotalCount)+1) / parseInt(ctl_photoReplyDisplayPerPage));
											_ctl._set({photoReplyTotalPage : _ctl_photoReplyTotalPage, photoReplyCurPage : _ctl_photoReplyTotalPage});
											
											ctl_model_Page = Math.ceil((parseInt(_ctl_photoReplyTotalCount)+1) / model_perPage);
											_ctl_model._set({cPage:ctl_model_Page});
											_ctl.getReplyList('writeReply');
											
										} else {								// 댓댓글쓰기
											commitCallback();
											skTv.zone.hide('ReplyNameUI');
											_ctl.getReplyList('writeReReply');
										}
									}
								} else {
									skTv.zone.hide('InputPopup');

									// 에러 팝업을 띄운다
									PopupComponent.showTextPopup( // showErrorPopup
										jsonData.user_msg.title,
										jsonData.user_msg.contents, // userError[jsonData.code]
										function(){
											if(parentReplySeq != "") {
												skTv.zone.focus('ReplyNameUI');
											} else {
												skTv.zone.focus('ReplyList');
											}
										}
									);
								}
							}
			);
		}, 
		
		/*
		 * 배열의 댓글 데이터를 display해줌 
		 */
		displayReplyData : function (action) {
			var _ctl = this;
			var _data_replySeq, _data_parentReplySeq, _data_img, _data_writerName, _data_writeDate, _data_content, _data_content_s;
			var strReplyData, apiIdx;
			var ctl_arrPhotoReplyDataList 		= 	_ctl._get("arrPhotoReplyDataList");
			var ctl_photoReplyDisplayPerPage	=	_ctl._get('photoReplyDisplayPerPage')
			var _ctl_photoReplyTotalPage			=	parseInt(_ctl._get('photoReplyTotalPage'));
			var _ctl_photoReplyCurPage			=	parseInt(_ctl._get('photoReplyCurPage'));
			var _ctl_photoReplyTotalCount		=	parseInt(_ctl._get('photoReplyTotalCount'));
			var model_cPage 					= 	this.model._get('cPage');
			var model_perPage					=	this.model._get('perPage');

			if(_ctl_photoReplyTotalCount == 0) {
				$(".list_comment").children().each(function() {
					$(this).remove();
				});
				
				LoadingComponent.unlock();
				skTv.zone.hide('ReplyList');
				skTv.zone.show('ReplyListNone');
				skTv.zone.focus('PhotoDesc');
				return;

			} else {
				// 처음 글을 등록한다면 글등록 Zone을 View한 후 focusing한다.
				if(skTv.zone.isShown('ReplyListNone')) {
					// Page Lockking
					LoadingComponent.lock(true);

					skTv.zone.hide('ReplyListNone');
					skTv.zone.show('ReplyList');
				}
			}
			

			$(".list_comment").children().each(function() {
				$(this).remove();
			});


			//if(_ctl_photoReplyTotalPage == ctl_photoReplyTotalPage && (_ctl_photoReplyTotalPage-1)*ctl_photoReplyDisplayPerPage < model_perPage) {
			if(_ctl_photoReplyCurPage == _ctl_photoReplyTotalPage && (_ctl_photoReplyCurPage-1)*ctl_photoReplyDisplayPerPage < model_perPage) {
				apiIdx = (_ctl_photoReplyCurPage-1)*ctl_photoReplyDisplayPerPage;
			} else {
				if((_ctl_photoReplyCurPage-1)*ctl_photoReplyDisplayPerPage < (model_cPage-1) * model_perPage) {
					apiIdx = (_ctl_photoReplyCurPage-1)*ctl_photoReplyDisplayPerPage;
				} else {
					if((_ctl_photoReplyCurPage-1)*ctl_photoReplyDisplayPerPage < model_perPage) {
						apiIdx = (_ctl_photoReplyCurPage-1)*ctl_photoReplyDisplayPerPage;
					} else {
						if((_ctl_photoReplyCurPage-1)*ctl_photoReplyDisplayPerPage % model_perPage == 0) {
							apiIdx = 0;
						} else {
							apiIdx = ((_ctl_photoReplyCurPage-1)*ctl_photoReplyDisplayPerPage % model_perPage);
						}
					}
				}
			}

			_ctl._set({replyApiDataIdx:apiIdx}); 

			for(var i = 0; i < ctl_photoReplyDisplayPerPage; i++, apiIdx++) {
				if((_ctl_photoReplyCurPage-1)*ctl_photoReplyDisplayPerPage + i == _ctl_photoReplyTotalCount) {
				//if((_ctl_photoReplyTotalPage-1)*ctl_photoReplyDisplayPerPage + i + 1 == _ctl_photoReplyTotalCount) {
					break;
				}

				_data_replySeq 			= skFn.array.isArray(ctl_arrPhotoReplyDataList) ? ctl_arrPhotoReplyDataList[apiIdx].replySeq : ctl_arrPhotoReplyDataList.replySeq;
				_data_parentReplySeq 	= skFn.array.isArray(ctl_arrPhotoReplyDataList) ? ctl_arrPhotoReplyDataList[apiIdx].parentReplySeq : ctl_arrPhotoReplyDataList.parentReplySeq;
				_data_img 				= skFn.array.isArray(ctl_arrPhotoReplyDataList) ? ctl_arrPhotoReplyDataList[apiIdx].img : ctl_arrPhotoReplyDataList.img;
				_data_writerName 		= skFn.array.isArray(ctl_arrPhotoReplyDataList) ? ctl_arrPhotoReplyDataList[apiIdx].writerName : ctl_arrPhotoReplyDataList.writerName;
				_data_writeDate 		= skFn.array.isArray(ctl_arrPhotoReplyDataList) ? ctl_arrPhotoReplyDataList[apiIdx].writeDate : ctl_arrPhotoReplyDataList.writeDate;
				_data_content 			= skFn.array.isArray(ctl_arrPhotoReplyDataList) ? ctl_arrPhotoReplyDataList[apiIdx].content_s : ctl_arrPhotoReplyDataList.content_s;

				_data_content_s			= skFn.array.isArray(ctl_arrPhotoReplyDataList) ? ctl_arrPhotoReplyDataList[apiIdx].content_s : ctl_arrPhotoReplyDataList.content_s;
				
				strReplyData	=	"<li class=''>";

				className	=	(i%2 == 0) ? "inner odd" : "inner";
				if(_data_replySeq != _data_parentReplySeq) {
					className	=	(i%2 == 0) ? "inner odd list_comment_reply" : "inner list_comment_reply";
				} else {
					className	=	(i%2 == 0) ? "inner odd" : "inner";
				}

				strReplyData	+=	"	<div class='" + className + "'>";
				strReplyData	+=	"		<div class='box_img'>";
					if(_data_img != "") {
						strReplyData	+=	'<img src="' + THUMB_IMG_URL_60X60 + _data_img + '" alt="" onerror="this.src=\'../image/img/icon_profile_null.jpg\'">';
					} else {
						strReplyData	+=	'<img src="../image/img/icon_profile_null.jpg" alt="">';
					}
				strReplyData	+=	"		</div>";
				strReplyData	+=	"		<div class='box_text'>";
				strReplyData	+=	"			<div class='text_name'>" + _data_writerName + "</div>";
				strReplyData	+=	"			<div class='text_date'>" + _data_writeDate + "</div>";
				strReplyData	+=	"			<div class='text_description'>" + _data_content_s + "</div>";
				strReplyData	+=	"		</div>";
				strReplyData	+=	"	</div>";
				strReplyData	+=	"</li>";
				
				$(".list_comment:last-child").each(function() {
					$(this).append(strReplyData);
				});
			}

			//display scrollbar 
			$(".view_comment .box_scroll").attr('style', 'display:block');
			//display reply info
			$(".view_comment .reply_sum").attr('style', 'display:block');
			
			$(".view_comment .reply_sum :first").text(_ctl_photoReplyCurPage + "/" + _ctl_photoReplyTotalPage);
			$(".view_comment .reply_sum :last").text("(댓글 " + _ctl_photoReplyTotalCount + "개)");

			this.move(action);
		},

		getReplyList : function (action) {
			var _ctl = this;
			var _ctl_photoReplyTotalPage;
			var _ctl_loginTid = _ctl._get('loginTid');

			if(_ctl_loginTid != "") {
				skFn.debug.log('getReplyList(\''+action+'\') called');
				
				// API 호출
				this.model.retriveList(
										this.model._get('itemSeq'),
										function(jsonData){
											// 정상
											if(jsonData.code == 0){
												if(typeof jsonData.body.ArrayOfPhotoReply != "undefined") {	// 값이 있는 경우
													_ctl._set({arrPhotoReplyDataList:jsonData.body.ArrayOfPhotoReply.PhotoReply});
							
													var ctl_arrPhotoReplyDataList 		= 	_ctl._get("arrPhotoReplyDataList");
													var ctl_photoReplyDisplayPerPage	=	_ctl._get('photoReplyDisplayPerPage');

													_ctl_photoReplyTotalCount = (skFn.array.isArray(ctl_arrPhotoReplyDataList)) ? ctl_arrPhotoReplyDataList[0].totalReplyCount : ctl_arrPhotoReplyDataList.totalReplyCount;
													_ctl._set({photoReplyTotalCount: _ctl_photoReplyTotalCount});
													_ctl_photoReplyTotalPage =	Math.ceil(_ctl_photoReplyTotalCount /parseInt(ctl_photoReplyDisplayPerPage));
													
													_ctl._set({photoReplyTotalPage : _ctl_photoReplyTotalPage});
												} else {
													_ctl._set({photoReplyTotalCount: 0});
													_ctl._set({photoReplyTotalPage : 0});
												}
												
												_ctl.displayReplyData(action);
												
											} else {
												// 팝업을 띄운다
												PopupComponent.showTextPopup( // showErrorPopup
													jsonData.user_msg.title,
													jsonData.user_msg.contents, // userError[jsonData.code]
													// ENTER, RETURN(ESC) 누를때 실행할 콜백함수
													function(){
														history.back();
													}
												);
											}
										}
				);
			} else {
				skFn.debug.log('getReplyList(\''+action+'\') called');
				// API 호출
				this.model.retriveListByNoLogin(
										this.model._get('itemSeq'),
										function(jsonData){
											// 정상
											if(jsonData.code == 0){
												if(typeof jsonData.body.ArrayOfPhotoReply != "undefined") {	// 값이 있는 경우
													_ctl._set({arrPhotoReplyDataList:jsonData.body.ArrayOfPhotoReply.PhotoReply});
							
													var ctl_arrPhotoReplyDataList 		= 	_ctl._get("arrPhotoReplyDataList");
													var ctl_photoReplyDisplayPerPage	=	_ctl._get('photoReplyDisplayPerPage');
													
													_ctl_photoReplyTotalCount = (skFn.array.isArray(ctl_arrPhotoReplyDataList)) ? ctl_arrPhotoReplyDataList[0].totalReplyCount : ctl_arrPhotoReplyDataList.totalReplyCount;
													_ctl._set({photoReplyTotalCount: _ctl_photoReplyTotalCount});
													
													_ctl_photoReplyTotalPage =	Math.ceil(_ctl_photoReplyTotalCount /parseInt(ctl_photoReplyDisplayPerPage)); 
													_ctl._set({photoReplyTotalPage : _ctl_photoReplyTotalPage});
												} else {
													_ctl._set({photoReplyTotalCount: 0});
													_ctl._set({photoReplyTotalPage : 0});
												}
												
												_ctl.displayReplyData(action);
												
											} else {
												// 팝업을 띄운다
												PopupComponent.showTextPopup( // showErrorPopup
													jsonData.user_msg.title,
													jsonData.user_msg.contents, // userError[jsonData.code]
													// ENTER, RETURN(ESC) 누를때 실행할 콜백함수
													function(){
														history.back();
													}
												);
											}
										}
				);
			}
		},
		/**
		 * showPage
		 * @param {string} action : 현재 위치에 따라 데이터를 보여줌 (first, init, next, down_next, prev, up_prev)
		 * @return 
		 * @desc : 페이지를 계산해서 배열 데이터를 display하는 함수를 호출(displayReplyData)하거나, 
		 * 			API를 호출하여 배열 데이터를 생성하는 함수(getReplyList)를 호출 후 배열 데이터를 display하는 함수를 호출(displayReplyData)
		 */
		showPage : function(action){
			var _ctl = this;
			var ctl_photoReplyDisplayPerPage	=	_ctl._get('photoReplyDisplayPerPage');
			var ctl_photoReplyTotalPage			=	parseInt(_ctl._get('photoReplyTotalPage'));
			var _ctl_photoReplyCurPage			=	parseInt(_ctl._get('photoReplyCurPage'));
			var _ctl_photoReplyTotalCount		=	parseInt(_ctl._get('photoReplyTotalCount'));
			
			var model_cPage 					= 	this.model._get('cPage');
			var model_perPage					=	this.model._get('perPage');
			var ctl_photoItemSeq				=	_ctl._get("photoItemSeq");
			var ctl_TargetTid					=	_ctl._get("targetTid");
			var ctl_loginTid					=	_ctl._get("loginTid");

			// 해당 사진첩 글 번호 없음처리
			if(typeof ctl_photoItemSeq == 'undefined') return;

			if(action == "init") {
				if(this.model._get('targetId') == "") {
					this.model._set({targetId:ctl_TargetTid, loginId:ctl_loginTid, itemSeq:ctl_photoItemSeq}); 
				}			

				this._set({photoReplyTotalPage:0, photoReplyCurPage:1, photoReplyTotalCount:-1});

				this._set({arrPhotoReplyDataList:[], replyMoveIndex:0});
				this.model._set({itemSeq:ctl_photoItemSeq}); 
				
				
				ctl_photoReplyTotalPage			=	parseInt(_ctl._get('photoReplyTotalPage'));
				_ctl_photoReplyCurPage			=	parseInt(_ctl._get('photoReplyCurPage'));
				_ctl_photoReplyTotalCount		=	parseInt(_ctl._get('photoReplyTotalCount'));
				
				model_cPage 					= 	this.model._get('cPage');
				ctl_photoItemSeq				=	_ctl._get("photoItemSeq");
				ctl_TargetTid					=	_ctl._get("targetTid");
				ctl_loginTid					=	_ctl._get("loginTid");

	        	if(skTv.zone.isShown('ReplyNameUI')) skTv.zone.hide('ReplyNameUI');
	        	
			} else {
	        	// 댓글 레이어가 오픈 되어있는 상태에서는 이동하지 않는다.(데이터 변경 문제) 
	        	if(skTv.zone.isShown('ReplyNameUI')) return;
			}
			

			if(_ctl_photoReplyTotalCount == 0){																	// 댓글 데이터 없음.
				skTv.zone.hide('ReplyList');
				skTv.zone.show('ReplyListNone');
				return;
			}

			// Page Lockking
			LoadingComponent.setIsLoadingImg(false);															// 방글이 이미지 나오지 않게..			
			LoadingComponent.lock(true);

			if(action == "first" || action == "init") {
				if(_ctl._get('arrPhotoReplyDataList') == "") {
					this.model._set({cPage:1});
					_ctl._set({photoReplyCurPage : 1});
					_ctl.getReplyList(action);
				} else {
					if(_ctl_photoReplyCurPage == 1) {
						_ctl.getReplyList("first");
					} else {
						if(ctl_photoReplyTotalPage < model_perPage) {
							_ctl.displayReplyData(action);
						} else {
							this.model._set({cPage:1});
							_ctl._set({photoReplyCurPage : 1});
							
							if(((_ctl_photoReplyCurPage-1) * ctl_photoReplyDisplayPerPage) > ((model_cPage-1) * model_perPage)) {
								_ctl.getReplyList(action);
							} else {
								_ctl.displayReplyData(action);
							}
						}
					}
				} 
				
			} else if(action == "next" || action == "down_next") {
				if(_ctl_photoReplyCurPage == ctl_photoReplyTotalPage) {
					_ctl._set({photoReplyCurPage : 1});
					this.model._set({cPage:1});
					LoadingComponent.unlock();
					_ctl.showPage("first");
				} else {
					_ctl_photoReplyCurPage++;
					_ctl._set({photoReplyCurPage : _ctl_photoReplyCurPage});
					if((_ctl_photoReplyCurPage * ctl_photoReplyDisplayPerPage) <= (model_cPage * model_perPage)) {
						_ctl.displayReplyData(action);
					} else {
						model_cPage++;
						this.model._set({cPage:model_cPage});
						_ctl.getReplyList(action);
					}					
				}
				
			} else if(action == "prev" || action == "up_prev") {
				var standPage, minPage, maxPage;
				var ctl_model_Page;

				if(ctl_photoReplyTotalPage == 1) {
					LoadingComponent.unlock();
					return;
				}
				
				model_cPage			=	parseInt(model_cPage);

				if(_ctl_photoReplyCurPage == 1) {
					_ctl_photoReplyCurPage = ctl_photoReplyTotalPage;
					_ctl._set({photoReplyCurPage : ctl_photoReplyTotalPage});
					
				} else {
					_ctl_photoReplyCurPage--;
					_ctl._set({photoReplyCurPage : _ctl_photoReplyCurPage});
				}

				minPage = Math.ceil((((model_cPage-1) * model_perPage) + 1) / ctl_photoReplyDisplayPerPage);
				maxPage = Math.ceil((model_cPage * model_perPage)/ ctl_photoReplyDisplayPerPage);
				
				if(minPage <= _ctl_photoReplyCurPage && _ctl_photoReplyCurPage <= maxPage) { 
					skFn.debug.log('[prev] displayReplyData  called');
					_ctl.displayReplyData(action);

				} else {
					skFn.debug.log('[prev] getReplyList  called');
					
					if(_ctl_photoReplyCurPage == ctl_photoReplyTotalPage) {
						model_cPage  = Math.ceil(_ctl_photoReplyTotalCount / model_perPage);
					} else {
						model_cPage--;
					}
					this.model._set({cPage:model_cPage});

					_ctl.getReplyList(action);
				}

			} else if(action == "delete") {
				var curReplyMoveIndex = this._get("replyMoveIndex");
				var eCount = $(".list_comment").children().length;
				
				skFn.debug.log('getReplyList(\''+action+'\') called');

				if(ctl_photoReplyTotalPage == _ctl_photoReplyCurPage) {

					if(eCount-1 == curReplyMoveIndex) {
						if(curReplyMoveIndex > 0) {
							curReplyMoveIndex--;
							this._set({replyMoveIndex:curReplyMoveIndex});
							_ctl.getReplyList(action);
							
						} else if(curReplyMoveIndex == 0) {
							if(ctl_photoReplyTotalPage == 1) {
								skFn.debug.log('delete photoReplyTotalPage == 1 called');

								_ctl._set({photoReplyTotalCount: 0});
								_ctl._set({photoReplyTotalPage : 0});
								_ctl._set({photoReplyCurPage : 0});
								_ctl._set({arrPhotoReplyDataList:[]});
								_ctl.displayReplyData(action);

							} else {
								skFn.debug.log('delete photoReplyTotalPage > 1  called');								
								model_cPage			=	parseInt(model_cPage);

								if(_ctl_photoReplyCurPage == 1) {
									_ctl._set({photoReplyCurPage : ctl_photoReplyTotalPage});
								} else {
									_ctl_photoReplyCurPage--;
									_ctl._set({photoReplyCurPage : _ctl_photoReplyCurPage});
								}
								
								model_cPage--;
								this._set({replyMoveIndex:eCount-1});
								this.model._set({cPage:model_cPage});
								_ctl.getReplyList("up_prev");
							}
						}
					} else {
						_ctl.getReplyList(action);
					}
				} else {
					_ctl.getReplyList(action);
				}
			// 특정 페이지의 데이터 보이기
			} else {
				var standPage, minPage, maxPage;
				var ctl_model_Page;

				standPage = Math.ceil(parseInt(action) / model_perPage);
				if(action % model_perPage == 0 ) {
					minPage = (model_perPage * (standPage-1)) + 1;
					maxPage = model_perPage * (standPage+1);
				} else{
					minPage = (model_perPage * standPage) + 1;
					maxPage = model_perPage * (standPage+1);
				}
				
				_ctl_photoReplyCurPage = parseInt(action);
				_ctl._set({photoReplyCurPage : _ctl_photoReplyCurPage});

				if(minPage <= _ctl_photoReplyCurPage && _ctl_photoReplyCurPage <= maxPage) {
					
					_ctl.displayReplyData(action);
					
				} else {
					
					ctl_model_Page = Math.ceil((_ctl_photoReplyCurPage * ctl_photoReplyDisplayPerPage) / model_perPage);
					this.model._set({cPage:ctl_model_Page});
					_ctl.getReplyList(action);
					
				}
			}		
		},
		
		
		/**
		 * move
		 * @param {string} action : 현재 위치에 따라 댓글 포커스 이동
		 * @return 
		 * @desc : 
		 * 		- first : 첫데이터에 포커스
		 * 		- prev : 이전 페이지 첫번째 데이터에 포커스
		 * 		- next : 다음 페이지 첫번째 데이터에 포커스
		 * 		- up : 이전 데이터에 포커스 (이전 페이지의 마지막 보여줘야 하는 경우  showPage('up_prev') 호출)
		 * 		- up_prev : up으로 이전페이지의 데이터를 보여주는 경우
		 * 		- down : 다음 데이터에 포커스 (다음 페이지의 첫번째 데이터를 보여줘야 하는 경우  showPage('down_next') 호출)
		 * 		- down_next : down Key로 다음페이지의 데이터를 보여주는 경우
		 * 		- 1,..., else : 마우스 이벤트 (action 값이 숫자로 넘어옴)
		 */
		move : function(action){
			var _ctl = this;
			var eCount, oldFocus, newFocus;
			var curReplyMoveIndex, newReplyMoveIndex;
			var _ctl_photoReplyTotalPage	=	parseInt(_ctl._get('photoReplyTotalPage'));
			var _ctl_photoReplyCurPage		=	parseInt(_ctl._get('photoReplyCurPage'));
			var _Scroll						= 	this.ScrollComponent; //shortcut

			LoadingComponent.unlock();
			
			skFn.debug.log('move(\''+action+'\') called');

        	// 댓글 레이어가 오픈 되어있는 상태에서는 이동하지 않는다.(데이터 변경 문제) 
        	if(skTv.zone.isShown('ReplyNameUI')) {        		
        		skTv.zone.focus('ReplyNameUI');
        		PhotoReplyLayerController.move(action);
        		return;
        	}

			if(action == "init") {
				LoadingComponent.lock();
				// 스크롤바 위치 조정
				_Scroll.init({scrollzone:'ReplyList',totalPage:_ctl_photoReplyTotalPage}, 
						function(curPage){
							_ctl.showPage(curPage);
						}
				);
				
				_Scroll.view(_ctl_photoReplyTotalPage, _ctl_photoReplyCurPage);
				
				// Page UnLockking (데이터가 바뀌면 mouseover 이벤트가 실행되기 때문에 lock시간을 충분히 준다.)
				window.setTimeout("LoadingComponent.unlock();", 500);
				
				return;
			}
			
			if(action == "first") {
				LoadingComponent.lock();				
				this._set({replyMoveIndex:0});
				$(".list_comment :first").attr('class', 'focus');
				_Scroll.view(_ctl_photoReplyTotalPage, _ctl_photoReplyCurPage);

				// Page UnLockking
				window.setTimeout("LoadingComponent.unlock();", 500);
				return;
			}

			curReplyMoveIndex = _ctl._get("replyMoveIndex");

			eCount = $(".list_comment").children().length;

 			if(action == "prev" || action == "next") {
				this._set({replyMoveIndex:0});
				_Scroll.view(_ctl_photoReplyTotalPage, _ctl_photoReplyCurPage);
				
 			}else if(action == "up_prev") {
 				LoadingComponent.lock();
				this._set({replyMoveIndex:eCount-1});
				_Scroll.view(_ctl_photoReplyTotalPage, _ctl_photoReplyCurPage);
				
			} else if(action == "down_next") {
 				LoadingComponent.lock();
				this._set({replyMoveIndex:0});
				_Scroll.view(_ctl_photoReplyTotalPage, _ctl_photoReplyCurPage);
				
 			} else if(action == "up") {
 				// 상세글보기로 이동
 				if(_ctl_photoReplyCurPage == 1 && curReplyMoveIndex-1 < 0) {
 					// Page UnLockking
 					LoadingComponent.unlock();
 					skTv.zone.focus('PhotoDesc'); 					
 					return;
 				}
 				
				if(curReplyMoveIndex-1 < 0) {
					// Page UnLockking
					//LoadingComponent.unlock();
					_ctl.showPage('up_prev');
					return;
				} else {
					this._set({replyMoveIndex:curReplyMoveIndex-1});
				}

 			} else if(action == "down") {
				if(curReplyMoveIndex+1 == eCount) {
					//skFn.debug.log('curReplyMoveIndex+1 == eCount called');
					if(_ctl_photoReplyTotalPage == 1) {
	 					LoadingComponent.unlock();
						return;
					}
					
					this._set({replyMoveIndex:0});
					_ctl.showPage('down_next');
 					//LoadingComponent.unlock();
					return;
				} else {
					//skFn.debug.log('else called');
					this._set({replyMoveIndex:curReplyMoveIndex+1});
				}
			
			// 댓글 쓰기
 			} else if(action == "writeReply" || action == "writeReReply") {
 				if(action == "writeReply") this._set({replyMoveIndex:eCount-1});
 				
 				// 댓글갯수 추가로 페이지 수가 변경되어 scroll Component 변경이 필요할 수 있음.
				_Scroll.view(_ctl_photoReplyTotalPage, _ctl_photoReplyCurPage);

			// 마우스 이벤트 (action 값이 숫자로 넘어옴)
 			} else if(typeof action == "number") {
 				if(skTv.zone.isLock == true) return;
 				
 				// Scroll 이동으로 변경된 경우
 				if($(".view_comment > .box_scroll").children(".bg_scroll").attr("class").indexOf("focus") > 0) {
 					_ctl._set({replyMoveIndex:0});
 					
 	 			// Move로 변경된 경우
 				} else {
 	 				if(curReplyMoveIndex == action) {
 	 					// Page UnLockking
 	 					window.setTimeout("LoadingComponent.unlock();", 1000);
 	 					return;
 	 				}

 	 				this._set({replyMoveIndex:action});
 				} 				
			}
 			
 			newReplyMoveIndex = this._get("replyMoveIndex");


 			if($(".list_comment").children().length < newReplyMoveIndex+1) {
				_ctl._set({replyMoveIndex:0});
	 			newReplyMoveIndex = this._get("replyMoveIndex");
			}
 			
 			
			$(".list_comment").children().each(function(i){
				if(i == curReplyMoveIndex) {
					$(this).attr('class', '');
				} 
				
				if(i == newReplyMoveIndex) {
					$(this).attr('class', 'focus');
				}
			});
			
			
			// Page UnLockking
			window.setTimeout("LoadingComponent.unlock();", 500);
		},

		
		/**
		 * focus On
		 * @return void
		 */
		focusOn : function(){
			var _ctl = this;
			var zoneFocus;

			if(_ctl._get("photoReplyTotalCount") == 0) {
				skTv.zone.hide('ReplyList');
				skTv.zone.show('ReplyListNone');
				skTv.zone.focus('PhotoDesc');
				return;
			}
			
			zoneFocus = _ctl._get("replyMoveIndex");

			if(typeof zoneFocus != "undefined") {
				zoneFocus = parseInt(_ctl._get("replyMoveIndex"))+1;
				$(".box_comment li:nth-child(" + zoneFocus + ")").attr('class', 'focus');
			}
		},

		/**
		 * focus Off
		 * @return void
		 */
		focusOff : function(fnCallback){
			var _ctl = this;
			var zoneFocus;
	
			// 댓글 레이어가 display 되어 있으면, focus 유지
			if(skTv.zone.getCurZone() == 'ReplyNameUI') return;

        	if(skTv.zone.isShown('ReplyNameUI')) {
				skTv.zone.hide('ReplyNameUI');
			}
			
			zoneFocus = _ctl._get("replyMoveIndex");
			if(typeof zoneFocus != "undefined") {
				zoneFocus = parseInt(_ctl._get("replyMoveIndex"))+1;
				$(".box_comment li:nth-child(" + zoneFocus + ")").attr('class', '');
			}
			
			if(typeof fnCallback != "undefined") {
				fnCallback();
			}

		}
	}
});
