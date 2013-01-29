
		var zone = {
			StockCategory : {

				initialize : function(){
					BlogPhotoCategoryController = new BlogPhotoCategoryControllerClass(params.themeId);
				},
				handleShow : function(){
					//PhotoListController.show();
				},
				handleHide : function(){
					BlogPhotoCategoryController.focusOff();
				},
				handleFocus : function(){
					$("#BtnPrev").attr("class", "list_prev list_prev_off");
					$("#BtnNext").attr("class", "list_next list_next_off");
					BlogPhotoCategoryController.focusOn();
				},
				handleBlur : function(){
					BlogPhotoCategoryController.focusOff();
				},
				handleKeyDown : function(keyCode){
					switch (keyCode) {
						case skTv.keymap.RIGHT:
							BlogPhotoCategoryController.focusOn("NEXT");
							break;
						case skTv.keymap.LEFT:
							BlogPhotoCategoryController.focusOn("PREV");
							break;
						case skTv.keymap.UP:
							skTv.zone.focus('Gnb');
							break;
						case skTv.keymap.DOWN:
							skTv.zone.focus('StockList');
							break;
						case skTv.keymap.RETURN:
							navigation.gotoAppManage();
							break;
						case skTv.keymap.ENTER:
							BlogPhotoCategoryController._set({themeId : BlogPhotoCategoryController._get('index')});
							BlogPhotoListController.show('THEME', '000'+BlogPhotoCategoryController._get('index'));
							break;
						case skTv.keymap.FF:
							BlogPhotoListController.show('NEXT');
							break;
						case skTv.keymap.RW:
							BlogPhotoListController.show('PREV');
							break;
						case skTv.keymap.RED:
							break;
						case skTv.keymap.GREEN:
							navigation.gotoPhotoSlide(PhotoListComponent.getParam('targetId'), PhotoListComponent.getParam('themeId'), 'folderName',PhotoListComponent.getItemNo(BlogPhotoListController._get('itemIndex')));
							break;
					}
				},
				handleMouse : {
					'div ul li' : {
						'click' : function(){
							$("div ul li").removeClass("over");
							$(this).addClass("over");
							BlogPhotoCategoryController._set({themeId : BlogPhotoCategoryController._get('index')});
							BlogPhotoListController.show('THEME', '000'+BlogPhotoCategoryController._get('index'));
						},
						'mouseover' : function(){
							skTv.zone.focus('StockCategory');
							$("div ul li").removeClass("focus");
							$(this).addClass("focus");
							BlogPhotoCategoryController._set({index : $("#SceneStockCategory > div ul li").index($(this))});
						}
					}
				}
			},

			StockList : {
				initialize : function(){
					BlogPhotoListController = new BlogPhotoListControllerClass(params.themeId, params.itemNo);
				},
				handleShow : function(){

				},
				handleHide : function(){
					BlogPhotoListController.focusOff();
				},
				handleFocus : function(){
					BlogPhotoListController.focusOn();
				},
				handleBlur : function(){
					BlogPhotoListController.focusOff();
				},
				handleKeyDown : function(keyCode){
					switch (keyCode) {
						case skTv.keymap.RIGHT:
							BlogPhotoListController.focusOn('NEXT');
							break;
						case skTv.keymap.LEFT:
							BlogPhotoListController.focusOn('PREV');
							break;
						case skTv.keymap.UP:
							skTv.zone.focus('StockCategory');
							break;
						case skTv.keymap.DOWN:
							break;
						case skTv.keymap.RETURN:
							navigation.gotoAppManage();
							break;
						case skTv.keymap.ENTER:
							navigation.gotoPhotoSlide(PhotoListComponent.getParam('targetId'), PhotoListComponent.getParam('themeId'), 'stop',PhotoListComponent.getItemNo(BlogPhotoListController._get('itemIndex')));
							break;
						case skTv.keymap.FF:
							BlogPhotoListController.show('NEXT');
							break;
						case skTv.keymap.RW:
							BlogPhotoListController.show('PREV');
							break;
						case skTv.keymap.RED:
							break;
						case skTv.keymap.GREEN:
							navigation.gotoPhotoSlide(PhotoListComponent.getParam('targetId'), PhotoListComponent.getParam('themeId'), 'play',PhotoListComponent.getItemNo(BlogPhotoListController._get('itemIndex')));
							break;
					}
				},
				
				
				handleMouse : {
                    'ul li' : {
                            'mouseover' : function(){
                                   var index = $("#SceneStockList ul li").index($(this)) % 4;
									BlogPhotoListController.focusOn(this, index);
                            },
                            'mouseout' : function(){
                                    
                            },
                            'click' : function(){
                                    navigation.gotoPhotoSlide(PhotoListComponent.getParam('targetId'), PhotoListComponent.getParam('themeId'), 'stop',PhotoListComponent.getItemNo(BlogPhotoListController._get('itemIndex')));
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
										BlogPhotoListController.show('NEXT');
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
										BlogPhotoListController.show('PREV');
									}
                            }
					}
		
				}
			},

		}