/**
 *
 * api_config.js
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

	[SERVICE]_[CATEGORY]__[API] = ''; // var ���Ͽ� ����� �����Ѵ�

 * @_todo			
 * @_tutorial		
 * @_version		
 * @_abstract
 * @_final			
 * @_internal
 * @_history
				[2011-02-08 ���� 4:00:05  / shim]
				1. ��� ��Ģ ����
				2. ȯ�溯�� skEnv.api.isDev ���
 * 
 * @internal ************************* [ file info. end ] *********************************
 */



// 개발 모드
if(skEnv.api.isDev==true){
	URI_GET_API_DATA = 'http://tvapps.skcomms.co.kr/skcomms/php/TVGateway.php'
	URI_GET_TOKEN_DATA = 'http://tvapps.skcomms.co.kr/skcomms/php/TVGetAccessToken.php'
// 라이브 모드
}else{
	//라이브
	if(document.domain.toLowerCase() == "lg.tvapp.nate.com") {
		URI_GET_API_DATA = 'http://gateway.tvapp.nate.com/common/1.1/TVGateway.php';
		URI_GET_TOKEN_DATA = 'http://gateway.tvapp.nate.com/common/1.1/TVAuth.php';
	} 
	//스테이지
	else {
		URI_GET_API_DATA = 'http://gateway.stage.tvapp.nate.com/common/1.1/TVGateway.php';
		URI_GET_TOKEN_DATA = 'http://gateway.stage.tvapp.nate.com/common/1.1/TVAuth.php';
		//URI_GET_API_DATA = 'http://'+document.location.hostname+':'+document.location.port+'/skcomms/php/TVGateway.php'
		//URI_GET_TOKEN_DATA = 'http://'+document.location.hostname+':'+document.location.port+'/skcomms/php/TVGetAccessToken.php'
	}
}