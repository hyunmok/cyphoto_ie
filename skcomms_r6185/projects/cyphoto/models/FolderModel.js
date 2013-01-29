/**
 *
 * FolderModel.js
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

				인스턴스 변수 : perPage, cPage, totalCounts, totalPages
				인스턴스 메써드 : getCurrentState(fnCallback), getAlphabet(page, fnCallback)
				클래스 변수 : 없음
				클래스 메써드 : 없음
 * @_todo			
 * @_tutorial		
 * @_version		
 * @_abstract
 * @_final			
 * @_internal
 * @_history
				[2011-01-13 오전 10:59:23 / shim]
				1. 모델 파일 작성

				[2011-02-08 오후 4:00:15 / shim]
				1. skFn.xhr.request 의 dataFormat 정리 및 적용

				[2011-03-15 오후 9:15:50 / shim]
				HTML 초기화면 자체에서 해결
				에러처리는 중앙에서 requestType 에 따라 정의
 * 
 * @internal ************************* [ file info. end ] *********************************
 */



/**
 * Folder Model
 */
var FolderModelClass = defineClass({

	extend : BaseModelClass,

	name : 'FolderModelClass',

	/**
	 * 생성자 : 모델 인스턴스 초기화
	 */
	construct : function(menuType, perPage){

		// 상위클래스에 체이닝
		this.superclass();

		// 인스턴스 변수 정의
		this._init([
			'targetId',
			'menuType',
			'cPage',
			'perPage',
			'totalPages',
			'totalCounts',
			'dataLength',
			'folderCache'
		]);

		this._set({
			menuType:menuType,
			perPage:perPage,
			folderCache:null
		});
	},

	/**
	 * 인스턴스 메써드
	 */
	methods : {

		/**
		 * 알파벳 개수와 전체 개수를 CallBack 함수에게 돌려준다
		 * @public
		 * @param {String} page 페이지
		 * @param {Boolean} isLogged 로그인 여부
		 * @param {Function} fnCallback 데이터가 처리되면 받을 함수
		 * @return {Object} {len:Number, totalCounts:Number}
		 */
		getList : function(page, isLogged, fnCallback){

			skFn.debug.log('FolderModelClass > getList('+page+', '+isLogged+', fnCallback) is called');

			if(page==null || typeof page=='undefined'){
				if(this._get('cPage')){
					page=this._get('cPage');
				}else{
					page=1;
				}
			}

			/* this === 본 ModelClass 의 인스턴스,
			wrapperFilter함수 에서 접근할 수 있도록 로컬 변수에 담는다 */
			var _model = this;

			// 캐시가 없다면 XHR
			if(_model._get('folderCache')==null){
				//No login folder 리스트 가져오기 (박순영 2011년 4월 5일 화요일)
				var requestType = isLogged==true ? 'xml_RetrieveFolderList' : 'xml_RetrieveFolderList2';
				skTv.gateway.request({
					requestType : requestType,
					params : {targetId:_model._get('targetId'), menuType:_model._get('menuType')},
					callback : fnCallback,
					wrapperFilter : function(apiData){

						skFn.debug.src('FolderModel.js');
						//skFn.debug.log(skFn.debug.check(apiData, 'apiData'));
						//skFn.debug.log(skFn.debug.check(apiData.body, 'apiData.body'));
						//skFn.debug.log(skFn.debug.check(apiData.body.ArrayOfFolder.Folder, 'apiData.body.ArrayOfFolder.Folder'));
						//skFn.debug.log(skFn.debug.check(apiData.body.ArrayOfFolder.Folder[0], 'apiData.body.ArrayOfFolder.Folder[0]'));

						// 가공
						var result = apiData;

						if(typeof apiData.body.ArrayOfFolder=='object' && typeof apiData.body.ArrayOfFolder.Folder != 'undefined'){

							// 폴더가 1개 일때
							if(typeof apiData.body.ArrayOfFolder.Folder.length == 'undefined'){
								if(apiData.body.ArrayOfFolder.Folder.folderName == '　'){
									apiData.body.ArrayOfFolder.Folder = new Array();
								}else{
									apiData.body.ArrayOfFolder.Folder = new Array(apiData.body.ArrayOfFolder.Folder);
								}
							}

							// 전체보기 데이터 맨앞 추가
							apiData.body.ArrayOfFolder.Folder.unshift({
								folderName : '전체보기',
								folderNo : '',
								folderOpen : '2',
								folderOpenType : 'allOpen',
								id : '',
								itemCount : '0'
							});

							// 캐시에 저장
							_model._set({folderCache:apiData.body.ArrayOfFolder.Folder});

							// 결과 데이터
							var folderCache = _model._get('folderCache');
							skFn.debug.log(skFn.debug.check(folderCache, 'folderCache'));

							result.body = _model.getFolderListByPage(folderCache, page);
						}


						// 반환
						return result;
					}
				});

			// 캐시가 있다면 use cache
			}else{

				skFn.debug.log('use cache');

				// 가공
				var result = {error:'', code:0, message:'', body:null};

				// 결과 데이터
				var folderCache = _model._get('folderCache');
				result.body = _model.getFolderListByPage(folderCache, page);

				skFn.debug.log(skFn.debug.check(result, 'result'));

				fnCallback(result);
			}

			
		},

		/**
		 * 폴더 배열에서 특정 페이지 영역의 배열을 리턴
		 * @public
		 * @param {Array} folderIn 폴더배열전체
		 * @param {Number} page 페이지
		 * @return {Array} 특정 페이지 영역의 폴더배열
		 */
		getFolderListByPage : function(folderIn, page){

			// 인스턴스 변수값 배정
			this._set({
				cPage : page,
				totalCounts : folderIn.length
			});
			var totalPages = Math.ceil(parseInt(this._get('totalCounts'))/parseInt(this._get('perPage')));
			this._set({
				totalPages : totalPages
			});

			var start = parseInt(this._get('perPage'))*(parseInt(page)-1);
			var end = parseInt(this._get('perPage'));
			skFn.debug.log('start = '+start+', end = '+end);
			var folderOut = skFn.array.array_slice(folderIn, start, end);

			skFn.debug.log('folderOut = '+folderOut);

			this._set({dataLength:folderOut.length});

			var folderOpenName = {
				secret : '비공개',
				allOpen_allWrite : '전체공개+전체쓰기',
				allOpen : '전체공개',
				oneDegOpen_oneDegWrite : '일촌공개+일촌쓰기',
				oneDegOpen : '일촌공개',
				allOpen_oneDegWrite : '전체공개+일촌쓰기'
			};
			for(var i in folderOut){
				folderOut[i].folderOpenName = folderOpenName[folderOut[i].folderOpenType];
			}

			return folderOut;
		}
	}
});

