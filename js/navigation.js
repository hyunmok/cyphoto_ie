/**
 *
 * Page Navigation 정의
 *
 * navigation.gotoPhotoList();
**/
var navigation = {
	// 이전
	gotoBack : function(){
		history.back();
	},

	// AppManager 이동
	gotoAppManage: function(){
		if(skEnv.device.inputDevice != 'keyboard') {
			if(skEnv.device.vendor == 'lg') {
				//프리미엄 화면으로 돌아갈 수 있도록 분기처리 2011년 11월 15일 화요일 오후 9:51:44
				//@Soonyoung Park
				if(skFn.user.isPremium() == true){
					document.location.href =skFn.user.getPremiumUrl();
				}else{
					window.NetCastBack();
				}
			}
		} else {
			history.back();
		}
	},

	// 나가기(프로그램 종료)
	gotoExit : function(){
		if(skEnv.device.inputDevice != 'keyboard') {
			if(skEnv.device.vendor == 'lg') {
				window.NetCastExit();
			}
		} else {
			self.location.href = 'index.html';
		}
	},

	// 사진첩 리스트 이동 (targetId만 전달해도 됨)
	gotoPhotoList : function(targetId, folderNo, folderName, itemNo){
		var moveUrl = "photo_list.html?targetId="
		if(typeof targetId == "undefined") {
			if(skFn.user.isLoggedIn()){
				moveUrl = moveUrl + skFn.user.getUserTid();
				
			} else {
				navigation.gotoLogin('gotoPhotoList');
				return;
			}
			
		} else {
			moveUrl = moveUrl + targetId;
		}
		
		if(typeof itemNo != "undefined") moveUrl = moveUrl + "&itemNo=" + itemNo; 
		if(typeof folderNo != "undefined") moveUrl = moveUrl + "&folderNo=" + folderNo; 
		if(typeof folderName != "undefined") moveUrl = moveUrl + "&folderName=" + folderName; 

		var curUrl =	document.URL.substring(document.URL.lastIndexOf('/')+1, document.URL.indexOf('.html')).toLowerCase();
		
		// 상세보기의 댓글 리스트에서 사진첩으로 이동할 때 Gnb (본인이면 내 사진첩, other 파도타기)
		if(curUrl == "photo_detail") {
			if(skFn.user.isLoggedIn() && skFn.user.getUserTid() == targetId){
				skFn.cookie.set('f', 'photo_list');
			} else {
				
				// 댓글에서 사진첩으로 이동하는 경우 
				if(typeof itemNo == "undefined" && typeof folderNo == "undefined" &&typeof folderName == "undefined") {
					skFn.cookie.set('f', 'pado_list');
				} else {
					if(skFn.cookie.get('f') == 'people_list') {
						skFn.cookie.set('f', 'people_list');				
					} else {
						skFn.cookie.set('f', 'pado_list');
					}
				}
			}

		// 피플 or 파도타기의 Gnb는 이전 Gnb를 적용한다.
		} else if(!(curUrl == "people_list" || curUrl == "pado_list")) {
			skFn.cookie.set('f', 'photo_list');
		}
		
		window.location.href = moveUrl;
	},
	
	// 사진첩 슬라이드 페이지 이동 
	//memory leak 문제로 수정(5/31 by sophia)
	//(blog_photo_list.html -> photo_slide.html 진입 시 themeId 를 folderNo 로 넘겨줌)
	//gotoPhotoSlide : function(targetId, folderNo, folderName, itemNo, isValid){
	gotoPhotoSlide : function(targetId, folderNo, folderName, itemNo, isValid, itemCount, referrer){
		if(isValid == false){
			return false;	
		}else{
			//var dummy = new Date();
			if(typeof itemCount == "undefined") itemCount = 1;			
			if(typeof referrer == "undefined") {
				referrer = encodeURIComponent(document.URL.substring(0, document.URL.indexOf("?")));
			}
			
			//window.location.href = "photo_slide.html?targetId="+targetId+"&itemNo="+itemNo+"&folderNo="+folderNo+"&folderName="+folderName+"&dummy="+dummy;
			//window.location.href = "photo_slide.html?targetId="+targetId+"&itemNo="+itemNo+"&folderNo="+folderNo+"&folderName="+folderName+"&itemCount=" +  itemCount + "&referrer=" + referrer + "&dummy="+dummy.getTime();
			window.location.href = "photo_slide.html?targetId="+targetId+"&itemNo="+itemNo+"&folderNo="+folderNo+"&folderName="+folderName+"&itemCount=" +  itemCount + "&referrer=" + referrer;
		}
		
	},
	

	// 사진첩 슬라이드 null 페이지 이동 
	//memory leak 문제로 수정(5/31 by sophia)
	//(blog_photo_list.html -> photo_slide.html 진입 시 themeId 를 folderNo 로 넘겨줌)
	//gotoPhotoSlide : function(targetId, folderNo, folderName, itemNo, isValid){
	gotoPhotoSlide_null : function(targetId, folderNo, folderName, itemNo, isValid, itemCount, referrer){
		if(isValid == false){
			return false;	
		}else{
			if(typeof itemCount == "undefined") itemCount = 1;			
			if(typeof referrer == "undefined") {
				referrer = encodeURIComponent(document.URL.substring(0, document.URL.indexOf("?")));
			}
			//referrer = encodeURIComponent(referrer)
			//window.location.href = "photo_slide.html?targetId="+targetId+"&itemNo="+itemNo+"&folderNo="+folderNo+"&folderName="+folderName+"&dummy="+dummy;
			//window.location.href = "photo_slide.html?targetId="+targetId+"&itemNo="+itemNo+"&folderNo="+folderNo+"&folderName="+folderName+"&itemCount=" +  itemCount + "&referrer=" + referrer + "&dummy="+dummy.getTime();
			window.location.href = "photo_slide_null.html?targetId="+targetId+"&itemNo="+itemNo+"&folderNo="+folderNo+"&folderName="+folderName+"&itemCount=" +  itemCount + "&referrer=" + referrer;
		}
		
	},
	
	// 파도타기 리스트
	gotoPadoList : function(){
		skFn.cookie.set('f', 'pado_list');

		if(skFn.user.isLoggedIn()){
			document.location.href	=	"pado_list.html";
		} else {
			navigation.gotoLogin('gotoPadoList');
		}
	},
	
	// 피플 리스트
	gotoPeopleList : function(){
		skFn.cookie.set('f', 'people_list');
		document.location.href	=	"people_list.html";
	},

	// 포토 리스트
	gotoBlogPhotoList : function(){
		skFn.cookie.set('f', 'blog_photo_list');
		document.location.href	=	"blog_photo_list.html";
	},
	
	// 설정
	gotoSetup : function(){
		skFn.cookie.set('f', 'setup');

		if(skFn.user.isLoggedIn()){
			document.location.href	=	"setup.html";
		} else {
			navigation.gotoLogin('gotoSetup');
		}
	},

	// 로그인 (moveUrl 값이 있으면 로그인 후 rtnUrl로 이동)
	gotoLogin : function(naviFunc){
		var moveUrl = "login.html"

		if(typeof naviFunc != "undefined") {
			moveUrl = moveUrl + "?movef=" + naviFunc;
		}
		
		window.location.href = moveUrl;
	}
}

