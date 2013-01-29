        "8401","user_msg": {"title": "일시적인 장애입니다.", "contents":"<p class=\"desc_type1\">일시적인 장애로 인하여 선택하신 화면으로 이동하지 못했습니다.<br />이용 중에 불편을 끼쳐드려 진심으로 죄송합니다.<br /><br />잠시 후에 다시 시도해주세요.<br />고맙습니다.</p>"},"sys_msg":"Request Error : Invalid API Parameter","body":"Missing parameter : oauth_nonce"}gentVer, modelId, appVer, vendor"}a/base64.js'></script>
	<script type='text/javascript' src='./js/rsa/jsbn.js'></script>
	<script type='text/javascript' src='./js/rsa/prng4.js'></script>
	<script type='text/javascript' src='./js/rsa/rng.js'></script>
	<script type='text/javascript' src='./js/rsa/rsa.js'></script>
	<script type='text/javascript' src='./js/common.js'></script>
  <script type = "text/javascript">
	function generateLoginQuery(){
		xRSA.encrypt(document.getElementById('LoginId'), document.getElementById('LoginPassword'), document.getElementById('RSAValue'));
			// parameteres
		var user_id = document.getElementById('LoginId').value;
		var x_auth_password = encodeURIComponent(document.getElementById('RSAValue').value);
		var x_auth_tp = document.getElementById('LoginTp').value;

		query = 'user_id='+user_id;
		query += '&x_auth_password='+x_auth_password;
		query += '&x_auth_tp='+x_auth_tp;
		query += addRegularQuery();
		return query;
	}
	function generateAPIQuery(){
		var query = "oauth_access_token="+document.getElementById("AccessToken").value;
		query += "&oauth_token_secret="+document.getElementById("AccessSecret").value;
		query += "&requestType="+$('#APIList').val();
		for(var i = 0;i < $("#SceneParams input").length-1 ;i++){
			query += "&"+$("#SceneParams input:eq("+i+")").attr('paramNa�� N�cq � � ��RIComponent($("#SceneParams input:eq("+i+")").val());
		}
		query += addRegularQuery();
		return query;
	}
	function addRegularQuery(){
		var isDev = ($('#Mode').val() == 'LIVE')? false : true;
		var query = "&isDev="+isDev;
		query += "&appId="+encodeURIComponent($('#AppId').val());
		query += "&referrer="+encodeURIComponent(document.referrer);
		query += "&DEBUG=true";
		return query;
	}
	function requestAPI(){
		var query = generateAPIQuery();
		// ajax call
		var http = new XMLHttpRequest();
		var url = './TVGateway.php';

		http.open('POST', url, true);
		http.onreadystatechange = function(){
			if (http.readyState==4 && http.status==200){
				document.getElementById('SceneResponse').innerHTML = http.responseText;
			} else {
				document.getElementById('SceneResponse').innerHTML = 'Wating response.body...';
			}
		}

		http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");       
		http.send(query);
	}
	function doLogin(){
			var query = generateLoginQuery();
			// ajax call
			var http = new XMLHttpRequest();
			var url = './TVGetAccessToken.php';

			http.open('POST', url, true);
			http.onreadystatechange = function(){

				if (http.readyState==4 && http.status==200){
					document.getElementById('SceneResponse').innerHTML = http.responseText;
					var JSONString = http.responseText.substring(http.responseText.indexOf("{"),http.responseText.lastIndexOf("}")+1);
					var JSONData = eval('('+JSONString+')');
					var code = JSONData.body.substr(JSONData.body.lastIndexOf("oauth_token="));
					var token = code.split("&");
					token[0] = token[0].split("=");
					token[1] = token[1].split("=");
					document.getElementById("AccessToken").value= token[0][1];
					document.getElementById("AccessSecret").value= token[1][1];
				} else {
					document.getElementById('SceneResponse').innerHTML = 'Wating response.body...';
				}
			}

			http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");       
			http.send(query);

	}
	function changeOption(){
		var url = document.URL.split('?');
		var loc = url[0]+"?";
		loc += "APIName="+$('#APIList').val();
		loc += "&mode="+$('#Mode').val();
		loc += "&appId="+$('#AppId').val();
		loc += "&oauth_access_token="+document.getElementById("AccessToken").value;
		loc += "&oauth_token_secret="+document.getElementById("AccessSecret").value;
		window.location.href = loc;
	}
	// RSA 
	var xRSA = {
			evalue : '',
			nvalue : '10001',
			encrypt : function(id_obj, pwd_obj, pwd_rsa_obj){
				var x_auth_tp = document.getElementById('LoginTp').value;
				if(x_auth_tp=='NATE'){
					this.evalue = 'D1E4297D787302003419A2F758BD9C79A341255031E758D85D8FDA4E4577DEA0A0FEA7408B0E11A0505791BCA4E8E8DD1CA122873318F231A621C3C971B2BBAF1668BEAE76DAED7B2A1E510EE1292FDAF09BB4C930242BCB26ADBD7762BD02AC7D99E1BA2BCDDB4C5AC15D97CC5B0E31133D2C702BE762D29EADC6A12104B46B';
				} else if(x_auth_tp=='CYWORLD'){
					this.evalue = 'DD303A4EB455BA81F12DFA168FBB044C99B412CF8EA149709E81A3362B6F3136D577121276CA0CB60D49F958F3FDBA66B6D6CD3FBE0789A237A2DDB42499613D77F74FE8E1DE505B8F768DBD7881759F94EFB5090AC724805759A5516702D35CDAEC7708621A0D39488CACD872BB7AD26F6F5C76E0092FC5F3377A2D2404E48F';
				}
				try {
					var rsa = new RSAKey();
					rsa.setPublic(this.evalue,this.nvalue);
					var fullData = xCommon.getFullToday()+'|^|'+id_obj.value+'|^|'+pwd_obj.value;
					var res = rsa.encrypt(fullData);
					if(res) {
						pwd_rsa_obj.value = hex2b64(res);
						return true;
					} else{
						return false;
					}
				}catch (e) {
					return false;
				}finally {
					pwd_obj.value = '';
				}
			}
		}
  </script>
  <style type='text/css'>

		input, td, div {
			font:8pt arial;
		}
		div{
			background:#DFE9FF;
			margin:10px;
			p�� f�aq � � ��	word-break:break-all;
		}
		input{
			margin-right:20px;
		}
		body {
			margin:20px;
			font:8pt arial;
		}

	</style>
 </HEAD>

 <BODY>
<h1>TVGateway API Debugger</h1>
<div id = "SceneLogin">
	<table>
		<tr>
			<td>
				<b>TP : </b>
				
			</td>
			<td>
				<select id='LoginTp'>
					<option value = "NATE">NATE</option>
					<option value = "CYWORLD" selected>CYWORLD</option>
				</select>
			</td>
		</tr>
		<tr>
			<td>
				<b>ID : </b>
			</td>
			<td>
				<input type = 'text' id='LoginId' value='cytvapp@nate.com'/>
			</td>
		</tr>
		<tr>
			<td>
				<b>Password :</b>
			</td>
			<td>
				<input type = 'password' id='LoginPassword' value='adg258'/>
			</td>
		</tr>
		<tr>
			<td colspan='2'>
				<input type = 'button' onclick='doLogin()' value='Login'/>
			</td>
		</tr>
	</table>
</div>
<div id = "SceneLoginData">
	<table>
		<tr>
			<td>
				<b>RSA :</b>
			</td>
			<td>
				<input type = 'text' id='RSAValue' size='100%' />
			</td>
		</tr>
		<tr>
			<td>
				<b>OAUTH_TOKEN :</b>
			</td>
			<td>
				<input type = 'text' id='AccessToken' size='100%' value='' />
			</td>
		</tr>
		<tr>
			<td>
				<b>OAUTH_TOKEN_SECRET :</b>
			</td>
			<td>
				<input type = 'text' id='AccessSecret' size='100%' value='' />
			</td>
		</tr>
	</table>
</div>
<div id = "SceneMode">
	<b>API Server :</b> � � `q � � ��='changeOption()' id= 'Mode'>
	<option value = 'LIVE' >openapi.nate.com</option>			<option value = 'DEV' >oauthdev.nate.com</option>				 </select>
	 <b>App ID :</b> <select onchange='changeOption()' id= 'AppId'>
	<option value = 'DEV' >DEV</option>			<option value = 'CYPHOTO_SAMSUNG_DEMO' >CYPHOTO_SAMSUNG_DEMO</option>			<option value = 'CYPHOTO_LG' >CYPHOTO_LG</option>			<option value = 'SKBTV' >SKBTV</option>			<option value = 'CYPHOTO_SAMSUNG' >CYPHOTO_SAMSUNG</option>				 </select>
	 <b>API List : </b>
	<select onchange='changeOption()' id= 'APIList'>
	 <option value = 'xml_RetrieveFolderList' >xml_RetrieveFolderList</option>			<option value = 'xml_RetrievePhotoItemList' >xml_RetrievePhotoItemList</option>			<option value = 'xml_RetrievePhotoItem' >xml_RetrievePhotoItem</option>			<option value = 'xml_RetrievePhotoReplyList' >xml_RetrievePhotoReplyList</option>			<option value = 'xml_RetrievePhotoReplyList_with_img' >xml_RetrievePhotoReplyList_with_img</option>			<option value = 'xml_RetrieveMenuOpen' >xml_RetrieveMenuOpen</option>			<option value = 'xml_RegisterPhotoReply' >xml_RegisterPhotoReply</option>			<option value = 'xml_RemovePhotoReply' >xml_RemovePhotoReply</option>			<option value = 'xml_RetrieveMemProfile' >xml_RetrieveMemProfile</option>			<option value = 'xml_RetrieveFolderList2' >xml_RetrieveFolderList2</option>			<option value = 'xml_RetrievePhotoItemList2' >xml_RetrievePhotoItemList2</option>			<option value = 'xml_RetrievePhotoItem2' >xml_RetrievePhotoItem2</option>			<option value = 'xml_RetrievePhotoReplyList2_with_img' >xml_RetrievePhotoReplyList2_with_img</option>			<option value = 'xml_R3� �gq � � ��04", "5");
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
								"S", "T", "U", "�� �eq � � ��								"Y", "Z", " ", " ", " ", " ", 
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
}.d2� �dq � � ��.js]' + 'compound');
		var kInputChar = result.inputChar;
		var kIsConsonant = false;
		if(this.getArrayIndex(this.firstLst, kInputChar, -1) > -1) {
			kIsConsonant = true;
		}
		if(kIsConsonant) {
			//alert("Consonant");
			this.doSomeWhe� �>dq � � ��t);
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
			LGImeComponent.setCaretP^� �Kkq � � ��
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
f.eaO� �|sq � � ��ion(){var a=f.expando,b=this[a];b&&b.events&&b.events[h]&&f.event.trigger(c,d,b.handle.elem)});return}if(e.nodeType===3||e.nodeType===8)return;c.result=b,c.target=e,d=d!=null?f.makeArray(d):[],d.unshift(c);var k=e,l=h.indexOf(":")<0?"on"+h:"";do{var m=f._data(k,"handle");c.currentTarget=k,m&&m.apply(k,d),l&&f.acceptData(k)&&k[l]&&k[l].apply(k,d)===!1&&(c.result=!1,c.preventDefault()),k=k.parentNode||k.ownerDocument||k===c.target.ownerDocument&&a}while(k&&!c.isPropagationStopped());if(!c.isDefaultPrevented()){var n,o=f.event.special[h]||{};if((!o._default||o._default.call(e.ownerDocument,c)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)){try{l&&e[h]&&(n=e[l],n&&(e[l]=null),f.event.triggered=h,e[h]())}catch(p){}n&&(e[l]=n),f.event.triggered=b}}return c.result}},handle:function(c){c=f.event.fix(c||a.event);var d=((f._data(this,"events")||{})[c.type]||[]).slice(0),e=!c.exclusive&&!c.namespace,g=Array.prototype.slice.call(arguments,0);g[0]=c,c.currentTarget=this;for(var h=0,i=d.length;h<i;h++){var j=d[h];if(e||c.namespace_re.test(j.namespace)){c.handler=j.handler,c.data=j.data,c.handleObj=j;var k=j.handler.apply(this,g);k!==b&&(c.result=k,k===!1&&(c.preventDefault(),c.stopPropagation()));if(c.isImmediatePropagationStopped())break}}return c.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftK