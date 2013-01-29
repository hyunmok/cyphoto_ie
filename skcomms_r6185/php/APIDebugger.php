<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
 <HEAD>
  <TITLE> TVGateway Debugger </TITLE>
  <META NAME="Generator" CONTENT="EditPlus">
  <META NAME="Author" CONTENT="">
  <META NAME="Keywords" CONTENT="">
  <META NAME="Description" CONTENT="">
  <script type='text/javascript' language='javascript' src='../skTvFrw/vendors/jquery-1.4.4.js'></script>
  <!-- PKI 암호화 라이브러리  -->
	<script type='text/javascript' src='./js/rsa/base64.js'></script>
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
			query += "&"+$("#SceneParams input:eq("+i+")").attr('paramName')+"="+encodeURIComponent($("#SceneParams input:eq("+i+")").val());
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
			padding:10px;
			word-break:break-all;
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
	<b>API Server :</b> <select onchange='changeOption()' id= 'Mode'>
	<option value = 'LIVE' >openapi.nate.com</option>			<option value = 'DEV' >oauthdev.nate.com</option>				 </select>
	 <b>App ID :</b> <select onchange='changeOption()' id= 'AppId'>
	<option value = 'DEV' >DEV</option>			<option value = 'CYPHOTO_SAMSUNG_DEMO' >CYPHOTO_SAMSUNG_DEMO</option>			<option value = 'CYPHOTO_LG' >CYPHOTO_LG</option>			<option value = 'SKBTV' >SKBTV</option>			<option value = 'CYPHOTO_SAMSUNG' >CYPHOTO_SAMSUNG</option>				 </select>
	 <b>API List : </b>
	<select onchange='changeOption()' id= 'APIList'>
	 <option value = 'xml_RetrieveFolderList' >xml_RetrieveFolderList</option>			<option value = 'xml_RetrievePhotoItemList' >xml_RetrievePhotoItemList</option>			<option value = 'xml_RetrievePhotoItem' >xml_RetrievePhotoItem</option>			<option value = 'xml_RetrievePhotoReplyList' >xml_RetrievePhotoReplyList</option>			<option value = 'xml_RetrievePhotoReplyList_with_img' >xml_RetrievePhotoReplyList_with_img</option>			<option value = 'xml_RetrieveMenuOpen' >xml_RetrieveMenuOpen</option>			<option value = 'xml_RegisterPhotoReply' >xml_RegisterPhotoReply</option>			<option value = 'xml_RemovePhotoReply' >xml_RemovePhotoReply</option>			<option value = 'xml_RetrieveMemProfile' >xml_RetrieveMemProfile</option>			<option value = 'xml_RetrieveFolderList2' >xml_RetrieveFolderList2</option>			<option value = 'xml_RetrievePhotoItemList2' >xml_RetrievePhotoItemList2</option>			<option value = 'xml_RetrievePhotoItem2' >xml_RetrievePhotoItem2</option>			<option value = 'xml_RetrievePhotoReplyList2_with_img' >xml_RetrievePhotoReplyList2_with_img</option>			<option value = 'xml_R