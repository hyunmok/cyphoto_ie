/**
 *
 * string.js
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
 * @_history
				[2011-02-17 ���� 4:15:47 / shim]
				
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

skFn.string = {

	/**
	 * Trim
	 * 
	 * @function
	 * @param {String} sString
	 * @return {String}
	 */
	trim : function(sString){
		return sString.replace(/^\s*(.*?)[\s\n]*$/g, '$1');
	},

	/**
	 * get Camelized String
	 * 
	 * @function
	 * @param {String} sString : 'margin-width'
	 * @return {String} : 'marginWidth'
	 */
	camelize : function( sString ) {
		return sString.replace(/\-(.)/g, function(m, l){return l.toUpperCase()});
	},

	/**
	 * String Pad with Prefix
	 * 
	 * @function
	 * @param {String} sString : 123
	 * @param {String} sPad : '0'
	 * @param {Number} nPadLen : 5
	 * @param {Boolean} bPrefix : left | right
	 */
	strpad : function( sString, sPad, nPadLen, bPrefix ){

		var sPadding = '' ;

		sString = sString.toString() ;

		for( var i=0; i<nPadLen; i++ ){
			if(sString.substr(i,1)==''){
				sPadding += sPad;
			}
		}

		if (!bPrefix || bPrefix != 'right') bPrefix = 'left' ;

		if( bPrefix == 'left' ) {
			return sPadding + sString ;
		} else {
			return sString + sPadding ;
		}
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
	},

	microtime : function (get_as_float) {
		// http://kevin.vanzonneveld.net
		// +   original by: Paulo Freitas
		// *     example 1: timeStamp = microtime(true);
		// *     results 1: timeStamp > 1000000000 && timeStamp < 2000000000
		var now = new Date().getTime() / 1000;
		var s = parseInt(now, 10);
		return (get_as_float) ? now : (Math.round((now - s) * 1000) / 1000) + ' ' + s;
	},

	/**
	 * get Random String
	 * 
	 * @function
	 * @param {Number} nBit : 5
	 */
	getRandom : function( nBit ){

		var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
		var sResult = '';
		for (var i=0; i<nBit; i++) {
			var nRandom = Math.floor(Math.random() * chars.length);
			sResult += chars.substring(nRandom,nRandom+1);
		}
		return sResult;
	},

	/**
	 * get Current Milliseconds
	 * 
	 * @function
	 */
	getTimeMSM : function() {

		dDate = new Date() ;

		sR = this.strpad(dDate.getMinutes(),'0',2) + ':' ;
		sR += this.strpad(dDate.getSeconds(),'0',2) + ':' ;
		sR += this.strpad(dDate.getMilliseconds(),'0',3) ;

		return sR ;
	},

	/**
	 * get Current Milliseconds
	 * 
	 * @function
	 */
	getTimeMili : function() {
		dDate = new Date() ;
		sR = this.timestamp()+'.'+this.strpad(dDate.getMilliseconds(),'0',3) ;
		return sR ;
	},

	get_html_translation_table : function (table, quote_style) {
	    // http://kevin.vanzonneveld.net
	    // +   original by: Philip Peterson
	    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	    // +   bugfixed by: noname
	    // +   bugfixed by: Alex
	    // +   bugfixed by: Marco
	    // +   bugfixed by: madipta
	    // +   improved by: KELAN
	    // +   improved by: Brett Zamir (http://brett-zamir.me)
	    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
	    // +      input by: Frank Forte
	    // +   bugfixed by: T.Wild
	    // +      input by: Ratheous
	    // %          note: It has been decided that we're not going to add global
	    // %          note: dependencies to php.js, meaning the constants are not
	    // %          note: real constants, but strings instead. Integers are also supported if someone
	    // %          note: chooses to create the constants themselves.
	    // *     example 1: get_html_translation_table('HTML_SPECIALCHARS');
	    // *     returns 1: {'"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'}
	    
	    var entities = {}, hash_map = {}, decimal = 0, symbol = '';
	    var constMappingTable = {}, constMappingQuoteStyle = {};
	    var useTable = {}, useQuoteStyle = {};
	    
	    // Translate arguments
	    constMappingTable[0]      = 'HTML_SPECIALCHARS';
	    constMappingTable[1]      = 'HTML_ENTITIES';
	    constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
	    constMappingQuoteStyle[2] = 'ENT_COMPAT';
	    constMappingQuoteStyle[3] = 'ENT_QUOTES';
	
	    useTable       = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
	    useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT';
	
	    if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {
	        throw new Error("Table: "+useTable+' not supported');
	        // return false;
	    }
	
	    entities['38'] = '&amp;';
	    if (useTable === 'HTML_ENTITIES') {
	        entities['160'] = '&nbsp;';
	        entities['161'] = '&iexcl;';
	        entities['162'] = '&cent;';
	        entities['163'] = '&pound;';
	        entities['164'] = '&curren;';
	        entities['165'] = '&yen;';
	        entities['166'] = '&brvbar;';
	        entities['167'] = '&sect;';
	        entities['168'] = '&uml;';
	        entities['169'] = '&copy;';
	        entities['170'] = '&ordf;';
	        entities['171'] = '&laquo;';
	        entities['172'] = '&not;';
	        entities['173'] = '&shy;';
	        entities['174'] = '&reg;';
	        entities['175'] = '&macr;';
	        entities['176'] = '&deg;';
	        entities['177'] = '&plusmn;';
	        entities['178'] = '&sup2;';
	        entities['179'] = '&sup3;';
	        entities['180'] = '&acute;';
	        entities['181'] = '&micro;';
	        entities['182'] = '&para;';
	        entities['183'] = '&middot;';
	        entities['184'] = '&cedil;';
	        entities['185'] = '&sup1;';
	        entities['186'] = '&ordm;';
	        entities['187'] = '&raquo;';
	        entities['188'] = '&frac14;';
	        entities['189'] = '&frac12;';
	        entities['190'] = '&frac34;';
	        entities['191'] = '&iquest;';
	        entities['192'] = '&Agrave;';
	        entities['193'] = '&Aacute;';
	        entities['194'] = '&Acirc;';
	        entities['195'] = '&Atilde;';
	        entities['196'] = '&Auml;';
	        entities['197'] = '&Aring;';
	        entities['198'] = '&AElig;';
	        entities['199'] = '&Ccedil;';
	        entities['200'] = '&Egrave;';
	        entities['201'] = '&Eacute;';
	        entities['202'] = '&Ecirc;';
	        entities['203'] = '&Euml;';
	        entities['204'] = '&Igrave;';
	        entities['205'] = '&Iacute;';
	        entities['206'] = '&Icirc;';
	        entities['207'] = '&Iuml;';
	        entities['208'] = '&ETH;';
	        entities['209'] = '&Ntilde;';
	        entities['210'] = '&Ograve;';
	        entities['211'] = '&Oacute;';
	        entities['212'] = '&Ocirc;';
	        entities['213'] = '&Otilde;';
	        entities['214'] = '&Ouml;';
	        entities['215'] = '&times;';
	        entities['216'] = '&Oslash;';
	        entities['217'] = '&Ugrave;';
	        entities['218'] = '&Uacute;';
	        entities['219'] = '&Ucirc;';
	        entities['220'] = '&Uuml;';
	        entities['221'] = '&Yacute;';
	        entities['222'] = '&THORN;';
	        entities['223'] = '&szlig;';
	        entities['224'] = '&agrave;';
	        entities['225'] = '&aacute;';
	        entities['226'] = '&acirc;';
	        entities['227'] = '&atilde;';
	        entities['228'] = '&auml;';
	        entities['229'] = '&aring;';
	        entities['230'] = '&aelig;';
	        entities['231'] = '&ccedil;';
	        entities['232'] = '&egrave;';
	        entities['233'] = '&eacute;';
	        entities['234'] = '&ecirc;';
	        entities['235'] = '&euml;';
	        entities['236'] = '&igrave;';
	        entities['237'] = '&iacute;';
	        entities['238'] = '&icirc;';
	        entities['239'] = '&iuml;';
	        entities['240'] = '&eth;';
	        entities['241'] = '&ntilde;';
	        entities['242'] = '&ograve;';
	        entities['243'] = '&oacute;';
	        entities['244'] = '&ocirc;';
	        entities['245'] = '&otilde;';
	        entities['246'] = '&ouml;';
	        entities['247'] = '&divide;';
	        entities['248'] = '&oslash;';
	        entities['249'] = '&ugrave;';
	        entities['250'] = '&uacute;';
	        entities['251'] = '&ucirc;';
	        entities['252'] = '&uuml;';
	        entities['253'] = '&yacute;';
	        entities['254'] = '&thorn;';
	        entities['255'] = '&yuml;';
	    }
	
	    if (useQuoteStyle !== 'ENT_NOQUOTES') {
	        entities['34'] = '&quot;';
	    }
	    if (useQuoteStyle === 'ENT_QUOTES') {
	        entities['39'] = '&#39;';
	    }
	    entities['60'] = '&lt;';
	    entities['62'] = '&gt;';
	
	
	    // ascii decimals to real symbols
	    for (decimal in entities) {
	        symbol = String.fromCharCode(decimal);
	        hash_map[symbol] = entities[decimal];
	    }
	    
	    return hash_map;
	},

	html_entity_decode : function (string, quote_style) {
	    // http://kevin.vanzonneveld.net
	    // +   original by: john (http://www.jd-tech.net)
	    // +      input by: ger
	    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	    // +   bugfixed by: Onno Marsman
	    // +   improved by: marc andreu
	    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	    // +      input by: Ratheous
	    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
	    // +      input by: Nick Kolosov (http://sammy.ru)
	    // +   bugfixed by: Fox
	    // -    depends on: get_html_translation_table
	    // *     example 1: html_entity_decode('Kevin &amp; van Zonneveld');
	    // *     returns 1: 'Kevin & van Zonneveld'
	    // *     example 2: html_entity_decode('&amp;lt;');
	    // *     returns 2: '&lt;'
	
	    var hash_map = {}, symbol = '', tmp_str = '', entity = '';
	    tmp_str = string.toString();
	    
	    if (false === (hash_map = this.get_html_translation_table('HTML_ENTITIES', quote_style))) {
	        return false;
	    }
	
	    // fix &amp; problem
	    // http://phpjs.org/functions/get_html_translation_table:416#comment_97660
	    delete(hash_map['&']);
	    hash_map['&'] = '&amp;';
	
	    for (symbol in hash_map) {
	        entity = hash_map[symbol];
	        tmp_str = tmp_str.split(entity).join(symbol);
	    }
	    tmp_str = tmp_str.split('&#039;').join("'");
	    
	    return tmp_str;
	},

	urldecode : function (str) {
	    // Decodes URL-encoded string  
	    // 
	    // version: 1102.614
	    // discuss at: http://phpjs.org/functions/urldecode    // +   original by: Philip Peterson
	    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	    // +      input by: AJ
	    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	    // +   improved by: Brett Zamir (http://brett-zamir.me)    // +      input by: travc
	    // +      input by: Brett Zamir (http://brett-zamir.me)
	    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	    // +   improved by: Lars Fischer
	    // +      input by: Ratheous    // +   improved by: Orlando
	    // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
	    // +      bugfixed by: Rob
	    // +      input by: e-mike
	    // +   improved by: Brett Zamir (http://brett-zamir.me)    // %        note 1: info on what encoding functions to use from: http://xkr.us/articles/javascript/encode-compare/
	    // %        note 2: Please be aware that this function expects to decode from UTF-8 encoded strings, as found on
	    // %        note 2: pages served as UTF-8
	    // *     example 1: urldecode('Kevin+van+Zonneveld%21');
	    // *     returns 1: 'Kevin van Zonneveld!'    // *     example 2: urldecode('http%3A%2F%2Fkevin.vanzonneveld.net%2F');
	    // *     returns 2: 'http://kevin.vanzonneveld.net/'
	    // *     example 3: urldecode('http%3A%2F%2Fwww.google.nl%2Fsearch%3Fq%3Dphp.js%26ie%3Dutf-8%26oe%3Dutf-8%26aq%3Dt%26rls%3Dcom.ubuntu%3Aen-US%3Aunofficial%26client%3Dfirefox-a');
	    // *     returns 3: 'http://www.google.nl/search?q=php.js&ie=utf-8&oe=utf-8&aq=t&rls=com.ubuntu:en-US:unofficial&client=firefox-a'
	    return decodeURIComponent((str + '').replace(/\+/g, '%20')); 
	},

	strip_tags : function(input, allowed) {
	    // http://kevin.vanzonneveld.net
	    // +      input by: Evertjan Garretsen
	    // +    revised by: Rafa�� Kukawski (http://blog.kukawski.pl/)
	    // *     example 1: strip_tags('<p>Kevin</p> <br /><b>van</b> <i>Zonneveld</i>', '<i><b>');
	    // *     returns 1: 'Kevin <b>van</b> <i>Zonneveld</i>'
	    // *     example 2: strip_tags('<p>Kevin <img src="someimage.png" onmouseover="someFunction()">van <i>Zonneveld</i></p>', '<p>');
	    // *     returns 2: '<p>Kevin van Zonneveld</p>'
	    // *     example 3: strip_tags("<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>", "<a>");
	    // *     returns 3: '<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>'
	    // *     example 4: strip_tags('1 < 5 5 > 1');
	    // *     returns 4: '1 < 5 5 > 1'
	    // *     example 5: strip_tags('1 <br/> 1');
	    // *     returns 5: '1  1'
	    // *     example 6: strip_tags('1 <br/> 1', '<br>');
	    // *     returns 6: '1  1'
	    // *     example 7: strip_tags('1 <br/> 1', '<br><br/>');
	    // *     returns 7: '1 <br/> 1'

		   allowed = (((allowed || "") + "")
		      .toLowerCase()
		      .match(/<[a-z][a-z0-9]*>/g) || [])
		      .join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
		   var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
		       commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
		   return input.replace(commentsAndPhpTags, '').replace(tags, function($0, $1){
		      return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
		   });
	},

	str_replace : function (search, replace, subject, count) {
		// http://kevin.vanzonneveld.net
		// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// +   improved by: Gabriel Paderni
		// +   improved by: Philip Peterson
		// +   improved by: Simon Willison (http://simonwillison.net)
		// +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
		// +   bugfixed by: Anton Ongson
		// +      input by: Onno Marsman
		// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// +    tweaked by: Onno Marsman
		// +      input by: Brett Zamir (http://brett-zamir.me)
		// +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// +   input by: Oleg Eremeev
		// +   improved by: Brett Zamir (http://brett-zamir.me)
		// +   bugfixed by: Oleg Eremeev
		// %          note 1: The count parameter must be passed as a string in order
		// %          note 1:  to find a global variable in which the result will be given
		// *     example 1: str_replace(' ', '.', 'Kevin van Zonneveld');
		// *     returns 1: 'Kevin.van.Zonneveld'
		// *     example 2: str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars');
		// *     returns 2: 'hemmo, mars'

		var i = 0, j = 0, temp = '', repl = '', sl = 0, fl = 0,
				f = [].concat(search),
				r = [].concat(replace),
				s = subject,
				ra = r instanceof Array, sa = s instanceof Array;
		s = [].concat(s);
		if (count) {
			this.window[count] = 0;
		}

		for (i=0, sl=s.length; i < sl; i++) {
			if (s[i] === '') {
				continue;
			}
			for (j=0, fl=f.length; j < fl; j++) {
				temp = s[i]+'';
				repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
				s[i] = (temp).split(f[j]).join(repl);
				if (count && s[i] !== temp) {
					this.window[count] += (temp.length-s[i].length)/f[j].length;}
			}
		}
		return sa ? s : s[0];
	},

	parse_url : function (str, component) {
	    // Parse a URL and return its components  
	    // 
	    // version: 1102.614
	    // discuss at: http://phpjs.org/functions/parse_url    // +      original by: Steven Levithan (http://blog.stevenlevithan.com)
	    // + reimplemented by: Brett Zamir (http://brett-zamir.me)
	    // %          note: Based on http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js
	    // %          note: blog post at http://blog.stevenlevithan.com/archives/parseuri
	    // %          note: demo at http://stevenlevithan.com/demo/parseuri/js/assets/parseuri.js    // %          note: Does not replace invaild characters with '_' as in PHP, nor does it return false with
	    // %          note: a seriously malformed URL.
	    // %          note: Besides function name, is the same as parseUri besides the commented out portion
	    // %         note: and the additional section following, as well as our allowing an extra slash after
	    // %          note: the scheme/protocol (to allow file:/// as in PHP)    // *     example 1: parse_url('http://username:password@hostname/path?arg=value#anchor');
	    // *     returns 1: {scheme: 'http', host: 'hostname', user: 'username', pass: 'password', path: '/path', query: 'arg=value', fragment: 'anchor'}
	    var o = {
	        strictMode: false,
	        key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],        q: {
	            name: "queryKey",
	            parser: /(?:^|&)([^&=]*)=?([^&]*)/g
	        },
	        parser: {            strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
	            loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // Added one optional slash to post-protocol to catch file:/// (should restrict this)
	        }
	    };
	     var m = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
	        uri = {},
	        i = 14;
	    while (i--) {
	        uri[o.key[i]] = m[i] || "";    }
	    // Uncomment the following to use the original more detailed (non-PHP) script
	/*
	        uri[o.q.name] = {};
	        uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {        if ($1) {uri[o.q.name][$1] = $2;}
	        });
	        return uri;
	    */
	     switch (component) {
		    case 'PHP_URL_SCHEME':
		        return uri.protocol;
		    case 'PHP_URL_HOST':
		        return uri.host;    case 'PHP_URL_PORT':
		        return uri.port;
		    case 'PHP_URL_USER':
		        return uri.user;
		    case 'PHP_URL_PASS':        return uri.password;
		    case 'PHP_URL_PATH':
		        return uri.path;
		    case 'PHP_URL_QUERY':
		        return uri.query;    case 'PHP_URL_FRAGMENT':
		        return uri.anchor;
		    default:
		        var retArr = {};
		        if (uri.protocol !== '') {            retArr.scheme = uri.protocol;
		        }
		        if (uri.host !== '') {
		            retArr.host = uri.host;
		        }        if (uri.port !== '') {
		            retArr.port = uri.port;
		        }
		        if (uri.user !== '') {
		            retArr.user = uri.user;        }
		        if (uri.password !== '') {
		            retArr.pass = uri.password;
		        }
		        if (uri.path !== '') {            retArr.path = uri.path;
		        }
		        if (uri.query !== '') {
		            retArr.query = uri.query;
		        }        if (uri.anchor !== '') {
		            retArr.fragment = uri.anchor;
		        }
		        return retArr;
	    }
	}, 

	parse_str : function (str, array) {
	    // Parses GET/POST/COOKIE data and sets global variables  
	    // 
	    // version: 1102.614
	    // discuss at: http://phpjs.org/functions/parse_str    // +   original by: Cagri Ekin
	    // +   improved by: Michael White (http://getsprink.com)
	    // +    tweaked by: Jack
	    // +   bugfixed by: Onno Marsman
	    // +   reimplemented by: stag019    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
	    // +   bugfixed by: stag019
	    // -    depends on: urldecode
	    // +   input by: Dreamer
	    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)    // %        note 1: When no argument is specified, will put variables in global scope.
	    // *     example 1: var arr = {};
	    // *     example 1: parse_str('first=foo&second=bar', arr);
	    // *     results 1: arr == { first: 'foo', second: 'bar' }
	    // *     example 2: var arr = {};    // *     example 2: parse_str('str_a=Jack+and+Jill+didn%27t+see+the+well.', arr);
	    // *     results 2: arr == { str_a: "Jack and Jill didn't see the well." }
	    var glue1 = '=',
	        glue2 = '&',
	        array2 = String(str).replace(/^&?([\s\S]*?)&?$/, '$1').split(glue2),        i, j, chr, tmp, key, value, bracket, keys, evalStr, that = this,
	        fixStr = function (str) {
	            return that.urldecode(str).replace(/([\\"'])/g, '\\$1').replace(/\n/g, '\\n').replace(/\r/g, '\\r');
	        };
	     if (!array) {
	        array = this.window;
	    }
	 
	    for (i = 0; i < array2.length; i++) {        tmp = array2[i].split(glue1);
	        if (tmp.length < 2) {
	            tmp = [tmp, ''];
	        }
	        key = fixStr(tmp[0]);        value = fixStr(tmp[1]);
	        while (key.charAt(0) === ' ') {
	            key = key.substr(1);
	        }
	        if (key.indexOf('\0') !== -1) {            key = key.substr(0, key.indexOf('\0'));
	        }
	        if (key && key.charAt(0) !== '[') {
	            keys = [];
	            bracket = 0;            for (j = 0; j < key.length; j++) {
	                if (key.charAt(j) === '[' && !bracket) {
	                    bracket = j + 1;
	                } else if (key.charAt(j) === ']') {
	                    if (bracket) {                        if (!keys.length) {
	                            keys.push(key.substr(0, bracket - 1));
	                        }
	                        keys.push(key.substr(bracket, j - bracket));
	                        bracket = 0;                        if (key.charAt(j + 1) !== '[') {
	                            break;
	                        }
	                    }
	                }            }
	            if (!keys.length) {
	                keys = [key];
	            }
	            for (j = 0; j < keys[0].length; j++) {                chr = keys[0].charAt(j);
	                if (chr === ' ' || chr === '.' || chr === '[') {
	                    keys[0] = keys[0].substr(0, j) + '_' + keys[0].substr(j + 1);
	                }
	                if (chr === '[') {                    break;
	                }
	            }
	            evalStr = 'array';
	            for (j = 0; j < keys.length; j++) {                key = keys[j];
	                if ((key !== '' && key !== ' ') || j === 0) {
	                    key = "'" + key + "'";
	                } else {
	                    key = eval(evalStr + '.push([]);') - 1;                }
	                evalStr += '[' + key + ']';
	                if (j !== keys.length - 1 && eval('typeof ' + evalStr) === 'undefined') {
	                    eval(evalStr + ' = [];');
	                }            }
	            evalStr += " = '" + value + "';\n";
	            eval(evalStr);
	        }
	    }
	}, 
	
	parse_UrlStr : function (str) {
		var urlQuerystr	=	this.parse_url(location.href);
		var arr = {};

		this.parse_str(urlQuerystr.query, arr);

		return arr;
	}, 

	/**
	 * 문자열에서 파일명을 검출
	 * @param {String} str
	 * @return {String}
	 */
	getFileName : function(str){
		var urlArray = this.parse_url(str);
		pathArray = urlArray.path.split('/');
		return pathArray[pathArray.length-1]
	},

	md5 : function(str) {
	    // http://kevin.vanzonneveld.net
	    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
	    // + namespaced by: Michael White (http://getsprink.com)
	    // +    tweaked by: Jack
	    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	    // +      input by: Brett Zamir (http://brett-zamir.me)
	    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	    // -    depends on: utf8_encode
	    // *     example 1: md5('Kevin van Zonneveld');
	    // *     returns 1: '6e658d4bfcb59cc13f96c14450ac40b9'
	
	    var xl;
	
	    var rotateLeft = function (lValue, iShiftBits) {
	        return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
	    };
	
	    var addUnsigned = function (lX,lY) {
	        var lX4,lY4,lX8,lY8,lResult;
	        lX8 = (lX & 0x80000000);
	        lY8 = (lY & 0x80000000);
	        lX4 = (lX & 0x40000000);
	        lY4 = (lY & 0x40000000);
	        lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
	        if (lX4 & lY4) {
	            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
	        }
	        if (lX4 | lY4) {
	            if (lResult & 0x40000000) {
	                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
	            } else {
	                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
	            }
	        } else {
	            return (lResult ^ lX8 ^ lY8);
	        }
	    };
	
	    var _F = function (x,y,z) { return (x & y) | ((~x) & z); };
	    var _G = function (x,y,z) { return (x & z) | (y & (~z)); };
	    var _H = function (x,y,z) { return (x ^ y ^ z); };
	    var _I = function (x,y,z) { return (y ^ (x | (~z))); };
	
	    var _FF = function (a,b,c,d,x,s,ac) {
	        a = addUnsigned(a, addUnsigned(addUnsigned(_F(b, c, d), x), ac));
	        return addUnsigned(rotateLeft(a, s), b);
	    };
	
	    var _GG = function (a,b,c,d,x,s,ac) {
	        a = addUnsigned(a, addUnsigned(addUnsigned(_G(b, c, d), x), ac));
	        return addUnsigned(rotateLeft(a, s), b);
	    };
	
	    var _HH = function (a,b,c,d,x,s,ac) {
	        a = addUnsigned(a, addUnsigned(addUnsigned(_H(b, c, d), x), ac));
	        return addUnsigned(rotateLeft(a, s), b);
	    };
	
	    var _II = function (a,b,c,d,x,s,ac) {
	        a = addUnsigned(a, addUnsigned(addUnsigned(_I(b, c, d), x), ac));
	        return addUnsigned(rotateLeft(a, s), b);
	    };
	
	    var convertToWordArray = function (str) {
	        var lWordCount;
	        var lMessageLength = str.length;
	        var lNumberOfWords_temp1=lMessageLength + 8;
	        var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
	        var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
	        var lWordArray=new Array(lNumberOfWords-1);
	        var lBytePosition = 0;
	        var lByteCount = 0;
	        while ( lByteCount < lMessageLength ) {
	            lWordCount = (lByteCount-(lByteCount % 4))/4;
	            lBytePosition = (lByteCount % 4)*8;
	            lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount)<<lBytePosition));
	            lByteCount++;
	        }
	        lWordCount = (lByteCount-(lByteCount % 4))/4;
	        lBytePosition = (lByteCount % 4)*8;
	        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
	        lWordArray[lNumberOfWords-2] = lMessageLength<<3;
	        lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
	        return lWordArray;
	    };
	
	    var wordToHex = function (lValue) {
	        var wordToHexValue="",wordToHexValue_temp="",lByte,lCount;
	        for (lCount = 0;lCount<=3;lCount++) {
	            lByte = (lValue>>>(lCount*8)) & 255;
	            wordToHexValue_temp = "0" + lByte.toString(16);
	            wordToHexValue = wordToHexValue + wordToHexValue_temp.substr(wordToHexValue_temp.length-2,2);
	        }
	        return wordToHexValue;
	    };
	
	    var x=[],
	        k,AA,BB,CC,DD,a,b,c,d,
	        S11=7, S12=12, S13=17, S14=22,
	        S21=5, S22=9 , S23=14, S24=20,
	        S31=4, S32=11, S33=16, S34=23,
	        S41=6, S42=10, S43=15, S44=21;
	
	    str = this.utf8_encode(str);
	    x = convertToWordArray(str);
	    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
	    
	    xl = x.length;
	    for (k=0;k<xl;k+=16) {
	        AA=a; BB=b; CC=c; DD=d;
	        a=_FF(a,b,c,d,x[k+0], S11,0xD76AA478);
	        d=_FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
	        c=_FF(c,d,a,b,x[k+2], S13,0x242070DB);
	        b=_FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
	        a=_FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
	        d=_FF(d,a,b,c,x[k+5], S12,0x4787C62A);
	        c=_FF(c,d,a,b,x[k+6], S13,0xA8304613);
	        b=_FF(b,c,d,a,x[k+7], S14,0xFD469501);
	        a=_FF(a,b,c,d,x[k+8], S11,0x698098D8);
	        d=_FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
	        c=_FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
	        b=_FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
	        a=_FF(a,b,c,d,x[k+12],S11,0x6B901122);
	        d=_FF(d,a,b,c,x[k+13],S12,0xFD987193);
	        c=_FF(c,d,a,b,x[k+14],S13,0xA679438E);
	        b=_FF(b,c,d,a,x[k+15],S14,0x49B40821);
	        a=_GG(a,b,c,d,x[k+1], S21,0xF61E2562);
	        d=_GG(d,a,b,c,x[k+6], S22,0xC040B340);
	        c=_GG(c,d,a,b,x[k+11],S23,0x265E5A51);
	        b=_GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
	        a=_GG(a,b,c,d,x[k+5], S21,0xD62F105D);
	        d=_GG(d,a,b,c,x[k+10],S22,0x2441453);
	        c=_GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
	        b=_GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
	        a=_GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
	        d=_GG(d,a,b,c,x[k+14],S22,0xC33707D6);
	        c=_GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
	        b=_GG(b,c,d,a,x[k+8], S24,0x455A14ED);
	        a=_GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
	        d=_GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
	        c=_GG(c,d,a,b,x[k+7], S23,0x676F02D9);
	        b=_GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
	        a=_HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
	        d=_HH(d,a,b,c,x[k+8], S32,0x8771F681);
	        c=_HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
	        b=_HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
	        a=_HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
	        d=_HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
	        c=_HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
	        b=_HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
	        a=_HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
	        d=_HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
	        c=_HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
	        b=_HH(b,c,d,a,x[k+6], S34,0x4881D05);
	        a=_HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
	        d=_HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
	        c=_HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
	        b=_HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
	        a=_II(a,b,c,d,x[k+0], S41,0xF4292244);
	        d=_II(d,a,b,c,x[k+7], S42,0x432AFF97);
	        c=_II(c,d,a,b,x[k+14],S43,0xAB9423A7);
	        b=_II(b,c,d,a,x[k+5], S44,0xFC93A039);
	        a=_II(a,b,c,d,x[k+12],S41,0x655B59C3);
	        d=_II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
	        c=_II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
	        b=_II(b,c,d,a,x[k+1], S44,0x85845DD1);
	        a=_II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
	        d=_II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
	        c=_II(c,d,a,b,x[k+6], S43,0xA3014314);
	        b=_II(b,c,d,a,x[k+13],S44,0x4E0811A1);
	        a=_II(a,b,c,d,x[k+4], S41,0xF7537E82);
	        d=_II(d,a,b,c,x[k+11],S42,0xBD3AF235);
	        c=_II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
	        b=_II(b,c,d,a,x[k+9], S44,0xEB86D391);
	        a=addUnsigned(a,AA);
	        b=addUnsigned(b,BB);
	        c=addUnsigned(c,CC);
	        d=addUnsigned(d,DD);
	    }
	
	    var temp = wordToHex(a)+wordToHex(b)+wordToHex(c)+wordToHex(d);
	
	    return temp.toLowerCase();
	},

	utf8_encode : function( argString ) {
	    // http://kevin.vanzonneveld.net
	    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
	    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	    // +   improved by: sowberry
	    // +    tweaked by: Jack
	    // +   bugfixed by: Onno Marsman
	    // +   improved by: Yves Sucaet
	    // +   bugfixed by: Onno Marsman
	    // +   bugfixed by: Ulrich
	    // *     example 1: utf8_encode('Kevin van Zonneveld');
	    // *     returns 1: 'Kevin van Zonneveld'
	
	    var string = (argString+''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
	
	    var utftext = "";
	    var start, end;
	    var stringl = 0;
	
	    start = end = 0;
	    stringl = string.length;
	    for (var n = 0; n < stringl; n++) {
	        var c1 = string.charCodeAt(n);
	        var enc = null;
	
	        if (c1 < 128) {
	            end++;
	        } else if (c1 > 127 && c1 < 2048) {
	            enc = String.fromCharCode((c1 >> 6) | 192) + String.fromCharCode((c1 & 63) | 128);
	        } else {
	            enc = String.fromCharCode((c1 >> 12) | 224) + String.fromCharCode(((c1 >> 6) & 63) | 128) + String.fromCharCode((c1 & 63) | 128);
	        }
	        if (enc !== null) {
	            if (end > start) {
	                utftext += string.substring(start, end);
	            }
	            utftext += enc;
	            start = end = n+1;
	        }
	    }
	
	    if (end > start) {
	        utftext += string.substring(start, string.length);
	    }

	    return utftext;
	}
}


