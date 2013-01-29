/**
 *
 * BlogPhotoListCategory.js
 *
 * 
 *
 * @internal ************************* [ file info. start ] *********************************
 *
 * @category		
 * @package		
 * @author		Park, Soonyoung <youngp@skcomms.co.kr>
 * @filesource

 * @_uses		
 * @_todo		
				
 * @_history

				[2011년 4월 4일 월요일 / Park, Soonyoung]

				
				
 * @_tutorial		
 * @_version		
 * @_abstract
 * @_final			
 * @_internal
 * 
 * @internal ************************* [ file info. end ] *********************************
 */


/**
 * BlogPhoto Category Controller
 */


var BlogPhotoCategoryControllerClass = defineClass({

	extend : BaseControllerClass,

	name : 'BlogPhotoCategoryControllerClass',


	/**
	 * 생성자 : 컨트롤러 인스턴스 초기화
	 */
	construct : function(themeId){
		
		// 상위클래스에 체이닝
		this.superclass();
		this._init([
			'index',
			'themeId',
		]);
		_this = this;
		this._set({themeId : themeId});
		$("#SceneStockCategory > div ul li:eq("+themeId+")").addClass("over");
	},

	/**
	 * 인스턴스 메써드
	 */
	methods : {
		/**
		 *	focus On
		 *	
		 *	@return void
		 */
		focusOn : function(direction){
			var index = this._get("index");
			if(!direction){
				index = this._get("themeId");
				$("#SceneStockCategory > div ul li").removeClass("focus");
				$("#SceneStockCategory > div ul li:eq("+index+")").addClass("focus");				
			} else if (direction == "NEXT"){
				$("#SceneStockCategory > div ul li").removeClass("focus");
				index = (index < 5) ? ++index : 0;
				$("#SceneStockCategory > div ul li:eq("+index+")").addClass("focus");
			} else if (direction == "PREV"){
				$("#SceneStockCategory > div ul li").removeClass("focus");
				index = (index > 0) ? --index : 5;
				$("#SceneStockCategory > div ul li:eq("+index+")").addClass("focus");
			} 
			this._set({index:index});
		},


		/**
		 * focus Off
		 * @return void
		 */
		focusOff : function(){
			$("#SceneStockCategory > div ul li").removeClass("focus");
		}
	}
});