/**
 *
 * LoginAcController.js
 *
 * 
 *
 * @internal ************************* [ file info. start ] *********************************
 *
 * @category		
 * @package		
 * @author		Soonyoung Park
 * @filesource

 * @_uses		
 * @_todo		

 * @_history

				2012-08-06 [10:06:52] @SoonyoungPark

				1. 최초 작성
				
 * @_tutorial		
 * @_version		
 * @_abstract
 * @_final			
 * @_internal
 * @_date			2012-08-06 [10:07:01] @SoonyoungPark
 * 
 * @internal ************************* [ file info. end ] *********************************
 */



/**
 * LoginAc Controller
 */
var LoginAcControllerClass = defineClass({

	extend : BaseControllerClass,

	name : 'LoginAcControllerClass',

	construct : function(){
		this._init([
			'idx',
			'focusedElement'
		]);
		this._set({
			idx : 0,
			focusedElement : null
		});
	},

	methods : {
		/**
		 * setFocusedElement : 이전 focus 된 element 를 blur하고, focus 될 element 를 focus 후 저장
		 *
		 * @param{object} 포커스 될 dom element
		 * 
		 * @return{void}
		 */
		setFocusedElement : function(el){
			var focusedElement = this._get('focusedElement');
			if(focusedElement){
				try{
					$(focusedElement).removeClass('focus');
				}catch(e){
				}
			}
			if(el){
				this._set({focusedElement : el});
				$(el).addClass('focus');
			}
		},
		/**
		 * getFocusedElement : 현재 focus 된 element 반환
		 *
		 * @param{void} 
		 * 
		 * @return{object} 포커스 될 dom element
		 */
		getFocusedElement : function(){
			return this._get('focusedElement');
		},
		show : function(inputVal){
			
			var text = LGImeComponent.getInputVal();
			$("#SceneAc > input").val(text);
			$("#SceneAc > input").focus();

			LGImeComponent.set_callbackZone("Ac");
			var liList = $("#SceneAc > ul > li");
			inputVal = inputVal.substr(0, inputVal.length-1);
			if (inputVal.length > 20){
				inputVal = inputVal.substr(0, 19)+'...';
			}
			liList.eq(0).html('직접입력');
			liList.eq(1).html(inputVal+'@nate.com');
			liList.eq(2).html(inputVal+'@empas.com');
			liList.eq(3).html(inputVal+'@lycos.co.kr');
			liList.eq(4).html(inputVal+'@netsgo.com');
		},
		focus : function(idx){
			var focusedElement = this.getFocusedElement();
			var focusList = $("#SceneAc > ul > li");
			if (typeof idx === 'undefined'){
				var idx = this._get('idx');
				focusedElement = focusList.eq(idx)[0];
				this._set({idx : idx});
			}else{
				if (idx >= 0&& focusList.eq(idx) !== 0){
					focusedElement = focusList.eq(idx)[0];
					this._set({idx : idx});
				}				
			}
			this.setFocusedElement(focusedElement);
		},
		focusNext : function(){
			var idx = this._get("idx");
			idx++;
			var li = $("#SceneAc > ul > li:eq("+idx+")");
			if (li.length !== 0){
				this.focus(idx);
				return true;
			}
			return false;
			
		},
		focusPrev : function(){
			var idx = this._get("idx");
			idx--;
			var li = $("#SceneAc > ul > li:eq("+idx+")");
			if (idx >= 0){
				this.focus(idx);
				return true;
			}
			return false;
		},
		focusLast : function(){
			var li = $("#SceneAc > ul > li:last");
			var idx = li.index();
			this.focus(idx);
		},
		blur : function(){
			$("#SceneAc > ul > li").removeClass('focus');
		},
		hide : function(){
			var tab = LoginController._get('ck_loginTab');
			if (tab ==='NATE'){
				LGImeComponent.set_callbackZone("NateLogin");
			}else if (tab === 'CYWORLD'){
				LGImeComponent.set_callbackZone("CyworldLogin");
			}
			//
			var focusedElement = this.getFocusedElement();
			$(focusedElement).removeClass('focus');
			this._set({
				idx : 0,
				focusedElement : null
			});
			skTv.zone.focus('Ime');
		},
		onEnter : function(idx){
			if (typeof idx === 'undefined'){
				var idx = this._get('idx');
			}
			if (idx !== 0){
			
				var imeCaretIdx	= parseInt(LGImeComponent._get("currentCaretIdx"), 10);
				//var text = $("#SceneImeAc button:eq("+idx+")").text();
				var text = LGImeComponent.getInputVal();
				switch (idx){
					case 1:
						text += 'nate.com';
						break;
					case 2:
						text += 'empas.com';
						break;
					case 3:
						text += 'lycos.co.kr';
						break;
					case 4:
						text += 'netsgo.com';
						break;
				
				}
				LGImeComponent.setTextContent(text);
				LGImeComponent.caretMoved();
				LGImeComponent.setCaretPosition(text.length, 0);
			}
			this.returnIme();
		},
		returnIme : function(){
			skTv.zone.hide('Ac');
			skTv.zone.focus('Ime');
		}
	}
});