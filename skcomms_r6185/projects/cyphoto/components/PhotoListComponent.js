//Page Handler Component
		var PhotoListComponent = {
			pageLen : 3,		//<---- DO NOT TOUCH
			
			error : {
				code : 0,			//Gateway Server 응답 코드
				user_msg : null,		//사용자 메세지
				sys_msg : ''		//시스템 메세지
			},
		//Page circular queue object
			Page : [],			//Page Object which contains items
			model : null,

		//Circular Queue Pointer
			head : null,
			tail : null,
			current : null,
			
		//Page variables
			perPage : null,	//The number of items per page
			cPage : 1,			//current page num
			lastPage : 1,		//last page num
			totalCount : 0,		//total Item Count
			direction : '',		//paging direction
		
			fnCallBack : null,
			model : null,
			method : null,
		//생성할 Item 형식 정의
			ItemObject : function(){
				var item = {
					photoVmUrl : null,
					title : null,
					itemSeq : null,
					writeDate : null,
					writerId : null,
					writerName : null,
					replyCount : null
				};
				return item;
			},

		//Initialize with the number of items per page
		//페이지 당 item 갯수와 AJAX call을 처리할 "retrieveList" method 를 포함한 model 객체를 세팅
			init : function(itemsPerPage, model, method){
//				skFn.debug.log('PhotoListComponent > init('+itemsPerPage+', '+model+') is called');

				if(model){	this.model = model;	}
				if(method){	this.method = method;	}

				//Initialize variables
				if(itemsPerPage){	this.perPage = Number(itemsPerPage); }
				if(this.perPage < 2) this.perPage = 2;
				this.cPage = 1;
				this.direction = '';
				
				//이미 초기화가 되어있는 경우라면, Object 생성은 생략하고 변수만 초기화
				if(this.head != null){
					for(i = 0; i < this.pageLen+2 ; i++)
					{
						for (j = 0;j < this.perPage ; j ++ )
						{
								this.Page[i].item[j] = this.ItemObject();
						}
						
					}
				}
				else {
					//Set Ajax parameter
					this.model._set({cPage : 1, perPage : this.perPage * 3});
					
					for(var i = 0; i < this.pageLen+2 ; i++)
					{
						this.Page[i] = new Object();
						this.Page[i].item = new Object();
						this.Page[i]._prev = null;
						this.Page[i]._next = null;
						if(i != 0){
							this.Page[i]._prev = this.Page[i-1];
							this.Page[i-1]._next = this.Page[i];
						}
						for(var j = 0; j < this.perPage; j++)
						{
							
							this.Page[i].item[j] = this.ItemObject();
						}
					}
				}	
				this.head = this.Page[0];
				this.current = this.Page[0];
				this.tail = this.Page[this.pageLen+1];
			
				//Make circular queue
				this.head._prev = this.tail;
				this.tail._next = this.head;
				

				return false;
			},
			
			/**
			 * API cPage를 조작하여 AJAX Call 을 하는 함수 
			 **/
			retrieveListByPage : function(cPage,fnCallBack){
				PhotoListComponent.init();
//				skFn.debug.log('PhotoListComponent > retrieveListByPage() is called');
				PhotoListComponent.cPage = (cPage-1) * 3 + 1;
				PhotoListComponent.fnCallBack = fnCallBack;
				PhotoListComponent.model._set({cPage:cPage});
				PhotoListComponent.method(PhotoListComponent.model, PhotoListComponent.setPageList);
				return false;
			},
			
			/**
			 *	itemNo를 사용하여 page setting 을 가져옴
			 *
			 * @function
			 * @param	{Integer}	0 ... n
			 * @param	{function}	call back 함수
			 * @return	{Object}	
			 *						{apiPage : Integer, handlerPage : Integer, handlerPos : Integer , focusPos : Integer}
			 *
			 *						apiPage		: model		에서 제어하는 cPage				(1, ..., n)
			 *						handlerPage	: handler	에서 제어하는 cPage				(1, ..., n)
			 *						handlerPos  : apiPage	내 에서의 handler page position	(0, 1, ..., n)
			 *						focusPos	: handler Page 내에서의 item focus position	(0, 1, ..., n)
			 */
			retrieveListByItemNo : function(itemNo, fnCallBack){
				PhotoListComponent.init();
//				skFn.debug.log('PhotoListComponent > getPageInfoByItemNo() is called');
				itemNo++;
				var apiPage		= Math.ceil((itemNo / (PhotoListComponent.perPage * 3)));
//				alert("apiPage=" + apiPage);
				var handlerPage = Math.ceil((itemNo / PhotoListComponent.perPage));
				var handlerPos	= Math.ceil((handlerPage - 1) % 3);

				var focusPos	= Math.ceil(--itemNo % PhotoListComponent.perPage);
//				var JSONData = '{"apiPage":' + apiPage + ',"handlerPage":' + handlerPage + ',"handlerPos":' + handlerPos + ',"focusPos":' + focusPos +'}';
//				PhotoListComponent.cPage = handlerPage-handlerPos;
//				alert(JSONData+"\nPhotoListComponent.cPage="+PhotoListComponent.cPage);
				

//				if(setting == true){
					//첫 페이지 일 때
				/*	if (handlerPos == -1){
						PhotoListComponent.retrieveListByPage(apiPage, function(){
							PhotoListComponent.movePage("PREV",fnCallBack);
						});
					}*/
					
					if(handlerPos == 0){
						PhotoListComponent.retrieveListByPage(apiPage, function(){
							if(PhotoListComponent.isPageExist("NEXT") == "NOT_EXIST"){
								if(PhotoListComponent.isPageExist("PREV") != "NOT_EXIST"){
									PhotoListComponent.movePage("PREV",function(){
										PhotoListComponent.movePage("NEXT", fnCallBack);
									});
								}else{
									fnCallBack();
								}
								
								
							}else{
								PhotoListComponent.movePage("NEXT",function(){
									PhotoListComponent.movePage("PREV", fnCallBack);
								});
							}

						});
					} else if (handlerPos == 2)	{
						PhotoListComponent.retrieveListByPage(apiPage, function(){
							if(PhotoListComponent.isPageExist("NEXT") == "NOT_EXIST"){
								fnCallBack();
							}else{
								PhotoListComponent.movePage("NEXT", function(){
									PhotoListComponent.movePage("NEXT", fnCallBack);
								});
							}
						});
					}
					else{
						PhotoListComponent.retrieveListByPage(apiPage, function(){
							if(PhotoListComponent.isPageExist("NEXT") == "NOT_EXIST"){
								fnCallBack();
							}else{
								PhotoListComponent.movePage("NEXT",fnCallBack);
							}
						});
					}
/*				}
				else{
					alert("PhotoListComponent.perPage="+PhotoListComponent.perPage+"\n"+JSONData);
					return eval('('+JSONData+')');
				}*/
			},
			
			/**
			 * 페이지 이동이 가능한지 확인
			 * @function
			 * @param {String}		NEXT | PREV
			 * @return {String}		NOT_EXIST | EXIST_CACHE | EXIST_AJAX_CALL
			 */
		
			isPageExist : function(direction){
				//skFn.debug.log('PhotoListComponent > isPageExist() is called');
				var pageStatus = "NOT_EXIST";
				var node = this.current;
				if(direction == 'NEXT' ){
					if(this.cPage != this.lastPage){
						if(this.cPage == this.lastPage-1){
							pageStatus = "EXIST_CACHE";
						}
						else if(node._next._next == this.head || node._next._next.item[0].title == null){
							pageStatus = "EXIST_AJAX_CALL";
						}
						else	pageStatus = "EXIST_CACHE";
					}
				}else if (direction == 'PREV'){
					if(this.cPage != 1){
						if(node._prev._prev == this.tail && this.cPage != 2) pageStatus = "EXIST_AJAX_CALL";
						else if(node._prev._prev.item[0].title == null && this.cPage > 2) {
							pageStatus = "EXIST_AJAX_CALL";
						}
						else  pageStatus = "EXIST_CACHE";
					}
				}
				
//				alert("this.cPage = "+this.cPage+"\nthis.lastPage = "+this.lastPage + "\nSTATUS = "+pageStatus);
				
				return pageStatus;
			},
			
			/**
			 * 페이지 이동
			 *
			 * @function
			 * @param {String}		NEXT | PREV
			 * @param {fnCallBack}	실행 후 photoData : {array} 를 받아 수행 할 함수.
			 * @return {String}		이동가능 : true | 이동불가 : false
			 */
			movePage : function(direction, fnCallBack){
//				alert('PhotoListComponent > movePage('+direction+', '+fnCallBack+') is called');
//				skFn.debug.log('PhotoListComponent > movePage('+direction+') is called');
				this.fnCallBack = fnCallBack;				
				this.direction = direction;
				//페이지 이동 가능 확인
				if(this.isPageExist(direction) == "NOT_EXIST") {
					return false;
				}
				else{
					//캐쉬에 없다면,
					if (this.isPageExist(direction) == "EXIST_AJAX_CALL"){
						
						//AJAX CALL을 위한 무브
						if(direction ==  'NEXT'){
							//포인터 재설정
							//초기 call 숫자에 대한 예외처리
							if(this.cPage % 3 == 1 ){
								this.head = this.head._next;
								this.tail = this.tail._next;
							}
							else if(this.cPage % 3 == 2){
								this.head = this.current;
								this.tail = this.head._prev;
							}
							
							this.current = this.current._next;
							//Ajax Call 
							this.cPage++;
							var cPage = this.model._get('cPage') + 1;
							this.model._set({cPage : cPage});
							this.method(PhotoListComponent.model, this.setPageList);
						}
						else if(direction == 'PREV'){
							
							//포인터 재설정
							if(this.cPage % 3 == 0){
//								alert("this.cPage % 3 == 0");
								this.head = this.head._prev;
								this.tail = this.tail._prev;

							}
							else if(this.cPage % 3 == 2){
//								alert("this.cPage % 3 == 2");
								this.tail = this.head._next;
								this.head = this.tail._next;
							}
							else{
								this.head = this.head._prev._prev._prev;
//								alert(this.head.item[2].title);
								this.tail = this.head._prev;
							}
//							alert(this.head.item[2].title);
/*							this.head = this.current._prev._prev._prev;
							this.tail = this.head._prev;*/
							//Ajax Call 
							this.cPage--;
							this.current = this.current._prev;
							
							var cPage = this.model._get('cPage') - 1;
							this.model._set({cPage : cPage});
							this.method(PhotoListComponent.model, this.setPageList);
						}
					}
					//캐쉬에 있다면
					else if(this.isPageExist(direction) == "EXIST_CACHE"){
						if (direction == 'NEXT'){
							this.cPage++;
							this.current = this.current._next;
						}else if (direction == 'PREV'){
							this.cPage--;
							this.current = this.current._prev;
						}
						this.fnCallBack();
					}
				}
				return true;
				
				
			},

			/**
			 *	Ajax call 부터의 받은 JSON Data 를 Circular Queue에 입력 & 마지막 페이지 Number 계산
			 *	- PhotoModel 의 콜백 함수.
			 *
			 * @function
			 * @param {String}		responstJSON
			 * @return {Boolean}	true | false
			 */
			setPageList : function(responseJSON){
//				skFn.debug.log('PhotoListComponent > setPageList() is called');
				var node = PhotoListComponent.current;
				var j = 0, i = 0;

				PhotoListComponent.error.code = responseJSON.code;
				PhotoListComponent.error.user_msg = responseJSON.user_msg;
				//정상 응답이 아닐 때				
				if(responseJSON.code != 0){
					PhotoListComponent.lastPage = 1;
					PhotoListComponent.totalCount = 0;
					if(PhotoListComponent.fnCallBack != null) {
						PhotoListComponent.fnCallBack();
					}
//					alert("test");
					return false;
				}
				//정상응답을 받았을 때
				else{
					try{
						//사진이 없을 때
						if(responseJSON.body.result == ''){
							PhotoListComponent.lastPage = 1;
							PhotoListComponent.totalCount = 0;
							if(PhotoListComponent.fnCallBack != null) {
								PhotoListComponent.fnCallBack();
							}
							return false;
						}
						else{

							//노드 설정
							
							if(PhotoListComponent.direction == 'NEXT')	{
								if(node._next == PhotoListComponent.tail)	node = PhotoListComponent.current._prev;
								else	node = PhotoListComponent.current._next;
							}
							else if(PhotoListComponent.direction == 'PREV')	{
									node = PhotoListComponent.head;

							}
							
							//사진이 한장일때
							if(responseJSON.body.ArrayOfPhotoItem.PhotoItem.length == null || responseJSON.body.ArrayOfPhotoItem.PhotoItem.length == 0){
								PhotoListComponent.lastPage = Math.ceil(responseJSON.body.ArrayOfPhotoItem.PhotoItem.totalCount / PhotoListComponent.perPage);
								PhotoListComponent.totalCount = responseJSON.body.ArrayOfPhotoItem.PhotoItem.totalCount;

								node.item[j].photoVmUrl = responseJSON.body.ArrayOfPhotoItem.PhotoItem.photoVmUrl;
								node.item[j].title = responseJSON.body.ArrayOfPhotoItem.PhotoItem.title;
								node.item[j].itemSeq = responseJSON.body.ArrayOfPhotoItem.PhotoItem.itemSeq;

								node.item[j].writeDate = responseJSON.body.ArrayOfPhotoItem.PhotoItem.writeDate;
								node.item[j].writerId = responseJSON.body.ArrayOfPhotoItem.PhotoItem.writerId;
								node.item[j].writerName = responseJSON.body.ArrayOfPhotoItem.PhotoItem.writerName;
								node.item[j].replyCount = responseJSON.body.ArrayOfPhotoItem.PhotoItem.replyCount;
								
								i++;j++;
							}
							//사진이 한장 이상
							else{
								
								//마지막 페이지 계산
								PhotoListComponent.lastPage = Math.ceil(responseJSON.body.ArrayOfPhotoItem.PhotoItem[0].totalCount / PhotoListComponent.perPage);
								PhotoListComponent.totalCount = responseJSON.body.ArrayOfPhotoItem.PhotoItem[0].totalCount;

								for(i = 0; i < responseJSON.body.ArrayOfPhotoItem.PhotoItem.length; i++){
									if(j == PhotoListComponent.perPage) {
										if(node == node.tail && PhotoListComponent.direction != 'PREV'){
											break;
										}
										else{
											node = node._next;
											j = 0;	
										}
									}
									node.item[j].photoVmUrl = responseJSON.body.ArrayOfPhotoItem.PhotoItem[i].photoVmUrl;
									node.item[j].title = responseJSON.body.ArrayOfPhotoItem.PhotoItem[i].title;
									node.item[j].itemSeq = responseJSON.body.ArrayOfPhotoItem.PhotoItem[i].itemSeq;

									node.item[j].writeDate = responseJSON.body.ArrayOfPhotoItem.PhotoItem[i].writeDate;
									node.item[j].writerId = responseJSON.body.ArrayOfPhotoItem.PhotoItem[i].writerId;
									node.item[j].writerName = responseJSON.body.ArrayOfPhotoItem.PhotoItem[i].writerName;
									node.item[j].replyCount = responseJSON.body.ArrayOfPhotoItem.PhotoItem[i].replyCount;
									j++;
								}
							}
							//남은 공간 빈처리
							if(i < PhotoListComponent.model._get('perPage')){
								while(node != PhotoListComponent.tail._next){
									while(j < PhotoListComponent.perPage){
										node.item[j].photoVmUrl =	null;
										node.item[j].title		=	null;
										node.item[j].itemSeq	=	null;

										node.item[j].writeDate	=	null;
										node.item[j].writerId	=	null;
										node.item[j].writerName =	null;
										node.item[j].replyCount =	null;
										j++;
									}
									node = node._next;
									j = 0;
								}
							}
							if(PhotoListComponent.fnCallBack != null)		PhotoListComponent.fnCallBack();
						}
					}catch(e){
						PhotoListComponent.lastPage = 1;
						PhotoListComponent.totalCount = 0;
						if(typeof PhotoListComponent.fnCallBack === 'function'){		
							PhotoListComponent.fnCallBack();
						}
						return false;
					}
				}
				return true;
			},
			getParam : function (param){
				return this.model._get(param);
			},
			setFolderNo : function(folderNo){
				this.model._set({folderNo : folderNo});
			},
			setTargetId : function(targetId){
				this.model._set({targetId : targetId});
			},
			setThemeId : function(themeId){
				this.model._set({themeId : themeId});
			},
			/*getFolderNo : function(){
				return this.model._get("folderNo");
			},
			getTargetId : function(){
				return this.model._get("targetId");
			},*/
			/**
			 * currentPage와 이전, 다음을 포함하여 총 3개 페이지 Item Object 리턴
			 *
			 * @function
			 * @return {Object}		pageList[3].item[] | false
			 */
			getCurrentItemList : function (){
//				skFn.debug.log('PhotoListComponent > getPageList() is called');

				var isItemExist = false;

				var node = PhotoListComponent.current._prev;

				var pageList = new Array(3);
				for(var i = 0; i < 3; i++)
				{
					pageList[i] = node;
					if(pageList[i].item[0].photoVmUrl != null) { isItemExist = true; }
					node = node._next;
				}
				if(isItemExist == false) { return isItemExist; }
				else	{	return pageList;	}
			},

			/**
			 * 현재 focus 된 사진 위치를 받아 itemNo 를 리턴
			 *
			 * @function
			 * @param	{Integer}	0 ... n
			 * @return	{Integer}	0 ... n
			 */
			getItemNo : function(focus){
				//skFn.debug.log('PhotoListComponent > getItemPos() is called');
				var itemNo = ((PhotoListComponent.cPage-1) * PhotoListComponent.perPage) + focus;
				return itemNo;
			},
			/**
			 * 현재 페이지 정보들(api 페이지, handler 페이지, 총 아이템수) 을 리턴
			 *
			 * @function
			 * @return	{Object}	{api : {cPage : "integer", lastPage : "integer"}, handler : { cPage : "integer", lastPage : "integer"}, totalCount : "integer"}
			 */
			getPageInfo : function(){
				var apiPage = Math.ceil(PhotoListComponent.cPage / 3);
				var apiLastPage = Math.ceil(PhotoListComponent.totalCount / (PhotoListComponent.perPage*3));
				//skFn.debug.log('PhotoListComponent > getPageNumber() is called');
				var JSONData = '{ "api" : {"cPage" : '+apiPage+',"lastPage" : '+apiLastPage+'}, "handler" : {"cPage":'+PhotoListComponent.cPage+', "lastPage":'+PhotoListComponent.lastPage+'}, "totalCount":'+PhotoListComponent.totalCount+' }';
				return eval('('+JSONData+')');
			},
			/**
			 * 이미지 resize 해주는 함수
			 *
			 * @function
			 *
			 * @param {int}	width	: fix시킬 width
			 * @param {int}	height	: fix시킬 height
			 * @param {Object}		: 변경 할 img element
			 * @param {url}			: 변경할 img url
			 *
			 * @return	{void}
			 */
			resizeImg : function (width, height, obj, url, fnCallBack) {
				
//				obj.removeAttribute("onload");
				
				//setTimeout(function(){
//					obj.removeAttribute("width");
//					obj.removeAttribute("height");		
				//}, );
				if(!url || obj.src == url){
//					skFn.debug.log('PhotoListComponent not URL > resizeImg('+obj.width+', '+obj.height+','+obj+','+url+') is called');
					if(obj.width > obj.height && obj.width > width) {
						
						obj.height = (width * obj.height)/obj.width;
						obj.width = width;
					} else if(obj.width < obj.height && obj.height > height){
//						obj.style.visibility = "hidden";
						obj.width = (height * obj.width) / obj.height;
						obj.height = height;
					}
					setTimeout(function(){
						obj.style.visibility = 'visible'
						if(fnCallBack){
							fnCallBack();
						}
					;}, 1);
					
				}
				else{
//					skFn.debug.log('PhotoListComponent URL > resizeImg('+obj.width+', '+obj.height+','+obj+','+url+') is called');
					obj.style.visibility = "hidden";
					obj.removeAttribute("width");
					obj.removeAttribute("height");
					obj.src = url;
					obj.onload = function(){
						if(obj.width > obj.height && obj.width > width) {
							obj.style.visibility = "hidden";
							obj.height = (width * obj.height)/obj.width;
							obj.width = width;
							setTimeout(function(){ obj.style.visibility = 'visible';}, 1);
						} else if(obj.width < obj.height && obj.height > height){
							obj.style.visibility = "hidden";
							obj.width = (height * obj.width) / obj.height;
							obj.height = height;
							setTimeout(function(){ obj.style.visibility = 'visible';}, 1);
						}
						else {
							if(obj.width == obj.height){
								var size = (width > height) ? height : width;
								if(obj.width > width || obj.height > height){
									obj.width = size;
									obj.heght = size;
								}
							}
						}
						setTimeout(function(){ 
							obj.style.visibility = 'visible'
							if(typeof(fnCallBack) == 'function'){
								fnCallBack();
							}			
						;}, 1);
					
					};
					obj.onerror = function(){
						obj.style.visibility = 'visible';
						if(typeof(fnCallBack) == 'function'){						
							fnCallBack();
						}
					};
				}				
			}
		};