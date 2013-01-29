/**
 *
 * PhotoReplyLayerController.js
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
 * PhotoReplyLayer Controller
 */

var PhotoReplyLayerControllerClass = defineClass({

	extend : BaseControllerClass,

	name : 'PhotoReplyLayerControllerClass',

	/**
	 * ���� : ��Ʈ�ѷ� �ν��Ͻ� �ʱ�ȭ
	 */
	construct : function(){

		// ����Ŭ������ ü�̴�
		this.superclass();

		// �� �ν��Ͻ� ��
		_model = new PhotoReplyModelClass();
		
		this._init([
			'targetTid',
			'loginId',
			'itemSeq',
			'LayerFocusIdx'
		]);
		
		this._set({LayerFocusIdx:0, loginId:''});

		if(skFn.user.isLoggedIn() == true) {
			var _ctl_loginid = skFn.user.getUserTid();
			this._set({loginId:_ctl_loginid});
		}
		
	},

	/**
	 * �ν��Ͻ� �޽��
	 */
	
	methods : {
		setTargetTid : function(tid) {
			var _ctl = this;
			_ctl._set({targetTid:tid});
		},
		
		/*
		 * 댓글 레이어 show
		 */
		show : function(){
			var _ctl = this;
			var _ctl_loginId, _ctl_targetTid;
			var replyMoveIndex, replyApiDataIdx;
			var _data_writerId, _data_replySeq, _data_parentReplySeq;
			var arrPhotoReplyDataList = new Array();
			var arrClassName = new Array();

			this._set({LayerFocusIdx:0});

/*			
			if(typeof loginTid !='undefined')	{
				_ctl._set({loginId:loginTid});
			}
*/
			_ctl_loginId			=	_ctl._get('loginId');
			_ctl_targetTid			=	_ctl._get('targetTid');

			arrPhotoReplyDataList	=	PhotoReplyController._get('arrPhotoReplyDataList');
			replyApiDataIdx			=	PhotoReplyController._get('replyApiDataIdx');
			replyMoveIndex			=	PhotoReplyController._get('replyMoveIndex');
			
			_data_writerId = skFn.array.isArray(arrPhotoReplyDataList) ? arrPhotoReplyDataList[replyApiDataIdx+replyMoveIndex].writerId : arrPhotoReplyDataList.writerId;
			_data_replySeq = skFn.array.isArray(arrPhotoReplyDataList) ? arrPhotoReplyDataList[replyApiDataIdx+replyMoveIndex].replySeq : arrPhotoReplyDataList.replySeq;
			_data_parentReplySeq = skFn.array.isArray(arrPhotoReplyDataList) ? arrPhotoReplyDataList[replyApiDataIdx+replyMoveIndex].parentReplySeq : arrPhotoReplyDataList.parentReplySeq;
			// 사진첩보기("00000001" => 비회원(방문자), "7xxxxxxx" => 타운홈피 사용자)
			if(_data_writerId == "00000001" || _data_writerId.substr(0,1) == '7') {
				arrClassName[0] = "dim_menu";
			} else {
				arrClassName[0] = "focus";
			}

			// 댓글보기
			if(arrClassName[0] == "dim_menu") {
				arrClassName[1] = "focus";
			} else {
				arrClassName[1] = "";
			}	


			// 댓글쓰기
			if(_ctl_loginId != "") {
				if(_data_replySeq == _data_parentReplySeq) {
					arrClassName[2] = "";
				} else {
					arrClassName[2] = "dim_menu";
				}
			} else {
				arrClassName[2] = "dim_menu";
			}

			// 댓글삭제  
			skFn.debug.log('[PhotoReplyLayerControllerClass] > _ctl_loginId : + ' + _ctl_loginId + ', _ctl_targetTid : ' + _ctl_targetTid + ', _data_writerId : ' + _data_writerId);
			if(_ctl_loginId != null && (_ctl_loginId == _ctl_targetTid || _ctl_loginId == _data_writerId)) {
				arrClassName[3] = "last";
			} else {
				arrClassName[3] = "last dim_menu";
			}


			$(".layer_list_menu").children().each(function(i){
				$(this).attr('class', arrClassName[i]);
			});

			$(".view_layer_reply_ctl").attr('class', 'view_layer_reply_ctl layer_list'+(replyMoveIndex+1)); 
			
		},
		/*
		 * 댓글 레이어 포커스 이동
		 */
		move : function(direction){
			var _ctl = this;
			var curFocusIdx, newFocusIdx;
			var curFocusElements, newFocusElements;

			curFocusIdx = this._get("LayerFocusIdx");

			var focusedElement = $("#SceneReplyNameUI > div > ul > li:eq("+curFocusIdx+")");
			var liElementList = $("#SceneReplyNameUI > div > ul > li");
			var liElement = focusedElement;

			//element 찾는 임시함수
			var findElement = function(el, direction){
				if(direction == 'up'){
					return el.prev();
				}else if(direction == 'down'){
					return el.next();
				}else{
					return null;
				}
			};

			//direction 이 있는경우 
			if(direction == "up" || direction == "down") {
				liElement = findElement(liElement, direction);

				//방향으로 찾는다.
				while (liElement.length != 0){
					if(liElement.hasClass('dim_menu') == false){
						break;
					}
					liElement = findElement(liElement, direction);
				}

				//없다면 다시 루프
				if(liElement.length == 0){
					if(direction == "up"){
						liElement = liElementList.last();
					}else if (direction == "down"){
						liElement = liElementList.eq(0);
					}					
					while (liElement.length != 0){
						if(liElement.hasClass('dim_menu') == false){
							break;
						}
						liElement = findElement(liElement, direction);
					}
				}

				//focus 된 Element 와 현재 Element 가 다르다면 class 추가 
				if(focusedElement !== liElement){
					focusedElement.removeClass('focus');
					liElement.addClass('focus');
					this._set({LayerFocusIdx:liElement.index(), focusedElement : liElement});
				}		
				
				/*if(direction == "up") {
					if(curFocusIdx == 0) return;

					for(i = curFocusIdx; i > 0; i--) {
						if($(".layer_list_menu :nth-child(" + i + ")").attr("class").indexOf("dim_menu") < 0) {
							curFocusIdx = i;
							newFocusIdx = i-1;
							break;
						} else {
							if(i == 1) return;
						}
					}					
				} else {
					if(curFocusIdx == 3) return;
					for(i = curFocusIdx+1; i < $(".layer_list_menu li").length+1; i++) {
						if($(".layer_list_menu :nth-child(" + i + ")").attr("class").indexOf("dim_menu") < 0) {
							curFocusIdx = i-1;
							newFocusIdx = i;
							break;
						}
					}
					
					if(newFocusIdx == 4) newFocusIdx = 3;
				}
				
				if($(".layer_list_menu :nth-child(" + (newFocusIdx+1) +")").attr('class').indexOf("dim_menu") >= 0) {
					if(newFocusIdx < 3) {
						for(i = newFocusIdx+1; i < $(".layer_list_menu li").length+1; i++) {
							if($(".layer_list_menu :nth-child(" + i + ")").attr("class").indexOf("dim_menu") < 0) {
								newFocusIdx = i-1;
								break;
							}
						}
						if(i == 5) return;
						
					}else {
						curFocusIdx = newFocusIdx-1;
						return;
					}
				}

				this._set({LayerFocusIdx:newFocusIdx});
				
				$(".layer_list_menu").children().each(function(i){
					if($(this).attr("class").indexOf("dim_menu") < 0){
						$(this).attr("class", "");
					}
				});
				
				
				$(".layer_list_menu :nth-child(" + (newFocusIdx+1) +")").attr('class', 'focus');*/

			// 마우스 이벤트 (direction 값이 숫자로 넘어옴)
			} else {
				newFocusIdx = direction;

				if($(".layer_list_menu :nth-child(" + (newFocusIdx+1) + ")").attr('class').indexOf("dim_menu") >= 0){
					return;
					
				} else {
					this._set({LayerFocusIdx:newFocusIdx});
					
					if($(".layer_list_menu :nth-child(" + (curFocusIdx+1) +")").attr('class').indexOf("dim_menu") < 0) {
						$(".layer_list_menu :nth-child(" + (curFocusIdx+1) +")").attr('class', '');
					}
					$(".layer_list_menu :nth-child(" + (newFocusIdx+1) +")").attr('class', 'focus');
					
				}
			}
		},
		/*
		 * 댓글 레이어 기능별 action
		 */
		action : function(){
			var _ctl = this;
			var replyApiDataIdx, replyMoveIndex;
			var arrPhotoReplyDataList = new Array();
			var _data_writerId, _data_parentReplySeq;
			
			
			arrPhotoReplyDataList	=	PhotoReplyController._get('arrPhotoReplyDataList');
			replyApiDataIdx			=	PhotoReplyController._get('replyApiDataIdx');
			replyMoveIndex			=	PhotoReplyController._get('replyMoveIndex');

			_data_writerId = skFn.array.isArray(arrPhotoReplyDataList) ? arrPhotoReplyDataList[replyApiDataIdx+replyMoveIndex].writerId : arrPhotoReplyDataList.writerId;
			_data_parentReplySeq = skFn.array.isArray(arrPhotoReplyDataList) ? arrPhotoReplyDataList[replyApiDataIdx+replyMoveIndex].parentReplySeq : arrPhotoReplyDataList.parentReplySeq;
	
			$(".layer_list_menu").children().each(function(i) {
				if($(this).attr('class').indexOf('focus') >= 0 ) {
					switch(i) {
						case 0 :																// 사진첩보기
							navigation.gotoPhotoList(_data_writerId);
							break;
						case 1 :																// 댓글보기
							skTv.zone.show('ReplyView');
							skTv.zone.focus('ReplyView');
							break;
						case 2 :																// 댓글쓰기
							PhotoReplyController.show_ReplyWritepopup(_data_parentReplySeq);
							break;
						case 3 :																// 삭제
							PhotoReplyController.deleteReply();
							break;
					}
					
					return;
				}
			});
		}, 
		/**
		 * focus On
		 * @return void
		 */
		focusOn : function(){
		},

		/**
		 * focus Off
		 * @return void
		 */
		focusOff : function(){
			if(skTv.zone.getCurZone() == "PhotoDesc") {
				skTv.zone.hide('ReplyNameUI');
			}
		}
	}
});
