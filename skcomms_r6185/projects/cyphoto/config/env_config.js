/**
 *
 * env_config.js
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
 * @_date			2011-01-11 오후 7:18:31
 * 
 * @internal ************************* [ file info. end ] *********************************
 */



var skEnv = {

	api : {

		isDev : false
	},

	debug : {

		// 
		useHttpLog : false,

		// 로그 범위 (0:로그를 표시안함, 1:필수로그만 표시, 2:모든 로그를 표시)
		logLevel : 0,

		// 테스트 아이디
		testUserid : '',

		// 테스트 비번
		testPassword : ''
	},

	version : {
		app : '',
		svn : '',
		releaseDate : ''
	},

	device : {
		modeIId : 'LG',
		firmware : ''
	}
}


