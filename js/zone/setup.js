		var zone = {

			Config : {
				initialize : function(){
		            SetupController = new SetupControllerClass();
				},
				handleShow : function(){

				},
				handleHide : function(){
				},
				handleFocus : function(){
					SetupController.onfocus();
				},
				handleBlur : function(){
					SetupController.onblur();
				},

				handleKeyDown : function(keyCode){
					switch (keyCode) {
						case skTv.keymap.UP:
							SetupController.move("UP");
							break;

						case skTv.keymap.DOWN:
							SetupController.move("DOWN");
							break;

						case skTv.keymap.ENTER:
							SetupController.action();
							break;

						case skTv.keymap.RETURN:
							navigation.gotoAppManage();
							break;
					}
				},
				handleMouse : {
					'#btn_password .inner' : {
                            'mouseover' : function(){
								if($(".list_setup").attr("class").indexOf("select") > 0) {
								}
								else {
									SetupController.move($(this).parent().attr("id"));
								}
                            },
                            'click' : function(){
								if($(".list_setup").attr("class").indexOf("select") > 0) {
									skTv.zone.focus("Config");
									return;
									}
								SetupController.action();
                            }
	                    }
					}
			},
			
			Logout : {

				initialize : function(){
				},
				handleShow : function(){
				},
				handleHide : function(){
				},
				handleFocus : function(){
					SetupController.onfocus();
				},
				handleBlur : function(){
					SetupController.onblur();
				},

				handleKeyDown : function(keyCode){
					switch (keyCode) {
						case skTv.keymap.UP:
							SetupController.move("UP");
							break;

						case skTv.keymap.RETURN:
							navigation.gotoAppManage();
							break;

						case skTv.keymap.ENTER:
							SetupController.action();
							break;
					}
				},
				handleMouse : {
					'#btn_logout .inner' : {
                            'mouseover' : function(){
									SetupController.move($(this).parent().attr("id"));
                            },
                            'click' : function(){

								if($(".list_setup").attr("class").indexOf("select") > 0) {
									skTv.zone.focus("Config");
									return;
								}
								SetupController.action();
                            }
	                    }
					}
			},

			InputPopup : {
				initialize : function(){
					//LGImeComponent = new LGImeComponentClass();
			        LoginController = new LoginControllerClass();

				},
				handleShow : function(){
					/*
					LGImeComponent.show('InputPopup', 'english', 'input_password');
					skTv.zone.show('Ime');
					$(".input_text2").attr({value:""});
					*/
				},
				handleHide : function(){
				},
				handleFocus : function(){
					SetupController.onfocus();
				},
				handleBlur : function(){
					SetupController.onblur();
				},

				handleKeyDown : function(keyCode){
					switch (keyCode) {

						case skTv.keymap.LEFT:
							SetupController.move("LEFT");
							break;							

						case skTv.keymap.RIGHT:
							SetupController.move("RIGHT");
							break;
						
						case skTv.keymap.UP:
							SetupController.move("UP");
							break;							
														
						case skTv.keymap.DOWN:
							SetupController.move("DOWN");
							break;

						case skTv.keymap.ENTER:
							SetupController.action($("#input_password").val());
							break;

						case skTv.keymap.RETURN:
								skTv.zone.hide("InputPopup");
								skTv.zone.hide("Ime");
								skTv.zone.focus("Config");
							break;
						}
				},
				handleMouse : {

					'#input_password' : {
                            'mouseover' : function(){
								SetupController.move($(this).attr("id"));
                            },
                            'mouseout' : function(){
                            },
                            'click' : function(){
                            }
                    },

					"#input_close" : {
                            'mouseover' : function(){
								SetupController.move($(this).attr("id"));
                            },
                            'mouseout' : function(){
                            },
                            'click' : function(){
								SetupController.action();
                            }
                    },

					"#input_enter" : {
                            'mouseover' : function(){
								SetupController.move($(this).attr("id"));

                            },
                            'mouseout' : function(){
                            },
                            'click' : function(){
								SetupController.action();
					}
				}
			}
		}	
	}
		