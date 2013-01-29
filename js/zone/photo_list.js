		var zone = {
			PhotoList : {
				initialize : function(){
					PhotoListController = new PhotoListControllerClass(params.targetId, params.folderNo, params.itemNo);

				},
				handleShow : function(){
					GnbComponent.setReturnZone("PhotoList");
					PhotoListController._set({isPhotoList : true});
					//PhotoListController.show();
				},
				handleHide : function(){
					PhotoListController._set({isPhotoList : false});
					PhotoListController.hidePhotoList();
				},
				handleFocus : function(){
					PhotoListController.focusOn();
				},
				handleBlur : function(){
					PhotoListController.focusOff();
				},
				handleKeyDown : function(keyCode){
					switch (keyCode) {
						case skTv.keymap.RIGHT:
							PhotoListController.focusOn('NEXT');
							break;
						case skTv.keymap.LEFT:
							PhotoListController.focusOn('PREV');
							break;
						case skTv.keymap.UP:
							skTv.zone.focus('Gnb');
							//PhotoListController.show('FOLDER', '');
							break;
						case skTv.keymap.DOWN:
							
							break;
						case skTv.keymap.RETURN:
							PhotoListController.gotoPrev();
							break;
						case skTv.keymap.ENTER:
							PhotoListController.gotoPhotoDetail(PhotoListComponent.getParam('targetId'), PhotoListComponent.getParam('folderNo'), encodeURIComponent($("#FolderName").html()),PhotoListComponent.getItemNo(PhotoListController._get('itemIndex')));
							break;
						case skTv.keymap.FF:
							PhotoListController.show('NEXT');
							break;
						case skTv.keymap.RW:
							PhotoListController.show('PREV');
							break;
						case skTv.keymap.RED:
							if(PhotoListController._get("isFolderList") == true){
								skTv.zone.focus('Folder');
								skTv.zone.show('Folder');
							}
							break;
						case skTv.keymap.GREEN:
							navigation.gotoPhotoSlide(PhotoListComponent.getParam('targetId'), PhotoListComponent.getParam('folderNo'), encodeURIComponent($("#FolderName").html()),PhotoListComponent.getItemNo(PhotoListController._get('itemIndex')), PhotoListController._get('isPhotoList'));
							break;
					}
				},
				handleMouse : {
                    '#ul_photo li' : {
                            'mouseover' : function(){
                                var index = $("#ul_photo li").index($(this)) % 3;
								PhotoListController.focusOn(this, index);
                            },
                            'mouseout' : function(){
                                    
                            },
                            'click' : function(){
								window.location.href = "/lg/cyphoto/html/photo_detail.html?targetId="+PhotoListComponent.getParam('targetId')+"&itemNo="+PhotoListComponent.getItemNo(PhotoListController._get('itemIndex'))+"&folderNo="+PhotoListComponent.getParam('folderNo')+"&folderName="+encodeURIComponent($("#FolderName").html());
                            }
                    },
					'#BtnNext' : {
							'mouseover' : function(){
								if(PhotoListComponent.isPageExist('NEXT') != 'NOT_EXIST'){
									$("#BtnNext").attr("class", "list_next list_next_on");
								}
								$("#BtnPrev").attr("class", "list_prev list_prev_off");
							},
							'mouseout' : function(){
								$("#BtnNext").attr("class", "list_next list_next_off");
							},
                            'click' : function(){
									if(PhotoListComponent.isPageExist('NEXT') != 'NOT_EXIST'){
										PhotoListController.show('NEXT');
									}
                            }
					},
					'#BtnPrev' : {
							'mouseover' : function(){
								if(PhotoListComponent.isPageExist('PREV') != 'NOT_EXIST'){
									$("#BtnPrev").attr("class", "list_prev list_prev_on");
								}
								$("#BtnNext").attr("class", "list_next list_next_off");
							},
							'mouseout' : function(){
								$("#BtnPrev").attr("class", "list_prev list_prev_off");
							},
                            'click' : function(){
									if(PhotoListComponent.isPageExist('PREV') != 'NOT_EXIST'){
										PhotoListController.show('PREV');
									}
                            }
					},
				}

			},

			PhotoListNone : {

				initialize : function(){

				},
				handleShow : function(){
					GnbComponent.setReturnZone("PhotoListNone");
					PhotoListController._set({isPhotoList : false});
				},
				handleHide : function(){
					PhotoListController._set({isPhotoList : true});
				},
				handleFocus : function(){
					PhotoListController.noneFocusOn();
				},
				handleBlur : function(){
					PhotoListController.noneFocusOff();
				},
				handleKeyDown : function(keyCode){
					switch (keyCode) {
						case skTv.keymap.UP:
							skTv.zone.focus('Gnb');
							break;
						case skTv.keymap.RED:
							if(PhotoListController._get("isFolderList") == true){
								skTv.zone.focus('Folder');
								skTv.zone.show('Folder');
							}
							break;						
						case skTv.keymap.ENTER:
							if(PhotoListController._get("isFolderList") == true){
								skTv.zone.focus('Folder');
								skTv.zone.show('Folder');
							}
							break;
						case skTv.keymap.RETURN:
							PhotoListController.gotoPrev();
							break;
					}
				},
				handleMouse : {
					'div.inner' : {
						'mouseover' : function(){
							PhotoListController.noneFocusOn();
						},
						'mouseout' : function(){
//							PhotoListController.noneFocusOff();
						},
						'click' : function(){
							if($("#ScenePhotoListNone div.box_img").css("visibility") != "hidden"){
								skTv.zone.focus('Folder');
								skTv.zone.show('Folder');
							}
						}
					}
				}
			},

			Folder : {

				initialize : function(){
					FolderController = new FolderControllerClass(params.targetId);
				},
				handleShow : function(){
					FolderController.show(null, FolderController.pagingComponent.lastFocusIndex);
				},
				handleHide : function(){

				},
				handleFocus : function(){

				},
				handleBlur : function(){
					FolderController.pagingComponent.focusOff();
				},
				handleKeyDown : function(keyCode){
					switch (keyCode) {
						case skTv.keymap.UP:
							FolderController.moveRow('prev');
							break;
						case skTv.keymap.DOWN:
							FolderController.moveRow('next');
							break;
						case skTv.keymap.RW:
							FolderController.movePage('prev');
							break;
						case skTv.keymap.FF:
							FolderController.movePage('next');
							break;
						case skTv.keymap.ENTER:
							if($('#li_close_folder').hasClass('focus')==true){
								FolderController.closeFolder();
							}else if(typeof $('ul#ul_list_select_folder > li.focus')[0] == 'object'){
								FolderController.changePhotoList();
							}
							break;
						case skTv.keymap.RETURN:
							FolderController.closeFolder();
							skTv.zone.focus('PhotoList');
							break;
						case skTv.keymap.RIGHT:
							$('ul#ul_list_select_folder > li.focus').removeClass('focus');
							$('#li_close_folder').addClass('focus');
							break;
						case skTv.keymap.LEFT:
							if($('#li_close_folder').attr('class')=='focus'){
								$('ul#ul_list_select_folder > li:last').addClass('focus');
								$('#li_close_folder').removeClass('focus');
							}
							break;
					}
				},
				handleMouse : {
					'ul#ul_list_select_folder > li' : {
						'mouseover' : function(){
							//$('ul#ul_list_select_folder > li.focus').removeClass('focus');
							$('.focus').removeClass('focus');
							$(this).addClass('focus');
						},
						'mouseout' : function(){
//							$(this).removeClass('focus');
						},
						'click' : function(){
							FolderController.changePhotoList();
						}
					},
					'#li_close_folder' : {
						'mouseover' : function(){
							$('.focus').removeClass('focus');
							$(this).addClass('focus');
						},
						'mouseout' : function(){
							$(this).addClass('focus');
							//alert('123');
						},
						'click' : function(){
							FolderController.closeFolder();
						}
					}
				}
			}
		}

