/*
 * html에서 사용하는 js와 css의 폴더명을 전달하는 js 
 * 
 * 
 * 압축파일과 압축전 파일을 
 * 
 */ 
var check_env = {
	hostName : window.document.location.hostname,
	
	port : window.document.location.port,

	folderName : '',

	setFolderName : function() {
		//  압축파일
		if(this.hostName.indexOf('nate.com') > -1){
			this.folderName = '_mini';
			
		}else if(this.hostName.indexOf('skcomms.co.kr') > -1 && this.port == "80"){
			this.folderName = '_mini';
			
		} else {
			// 압축전 파일 
			this.folderName = '_origin';
		}		
		
	} 
}

check_env.setFolderName();