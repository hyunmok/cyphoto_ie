/**
 *
 * BlogPhotoListController.js
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

				[2011-03-14 오후 4:14:30/ Park, Soonyoung]

				
				
 * @_tutorial		
 * @_version		
 * @_abstract
 * @_final			
 * @_internal
 * 
 * @internal ************************* [ file info. end ] *********************************
 */


/**
 * BlogPhotoList Controller
 */


var BlogPhotoListControllerClass = defineClass({

	extend : BaseControllerClass,

	name : 'BlogPhotoListControllerClass',


	/**
	 * 생성자 : 컨트롤러 인스턴스 초기화
	 */
	construct : function(themeId, itemNo){
		
		// 상위클래스에 체이닝
		this.superclass();
		this._init([
		    'itemNo',
			'itemIndex'
		]);
		if(!itemNo) itemNo = 0;
		this._set({itemNo:itemNo});
		
		//포토 모델 인스턴스 생성
		this.model = new PhotoModelClass();

		//item perPage 갯수와 AJAX call을 처리할 "retrieveList" method 를 포함한 model 객체를 세팅
		//PhotoListComponent 는 초기화 되며 model 객체가 사용할 perPage 를 자동으로 설정해준다.
		PhotoListComponent.init(4, this.model, this.model.blog_retrieveList);
		this.model._set({themeId : themeId});
//		this.addMouseEvent();
		//ItemNo에 따라 Ajax Call 하고 callback 함수를 실행한다.
		// @ param	{integer}	itemNo
		// @ param	{function}	fnCallBack
		PhotoListComponent.retrieveListByItemNo(this._get("itemNo"), this.display);

	},

	/*
		detail 로 이동 할 때, 자체적 메소드로 빼고

	*/

	/**
	 * 인스턴스 메써드
	 */
	methods : {

		/**
		 *	Show
		 *	이전, 다음 direction 혹은 folderNo를 받아 알맞은 결과를 출력한다.
		 *
		 * @param {String} direction : PREV | NEXT | FOLDER 
		 * @param {int}		folderNo 
		 * @return return  true | false
		 */

		show : function (direction, themeId){
			
			skFn.debug.log('BlogPhotoListControllerClass > show() is called');
			var _this = this;
			// handleShow 일때 initialize
			if(direction){
				//themeId 를 받아왔을 때,
				if(direction == "THEME"){
					//초기화
					_this.model._set({themeId:themeId});
					$("#SceneStockCategory > div ul li").removeClass("over");
					$("#SceneStockCategory > div ul li:eq("+themeId+")").addClass("over");
					PhotoListComponent.init(4, _this.model);				
					//락을 건다.
					LoadingComponent.lock(true);
					//받아옴
					PhotoListComponent.retrieveListByItemNo(0, _this.display);
				}
				//direction 이 존재할 때
				else{
					if(PhotoListComponent.isPageExist(direction) != 'NOT_EXIST'){
						LoadingComponent.lock(true);
						skFn.debug.log('Lock true');
					}
					
					//페이지 이동
					PhotoListComponent.movePage(direction, function(){
						_this.animate(direction, _this.display);
					});
				}
				return true;
			}
			return false;
		},

		
		/**
		 *	focus On
		 *	
		 *	@return void
		 */
		focusOn : function(param, focus){
			var liNum;
			if(!param || param == null){
				if (!focus){
					focus = 0;
				}
				var focusNum = focus+4;
				skTv.zone.focus('StockList');
				$('#ul_list_stock li').removeClass("focus");
				$('#ul_list_stock li:eq('+focusNum+')').addClass("focus");
				
			}
			else if (typeof(param) == "object")
			{
				skTv.zone.focus('StockList');
				$('#ul_list_stock li').removeClass("focus");
				$(param).addClass("focus");
			}
			else{
				focus = this._get('itemIndex');
				for(var i = 0 ; i < 4; i++){
					liNum = i + 4;
					if ($('#ul_list_stock li:eq('+liNum+')').attr('class') == 'focus' || $('#ul_list_stock li:eq('+liNum+')').attr('class') == 'second focus'){
						if( (liNum == 4 && param == 'PREV') || (liNum ==7 && param == 'NEXT')){
							if(PhotoListComponent.isPageExist(param) != 'NOT_EXIST'){
								if(liNum == 4) {
									focus = 3;
								}
								else {
									focus = 0;
								}
								this.show(param);								
							}
						}
						else{
							if(param == 'NEXT'){
								if($("#ul_list_stock > li:eq("+(++liNum)+")").css("visibility") == "visible"){
									$('#ul_list_stock li:eq('+(--liNum)+')').removeClass("focus");		
									$('#ul_list_stock li:eq('+(++liNum)+')').addClass("focus");
									focus++;
								}
							} else if (param =='PREV')	{
								if($("#ul_list_stock > li:eq("+(--liNum)+")").css("visibility") == "visible"){
									$('#ul_list_stock li:eq('+(++liNum)+')').removeClass("focus");		
									$('#ul_list_stock li:eq('+(--liNum)+')').addClass("focus");
									focus--;
								}
							}
							
						}
						break;
					}
				}
			}
			this._set({itemIndex : focus});
			return false;
			
		},


		/**
		 * focus Off
		 * @return void
		 */
		focusOff : function(){
			this._set({itemIndex : 0});
			$('#ul_list_stock li').removeClass("focus");
			$("#BtnPrev").attr("class", "list_prev list_prev_off");
			$("#BtnNext").attr("class", "list_next list_next_off");
		},
		
		/**
		*	Show 에서 ajaxCall 로 요청한 결과값으로 UI Handling 하는 콜백 함수
		*
		*	@param	{String}	direction
		*	@return false
		*/
		display : function(direction){
			skFn.debug.log('STARTS : BlogPhotoListController > display()');
			skFn.debug.log('BlogPhotoListController > display() is called');
			//오류 처리
			if(PhotoListComponent.error.code != 0){
				// 팝업을 띄운다
				PopupComponent.showTextPopup( // showErrorPopup
					PhotoListComponent.error.user_msg.title,
					PhotoListComponent.error.user_msg.contents, // userError[jsonData.code]
					// ENTER, RETURN(ESC) 누를때 실행할 콜백함수
					function(){
						window.history.back(); 
					}
				);
			}
			//정상응답
			else{
				//갱신할 페이지 넘버를 가지고 온다.
				var pageInfo = PhotoListComponent.getPageInfo();

				//현재 Page의 item을 받아온다.
				var photoList = PhotoListComponent.getCurrentItemList();
				var k = 0;

				var infoList = $("#ul_list_stock div.info");	//인포 Element list cache
				var infoElement = null;		//info element cache
				var imgElementList = $("#ul_list_stock img");	//img Element list cache
				var imgElement = null;	// img element cache
				var liElementList = $("#ul_list_stock li");	//img Element list cache
				var liElement = null;	// li element cache
				
				for(var i = 0; i < 3; i++){
					for(var j = 0; j < PhotoListComponent.perPage; j++){
						//새로 생성한 <li>를 update 한다.
						if((direction == 'NEXT' && i == 2) || (direction == 'PREV' && i == 0) || !direction){
							infoElement = infoList.eq(k);
							liElement = liElementList.eq(k);	//cache 저장
							imgElement = imgElementList.eq(k); //cache 저장
							if(photoList[i].item[j].itemSeq == null){
								infoElement.css("visibility", "hidden");
								liElement.css("visibility", "hidden");
								imgElement.css("display", "none");
							}
							else{
								PhotoListComponent.resizeImg(220, 213,imgElementList[k], THUMB_IMG_URL_220X213+photoList[i].item[j].photoVmUrl);
								infoElement.css("visibility", "visible");
								liElement.css("visibility", "visible");
								imgElement.css("display", "inline");
								imgElement.css("visibility", "visible");
								skFn.dom.setHtml(infoList.eq(k).children().children()[0], photoList[i].item[j].title);		//title
								skFn.dom.setHtml(infoList.eq(k).children().children().next()[0], photoList[i].item[j].writerName);	//date
							}
						}
						k++;
					}
				}

				/*
				//alert("2-1");
				for(var i = 0; i < 3; i++){
					for(var j = 0; j < PhotoListComponent.perPage; j++){
						//새로 생성한 <li>를 update 한다.
						if((direction == 'NEXT' && i == 2) || (direction == 'PREV' && i == 0) || !direction){
							//skFn.debug.log(i+" = "+photoList[i].item[j].photoVmUrl);
							if(photoList[i].item[j].itemSeq == null){
								$("#ul_list_stock > li:eq("+k+")").css("visibility", "hidden");
								$("#ul_list_stock > li:eq("+k+") img").css("display", "none");
							}
							else{
								$("#ul_list_stock > li:eq("+k+")").css("visibility", "visible");
								$("#ul_list_stock > li:eq("+k+") img").css("display", "inline");
								PhotoListComponent.resizeImg(220, 213,$("#ul_list_stock > li img")[k], THUMB_IMG_URL_220X213+photoList[i].item[j].photoVmUrl);
								$("#ul_list_stock > li div.title:eq("+k+")").html(photoList[i].item[j].title);
								$("#ul_list_stock > li div.user:eq("+k+")").html(photoList[i].item[j].writerName);
								//댓글이 1999 넘어갔을 때의 처리
							}
						}
						k++;
					}
				}
				*/
				//alert("2-2");
				//페이지 번호 및 총 사진 개수 갱신

				$("#PageNum").html(pageInfo.handler.cPage+'/'+pageInfo.handler.lastPage);
				$("#TotalCount").html("(총"+pageInfo.totalCount+"장)");

				
				
				//Focus 재배치
				if(direction == "NEXT"){
					if(skTv.zone.getCurZone() == 'StockList'){
						$('#ul_list_stock li').removeClass("focus");
						$('#ul_list_stock li:eq(4)').addClass("focus");
					}
					BlogPhotoListController._set({itemIndex : 0});
				}
				else if (direction == "PREV")
				{
					if(skTv.zone.getCurZone() == 'StockList'){
						$('#ul_list_stock li').removeClass("focus");
						$('#ul_list_stock li:eq(7)').addClass("focus");
					}
					BlogPhotoListController._set({itemIndex : 3});
				}
				
				skFn.debug.log('FIN : BlogPhotoListController > display()');
				if(direction != 'NEXT' && direction != 'PREV'){
					LoadingComponent.unlock();
					skFn.debug.log('Lock false');
				}
			}
			return false;
		},

		/**
		*	Animation 동작 함수.
		*
		*	@param	{String}	direction
		*	@param	{String}	function callback
		*	@return false
		*/
					


		animate : function(direction, fnCallBack) {
			skFn.debug.log('STARTS : BlogPhotoListController > animate()');
			var LI_html =	'<li>																	   ';      
				LI_html +=	'	<div class="box">                                                      ';     
				LI_html +=	'		<table cellpadding="0" cellspacing="0">                            ';     
				LI_html +=	'			<tr>                                                           ';     
				LI_html +=	'				<td valign="middle" height="213">                          ';     
				LI_html +=	'					<img />                      ';     
				LI_html +=	'				</td>                                                      ';     
				LI_html +=	'			</tr>                                                          ';     
				LI_html +=	'		</table>                                                           ';     
				LI_html +=	'	</div>                                                                 ';     
				LI_html +=	'	<div class="info">                                                     ';     
				LI_html +=	'		<div class="text">                                                 ';     
				LI_html +=	'			<div class="title"></div>                                      ';     
				LI_html +=	'			<div class="user"></div>                                       ';     
				LI_html +=	'		</div>                                                              ';    
				LI_html +=	'	</div>                                                                  ';    
				LI_html +=	'</li>                                                                       ';      
				LI_html +=	'<li>																		';      
				LI_html +=	'	<div class="box">                                                      ';     
				LI_html +=	'		<table cellpadding="0" cellspacing="0">                            ';     
				LI_html +=	'			<tr>                                                             ';   
				LI_html +=	'				<td valign="middle" height="213">                            ';   
				LI_html +=	'					<img />                       ';   
				LI_html +=	'				</td>                                                        ';   
				LI_html +=	'			</tr>                                                            ';   
				LI_html +=	'		</table>                                                             ';   
				LI_html +=	'	</div>                                                                   ';   
				LI_html +=	'	<div class="info">                                                       ';   
				LI_html +=	'		<div class="text">                                                   ';   
				LI_html +=	'			<div class="title"></div>                                        ';   
				LI_html +=	'			<div class="user"></div>                                         ';   
				LI_html +=	'		</div>                                                               ';   
				LI_html +=	'	</div>                                                                   ';   
				LI_html +=	'</li>                                                                         ';    
				LI_html +=	'<li>																		';   
				LI_html +=	'	<div class="box" >                                                        ';  
				LI_html +=	'		<table cellpadding="0" cellspacing="0">                              ';   
				LI_html +=	'			<tr>                                                             ';   
				LI_html +=	'				<td valign="middle" height="213">                            ';   
				LI_html +=	'					<img />                       ';   
				LI_html +=	'				</td>                                                        ';
				LI_html +=	'			</tr>                                                            ';
				LI_html +=	'		</table>                                                             ';
				LI_html +=	'	</div>                                                                   ';
				LI_html +=	'	<div class="info">                                                       ';
				LI_html +=	'		<div class="text">                                                   ';
				LI_html +=	'			<div class="title"></div>                                        ';
				LI_html +=	'			<div class="user"></div>                                         ';
				LI_html +=	'		</div>                                                               ';
				LI_html +=	'	</div>                                                                   ';
				LI_html +=	'</li>                                                                          ';
				LI_html +=	'<li>																			';
				LI_html +=	'	<div class="box">                                                        ';
				LI_html +=	'		<table cellpadding="0" cellspacing="0">                              ';
				LI_html +=	'			<tr>                                                             ';
				LI_html +=	'				<td valign="middle" height="213">                            ';
				LI_html +=	'					<img />                            ';
				LI_html +=	'				</td>                                                        ';
				LI_html +=	'			</tr>                                                            ';
				LI_html +=	'		</table>                                                             ';
				LI_html +=	'	</div>                                                                   ';
				LI_html +=	'	<div class="info">                                                       ';
				LI_html +=	'		<div class="text">                                                   ';
				LI_html +=	'			<div class="title"></div>                                        ';
				LI_html +=	'			<div class="user"></div>                                             ';
				LI_html +=	'		</div>                                                                   ';
				LI_html +=	'	</div>                                                                             ';
				LI_html +=	'</li>                                                                          ';

			var count = 0;
			$('#ul_list_stock').css('position', 'relative');
			if (direction == 'NEXT'){
				$('#ul_list_stock').animate({left:-1132}, 600, 'swing', function(){
					count++;
					if (count == $('#ul_list_stock').length)
					{
							$('#ul_list_stock li:lt(4)').remove();
							$('#ul_list_stock li:last').after(LI_html);
							fnCallBack(direction);
							$('#ul_list_stock').css('left', '0px');

							skFn.debug.log('DONE : BlogPhotoListController > animate()');
							LoadingComponent.unlock();
							skFn.debug.log('Lock false');
					}
				});
			} else if(direction == 'PREV'){				
				$('#ul_list_stock').animate({left:1132}, 600, 'swing', function(){					
					count++;
					if (count == $('#ul_list_stock').length)
					{
						$('#ul_list_stock li:gt(7)').remove();
						$('#ul_list_stock li:first').before(LI_html);
						fnCallBack(direction);
						$('#ul_list_stock').css('left', '0px');

						skFn.debug.log('DONE : BlogPhotoListController > animate()');
						LoadingComponent.unlock();
						skFn.debug.log('Lock false');
					}
				});
			}
			/*if (direction == 'NEXT'){
				$('#ul_list_stock li:lt(4)').remove();
				$('#ul_list_stock li:last').after(LI_html);
				$('#ul_list_stock li').css('left', '0px');

				fnCallBack(direction);
				
				if(skEnv.device.vendor == "lgcns") {
					$('#ul_list_stock li').animate({left:-1132}, 0, 'linear', function(){
						count++;
						if (count == $('#ul_list_stock li').length)
						{
								skFn.debug.log('DONE : BlogPhotoListController > animate()');
								LoadingComponent.unlock();
								skFn.debug.log('Lock false');
						}
					});				
				}
				else {
					$('#ul_list_stock li').animate({left:-1132}, 600, 'swing', function(){
						count++;
						if (count == $('#ul_list_stock li').length)
						{
								skFn.debug.log('DONE : BlogPhotoListController > animate()');
								LoadingComponent.unlock();
								skFn.debug.log('Lock false');
						}
					});
				}
			} else if(direction == 'PREV'){
				$('#ul_list_stock li:gt(7)').remove();
				$('#ul_list_stock li:first').before(LI_html);
				$('#ul_list_stock li').css('left', '-2264px');

				fnCallBack(direction);
				if(skEnv.device.vendor == "lgcns") {
					$('#ul_list_stock li').animate({left:-1132}, 0, 'linear', function(){					
						count++;
						if (count == $('#ul_list_stock li').length)
						{
								skFn.debug.log('DONE : BlogPhotoListController > animate()');
								LoadingComponent.unlock();
								skFn.debug.log('Lock false');
						}
					});					
				}
				else {
					$('#ul_list_stock li').animate({left:-1132}, 600, 'swing', function(){					
						count++;
						if (count == $('#ul_list_stock li').length)
						{
								skFn.debug.log('DONE : BlogPhotoListController > animate()');
								LoadingComponent.unlock();
								skFn.debug.log('Lock false');
						}
					});
				}
			}*/
		}
	}
});