/**
 *
 * tv.gateway.js
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

				[2011-03-07 오후 6:44:03 / shim]
				아래와 같이 토큰과 시크릿을 구하라
				query = 'user_id='+user_id+'&x_auth_password='+x_auth_password+'&x_auth_tp='+x_auth_tp+'&requestType=GET_ACCESS_TOKEN'

				[사용법]



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
} else if (typeof window.skTv == 'undefined'){
	window.skTv = {};
}

skTv.gateway = {

	//token : '959c861341461fff9a07e7de2d448c93',//skFn.user.getAccessToken(),
	//token_secret : 'fd725a63a608418ab962052519167d1b',//skFn.user.getAccessTokenSecret(),
	token : skFn.user.getAccessToken(),
	token_secret : skFn.user.getAccessTokenSecret(),

	/*
	 * > API Data 를 access token 을 가지고 억세스하고 가져옴
	 *
	 * @function
	 * @param {Object} p

				<requestType 을 아래에서 고르시오;;;>

				'GET_ACCESS_TOKEN'

				'xml_RetrieveFolderList'
				'xml_RetrievePhotoItemList'
				'xml_RetrievePhotoReplyList'
				'xml_RetrievePhotoItem'
				'xml_RegisterPhotoReply'
				'xml_RemovePhotoReply'
				'xml_RetrievePhotoReplyListBySeq'

				'nxc_get_minihp_info'
				'nxc_get_main_home'
				'nxc_get_main_home_img'
				'nxc_get_my_info'
				'nxc_get_main_home_name'

				'xml_RetrieveOnedegSearchList'
				'xml_RetrievePhotoItemListByRelation'
				'xml_RetrieveMenuOpen'

	 * @return {void}
	 */
	request : function(p){

		skFn.debug.log('skTv.gateway.request({params:~, requestType:\''+p.requestType+'\', callback:~, wrapperFilter:~}) is called');
		// skFn.debug.log(skFn.debug.check(p,'p'));
		skFn.debug.log(skFn.debug.check(p.params,'p.params'));
		skFn.debug.log('p.requestType = ' + p.requestType);

		var requestType = p.requestType;
		var params = p.params;
		var callback = p.callback;
		var wrapperFilter = p.wrapperFilter;

		params.oAuthToken ? this.token = params.oAuthToken : null;
		params.oAuthTokenSecret ? this.token_secret = params.oAuthTokenSecret : null;

		// params 추가
		params.requestType = requestType;
		this.token ? params.oauth_access_token = this.token : null;
		this.token_secret ? params.oauth_token_secret = this.token_secret : null;

		// API 서버
		params.isDev = skEnv.api.isDev;

		// 앱 정보 추가
		params.appId = encodeURIComponent(skEnv.app.id);
		params.agentVer = encodeURIComponent(skEnv.version.agent);
		params.appVer = encodeURIComponent(skEnv.version.agent);
		params.modelId = encodeURIComponent(skEnv.device.modelId);
		params.vendor = encodeURIComponent(skEnv.device.vendor); //통계 이슈로 추가 됨 (6.29 by sophia)
		
		//oauth_nonce & oauth_timestamp 추가
		params.oauth_nonce = encodeURIComponent(skFn.string.md5(Math.random()));
		params.oauth_timestamp = encodeURIComponent(skFn.string.timestamp());

		params.referrer = encodeURIComponent(document.referrer);
		//alert("params.oauth_nonce.length="+params.oauth_nonce.length+"\nparams.oauth_timestamp.length="+params.oauth_timestamp.length);

		skFn.xhr.request({

			httpMethod : 'POST',
			uri : URI_GET_API_DATA,
			params : params,
			dataFormat : 'JSONTEXT_TO_JSON',
			callback : callback,
			wrapperFilter : wrapperFilter,
			exceptionFilter : function(jsonData){
				skFn.debug.log('skTv.gateway.exceptionFilter() is called');
				var isFail = false;
				try{
					// 응답코드를 해석한다
					// skTv.gateway.checkResponseCode(jsonData);
				}catch(e){
					// 응답코드에 따라 장애라면 이곳에서 처리한다
					/*
					'문제발생상황' 을 다음 두가지로 구분하였습니다.
					1. 장애 : API서버가 응답하지 못한 경우
					2. 응답데이터에 따른 처리 : 같은 댓글을 이어서 달았을 때 발생하는 중복방지 처리 등
					*/
					isFail = true;
					skFn.debug.alert ( 'Popup window will be opened > ' + e.message ) ;
				}

				// 장애라면 약속된 문자열을 넘긴다. 해당 문자열이 넘어가면 다음 콜백 함수의 실행을 중지한다.
				if(isFail==true){
					return 'SYSTEM_FAILED_NOTICE_BY_JADE';
				// 정상이라면 원본 데이터를 모델의 wrapperFilter 로 리턴한다
				}else{
					return jsonData;
				}
			}
		});
	},

	/*
	 * > 응답코드를 해석해서 문제가 있으면 예외를 던짐 (0이외에는 모두 장애로 가정)
	 *
	 * @function
	 * @param {Object} p
	 * @return {void}
	 */
	checkResponseCode : function(jsonData){

		skFn.debug.log('skTv.gateway.checkResponseCode() is called');

		// 응답 코드가 0이 아니라면 분기하여 Error 를 상위 catch 블록으로 throw 한다
		switch (jsonData.code) {

			/* ~~~ 오류 케이스를 정리하여야 함. [2011-03-11 오후 7:13:45 /shim] ~~~ */

			case '6401':
				throw new Error('API 서버 연결 실패'); // jsonData.message 또는 문자열을 작성하여 throw 한다
				break;

			case '6402':
				throw new Error('API 서버 연결 실패'); // jsonData.message 또는 문자열을 작성하여 throw 한다
				break;

			case '7200':
				throw new Error('API 서버 연결 실패'); // jsonData.message 또는 문자열을 작성하여 throw 한다
				break;

			case '8400':
				throw new Error('API 서버 연결 실패'); // jsonData.message 또는 문자열을 작성하여 throw 한다
				break;
		}
	}
}


