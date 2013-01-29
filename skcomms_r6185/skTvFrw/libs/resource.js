/**
 *
 * resource.js
 *
 * 
 *
 * @internal ************************* [ file info. start ] *********************************
 *
 * @category		
 * @package		
 * @author		shim, heung woon <lumiel@skcomms.co.kr>
 * @filesource

 * @_uses		require_once("/some_path/some.js", true);

 * @_todo			
 * @_tutorial		
 * @_version		
 * @_abstract
 * @_final			
 * @_internal
 * @_date			2011-03-18 오후 6:00:04
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

skFn.resource = {

	/**
	 * require
	 *
	 * @param {String} jsFile
	 * @param {Boolean} alwaysReload
	 * @return {String}
	 */
	require : function (jsFile, alwaysReload) {

		var url = "http://" + location.host + jsFile;
		var xhr = null;
		var jsSource = "";
	 
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}

		if( xhr ){
			xhr.open('get', jsFile, false);
			xhr.send(null);
			
			jsSource = xhr.responseText;
		}
	 
		return jsSource;
	},

	/**
	 * require_once
	 *
	 * @param {String} jsFile
	 * @param {Boolean} alwaysReload
	 * @return {String}
	 */
	require_once : function (jsFile, alwaysReload) {

		if (typeof(document.required_list) == "undefined") {
			document.required_list = new Array();
		}
	 
		var isExist = false;
		for (var i = 0; i < document.required_list.length; i++) {
			if (document.required_list[i] == jsFile) {
				isExist = true;
				break;
			}
		}
	 
		if (!isExist) {
			document.required_list.push(jsFile);
			var param = (alwaysReload) ? "?hash=" + Math.random() : "";
			eval(this.require(jsFile + param, this.require_once));
		}
	}
}