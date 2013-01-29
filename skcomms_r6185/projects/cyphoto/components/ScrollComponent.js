/**
 *
 * ScrollComponent.js
 *
 * 
 *
 * @internal ************************* [ file info. start ] *********************************
 *
 * @category		
 * @package		
 * @author			:	sophia
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

var ScrollComponentClass = defineClass({

	extend : BaseComponentClass,

	name : 'ScrollComponentClass',

	construct : function(){
		// 상위클래스에 체이닝
		this.superclass();

		// 인스턴스 변수들을 정의한다
		this._init([
		    'totalPage',
		    'scrollzone',
		    'curPage',
		    'pagePerPix',
		    'callback',
		    'scrollHeight',
		    'scrollY',
		    'isScrollMoving',
		    'isUseSlider'
		]);
		
		// 컴포넌트를 사용중인 컨트롤러 인스턴스를 저장한다
		this._set({totalPage:0, curPage:1, pagePerPix:1, scrollHeight :360, scrollY:0, isScrollMoving:'N', isUseSlider:[]});
		
		//LoadingComponent.setLoadingImgTimer(5000);
	},

	methods : {
		/*
		 * Scrollbar Page 이동 Pix 리턴
		 */
		_getPagePerPix : function (totalPage) {
			var _comp = this;
			var _comp_scrollHeight	=	parseInt(_comp._get("scrollHeight"));
			var _comp_pagePerPix;

			if(totalPage == 1) {
				_comp_pagePerPix	=	_comp_scrollHeight;

			// 스크롤 높이(360) 보다 페이지가 많은 경우에는 값을 다시 설정한다.
			} else if(parseInt(totalPage) > _comp_scrollHeight) {
				_comp_pagePerPix	=	Math.floor((_comp_scrollHeight/(totalPage-1)) * 1000000) / 1000000;
				//_comp_pagePerPix	=	_comp_scrollHeight/

			} else {
				//_comp_pagePerPix	=	Math.ceil(_comp_scrollHeight/(parseInt(obj[p])-1));
				//_comp_pagePerPix	=	Math.round((_comp_scrollHeight/(parseInt(obj[p])+1)) * 100) /100;
				_comp_pagePerPix	=	Math.round((_comp_scrollHeight/(totalPage-1)) * 100) /100;
			}

			return _comp_pagePerPix;
		},
		
		_processScrollDown : function(event) {
			var _comp = this;
			var _comp_scrollzone 		= 	_comp._get("scrollzone");
			var _comp_isScrollMoving 	= 	_comp._get("isScrollMoving");
			var baseScrollTopPx;

			switch(_comp_scrollzone) {
				case "Folder" :								// 폴더보기 팝업
					baseScrollTopPx = 242;
					break;
					
				case "PhotoDescView" :						// 상세보기 팝업
					baseScrollTopPx = 160;
					break;
					
				default : 									// 댓글
					baseScrollTopPx = 240;
					break;
			}
			
			var sY = event.clientY - $("#" + _comp_scrollzone + "_scroll :first").offset().top - baseScrollTopPx;
			_comp._set({scrollY:sY});
			skFn.debug.log("[_processScrollDown] _comp_isScrollMoving : " + _comp_isScrollMoving);

			// 현재 스크롤이 움직이지 않는다면 움직이게 한다. 
			if(_comp_isScrollMoving == "N") {
				_comp._set({isScrollMoving:'Y'});
				
				$("#Scene" + _comp_scrollzone).bind("mousemove", function(e){
					_comp._processScrollDrag(e, _comp);
				});

				$("#Scene" + _comp_scrollzone).bind("mouseup", function(e){
					_comp._processScrollUp(e, _comp);
				});

			} else if(_comp_isScrollMoving == "Y") {
				// 스크롤 이미지 위치에 해당하는 페이지 정보를 보여줌
				_comp._set({isScrollMoving:'N'});
				_comp._moveScrollByClick();
				
				$("#Scene" + _comp_scrollzone).unbind("mousemove");
				$("#Scene" + _comp_scrollzone).unbind("mouseup");
			}
		}, 
	
		_processScrollUp : function (event, _comp) {
			var _comp_scrollzone 		= 	_comp._get("scrollzone");
			var _comp_isScrollMoving 	= 	_comp._get("isScrollMoving");
			
			skFn.debug.log("[_processScrollUp] _comp_isScrollMoving : " + _comp_isScrollMoving);

			if(_comp_isScrollMoving == "Y") {
				$("#Scene" + _comp_scrollzone).unbind("mousemove");
				$("#Scene" + _comp_scrollzone).unbind("mouseup");
			}
		},
		
		
		_processScrollDrag : function(e, _comp) {
			var _comp_scrollzone = _comp._get("scrollzone");
			var scrollY = _comp._get("scrollY");

			var top = event.clientY + scrollY;
			if( top < -20 ) { 
				top = -20;
			} else if( top > 340 ){
				top = 340;
			}

			$("#" + _comp_scrollzone + "_scroll :first").attr("style", "top:" + top + "px");
		},
		
		_moveScrollByClick : function () {
			var _comp = this;
			var _comp_totalPage		= parseInt(_comp._get("totalPage"));
			var _comp_scrollzone 	= _comp._get("scrollzone");
			var _comp_pagePerPix 	= _comp._get("pagePerPix");
			var _comp_callback	 	= _comp._get("callback");
			var newPage;

			if(skTv.zone.isLock == true) return;

			
			//************** 페이지 계산 **************//
			var ScrollDragImgStyle 	= $("#" + _comp_scrollzone + "_scroll :first").attr("style");
			var ScrollDragImgTop = "";
			
			// top값을 가져와서 해당 페이지의 Top값을 알아온다.
			if(ScrollDragImgStyle.lastIndexOf("top:") >= 0){
				ScrollDragImgTop = new Number(ScrollDragImgStyle.replace("top:", "").replace("px", "")); 
			} else {
				return;
			}

			
			// 페이지 계산
			newPage = Math.round(((ScrollDragImgTop + 20)/_comp_pagePerPix)) +1; 

			if(newPage < 1) newPage = 1;
			else if (newPage > _comp_totalPage) newPage = _comp_totalPage;
			
			
			skFn.debug.log("[_moveScrollByClick] ScrollDragImgTop : " + ScrollDragImgTop + ', newPage : ' + newPage + ', _comp_pagePerPix' + _comp_pagePerPix);
			// 페이지 이동

			_comp.view(_comp_totalPage, newPage, _comp_callback)
		},	
		
		/*
		 * set variables
		 */
		init: function (obj, fnCallback){
			var _comp = this;
			var _comp_pagePerPix;
			var _comp_scrollzone;
			var _comp_totalpage;
			var _comp_isUseSlider	=	_comp._get("isUseSlider");	
			var movePage;
			
			
			_comp._set({totalPage:0, curPage:1, pagePerPix:1, scrollHeight :360, scrollY:0, isScrollMoving:'N'});

			// 변수 세팅
			if(typeof obj == 'object'){
				for(var p in obj){
					if(typeof this[p] != 'undefined'){
						this[p] = obj[p];

						// PerPage Setting
						if(p == "totalPage") {
							_comp_totalpage 	= parseInt(obj[p]);
							_comp_pagePerPix 	= _comp._getPagePerPix(_comp_totalpage);
							_comp._set({totalPage:_comp_totalpage, pagePerPix:_comp_pagePerPix});
							
						// ScrollZone Setting
						} else if(p == "scrollzone") {
							_comp_scrollzone = obj[p]
							_comp._set({scrollzone:_comp_scrollzone});
						}
					}
				}
			}
			
			if(typeof fnCallback != undefined) {
				_comp._set({callback:fnCallback});
			}

			// mouseOut, mouseOver Event Binding
			$("#" + _comp_scrollzone + "_scroll :first").bind("mouseover", function(e){
				$("#" + _comp_scrollzone + "_scroll :eq(2)").attr("class", "bg_scroll focus");
			});

			$("#" + _comp_scrollzone + "_scroll :first").bind("mouseout", function(e){
				$("#" + _comp_scrollzone + "_scroll :eq(2)").attr("class", "bg_scroll");
			});
			

			$("#" + _comp_scrollzone + "_scroll :eq(2)").bind("mouseover", function(e){
				$("#" + _comp_scrollzone + "_scroll :eq(2)").attr("class", "bg_scroll focus");
			});

			$("#" + _comp_scrollzone + "_scroll :eq(2)").bind("mouseout", function(e){
				$("#" + _comp_scrollzone + "_scroll :eq(2)").attr("class", "bg_scroll");
			});
			
			// move Event
			$("#" + _comp_scrollzone + "_scroll :first").bind("click", function(e){
				_comp._processScrollDown(e, _comp);
			});


			$("#" + _comp_scrollzone + "_scroll :nth-child(2) :first").slider( "destroy" );
			
			$("#" + _comp_scrollzone + "_scroll :nth-child(2) :first").slider({
				range: "min",
				min: 0,
				max: (_comp_totalpage-1),
				orientation: 'vertical',
				slide: function( event, ui ) {
					// scroll 이동시 현재 zone에 포커스
					if(skTv.zone.getCurZone() != _comp_scrollzone) {
						skTv.zone.focus(_comp_scrollzone);
					}
				},
				stop : function (event, ui) {
					if(skTv.zone.isLock == false) {
						// scroll 이동시 현재 zone에 포커스
						if(skTv.zone.getCurZone() != _comp_scrollzone) {
							skTv.zone.focus(_comp_scrollzone);
						}

						movePage = _comp_totalpage - ui.value;
						_comp.view(_comp_totalpage, movePage, fnCallback);
					}
				}
			});
			
		},
		
		/*
		 * scrollbar view
		 */
		view : function (cTotalpage, cPage, fnCallback){
			var _comp 				= 	this;
			var _comp_totalPage 	= 	parseInt(_comp._get("totalPage"));
			var _comp_curPage	 	= 	parseInt(_comp._get("curPage"));
			var _comp_pagePerPix 	= 	Number(_comp._get("pagePerPix"));
			var _comp_scrollzone 	= 	_comp._get("scrollzone");
			var _comp_callback 		= 	_comp._get("callback");
			var _comp_scrollHeight	= 	parseInt(_comp._get("scrollHeight"));
			var _comp_curPix;
			
			//alert('scroll view ==> cTotalpage : ' + cTotalpage + ', cPage : ' +cPage + ', _comp_curPage : ' +_comp_curPage + ', _comp_totalPage : ' + _comp_totalPage)
			skFn.debug.log('[ScrollComponent.view prev] cTotalpage : ' + cTotalpage + ', cPage : ' + cPage + ', _comp_curPix : ' + _comp_curPix + ', _comp_totalPage : ' + _comp_totalPage);

			if(cPage > cTotalpage) {
				skFn.debug.log('[ScrollComponent.view] return => cPage > cTotalpage');
				return;
			}
			if(_comp_pagePerPix == "") {
				skFn.debug.log('[ScrollComponent.view] return => _comp_pagePerPix == ""');
				return;
			}
			if(_comp_totalPage != cTotalpage) {
				$("#Scene" + _comp_scrollzone).unbind("mousemove");
				$("#Scene" + _comp_scrollzone).unbind("mouseup");

				// mouseOut, mouseOver Event Binding
				$("#" + _comp_scrollzone + "_scroll :first").unbind("mouseover");
				$("#" + _comp_scrollzone + "_scroll :first").unbind("mouseout");
				$("#" + _comp_scrollzone + "_scroll :eq(2)").unbind("mouseover");
				$("#" + _comp_scrollzone + "_scroll :eq(2)").unbind("mouseout");
				
				// move Event
				$("#" + _comp_scrollzone + "_scroll :first").unbind("click");

				_comp.init({scrollzone:_comp_scrollzone ,totalPage:cTotalpage}, _comp_callback);
				
				_comp.view(cTotalpage, cPage, _comp_callback)
				return;
			}
			
			_comp._set({curPage:cPage});
			_comp_curPix = (Math.round(((cPage-1) * _comp_pagePerPix) * 1000000) /1000000) - 20;

			if(cPage == 1) {
				_comp_curPix = -20;

			} else if(cPage == _comp_totalPage) {
				_comp_curPix = _comp_scrollHeight - 20;
				
			}

			skFn.debug.log("[scrollComponent] _comp_curPix : " + _comp_curPix +", _comp_pagePerPix : " + _comp_pagePerPix);

			$("#" + _comp_scrollzone + "_scroll :first").attr("style", "top:" + _comp_curPix + "px");
			
			
			if(!(_comp_totalPage == cTotalpage && cPage == _comp_curPage)) {
				// 콜백 함수가 있다면 호출한다.
				if(typeof fnCallback != "undefined"){
					fnCallback(cPage);
				}
				return;			
			}

			skFn.debug.log('[ScrollComponent.view] totalPage : ' + _comp_totalPage + ', cPage : ' + cPage + ', _comp_curPix : ' + _comp_curPix);
		}
	}
});
