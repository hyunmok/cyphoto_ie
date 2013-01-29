/**
 *
 * PopupComponent.js
 *
 * 
 *
 * @internal ************************* [ file info. start ] *********************************
 *
 * @category		
 * @package		
 * @author		shim, heung woon <lumiel@skcomms.co.kr>
 * @filesource
 * @fileoverview

 * @_uses		
 * @_todo
				[2011-03-16 오후 7:26:15 / shim]
				1. 삼성 팝업 컴포넌트 참조하여 개발시작

				[2011-03-17 오후 3:00:39 / shim]
				1. showTextPopup 완성

 * @_tutorial		
 * @_version		
 * @_abstract
 * @_final			
 * @_internal
 * @_date			2011-03-16 오후 7:26:17
 * 
 * @internal ************************* [ file info. end ] *********************************
 */



/**
 * Popup Controller
 * 
 * Usage

	// 아래와 같이 사용합니다

	PopupComponent.showTextPopup(
		'업데이트 되었습니다',
		'싸이월드 회원 여러분께 보다 편리한<br />서비스를 제공하기 위하여 업데이트 되었습니다.',
		function(){
			skTv.zone.focus('Helpbar');
		}
	);

 */
var PopupComponent = {

	// 단순팝업 준비상태
	isTextPopupReady : false,

	// 단순팝업 확인 콜백함수 저장소
	fnCallbackEnter_text : null,

	// 단순팝업 닫기 콜백함수 저장소
	fnCallbackClose_text : null,

	/**
	 * 단순팝업 show
	 * @param {String} title
	 * @param {String} contents
	 * @param {Function} fnCallbackEnter
	 * @param {Function} fnCallbackClose
	 * @return void
	 */
	showTextPopup : function(title, contents, fnCallbackEnter_text, fnCallbackClose_text){

		skFn.debug.log('PopupComponent.showTextPopup(\''+title+'\', content, fnCallback) is called');

		// TextPopup이 준비되지 않았다면
		if(this.isTextPopupReady==false){

			if(skEnv.device.vendor == "lgcns") {
				// css 정의
				var popupCss =	"#SceneTextPopup { position:absolute; left:0; top:0}" +

								".box_text_popup { position:absolute; left:367px; top:140px; z-index:16; width:564px; }" +
								".box_text_popup .popup_top { height:61px; padding:6px 8px 0 8px; color:#fff; font-size:33px; text-align:center; background-color:#6cc1e4; }" +
								".box_text_popup .popup_contents { padding:22px 8px 22px 8px; font-size:22px; text-align:center; line-height:1.18; background-color:#FFF }" +
								".box_text_popup .popup_bottom { height:65px; padding:0 0 5px 0; background-color:#8ca8b5; }" +
								".box_text_popup .popup_top img { position:relative; left:-1px; top:5px; }" +
								".box_text_popup .popup_contents .desc_type1 { padding:0 0 16px 0; color:#666; }" +
								".box_text_popup .popup_contents .desc_type2 { padding:0 0 16px 0; color:#f6640c; }" +
								".box_text_popup .popup_contents .desc_type3 { padding:0 0 16px 0; color:#999; }" +
	/*
								".popup_photo_desc_view .popup_desc_view .title { color:#14596f; font-size:30px; }" +
								".popup_photo_desc_view .popup_desc_view .date { margin:0 0 0 3px; color:#50879f; font-size:20px; }" +
								".popup_photo_desc_view .popup_desc_view .box { position:relative; width:514px; height:375px; }" +
								".popup_photo_desc_view .popup_desc_view .wrap_contents { position: absolute; left:0; top:23px; overflow: hidden; width:435px; height:354px; clip: rect(0px, 435px, 354px, 0px); }" +
								".popup_photo_desc_view .popup_desc_view .contents { position:absolute; width:435px; color:#333; font-size:20px; line-height:1.1; }" +
	*/
								///"/* scroll */" +
								/*".popup_photo_desc_view .bg_scroll { position:absolute; left:450px; top:23px; width:40px; height:360px; background:url('../image/bg/bg_scroll.png') no-repeat center top; }" +
								".popup_photo_desc_view .bg_scroll.focus { background:url('../image/bg/bg_scroll_focus.png') no-repeat center top; }" +
								".popup_photo_desc_view .bg_scroll .img_drag { position:absolute; left:0; top:-20px; }" +
	*/
								"/* popup, helpbar */" +
								".box_text_popup .popup_bottom .list_helpbar { overflow:hidden; margin:0 26px 0 0; }" +
								".popup_bottom .list_helpbar li { float:right; width:108px; height:48px; padding:22px 0 0 0; border:none; color:#fff; text-align:center; font-size:24px; }" +
								".popup_bottom .list_helpbar li.focus { background:url('../image/popup/bg_popup_helpbar2_focus.png') no-repeat left top; }" + 

								".dim { position:absolute; z-index:8; left:0; top:0; width:1280px; height:720px; background:#000; opacity:0.7; }" ;
			}
			else {
				// css 정의
				var popupCss =	"#SceneTextPopup { position:absolute; left:0; top:0}" +

								".box_text_popup { position:absolute; left:367px; top:140px; z-index:16; width:564px; }" +
								".box_text_popup .popup_top { height:61px; padding:6px 8px 0 8px; color:#fff; font-size:33px; text-align:center; background:url('../image/popup/bg_popup_text_top.png') no-repeat left bottom; }" +
								".box_text_popup .popup_contents { padding:22px 8px 22px 8px; font-size:22px; text-align:center; line-height:1.18; background:url('../image/popup/bg_popup_text_contents.png') repeat-y left bottom; }" +
								".box_text_popup .popup_bottom { height:69px; padding:0 0 5px 0; background:url('../image/popup/bg_popup_text_bottom.png') no-repeat left bottom; }" +
								".box_text_popup .popup_top img { position:relative; left:-1px; top:5px; }" +
								".box_text_popup .popup_contents .desc_type1 { padding:0 0 16px 0; color:#666; }" +
								".box_text_popup .popup_contents .desc_type2 { padding:0 0 16px 0; color:#f6640c; }" +
								".box_text_popup .popup_contents .desc_type3 { padding:0 0 16px 0; color:#999; }" +
	/*
								".popup_photo_desc_view .popup_desc_view .title { color:#14596f; font-size:30px; }" +
								".popup_photo_desc_view .popup_desc_view .date { margin:0 0 0 3px; color:#50879f; font-size:20px; }" +
								".popup_photo_desc_view .popup_desc_view .box { position:relative; width:514px; height:375px; }" +
								".popup_photo_desc_view .popup_desc_view .wrap_contents { position: absolute; left:0; top:23px; overflow: hidden; width:435px; height:354px; clip: rect(0px, 435px, 354px, 0px); }" +
								".popup_photo_desc_view .popup_desc_view .contents { position:absolute; width:435px; color:#333; font-size:20px; line-height:1.1; }" +
	*/
								///"/* scroll */" +
								/*".popup_photo_desc_view .bg_scroll { position:absolute; left:450px; top:23px; width:40px; height:360px; background:url('../image/bg/bg_scroll.png') no-repeat center top; }" +
								".popup_photo_desc_view .bg_scroll.focus { background:url('../image/bg/bg_scroll_focus.png') no-repeat center top; }" +
								".popup_photo_desc_view .bg_scroll .img_drag { position:absolute; left:0; top:-20px; }" +
	*/
								"/* popup, helpbar */" +
								".box_text_popup .popup_bottom .list_helpbar { overflow:hidden; margin:0 26px 0 0; }" +
								".popup_bottom .list_helpbar li { float:right; width:108px; height:48px; padding:22px 0 0 0; border:none; color:#fff; text-align:center; font-size:24px; }" +
								".popup_bottom .list_helpbar li.focus { background:url('../image/popup/bg_popup_helpbar2_focus.png') no-repeat left top; }" + 

								".dim { position:absolute; z-index:8; left:0; top:0; width:1280px; height:720px; background:#000; opacity:0.7; }" ;	
			}
			
			// css를 dom 구조에 추가
			var textPopupCss = skFn.dom.addCss(popupCss);

			// zone 정의
			var textPopupSrc = 	"<div class='box_text_popup' id='div_box_text_popup'>" +
							"	<div class='popup_top'>" +
							"		<div class='title'><img src='../image/icon/icon_notice.png' alt='' /> <span id='span_text_popup_title'></span></div>" +
							"	</div>" +
							"	<div class='popup_contents' id='div_text_popup_contents'></div>" +
							"	<div class='popup_bottom'>" +
							"		<ul class='list_helpbar' id='ul_list_helpbar'></ul>" +
							"	</div>" +
							"</div>" +
							"<div class='dim'></div>";

			// zone DIV 를 dom 구조에 추가
			var textPopupDiv = skFn.dom.makeDiv ({
				sID : 'SceneTextPopup',
				sStyle : '',
				ePosWin : window,
				ePosRef : document.body,
				sPosRef : 'Inside',
				bAppend : true ,
				sContent : textPopupSrc
			}) ;
			
			// 팝업 내용 반영
			//skFn.dom.setHtml('span_text_popup_title', title);
			//skFn.dom.setHtml('div_text_popup_contents', contents);	

			//alert(title+' - '+contents);
			
			// 올바로 dom 구조에 붙었다면
			if (textPopupCss && textPopupDiv) {

				// Zone 핸들러 정의
				if(zone){
					skFn.debug.log('zone exists');
					zone['TextPopup'] = {
						initialize : function(){},
						handleShow : function(){},
						handleHide : function(){},
						handleFocus : function(){},
						handleBlur : function(){},
						handleKeyDown : function(keyCode){
							switch (keyCode) {
								case skTv.keymap.ENTER:
									if($('#Scene' + skTv.zone.getCurZone()+ ' li').size() == 2){
										if($('#Scene' + skTv.zone.getCurZone()+ ' li').eq(0).attr("class") == "focus") {
											PopupComponent.hideTextPopup('close');
										} else {
											PopupComponent.hideTextPopup('enter');
										}
									} else {
										PopupComponent.hideTextPopup('enter');
									}
									break;
									
								case skTv.keymap.RIGHT:
									if($('#Scene' + skTv.zone.getCurZone()+ ' li').size() == 2){
										if($('#Scene' + skTv.zone.getCurZone()+ ' li').eq(1).attr("class") == "focus") {
											$('#Scene' + skTv.zone.getCurZone()+ ' li').eq(1).attr("class", "");
											$('#Scene' + skTv.zone.getCurZone()+ ' li').eq(0).attr("class", "focus");
										}
									}
									break;

								case skTv.keymap.LEFT:
									if($('#Scene' + skTv.zone.getCurZone()+ ' li').size() == 2){
										if($('#Scene' + skTv.zone.getCurZone()+ ' li').eq(0).attr("class") == "focus") {
											$('#Scene' + skTv.zone.getCurZone()+ ' li').eq(0).attr("class", "");
											$('#Scene' + skTv.zone.getCurZone()+ ' li').eq(1).attr("class", "focus");
										}
									}
									break;
							}
						},
						handleMouse :{
							"#text_enter" : {		//확인 버튼
								"mouseover" : function(){
									$("#text_close").removeClass("focus");
									$(this).addClass("focus");									
								},
								"click" : function(){
									PopupComponent.hideTextPopup('enter')								
								}
							},
							"#text_close" : {		//닫기 버튼
								"mouseover" : function(){
									$("#text_enter").removeClass("focus");
									$(this).addClass("focus");		
								},
								"click" : function(){
									PopupComponent.hideTextPopup('close')								
								}
							}
						}
					}
				}

				// TextPopup 준비완료
				this.isTextPopupReady = true ;
				skFn.debug.log('isTextPopupReady = '+this.isTextPopupReady);
			}
		}
		
		// 팝업 내용 반영
		skFn.dom.setHtml('span_text_popup_title', title);
		skFn.dom.setHtml('div_text_popup_contents', contents);

		// 버튼 내용 반영
		var btnLI = '';
		if(typeof fnCallbackClose_text != "undefined"){
			btnLI = "<li class='' id='text_close'><span class='text_icon'>닫기</span></li><li class='focus' id='text_enter'><span class='text_icon'>확인</span></li>";
		}else{
			btnLI = "<li class='focus' id='text_enter'><span class='text_icon'>확인</span></li>";
		}
		skFn.dom.setHtml('ul_list_helpbar', btnLI);

		// 확인 콜백
		PopupComponent.fnCallbackEnter_text = fnCallbackEnter_text;

		// 닫기 콜백
		if(typeof fnCallbackClose_text != "undefined") PopupComponent.fnCallbackClose_text = fnCallbackClose_text;
		

		// 수직위치 중앙으로 조정
		var div_text_popup = document.getElementById('div_box_text_popup');
		var bodyHeight = $("body").css('height');
		bodyHeight = Number(bodyHeight.replace("px", ""));

		div_text_popup.style.height = div_text_popup.style.height ? div_text_popup.style.height+'px' : div_text_popup.offsetHeight+'px';
		div_text_popup.style.top = (parseInt(bodyHeight) - parseInt(div_text_popup.style.height))/2 + 'px';
		
		// textPopupDiv 가 로드되었다면
		skTv.zone.show('TextPopup');
		skTv.zone.focus('TextPopup');
	},

	/**
	 * 단순팝업 hide
	 * @return void
	 */
	hideTextPopup : function(callbackType){
		skFn.debug.log('PopupComponent.hideTextPopup() is called');
		skTv.zone.hide('TextPopup');

		if(callbackType == "enter") PopupComponent.fnCallbackEnter_text();
		if(callbackType == "close") PopupComponent.fnCallbackClose_text();
		// skTv.zone.focus(skTv.zone.oldZoneId);
	},



	// 입력팝업 준비상태
	isInputPopupReady : false,

	// 입력팝업 확인 콜백함수 저장소
	fnCallbackEnter : null,

	// 입력팝업 취소 콜백함수 저장소
	fnCallbackReturn : null,

	// 입력팝업 포커스 아이디 저장소
	popfocusId : '',

	
	/**
	 * 입력팝업 show
	 * @param {String} title
	 * @param {String} contents
	 * @param {String} inputName
	 * @param {String} inputType
	 * @param {String} initLang (korean, english)
	 * @param {Function} fnCallbackEnter
	 * @param {Function} fnCallbackReturn
	 * @param {Number} maxLen
	 * @return void
	 */
	showInputPopup : function(title, contents, inputName, inputType, initLang, fnCallbackEnter, fnCallbackReturn, maxLen){

		skFn.debug.log('PopupComponent.showInputPopup(\''+title+'\', contents, inputName, inputType, fnCallbackEnter, \''+fnCallbackReturn+'\', maxLen) is called');

		// InputPopup이 준비되지 않았다면 만든다
		if(this.isInputPopupReady==false){
			// css 정의
			var inputPopupCss =	"#SceneInputPopup { position:relative; left:0; top:0;}" +
								".box_input_popup { position:absolute; left:151px; top:165px; z-index:16;}" +
								".box_input_popup .contents { height:297px; padding:34px 0 0 22px; width:451px; background:url('../image/popup/bg_popup_input.png') no-repeat center top;}" +
								".box_input_popup .popup_bottom {height:78px; background:url('../image/popup/bg_popup_input_bottom.png') no-repeat center top;}" +
								".box_input_popup .title { padding:0 0 50px 0; color:#3d3d3d; font-size:33px;} " +
								".box_input_popup .description {padding:0 0 11px 3px;color:#252526; font-size:20px; line-height:1.15;;}" +								
								".box_input_popup input {height:57px; border:1px solid #aeaeae; color:#999; font-size:30px;}" +
								".box_input_popup .input_type1 { width:427px;}" +
								".box_input_popup .input_text1 { width:405px; padding:0 10px; background:#fff url('../image/popup/popup_input_text1.png') no-repeat left top;}" +
								".box_input_popup .focus {outline:7px solid #f77125;}" +
								".box_input_popup .focus input {border:1px solid #c94313;}" +
					
								"/* popup, helpbar */" +
								".popup_bottom .list_helpbar {overflow:hidden; margin:0 26px 0 0;}" +
								".popup_bottom .list_helpbar li {float:right; width:108px; height:48px; padding:22px 0 0 0; border:none; color:#fff; text-align:center; font-size:24px;}" +
								".popup_bottom .list_helpbar li.focus {outline:none; background:url('../image/popup/bg_popup_helpbar2_focus.png') no-repeat left top;}" +
								
								".dim {position:absolute; z-index:8; left:0; top:0; width:1280px; height:720px; background:#000; opacity:0.7;}"								
			
			// css를 dom 구조에 추가
			var inputPopupCss = skFn.dom.addCss(inputPopupCss);

			// zone 정의
			var inputPopupSrc = 	"<div class='box_input_popup'>" +  
									"	<div class='contents'> " +  
									"		<div class='title'> <span id='span_input_popup_title'></span> </div> " +  
									"		<div class='description' id='div_input_popup_contents'>" +   
									"		</div> " +  
//									"		<div id='input_popup' class='input_type1' style='display:block;'> " +  
									"		<div id='input_popup' class='input_type1'> " +  
									"			<input type='" + inputType + "' class='input_text1' name='" + inputName + "'  id='" + inputName + "'";
			
									if(maxLen != 'undefined') inputPopupSrc +=		" maxlength='" + maxLen +"'" ;
			
			inputPopupSrc +=		" value=''> " +  
									"		</div> " +  
									"	</div> " +  
									"	<div class='popup_bottom'>" +   
									"		<ul class='list_helpbar'> " +  
									"			<!-- 포커스시 아래 예시처럼 class='focus' 추가해 주세요^^ --> " +  
									"			<li class='' id='input_close'><span class='text_icon'>닫기</span></li> " +  
									"			<li class='' id='input_enter'><span class='text_icon'>확인</span></li> " +  
									"		</ul> " +  
									"	</div> " +  
									"</div> "+  
									"<div class='dim'></div>";			

			// zone DIV 를 dom 구조에 추가
			var textPopupDiv = skFn.dom.makeDiv ({
				sID : 'SceneInputPopup',
				sStyle : 'visibility:hidden',
				ePosWin : window,
				ePosRef : document.body,
				sPosRef : 'Inside',
				bAppend : true ,
				sContent : inputPopupSrc
			}) ;
			

			// 올바르게 dom 구조에 붙었다면
			if (!inputPopupCss && textPopupDiv) {
				return;
			} else {
				// Zone 핸들러 정의
				if(zone){
					skFn.debug.log('zone exists');
					zone['InputPopup'] = {
						initialize : function(){},
						handleShow : function(){},
						handleHide : function(){
							$("#" + inputName).val("");				// input value 초기화
							skTv.zone.hide('Ime');
						},
						handleFocus : function(){					// input에 focus 처리						
							if(PopupComponent.popfocusId == "" || PopupComponent.popfocusId == "input_popup") {
								PopupComponent.popfocusId = "input_popup";
								if(skEnv.device.vendor == 'lgcns') {
									try {
										android.dispatchTouchEvent(PopupComponent.popfocusId);
									}
									catch(e) {}
								}
								$("#input_popup").attr("class", "input_type1 focus");
							}
						},
						handleBlur : function(){
							$("#input_popup").attr("class", "input_type1");
							$("#input_enter").attr("class", "");
							$("#input_close").attr("class", "");
							
							PopupComponent.popfocusId = "";							
						},
						handleKeyDown : function(keyCode){
							switch (keyCode) {
								case skTv.keymap.RIGHT:
									if(PopupComponent.popfocusId == "input_popup"){
										PopupComponent.classFocusChange(PopupComponent.popfocusId);

										// 키보드로 이동시에만 처음 포커스로 이동 (by sophia 4.25)
										LGImeComponent.keyMove(skTv.keymap.RIGHT);										

										// IME로 포커스 이동 및 IME display
										skTv.zone.focus("Ime");

									} else if(PopupComponent.popfocusId == "input_enter"){
										PopupComponent.classFocusChange(PopupComponent.popfocusId);
										PopupComponent.popfocusId = "input_close";
										PopupComponent.classFocusChange(PopupComponent.popfocusId);
									} 
									
									break;
								case skTv.keymap.LEFT:
									if(PopupComponent.popfocusId == "input_close"){
										PopupComponent.classFocusChange(PopupComponent.popfocusId);
										PopupComponent.popfocusId = "input_enter";
										PopupComponent.classFocusChange(PopupComponent.popfocusId);
									} 
									
									break;
								case skTv.keymap.UP:
									if(PopupComponent.popfocusId != "input_popup"){
										PopupComponent.classFocusChange(PopupComponent.popfocusId);
										PopupComponent.popfocusId = "input_popup";
										PopupComponent.classFocusChange(PopupComponent.popfocusId);
									} 
									
									break;
								case skTv.keymap.DOWN:
									if(PopupComponent.popfocusId == "input_popup"){
										PopupComponent.classFocusChange(PopupComponent.popfocusId);
										PopupComponent.popfocusId = "input_enter";
										PopupComponent.classFocusChange(PopupComponent.popfocusId);
									} 
									
									break;
								case skTv.keymap.RETURN:
									PopupComponent.closeInputPopup();
									break;
								case skTv.keymap.ENTER:
									if(PopupComponent.popfocusId == "input_enter"){
										PopupComponent.enterInputPopup();
									} else if(PopupComponent.popfocusId == "input_close"){
										PopupComponent.closeInputPopup();
									}
									break;
							}
						},
		                handleMouse : {
		                	'#input_popup' : {
		                        'mouseover' : function(){
		                        	if($("#input_close").attr("class") == "focus") $("#input_close").attr("class", "");
		                        	if($("#input_enter").attr("class") == "focus") $("#input_enter").attr("class", "");
		                        	PopupComponent.popfocusId = "input_popup";
		                        	$(this).attr("class", "input_type1 focus"); 
		                        }
		                	},
		                	'#input_close, #input_enter' : {
		                        'mouseover' : function(){
		                        	if($("#input_popup").attr("class") == "input_type1 focus") $("#input_popup").attr("class", "input_type1");
		                        	if($("#input_close").attr("class") == "focus") $("#input_close").attr("class", "");
		                        	if($("#input_enter").attr("class") == "focus") $("#input_enter").attr("class", "");
		                        		
		                        	$(this).attr("class", "focus"); 
		                        	PopupComponent.popfocusId = $(this).attr("id");

		                        },
		                        'mousedown' : function() {
		                        	if($(this).attr("id") == "input_close") {
		                        		PopupComponent.closeInputPopup();
		                        		
		                        	} else {
		                        		// Input 길이보다 Text 길이가 긴 경우 focus가 처음글자로 이동하는 현상 수정(sophia 5.4)
		                    			if(LGImeComponent.flag){
		                    				LGImeComponent._set({flag:false});
		                    				
		                    				var timer=setTimeout(function(){
		                    					LGImeComponent._set({flag:true});
		                    				},1);
		                    				
			                        		PopupComponent.enterInputPopup();

		                    				setTimeout(function(){LGImeComponent.setInputFocus();},1);
		                    			}
		                        	}
		                        }		                		
		                	}
		                }
						
					}
				}
				
				// TextPopup 준비완료
				this.isInputPopupReady = true ;
				skFn.debug.log('isTextPopupReady = '+this.isTextPopupReady);
				
				// IME Component
				LGImeComponent = new LGImeComponentClass();
			}
			
			
		// 이미 Dom이 로딩되어 있다면 Input 구성요소만 재 세팅
		} else {
			if($(".box_input_popup :input").attr("id") != inputName) {
				$(".box_input_popup :input").attr("id", inputName);
				$(".box_input_popup :input").attr("name", inputName);
			}
			
			if($(".box_input_popup :input").attr("type") != inputType) {
				$(".box_input_popup :input").attr("type", inputType);
			}
			 
			if(maxLen != 'undefined') {
				if($(".box_input_popup :input").attr("maxlength") != maxLen) {
					$(".box_input_popup :input").attr("maxlength", maxLen);
				}
			}

			$(".box_input_popup :input").val("");
		}


		// 팝업 내용 반영
		skFn.dom.setHtml('span_input_popup_title', title);
		skFn.dom.setHtml('div_input_popup_contents', contents);


		// 확인 콜백
		PopupComponent.fnCallbackEnter = fnCallbackEnter;
		PopupComponent.fnCallbackReturn = fnCallbackReturn;

		// Ime 이전버튼 클릭시 팝업 종료 적용
		LGImeComponent.setFunctionKey("skTv.keymap.RETURN", "zone.InputPopup.handleKeyDown(skTv.keymap.RETURN);")		

		// Ime 노출
		/*
		LGImeComponent.show('InputPopup', initLang, inputName);
		skTv.zone.show('Ime');
		
		// inputPopupDiv 가 로드되었다면
		skTv.zone.show('InputPopup');
		skTv.zone.focus('InputPopup');
		*/
		
		LGImeComponent.show('InputPopup', initLang, inputName, function(){
			// inputPopupDiv 가 로드되었다면
			skTv.zone.show('InputPopup');
			skTv.zone.show('Ime');
			
			skTv.zone.focus('InputPopup');
		});
	},
	
	
	// change class Name (focus -> nonefocus, nonefocus -> focus) 
	classFocusChange : function (id){
		var className = $("#" + id).attr('class');
		var newClasssName;
		var focusIdx;
		
		focusIdx = className.indexOf('focus');

		if(focusIdx >= 0) {
			newClasssName = className.substring(0,focusIdx);
		} else {
			newClasssName = (className.length == 0) ? 'focus' : className + ' focus';
		}
		
		$("#" + id).attr('class', newClasssName);
	},

	// 확인버튼 클릭시 fnCallbackEnter 함수 호출
	enterInputPopup : function(){
		PopupComponent.fnCallbackEnter();
		//PopupComponent.hideInputPopup();
	},

	// 닫기버튼 클릭시 fnCallbackReturn 함수 호출
	closeInputPopup : function(){
		PopupComponent.fnCallbackReturn();
		//PopupComponent.hideInputPopup();
	},
	
	// Input Popup의 title과 contents 내용 변경
	setInputPopupInfo : function(contents, title) {
		if(typeof contents != "undefined") skFn.dom.setHtml('div_input_popup_contents', contents);
		if(typeof title != "undefined") skFn.dom.setHtml('span_input_popup_title', title);
	},
	
	// Input Popup의 Input창으로 포커스 이동
	setInputFocus : function() {
		PopupComponent.classFocusChange(PopupComponent.popfocusId);
		PopupComponent.popfocusId = "input_popup";
		PopupComponent.classFocusChange(PopupComponent.popfocusId);		
	}
}