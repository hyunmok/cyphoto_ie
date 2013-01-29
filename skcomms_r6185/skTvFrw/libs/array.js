/**
 *
 * array.js
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

skFn.array = {

	// 배열여부 리턴 true/false
	isArray : function(object) {

		return Object.prototype.toString.call(object) == '[object Array]';    
	},
		
	implode : function(glue, pieces) {
		// http://kevin.vanzonneveld.net
		// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// +   improved by: Waldo Malqui Silva
		// +   improved by: Itsacon (http://www.itsacon.net/)
		// +   bugfixed by: Brett Zamir (http://brett-zamir.me)
		// *     example 1: implode(' ', ['Kevin', 'van', 'Zonneveld']);
		// *     returns 1: 'Kevin van Zonneveld'
		// *     example 2: implode(' ', {first:'Kevin', last: 'van Zonneveld'});
		// *     returns 2: 'Kevin van Zonneveld'

		var i = '', retVal='', tGlue='';
		if (arguments.length === 1) {
			pieces = glue;
			glue = '';
		}
		if (typeof(pieces) === 'object') {
			if (pieces instanceof Array) {
				return pieces.join(glue);
			}
			else {
				for (i in pieces) {
					retVal += tGlue + pieces[i];
					tGlue = glue;
				}
				return retVal;
			}
		}
		else {
			return pieces;
		}
	},

	array_unique : function(inputArr) {
		// http://kevin.vanzonneveld.net
		// %          note 1: The second argument, sort_flags is not implemented;
		// %          note 1: also should be sorted (asort?) first according to docs
		// *     example 1: array_unique(['Kevin','Kevin','van','Zonneveld','Kevin']);
		// *     returns 1: {0: 'Kevin', 2: 'van', 3: 'Zonneveld'}
		// *     example 2: array_unique({'a': 'green', 0: 'red', 'b': 'green', 1: 'blue', 2: 'red'});
		// *     returns 2: {a: 'green', 0: 'red', 1: 'blue'}
		
		var key = '', tmp_arr2 = {}, val = '';
		
		var __array_search = function (needle, haystack) {
			var fkey = '';
			for (fkey in haystack) {
				if (haystack.hasOwnProperty(fkey)) {
					if ((haystack[fkey] + '') === (needle + '')) {
						return fkey;
					}
				}
			}
			return false;
		};
		
		for (key in inputArr) {
			if (inputArr.hasOwnProperty(key)) {
				val = inputArr[key];
				if (false === __array_search(val, tmp_arr2)) {
					tmp_arr2[key] = val;
				}
			}
		}
		
		return tmp_arr2;
	},

	array_merge : function() {
		// http://kevin.vanzonneveld.net
		// +   original by: Brett Zamir (http://brett-zamir.me)
		// +   bugfixed by: Nate
		// +   input by: josh
		// +   bugfixed by: Brett Zamir (http://brett-zamir.me)
		// *     example 1: arr1 = {"color": "red", 0: 2, 1: 4}
		// *     example 1: arr2 = {0: "a", 1: "b", "color": "green", "shape": "trapezoid", 2: 4}
		// *     example 1: array_merge(arr1, arr2)
		// *     returns 1: {"color": "green", 0: 2, 1: 4, 2: "a", 3: "b", "shape": "trapezoid", 4: 4}
		// *     example 2: arr1 = []
		// *     example 2: arr2 = {1: "data"}
		// *     example 2: array_merge(arr1, arr2)
		// *     returns 2: {0: "data"}
		
		var args = Array.prototype.slice.call(arguments),
								retObj = {}, k, j = 0, i = 0, retArr = true;
		
		for (i=0; i < args.length; i++) {
			if (!(args[i] instanceof Array)) {
				retArr=false;
				break;
			}
		}
		
		if (retArr) {
			retArr = [];
			for (i=0; i < args.length; i++) {
				retArr = retArr.concat(args[i]);
			}
			return retArr;
		}
		var ct = 0;
		
		for (i=0, ct=0; i < args.length; i++) {
			if (args[i] instanceof Array) {
				for (j=0; j < args[i].length; j++) {
					retObj[ct++] = args[i][j];
				}
			} else {
				for (k in args[i]) {
					if (args[i].hasOwnProperty(k)) {
						if (parseInt(k, 10)+'' === k) {
							retObj[ct++] = args[i][k];
						} else {
							retObj[k] = args[i][k];
						}
					}
				}
			}
		}
		return retObj;
	},

	array_slice : function(arr, offst, lgth, preserve_keys) {
	    // http://kevin.vanzonneveld.net
	    // +   original by: Brett Zamir (http://brett-zamir.me)
	    // -    depends on: is_int
	    // +      input by: Brett Zamir (http://brett-zamir.me)
	    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	    // %          note: Relies on is_int because !isNaN accepts floats 
	    // *     example 1: array_slice(["a", "b", "c", "d", "e"], 2, -1);
	    // *     returns 1: {0: 'c', 1: 'd'}
	    // *     example 2: array_slice(["a", "b", "c", "d", "e"], 2, -1, true);
	    // *     returns 2: {2: 'c', 3: 'd'}

	    /*
	    if ('callee' in arr && 'length' in arr) {
		arr = Array.prototype.slice.call(arr);
	    }
	    */
	   
	    var key = '';

	    if (!(arr instanceof Array) || (preserve_keys && offst !== 0)) { // Assoc. array as input or if required as output
		var lgt =0, newAssoc = {};
		for (key in arr) {
		    //if (key !== 'length') {
		    lgt += 1;
		    newAssoc[key] = arr[key];
		    //}
		}
		arr = newAssoc;

		offst = (offst < 0) ? lgt + offst : offst;
		lgth  = lgth === undefined ? lgt : (lgth < 0) ? lgt + lgth - offst : lgth;

		var assoc = {};
		var start = false, it=-1, arrlgth=0, no_pk_idx=0;
		for (key in arr) {
		    ++it;
		    if (arrlgth >= lgth) {
			break;
		    }
		    if (it == offst){
			start = true;
		    }
		    if (!start) {
			continue;
		    }
		    ++arrlgth;
		    if (this.is_int(key) && !preserve_keys) {
			assoc[no_pk_idx++] = arr[key];
		    } else {
			assoc[key] = arr[key];
		    }
		}
		//assoc.length = arrlgth; // Make as array-like object (though length will not be dynamic)
		return assoc;
	    }
	    
	    if (lgth === undefined) {
		return arr.slice(offst);    
	    } else if (lgth >= 0) {
		return arr.slice(offst, offst + lgth);
	    } else {
		return arr.slice(offst, lgth);
	    }
	},

	asort : function(inputArr, sort_flags) {
	
		// http://kevin.vanzonneveld.net
		// +   original by: Brett Zamir (http://brett-zamir.me)
		// +   improved by: Brett Zamir (http://brett-zamir.me)
		// +   input by: paulo kuong
		// +   improved by: Brett Zamir (http://brett-zamir.me)
		// +   bugfixed by: Adam Wallner (http://web2.bitbaro.hu/)
		// %        note 1: SORT_STRING (as well as natsort and natcasesort) might also be
		// %        note 1: integrated into all of these functions by adapting the code at
		// %        note 1: http://sourcefrog.net/projects/natsort/natcompare.js
		// %        note 2: The examples are correct, this is a new way
		// %        note 2: Credits to: http://javascript.internet.com/math-related/bubble-sort.html
		// %        note 3: This function deviates from PHP in returning a copy of the array instead
		// %        note 3: of acting by reference and returning true; this was necessary because
		// %        note 3: IE does not allow deleting and re-adding of properties without caching
		// %        note 3: of property position; you can set the ini of "phpjs.strictForIn" to true to
		// %        note 3: get the PHP behavior, but use this only if you are in an environment
		// %        note 3: such as Firefox extensions where for-in iteration order is fixed and true
		// %        note 3: property deletion is supported. Note that we intend to implement the PHP
		// %        note 3: behavior by default if IE ever does allow it; only gives shallow copy since
		// %        note 3: is by reference in PHP anyways
		// -    depends on: strnatcmp
		// -    depends on: i18n_loc_get_default
		// *     example 1: data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
		// *     example 1: data = asort(data);
		// *     results 1: data == {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}
		// *     returns 1: true
		// *     example 2: ini_set('phpjs.strictForIn', true);
		// *     example 2: data = {d: 'lemon', a: 'orange', b: 'banana', c: 'apple'};
		// *     example 2: asort(data);
		// *     results 2: data == {c: 'apple', b: 'banana', d: 'lemon', a: 'orange'}
		// *     returns 2: true

		var valArr=[], keyArr=[], k, i, ret, sorter, that = this, strictForIn = false, populateArr = {};

		switch (sort_flags) {
			case 'SORT_STRING': // compare items as strings
				sorter = function (a, b) {
					return that.strnatcmp(a, b);
				};
				break;
			case 'SORT_LOCALE_STRING': // compare items as strings, based on the current locale (set with i18n_loc_set_default() as of PHP6)
				var loc = this.i18n_loc_get_default();
				sorter = this.php_js.i18nLocales[loc].sorting;
				break;
			case 'SORT_NUMERIC': // compare items numerically
				sorter = function (a, b) {
					return (a - b);
				};
				break;
			case 'SORT_REGULAR': // compare items normally (don't change types)
			default:
				sorter = function (a, b) {
					if (a > b) {
						return 1;
					}
					if (a < b) {
						return -1;
					}
					return 0;
				};
				break;
		}

		var bubbleSort = function (keyArr, inputArr) {
			var i, j, tempValue, tempKeyVal;
			for (i = inputArr.length-2; i >= 0; i--) {
				for (j = 0; j <= i; j++) {
					ret = sorter(inputArr[j+1], inputArr[j]);
					if (ret < 0) {
						tempValue = inputArr[j];
						inputArr[j] = inputArr[j+1];
						inputArr[j+1] = tempValue;
						tempKeyVal = keyArr[j];
						keyArr[j] = keyArr[j+1];
						keyArr[j+1] = tempKeyVal;
					}
				}
			}
		};

		// BEGIN REDUNDANT
		this.php_js = this.php_js || {};
		this.php_js.ini = this.php_js.ini || {};
		// END REDUNDANT

		strictForIn = this.php_js.ini['phpjs.strictForIn'] && this.php_js.ini['phpjs.strictForIn'].local_value && 
						this.php_js.ini['phpjs.strictForIn'].local_value !== 'off';
		populateArr = strictForIn ? inputArr : populateArr;

		// Get key and value arrays
		for (k in inputArr) {
			if (inputArr.hasOwnProperty(k)) {
				valArr.push(inputArr[k]);
				keyArr.push(k);
				if (strictForIn) {
					delete inputArr[k];
				}
			}
		}
		try {
			// Sort our new temporary arrays
			bubbleSort(keyArr, valArr);
		} catch (e) {
			return false;
		}

		// Repopulate the old array
		for (i = 0; i < valArr.length; i++) {
			populateArr[keyArr[i]] = valArr[i];
		}

		return strictForIn || populateArr;
	},

	/**
	 * getKeyByValue
	 * @param {String} arrays 
	 * @param {Number} compare
	 * @return void
	 */
	getKeyByValue : function(arrays, compare){

		for(k in arrays){
			if(arrays[k]==compare){
				return k;
			}
		}
	},

	/**
	 * toJson1D
	 * @param {Mixed} o
	 * @return string
	 */
	toJson1D : function(o){

		var result = '';
		var arr = [];
		if(typeof o=='object'){
			for(var k in o){
				arr.push(k+':'+o[k]);
			}
			result = '{'+this.implode(', ', arr)+'}';
		}else{
			result = o;
		}
		return result;
	},

	var_export : function (mixed_expression, bool_return) {
		// http://kevin.vanzonneveld.net
		// +   original by: Philip Peterson
		// +   improved by: johnrembo
		// +   improved by: Brett Zamir (http://brett-zamir.me)
		// +   input by: Brian Tafoya (http://www.premasolutions.com/)
		// +   bugfixed by: Brett Zamir (http://brett-zamir.me)
		// +   bugfixed by: Brett Zamir (http://brett-zamir.me)
		// -	depends on: echo
		// *	 example 1: var_export(null);
		// *	 returns 1: null
		// *	 example 2: var_export({0: 'Kevin', 1: 'van', 2: 'Zonneveld'}, true);
		// *	 returns 2: "array (\n  0 => 'Kevin',\n  1 => 'van',\n  2 => 'Zonneveld'\n)"
		// *	 example 3: data = 'Kevin';
		// *	 example 3: var_export(data, true);
		// *	 returns 3: "'Kevin'"
		var retstr = '',
			iret = '',
			cnt = 0,
			x = [],
			i = 0,
			funcParts = [],
			idtLevel = arguments[2] || 2,
			// We use the last argument (not part of PHP) to pass in our indentation level
			innerIndent = '',
			outerIndent = '';

		var getFuncName = function (fn) {
			var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
			if (!name) {
				return '(Anonymous)';
			}
			return name[1];
		};

		var _makeIndent = function (idtLevel) {
			return (new Array(idtLevel + 1)).join(' ');
		};

		var __getType = function (inp) {
			var i = 0;
			var match, type = typeof inp;
			if (type === 'object' && inp.constructor && getFuncName(inp.constructor) === 'PHPJS_Resource') {
				return 'resource';
			}
			if (type === 'function') {
				return 'function';
			}
			if (type === 'object' && !inp) {
				return 'null'; // Should this be just null?
			}
			if (type === "object") {
				if (!inp.constructor) {
					return 'object';
				}
				var cons = inp.constructor.toString();
				match = cons.match(/(\w+)\(/);
				if (match) {
					cons = match[1].toLowerCase();
				}
				var types = ["boolean", "number", "string", "array"];
				for (i = 0; i < types.length; i++) {
					if (cons === types[i]) {
						type = types[i];
						break;
					}
				}
			}
			return type;
		};
		var type = __getType(mixed_expression);

		if (type === null) {
			retstr = "NULL";
		} else if (type === 'array' || type === 'object') {
			outerIndent = _makeIndent(idtLevel - 2);
			innerIndent = _makeIndent(idtLevel);
			for (i in mixed_expression) {
				var value = this.var_export(mixed_expression[i], true, idtLevel + 2);
				value = typeof value === 'string' ? value.replace(/</g, '&lt;').replace(/>/g, '&gt;') : value;
				x[cnt++] = innerIndent + i + ' => ' + (__getType(mixed_expression[i]) === 'array' ? '\n' : '') + value;
			}
			iret = x.join(',\n');
			retstr = outerIndent + "array (\n" + iret + '\n' + outerIndent + ')';
		} else if (type === 'function') {
			funcParts = mixed_expression.toString().match(/function .*?\((.*?)\) \{([\s\S]*)\}/);

			// For lambda functions, var_export() outputs such as the following:  '\000lambda_1'
			// Since it will probably not be a common use to expect this (unhelpful) form, we'll use another PHP-exportable
			// construct, create_function() (though dollar signs must be on the variables in JavaScript); if using instead
			// in JavaScript and you are using the namespaced version, note that create_function() will not be available
			// as a global
			retstr = "create_function ('" + funcParts[1] + "', '" + funcParts[2].replace(new RegExp("'", 'g'), "\\'") + "')";
		} else if (type === 'resource') {
			retstr = 'NULL'; // Resources treated as null for var_export
		} else {
			retstr = (typeof(mixed_expression) !== 'string') ? mixed_expression : "'" + mixed_expression.replace(/(["'])/g, "\\$1").replace(/\0/g, "\\0") + "'";
		}

		if (bool_return !== true) {
			// this.echo(retstr);
			return null;
		} else {
			return retstr;
		}
	}
}