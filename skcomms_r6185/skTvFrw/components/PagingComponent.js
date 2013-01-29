/**
 *
 * PagingComponent.js
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
				[2011-02-11 오전 10:03:24 / shim]
				1. Filter 라는 명명은 Event Handler 의 의미이다 따라서 On으로 쓰면 더 명확하다.
				그러나 실제 Dom Event Model 에서의 On과 혼동될 여지가 있으므로 Filter 로 사용하였음.

 * @_tutorial		
 * @_version		
 * @_abstract
 * @_final			
 * @_internal
 * @_date			2011-01-11 오후 6:49:42
 * 
 * @internal ************************* [ file info. end ] *********************************
 */



/**
 * Paging Component
 * 
 * Usage

		// 페이징 컴포넌트 인스턴스 생성
		this.abcPaging = new PagingComponentClass();

		// 페이징 컴포넌트 인스턴스 작동규칙 설정
		this.abcPaging._set({

			selector : '#ol_alphabet > li',

			beforeNextFilter : function(){
				skFn.debug.log('beforeNextFilter called');
			},
			afterNextFilter : function(){
				skFn.debug.log('afterNextFilter called');
			},
			beforePrevFilter : function(){
				skFn.debug.log('beforePrevFilter called');
			},
			afterPrevFilter : function(){
				skFn.debug.log('afterPrevFilter called');
			},

			lastFilter : function(){
				skFn.debug.log('lastFilter called');
			},
			firstFilter : function(){
				skFn.debug.log('firstFilter called');
			}
		});

 */
var PagingComponentClass = defineClass({

	extend : BaseComponentClass,

	name : 'PagingComponentClass',

	construct : function(_ctl){

		// 상위클래스에 체이닝
		this.superclass();

		// 인스턴스 변수들을 정의한다
		this._init([
			'selector',
			'beforeNextFilter',
			'afterNextFilter',
			'beforePrevFilter',
			'afterPrevFilter',
			'lastFilter',
			'firstFilter',
			'_ctl',
			'lastFocusIndex'
		]);

		// 컴포넌트를 사용중인 컨트롤러 인스턴스를 저장한다
		this._set({_ctl:_ctl, lastFocusIndex:0});
	},

	methods : {

		/**
		 * moves focus
		 * @param {String} direction 방향 (prev, next)
		 * @return void
		 * @see #moveFocus3D
		 */
		moveFocus : function(direction){

			skFn.debug.log('PagingComponent > moveFocus() called');

			if(direction=='next'){

				// beforeNextFilter 가 정의되었다면 실행
				if(this.beforeNextFilter){this.beforeNextFilter()};

				// DOM last 요소이면 first 요소로 이동
				if($(this.selector+'.focus')[0]==$(this.selector+':last')[0]){
					if(typeof this.lastFilter == 'function'){
						this.lastFilter();
					}else if(this.lastFilter=='loop'){
						$(this.selector+'.focus').attr({'class':''});
						$(this.selector+':first').attr({'class':'focus'});
					}
				// DOM 형제 다음 요소로 이동
				}else{
					$(this.selector+'.focus').attr({'class':''}).next().attr({'class':'focus'});
				}

				skFn.debug.log('PagingComponent > moveFocus(next) executed');

				// afterNextFilter 가 정의되었다면 실행
				if(this.afterNextFilter){this.afterNextFilter()};

			}else if(direction=='prev'){

				// beforePrevFilter 가 정의되었다면 실행
				if(this.beforePrevFilter){this.beforePrevFilter()};

				// DOM first 요소이면 last 요소로 이동
				if($(this.selector+'.focus')[0]==$(this.selector+':first')[0]){
					if(typeof this.firstFilter == 'function'){
						this.firstFilter();
					}else if(this.firstFilter=='loop'){
						$(this.selector+'.focus').attr({'class':''});
						$(this.selector+':last').attr({'class':'focus'});
					}
				// DOM 형제 이전 요소로 이동
				}else{
					$(this.selector+'.focus').attr({'class':''}).prev().attr({'class':'focus'});
				}

				skFn.debug.log('PagingComponent > moveFocus(prev) executed');

				// afterPrevFilter 가 정의되었다면 실행
				if(this.afterPrevFilter){this.afterPrevFilter()};
			}

			// 마지막에 포커스한 위치를 기억한다
			this.lastFocusIndex = $(this.selector).index($(this.selector+'.focus')[0]);
		},

		/**
		 * 특정 위치에 포커스를 위치시킨다
		 * @param {Number} focusIdx (0,1,2...n)
		 * @return void
		 */
		focusOn : function(focusIdx){
			skFn.debug.log('PagingComponent > focusOn('+focusIdx+') called');
			$(this.selector).eq(focusIdx).attr({'class':'focus'});
		},

		/**
		 * 포커스 클래스를 날린다
		 * @return void
		 */
		focusOff : function(){
			$(this.selector+'.focus').attr({'class':''});
		},

		/**
		 * 포커스된 요소의 Attr을 가져온다
		 * @return void
		 */
		getFocusAttr : function(attribute){
			return $(this.selector+'.focus').attr(attribute);
		}
	}
});