/**
 *
 * PhotoDetailModel.js
 *
 * 
 *
 * @internal ************************* [ file info. start ] *********************************
 *
 * @category		
 * @package		
 * @author		park, soon young <youngp@skcomms.co.kr>
 * @filesource

 * @_uses		

 * @_todo			
 * @_tutorial		
 * @_version		
 * @_abstract
 * @_final			
 * @_internal
 * @_history
				[2011-02-21 오후 5:52:03 / shim]
				1. 모델 파일 작성
 * 
 * @internal ************************* [ file info. end ] *********************************
 */

/**
 * MinihpInfoModelClass Model
 */
var MinihpInfoModelClass = defineClass({

	extend : BaseModelClass,

	name : 'MinihpInfoModelClass',

	/**
	 * 생성자 : 모델 인스턴스 초기화
	 */
	construct : function(){

		// 상위클래스에 체이닝
		this.superclass();

		// 인스턴스 변수 정의
		this._init([
			'targetId',
		]);
	},

	/**
	 * 인스턴스 메써드
	 */
	methods : {
		getMinihpInfo:function(targetId, fnCallback){
			
			/* this === 본 ModelClass 의 인스턴스,
			wrapperFilter함수 에서 접근할 수 있도록 로컬 변수에 담는다 */
			skFn.debug.log('MinihpInfoModelClass > getMainHome() is called');
			var _model = this;			
			this._set({targetId:targetId});
			skTv.gateway.request({
				requestType : 'xml_RetrieveMemProfile',
				params : {targetIds:_model._get('targetId'), loginId:'', fieldNames:'all'},
				callback : fnCallback,
				wrapperFilter : function(fd){
					return fd;
				}
			});
		},
		getMinihpInfoNoLogin:function(targetId, fnCallback){

			/* this === 본 ModelClass 의 인스턴스,
			wrapperFilter함수 에서 접근할 수 있도록 로컬 변수에 담는다 */
			skFn.debug.log('MinihpInfoModelClass > getMainHome() is called');
			var _model = this;			
			this._set({targetId:targetId});
			skTv.gateway.request({
				requestType : 'xml_RetrieveMemProfile2',
				params : {targetIds:_model._get('targetId'), loginId:'', fieldNames:'all'},
				callback : fnCallback,
				wrapperFilter : function(fd){
					return fd;
				}
			});
		},
		isMenuOpen:function(targetId, fnCallback){
			skFn.debug.log("isMenuOpen");
			skFn.debug.log('MinihpInfoModelClass > isMenuOpen() is called');
			var _model = this;			
			this._set({targetId:targetId});
			skTv.gateway.request({
				requestType : 'xml_RetrieveMenuOpen',
				params : {targetId:_model._get('targetId'), menuType:'photo'},
				callback : fnCallback,
				wrapperFilter : function(fd){
					return fd;
				}
			});
		},
		isMenuOpenNoLogin:function(targetId, fnCallback){
			skFn.debug.log('MinihpInfoModelClass > isMenuOpenNoLogin() is called');
			var _model = this;			
			this._set({targetId:targetId});
			skTv.gateway.request({
				requestType : 'xml_RetrieveMenuOpen2',
				params : {targetId:_model._get('targetId'), menuType:'photo'},
				callback : fnCallback,
				wrapperFilter : function(fd){
					return fd;
				}
			});
		}
	}
});
