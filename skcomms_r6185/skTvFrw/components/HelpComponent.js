/**
 *
 * HelpComponent.js
 *
 * 
 *
 * @internal ************************* [ file info. start ] *********************************
 *
 * @category		
 * @package		
 * @author		sophia 
 * @filesource
 * @fileoverview

 * @_uses		
 * @_todo
 * @_tutorial		
 * @_version		
 * @_abstract
 * @_final			
 * @_internal
 * @_date
 * 
 * @internal ************************* [ file info. end ] *********************************
 */
/*
var HelpComponentClass = defineClass({

	extend : BaseComponentClass,

	name : 'HelpComponentClass',

	construct : function(_ctl){

		// 상위클래스에 체이닝
		this.superclass();
		
		this._init([
		    'helpbarFocusId',									//Focus된 helpBar id
		    'isFadeEffectUsing',								//helpBar Fade 효과 사용여부 (default : false)
		    'fadeTimeOutMilisec',								//helpBar Fade 효과 사용 시간
		    'fadeInCallback',									//helpBar FadeIn 시 실행할 콜백함수
		    'fadeOutCallback',									//helpBar FadeOut 시 실행할 콜백함수
		    'fadeTimeOutId'										//helpBar FadeIn 실행 Timeout Id
		]);
		
		this._set({helpbarFocusId:'', isFadeEffectUsing:false, fadeTimeOutMilisec:0, _cmp_fadeTimeOutId:null, helpBarFadeCallback:null});
	},

	methods : {
		// 페이지 로그 태그 세팅
		_show_PageLog : function() {
			if(skEnv.device.isTv) {
				// LG 에뮬레이터 또는 LG 테스트 셋탑인 경우 로그를 생성하지 않는다.
				if(skEnv.device.vendor == "lg" && skFn.string.trim(skEnv.device.modelId) == "GLOBAL-PLAT3") return;
			} else {
				//return;
			}			
			
			var curUrl 	=	document.URL.substring(document.URL).replace("http://", "");
			curUrl 		=	curUrl.substring(0, curUrl.lastIndexOf('.html')+5).toLowerCase();
			
			var curPage =	curUrl.substring(curUrl.lastIndexOf('/')+1, curUrl.indexOf('.html')).toLowerCase();

			var logUrl 	= 	"http://api.tvapp.nate.com/logs/?type=beacon";
			var pageId	=	skEnv.app.no + skEnv.device.no;

			switch (curPage) {
				case "index" :
					pageId	+=	"1001";
					break;
					
				case "login" :
					pageId	+=	"1002";
					break;
					
				case "photo_list" :
					pageId	+=	"1003";
					break;
					
				case "photo_detail" :
					pageId	+=	"1004";
					break;
					
				case "photo_slide" :
					pageId	+=	"1005";
					break;

				case "pado_list" :
					pageId	+=	"1006";
					break;
					
				case "people_list" :
					pageId	+=	"1007";
					break;
					
				case "blog_photo_list" :
					pageId	+=	"1008";
					break;
					
				case "setup" :
					pageId	+=	"1009";
					break;
			}
			
			logUrl += "&page_id="+ pageId;
			logUrl += "&login_id="+ skFn.user.getUserId();
			logUrl += "&device_vendor=" + skEnv.device.vendor;
			logUrl += "&return_code=0";
			logUrl += "&remote_addr=";
			logUrl += "&device_name=" + skEnv.device.modelName;
			logUrl += "&device_id=" + skEnv.device.modelId;
//			$("body").append('<a href="#" style="position:absolute; top:0px; left:0px; z-index:1;"><img src="' + logUrl + '" width="1" height="1"></a>');
			
			// 전사 통계 PV 스크립트
			//$("body").append('<img src="http://stat.nate.com/stat/stat.tiff?cp_url=[' + curUrl + '??ndru=c0c26c2365a5e2b4&ndrl=&ndrp=]" width=0 height=0 border=0 >');
			$("body").append('<img src="http://stat.nate.com/stat/stat.tiff?cp_url=[www_nbr.nate.com/test/test/??ndru=c0c26c2365a5e2b4&ndrl=&ndrp=]" width=0 height=0 border=0 >');
			
		},
		
		
		// fadein, out 효과를 사용할 페이지에서 show 이전에 세팅한다. 
		set_fadeInfo : function(fadeMilisec, inCallback, outCallback) {
			var _cmp =	this;

			_cmp._set({isFadeEffectUsing:true, fadeTimeOutMilisec:fadeMilisec, fadeInCallback:inCallback, fadeOutCallback:outCallback});
		},
		
		
		// fade 효과로 show (반드시 init_fade로 세팅 후 사용함. sophia 4.28)
		showWithfade : function(){
			var _cmp 					=	this;
			var _cmp_fadeTimeOutId 		= 	_cmp._get("fadeTimeOutId");
			var _cmp_fadeInCallback		= 	_cmp._get("fadeInCallback");
			var _cmp_fadeOutCallback	= 	_cmp._get("fadeOutCallback");

			if(_cmp._get("isFadeEffectUsing") == false) return;
			
			$("#SceneHelpbar").css("visibility", "visible");

			if(_cmp_fadeTimeOutId){
				clearTimeout(_cmp_fadeTimeOutId);
				this._set({_cmp_fadeTimeOutId : null});
			}

			_cmp_fadeTimeOutId = setTimeout(function(){
											$("#SceneHelpbar").css("visibility", "hidden");
											 if(_cmp_fadeInCallback != "") _cmp_fadeInCallback();
											}, 
											this._get("fadeTimeOutMilisec")
								);

			_cmp._set({fadeTimeOutId : _cmp_fadeTimeOutId});

			 if(_cmp_fadeOutCallback != "") _cmp_fadeOutCallback();
			
		},
		
		
		// MenuInfo 정보로 HelpBar를 구성하고, Dom에 HelpBar Zone을 추가한다. (zoneStyle은 optional) 
		show : function(arrMenuInfo, zoneStyle) {
			var _ctl =	this;
			var strHelpbarMenu="", menuLen, basicClassName, overClassName;

			// css 정의
			var HelpbarCss =	"#SceneHelpbar {position:absolute; left:0; top:627px; z-index:4; overflow:hidden; width:1280px; height:93px;}" +
								".helpbar {width:1216px; height:93px; padding:0 32px 0 32px; color:#fff; font-size:25px; background:transparent url(../image/bg/bg_helpbar.png) no-repeat left top;}" +
								".helpbar .user_name {float:left; overflow:hidden; width:360px; padding:31px 0 0 0; color:#a0dae8; text-overflow: ellipsis; white-space : nowrap;} " +
								".helpbar .list_icon {float:right;}" +
								".helpbar .list_icon li {float:left;}" +
								".helpbar .list_icon li img {vertical-align:middle;}" +
								".helpbar .list_icon li .text_icon {vertical-align:middle;}" +
								".helpbar .list_icon li .key2 {width:88px; padding:31px 36px;}" +
								".helpbar .list_icon li .key3 {width:109px; padding:31px 36px;}" +
								".helpbar .list_icon li .key4 {width:128px; padding:31px 36px;}" +
								".helpbar .list_icon li .key5 {width:150px; padding:31px 36px;}" +
								".helpbar .list_icon li .focus2 {background:transparent url(../image/bg/bg_key2_focus.png) no-repeat left top;}" +
								".helpbar .list_icon li .focus3 {background:transparent url(../image/bg/bg_key3_focus.png) no-repeat left top;}" +
								".helpbar .list_icon li .focus4 {background:transparent url(../image/bg/bg_key4_focus.png) no-repeat left top;}" +
								".helpbar .list_icon li .focus5 {background:transparent url(../image/bg/bg_key5_focus.png) no-repeat left top;}" ;
			
			// css를 dom 구조에 추가
			var helpbarZoneCss = skFn.dom.addCss(HelpbarCss);

			// 올바로 dom 구조에 붙었다면
			if (helpbarZoneCss) {
				for(var i = 0; i < arrMenuInfo.length; i++) {
					menuLen = arrMenuInfo[i].name.length;
					basicClassName	=	"key" + menuLen; 
					overClassName	=	"key" + menuLen + " focus" + menuLen;

					strHelpbarMenu	+=	"						<li><div class='" + basicClassName +"' id='helpbar_menu" + i + "'";
					//strHelpbarMenu	+=	" onmouseover='skTv.util.changeClass(this, \"" + overClassName + "\");'";
					//strHelpbarMenu	+=	" onmouseout='skTv.util.changeClass(this, \"" + basicClassName + "\");'";
					
					if(typeof arrMenuInfo[i].action != "undefined") {
						strHelpbarMenu	+=	" onclick='" + arrMenuInfo[i].action + "'";
					}
					
					strHelpbarMenu	+=	">";
					strHelpbarMenu	+=	"<img src='../image/icon/" + arrMenuInfo[i].icon +".png' alt='' class='img_icon' />";
					strHelpbarMenu	+=	"<span class='text_icon'>" + arrMenuInfo[i].name + "</span>";
					strHelpbarMenu	+=	"</div></li>";
				}

*/				
				/*
				// 나가기 메뉴
				basicClassName	=	"key3"; 
				overClassName	=	"key3 focus3";

				strHelpbarMenu	+=	"						<li><div class='" + basicClassName +"' id='helpbar_menu" + i + "' onclick='navigation.gotoExit();'>";
				//strHelpbarMenu	+=	" onmouseover='skTv.util.changeClass(this, \"" + overClassName + "\");'";
				//strHelpbarMenu	+=	" onmouseout='skTv.util.changeClass(this, \"" + basicClassName + "\");'";
				
				strHelpbarMenu	+=	"<img src='../image/icon/icon_help6.png' alt='' class='img_icon' />";
				strHelpbarMenu	+=	"<span class='text_icon'>나가기</span>";
				strHelpbarMenu	+=	"</div></li>";
			*/
