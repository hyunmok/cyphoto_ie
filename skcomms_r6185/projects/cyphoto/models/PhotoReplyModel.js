/**
 *
 * PhotoReplyModel.js
 *
 * 
 *
 * @internal ************************* [ file info. start ] *********************************
 *
 * @category		
 * @package		
 * @author		
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
var PhotoReplyModelClass = defineClass({

	extend : BaseModelClass,

	name : 'PhotoReplyModelClass',

	/**
	 * 생성자 : 모델 인스턴스 초기화
	 */
	construct : function(){

		// 상위클래스에 체이닝
		this.superclass();

		// 인스턴스 변수 정의
		this._init([
		    'loginId',
			'targetId',
			'itemSeq',
			'replySeq',
			'cPage', 
			'perPage',
			'parentReplySeq', 
			'content'
		]);
	},

	/**
	 * 인스턴스 메써드
	 */
	methods : {
		/**
		 * 댓글 리스트 데이터 전달 array를 CallBack 함수에게 돌려준다
		 * @public
		 * @param {Number} seq Sequence Id
		 * @param {Function} fnCallback 데이터가 처리되면 받을 함수
		 * @return {Array}
		 */
		retriveList : function(seq, fnCallback){
			/* this === 본 ModelClass 의 인스턴스,
			wrapperFilter함수 에서 접근할 수 있도록 로컬 변수에 담는다 */
			var _model = this;
			_model._set({itemSeq:seq});

			skTv.gateway.request({
				requestType : 'xml_RetrievePhotoReplyList_with_img',
				params : {targetId:_model._get('targetId'), itemSeq:_model._get('itemSeq'), cPage:_model._get('cPage'), perPage:_model._get('perPage')},
				callback : fnCallback,
				wrapperFilter : function(jsonData){ return jsonData; }
			});
		}, 
		/**
		 * 댓글 리스트(비로그인시) 데이터 전달 array를 CallBack 함수에게 돌려준다
		 * @public
		 * @param {Number} seq Sequence Id
		 * @param {Function} fnCallback 데이터가 처리되면 받을 함수
		 * @return {Array}
		 */
		retriveListByNoLogin : function(seq, fnCallback){
			/* this === 본 ModelClass 의 인스턴스,
			wrapperFilter함수 에서 접근할 수 있도록 로컬 변수에 담는다 */
			var _model = this;
			_model._set({itemSeq:seq});

			skTv.gateway.request({
				requestType : 'xml_RetrievePhotoReplyList2_with_img',
				params : {targetId:_model._get('targetId'), itemSeq:_model._get('itemSeq'), cPage:_model._get('cPage'), perPage:_model._get('perPage')},
				callback : fnCallback,
				wrapperFilter : function(jsonData){ return jsonData; }
			});
		}, 
		/**
		 * 작성
		 * @public
		 * @param {Number} parentreplySeq 부모 댓글 seq
		 * @param {String} _content 글 내용
		 * @param {Function} fnCallback 데이터가 처리되면 받을 함수
		 * @return {Array}
		 */
		write : function(_parentreplySeq, _content, fnCallback){
			var _model = this;
			var model_content = encodeURIComponent(_content);

			skTv.gateway.request({
				requestType : 'xml_RegisterPhotoReply',
				params : {targetId:_model._get('targetId'), itemSeq:_model._get('itemSeq'), parentReplySeq:_parentreplySeq, content:model_content, visitIP:null},
				callback : fnCallback,
				wrapperFilter : function(jsonData){ return jsonData; }
			});
		}, 
		/**
		 * 삭제
		 * @public
		 * @param {Number} seq 게시물 id
		 * @param {Number} replySeq 댓글 seq
		 * @param {Function} fnCallback 데이터가 처리되면 받을 함수
		 * @return {Array}
		 */
		remove : function(replySeq, fnCallback){
			/* this === 본 ModelClass 의 인스턴스,
			wrapperFilter함수 에서 접근할 수 있도록 로컬 변수에 담는다 */
			var _model = this;

			_model._set({replySeq:replySeq});
			skFn.debug.log('[photoReplyModel remove] > loginId : ' + _model._get('loginId') + ', targetId : ' + _model._get('targetId') + ', itemSeq : ' + _model._get('itemSeq') + ', replySeq : ' + _model._get('replySeq'));

			skTv.gateway.request({
				requestType : 'xml_RemovePhotoReply',
				params : {loginId:_model._get('loginId'), targetId:_model._get('targetId'), itemSeq:_model._get('itemSeq'), replySeq:_model._get('replySeq')},
				callback : fnCallback,
				wrapperFilter : function(jsonData){ return jsonData; }
			});
		}
	}
});

