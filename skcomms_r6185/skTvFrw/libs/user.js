if(typeof window == 'undefined'){
	if(typeof skFn == 'undefined'){
		skFn = {};
	}
}
else if(typeof window.skFn == 'undefined'){
	window.skFn = {};
}

skFn.user = {

    id      : '',
    passwd  : '',
    tp      : '',
    nick    : '',
    name    : '',
    sso     : '',
    cmn     : '',
    cookie  : '',

    saveSession : function(userid, tp, token) {
        var cookie = 'id=' + userid + '&' + 'tp=' + tp + '&' + token;
        return skFn.cookie.set('l', cookie, {
            expires: '',
            domain: '',
            path: '/'
        }); 
    },

    clearSession : function () {
		return;
    },

    savePasswd : function(userid, passwd, tp, token) {
        var cookie = '';
		var isExist = false;
        ucookie = skFn.cookie.get('u');
        if(ucookie && ucookie.length > 0) {
            lines = ucookie.split('^');
            for (var i = 0; i < lines.length; i++) {
                pairs = lines[i].split('&');
                for (var j = 0; j < pairs.length; j++) {
                    values = pairs[j].split('=');
					if(values[0] == "id" && values[1] == userid) {
						lines[i] = 'id=' + userid + '&passwd=' + passwd + '&tp=' + tp + '&' + token;
						isExist = true;
					}
                }
			}
			if(!isExist) {
                lines[lines.length] = 'id=' + userid + '&passwd=' + passwd + '&tp=' + tp + '&' + token;
			}
            for(var i = 0; i < lines.length; i++) {
				cookie = cookie + lines[i] + '^'; 
			}
			cookie = cookie.substr(0, cookie.length - 1);
		}
		else {
			cookie = 'id=' + userid + '&passwd=' + passwd + '&tp=' + tp + '&' + token;
		}

        skFn.cookie.set('u', cookie, {
            expires: 90,
            domain: '',
            path: '/'
        }); 
    },

    removePasswd : function(userid, tp) {
        var cookie = '';
        ucookie = skFn.cookie.get('u');
        if(ucookie && ucookie.length > 1) {
            lines = ucookie.split('^');
            for (var i = 0; i < lines.length; i++) {
                pairs = lines[i].split('&');
                for (var j = 0; j < pairs.length; j++) {
                    values = pairs[j].split('=');
					if(values[0] == "id" && values[1] == userid) {
						lines[i] = '';
					}
                }
			}
            for (var i = 0; i < lines.length; i++) {
				if(lines[i].length > 1) {
					cookie = cookie + lines[i] + '^'; 
				}
			}
			cookie = cookie.substr(0, cookie.length - 1);
		}
		else {
			cookie = '';
		}

        skFn.cookie.set('u', cookie, {
            expires: 90,
            domain: '',
            path: '/'
        }); 
    },

    getCookie : function(name, cookiename, isEscaped) {
		if (cookiename == "" || cookiename == undefined ) cookiename = "l";
        cookie = skFn.cookie.get(cookiename, isEscaped);
		/*if(cookiename == 'p' && name == 'oauth_token'){
			//alert(cookie);
		}*/
//		//alert(name+"\n\nskFn.user.getCookie = \n" + cookie);		
		
        if(cookie) {
			
//			cookie = cookie.substring(cookiename.length+1);
			//alert("test2\n\nif("+cookie+") - " +cookiename + " cookie\n\n"+document.cookie);
            pairs = cookie.split('&');
            for (var i = 0; i < pairs.length; i++) {
                values = pairs[i].split('=');
//				//alert("skFn.user.getCookie ==> Pairs["+i+"]\n"+cookiename+"="+name+"\n\n"+values[0]+"="+values[1]);
				if(cookiename == 'p' && name == 'oauth_token'){
//					//alert("name="+name+"\n\n"+values[0]+"=" +values[1]);
				}
                if(values[0] == name) {
					//alert(name+"\n\nskFn.user.getCookie("+name+", "+cookiename+") returns\n" +values[0] + " ==> "+values[1]+"\n\n"+document.cookie);		
					return values[1];
				}
            }
        }else{
			//alert("if(!"+cookie+") - "+cookiename+ " cookie");
		}
		//alert(name+"\n\nskFn.user.getCookie("+name+", "+cookiename+") returns\nnothing"+"\n\n"+document.cookie);		
        return '';
    },

    isLoggedIn  : function() {
        var cookie = this.getCookie('oauth_token', 'l');	
        if(cookie.length > 0) {
            return true;
        }
        return false;
    },

    checkLoggedIn : function(url) {
        var cookie = this.getCookie('oauth_token', 'l');
        if(cookie.length > 0) {
            return true;
        }
        else {
            if(url.length > 0) {
                document.location.href = url;
            }
            else {
                document.location.href = "login.html";
            }
        }
    },

    getAccessToken : function() {
        return this.getCookie('oauth_token', 'l');
    },

    getAccessTokenSecret : function() {
        return this.getCookie('oauth_token_secret', 'l');
    },

    getUserId : function() {
        return this.getCookie('id', 'u');
    },

    getUserTid : function() {
        return this.getCookie('tid', 'u');
    },

    getUserName : function() {
        return this.getCookie('CustNM', 'l');
    },

    getUserNick : function() {
        return this.getCookie('CustNM', 'l');
    },
    
    getUserTp : function() {
        return this.getCookie('tp', 'u');
    },

    isTownHompy : function() {
        return this.getCookie('photomenu', 'u');
    },

    isPhotoMenuOpen : function() {
        return this.getCookie('istown', 'u');
    },
	isPremium : function(){
		//i cookie : incoming path cookie (isPremium);
		// 2011년 11월 15일 화요일 @Soonyoung Park
		if(this.getCookie('isPremium',  'i', true) == 'true'){
			return true;
		}else{
			return false;
		}
	},
	getPremiumUrl : function(){
		//i cookie : incoming path cookie (isPremium);
		// 2011년 11월 15일 화요일 @Soonyoung Park
		return decodeURIComponent(this.getCookie('url',  'i'));
	},
    isPrivacyOpen : function() {
        var userid = this.getUserId();
        var cookie = skFn.cookie.get('c');
        var toggle = false;

        if(cookie && cookie.length > 0) {
            lines = cookie.split('^');
            for (var i = 0; i < lines.length; i++) {
                if(lines[i] == 'id=' + userid + '&privacy=close') return false;
            }
        }
        return true;
    },

    updatePrivacy : function(privacy) {
		var cookie = '';
        var ccookie = skFn.cookie.get('c');
        var userid = this.getUserId();
        var isExist = false;
        if(ccookie && ccookie.length > 0) {
            lines = ccookie.split('^');
            for (var i = 0; i < lines.length; i++) {
                pairs = lines[i].split('&');
                for (var j = 0; j < pairs.length; j++) {
                    values = pairs[j].split('=');
                    if(values[0] == "id" && values[1] == userid) {
                        lines[i] = 'id=' + userid + '&privacy=' + privacy;
                        isExist = true;
                    }
                }
            }
            if(!isExist) {
                lines[lines.length] = 'id=' + userid + '&privacy=' + privacy;
            }
            for(var i = 0; i < lines.length; i++) {
                cookie = cookie + lines[i] + '^';
            }
            cookie = cookie.substr(0, cookie.length - 1);
        }
        else {
            cookie = 'id=' + userid + '&privacy=' + privacy;
        }

        skFn.cookie.set('c', cookie, {
            expires: 900,
            domain: '',
            path: '/'
        });
    },
}
