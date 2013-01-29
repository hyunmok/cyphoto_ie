/**
 *
 * console.js
 *
 * 
 *
 * @internal ************************* [ file info. start ] *********************************
 *
 * @category		
 * @package		
 * @author		shim, heung woon <lumiel@skcomms.co.kr>
 * @filesource

 * @_uses		needs dom.js
 * @_todo			
 * @_tutorial		
 * @_version		
 * @_abstract
 * @_final			
 * @_internal
 * @_date			2011-01-13 오후 4:28:05
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

skFn.console = {

	/**
	 * Trace Position Reference Element
	 * 
	 * @property
	 */
	eTraceRef : document.body,

	/**
	 * Trace Position Reference Document
	 * 
	 * @property
	 */
	eTraceWin : window,

	/**
	 * trace counter
	 * 
	 * @property {Number}
	 */
	nTraceCounter : 0,

	/**
	 * running js file name
	 * 
	 * @property {Sting}
	 */
	sTraceJsFile : '',

	/**
	 * trace css is ready
	 * 
	 * @property {Boolean}
	 */
	bTraceCssReady : false,

	/**
	 * set running js file name
	 * 
	 * @function
	 * @param {String} sTraceJsFile
	 */
	setTraceJsFile : function(sTraceJsFile){
		this.sTraceJsFile = sTraceJsFile ;
	},

	/**
	 * set Trace InsertBefore Reference Element
	 * 
	 * @function
	 * @param {element} ePosRef : InsertBefore Reference
	 */
	setTraceRef : function(ePosRef){
		this.eTraceRef = ePosRef ;
	},

	/**
	 * set Trace Document
	 * 
	 * @function
	 * @param {element} eTraceDoc : (ex.) parent.window.document
	 */
	setTraceWin : function(eTraceWin){
		this.eTraceWin = eTraceWin ;
	},

	eTraceTable : null,

	eDivTrace : null,

	eDivTraceContent : null,

	defaultTop : 0,

	currentWidth : null,
	defaultWidth : 958,

	currentHeight : null,
	defaultHeight : 126,

	defaultTraceContentHeight : 96,

	rowLength : 4,

	/**
	 * setupConsole
	 * 
	 * @function
	 * @param {HashTable} p : (p.consoleTop: 높이, p.consoleOpacity:투명도)
	 */
	setupConsole : function (p) {
		var divConsole=document.getElementById('SceneConsole');
		if(divConsole){
			divConsole.style.top=parseInt(p.consoleTop)+parseInt(this.defaultTop)+'px';
			divConsole.style.opacity=p.consoleOpacity;
			divConsole.style.filter ? divConsole.style.filter='alpha(opacity : '+parseInt(p.consoleOpacity)*100+')' : null;
			divConsole.style.width=parseInt(p.consoleWidth)+parseInt(this.defaultWidth)+'px';
			divConsole.style.height=parseInt(p.consoleHeight)+parseInt(this.defaultHeight)+'px';
			var divTraceContent=document.getElementById('id_eDivTraceContent');
			if(divTraceContent){
				divTraceContent.style.height=parseInt(p.consoleHeight)+parseInt(this.defaultTraceContentHeight)+'px';
			}
			this.rowLength = p.rowLength;
		}
	},

	/**
	 * show console
	 * 
	 * @function
	 */
	on : function () {
		skTv.zone.show('Console');
	},

	/**
	 * hide console
	 * 
	 * @function
	 */
	off : function () {
		skTv.zone.hide('Console');
	},

	clearScreen : function(){
//		document.getElementById('id_eTableTrace').innerHTML='' ;
//		this.eTraceWin.skFn.console.eTraceTable.innerHTML='' ;
		var eTable = this.eTraceWin.skFn.console.eTraceTable ;
		for(var i=eTable.rows.length-1; i >= 0; i--){
			eTable.deleteRow(i)
		}
	},

	makeConsole : function(){

		if(this.bTraceCssReady == false) {

			var headNode = this.eTraceWin.document.getElementsByTagName('head')[0];

			var filterStr = ''
			if(window.navigator.appName=='Microsoft Internet Explorer'){
				filterStr = "		filter : alpha(opacity : 60);";
			}

			var sDebugCss =	"#SceneConsole {" +
							"		position : absolute;" +
							"		z-index : 99;" +
							"		color : #000;" +
							"		left : 0px;" +
							"		top : "+this.defaultTop+"px;" +
							"		width : "+this.defaultWidth+"px;" +
							"		height : "+this.defaultHeight+"px;" +
							"		background-color : transparent;" +
							"		border : 1px solid silver ;" +
							"		font-size : 8pt;" +
							"		padding : 0px;" +
							"		opacity : 0.6;" +
							filterStr +
							"}" +

							"#SceneConsole .string { color: #666; background-color: inherit; }" +
							"#SceneConsole .comment, .dp-highlighter .comments { color: #008200; background-color: inherit; }" +
							"#SceneConsole .preprocessor { color: gray; background-color: inherit; }" +
							"#SceneConsole .keyword { color: #0075c8; font-weight: bold; background-color: inherit; }" +
							"#SceneConsole .punctuator { color: green; background-color: inherit; }" +
							"#SceneConsole .literal { color: #933da6; background-color: inherit; }" +
							"#SceneConsole .jscore { color: #0075c8; background-color: inherit; }" +
							"#SceneConsole .method { color: #ff6c00; background-color: inherit; }" +
							"#SceneConsole .property { color: #ff7f7f; background-color: inherit; }" +
							"#SceneConsole .datatype { color: #9c7b50; background-color: inherit; }" +
							"#SceneConsole .zoneElement { color: #ef5204; background-color: inherit; }" +
							"#SceneConsole .skfn { color: #0080ff; background-color: inherit; }" +

							"#SceneConsole td { font:8pt tahoma }" +
							"#SceneConsole td.odd { background-color:#fff }" +
							"#SceneConsole td.even { background-color:#eee }" +
							"#SceneConsole td.traceNumber { width:22px; padding: 2px 0px 3px 6px; }" +
							"#SceneConsole td.traceTime { width:53px; padding: 2px 6px 3px 6px; color:#ff6c00; }" +
							"#SceneConsole td.traceFile { width:73px; padding: 2px 8px 3px 7px; color:#0087dc; border-left:1px solid #ccc; }" +
//							"#SceneConsole td.traceContent { word-break:break-all; word-wrap:break-word; padding: 5px 7px 6px 7px; border-left:1px solid #ccc; line-height:11pt; }" +
							"#SceneConsole td.traceContent { word-wrap:break-word; padding: 5px 7px 6px 7px; border-left:1px solid #ccc; line-height:11pt; }" +
							"#SceneConsole td.traceGraph { width:250px; padding: 2px 6px 3px 6px; color:#004080; border-left:1px solid #ccc; }" +

							"#SceneConsole input {font-family:arial}" +

							"#SceneConsole div.subject {border-bottom:1px solid silver; background-color:#eee; padding:5px; font-family:arial; font-weight : bold; }" +
							"#SceneConsole div.subject  input {font-size:8pt}" ;

			var styleNode =  this.eTraceWin.document.createElement('style');
			styleNode.setAttribute('type', 'text/css');

			// for IE
			if(styleNode.styleSheet){
				styleNode.styleSheet.cssText = sDebugCss;
			// for everyone else
			} else {
				var textNode = document.createTextNode(sDebugCss);
				styleNode.appendChild(textNode);
			}

			if ( headNode.appendChild(styleNode) ) {
				this.bTraceCssReady = true ;
			}
		}


		if ( !this.eTraceWin.skFn.console.eDivTrace ) {

			this.eTraceWin.skFn.console.eDivTrace = skFn.dom.makeDiv ({
				sID : 'SceneConsole',
				sStyle : '',
				ePosWin : this.eTraceWin,
				ePosRef : this.eTraceRef,
				sPosRef : 'Inside',
				bAppend : true ,
				sContent : "<div class='subject'><span id='span_ctl'>Debug Console &nbsp; <input type='button' value='CLEAR LOG' onclick='skFn.console.clearScreen()' /> </span><input type='button' value='CLOSE' id='input_toggle' /></div>"
			}) ;

			this.eTraceWin.skFn.console.eDivTraceContent = skFn.dom.makeDiv ({
				sID : 'id_eDivTraceContent',
				sStyle : 'border:0; padding:0px ; margin:0; overflow : auto; height:102px',
				ePosWin : this.eTraceWin,
				ePosRef : this.eTraceWin.skFn.console.eDivTrace.lastChild,
				sPosRef : 'After',
				bAppend : true
			}) ;

			this.eTraceWin.skFn.console.eTraceTable = skFn.dom.makeTable ({
				sID : 'id_eTableTrace',
				sStyle : 'border:0; table-layout:fixed; width:100%',
				sClass : '',
				ePosWin : this.eTraceWin,
				ePosRef : this.eTraceWin.skFn.console.eDivTraceContent,
				sPosRef : 'Inside',
				bAppend : true,
				oProperties : {border:0, cellPadding:0, cellSpacing:0}
			}) ;

		}
	},

	traceTimeBefore : 0,

	/**
	 * trace
	 * 
	 * @function
	 * @param {String} sContent
	 * @param {Boolean} isAlert 경고인가 (Default : false)
	 */
	trace : function	( sContent, isAlert ) {

		var eDivTrace, eDivTraceContent, nRemainder=0 ;

		if ( !sContent ) { sContent = ''; } else { sContent = sContent.toString(); }

		if(this.traceTimeBefore==0){
			this.traceTimeBefore = skFn.string.getTimeMili();
		}

		// 행을 넣는다

		var eTable, eTr=[], eTd=[], miliSecNow, miliSecDiff;

		try {

			var sTitle = '';

			if( isAlert ) {
				sTitle = "<span style='color:red'><b>[error]</b></span> " ;
			}

			nRemainder = this.eTraceWin.skFn.console.nTraceCounter%2 ;
			miliSecNow = skFn.string.getTimeMili();
			miliSecDiff = (miliSecNow - this.traceTimeBefore)*100;
			widthDiff = parseInt(miliSecDiff);
			this.traceTimeBefore = miliSecNow;

			eTable = this.eTraceWin.skFn.console.eTraceTable ;

//			eTr = eTable.insertRow(eTable.rows.length) ;
			eTr = eTable.insertRow(0) ;

			eTd = eTr.insertCell(0) ;
			eTd.className = nRemainder ? 'traceNumber even' : 'traceNumber odd' ;
			eTd.innerHTML = '<b>' + skFn.string.strpad( ++this.eTraceWin.skFn.console.nTraceCounter , '0', 3 ) + '</b>' ;

			eTd = eTr.insertCell(1) ;
			eTd.className = nRemainder ? 'traceTime even' : 'traceTime odd' ;
			eTd.innerHTML = skFn.string.getTimeMSM() ;

			eTd = eTr.insertCell(2) ;
			eTd.className = nRemainder ? 'traceFile even' : 'traceFile odd' ;
			eTd.innerHTML = this.sTraceJsFile ;

			eTd = eTr.insertCell(3) ;
			eTd.className = nRemainder ? 'traceContent even' : 'traceContent odd' ;
			eTd.innerHTML = sTitle + this.highLight(sContent) ;

			// 삼성 TV 일때
			var graphImagePath = 'skcomms/skTvFrw/resources/img/graph.png';

			// 삼성 TV 아닐 때
			if(skEnv.device.vendor!='samsung'){
				graphImagePath = '../../../'+graphImagePath;
			}

			eTd = eTr.insertCell(4) ;
			eTd.className = nRemainder ? 'traceGraph even' : 'traceGraph odd' ;
			eTd.innerHTML = /(Key map is|handleFocus|handleBlur)/.test(sContent) ? '' : "<img src='"+graphImagePath+"' style='width:"+widthDiff+"px; height:10px;' /> " + Math.round(miliSecDiff) ;

			// 삼성 TV
			if(skEnv.device.vendor=='samsung'){
				$(eTable).html($(eTable.rows).slice(this.rowLength*-1));
			}

		} catch(e) {

//			alert ( 'name : ' + e.name + ' message : ' + e.message ) ;
		}
	},

	/**
	 * get HighLight of Code
	 * 
	 * @function
	 * @param {String} sString
	 * @return {String}
	 * @seeallso http://code.google.com/p/syntaxhighlighter/
	 */
	highLight : function( sString ) {

		var Chop = function(str){
			return str.replace(/\n*$/, '').replace(/^\n*/, '');
		}

		var Unindent = function(str){

			var lines = str.split('\n');
			var indents = new Array();
			var regex = new RegExp('^\\s*', 'g');
			var min = 1000;

			// go through every line and check for common number of indents
			for(var i = 0; i < lines.length && min > 0; i++){

				if(skFn.string.trim(lines[i]).length == 0){
					continue;
				}

				var matches = regex.exec(lines[i]);

				if(matches != null && matches.length > 0){
					min = Math.min(matches[0].length, min);
				}
			}

			// trim minimum common number of white space from the begining of every line
			if(min > 0){
				for(var i = 0; i < lines.length; i++){
					lines[i] = lines[i].substr(min);
				}
			}

			return lines.join('\n');
		}

		// This function returns a portions of the string from pos1 to pos2 inclusive
		var Copy = function(sString, pos1, pos2){
			return sString.substr(pos1, pos2 - pos1);
		}

		var originalCode=sString;
		var srcCode=Chop(Unindent(sString));
		var tabsToSpaces=true;

		var ProcessSmartTabs = function(code){

			var lines	= code.split('\n');
			var result	= '';
			var tabSize	= 4;
			var tab		= '\t';

			// This function inserts specified amount of spaces in the string
			// where a tab is while removing that given tab. 
			function InsertSpaces(line, pos, count){

				var left	= line.substr(0, pos);
				var right	= line.substr(pos + 1, line.length);	// pos + 1 will get rid of the tab
				var spaces	= '';
				
				for(var i = 0; i < count; i++) {
					spaces += ' ';
				}
				
				return left + spaces + right;
			}

			// This function process one line for 'smart tabs'
			function ProcessLine(line, tabSize){

				if(line.indexOf(tab) == -1){
					return line;
				}

				var pos = 0;

				while((pos = line.indexOf(tab)) != -1){

					// This is pretty much all there is to the 'smart tabs' logic.
					// Based on the position within the line and size of a tab, 
					// calculate the amount of spaces we need to insert.
					var spaces = tabSize - pos % tabSize;

					line = InsertSpaces(line, pos, spaces);
				}

				return line;
			}

			// Go through all the lines and do the 'smart tabs' magic.
			for(var i=0; i < lines.length; i++){
				result += ProcessLine(lines[i], tabSize) + '\n';
			}

			return result;
		}

		// replace tabs with spaces
		if(tabsToSpaces == true){
			srcCode = ProcessSmartTabs(srcCode);
		}

		var keywords =	'abstract break byte case catch char class const continue debugger ' +
			'default delete do double else enum export extends final finally float ' +
			'for function goto if implements import in instanceof int interface long native ' +
			'new package private protected public return short static super switch ' +
			'synchronized throw throws transient try var void volatile while with';

		var punctuators = '= , . ; : { } [ ] ( ) ? ! * ^';
		var literals = 'this true false null undefined';
		var jscores = 'String Number Boolean RegExp Array Object Date Math Function';
		var methods = 'call apply typeof replace exec join split prototype toString indexOf substr';
		var properties = 'arguments length index constructor className innerHTML http';
		var datatypes = 'object string number array boolean';
		var zoneElements = 'zone focus blur show hide handleKeyDown';
		var skfns = 'skFn skTv array class console debug dom string xhr gateway PagingComponent';

		var regExList = [
			{ regex: new RegExp('//.*$', 'gm'), css: 'comment' }, // single line comments
			{ regex: new RegExp('/\\*[\\s\\S]*?\\*/', 'gm'), css: 'comment' }, // multi line comments
			{ regex: new RegExp("'(?:\\.|(\\\\\\')|[^\\''\\n])*'", 'g'), css: 'string' }, // single quoted strings
			{ regex: new RegExp('"(?:\\.|(\\\\\\")|[^\\""\\n])*"','g'), css: 'string' }, // double quoted strings
			{ regex: new RegExp('^\\s*#.*', 'gm'), css: 'preprocessor' }, // preprocessor tags like #region and #endregion
			{ regex: new RegExp('\\b' + keywords.replace(/ /g, '\\b|\\b') + '\\b', 'gm'), css: 'keyword' }, // keywords
			{ regex: new RegExp('\\b' + literals.replace(/ /g, '\\b|\\b') + '\\b', 'gm'), css: 'literal' }, // literals
			{ regex: new RegExp('\\b' + jscores.replace(/ /g, '\\b|\\b') + '\\b', 'gm'), css: 'jscore' }, // jscores
			{ regex: new RegExp('\\b' + methods.replace(/ /g, '\\b|\\b') + '\\b', 'gm'), css: 'method' }, // jscores
			{ regex: new RegExp('\\b' + properties.replace(/ /g, '\\b|\\b') + '\\b', 'gm'), css: 'property' }, // properties
			{ regex: new RegExp('\\b' + datatypes.replace(/ /g, '\\b|\\b') + '\\b', 'gm'), css: 'datatype' }, // datatypes
			{ regex: new RegExp('\\b' + zoneElements.replace(/ /g, '\\b|\\b') + '\\b', 'gm'), css: 'zoneElement' }, // zoneElements
			{ regex: new RegExp('\\b' + skfns.replace(/ /g, '\\b|\\b') + '\\b', 'gm'), css: 'skfn' }, // skfns
			{ regex: new RegExp('\\' + punctuators.replace(/ /g, '|\\'), 'gm'), css: 'punctuator' } // punctuators
		] ;

		var sResult='', oMatch=null, nIndex=0, aMatches=[] ;

		for(var i = 0; i < regExList.length; i++) {

			while((oMatch = regExList[i].regex.exec(srcCode)) != null) {

				sResult += 

				aMatches[aMatches.length] = {
					'value' : oMatch[0],
					'index' : oMatch.index,
					'length' : oMatch[0].length,
					'css' : regExList[i].css
				};
			}
		}

		// sort the matches
		aMatches.sort(function(m1, m2){
			// sort matches by index first
			if (m1.index < m2.index) {
				return -1;
			} else if (m1.index > m2.index) {
				return 1;
			} else {
				// if index is the same, sort by length
				if(m1.length < m2.length) {
					return -1;
				} else if (m1.length > m2.length) {
					return 1;
				}
			}
			return 0;
		});

		var IsInside = function(oMatch){
			if(oMatch == null || oMatch.length == 0) {
				return false;
			}
			for(var i = 0; i < aMatches.length; i++){
				var c = aMatches[i];
				if(c == null){
					continue;
				}
				if((oMatch.index > c.index) && (oMatch.index < c.index + c.length)){
					return true;
				}
			}
			return false;
		}

		var sToken = [] ;

		var AddBit = function(str, css){

			if(str == null || str.length == 0){
				return;
			}

		//	str = str.replace(/&/g, '&amp;');
			str = str.replace(/ /g, '&nbsp;');
			str = str.replace(/</g, '&lt;');
		//	str = str.replace(/&lt;/g, '<');
		//	str = str.replace(/>/g, '&gt;');
			str = str.replace(/\n/gm, '&nbsp;<br />');

		//	sToken[sToken.length] = 'str:<b>' + str + '</b>, css:<b>' + css + '</b>' ;

			// when adding a piece of code, check to see if it has line breaks in it 
			// and if it does, wrap individual line breaks with span tags
			if(css != null){

				if((/br/gi).test(str)){

					var lines = str.split('&nbsp;<br />');

					for(var i = 0; i < lines.length; i++){

						sToken[sToken.length] = "<span class='"+css+"'>"+lines[i]+"</span>";

						// don't add a <BR> for the last line
						if(i + 1 < lines.length){
							sToken[sToken.length] = '<br />' ;
						}
					}

				} else {
					sToken[sToken.length] = "<span class='"+css+"'>"+str+"</span>";
				}

			} else {
				sToken[sToken.length] = str;
			}


		} // eo AddBit = function()

		// The following loop checks to see if any of the matches are inside
		// of other matches. This process would get rid of highligted strings
		// inside comments, keywords inside strings and so on.
		for(var i = 0; i < aMatches.length; i++) {
			if(IsInside(aMatches[i])) {
				aMatches[i] = null;
			}
		}

		// Finally, go through the final list of matches and pull the all
		// together adding everything in between that isn't a match.

		var pos = 0;

		for( var i=0; i < aMatches.length; i++ ){

			var oMatch = aMatches[i];

			if(oMatch == null || oMatch.length == 0){
				continue;
			}

			AddBit(Copy(srcCode, pos, oMatch.index), null);
			AddBit(oMatch.value, oMatch.css);

			pos = oMatch.index + oMatch.length;
		}

		AddBit(srcCode.substr(pos), null);

		return sToken.join('') ;

/*
		var sTmp=[], sToken=[] ;
		for( var i=0 ; i < aMatches.length ; i++ ){
			sToken = [] ;
			for( var x in aMatches[i] ) {
				sToken[sToken.length] = x + ':' + aMatches[i][x]  ;
			}
			sTmp[sTmp.length] = sToken.join(', ') ;
		}
		return sTmp.join('<br />') ;
*/

//		return aMatches ;
	}

}; // eo skFn.console


