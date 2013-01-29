/**
 *
 * GnbComponent.js
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
var GnbComponentClass = defineClass({

	extend : BaseComponentClass,

	name : 'GnbComponentClass',

	construct : function(){

		// 상위클래스에 체이닝
		this.superclass();
		
		this._init([
		    'selectedGnbClass',
		    'currentFocus',
		    'returnZone',
		    'Fn_Key_RED',
		    'Fn_Key_GRREN',
		    'Fn_Key_YELLOW',
		    'Fn_Key_BLUE',
			'Fn_Key_RW',
			'Fn_Key_FF',
			'Fn_Key_RETURN'
		]);

	},

	methods : {
		// 메뉴별 이동 정의
		_gotoService : function(basicClass) {
        	switch (basicClass) {
	    		case "myphoto" :
	    			skFn.cookie.set('f', 'photo_list');	    			
	    			navigation.gotoPhotoList();
	    			break;
	    			
	    		case "pado" :
	    			navigation.gotoPadoList();
	    			break;
	    			
	    		case "people" :
	    			navigation.gotoPeopleList();
	    			break;
	
	    		case "photo" :
	    			navigation.gotoBlogPhotoList();
	    			break;
	
	    		case "setup" :
	    			navigation.gotoSetup();
	    			break;
	    	}
			
		},
		
		// 기능키 정의 ( keyCode  : skTv.keymap.RED, skTv.keymap.GREEN, skTv.keymap.YELLOW, skTv.keymap.BLUE)
		setFunctionKey : function(keyCode, fnCallback) {
			var _cmp = this;
			switch (keyCode) {
				case "skTv.keymap.RED" :
					_cmp._set({Fn_Key_RED:fnCallback});
					break;
				case "skTv.keymap.GREEN" :
					_cmp._set({Fn_Key_GRREN:fnCallback});
					break;
				case "skTv.keymap.YELLOW" :
					_cmp._set({Fn_Key_YELLOW:fnCallback});
					break;
				case "skTv.keymap.BLUE" :
					_cmp._set({Fn_Key_BLUE:fnCallback});
					break;
				case "skTv.keymap.RW" :
					_cmp._set({Fn_Key_RW:fnCallback});
					break;
				case "skTv.keymap.FF" :
					_cmp._set({Fn_Key_FF:fnCallback});
					break;
				case "skTv.keymap.RETURN" :
					_cmp._set({Fn_Key_RETURN:fnCallback});
					break;
			}
		},
		
		
		// Gnb에서 다운키 클릭시 이동할 zone 정의
		setReturnZone : function(zoneId) {
			var _cmp = this;
			_cmp._set({returnZone:zoneId});
		},
		
		
		// Gnb Select된 메뉴로 이동 (myphoto, pado, people, photo, setup)
		getSelectedGnbMenu : function() {
			var _cmp = this;
			var strFnReturn;
			
        	return _cmp._get("selectedGnbClass")
		},

		// MenuInfo 정보로 HelpBar를 구성하고, Dom에 HelpBar Zone을 추가한다. 
		show : function(curComponent) {
			var strGnbZoneDefine;
			var _cmp = this;
			if(skEnv.device.vendor == "lgcns") {
				// css 정의
				var GnbCss =	"#SceneGnb {position:absolute; left:0; top:0; z-index:4; overflow:hidden;width:1200px; height:100px;}" +
								".gnb .logo {float:left;width:153px; height:70px; margin:0 38px 0 87px;background:url('../image/icon/icon_logo.png') no-repeat left top;}"+
								".gnb .list_gnb {float:left;width:900px; height:100px; }"+
								".gnb .list_gnb li {float:left;width:176px; height:100px;text-indent:-2000px;}"+
								".gnb .list_gnb li.myphoto {background-image:url(../image/bg/bg_gnb_list0.png); background-repeat:no-repeat;}"+
								".gnb .list_gnb li.pado {background-image:url(../image/bg/bg_gnb_list1.png); background-repeat:no-repeat;}"+
								".gnb .list_gnb li.people {background-image:url(../image/bg/bg_gnb_list2.png); background-repeat:no-repeat;}"+
								".gnb .list_gnb li.photo {background-image:url(../image/bg/bg_gnb_list3.png); background-repeat:no-repeat;}" +
								".gnb .list_gnb li.setup {background-image:url(../image/bg/bg_gnb_list4.png); background-repeat:no-repeat;}" +
								".gnb .list_gnb li.basic{background-position:0 0;}" +
								".gnb .list_gnb li.focus {background-position:0 -100px;}" +
								".gnb .list_gnb li.select {background-position:0 -200px;}";
			}
			else {
				// css 정의
				var GnbCss =	"#SceneGnb {position:absolute; left:0; top:0; z-index:4; overflow:hidden;width:1100px; height:100px;}" +
								".gnb .logo {float:left;width:148px; height:32px; margin:32px 40px 0 32px;background:url('../image/icon/icon_logo.png') no-repeat left top;}"+
								".gnb .list_gnb {float:left;width:880px; height:100px; }"+
								".gnb .list_gnb li {float:left;width:176px; height:100px;text-indent:-2000px;}"+
								".gnb .list_gnb li.myphoto {background-image:url(../image/bg/bg_gnb_list0.png); background-repeat:no-repeat;}"+
								".gnb .list_gnb li.pado {background-image:url(../image/bg/bg_gnb_list1.png); background-repeat:no-repeat;}"+
								".gnb .list_gnb li.people {background-image:url(../image/bg/bg_gnb_list2.png); background-repeat:no-repeat;}"+
								".gnb .list_gnb li.photo {background-image:url(../image/bg/bg_gnb_list3.png); background-repeat:no-repeat;}" +
								".gnb .list_gnb li.setup {background-image:url(../image/bg/bg_gnb_list4.png); background-repeat:no-repeat;}" +
								".gnb .list_gnb li.basic{background-position:0 0;}" +
								".gnb .list_gnb li.focus {background-position:0 -100px;}" +
								".gnb .list_gnb li.select {background-position:0 -200px;}";
			}			
			
			// css를 dom 구조에 추가
			var GnbZoneCss = skFn.dom.addCss(GnbCss);

			// 올바로 dom 구조에 붙었다면
			if (GnbZoneCss) {
				var curUrl 	=	document.URL.substring(document.URL.lastIndexOf('/')+1, document.URL.indexOf('.html')).toLowerCase();
				var prevUrl = 	(skFn.cookie.get('f') == null) ? '' : skFn.cookie.get('f').toLowerCase(); 
				var myphoto =	{BclassName:'basic'}; 
				var pado 	= 	{BclassName:'basic'}; 
				var people 	= 	{BclassName:'basic'}; 
				var photo 	= 	{BclassName:'basic'}; 
				var setup 	= 	{BclassName:'basic'}; 

				switch (curUrl) {
					case 'pado_list' : 
						_cmp._set({selectedGnbClass:'pado'});
						pado.BclassName = "select";
						break;
						
					case 'people_list' : 
						_cmp._set({selectedGnbClass:'people'});
						people.BclassName = "select";
						break;
						
					case 'blog_photo_list' : 
						_cmp._set({selectedGnbClass:'photo'});
						photo.BclassName = "select";
						break;
						
					case 'setup' : 
						_cmp._set({selectedGnbClass:'setup'});
						setup.BclassName = "select";
						break;
						
					case 'login' : 
						switch (prevUrl) {
							case 'pado_list' : 
								_cmp._set({selectedGnbClass:'pado'});
								pado.BclassName = "select";
								break;
								
							case 'people_list' : 
								_cmp._set({selectedGnbClass:'people'});
								people.BclassName = "select";
								break;
								
							case 'blog_photo_list' : 
								_cmp._set({selectedGnbClass:'photo'});
								photo.BclassName = "select";
								break;
								
							case 'setup' : 
								_cmp._set({selectedGnbClass:'setup'});
								setup.BclassName = "select";
								break;
								
							default : 
								_cmp._set({selectedGnbClass:'myphoto'});
								myphoto.BclassName = "select";
								break;
						}
						break;
						
					default : 
						switch (prevUrl) {
							case 'people_list' : 
								_cmp._set({selectedGnbClass:'people'});
								people.BclassName = "select";
								break;
								
							case 'pado_list' : 
								_cmp._set({selectedGnbClass:'pado'});
								pado.BclassName = "select";
								break;
								
							default : 
								_cmp._set({selectedGnbClass:'myphoto'});
								myphoto.BclassName = "select";
								break;
						}
						break;
				}


				strGnbZoneDefine	=	"		<div class='gnb'>";
				strGnbZoneDefine	+=	"			<div class='logo'></div>";
				strGnbZoneDefine	+=	"			<ul class='list_gnb'>";
				strGnbZoneDefine	+=	"				<li class='myphoto "+ myphoto.BclassName +"'>내사진첩</li>";
				strGnbZoneDefine	+=	"				<li class='pado "+pado.BclassName+"'>파도타기</li>";
				strGnbZoneDefine	+=	"				<li class='people "+people.BclassName+"'>피플</li>";
				strGnbZoneDefine	+=	"				<li class='photo "+photo.BclassName+"'>포토</li>";
				strGnbZoneDefine	+=	"				<li class='setup "+setup.BclassName+"'>설정</li>";
				strGnbZoneDefine	+=	"			</ul>";
				strGnbZoneDefine	+=	"		</div>";
				
				if(skEnv.device.vendor == "lgcns") {
					// zone DIV 를 dom 구조에 추가
					var GnbZoneDiv = skFn.dom.makeDiv ({
						sID : 'SceneGnb',
						sStyle : 'visibility:hidden',
						ePosWin : window,
						ePosRef : document.body,
						sPosRef : 'Inside',
						bAppend : true ,
						sContent : strGnbZoneDefine
					}) ;					
				}
				else {
					// zone DIV 를 dom 구조에 추가
					var GnbZoneDiv = skFn.dom.makeDiv ({
						sID : 'SceneGnb',
						//박순영 수정 2011년 10월 27일 목요일 오후 2:23:23
						//sStyle : 'display:none',
						sStyle : 'visibility:hidden',
						ePosWin : window,
						ePosRef : document.body,
						sPosRef : 'Inside',
						bAppend : true ,
						sContent : strGnbZoneDefine
					}) ;
				}				

				// 올바로 dom 구조에 붙었다면
				if (GnbZoneDiv) {
					// Zone 핸들러 정의
					if(zone){
						skFn.debug.log('zone exists');
						zone['Gnb'] = {
							initialize : function(){},
							handleShow : function(){},
							handleHide : function(){},
							handleFocus : function(){
								var chkFocus = false;
								
								$(".list_gnb li").each(function(e){
									if($(this).attr("class").indexOf(" focus") > 0) {
										chkFocus = true;
										return false;
									}
								});
								
								if(!chkFocus) {
									$("." + curComponent._get('selectedGnbClass')).attr("class", curComponent._get('selectedGnbClass') + " focus");
								}
								
							},
							handleBlur : function(){
								$(".list_gnb li").each(function(e){
									if($(this).attr("class").indexOf(" focus") > 0) {
										var targetClass = $(this).attr("class").substring(0, $(this).attr("class").indexOf(" "));
										if(targetClass == curComponent._get('selectedGnbClass')) {
											$(this).attr("class", targetClass+" select");
										} else {
											$(this).attr("class", targetClass+" basic");
										}
										return false;
									}
								});
							},
							handleKeyDown : function(keyCode){
								switch (keyCode) {
									case skTv.keymap.RIGHT:
										$(".list_gnb li").each(function(e){
											if($(this).attr("class").indexOf(" focus") > 0) {
												var targetClass;
												targetClass = $(this).attr("class").substring(0, $(this).attr("class").indexOf(" "));
												if(targetClass == curComponent._get('selectedGnbClass')) {
													$(this).attr("class", targetClass+" select");
												} else {
													$(this).attr("class", targetClass+" basic");
												}
												
												if( e < $(".list_gnb li").size()-1) {
													targetClass = $(this).next().attr("class").substring(0, $(this).next().attr("class").indexOf(" "));
													$(this).next().attr("class", targetClass + " focus");
												} else {
													targetClass = $(".list_gnb :first-child").attr("class").substring(0, $(".list_gnb :first-child").attr("class").indexOf(" "));
													$(".list_gnb :first-child").attr("class", targetClass + " focus");
												}
												return false;
											}
										});
										break;
									case skTv.keymap.LEFT:
										$(".list_gnb li").each(function(e){
											if($(this).attr("class").indexOf(" focus") > 0) {
												var targetClass;
												targetClass = $(this).attr("class").substring(0, $(this).attr("class").indexOf(" "));
												if(targetClass == curComponent._get('selectedGnbClass')) {
													$(this).attr("class", targetClass+" select");
												} else {
													$(this).attr("class", targetClass+" basic");
												}
												
												if( e > 0) {
													targetClass = $(this).prev().attr("class").substring(0, $(this).prev().attr("class").indexOf(" "));
													$(this).prev().attr("class", targetClass + " focus");
												} else {
													targetClass = $(".list_gnb :last-child").attr("class").substring(0, $(".list_gnb :last-child").attr("class").indexOf(" "));
													$(".list_gnb :last-child").attr("class", targetClass + " focus");
												}
												return false;
											}
										});
										break;
									case skTv.keymap.DOWN:
										if(curComponent._get("returnZone") != "") {
											skTv.zone.focus(curComponent._get("returnZone"));
										} else {
											skTv.zone.focus(skTv.zone.getOldZone());
										}
										break;
										
									case skTv.keymap.ENTER:
										$(".list_gnb li").each(function(e){
											if($(this).attr("class").indexOf(" focus") > 0) {
												curComponent._gotoService($(this).attr("class").replace(" focus", ""));
												return false;
											}
										});
										break;
										
										
									// 페이지별 정의된 기능키 실행 
									case skTv.keymap.RED :
										if(curComponent._get("Fn_Key_RED") != "") {
											eval(curComponent._get("Fn_Key_RED"));
										}
										break;
										
									case skTv.keymap.GREEN :
										if(curComponent._get("Fn_Key_GRREN") != "") {
											eval(curComponent._get("Fn_Key_GRREN"));
										}
										break;
									case skTv.keymap.YELLOW :
										if(curComponent._get("Fn_Key_YELLOW") != "") {
											eval(curComponent._get("Fn_Key_YELLOW"));
										}
										break;
										
									case skTv.keymap.BLUE :
										if(curComponent._get("Fn_Key_BLUE") != "") {
											eval(curComponent._get("Fn_Key_BLUE"));
										}
										break;

									case skTv.keymap.RW :
										if(curComponent._get("Fn_Key_RW") != "") {
											eval(curComponent._get("Fn_Key_RW"));
										}
										break;

									case skTv.keymap.FF :
										if(curComponent._get("Fn_Key_FF") != "") {
											eval(curComponent._get("Fn_Key_FF"));
										}
										break;
										
									case skTv.keymap.RETURN :
										if(curComponent._get("Fn_Key_RETURN") != "") {
											eval(curComponent._get("Fn_Key_RETURN"));
										}
										break;
								}
							},
			                handleMouse : {
			                	'li' : {
		                            'mouseover' : function(){
										$(".list_gnb li").each(function(e){
											if($(this).attr("class").indexOf(" focus") > 0) {
												var targetClass = $(this).attr("class").substring(0, $(this).attr("class").indexOf(" "));

												if(targetClass == curComponent._get('selectedGnbClass')) {
													$(this).attr("class", targetClass+" select");
												} else {
													$(this).attr("class", targetClass+" basic");
												}
												return false;
											}
										});
										
										$(this).attr("class", $(this).attr("class").replace(" select", "").replace(" basic", "")+" focus");
		                            }, 
		                            'click' : function(){
										curComponent._gotoService($(this).attr("class").replace(" focus", ""));
		                            }
			                	}
			                }
						}
					}

					skTv.zone.show('Gnb');
				}
			}
		} 
	}
});

var GnbComponent = new GnbComponentClass();
