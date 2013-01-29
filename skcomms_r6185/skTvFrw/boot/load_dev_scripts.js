/**
 *
 * run_dev_scripts.js
 *
 * 개발용 (압축안된) 라이브러리 및 모델, 컨트롤러, 컴포넌트 들을 로드한다. 이 파일은 개발 모드일 때만 작동된다.
 *
 * @internal ************************* [ file info. start ] *********************************
 *
 * @category		boot
 * @package		
 * @author		shim, heung woon <lumiel@skcomms.co.kr>
 * @filesource

 * @__history		

				[2011-05-14 오후 5:06:01] shim

				1. 개발 시작
				2. skTv.runtime.includeFiles() 로 공통 및 개별 스크립트를 분리
				3. load_jade.js 의 skTv.runtime 개체를 참고

 * @_uses

				* load_jade.js 의 skTv.runtime 개체를 참고

 * @_todo			[Information string [unspecified format]]
 * @_tutorial		[Display a link to the documentation for a tutorial]
 * @_abstract		[Document an abstract class, class variable or method]
 * @_final			[Document a class method that should never be overridden in a child class]
 * @__datatype 	[array, boolean, integer, mixed, string]
 * @_internal
 * 
 * @internal ************************* [ file info. end ] *********************************
 */



skTv.runtime.includeFiles('common'); // 공통 파일을 로드한다
skTv.runtime.includeFiles(skTv.runtime.baseFileName); // 개별 파일을 로드한다