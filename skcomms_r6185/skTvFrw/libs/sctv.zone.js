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
	if(typeof scTv == 'undefined'){
		scTv = {};
	}
}else if (typeof window.scTv == 'undefined'){
	window.scTv = {};
}

scTv.zone = {

	scope : '11111121001',

	initialized : {},

	/**
	 * show : zone을 보임
	 * 
	 * @function
	 * @param {String} id
	 */
	show : function(id){

		skFn.debug.log('scTv.zone.show(\''+id+'\') called');

		// 소셜TV의 경우
		if(skEnv.device.isSocialTv){

			// initialize() 실행 (1회만)
			if(!scTv.zone.initialized[id]){
				try{
					$('#NateContaner'+id).loadScene({id:id, scope:this.scope});
					scTv.zone.initialized[id] = true;
				}catch(e){
					skFn.debug.error(e);
				}
			}

			$.sfScene.show({id:id, scope:this.scope});

		// 이외
		}else{
			skTv.zone.show(id);
		}
	},

	/**
	 * hide : zone을 감춤
	 * 
	 * @function
	 * @param {String} id
	 */
	hide : function(id){

		skFn.debug.log('scTv.zone.hide(\''+id+'\') called');

		// 소셜TV의 경우
		if(skEnv.device.isSocialTv){

			$.sfScene.hide({id:id, scope:this.scope});

		// 이외
		}else{
			skTv.zone.hide(id);
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

		skFn.debug.log('scTv.zone.focus(\''+id+'\') called');

		// 소셜TV의 경우
		if(skEnv.device.isSocialTv){

			$.sfScene.focus({id:id, scope:this.scope});

		// 이외
		}else{
			skTv.zone.focus(id);
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

		if(document.getElementById('Scene'+id).style.display=='none'){
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



