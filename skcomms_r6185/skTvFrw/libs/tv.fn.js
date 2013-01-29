/**
 *
 * skTv.util.js
 *
 * 
 *
 * @internal ************************* [ file info. start ] *********************************
 *
 * @category		
 * @package		
 * @author		shim, heung woon <lumiel@skcomms.co.kr>
 * @filesource

 * @_uses		TV에 특화된 함수 라이브러리
 * @_todo			
 * @_tutorial		
 * @_version		
 * @_abstract
 * @_final			
 * @_internal
 * @_date			2011-03-03 오전 10:50:41
 * 
 * @internal ************************* [ file info. end ] *********************************
 */



if (typeof window == 'undefined'){
	if(typeof skTv == 'undefined'){
		skTv = {};
	}
}else if (typeof window.skTv == 'undefined'){
	window.skTv = {};
}

skTv.util = {

	/**
	 * 요소 에러를 검출해 낸다
	 * 
	 * @function
	 * @param {String} id : 요소ID
	 * @param {String} e : 에러개체
	 * @return void
	 */
	catchElementError : function(id, e){
		if(document.getElementById(id)==undefined){
			skFn.debug.alert('No such element id : \''+id+'\'');
		}else{
			skFn.debug.alert('['+e.name+'] '+e.message);
		}
	},

	/**
	 * 특정요소의 className을 focus 로 바꾼다
	 * 
	 * @function
	 * @param {String} id : 요소ID
	 * @return void
	 */
	focus : function(id){
		skFn.debug.log('skTv.util.focus(\''+id+'\') called');
		try {
			document.getElementById(id).className = 'focus';
		} catch(e) {
			this.catchElementError(id,e);
		}
	},

	/**
	 * 특정요소의 className을 '' 로 바꾼다
	 * 
	 * @function
	 * @param {String} id : 요소ID
	 * @return void
	 */
	blur : function(id){
		skFn.debug.log('skTv.util.blur(\''+id+'\') called');
		try {
			document.getElementById(id).className = '';
		} catch(e) {
			this.catchElementError(id,e);
		}
	},

	/**
	 * 특정요소의 className를 바꾼다
	 * 
	 * @function
	 * @param {String} id : 요소ID, cName : 변경할 className
	 * @return void
	 */
	changeClass : function(obj, cName){
		try {
			obj.className = cName;
		} catch(e) {
			this.catchElementError(obj,e);
		}
	},

	/**
	 * 증가하는 방향으로 순환한다
	 * 
	 * @function
	 * @param {String} id
	 * @param {String} attr
	 * @param {Mixed} range
	 * @param {String} direction ('+','-')
	 * @todo range[n,m], direction 추가 구현
	 * @return void
	 */
	cycle : function(id, attr, range, direction, prefix, extension){

		skFn.debug.log('skTv.util.cycle(\''+id+'\', \''+attr+'\') called');

		try {
			var ele = document.getElementById(id);
		} catch(e) {
			this.catchElementError(id,e); return;
		}

		if(typeof range=='object' && range instanceof Array){

			// [2,7]
			if(range.length==2 && typeof range[0]=='number' && typeof range[1]=='number'){

				for(var n=range[0]; n < range[1]; n++){
					
				}

			// ['images/jade_structure.gif','images/jade_merit.gif','images/jade_dir.gif']
			}else{
	
				for(i in range){
					var re = new RegExp(range[i]); // 현재 패턴
					if(re.test(ele[attr])){
						if(i >= range.length-1){
							ele[attr]=range[0];
						}else{
							ele[attr]=range[parseInt(i)+1];
						}
						break;
					}
				}
			}
		}
	}
}

