		var zone = {
			PhotoDesc : {
				initialize : function(){
					// PhotoReplyController 먼저 호출..
					PhotoReplyController = new PhotoReplyControllerClass();
					PhotoReplyController.setParams('targetTid', params.targetId);
					//=> 인증처리 후 세팅해야 함. 
					//PhotoReplyController.setParams('loginTid', params.targetId);		
					
					//PhotoDetailController = new PhotoDetailControllerClass(params.itemNo);

					
					PhotoDetailController = new PhotoDetailControllerClass(params.targetId, params.folderNo, params.itemNo, function (){
						PhotoReplyController.setParams('photoItemSeq', PhotoDetailController.getItemSeq());
						PhotoReplyController.showPage('init');
					});
					
				},
				handleShow : function(){
					//PhotoReplyController.showPage(photoItemSeq, 'first');
				},
				handleHide : function(){

				},
				handleFocus : function(){
					$(".view_title .description").attr("class", "description focus");
				},
				handleBlur : function(){
					$(".view_title .description").attr("class", "description");
				},
				handleKeyDown : function(keyCode){
					switch (keyCode) {
						case skTv.keymap.LEFT:
							PhotoDetailController.show("PREV", function(){
								PhotoReplyController.setParams('photoItemSeq', PhotoDetailController.getItemSeq());
								PhotoReplyController.showPage('init');
							});
							break;
						case skTv.keymap.RIGHT:
							PhotoDetailController.show("NEXT", function(){
								PhotoReplyController.setParams('photoItemSeq', PhotoDetailController.getItemSeq());
								PhotoReplyController.showPage('init');
							});
							break;
						case skTv.keymap.DOWN:
							skTv.zone.show('ReplyList');
							skTv.zone.focus('ReplyList');
							break;
						case skTv.keymap.ENTER:
							//PhotoReplyController.toggleOpenDesc();// 상세보기 팝업 오픈
//							skTv.zone.show('Dim');
							skTv.zone.show('PhotoDescView');							
							skTv.zone.focus('PhotoDescView');
							break;
						case skTv.keymap.RETURN:
							navigation.gotoPhotoList(PhotoListComponent.getParam('targetId'), PhotoListComponent.getParam('folderNo'), encodeURIComponent(params.folderName) ,PhotoListComponent.getItemNo(PhotoDetailController._get('itemIndex')))
							break;
						case skTv.keymap.YELLOW:
							PhotoReplyController.show_ReplyWritepopup("");
							break;												
						case skTv.keymap.GREEN:
							navigation.gotoPhotoSlide(PhotoListComponent.getParam('targetId'), PhotoListComponent.getParam('folderNo'), encodeURIComponent(params.folderName) ,PhotoListComponent.getItemNo(PhotoDetailController._get('itemIndex')));
							break;
					}
				},
                handleMouse : {
                 	'.view_title' : {
                        'click' : function(){
                        	if(skTv.zone.getCurZone() != 'ReplyNameUI' && skTv.zone.isShown('ReplyNameUI')) {
                				skTv.zone.hide('ReplyNameUI');
                			}
                 		}
                	},
                	'.description' : {
                        'click' : function(){
							skTv.zone.show('PhotoDescView');							
							skTv.zone.focus('PhotoDescView');
                 		}
                	}
                }
			},

			PhotoDetail : {
				initialize : function(){
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
				},
                handleMouse : {
                 	'.view_photo' : {
                        'click' : function(){
                        	if(skTv.zone.getCurZone() != 'ReplyNameUI' && skTv.zone.isShown('ReplyNameUI')) {
                				skTv.zone.hide('ReplyNameUI');
                			}
                 		}
                	}
                }
			},

			PhotoDescView : {
				initialize : function(){
				},
				handleShow : function(){
					PhotoDetailController.initDescView();
					PhotoDetailController.showDescView(1);
				},
				handleHide : function(){
					
				},
				handleFocus : function(){

				},
				handleBlur : function(){

				},
				handleKeyDown : function(keyCode){
					switch (keyCode) {
						case skTv.keymap.UP:
							PhotoDetailController.showDescView("prev");
							break;
						case skTv.keymap.DOWN:
							PhotoDetailController.showDescView("next");
							break;
						case skTv.keymap.RETURN:
							skTv.zone.hide('PhotoDescView');
							skTv.zone.focus('PhotoDesc');
							break;
						case skTv.keymap.ENTER:
							PhotoDetailController.closeDescView();
							break;														
					}
				},
                handleMouse : {
                	'.popup_desc_view' : {
                        'mouseover' : function(){
                        	$("#PhotoDescView_scroll :eq(2)").attr("class", "bg_scroll focus");
                 		}
                	},
                 	'.popup_photo_desc_view li' : {
                        'mouseover' : function(){
                        	$("#PhotoDescView_scroll :eq(2)").attr("class", "bg_scroll");
                        	$(this).attr("class", "focus");
                 		},
                        'mouseout' : function(){
        					$(this).attr("class", "");
                 		},
                        'click' : function(){
							PhotoDetailController.closeDescView();
                 		}
                	},
                	'.scroll, .bg_scroll' : {
                        'mouseover' : function(){
                        	$(".popup_desc_view ~ .popup_bottom .list_helpbar li").attr("class", "");
                 		}
                	}
                }
			},
			
			ReplyList : {
				initialize : function(){
					// PhotoDesc initialize에서 호출됨.
					//PhotoReplyController = new PhotoReplyControllerClass();
					
					//PhotoReplyController.setParams('targetTid', params.targetId);
					//PhotoReplyController.setParams('loginTid', );
				},
				handleShow : function(){
					//PhotoReplyController.setParams('photoItemSeq', PhotoDetailController.getItemSeq());
					//PhotoReplyController.showPage('init');
				},
				handleHide : function(){
				},
				handleFocus : function(){
					PhotoReplyController.focusOn();
				},
				handleBlur : function(){
					PhotoReplyController.focusOff();
				},
				handleKeyDown : function(keyCode){
					switch (keyCode) {
						case skTv.keymap.UP:
							//댓글 포커스 이동 or 상세보기로 포커스 이동
							PhotoReplyController.move('up');
							break;
						case skTv.keymap.DOWN:
							//댓글 포커스 이동
							PhotoReplyController.move('down');
							break;
						case skTv.keymap.RW:
							PhotoReplyController.showPage('prev');
							break;
						case skTv.keymap.FF:
							PhotoReplyController.showPage('next');
							break;
						case skTv.keymap.LEFT:
							PhotoReplyController.focusOff(function() {
								PhotoDetailController.show("PREV", function(){
									PhotoReplyController.setParams('photoItemSeq', PhotoDetailController.getItemSeq());
									PhotoReplyController.showPage('init');
								});

								skTv.zone.focus('PhotoDesc');
							});
							break;
						case skTv.keymap.RIGHT:
							PhotoReplyController.focusOff(function(){
								PhotoDetailController.show('NEXT', function(){
									PhotoReplyController.setParams('photoItemSeq', PhotoDetailController.getItemSeq());
									PhotoReplyController.showPage('init');
								});
								skTv.zone.focus('PhotoDesc');							});
							
							break;
						case skTv.keymap.RETURN:
							navigation.gotoPhotoList(PhotoListComponent.getParam('targetId'), PhotoListComponent.getParam('folderNo'), encodeURIComponent(params.folderName) ,PhotoListComponent.getItemNo(PhotoDetailController._get('itemIndex')))
							break;
						case skTv.keymap.ENTER:
							skTv.zone.show('ReplyNameUI');
							skTv.zone.focus('ReplyNameUI');
							break;							
						case skTv.keymap.YELLOW:
							PhotoReplyController.show_ReplyWritepopup("");
							break;
						case skTv.keymap.GREEN:
							navigation.gotoPhotoSlide(PhotoListComponent.getParam('targetId'), PhotoListComponent.getParam('folderNo'), encodeURIComponent(params.folderName) ,PhotoListComponent.getItemNo(PhotoDetailController._get('itemIndex')));
							break;
							
					}
				},
                handleMouse : {
                	'.list_comment li' : {
                        'mouseover' : function(){
                        	var _this = this;
                        	
                        	// 댓글 레이어가 오픈 되어있는 상태에서는 이동하지 않는다.(데이터 변경 문제) 
                        	if(skTv.zone.isShown('ReplyNameUI')) {        		
                        		skTv.zone.focus('ReplyNameUI');
                        		return;
                        	}
                        	
                        	$(".list_comment").children("li").each(function(e){
                        		if(_this == this){
                         			PhotoReplyController.move(e);
                             		return false;
                        		}
                        	})
                        },
                        'click' : function() {
                        	if(skTv.zone.getCurZone() != 'ReplyNameUI' && skTv.zone.isShown('ReplyNameUI')) {
                				skTv.zone.hide('ReplyNameUI');
                				$(this).mouseover();
                			} else {
                				if(skTv.zone.getCurZone() != "ReplyList") {
                					// click시 replayNameUi 포커스 이동현상 수정(5.13 by sophia)
                                	if(skTv.zone.isShown('ReplyNameUI')) return false;
                					
                                	var _this = this;
                                	$(".list_comment").children("li").each(function(e){
                                		if(_this == this){
                                			skTv.zone.focus('ReplyList');
                                 			PhotoReplyController.move(e);
                                     		return false;
                                		}
                                	})

                				} else {
                                	skTv.zone.show('ReplyNameUI');
        							skTv.zone.focus('ReplyNameUI');
                				}
                			}
                        }
                	},
                	'.scroll' : {
                        'mouseover' : function(){
                        }
                	}
                }
				
			},
			ReplyView : {
				initialize : function(){
					PhotoReplyViewController = new PhotoReplyViewControllerClass();
				},
				handleShow : function(){
					PhotoReplyViewController.show();
				},
				handleHide : function(){
				},
				handleFocus : function(){
				},
				handleBlur : function(){
				},
				handleKeyDown : function(keyCode){
					switch (keyCode) {
						case skTv.keymap.RETURN:
						case skTv.keymap.ENTER:
							skTv.zone.hide('ReplyView');
							skTv.zone.focus('ReplyNameUI');
							break;
					}
				},
               handleMouse : {
                	'li' : {
                        'click' : function() {
                        	zone.ReplyView.handleKeyDown(skTv.keymap.ENTER);
                        }
                	} 
                }
			},

			ReplyListNone : {
				initialize : function(){
					
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
						case skTv.keymap.UP:
							skTv.zone.focus('PhotoDesc');
							break;
						case skTv.keymap.YELLOW:
							PhotoReplyController.show_ReplyWritepopup("");
							break;												
						case skTv.keymap.LEFT:
							PhotoDetailController.show("PREV", function(){
								PhotoReplyController.setParams('photoItemSeq', PhotoDetailController.getItemSeq());
								PhotoReplyController.showPage('init');
							});
							
							skTv.zone.focus('PhotoDesc');
							break;
						case skTv.keymap.RIGHT:
							PhotoDetailController.show("NEXT", function(){
								PhotoReplyController.setParams('photoItemSeq', PhotoDetailController.getItemSeq());
								PhotoReplyController.showPage('init');
							});
							
							skTv.zone.focus('PhotoDesc');
							break;
						case skTv.keymap.RETURN:
							navigation.gotoPhotoList(PhotoListComponent.getParam('targetId'), PhotoListComponent.getParam('folderNo'), encodeURIComponent(params.folderName) ,PhotoListComponent.getItemNo(PhotoDetailController._get('itemIndex')))
							break;
					}
				}
			},
			
			ReplyNameUI : {
				initialize : function(){
					PhotoReplyLayerController = new PhotoReplyLayerControllerClass();
					PhotoReplyLayerController.setTargetTid(params.targetId);
				},
				handleShow : function(){
					PhotoReplyLayerController.show();
				},
				handleHide : function(){
					skTv.zone.focus('ReplyList');
				},
				handleFocus : function(){
					//PhotoReplyLayerController.focusOn();
				},
				handleBlur : function(){
					PhotoReplyLayerController.focusOff();
				},
				handleKeyDown : function(keyCode){
					switch (keyCode) {
						case skTv.keymap.UP:
							PhotoReplyLayerController.move('up');
							break;
						case skTv.keymap.DOWN:
							PhotoReplyLayerController.move('down');
							break;
						/*case skTv.keymap.RIGHT:
							skTv.zone.hide('ReplyNameUI');
							break;*/
						case skTv.keymap.RIGHT: 
						case skTv.keymap.LEFT: 
						case skTv.keymap.RETURN:
							skTv.zone.hide('ReplyNameUI');
							skTv.zone.focus('ReplyList');
							break;
						case skTv.keymap.ENTER:
							PhotoReplyLayerController.action();
							break;
						case skTv.keymap.YELLOW:
							PhotoReplyController.show_ReplyWritepopup("");
							break;												
					}
				},
                handleMouse : {
                	'.layer_list_menu li' : {
                        'mouseover' : function(){
                        	var _this = this;

                        	$(".layer_list_menu").children("li").each(function(e){
                        		if(_this == this) {
                        			PhotoReplyLayerController.move(e);
                             		return false;
                        		}
                        	})
                        },
                        'click' : function() {
                        	if($(this).attr("class").indexOf("dim") >= 0) return;
                        	PhotoReplyLayerController.action();
                        }
                	}
                }
			}
		}