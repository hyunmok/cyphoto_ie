/**
 *
 * zone.js
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
	if(typeof skTv == 'undefined'){
		skTv = {};
	}
}else if (typeof window.skTv == 'undefined'){
	window.skTv = {};
}

if(skEnv.device.inputDevice == 'remote_control') {
	if(skEnv.device.vendor == 'lg') {
		skTv.keymap = {
			N1 : 49,
			N2 : 50,
			N3 : 51,
			N4 : 52,
			N5 : 53,
			N6 : 54,
			N7 : 55,
			N8 : 56,
			N9 : 57,
			N0 : 48,
			PRECH : null,					//	undefined
			VOL_UP : null,					//	undefined
			VOL_DOWN : null,				//	undefined
			MUTE : null,					//	undefined
			CH_UP : null,					//	undefined
			CH_DOWN : null,					//	undefined
			TOOLS : null,					//	undefined
			ENTER : 13,
			RETURN : 461,
			INFO : 457,
			EXIT : null,					//	undefined
			UP : 38,
			DOWN : 40,
			LEFT : 37,
			RIGHT : 39,
			RED : 403,
			GREEN : 404,
			YELLOW : 405,
			BLUE : 406,
			RW : 412,
			PAUSE : 19,
			FF : 417,
			REC : null,						//	undefined
			PLAY : 415,
			STOP : 413,
			PANEL_CH_UP : null,				//	undefined
			PANEL_CH_DOWN : null,			//	undefined
			PANEL_VOL_UP : null,			//	undefined
			PANEL_VOL_DOWN : null,			//	undefined
			PANEL_ENTER : null,				//	undefined
			PANEL_SOURCE : null,			//	undefined
			PANEL_MENU : null,				//	undefined
			PANEL_POWER : null				//	undefined
		}
	} else {
		skTv.keymap = {
			N1 : 49,
			N2 : 50,
			N3 : 51,
			N4 : 52,
			N5 : 53,
			N6 : 54,
			N7 : 55,
			N8 : 56,
			N9 : 57,
			N0 : 48,
			PRECH : null,
			VOL_UP : null,
			VOL_DOWN : null,
			MUTE : null,
			CH_UP : null,
			CH_DOWN : null,
			TOOLS : null,
			ENTER : 13,
			RETURN : 8,
			INFO : null,
			EXIT : null,
			UP : 38,
			DOWN : 40,
			LEFT : 37,
			RIGHT : 39,
			RED : null,
			GREEN : null,
			YELLOW : null,
			BLUE : null,
			RW : null,
			PAUSE : null,
			FF : null,
			REC : null,
			PLAY : null,
			STOP : null,
			PANEL_CH_UP : null,
			PANEL_CH_DOWN : null,
			PANEL_VOL_UP : null,
			PANEL_VOL_DOWN : null,
			PANEL_ENTER : null,
			PANEL_SOURCE : null,
			PANEL_MENU : null,
			PANEL_POWER : null
		}
	}
} else if(skEnv.device.inputDevice == 'keyboard') {
	skTv.keymap = {
		N1 : 49,
		N2 : 50,
		N3 : 51,
		N4 : 52,
		N5 : 53,
		N6 : 54,
		N7 : 55,
		N8 : 56,
		N9 : 57,
		N0 : 48,
		PRECH : null,					//	undefined
		VOL_UP : null,					//	undefined
		VOL_DOWN : null,				//	undefined
		MUTE : null,					//	undefined
		CH_UP : null,					//	undefined
		CH_DOWN : null,					//	undefined
		TOOLS : null,					//	undefined
		ENTER : 13,
		RETURN : 27,
		INFO : null,
		EXIT : null,					//	undefined
		UP : 38,
		DOWN : 40,
		LEFT : 37,
		RIGHT : 39,
		RED : 115,						// F4
		GREEN : 118,					// F7
		YELLOW : 119,					// F8
		BLUE : 120,						// F9
		RW : 33,
		PAUSE : null,
		FF : 34,
		REC : null,						//	undefined
		PLAY : null,
		STOP : null,
		PANEL_CH_UP : null,				//	undefined
		PANEL_CH_DOWN : null,			//	undefined
		PANEL_VOL_UP : null,			//	undefined
		PANEL_VOL_DOWN : null,			//	undefined
		PANEL_ENTER : null,				//	undefined
		PANEL_SOURCE : null,			//	undefined
		PANEL_MENU : null,				//	undefined
		PANEL_POWER : null				//	undefined
	}
}  
