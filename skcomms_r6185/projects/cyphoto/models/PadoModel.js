/**
 *
 * PadoModel.js
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

				
 * @_todo			
 * @_tutorial		
 * @_version		
 * @_abstract
 * @_final			
 * @_internal
 * @_history
				
 * 
 * @internal ************************* [ file info. end ] *********************************
 */



/**
 * Pado Model
 */
var PadoModelClass = defineClass({

	extend : BaseModelClass,

	name : 'PadoModelClass',

	
	construct : function(){
		
		this.superclass();				
		
		this._init([
			'Id',
			'bConcern',
			'groupNo',
			'keyword',
			'currentPage',
			'perPage',
			'tid',			
			'OnedegCache',
			'targetId',
			'searchType',
			'searchWord',
			'TotalOneDeg',
			'loginId',
			'visitIP',
			'from'
		]);
	},

	/**
	 * 
	 */
	methods : {

		/**
		 * 
		 * @public
		 * @param 
		 * @param 
		 * @return 
		 */
		
		retriveOnedegList : function(c_page, per_page, keyword, fnCallback){
			
			var _model = this;
			
			//_model._set({currentPage:1});
			//_model._set({perPage:24});
			
			_model._set({currentPage:c_page});
			_model._set({keyword:keyword});
			
			skTv.gateway.request({
				//requestType : 'xml_RetrieveOnedegSearchList',	
				requestType : 'xml_RetrieveOnedegSearchList_with_img',
				params : {Id:_model._get('Id'), bConcern:_model._get('bConcern'), groupNo:"", currentPage:_model._get('currentPage'), perPage:per_page, keyword:encodeURIComponent(_model._get('keyword'))},				
				callback : fnCallback,
				wrapperFilter : function(fd){				
					
					/*					
					alert(fd.body.ArrayOfPhotoItem.PhotoItem[0].folderNo);

					fd.body.ArrayOfOneDegList.OneDegList[0].Did = 64796362,
					fd.body.ArrayOfOneDegList.OneDegList[0].bConcern = 1,
					fd.body.ArrayOfOneDegList.OneDegList[0].bOpen = 0,
					fd.body.ArrayOfOneDegList.OneDegList[0].didname = \uae40\uc0c1\ud604,
					fd.body.ArrayOfOneDegList.OneDegList[0].relationname = \uc9c1\uc7a5\ub3d9\ub8cc,
					fd.body.ArrayOfOneDegList.OneDegList[0].totCount = 9,
					fd.body.ArrayOfOneDegList.OneDegList[0].totPage = 1					
					*/
					//alert(fd.body.ArrayOfOneDegList.OneDegList[0].img);
					
					if (fd.code != 0) { //게이트웨이 서버 에러 메시지 있을 경우
						LoadingComponent.unlock();
						PopupComponent.showTextPopup( // showErrorPopup
						fd.user_msg.title, fd.user_msg.contents, // userError[jsonData.code]
						 // ENTER, RETURN(ESC) 누를때 실행할 콜백함수
						function(){
							window.history.back();
						});
						
					} else {
						if (fd.body.result == "") {
							return "102"; //일촌 없음
						} else if (skFn.array.isArray(fd.body.ArrayOfOneDegList.OneDegList) == true) { //일촌 있고 배열 형태
							var result = [];
							result = fd.body.ArrayOfOneDegList.OneDegList;
								
							return result;
						} else if (skFn.array.isArray(fd.body.ArrayOfOneDegList.OneDegList) == false) { //일촌 있고 배열 형태 아님
							var result = [];
							result[0] = {
								Did : fd.body.ArrayOfOneDegList.OneDegList.Did,
								bConcern : fd.body.ArrayOfOneDegList.OneDegList.bConcern,
								bOpen : fd.body.ArrayOfOneDegList.OneDegList.bOpen,
								didname : fd.body.ArrayOfOneDegList.OneDegList.didname,
								relationname : fd.body.ArrayOfOneDegList.OneDegList.relationname,
								totCount : fd.body.ArrayOfOneDegList.OneDegList.totCount,
								totPage : fd.body.ArrayOfOneDegList.OneDegList.totPage,
								img : fd.body.ArrayOfOneDegList.OneDegList.img
							};	
							return result;	
						}//end if
					}
					
					
				}
				
			});
		},
		
		retriveOnedegIndex : function(c_Page, TotalOneDeg, keyword, index, pPage, fnCallback){
			
			var _model = this;			
			
			if(_model._get('OnedegCache')==null){
				
				//_model._set({currentPage:c_page});
				_model._set({keyword:keyword});
				
				skTv.gateway.request({
					//requestType : 'xml_RetrieveOnedegSearchList',	
					requestType : 'xml_RetrieveOnedegSearchList_with_img',
					params : {Id:_model._get('Id'), bConcern:_model._get('bConcern'), groupNo:"", currentPage:"1", perPage:TotalOneDeg, keyword:_model._get('keyword')},				
					callback : fnCallback,
					wrapperFilter : function(fd){				
						
						/*					
						alert(fd.ArrayOfPhotoItem.PhotoItem[0].folderNo);
	
						fd.body.ArrayOfOneDegList.OneDegList[0].Did = 64796362,
						fd.body.ArrayOfOneDegList.OneDegList[0].bConcern = 1,
						fd.body.ArrayOfOneDegList.OneDegList[0].bOpen = 0,
						fd.body.ArrayOfOneDegList.OneDegList[0].didname = \uae40\uc0c1\ud604,
						fd.body.ArrayOfOneDegList.OneDegList[0].relationname = \uc9c1\uc7a5\ub3d9\ub8cc,
						fd.body.ArrayOfOneDegList.OneDegList[0].totCount = 9,
						fd.body.ArrayOfOneDegList.OneDegList[0].totPage = 1					
						*/
						//alert(fd.body.ArrayOfOneDegList.OneDegList[0].img);
						if (fd.code != 0) { //게이트웨이 서버 에러 메시지 있을 경우
							LoadingComponent.lock(false);
							PopupComponent.showTextPopup( // showErrorPopup
							fd.user_msg.title, fd.user_msg.contents, // userError[jsonData.code]
							 // ENTER, RETURN(ESC) 누를때 실행할 콜백함수
							function(){
								window.history.back();
							});
							
						} else {
							// 캐시에 저장
							_model._set({OnedegCache:fd.body.ArrayOfOneDegList.OneDegList});
							
							var result = [];
							//result = fd.body.ArrayOfOneDegList.OneDegList;
							result = _model.getOnedegListByIndex(fd.body.ArrayOfOneDegList.OneDegList, index, c_Page, pPage);
							
							return result;
						}
						
					}
					
				});
			} else {
						var result = [];
						//result = _model._get('OnedegCache');
						result = _model.getOnedegListByIndex(_model._get('OnedegCache'), index, c_Page, pPage);
						fnCallback(result);
			}
		},
		
		retriveFanList : function(c_page, p_page, searchType, searchWord, fnCallback){
			var _model = this;			
			skTv.gateway.request({				
				requestType : "xml_RetrieveMyStarListForManage",
				params : {loginId:_model._get('Id'), targetId:_model._get('targetId'), cPage:c_page, perPage:p_page, searchType:searchType, searchWord:encodeURIComponent(searchWord), visitIP:_model._get('visitIP'),  from:_model._get('from')},
				callback : fnCallback, 
				wrapperFilter : function(fd){
					
					/*
					fd.body.ApiResultEntityOfArrayOfMyStarForManageEntity.apiHeader.resultCode = 000,
					fd.body.ApiResultEntityOfArrayOfMyStarForManageEntity.apiBody.MyStarForManageEntity[0].BasicHomeId = "21948938",
					fd.body.ApiResultEntityOfArrayOfMyStarForManageEntity.apiBody.MyStarForManageEntity[0].IsOnedegree = "false",  
					fd.body.ApiResultEntityOfArrayOfMyStarForManageEntity.apiBody.MyStarForManageEntity[0].MyID = "62285048",  
					fd.body.ApiResultEntityOfArrayOfMyStarForManageEntity.apiBody.MyStarForManageEntity[0].Profile = ".",
					fd.body.ApiResultEntityOfArrayOfMyStarForManageEntity.apiBody.MyStarForManageEntity[0].StarID = "21948938",
					fd.body.ApiResultEntityOfArrayOfMyStarForManageEntity.apiBody.MyStarForManageEntity[0].StarImg = "http://mhft.cyworld.co.kr/cthumb_65x65/http://cyimg33.cyworld.com/common/file_down.asp?redirect=%2F330034%2F2011%2F2%2F24%2F69%2F2011-02-23%2016_34_23.jpg",
					fd.body.ApiResultEntityOfArrayOfMyStarForManageEntity.apiBody.MyStarForManageEntity[0].StarNm = "가인",
					fd.body.ApiResultEntityOfArrayOfMyStarForManageEntity.apiBody.MyStarForManageEntity[0].TotalCnt = "51",
					*/					
					if(fd.code!=0){			//게이트웨이 서버 에러 메시지 있을 경우
						LoadingComponent.lock(false);
						PopupComponent.showTextPopup( // showErrorPopup
							fd.user_msg.title,
							fd.user_msg.contents, // userError[jsonData.code]
							// ENTER, RETURN(ESC) 누를때 실행할 콜백함수
							function(){
								window.history.back(); 
							}
						);

					} else {
						if(fd.body.ApiResultEntityOfArrayOfMyStarForManageEntity.apiHeader.resultCode=="000"){		//팬이 있는 경우
							var result = [];
						if(skFn.array.isArray(fd.body.ApiResultEntityOfArrayOfMyStarForManageEntity.apiBody.MyStarForManageEntity)==true){							
							result = fd.body.ApiResultEntityOfArrayOfMyStarForManageEntity.apiBody.MyStarForManageEntity;
						} else {	//결과가 1건이라 배열이 아닌 경우
							result[0] = {
									BasicHomeId : fd.body.ApiResultEntityOfArrayOfMyStarForManageEntity.apiBody.MyStarForManageEntity.BasicHomeId,
									IsOnedegree : fd.body.ApiResultEntityOfArrayOfMyStarForManageEntity.apiBody.MyStarForManageEntity.IsOnedegree,
									MyID : fd.body.ApiResultEntityOfArrayOfMyStarForManageEntity.apiBody.MyStarForManageEntity.MyID,
									Profile : fd.body.ApiResultEntityOfArrayOfMyStarForManageEntity.apiBody.MyStarForManageEntity.Profile,
									StarID : fd.body.ApiResultEntityOfArrayOfMyStarForManageEntity.apiBody.MyStarForManageEntity.StarID,
									StarImg : fd.body.ApiResultEntityOfArrayOfMyStarForManageEntity.apiBody.MyStarForManageEntity.StarImg,
									StarNm : fd.body.ApiResultEntityOfArrayOfMyStarForManageEntity.apiBody.MyStarForManageEntity.StarNm,
									TotalCnt : fd.body.ApiResultEntityOfArrayOfMyStarForManageEntity.apiBody.MyStarForManageEntity.TotalCnt
								};								
						}
							return result;
							
						} else {																					//팬이 없는 경우
							var resultCode = fd.body.ApiResultEntityOfArrayOfMyStarForManageEntity.apiHeader.resultCode;
							
							return resultCode;
						}
					}
					
					
				}
			});
		},
		
		getOnedegListByIndex : function(OneDegList, index, c_Page, pPage){
			
			var uni_min = 0;
			var uni_max = 0;
			var index_count = 0;
			
			switch(index)  
			{
			 case 1 :
				uni_min = 44032;	//가
				uni_max = 45207;	//낗
				break;
			 case 2 :
				uni_min = 45208;	//나
				uni_max = 45795;	//닣
				break;
			 case 3 :
				uni_min = 45796;	//다
				uni_max = 46971;	//띻
				break;
			 case 4 :
				uni_min = 46972;	//라
				uni_max = 47559;	//맇
				break;
			 case 5 :
				uni_min = 47560;	//마
				uni_max = 48147;	//밓
				break;
			 case 6 :
				uni_min = 48148;	//바
				uni_max = 49323;	//삫
				break;
			 case 7 :
				uni_min = 49324;	//사
				uni_max = 50499;	//앃
				break;
			 case 8 :
				uni_min = 50500;	//아
				uni_max = 51087;	//잏
				break;
			 case 9 :
				uni_min = 51088;	//자
				uni_max = 52263;	//찧
				break;
			 case 10 :
				uni_min = 52264;	//차
				uni_max = 52851;	//칳
				break;
			 case 11 :
				uni_min = 52852;	//카
				uni_max = 53439;	//킿
				break;
			 case 12 :
				uni_min = 53440;	//타
				uni_max = 54027;	//팋
				break;
			 case 13 :
				uni_min = 54028;	//파
				uni_max = 54615;	//핗
				break;
			 case 14 :
				uni_min = 54616;	//하
				uni_max = 55203;	//힣	
				break;		
			 case 15 :
				uni_min = 65;	
				uni_max = 122;		
				break;	 
			}
			
			var arrCount = [];
			var arrIndexName = [];
			
			for (var i=0; i<OneDegList.length; i++){
				
				arrIndexName.push(OneDegList[i].didname);						
				
				var uni_no = arrIndexName[i].charCodeAt(arrIndexName[i].substring(0,1));							
				
				if(uni_no>=uni_min && uni_no<=uni_max && index_count>=((c_Page-1)*pPage) && index_count<(c_Page*pPage)){
					arrCount.push(i);							
				}
					
				if(uni_no>=uni_min && uni_no<=uni_max){								
					index_count = index_count+1;
				} 
					
			}//end for
			
			var start = arrCount[0];
			var end = arrCount.length;
			
			if(end!=0){				
				var OnedegOut = skFn.array.array_slice(OneDegList, start, end);	
				OnedegOut[0].totCount = index_count;
				return OnedegOut;
			} else {
				return "102";
			}
		}
		
	}
});

