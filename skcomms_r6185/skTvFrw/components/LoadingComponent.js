document.write("<link rel='stylesheet' type='text/css' href='../css/Loading.css' />"); 

var LoadingComponent = {
	delay : 3000,												//로딩 이미지가 나오기 전 까지 대기시간(milisec)
	timeOut : null,											//타임아웃 변수
	isLoadingImg : true,
	init : function(){
		var LoadingDefine = '<img src="../image/img/img_loading.gif" alt="" />'; 
		skFn.dom.makeDiv ({
			sID : 'SceneLoading',
//			sStyle : 'display:none',
			sStyle : 'visibility:hidden',
			ePosWin : window,
			ePosRef : document.body,
			sPosRef : 'Inside',
			bAppend : true ,
			sContent : LoadingDefine
		}) ;
	},
	lock : function(paramIsLoadingImg, paramDelayTime){
		var delayTime = (typeof( window[paramDelayTime] ) != "undefined") ? paramDelayTime : LoadingComponent.delay;
		var isLoadingImg = (typeof( window[paramIsLoadingImg] ) != "undefined") ? paramIsLoadingImg : LoadingComponent.isLoadingImg;
		skTv.zone.lock(true, function(){			
			if(isLoadingImg == true){
				LoadingComponent.timeOut = setTimeout(function(){
					$("#SceneLoading").css("visibility", "visible");
				}, delayTime);
			}
		});
	},
	unlock : function(){
		skTv.zone.lock(false, function(){
			clearTimeout(LoadingComponent.timeOut);
			$("#SceneLoading").css("visibility", "hidden");
		});
	},
	//락 이후 방글이가 나오기 까지의 시간 설정. (기본 3.0 초)
	setLoadingImgTimer : function(delayTime){
		LoadingComponent.delay = delayTime;
		return false;
	},
	//방글이 나오는 여부에 대한 설정(기본 true)
	setIsLoadingImg : function(isLoadingImg){
		LoadingComponent.isLoadingImg = isLoadingImg;
		return false;
	}
};


