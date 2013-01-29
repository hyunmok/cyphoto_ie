/**
 *
 * debug.js
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
 * @_tutorial		
 * @_version		
 * @_abstract
 * @_final			
 * @_internal
 * @_date			2011-01-13 오후 4:28:05
 * 
 * @internal ************************* [ file info. end ] *********************************
 */



if (typeof window == 'undefined'){
	if(typeof skFn == 'undefined'){
		skFn = {};
	}
}else if (typeof window.skFn == 'undefined'){
	window.skFn = {};
}

skFn.debug = {

	logNum : 0,

	/**
	 * 설정에 따라 디버그 메시지 표시를 분기함
	 * @param {String} str 로그에 남길 내용
	 * @param {Boolean} isAlways 필수 로그 인가 (Default : false)
	 * @param {Boolean} isAlert 경고인가 (Default : false)
	 * @return void
	 */
	log : function(str, isAlways, isAlert){

		this.logNum++;

		if(isAlways==undefined){isAlways=false;}
		if(isAlert==undefined){isAlert=false;}
		if(skEnv.debug.logLevel==0){
			return;
		}else if(skEnv.debug.logLevel==1){
			if(isAlways==true){
				this.printLog(str,isAlert);
			}
		}else if(skEnv.debug.logLevel==2){
				this.printLog(str,isAlert);
		}
	},

	/**
	 * 치명적인 오류를 나타낸다
	 * @param {String} str 로그에 남길 내용
	 * @return void
	 */
	alert : function(str){
		this.log(str, true, true);
	},

	src : function(fileName){
		skFn.console.setTraceJsFile(fileName);
	},

	/**
	 * 에러 개체를 받아서 콘솔에 표시한다
	 * @param {Object} e
	 * @return void
	 */
	error : function(e){
		if(e.fileName){
			this.src(skFn.string.getFileName(e.fileName));
		}
		var r = '['+e.name+'] '+e.message;
		r += e.lineNumber ? ' (line '+e.lineNumber+')' : '';
		this.alert(r);
	},

	/**
	 * 로그를 보인다
	 * @param {String} str 로그에 남길 내용
	 * @param {Boolean} isAlert 경고인가
	 * @return void
	 */
	printLog : function(str,isAlert){
		if(isAlert==undefined){isAlert=false;}
		if(skEnv.debug.viewMode=='screen'){
			skFn.console.trace(str,isAlert) ;
		}else{
			if(isAlert) {str = '● '+str;}
			alert('sk comms ============================================> [' + this.logNum + '] ' + str);
		}
	},

	/**
	 * 개체를 분해한다
	 * @param {Object} oObject 분해할 개체
	 * @return void
	 */
	check : function( oObject, sObjectName, isShow, bPropertyOnly ){
		if(typeof oObject !== 'object') return 'not an object' ;
		if(!sObjectName) sObjectName = '' ;
		var r=[], i=0, v='' ;
		for(var p in oObject) {
			if(bPropertyOnly) {
				v = ' : ' + typeof oObject[p];
			} else {
				if(skFn.agent.isIE() && typeof oObject[p] == 'string') {
					v = ' = ' + escape(oObject[p]);
				} else {
					v = ' = ' + oObject[p];
				}
			}
			r[i++] = sObjectName + '.' + p + v ;
		}

		if(skEnv.debug.viewMode=='screen'){
			var result = r.join(',\r\n');
		}else{
			var result = '\r\nsk comms --------------> '+r.join(',\r\nsk comms --------------> ');
		}

		if(isShow==true){
			alert(result);
		}else{
			return result;
		}
	},

	/**
	 * 함수를 실행하고 오류가 있다면 캐치한다
	 * @param {Object} fn 실행해볼 함수
	 * @return void
	 */
	tryExecute : function(fn){
		try{
			fn();
		}catch(e){
			this.error(e);
		}
	}
}


/**
 * AGENT Utility
 * 
 * @object
 */
skFn.agent = {

	/**
	 * check Microsoft Internet Explorer
	 * 
	 * @function
	 * @return {Boolean} 
	 */
	isIE : function() {
		return window.navigator.appName == 'Microsoft Internet Explorer';
	}

}; // eo skFn.agent