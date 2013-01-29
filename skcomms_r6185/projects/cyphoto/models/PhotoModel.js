/**
 *
 * PhotoModel.js
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

				[2011-03-14 오후 4:15:49/ Park, Soonyoung]

				
				
 * @_tutorial		
 * @_version		
 * @_abstract
 * @_final			
 * @_internal
 * 
 * @internal ************************* [ file info. end ] *********************************
 */


/**
 * Photo Model
 */
var PhotoModelClass = defineClass({

	extend : BaseModelClass,

	name : 'PhotoModelClass',

	/**
	 * 생성자 : 모델 인스턴스 초기화
	 */
	construct : function(){

		// 상위클래스에 체이닝
		this.superclass();

		// 인스턴스 변수 정의
		this._init([
			'targetId',
			'cPage',
			'folderNo',
			'perPage',
			'themeId', //blog photo 관련 (테마)
			'order', //blog photo 관련 (정렬순)
			'duration' //blog photo 관련 (기간)
		]);
		this._set({cPage:1,folderNo:'',targetId:'', order:'vote_cnt', duration:'7'});
	},

	/**
	 * 인스턴스 메써드
	 */
	methods : {
		retrieveList:function(_this ,fnCallback){
			
			/* this === 본 ModelClass 의 인스턴스,
			wrapperFilter함수 에서 접근할 수 있도록 로컬 변수에 담는다 */
//			var _model = this;
			skFn.debug.log('PhotoModelClass > retrieveList() is called');
//			_model._set({cPage:cPage});
			
			skTv.gateway.request({
				requestType : 'xml_RetrievePhotoItemList',
				params : {targetId:_this._get('targetId'), cPage:_this._get('cPage'), folderNo:_this._get('folderNo'), perPage:_this._get('perPage'), searchType:'', searchWord:''},
				callback : fnCallback,
				wrapperFilter : function(fd){
					return fd;
				}
			});
		},
		retrieveListIsPrivacy:function(_this ,fnCallback){
			
			/* this === 본 ModelClass 의 인스턴스,
			wrapperFilter함수 에서 접근할 수 있도록 로컬 변수에 담는다 */
//			var _model = this;
			skFn.debug.log('PhotoModelClass > retrieveListIsPrivacy() is called');
//			_model._set({cPage:cPage});
			
			skTv.gateway.request({
				requestType : 'xml_RetrievePhotoItemListByRelation',
				params : {targetId:_this._get('targetId'), cPage:_this._get('cPage'), folderNo:_this._get('folderNo'), perPage:_this._get('perPage'), searchType:'', searchWord:''},
				callback : fnCallback,
				wrapperFilter : function(fd){
					return fd;
				}
			});
		},
		retrieveListNoLogin:function(_this ,fnCallback){
			
			/* this === 본 ModelClass 의 인스턴스,
			wrapperFilter함수 에서 접근할 수 있도록 로컬 변수에 담는다 */
//			var _model = this;
			skFn.debug.log('PhotoModelClass > retrieveListNoLogin() is called');
//			_model._set({cPage:cPage});
			
			skTv.gateway.request({
				requestType : 'xml_RetrievePhotoItemList2',
				params : {targetId:_this._get('targetId'), cPage:_this._get('cPage'), folderNo:_this._get('folderNo'), perPage:_this._get('perPage'), searchType:'', searchWord:''},
				callback : fnCallback,
				wrapperFilter : function(fd){
					return fd;
				}
			});
		},
		blog_retrieveList:function(_this ,fnCallback){

			/* this === 본 ModelClass 의 인스턴스,
			wrapperFilter함수 에서 접근할 수 있도록 로컬 변수에 담는다 */
			skFn.debug.log('PhotoModelClass > blog_retrieveList() is called');
			skTv.gateway.request({
				requestType : 'blog_retrievePhotoListXML',
				//param추가
				params : {type:'theme', themeId:_this._get('themeId'), pageNo:_this._get('cPage'), perPage:_this._get('perPage'), order:_this._get('order'), duration:_this._get('duration')},
				callback : fnCallback,
				wrapperFilter : function(fd){
					if(fd.code == 0){
						var JSONData = { 
							code : fd.code,
							user_msg : fd.user_msg,
							sys_msg : fd.sys_msg,
							body : { 
								ArrayOfPhotoItem : {
									PhotoItem : []
								}
							}
						};

						if(fd.body.DATA.IMAGELIST){	
							var totalCount = fd.body.DATA.IMAGELIST.TOTALCOUNT;
							if(fd.body.DATA.IMAGELIST.IMAGEITEM.length == undefined){
								JSONData.body.ArrayOfPhotoItem.PhotoItem[0] = new Object();
								JSONData.body.ArrayOfPhotoItem.PhotoItem[0].writerName = fd.body.DATA.IMAGELIST.IMAGEITEM.WRITER_NM;
								JSONData.body.ArrayOfPhotoItem.PhotoItem[0].title = fd.body.DATA.IMAGELIST.IMAGEITEM.TITLE_CUT10;
								JSONData.body.ArrayOfPhotoItem.PhotoItem[0].itemSeq = fd.body.DATA.IMAGELIST.IMAGEITEM.PHOTO_SEQ;
								JSONData.body.ArrayOfPhotoItem.PhotoItem[0].writeDate = fd.body.DATA.IMAGELIST.IMAGEITEM.INPUT_DATE;
								JSONData.body.ArrayOfPhotoItem.PhotoItem[0].writerId = fd.body.DATA.IMAGELIST.IMAGEITEM.TALK_ID;
								JSONData.body.ArrayOfPhotoItem.PhotoItem[0].replyCount = 0;
								JSONData.body.ArrayOfPhotoItem.PhotoItem[0].totalCount = totalCount;
								JSONData.body.ArrayOfPhotoItem.PhotoItem[0].photoVmUrl = fd.body.DATA.IMAGELIST.IMAGEITEM.IMAGE_URL;

							}
							else{
								for(var i = 0; i < fd.body.DATA.IMAGELIST.IMAGEITEM.length; i++){
									JSONData.body.ArrayOfPhotoItem.PhotoItem[i] = new Object();
									JSONData.body.ArrayOfPhotoItem.PhotoItem[i].writerName = fd.body.DATA.IMAGELIST.IMAGEITEM[i].WRITER_NM;
									JSONData.body.ArrayOfPhotoItem.PhotoItem[i].title = fd.body.DATA.IMAGELIST.IMAGEITEM[i].TITLE_CUT10;
									JSONData.body.ArrayOfPhotoItem.PhotoItem[i].itemSeq = fd.body.DATA.IMAGELIST.IMAGEITEM[i].PHOTO_SEQ;
									JSONData.body.ArrayOfPhotoItem.PhotoItem[i].writeDate = fd.body.DATA.IMAGELIST.IMAGEITEM[i].INPUT_DATE;
									JSONData.body.ArrayOfPhotoItem.PhotoItem[i].writerId = fd.body.DATA.IMAGELIST.IMAGEITEM[i].TALK_ID;
									JSONData.body.ArrayOfPhotoItem.PhotoItem[i].replyCount = 0;
									JSONData.body.ArrayOfPhotoItem.PhotoItem[i].totalCount = totalCount;
									JSONData.body.ArrayOfPhotoItem.PhotoItem[i].photoVmUrl = fd.body.DATA.IMAGELIST.IMAGEITEM[i].IMAGE_URL;
								}
							}
							return JSONData;
						}
					}	else if(fd.code != 0){
						return fd;						
					}
				}
			});
		}
	}
});

