/**
 *
 * Common Libs
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
 * 
 * @internal ************************* [ file info. end ] *********************************
 */


	/**
	 * > 일반 함수들의 클래스
	 * 
	 */ 
	var xCommon = {

		trim : function(str) { 
			if (!str) return ''; 
			return str.replace(/^\s*|\s*$/g, ''); 
		},
		
		getFullToday : function() {
			var today = new Date();
			var buf = "";
			buf += today.getYear() + "y";
			buf += (today.getMonth() + 1) + "m";
			buf += today.getDate() + "d ";
			buf += today.getHours() + "h";
			buf += today.getMinutes() + "m";
			buf += today.getSeconds() + "s";
			return buf;
		},

		timestamp : function() {
			return Math.floor(new Date().getTime() / 1000);
		}
	}