(function(){
	var UA = {
        versions: function() {
            var u = navigator.userAgent,
                app = navigator.appVersion;
            return { //移动终端浏览器版本信息
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
            };
        }()
    };

    function iframeRoot(){
    	var _host = window.location.host,
    		_iRoot = '';
    		if(_host == "you.yxp.163.com"){
            	_iRoot = "//you.yxp.163.com";
        	}else if(_host == "you.163.com"){
          		_iRoot = "//you.163.com";
     		}
        return _iRoot;
    }

    if (UA.versions.mobile || UA.versions.ios || UA.versions.android ||
        UA.versions.iPhone || UA.versions.iPad) { // 移动端
    	$('.psc-g-ft').remove();
    } else {
    	var _host = iframeRoot() ? iframeRoot() : 'http://you.yxp.163.com';
    	if(_host){
    		$('.J_iframeFT').attr('src', _host + '/activity/ft');
    	}else{
    		$('.J_iframeFT').attr('src', _host + '/activity/ft');
    	}
    }
})();