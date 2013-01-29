/**
 *
 * SKPLoginComponent.js
 *
 * 
 *
 * @internal ************************* [ file info. start ] *********************************
 *
 * @category		
 * @package		
 * @author		Soonyoung Park, <youngp@sk.com>
 * @filesource
 * @fileoverview

 * @_uses		
 * @_todo
				2012-08-27 [13:10:00] @SoonyoungPark

				2012-08-28 [16:31:01] @SoonyoungPark
					리턴 코드 간소화

 * @_tutorial		
 * @_version		
 * @_abstract
 * @_final			
 * @_internal
 * @_date			2012-08-27
 * 
 * @internal ************************* [ file info. end ] *********************************
 */

var SKPLoginComponent = {
	/**
	 * isAccessible
	 *
	 * @param  {String}		xAuth 인증 결과 body string

		ex) "oauth_token=822e731be393ba1a78b1649f6cdbbc5c&oauth_token_secret=20b215e6047cf2a11f065dcd6e460377&CustNM=%EB%B0%95%EC%88%9C%EC%98%81&SSO=NC&STAT_UA3N=e024e8e7e9de8578d3c36a3104dbd1f8&STAT_UA3C=cf69974d69d3e201098886226ab7f175&STAT_UAKD=1&SKP_SSO_TOKEN=04ed8366cd6f45ee98787eb6db9728e6&SKP_NATE_UNITED=Y&SKP_CYWORLD_UNITED=Y"

	 * @param  {String}		제공하는 서비스 type ( "NC" || "NO" || "CO" )
		
		ex) 
			싸이월드 서비스 : "CO",
			네이트 서비스	: "NO",
			둘다 포함		: "NC"

	 
	 * @return {Number}
			-1 = 기타 오류

			 0 = 정상
			 
			 1 = One ID 전환 필요 사용자
			 2 = 약관 동의 필요 사용자

			 
			! SKP Live 이전일 경우 (서버에서 SKP_NATE_UNITED / SKP_CYWORLD_UNITED 를 내려주지 않는 경우)

			 10 = 해당 서비스 이용 불가 사용자 
				
				ex) 
				싸이월드 서비스 : NO 사용자
				네이트 서비스	: CO 사용자
	 */
	isAccessible : function(str, tp){
		try{
			var obj = this.toObj(str);
			var code = 0;
			if (typeof obj === 'object'){
				if (typeof obj["SSO"] === 'string'){
					//NC 지원 서비스의 경우 정상
					if (tp === "NC"){
						code = 0;
					}else{
						//네이트 서비스의 경우
						if (tp === "NO"){
							//사용자가 CO 
							if (obj["SSO"] === "CO"){
								if (typeof obj["SKP_CYWORLD_UNITED"] === "string"){
									if (obj["SKP_CYWORLD_UNITED"] === "N"){
										code = 1;
									}else if (obj["SKP_CYWORLD_UNITED"] === "Y"){
										code = 2;
									}		
								}else{
									code = 10;
								}
							}
						}
						//싸이월드 서비스의 경우
						else if (tp === "CO"){
							//사용자가 NO 
							if (obj["SSO"] === "NO"){
								if (typeof obj["SKP_NATE_UNITED"] === "string"){
									if (obj["SKP_NATE_UNITED"] === "N"){
										code = 1;
									}else if (obj["SKP_NATE_UNITED"] === "Y"){
										code = 2;
									}							
								}else{
									code = 10;
								}
							}
						}else{
							//String Input 오류 (parameter tp Missing)
							code = -1;
						}
					}
				}else{
					//String 결과 오류 (SSO Missing)
					code = -1;
				}
			}else{
				//String 결과 오류
				code = -1;
			}
		}catch(e){
			code = -1;
		}finally{
			return code;
		}
	},
	/**
	 * toObj
	 *
	 * @param  {String}		xAuth 인증 결과 body string
		 ex) "oauth_token=822e731be393ba1a78b1649f6cdbbc5c&oauth_token_secret=20b215e6047cf2a11f065dcd6e460377&CustNM=%EB%B0%95%EC%88%9C%EC%98%81&SSO=NC&STAT_UA3N=e024e8e7e9de8578d3c36a3104dbd1f8&STAT_UA3C=cf69974d69d3e201098886226ab7f175&STAT_UAKD=1&SKP_SSO_TOKEN=04ed8366cd6f45ee98787eb6db9728e6&SKP_NATE_UNITED=Y&SKP_CYWORLD_UNITED=Y"

	 * @param  {object}		xAuth 인증 결과 object

	 * @return {object}
					{
						"oauth_token" : "822e731be393ba1a78b1649f6cdbbc5c",
						"oauth_token_secret" : "20b215e6047cf2a11f065dcd6e460377",
						"CustNM" : "%EB%B0%95%EC%88%9C%EC%98%81",
						"SSO" : "NC",
						"STAT_UA3N" : "e024e8e7e9de8578d3c36a3104dbd1f8",
						"STAT_UA3C" : "cf69974d69d3e201098886226ab7f175",
						"STAT_UAKD" : "1",
						"SKP_SSO_TOKEN" : "04ed8366cd6f45ee98787eb6db9728e6",
						"SKP_NATE_UNITED" : "Y",
						"SKP_CYWORLD_UNITED" : "Y"
					}
	 */
	toObj : function(str){
		var pairs = str.split('&');
		var values = null;
		var obj = {};
		for (var i = 0; i < pairs.length; i++) {
			values = pairs[i].split('=');
			obj[values[0]] = values[1];
		}
		return obj;
	}	
};