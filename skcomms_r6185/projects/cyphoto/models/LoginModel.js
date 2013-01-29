/**
 *
 * LoginModel.js
 *
 * @_see http://wiki.skcomms.co.kr/display/TVAPPS/Login
 * 
 */
var LoginModelClass = defineClass({

	extend : BaseModelClass,
	name : 'LoginModelClass',
	construct : function(){
		this.superclass();
		this._init([
            'focusId',
            'focusMap',
			'loginId',
			'loginPw',
			'loginTab',
            'evalue',
            'nvalue',
			'chkIdSave',
			'chkPwSave',
			'oAuthToken',
			'oAuthTokenSecret'
		]);
		this._set({chkIdSave:0, chkPwSave:0});
	},

	methods : {
		setLoginId : function(loginId) {
			this._set({loginId:loginId});
		},

		setLoginTab : function(loginTab) {
			this._set({loginTab:loginTab});
		},

		setLoginPw : function(loginPw) {
			this._set({loginPw:loginPw});
		}
	}
});
