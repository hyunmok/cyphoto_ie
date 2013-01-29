var mouseX;
var mouseY;

var zone = {
			PhotoSlide : {
				initialize : function(){
					// memory leak 이슈로 1장보기/2장보기 모드 세팅
					//PhotoSlideController = new PhotoSlideControllerClass(params.targetId, params.folderNo, params.itemNo);
					PhotoSlideController = new PhotoSlideControllerClass(params.targetId, params.folderNo, params.itemNo, params.itemCount, params.referrer);
				},
				handleShow : function(){
					
				},
				handleHide : function(){

				},
				handleFocus : function(){

				},
				handleBlur : function(){

				},
				handleKeyDown : function(keyCode){
					//PhotoSlideController.fadeHelpBar();
					switch (keyCode) {
						case skTv.keymap.UP:
							break;
						case skTv.keymap.RIGHT:
							PhotoSlideController._set({isKeyInput : true});
							PhotoSlideController.show('NEXT');
							break;
						case skTv.keymap.LEFT:
							PhotoSlideController._set({isKeyInput : true});
							PhotoSlideController.show('PREV');
							break;
						case skTv.keymap.PLAY:
							PhotoSlideController.toggleSlide(PhotoSlideController, 'play');
							break;
						case skTv.keymap.STOP:
							PhotoSlideController.toggleSlide(PhotoSlideController, 'stop');
							break;
						case skTv.keymap.RED:
							/* sophia 수정 (4.28)
							PhotoSlideController.setItemCount();
							*/
							PhotoSlideController.changeSlideViewType();
							break;
						case skTv.keymap.EXIT:
							break;
						case skTv.keymap.ENTER:
							PhotoSlideController.goToPhotoDetail();
							break;
						case skTv.keymap.RETURN:
							PhotoSlideController.goToReferrer();
							break;
					}
				},
				handleMouse : {
					"#BtnPrev" : {
						'mouseover' : function(){
							if(PhotoSlideController._get("itemTotalCount") > PhotoSlideController._get("itemCount")){
								//$("body").unbind("mousemove");
								//clearTimeout(PhotoSlideController._get("helpTimeOutId"));
								$("#BtnPrev").addClass("focus");
								$("#BtnNext").removeClass("focus");
							}
						},
						'mouseout' : function(){
							/*$("body")
							.bind("mousemove", function(event){
									if(event.pageX != mouseX || mouseY != event.pageY){
										mouseX = event.pageX;
										mouseY = event.pageY;
										PhotoSlideController.fadeHelpBar();	
									}
							});*/
							$("#BtnPrev").removeClass("focus");
							//PhotoSlideController.fadeHelpBar();
							HelpComponent.showWithfade();
						},
						'click' : function(){
							if(PhotoSlideController._get("itemTotalCount") > PhotoSlideController._get("itemCount")){
								PhotoSlideController._set({isKeyInput : true});
								PhotoSlideController.show('PREV');
								//PhotoSlideController.fadeHelpBar();
							}
						}
					},
					"#BtnNext" : {
						'mouseover' : function(){
							if(PhotoSlideController._get("itemTotalCount") > PhotoSlideController._get("itemCount")){
								//$("body").unbind("mousemove");
								//clearTimeout(PhotoSlideController._get("helpTimeOutId"));
								$("#BtnNext").addClass("focus");
							}
						},
						'mouseout' : function(){
							/*$("body")
							.bind("mousemove", function(event){
									if(event.pageX != mouseX || mouseY != event.pageY){
										mouseX = event.pageX;
										mouseY = event.pageY;
										PhotoSlideController.fadeHelpBar();	
									}
							});
							*/
							$("#BtnNext").removeClass("focus");
							//PhotoSlideController.fadeHelpBar();
							HelpComponent.showWithfade();
							
						},
						'click' : function(){
							if(PhotoSlideController._get("itemTotalCount") > PhotoSlideController._get("itemCount")){
								PhotoSlideController._set({isKeyInput : true});
								PhotoSlideController.show('NEXT');
								//PhotoSlideController.fadeHelpBar();
								HelpComponent.showWithfade();
							}
						}
					}
				}
			}
/*,
			Helpbar : {
				initialize : function(){
					PhotoSlideController.fadeHelpBar();
				},
				handleShow : function(){

				},
				handleHide : function(){
					
				},
				handleFocus : function(){

				},
				handleBlur : function(){

				},
				handleKeyDown : function(keyCode){
					switch (keyCode) {
						case skTv.keymap.RIGHT:
			
							break;
					}
				}
			}*/
		}
