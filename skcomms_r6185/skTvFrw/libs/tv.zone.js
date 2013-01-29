/**
 *
 * zone.js
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
				1. 삼성 TV의 Scene 구조와 호환됨

				2. 예제

				<script type='text/javascript'>

					skFn.dom.addEvent(window, 'load', init);

					function init(){
						skTv.zone.init();
						skTv.zone.show('PhotoList');
						skTv.zone.focus('PhotoList');
					}

					var zone = {

						PhotoList : {

							initialize : function(){
								PhotoListController = new PhotoListControllerClass();
							},
							handleShow : function(){
								PhotoListController.show();
							},
							handleHide : function(){
			
							},
							handleFocus : function(){
			
							},
							handleBlur : function(){
			
							},
							handleKeyDown : function(keyCode){
								switch (keyCode) {
									case skTv.keymap.RIGHT:
										PhotoListController.move('NEXT');
										break;
									case skTv.keymap.LEFT:
										PhotoListController.move('PREV');
										break;
								}
							}
						}
					}

				</script>

 * @_todo			
 * @_tutorial		
 * @_version		
 * @_abstract
 * @_final			
 * @_internal
 * @_date			2011-01-13 오전 10:59:23
 * 
 * @internal ************************* [ file info. end ] *********************************
 */



if (typeof window == 'undefined'){
	if(typeof skTv == 'undefined'){
		skTv = {};
	}
}else if (typeof window.skTv == 'undefined'){
	window.skTv = {};
}

