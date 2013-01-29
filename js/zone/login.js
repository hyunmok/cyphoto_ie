        var zone = {
				Ac : {
	                initialize : function(){
						if (typeof LoginAcController !== 'object'){
							LoginAcController = new LoginAcControllerClass();
						}
					},
					handleShow : function(){
						var inputVal = '';
						if (typeof LGImeComponent === 'object'){
							inputVal = LGImeComponent.getInputVal();
						}
						LoginAcController.show(inputVal);
					},
					handleHide : function(){
						LoginAcController.hide();
					},
					handleFocus : function(){
						LoginAcController.focus();
					},
					handleBlur : function(){
						LoginAcController.blur();
					},
					handleKeyDown : function(keyCode){
						switch (keyCode) {
							case skTv.keymap.UP:
								if(LoginAcController.focusPrev() === false){
									LoginAcController.returnIme();
									LGImeComponent.keyMove(skTv.keymap.RIGHT);
								}						
								break;
							case skTv.keymap.DOWN:
								if(LoginAcController.focusNext() === false){
									//LoginAcController.focus(0);
								}
								break;
							case skTv.keymap.RIGHT:
								/*
								skTv.zone.focus("Ime");
								LGImeComponent.keyMove(skTv.keymap.RIGHT);
								*/
								break;
							case skTv.keymap.ENTER:
								LoginAcController.onEnter();
								LGImeComponent.keyMove(skTv.keymap.RIGHT);
								break;
							case skTv.keymap.RETURN:
								LoginAcController.returnIme();
								LGImeComponent.keyMove(skTv.keymap.RIGHT);
								break;
						}
					},
					handleMouse :{
						'li' : {
							'mouseover' : function() {
								LoginAcController.focus($(this).index());
							},
							'click' : function(){
								LoginAcController.onEnter($(this).index());
								LGImeComponent.keyMove(skTv.keymap.RIGHT);
							}
						},
						'input' : {
							'click' : function(){
								LoginAcController.returnIme();
								LGImeComponent.keyMove(skTv.keymap.RIGHT);
							}
						}
						
					}
	            },
	        	NateLogin : {
	                initialize : function(){
	                },
	                handleShow : function(){
	                	LoginController.show('NATE');
	                },
	                handleHide : function(){
	                	LoginController.onHide();
	                },
	                handleFocus : function(){
						GnbComponent.setReturnZone("NateLogin");
//						LoginController._set({focusId : 'n_title_nate'});
	                	LoginController.onFocus();
	                },
	                handleBlur : function(){
	                	LoginController.onBlur();
	                },
	                handleKeyDown : function(keyCode){
	                      switch (keyCode) {
	                        case skTv.keymap.LEFT:
	                        	LoginController.move("LEFT");
	                            break;
	                            
	                        case skTv.keymap.UP:
	                        	LoginController.move("UP");
	                            break;
	                            
	                        case skTv.keymap.RIGHT:
	                        	LoginController.move("RIGHT");
	                            break;
	                            
	                        case skTv.keymap.DOWN:
	                        	LoginController.move("DOWN");
	                        	break;
	                        
	                        case skTv.keymap.ENTER:
	                        	LoginController.action();
	                            break;
							case skTv.keymap.RED:
	                            break;
							//RETURN Key 정의 추가 
							//@author Soonyoung Park 2011년 10월 26일 수요일 오후 12:09:33
	                        case skTv.keymap.RETURN:						
								$("#helpbar_menu0").trigger("click");
								break;
	                    }
	                },
	                handleMouse : {
	                	'.title_nate, .title_cyworld, .input_type1, .input_type2, .input_type3, .input_type4, .inner' : {
                            'mouseover' : function(){
								skTv.zone.focus('NateLogin');
                            	LoginController.move($(this).children(1).attr("id"));
                            },
                            'click' : function() {
                            	LoginController.action();
                            }
	                    },
	                	'#n_loginid, #n_pw' : {
                            'focus' : function(){
                            	LoginController.onInputFocus($(this).attr("id"));
                            }
	                	},
	                	'#n_email' : {
                            'click' : function(){
                            	LoginController._set('focusId:n_email');
                            	LoginController.action();
                            }
	                	},
	                }
	            },
	            
	            CyworldLogin : {
	                initialize : function(){
	                },
	                handleShow : function(){
	                	LoginController.show('CYWORLD');
	                },
	                handleHide : function(){
	                	LoginController.onHide();
	                },
	                handleFocus : function(){
						GnbComponent.setReturnZone("CyworldLogin");
//						LoginController._set({focusId : 'n_title_cyworld'});
	                	LoginController.onFocus();
	                },
	                handleBlur : function(){
	                	LoginController.onBlur();
	                },
	                handleKeyDown : function(keyCode){
	                      switch (keyCode) {
	                        case skTv.keymap.LEFT:
	                        	LoginController.move("LEFT");
	                            break;
	                            
	                        case skTv.keymap.UP:
	                        	LoginController.move("UP");
	                            break;
	                            
	                        case skTv.keymap.RIGHT:
	                        	LoginController.move("RIGHT");
	                            break;
							
	                        case skTv.keymap.DOWN:
	                        	LoginController.move("DOWN");
	                        	break;
	                        	
	                        case skTv.keymap.ENTER:
	                        	LoginController.action();
	                            break;

							//RETURN Key 정의 추가 \
							//@author Soonyoung Park 2011년 10월 26일 수요일 오후 12:09:33
	                        case skTv.keymap.RETURN:						
								$("#helpbar_menu0").trigger("click");
								break;
	                    }
	                }, 
	                handleMouse : {
	                	'.title_nate, .title_cyworld, .input_type5, .input_type3, .input_type4, .inner' : {
                            'mouseover' : function(){
								skTv.zone.focus('CyworldLogin');
                            	LoginController.move($(this).children(1).attr("id"));
                            },
                            'click' : function() {
                            	LoginController.action($(this).children(1).attr("id"));
                            }
	                	},
	                	'#c_loginid, #c_pw' : {
                            'focus' : function(){
                            	LoginController.onInputFocus($(this).attr("id"));
                            }
	                	}
	                }
	            },
	            
	            NateEmail : {
	                initialize : function(){},
	                handleShow : function(){},
	                handleHide : function(){},
	                handleFocus : function(){},
	                handleBlur : function(){
                    	skTv.zone.hide('NateEmail');
                    	skTv.zone.focus('NateLogin');
	                },
	                handleKeyDown : function(keyCode){
	                	switch (keyCode) {
	                        case skTv.keymap.LEFT: 
	                        case skTv.keymap.RIGHT:
                            	skTv.zone.hide('NateEmail');
                            	skTv.zone.focus('NateLogin');
	                            break;
	                            
	                        case skTv.keymap.UP:
	                        	LoginController.move_NateEmail("UP");
	                            break;
	                            
	                        case skTv.keymap.DOWN:
	                        	LoginController.move_NateEmail("DOWN");
	                        	break;
	                        	
	                        case skTv.keymap.ENTER:
	                        	// Nate Email 값 세팅 및 hide
	                        	LoginController.set_NateEmail();
                            	skTv.zone.hide('NateEmail');
                            	skTv.zone.focus('NateLogin');
	                            break;
							//RETURN Key 정의 추가 \
							//@author Soonyoung Park 2011년 10월 26일 수요일 오후 12:09:33
	                        case skTv.keymap.RETURN:						
								$("#helpbar_menu0").trigger("click");
								break;
	                    }
	                },
	                handleMouse : {
	                	".list_email li div" : {
	                		'mouseover' : function() {
	                			LoginController.move_NateEmail(this);
	                		},
	                		'click' : function() {
	                        	LoginController.set_NateEmail();
                            	skTv.zone.hide('NateEmail');
                            	skTv.zone.focus('NateLogin');
	                		}
	                	}
	                }
	            }
        };