// 페이지가 모두 로드되었다면 콘솔을 초기화하고 보여준다
skFn.dom.addEvent(window, 'load', init_console);

function init_console(){
	if(skEnv.debug.viewMode=='screen' && skEnv.debug.logLevel > 0){
		skFn.console.setTraceRef(document.body);
		skFn.console.makeConsole();
		if(typeof zone == 'undefined'){
			zone = {}; // zone이 없다면 만든다(zone 정의가 없을 경우 생성을 위해)
		}
		zone['Console'] = {
			initialize : function(){},
			handleShow : function(){},
			handleHide : function(){},
			handleFocus : function(){},
			handleBlur : function(){},
			handleKeyDown : function(keyCode){
				switch (keyCode) {
					case skTv.keymap.RIGHT:
						break;
				}
			}
		}

		if(window.navigator.appName=='Microsoft Internet Explorer'){
			skFn.console.setupConsole({consoleTop:412, consoleOpacity:1, consoleWidth:0, consoleHeight:58});
		}else{
			skFn.console.off();
		}

		// toggle

		$('#input_toggle').click(function() {
			$('#id_eDivTraceContent').animate(
				{height: 'toggle'},
				500,
				function() {
					if($('#id_eDivTraceContent').css('display')=='none'){
						$('#SceneConsole').css({'border-width':0});
						$('#SceneConsole div.subject').css({'border-bottom-width':0, 'background-color':'transparent'});
						$('#input_toggle').val('OPEN');
						$('#span_ctl').hide();
						skFn.console.currentWidth = $('#SceneConsole').width();
						skFn.console.currentHeight = $('#SceneConsole').height();
						$('#SceneConsole').css({'width':87});
						$('#SceneConsole').css({'height':30});
					}else{
						$('#SceneConsole').css({'width':skFn.console.currentWidth});
						$('#SceneConsole').css({'height':skFn.console.currentHeight});
						$('#SceneConsole').css({'border-width':1});
						$('#SceneConsole div.subject').css({'border-bottom-width':1, 'background-color':'#eee'});
						$('#input_toggle').val('CLOSE');
						$('#span_ctl').show();
					}
				});
		});
	}
}