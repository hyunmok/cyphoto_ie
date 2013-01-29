/**
 *
 * UserModel.js
 *
 * @_see http://wiki.skcomms.co.kr/display/TVAPPS/Login
 * 
 */
var UserModelClass = defineClass({

	extend : BaseModelClass,
	name : 'UserModelClass',
	construct : function(){
		this.superclass();
		this._init([
			'loginId',
			'loginTab',
			'userNick',
			'userName',
			'userCMN',
			'userSSO',
			'userTid',
			'userPhotoMenu',
			'userMainHome',
			'isTown'
		]);
	},

	methods : {
	}
});
