/**
 *
 * FolderController.js
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

				[2011-03-15 오후 1:39:20 / shim]

				
				
 * @_tutorial		
 * @_version		
 * @_abstract
 * @_final			
 * @_internal
 * 
 * @internal ************************* [ file info. end ] *********************************
 */



/**
 * Folder Controller
 */
var FolderControllerClass = defineClass({

	extend : BaseControllerClass,

	name : 'FolderControllerClass',

	/**
	 * 생성자 : 컨트롤러 인스턴스 초기화
	 */
	construct : function(targetId){

		// 상위클래스에 체이닝
		this.superclass();

		// 모델 인스턴스 생성
		this.model = new FolderModelClass(2,6); //menuType, perPage

		// 모델 상태 설정
		this.model._set({targetId:targetId});

		// 페이징 컴포넌트 인스턴스 생성
		this.pagingComponent = new PagingComponentClass(this);

		// 스크롤 컴포넌트 인스턴스 생성
		this.ScrollComponent = new ScrollComponentClass();
		
		// 페이징 컴포넌트 인스턴스 작동규칙 설정
		this.pagingComponent._set({

			selector : '.list_select_folder > li',

			firstFilter : function(){
				skFn.debug.log('firstFilter() is called');
				var _ctl = this._ctl ; // 아래 함수에서 this를 접근할 수 없으므로 접근가능한 변수에 담는다
				_ctl.movePage('prev');
			},

			lastFilter : function(){
				skFn.debug.log('lastFilter() called');
				var _ctl = this._ctl ; // 아래 함수에서 this를 접근할 수 없으므로 접근가능한 변수에 담는다
				_ctl.movePage('next');
			}
		});

		var _ctl = this;
		var _scrollComponent = this.ScrollComponent;

		this.model.getList(
			1,
			skFn.user.isLoggedIn(),
			function(jsonData){

				// 정상
				if(jsonData.code==0){

					// scroll Setting
					_scrollComponent.init(
						{scrollzone:'Folder', totalPage:_ctl.model.totalPages},  
						function(cPage){
							_ctl.model._set({cPage:cPage});
							_ctl.show(cPage, 0);
						}
					);

				// 예외상황
				}else{

					// 폴더를 닫는다
					skTv.zone.hide('Folder');

					PopupComponent.showTextPopup( // showErrorPopup
						jsonData.user_msg.title,
						jsonData.user_msg.contents, // userError[jsonData.code]
						// ENTER, RETURN(ESC) 누를때 실행할 콜백함수
						function(){
							skTv.zone.focus('Gnb');
						}
					);
				}
			}
		);

	},

	/**
	 * 인스턴스 메써드
	 */
	methods : {

		/**
		 * 특정 페이지의 폴더리스트를 보여주고 특정 행에 포커스한다
		 * @param {String} page 
		 * @param {Number} focusIdx Focusing Index
		 * @return void
		 */
		show : function(page, focusIdx){

			skFn.debug.log('show('+page+', '+focusIdx+') called');

			if(typeof page=='undefined'){
				page = 1;
			}

			var _paging = this.pagingComponent; //shortcut
			var _model = this.model;
			var _ctl 	= this;
			var _Scroll = this.ScrollComponent; //shortcut
			
			this.model.getList(
				page,
				skFn.user.isLoggedIn(),
				function(jsonData){
					// 정상
					if(jsonData.code==0){

						skFn.debug.log(skFn.debug.check(jsonData.body[1],'jsonData.body[1]'));

						// 폴더 내용 변경

						var folderList = jsonData.body;
						var li = '', li_html = '', itemCount='';

						if(typeof focusIdx=='string' && focusIdx=='last' && folderList.length){
							focusIdx = folderList.length-1;
						}

						for(var i in folderList){
							itemCount = folderList[i].itemCount!=0 ? folderList[i].itemCount : '' ;
							li_html += '<li folderName="'+folderList[i].folderName+'" folderNo="'+folderList[i].folderNo+'">'+folderList[i].folderName+' <span class="text_view">('+folderList[i].folderOpenName+')</span> <span class="text_num">'+itemCount+'</span></li>';
						}
						skFn.debug.log('li_html = '+li_html);

						skFn.dom.setHtml('ul_list_select_folder', li_html);
						if(typeof focusIdx!='undefined'){
							$('#li_close_folder').removeClass('focus'); // 2011-05-06 by lumi
							_paging.focusOn(focusIdx);
						}

						var _ctl_totalPages	=	_model._get('totalPages');
						var _ctl_curPage	=	_model._get('cPage');

						// alert('_ctl_totalPages = '+_ctl_totalPages);
/*
		_Scroll.init({scrollzone:'Folder', totalPage:_model.totalPages},  
			function(curPage){

				alert(curPage);

				_model._set({cPage:curPage});
				_ctl.show(curPage, 0);
			}
		);
*/
						// 상세보기 팝업 scroll 
						_Scroll.view(_ctl_totalPages, _ctl_curPage);
						
						skFn.debug.log(skFn.debug.check(_model,'_model'));
						skFn.debug.log('_model._get(totalPages)' + _model._get('totalPages'));

					// 예외상황
					}else{

						// 폴더를 닫는다
						skTv.zone.hide('Folder');

						PopupComponent.showTextPopup( // showErrorPopup
							jsonData.user_msg.title,
							jsonData.user_msg.contents, // userError[jsonData.code]
							// ENTER, RETURN(ESC) 누를때 실행할 콜백함수
							function(){
								skTv.zone.focus('Gnb');
							}
						);
					}
				}
			);
		},

		/**
		 * 행에서 포커스를 이동한다
		 * @param {String} direction 방향 (prev, next)
		 * @return void
		 */
		moveRow : function(direction){
			//var _model = this.model;
			//var _Scroll = this.ScrollComponent; //shortcut

			this.pagingComponent.moveFocus(direction);

			// 스크롤바 위치 조정
			//_Scroll.view(_model._get('cPage'));
			
		},

		/**
		 * 페이지를 이동한다
		 * @param {String} direction 방향 (prev, next)
		 * @return void
		 */
		movePage : function(direction){
			skFn.debug.log('movePage('+direction+') called');
			var _ctl = this ; // getList 에서 this를 접근할 수 없으므로 접근가능한 변수에 담는다
			var isLogin = skFn.user.isLoggedIn();
			// 이전 페이지
			if(direction=='prev'){
				_ctl.model.getList(null, isLogin, function(jsonData){
					if(_ctl.model._get('cPage') >= 2){
						_ctl.show(_ctl.model._get('cPage')-1, 'last');
					}else{
						_ctl.show(_ctl.model._get('totalPages'), 'last');
					}
				});
			// 다음 페이지
			}else if(direction=='next'){
				_ctl.model.getList(null, isLogin, function(jsonData){
					if(_ctl.model._get('cPage') < _ctl.model._get('totalPages')){
						_ctl.show(_ctl.model._get('cPage')+1,0);
					}else{
						_ctl.show(1,0);
					}
				});
			}
		},

		/**
		 * 선택된 폴더의 사진첩 리스트를 보여준다
		 * @return void
		 */
		changePhotoList : function(){

			skFn.debug.log("changePhotoList() is called");

			var folderNo = this.pagingComponent.getFocusAttr('folderNo'); skFn.debug.log('folderNo = ' + folderNo);
			var folderName = this.pagingComponent.getFocusAttr('folderName');
			$("#FolderName").html(folderName);
			$("#FolderNameNone").html(folderName);
			PhotoListController.show('FOLDER', folderNo);
			this.closeFolder();
		},

		/**
		 * 폴더창을 닫는다
		 * @return void
		 */
		closeFolder : function(){
			skTv.zone.hide('Folder');
			skTv.zone.focus('PhotoList');
		}
	}
});


