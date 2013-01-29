/**
 *
 * PhotoReplyViewController.js
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
				
 * @_history

				[2011-02-21 ���� 3:56:02 / shim]

				
				
 * @_tutorial		
 * @_version		
 * @_abstract
 * @_final			
 * @_internal
 * 
 * @internal ************************* [ file info. end ] *********************************
 */



/**
 * PhotoReplyLayer Controller
 */

var PhotoReplyViewControllerClass = defineClass({

	extend : BaseControllerClass,

	name : 'PhotoReplyViewControllerClass',

	/**
	 * ���� : ��Ʈ�ѷ� �ν��Ͻ� �ʱ�ȭ
	 */
	construct : function(){

		// ����Ŭ������ ü�̴�
		this.superclass();

		this._init([
			'writeDate',
			'writerImg',
			'writerName',
			'content'
		]);
	},

	/**
	 * �ν��Ͻ� �޽��
	 */
	
	methods : {
		/*
		 * 댓글 상세보기
		 */
		show : function(){
			var replyMoveIndex, replyApiDataIdx;
			var arrPhotoReplyDataList = new Array();
			
			arrPhotoReplyDataList	=	PhotoReplyController._get('arrPhotoReplyDataList');
			replyApiDataIdx			=	PhotoReplyController._get('replyApiDataIdx');
			replyMoveIndex			=	PhotoReplyController._get('replyMoveIndex');
			
			if(skFn.array.isArray(arrPhotoReplyDataList) == true) {
				$(".popup_reply_detail .user").text(arrPhotoReplyDataList[replyApiDataIdx+replyMoveIndex].writerName);
				$(".popup_reply_detail .date").text(arrPhotoReplyDataList[replyApiDataIdx+replyMoveIndex].writeDate);
				$(".popup_reply_detail .description").text(arrPhotoReplyDataList[replyApiDataIdx+replyMoveIndex].content);
				
				// 프로필 이미지
				if(arrPhotoReplyDataList[replyApiDataIdx+replyMoveIndex].img != ""){
					$(".popup_reply_detail .user_img").html('<img src="' + THUMB_IMG_URL_60X60 + arrPhotoReplyDataList[replyApiDataIdx+replyMoveIndex].img + '" alt="" onerror="this.src=\'../image/img/icon_profile_null.jpg\'" width="60" height="60" />');
				} else {
					$(".popup_reply_detail .user_img").html('<img src="../image/img/icon_profile_null.jpg" alt="">');
				}
			} else {
				$(".popup_reply_detail .user").text(arrPhotoReplyDataList.writerName);
				$(".popup_reply_detail .date").text(arrPhotoReplyDataList.writeDate);
				$(".popup_reply_detail .description").text(arrPhotoReplyDataList.content);
				
				// 프로필 이미지
				if(arrPhotoReplyDataList.img != ""){
					$(".popup_reply_detail .user_img").html("<img src='" + THUMB_IMG_URL_60X60 + arrPhotoReplyDataList.img + "' alt='' width='60' height='60' />");
				}
			}
		}
	}
});

