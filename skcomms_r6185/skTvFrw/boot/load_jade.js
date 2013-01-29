/**
 *
 * load_jade.js
 *
 * Jade Framework 을 로드한다
 *
 * @internal ************************* [ file info. start ] *********************************
 *
 * @category		boot
 * @package		
 * @author		shim, heung woon <lumiel@skcomms.co.kr>
 * @filesource

 * @__history		

				[2011-05-14 오후 5:06:01] shim

				1. 개발 시작

				<참고사항>

				[LG]
				window.location.hostname = 10.12.0.106
				window.location.port = 61101
				window.location.hash = 
				window.location.host = 10.12.0.106:61101
				window.location.href = http://10.12.0.106:61101/lg/tv_mate/html/frame.php
				window.location.pathname = /lg/tv_mate/html/frame.php
				window.location.protocol = http:
				window.location.search = 
				window.location.reload = function reload() {    [native code]}
				window.location.replace = function replace() {    [native code]}
				window.location.assign = function assign() {    [native code]}
				
				[삼성]
				window.location.hash = 
				window.location.host = localhost
				window.location.hostname = localhost
				window.location.href = file://localhost/C:\Program%20Files\Samsung\Samsung%20TV%20Apps%20SDK\Apps/test/index.html?country=US&language=1&lang=en&modelid=VALENCIA&server=development&firmware=T-SPHAKRC-1000&remocon=1_35_259_0&area=USA
				window.location.pathname = /C:\Program%20Files\Samsung\Samsung%20TV%20Apps%20SDK\Apps/test/index.html
				window.location.port = 
				window.location.protocol = file:
				window.location.search = ?country=US&language=1&lang=en&modelid=VALENCIA&server=development&firmware=T-SPHAKRC-1000&remocon=1_35_259_0&area=USA
				
				[기타정보]
				LIVE		lg.tvapp.nate.com/
				STAGE	tvapps.skcomms.co.kr/

 * @_uses
 * @_todo			[Information string [unspecified format]]
 * @_tutorial		[Display a link to the documentation for a tutorial]
 * @_abstract		[Document an abstract class, class variable or method]
 * @_final			[Document a class method that should never be overridden in a child class]
 * @__datatype 	[array, boolean, integer, mixed, string]
 * @_internal
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

/**
 * skTv.runtime : 실행 상황에 관련된 개체
 * 
 */
