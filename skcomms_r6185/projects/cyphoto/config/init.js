/**
 *
 * init.js
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
	if(typeof skTv == 'undefined'){
		skTv = {};
	}
}else if (typeof window.skTv == 'undefined'){
	window.skTv = {};
}


skTv.init = {

	/**
	 * 제품의 모델 ID를 알아낸다
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
					return document.getElementById('device').serialNumber;
				} catch(e) {
					skFn.debug.alert(e.message);
				}
			}else if(skEnv.device.vendor=='lgcns'){
				
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
					return document.getElementById('device').modelName;
				} catch(e) {
					skFn.debug.alert(e.message);
				}
			}else if(skEnv.device.vendor=='lgcns'){
				
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
		// samsung
		if(window.navigator.appName == 'Maple'){
			return true;

		// lg
		}else if(document.getElementById('device')!=null){
			if(typeof document.getElementById('device').modelName!='undefined'){
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}
}


// 실제TV(에뮬레이터 포함) 인지 검사 : skEnv.device.isTv 초기화
skEnv.device.isTv = skTv.init.isTv();

// model ID 설정
skEnv.device.modelId = skTv.init.getModelId();

//model Name 설정
skEnv.device.modelName = skTv.init.getModelName();



// 이하 구동환경별 초기화 작업 입력란

// 실제TV 환경 (에뮬포함)
if(skEnv.device.isTv==true){

	// 삼성 초기화 작업을 이곳에 입력
	if(skEnv.device.vendor=='samsung'){

		// 이곳에 Common.API 들을 선언한다.
		var widgetAPI = new Common.API.Widget();

	// LG 초기화 작업을 이곳에 입력
	}else if(skEnv.device.vendor=='lg'){

	}else if(skEnv.device.vendor=='lgcns'){
		
	}

// 웹브라우저 환경
}else{

	skEnv.device.inputDevice = 'keyboard';
}



