/**
 *
 * xhr.js
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

skFn.xhr = {

	/*
	 * > API Data 를 access token 을 가지고 억세스하고 가져옴
	 *
	 * @function
	 * @param {String} uri
	 * @param {Object} params
	 * @param {Object} callback
	 * @param {String} dataFormat : 
								XMLTEXT_TO_XML (xml text 로 받아서 xml obj 리턴) | 
								XMLTEXT_TO_JSON (xml text 로 받아서 json obj 리턴) | 
								JSONTEXT_TO_JSON (json text 로 받아서 json obj 리턴) | 
								TEXT_TO_TEXT (text 로 받아 text 로 리턴)
	 * @param {String} httpMethod : POST | GET
	 * @return {void}
	 */
	request : function(p){

		skFn.debug.log('skFn.xhr.request() is called');

		var uri = p.uri;
		var params = p.params;
		var dataFormat = p.dataFormat;
		var httpMethod = p.httpMethod;
		var callback = p.callback ? p.callback : null;
		var wrapperFilter = p.wrapperFilter ? p.wrapperFilter : null; // 래퍼가 있으면 래퍼가 응답을 중간에 받아서 처리후 콜백으로 넘긴다
		var exceptionFilter = p.exceptionFilter ? p.exceptionFilter : null;
		var postBody = null;


		if(httpMethod==undefined){ httpMethod = 'POST';}
		httpMethod = httpMethod.toUpperCase();

		// Header and Body
		var httpRequestData;

		var bodyArray = [];
		for(k in params){
			bodyArray.push(k+'='+params[k]);
		}
		// skFn.debug.check(bodyArray,'bodyArray',true);
		httpRequestData = {'body' : skFn.array.implode('&', bodyArray)};

		// skFn.debug.check(httpRequestData,'httpRequestData',true);

		if(httpMethod=='POST'){
			postBody = httpRequestData.body;
		}else if(httpMethod=='GET'){
			uri = uri+'?'+httpRequestData.body;
		}

		skFn.debug.log('postBody => '+postBody);
		skFn.debug.log('uri => '+uri);

		// Ajax call
		var http = new XMLHttpRequest();
		http.open(httpMethod, uri);
		skFn.debug.log('http.open is run');

		// Ajax Callback
		http.onreadystatechange = function(){

			skFn.debug.log('http.readyState = '+http.readyState);

			if (http.readyState==4){
				skFn.debug.log('ajax response is arrived');
				skFn.debug.log('http.status = '+http.status);
				//skFn.debug.log('http.responseText = '+http.responseText);
				skFn.debug.log('http.getAllResponseHeaders() = '+http.getAllResponseHeaders());
				skFn.xhr.callbackFormatedData(dataFormat, http, callback, wrapperFilter, exceptionFilter);
			}
		}

		if(httpMethod=='POST'){
			http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			http.setRequestHeader('Accept-Language', 'ko');
			http.setRequestHeader('Content-Length', httpRequestData.body.length);
		}

		http.send(postBody);
	},

	/*
	 * > 데이터를 지정된 형식으로 변환 후 callback 실행
	 *
	 * @function
	 * @param {String} dataFormat
	 * @param {Object} http
	 * @param {Function} callback : 컨트롤로 쪽의 콜백함수
	 * @param {Function} wrapperFilter : 모델쪽의 데이터 가공 필터 함수
	 * @param {Function} exceptionFilter : 예외처리 필터 함수
	 * @return {void}
	 */
	callbackFormatedData : function(dataFormat, http, callback, wrapperFilter, exceptionFilter){

		skFn.debug.log('skFn.xhr.callbackFormatedData() is called');

		var formatedData = null;

		if(dataFormat=='XMLTEXT_TO_XML'){
			if(http.responseXML){
				formatedData = http.responseXML;
			}
		}else if(dataFormat=='XMLTEXT_TO_JSON'){

		}else if(dataFormat=='JSONTEXT_TO_JSON'){
			if(typeof http.responseText == 'string'){	
				//alert(http.responseText);				
				try{
					formatedData = eval('('+http.responseText+')');
				} catch(e) {
					formatedData = {
									"code":"5000",
									"user_msg": {
												"title": "일시적인 장애입니다.", 
												"contents":"<p class=\"desc_type1\">일시적인 장애로 인하여 선택하신 화면으로 이동하지 못했습니다.<br />이용 중에 불편을 끼쳐드려 진심으로 죄송합니다.<br /><br />잠시 후에 다시 시도해주세요.<br />고맙습니다.</p>"
												},
									"sys_msg":"Internal Server Error",
									"body":"Internal Server Error"
					};
				}
			}
		}else if(dataFormat=='TEXT_TO_TEXT'){
			if(typeof http.responseText == 'string'){
				formatedData = http.responseText;
			}
		}

		// callback 함수 실행 순서 : exceptionFilter -> wrapperFilter -> callback
		if(typeof wrapperFilter=='function'){
			if(typeof exceptionFilter=='function'){
				if(exceptionFilter(formatedData)=='SYSTEM_FAILED_NOTICE_BY_JADE'){
					skFn.debug.log('callback() is not run');
				}else{
					skFn.debug.log('callback() start');
					//예외 추가
					// @박순영
					// 2011년 8월 29일 월요일 오후 2:08:06
					if(typeof callback =='function'){
						callback(wrapperFilter(exceptionFilter(formatedData)));
					}else{
						wrapperFilter(exceptionFilter(formatedData));
					}
					skFn.debug.log('callback() end');
				}
			}else{
				callback(wrapperFilter(formatedData));
			}
		}else{
			callback(formatedData);
		}
	}
}