skTv.zone = {

	/**
	 * init : zone을 초기화하고 keydown 이벤트 리스너에 key down 핸들러 추가
	 * 
	 * @function
	 */
	init : function(){

		try {
			for(id in zone){

				// 초기화 되지 않았음을 저장
				zone[id].initialized = false;

				// 각 zone에 마우스가 오버되면 해당 zone에 자동으로 focus 한다.
				// zone의 handleFocus는 실행되지 않는다.
				// _bindMouseEvent() 로 개선하여 이 버전은 폐기함 (shim)
				/*
				try {
					skFn.dom.addEvent(document.getElementById('Scene'+id), 'mouseover', function(oEvent){
						skTv.zone.focus(this.id.replace('Scene',''), true);
					});
				} catch(e) {
					if(document.getElementById('Scene'+id)==undefined){
						skFn.debug.alert('Please add zone <div id=\'Scene'+id+'\'>');
					}else{
						skFn.debug.error(e);
					}
				}
				*/

				// Lock 이 걸려있으면 이벤트 전파를 막는다
				try {
					$('#Scene'+id).click(function(oEvent){
						if(skTv.zone.isLock==true){
							oEvent.stopPropagation();
						}
					}).mouseover(function(oEvent){
						if(skTv.zone.isLock==true){
							oEvent.stopPropagation();
						}
					}).mouseout(function(oEvent){
						if(skTv.zone.isLock==true){
							oEvent.stopPropagation();
						}
					});
				} catch(e) {
					if(document.getElementById('Scene'+id)==undefined){
						skFn.debug.alert('Please add zone <div id=\'Scene'+id+'\'>');
					}else{
						skFn.debug.error(e);
					}
				} // eo catch

			}// eo for

		} catch(e) {
			skFn.debug.error(e);
		}

		document.onkeydown = this._handleKeyDown;
	},

	// 현재 포커스 존
	curZoneId : '',

	// 직전 포커스 존
	oldZoneId : '',

	// 존 락 여부
	isLock : false,

	/**
	 * show : zone을 보임
	 * 
	 * @function
	 * @param {String} id
	 */
	show : function(id){

		skFn.debug.log('skTv.zone.show(\''+id+'\') called');

		// 삼성의 경우
		if($.sfScene){
			$.sfScene.show(id);
		// 삼성 이외
		}else{

			// Zone 정의 검사
			if(this._checkZone(id)==false){return;}

			// initialize() 실행 (1회만)
			if(!zone[id].initialized){
				try{
					zone[id].initialize ? zone[id].initialize() : skFn.debug.alert('zone['+id+'].initialize() is undefined');
					this._bindMouseEvent(id);
					zone[id].initialized = true;
				}catch(e){
					skFn.debug.error(e);
				}
			}

			// 해당 zone을 보임
			try {
//				document.getElementById('Scene'+id).style.display = 'block';
				document.getElementById('Scene'+id).style.visibility = 'visible';
				zone[id].handleShow ? zone[id].handleShow() : skFn.debug.alert('zone['+id+'].handleShow() is undefined');
			} catch(e) {
				if(document.getElementById('Scene'+id)==undefined){
					skFn.debug.alert('Please add zone <div id=\'Scene'+id+'\'>');
				}else{
					skFn.debug.error(e);
				}
			}
		}
	},

	/**
	 * hide : zone을 감춤
	 * 
	 * @function
	 * @param {String} id
	 */
	hide : function(id){

		skFn.debug.log('skTv.zone.hide(\''+id+'\') called');

		// 삼성의 경우
		if($.sfScene){
			$.sfScene.hide(id);
		// 삼성 이외
		}else{

			// Zone 정의 검사
			if(this._checkZone(id)==false){return;}

			// 해당 zone을 감춤
			try {
//				document.getElementById('Scene'+id).style.display = 'none';
				document.getElementById('Scene'+id).style.visibility = 'hidden';
				zone[id].handleHide ? zone[id].handleHide() : skFn.debug.alert('zone['+id+'].handleHide() is undefined');
			} catch(e) {
				if(document.getElementById('Scene'+id)==undefined){
					skFn.debug.alert('Please add zone <div id=\'Scene'+id+'\'>');
				}else{
					skFn.debug.error(e);
				}
			}
		}
	},

	/**
	 * focus : zone에 포커스 : 이전 zone blur -> 현재 zone focus -> 현재 zone 키이벤트 핸들러 연결
	 * 
	 * @function
	 * @param {String} id
	 * @param {Boolean} isMouse
	 */
	focus : function(id, isMouse){

		// skFn.debug.log('skTv.zone.focus(\''+id+'\') called');
		// 현재 zone 에서 같은 zone 을 focus 했다면 null;
		if(this.curZoneId==id){
			// skFn.debug.log('this.curZoneId == id --> nothing happened');
			return;
		}

		if(typeof isMouse == 'undefined'){
			isMouse = false;
		}

		this.oldZoneId = this.curZoneId; // 직전 Zone 이름
		this.curZoneId = id; // 현재 Zone 이름
		// skFn.debug.log('this.oldZoneId = '+this.oldZoneId);
		// skFn.debug.log('this.curZoneId = '+this.curZoneId);

		// 삼성의 경우
		if($.sfScene){
			$.sfScene.focus(id);
		// 삼성 이외
		}else{
			// 키 또는 마우스 어느 경우든 다른 zone이 focus 되면 handleBlur 는 반드시 실행한다
			if(this.oldZoneId && zone[this.oldZoneId]){
				zone[this.oldZoneId].handleBlur();
				skFn.debug.log('zone[\''+this.oldZoneId+'\'].handleBlur() called');
			}

			// 마우스
			if(isMouse==true){
				skFn.debug.log('zone[\''+this.curZoneId+'\'].handleFocus() not called <-- isMouse == true');
			// 마우스 아닐 경우만 handleFocus 을 실행한다
			}else{
				skFn.debug.log('zone[\''+this.curZoneId+'\'].handleFocus() called');
				this.curZoneId && zone[this.curZoneId] ? zone[this.curZoneId].handleFocus() : null;
			}
		}
	},

	/**
	 * isShown : 특정 zone 이 보이고 있는가
	 * 
	 * @function
	 * @param {String} id
	 * @return {Boolean}
	 */
	isShown : function(id){

		skFn.debug.log('skTv.zone.isShown(\''+id+'\') called');

//		if(document.getElementById('Scene'+id).style.display=='none'){
		if(document.getElementById('Scene'+id).style.visibility=='hidden'){
			return false;
		}else{
			return true;
		}
	},

	/**
	 * getCurZone : 현재 포커스를 가진 zone id 를 리턴
	 * 
	 * @function
	 * @return {String}
	 */
	getCurZone : function(){
		return this.curZoneId;
	},
	
	/**
	 * getOldZone : 이전 포커스를 가진 zone id 를 리턴
	 * 
	 * @function
	 * @return {String}
	 */
	getOldZone : function() {
		return this.oldZoneId
	},

	/**
	 * getCurrentFocusId : className 이 focus 인 요소의 id를 알려줌
	 * 
	 * @function
	 * @return {String}
	 */
	getCurrentFocusId : function(){
		try {
			var elements_ = document.getElementsByClassName('focus');
			return elements_[0].id;
		}catch(e){
			skFn.debug.error(e);
		}
	},

	/**
	 * lock : 화면 잠금
	 * 
	 * @function
	 * @param {Boolean} isLock
	 * @param {Function} callback
	 */
	lock : function(isLock, callback){
		skTv.zone.isLock = isLock;
		if(typeof callback == 'function'){
			callback();
		}
	},

	/**
	 * _handleKeyDown : 현재 zone 의 handleKeyDown 을 실행
	 * 
	 * @function
	 * @param {Object} oEvent
	 */
	_handleKeyDown : function(oEvent){

		if(skTv.zone.isLock==true) {
			skFn.debug.log('skTv.zone.isLock = ' + skTv.zone.isLock);
			return;
		}

		var eventObj = oEvent ? oEvent : window.event;

		if(skFn.debug.logLevel != 0){
			var k = skFn.array.getKeyByValue(skTv.keymap, eventObj.keyCode);
			skFn.debug.log('zone.'+skTv.zone.curZoneId+'.handleKeyDown('+eventObj.keyCode+') is called. Key map is '+k+'.');
		}

		// 현재 zone 의 handleKeyDown 을 실행시킨다 (현재 zone 이라는 점이 중요)
		skTv.zone.curZoneId ? zone[skTv.zone.curZoneId].handleKeyDown(eventObj.keyCode) : null;
	},

	/**
	 * _bindMouseEvent : 특정 zone 의 이벤트 정의를 리스너로 등록 (jquery.live 사용:실제로는 해당요소에 이벤트가 추가되지는 않는다)
	 * 
	 * @function
	 * @param {String} id
	 */
	_bindMouseEvent : function(id){

		skFn.debug.log('skTv.zone._bindMouseEvent(\''+id+'\') called');

		if(typeof id == 'undefined'){
			skFn.debug.alert('zone id is required');
			return false;
		}

		if(id && zone[id] && zone[id].handleMouse instanceof Object){
			var eventSets = zone[id].handleMouse;
			var realSelector = '', selectors = null;
			for(var selector in eventSets){

				// ,로 묶은 selectors 처리
				selectors = selector.split(',');
				for(var i in selectors){
					selectors[i] = '#Scene'+ id + ' ' + skFn.string.trim(selectors[i]);
				}
				realSelector = selectors.join(', ');

				// 각 이벤트에 대해 리스너를 등록
				for(var eventName in eventSets[selector]){
					skFn.debug.log(realSelector + ' -> ' + eventName);
					$(realSelector).live(eventName, eventSets[selector][eventName]); // http://api.jquery.com/live
				}
				// 마우스 오버 되는 요소들에 대해서 자동 포커스 이동 처리 (zone의 마우스오버 방식을 개선)
				skFn.debug.log(realSelector + ' -> ' + 'mouseover');
				$(realSelector).live('mouseover', function(){
					skTv.zone.focus(id);
				});
			}
		}
	},

	/**
	 * _checkZone : zone 정의 오류 검사
	 * 
	 * @function
	 * @param {String} id
	 */
	_checkZone : function(id){

		// zone 변수가 정의 되지 않았을 경우
		if(typeof zone == 'undefined'){
			skFn.debug.alert('Please add the var zone={}; definition.');
			return false;
		// 해당 zone 의 컨트롤 정의가 없는 경우
		}else if(typeof zone[id] == 'undefined') {
			skFn.debug.alert('Please add the var zone={'+id+':{~~~}} definition.');
			return false;
		}else{
			return true;
		}
	}
}



