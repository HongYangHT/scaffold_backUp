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
    if (UA.versions.mobile || UA.versions.ios || UA.versions.android ||
        UA.versions.iPhone || UA.versions.iPad) { // 移动端
        PSC_lazyload({
        	inViewTreshhold:100,
        	opacity:true
        });
    } else {
        $('.YX-S-M-3DA7 .J_lazyload').lazyload({
            threshold : 50,
            effect : 'fadeIn',
            opacity:true
        }); 
    }
})();