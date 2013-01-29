document.write("<link rel='stylesheet' type='text/css' href='../css/Ime.css' />"); 

/**
 *
 * LGImeComponent.js
 *
 * 
 *
 * @internal ************************* [ file info. start ] *********************************
 *
 * @category		
 * @package		
 * @author
 * @filesource
 * @fileoverview

 * @_uses		
 * @_todo
 * @_tutorial		
 * @_version		
 * @_abstract
 * @_final			
 * @_internal
 * @_date
 * 
 * @internal ************************* [ file info. end ] *********************************
 */


var LGImeComponentClass = defineClass({

	extend : BaseComponentClass,

	name : 'lgImeClass',
// Hor Ime 추가 작업으로 수정(sophia 5.9)
//	construct : function(){
	construct : function(pKeyBoardType){	
		var ImeZoneDefine;
		
		// 상위클래스에 체이닝
		this.superclass();

		// Hor Ime 추가 작업으로 추가(sophia 5.9)		
		if(typeof pKeyBoardType == "undefined") pKeyBoardType = 1; 								// keyboard_vertical type
		
		
		// keyboard_vertical type
		if(pKeyBoardType == 1) {
			// Ime zone 정의
			ImeZoneDefine = "<!-- ime --> " +
								"	<div class='box_ime'>" +
								"		<div id='web_keyboard_keys' class='ime'> " +  
										
								"		<!-- Row1 --> " +  
								"		<div class='voneRowDivStyle' style='top: 21px;' id='wkk_key_0'>" +   
								"			<div id='wkk_key_00' class='vbtnNormal' style='left: 20px;'>&nbsp;</div>" +   
								"			<div id='wkk_key_01' class='vbtnNormal' style='left: 92px;'>&nbsp;</div> " +  
								"			<div id='wkk_key_02' class='vbtnNormal' style='left: 164px;'>&nbsp;</div> " +    
								"			<div id='wkk_key_03' class='vbtnNormal' style='left: 236px;'>&nbsp;</div> " +    
								"			<div id='wkk_key_04' class='vbtnNormal' style='left: 308px;'>&nbsp;</div> " +    
								"			<div id='wkk_key_05' class='vbtnNormal' style='left: 380px;'>&nbsp;</div> " +    		
								"		</div> " +  
										
								"		<!-- Row2 -->" +   
								"		<div class='voneRowDivStyle' style='top: 73px;' id='wkk_key_1'>" +   
								"			<div id='wkk_key_10' class='vbtnNormal' style='left: 20px;'>&nbsp;</div> " +     
								"			<div id='wkk_key_11' class='vbtnNormal' style='left: 92px;'>&nbsp;</div> " +    
								"			<div id='wkk_key_12' class='vbtnNormal' style='left: 164px;'>&nbsp;</div> " +    
								"			<div id='wkk_key_13' class='vbtnNormal' style='left: 236px;'>&nbsp;</div> " +    
								"			<div id='wkk_key_14' class='vbtnNormal' style='left: 308px;'>&nbsp;</div> " +    
								"			<div id='wkk_key_15' class='vbtnNormal' style='left: 380px;'>&nbsp;</div> " +    		
								"		</div>			" +  
										
								"		<!-- Row3 -->" +   
								"		<div class='voneRowDivStyle' style='top: 125px;' id='wkk_key_2'>" +   
								"			<div id='wkk_key_20' class='vbtnNormal' style='left: 20px;'>&nbsp;</div> " +     
								"			<div id='wkk_key_21' class='vbtnNormal' style='left: 92px;'>&nbsp;</div> " +    
								"			<div id='wkk_key_22' class='vbtnNormal' style='left: 164px;'>&nbsp;</div> " +    
								"			<div id='wkk_key_23' class='vbtnNormal' style='left: 236px;'>&nbsp;</div> " +    
								"			<div id='wkk_key_24' class='vbtnNormal' style='left: 308px;'>&nbsp;</div> " +    
								"			<div id='wkk_key_25' class='vbtnNormal' style='left: 380px;'>&nbsp;</div> " +    		
								"		</div>			" +  
									
								"		<!-- Row4 --> " +  
								"		<div class='voneRowDivStyle' style='top: 177px;' id='wkk_key_3'>" +   
								"			<div id='wkk_key_30' class='vbtnNormal' style='left: 20px;'>&nbsp;</div> " +     
								"			<div id='wkk_key_31' class='vbtnNormal' style='left: 92px;'>&nbsp;</div> " +    
								"			<div id='wkk_key_32' class='vbtnNormal' style='left: 164px;'>&nbsp;</div> " +    
								"			<div id='wkk_key_33' class='vbtnNormal' style='left: 236px;'>&nbsp;</div> " +    
								"			<div id='wkk_key_34' class='vbtnNormal' style='left: 308px;'>&nbsp;</div> " +    
								"			<div id='wkk_key_35' class='vbtnNormal' style='left: 380px;'>&nbsp;</div> " +    		
								"		</div> " +  
										
								"		<!-- Row5 -->" +   
								"		<div class='voneRowDivStyle' style='top: 228px;' id='wkk_key_4'>" +   
								"			<div id='wkk_key_40' class='vbtnNormal' style='left: 20px;'>&nbsp;</div> " +     
								"			<div id='wkk_key_41' class='vbtnNormal' style='left: 92px;'>&nbsp;</div> " +    
								"			<div id='wkk_key_42'  class='vbtnNormal' style='left: 164px;'>&nbsp;</div> " +    
								"			<div id='wkk_key_43' class='vbtnNormal' style='left: 236px;'>&nbsp;</div> " +    
								"			<div id='wkk_key_44' class='vbtnNormal' style='left: 308px;'>&nbsp;</div> " +    
								"			<div id='wkk_key_45' class='vbtnNormal' style='left: 380px;'>&nbsp;</div> " +    		
								"		</div>		" +  
										
								"		<!-- Row6 --> " +  
								"		<div class='voneRowDivStyle' style='top: 280px;' id='wkk_key_5'>" +   
								"			<div id='wkk_key_50' class='vbtnNormal' style='left: 20px;'>&nbsp;</div>" +   
								"			<div id='wkk_key_51' class='vbtnNormal' style='left: 92px;'>&nbsp;</div> " +  
								"			<div id='wkk_key_52' class='vbtnNormal' style='left: 164px;'>&nbsp;</div> " +  
								"			<div id='wkk_key_53' class='vbtnNormal' style='left: 236px;'>&nbsp;</div> " +  
											
								"			<!-- Left Arrow --> " +  
								"			<div id='wkk_key_54' class='vbtnNormal' style='left: 308px;'>" +   
								"				<img src='../image/ime/VER_KEYBOARD_BTN_LEFT_N.png'>" +  
								"			</div> " +  
											
								"			<!-- Right Arrow -->" +   
								"			<div id='wkk_key_55' class='vbtnNormal' style='left: 380px;'>" +   
								"				<img src='../image/ime/VER_KEYBOARD_BTN_RIGHT_N.png'>" +  
								"			</div>				" +  
								"		</div>		" +  
										
								"		<!-- Row7 --> " +  
								"		<div class='voneRowDivStyle' style='top: 332px;' id='wkk_key_6'>" +   
								"			<div id='wkk_key_60' class='vbtnNormal' style='left: 20px;'>&nbsp;</div>" +   
								"			<div id='wkk_key_61' class='vbtnNormal' style='left: 92px;'>&nbsp;</div> " +  
								"			<div id='wkk_key_62' class='vbtnNormal' style='left: 164px;'>&nbsp;</div> " +  
								"			<div id='wkk_key_63' class='vbtnNormal' style='left: 236px;'>	" +  
								"				<img src='../image/ime/VER_KEYBOARD_BTN_SPACE2_N.png'> " +  
								"			</div> " +  
								"			<div id='wkk_key_65' class='vbtnNormal' style='left: 380px;'>" +   
								"				<img src='../image/ime/VER_KEYBOARD_BTN_BACK_N.png'> " +  
								"			</div>" +  
								"		</div> " +  
								"	</div> " +  			
								
								"	<!-- Hidden Area --> " +
								"	<div id='wkk_key_focus_n' class='vbtnNormalFocus' style='left: 308px; z-index : 1000; visibility: hidden;'></div>" +
								"	<!-- Language Toggle --> " +
								"	<div id='wkk_key_focus_m2' class='vbtnSmallFocus' style='left: 308px; z-index : 1000; visibility: hidden;'>&nbsp;</div>" +
								"	<!-- s/t Toggle --> "+
								"	<div id='wkk_key_focus_st' class='vbtnSmallFocus' style='left: 308px; z-index : 1000; visibility: hidden;'>&nbsp;</div>" +
								"	<!-- char select --> "+
								"	<div id='wkk_key_focus_c' class='vbtnSmallFocus' style='left: 308px; z-index : 1000; visibility: hidden;'>&nbsp;</div>" +
								"	<!-- Space -->"+
								"	<div id='wkk_key_focus_s' class='vbtnNormalImageFocus' style='left: 308px; z-index : 1000; visibility: hidden;'>"+
								"		<img src='../image/ime/VER_KEYBOARD_BTN_SPACE2_P.png' style='margin-top: 20px' >"+
								"	</div>"+
								"	<!-- Back Space -->"+
								"	<div id='wkk_key_focus_b' class='vbtnNormalImageFocus' style='left: 308px; z-index : 1000; visibility: hidden;'>"+
								"		<img src='../image/ime/VER_KEYBOARD_BTN_BACK_P.png' style='margin-top: 20px' >"+
								"	</div>"+
								"	<!-- left Arrow -->"+
								"	<div id='wkk_key_focus_l_arrow' class='vbtnNormalImageFocus' style='left: 308px; z-index : 1000; visibility: hidden;'>"+
								"		<img src='../image/ime/VER_KEYBOARD_BTN_LEFT_P.png'>"+
								"	</div>"+
								"	<!-- right Arrow -->"+
								"	<div id='wkk_key_focus_r_arrow' class='vbtnNormalImageFocus' style='left: 308px; z-index : 1000; visibility: hidden;'>"+
								"		<img src='../image/ime/VER_KEYBOARD_BTN_RIGHT_P.png'>"+
								"	</div>"+
								"	<div id = 'langDiv'></div>"+
								" </div>" +
								" <form name='form2'> " +
								" <input type='hidden' name='checkedLang'  value=''/> " +
								" <input type='hidden' name='langToggleIdx'  value=''/> " +
								" <input type='hidden' name='layout'  value=''/> " +
								" <input type='hidden' name='langName'  value=''/> " +
								" <input type='hidden' name='cookieP1KeyId'  value=''/> " +
								" <input type='hidden' name='cookieP2KeyId'  value=''/> " +
								" </form> ";
			
		// keyboard_horizontal type
		} else if(pKeyBoardType == 2) {
			
			//wkk_key_58
			// Ime zone 정의
			ImeZoneDefine = 	"<!-- ime --> " +
								"	<form name='form2'>" + 
								"		<input type='hidden' name='checkedLang'  value=' '/>" +
								"		<input type='hidden' name='langToggleIdx'  value=' '/>" +
								"		<input type='hidden' name='layout'  value=' '/>" +
								"		<input type='hidden' name='langName'  value=' '/>" +	
								"		<input type='hidden' name='cookieP1KeyId'  value=' '/>" +
								"		<input type='hidden' name='cookieP2KeyId'  value=' '/>	" +	
								"	</form>" +
								"	<div id='langDiv'></div>";
			
								// InputPopup에 Input이 있는 경우 Ime 위치 변경으로 css가 변경되어야 함.
								if($("#wkk_key_58").size() > 0) {
									ImeZoneDefine += 	"	<div id='web_keyboard' class='ime1'> ";
								} else {
									ImeZoneDefine += 	"	<div id='web_keyboard' class='ime2'> ";
								}
								
								
			ImeZoneDefine += 	"		<div id='wkk_key' class='horKeyboardInputboxStyle'></div>"+
								"		<div id='hiddenField'></div>"+
								"		<div id='wkk_close' class='wkk_close'></div>"+
								"		<div id='web_keyboard_keys'> "+
								"			<!-- Level 1 Start --> " +
								"			<div id='wkk_key_0' class='horOneRowDivStyle'>" +
								"				<!--Lang Select -->" +
								"				<div id='wkk_key_000' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_001' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_002' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_003' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_004' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_005' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_006' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_007' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_008' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_009' class='horBtn'>&nbsp;</div>"+
								"				<!-- Enter -->"+
								/*"				<div id='wkk_key_014' class='horBtn'>"+
								"				<div class='horBtn'>"+
								"				<div id='wkk_key_010' class='horBtn'>"+
								"					<img src='../images/ime/horizontal/HOR_KEYBOARD_BTN_03_N.png'>"+
								"				</div>"+*/
								"				<!--Back space -->"+
								//"				<div id='wkk_key_015' class='horBtn'>"+
								"				<div id='wkk_key_010' class='horBtn'>"+
								"					<img src='../images/ime/horizontal/HOR_KEYBOARD_BTN_BACK_N.png'>"+
								"				</div>"+
								"			</div>"+
								"			<!-- Level 1 End -->"+
								"			<!-- Level 2 Start -->"+
								"			<div id='wkk_key_1' class='horOneRowDivStyle'>"+
								"				<!-- s/t Toggle -->"+
								"				<div id='wkk_key_100' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_101' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_102' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_103' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_104' class='horBtn'>&nbsp;</div>"+
								"			 	<div id='wkk_key_105' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_106' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_107' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_108' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_109' class='horBtn'>&nbsp;</div>"+
								"				<!--Left arrow -->"+
								/*"				<div id='wkk_key_114' class='horBtn'>"+
								"					<img src='../images/ime/horizontal/HOR_KEYBOARD_BTN_LEFT_N.png'>"+
								"				</div>"+
								"				<!--Right arrow -->"+
								"				<div id='wkk_key_115' class='horBtn'>"+
								"					<img src='../images/ime/horizontal/HOR_KEYBOARD_BTN_RIGHT_N.png'>"+				
								"				</div>"+*/
								"				<div id='wkk_key_110' class='horBtn'>"+
								"					<img src='../images/ime/horizontal/HOR_KEYBOARD_BTN_03_N.png'>"+
								"				</div>"+
								"			</div>	"+
								"			<!-- Level 2 End -->"+	
								"			<!-- Level 3 Start -->"+
								"			<div id='wkk_key_2' class='horOneRowDivStyle'>"+
								"				<!--Char Select -->"+
								"				<div id='wkk_key_200' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_201' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_202' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_203' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_204' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_205' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_206' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_207' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_208' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_209' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_210' class='horBtn'>"+
								"					<img src='../images/ime/horizontal/HOR_KEYBOARD_BTN_LEFT_N.png'>"+
								"				</div>"+
								"				<!--Right arrow -->"+
								"				<div id='wkk_key_211' class='horBtn'>"+
								"					<img src='../images/ime/horizontal/HOR_KEYBOARD_BTN_RIGHT_N.png'>"+				
								"				</div>"+								
								/*"				<div id='wkk_key_210' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_211' class='horBtn'>&nbsp;</div>"+*/
								"			</div>"+	
								"			<!-- Level 3 End -->"+	
								"			<!-- Level 4 Start -->"+	
								"			<div id='wkk_key_3' class='horOneRowDivStyle'>"+	
								"				<!-- char select -->"+	
								"				<div id='wkk_key_300' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_301' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_302' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_303' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_304' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_305' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_306' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_307' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_308' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_309' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_310' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_311' class='horBtn'>&nbsp;</div>"+
								/*"				<!--Hidden -->"+	
								"				<div id='wkk_key_310' class='horBtn'>"+	
								"					<img src='../images/ime/horizontal/HOR_KEYBOARD_BTN_HIDE_N.png'>"+	
								"				</div>"+	*/
								"			</div>"+		
								"			<!--Level 4d End -->"+	
								"			<!-- Level 5 Start -->"+	
								"			<div id='wkk_key_4' class='horOneRowDivStyle'>"+	
								"				<div id='wkk_key_400' class='horBtn'>&nbsp;</div>"+
								//"				<div id='wkk_key_401' class='horBtn'>&nbsp;</div>"+
								"				<!-- SPACE -->"+
								//"				<div id='wkk_key_402' class='btnHorLong'>"+
								"				<div id='wkk_key_401' class='btnHorLong'>"+
								"					<img src='../images/ime/horizontal/HOR_KEYBOARD_BTN_SPACE_N.png'>"+
								"				</div>"+
								/*"				<div id='wkk_key_409' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_410' class='horBtn'>&nbsp;</div>"+
								"				<div id='wkk_key_411' class='horBtn'>&nbsp;</div>"+*/
								"				<!--Hidden -->"+	
								"				<div id='wkk_key_402' class='horBtn'>"+	
								"					<img src='../images/ime/horizontal/HOR_KEYBOARD_BTN_HIDE_N.png'>"+	
								"				</div>"+
								"			</div>"+
								"			<!-- Level 5 End -->"+
								"			<div id='wkk_key_focus_n' class='btnHorFocus' style='visibility: hidden;'>&nbsp;</div>"+
								"			<!-- Language Select -->"+
								"			<div id='wkk_key_focus_n4' class='btnHorFocus' style='visibility: hidden;'>&nbsp;</div>"+
								"		 	<!-- back space -->"+
								"		 	<div id='wkk_key_focus_n2' class='btnHorFocus2' style='visibility: hidden;'>"+
								"				<img src='../images/ime/horizontal/HOR_KEYBOARD_BTN_BACK_P.png'>"+
								"			</div>"+
								"			<!-- Small/Large Char Toggle -->"+
								"			<div id='wkk_key_focus_n5' class='btnHorFocus' style='visibility: hidden;'>&nbsp;</div>"+
								"			<!-- Lang Toggle -->"+
								"			<div id='wkk_key_focus_n1' class='btnHorFocus' style='visibility: hidden;'>&nbsp;</div>"+
								"			<!-- Left Arrow -->"+
								"			<div id='wkk_key_focus_n_la' class='btnHorFocus2' style='visibility: hidden;'>"+
								"				<img src='../images/ime/horizontal/HOR_KEYBOARD_BTN_LEFT_P.png'>"+
								"			</div>"+
								"			<!-- Rigth Arrow -->"+
								"			<div id='wkk_key_focus_n_ra' class='btnHorFocus2' style='visibility: hidden;'>"+
								"				<img src='../images/ime/horizontal/HOR_KEYBOARD_BTN_RIGHT_P.png'>"+
								"			</div>"+
								"			<!-- char select -->"+
								"			<div id='wkk_key_focus_ns' class='btnHorFocus' style='visibility: hidden;'>&nbsp;</div>"+
								"			<!--space -->"+
								"			<div id='wkk_key_focus_l' class='btnHorLongFocus' style='visibility: hidden;'>"+
								"				<img src='../images/ime/horizontal/HOR_KEYBOARD_BTN_SPACE_P.png'>"+
								"			</div>"+
								"			<!-- Hidden -->"+
								"			<div id='wkk_key_focus_m_hdd' class='btnHorMiddleImgFocus' style='visibility: hidden;'>"+
								"				<img src='../images/ime/horizontal/HOR_KEYBOARD_BTN_HIDE_P.png'>"+
								"			</div>"+
								"		</div>"+
								"		<!-- pop up supoort : for your performance, Be comment 'div' taht you do not use. -->"+
								"		<div id='web_keyboard_popup_bg' class='hkeyboardArea' style='visibility: hidden;'>"+
								"			<div id='mini_popup_04' class='hminiPopUp04' style='visibility: hidden;'>"+
								"				<div id='wkk_p04_00' class='hbtnPopUp'>&nbsp;</div>"+
								"				<div id='wkk_p04_01' class='hbtnPopUp'>&nbsp;</div>"+
								"				<div id='wkk_p04_02' class='hbtnPopUp'>&nbsp;</div>"+
								"			</div>"+
								"			<div id='mini_popup_01' class='hminiPopUp01' style='visibility: hidden;'>"+
								"				<div id='wkk_p01_00' class='hbtnPopUp'>&nbsp;</div>"+
								"				<div id='wkk_p01_01' class='hbtnPopUp'>&nbsp;</div>"+
								"				<div id='wkk_p01_02' class='hbtnPopUp'>&nbsp;</div>"+
								"				<div id='wkk_p01_03' class='hbtnPopUp'>&nbsp;</div>"+
								"				<div id='wkk_p01_04' class='hbtnPopUp'>&nbsp;</div>"+
								"				<div id='wkk_p01_10' class='hbtnPopUp'>&nbsp;</div>"+
								"				<div id='wkk_p01_11' class='hbtnPopUp'>&nbsp;</div>"+
								"				<div id='wkk_p01_12' class='hbtnPopUp'>&nbsp;</div>"+
								"				<div id='wkk_p01_13' class='hbtnPopUp'>&nbsp;</div>"+
								"				<div id='wkk_p01_14' class='hbtnPopUp'>&nbsp;</div>"+
								"			</div>"+
								"			<div id='mini_popup_02' class='hminiPopUp02' style='visibility: hidden;' >"+
								"				<div id='wkk_p02_00' class='hbtnPopUp'>&nbsp;</div>"+
								"				<div id='wkk_p02_01' class='hbtnPopUp'>&nbsp;</div>"+
								"				<div id='wkk_p02_02' class='hbtnPopUp'>&nbsp;</div>"+
								"				<div id='wkk_p02_03' class='hbtnPopUp'>&nbsp;</div>"+
								"			</div>"+
								"			<div id='mini_popup_03' class='hminiPopUp03' style='visibility: hidden;'>"+
								"				<div id='wkk_p03_00' class='hbtnPopUp'>&nbsp;</div>"+
								"				<div id='wkk_p03_01' class='hbtnPopUp'>&nbsp;</div>"+
								"				<div id='wkk_p03_02' class='hbtnPopUp'>&nbsp;</div>"+
								"				<div id='wkk_p03_03' class='hbtnPopUp'>&nbsp;</div>"+
								"				<div id='wkk_p03_04' class='hbtnPopUp'>&nbsp;</div>"+
								"				<div id='wkk_p03_05' class='hbtnPopUp'>&nbsp;</div>"+
								"			</div>"+
								"			<div id='mini_popup_05' class='hminiPopUp05' style='visibility: hidden;'>"+
								"				<div id='wkk_p05_00' class='hbtnPopUp'>&nbsp;</div>"+
								"				<div id='wkk_p05_01' class='hbtnPopUp'>&nbsp;</div>"+
								"				<div id='wkk_p05_02' class='hbtnPopUp'>&nbsp;</div>"+
								"				<div id='wkk_p05_03' class='hbtnPopUp'>&nbsp;</div>"+
								"				<div id='wkk_p05_04' class='hbtnPopUp'>&nbsp;</div>"+
								"			</div>"+
								"			<div id='wkk_key_focus_pn' class='hbtnNormalFocus' style='left: 605px; z-index : 5000; visibility: hidden;'>&nbsp;</div>"+
								"		</div>"+
								"		<!-- Select Lang Start -->"+
								"		<div id='layer_ifr3' style='display:none; position:absolute; top:0px; left:0%; width: 1280px; height:768px;'>"+
								"			<iframe name='ifr3' style='width:100%; height:100%' frameborder='0' scrolling='no'></iframe>"+
								"		</div>"+
								"		<div id='layer_ifr1' style='display:none; position:absolute; top:80px; left:0%;margin-left:-50px; width:50x; height:540px;'>"+
								"			<iframe name='ifr1' style='width:100%; height:100%' frameborder='0' scrolling='no'></iframe>"+
								"		</div>"+
								"		<div id='layer_ifr' style='display:none; position:absolute; top:80px; left:50%;margin-left:-380px; width:722px; height:540px;'>"+
								"			<iframe name='ifr' style='width:100%; height:100%' frameborder='0' scrolling='no'></iframe>"+
								"		</div>"+
								"		<div id='layer_ifr2' style='display:none; position:absolute; top:80px; left:60%;margin-left:210px; width:300px; height:540px;'>"+
								"			<iframe name='ifr2' style='width:100%; height:100%' frameborder='0' scrolling='no'></iframe>"+
								"		</div>"+
								"		<!-- Select Lang End -->"+
								"	</div>"
		}

		
		// 인스턴스 변수들을 정의한다
		this._init([
		    'strImeZoneDom',
		    'imeInputName',			// IME 입력되어야 할 InputName
		    'callbackZone',			// IME 입력 완료시 Focus를 넘겨줄 Zone
		    'defaultLanguage',		// IME 기본 language
		    'Fn_Key_RETURN',		// IME 포커싱 된 상태에서 리모컨의 이전 버튼 클릭시 호출할 함수
		    // sophia 추가 (5.4)
		    'init_callback',
		    
		    'keyBoardType',			//IME Layout 값 (0 : IME Layout1 / 1 : IME Layout2 / 3: IME Layout3)	
		    'currentPageIdx',
		    'gubun',
		    'langToggleState',
		    'currentKeyId',
		    'isCaretActive',
		    'currentCaretIdx',
		    'miniPopUpSupport',
		    'currentPopUpInfo',
		    'miniPopUpActivated',
		    'currentPopUpKeyId',
		    'langTogglIdx',
		    'langToggleClickState',
		    'totalcheckedValue',
		    'stIdx',
		    'flag',
		    'leftArrow_FisrtClick',
			//onAnyCharInsert 추가
			//2012-08-10 [14:31:17] @SoonyoungPark
			'onAnyCharInsert',
			'onBackspace'
		]);
		//onAnyCharInsert 추가
		//2012-08-10 [14:31:17] @SoonyoungPark
		this._set({onAnyCharInsert : function(){}, onBackspace : function(){}});
		// 컴포넌트를 사용중인 컨트롤러 인스턴스를 저장한다
		this._set({imeInputName:'', callbackZone:'InputPopup', init_callback:''});
		// ime Keyboardtype 초기화 값으로 세팅(5.9 by sohpia)
		//this._set({keyBoardType:0, strImeZoneDom:ImeZoneDefine, gubun:'lang', langToggleState:0, isCaretActive:false});
		this._set({keyBoardType:pKeyBoardType, strImeZoneDom:ImeZoneDefine, gubun:'lang', langToggleState:0, isCaretActive:false});
		this._set({currentCaretIdx : 0, miniPopUpSupport: false, currentPopUpInfo : null, miniPopUpActivated : false, currentPopUpKeyId :''});
		this._set({langTogglIdx : 0, langToggleClickState : 0, totalcheckedValue : '', stIdx:10, flag:true, leftArrow_FisrtClick:false});

		// zone DIV 를 dom 구조에 추가
		var ImeDiv = skFn.dom.makeDiv ({
			sID : 'SceneIme',
			sStyle : 'visibility:hidden',
			ePosWin : window,
			ePosRef : document.body,
			sPosRef : 'Inside',
			bAppend : true ,
			sContent : this._get('strImeZoneDom')
		});
		
		var _comp = this;
		
    	if(pKeyBoardType == 1) {
			zone['Ime'] = {
					initialize : function(){},
					handleShow : function(){},
					handleHide : function(){},
					handleFocus : function(){
						LGImeComponent.onFocus();
					},
					handleBlur : function(){
						_comp.cancelHighlight("wkk_key_60");
						_comp.cancelHighlight("wkk_key_61");
						_comp.cancelHighlight("wkk_key_62");
						_comp.cancelHighlight("wkk_key_63");
						_comp.cancelHighlight("wkk_key_65");
						_comp.cancelHighlight("wkk_key_54");
						_comp.cancelHighlight("wkk_key_55");
	
	   				},
					handleKeyDown : function(keyCode){
						switch (keyCode) {
							case skTv.keymap.UP:
							case skTv.keymap.DOWN:
							case skTv.keymap.LEFT:
							case skTv.keymap.RIGHT:
								_comp.keyMove(keyCode);
								break;							
								
							case skTv.keymap.RETURN :
								if(_comp._get("Fn_Key_RETURN") != "") {
									eval(_comp._get("Fn_Key_RETURN"));
								}
								break;
								
							case skTv.keymap.ENTER:
								skFn.debug.log('========== skTv.keymap.ENTER ==========');
								if(_comp._get('miniPopUpActivated')) {
									//alert('execKeyPopUp!!!');
									//execKeyPopUp();
								} else {
									if ( _comp._get('currentKeyId') != null ) {					
										_comp.execKey(_comp._get('currentKeyId'));	
										_comp.setInputFocus();
										if(_comp._get('currentKeyId') == "wkk_key_214"){
											_comp._set({currentKeyId : null});
										}
									}
									else if(_comp._get('currentKeyId') == null){					
										//visibleKeyboard();
										_comp.setInputFocus();
									}
								}
								
								break;
								
							default :
								if(_comp._get('miniPopUpActivated')) {
									//do nothing.
								} else {
									var key = _comp.getKeyIdFromKeyCode(keyCode);
									if(key != null) {
										_comp.execKey(key);
										_comp.doHighlight(key);
										_comp._set({currentKeyId : key});
									}
								}
								break;							
						}
					},
			        handleMouse : {
		                '.box_ime .voneRowDivStyle > div' : {
	                        'mouseover' : function(){
	                        	_comp.doHighlight($(this).attr("id"));
	                        }
		                },
		                '#wkk_key_focus_n, #wkk_key_focus_m2, #wkk_key_focus_st, #wkk_key_focus_c, #wkk_key_focus_s, #wkk_key_focus_b, #wkk_key_focus_l_arrow, #wkk_key_focus_r_arrow' : {
		                    'mouseout' : function(){
		                    	switch ($(this).attr("id")){
		                    		case "wkk_key_focus_n" :
		                    			_comp.cancelHighlight("wkk_key_focus");
	                    			break;
		                    			
		                    		case "wkk_key_focus_m2" :
		                    			_comp.cancelHighlight("wkk_key_60");
	                    			break;
	
		                    		case "wkk_key_focus_st" :
		                    			_comp.cancelHighlight("wkk_key_61");
	                    			break;
	
		                    		case "wkk_key_focus_c" :
		                    			_comp.cancelHighlight("wkk_key_62");
	                    			break;
	
		                    		case "wkk_key_focus_s" :
		                    			_comp.cancelHighlight("wkk_key_63");
	                    			break;
	
		                    		case "wkk_key_focus_b" :
		                    			_comp.cancelHighlight("wkk_key_65");
	                    			break;
	
		                    		case "wkk_key_focus_l_arrow" :
		                    			_comp.cancelHighlight("wkk_key_54");
	                    			break;
	                    			
		                    		case "wkk_key_focus_r_arrow" :
		                    			_comp.cancelHighlight("wkk_key_55");
	                    			break;
		                    	}
		                    },
	                        'mousedown' : function(){
		                    	switch ($(this).attr("id")){
		                    		case "wkk_key_focus_n" :
		                    			_comp.mouseDown("wkk_key_focus");
		                			break;
		                    			
		                    		case "wkk_key_focus_m2" :
		                    			_comp.mouseDown("wkk_key_60");
		                			break;
		
		                    		case "wkk_key_focus_st" :
		                    			_comp.mouseDown("wkk_key_61");
		                			break;
		
		                    		case "wkk_key_focus_c" :
		                    			_comp.mouseDown("wkk_key_62");
		                			break;
		
		                    		case "wkk_key_focus_s" :
		                    			_comp.mouseDown("wkk_key_63");
		                			break;
		
		                    		case "wkk_key_focus_b" :
		                    			_comp.mouseDown("wkk_key_65");
		                			break;
		
		                    		case "wkk_key_focus_l_arrow" :
		                    			_comp.mouseDown("wkk_key_54");
		                			break;
		                			
		                    		case "wkk_key_focus_r_arrow" :
		                    			_comp.mouseDown("wkk_key_55");
		                			break;
		                    	}
	                        }
		                },
	                    'onmouseup' : function(){
	                    	_comp.setInputFocus();                    
	                    }
			        }
				}
    	} else if(pKeyBoardType == 2) {
			zone['Ime'] = {
					initialize : function(){},
					handleShow : function(){},
					handleHide : function(){},
					handleFocus : function(){
						LGImeComponent.onFocus();
					},
					handleBlur : function(){
						//_comp.cancelHighlight("wkk_key_58");
						_comp.cancelHighlight("wkk_key_focus");
						_comp.cancelHighlight("wkk_key_000");
						//_comp.cancelHighlight("wkk_key_014");
						//_comp.cancelHighlight("wkk_key_015");
						_comp.cancelHighlight("wkk_key_010");
						//_comp.cancelHighlight("wkk_key_011");
						_comp.cancelHighlight("wkk_key_100");
						_comp.cancelHighlight("wkk_key_116");
						//_comp.cancelHighlight("wkk_key_114");
						_comp.cancelHighlight("wkk_key_210");
						//_comp.cancelHighlight("wkk_key_115");
						_comp.cancelHighlight("wkk_key_211");						
						_comp.cancelHighlight("wkk_key_200");
						_comp.cancelHighlight("wkk_key_401");
						//_comp.cancelHighlight("wkk_key_402");
						//_comp.cancelHighlight("wkk_key_310");
						_comp.cancelHighlight("wkk_key_402");						
	   				},
					handleKeyDown : function(keyCode){
						switch (keyCode) {
							case skTv.keymap.UP:
							case skTv.keymap.DOWN:
							case skTv.keymap.LEFT:
							case skTv.keymap.RIGHT:
								_comp.keyMove(keyCode);
								break;							
								
							case skTv.keymap.RETURN :
								if(_comp._get("Fn_Key_RETURN") != "") {
									eval(_comp._get("Fn_Key_RETURN"));
								}
								break;
								
							case skTv.keymap.ENTER:
								skFn.debug.log('========== skTv.keymap.ENTER ==========');
								if(_comp._get('miniPopUpActivated')) {
									//alert('execKeyPopUp!!!');
									//execKeyPopUp();
								} else {
									if ( _comp._get('currentKeyId') != null ) {					
										_comp.execKey(_comp._get('currentKeyId'));	
										_comp.setInputFocus();
										if(_comp._get('currentKeyId') == "wkk_key_214"){
											_comp._set({currentKeyId : null});
										}
									}
									else if(_comp._get('currentKeyId') == null){					
										//visibleKeyboard();
										_comp.setInputFocus();
									}
								}
								
								break;
								
							default :
								if(_comp._get('miniPopUpActivated')) {
									//do nothing.
								} else {
									var key = _comp.getKeyIdFromKeyCode(keyCode);
									if(key != null) {
										_comp.execKey(key);
										_comp.doHighlight(key);
										_comp._set({currentKeyId : key});
									}
								}
								break;							
						}
					},
			        handleMouse : {
		                '#web_keyboard_keys .horOneRowDivStyle > div' : {
	                        'mouseover' : function(){
	                        	_comp.doHighlight($(this).attr("id"));
	                        }
		                },
		                '#wkk_key_focus_n, #wkk_key_focus_n4, #wkk_key_focus_n2, #wkk_key_focus_n5, #wkk_key_focus_n1, #wkk_key_focus_n_la, #wkk_key_focus_n_ra, #wkk_key_focus_ns, #wkk_key_focus_l, #wkk_key_focus_m_hdd' : {
		                    'mouseout' : function(){
		                    	switch ($(this).attr("id")){
		                    		case "wkk_key_focus_n" :
		                    			_comp.cancelHighlight("wkk_key_focus");
		                    			break;
		                    			
		                    		case "wkk_key_focus_n4" :
		                    			_comp.cancelHighlight("wkk_key_000");
		                    			break;
		
		                    		case "wkk_key_focus_n2" :
		                    			//_comp.cancelHighlight("wkk_key_015");
		                    			_comp.cancelHighlight("wkk_key_010");
		                    			break;
		
		                    		case "wkk_key_focus_n5" :
		                    			_comp.cancelHighlight("wkk_key_100");
		                    			break;
		
		                    		case "wkk_key_focus_n1" :
		                    			_comp.cancelHighlight("wkk_key_116");
		                    			break;
		
		                    		case "wkk_key_focus_n_la" :
		                    			//_comp.cancelHighlight("wkk_key_114");
		                    			_comp.cancelHighlight("wkk_key_210");		                    			
		                    			break;
		                			
		                    		case "wkk_key_focus_n_ra" :
		                    			//_comp.cancelHighlight("wkk_key_115");
		                    			_comp.cancelHighlight("wkk_key_211");		                    			
		                    			break;

		                    		case "wkk_key_focus_ns" :
		                    			_comp.cancelHighlight("wkk_key_200");
		                    			break;

		                    		case "wkk_key_focus_l" :
		                    			//_comp.cancelHighlight("wkk_key_402");
		                    			_comp.cancelHighlight("wkk_key_401");		                    			
		                    			break;

		                    		case "wkk_key_focus_m_hdd" :
		                    			//_comp.cancelHighlight("wkk_key_310");
		                    			_comp.cancelHighlight("wkk_key_402");		                    			
		                    			break;
		                    	}
		                    },
	                        'mousedown' : function(){
		                    	switch ($(this).attr("id")){
		                    		case "wkk_key_focus_n" :
		                    			_comp.mouseDown("wkk_key_focus");
		                    			break;
		                    			
		                    		case "wkk_key_focus_n4" :
		                    			_comp.mouseDown("wkk_key_000");
		                    			break;
		
		                    		case "wkk_key_focus_n2" :
		                    			//_comp.mouseDown("wkk_key_015");
		                    			_comp.mouseDown("wkk_key_010");
		                    			break;
		
		                    		case "wkk_key_focus_n5" :
		                    			_comp.mouseDown("wkk_key_100");
		                    			break;
		
		                    		case "wkk_key_focus_n1" :
		                    			_comp.mouseDown("wkk_key_116");
		                    			break;
		
		                    		case "wkk_key_focus_n_la" :
		                    			//_comp.mouseDown("wkk_key_114");
		                    			_comp.mouseDown("wkk_key_210");
		                    			break;
		                			
		                    		case "wkk_key_focus_n_ra" :
		                    			//_comp.mouseDown("wkk_key_115");
		                    			_comp.mouseDown("wkk_key_211");		                    			
		                    			break;

		                    		case "wkk_key_focus_ns" :
		                    			_comp.mouseDown("wkk_key_200");
		                    			break;

		                    		case "wkk_key_focus_l" :
		                    			//_comp.mouseDown("wkk_key_402");
		                    			_comp.mouseDown("wkk_key_401");		                    			
		                    			break;

		                    		case "wkk_key_focus_m_hdd" :
		                    			//_comp.mouseDown("wkk_key_310");
		                    			_comp.mouseDown("wkk_key_402");		                    			
		                    			break;
		                    	}
	                        }
		                },
	                    'onmouseup' : function(){
	                    	_comp.setInputFocus();                    
	                    }
			        }
				}
    	}

	},

	methods : {
		/*
		 * onmousedown 이벤트시 사용
		 */
		mouseDown: function (keyId){
			skFn.debug.log('========== mouseDown ==========');
			var _comp = this;
			
			if(_comp.flag){
				_comp._set({flag:false});
				
				var timer=setTimeout(function(){
					_comp._set({flag:true});
				},1);
				
				_comp.execKey(keyId);

				setTimeout(function(){_comp.setInputFocus();},1);
				return;
			}
		},		
		/**
		 * set_onAnyCharInsert	
		 *	2012-08-06 [10:01:41] @SoonyoungPark 추가
		 *	: input box 에 문자 입력이 있을 시 실행할 함수 설정
		 * @function
		 * @param	{function} 
				ex : 	function(ch){
						}
		 * @return	{void}
		 */
		set_onAnyCharInsert : function(fnCallback){
			this._set({onAnyCharInsert : fnCallback});
		},
		/**
		 * set_onBackspace	
		 *	2012-08-06 [10:01:41] @SoonyoungPark 추가
		 *	: input box 에 문자 입력이 있을 시 실행할 함수 설정
		 * @function
		 * @param	{function} 
				ex : 	function(ch){
						}
		 * @return	{void}
		 */
		set_onBackspace : function(fnCallback){
			this._set({onBackspace : fnCallback});
		},
		setElementBackground : function (elementId, backGround) {
			skFn.debug.log('setElementBackground');
			var e = document.getElementById(elementId);
			if(e != null) {
				e.style.background = backGround;
			}
		},

		setElementVisibility : function (elementId, isVisible) {
			skFn.debug.log('setElementVisibility');
			var e = document.getElementById(elementId);
			if(e != null) {
				if (isVisible) {
					e.style.visibility="";		
				} else {
					e.style.visibility="hidden";
				}
			}
		},

		setElementFontSize : function (elementId, fontSize) {
			skFn.debug.log('setElementFontSize');
			var e = document.getElementById(elementId);
			if(e != null) {
				e.style.fontSize = fontSize;
			}
		},
		
		setInnerHtml : function (elementId, html) {
			skFn.debug.log('setInnerHtml');
			var e = document.getElementById(elementId);
			if(e != null) {
				e.innerHTML = html;
			}
		},
		
		setInputFocus : function () {
			skFn.debug.log('setInputFocus');
			var _comp = this;
			var textItem = document.getElementById(_comp._get('imeInputName'));
			textItem.focus();
			
			try{
				textItem.blur();
				textItem.focus();
			}catch(e){
				//alert("error: " + e);
			}
		},
		
		/**
		 * return key's value
		 * @param keyId
		 * @return
		 */
		getKeyValue : function (keyId) {
			var keyItem = document.getElementById(keyId);

			if(keyItem != null) {
				skFn.debug.log('getKeyValue => keyId : ' + keyId + ', keyItem :' + keyItem.firstChild.nodeValue);
				return keyItem.firstChild.nodeValue;
			} else {
				skFn.debug.log('getKeyValue => keyId : ' + keyId + ', keyItem :null');
				return null;
			}
		},
		
		cancelHighlight : function (keyId){
			skFn.debug.log('cancelHighlight');
			var _comp = this;
			_comp.getKeyValue(keyId);
			//alert(keyId)
			document.getElementById('wkk_key_focus_n').style.visibility = 'hidden';

			
			// sophia 추가
        	switch (keyId){
	    		case "wkk_key_60" :
	    			document.getElementById('wkk_key_focus_m2').style.visibility = 'hidden';
	    			break;
	
	    		case "wkk_key_61" :
	    			document.getElementById('wkk_key_focus_st').style.visibility = 'hidden';
	    			break;
	
	    		case "wkk_key_62" :
	    			document.getElementById('wkk_key_focus_c').style.visibility = 'hidden';
	    			break;
	
	    		case "wkk_key_63" :
	    			document.getElementById('wkk_key_focus_s').style.visibility = 'hidden';
	    			break;
	
	    		case "wkk_key_65" :
	    			document.getElementById('wkk_key_focus_b').style.visibility = 'hidden';
	    			break;
	
	    		case "wkk_key_54" :
	    			document.getElementById('wkk_key_focus_l_arrow').style.visibility = 'hidden';
	    			break;
				
	    		case "wkk_key_55" :
	    			document.getElementById('wkk_key_focus_r_arrow').style.visibility = 'hidden';
	    			break;

	    		case "wkk_key_000" :
	    			document.getElementById('wkk_key_focus_n4').style.visibility = 'hidden';
	    			break;

	    		//case "wkk_key_015" :
	    		case "wkk_key_010" :
	    			document.getElementById('wkk_key_focus_n2').style.visibility = 'hidden';
	    			break;

	    		case "wkk_key_100" :
	    			document.getElementById('wkk_key_focus_n5').style.visibility = 'hidden';
	    			break;

	    		case "wkk_key_116" :
	    			document.getElementById('wkk_key_focus_n1').style.visibility = 'hidden';
	    			break;

	    		//case "wkk_key_114" :
	    		case "wkk_key_210" :
	    			document.getElementById('wkk_key_focus_n_la').style.visibility = 'hidden';
	    			break;

	    		//case "wkk_key_115" :
	    		case "wkk_key_211" :
	    			document.getElementById('wkk_key_focus_n_ra').style.visibility = 'hidden';
	    			break;

	    		case "wkk_key_200" :
	    			document.getElementById('wkk_key_focus_ns').style.visibility = 'hidden';
	    			break;

	    		//case "wkk_key_402" :
	    		case "wkk_key_401" :	    			
	    			document.getElementById('wkk_key_focus_l').style.visibility = 'hidden';
	    			break;

	    		//case "wkk_key_310" :
	    		case "wkk_key_402" :	    			
	    			document.getElementById('wkk_key_focus_m_hdd').style.visibility = 'hidden';
	    			break;
        	}
			// sophia 추가

        	/*
			if(keyId == 'wkk_key_70'){
				obj1.style.background = "url('../image/POPUP_BTN_NORMAL_L.png')";
				obj2.style.background = "url('../image/POPUP_BTN_NORMAL_M.png')";
				obj3.style.background = "url('../image/POPUP_BTN_NORMAL_R.png')";
			} else if(keyId == 'wkk_key_71'){
				obj4.style.background = "url('../image/POPUP_BTN_NORMAL_L.png')";
				obj5.style.background = "url('../image/POPUP_BTN_NORMAL_M.png')";
				obj6.style.background = "url('../image/POPUP_BTN_NORMAL_R.png')";
			}*/
		},
		
		/**
		 * return isHighLightable key?? except 'space', 'back space','switch page', 'ok', 'cancel' key 
		 * @param curPageIdx
		 * @param keyId
		 * @return true/false
		 */
		isHighlightableKey : function(curPageIdx, keyId) {
			skFn.debug.log('isHighlightableKey');
			var _comp = this;
			var keyValue = _comp.getKeyValue(keyId);
			if(keyValue == " "){
				return false;
			}
			return true;	

		},
		
		/*start of carot handle*/
		caretMoved : function () {
			skFn.debug.log('caretMoved');
			var _comp = this;
			imeLanguageInfo.setNewMode(0);
			_comp.setCaretPosition(_comp.getCaretPosition(), 0);
		},

		/**
		 * return Textbar's content
		 * @return
		 */
		getTextContent : function () {
			skFn.debug.log('getTextContent');
			var _comp = this;
			var textItem = document.getElementById(_comp._get('imeInputName'));
			if( textItem != null) {
				return textItem.value;
			}
			return null;
		},
		
		isCaretActivated : function () {
			skFn.debug.log('isCaretActivated => this._get("isCaretActive") : ' + this._get('isCaretActive'));
			return this._get('isCaretActive');
		}, 
		
		getCaretPosition : function () {
			skFn.debug.log('getCaretPosition => this._get("currentCaretIdx") :' + this._get('currentCaretIdx'));
			return this._get('currentCaretIdx');
		},
		
		doGetCaretPosition : function() {
			var _comp = this;
			oField = document.getElementById(_comp._get('imeInputName'));
			 // Initialize
			 var iCaretPos = 0;

			 // IE Support
			 if (document.selection) { 

			   // Set focus on the element
			   oField.focus ();
		  
			   // To get cursor position, get empty selection range
			   var oSel = document.selection.createRange ();
		  
			   // Move selection start to 0 position
			   oSel.moveStart ('character', -oField.value.length);
		  
			   // The caret position is selection length
			   iCaretPos = oSel.text.length;
			 }

			 // Firefox support
			 else if (oField.selectionStart || oField.selectionStart == '0')
			   iCaretPos = oField.selectionStart;

			 // Return results
			 return (iCaretPos);
	   },
		setTextContent : function (value) {
			skFn.debug.log('setTextContent');
			var textItem = document.getElementById(this._get('imeInputName'));
			console.log(textItem.id);
			if( textItem != null) {		
				textItem.value = value;
			}
		},
		
		setElementBackground : function (elementId, backGround) {
			skFn.debug.log('setElementBackground');
			var e = document.getElementById(elementId);
			if(e != null) {
				e.style.background = backGround;
			}
		},
		
		putStrIntoFld : function ( str, idx) {
			skFn.debug.log('putStrIntoFld => str : ' + str+", idx : " + idx);
			var _comp =  this;
			var kStr = "";
			if( str != null && str.length > 0 ) {
				kStr = str;
			}
			_comp.setTextContent(kStr);
			
			if(kStr.length == 0 ) {
				_comp.setCaretPosition(0, 0);	
			} else {
				_comp.setCaretPosition(new Number(idx)+1, 0);
			}
		},
		
		addCharToEnd : function (txt, c) {
			skFn.debug.log('addCharToEnd');
			var _comp =  this;
			var kJoin = txt + c;
			if(c.length > 1) {
				_comp.putStrIntoFld(kJoin, kJoin.length);
			} else {
				_comp.putStrIntoFld(kJoin, txt.length);
			}
		},
		
		addCharInMiddle : function (txt, c, idx) {
			skFn.debug.log('addCharInMiddle');
			var _comp =  this;
			var kTxt_0 = txt.substr(0, idx);
			var kTxt_1 = txt.substr(idx, txt.length);

			var kJoin = kTxt_0 + c + kTxt_1;
			if(c.length > 1) {
				_comp.putStrIntoFld(kJoin, new Number(idx) + c.length-1);
			} else {
				_comp.putStrIntoFld(kJoin, idx);
			}
			_comp.setCaretPosition(idx + c.length, 0);
		},
		
		overwriteCharToEnd : function (txt, c) {
			skFn.debug.log('overwriteCharToEnd');
			var _comp =  this;
			var kTxt = txt.substr(0, txt.length -1);
			_comp.putStrIntoFld(kTxt+c, kTxt.length);
		},
		
		overwriteCharInMiddle : function (txt, c, idx) {
			skFn.debug.log('overwriteCharInMiddle');
			var _comp =  this;
			var kTxt_0 = txt.substr(0,idx);
			var kTxt_1 = txt.substr(new Number(idx)+1, txt.length);
			_comp.putStrIntoFld(kTxt_0+ c + kTxt_1, idx);	
		},
		
		addStrIntoFld : function ( c , isNew, maxLen ) {
			skFn.debug.log('addStrIntoFld');
			var _comp =  this;
			if(maxLen == "undefined") maxLen = 100;

			var kTxt = _comp.getTextContent();
			var kTxtLen = kTxt.length;
			
			if( kTxtLen < maxLen ) {
				var kSelected = _comp.isCaretActivated();
				var kIdx = _comp.getCaretPosition();

				var kIsEnd = false;
				if(kSelected) {
					kIsEnd = (kIdx >= (new Number(kTxtLen) - 1));
				} else {
					kIsEnd = (kIdx >= kTxtLen);
				}
				if(isNew) { 
					if(kIsEnd) { 				
						_comp.addCharToEnd(kTxt, c);
					} else {
						if(kSelected) {
							_comp.addCharInMiddle(kTxt, c, kIdx+1);
						} else {
							_comp.addCharInMiddle(kTxt, c, kIdx);
						}
					}
				} else {			
					if (kIsEnd) {
						_comp.overwriteCharToEnd(kTxt, c);
					} else {
						_comp.overwriteCharInMiddle(kTxt, c, kIdx);
					}
				}
			}
		}, 
		
		setCaretPosition : function (pos, r) {
			skFn.debug.log('setCaretPosition');
			var _comp = this;
			if(pos<0){
				pos = 0;
			}	

			var ctrl = document.getElementById(_comp._get('imeInputName'));
			ctrl.focus();

			if(ctrl.setSelectionRange) 	{
				//		
				ctrl.setSelectionRange(pos, new Number(pos+r));
			} else if (ctrl.createTextRange) {
				//IE... 
				var range = ctrl.createTextRange();
				range.collapse(true);
				range.moveEnd('character', pos + r);
				range.moveStart('character', pos );
				range.select();
				ctrl.blur();
			}
			
			_comp._set({currentCaretIdx : pos});

			if(r > 0 ) {
				skFn.debug.log('setCaretPosition => pos : ' + pos + ', r : ' + r +', isCaretActive : true');
				_comp._set({isCaretActive: true});
			} else {
				skFn.debug.log('setCaretPosition => pos : ' + pos + ', r : ' + r +', isCaretActive : false');
				_comp._set({isCaretActive: false});
			}
		}, 	
		
		// input에서 키 움직일때 커서가 움직이지 않도록 추가 (원래 Ime에 있던 함수)(by sophia 4.25)
		setInputCaret : function() {
			/*if(!isFocus){
				event.returnValue=false;
			} */
			if(typeof event == 'object'){
				event.returnValue=false;
			}
			
		},
		
		/**
		 * return has black background.
		 * @param curPageIdx
		 * @param keyId
		 * @return true/false
		 */
		isBlackKey : function (curPageIdx, keyId) {
			skFn.debug.log('isBlackKey');
			var _comp = this;
			/* add */
			// for type 0,1
			var x = keyId.charAt(8);
			var y = keyId.charAt(9);	
			//for type 2
			var xx = keyId.charAt(8);
			var yy = keyId.substring(9,11);
			/* end */

			var keyValue = _comp.getKeyValue(keyId);
			
			if(keyValue == " "){
				return true;
			}
			
			/* add */
			 if(_comp._get('keyBoardType')==0 && _comp._get('gubun') == "lang" || _comp._get('gubun') == "sl"){
				 if(keyValue =="1" ||  keyValue =="2"  ||  keyValue =="3" ||  keyValue =="4" ||  keyValue =="5" ||
				    keyValue =="6"  || keyValue =="7" || keyValue =="8" || keyValue =="9" || keyValue =="0"||
				  keyValue =="@" || keyValue =="." || keyValue =="/" || keyValue =="_" ){
						return true;
					} 
			 	}
			/* end */
				
				
			return false;
		},
		
		doActivatePopUp : function () {
			skFn.debug.log('doActivatePopUp');
			var _comp = this;			
			var topIndex;			
			var top;
			var left;	

			var _comp_keyBoardType		=	_comp._get('keyBoardType');
			var currentPopUpInfo 		= _comp._get('currentPopUpInfo');
			
			if(currentPopUpInfo != null) {
				_comp._set({miniPopUpActivated : true});
				var keyId = currentPopUpInfo.keyId;
				var popUpId = "mini_popup_"+currentPopUpInfo.popUpId;
				var type = popUpId.charAt(12); //miniPop Type
				this.setElementVisibility("web_keyboard_popup_bg", true);
				this.setElementVisibility(popUpId, true);
								
				//adjustPopUp
				if(_comp_keyBoardType==0){
					topIndex = keyId.charAt(8);
					top = document.getElementById("wkk_key_"+topIndex).offsetTop + 28;
					left = document.getElementById(keyId).offsetLeft + 534;
				}else if(_comp_keyBoardType==1){
					topIndex = keyId.charAt(8);			
				//modify_overscan
					top = document.getElementById("wkk_key_"+topIndex).offsetTop - 53;
					left = document.getElementById(keyId).offsetLeft + 315;
				}else if(_comp_keyBoardType==2){						
					topIndex = keyId.charAt(8);
					top = document.getElementById("wkk_key_"+topIndex).offsetTop + 446;
					
					if(keyId == "wkk_key_113" && type == "2"){				
						left = document.getElementById(keyId).offsetLeft -88;
					} else{
						left = document.getElementById(keyId).offsetLeft -9;
					}			
				}
				
				var popUpE = document.getElementById(popUpId);
				
				popUpE.style.top = top + "px";
				popUpE.style.left = left + "px";
				
						
				//fill div
				if(currentPopUpInfo.keyIdxArray != null) {
					
					for(var i=0; i < currentPopUpInfo.keyIdxArray.length ; i++) {
						var pKey = "wkk_p"+currentPopUpInfo.popUpId+"_"+currentPopUpInfo.keyIdxArray[i];
						_comp.setInnerHtml(pKey,currentPopUpInfo.keyValueArray[i]);
						_comp.setElementFontSize(pKey, "36px");
						if(_comp_keyBoardType==0){
							if(_comp.isBlackKey(_comp._get('currentPageIdx'), pKey)){
								_comp.setElementBackground(pKey, blackBgImage);
							} else{
								_comp.setElementBackground(pKey, bgImage);
							}
							
						}else if(_comp_keyBoardType==1){
							if(_comp.isBlackKey(_comp._get('currentPageIdx'), pKey)){
								_comp.setElementBackground(pKey, blackBgImage);
							} else{
								_comp.setElementBackground(pKey, bgImage);
							}					
						}else{
							if(_comp.isBlackKey(_comp._get('currentPageIdx'), pKey)){
								_comp.setElementBackground(pKey, blackBgImage);
							} else{
								_comp.setElementBackground(pKey, bgImage);
							}					
						}				
					}
				}
				//cancel Id set
				if(currentPopUpInfo.cancelBtnIdx!=null) {
					var cKey = "wkk_p"+currentPopUpInfo.popUpId+"_"+currentPopUpInfo.cancelBtnIdx;
					_comp.setInnerHtml(cKey,'<img alt="" src="../image/KEYHELP_ICON_BACK.png" style="margin-top: 13px" />');
					_comp.setElementFontSize(cKey, "26px");			
					if(_comp_keyBoardType==0){
						_comp.setElementBackground(cKey, "url('../image/KEYBOARD_BTN_02_N.png')");
					}else if(_comp_keyBoardType==1){
						_comp.setElementBackground(cKey, "url('../image/ime/VER_KEYBOARD_BTN_02_N.png')");
					}else{
						_comp.setElementBackground(cKey, "url('../image/ime/HOR_KEYBOARD_BTN_02_N.png')");
					}
					
				}
				
				//hide div
				if(currentPopUpInfo.hideKeyArray != null) {
					for(var i=0; i < currentPopUpInfo.hideKeyArray.length ; i++) {
						var hKey = "wkk_p"+currentPopUpInfo.popUpId+"_"+currentPopUpInfo.hideKeyArray[i];
						_comp.setElementVisibility(hKey, false);
					}
				}
				_comp._set({currentPopUpKeyId : null});
			}
		},
		
		getNextKeyIdPopUp : function(currentPopUpKeyId, keyCode) {
			skFn.debug.log('getNextKeyIdPopUp');
			var _comp = this;
			var _comp_keyBoardType		=	_comp._get('keyBoardType');
			var type = currentPopUpKeyId.charAt(6);
			/**
			 * type 1 : 5 x 2
			 * type 2 : 4 x 1
			 * type 3 : basic,vertical : 3 x 2	/ horizontal : 6 x 1
			 * type 4 : 3 x 1
			 * type 5 : 5 x 1
			 */
			var y = currentPopUpKeyId.charAt(8);
			var x = currentPopUpKeyId.charAt(9);
			var popKeyValue;
			
			switch(keyCode) {
				case skTv.keymap.UP :
					if(type == "2" || type == "4" || type == "5") {
						return null;
					} else {
						y --;
						if(y<0) {
							y = 0;
						}
					}
					break;
				case skTv.keymap.DOWN :
					if(type == "2" || type == "4" || type == "5") {
						return null;
					} else {
						y++;
										
						//basic Type / vertical Type
						if(_comp_keyBoardType != 2){
							popKeyValue = _comp.getKeyValue("wkk_p0"+type+"_"+y+""+x);
							for(z=y; z<=1; z++){	
													
								if(popKeyValue == " "){	
									y = new Number(z);
									
								}else{
									y = new Number(y);
								}						
							}												
						}				
										
						if(y > 1) {
							y = 1;
						}
						//when last value is empty
						v = _comp.getKeyValue("wkk_p0"+type+"_"+y+""+x);
						if(popKeyValue == " "){
							return;
						}
						
					
					}
					break;
				case skTv.keymap.LEFT :
					x--;			
					
					popKeyValue = _comp.getKeyValue("wkk_p0"+type+"_"+y+""+x);
					for(z=x; z>=0; z--){	
											
						if(popKeyValue == " "){	
							x = new Number(z);
							
						}else{
							x = new Number(x);
						}						
					}
								
					if(x < 0) {
						x = 0;
					}
					break;
				case skTv.keymap.RIGHT :
					x++;
					//horizon Type
					if(_comp_keyBoardType == 2){
						popKeyValue = _comp.getKeyValue("wkk_p0"+type+"_"+y+""+x);
						for(z=x; z<=5; z++){	
												
							if(popKeyValue == " "){	
								x = new Number(z);
								
							}else{
								x = new Number(x);
							}						
						}
						
						if(type == "3") {
							if(x > 5) {
								x = 5;
							}
						}				
					//basic Type / vertical Type	
					} else{
						
						popKeyValue = _comp.getKeyValue("wkk_p0"+type+"_"+y+""+x);				
						for(z=x; z<=2; z++){	
												
							if(popKeyValue == " "){	
								x = new Number(z);						
							}else{
								x = new Number(x);
							}						
						}
						if(type == "3") {
							if(x > 2) {
								x = 2;
							}
						}
					}
					
					if(type == "5" || type == "1") {
						if(x > 4) {
							x = 4;
						}
					} else if (type == "2") {
						if(x>3) {
							x = 3;
						}
					} else if (type =="4") {
						if(x > 2) {
							x = 2;
						}
					}
					
					break;
				default:
					return null;
			}
			var yx = y+""+x;
			if(currentPopUpInfo.hideKeyArray !=null) {
				for(var i=0; i<currentPopUpInfo.hideKeyArray.length;i++) {
					if(yx==currentPopUpInfo.hideKeyArray[i]) {
						return null;
					}
				}
			}
			return "wkk_p0"+type+"_"+yx;
		},
		
		doHighlightPopUp : function(keyId) {
			skFn.debug.log('doHighlightPopUp');
			var _comp = this;
			var currentPopUpInfo 		= _comp._get('currentPopUpInfo');

			var yx = keyId.charAt(8)+""+keyId.charAt(9);
			if(currentPopUpInfo.hideKeyArray !=null) {
				for(var i=0; i<currentPopUpInfo.hideKeyArray.length;i++) {
					if(yx==currentPopUpInfo.hideKeyArray[i]) {
						// it is possible infinite loop .. 
						_comp.doHighlightPopUp(_comp.getNextKeyIdPopUp(keyId, VK_RIGHT));
						return;
					}
				}
			}
			
			else if(keyId == null && keyId == " ") {		
				return;
			}
			
			var popUpId = "mini_popup_"+currentPopUpInfo.popUpId;
			var top = document.getElementById(popUpId).offsetTop + document.getElementById(keyId).offsetTop - 10 ;
			var left = document.getElementById(popUpId).offsetLeft + document.getElementById(keyId).offsetLeft - 9 ;
			var e = document.getElementById("wkk_key_focus_pn");
			e.style.top = top + "px";
			e.style.left = left + "px";
			
			if(yx!=currentPopUpInfo.cancelBtnIdx) {
				var val = _comp.getKeyValue(keyId);
						
				if(val == null || val == " "){
					return;
				} else if(val == "<") {
					e.innerHTML = "&lt;";
				} else {
					e.innerHTML = val;
				} 
			} else {
				e.innerHTML = '<img alt="" src="../image/KEYHELP_ICON_BACK.png" style="margin-top: 23px" />';
			}
			
			e.style.visibility = "";
			var cKeyId ="wkk_p"+currentPopUpInfo.popUpId+"_"+currentPopUpInfo.cancelBtnIdx;
			if(keyId == cKeyId) {
				e.style.fontSize = "32px";
			} else {
				e.style.fontSize = "46px";
			}
			_comp._set({currentPopUpKeyId : keyId});
			_comp.setInputFocus();
			
		},

		/**
		 * Language Toggle
		 */
		changeLanValue : function (gubun){
			skFn.debug.log('changeLanValue');
			var _comp = this;
			var _comp_totalcheckedValue;

			// default Language가 english인 경우 KOR 버튼을 세팅해준다. 초기 한번만 실행됨. (by sophia)
			if( _comp._get('defaultLanguage') == 'english') {
				document.form2.langName.value = "KOR";
				_comp.toggleKeyChange();
				_comp._set({defaultLanguage:''});

				// sophia(5.4)
				if(_comp._get("init_callback") != "") {
					eval(_comp._get("init_callback"))();
				}
				return;
			}
			
			_comp_totalcheckedValue = document.form2.checkedLang.value;	
			_comp._set({totalcheckedValue : _comp_totalcheckedValue, langToggleState : 1});

			
			//Language Toggle Index Initailize
			if(document.form2.langToggleIdx.value == "0"){
				_comp._set({langTogglIdx : 0});
				document.form2.langToggleIdx.value = "";
			}
				
			//js Dynamic Create
			var div = document.getElementById("langDiv");	
			var _script = document.createElement('script');
			_script.type = 'text/javascript';

			switch(_comp._get('langTogglIdx')){			
				case 0:
					document.form2.langName.value = "ENG";
					_script.src = '../js/lang/korean.js';					
					_comp._set({langTogglIdx : 8});

					// Horizontal Type에서 임의로 focus 세팅 (5.12 by sophia)  
					if(_comp._get('keyBoardType') == 2){
						_comp.doHighlight('wkk_key_000');
					}
					
					break;
				case 8:
					_script.src = '../js/lang/english.js';
					_comp._set({langTogglIdx : 0});
					
					document.form2.langName.value = "KOR";
					_comp.toggleKeyChange();

					if(_comp._get('keyBoardType') == 0){
						_comp.doHighlight('wkk_key_60');
					} else if(_comp._get('keyBoardType') == 1){
						_comp.doHighlight('wkk_key_60');
					} else{
						_comp.doHighlight('wkk_key_000');
					}
				default:		
					break;
				}
			if($(div).length > 0){
				$(div).html("");
			}
			div.appendChild(_script);
			
			/* IE
			document.onreadystatechange= function () {		
				   if (document.readyState == 'complete'
				         || document.readyState == 'loaded') init();
			}*/
			
			//Firefox, Chrome 
			_script.onload = function () {
				// IME 자판 로딩 후 IME 영역노출 (sophia 5.4) 
				if(_comp._get("init_callback") != "") {
					eval(_comp._get("init_callback"))();
					// show 한 후 한번만 실행하도록 수정 (sophia 5.17)
					_comp._set({init_callback:""});
				}

				//_comp.keyboardInit(_comp._get('keyBoardType'));		
				_comp.keyboardInit();		
		    }
			
		},
		
		caretPrev : function () {
			skFn.debug.log('caretPrev');
			var _comp = this;
			
			// 커서 왼쪽 이동키를 누를때 한글 입력시 마지막 입력값의 posotion 세팅되지 않아  추가함 (by sophia 4.24)
			if(document.form2.langName.value == "ENG" && _comp._get('gubun') == "lang") {
				var _comp_leftArrow_FisrtClick	=	_comp._get("leftArrow_FisrtClick");
				
				if(_comp_leftArrow_FisrtClick == false) {
					_comp._set({leftArrow_FisrtClick:true});
					_comp.setCaretPosition(new Number(_comp.getCaretPosition()) + 1, 0);
				}
			}				


			imeLanguageInfo.setNewMode(0);
			var ctrl = document.getElementById(_comp._get('imeInputName'));
			var pos = _comp.getCaretPosition();

			if(pos>ctrl.value.length){
				pos = ctrl.value.length;
			}
			
			skFn.debug.log('caretPrev => pos : ' + pos);
			
			_comp.setCaretPosition(new Number(pos) -1, 0);

		},
		
		caretNext : function () {
			skFn.debug.log('caretNext');
			var _comp = this;
			
			imeLanguageInfo.setNewMode(0);
			var pos = _comp.getCaretPosition();
			_comp.setCaretPosition(new Number(pos) + 1, 0);
		},
		
		inputBoxControl : function (direct){
			skFn.debug.log('inputBoxControl');
			var _comp = this;
			
			if(direct=='left'){
				_comp.caretPrev();
			}else{
				_comp.caretNext();
			}
		},
		
		deletePrevChar : function() {
			skFn.debug.log('deletePrevChar');
			var _comp = this;			
			var kTxt = _comp.getTextContent();
			var kSelected = _comp.isCaretActivated();
			var ctrl = document.getElementById(_comp._get('imeInputName'));
			var kIdx = _comp.getCaretPosition();
			if(kIdx>ctrl.value.length){
				kIdx = ctrl.value.length;
			}

			if(!kSelected) {
				kIdx = kIdx -1;
			}
			var kResult = "";	
			if( kIdx > -1) {
				kResult = kTxt.substr(0,kIdx) + kTxt.substr(kIdx +1, kTxt.length);
				_comp.putStrIntoFld(kResult, kIdx);	
				_comp.setCaretPosition(kIdx, 0);
			}
		},
		
		/**
		 * execute key's action.
		 * @param keyId
		 * @return
		 */
		execKey : function (keyId) {
			skFn.debug.log('execKey');
			var _comp = this;
			var _comp_keyBoardType		=	_comp._get('keyBoardType');
			var _comp_currentPopUpInfo;
			
			/*********************************************************************/
			/*********************  KeyBoard Layout 1 Start  *********************/
			/*********************************************************************/	
			if(_comp_keyBoardType==0){	
				//alert('일단 스킵')
			
			/*********************************************************************/
			/*********************  KeyBoard Layout 2 Start  *********************/
			/*********************************************************************/
			} else if(_comp_keyBoardType==1){	
				
				// 한글 입력의 경우 처음 왼쪽 커서 이동버튼을 클릭했는지 알아야 이동이 가능하다.(by sophia  4.24)
				switch(keyId) {
					//RightArrow, LeftArrow
					case "wkk_key_54" : 
					case "wkk_key_55" :
						break;
					default :
						_comp._set({leftArrow_FisrtClick:false});
						break;
				}
				
				
				switch(keyId) {
					/*//OK
					case "wkk_key_58" :
						executeOK();
						break;
					//cancel
					case "wkk_key_59" :
						executeCancel();
						break;
					*/
					//change Lang
					case "wkk_key_60" :			
						_comp._set({gubun : 'lang'});
						_comp_langTogglIdx = _comp._get('langTogglIdx');

						if(_comp_langTogglIdx == 0 && _comp._get('langToggleClickState') == true){	//jjw_add
							_comp_langTogglIdx++;
							_comp._set({langTogglIdx : _comp_langTogglIdx});
						}		
						_comp.changeLanValue(_comp._get('gubun'));
						break;
					//change s/l
					case "wkk_key_61" :
						_comp._set({gubun : 'sl'});
						//_comp.changeKeyValue(_comp._get('gubun'));
						imeLanguageInfo.changeKeyValue(_comp._get('keyBoardType'), _comp._get('gubun'));
						break;
					//chage Char
					case "wkk_key_62" :
						_comp._set({gubun : 'ch'});
						//_comp.changeKeyValue(_comp._get('gubun'));
						imeLanguageInfo.changeKeyValue(_comp._get('keyBoardType'), _comp._get('gubun'));
						break;
					//LeftArrow
					case "wkk_key_54" :
						// 한글 입력의 경우 처음 왼쪽 커서 이동버튼을 클릭했는지 알아야 이동이 가능하다.(by sophia  4.24)
						_comp.inputBoxControl('left');
						break;
					//RightArrow
					case "wkk_key_55" :
						_comp.inputBoxControl('right');
						break;
					//space
					case "wkk_key_63" :
						//imeLanguageInfo.addSpaceText();
						imeLanguageInfo.addSpaceText(_comp._get('gubun'),_comp._get('imeInputName'));
						break;
					//back space
					case "wkk_key_65" :
						imeLanguageInfo.backspaceText(_comp._get('imeInputName'));
						//onBackspace method 추가
						//2012-08-02 [15:51:08] @SoonyoungPark
						var onBackspace = _comp._get("onBackspace");
						if (typeof onBackspace === 'function'){
							onBackspace(_comp.getInputVal());
						}
						
						break;
					case "wkk_key_focus" :
						_comp.execKey(_comp._get('currentKeyId'));
						break;
						
					default :
						if(_comp._get('miniPopUpSupport')) {		
							var idx = -1;
							for(var i=0 ; i<imeLanguageInfo.miniPopUpInfoObjects.length; i++) {
								var obj = imeLanguageInfo.miniPopUpInfoObjects[i];	
								if(obj.pageIdx == _comp._get('stIdx') && obj.keyId == keyId && _comp._get('gubun') !='ch') {
									idx = i;					
									break;
								}
							}
							
							if(idx > -1) {
								//isFound
								_comp_currentPopUpInfo = imeLanguageInfo.miniPopUpInfoObjects[idx];
								
								_comp._set({currentPopUpInfo : _comp_currentPopUpInfo});
										
								_comp.doActivatePopUp();
								_comp.doHighlightPopUp("wkk_p"+_comp_currentPopUpInfo.popUpId+"_00");
							} else {
							
								//not found.
								var val = _comp.getKeyValue(keyId);
								if(keyId != "wkk_key_focus_Main"){
									if(val != null) {
										imeLanguageInfo.appendText(_comp._get('gubun'), _comp._get('imeInputName'), val);
										//onAnyCharInsert method 추가
										//2012-08-02 [15:51:08] @SoonyoungPark
										var onAnyCharInsert = _comp._get("onAnyCharInsert");
										if (typeof onAnyCharInsert === 'function'){
											onAnyCharInsert(val);
										}
									}	
								}
							}
							//currentPopUpInfo
						} else {
							var val = _comp.getKeyValue(keyId);
					
							if(val != null) {
								imeLanguageInfo.appendText(_comp._get('gubun'), _comp._get('imeInputName'), val);
							}
						}
				}
			/*********************************************************************/
			/*********************  KeyBoard Layout 3 Start  *********************/
			/*********************************************************************/
			} else {
				switch(keyId) {
					/*
					//OK
					case "wkk_key_58" :
						//executeOK();
						var inputValue = "";
						if(entCnt == 1){
							inputValue = document.getElementById('wkk_tx').value;
							
						} else if(entCnt > 1){
							inputValue = document.getElementById('wkk_tx2').value;
						}
						
						if(inputValue !=""){
							setElementBackground('btnArea', "url(../images/ime/horizontal/HOR_BTN_SEARCH_NORMAL.png)");
						} 
						
						document.getElementById('wkk_input').value = inputValue;
						hiddenKeyboard();
						break;
					*/
					//cancel
					case "wkk_key_59" :
						alert('executeCancel')
						//executeCancel();
						break;
					//show history
					case "wkk_key_08" :
						break;
					//input text
					case "wkk_key_09" :
						break;
				
					case "wkk_key_000" :
						_comp._set({gubun : 'lang'});
						_comp_langTogglIdx = _comp._get('langTogglIdx');
						
						if(_comp_langTogglIdx == 0 && _comp._get('langToggleClickState') == true){	//jjw_add
							_comp_langTogglIdx++;
							_comp._set({langTogglIdx : _comp_langTogglIdx});
						}		
						_comp.changeLanValue(_comp._get('gubun'));
						break;
							
					//change s/l
					case "wkk_key_100" :
						_comp._set({gubun : 'sl'});
						//_comp.changeKeyValue(_comp._get('gubun'));
						imeLanguageInfo.changeKeyValue(_comp._get('keyBoardType'), _comp._get('gubun'));
						break;
					//change char
					case "wkk_key_200" :
						_comp._set({gubun : 'ch'});
						//_comp.changeKeyValue(_comp._get('gubun'));
						imeLanguageInfo.changeKeyValue(_comp._get('keyBoardType'), _comp._get('gubun'));
						break;
					//LeftArrow
					//case "wkk_key_114" :
					case "wkk_key_210" :
						// 한글 입력의 경우 처음 왼쪽 커서 이동버튼을 클릭했는지 알아야 이동이 가능하다.(by sophia  4.24)
						_comp.inputBoxControl('left');
						break;
					//RightArrow
					//case "wkk_key_115" :
					case "wkk_key_211" :						
						_comp.inputBoxControl('right');
						break;	
					//space
					//case "wkk_key_402" :
					case "wkk_key_401" :
						imeLanguageInfo.addSpaceText(_comp._get('gubun'),_comp._get('imeInputName'));
						break;
					//back space
					//case "wkk_key_015" :
					case "wkk_key_010" :
						imeLanguageInfo.backspaceText(_comp._get('imeInputName'));
						break;			
					//case "wkk_key_014" :
					/*case "wkk_key_010" :
						enterInputField();
						break;
					//keyboard hidden*/			
					//case "wkk_key_310" :
					case "wkk_key_402" :						
						if(_comp._get("callbackZone").length > 0) {
							skTv.zone.hide(_comp._get("callbackZone"));
						}
						//hiddenKeyboard();
						break;
					case "wkk_input" :
						alert('visibleKeyboard')
						//visibleKeyboard();
						break;
					case "wkk_key_focus" :
						_comp.execKey(_comp._get('currentKeyId'));
						break;
						
					default :			
						if(_comp._get('miniPopUpSupport')) {		
							var idx = -1;
							
							for(var i=0 ; i<imeLanguageInfo.miniPopUpInfoObjects.length; i++) {
								var obj = imeLanguageInfo.miniPopUpInfoObjects[i];	
								if(obj.pageIdx == _comp._get('stIdx') && obj.keyId == keyId && _comp._get('gubun') !='ch') {
									idx = i;					
									break;
								}
							}

							if(idx > -1) {
								//isFound
								_comp_currentPopUpInfo = imeLanguageInfo.miniPopUpInfoObjects[idx];
								
								_comp._set({currentPopUpInfo : _comp_currentPopUpInfo});
										
								_comp.doActivatePopUp();
								_comp.doHighlightPopUp("wkk_p"+_comp_currentPopUpInfo.popUpId+"_00");
							} else {					
								//not found.
								var val = _comp.getKeyValue(keyId);
								if(val != null) {
									imeLanguageInfo.appendText(_comp._get('gubun'), _comp._get('imeInputName'), val);
								}	
							}
							//currentPopUpInfo
						} else {				
							var val = _comp.getKeyValue(keyId);
							
							if(val != null) {
								imeLanguageInfo.appendText(_comp._get('gubun'), _comp._get('imeInputName'), val);
							}
						}
					}
			} 
		}, 
		
		/**
		 * return keyId after arrow key pressed.
		 * @param keyId
		 * @param keyCode
		 * @return next keyId or null
		 */
		getNextKeyId : function (curPageIdx, keyId, keyCode) {
			skFn.debug.log('[getNextKeyId] keyId:' + keyId);
			var _comp = this;
			var _comp_keyBoardType		=	_comp._get('keyBoardType');

			var keyValue;
			var xLastIdx;
			var yLastIdx;
			
			if ( keyId == null || keyCode == null ) {
				return null;
			}
			
			var x = keyId.charAt(8);
			var y = keyId.charAt(9);

			/*********************************************************************/
			/*********************  KeyBoard Layout 1 Start  *********************/
			/*********************************************************************/	
			if(_comp_keyBoardType==0){
				//alert('일단 스킵!!');
			}
			
			/*********************************************************************/
			/*********************  KeyBoard Layout 2 Start  **********************/
			/*********************************************************************/	
			else if(_comp_keyBoardType==1){				
				xLastIdx = 7;
				yLastIdx = 5;
				
				switch(keyCode) {
					case skTv.keymap.UP :
						if( x == 0){
							imeLanguageInfo.setNewMode(0);
							var cc = _comp.getCaretPosition();			
							_comp.setCaretPosition(cc, 0);
							//return "wkk_tx";	
							return null;
						}		
							
						if( y==0 || y==1 || y==2 || y==3 || y==4 || y==5 ){ 
							x = new Number(x) - 1; 
			 
							for(z=x; z>=0; z--){  
								keyValue = _comp.getKeyValue("wkk_key_"+ x + "" + y);
								if(keyValue == " "){ 
									x = new Number(z); 			 
								}else{ 
									x = new Number(x); 
								} 
							}
							
							//when last value is empty
							keyValue = _comp.getKeyValue("wkk_key_"+ x + "" + y);
							if(x == 0 && keyValue == " "){
								return keyId;
							}		 
						}else{				
							if(keyId == "wkk_key_58"){
								x = 6;
								y = 0;
							}else if(keyId == "wkk_key_59"){
								x = 6;
								y = 3;
							}
						}
						break;
						
					case skTv.keymap.DOWN :						
						if (keyId == "wkk_tx") {
							return "wkk_key_00";
						}
						
						if( y==0 || y==1 || y==2 || y==3 || y==4 || y==5 ){
							
							x = new Number(x)  + 1; 
							
							for(z=x; z<=xLastIdx; z++){  
								keyValue = _comp.getKeyValue("wkk_key_"+ x + "" + y);
								
								if(keyValue == " "){ 						
									x = new Number(z) ;
								}else{ 
									x = new Number(x) ; 
								} 
							}
							
							/* 확인/ 취소버튼 없으므로 아래 구문 삭제 (by sophia)
							if(x==7){
								//if(y==0||y==1||y==2){
								if(y==0||y==1||y==2){
									return "wkk_key_58";
								}else if(y==3||y==4||y==5){
									return "wkk_key_59";
								}					
							}
							*/
							if(x==7){
								return null;
							}
							
							if(x == 6){
								if(y == 4){
									y = 3;	
								}	
							}
							//block
							if(x>xLastIdx){
								x = xLastIdx;
							}				
							//when last value is empty
							keyValue = _comp.getKeyValue("wkk_key_"+ x + "" + y);
							
							if(x == xLastIdx && keyValue == " "){
								return keyId;
							}
						}
						
						break;
					case skTv.keymap.LEFT :
						if (keyId == "wkk_tx") {
							return "wkk_tx";
						}
						
						if (keyId == "wkk_key_58") {
							return "wkk_key_58";
						}
						
						if (keyId == "wkk_key_59") {
							return "wkk_key_58";
						}
	
						// input창으로 이동 후 popup에 포커스 넘기기 (by sophia)
						if( y==0 ){
							_comp.cancelHighlight(keyId);
							_comp.returnZone();
							return
						}
							
						if( x==0 || x==1 || x==2 || x==3 || x==4 || x==5 || x==6){ 
							y = new Number(y) - 1; 
							for(z=y; z>=0; z--){ 
								keyValue = _comp.getKeyValue("wkk_key_"+ x + "" + y);
								if(keyValue == " "){ 
									y = new Number(z); 									
								}else{ 
									y = new Number(y); 
								} 
							}
							
							if(x == 6){
								if(y == 4){
									y = 3;	
								}	
							}
							
							//block 
							if(y<0){
								 y = 0;
							}
							
							//when last value is empty
							keyValue = _comp.getKeyValue("wkk_key_"+ x + "" + y);
							
							if(y == 0 && keyValue == " "){
								return keyId;
							}
						}			
						break;
						
					case skTv.keymap.RIGHT :
						if (keyId == "wkk_tx") {
							return "wkk_tx";
						}
						
						if (keyId == "wkk_key_58") {
							return "wkk_key_59";
						}
						if (keyId == "wkk_key_59") {
							return "wkk_key_59";
						}
															
						if(x == 0 || x == 1 || x == 2 || x == 3 || x == 4 || x == 5 || x == 6){
							y = new Number(y) + 1;
							
							for(z=y; z<=yLastIdx; z++){	
								keyValue = _comp.getKeyValue("wkk_key_"+ x + "" + y);
								if(keyValue == " "){	
									y = new Number(z);		
								}else{
									y = new Number(y);
								}						
							}	
							
							if(x == 6){
								if(y == 4){
									y = 5;	
								}	
							}
																					
							//block
							if(y>yLastIdx){
								y = yLastIdx;
							}					
							
							//when last value is empty
							keyValue = _comp.getKeyValue("wkk_key_"+ x + "" + y);
							
							if(y == yLastIdx && keyValue == " "){
								return keyId;
							}	
						}					
						break;
						
					default :
						break;
				}
				
				return "wkk_key_"+ x + "" + y;
			} 
			
			/*********************************************************************/
			/*********************  KeyBoard Layout 3 Start  *********************/
			/*********************************************************************/
			else if(_comp_keyBoardType==2){
				var xx = keyId.charAt(8);
				var yy = keyId.substring(9,11);
				
				var inputFieldY = 2;
				
				switch(keyCode) {		
					case skTv.keymap.UP :		
						
						if (keyId == "wkk_tx") {						
							imeLanguageInfo.setNewMode(0);
							var cc = _comp.getCaretPosition();			
							_comp.setCaretPosition(cc, 0);
							// 삭제 (5.10 by sophia) return "wkk_tx";
							return null;
						}
						/*
						 * 삭제 (5.10 by sophia) 
						else if(keyId == "wkk_key_58") {
							return "wkk_key_58";	
						}			
						*/
						
						else if(keyId == "wkk_key_200"){
							var keyVal = _comp.getKeyValue("wkk_key_100");
							if(keyVal == " "){
								return "wkk_key_000";
							}
						}
						// 예외처리 (5.15 by sophia)
						else if(keyId == "wkk_key_402"){
							return "wkk_key_210";
							
						} else if(keyId == "wkk_key_210" || keyId == "wkk_key_211"){
							return "wkk_key_010";
						}
												
						/*
						if(yy == 0  || yy == 1  || yy == 2  || yy == 3|| yy == 4|| yy == 5|| 
							 yy == 6  || yy == 7  || yy == 8  || yy == 9|| yy == 10|| yy == 11||
							 yy == 12 || yy == 13 || yy == 14 || yy == 15){
							
							xx = new Number(xx) - 1; 					
							for(z=xx; z>=0; z--){ 					
								keyValue = _comp.getKeyValue("wkk_key_"+ xx + "" + yy);
								xx = new Number(xx);
								if(keyValue == " "){
									if(xx == 1){
											if(yy == 0){
												xx = new Number(xx); 	
											}
										}else{
											xx = new Number(z);
										}					 
								}else{ 
									xx = new Number(xx); 	
								} 
							}					
							//block
							if( new Number(xx) < 0){
									imeLanguageInfo.setNewMode(0);
									var cc = _comp.getCaretPosition();			
									_comp.setCaretPosition(cc, 0);
									return "wkk_tx";	 
							}
							//go to Language Select key
							/*if(xx == 1){
								if(yy == 0){
									return "wkk_key_116";
								}
							}	*/				
						//}		
						 
						if(yy == 0  || yy == 1  || yy == 2  || yy == 3|| yy == 4|| yy == 5|| 
							 yy == 6  || yy == 7  || yy == 8  || yy == 9|| yy == 10|| yy == 11){
							
							xx = new Number(xx) - 1; 					
							for(z=xx; z>=0; z--){ 					
								keyValue = _comp.getKeyValue("wkk_key_"+ xx + "" + yy);
								xx = new Number(xx);
								if(keyValue == " "){
									if(xx == 1){
											if(yy == 0){
												xx = new Number(xx); 	
											}
										}else{
											xx = new Number(z);
										}					 
								}else{ 
									xx = new Number(xx); 	
								} 
							}					
							//block
							if( new Number(xx) < 0){
								// input창으로 이동 후 popup에 포커스 넘기기 (by sophia)
								_comp.cancelHighlight(keyId);
								_comp.returnZone();
								return

								/*
								imeLanguageInfo.setNewMode(0);
								var cc = _comp.getCaretPosition();
								
								_comp.setCaretPosition(cc, 0);
								return "wkk_tx";
								*/	 
							}
							//go to Language Select key
							/*if(xx == 1){
								if(yy == 0){
									return "wkk_key_116";
								}
							}	*/				
						}		
						break;
						
					case skTv.keymap.DOWN :
						/*
						if (keyId == "wkk_tx" || keyId == "wkk_key_58") {	
							return "wkk_key_000";
						//} else if(keyId == "wkk_key_115"){
						} else if(keyId == "wkk_key_211"){
							//return "wkk_key_310";
							return "wkk_key_402";							
						}				
						else if(keyId == "wkk_key_116"){
							return "wkk_key_200";
						}	
						else if(keyId == "wkk_key_000"){
							var keyVal = _comp.getKeyValue("wkk_key_100");
							if(keyVal == " "){
								return "wkk_key_200";
							} else{
								return "wkk_key_100";
							}
						}
						
						if(yy == 0  || yy == 1  || yy == 2  || yy == 3|| yy == 4|| yy == 5|| 
							 yy == 6  || yy == 7  || yy == 8  || yy == 9|| yy == 10|| yy == 11||
							 yy == 12 || yy == 13 || yy == 14 || yy == 15){
							
							xx = new Number(xx) + 1; 
							for(z=xx; z<=2; z++){ 
								keyValue = _comp.getKeyValue("wkk_key_"+ xx + "" + yy);
								xx = new Number(xx);
								if(keyValue == " "){
										if(xx == 1){
											if(yy == 0){
												xx = new Number(xx); 	
											}
										}else{
											xx = new Number(z);
										}				 
								}else{ 
									xx = new Number(xx); 	
								} 
							}
							
							//go to Spacebar
							if(xx == 2){
								if( yy == 6  || yy == 7  || yy == 8  || yy == 9){
										//return "wkk_key_402";
										return "wkk_key_401";
										
								}
							}
							
							
							//go to Language Select key
							if(xx == 1){
								if(yy == 0){
									return "wkk_key_116";
								}
							}
							
							//block
							if( new Number(xx) > 2){
									xx = 2; 
							}
												
							//when last value is empty
							if(xx == 2 && keyValue == " "){
								if(yy == 5){
										//return "wkk_key_402";
										return "wkk_key_401";
										
								}else{
									return keyId;
								}
							}
						}
						*/					
						
						if(yy == 0  || yy == 1  || yy == 2  || yy == 3|| yy == 4|| yy == 5|| 
							 yy == 6  || yy == 7  || yy == 8  || yy == 9|| yy == 10|| yy == 11){
							
							xx = new Number(xx) + 1; 
							for(z=xx; z<=5; z++){ 
								keyValue = _comp.getKeyValue("wkk_key_"+ xx + "" + yy);
								xx = new Number(xx);
								if(keyValue == " "){
									if(xx == 1){
										if(yy == 0){
											xx = new Number(xx); 	
										}
									}else{
										xx = new Number(z);
									}				 
								}else{
									xx = new Number(xx); 	
								} 
							}
							
							//go to Spacebar
							if(xx == 1){
								if( yy == 6  || yy == 7  || yy == 8  || yy == 9){
									keyValue = _comp.getKeyValue("wkk_key_" + xx + "" + yy);
									if(keyValue == " ") {
										return "wkk_key_401";
									}
								}
							}
							
							
							// left function Key down 
							if(yy == 0){
								//block
								if( new Number(xx) > 2){
									return "wkk_key_200";
								}
								
								keyValue = _comp.getKeyValue("wkk_key_" + xx + "00");

								if(keyValue == " ") xx++;

								return "wkk_key_" + xx + "00";
							}
							
							// right function Key down
							if(yy >= 10 ){
								if(xx == 1 || xx == 3){
									xx++;
								}

								if(xx == 4) {
									return "wkk_key_402";
								}else {
									return "wkk_key_" + xx + "10";
								}
							}
							
							if (xx == 5 && yy == 2){
								return "wkk_key_402";
							}							
							
							
							//block
							if( new Number(xx) > 4){
								xx = 4; 
							}

							//go to Spacebar
							if(yy > 1 || yy < 10 ){
								keyValue = _comp.getKeyValue("wkk_key_"+ xx + "" + yy);
								
								if(keyValue == " ") xx++;
								
								if(xx == 4) return "wkk_key_401";
								
								return "wkk_key_"+ xx + "" + yy;
							}
						}
						
						break;

					case skTv.keymap.LEFT :
						/*
						if (keyId == "wkk_tx" || keyId == "wkk_key_58") {
								imeLanguageInfo.setNewMode(0);
								var cc = _comp.getCaretPosition();			
								_comp.setCaretPosition(cc, 0);
								return "wkk_tx";	
						}else if(keyId == "wkk_key_116"){
							return "wkk_key_116";
						}
						else if(keyId == "wkk_key_100"){
							var keyVal = _comp.getKeyValue("wkk_key_116");
							if(keyVal == " ")return;
						}
										
						if(xx == 0 || xx == 1 || xx == 2){						
							yy = new Number(yy) - 1; 
							for(z=yy; z>=0; z--){ 
								if( yy < 10){
									yy = '0' + yy;
								} else{
									yy = yy;
								}
								keyValue = _comp.getKeyValue("wkk_key_"+ xx + "" + yy);
								yy = new Number(yy);
								if(keyValue == " "){
									if(xx == 1){
										if(yy == "00"){
											return "wkk_key_116";
										}
									}else{
										yy = z ;	
									}		 
								}else{ 
									yy = new Number(yy); 		
								} 
							}	
							if( yy < 10){
								yy = '0' + yy;
							}	
							
							//go to Spacebar & go to language toggle key
							if(xx == 2){
								if( yy == 6  || yy == 7  || yy == 8  || yy == 9){
										//return "wkk_key_402";
										return "wkk_key_401";
										
								}
							}else if( xx == 1 ){
								if( yy == "0-1" ){
										return "wkk_key_100";
								}								
							}	
							//block
							if( yy == "0-1" ){
									yy = "00";
							}					
						}
						*/				

						if(xx == 0 || xx == 1 || xx == 2 || xx == 3 || xx == 4){						
							yy = new Number(yy) - 1; 
							for(z=yy; z>=0; z--){ 
								if( yy < 10){
									yy = '0' + yy;
								} else{
									yy = yy;
								}
								keyValue = _comp.getKeyValue("wkk_key_"+ xx + "" + yy);
								yy = new Number(yy);
								if(keyValue == " "){
									yy = z ;	
								}else{ 
									yy = new Number(yy); 		
								} 
							}	
							if( yy < 10){
								yy = '0' + yy;
							}	
							
							if(yy == 0) {
								keyValue = _comp.getKeyValue("wkk_key_"+ xx + "" + yy);

								//if(keyValue == " ") {
								if(keyValue.length < 3) {
									
									if(keyValue.length == 1){
										return;
									}

									yy = new Number(yy); 		
									yy++;
									if( yy < 10){
										yy = '0' + yy;
									}										
								}
								
								return "wkk_key_"+ xx + "" + yy;								
							}
							
							
							//block
							if( yy == "0-1" ){
								yy = "00";
							}				

							
							/*
							//go to Spacebar & go to language toggle key
							if(xx == 2){
								if( yy == 6  || yy == 7  || yy == 8  || yy == 9){
										//return "wkk_key_402";
										return "wkk_key_401";
										
								}
							}else if( xx == 1 ){
								if( yy == "0-1" ){
										return "wkk_key_100";
								}								
							}	
							//block
							if( yy == "0-1" ){
									yy = "00";
							}*/					
						}

						break;
						
					case skTv.keymap.RIGHT :		
						// IME 수정으로 프로세스 수정(5.12 by sophia)
						/*
						if (keyId == "wkk_tx" || keyId == "wkk_key_58") {
							return "wkk_key_58";
							
						}else if(keyId == "wkk_key_116"){
							key = _comp.getKeyValue("wkk_key_100");
							if(key ==" "){
								return "wkk_key_101";				
							}else{
								return "wkk_key_100";
							}
						}
						
						if(xx == 0 || xx == 1 || xx == 2){
							yy = new Number(yy) + 1; 
							for(z=yy; z<=16; z++){ 
								if( yy < 10){
									yy = '0' + yy;
								} else{
									yy = yy;
								}
								keyValue = _comp.getKeyValue("wkk_key_"+ xx + "" + yy);
									yy = new Number(yy);
								if(keyValue == " "){
									yy = z ;	 
								}else{ 
									yy = new Number(yy); 	
								} 
							}	
							
							if( yy < 10){
								yy = '0' + yy;
							}
							// next key					
							if(xx == 2){
								if( yy == 6  || yy == 7  || yy == 8  || yy == 9){
									keyValue = _comp.getKeyValue("wkk_key_210");

									if(keyValue == " "){
										//return "wkk_key_310";
										return "wkk_key_402";										
									}else{
										return "wkk_key_210";
									}
								}
							}								
							//block
							if( xx == 2){
								if(yy > 14){
									yy = 14;
								}
							}else{
								if( yy > 15){
									yy = 15;
								}
							}	
						}*/
						
						if(xx == 0 || xx == 1 || xx == 2 || xx == 3 || xx == 4){
							yy = new Number(yy) + 1; 
							for(z=yy; z<=11; z++){ 
								if( yy < 10){
									yy = '0' + yy;
								} else{
									yy = yy;
								}
								keyValue = _comp.getKeyValue("wkk_key_"+ xx + "" + yy);

								yy = new Number(yy);
								if(keyValue == " "){
									yy = z ;	 
								}else{ 
									yy = new Number(yy); 	
								} 
							}	

							
							if( yy < 10){
								yy = '0' + yy;
							}

							// next key			
							if(xx == 0){
								if(yy > 9) yy = 10;
								if(yy == 10) return "wkk_key_010";
								
							}else if(xx == 1){
								if(yy > 8) yy = 9;
								if(yy == 9) {
									keyValue = _comp.getKeyValue("wkk_key_"+ xx + "" + yy);
									
									if(keyValue == null) {
										if(_comp.getKeyValue("wkk_key_"+ xx + "06") == " "){
											return "wkk_key_105";
										} else {
											return "wkk_key_109";
										}
									} else {
										return "wkk_key_109";
									}
								}

							} else if(xx == 2){
								if(yy == 7) {
									keyValue = _comp.getKeyValue("wkk_key_208");
									if(keyValue == " "){
										keyValue = _comp.getKeyValue("wkk_key_208");
									}
								} 
								
								if(yy == 9) {
									keyValue = _comp.getKeyValue("wkk_key_209");
									skFn.debug.log('yy = 9 (keyValue:' + keyValue +')');
									if(keyValue == " "){
										return "wkk_key_210";
									} else {
										return "wkk_key_209";
									}
								}								

								if(yy == 10) {
									skFn.debug.log('yy = 10');
								}								

								if(yy > 10) {
									return "wkk_key_211";										
								}								

							} else if(xx == 3){
								if(yy > 8) yy = 9;		
								if(yy == 9) return "wkk_key_309";
								
							} else if(xx == 4){
								if(yy > 1) yy = 2;		
								if(yy == 2) return "wkk_key_402";
								
							}	
						}
						
						break;	
						
					default :
						break;
				}

				return "wkk_key_"+ xx + "" + yy;
			}		
	
		},
		
		doHighlight :function(keyId) {
			skFn.debug.log('doHighlight');
			var _comp = this;
			var _comp_keyBoardType		=	_comp._get('keyBoardType');
			var _comp_currentPageIdx	=	_comp._get('currentPageIdx');
			
			document.getElementById(_comp._get('imeInputName')).focus();

			/*********************************************************************/
			/*********************  KeyBoard Layout 1 Start  *********************/
			/*********************************************************************/
			if(_comp_keyBoardType==0){
				//alert("일단 스킵")
				
			/*********************************************************************/
			/*********************  KeyBoard Layout 2 Start  *********************/
			/*********************************************************************/
			}else if(_comp_keyBoardType==1){
				//SPACE	
				if ( keyId == 'wkk_key_63' ) {	
					//var top = document.getElementById("wkk_key_6").offsetTop-26;			
					//var left = document.getElementById("wkk_key_63").offsetLeft - 8;
					var top = document.getElementById("wkk_key_6").offsetTop-20;			
					var left = document.getElementById("wkk_key_63").offsetLeft;
					var e = document.getElementById("wkk_key_focus_s");
					e.style.top = top + "px";
					e.style.left = left + "px";
					e.style.visibility = "";
					//this.setElementVisibility("wkk_key_focus_m", false);
					_comp.setElementVisibility("wkk_key_focus_m2", false);
					_comp.setElementVisibility("wkk_key_focus_n", false);
					_comp.setElementVisibility("wkk_key_focus_b", false);
					_comp.setElementVisibility("wkk_key_focus_c", false);
					_comp.setElementVisibility("wkk_key_focus_r_arrow", false);
					_comp.setElementVisibility("wkk_key_focus_l_arrow", false);
					_comp.setElementBackground("wkk_tx", "url('../image/ime/VER_SEARCH_INPUT_NORMAL.png')");
					_comp.setElementBackground("wkk_key_58", "url('url('../image/ime/VER_BTN_NORMAL.png')");
					_comp.setElementBackground("wkk_key_59", "url('url('../image/ime/VER_BTN_NORMAL.png')");
				
				//BACK SPACE
				} else if ( keyId == 'wkk_key_65' ) {	

					//var top = document.getElementById("wkk_key_6").offsetTop-26;
					//var left = document.getElementById("wkk_key_65").offsetLeft - 9;
					var top = document.getElementById("wkk_key_6").offsetTop-20;
					var left = document.getElementById("wkk_key_65").offsetLeft;
					var e = document.getElementById("wkk_key_focus_b");
					e.style.top = top + "px";
					e.style.left = left + "px";
					e.style.visibility = "";
					_comp.setElementVisibility("wkk_key_focus_n", false);
					//_comp.setElementVisibility("wkk_key_focus_m", false);
					_comp.setElementVisibility("wkk_key_focus_l", false);
					_comp.setElementVisibility("wkk_key_focus_s", false);
					_comp.setElementVisibility("wkk_key_focus_r_arrow", false);
					_comp.setElementVisibility("wkk_key_focus_l_arrow", false);
					_comp.setElementVisibility("wkk_key_focus_c", false);
					_comp.setElementBackground("wkk_tx", "url('../image/ime/VER_SEARCH_INPUT_NORMAL.png')");
					_comp.setElementBackground("wkk_key_58", "url('url('../image/ime/VER_BTN_NORMAL.png')");
					_comp.setElementBackground("wkk_key_59", "url('url('../image/ime/VER_BTN_NORMAL.png')");		
					
				//Left Arrow
				} else if ( keyId == 'wkk_key_54' ) {	
					//var top = document.getElementById("wkk_key_5").offsetTop-8;
					//var left = document.getElementById("wkk_key_54").offsetLeft - 9;
					var top = document.getElementById("wkk_key_5").offsetTop;
					var left = document.getElementById("wkk_key_54").offsetLeft;
					var e = document.getElementById("wkk_key_focus_l_arrow");
					e.style.top = top + "px";
					e.style.left = left + "px";
					e.style.visibility = "";
					_comp.setElementVisibility("wkk_key_focus_n", false);
					//_comp.setElementVisibility("wkk_key_focus_m", false);
					_comp.setElementVisibility("wkk_key_focus_l", false);
					_comp.setElementVisibility("wkk_key_focus_s", false);
					_comp.setElementVisibility("wkk_key_focus_r_arrow", false);
					_comp.setElementVisibility("wkk_key_focus_b", false);
					_comp.setElementVisibility("wkk_key_focus_c", false);
					_comp.setElementBackground("wkk_tx", "url('../image/ime/VER_SEARCH_INPUT_NORMAL.png')");
					_comp.setElementBackground("wkk_key_58", "url('url('../image/ime/VER_BTN_NORMAL.png')");
					_comp.setElementBackground("wkk_key_59", "url('url('../image/ime/VER_BTN_NORMAL.png')");
					
				//Right Arrow
				} else if ( keyId == 'wkk_key_55' ) {	
					//var top = document.getElementById("wkk_key_5").offsetTop-8;
					//var left = document.getElementById("wkk_key_55").offsetLeft - 9;
					var top = document.getElementById("wkk_key_5").offsetTop;
					var left = document.getElementById("wkk_key_55").offsetLeft;
					var e = document.getElementById("wkk_key_focus_r_arrow");
					e.style.top = top + "px";
					e.style.left = left + "px";
					e.style.visibility = "";
					_comp.setElementVisibility("wkk_key_focus_l_arrow", false);
					_comp.setElementVisibility("wkk_key_focus_n", false);
					//_comp.setElementVisibility("wkk_key_focus_m", false);
					_comp.setElementVisibility("wkk_key_focus_l", false);
					_comp.setElementVisibility("wkk_key_focus_s", false);
					_comp.setElementVisibility("wkk_key_focus_b", false);
					_comp.setElementVisibility("wkk_key_focus_c", false);
					_comp.setElementBackground("wkk_tx", "url('../image/ime/VER_SEARCH_INPUT_NORMAL.png')");
					_comp.setElementBackground("wkk_key_58", "url('url('../image/ime/VER_BTN_NORMAL.png')");
					_comp.setElementBackground("wkk_key_59", "url('url('../image/ime/VER_BTN_NORMAL.png')");
					
				}  else if ( keyId == 'wkk_tx') {	
					//isFocus = true;
					_comp.setElementBackground("wkk_tx", "url('../image/ime/VER_SEARCH_INPUT_FOCUS.png')");
					_comp.setElementVisibility("wkk_key_focus_n", false);
					//_comp.setElementVisibility("wkk_key_focus_m", false);
					_comp.setElementVisibility("wkk_key_focus_m2", false);
					_comp.setElementVisibility("wkk_key_focus_l", false);		
					_comp.setElementVisibility("wkk_key_focus_s", false);
					_comp.setElementVisibility("wkk_key_focus_b", false);
					_comp.setElementVisibility("wkk_key_focus_c", false);
					_comp.setElementBackground("wkk_key_58", "url('url('../image/ime/VER_BTN_NORMAL.png')");
					_comp.setElementBackground("wkk_key_59", "url('url('../image/ime/VER_BTN_NORMAL.png')");
					
				} else if( _comp.isHighlightableKey(_comp_currentPageIdx, keyId) ) {
					var topIndex = keyId.charAt(8);			
					//var top = document.getElementById("wkk_key_"+topIndex).offsetTop - 8;
					//var left = document.getElementById(keyId).offsetLeft - 9;
					var top = document.getElementById("wkk_key_"+topIndex).offsetTop;
					var left = document.getElementById(keyId).offsetLeft;
					var e = "";

					if(keyId == 'wkk_key_60'){
						e = document.getElementById("wkk_key_focus_m2");
						_comp.setElementVisibility("wkk_key_focus_n", false);
						_comp.setElementVisibility("wkk_key_focus_st", false);
						_comp.setElementVisibility("wkk_key_focus_c", false);				
					} else if(keyId == 'wkk_key_61'){
						e = document.getElementById("wkk_key_focus_st");
						_comp.setElementVisibility("wkk_key_focus_n", false);
						_comp.setElementVisibility("wkk_key_focus_m2", false);
						_comp.setElementVisibility("wkk_key_focus_c", false);				
					} else if(keyId == 'wkk_key_62'){
						e = document.getElementById("wkk_key_focus_c");
						_comp.setElementVisibility("wkk_key_focus_n", false);
						_comp.setElementVisibility("wkk_key_focus_st", false);
						_comp.setElementVisibility("wkk_key_focus_m2", false);				
					} else{
						e = document.getElementById("wkk_key_focus_n");
						_comp.setElementVisibility("wkk_key_focus_m2", false);
						_comp.setElementVisibility("wkk_key_focus_st", false);
						_comp.setElementVisibility("wkk_key_focus_c", false);
					}

					e.style.top = top + "px";
					e.style.left = left + "px";
					
					var val = _comp.getKeyValue(keyId);	

					if(val == "<") {
						e.innerHTML = "&lt;";
					} else if(val == "&"){
						e.innerHTML = "&amp;";
						//e.innerHTML = "&"+val;
					} else {
						e.innerHTML = val;	
					}
		
					e.style.visibility = "";

					//_comp.setElementVisibility("wkk_key_focus_m", false);			
					_comp.setElementVisibility("wkk_key_focus_s", false);
					_comp.setElementVisibility("wkk_key_focus_b", false);
					//_comp.setElementVisibility("wkk_key_focus_c", false);
					_comp.setElementVisibility("wkk_key_focus_r_arrow", false);
					_comp.setElementVisibility("wkk_key_focus_l_arrow", false);
					_comp.setElementBackground("wkk_tx", "url('../image/ime/VER_SEARCH_INPUT_NORMAL.png')");
					_comp.setElementBackground("wkk_key_58", "url('url('../image/ime/VER_BTN_NORMAL.png')");
					_comp.setElementBackground("wkk_key_59", "url('url('../image/ime/VER_BTN_NORMAL.png')");
					
				}
			
			/*********************************************************************/
			/*********************  KeyBoard Layout 3 Start  *********************/
			/*********************************************************************/	
			}else{

				var x = keyId.charAt(8);
		  		var y = keyId.charAt(9);
		  		
		  		 /* enter 기능 삭제로 해당 구문 삭제 (5.9 by sophia)  
		  		 // OK
					if (keyId == 'wkk_key_58') { 
						
						_comp.setElementBackground("wkk_key_58", "url('../images/ime/horizontal/HOR_BTN_FOCUS.png')");
						_comp.setElementVisibility("wkk_key_focus_n", false); 
						_comp.setElementVisibility("wkk_key_focus_n1", false);
						_comp.setElementVisibility("wkk_key_focus_n2", false);
						_comp.setElementVisibility("wkk_key_focus_n3", false);
						_comp.setElementVisibility("wkk_key_focus_n4", false);					
						_comp.setElementVisibility("wkk_key_focus_n5", false);		
						_comp.setElementVisibility("wkk_key_focus_ns", false);
						_comp.setElementVisibility("wkk_key_focus_l", false);
						_comp.setElementVisibility("wkk_key_focus_n_la", false);	
						_comp.setElementVisibility("wkk_key_focus_n_ra", false);
						_comp.setElementVisibility("wkk_key_focus_n_ent", false); 
						_comp.setElementVisibility("wkk_key_focus_m_hdd", false); 
						//_comp.setElementBackground("wkk_tx", "url('../image/horizontal/HOR_SEARCH_INPUT_NORMAL.png')");
						document.getElementById("wkk_key").style.border = "solid rgb(132,132,132)";
						_comp.setElementBackground("wkk_input", "url('../images/ime/horizontal/HOR_SEARCH_INPUT_NORMAL_1.png')");
						
					} else */
		  			if( keyId == 'wkk_key_000' ) {
						//for changeKeySetKey
						/*
						  Ime 자판 위치 변경으로 UI에서 수정(5.9 by sophia) 
						var top = document.getElementById("wkk_key_0").offsetTop - 5;
						var left = document.getElementById("wkk_key_000").offsetLeft - 5;
						*/
						var top = document.getElementById("wkk_key_0").offsetTop;
						var left = document.getElementById("wkk_key_000").offsetLeft;
						var e = document.getElementById("wkk_key_focus_n4");
						e.style.top = top + "px";
						e.style.left = left + "px";
						var val = _comp.getKeyValue(keyId);

						if(val == "<") {
							e.innerHTML = "&lt;";
							
						// 초기 로딩시 포커스 세팅을 위해 추가 (5.12 by sophia) 
						} else if(val == " ") {
							e.innerHTML = document.form2.langName.value;
							
						} else {
							e.innerHTML = val;
						}

						e.style.visibility = "";
						_comp.setElementVisibility("wkk_key_focus_n", false); 
						_comp.setElementVisibility("wkk_key_focus_n1", false);
						_comp.setElementVisibility("wkk_key_focus_n2", false);
						_comp.setElementVisibility("wkk_key_focus_n3", false);
						_comp.setElementVisibility("wkk_key_focus_n5", false);									
						_comp.setElementVisibility("wkk_key_focus_l", false);
						_comp.setElementVisibility("wkk_key_focus_n_la", false);	
						_comp.setElementVisibility("wkk_key_focus_n_ra", false);
						_comp.setElementVisibility("wkk_key_focus_n_ent", false); 
						_comp.setElementVisibility("wkk_key_focus_m_hdd", false); 						
						//_comp.setElementBackground("wkk_tx", "url('../image/horizontal/HOR_SEARCH_INPUT_NORMAL.png')");
						/*
						 Ime 자판 위치 변경으로 UI에서 수정(5.9 by sophia) 
						_comp.setElementBackground("wkk_key_58", "url('../images/ime/horizontal/HOR_BTN_NORMAL.png')");
						*/
						_comp.setElementBackground("wkk_input", "url('../images/ime/horizontal/HOR_SEARCH_INPUT_NORMAL_1.png')");
						
					}else if( keyId == 'wkk_key_100') {
						//for changeKeySetKey
						/*
						Ime 자판 위치 변경으로 UI에서 수정(5.9 by sophia) 
						var top = document.getElementById("wkk_key_1").offsetTop - 5;
						var left = document.getElementById("wkk_key_100").offsetLeft - 5;
						*/
						var top = document.getElementById("wkk_key_1").offsetTop;
						var left = document.getElementById("wkk_key_100").offsetLeft;
						var e = document.getElementById("wkk_key_focus_n5");
						e.style.top = top + "px";
						e.style.left = left + "px";
						var val = _comp.getKeyValue(keyId);
						if(val == "<") {
							e.innerHTML = "&lt;";
						} else {
							e.innerHTML = val;
						}
						e.style.visibility = "";
						_comp.setElementVisibility("wkk_key_focus_n", false); 
						_comp.setElementVisibility("wkk_key_focus_n1", false);
						_comp.setElementVisibility("wkk_key_focus_n2", false);
						_comp.setElementVisibility("wkk_key_focus_n3", false);		
						_comp.setElementVisibility("wkk_key_focus_n4", false);						
						_comp.setElementVisibility("wkk_key_focus_l", false);
						_comp.setElementVisibility("wkk_key_focus_n_la", false);	
						_comp.setElementVisibility("wkk_key_focus_n_ra", false);
						_comp.setElementVisibility("wkk_key_focus_n_ent", false); 
						_comp.setElementVisibility("wkk_key_focus_m_hdd", false); 						
						//_comp.setElementBackground("wkk_tx", "url('../image/horizontal/HOR_SEARCH_INPUT_NORMAL.png')");
						/*
						 Ime 자판 위치 변경으로 UI에서 수정(5.9 by sophia) 
						_comp.setElementBackground("wkk_key_58", "url('../images/ime/horizontal/HOR_BTN_NORMAL.png')");
						*/
						_comp.setElementBackground("wkk_input", "url('../images/ime/horizontal/HOR_SEARCH_INPUT_NORMAL_1.png')");
					
						
					// 기능키 영역에 포커스가 가지 않도록 추가 함 (5.13 by sophia)
					}else if( keyId == 'wkk_key_300' || keyId == 'wkk_key_400' || keyId == 'wkk_key_110' || keyId == 'wkk_key_310' || keyId == 'wkk_key_311') {
						
					/*
					 * enter 기능 삭제로 해당 구문 삭제 (5.9 by sophia)  
					}else if( keyId == 'wkk_key_014' ) { // enter 
						var top = document.getElementById("wkk_key_0").offsetTop - 5;
						var left = document.getElementById("wkk_key_014").offsetLeft - 6;
						var e = document.getElementById("wkk_key_focus_n_ent");
						e.style.top = top + "px";
						e.style.left = left + "px";
						e.style.visibility = "";
						_comp.setElementVisibility("wkk_key_focus_n", false); 
						_comp.setElementVisibility("wkk_key_focus_n1", false);
						_comp.setElementVisibility("wkk_key_focus_n3", false);
						_comp.setElementVisibility("wkk_key_focus_n4", false);	
						_comp.setElementVisibility("wkk_key_focus_n5", false);									
						_comp.setElementVisibility("wkk_key_focus_ns", false);
						_comp.setElementVisibility("wkk_key_focus_l", false);
						_comp.setElementVisibility("wkk_key_focus_n_la", false);	
						_comp.setElementVisibility("wkk_key_focus_n_ra", false);
						_comp.setElementVisibility("wkk_key_focus_n2", false); 
						_comp.setElementVisibility("wkk_key_focus_m_hdd", false); 								
					//	_comp.setElementBackground("wkk_tx", "url('../image/horizontal/HOR_SEARCH_INPUT_NORMAL.png')");
						_comp.setElementBackground("wkk_key_58", "url('../images/ime/horizontal/HOR_BTN_NORMAL.png')");
						_comp.setElementBackground("wkk_input", "url('../images/ime/horizontal/HOR_SEARCH_INPUT_NORMAL_1.png')");
					 */						
					//} else if ( keyId == 'wkk_key_015' ) {
					} else if ( keyId == 'wkk_key_010' ) {
						//for back space	
						/*
						Ime 자판 위치 변경으로 UI에서 수정(5.9 by sophia) 
						var top = document.getElementById("wkk_key_0").offsetTop - 5;
						var left = document.getElementById("wkk_key_015").offsetLeft - 6;
						*/
						var top = document.getElementById("wkk_key_0").offsetTop;
						//var left = document.getElementById("wkk_key_015").offsetLeft;
						var left = document.getElementById("wkk_key_010").offsetLeft;
						var e = document.getElementById("wkk_key_focus_n2");
						e.style.top = top + "px";
						e.style.left = left + "px";
						e.style.visibility = "";
						_comp.setElementVisibility("wkk_key_focus_n", false); 
						_comp.setElementVisibility("wkk_key_focus_n1", false);
						_comp.setElementVisibility("wkk_key_focus_n3", false);
						_comp.setElementVisibility("wkk_key_focus_n4", false);
						_comp.setElementVisibility("wkk_key_focus_n5", false);										
						_comp.setElementVisibility("wkk_key_focus_ns", false);
						_comp.setElementVisibility("wkk_key_focus_l", false);
						_comp.setElementVisibility("wkk_key_focus_n_la", false);	
						_comp.setElementVisibility("wkk_key_focus_n_ra", false);
						_comp.setElementVisibility("wkk_key_focus_n_ent", false); 
						_comp.setElementVisibility("wkk_key_focus_m_hdd", false); 								
						//_comp.setElementBackground("wkk_tx", "url('../image/horizontal/HOR_SEARCH_INPUT_NORMAL.png')");
						/*
						 Ime 자판 위치 변경으로 UI에서 수정(5.9 by sophia) 
						_comp.setElementBackground("wkk_key_58", "url('../images/ime/horizontal/HOR_BTN_NORMAL.png')");
						*/
						_comp.setElementBackground("wkk_input", "url('../images/ime/horizontal/HOR_SEARCH_INPUT_NORMAL_1.png')");
						
						
					//}else if ( keyId == 'wkk_key_114' ) {	//Left arrow
					}else if ( keyId == 'wkk_key_210' ) {	//Left arrow
						//for left arrow		
						/*
						Ime 자판 위치 변경으로 UI에서 수정(5.9 by sophia) 
						var top = document.getElementById("wkk_key_1").offsetTop - 5;
						var left = document.getElementById("wkk_key_114").offsetLeft - 6;
						*/
						var top = document.getElementById("wkk_key_1").offsetTop + 53;
						//var left = document.getElementById("wkk_key_114").offsetLeft;
						var left = document.getElementById("wkk_key_210").offsetLeft;
						var e = document.getElementById("wkk_key_focus_n_la");
						e.style.top = top + "px";
						e.style.left = left + "px";
						e.style.visibility = "";
						_comp.setElementVisibility("wkk_key_focus_n", false); 
						_comp.setElementVisibility("wkk_key_focus_n1", false);
						_comp.setElementVisibility("wkk_key_focus_n2", false);
						_comp.setElementVisibility("wkk_key_focus_n3", false);
						_comp.setElementVisibility("wkk_key_focus_n4", false);	
						_comp.setElementVisibility("wkk_key_focus_n5", false);									
						_comp.setElementVisibility("wkk_key_focus_ns", false);
						_comp.setElementVisibility("wkk_key_focus_l", false);	
						_comp.setElementVisibility("wkk_key_focus_n_ra", false);
						_comp.setElementVisibility("wkk_key_focus_n_ent", false); 
						_comp.setElementVisibility("wkk_key_focus_m_hdd", false); 						
						//_comp.setElementBackground("wkk_tx", "url('../image/horizontal/HOR_SEARCH_INPUT_NORMAL.png')");
						/*
						 Ime 자판 위치 변경으로 UI에서 수정(5.9 by sophia) 
						_comp.setElementBackground("wkk_key_58", "url('../images/ime/horizontal/HOR_BTN_NORMAL.png')");
						*/
						_comp.setElementBackground("wkk_input", "url('../images/ime/horizontal/HOR_SEARCH_INPUT_NORMAL_1.png')");
						
				//}	else if ( keyId == 'wkk_key_115' ) {	//Right arrow
				}	else if ( keyId == 'wkk_key_211' ) {	//Right arrow					
					/*
					 Ime 자판 위치 변경으로 UI에서 수정(5.9 by sophia) 
						var top = document.getElementById("wkk_key_2").offsetTop - 5;
						var left = document.getElementById("wkk_key_115").offsetLeft - 6;
					*/
					//for right arrow		
					var top = document.getElementById("wkk_key_1").offsetTop + 53;
					//var left = document.getElementById("wkk_key_115").offsetLeft;
					var left = document.getElementById("wkk_key_211").offsetLeft;					
					var e = document.getElementById("wkk_key_focus_n_ra");
					e.style.top = top + "px";
					e.style.left = left + "px";
					e.style.visibility = "";
					_comp.setElementVisibility("wkk_key_focus_n", false); 
					_comp.setElementVisibility("wkk_key_focus_n1", false);
					_comp.setElementVisibility("wkk_key_focus_n2", false);
					_comp.setElementVisibility("wkk_key_focus_n3", false);
					_comp.setElementVisibility("wkk_key_focus_n4", false);
					_comp.setElementVisibility("wkk_key_focus_n5", false);										
					_comp.setElementVisibility("wkk_key_focus_ns", false);
					_comp.setElementVisibility("wkk_key_focus_l", false);
					_comp.setElementVisibility("wkk_key_focus_n_la", false);
					_comp.setElementVisibility("wkk_key_focus_n_ent", false); 
					_comp.setElementVisibility("wkk_key_focus_m_hdd", false); 							
					//setElementBackground("wkk_tx", "url('../images/ime/horizontal/HOR_SEARCH_INPUT_NORMAL.png')");
					/*
					 Ime 자판 위치 변경으로 UI에서 수정(5.9 by sophia) 
					_comp.setElementBackground("wkk_key_58", "url('../images/ime/horizontal/HOR_BTN_NORMAL.png')");
					*/
					_comp.setElementBackground("wkk_input", "url('../images/ime/horizontal/HOR_SEARCH_INPUT_NORMAL_1.png')");
						
				} else if( keyId == 'wkk_key_200' ) {
					/*
					 Ime 자판 위치 변경으로 UI에서 수정(5.9 by sophia) 
						var top = document.getElementById("wkk_key_2").offsetTop - 5;
						var left = document.getElementById("wkk_key_200").offsetLeft - 5;
					*/

					//for changeKeySetKey
					var top = document.getElementById("wkk_key_2").offsetTop;
					var left = document.getElementById("wkk_key_200").offsetLeft;
					var e = document.getElementById("wkk_key_focus_ns");
					e.style.top = top + "px";
					e.style.left = left + "px";
					var val = _comp.getKeyValue(keyId);
					if(val == "<") {
						e.innerHTML = "&lt;";
					} else {
						e.innerHTML = val;
					}
					e.style.visibility = "";
					_comp.setElementVisibility("wkk_key_focus_n", false); 
					_comp.setElementVisibility("wkk_key_focus_n1", false);
					_comp.setElementVisibility("wkk_key_focus_n2", false);
					_comp.setElementVisibility("wkk_key_focus_n3", false);
					_comp.setElementVisibility("wkk_key_focus_n4", false);
					_comp.setElementVisibility("wkk_key_focus_n5", false);										
					_comp.setElementVisibility("wkk_key_focus_l", false);
					_comp.setElementVisibility("wkk_key_focus_n_la", false);	
					_comp.setElementVisibility("wkk_key_focus_n_ra", false);
					_comp.setElementVisibility("wkk_key_focus_n_ent", false); 
					_comp.setElementVisibility("wkk_key_focus_m_hdd", false); 						
					//setElementBackground("wkk_tx", "url('../images/ime/horizontal/HOR_SEARCH_INPUT_NORMAL.png')");
					/*
					 Ime 자판 위치 변경으로 UI에서 수정(5.9 by sophia) 
					_comp.setElementBackground("wkk_key_58", "url('../images/ime/horizontal/HOR_BTN_NORMAL.png')");
					*/
					_comp.setElementBackground("wkk_input", "url('../images/ime/horizontal/HOR_SEARCH_INPUT_NORMAL_1.png')");
						
					/*
					 Ime 자판 위치 변경으로 UI에서 수정(5.9 by sophia) 
					}  else if( keyId == 'wkk_key_214' ) { //hidden
						var top = document.getElementById("wkk_key_2").offsetTop - 5;
						var left = document.getElementById("wkk_key_214").offsetLeft - 5;
					*/
				//}  else if( keyId == 'wkk_key_310' ) { //hidden
				}  else if( keyId == 'wkk_key_402' ) { //hidden		
					var top = document.getElementById("wkk_key_3").offsetTop + 36;
					//var left = document.getElementById("wkk_key_310").offsetLeft - 39;
					var left = document.getElementById("wkk_key_402").offsetLeft - 39;						
					var e = document.getElementById("wkk_key_focus_m_hdd");
					e.style.top = top + "px";
					e.style.left = left + "px";
					e.style.visibility = "";
					_comp.setElementVisibility("wkk_key_focus_n", false); 
					_comp.setElementVisibility("wkk_key_focus_n1", false);
					_comp.setElementVisibility("wkk_key_focus_n2", false);
					_comp.setElementVisibility("wkk_key_focus_n3", false);
					_comp.setElementVisibility("wkk_key_focus_n4", false);	
					_comp.setElementVisibility("wkk_key_focus_n5", false);									
					_comp.setElementVisibility("wkk_key_focus_ns", false);
					_comp.setElementVisibility("wkk_key_focus_l", false);
					_comp.setElementVisibility("wkk_key_focus_n_la", false);	
					_comp.setElementVisibility("wkk_key_focus_n_ra", false);
					_comp.setElementVisibility("wkk_key_focus_n_ent", false); 
					//setElementBackground("wkk_tx", "url('../images/ime/horizontal/HOR_SEARCH_INPUT_NORMAL.png')");
					/*
					 Ime 자판 위치 변경으로 UI에서 수정(5.9 by sophia) 
					_comp.setElementBackground("wkk_key_58", "url('../images/ime/horizontal/HOR_BTN_NORMAL.png')");
					*/
					_comp.setElementBackground("wkk_input", "url('../images/ime/horizontal/HOR_SEARCH_INPUT_NORMAL_1.png')");
					
					/*
					 Ime 자판 위치 변경으로 수정(5.9 by sophia) 
					}  else if ( keyId == 'wkk_key_205' ) {
						var top = document.getElementById("wkk_key_2").offsetTop - 5;
						var left = document.getElementById("wkk_key_205").offsetLeft - 5;
					*/
				//}  else if ( keyId == 'wkk_key_402' ) {
				}  else if ( keyId == 'wkk_key_401' ) {
					var top = document.getElementById("wkk_key_4").offsetTop;
					//var left = document.getElementById("wkk_key_402").offsetLeft;
					var left = document.getElementById("wkk_key_401").offsetLeft;						
					var e = document.getElementById("wkk_key_focus_l");
					e.style.top = top + "px";
					e.style.left = left + "px";
					e.style.visibility = "";
					_comp.setElementVisibility("wkk_key_focus_n", false); 
					_comp.setElementVisibility("wkk_key_focus_n1", false);
					_comp.setElementVisibility("wkk_key_focus_n2", false);
					_comp.setElementVisibility("wkk_key_focus_n3", false);
					_comp.setElementVisibility("wkk_key_focus_n4", false);
					_comp.setElementVisibility("wkk_key_focus_n5", false);										
					_comp.setElementVisibility("wkk_key_focus_ns", false);
					_comp.setElementVisibility("wkk_key_focus_n_la", false);	
					_comp.setElementVisibility("wkk_key_focus_n_ra", false);
					_comp.setElementVisibility("wkk_key_focus_n_ent", false); 
					_comp.setElementVisibility("wkk_key_focus_m_hdd", false); 		
					//setElementBackground("wkk_tx", "url('../images/ime/horizontal/HOR_SEARCH_INPUT_NORMAL.png')");
					/*
					 Ime 자판 위치 변경으로 UI에서 수정(5.9 by sophia) 
					_comp.setElementBackground("wkk_key_58", "url('../images/ime/horizontal/HOR_BTN_NORMAL.png')");
					*/
					_comp.setElementBackground("wkk_input", "url('../images/ime/horizontal/HOR_SEARCH_INPUT_NORMAL_1.png')");
					
					} 				
				else if ( keyId == 'wkk_tx') {				
					//_comp.setElementBackground("wkk_tx", "url('../image/horizontal/HOR_SEARCH_INPUT_FOCUS.png')");

					document.getElementById("wkk_key").style.border = "solid rgb(90,90,230)";
					_comp.setElementVisibility("wkk_key_focus_n", false); 
					_comp.setElementVisibility("wkk_key_focus_n1", false);
					_comp.setElementVisibility("wkk_key_focus_n2", false);
					_comp.setElementVisibility("wkk_key_focus_n3", false);
					_comp.setElementVisibility("wkk_key_focus_n4", false);
					_comp.setElementVisibility("wkk_key_focus_n5", false);										
					_comp.setElementVisibility("wkk_key_focus_ns", false);
					_comp.setElementVisibility("wkk_key_focus_l", false);
					_comp.setElementVisibility("wkk_key_focus_n_la", false);	
					_comp.setElementVisibility("wkk_key_focus_n_ra", false);
					_comp.setElementVisibility("wkk_key_focus_n_ent", false); 
					_comp.setElementVisibility("wkk_key_focus_m_hdd", false); 
					/*
					 Ime 자판 위치 변경으로 UI에서 수정(5.9 by sophia) 
					_comp.setElementBackground("wkk_key_58", "url('../images/ime/horizontal/HOR_BTN_NORMAL.png')");
					*/
					_comp.setElementBackground("wkk_input", "url('../images/ime/horizontal/HOR_SEARCH_INPUT_NORMAL_1.png')");
					
				}
	  		/*
				else if ( keyId == 'wkk_input') {
					_comp.setElementBackground("wkk_input", "url('../images/ime/horizontal/HOR_SEARCH_INPUT_FOCUS_1.png')");
					_comp.setElementVisibility("wkk_key_focus_n", false); 
					_comp.setElementVisibility("wkk_key_focus_n1", false);
					_comp.setElementVisibility("wkk_key_focus_n2", false);
					_comp.setElementVisibility("wkk_key_focus_n3", false);
					_comp.setElementVisibility("wkk_key_focus_n4", false);
					_comp.setElementVisibility("wkk_key_focus_n5", false);										
					_comp.setElementVisibility("wkk_key_focus_ns", false);
					_comp.setElementVisibility("wkk_key_focus_l", false);
					_comp.setElementVisibility("wkk_key_focus_n_la", false);	
					_comp.setElementVisibility("wkk_key_focus_n_ra", false);
					_comp.setElementVisibility("wkk_key_focus_n_ent", false); 
					_comp.setElementVisibility("wkk_key_focus_m_hdd", false);
					
					/*
					 Ime 자판 위치 변경으로 UI에서 수정(5.9 by sophia) 
					_comp.setElementBackground("wkk_key_58", "url('../images/ime/horizontal/HOR_BTN_NORMAL.png')");
					*/
				//} 
					
				else if ( keyId == 'btnArea') {				
					if(document.getElementById('wkk_input').value==""){
						return;
					} else{
						document.getElementById('btnArea').style.background = "url(../images/ime/horizontal/HOR_BTN_SEARCH__FOCUS.png)";
					}
				}
				else if( _comp.isHighlightableKey(_comp_currentPageIdx, keyId) ) {
					document.getElementById("wkk_key").style.border = "solid rgb(132,132,132)";
					var topIndex = keyId.charAt(8);
					/*
					 Ime 자판 위치 변경으로 UI에서 수정(5.9 by sophia) 
					var top = document.getElementById("wkk_key_"+topIndex).offsetTop - 5;
					var left = document.getElementById(keyId).offsetLeft - 5;			
					*/
					var top = document.getElementById("wkk_key_"+topIndex).offsetTop;
					var left = document.getElementById(keyId).offsetLeft;			
					
					var e = document.getElementById("wkk_key_focus_n");
					e.style.top = top + "px";
					e.style.left = left + "px";

					var val = _comp.getKeyValue(keyId);
					if(val == "<") {
						e.innerHTML = "&lt;";
					} else if(val == "&"){
						e.innerHTML = "&amp;";
						//e.innerHTML = "&"+val;
					} else {
						e.innerHTML = val;
					}

					e.style.visibility = "";
					_comp.setElementVisibility("wkk_key_focus_n1", false);
					_comp.setElementVisibility("wkk_key_focus_n2", false);
					_comp.setElementVisibility("wkk_key_focus_n3", false);
					_comp.setElementVisibility("wkk_key_focus_n4", false);
					_comp.setElementVisibility("wkk_key_focus_n5", false);										
					_comp.setElementVisibility("wkk_key_focus_ns", false);
					_comp.setElementVisibility("wkk_key_focus_l", false);
					_comp.setElementVisibility("wkk_key_focus_n_la", false);	
					_comp.setElementVisibility("wkk_key_focus_n_ra", false);
					_comp.setElementVisibility("wkk_key_focus_n_ent", false); 
					_comp.setElementVisibility("wkk_key_focus_m_hdd", false); 		
					//_comp.setElementBackground("wkk_tx", "url('../image/horizontal/HOR_SEARCH_INPUT_NORMAL.png')");				
					/*
					 Ime 자판 위치 변경으로 UI에서 수정(5.9 by sophia) 
					_comp.setElementBackground("wkk_key_58", "url('../images/ime/horizontal/HOR_BTN_NORMAL.png')");
					*/
					_comp.setElementBackground("wkk_input", "url('../images/ime/horizontal/HOR_SEARCH_INPUT_NORMAL_1.png')");
				}
			}	
			
			_comp.currentKeyId = keyId;
			//setElementCursor("keyId", "hand" );
			
		},
		
		/**
		 * return keyId by keyCode
		 * @param keyCode
		 * @return
		 */
		getKeyIdFromKeyCode : function (keyCode) {
			skFn.debug.log('getKeyIdFromKeyCode');
			var keyId = null;
			var _comp = this;
			var _comp_currentPageIdx	=	_comp._get('currentPageIdx');

			switch(keyCode) {
				case 8 :
				case 46 :
				case skTv.keymap.RW :
					keyId = "wkk_key_57";
					break;
				case 32 :
				case skTv.keymap.FF :
					keyId = "wkk_key_53";
					break;
				case skTv.keymap.N0 :
					if(imeLanguageInfo.isNumericKeyActivated(_comp_currentPageIdx)) {
						keyId = "wkk_key_37";
					}
					break;
				case skTv.keymap.N1 :
					if(imeLanguageInfo.isNumericKeyActivated(_comp_currentPageIdx)) {
						keyId = "wkk_key_05";
					}
					break;
				case skTv.keymap.N2 :
					if(imeLanguageInfo.isNumericKeyActivated(_comp_currentPageIdx)) {
						keyId = "wkk_key_06";
					}
					break;
				case skTv.keymap.N3 :
					if(imeLanguageInfo.isNumericKeyActivated(_comp_currentPageIdx)) {
						keyId = "wkk_key_07";
					}
					break;
				case skTv.keymap.N4 :
					if(imeLanguageInfo.isNumericKeyActivated(_comp_currentPageIdx)) {
						keyId = "wkk_key_15";
					}
					break;
				case skTv.keymap.N5 :
					if(imeLanguageInfo.isNumericKeyActivated(_comp_currentPageIdx)) {
						keyId = "wkk_key_16";
					}
					break;
				case skTv.keymap.N6 :
					if(imeLanguageInfo.isNumericKeyActivated(_comp_currentPageIdx)) {
						keyId = "wkk_key_17";
					}
					break;
				case skTv.keymap.N7 :
					if(imeLanguageInfo.isNumericKeyActivated(_comp_currentPageIdx)) {
						keyId = "wkk_key_25";
					}
					break;
				case skTv.keymap.N8 :
					if(imeLanguageInfo.isNumericKeyActivated(_comp_currentPageIdx)) {
						keyId = "wkk_key_26";
					}
					break;
				case skTv.keymap.N9 :
					if(imeLanguageInfo.isNumericKeyActivated(_comp_currentPageIdx)) {
						keyId = "wkk_key_27";
					}
					break;
				default :
					break;
			}
			return keyId;
		},
		
		//set label
		toggleKeyChange : function (){
			skFn.debug.log('toggleKeyChange');
			var _comp = LGImeComponent;
			var _comp_keyBoardType		=	_comp._get('keyBoardType');
			var VH_CHAR_LABEL 			= 	"12; )";
			
			SELECTED_LANG_LABEL = document.form2.langName.value;
			
			skFn.debug.log('toggleKeyChange => _comp_keyBoardType :' + _comp_keyBoardType +', SELECTED_LANG_LABEL : ' +SELECTED_LANG_LABEL);
			/*
			if(_comp_keyBoardType==0){	//Layout1
				_comp.setInnerHtml("wkk_key_60", SELECTED_LANG_LABEL);	//Lang Toggle
				_comp.setInnerHtml("wkk_key_61", STYLE_LABEL);			//s/l Toggle
				_comp.setInnerHtml("wkk_key_62", CHARACTER_LABEL);		//Character

			}else*/ if(_comp_keyBoardType==1){	//Layout2
				//setTdElementText("wkk_key_58", OK_BUTTON_LABEL);
				//setTdElementText("wkk_key_59", CANCEL_BUTTON_LABEL);
				//setTdElementText("wkk_title", TITLE_LABEL);

				_comp.setInnerHtml("wkk_key_60", SELECTED_LANG_LABEL);			//Lang Toggle
				_comp.setInnerHtml("wkk_key_61", imeLanguageInfo.STYLE_LABEL);	//s/l Toggle
				_comp.setInnerHtml("wkk_key_62", VH_CHAR_LABEL);				//Character		
				
				//_comp.setElementBackground("wkk_key_60", blackBgImage );
				//_comp.setElementBackground("wkk_key_61", blackBgImage );
				//_comp.setElementBackground("wkk_key_62", blackBgImage );		
				
				
				// 한영 변환 키 클릭과 동시에 체인지 키 변경 sophia 추가 (4.27)
				_comp.setInnerHtml("wkk_key_focus_m2", SELECTED_LANG_LABEL);	//Lang Toggle
				

				// sophia 추가 (4.24)
				if(SELECTED_LANG_LABEL == "ENG") {
					_comp.setCaretPosition(new Number(_comp.getCaretPosition()) + 1 , 0);
				}
				
			}else {	//Layout3
				// ime를 사용할 input에 focus 구문 수정(5.9 by sophia)				
				//document.getElementById("wkk_input").focus();
				document.getElementById(_comp._get('imeInputName')).focus();
				
				_comp.setElementBackground('btnArea', "url(../image/horizontal/HOR_BTN_SEARCH_DIMMED.png)");
				
				//setTdElementText("wkk_key_58", OK_BUTTON_LABEL);
				//setTdElementText("wkk_key_59", CANCEL_BUTTON_LABEL);		
				//setTdElementText("wkk_title", TITLE_LABEL);	
				
				_comp.setInnerHtml("wkk_key_000", SELECTED_LANG_LABEL);	//Lang Toggle
				_comp.setInnerHtml("wkk_key_100", imeLanguageInfo.STYLE_LABEL);			//s/l Toggle
				_comp.setInnerHtml("wkk_key_200", VH_CHAR_LABEL);			//Character		

			//	_comp.setElementBackground("wkk_key_116", blackBgImage );
			//	_comp.setElementBackground("wkk_key_100", blackBgImage );
			}	
		},
		/*
		changeKeyValue : function() {
			var _comp = this;
			var keyString = imeLanguageInfo.changeKeyValue(_comp._get('keyBoardType'), _comp._get('gubun'));
			var arrKeyString = keyString.slice(',');
			
			// Text 생성
			var keyElementId = "wkk_key_";

			for( var i = 0, charElementIdx = 0, RowSetElemnetIdx=0 ; i<arrKeyString.length; i++) {
				$("#" + keyElementId + RowSetElemnetIdx+charElementIdx).text(arrKeyString[i]); 

				if(charElementIdx < 5) {
					charElementIdx++;
				} else {
					charElementIdx = 0;
					RowSetElemnetIdx++;
				}
			}
		},
		*/
		// IME Char Setting
		setKeyText : function(keyId, value) {
			skFn.debug.log('setKeyText');
			var _comp = this;
			//_comp.toggleKeyChange();
			
			var keyItem = document.getElementById(keyId);	
			
			if(_comp._get('keyBoardType')==0){
				bgImage = "url('../image/KEYBOARD_BTN_01_N.png')";          //modify
				blackBgImage = "url('../image/KEYBOARD_BTN_02_N.png')";
			}else if(_comp._get('keyBoardType')==1){
				bgImage = "url('../image/ime/VER_KEYBOARD_BTN_01_N.png')";
				//blackBgImage = "url('../images/ime/VER_KEYBOARD_BTN_02_N.png')";
				blackBgImage = "url('../image/ime/VER_KEYBOARD_BTN_01_N.png')";
			}else if(_comp._get('keyBoardType')==2){
				/*
				 Ime 자판 위치 변경으로 UI에서 수정(5.9 by sophia) 
				bgImage = "url('../images/ime/horizontal/HOR_KEYBOARD_BTN_01_N.png')";
				blackBgImage = "url('../images/ime/horizontal/HOR_KEYBOARD_BTN_02_N.png')";
				*/
			}
				
			
			if(keyItem != null) {
				keyItem.firstChild.nodeValue = value;		
				if(_comp.isBlackKey(_comp._get('currentPageIdx'), keyId)) {			
					//IME 자판 위치 변경으로 HORIZONTAL TYPE이 아닌 경우만 호출되도록 UI에서 수정(5.9 BY SOPHIA) 
					if(_comp._get('keyBoardType')!=2){
						_comp.setElementBackground(keyId, blackBgImage );
					}
				} else {
					//IME 자판 위치 변경으로 HORIZONTAL TYPE이 아닌 경우만 호출되도록 UI에서 수정(5.9 BY SOPHIA) 
					if(_comp._get('keyBoardType')!=2){
						_comp.setElementBackground(keyId, bgImage );
					}
				}
			}
		},
		
		cancelHighlightPopUp : function () {
			skFn.debug.log('cancelHighlightPopUp');
			var _comp = this; 
		
			_comp.setElementVisibility("wkk_key_focus_pn", false);
			_comp.currentPopUpKeyId = null;
			_comp.setInputFocus();
		},
		
		//
		keyboardInit : function(){
			skFn.debug.log('keyboardInit');
			var _comp = LGImeComponent;
			var _comp_keyBoardType		=	_comp._get('keyBoardType');
			var _comp_langToggleState	=	_comp._get('langToggleState');
			var _comp_ImeInputName		=	_comp._get('imeInputName');
			var _comp_miniPopUpSupport;
			var c_CaretIdx;

			imeLanguageInfo.miniPopUpInfoObjects = new Array();
			//keyBoardType = type;
			document.form2.layout.value = _comp_keyBoardType;
			document.getElementById(_comp_ImeInputName).focus();

			//this.currentPageIdx = new Number(pageCnt) -1;	
			imeLanguageInfo.changeKeyValue(_comp._get('keyBoardType'), _comp._get('gubun'));
			_comp.toggleKeyChange();
			
			imeLanguageInfo.initialize(_comp_ImeInputName);
			_comp_miniPopUpSupport = imeLanguageInfo.miniPopUpInfoObjects.length > 0 ? true : false;
			_comp._set({miniPopUpSupport : _comp_miniPopUpSupport});
			
			//add_overscan
			/*if(_comp_keyBoardType!=2){
				getUserAgent();
			}
			 */


			if(_comp_langToggleState==0){
				_comp._set({currentKeyId : null});
				_comp._set({currentPopUpKeyId : null});
				imeLanguageInfo.setNewMode(0);
				
				//_comp._set({currentCaretIdx : 0});
				//오류 수정 @박순영 2011년 8월 29일 월요일 오후 2:07:42
				try{
					c_CaretIdx = eval(_comp_ImeInputName).value.length;
				}catch(e){
					c_CaretIdx = 0;
				}
				
				_comp._set({currentCaretIdx : c_CaretIdx});

				_comp.changeLanValue(_comp._get('gubun'));
			}

			//if(_comp_keyBoardType==1){
				//LGImeComponent.doHighlight('menu_03');
			//}


			
			/*// IME 자판 로딩 후 IME 영역노출 (sophia 5.4) 
			if(_comp._get("init_callback") != "") {
				eval(_comp._get("init_callback"))();
			}*/

			
			//setTdElementText("versionInfo", versionStr);
		},

		
		/* ========================================================================================================= */
		
		// 기능키 정의 ( keyCode  : skTv.keymap.RETURN)
		setFunctionKey : function(keyCode, fnCallback) {
			var _cmp = this;
			switch (keyCode) {
				case "skTv.keymap.RETURN" :
					_cmp._set({Fn_Key_RETURN:fnCallback});
					break;
			}
		},

		set_callbackZone : function(zone) {
			skFn.debug.log('set_callbackZone');
			var _comp = this;
			_comp._set({callbackZone:zone});
		},
		
		keyMove : function(keyCode) {
			skFn.debug.log('keyMove');
			var _comp = this;

			if(_comp._get('miniPopUpActivated')) {
				skFn.debug.log('keyMove => _comp._get("miniPopUpActivated")');
				//skFn.debug.log('miniPopUpActivated' + _comp._get('miniPopUpActivated'));
				if(_comp._get('currentPopUpKeyId') == null) {
					_comp.doHighlightPopUp("wkk_p"+currentPopUpInfo.popUpId+"_00");
				} else {
					var nextKey = _comp.getNextKeyIdPopUp(_comp._get('currentPopUpKeyId'), keyCode);
					
					if(nextKey != null) {
						_comp.cancelHighlightPopUp();
						_comp.doHighlightPopUp(nextKey);
					} 
				}
			} else {
				if( _comp._get('currentKeyId') == null ) {
					skFn.debug.log('keyMove => _comp._get("currentKeyId") : null');
					// BoardyType 2일때 오류발생으로 삭제함(5.15 by sophia)
					//_comp.doHighlight("wkk_key_00");
					if(_comp._get('keyBoardType') == 0 || _comp._get('keyBoardType') == 1) {
						_comp.doHighlight("wkk_key_00");
					}else if(_comp._get('keyBoardType') == 2){
						_comp.doHighlight("wkk_key_000");
					}
				} else {
					var nextKey = _comp.getNextKeyId(_comp._get('currentPageIdx'), _comp._get('currentKeyId'),  keyCode);
					skFn.debug.log('keyMove => _comp._get("currentKeyId") : not null, nextKey : ' + nextKey);
					
					if(nextKey != null) {
						_comp.cancelHighlight(_comp.currentKeyId);
						_comp.doHighlight(nextKey);				
					} 
				}
			}
		} 

		,
		
		// IME 호출 이전 zone으로 focus
		returnZone : function(){
			skFn.debug.log('returnZone');
			var _comp = this;
			_comp._set({currentKeyId:null});
			skTv.zone.focus(_comp._get('callbackZone'));
		},
		
		loadJavascript : function (callback) {
			skFn.debug.log('loadJavascript');
			var head= document.getElementById('langDiv');
		    var script= document.createElement('script');
		    script.type= 'text/javascript';
		    script.src = '../js/lang/english.js';
		    head.appendChild(script);
		    
		    script.onload = function () {
		        callback();
		    }
		    
		},
		
		// IME Display 
		//show : function(Zone, lang, inputName){
		show : function(Zone, lang, inputName, callback){
			skFn.debug.log('show');
			var _comp = this;
			var currentPopUpInfo = _comp._get('currentPopUpInfo');
			
			// settings
			//_comp._set({keyBoardType:1, gubun:'lang', langTogglIdx:0, defaultLanguage:lang, imeInputName:inputName, callbackZone:Zone});
			_comp._set({gubun:'lang', langTogglIdx:0, defaultLanguage:lang, imeInputName:inputName, callbackZone:Zone});

			// Ime 재실행시 language 다시 세팅하도록 수정 (by sophia 4.25)
			_comp._set({langToggleState:0});
			
			
			// 한글 입력 오류로 삭제 (by sophia 4.25)
			/*
			$("#" + inputName).unbind("keydown");
				
			$("#" + inputName).bind("keydown", function() {
				skFn.debug.log('bind("keydown")');
				_comp.putStrIntoFld(this.value, _comp.getCaretPosition()+1)
			});
			*/
			document.body.onselectstart = function( e ) {
			  return false;
			 }
			 
			 document.body.ondragstart  = function( e ) {
			  return false;
			 }
			 
			 document.body.onmousedown  = function( e ) {
			  return false;
			 }
			// input에서 매직모션 리모컨으로 클릭시 커서 움직이지 않도록 추가 (by Soonyoung Park 2011년 11월 14일 월요일)
			/*$("#" + inputName).bind("click", function(event){
				//this.blur();
			});
			$("#" + inputName).bind("focus", function(event){
				var pos = _comp.doGetCaretPosition();
				alert("before : "+pos+"\n"+_comp.getCaretPosition());
				_comp.setCaretPosition(pos, 0); 
				alert("before : "+pos+"\n"+_comp.getCaretPosition());
				alert("after : "+pos);
				//this.blur();
			});*/
			// input에서 키 움직일때 커서가 움직이지 않도록 추가 (원래 Ime에 있던 함수)(by sophia 4.25)
			$("#" + inputName).bind("keydown", function() {
				_comp.setInputCaret();
			});
	
			// input size보다 입력값이 더 긴 경우 마우스로 입력시 커서가 움직이지 않도록 추가(by sophia 5.17)
 			$("#" + inputName).blur(function() {
				_comp.setInputCaret();
			});
			
 			// IME 자판 로딩 후 IME 영역노출을 위해 콜백함수 세팅 (sophia 5.4) 
			if(typeof callback != "undefined") {
				_comp._set({init_callback:callback});
			}
				
			
			// IME display (langDiv에 english.js가 로딩되기 전이면 로딩 후 display)
			if($('#langDiv').html() == "") {
				_comp.loadJavascript(_comp.keyboardInit);
			} else {
				_comp.keyboardInit();
			}
		},
		
		// IME focus
		onFocus :function() {
			skFn.debug.log('onFocus');
			//LGImeComponent.keyMove("RIGHT");
			//LGImeComponent.keyMove(skTv.keymap.RIGHT);
		},
		
		hide :function() {
			//skTv.zone.focus('Ime');
			//skTv.zone._handleKeyDown('Ime');
		},
		/**
		 * getInputVal	
		 *	2012-08-06 [10:01:41] @SoonyoungPark 추가
		 *	: 입력창에 입력된 값 리턴
		 * @function
		 * @param	{void} 
		 * @return	{String}
		 */
		getInputVal : function(){
			return document.getElementById(this._get('imeInputName')).value;
		},
		/**
		 * getInputObj	
		 *	2012-08-27 [14:40:41] @SoonyoungPark 추가
		 *	: 인풋 오브젝트 리턴
		 * @function
		 * @param	{void} 
		 * @return	{Object}
		 */
		getInputObj : function(){
			return document.getElementById(this._get('imeInputName'));
		}
	}
}); 