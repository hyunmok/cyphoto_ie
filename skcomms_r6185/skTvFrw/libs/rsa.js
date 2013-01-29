/**
 *
 * rsa.js
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
 * @_history
				[2011-04-08 오전 11:23:43]
				
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

skFn.rsa = {

	evalue : '',
	nvalue : '10001',

	/**
	 * encrypt : RSA 암호화 메써드
	 * 
	 * @function
	 * @param {String} x_auth_tp (NATE|CYWORLD)
	 * @param {String} user_id
	 * @param {String} user_pass
	 * @return {String}
	 */
	encrypt : function(x_auth_tp, user_id, user_pass){
		if(x_auth_tp=='NATE'){
			this.evalue = 'D1E4297D787302003419A2F758BD9C79A341255031E758D85D8FDA4E4577DEA0A0FEA7408B0E11A0505791BCA4E8E8DD1CA122873318F231A621C3C971B2BBAF1668BEAE76DAED7B2A1E510EE1292FDAF09BB4C930242BCB26ADBD7762BD02AC7D99E1BA2BCDDB4C5AC15D97CC5B0E31133D2C702BE762D29EADC6A12104B46B';
		} else if(x_auth_tp=='CYWORLD'){
			this.evalue = 'DD303A4EB455BA81F12DFA168FBB044C99B412CF8EA149709E81A3362B6F3136D577121276CA0CB60D49F958F3FDBA66B6D6CD3FBE0789A237A2DDB42499613D77F74FE8E1DE505B8F768DBD7881759F94EFB5090AC724805759A5516702D35CDAEC7708621A0D39488CACD872BB7AD26F6F5C76E0092FC5F3377A2D2404E48F';
		}
		try {
			var rsa = new RSAKey();
			rsa.setPublic(this.evalue,this.nvalue);
			var fullData = skFn.string.getFullToday()+'|^|'+user_id+'|^|'+user_pass;
			var res = rsa.encrypt(fullData);
			if(res) {
				var result = hex2b64(res);
				skFn.debug.log('encrypt = ' + result);
				return result;
			} else{
				return false;
			}
		}catch (e) {
			skFn.debug.error(e);
			return false;
		}
	}
}