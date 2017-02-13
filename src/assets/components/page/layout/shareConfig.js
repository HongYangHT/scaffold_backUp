(function(){
	var $shareInfo = $('.m-psc-shareInfo'),
		img = $shareInfo.find('.u-psc-shareInfo-img').val(),
		url = $shareInfo.find('.u-psc-shareInfo-url').val(),
		title = $shareInfo.find('.u-psc-shareInfo-title').val(),
		desc = $shareInfo.find('.u-psc-shareInfo-desc').val();
	window.shareConfig = {
        img: img,
        wbpic : img,
        url: url,
        desc: desc,
        title: title,
        timeline_title: title,
        wContent : desc,
        topicId : '23712738912',
        shareList : ['wxFriend','wxTimeline','weibo','QQFriend','QQZone','yxFriend','yxTimeline','message','copy','mail'],
        callback: function(successOrNot, shareToWhichSNS) { 
            
        }
    };	
})();