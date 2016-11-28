(function() {
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

    function iframeRoot() {
        var _host = window.location.host,
            _iRoot = '';
        if (_host == "you.yxp.163.com") {
            _iRoot = "//you.yxp.163.com";
        } else if (_host == "you.163.com") {
            _iRoot = "//you.163.com";
        }
        return _iRoot;
    }

    if (UA.versions.mobile || UA.versions.ios || UA.versions.android ||
        UA.versions.iPhone || UA.versions.iPad) { // 移动端
        $('.psc-m-hd, .psc-m-loginbox, .m-fixedtool').remove();
    } else {
        var _host = iframeRoot() ? iframeRoot() : 'http://you.yxp.163.com';
        if (_host) {
            $('.J_iframeHD').attr('src', _host + '/activity/hd');
        } else {
            $('.J_iframeHD').attr('src', _host + '/activity/hd');
        }
    }

    var log = {
        getType: function() {
            var type = 'web';
            if (UA.versions.mobile || UA.versions.ios || UA.versions.android ||
                UA.versions.iPhone || UA.versions.iPad) { // 移动端
                type = 'h5';
            } else {
                type = 'web';
            }
            return type;
        },
        getStatSubject: function() {
            var stat_subject = $('.J_psc_hd_info').find('.stat_subject').data('stat_subject');
            return stat_subject ? stat_subject : window.psc_act_id;
        },
        log: function(data) {
            var params = [],
                that = this,
                type = that.getType();
            params.push('activity=' + that.getStatSubject());
            for (var p in data) {
                if (data.hasOwnProperty(p)) {
                    params.push('' + p + '=' + data[p]);
                }
            }
            params.push('type=' + type);
            params.push('rid=' + new Date().getTime());
            var url = '//stat.mail.163.com/activity/a.js' + '?' + params.join('&');
            url = encodeURI(url);
            $.getScript(url);
        },
        bindLog: function() {
            var that = this;
            // 时间代理到body上面
            $('body').on('click', '.J_log', function(e) {
                var $target = $(e.target),
                    logName = $target.data('logname') ? $target.data('logname') : $(e.currentTarget).data('logname');
                if (logName) {
                    that.log({
                        key: logName
                    });
                }
            });
        }
    };
    log.log({
        key:'活动落地页总'
    });
})();