/*				
				$("#SceneHelpbar .list_icon > li > div").live("mouseover", function(event){
					var _cmp_helpbarFocusId	=	this.id;
					var _cmp_basicClassName	=	$(this).attr("class");
					if(_cmp_basicClassName.indexOf(" ") > 0) return;
					
					_cmp_basicClassName	=	_cmp_basicClassName + " focus" + _cmp_basicClassName.substring(_cmp_basicClassName.length-1, _cmp_basicClassName.length);
					
					HelpComponent._set({helpbarFocusId:_cmp_helpbarFocusId});
					skTv.util.changeClass(this , _cmp_basicClassName);
				});
				
				
				$("#SceneHelpbar .list_icon > li > div").live("mouseout", function(event){
					var _cmp_helpbarFocusId	=	this.id;
					var _cmp_basicClassName	=	$(this).attr("class");
					if(_cmp_basicClassName.indexOf(" ") < 0) return;

					_cmp_basicClassName	=	_cmp_basicClassName.substring(0, _cmp_basicClassName.indexOf(" "));
					
					HelpComponent._set({helpbarFocusId:_cmp_helpbarFocusId});
					skTv.util.changeClass(this , _cmp_basicClassName);
				});

				
				var HelpbarZoneDefine	= 	"	<div class='helpbar'>";
					if(document.URL.indexOf("login.html") < 0){
						HelpbarZoneDefine	+= 	"		<div class='user_name'>" + decodeURIComponent(skFn.user.getUserName()) + "</div>";
					}
					HelpbarZoneDefine	+= 	"			<ul class='list_icon'>"+
														strHelpbarMenu +
											"			</ul>"+
											"		</div>"+
											"	</div>";
	
				// zone DIV 를 dom 구조에 추가
				var HelpbarZoneDiv = skFn.dom.makeDiv ({
					sID : 'SceneHelpbar',
					sStyle : '',
					ePosWin : window,
					ePosRef : document.body,
					sPosRef : 'Inside',
					bAppend : true ,
					sContent : HelpbarZoneDefine
				});
				
				
				
				// fade 효과를 사용하는 경우 Helpbar 노출 후 FadeOut(sophia 4.28)
				if(_ctl._get("isFadeEffectUsing") == true) {
					HelpComponent.showWithfade();
					
					$(document).bind("mousemove", function(event){
						HelpComponent.showWithfade();
					});					
				}
				
				// document에 keydown 이벤트를 catch하여, helpbar에 포커스 클래스가 적용된 경우 키 이벤트가 호출되면 클래스를 포커스 되지 않게 변경한다.
				$(document).keydown(function(event){
					if(typeof HelpComponent != "undefined") {
						if(HelpComponent._get("helpbarFocusId") != ""){							
							$("#" + HelpComponent._get("helpbarFocusId")).mouseout();
							HelpComponent._set({isHelpbarFocus:''});
						}
						
						// fade 효과를 사용하는 경우 (sophia 4.28)
						if(_ctl._get("isFadeEffectUsing") == true) {
							HelpComponent.showWithfade();
						}
					}
				})
				
				// 해당 페이지의 로그 태그 세팅
				_ctl._show_PageLog();
			}
		}, 
		
*/		
		/*
		 *  메뉴 정보를 변경한다.
		 *  사용법 : changeShow({menuid:'1', icon:'icon_help4',name:'폴더선택2', action:'skTv.zone.focus(\"Folder\");skTv.zone.show(\"Folder\");'})
		*/
