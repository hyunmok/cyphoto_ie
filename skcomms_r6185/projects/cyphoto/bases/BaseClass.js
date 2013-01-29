/**
 *
 * BaseClass.js
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
 * @_date			2011-01-20 오후 7:46:25
 * 
 * @internal ************************* [ file info. end ] *********************************
 */



/**
 * Base Class
 */
var BaseClass = defineClass({

	name : 'BaseClass',

	construct : function(){

	},

	methods : {

		/**
		 * 인스턴스 변수 초기화
		 * @param {Array} pArray 
		 */
		_init : function(pArray){
			if(pArray instanceof Array){
				for(var i in pArray){
					this[pArray[i]] = null;
				}
			}
		},

		/**
		 * 변수에 값을 배정. setInstanceVars 로 초기화된 변수에만 배정된다
		 * @param {Object} param 
		 */
		_set : function(param){
			if(typeof param == 'object'){
				for(var p in param){
					if(typeof this[p] != 'undefined'){
						this[p] = param[p];
					}
				}
			}
		},

		/**
		 * 해당 인스턴스 변수 값을 가져온다
		 * @param {String} p
		 */
		_get : function(p){
			return this[p];
		},

		/**
		 * 인스턴스 구조를 보여줌
		 */
		_desc : function(){
			skFn.debug.log(skFn.debug.check(this,'this'));
			/*
			for( var p in this){
				alert(typeof this[p]+' '+p);
			}
			*/
		}
	}
});