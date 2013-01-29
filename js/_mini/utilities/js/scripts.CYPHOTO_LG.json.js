var scriptJson = {
	ArrayOfScripts : [
		{
			page  : "setup",
			files : [ 
				{ src : "$APP_DIR/lg/cyphoto/js/netcast_info.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/vendors/jquery-1.4.4.js" },
				
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/config/env_config.lg.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/config/api_config.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/config/thumb_config.js" },		
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/config/init.js" },
				
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/class.js" },

				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/string.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/array.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/dom.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/debug.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/console.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/xhr.js" },

				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.fn.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.keymap.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.zone.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/cookies.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/user.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.gateway.js" },

				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/bases/BaseClass.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/bases/BaseControllerClass.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/bases/BaseModelClass.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/bases/BaseComponentClass.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/vendors/rsa.js"},
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/vendors/jsbn.js"},
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/vendors/prng4.js"},
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/vendors/rng.js"},
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/vendors/base64.js"},

				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/components/PopupComponent.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/components/GnbComponent.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/components/HelpComponent.js"},

				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/components/LgImeComponent.js"},
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/components/LoadingComponent.js"},

				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/models/UserModel.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/models/LoginModel.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/controllers/LoginController.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/controllers/SetupController.js"},
				{ src : "$APP_DIR/lg/cyphoto/js/navigation.js"},
				{ src : "$APP_DIR/lg/cyphoto/js/zone/setup.js"}
			]
		},
		{
			page : "photo_slide",
			files : [
				{ src : "$APP_DIR/lg/cyphoto/js/netcast_info.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/vendors/jquery-1.4.4.js" },
				
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/config/env_config.lg.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/config/api_config.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/config/thumb_config.js" },		
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/config/init.js" },
				
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/class.js" },

				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/string.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/array.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/dom.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/debug.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/console.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/xhr.js" },

				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.fn.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.keymap.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.zone.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/cookies.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/user.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.gateway.js" },

				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/bases/BaseClass.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/bases/BaseControllerClass.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/bases/BaseModelClass.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/bases/BaseComponentClass.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/components/HelpComponent.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/components/PopupComponent.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/components/PhotoListComponent.js"},

				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/components/LoadingComponent.js"},
				{ src : "$APP_DIR/lg/cyphoto/js/navigation.js"},

				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/models/PhotoModel.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/controllers/PhotoSlideController.js"},
				{ src : "$APP_DIR/lg/cyphoto/js/zone/photo_slide.js"}

			]
		},
		{
			page : "photo_list",
			files : [
				{ src : "$APP_DIR/lg/cyphoto/js/netcast_info.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/vendors/jquery-1.4.4.js" },
				
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/config/env_config.lg.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/config/api_config.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/config/thumb_config.js" },		
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/config/init.js" },
				
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/class.js" },

				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/string.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/array.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/dom.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/debug.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/console.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/xhr.js" },

				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.fn.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.keymap.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.zone.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/cookies.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/user.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.gateway.js" },

				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/bases/BaseClass.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/bases/BaseControllerClass.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/bases/BaseModelClass.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/bases/BaseComponentClass.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/components/GnbComponent.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/components/HelpComponent.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/components/PopupComponent.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/components/PhotoListComponent.js"},

				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/components/LoadingComponent.js"},
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/components/PagingComponent.js"},

				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/vendors/jquery_ui/jquery.ui.widget.js"},
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/vendors/jquery_ui/jquery.ui.mouse.js"},
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/vendors/jquery_ui/jquery.ui.slider.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/components/ScrollComponent.js"},

				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/models/FolderModel.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/controllers/FolderController.js"},
				{ src : "$APP_DIR/lg/cyphoto/js/navigation.js"},

				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/models/MinihpInfoModel.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/models/PhotoModel.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/controllers/PhotoListController.js"},
				{ src : "$APP_DIR/lg/cyphoto/js/zone/photo_list.js"}

			]
		},
		{
			page : "photo_detail",
			files : [
				{ src : "$APP_DIR/lg/cyphoto/js/netcast_info.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/vendors/jquery-1.4.4.js" },
				
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/config/env_config.lg.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/config/api_config.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/config/thumb_config.js" },		
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/config/init.js" },
				
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/class.js" },

				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/string.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/array.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/dom.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/debug.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/console.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/xhr.js" },

				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.fn.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.keymap.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.zone.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/cookies.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/user.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.gateway.js" },

				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/bases/BaseClass.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/bases/BaseControllerClass.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/bases/BaseModelClass.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/bases/BaseComponentClass.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/components/HelpComponent.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/components/PopupComponent.js"},
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/components/LgImeComponent.js"},
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/components/LoadingComponent.js"},

				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/components/PhotoListComponent.js"},
				
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/vendors/jquery_ui/jquery.ui.widget.js"},
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/vendors/jquery_ui/jquery.ui.mouse.js"},
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/vendors/jquery_ui/jquery.ui.slider.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/components/ScrollComponent.js"},

				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/models/PhotoReplyModel.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/controllers/PhotoReplyController.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/controllers/PhotoReplyLayerController.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/controllers/PhotoReplyViewController.js"},

				{ src : "$APP_DIR/lg/cyphoto/js/navigation.js"},

				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/models/PhotoDetailModel.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/models/PhotoModel.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/models/MinihpInfoModel.js"},

				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/controllers/PhotoDetailController.js"},

				{ src : "$APP_DIR/lg/cyphoto/js/zone/photo_detail.js"}
			]
		},
		{
			page : "people_list",
			files : [
				{ src : "$APP_DIR/lg/cyphoto/js/netcast_info.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/vendors/jquery-1.4.4.js" },
				
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/config/env_config.lg.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/config/api_config.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/config/thumb_config.js" },		
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/config/init.js" },
				
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/class.js" },

				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/string.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/array.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/dom.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/debug.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/console.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/xhr.js" },

				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.fn.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.keymap.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.zone.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/cookies.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/user.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.gateway.js" },

				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/bases/BaseClass.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/bases/BaseControllerClass.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/bases/BaseModelClass.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/bases/BaseComponentClass.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/components/LoadingComponent.js"},
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/components/LgImeComponent.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/components/PopupComponent.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/components/GnbComponent.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/components/HelpComponent.js"},

				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/models/PeopleModel.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/controllers/PeopleController.js"},

				{ src : "$APP_DIR/lg/cyphoto/js/navigation.js"},
				{ src : "$APP_DIR/lg/cyphoto/js/zone/people_list.js"},
				{ src : "$APP_DIR/lg/cyphoto/js/people/peopleHTML.js"}		
			]
		},
		{
			page : "pado_list",
			files : [
				{ src : "$APP_DIR/lg/cyphoto/js/netcast_info.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/vendors/jquery-1.4.4.js" },
				
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/config/env_config.lg.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/config/api_config.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/config/thumb_config.js" },		
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/config/init.js" },
				
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/class.js" },

				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/string.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/array.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/dom.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/debug.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/console.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/xhr.js" },

				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.fn.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.keymap.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.zone.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/cookies.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/user.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.gateway.js" },

				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/bases/BaseClass.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/bases/BaseControllerClass.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/bases/BaseModelClass.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/bases/BaseComponentClass.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/components/LoadingComponent.js"},
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/components/LgImeComponent.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/components/PopupComponent.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/components/GnbComponent.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/components/HelpComponent.js"},

				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/models/PadoModel.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/controllers/PadoController.js"},

				{ src : "$APP_DIR/lg/cyphoto/js/navigation.js"},
				{ src : "$APP_DIR/lg/cyphoto/js/zone/pado_list.js"}
			]
		},
		{
			page : "index",
			files : [
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/string.js"},
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.fn.js"},
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/cookies.js"},
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/user.js"},
				{ src : "$APP_DIR/lg/cyphoto/js/navigation.js"}				
			]
		},
		{
			page : "blog_photo_list",
			files : [
				{ src : "$APP_DIR/lg/cyphoto/js/netcast_info.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/vendors/jquery-1.4.4.js" },
				
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/config/env_config.lg.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/config/api_config.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/config/thumb_config.js" },		
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/config/init.js" },
				
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/class.js" },

				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/string.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/array.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/dom.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/debug.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/console.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/xhr.js" },

				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.fn.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.keymap.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.zone.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/cookies.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/user.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.gateway.js" },

				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/bases/BaseClass.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/bases/BaseControllerClass.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/bases/BaseModelClass.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/bases/BaseComponentClass.js" },

				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/components/GnbComponent.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/components/HelpComponent.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/components/PopupComponent.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/components/PhotoListComponent.js"},
				
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/components/LoadingComponent.js"},

				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/vendors/jquery_ui/jquery.ui.widget.js"},
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/vendors/jquery_ui/jquery.ui.mouse.js"},
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/vendors/jquery_ui/jquery.ui.slider.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/components/ScrollComponent.js"},
				
				{ src : "$APP_DIR/lg/cyphoto/js/navigation.js"},

				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/models/PhotoModel.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/controllers/BlogPhotoCategoryController.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/controllers/BlogPhotoListController.js"},

				{ src : "$APP_DIR/lg/cyphoto/js/zone/blog_photo_list.js"}
			]
		},
		{
			page : "login",
			files : [
				{ src : "$APP_DIR/lg/cyphoto/js/netcast_info.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/vendors/jquery-1.4.4.js" },
				
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/config/env_config.lg.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/config/api_config.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/config/thumb_config.js" },		
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/config/init.js" },
				
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/class.js" },

				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/string.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/array.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/dom.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/debug.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/console.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/xhr.js" },

				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.fn.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.keymap.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.zone.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/cookies.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/user.js" },
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.gateway.js" },

				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/bases/BaseClass.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/bases/BaseControllerClass.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/bases/BaseModelClass.js" },
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/bases/BaseComponentClass.js" },

				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/vendors/rsa.js"},
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/vendors/jsbn.js"},
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/vendors/prng4.js"},
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/vendors/rng.js"},
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/vendors/base64.js"},
				
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/components/GnbComponent.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/components/HelpComponent.js"},
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/components/LgImeComponent.js"},
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/components/LoadingComponent.js"},
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/components/SKPLoginComponent.js"},

				{ src : "$APP_DIR/lg/cyphoto/js/navigation.js"},
				
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/models/UserModel.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/models/LoginModel.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/controllers/LoginController.js"},
				{ src : "$JADE_DIR/skcomms_r6185/projects/cyphoto/controllers/LoginAcController.js"},
				
				{ src : "$APP_DIR/lg/cyphoto/js/zone/login.js"}
			]
		},
		{
			page : "photo_slide_null",
			files : [
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/string.js"},
				{ src : "$JADE_DIR/skcomms_r6185/skTvFrw/libs/tv.fn.js"},				
				{ src : "$APP_DIR/lg/cyphoto/js/navigation.js"}
			]
		}
	]
}