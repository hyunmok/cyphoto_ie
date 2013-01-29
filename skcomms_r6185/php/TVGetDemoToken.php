{"code":"8401","user_msg": {"title": "일시적인 장애입니다.", "contents":"<p class=\"desc_type1\">일시적인 장애로 인하여 선택하신 화면으로 이동하지 못했습니다.<br />이용 중에 불편을 끼쳐드려 진심으로 죄송합니다.<br /><br />잠시 후에 다시 시도해주세요.<br />고맙습니다.</p>"},"sys_msg":"Request Error : Invalid API Parameter","body":"Missing user agent parameters : agentVer, modelId, appVer, vendor"}a/base64.js'></script>
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
			query += "&"+$("#SceneParams input:eq("+i+")").attr('par