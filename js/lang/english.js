var imeLanguageInfo = {
	pageCnt : 2,
	mode : 0,
	STYLE_LABEL : "ABC",
	miniPopUpInfoObjects : "",

	
	chTggIdx : null, 
	chIdx:20,
	
	/**
	 * initialize keyboard data
	 * @return
	 */
	initialize : function (inputName) {
		
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
		
	},

	/**
	 * pre processing define when key pressed (for combination charset ex> hangle)
	 * @param nMode
	 * @return
	 */
	setNewMode : function (nMode) {
		//do nothing
	},
	
	/**
	 * Numeric key display on screen.
	 * @param currPageIdx
	 * @return truel/false
	 */
	isNumericKeyActivated : function (currPageIdx) {
		if(currPageIdx==0 || currPageIdx == 1  ) {
			return true;
		} else {
			return false;
		}
	},	
	
	/**
	 * add space to textbox's content
	 * @return
	 */
	//addSpaceText : function () {	=> 모듈화로 작업으로 수정(by sophia)
	addSpaceText : function (gubun, inputName) {
		this.appendText(gubun, inputName, " ");
	},
	
	/**
	 * backspace text
	 * @return
	 */
	backspaceText : function () {
		LGImeComponent.deletePrevChar();
	},
	
	
	/**
	 * 
	 * @param val
	 * @return
	 */
	//appendText : function (content) { => 모듈화 이슈로 수정 (by sophia)
	appendText : function (gubun, inputName, content) {
//		alert("english");
		var textItem = document.getElementById(inputName);

		if( textItem != null) {
			if(content == " ") {
				LGImeComponent.addStrIntoFld(" ", true, $(textItem).attr("maxlength"));
			} else {
				LGImeComponent.addStrIntoFld(content, true, $(textItem).attr("maxlength"));
			}
		}

	},	
	
	
	changeKeyValue : function (keyBoardType, gubun) {
		if(keyBoardType==1){	
			if(gubun == 'lang'){	
				LGImeComponent._set({stIdx : 11});			
				LGImeComponent.setInnerHtml("wkk_key_60", "KOR");	//Lang Toggle
				LGImeComponent.setInnerHtml("wkk_key_61", "ABC");
				LGImeComponent.setKeyText("wkk_key_00", "a");
				LGImeComponent.setKeyText("wkk_key_01", "b");
				LGImeComponent.setKeyText("wkk_key_02", "c");
				LGImeComponent.setKeyText("wkk_key_03", "d");
				LGImeComponent.setKeyText("wkk_key_04", "e");
				LGImeComponent.setKeyText("wkk_key_05", "f");
				LGImeComponent.setKeyText("wkk_key_10", "g");
				LGImeComponent.setKeyText("wkk_key_11", "h");
				LGImeComponent.setKeyText("wkk_key_12", "i");
				LGImeComponent.setKeyText("wkk_key_13", "j");
				LGImeComponent.setKeyText("wkk_key_14", "k");
				LGImeComponent.setKeyText("wkk_key_15", "l");
				LGImeComponent.setKeyText("wkk_key_20", "m");
				LGImeComponent.setKeyText("wkk_key_21", "n");
				LGImeComponent.setKeyText("wkk_key_22", "o");
				LGImeComponent.setKeyText("wkk_key_23", "p");
				LGImeComponent.setKeyText("wkk_key_24", "q");
				LGImeComponent.setKeyText("wkk_key_25", "r");
				LGImeComponent.setKeyText("wkk_key_30", "s");
				LGImeComponent.setKeyText("wkk_key_31", "t");
				LGImeComponent.setKeyText("wkk_key_32", "u");
				LGImeComponent.setKeyText("wkk_key_33", "v");
				LGImeComponent.setKeyText("wkk_key_34", "w");
				LGImeComponent.setKeyText("wkk_key_35", "x");
				LGImeComponent.setKeyText("wkk_key_40", "y");
				LGImeComponent.setKeyText("wkk_key_41", "z");
				LGImeComponent.setKeyText("wkk_key_42", " ");
				LGImeComponent.setKeyText("wkk_key_43", " ");
				LGImeComponent.setKeyText("wkk_key_44", " ");
				LGImeComponent.setKeyText("wkk_key_45", " ");
				LGImeComponent.setKeyText("wkk_key_50", " "); 
				LGImeComponent.setKeyText("wkk_key_51", " "); 
				LGImeComponent.setKeyText("wkk_key_52", " "); 
				LGImeComponent.setKeyText("wkk_key_53", " ");
			}
			
			if(gubun == 'sl')	{
				switch(LGImeComponent._get('stIdx')){
				case 10:
					LGImeComponent._set({stIdx : 11});
					LGImeComponent.setInnerHtml("wkk_key_61", 'ABC');
					LGImeComponent.doHighlight("wkk_key_61");
					LGImeComponent.setKeyText("wkk_key_00", "a");
					LGImeComponent.setKeyText("wkk_key_01", "b");
					LGImeComponent.setKeyText("wkk_key_02", "c");
					LGImeComponent.setKeyText("wkk_key_03", "d");
					LGImeComponent.setKeyText("wkk_key_04", "e");
					LGImeComponent.setKeyText("wkk_key_05", "f");
					LGImeComponent.setKeyText("wkk_key_10", "g");
					LGImeComponent.setKeyText("wkk_key_11", "h");
					LGImeComponent.setKeyText("wkk_key_12", "i");
					LGImeComponent.setKeyText("wkk_key_13", "j");
					LGImeComponent.setKeyText("wkk_key_14", "k");
					LGImeComponent.setKeyText("wkk_key_15", "l");
					LGImeComponent.setKeyText("wkk_key_20", "m");
					LGImeComponent.setKeyText("wkk_key_21", "n");
					LGImeComponent.setKeyText("wkk_key_22", "o");
					LGImeComponent.setKeyText("wkk_key_23", "p");
					LGImeComponent.setKeyText("wkk_key_24", "q");
					LGImeComponent.setKeyText("wkk_key_25", "r");
					LGImeComponent.setKeyText("wkk_key_30", "s");
					LGImeComponent.setKeyText("wkk_key_31", "t");
					LGImeComponent.setKeyText("wkk_key_32", "u");
					LGImeComponent.setKeyText("wkk_key_33", "v");
					LGImeComponent.setKeyText("wkk_key_34", "w");
					LGImeComponent.setKeyText("wkk_key_35", "x");
					LGImeComponent.setKeyText("wkk_key_40", "y");
					LGImeComponent.setKeyText("wkk_key_41", "z");
					LGImeComponent.setKeyText("wkk_key_42", " ");
					LGImeComponent.setKeyText("wkk_key_43", " ");
					LGImeComponent.setKeyText("wkk_key_44", " ");
					LGImeComponent.setKeyText("wkk_key_45", " ");
					LGImeComponent.setKeyText("wkk_key_50", " "); 
					LGImeComponent.setKeyText("wkk_key_51", " "); 
					LGImeComponent.setKeyText("wkk_key_52", " "); 
					LGImeComponent.setKeyText("wkk_key_53", " ");
					break;
				case 11:
					LGImeComponent._set({stIdx : 10});
					LGImeComponent.setInnerHtml("wkk_key_61", 'abc');
					LGImeComponent.doHighlight("wkk_key_61");
					LGImeComponent.setKeyText("wkk_key_00", "A"); 
					LGImeComponent.setKeyText("wkk_key_01", "B"); 
					LGImeComponent.setKeyText("wkk_key_02", "C"); 
					LGImeComponent.setKeyText("wkk_key_03", "D"); 
					LGImeComponent.setKeyText("wkk_key_04", "E"); 
					LGImeComponent.setKeyText("wkk_key_05", "F"); 
					LGImeComponent.setKeyText("wkk_key_10", "G"); 
					LGImeComponent.setKeyText("wkk_key_11", "H"); 
					LGImeComponent.setKeyText("wkk_key_12", "I"); 
					LGImeComponent.setKeyText("wkk_key_13", "J"); 
					LGImeComponent.setKeyText("wkk_key_14", "K"); 
					LGImeComponent.setKeyText("wkk_key_15", "L"); 
					LGImeComponent.setKeyText("wkk_key_20", "M"); 
					LGImeComponent.setKeyText("wkk_key_21", "N"); 
					LGImeComponent.setKeyText("wkk_key_22", "O"); 
					LGImeComponent.setKeyText("wkk_key_23", "P"); 
					LGImeComponent.setKeyText("wkk_key_24", "Q"); 
					LGImeComponent.setKeyText("wkk_key_25", "R"); 
					LGImeComponent.setKeyText("wkk_key_30", "S"); 
					LGImeComponent.setKeyText("wkk_key_31", "T"); 
					LGImeComponent.setKeyText("wkk_key_32", "U"); 
					LGImeComponent.setKeyText("wkk_key_33", "V"); 
					LGImeComponent.setKeyText("wkk_key_34", "W"); 
					LGImeComponent.setKeyText("wkk_key_35", "X"); 
					LGImeComponent.setKeyText("wkk_key_40", "Y"); 
					LGImeComponent.setKeyText("wkk_key_41", "Z"); 
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
			} else if (gubun == 'ch') {
				LGImeComponent._set({langTogglIdx : 8});
				LGImeComponent.setInnerHtml("wkk_key_60", "ENG");	//Lang Toggle
				LGImeComponent.setInnerHtml("wkk_key_61", " ");				
				switch(this.chIdx){
					case 20:
						this.chIdx = 21;
						LGImeComponent.setInnerHtml("wkk_key_62", "$€£"); 
						LGImeComponent.doHighlight("wkk_key_62");
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
						LGImeComponent.setInnerHtml("wkk_key_62", '12;)'); 
						LGImeComponent.doHighlight("wkk_key_62");
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
						LGImeComponent.setKeyText("wkk_key_15", " ");
						LGImeComponent.setKeyText("wkk_key_20", " ");
						LGImeComponent.setKeyText("wkk_key_21", " ");
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
		/*
		alert('english')
		alert(gubun)
		var arrText = new Array();

		 if(keyBoardType==1){	
			if(gubun == 'lang'){
				$("#wkk_key_61").html('ABC');
				
				LGImeComponent._set({stIdx : 11});
				arrText = new Array (
							"a", "b", "c", "d", "e", "f",
							"g", "h", "i", "j", "k", "l", 
							"m", "n", "o", "p", "q", "r",  
							"s", "t", "u", "v", "w", "x", 
							"y", "z", " ", " ", " ", " ", 
							" ", " ", " ", " "
						);
		
				return arrText;
			} else if(gubun == 'sl')	{		
				switch(LGImeComponent._get('stIdx')){
					case 10:
						$("#wkk_key_61").html('ABC');
						
						LGImeComponent._set({stIdx : 11});
						arrText = new Array (
									"a", "b", "c", "d", "e", "f",
									"g", "h", "i", "j", "k", "l", 
									"m", "n", "o", "p", "q", "r",  
									"s", "t", "u", "v", "w", "x", 
									"y", "z", " ", " ", " ", " ", 
									" ", " ", " ", " "
								);
						return arrText;
						break;
					case 11:
						LGImeComponent._set({stIdx : 10});
						$("#wkk_key_61").html('abc');
						arrText = new Array (
								"A", "B", "C", "D", "E", "F",
								"G", "H", "I", "J", "K", "L", 
								"M", "N", "O", "P", "Q", "R",  
								"S", "T", "U", "V", "W", "X", 
								"Y", "Z", " ", " ", " ", " ", 
								" ", " ", " ", " "
							);
						return arrText;
						break;
				}
			} else if (gubun == 'ch') {
				langTogglIdx = 8;
				LGImeComponent.setInnerHtml("wkk_key_60", "ENG");	//Lang Toggle
				LGImeComponent.setInnerHtml("wkk_key_61", " ");				
				switch(this.chIdx){
					case 20:
						this.chIdx = 21;
						LGImeComponent.setInnerHtml("wkk_key_62", '$€£');
						LGImeComponent.doHighlight("wkk_key_62");
						arrText = new Array (
								"1", "2", "3", "4", "5", "6",
								"7", "8", "9", "0", ".", "@", 
								"_", "/", "^", "~", "?", "!",  
								"\'", "\"", "(", ")", "-", "#", 
								":", ";", "+", "&", "*", "=", 
								"<", ">", "[", "]"
							);
						
						return arrText;
						break;				
					case 21:
						this.chIdx = 20;
						LGImeComponent.setInnerHtml("wkk_key_62", '12;)');
						LGImeComponent.doHighlight("wkk_key_62");

						arrText = new Array (
								"\{", "\}", "\,", "\§", "\%", "\¿",
								"\¡", "\€", "\£", "\$", "\¥", "", 
								" ", " ", " ", " ", " ", " ",  
								" ", " ", " ", " ", " ", " ", 
								" ", " ", " ", " ", " ", " ", 
								" ", " ", " ", "  "
							);

						return arrText;
						break;				
				}
			}
		}
		*/
	}
}