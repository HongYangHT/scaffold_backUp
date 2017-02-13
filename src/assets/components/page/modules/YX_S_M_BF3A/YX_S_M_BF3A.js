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
        $('.YX-S-M-BF3A .J_lazyload').lazyload({
            threshold : 50,
            effect : 'fadeIn',
            opacity:true
        }); 
    }
    var tab_1 = $('.YX-S-M-BF3A').find('.u-BF3A-tab').eq(0).attr('href'),
        top_1 = tab_1 && $('' + tab_1 + '').size() ? ($('' + tab_1 + '').offset().top - 80) : '',
        tab_2 = $('.YX-S-M-BF3A').find('.u-BF3A-tab').eq(1).attr('href'),
        top_2 = tab_2 && $('' + tab_2 + '').size() ? ($('' + tab_2 + '').offset().top - 80) : '',
        tab_3 = $('.YX-S-M-BF3A').find('.u-BF3A-tab').eq(2).attr('href'),
        top_3 = tab_3 && $('' + tab_3 + '').size() ? ($('' + tab_3 + '').offset().top - 80) : '',
        tab_4 = $('.YX-S-M-BF3A').find('.u-BF3A-tab').eq(3).attr('href'),
        top_4 = tab_4 && $('' + tab_4 + '').size() ? ($('' + tab_4 + '').offset().top - 80) : '',
        scrollTop = (document.documentElement.scrollTop|| document.body.scrollTop ),
        halfHeight=document.documentElement.clientHeight/2,
        time = '';
         console.log(scrollTop);
    if (scrollTop>= top_1) {
        $('.YX-S-M-BF3A').addClass('YX-BF3A-showTab');
    } else {
        $('.YX-S-M-BF3A').removeClass('YX-BF3A-showTab');
    }
    if (top_4 && scrollTop+halfHeight>= top_4) {
        $('.YX-S-M-BF3A').find('.u-BF3A-tab').eq(3).addClass('active').siblings('.u-BF3A-tab').removeClass('active');
    } else if (top_3 && scrollTop >= top_3) {
        $('.YX-S-M-BF3A').find('.u-BF3A-tab').eq(2).addClass('active').siblings('.u-BF3A-tab').removeClass('active');
    } else if (top_2 && scrollTop >= top_2) {
        $('.YX-S-M-BF3A').find('.u-BF3A-tab').eq(1).addClass('active').siblings('.u-BF3A-tab').removeClass('active');
    } else {
        $('.YX-S-M-BF3A').find('.u-BF3A-tab').eq(0).addClass('active').siblings('.u-BF3A-tab').removeClass('active');
    }
    window.addEventListener('scroll', function() {
        var sTop = (document.documentElement.scrollTop || document.body.scrollTop);
        var hHeight=document.documentElement.clientHeight/2;
        time && clearTimeout(time);
        time = setTimeout(function() {
            if (sTop >= top_1) {
                $('.YX-S-M-BF3A').addClass('YX-BF3A-showTab');
            } else {
                $('.YX-S-M-BF3A').removeClass('YX-BF3A-showTab');
            }
            if (top_4 && sTop+hHeight>= top_4) {
                $('.YX-S-M-BF3A').find('.u-BF3A-tab').eq(3).addClass('active').siblings('.u-BF3A-tab').removeClass('active');
            } else if (top_3 && sTop >= top_3) {
                $('.YX-S-M-BF3A').find('.u-BF3A-tab').eq(2).addClass('active').siblings('.u-BF3A-tab').removeClass('active');
            } else if (top_2 && sTop >= top_2) {
                $('.YX-S-M-BF3A').find('.u-BF3A-tab').eq(1).addClass('active').siblings('.u-BF3A-tab').removeClass('active');
            } else {
                $('.YX-S-M-BF3A').find('.u-BF3A-tab').eq(0).addClass('active').siblings('.u-BF3A-tab').removeClass('active');
            }
        });
    });  
})();