/**
 *
 * dom.js
 *
 * 
 *
 * @internal ************************* [ file info. start ] *********************************
 *
 * @category		
 * @package		
 * @author		shim, heung woon <lumiel@skcomms.co.kr>
 * @filesource

 * @_uses		
 * @_todo			
 * @_tutorial		
 * @_version		
 * @_abstract
 * @_final			
 * @_internal
 * @_date			2011-01-13 오전 10:59:23
 * 
 * @internal ************************* [ file info. end ] *********************************
 */



if (typeof window == 'undefined'){
	if(typeof skFn == 'undefined'){
		skFn = {};
	}
}else if (typeof window.skFn == 'undefined'){
	window.skFn = {};
}

skFn.dom = {

	/**
	 * setHtml
	 * 
	 * @function
	 * @param {Mixed} obj : element Id or element
	 * @param {String} str : string to insert
	 */
	setHtml : function(obj, str){
		if(typeof obj == 'string'){
			obj = document.getElementById(obj);
		}
		if(typeof obj != 'object' || obj == null || typeof obj.innerHTML == 'undefined'){
			return;
		}
		if(typeof widgetAPI == 'undefined'){
			obj.innerHTML = str;
		}else{
			widgetAPI.putInnerHTML(obj, str);
		}
	},

	/**
	 * get Element By ClassName
	 * 
	 * @function
	 * @param {String} sTagName
	 * @param {String} sClassName
	 * @return {Array} 
	 */
	getByClass : function( sTagName, sClassName ){

		var sTagName = sTagName.toLowerCase() ;
		var sClassName = sClassName.toLowerCase() ;

		var collection, result, i ;
		result = [] ;

		if (document.getElementsByClassName) {
			collection = document.getElementsByClassName(sClassName) ;
			for( i=0; i<collection.length ; i++) {
				if (collection[i].nodeName.toLowerCase() == sTagName) {
					result[result.length] = collection[i] ;
				}
			}
		} else {
			collection = document.getElementsByTagName(sTagName) ;
			for( i=0; i<collection.length ; i++) {
				if (collection[i].className.toLowerCase() == sClassName) {
					result[result.length] = collection[i] ;
				}
			}
		}
		return result ;
	},

	/**
	 * get Element By ID
	 * 
	 * @function
	 * @param {String} sID
	 * @return {element} 
	 */
	getById : function( sID ){
		return sID ? document.getElementById(sID) : null ;
	},

	/**
	 * add Event Listener
	 * 
	 * @function
	 * @param {element} eNode : node to bind event
	 * @param {String} sEvent : 'click'
	 * @param {function} fHandler : event handler
	 * @return {Array} 
	 */
	addEvent : function(eNode, sEvent, fHandler){ 
		if(eNode.addEventListener){
			eNode.addEventListener(sEvent, fHandler, false);
		}else{
			eNode.attachEvent('on'+sEvent, fHandler);
		}
	},
	
	/**
	 * remove Event Listener
	 * 
	 * @function
	 * @param {element} eNode : node to bind event
	 * @param {String} sEvent : 'click'
	 * @param {function} fHandler : event handler
	 * @return {Array} 
	 */
	removeEvent : function(eNode, sEvent, fHandler){
		if(eNode.addEventListener){
			eNode.removeEventListener(sEvent, fHandler, false);
		}
	},	

	/**
	 * add node Before Ref
	 * 
	 * @function
	 * @param {element} eNewElement
	 * @param {element} eReference
	 */
	addBefore : function(eNewElement, eReference){
		eReference.parentNode.insertBefore(eNewElement, eReference) ;
	},

	/**
	 * add node After Ref
	 * 
	 * @function
	 * @param {element} eNewElement
	 * @param {element} eReference
	 */
	addAfter : function(eNewElement, eReference){
		eReference.parentNode.insertBefore(eNewElement, eReference.nextSibling) ;
	},

	/**
	 * add node Inside Ref
	 * 
	 * @function
	 * @param {element} eNewElement
	 * @param {element} eReference
	 */
	addInside : function(eNewElement, eReference, sPos){
		var sPos = sPos ? sPos : 'last' ;
		eReference.insertBefore(eNewElement, eReference[sPos+'Child']) ;
	},

	/**
	 * get Position X
	 * 
	 * @function
	 * @param {element} eElement
	 */
	getPosX : function (eElement) {
		var nPos = 0 ;
		while ( eElement.offsetParent ) {
			nPos += eElement.offsetLeft ;
			eElement = eElement.offsetParent ;
		}
		return nPos ;
	},

	/**
	 * get Position Y
	 * 
	 * @function
	 * @param {element} eElement
	 */
	getPosY : function (eElement) {
		var nPos = 0 ;
		while ( eElement.offsetParent ) {
			nPos += eElement.offsetTop ;
			eElement = eElement.offsetParent ;
		}
		return nPos ;
	},

	/**
	 * make Table
	 * 
	 * @function
	 * @param {hashTable} htOptions
	 * @return {element} Table
	 */
	makeTable : function(htOptions) {

		var sID = htOptions.sID ; // ID
		var sStyle = htOptions.sStyle ; // css style
		var sClass = htOptions.sClass ; // css class
		var ePosRef = htOptions.ePosRef ; // Insert Reference (If exists this will override bAppend property)
		var sPosRef = htOptions.sPosRef ? htOptions.sPosRef : 'After' ; // Atfer[default] | Before | Inside
		var ePosWin = htOptions.ePosWin ? htOptions.ePosWin : window ; // window to create div
		var bAppend = htOptions.bAppend ; // appendChild table to body
		var oProperties = htOptions.oProperties ; // table properties
		var eTable = ePosWin.document.createElement ( 'TABLE' ) ;

		eTable.id = sID ;
		if ( sStyle ) { eTable.style.cssText = sStyle ; }
		if ( sClass ) { eTable.className = sClass ; }
		if ( oProperties ) {
			for (var p in oProperties) {
				eTable[p] = oProperties[p] ;
			}
		}
		if (ePosRef){
			this['add'+sPosRef](eTable, ePosRef) ;
		} else if (bAppend) {
			this.addEvent(ePosWin, 'load', function(){
				ePosWin.document.body.appendChild(eTable) ;
			}) ;
		}

		return eTable ;
	},

	/**
	 * make Div Layer
	 * 
	 * @function
	 * @param {hashTable} htOptions
	 * @return {element} Div
	 */
	makeDiv : function(htOptions) {

		var sID = htOptions.sID ; // ID
		var sContent = htOptions.sContent ? htOptions.sContent : '' ; // Content

		var sStyle = htOptions.sStyle ; // css style
		var sClass = htOptions.sClass ; // css class

		var bFocus = htOptions.bFocus ; // is focus on
		var bFocusOutHide = htOptions.bFocusOutHide ; // hide when focus out

		var sPosX = htOptions.sPosX ; // Abolute Position X
		var sPosY = htOptions.sPosY ; // Abolute Position Y
		var ePosEvent = htOptions.ePosEvent ; // 

		var ePosRef = htOptions.ePosRef ; // Insert Reference (If exists this will override bAppend property)
		var sPosRef = htOptions.sPosRef ? htOptions.sPosRef : 'After' ; // Atfer[default] | Before | Inside

		var ePosWin = htOptions.ePosWin ? htOptions.ePosWin : window ; // window to create div
		var bAppend = htOptions.bAppend ; // appendChild div to body

		var eDiv = ePosWin.document.createElement ( 'DIV' ) ;
		eDiv.id = sID ;
		eDiv.innerHTML = sContent ;

		if ( sStyle ) { eDiv.style.cssText = sStyle ; }
		if ( sClass ) { eDiv.className = sClass ; }

		if ( ePosEvent ) {
			eDiv.style.left = getPosX(ePosEvent) ;
			eDiv.style.top = getPosY(ePosEvent) ;
		}

		if ( sPosX && sPosY ) {
			eDiv.style.left = parseInt(eDiv.style.left) + parseInt(sPosX) ;
			eDiv.style.top = parseInt(eDiv.style.top) + parseInt(sPosY) ;
		}

		if ( bFocusOutHide ) {
			eDiv.setAttribute ( 'onfocusout' , function () {
				this.style.display = 'none' ;
			}) ;
		}

		if ( bFocus ) { eDiv.focus () ; }

		if (ePosRef){
			this['add'+sPosRef](eDiv, ePosRef) ;
		} else if (bAppend) {
			this.addEvent(ePosWin, 'load', function(){
				ePosWin.document.body.appendChild(eDiv) ;
			}) ;
		}

		//eDiv.style.display = 'block' ;

		return eDiv ;
	},

	/**
	 * make Element
	 * 
	 * @function
	 * @param {hashTable} htOptions
	 * @return {element} <object>
	 */
	makeElement : function(htOptions){

		var sTagName = htOptions.tagName;
		var ePosRef = htOptions.ePosRef ; // Insert Reference (If exists this will override bAppend property)
		var sPosRef = htOptions.sPosRef ? htOptions.sPosRef : 'After' ; // Atfer[default] | Before | Inside
		var ePosWin = htOptions.ePosWin ? htOptions.ePosWin : window ; // window to create element
		var bAppend = htOptions.bAppend ; // appendChild element to body
		var oProperties = htOptions.oProperties ; // element properties
		var eElement = ePosWin.document.createElement (sTagName) ;

		if (oProperties) {
			for (var p in oProperties) {
				eElement[p] = oProperties[p] ;
			}
		}
		if (ePosRef){
			this['add'+sPosRef](eElement, ePosRef) ;
		} else if (bAppend) {
			ePosWin.document.body.appendChild(eElement) ;
		}

		return eElement ;
	},

	/**
	 * add Css
	 * 
	 * @function
	 * @param {String} str
	 * @param {element} window
	 * @return {element} Attached Element
	 */
	addCss : function(str, win){

		if(typeof win=='undefined'){
			win = window;
		}

		var headNode = win.document.getElementsByTagName('head')[0];

		var styleNode =  win.document.createElement('style');
		styleNode.setAttribute('type', 'text/css');

		// for IE
		if(styleNode.styleSheet){
			styleNode.styleSheet.cssText = str;
		// for anything else
		} else {
			var textNode = win.document.createTextNode(str);
			styleNode.appendChild(textNode);
		}

		return headNode.appendChild(styleNode);
	}
}


