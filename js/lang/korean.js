/**
 * Korean
 */

var imeLanguageInfo = {
	pageCnt 	: 4,
	mode 		: new Number(),
	STYLE_LABEL : " ",
	miniPopUpInfoObjects : "",
	
	firstIdx 	: new Number(),
	secondIdx 	: new Number(),
	thirdIdx 	: new Number(),
	doubleBottomIdx : new Number(),
	mode 		: new Number(),
	historyLst 	: new Array(),
	lastInputChar 	: new String(),
	isScreen 	: true,	
	
	firstLst 	: ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"],
	secondLst 	: ["ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ","ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ"],
	thirdLst 	: ["//","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"],
	keyboardLst : ["ㅁ","ㅠ","ㅊ","ㅇ","ㄷ","ㄹ","ㅎ","ㅗ","ㅑ","ㅓ","ㅏ","ㅣ","ㅡ","ㅜ","ㅐ","ㅔ","ㅂ","ㄱ","ㄴ","ㅅ","ㅕ","ㅍ","ㅈ","ㅌ","ㅛ","ㅋ"],
	twinConsonantLst : ["ㄲ","ㄸ","ㅃ","ㅆ","ㅉ"],
	hangleKeyLst : ["ㄲ","ㄸ","ㅃ","ㅆ","ㅉ","ㅁ","ㅠ","ㅊ","ㅇ","ㄷ","ㄹ","ㅎ","ㅗ","ㅑ","ㅓ","ㅏ","ㅣ","ㅡ","ㅜ","ㅐ","ㅔ","ㅂ","ㄱ","ㄴ","ㅅ","ㅕ","ㅍ","ㅈ","ㅌ","ㅛ","ㅋ"],
	doubleFirstLst : new Array(),
	doubleSecondLst : new Array(),
	doubleBottomLst : new Array(),

	BASE_JISU : 44032,
	CHOSUNG_K : 588,
	JUNGSUNG_K : 28,

	kDIdx : 0,
	chIdx:20,
	chTggIdx : null, 
	
	initialize : function (inputName) {
		skFn.debug.log('[korea.js]' + 'initialize');
		
		this.chTggIdx = 0;
		this.chIdx = 20;
		//document.getElementById("wkk_tx").style.textAlign= 'left';		
		document.getElementById(inputName).style.textAlign= 'left';
		
		this.miniPopUpInfoObjects[0] = "";
		this.miniPopUpInfoObjects[1] = "";
		this.miniPopUpInfoObjects[2] = "";
		this.miniPopUpInfoObjects[3] = "";
		this.miniPopUpInfoObjects[4] = "";
		this.miniPopUpInfoObjects[5] = "";
		this.miniPopUpInfoObjects[6] = "";
		this.miniPopUpInfoObjects[7] = "";
		this.miniPopUpInfoObjects[8] = "";
		this.miniPopUpInfoObjects[9] = "";
		
		this.doubleFirstLst[0] = new Array("ㄱ");
		this.doubleFirstLst[3] = new Array("ㄷ");
		this.doubleFirstLst[7] = new Array("ㅂ");
		this.doubleFirstLst[9] = new Array("ㅅ");
		this.doubleFirstLst[12] = new Array("ㅈ");

		this.doubleSecondLst[2] = new Array("ㅣ");
		this.doubleSecondLst[6] = new Array("ㅣ");
		this.doubleSecondLst[8] = new Array("ㅏ","ㅐ","ㅣ");
		this.doubleSecondLst[13] = new Array("ㅓ","ㅔ","ㅣ");
		this.doubleSecondLst[18] = new Array("ㅣ");

		this.doubleBottomLst[1] = new Array("ㄱ","ㅅ");
		this.doubleBottomLst[4] = new Array("ㅈ","ㅎ");
		this.doubleBottomLst[8] = new Array("ㄱ","ㅁ","ㅂ","ㅅ","ㅌ","ㅍ","ㅎ");
		this.doubleBottomLst[17] = new Array("ㅅ");
		this.doubleBottomLst[19] = new Array("ㅅ");
		
	},
	
	/**
	 * pre processing define when key pressed (for combination charset ex> hangle)
	 * @param nMode
	 * @return
	 */
	setNewMode : function (nMode) {
		skFn.debug.log('[korea.js]' + 'setNewMode => nMode : ' + nMode);
		this.mode = new Number(nMode);
		if(this.mode == 0) {
			this.historyLst = null;
			this.historyLst = new Array();
			this.initializeIndex();
		}
	},
	
	initializeIndex :function () {
		skFn.debug.log('[korea.js]' + 'initializeIndex');
		this.firstIdx = -1;
		this.secondIdx = -1;
		this.thirdIdx = -1;
		this.doubleBottomIdx = -1;
	},
	
	/**
	 * Numeric key display on screen.
	 * @param currPageIdx
	 * @return truel/false
	 */
	isNumericKeyActivated : function (currPageIdx) {
		skFn.debug.log('[korea.js]' + 'isNumericKeyActivated');
		if(currPageIdx==1 || currPageIdx == 2 ) {
			return true;
		} else {
			return false;
		}
	},
	
	getInitialObj : function ( c ) {
		skFn.debug.log('[korea.js]' + 'getInitialObj');
		var obj = new Object();
		obj.firstIdx = this.firstIdx;
		obj.secondIdx = this.secondIdx;
		obj.thirdIdx = this.thirdIdx;
		obj.doubleBottomIdx = this.doubleBottomIdx;
		obj.newFirstIdx = -1;
		obj.newSecondIdx = -1;
		obj.newThirdIdx = -1;
		obj.isCompleted = false;
		obj.inputChar = c;
		obj.resultChar = "";
		obj.newChar = "";
		obj.mode = this.mode;
		return obj;
	},
	
	/**
	 * add space to textbox's content
	 * @return
	 */
	//addSpaceText : function () {	=> 모듈화로 작업으로 수정(by sophia)
	addSpaceText : function (gubun, inputName) {
		skFn.debug.log('[korea.js]' + 'addSpaceText');
		this.setNewMode(0);
		this.appendText(gubun, inputName, " ");
		this.lastInputChar = " ";
	},
	
	/**
	 * backspace text
	 * @return
	 */
	//backspaceText : function () { => 모듈화로 작업으로 수정(by sophia)
	backspaceText : function (inputName) {
		skFn.debug.log('[korea.js]' + 'backspaceText');
		var textItem = document.getElementById(inputName);
		
		if( textItem != null) {
			var isKor = LGImeComponent.isCaretActivated();
			if (isKor) {
				this.doSomeAfterPressMuteForHangul();
			} else {
				//alert("ELSE");
				LGImeComponent.deletePrevChar();
			}
		}
	},
	
	getArrayIndex : function ( array, str, defaultValue) {
		skFn.debug.log('[korea.js]' + 'getArrayIndex');
		var dv = new Number(defaultValue);
		if(array != null && array.length > 0 ) {
			for( var i = 0 ; i < array.length ; i++ ) {
				if( array[i] == str) {
					dv = i;
					break;
				}
			}
		}
		return dv;
	}, 	
	
	getLastInputChar : function () {
		skFn.debug.log('[korea.js]' + 'getLastInputChar');
		var kHistory = this.historyLst[this.historyLst.length -1];
		if(kHistory == null) {
			return null;
		}
		return kHistory.inputChar;
	},
	
	checkDoubleFirstConsonant : function( prevCons, curCons) {
		skFn.debug.log('[korea.js]' + 'checkDoubleFirstConsonant => prevCons : ' + prevCons + ', curCons : ' + curCons);
		var kIdx = 0;
		for ( kIdx = 0 ; kIdx < this.firstLst.length ; kIdx++ ) {
			if(	this.firstLst[kIdx] == prevCons ) {
				break;
			}
		}
		var kDoubleFirstLst = this.doubleFirstLst[kIdx];
		if ( kDoubleFirstLst != null && kDoubleFirstLst.length > 0 ) {
			var isFound = 0;
			for( kIdx = 0 ; kIdx < kDoubleFirstLst.length ; kIdx ++ ) {
				if( kDoubleFirstLst[kIdx] == curCons ) {
					isFound = 1;
					break;
				}
			}
			if(isFound == 1 ) {
				return kIdx;
			} else {
				return -1;
			}
		}
		return -1;
	},
	
	getIsTwinWithChar : function ( c ) {
		skFn.debug.log('[korea.js]' + 'getIsTwinWithChar');
		var idx = -1;
		for( var i = 0 ; i < this.twinConsonantLst.length ; i++ ) {
			if(this.twinConsonantLst[i] == c ) {
				idx = i;
				break;
			}
		}

		skFn.debug.log('[korea.js]' + 'getIsTwinWithChar => idx : ' + idx);

		if ( idx > -1 ) {
			return true;
		} else {
			return false;
		}
	},
	
	getIsTwinWithFirstIdx : function ( idx ) {
		skFn.debug.log('[korea.js]' + 'getIsTwinWithFirstIdx');
		var kChar = this.firstLst[idx];
		skFn.debug.log('[korea.js]' + 'getIsTwinWithFirstIdx => kChar : ' + kChar);
		return this.getIsTwinWithChar(kChar);
	},
	
	doublizeThirdIdx : function ( t, db) {
		skFn.debug.log('[korea.js]' + 'doublizeThirdIdx');
		return new Number(t) + new Number(db) +1;
	},
	
	doSomeWhenConsonant : function ( result ) {
		skFn.debug.log('[korea.js]' + 'doSomeWhenConsonant');
		var kChar = result.inputChar;
		var kLastChar = this.getLastInputChar();

		if( this.mode == 0) {
			this.firstIdx = this.getArrayIndex(this.firstLst, kChar, -1);
			this.setNewMode(1);
			result.firstIdx = this.firstIdx;
		} else if ( this.mode == 1) {
			var kSubDFIdx = this.checkDoubleFirstConsonant( kLastChar, kChar);
			if(kSubDFIdx == -1) {
				this.initializeIndex();
				this.firstIdx = this.getArrayIndex(this.firstLst, kChar, -1);
				this.setNewMode(1);
				result.isCompleted = true;
				result.newFirstIdx = this.firstIdx;
			} else {
				var kTwin = this.getIsTwinWithFirstIdx(this.firstIdx);
				if(kTwin) {
					this.initializeIndex();
					this.firstIdx = this.getArrayIndex(this.firstLst, kChar, -1);
					this.setNewMode(1);
					result.isCompleted = true;
					result.newFirstIdx = this.firstIdx;
				} else {
					this.firstIdx = new Number(this.firstIdx) + new Number(kSubDFIdx) + 1;
					this.setNewMode(1);
					result.firstIdx = this.firstIdx;
				}
			}
		} else if ( this.mode == 2) {
			if ( this.firstIdx == -1) {
				this.initializeIndex();
				this.firstIdx = this.getArrayIndex(this.firstLst, kChar, -1);
				this.setNewMode(1);
				result.isCompleted = true;
				result.newFirstIdx = this.firstIdx;
			} else {
				this.thirdIdx = this.getArrayIndex(this.thirdLst, kChar, -1);

				if (this.thirdIdx != -1) {
					this.setNewMode(3);
					result.thirdIdx = this.thirdIdx;				
				} else {
					this.initializeIndex();
					this.firstIdx = this.getArrayIndex(this.firstLst, kChar, -1);
					this.setNewMode(1);
					result.isCompleted = true;
					result.newFirstIdx = this.firstIdx;
				}
			}
		} else if ( this.mode == 3) {
			var kSubDBLst = this.doubleBottomLst[this.thirdIdx];
			if(kSubDBLst == null || kSubDBLst.length == 0 ) {
				var kSubDFIdx = this.checkDoubleFirstConsonant(kLastChar, kChar);
				if(kSubDFIdx == -1) {
					this.initializeIndex();
					this.firstIdx = this.getArrayIndex(this.firstLst, kChar, -1);
					this.setNewMode(1);
					result.isCompleted = true;
					result.newFirstIdx = this.firstIdx;
				} else {
					var kDTIdx = this.revertThirdIdx(this.thirdIdx, this.doubleBottomIdx);
					this.initializeIndex();

					this.firstIdx = this.getArrayIndex(this.firstLst, this.thirdLst[kDTIdx], -1);
					this.firstIdx = new Number(this.firstIdx) + new Number(kSubDFIdx) + 1;
					this.setNewMode(1);

					result.isCompleted = true;
					result.newFirstIdx = this.firstIdx;
					result.thirdIdx = -1;
				}
			} else {
				this.doubleBottomIdx = this.getArrayIndex(kSubDBLst, kChar, -1);
				if( this.doubleBottomIdx == -1) {
					this.initializeIndex();
					this.setNewMode(1);
					this.firstIdx = this.getArrayIndex(this.firstLst, kChar, -1);
					result.isCompleted = true;
					result.newFirstIdx = this.firstIdx;
				} else {
					this.setNewMode(4);
					this.thirdIdx = this.doublizeThirdIdx(this.thirdIdx, this.doubleBottomIdx);
					result.thirdIdx = this.thirdIdx;
				}
				result.doubleBottomIdx = this.doubleBottomIdx;
			}
		} else if ( this.mode == 4) {
			var kSubDFIdx = this.checkDoubleFirstConsonant(kLastChar, kChar);
			if(kSubDFIdx == -1) {
				this.initializeIndex();
				this.setNewMode(1);
				this.firstIdx = this.getArrayIndex(this.firstLst, kChar, -1);
				result.isCompleted = true;
				result.newFirstIdx = this.firstIdx;
			} else {
				var kThirdIdx = this.revertThirdIdx(this.thirdIdx, this.doubleBottomIdx);
				this.initializeIndex();
				this.setNewMode(1);
				var kIdx = this.getArrayIndex(this.firstLst, kChar, -1);
				this.firstIdx = new Number(kIdx) + new Number(kSubDFIdx) + 1;

				result.isCompleted = true;
				result.thirdIdx = kThirdIdx;
				result.newFirstIdx = this.firstIdx;
				result.doubleBottomIdx = -1;
				this.doubleBottomIdx = -1;
			}
		}
	},
	
	revertThirdIdx : function ( t, db ) {
		skFn.debug.log('[korea.js]' + 'revertThirdIdx');
		return new Number(t) - new Number(db) -1;
	},
	
	doSomeWhenVowel : function (result) {
		skFn.debug.log('[korea.js]' + 'doSomeWhenVowel');
		var kChar = result.inputChar;
		var kLastChar = this.getLastInputChar();
		//skFn.debug.log('doSomeWhenVowel => this.mode' + this.mode);
		if( this.mode == 0) {
			this.setNewMode(0);
			var kSecondIdx = this.getArrayIndex(this.secondLst, kChar, -1);
			result.isCompleted = true;
			//result.secondIdx = this.getArrayIndex(secondLst, kLastChar, -1);;
			result.secondIdx = kSecondIdx;
		} else if (this.mode == 1) {
			this.secondIdx = this.getArrayIndex(this.secondLst,kChar,-1);
			this.setNewMode(2);
			result.secondIdx = this.secondIdx;
		} else if ( this.mode == 2) {
			var kSubDSLst = this.doubleSecondLst[this.secondIdx];
			
			if( this.isScreen && kChar =="ㅣ") {
				if(kLastChar == "ㅑ" || kLastChar == "ㅕ") {
					kSubDSLst = null;
				}
			}
			if(kSubDSLst == null || kSubDSLst.length == 0) {
				this.setNewMode(0);
				var kSecondIdx = this.getArrayIndex(this.secondLst, kChar, -1);
				result.isCompleted = true;
				result.newSecondIdx = kSecondIdx;
			} else {
				var kSubDSIdx = this.getArrayIndex(kSubDSLst, kChar, -1);
				if(kSubDSIdx == -1) {
					this.setNewMode(0);
					var kSecondIdx = this.getArrayIndex(this.secondLst, kChar, -1);
					result.isCompleted = true;
					result.newSecondIdx = kSecondIdx;
				} else {
					this.secondIdx = new Number(this.secondIdx) + new Number(kSubDSIdx) + 1;
					this.setNewMode(2);
					result.secondIdx = this.secondIdx;
				}
			}
			
		} else if ( this.mode == 3) {
			this.initializeIndex();
			this.firstIdx = this.getArrayIndex(this.firstLst, kLastChar, -1);
			this.secondIdx = this.getArrayIndex(this.secondLst, kChar, -1);
			this.setNewMode(2);
			result.isCompleted = true;
			result.thirdIdx = -1;
			result.newFirstIdx = this.firstIdx;
			result.newSecondIdx = this.secondIdx;
			
		} else if ( this.mode == 4) {
			var kFirstIdx = this.getArrayIndex(this.firstLst, this.thirdLst[this.thirdIdx], -1);
			if(kFirstIdx == -1) {
				var kThirdIdx = this.revertThirdIdx(this.thirdIdx, this.doubleBottomIdx);
				this.initializeIndex();
				this.firstIdx = this.getArrayIndex(this.firstLst, kLastChar, -1);
				this.secondIdx = this.getArrayIndex(this.secondLst, kChar, -1);
				this.setNewMode(2);
				result.isCompleted = true;
				result.thirdIdx = kThirdIdx;
				result.newFirstIdx = this.firstIdx;
				result.newSecondIdx = this.secondIdx;
				result.doubleBottomIdx = this.doubleBottomIdx = -1;
			} else {
				this.initializeIndex();
				this.firstIdx = kFirstIdx;
				this.secondIdx = this.getArrayIndex(this.secondLst, kChar, -1);
				this.setNewMode(2);
				result.isCompleted = true;
				result.thirdIdx = this.thirdIdx;
				result.newFirstIdx = this.firstIdx;
				result.newSecondIDx = this.secondIdx;
			}
		}
	},
	
	getKoreanChar : function ( first, second, third ) {
		skFn.debug.log('[korea.js]' + 'getKoreanChar => first : ' + first + ', second : ' + second + ', third : ' + third);
		var f = new Number(first);
		var s = new Number(second);
		var t = new Number(third);
		if( f == -1) {
			if(s == -1 ) {
				return "";
			} else {
				return this.secondLst[s];
			}
		} else if (s == -1) {
			return this.firstLst[f];
		}
		f = new Number(this.CHOSUNG_K) * f;
		s = new Number(this.JUNGSUNG_K) * s;
		t = (t == -1) ? 0 : t;
		return String.fromCharCode(this.BASE_JISU+ f + s + t);
	},
	
	compound : function (result) {
		skFn.debug.log('[korea.js]' + 'compound');
		var kInputChar = result.inputChar;
		var kIsConsonant = false;
		if(this.getArrayIndex(this.firstLst, kInputChar, -1) > -1) {
			kIsConsonant = true;
		}
		if(kIsConsonant) {
			//alert("Consonant");
			this.doSomeWhenConsonant(result);
		} else {
			//alert("Vowel");
			this.doSomeWhenVowel(result);
		}
		
		//alert(result.firstIdx)
		//alert(result.secondIdx)
		//alert(result.thirdIdx)		
		result.resultChar = this.getKoreanChar(result.firstIdx, result.secondIdx, result.thirdIdx);
		result.newChar = this.getKoreanChar(result.newFirstIdx, result.newSecondIdx, result.newThirdIdx);
		result.newMode = this.mode;

		skFn.debug.log('[korea.js]' + 'compound => result.inputChar :' + result.inputChar + ', result.resultChar : ' + result.resultChar + ', result.newChar : ' + result.newChar +
				', result.newMode : ' + result.newMode);
	},
	
	getHangul : function ( c ) {
		skFn.debug.log('[korea.js]' + 'getHangul');
		var kResult = this.getInitialObj(c);
		this.compound(kResult);

		if(kResult.isCompleted) {
			this.historyLst = null;
			this.historyLst = new Array();
		}
		this.historyLst.push(kResult);
		this.lastInputChar = c;
		return kResult;
	},	
	
	putStrIntoFldForHangul : function (str, idx, selected) {
		skFn.debug.log('[korea.js]' + 'putStrIntoFldForHangul => str : ' + str+ ', idx : '+ idx+ ', selected'+selected);
		var kStr = (str == null) ? "" : str;
		var kSeletected = selected == null ? true : selected;

		LGImeComponent.setTextContent(kStr);
		if (kStr.length == 0) {
			LGImeComponent.setCaretPosition(0, 0);
			LGImeComponent.caretMoved();
		} else {
			LGImeComponent.setCaretPosition(idx, 1);
		}
	},
	
	addCharToEndForHangul : function (txt, c, caretIdx) {
		skFn.debug.log('[korea.js]' + 'addCharToEndForHangul => txt : ' + txt + ', c = ' +c+', caretIdx : ' +caretIdx);
		var kJoin = txt + c;
		this.putStrIntoFldForHangul(kJoin, caretIdx, true);
	},
	
	replaceCharForHangul: function (txt, c, idx, doubleCompounding) {
		skFn.debug.log('[korea.js]' + 'replaceCharForHangul');
		var kTxt_0 = "";
		var kTxt_1 = "";
		if(doubleCompounding) {
			kTxt_0 = txt.substr(0, new Number(idx) -1);
		} else {
			kTxt_0 = txt.substr(0, idx);
		}
		kTxt_1 = txt.substr(new Number(idx) +1, txt.length);

		var kJoin = kTxt_0 + c + kTxt_1;
		var kCaretIdx = (kTxt_0 + c).length -1;
		this.putStrIntoFldForHangul(kJoin, kCaretIdx, true);
	},
	
	insertCharForHangul : function (txt, c, idx) {
		skFn.debug.log('[korea.js]' + 'insertCharForHangul');
		var kTxt_0 = txt.substr(0, idx);
		var kTxt_1 = txt.substr(idx, txt.length);
		var kJoin = kTxt_0 + c + kTxt_1;
		var kCaretIdx = (kTxt_0 + c).length -1;
		this.putStrIntoFldForHangul(kJoin, kCaretIdx, true);
	},
	
//	addStrIntoFldForHangul : function ( result) {
	addStrIntoFldForHangul : function ( result, maxLen ) {
		skFn.debug.log('[korea.js]' + 'addStrIntoFldForHangul => result.resultChar : ' + result.resultChar + ', result.newChar : ' 
				+result.newChar + ', result.doubleCompounding : ' + result.doubleCompounding + ', result.deleteLen : ' + result.deleteLen);
		var kNew = "";
		if(result.resultChar !=null && result.resultChar.length>0) {
			kNew = result.resultChar;
		}
		
		if(result.newChar != null && result.newChar.length>0) {
			kNew = kNew + result.newChar;
		}
		
		var kDeleteLen = 1;
		if( result.deleteLen != null && result.deleteLen != "undefined") {
			kDeleteLen = result.deleteLen;
		}
		var kTxt = LGImeComponent.getTextContent();

		var kMode = result.mode;
		var kCaretSelected = LGImeComponent.isCaretActivated();

		var kIsCompounding = ( kCaretSelected && (kMode > 0) );
		var kIdx = LGImeComponent.getCaretPosition();
		var kIsEnd = false;
		if(kCaretSelected) {
			kIsEnd = (kIdx >= kTxt.length-1);
		} else {
			kIsEnd = (kIdx >= kTxt.length);
		}

		var kJoin = "";
		
		/* maxlength 체크 로직 추가 (by sophia) */
		var kTxtLen = kTxt.length;
		if(typeof maxLen == "undefined") maxLen = 100;
		
		if( kTxtLen < maxLen ) {
		/* maxlength 체크 로직 추가 (by sophia) */
			if(kTxt.length == 0) {
				this.addCharToEndForHangul(kTxt, kNew, kNew.length -1);
			} else if (kIsEnd) {
				if(kIsCompounding) {
					if(result.doubleCompounding) {
						kTxt = kTxt.substr(0, kTxt.length -2);
					} else {
						kTxt = kTxt.substr(0, kTxt.length -1);
					}
					kJoin = kTxt + kNew ;
					this.addCharToEndForHangul(kTxt, kNew, kJoin.length-1);
				} else {
					kJoin = kTxt + kNew;
					this.addCharToEndForHangul(kTxt, kNew, kJoin.length -1);
				}
			} else {
				if(kIsCompounding) {
					this.replaceCharForHangul(kTxt, kNew, kIdx, result.doubleCompounding);
				} else {
					this.insertCharForHangul(kTxt, kNew, kIdx);
				}
			}
		}
	},
	
	getCanDeleteChar : function () {
		skFn.debug.log('[korea.js]' + 'getCanDeleteChar');
		var historyLst2 = this.historyLst;
		if( this.historyLst.length > 0 ) {
			return true;
		} else {
			return false;
		}
	},
	
	deleteChar : function(u) {
		skFn.debug.log('[korea.js]' + 'deleteChar');
		var kCurrent = this.historyLst[this.historyLst.length -1];
		if(kCurrent.newSecondIdx > -1 ) {
			kCurrent.newSecondIdx = -1;
			if(kCurrent.newFirstIdx > -1 ) {
				this.setNewMode(1);
			} else {
				this.setNewMode(0);
			}
			kCurrent.deleteLen = 2;
		} else if (kCurrent.newFirstIdx > -1) {
			kCurrent.newFirstIdx = -1;
			this.setNewMode(0);
			kCurrent.deleteLen = 2;
		} else if (kCurrent.doubleBottomIdx > -1 ) {
			this.thirdIdx = this.revertThirdIdx( kCurrent.thirdIdx, kCurrent.doubleBottomIdx);
			kCurrent.doubleBottomIdx = -1;
			kCurrent.thirdIdx = this.thirdIdx;
			this.setNewMode(3);
			kCurrent.deleteLen = 1;
		} else if (kCurrent.thirdIdx > -1) {
			this.thirdIdx = -1;
			this.doubleBottomIdx = -1;
			kCurrent.thirdIdx = -1;
			this.setNewMode(2);
			kCurrent.deleteLen = 1;
		} else if (kCurrent.secondIdx > -1 ) {
			if (( u =="forReplace") && (kCurrent.secondIdx == 9 || kCurrent.secondIdx == 14 )) {
				kCurrent.secondIdx -= 1;
				secondIdx = kCurrent.secondIdx;
				this.lastInputChar = this.secondLst[kCurrent.secondIdx];
				kCurrent.inputChar = this.lastInputChar;
				this.setNewMode(2);
			} else {
				this.secondIdx= - -1;
				kCurrent.secondIdx = -1;
				this.lastInputChar = this.firstLst[kCurrent.firstIdx];
				kCurrent.inputChar = this.lastInputChar;
				this.setNewMode(1);
			}
			kCurrent.deleteLen = 1;
		} else if (kCurrent.firstIdx > -1 ) {
			this.firstIdx = -1;
			kCurrent.firstIdx = -1;
			this.setNewMode(0);
			kCurrent.deleteLen = 1;
		}
		kCurrent.resultChar = this.getKoreanChar(kCurrent.firstIdx, kCurrent.secondIdx, kCurrent.thirdIdx);
		kCurrent.newChar = this.getKoreanChar(kCurrent.newFirstIdx, kCurrent.newSecondIdx, kCurrent.newThirdIdx);
		return kCurrent;
	},
	
	deleteCharPressingBackSpace : function () {
		skFn.debug.log('[korea.js]' + 'deleteCharPressingBackSpace');
		lastInputNum = -1;
		this.lastInputChar = "";
		return this.deleteChar("forDelete");

	},
	
	deleteCharInCompoundingForHangul : function(result) {
		skFn.debug.log('[korea.js]' + 'deleteCharInCompoundingForHangul');
		var resultChar = result.resultChar == null ? "" : result.resultChar;
		var newChar = result.newChar == null ? "" : result.newChar;
		var kNew = resultChar + newChar;
		var kTxt = LGImeComponent.getTextContent(); 
		var kMode = result.mode;
		var kCaretSelected = LGImeComponent.isCaretActivated();
		var kDeleteLen = 1;

		
		//alert("kTxt : " + kTxt);
		
		if( result.deleteLen != null && result.deleteLen != "undefined" ) {
			kDeleteLen = result.deleteLen;
		}
		
//		alert("kDeleteLen : " + kDeleteLen );
		
		var kIsCompounding = (kCaretSelected && (kMode > 0));
		var kIdx = LGImeComponent.getCaretPosition();

		var kTxt_0;
		var kTxt_1;
		var kCaretIdx; 

		if (kNew.length == 0) {
			//alert("kNew.length == 0, kIdx : " + kIdx);
			if(this.kDIdx == 0 || this.kDIdx == 1){
				kTxt_0 = kTxt.substr(0, kIdx);
				kTxt_1 = kTxt.substr(kIdx + 1, kTxt.length);
			}else{
				kTxt_0 = kTxt.substr(0, kIdx -1);
				kTxt_1 = kTxt.substr(kIdx + 1, kTxt.length);
				this.kDIdx = 0;
			}
			kCaretIdx = kTxt_0.length;
			kCaretSelected = false;
			this.kDIdx++;
			
			//alert("kDIdx : " + kDIdx);


			/*kTxt_0 = kTxt.substr(0, kIdx -1);
			kTxt_1 = kTxt.substr(kIdx + 1, kTxt.length);*/
			//alert("kTxt_0 : " + kTxt_0 + " kTxt_1 : " + kTxt_1 + " kCaretIdx : " + kCaretIdx );
		} else if (kNew.length == 2) {
		//	alert("kNew.length ==  2");
			kTxt_0 = kTxt.substr(0, kIdx-1);
			kTxt_1 = kTxt.substr(kIdx + 1, kTxt.length);

			kCaretIdx = (kTxt_0 + kNew).length -1;
			kCaretSelected = true;
		} else {
			//alert("kNew.length Else");
			if (kDeleteLen == 2) {
				kTxt_0 = kTxt.substr(0, kIdx -1);
				kTxt_1 = kTxt.substr(kIdx + 1, kTxt.length);
				kCaretIdx = (kTxt_0 + kNew).length;
				//alert("kTxt_0 : " + kTxt_0 + " kTxt_1 : " + kTxt_1 + " kCaretIdx : " + kCaretIdx );
			} else {
				kTxt_0 = kTxt.substr(0, kIdx);
				kTxt_1 = kTxt.substr(kIdx + 1, kTxt.length);
				kCaretIdx = kIdx;
				kCaretSelected = true;
				//alert("kTxt_0 : " + kTxt_0 + " kTxt_1 : " + kTxt_1 + " kCaretIdx : " + kCaretIdx );
			}
		}
		var kJoin = kTxt_0 + kNew + kTxt_1;

//		alert("kJoin : " + kJoin.length);
		
		this.putStrIntoFldForHangul(kJoin, kCaretIdx, kCaretSelected);
		
	},
	
	deleteCharAtForHangul : function (idx) {
		skFn.debug.log('[korea.js]' + 'deleteCharAtForHangul');
		var kTxt = LGImeComponent.getTextContent();
		var kTxt_0 = kTxt.substr(0, idx);
		var kTxt_1 = kTxt.substr(idx + 1, kTxt.length);
		var kJoin = kTxt_0 + kTxt_1;
		var kCaretIdx = idx;
		this.putStrIntoFldForHangul(kJoin, kCaretIdx, false);	

	},
	
	doSomeAfterPressMuteForHangul : function () {
		skFn.debug.log('[korea.js]' + 'doSomeAfterPressMuteForHangul');
		//alert("doSomeAfterPressMuteForHangul");
		var kSelected = LGImeComponent.isCaretActivated();
		var kIdx = LGImeComponent.getCaretPosition();
		var kCanDelete = (kSelected || kIdx > 0);
		if (kCanDelete) {
			if (this.getCanDeleteChar()) {
				if (kSelected) {
					var kResult = this.deleteCharPressingBackSpace();
					this.deleteCharInCompoundingForHangul(kResult);
				} else {
					this.deleteCharAtForHangul(kIdx -1);
				}
			} else {
				this.deleteCharAtForHangul(kIdx-1);
			}
		}
	},

	/**
	 * 
	 * @param val
	 * @return
	 */
	//appendText : function (content) { => 모듈화 이슈로 수정 (by sophia)
	appendText : function (gubun, inputName, content) {
		skFn.debug.log('[korea.js]' + 'appendText');
//		alert("korean");
		var textItem = document.getElementById(inputName);

		if( textItem != null) {
			if(content == " ") {
				//addStrIntoFld(" ", true);
				LGImeComponent.addStrIntoFld(" ", true, $(textItem).attr("maxlength"));
			}else{
				if( gubun == 'lang' ||  gubun == 'sl') {	
					var kObj = this.getHangul(content);
					//this.addStrIntoFldForHangul(kObj);
					this.addStrIntoFldForHangul(kObj, $(textItem).attr("maxlength"));
				} else {
					//addStrIntoFld(content, true);
					LGImeComponent.addStrIntoFld(content, true, $(textItem).attr("maxlength"));
				}
			}		
		}
	}, 
	
	changeKeyValue : function (keyBoardType, gubun) {
		skFn.debug.log('[korea.js]' + 'changeKeyValue');
		this.setNewMode(0);	
		var ccKey = document.getElementById(LGImeComponent._get('imeInputName'));	
		/*********************************************************************/
		/*********************  KeyBoard Layout 1 Start  *********************/
		/*********************************************************************/

		if(keyBoardType==1){
			if(gubun == 'lang'){
				
				//stIdx = 11;

				LGImeComponent.setKeyText("wkk_key_00", "ㄱ");
				LGImeComponent.setKeyText("wkk_key_01", "ㄲ");
				LGImeComponent.setKeyText("wkk_key_02", "ㄴ");
				LGImeComponent.setKeyText("wkk_key_03", "ㄷ");
				LGImeComponent.setKeyText("wkk_key_04", "ㄸ");
				LGImeComponent.setKeyText("wkk_key_05", "ㄹ");
				LGImeComponent.setKeyText("wkk_key_10", "ㅁ");
				LGImeComponent.setKeyText("wkk_key_11", "ㅂ");
				LGImeComponent.setKeyText("wkk_key_12", "ㅃ");
				LGImeComponent.setKeyText("wkk_key_13", "ㅅ");
				LGImeComponent.setKeyText("wkk_key_14", "ㅆ");
				LGImeComponent.setKeyText("wkk_key_15", "ㅇ");
				LGImeComponent.setKeyText("wkk_key_20", "ㅈ");
				LGImeComponent.setKeyText("wkk_key_21", "ㅉ");
				LGImeComponent.setKeyText("wkk_key_22", "ㅊ");
				LGImeComponent.setKeyText("wkk_key_23", "ㅋ");
				LGImeComponent.setKeyText("wkk_key_24", "ㅌ");
				LGImeComponent.setKeyText("wkk_key_25", "ㅍ");
				LGImeComponent.setKeyText("wkk_key_30", "ㅎ");
				LGImeComponent.setKeyText("wkk_key_31", "ㅏ");
				LGImeComponent.setKeyText("wkk_key_32", "ㅑ");
				LGImeComponent.setKeyText("wkk_key_33", "ㅓ");
				LGImeComponent.setKeyText("wkk_key_34", "ㅕ");
				LGImeComponent.setKeyText("wkk_key_35", "ㅗ");
				LGImeComponent.setKeyText("wkk_key_40", "ㅛ");
				LGImeComponent.setKeyText("wkk_key_41", "ㅜ");
				LGImeComponent.setKeyText("wkk_key_42", "ㅠ");
				LGImeComponent.setKeyText("wkk_key_43", "ㅡ");
				LGImeComponent.setKeyText("wkk_key_44", "ㅣ");
				LGImeComponent.setKeyText("wkk_key_45", "ㅐ");
				LGImeComponent.setKeyText("wkk_key_50", "ㅒ");
				LGImeComponent.setKeyText("wkk_key_51", "ㅔ");
				LGImeComponent.setKeyText("wkk_key_52", "ㅖ");
				LGImeComponent.setKeyText("wkk_key_53", " "); 						
			}
			
			else if(gubun == 'sl')	{			
			
				//
			} else if (gubun == 'ch') {
				this.chTggIdx++;		
				LGImeComponent._set({langTogglIdx : 0});
				LGImeComponent.setInnerHtml("wkk_key_60", "KOR");	//Lang Toggle
				switch(this.chIdx){
					case 20:
						this.chIdx = 21;
						// LG QA 요청사항으로 특수기호 클릭시 focus 영역에도 바로 변경되도록 수정(5.10 by sophia) 
						LGImeComponent.setInnerHtml("wkk_key_focus_c", '$€£'); 
						LGImeComponent.setInnerHtml("wkk_key_62", '$€£'); 
						LGImeComponent.setKeyText("wkk_key_00", "1");
						LGImeComponent.setKeyText("wkk_key_01", "2");
						LGImeComponent.setKeyText("wkk_key_02", "3");
						LGImeComponent.setKeyText("wkk_key_03", "4");
						LGImeComponent.setKeyText("wkk_key_04", "5");
						LGImeComponent.setKeyText("wkk_key_05", "6");
						LGImeComponent.setKeyText("wkk_key_10", "7");
						LGImeComponent.setKeyText("wkk_key_11", "8");
						LGImeComponent.setKeyText("wkk_key_12", "9");
						LGImeComponent.setKeyText("wkk_key_13", "0");
						LGImeComponent.setKeyText("wkk_key_14", ".");
						LGImeComponent.setKeyText("wkk_key_15", "@");
						LGImeComponent.setKeyText("wkk_key_20", "_");
						LGImeComponent.setKeyText("wkk_key_21", "/");
						LGImeComponent.setKeyText("wkk_key_22", "^");
						LGImeComponent.setKeyText("wkk_key_23", "~");
						LGImeComponent.setKeyText("wkk_key_24", "?");
						LGImeComponent.setKeyText("wkk_key_25", "!");
						LGImeComponent.setKeyText("wkk_key_30", "\'");
						LGImeComponent.setKeyText("wkk_key_31", "\"");
						LGImeComponent.setKeyText("wkk_key_32", "(");
						LGImeComponent.setKeyText("wkk_key_33", ")");
						LGImeComponent.setKeyText("wkk_key_34", "-");
						LGImeComponent.setKeyText("wkk_key_35", "#");
						LGImeComponent.setKeyText("wkk_key_40", ":");
						LGImeComponent.setKeyText("wkk_key_41", ";");
						LGImeComponent.setKeyText("wkk_key_42", "+");
						LGImeComponent.setKeyText("wkk_key_43", "&");
						LGImeComponent.setKeyText("wkk_key_44", "*");
						LGImeComponent.setKeyText("wkk_key_45", "=");
						LGImeComponent.setKeyText("wkk_key_50", "<");	
						LGImeComponent.setKeyText("wkk_key_51", ">");
						LGImeComponent.setKeyText("wkk_key_52", "[");
						LGImeComponent.setKeyText("wkk_key_53", "]");
					break;
					case 21:
						this.chIdx = 20;
						// LG QA 요청사항으로 특수기호 클릭시 focus 영역에도 바로 변경되도록 수정(5.10 by sophia) 
						LGImeComponent.setInnerHtml("wkk_key_focus_c", '12;)'); 
						LGImeComponent.setInnerHtml("wkk_key_62", '12;)');
						LGImeComponent.setKeyText("wkk_key_00", "\{");
						LGImeComponent.setKeyText("wkk_key_01", "\}");
						LGImeComponent.setKeyText("wkk_key_02", "\,");
						LGImeComponent.setKeyText("wkk_key_03", "\§");
						LGImeComponent.setKeyText("wkk_key_04", "\%");
						LGImeComponent.setKeyText("wkk_key_05", "\¿");
						LGImeComponent.setKeyText("wkk_key_10", "\¡");
						LGImeComponent.setKeyText("wkk_key_11", "\€");
						LGImeComponent.setKeyText("wkk_key_12", "\£");
						LGImeComponent.setKeyText("wkk_key_13", "\$");
						LGImeComponent.setKeyText("wkk_key_14", "\¥");
						LGImeComponent.setKeyText("wkk_key_15", "￦");
						LGImeComponent.setKeyText("wkk_key_20", "＼");
						LGImeComponent.setKeyText("wkk_key_21", "|");
						LGImeComponent.setKeyText("wkk_key_22", " ");
						LGImeComponent.setKeyText("wkk_key_23", " ");
						LGImeComponent.setKeyText("wkk_key_24", " ");
						LGImeComponent.setKeyText("wkk_key_25", " ");
						LGImeComponent.setKeyText("wkk_key_30", " ");
						LGImeComponent.setKeyText("wkk_key_31", " ");
						LGImeComponent.setKeyText("wkk_key_32", " ");
						LGImeComponent.setKeyText("wkk_key_33", " ");
						LGImeComponent.setKeyText("wkk_key_34", " ");
						LGImeComponent.setKeyText("wkk_key_35", " ");
						LGImeComponent.setKeyText("wkk_key_40", " ");
						LGImeComponent.setKeyText("wkk_key_41", " ");
						LGImeComponent.setKeyText("wkk_key_42", " ");
						LGImeComponent.setKeyText("wkk_key_43", " ");
						LGImeComponent.setKeyText("wkk_key_44", " ");
						LGImeComponent.setKeyText("wkk_key_45", " ");
						LGImeComponent.setKeyText("wkk_key_50", " ");	
						LGImeComponent.setKeyText("wkk_key_51", " ");
						LGImeComponent.setKeyText("wkk_key_52", " ");
						LGImeComponent.setKeyText("wkk_key_53", " ");
						break;				
				}
			}
		}
	}
}
