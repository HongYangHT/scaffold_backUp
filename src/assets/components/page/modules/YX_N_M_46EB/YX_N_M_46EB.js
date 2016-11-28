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

    var myModule = {
        lazyload: function() {
            setTimeout(function() {
                if (UA.versions.mobile || UA.versions.ios || UA.versions.android ||
                    UA.versions.iPhone || UA.versions.iPad) { // 移动端
                    PSC_lazyload({
                        inViewTreshhold: 100,
                        opacity: true
                    });
                } else {
                    $('.YX-N-M-46EB .J_lazyload').lazyload({
                        threshold: 50,
                        effect: 'fadeIn'
                    });
                }
            }, 300);
        },
        getAjaxData: function(url, data, callback) {
            var self = this;
            $.ajax({
                type: 'GET',
                url: url,
                async: false,
                cache: false,
                dataType: 'jsonp',
                data: data || '',
                success: function(res) {
                    callback(res);
                }
            });
        },
        getGoodsRender: function(element, id, subject) {
            var self = this,
                _html = '';
            self.getAjaxData('http://activity.mail.163.com/hdapi/api2/goods/ajax/getGroup.do', {
                id: id
            }, function(res) {
                var _goods = res.content.goodsList,
                    _html = '',
                    _subject = $(element).find('.stat_subject').val();
                $.each(_goods, function(k, v) {
                    var _detail = v.detail;
                    _html += [
                        '<li class="u-46EB-item">',
                        '<div class="u-46EB-product">',
                        '<div class="u-46EB-product-hd">',
                        '<a href="http://you.163.com/item/detail?id=' + _detail.id + '&_stat_subject=' + _subject + '" title="' + _detail.title + '" target="_blank" class="PSC_J_normal_statistics_Goods">',
                        '<img class="u-46EB-img J_lazyload" data-original="' + _detail.primaryPicUrl + '?imageView&quality=95&thumbnail=245x245" alt="' + _detail.title + '">',
                        '</a>',
                        '</div>',
                        '<div class="u-46EB-product-bd">',
                        '<h4 class="u-46EB-name">',
                        '<a href="http://you.163.com/item/detail?id=' + _detail.id + '&_stat_subject=' + _subject + '" title="' + _detail.title + '" target="_blank" class="PSC_J_normal_statistics_Goods">' + _detail.title + '</a>',
                        '</h4>',
                        '<p class="u-46EB-price">',
                        '<span>¥' + _detail.retailPrice + '</span>',
                        '</p>',
                        '<hr>',
                        '<span class="u-46EB-sign">' + _detail.simpleDesc + '</span>',
                        '</div>',
                        '</div>',
                        '</li>'
                    ].join('');
                });
                $(element).find('ul').empty().append(_html);
                self.lazyload();
            });

        }
    };

    $('.YX-N-M-46EB .goodsId').each(function(i, n) {
        var _id = $(n).data('goodsid');
        myModule.getGoodsRender($(n).closest('.YX-N-M-46EB'), _id, window.psc_act_id);
    });
    $('body').on('click', '.PSC_J_normal_statistics_Goods', function(e) {
        PSC_C_statistics.normalGoods(this);
    });

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
            return window.psc_act_id;
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
            $('body').on('click', '.YX-N-M-46EB .J_log', function(e) {
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
    log.bindLog();
})();