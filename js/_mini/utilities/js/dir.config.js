var dir = {
	workingDir : '/home/n3218/work/',
//	jadeDir : '/home/n3218/work/jade_framework/releases/jade_1.0.1/',
	
	//appDir : '/home/n3218/work/smart_tv/trunk/',
	
	//minDir : '/home/n3218/work/smart_tv/trunk/lg/cyphoto/js/_mini/',
	jadeDir : '../../../',
	appDir : '../../../../../',	
	minDir : '../',
	replace : function(scriptJsonStr){
		var appDir = this.getAppDir();
		appDir = appDir.replace(/ /gi, '');
		var jadeDir = this.getJadeDir();
		jadeDir = jadeDir.replace(/ /gi, '');
		scriptJsonStr = scriptJsonStr.replace(/\$APP_DIR\//gi, appDir).replace(/\$JADE_DIR\//gi, jadeDir);
		return scriptJsonStr;
	},
	setWorkingDir : function(dir){
		this.workingDir = dir;
	},
	setJadeDir : function(dir){
		this.jadeDir = dir;
	},
	setAppDir : function(dir){
		this.appDir = dir;
	},
	setMinDir : function(dir){
		this.minDir = dir;
	},
	getWorkingDir : function(){
		return dir.workingDir.replace(/^\s*/, "").replace(/\s*$/, "");
	},
	getMinDir : function(){
		return dir.minDir.replace(/^\s*/, "").replace(/\s*$/, "");
	},
	getAppDir : function(){
		return dir.appDir.replace(/^\s*/, "").replace(/\s*$/, "");
	},
	getJadeDir : function(){
		return dir.jadeDir.replace(/^\s*/, "").replace(/\s*$/, "");
	}
}