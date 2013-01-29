/**
 *
 * PhotoDetailController.js
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
 * PhotoDetail Controller
 */
var PhotoDetailControllerClass = defineClass({

	extend : BaseControllerClass,

	name : 'PhotoDetailControllerClass',

	/**
	 * ���� : ��Ʈ�ѷ� �ν��Ͻ� �ʱ�ȭ
	 */
	construct : function(targetId, folderNo, itemNo, fnCallBack){
		
		// ����Ŭ������ ü�̴�
		this.superclass();
		this._init([
		    'itemNo',			
			'itemIndex',
			'itemSeq',
			
			'DescViewTotalPage',
			'DescViewOffsetHeight',
			'DescViewCurPage',
			
		]);
		if(params.folderName){
			$("#FolderName").html(params.folderName);
		}
		if(!itemNo) itemNo = 0;
		var itemIndex = itemNo %2;

		this._set({
			itemNo : itemNo,							//�ʱ� �ҷ��� itemNo
			itemIndex : itemIndex,						//Controller���� ��鸵�� item index
			DescViewTotalPage : 1,
			DescViewCurPage : 1,
			DescViewOffsetHeight : 354
		});
		_this = this;

		
		// �� �ν��Ͻ� ��
		this.detailModel = new PhotoDetailModelClass();
		this.photoModel = new PhotoModelClass();
		//미니홈피 모델 인스턴스
		this.minihpInfoModel = new MinihpInfoModelClass();
		
		//로그인 여부 체크 및 method 설정
		
		//로그인 시
		if(skFn.user.isLoggedIn()){
			
			if(targetId == skFn.user.getUserTid() && skFn.user.isPrivacyOpen() == false){
				var method = this.photoModel.retrieveListIsPrivacy;
			}
			else{
				var method = this.photoModel.retrieveList;
			}
			
			this.minihpInfoModel.getMinihpInfo(targetId,  function(data){
			_this.displayUserName(data, function(){
					PhotoListComponent.init(2, _this.photoModel, method);

					_this.detailModel._set({targetId : targetId});
					PhotoListComponent.setTargetId(targetId);
					PhotoListComponent.setFolderNo(folderNo);
					
					PhotoListComponent.retrieveListByItemNo(_this._get("itemNo"), function(){
						//오류 처리
						if(PhotoListComponent.error.code != 0){
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
							_this.retrieveDetail('INIT', _this, fnCallBack);
						}
					});
				});
			});
		
		} //로그인 하지 않았을 때 
		else {
			var method = this.photoModel.retrieveListNoLogin;
			this.minihpInfoModel.getMinihpInfoNoLogin(targetId,  function(data){
			_this.displayUserName(data, function(){
					PhotoListComponent.init(2, _this.photoModel, method);

					_this.detailModel._set({targetId : targetId});
					PhotoListComponent.setTargetId(targetId);
					PhotoListComponent.setFolderNo(folderNo);
					
					PhotoListComponent.retrieveListByItemNo(_this._get("itemNo"), function(){
						//오류 처리
						if(PhotoListComponent.error.code != 0){
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
							_this.retrieveDetail('INIT', _this, fnCallBack);
						}
					});
				});
			});

			
		}

		// 스크롤 컴포넌트 인스턴스 생성
		_this.ScrollComponent = new ScrollComponentClass();

		
		//이벤트 헨들러 등록
		
		$("#BtnPrev")
			.bind("mouseover", function(event){
				$("#BtnPrev").attr("class", "list_prev list_prev_on");
			})
			.bind("mouseout", function(event){
				$("#BtnPrev").attr("class", "list_prev list_prev_off");
			})
			.bind("click", function(event){
				PhotoReplyController.focusOff(function(){
					PhotoDetailController.show("PREV", function(){
						PhotoReplyController.setParams('photoItemSeq', PhotoDetailController.getItemSeq());
						PhotoReplyController.showPage('init');
						skTv.zone.focus('PhotoDesc');
					});
				});
		});
		$("#BtnNext")
			.bind("mouseover", function(event){
				$("#BtnNext").attr("class", "list_next list_next_on");
			})
			.bind("mouseout", function(event){
				$("#BtnNext").attr("class", "list_next list_next_off");
			})
			.bind("click", function(event){
				PhotoReplyController.focusOff(function(){
					PhotoDetailController.show("NEXT", function(){
						PhotoReplyController.setParams('photoItemSeq', PhotoDetailController.getItemSeq());
						PhotoReplyController.showPage('init');
						skTv.zone.focus('PhotoDesc');
				});
			});
		});

		$("#ScenePhotoDetail img:first").bind('error', function(){
			this.src = "../image/img/img_photo_detail_none.jpg";
		});
	},

	/**
	 * �ν��Ͻ� �޽��
	 */
	methods : {
		displayUserName : function(data, fnCallBack){
			//오류 처리
			if(data.code != 0){
				// 팝업을 띄운다
				PopupComponent.showTextPopup( // showErrorPopup
					data.user_msg.title,
					data.user_msg.contents, // userError[jsonData.code]
					// ENTER, RETURN(ESC) 누를때 실행할 콜백함수
					function(){
						window.history.back(); 
					}
				);
			}
			//정상응답
			else{
				$("#PhotoUserName").html(data.body.ArrayOfCyProfile.CyProfile.name);
				fnCallBack();
			}
		},
		show : function(direction, fnCallBack){
			
			skFn.debug.log('PhotoDetailControllerClass > show('+direction+') is called');
			var result;
			var _this = this;

			//���� Page�� item�� �޾ƿ´�.
			//���� �� ��� Item (photoList.item[1]) �� ����Ѵ�

			var index =  _this._get('itemIndex');
			var photoList = PhotoListComponent.getCurrentItemList();
			var slideArray = photoList[1];

			//������ ������ �ѹ��� ������ �´�.
			var pageInfo = PhotoListComponent.getPageInfo();
			
			if(direction == "NEXT"){
				pageInfo = PhotoListComponent.getPageInfo();
				if(index == 1 || slideArray.item[index+1].title == null){
					_this._set({itemIndex : 0});
					//������ ������ �϶�
					if (pageInfo.handler.lastPage == pageInfo.handler.cPage)
					{
						PhotoListComponent.retrieveListByPage(1, function(){
							if(PhotoListComponent.isPageExist('PREV') != 'NOT_EXIST'){
								PhotoListComponent.movePage("PREV", function(){
									_this.retrieveDetail(direction, _this, fnCallBack);
								});
							}else{
								_this.retrieveDetail(direction, _this, fnCallBack);
							}
						});	
					}
					else{
						PhotoListComponent.movePage(direction, function(){
							_this.retrieveDetail(direction, _this, fnCallBack);
						});
					}
				}
				else{
					index++;
					_this._set({itemIndex:index});
					_this.retrieveDetail(direction, _this, fnCallBack);
				}
			}
			else if (direction == "PREV")
			{
				pageInfo = PhotoListComponent.getPageInfo();

				if(index == 0 || slideArray.item[index-1].title == null){
					_this._set({itemIndex : 1});
					if(pageInfo.handler.cPage == 1){
						PhotoListComponent.retrieveListByPage(pageInfo.api.lastPage, function(){
							if(PhotoListComponent.isPageExist('NEXT') != 'NOT_EXIST'){
								PhotoListComponent.movePage("NEXT", function(){
									if(PhotoListComponent.isPageExist('NEXT') != 'NOT_EXIST'){
										PhotoListComponent.movePage("NEXT", function(){
											_this.retrieveDetail(direction, _this, fnCallBack);
										});
									}
									else{
										_this.retrieveDetail(direction, _this, fnCallBack);
									}
								});
							}
							else{
								_this.retrieveDetail(direction, _this, fnCallBack);
							}
						});
					}else{
						pageInfo = PhotoListComponent.getPageInfo();
						PhotoListComponent.movePage(direction, function(){
							_this.retrieveDetail(direction, _this, fnCallBack);
						});
					}
				}
				else{
					index--;
					_this._set({itemIndex:index});
					_this.retrieveDetail(direction, _this, fnCallBack);
				}
			}
		},
		/**
		*	Show ���� ajaxCall �� ��û�� ������� retrieveDetail�� ��û �ϴ� �ݹ� �Լ�
		*
		*	@param	{String}	direction
		*	@return false
		*/
		retrieveDetail : function(direction, _this, fnCallBack){
			skFn.debug.log('PhotoDetailControllerClass > retrieveDetail('+direction+', _this) is called');
			//오류 처리
			if(PhotoListComponent.error.code != 0){
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

				//���� Page�� item�� �޾ƿ´�.
				//���� �� ��� Item (photoList.item[1]) �� ����Ѵ�
				var photoList = PhotoListComponent.getCurrentItemList();
				var slideArray = photoList[1];
				
				if (direction == "INIT")
				{
				}
				else if (direction == "PREV")
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

				if(skFn.user.isLoggedIn()){
					_this.detailModel.retrieveDetail(slideArray.item[index].itemSeq,_this.display);
				} else {
					_this.detailModel.retrieveDetailNoLogin(slideArray.item[index].itemSeq,_this.display);
				}
				
				
				_this._set({itemSeq:slideArray.item[index].itemSeq});
				_this._set({itemIndex:index});
				fnCallBack();
			}
			

		},
		
		
		/**
		*	현재 ItemSeq  (sophia 추가)
		*
		*	@return false
		*/
		getItemSeq : function(){
			return this._get("itemSeq");
		},		

		
		display : function(data){
			//오류 처리
			if(data.code != 0){
				// 팝업을 띄운다
				PopupComponent.showTextPopup( // showErrorPopup
					data.user_msg.title,
					data.user_msg.contents, // userError[jsonData.code]
					// ENTER, RETURN(ESC) 누를때 실행할 콜백함수
					function(){
						window.history.back(); 
					}
				);
			}
			//정상응답
			else{
				var _ctl 	= 	PhotoDetailController;
				// memory leak 문제로 thumbnail server를 사용하기로 함. (6/3 by sophia)
				//PhotoListComponent.resizeImg(518, 454, $("#ScenePhotoDetail img")[0], data.body.PhotoItem.photoVmUrl);
				PhotoListComponent.resizeImg(518, 454, $("#ScenePhotoDetail img")[0], THUMB_IMG_URL_518X454 + data.body.PhotoItem.photoVmUrl);
				
				$("#ScenePhotoDesc div.text_title").html(data.body.PhotoItem.title);
				$("#ScenePhotoDesc div.text_date").html(data.body.PhotoItem.writeDate);
				$("#ScenePhotoDesc p.inner").html(data.body.PhotoItem.content_s);
				
				$("#ScenePhotoDescView div.title").html(data.body.PhotoItem.title);
				$("#ScenePhotoDescView div.date").html(data.body.PhotoItem.writeDate);
				$("#ScenePhotoDescView div.contents").html(data.body.PhotoItem.content);
			}
		},
		

		/**
		*	상세보기 팝업 마지막 페이지 여부 리터
		*	
		*/
		isDescViewLastPage : function(){
			var _ctl					= 	this;
			var _ctl_DescViewTotalPage	= 	parseInt(_ctl._get("DescViewTotalPage"));
			var _ctl_DescViewCurPage	= 	parseInt(_ctl._get("DescViewCurPage"));
			
			if(_ctl_DescViewTotalPage == _ctl_DescViewCurPage) {
				return true;
			} else{
				return false;
			}
		},
		
		
		/**
		*	상세보기 팝업 노출을 위한 세팅
		*	
		*/
		initDescView : function(){
			var _ctl				= 	this;
			var DescViewHeight 		= 	$(".wrap_contents .contents").attr("offsetHeight");
			var DescViewTotalPage 	= 	Math.ceil(DescViewHeight / 354);
			var _Scroll				= 	this.ScrollComponent; //shortcut
	

			if($(".popup_desc_view ~ .popup_bottom .list_helpbar li").attr("class").indexOf("focus") >= 0 ){
				$(".popup_desc_view ~ .popup_bottom .list_helpbar li").attr("class", "");
			}

			
			// 상세보기 View Contents의 실제 높이값 세팅
			skFn.debug.log('[showDescView style] height: :'+ DescViewHeight + 'px');

			_ctl._set({DescViewTotalPage:DescViewTotalPage, DescViewCurPage:1, DescViewOffsetHeight: DescViewHeight});

			// scroll Setting
			_Scroll.init({scrollzone:'PhotoDescView',totalPage:DescViewTotalPage}, 
					function(curPage){
						_ctl.showDescView(curPage);
					}
			);

			$("#PhotoDescView_scroll :eq(2)").attr("class", "bg_scroll focus");
		},
		

		/**
		*	상세보기 팝업 노출 및 스크롤링
		*	
		*/
		showDescView : function(direction){
			var _ctl						= 	this;
			var _Scroll						= 	this.ScrollComponent; //shortcut
			var _ctl_DescViewTotalPage		= 	parseInt(_ctl._get("DescViewTotalPage"));
			var _ctl_DescViewCurPage		= 	parseInt(_ctl._get("DescViewCurPage"));
			var _ctl_DescViewOffsetHeight	= 	parseInt(_ctl._get("DescViewOffsetHeight"));

			var DescViewPagePix			=	352;
			var moveDescViewPagePix;
			var new_DescView_top;
			var new_DescViewHeight;
			var new_DescViewClipTop;
			
			if(_ctl_DescViewTotalPage >= 1 ) {
				// 이동할 Page Number 세팅
				if(direction == "next") {																// 다음 페이지로 이동
					if(_ctl_DescViewTotalPage == _ctl_DescViewCurPage) {
						$(".popup_desc_view ~ .popup_bottom .list_helpbar li").attr("class", "focus");
						$("#PhotoDescView_scroll :eq(2)").attr("class", "bg_scroll");
						return;
					}
					_ctl_DescViewCurPage++;
					$("#PhotoDescView_scroll :eq(2)").attr("class", "bg_scroll focus");
					
				} else if(direction == "prev") {														// 이전 페이지로 이동
					if($(".popup_desc_view ~ .popup_bottom .list_helpbar li").attr("class").indexOf("focus") >= 0 ){
						$(".popup_desc_view ~ .popup_bottom .list_helpbar li").attr("class", "");
						$("#PhotoDescView_scroll :eq(2)").attr("class", "bg_scroll focus");
						return;
					}

					if(_ctl_DescViewCurPage == 1) return;

					_ctl_DescViewCurPage--;
					
				} else {																				// 특정 페이지로 이동
					if(direction > _ctl_DescViewTotalPage) return;
					_ctl_DescViewCurPage = direction;
				}
				
				_ctl._set({DescViewCurPage:_ctl_DescViewCurPage});
				
				new_DescView_top 	= 23 - ((_ctl_DescViewCurPage-1) * DescViewPagePix);
				new_DescViewHeight 	= 354 + ((_ctl_DescViewCurPage-1) * DescViewPagePix);
				new_DescViewClipTop	= 0 + ((_ctl_DescViewCurPage-1) * DescViewPagePix);
				
				skFn.debug.log('[showDescView style] top :'+ new_DescView_top + 'px; height:' + _ctl_DescViewOffsetHeight + 'px; CLIP: rect(' + new_DescViewClipTop + 'px 435px ' + new_DescViewHeight + 'px 0px);');
	
				// 상세보기 내용 이동
				$(".wrap_contents").attr("style", "top:" + new_DescView_top + "px; height:" + _ctl_DescViewOffsetHeight + "px; CLIP: rect(" + new_DescViewClipTop + "px 435px " + new_DescViewHeight + "px 0px);");

			} else {
				if(direction == "next") {																// 닫기 버튼으로 이동
					$(".popup_desc_view ~ .popup_bottom .list_helpbar li").attr("class", "focus");
					$("#PhotoDescView_scroll :eq(2)").attr("class", "bg_scroll");

				} else if(direction == "prev") {														// 스크롤로 이동
					$(".popup_desc_view ~ .popup_bottom .list_helpbar li").attr("class", "");
					$("#PhotoDescView_scroll :eq(2)").attr("class", "bg_scroll focus");
				}
			}

			// 상세보기 팝업 scroll 
			_Scroll.view(_ctl_DescViewTotalPage, _ctl_DescViewCurPage, function(){
				$("#PhotoDescView_scroll :eq(2)").attr("class", "bg_scroll focus");
				$(".popup_desc_view ~ .popup_bottom .list_helpbar li").attr("class", "");
			});
		},
		
		
		/**
		*	상세보기 팝업 닫기
		*	
		*/
		closeDescView : function(){
			var _ctl				= 	this;
			
			if($(".popup_desc_view ~ .popup_bottom .list_helpbar li").attr("class") == "focus") {
				skTv.zone.hide('PhotoDescView');
				skTv.zone.focus('PhotoDesc');
			}
		},
		
		
		/**
		 * focus On
		 * @return void
		 */
		focusOn : function(){
			$('#img_photo_detail').attr({'class':'focus'});
		},

		/**
		 * focus Off
		 * @return void
		 */
		focusOff : function(){
			$('#img_photo_detail').attr({'class':''});
		}
	}
});