skTv.runtime = {

	// 현재 실행중인 파일의 베이스 이름
	baseFileName : '',

	/**
	 * getBaseFileName : 파일 베이스이름 가져오기
	 * 
	 * @function
	 * @param {String} str
	 * @return {String} file base name
	 */
	getBaseFileName : function (str){
		var arrStr = str.split('?');
		var arrPath = arrStr[0].split('/');
		var fileName = arrPath[arrPath.length-1];
		return fileName.substr(0, fileName.lastIndexOf('.'));
	},

	/**
	 * include : 스크립트 인클루드
	 * 
	 * @function
	 * @param {String} filePath
	 * @return void
	 */
	include : function (filePath){
		window.document.write('<'+"script type='text/javascript' src='"+filePath+"'></script"+'>');
	},

	/**
	 * setRunMode : live, stage, dev 모드를 결정
	 * 
	 * @function
	 * @param {String} filePath
	 * @return void
	 */
	setRunMode : function(){

		// 호스트가 nate.com 이면 live 모드
		if(window.location.hostname.indexOf('.nate.com')!=-1){
			skEnv.app.runMode = 'live';
		// 호스트가 skcomms.co.kr 이면서 80 포트면 stage 모드
		}else if(window.location.href.indexOf('.skcomms.co.kr/')!=-1){
			skEnv.app.runMode = 'stage';
		// 기타 개발 모드
		}else{
			skEnv.app.runMode = 'dev';
		}
	},

	/**
	 * setEnv : skEnv의 환경 변수를 설정한다.
	 * 
	 * @function
	 * @return void
	 */
	setEnv : function(){

		// 실제TV(에뮬레이터 포함) 인지 검사 : skEnv.device.isTv 초기화
		skEnv.device.isTv = this.isTv();
		
		// model ID 설정
		skEnv.device.modelId = this.getModelId();
		
		//model Name 설정
		skEnv.device.modelName = this.getModelName();

		// 실제TV 환경 (에뮬포함)
		if(skEnv.device.isTv==true){
			// 삼성 초기화 작업을 이곳에 입력
			if(skEnv.device.vendor=='samsung'){
				// 이곳에 Common.API 들을 선언한다.
				var widgetAPI = new Common.API.Widget();
			// LG 초기화 작업을 이곳에 입력
			}else if(skEnv.device.vendor=='lg'){
			}
		
		// 웹브라우저 환경
		}else{
			skEnv.device.inputDevice = 'keyboard';
		}
	},

	/**
	 * setIncludeFiles : live, stage, dev 모드에 따라 인클루드 할 파일을 구성한다
	 * 
	 * @function
	 * @param {String} filePath
	 * @return void
	 */
	setIncludeFiles : function(){

		// RunMode 결정
		this.setRunMode();

		// 현재 실행중인 파일의 베이스 이름 (~~~.html)
		this.baseFileName = this.getBaseFileName(window.location.pathname);

		// 개발모드 이면 파일 구성(scripts.js)을 읽고, 각각의 파일을 로드(load_dev_scripts.js)
		if(skEnv.app.runMode=='dev'){

			this.include(skEnv.app.frwPath+'projects/'+skEnv.app.name+'/config/config_scripts.js');
			this.include(skEnv.app.frwPath+'skTvFrw/boot/load_dev_scripts.js');

		// 라이브 또는 스테이지 모드이면 압축 파일(~-min.js)을 로드
		}else{
			this.include(skEnv.app.frwPath+"projects/"+skEnv.app.name+"/compressed/"+this.baseFileName+'-min.js');
		}
	},

	/**
	 * includeFiles : 스크립트 파일을 인클루드
	 * 
	 * @function
	 * @param {String} division
	 * @return void
	 */
	includeFiles : function(division){
		// 개별 정의를 로드
		for(var cat in skTvScripts[division]){
			for(var i in skTvScripts[division][cat]){
				this.include(skEnv.app.frwPath+skTvScripts[division][cat][i]);
			}
		}
		// 작동파일을 로드
		this.include(skEnv.app.frwPath+'projects/tv_mate/run/'+division+'.js');
	},

	/**
	 * getModelId : 제품의 모델 ID를 알아낸다
	 * 
	 * @function
	 * @return {String} : 구동환경이 PC의 웹브라우저이면 [vendor]_app_on_pc, app_on_pc 등을 리턴
	 */
	getModelId : function(){

		// TV에서 구동중이라면
		if(skEnv.device.isTv==true){
			if(skEnv.device.vendor=='samsung'){
				var paramsArray = window.location.search.split('&');
				var tmp = null;
				for(i in paramsArray){
					tmp = paramsArray[i].split('=');
					if(tmp[0]=='modelid'){
						return tmp[1];
					}
				}
			}else if(skEnv.device.vendor=='lg'){
				try {
					return document.getElementById('device').modelName;
				} catch(e) {
					skFn.debug.alert(e.message);
				}
			}
		// TV가 아니라면 (PC...)
		}else{
			return skEnv.device.vendor ? skEnv.device.vendor + '_app_on_pc' : 'app_on_pc' ;
		}
	},

	/**
	 * 제품의 모델 ID를 알아낸다
	 * 
	 * @function
	 * @return {String} : 구동환경이 PC의 웹브라우저이면 [vendor]_app_on_pc, app_on_pc 등을 리턴
	 */
	getModelName : function(){

		// TV에서 구동중이라면
		if(skEnv.device.isTv==true){
			if(skEnv.device.vendor=='samsung'){

				
			}else if(skEnv.device.vendor=='lg'){
				try {
					return document.getElementById('device').manufacturer;
				} catch(e) {
					skFn.debug.alert(e.message);
				}
			}

		// TV가 아니라면 (PC...)
		}else{
			return skEnv.device.vendor ? skEnv.device.vendor + '_app_on_pc' : 'app_on_pc' ;
		}
	},

	/**
	 * 실제TV(에뮬레이터 포함) 인지 검사 : skEnv.device.isTv 초기화
	 * 
	 * @function
	 * @return {String}
	 */
	isTv : function(){

		// lg
		if(skEnv.device.vendor=='lg'){
			document.write ("<object data='' id='device' width='0' height='0' type='application/x-netcast-info'></object>");
			var deviceObject = document.getElementById('device');
		}

		// alert('typeof deviceObject = '+typeof deviceObject); // (pc이면서 lg : object,  function : undefined
		// alert('deviceObject = '+deviceObject); // null : object HTMLObjectElement : undefined

		// samsung
		if(window.navigator.appName == 'Maple'){
			return true;
		// lg
		}else if(typeof deviceObject == 'function'){
			//alert('deviceObject.type = '+deviceObject.type);
			if(typeof deviceObject.modelName!='undefined' && deviceObject.type=='application/x-netcast-info'){
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	},

	/**
	 * add Event Listener
	 * 
	 * @function
	 * @param {element} eNode : node to bind event
	 * @param {String} sEvent : 'click'
	 * @param {function} fHandler : event handler
	 * @return {Array} 
	 */
	addEvent : function(eNode, sEvent, fHandler){ 
		if(eNode.addEventListener){
			eNode.addEventListener(sEvent, fHandler, false);
		}else{
			eNode.attachEvent('on'+sEvent, fHandler);
		}
	}
}

// 환경변수를 설정한다.
skTv.runtime.setEnv();

// live, stage, dev 모드에 따라 인클루드 할 파일을 구성한다
skTv.runtime.setIncludeFiles();

// 로드 완료되면 zone 초기화 되도록 리스너 추가
skTv.runtime.addEvent(window, 'load', function(){
	skTv.zone.init();
});
