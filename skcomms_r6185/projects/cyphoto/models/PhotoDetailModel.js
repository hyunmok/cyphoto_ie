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
 * @author		shim, heung woon <lumiel@skcomms.co.kr>
 * @filesource

 * @_uses		

				인스턴스 변수 : targetId, itemSeq
				인스턴스 메써드 : getPhotoDetail(seq, fnCallback)
				클래스 변수 : 없음
				클래스 메써드 : 없음
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
 * PhotoDetail Model
 */
var PhotoDetailModelClass = defineClass({

	extend : BaseModelClass,

	name : 'PhotoDetailModelClass',

	/**
	 * 생성자 : 모델 인스턴스 초기화
	 */
	construct : function(){

		// 상위클래스에 체이닝
		this.superclass();

		// 인스턴스 변수 정의
		this._init([
			'targetId',
			'itemSeq'
		]);
		this._set({targetId:''});
	},

	/**
	 * 인스턴스 메써드
	 */
	methods : {
		retrieveDetail:function(itemSeq, fnCallback){
			
			/* this === 본 ModelClass 의 인스턴스,
			wrapperFilter함수 에서 접근할 수 있도록 로컬 변수에 담는다 */
			var _model = this;
			skFn.debug.log('PhotoModelClass > retrieveDetail() is called');
		
			skTv.gateway.request({
				requestType : 'xml_RetrievePhotoItem',
				params : {targetId:_model._get('targetId'), itemSeq : itemSeq},
				callback : fnCallback,
				wrapperFilter : function(fd){
					return fd;
				}
			});
		},
		retrieveDetailNoLogin:function(itemSeq, fnCallback){
			
			/* this === 본 ModelClass 의 인스턴스,
			wrapperFilter함수 에서 접근할 수 있도록 로컬 변수에 담는다 */
			var _model = this;
			skFn.debug.log('PhotoModelClass > retrieveDetailNoLogin() is called');
		
			skTv.gateway.request({
				requestType : 'xml_RetrievePhotoItem2',
				params : {targetId:_model._get('targetId'), itemSeq : itemSeq},
				callback : fnCallback,
				wrapperFilter : function(fd){
					return fd;
				}
			});
		}
	}
});
