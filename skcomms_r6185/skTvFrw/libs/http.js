/**
 *
 * http.js
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
 * @_abstract		http 프로토콜 관련 라이브러리
 * @_final			
 * @_internal
 * @_history
				[2011-04-08 오후 6:44:21]
				
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

skFn.http = {

	/**
	 * setCookie
	 * 
	 * @function
	 * @param {String} key
	 * @param {String} value
	 * @param {String} expireDays
	 */
	setCookie : function(key, value, expireDays){
		var oDate = new Date() ;
		oDate.setDate(oDate.getDate() + expireDays) ;
		document.cookie = key + '=' + escape(value) + ' ; expires=' + oDate.toGMTString() + ' ; path=/ ; ' ;
	},

	/**
	 * getCookie
	 * 
	 * @function
	 * @param {String} key
	 * @return {String}
	 */
	getCookie : function(key){
		var nameOfCookie = key + "=";
		var x = 0;
		while ( x <= document.cookie.length ){
			var y = (x+nameOfCookie.length);
			if ( document.cookie.substring( x, y ) == nameOfCookie ) {
				if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 )
					endOfCookie = document.cookie.length;
				return unescape( document.cookie.substring( y, endOfCookie ) );
			}
			x = document.cookie.indexOf( " ", x ) + 1;
			if ( x == 0 )
				break;
		}
		return '';

	}
}