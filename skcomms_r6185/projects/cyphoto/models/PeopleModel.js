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
var PeopleModelClass = defineClass({

	extend : BaseModelClass,

	name : 'PeopleModelClass',

	
	construct : function(){
		
		this.superclass();				
		
		this._init([
			"cmd",
			"cpage",
			"pageSize",
			"perpage",
			"keyword",
			"cate_cd",
			"order_cd"
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
		
		retriveThemeList : function(c_page, p_page, fnCallback){			
			var _model = this;
			
			//_model._set({currentPage:1});
			//_model._set({perPage:24});
			
			//_model._set({currentPage:c_page});
			//_model._set({keyword:keyword});
			
			skTv.gateway.request({
				requestType : 'xml_RetrieveStarThemeList_with_detail',
				params : {cmd:"list", cpage:c_page, pageSize:p_page},				
				callback : fnCallback,
				wrapperFilter : function(fd){	
													
					/*	
					alert(fd.body.result.item[0].star[0].star_total_cnt);
					
					fd.body.result.item[0].star[0].star_id = "48538084",
					fd.body.result.item[0].star[0].star_nm = "김현아",
					fd.body.result.item[0].star[0].star_thumb = "http://peopleimg.cyworld.com/thumb110x94topcenter/http://cyimg33.cyworld.com/common/file_down.asp?redirect=/330029/2011/3/2/15/khah_20110302.jpg",
					fd.body.result.item[0].star[0].star_total_cnt = "244",
					fd.body.result.item[0].theme_nm = "대학 새내기",
					fd.body.result.item[0].theme_total_cnt = "65",
					fd.body.result.item[0].theme_type = "3"								
					*/
					
					var result = [];
					
					if(fd.code!=0){	//게이트웨이 서버 에러 메시지 있을 경우
						LoadingComponent.unlock();
						PopupComponent.showTextPopup( // showErrorPopup
						fd.user_msg.title, fd.user_msg.contents, // userError[jsonData.code]
						 // ENTER, RETURN(ESC) 누를때 실행할 콜백함수
						function(){
							window.history.back();
						});
					} else {
						if(skFn.array.isArray(fd.body.result.item) == true){
							result = fd.body.result.item;
						} else {
							result[0] = {
								star : fd.body.result.item.star,
								theme_copy : fd.body.result.item.theme_copy,
								theme_item : fd.body.result.item.theme_item_seq,
								theme_nm : fd.body.result.item.theme_nm,
								theme_total_cnt : fd.body.result.item.theme_total_cnt,
								theme_type : fd.body.result.item.theme_type								
							};	
						}
						
					}
										
					return result;
				}
				
			});
		},
		
		searchStarList : function(c_page, p_page, keyword, fnCallback){			
			var _model = this;
			
			//_model._set({currentPage:1});
			//_model._set({perPage:24});
			
			//_model._set({currentPage:c_page});
			//_model._set({keyword:keyword});
			
			skTv.gateway.request({
				requestType : 'xml_starSearchList',
				params : {cpage:c_page, perpage:p_page, keyword:encodeURIComponent(keyword), cate_cd:0, order_cd:1},				
				callback : fnCallback,
				wrapperFilter : function(fd){	
													
					/*
					alert(fd.body.result.item.star_nm);
					
					fd.body.result.item.career = "2008년 문화관광부 11월의 우수 신인 음반 선정",
					fd.body.result.item.category_cd = "1",
					fd.body.result.item.gender_flag = "2",
					fd.body.result.item.image_path = "http://peopleimg.cyworld.com/thumb110x94topcenter/http://cyimg31.cyworld.com/common/file_down.asp?redirect=/310023/2010/7/12/62/20100712_IU.jpg",
					fd.body.result.item.intro = "실력파 여고생 가수 아이유",
					fd.body.result.item.star_id = "63811332",
					fd.body.result.item.star_item_seq = "25905",
					fd.body.result.item.star_nm = "아이유",
					fd.body.result.total_fan_cnt = "136297",
					fd.body.result.total_row_cnt = "1"													
					*/
					
					if (fd.code != 0) { //게이트웨이 서버 에러 메시지 있을 경우
						LoadingComponent.lock(false);
						PopupComponent.showTextPopup( // showErrorPopup
						fd.user_msg.title, fd.user_msg.contents, // userError[jsonData.code]
						 // ENTER, RETURN(ESC) 누를때 실행할 콜백함수
						function(){
							window.history.back();
						});
					} else {
						if (!fd.body.result.error_code) {
							var result = [];
							
						if (skFn.array.isArray(fd.body.result.item) == true) {
							result = fd.body.result.item;
						} else { //결과가 1건이라 배열이 아닌 경우
							result[0] = {
								career: fd.body.result.item.career,
								category_cd: fd.body.result.item.category_cd,
								gender_flag: fd.body.result.item.gender_flag,
								image_path: fd.body.result.item.image_path,
								intro: fd.body.result.item.intro,
								star_id: fd.body.result.item.star_id,
								star_item_seq: fd.body.result.item.star_item_seq,
								star_nm: fd.body.result.item.star_nm,
								total_fan_cnt: fd.body.result.item.total_fan_cnt,
								total_row_cnt: fd.body.result.item.total_row_cnt
							};
						}							
							return result;
							
						} else if (fd.body.result.error_code) {
							return 	fd.body.result.error_code;				
						}
					}
					
					
					
				}
				
			});
		}
		
		
	}
});

