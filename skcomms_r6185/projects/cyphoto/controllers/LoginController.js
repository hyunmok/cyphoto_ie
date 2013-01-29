/**
 *
 * LoginController.js
 *
 * @_see http://wiki.skcomms.co.kr/display/TVAPPS/Login
 *
 */
var LoginControllerClass = defineClass({

    extend : BaseControllerClass,
    name : 'LoginControllerClass',
    construct : function(){

		this._init([
			'prevVal',			// 인풋창의 이전에 입력된 값 2012-09-06 오후 08:18 by jhm
			'focusId',
		    'focusMap',
		    'NateEmail',
		    'NoticeMsg',
		    'moveFunction',
			'magicNumber',		// 비밀번호 비밀 키
            'ck_loginId',		// 쿠키에 저장된 아이디
            'ck_loginPw',
            'ck_loginTab',		// CYWORLD or NATE
            'ck_chkIdSave',		// 1 or 0
            'ck_chkPwSave'		// 1 or 0
		]);

		var arrFocusMap = {
			n_title_nate 	: {UP:'GNB', RIGHT:'n_title_cyworld', LEFT:'', DOWN:'n_loginid'},
			n_title_cyworld	: {UP:'GNB', RIGHT:'', LEFT:'n_title_nate', DOWN:''},
			//UI 변경으로 수정 2012-08-10 [18:23:49] @SoonyoungPark
			n_loginid 		: {UP:'n_title_nate', RIGHT:'IME', LEFT:'', DOWN:'n_pw'},
			n_pw 			: {UP:'n_loginid', RIGHT:'IME', LEFT:'', DOWN:'n_btnLogin'},
			n_btnLogin 		: {UP:'n_pw', RIGHT:'IME', LEFT:'', DOWN:'n_chkLoginid'},
			n_chkLoginid 	: {UP:'n_btnLogin', RIGHT:'n_chkPw', LEFT:'', DOWN:''},
			n_chkPw 		: {UP:'n_btnLogin', RIGHT:'IME', LEFT:'n_chkLoginid', DOWN:''},

			c_title_nate 	: {UP:'GNB', RIGHT:'c_title_cyworld', LEFT:'', DOWN:''},
			c_title_cyworld	: {UP:'GNB', RIGHT:'', LEFT:'c_title_nate', DOWN:'c_loginid'},
			c_loginid 		: {UP:'c_title_cyworld', RIGHT:'IME', LEFT:'', DOWN:'c_pw'},
			c_pw 			: {UP:'c_loginid', RIGHT:'IME', LEFT:'', DOWN:'c_btnLogin'},
			c_btnLogin 		: {UP:'c_pw', RIGHT:'IME', LEFT:'', DOWN:'c_chkLoginid'},
			c_chkLoginid 	: {UP:'c_btnLogin', RIGHT:'c_chkPw', LEFT:'', DOWN:''},
			c_chkPw 		: {UP:'c_btnLogin', RIGHT:'IME', LEFT:'c_chkLoginid', DOWN:''}
		}
		////alert(document.cookie);
		this._set({focusId:'', focusMap:arrFocusMap, NateEmail:'nate.com', NoticeMsg:'싸이월드 사진첩은 로그인 후 이용할 수 있습니다.', magicNumber : '******'});
		this._set({ck_loginId:'', ck_loginPw:'', ck_loginTab:'CYWORLD', ck_chkIdSave:'0', ck_chkPwSave:'0', moveFunction:'gotoPhotoList'});

        this.user = new UserModelClass();
        this.model = new LoginModelClass();
        this.model._set({
            prevVal:'',		// 인풋창의 이전에 입력된 값 2012-09-06 오후 08:18 by jhm
			loginId:'',
            loginPw:'',
            loginTab:"CYWORLD",	// CYWORLD or NATE
            chkIdSave:'0',	// 1 or 0
            chkPwSave:'0',	// 1 or 0
            evalue: {
                NATE : 'D1E4297D787302003419A2F758BD9C79A341255031E758D85D8FDA4E4577DEA0A0FEA7408B0E11A0505791BCA4E8E8DD1CA122873318F231A621C3C971B2BBAF1668BEAE76DAED7B2A1E510EE1292FDAF09BB4C930242BCB26ADBD7762BD02AC7D99E1BA2BCDDB4C5AC15D97CC5B0E31133D2C702BE762D29EADC6A12104B46B',
                CYWORLD : 'DD303A4EB455BA81F12DFA168FBB044C99B412CF8EA149709E81A3362B6F3136D577121276CA0CB60D49F958F3FDBA66B6D6CD3FBE0789A237A2DDB42499613D77F74FE8E1DE505B8F768DBD7881759F94EFB5090AC724805759A5516702D35CDAEC7708621A0D39488CACD872BB7AD26F6F5C76E0092FC5F3377A2D2404E48F',
            },
            nvalue : '10001',
        });
    },

    methods : {

        doLogin : function(fnCallBack) {
			var _ctl = this;
			var userModel = this.user;
			var loginModel = this.model;
			//아이디 비밀번호가 저장되어 있을 경우
			if(this.retrieveSavedLoginId() == this.model.loginId && this._get("magicNumber") == this.model.loginPw){

				loginModel._set({oAuthToken : _ctl.retrieveSavedAccessToken()});
				loginModel._set({oAuthTokenSecret : _ctl.retrieveSavedAccessTokenSecret()});
				loginModel._set({loginId : _ctl.retrieveSavedLoginId()});
				loginModel._set({loginTab : _ctl.retrieveSavedLoginTab()});

				userModel._set({userSSO: _ctl.retrieveSavedSSO()});
				userModel._set({userName : _ctl.retrieveSavedCustNM()});
				userModel._set({loginId:this.model.loginId});
				userModel._set({loginTab:this.model.loginTab});
				userModel._set({isTown:"0"});
				_ctl.copyPtoLCookie();
				_ctl.copyPtoLCookie();
				_ctl.retrieveUserTid(userModel, loginModel, _ctl, fnCallBack);

			}
			//아이디 비밀번호가 저장되어 있지 않을 경우
			else{
				var http = new XMLHttpRequest();

				var x_auth_password = this.doEncryptPassword();
				
				//var x_user_id = this.model.loginId;
				//SKP 로그인 관련 수정
				//2012-09-12 [10:45:37] @SoonyoungPark
				var curFocusId = _ctl._get('focusId');
				if(curFocusId == 'c_btnLogin') {
					var x_user_id = $("#c_loginid").val();
				}else{
					var x_user_id = $("#n_loginid").val();
				}

				if(this.model.loginTab == 'NATE') {
					x_user_id = x_user_id.replace("@nate.com","");
				}
//				var query = 'user_id='+x_user_id+'&x_auth_password='+x_auth_password+'&x_auth_tp='+this.model.loginTab+'&oauth_nonce='+skFn.string.md5(Math.random())+'&oauth_timestamp='+skFn.string.timestamp()+'&isDev='+skEnv.api.isDev+'&appId=CYPHOTO_LG';
				var query = 'user_id='+skFn.string.trim(x_user_id);
				query +='&x_auth_password='+x_auth_password;
				query +='&x_auth_tp='+this.model.loginTab;

				query +='&oauth_nonce='+encodeURIComponent(skFn.string.md5(Math.random()));
				query +='&oauth_timestamp='+encodeURIComponent(skFn.string.timestamp());

				query +='&isDev='+encodeURIComponent(skEnv.api.isDev);
				query +='&appId='+encodeURIComponent(skEnv.app.id);
				query +='&agentVer='+encodeURIComponent(skEnv.version.agent);
				query +='&appVer='+encodeURIComponent(skEnv.version.app);
				query +='&modelId='+encodeURIComponent(skEnv.device.modelId);
				query +='&vendor='+encodeURIComponent(skEnv.device.vendor);	//통계 이슈로 추가 됨 (6.30 by sophia)
				query +='&referrer='+encodeURIComponent(document.referrer);

				var retrieveUserTid = this.retrieveUserTid;
				var retrieveUserMainHome = this.retrieveUserMainHome;
				var saveUCookie = this.saveUCookie;
				var savePCookie = this.savePCookie;

				userModel._set({loginId:this.model.loginId});
				userModel._set({loginTab:this.model.loginTab});


				http.open('POST', URI_GET_TOKEN_DATA, true);
				http.onreadystatechange = function(){
					//락 해제
					LoadingComponent.unlock();
					if (http.readyState==4){
						 if(http.status==200) {
							var lcookie = '';
							userModel._set({isTown:"0"});
							var JSONData = eval('('+http.responseText+')');
							//오류 처리
							if(JSONData.code != 0){
								userModel._set({loginId:''});
								userModel._set({loginTab:''});
								fnCallBack(false, JSONData.user_msg.contents);
							}else{
								//SKP One ID 로직수정
								//2012-08-31 [13:46:49] @SoonyoungPark
								/*
								var pairs = JSONData.body.split('&');
								for (var i = 0; i < pairs.length; i++) {
									values = pairs[i].split('=');
									if(values[0] == "CustNM") {
										values[1] = encodeURIComponent(values[1]);
										userModel._set({userName:values[1]});
									}
									else if(values[0] == "SSO") {
										//네이트 온리 아이디 추가
										//2012-08-17 [17:22:46] @SoonyoungPark
										if (values[1] == 'NO'){
											var responseText = '{"code":"7200","user_msg": {"title": "일시적인 장애입니다.", "contents":"네이트 홈페이지에서 싸이월드 아이디와 연동 후 사용하실 수 있습니다."},"sys_msg":"Nate Only ID","body":""}'
											JSONData = eval('('+responseText+')');
											//오류 처리
											if(JSONData.code != 0){
												userModel._set({loginId:''});
												userModel._set({loginTab:''});
												fnCallBack(false, JSONData.user_msg.contents);
											}
											return false;
										}else{
											userModel._set({userSSO:values[1]});
										}
									}
									else if(values[0] == "oauth_token") {
										loginModel._set({oAuthToken:values[1]});
									}
									else if(values[0] == "oauth_token_secret") {
										loginModel._set({oAuthTokenSecret:values[1]});
									}
									lcookie += values[0]+"="+values[1]+'&';
								}
								*/
								//
								var result = SKPLoginComponent.isAccessible(JSONData.body, "CO");

								//정상
								if (result === 0){
									var bodyObj = SKPLoginComponent.toObj(JSONData.body);
									var custNm = bodyObj["CustNM"];
									custNm = encodeURIComponent(custNm);
									userModel._set({userName:custNm});
									userModel._set({userSSO:bodyObj["SSO"]});
									loginModel._set({oAuthToken:bodyObj["oauth_token"]});
									loginModel._set({oAuthTokenSecret:bodyObj["oauth_token_secret"]});

									//lcookie = JSONData.body;
									for (var pro in bodyObj){
										if (pro === "CustNM"){
											bodyObj[pro] = encodeURIComponent(bodyObj[pro]);
										}
										lcookie += pro + "=" + bodyObj[pro] + "&";
									}

									skFn.cookie.set('l', lcookie, {
											expires: 90,
											domain: document.domain.toLowerCase(),
											path: '/'
									});
									retrieveUserTid(userModel, loginModel, _ctl, fnCallBack);
								}else{
									var userMsg = '';
									switch (result){
										case 1:
											//싸이월드 기반 서비스(CO)의 경우 One ID 전환 필요 사용자
											userMsg = "입력하신 ID로 본 서비스를 이용하기 위해서는 네이트 웹(www.nate.com)에서 로그인 후 One ID로 전환해 주세요.";
											break;
										case 2:
											//싸이월드 기반 서비스(CO)의 경우 약관 동의 필요 사용자
											userMsg = "입력하신 ID로 본 서비스를 이용하기 위해서는, 네이트 웹(www.nate.com)에서 로그인 후 약관동의를 해 주세요.";
											break;
										case 10:
											//싸이월드 기반 서비스(NO)의 경우 싸이월드 사용자(CO) – SKP One ID 라이브 이전
											userMsg = "네이트 홈페이지에서 싸이월드 아이디와 연동 후 사용하실 수 있습니다.";
											break;
										default :
											userMsg = "서버로 부터 정상적인 응답을 받지 못하였습니다.<br />잠시 후 다시 시도해 주세요.";
											//오류로 간주
											break;
									}

									userModel._set({loginId:''});
									userModel._set({loginTab:''});
									//fnCallBack(false, JSONData.user_msg.contents);

									fnCallBack(false, userMsg);
								}
							}
						}
						//정상 응답을 받지 못할 경우(status != 200) 의 Error 메세지
						else {
							JSONData = eval('('+http.responseText+')');
							//오류 처리
							if(JSONData.code != 0){
								userModel._set({loginId:''});
								userModel._set({loginTab:''});
								fnCallBack(false, JSONData.user_msg.contents);
							}
							return false;
						}
					}
				}
				http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
				http.send(query);
			}
        },
		invalidAccessToken : function(ctl, isTrial){
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
			skFn.cookie.set('p', '', {
                expires: -1,
                domain: document.domain.toLowerCase(),
                path: '/'
             });
			if(isTrial == false){
				var curFocusId = ctl._get('focusId');
				 $("#n_pw").val('');
				 var strUserMsg = '일시적인 장애로 인해 로그인에 실패하였습니다.<br/>비밀번호를 다시 입력해 주세요.';
				 if(curFocusId == 'c_btnLogin') {
					$("#SceneCyworldLogin .info").html(strUserMsg);
				} else {
					$("#SceneNateLogin .info").html(strUserMsg);
				}
			}
			LoadingComponent.unlock();
		},
        retrieveUserTid : function(userModel, loginModel, ctl, fnCallBack) {
            skTv.gateway.request({
                requestType : 'nxc_get_my_info',
                params : {loginid:userModel.loginId,oAuthToken:loginModel.oAuthToken,oAuthTokenSecret:loginModel.oAuthTokenSecret},
                wrapperFilter : function(result){
					if(result.code != 0){
						ctl.invalidAccessToken(ctl, false);
						return;
					}else{
						userModel._set({userTid:result.body.result[0].tid});
						ctl.retrieveMenuOpen(userModel, loginModel, ctl, fnCallBack);
						return;
					}
                }
            });
        },

        retrieveMenuOpen : function(userModel, loginModel, ctl, fnCallBack) {
            skTv.gateway.request({
                requestType : 'xml_RetrieveMenuOpen',
                params : {targetId:userModel.userTid, menuType:'photo'},
                wrapperFilter : function(result){
					if(result.code != 0){
						ctl.invalidAccessToken(ctl, false);
						return;
					}else{
						userModel._set({userPhotoMenu:result.body.result});
						ctl.retrieveUserMainHome(userModel, loginModel, ctl, fnCallBack);
						return;
					}
                }
            });
        },

        retrieveUserMainHome : function(userModel, loginModel, ctl, fnCallBack) {
            skTv.gateway.request({
                requestType : 'nxc_get_main_home',
                params : {tid:userModel.userTid},
                wrapperFilter : function(result){
					if(result.code != 0){
						ctl.invalidAccessToken(ctl, false);
						return;
					}else{
						userModel._set({userCMN:result.body.result[0].id});
						userModel._set({userMainHome:result.body.result[0].main_flag});
						ctl.saveUCookie(userModel);
						//체크 박스에 따른 p 쿠키 세팅 분기
						var paramLoginModel = loginModel;
						var paramUserModel = userModel;
						//2011-04-11 박순영 추가
						if(loginModel._get('chkPwSave') == 0){
							paramLoginModel = null;
						}
						if(loginModel._get('chkIdSave') == 0 ){
							paramUserModel = null;
						}
						ctl.savePCookie(paramUserModel, paramLoginModel);
						if(fnCallBack)	fnCallBack(true);
						return;
					}
                }
            });
        },
		copyPtoLCookie : function() {
            var lcookie = 'oauth_token='+this.retrieveSavedAccessToken()+'&';
            lcookie += 'oauth_token_secret='+this.retrieveSavedAccessTokenSecret()+'&';
            lcookie += 'CustNM='+this.retrieveSavedCustNM()+'&';
            lcookie += 'SSO='+this.retrieveSavedSSO();
            skFn.cookie.set('l', lcookie, {
                expires: 90,
                domain: document.domain.toLowerCase(),
                path: '/'
             });
        },
        saveUCookie : function(userModel) {
            var ucookie = 'id='+userModel.loginId+'&';
            ucookie += 'nick=&';
            ucookie += 'name='+userModel.userName+'&';
            ucookie += 'cmn='+userModel.userCMN+'&';
            ucookie += 'sso='+userModel.userSSO+'&';
            ucookie += 'tp='+userModel.loginTab+'&';
            ucookie += 'tid='+userModel.userTid+'&';
            ucookie += 'photomenu='+userModel.userPhotoMenu+'&';
            ucookie += 'mainhome='+userModel.userMainHome+'&';
            ucookie += 'istown='+userModel.isTown;
			////alert("saveUCookie.ucookie = \n"+ucookie+"\n\ncookie : "+document.cookie);

            skFn.cookie.set('u', ucookie, {
                expires: 9000,
                domain: document.domain.toLowerCase(),
                path: '/'
             });
        },

        savePCookie : function(userModel, loginModel) {
			var oauth_token = '';
			var oauth_token_secret = '';
			var loginId = '';
			var loginTab = '';
			var userName = '';
			var userSSO = '';

			if(loginModel != null){
				oauth_token = loginModel.oAuthToken;
				oauth_token_secret = loginModel.oAuthTokenSecret;
			}
			if(userModel != null){
				loginId = userModel.loginId;
				loginTab = userModel.loginTab;
				userName = userModel.userName;
				userSSO = userModel.userSSO;
			}

            var pcookie = 'id='+loginId+'&';
            pcookie += 'tab='+loginTab+'&';
			pcookie += 'oauth_token='+oauth_token+'&';
	        pcookie += 'oauth_token_secret='+oauth_token_secret+'&';
            pcookie += 'CustNM='+encodeURIComponent(userName)+'&';
            pcookie += 'SSO='+userSSO;

            skFn.cookie.set('p', pcookie, {
                expires: 9000,
                domain: document.domain.toLowerCase(),
                path: '/'
             });
			 ////alert("savePCookie.ucookie = \n"+pcookie+"\n\ncookie : "+document.cookie);
        },

        doEncryptPassword : function() {
               try {
                    var rsa = new RSAKey();
                    rsa.setPublic(this.model.evalue[this.model.loginTab], this.model.nvalue);
                    var fullData = skFn.string.getFullToday() + '|^|';
                    fullData += this.model.loginId + '|^|';
                    fullData += this.model.loginPw;
                    return encodeURIComponent(hex2b64(rsa.encrypt(fullData)));
                } catch (e) {
                    return false;
                }
                return false;
        },

        isValidatePassword : function(fnCallback) {

            var x_auth_password = this.doEncryptPassword();
            var http = new XMLHttpRequest();
			//SKP One ID 이슈 수정
			//2012-08-28 [17:09:20] @SoonyoungPark
			var x_user_id = this.model.loginId;
			if(this.model.loginTab == 'NATE') {
				x_user_id = x_user_id.replace("@nate.com","");
			}
            var query = 'user_id='+x_user_id;
			query +='&x_auth_password='+x_auth_password;
			query +='&x_auth_tp='+this.model.loginTab;

			query +='&oauth_nonce='+encodeURIComponent(skFn.string.md5(Math.random()));
			query +='&oauth_timestamp='+encodeURIComponent(skFn.string.timestamp());

			query +='&isDev='+encodeURIComponent(skEnv.api.isDev);
			query +='&appId='+encodeURIComponent(skEnv.app.id);
			query +='&agentVer='+encodeURIComponent(skEnv.version.agent);
			query +='&appVer='+encodeURIComponent(skEnv.version.app);
			query +='&modelId='+encodeURIComponent(skEnv.device.modelId);
			query +='&vendor='+encodeURIComponent(skEnv.device.vendor);	//통계 이슈로 추가 됨 (6.30 by sophia)
			query +='&referrer='+encodeURIComponent(document.referrer);

            http.open('POST', URI_GET_TOKEN_DATA, true);
            http.onreadystatechange = function(){
                if (http.readyState==4){
                     if(http.status==200) {
						var JSONData = eval('('+http.responseText+')');
						if(JSONData.code == 0){
							return fnCallback(true);
						}else{
							return fnCallback(false);
						}
                    }
                    else {
                        return fnCallback(false);
                    }
                }
            }
            http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            http.send(query);
        },

        setLoginId : function(val) {
			//SKP One ID 저장 관련 수정
			//2012-08-28 [17:06:30] @SoonyoungPark
			//if (this.model._get("loginTab") === "NATE" && val.indexOf("@") === -1){
			if (val.indexOf("@") === -1){
				val = val+"@nate.com";
			}
			val = skFn.string.trim(val);
            this.model._set({loginId:val});
        },

        setLoginPw : function(val) {
            this.model._set({loginPw:val});
        },

        setLoginTab : function(val) {
            this.model._set({loginTab:val});
        },

        setChkIdSave : function(val) {
            this.model._set({chkIdSave:val});
        },

        setChkPwSave : function(val) {
            this.model._set({chkPwSave:val});
        },

/*
        // will be Deprecated
        focusNateLoginTab : function() {
            this.setLoginTab('NATE');
        },
        // will be Deprecated
        focusCyworldLoginTab : function() {
            this.setLoginTab('CYWORLD');
        },
 */
		retrieveSavedSSO : function(){
			return skFn.user.getCookie('SSO','p');
		},
		retrieveSavedCustNM : function(){
			return skFn.user.getCookie('CustNM','p');
		},
        retrieveSavedLoginId : function() {
        	return skFn.user.getCookie('id','p');
        	//return 'testtest@lycos.co.kr';
        },

        retrieveSavedAccessToken: function() {
        	return skFn.user.getCookie('oauth_token','p');
        	//return 'xxxsdfsgsegweg';
        },

        retrieveSavedAccessTokenSecret: function() {
        	return skFn.user.getCookie('oauth_token_secret','p');
        	//return 'xggggxxsdfsgsegweg';
        },

        retrieveSavedLoginTab : function() {
        	return skFn.user.getCookie('tab','p');
        	//return 'NATE';
        },

        init : function(loginAfterMoveFunc){
        	var _ctl 		= this;
        	var fZone 		= 'CyworldLogin';
        	var _ctl_loginId, _ctl_loginPw, _ctl_loginTab, _ctl_chkIdSave, _ctl_chkPwSave;
        	var inputFocusId = 'c_loginid';

        	_ctl_loginId = _ctl.retrieveSavedLoginId();

        	// 초기 로딩할 Zone 세팅 및 model 변수 세팅
            if(_ctl_loginId != ""){
            	_ctl_chkIdSave = '1';

            	if(_ctl.retrieveSavedLoginTab() == "NATE") {
                	fZone = 'NateLogin';
            		_ctl_loginTab 	=  'NATE';
            		inputFocusId	=	'n_loginid';

        		} else {
            		_ctl_loginTab 	=  'CYWORLD';
            		inputFocusId	=	'c_loginid';
        		}

        		if(_ctl.retrieveSavedAccessToken() != "") {
        			_ctl_chkPwSave = "1";
        			_ctl_loginPw = _ctl._get("magicNumber");

					/*로직 추가*/
					var userModel = this.user;
					var loginModel = this.model;
					//아이디 비밀번호가 저장되어 있을 경우


					loginModel._set({oAuthToken : _ctl.retrieveSavedAccessToken()});
					loginModel._set({oAuthTokenSecret : _ctl.retrieveSavedAccessTokenSecret()});
					loginModel._set({loginId : _ctl.retrieveSavedLoginId()});
					loginModel._set({loginTab : _ctl.retrieveSavedLoginTab()});

					userModel._set({userSSO: _ctl.retrieveSavedSSO()});
					userModel._set({userName : _ctl.retrieveSavedCustNM()});
					userModel._set({loginId:this.model.loginId});
					userModel._set({loginTab:this.model.loginTab});
					userModel._set({isTown:"0"});

					skTv.gateway.request({
						requestType : 'nxc_get_my_info',
						params : {loginid:userModel.loginId,oAuthToken:loginModel.oAuthToken,oAuthTokenSecret:loginModel.oAuthTokenSecret},
						wrapperFilter : function(result){
							if(result.code != 0){
								_ctl.invalidAccessToken(_ctl, true);
								return;
							}else{
								return;
							}
						}
					});
        		} else {
        			_ctl_chkPwSave = "0";
        			_ctl_loginPw = "";
        		}

        		_ctl._set({ck_loginId:_ctl_loginId, ck_loginPw: _ctl_loginPw, ck_loginTab:_ctl_loginTab, ck_chkIdSave:_ctl_chkIdSave, ck_chkPwSave: _ctl_chkPwSave});
            }

			if(loginAfterMoveFunc !== undefined) {
				_ctl._set({moveFunction : loginAfterMoveFunc});
			}

    		skFn.debug.log('[login init] loginId : ' + _ctl_loginId + ', loginTab : ' + _ctl_loginTab + ", chkIdSave : " + _ctl_chkIdSave + ", chkPwSave : " + _ctl_chkPwSave);
/*
 *
 * // IME 자판 로딩 후 IME 영역노출 (sophia 5.4)
            skTv.zone.show(fZone);
            skTv.zone.focus(fZone);

    		skTv.zone.show('Ime');
 */
    		if(skEnv.device.vendor == "lg") {
				LGImeComponent.setFunctionKey("skTv.keymap.RETURN", "navigation.gotoAppManage();");
    			LGImeComponent.show(skTv.zone.getCurZone(),'english', inputFocusId, function(){
    	            skTv.zone.show(fZone);
    	    		skTv.zone.show('Ime');
    	            skTv.zone.focus(fZone);
    			});
    		}
    		else if(skEnv.device.vendor == "lgcns") {
    			LGImeComponent.show(skTv.zone.getCurZone(),'english', inputFocusId, function(){
    	            skTv.zone.show(fZone);
    	    		skTv.zone.show('Ime');
    	            skTv.zone.focus(fZone);
    			});
    		}
    		else {
	            skTv.zone.show(fZone);
	            skTv.zone.focus(fZone);
    		}
        },

        show : function(loginTab){
			//텝 이동시 Ac 숨김
			//2012-08-10 [18:23:28] @SoonyoungPark
			skTv.zone.hide("Ac");
        	var _ctl 			= this;
        	var _ctl_loginId, _ctl_loginPw, _ctl_loginTab, _ctl_chkIdSave, _ctl_chkPwSave, _ctl_NoticeMsg;

         	_ctl_loginId	=	_ctl._get('ck_loginId');
        	_ctl_loginPw	=	_ctl._get('ck_loginPw');
        	_ctl_loginTab	=	_ctl._get('ck_loginTab');
        	_ctl_chkIdSave	=	_ctl._get('ck_chkIdSave');
        	_ctl_chkPwSave	=	_ctl._get('ck_chkPwSave');
        	_ctl_NoticeMsg	=	_ctl._get('NoticeMsg');

    		skFn.debug.log('[login Contoller : show] ck_loginId : ' + _ctl_loginId + ', ck_loginPw : ' + _ctl_loginPw + ', ck_loginTab : ' + _ctl_loginTab + ', ck_chkIdSave : ' + _ctl_chkIdSave + ', ck_chkPwSave : ' + _ctl_chkPwSave + ', ck_loginPw : ' + _ctl_chkPwSave);

        	// 네이트  탭
        	if(loginTab == "NATE") {
        		// Gnb에서 Down키를 클릭했을때 이동할 zone 세팅
        		GnbComponent.setReturnZone("NateLogin");

        		// 쿠키에 저장된 값을 세팅한다.
        		if(_ctl_loginTab == "NATE" && _ctl_chkIdSave == "1") {
                	// 저장된 아이디 세팅 및 체크박스 체크
						//보여준대로 저장되도록 수정
						//2012-08-14 [09:59:19] @SoonyoungPark
                	//$("#n_loginid").val(_ctl_loginId.substring(0, _ctl_loginId.indexOf("@")));
                	//$("#n_email").val(_ctl_loginId.substring(_ctl_loginId.indexOf("@")+1, _ctl_loginId.length));
					$("#n_loginid").val(_ctl_loginId);
                	_ctl.init_NateEmail();
                	$("#n_chkLoginid").parents(".box_radio").attr("class", "box_radio check");


                	// 패스워드 저장됨 이미지로 변경 및 체크박스 체크
                	if(_ctl_chkPwSave == "1") {
                		$("#n_pw").val(_ctl_loginPw);
                		$("#n_pw").attr("class", "input_text3 ready");
                    	$("#n_chkPw").parents(".box_radio").attr("class", "box_radio check");
                	} else {
                    	$("#n_pw").val("");
                		$("#n_pw").attr("class", "input_text3");
                    	$("#n_chkPw").parents(".box_radio").attr("class", "box_radio");
                	}

        		} else {

	        		// 저장된 아이디 세팅 및 체크박스 체크
	            	$("#n_loginid").val("");
	            	$("#n_loginid").attr("class", "input_text1");
	            	$("#n_chkLoginid").parents(".box_radio").attr("class", "box_radio");
	            	$("#n_email").val(_ctl._get('NateEmail'));

                	$("#n_pw").val("");
                	$("#n_pw").attr("class", "input_text3");
                	$("#n_chkPw").parents(".box_radio").attr("class", "box_radio");

	        	}
        		$("#SceneNateLogin .info").html("아이디가 이메일 형태일 때는 '@' 이하 주소를 모두 입력하세요.");
        		//$("#SceneCyworldLogin .info").text(_ctl_NoticeMsg);


        	// 싸이월드 탭
        	} else if(loginTab == "CYWORLD") {
        		// Gnb에서 Down키를 클릭했을때 이동할 zone 세팅
           		GnbComponent.setReturnZone("CyworldLogin");

           		// 쿠키에 저장된 값을 세팅한다.
        		if(_ctl_loginTab == "CYWORLD" && _ctl_chkIdSave == "1") {

                	// 저장된 아이디 세팅 및 체크박스 체크
                	$("#c_loginid").val(_ctl_loginId);
                	$("#c_chkLoginid").parents(".box_radio").attr("class", "box_radio check");


                	// 패스워드 저장됨 이미지로 변경 및 체크박스 체크
                	if(_ctl_chkPwSave == "1") {
                    	$("#c_pw").val(_ctl_loginPw);
                		$("#c_pw").attr("class", "input_text3 ready");
                    	$("#c_chkPw").parents(".box_radio").attr("class", "box_radio check");
                	} else {
                    	$("#c_pw").val("");
                		$("#c_pw").attr("class", "input_text3");
                    	$("#c_chkPw").parents(".box_radio").attr("class", "box_radio");
                	}

        		} else {

	        		// 저장된 아이디 세팅 및 체크박스 체크
	            	$("#c_loginid").val("");
	            	$("#c_loginid").attr("class", "input_text5");
	            	$("#c_chkLoginid").parents(".box_radio").attr("class", "box_radio");

                	$("#c_pw").val("");
            		$("#c_pw").attr("class", "input_text3");
                	$("#c_chkPw").parents(".box_radio").attr("class", "box_radio");

	        	}

        		//$("#SceneNateLogin .info").text(_ctl_NoticeMsg);

				$("#SceneCyworldLogin .info").html("싸이월드 아이디는 이메일 주소 형태로 입력해 주세요.");
        	}

         },

        /*
         * 포커스 이동시 호출하는 함수
         * direction : INIT, UP, DOWN, RIGHT,LEFT, CURRENT
         */
        move : function(direction){
    		skFn.debug.log('[move]');
        	var _ctl = this;
            var curFocusId = _ctl._get('focusId');
			$("#"+curFocusId).removeClass('focus');
            var newFocusId;
            var curCss = "", newCss;
            var tmpCss;

            if(direction == "INIT") {
            	if(skTv.zone.getCurZone() == "NateLogin" && $("#c_title_nate").parent().attr("class").indexOf("focus")> 0 ) {
            		$("#c_title_nate").parent().attr("class", $("#c_title_nate").parent().attr("class").replace(" focus", ""));

            	} else if(skTv.zone.getCurZone() == "CyworldLogin" && $("#n_title_cyworld").parent().attr("class").indexOf("focus")> 0 ) {
            		$("#n_title_cyworld").parent().attr("class", $("#n_title_cyworld").parent().attr("class").replace(" focus", ""));
            	}

    			// 이메일 도메인 선택 후에는 이메일 focus를 지워줘야 한다.
    			if(skTv.zone.getOldZone() == "NateEmail") {
					// 이전 focusid의 class를 변경
    				tmpCss = $("#" + curFocusId).parent().attr("class").replace(" focus", "");
    				$("#" + curFocusId).parent().attr("class", tmpCss);
    			}
    			newFocusId = curFocusId;

    		} else {

    			// 4방향키 이동시
				if (direction == "DOWN" && skTv.zone.isShown("Ac")){
					skTv.zone.focus("Ac");
				}
    			else if(direction == "UP" || direction == "DOWN" || direction == "RIGHT" || direction == "LEFT") {
    				newFocusId	=	eval("_ctl._get('focusMap')." + curFocusId + "." + direction);
    			} else {
    				newFocusId	=	direction;
    			}

    			if(newFocusId != "") {
					// Input의 Bg 변경(아이디, 비밀번호)
					if(curFocusId == "n_loginid" || curFocusId == "n_pw" || curFocusId == "c_loginid" || curFocusId == "c_pw") {

						if($("#" + curFocusId).val() == "") {
							tmpCss = $("#" + curFocusId).parent().attr("class");
							if(tmpCss.indexOf(" ") > 0) tmpCss = tmpCss.substring(0, tmpCss.indexOf(" "));

							$("#" + curFocusId).parent().attr("class", tmpCss);

							//if($("#" + curFocusId).val().length == 0 && $("#" + curFocusId).attr("class").indexOf(" ready") > 0) {
							if($("#" + curFocusId).attr("class").indexOf(" ready") > 0) {
				   				$("#" + curFocusId).attr("class", $("#" + curFocusId).attr("class").replace(" ready", ""))
							}
						}
					}

					// 이전 focusid의 class를 변경
				skFn.debug.log(' [이전 focusid의 class를 변경] $("#" + curFocusId).parent().attr("class") => curFocusId : ' + curFocusId + ', class : ' + $("#" + curFocusId).parent().attr("class"));
					tmpCss = $("#" + curFocusId).parent().attr("class").replace(" focus", "");
					$("#" + curFocusId).parent().attr("class", tmpCss);

					//SKP One ID 관련 디자인 구조 변경에 따른
					//포커스 로직변경
					//2012-08-29 [15:54:44] @SoonyoungPark

					/*
					if(curFocusId == "n_btnLogin" || curFocusId == "c_btnLogin") {
						if(direction == "RIGHT") {
							// 키보드로 이동시에만 처음 포커스로 이동 (by sophia 4.25)
							LGImeComponent.keyMove(skTv.keymap.RIGHT);

							// IME로 이동
							skTv.zone.focus("Ime");
	    					return;
						}
					} else if(curFocusId == "n_title_nate" || curFocusId == "n_title_cyworld" || curFocusId == "c_title_nate" || curFocusId == "c_title_cyworld") {
						// GNB로 이동
						if(direction == "UP") {
							skTv.zone.focus('Gnb');
	    					return;
						}
					}*/

					if (typeof _ctl._get('focusMap')[curFocusId] !== 'undefined' && _ctl._get('focusMap')[curFocusId][direction] == "IME"){
						// 키보드로 이동시에만 처음 포커스로 이동 (by sophia 4.25)
							LGImeComponent.keyMove(skTv.keymap.RIGHT);

							// IME로 이동
							skTv.zone.focus("Ime");
	    					return;
					}else if (direction == "UP"){
						if (curFocusId == "n_title_nate" || curFocusId == "n_title_cyworld" || curFocusId == "c_title_nate" || curFocusId == "c_title_cyworld"){
							skTv.zone.focus('Gnb');
	    					return;
						}
					}
				}
    		}

    		// 현재 포커스 세팅 및 Display
    		if(newFocusId != "") {
				skFn.debug.log(' [현재 포커스 세팅 및 Display] $("#" + newFocusId).parent().attr("class") => newFocusId : ' + newFocusId + ', class : ' + $("#" + newFocusId).parent().attr("class"));
 				_ctl._set({focusId:newFocusId});
				newCss = $("#" + newFocusId).parent().attr("class");

                $("#" + newFocusId).parent().attr("class", newCss.replace(" focus", "") + " focus");

				if(newFocusId == "n_loginid" || newFocusId == "n_pw" || newFocusId == "c_loginid" || newFocusId == "c_pw") {
					$("#" + newFocusId).attr("class", $("#" + newFocusId).attr("class") + " ready");
					//LGImeComponent.show(skTv.zone.getCurZone(),'english',newFocusId);

					if(skEnv.device.vendor == "lg") {
						LGImeComponent.show(skTv.zone.getCurZone(),'english',newFocusId, function(){
						});
					}
					else if(skEnv.device.vendor == "lgcns") {
						// cursor 생성을 위해 안드로이드 함수호출
						android.dispatchTouchEvent(newFocusId);
						LGImeComponent.show(skTv.zone.getCurZone(),'english',newFocusId, function(){
						});
					}
				}
    		}
         },

        // enter key 입력시 실행하는 action
        action : function() {
        	var _ctl = this;
            var curFocusId = _ctl._get('focusId');
            var newCss;

        	newCss = $("#" + curFocusId).attr("class");
        	newCss = newCss.substring(0, newCss.indexOf(" "));

        	// 탭 이동
        	if(curFocusId == "n_title_cyworld" || curFocusId == "c_title_nate") {
        		var hideTab, showTab;
        		if(curFocusId == "n_title_cyworld") {
        			hideTab = 'NateLogin';
        			showTab = 'CyworldLogin';
        		} else {
        			hideTab = 'CyworldLogin';
        			showTab = 'NateLogin';
        		}

				$("#" + curFocusId).attr("class", newCss);

            	skTv.zone.hide(hideTab);
            	skTv.zone.show(showTab);
            	skTv.zone.focus(showTab);

            // 이메일 select layer view
            } else if(curFocusId == "n_email") {
            	skTv.zone.show('NateEmail');
            	skTv.zone.focus('NateEmail');

            // 아이디저장 / 비밀번호 저장
            } else if(curFocusId == "n_chkLoginid" || curFocusId == "n_chkPw" || curFocusId == "c_chkLoginid" || curFocusId == "c_chkPw") {
            	newCss = $("#"+ curFocusId).parents(".box_radio").attr("class");

				if(newCss.indexOf("check") > 0) {

					newCss = newCss.replace(" check", "");
                	$("#"+ curFocusId).parents(".box_radio").attr("class", newCss);

    				if(curFocusId == "n_chkLoginid") {
    	            	newCss = $("#n_chkPw").parents(".box_radio").attr("class");

    					if(newCss.indexOf("check") > 0) {
    						$("#n_chkPw").parents(".box_radio").attr("class", newCss.replace(" check", ""));
    					}

    				} else if(curFocusId == "c_chkLoginid") {
    	            	newCss = $("#c_chkPw").parents(".box_radio").attr("class");

    					if(newCss.indexOf("check") > 0) {
    						$("#c_chkPw").parents(".box_radio").attr("class", newCss.replace(" check", ""));
    					}
    				}

            	} else{
					newCss = newCss  + " check";
                	$("#"+ curFocusId).parents(".box_radio").attr("class", ("box_radio check"));

    				if(curFocusId == "n_chkPw") {
    	            	newCss = $("#n_chkLoginid").parents(".box_radio").attr("class");
    					if(newCss.indexOf("check") < 0) {
    						$("#n_chkLoginid").parents(".box_radio").attr("class", newCss+" check");
    					}
    				} else if(curFocusId == "c_chkPw") {
    	            	newCss = $("#c_chkLoginid").parents(".box_radio").attr("class");
    					if(newCss.indexOf("check") < 0) {
    						$("#c_chkLoginid").parents(".box_radio").attr("class", newCss+" check");
    					}
    				}
            	}

			// 로그인
            } else if(curFocusId == 'n_btnLogin' || curFocusId == 'c_btnLogin') {
            	_ctl.goLogin(curFocusId);
            } else if(curFocusId == 'c_loginid' || curFocusId == 'c_pw' || curFocusId == 'n_loginid' || curFocusId == 'n_pw') {
            	if(skEnv.device.vendor == 'lgcns') {
					$('#' + curFocusId).focus();
            	}
            }
        },


        // 로그인 프로세스 전 체크
        goLogin : function(curFocusId){
        	var _ctl		=	this;
			var _ctl_model 	= 	this.model;
        	var strUserMsg 	= 	"";
        	var newFocusId	=	"";
        	var loginid, loginPw, loginTab, chkIdSave, chkPwSave;

        	// 싸이월드
        	if(curFocusId == 'c_btnLogin') {
        		loginid		=	$("#c_loginid").val();
        		loginPw		=	$("#c_pw").val();
        		loginTab	=	"CYWORLD";
        		chkIdSave	=	($("#c_chkLoginid").parents(".box_radio").attr("class").indexOf("check") > 0) ? '1' : '0';
        		chkPwSave	=	($("#c_chkPw").parents(".box_radio").attr("class").indexOf("check") > 0) ? '1' : '0';

        		if(loginid == "") {
        			newFocusId = "c_loginid";
        			strUserMsg = "아이디를 입력해주세요.";

        		} else if(loginPw == "") {
        			newFocusId = "c_pw";
        			strUserMsg = "비밀번호를 입력해주세요.";

        		}

        	} else {
        		//SKP One ID 관련 수정
				//2012-08-29 [16:29:49] @SoonyoungPark
        		//loginid 	= 	$("#n_loginid").val() + "@" + $("#n_email").val();
				loginid 	= 	$("#n_loginid").val();

				var domainPos = loginid.indexOf('@nate.com')
				if (loginid.indexOf('@nate.com') === 1){
					if(domainPos == -1){
						loginid += '@nate.com';
					}
				}

        		loginPw		=	$("#n_pw").val();
        		loginTab	=	"NATE";
        		chkIdSave	=	($("#n_chkLoginid").parents(".box_radio").attr("class").indexOf("check") > 0) ? '1' : '0';
        		chkPwSave	=	($("#n_chkPw").parents(".box_radio").attr("class").indexOf("check") > 0) ? '1' : '0';

        		// 네이트 탭에서 id인풋창에 아무것도 입력하지 않고 엔터를 눌렀을 때 오류 처리 2012-09-07 오후 04:18 by jhm
				//if(loginid == "@" + $("#n_email").val()) {
				if(loginid == "") {
        			newFocusId = "n_loginid";
        			strUserMsg = "아이디를 입력해주세요.";

        		} else if(loginPw == "") {
        			newFocusId = "n_pw";
        			strUserMsg = "비밀번호를 입력해주세요.";

        		}
        	}

        	// 로그인처리
        	if(strUserMsg == "") {

        		//순서 수정
				//2012-08-29 [16:36:47] @SoonyoungPark
        		_ctl.setLoginPw(loginPw);
        		_ctl.setLoginTab(loginTab);
        		_ctl.setChkIdSave(chkIdSave);
        		_ctl.setChkPwSave(chkPwSave);
				_ctl.setLoginId(loginid);
				//락을 건다.
				LoadingComponent.lock(true);
				setTimeout(function(){
					_ctl.doLogin(function(rtnValue, noticeMsg){
										var moveFunc	=	_ctl._get('moveFunction');
										// 해당 페이지로 이동한다.

										if(rtnValue) {
											eval("navigation." + moveFunc + "();");

										// 에러 메세지를 보여준다.
										} else {
											if(_ctl_model._get('loginTab') == "NATE") {
												$("#SceneNateLogin .info").html(noticeMsg);
											} else {
												$("#SceneCyworldLogin .info").html(noticeMsg);
											}
										}
					});

				}, 100);

        	} else {
            	if(curFocusId == 'c_btnLogin') {
            		$("#SceneCyworldLogin .info").text(strUserMsg);
            	} else {
            		$("#SceneNateLogin .info").text(strUserMsg);
            	}

            	// 로그인 버튼 focus 삭제
        		$("#"+ curFocusId).parent().attr("class", "input_type4");

        		_ctl._set({focusId:newFocusId});
				_ctl.move('INIT');
        	}
        },

        init_NateEmail : function () {
        	var chkSelected = false;

        	$(".list_email li").each(function(e){
        		if($(this).text() == $("#n_email").val()) {
        			$(this).attr("class", "focus");
        			return false;
        		}
        	});

			if(chkSelected == false) {
				$(".list_email li : first").attr("class", "focus");
			}
        },

        set_NateEmail : function () {
       		$(".list_email").children().each(function(e){
   				if($(this).attr("class") == "first focus") {
    				$("#n_email").val($(this).text().replace("▼", ""));
        			return false;
    			} else if($(this).attr("class") == "focus") {
    				$("#n_email").val($(this).text());
         			return false;
    			}
    		});
        },

        move_NateEmail : function (direction) {
        	if(direction == "UP") {
        		$(".list_email").children().each(function(e){
        			if($(this).attr("class") == "first focus") {
        				$(this).attr("class", "first");

        				$(".list_email :nth-child(4)").attr("class", "focus");
            			return false;

        			} else if($(this).attr("class") == "focus") {
        				$(this).attr("class", "");

        				if(e == 1) {
        					$(".list_email :first").attr("class", "first focus");
        				} else {
                			$(this).prev().attr("class", "focus");
        				}
            			return false;
        			}
        		});

        	} else if(direction == "DOWN") {
        		$(".list_email").children().each(function(e){
        			if($(this).attr("class") == "first focus") {
        				$(this).attr("class", "first");
            			$(this).next().attr("class", "focus");
            			return false;

        			} else if($(this).attr("class") == "focus") {
        				$(this).attr("class", "");

        				if(e < 3) {
                			$(this).next().attr("class", "focus");
        				} else {
        					$(".list_email :first").attr("class", "first focus");
        				}
            			return false;
        			}
        		});
        	// mouse 이동
        	} else {
        		$(".list_email li").children().each(function(e){
        			if($(this).parent().attr("class").indexOf("focus") >= 0) {
        				$(this).parent().attr("class", $(this).parent().attr("class").replace(" focus", "").replace("focus", ""));
        				return false;
        			}
         		});

        		if($(direction).parent().attr("class") == "first") {
            		$(direction).parent().attr("class", $(direction).parent().attr("class") + " focus");
        		} else {
            		$(direction).parent().attr("class", $(direction).parent().attr("class") + "focus");
        		}
        	}
        },

        // 아이디, 패스워드에 커서가 focus 되어있을때 bg를 ready로 변경
        onInputFocus : function(id) {
        	if($("#" + id).val().length > 0 ) {
            	if($("#" + id).attr("class").indexOf(" ready") < 0) {
            		$("#" + id).attr("class", $("#" + id).attr("class").replace(" focus", "") + " ready");
            	}
        	}
        },

        onFocus : function() {
        	var _ctl = this, newCss = "";

    		skFn.debug.log('focus');

    		if(_ctl._get('focusId') == ""){
            	if(skTv.zone.getCurZone() == "NateLogin"){
    				if(skTv.zone.isShown("NateEmail")) {
    					skTv.zone.hide("NateEmail");
    				}

            		_ctl._set({focusId:'n_loginid'});
            	} else {
        			_ctl._set({focusId:'c_loginid'});
            	}

            // Gnb에서 이동한 경우 해당 zone의 title에 포커싱이 된다.
        	} else if(skTv.zone.getOldZone() == "Gnb") {
        		if(_ctl._get('focusId').indexOf("title") < 0) {
        			if(skTv.zone.getCurZone() == "NateLogin"){
                		_ctl._set({focusId:'n_title_nate'});
        			} else {
                		_ctl._set({focusId:'c_title_cyworld'});
        			}
        		}
    		}

        	_ctl.move("INIT");
        },

        onBlur : function() {
    		skFn.debug.log('blur');
    		var _ctl = this, newCss = "";

        	if(_ctl._get('focusId') != "" ){
            	newCss = $("#" + _ctl._get('focusId')).parent().attr("class").replace(" focus", "");
            	$("#" + _ctl._get('focusId')).parent().attr("class", newCss);
        	}
        },

        onHide : function() {
        	var _ctl = this;
        	_ctl._set({focusId:''});
        },
		/**
		 * isShowImeAc
		 *	2012-08-10 [18:23:35] @SoonyoungPark
		 * @function
		 * @param	{string}
		 * @return	{boolean}
		 */
		isShowImeAc : function(ch){
			var returnVal = false;
			var inputVal = '';
			var lastInputVal = '';
			var lastPrevVal = '';
			var inputValChatAt = '';
			var prevVal = '';
			prevVal = this._get('prevVal');

			if (typeof LGImeComponent === 'object'){
				inputVal = LGImeComponent.getInputVal();
			}

			console.log("prevVal: => "+prevVal);
			console.log("inputVal: => "+inputVal);

			if(typeof ch !== 'undefined'){
				//골뱅이가 들어왓을 때만,
				if (ch === '@'){
					if (typeof LGImeComponent === 'object'){
						if (inputVal.match(/@/g).length === 1 && inputVal.substr(inputVal.length-1, 1) === '@'){
							returnVal = true;
						}
					}
				}
			// 기획 요청: 뒷쪽에서 지워서 골뱅이를 노출 시켰을 경우 2012-09-06 오후 08:08 by jhm
			}else{
				if (typeof LGImeComponent === 'object'){
					if(prevVal && inputVal){
						if(inputVal.match(/@/g)){
							if(inputVal.match(/@/g).length === 1){
								lastInputVal = inputVal.charAt(inputVal.length-1);
								lastPrevVal = prevVal.charAt(prevVal.length-1);
								
								console.log("lastInputVal: => "+lastInputVal);
								console.log("lastPrevVal: => "+lastPrevVal);
								
								if(lastPrevVal != '@' && lastInputVal == '@'){
									returnVal = true;
								}
							}
						}
					}
				}
			}
			this._set({prevVal:inputVal});
			return returnVal;
		}
		/*
		isShowImeAc : function(ch){
			var returnVal = false;
			var inputVal = '';
			//골뱅이가 들어왓을 때만,
			if (ch === '@'){
				if (typeof LGImeComponent === 'object'){
					inputVal = LGImeComponent.getInputVal();
					if (inputVal.match(/@/g).length === 1 && inputVal.substr(inputVal.length-1, 1) === '@'){
						returnVal = true;
					}
				}
			}
			return returnVal;
		}
		*/
    }
});


function dump(arr,level) {
var dumped_text = "";
if(!level) level = 0;

//The padding given at the beginning of the line.
var level_padding = "";
for(var j=0;j<level+1;j++) level_padding += "    ";

if(typeof(arr) == 'object') { //Array/Hashes/Objects
 for(var item in arr) {
  var value = arr[item];

  if(typeof(value) == 'object') { //If it is an array,
   dumped_text += level_padding + "'" + item + "' ...\n";
   dumped_text += dump(value,level+1);
  } else {
   dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
  }
 }
} else { //Stings/Chars/Numbers etc.
 dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
}
return dumped_text;
}