/*
		changeShow : function(strMenuInfo) {
			var menuLen, basicClassName, overClassName, strInfo;

			menuLen = strMenuInfo.name.length;

			basicClassName	=	"key" + menuLen; 
			overClassName	=	"key" + menuLen + " focus" + menuLen;

			strInfo	=	"						<div class='" + basicClassName +"' id='helpbar_menu" + strMenuInfo.menuid + "'";
			//strInfo	+=	" onmouseover='skTv.util.changeClass(this, \"" + overClassName + "\");'";
			//strInfo	+=	" onmouseout='skTv.util.changeClass(this, \"" + basicClassName + "\");'";

			if(typeof strMenuInfo.action != "undefined") {
				strInfo	+=	" onclick='" + strMenuInfo.action.replace('"', '\"') + "'";
			}
			
			strInfo	+=	">";
			strInfo	+=	"<img src='../image/icon/" + strMenuInfo.icon +".png' alt='' class='img_icon' />";
			strInfo	+=	"<span class='text_icon'>" + strMenuInfo.name + "</span>";
			strInfo	+=	"</div>";

			$(".list_icon :nth-child(" + (parseInt(strMenuInfo.menuid)+1) + ") :first").replaceWith(strInfo);
			
			
			// mouseover, mouseout 이벤트를 live한다.
			$("#helpbar_menu" + strMenuInfo.menuid).live("mouseover", function(event){
				skTv.util.changeClass(this , overClassName);
			});
			
			$("#helpbar_menu" + strMenuInfo.menuid).live("mouseout", function(event){
				skTv.util.changeClass(this , basicClassName);
			});
			
		}
	}
});

var HelpComponent = new HelpComponentClass();
*/