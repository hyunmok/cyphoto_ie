/**
 * SetupController.js
 *
**/
var SetupControllerClass = defineClass({

    extend : BaseControllerClass,
    name : 'SetupControllerClass',
    construct : function(){

		this._init([
		    'curFocusId'
		]);

        LoginController = new LoginControllerClass();

    }, 

    methods : {
    	// focus class로 변경
    	_set_focusClass : function(obj) {
    		var curClass, newClass;
    		curClass = obj.attr("class");

			if(curClass.indexOf("focus") < 0) {
				newClass = curClass + " focus";
				obj.attr("class", newClass);
			}
    	},
    	
    	// focus class를 focus를 삭제함
    	_set_deleteFocusClass : function(obj) {
    		var curClass, newClass;
    		curClass = obj.attr("class");
    		
			if(curClass.indexOf("focus") >= 0) {
				newClass = curClass.replace(" focus", "");
				obj.attr("class", newClass);
			}
    	},

		onfocus : function() {
			var _ctl = this;
			var _ctl_focusId;

			// 포커스할 id 세팅
			if(skTv.zone.getCurZone() == "Config") {
				if($(".list_setup").attr("class").indexOf("select") > 0) {
					_ctl.move("btn_password");
					return;
				} else {
					_ctl_focusId = 'btn_password';
				}
				
			} else if(skTv.zone.getCurZone() == "Logout") {
				if($(".list_setup").attr("class").indexOf("select") > 0) {
					_ctl.move("btn_logout");
					return;
				} else {
					_ctl_focusId = 'btn_logout';
				}
			} else if(skTv.zone.getCurZone() == "InputPopup") {				
				if(_ctl._get("curFocusId") == "input_close" || _ctl._get("curFocusId") == "input_enter") {
					return;
				} 
				_ctl_focusId = 'input_password';
			}


			_ctl._set({curFocusId:_ctl_focusId});

			if(skTv.zone.getCurZone() == "InputPopup") {

				if(_ctl_focusId == "input_password") {
					_ctl._set_focusClass($("#" + _ctl_focusId).parent());

				} else {
					_ctl._set_focusClass($("#" + _ctl_focusId));
				}

				var strMsg;
				
				strMsg = "설정내용 확인 및 수정을 위해 현재 사용중인<br />";

				if (skFn.user.getUserTp() == "CYWORLD") {
			    	strMsg += "싸이월드 ";

				} else {
			    	strMsg += "네이트 ";
	           	}
		    	strMsg += "비밀번호를 입력해 주세요.";

		    	$(".description").html(strMsg);

			} else {
				_ctl._set_focusClass($("#" + _ctl_focusId));
			}
		},

		onblur : function() {
			var _ctl = this;
			var _ctl_focusId;

			_ctl_focusId = _ctl._get("curFocusId");

			if (_ctl_focusId == "input_password") {
				_ctl._set_deleteFocusClass($("#" + _ctl_focusId).parent());
			}
			else {
				_ctl._set_deleteFocusClass($("#" + _ctl_focusId));
			}
		},

		move : function(direction) {

			var _ctl = this;
			var _ctl_focusId;
			var _ctl_curClass;
			var _ctl_newClass;

			_ctl_focusId = _ctl._get("curFocusId");
			
			if(direction == "DOWN") {
				if(_ctl_focusId == 'btn_password') {
					skTv.zone.focus('Logout');
					return;
				} 
				else if (_ctl_focusId == 'input_password') {
					
					_ctl._set_deleteFocusClass($("#" + _ctl_focusId).parent());
					_ctl_focusId = 'input_enter';
					_ctl._set_focusClass($("#" + _ctl_focusId));
					_ctl._set({curFocusId:_ctl_focusId});
				}
				else if (_ctl_focusId == 'box_info1') {
					
					_ctl._set_deleteFocusClass($("#" + _ctl_focusId));
					_ctl_focusId = 'box_info2';
					_ctl._set_focusClass($("#" + _ctl_focusId));
					_ctl._set({curFocusId:_ctl_focusId});
				}
			}
			else if(direction == "UP") {
				if(_ctl_focusId == 'btn_logout') {
					skTv.zone.focus('Config');
					return;
				}
				else if (_ctl_focusId == 'box_info1' || _ctl_focusId == 'btn_password') {
					skTv.zone.focus('Gnb');
					return;
				}
				else if (_ctl_focusId == 'input_enter' || _ctl_focusId == 'input_close') {
					_ctl._set_deleteFocusClass($("#" + _ctl_focusId));
					_ctl_focusId = 'input_password';
					_ctl._set_focusClass($("#" + _ctl_focusId).parent());
					_ctl._set({curFocusId:_ctl_focusId});
				}
				else if (_ctl_focusId == 'box_info2') {
					_ctl._set_deleteFocusClass($("#" + _ctl_focusId));
					_ctl_focusId = 'box_info1';
					_ctl._set_focusClass($("#" + _ctl_focusId));
					_ctl._set({curFocusId:_ctl_focusId});
				}
			}
			else if(direction == "RIGHT") {
				if(_ctl_focusId == 'input_password') {
					// 키보드로 이동시에만 처음 포커스로 이동 (by sophia 4.25)
					LGImeComponent.keyMove(skTv.keymap.RIGHT);										

					// IME로 포커스 이동 및 IME display
					skTv.zone.focus('Ime');
					return;
				}
				else if (_ctl_focusId == 'input_enter') {

					_ctl._set_deleteFocusClass($("#" + _ctl_focusId));
					_ctl_focusId = 'input_close';
					_ctl._set_focusClass($("#" + _ctl_focusId));
					_ctl._set({curFocusId:_ctl_focusId});
				}
			}
			else if (direction == "LEFT") {
				if(_ctl_focusId == 'input_close') {
					
					_ctl._set_deleteFocusClass($("#" + _ctl_focusId));
					_ctl_focusId = 'input_enter';
					_ctl._set_focusClass($("#" + _ctl_focusId));
					_ctl._set({curFocusId:_ctl_focusId});
				}
				
			// 마우스 이동
			} else {
				if(_ctl_focusId == "input_password") {
					_ctl._set_deleteFocusClass($("#" + _ctl_focusId).parent());
					
				} else {
					if(direction == "btn_logout" || direction == "btn_password" ) {
						if($(".list_setup").attr("class").indexOf("select") > 0) {
							if(direction == "btn_password") {
								$("#btn_password").attr("class", "btn_password none");
							} else {
								$("#btn_logout").attr("class", "btn_logout none");
							}

							_ctl._set_focusClass($("#" + _ctl_focusId));
							return;
						}
					} else if(direction == "box_info1" || direction == "box_info2" ) {
						if(skTv.zone.getCurZone() == "Gnb") {
							skTv.zone.focus("Config");
							return;
						}
					}

					_ctl._set_deleteFocusClass($("#" + _ctl_focusId));
				}

				_ctl_focusId = direction;
				
				if(_ctl_focusId == "input_password") {
					_ctl._set_focusClass($("#" + _ctl_focusId).parent());

				} else {
					_ctl._set_focusClass($("#" + _ctl_focusId));
				}
				_ctl._set({curFocusId:_ctl_focusId});
			}
		},

		action : function(){
			var _ctl = this;
			var _ctl_focusId;
			var _ctl_curClass;
			var _ctl_newClass;

			_ctl_focusId = _ctl._get("curFocusId");
			
			if(_ctl_focusId == 'btn_logout') {
				PopupComponent.showTextPopup(
											'확인',
											'로그아웃 하시겠습니까?',
											function(){
												_ctl.doLogout();
											},
											function() {
												_ctl._set_focusClass($("#" + _ctl_focusId));
												skTv.zone.focus('Logout');
											}
											);
			}
			else if(_ctl_focusId == 'btn_password') {
				if(typeof LGImeComponent == "undefined") {
					LGImeComponent = new LGImeComponentClass();
			        // Ime 이전버튼 클릭시 팝업 종료 적용
					LGImeComponent.setFunctionKey("skTv.keymap.RETURN", "zone.InputPopup.handleKeyDown(skTv.keymap.RETURN)")		
				}
				
				// show IME (sophia 5.4)
				LGImeComponent.show('InputPopup', 'english', 'input_password', function(){
					$(".input_text2").attr({value:""});
					skTv.zone.show('InputPopup');
					skTv.zone.show('Ime');
					skTv.zone.focus('InputPopup');
					if(skEnv.device.vendor == "lgcns") {
						android.dispatchTouchEvent('InputPopup');
					}
				});
				
			}
			else if(_ctl_focusId == 'input_enter') {
				LoadingComponent.lock(true);
				_ctl._set_deleteFocusClass($("#" + _ctl_focusId));
				_ctl.checkValidatePassword($("#input_password").val());

//				_ctl.showPrivacyConfig();
			}
			else if(_ctl_focusId == 'input_close') {
				skTv.zone.hide('InputPopup');
				skTv.zone.hide('Ime');
				skTv.zone.focus('Config');
			}
			else if (_ctl_focusId == 'box_info1' || _ctl_focusId == 'box_info2' ) {
				if($(".list_setup").attr("class").indexOf("select") < 0) {
					skTv.zone.focus('Config');
					return;
				}
				_ctl.hidePrivacyConfig();
			}
		},

		// 사진첩 공개 설정 오픈
        showPrivacyConfig : function() {
			LoadingComponent.unlock();
			var _ctl = this;
			var _ctl_focusId;

            skTv.zone.hide('InputPopup');
            skTv.zone.hide('Ime');

            $(".list_setup").attr("class", "list_setup select");
			$(".box_info1 img").attr("src", "../image/icon/icon_view_setup1_select.png");
			$(".box_info2 img").attr("src", "../image/icon/icon_view_setup2_select.png");

            $(".btn_password").attr("class", "btn_password none");
			$(".btn_logout").attr("class", "btn_logout none");
			
			$(".box_info1").bind("mouseover", function() {_ctl.move($(this).attr("id"));});
			$(".box_info2").bind("mouseover", function() {_ctl.move($(this).attr("id"));});
			$(".box_info1").bind("click", function() {_ctl.action();});
			$(".box_info2").bind("click", function() {_ctl.action();});

			if (skFn.user.isPrivacyOpen()) {
				_ctl_focusId = "box_info1";
            }
            else {
				_ctl_focusId = "box_info2";
            }
			_ctl._set({curFocusId:_ctl_focusId});
			_ctl._set_focusClass($("#" + _ctl_focusId));			
        },

		// 사진첩 공개 설정 닫기
        hidePrivacyConfig : function() {
			var _ctl = this;
			var _ctl_focusId = _ctl._get("curFocusId");

			PopupComponent.showTextPopup(
					'알림',
					'내 사진첩 보기 설정이 변경 되었습니다.',
					function() {
						_ctl._set_deleteFocusClass($("#" + _ctl_focusId));
						
						$(".list_setup").attr("class", "list_setup none");
						$(".box_info1 img").attr("src", "../image/icon/icon_view_setup1_none.png");
						$(".box_info2 img").attr("src", "../image/icon/icon_view_setup2_none.png");

						$(".btn_password").attr("class", "btn_password");
						$(".btn_logout").attr("class", "btn_logout");

						$(".box_info1").unbind("mouseover");
						$(".box_info2").unbind("mouseover");
						$(".box_info1").unbind("click");
						$(".box_info2").unbind("click");

						_ctl._set({curFocusId:'btn_password'});

						if(_ctl_focusId == 'box_info1') {
							skFn.user.updatePrivacy('open');
						} else {
							skFn.user.updatePrivacy('close');
						}
						skTv.zone.focus('Config');
					}
			);
        },
        
        // 로그아웃
		doLogout : function () {
			skFn.cookie.set('l', '', {
                expires: -1,
                domain: document.domain.toLowerCase(),
                path: '/'
             });
			
    	    skFn.cookie.set('u', '', {
                expires: -1,
                domain: document.domain.toLowerCase(),
                path: '/'
             });

			navigation.gotoPeopleList();
        },

        // 비밀번호 확인
        checkValidatePassword : function(val) {
            var x_user_id = skFn.user.getUserId();
            var x_user_tap = skFn.user.getUserTp();

			var _ctl = this;
			var _ctl_focusId;
			var _ctl_curClass;
			var _ctl_newClass;

			_ctl_focusId = _ctl._get("curFocusId");
 			if(x_user_tap == 'NATE') {
                x_user_id = x_user_id.replace("@nate.com","");
            }

            LoginController.model._set({
            	loginId:x_user_id,
	            loginPw:val,
	            loginTab:x_user_tap});

            LoginController.isValidatePassword(function(rtnValue) {

	            if (rtnValue == true) {

	            	_ctl.showPrivacyConfig();
	            }
				else { 
					_ctl_focusId = 'input_password';
					_ctl._set({curFocusId:_ctl_focusId});
					
					_ctl._set_focusClass($("#" + _ctl_focusId).parent());
					LoadingComponent.unlock();					
					var strMsgTitle, strMsgContents;
					
					if ($("#input_password").val() == "") {
						strMsgTitle = "비밀번호를 입력하세요";
					} else {
						strMsgTitle = "비밀번호 불일치";
					} 
					
					
			    	strMsgContents = "설정내용 확인 및 수정을 위해 현재 사용중인<br /> ";
			    	if (skFn.user.getUserTp() == "CYWORLD") {
			    		strMsgContents += "싸이월드 "; 
				    } else {
			    		strMsgContents += "네이트 "; 
				    }
		    		strMsgContents += "비밀번호를 재확인 해주세요."; 
					
		    		$(".description").html("<div class='warning'>" + strMsgTitle + "</div>" + strMsgContents);
				}
			});
		}
	}
});
