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
                    $('.YX-N-M-C88F .J_lazyload').lazyload({
                        threshold: 50,
                        effect: 'fadeIn',
                        opacity: true
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
        setSwiper: function(id) {
            setTimeout(function() {
                var swiper = $('#m-C88F-swiper-'+id).swiper({
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                    pagination: '.swiper-pagination',
                    onSlideChangeEnd: function(swiper) {
                        var active = swiper.activeIndex,
                            img = $('#m-C88F-swiper-'+id).find('.u-C88F-goods-swiper').eq(active).find('.swiper-lazy').data('original');
                        $('#m-C88F-swiper-'+id).closest('.YX-N-M-C88F').find('.u-C88F-goods').eq(active).addClass('active').siblings('.u-C88F-goods').removeClass('active');
                        $('#m-C88F-swiper-'+id).find('.u-C88F-goods-swiper').eq(active).find('.swiper-lazy').attr('src',img);
                    }
                });
                $('.m-C88F-goods').on('click', '.u-C88F-goods', function(e) {
                    var $target = $(e.target),
                        i = parseInt($target.data('num')) || parseInt($(e.currentTarget).data('num'));
                    $target.addClass('active');
                    swiper.slideTo(i - 1);
                });
            }, 300);
        },
        getGoodsRender: function(element, id, subject, needScenePicUrl) {
            var that = this;
            var _html1 = '';
            var _html2 = '';
            that.getAjaxData('https://spread.mail.163.com/mail/goods/getGroup', {
                id: id
            }, function(res) {
                var _goods = res.content.goodsList,
                    _subject = subject || $(element).find('.stat_subject').val();
                $.each(_goods, function(k, v) {
                    if (k == 0) {
                        _html1 += [
                            '<div class="u-C88F-goods active" data-num="' + (k + 1) + '">',
                            '<i class="i-C88F-num"></i>',
                            '<span class="u-C88F-goods-title">' + v.title + '</span>',
                            '<img data-original="' + (needScenePicUrl ? v.scenePicUrl : v.notSoldOutGoods.imgUrl) + '?imageView&thumbnail=87x87&quality=95" class="J_lazyload u-C88F-goods-img">',
                            '</div>',
                        ].join('').trim();
                    } else {

                        _html1 += [
                            '<div class="u-C88F-goods" data-num="' + (k + 1) + '">',
                            '<i class="i-C88F-num"></i>',
                            '<span class="u-C88F-goods-title">' + v.title + '</span>',
                            '<img data-original="' + (needScenePicUrl ? v.scenePicUrl : v.notSoldOutGoods.imgUrl) + '?imageView&thumbnail=87x87&quality=95" class="J_lazyload u-C88F-goods-img">',
                            '</div>'
                        ].join('').trim();
                    }
                    _html2 += [
                        '<div class="u-C88F-goods-swiper swiper-slide">',
                        '<div class="u-C88F-goods-swiper-info">',
                        '<p class="u-C88F-goods-swiper-title" data-label="'+'0'+ (k + 1) + '."><a href="http://you.163.com/item/detail?id=' + v.id + '&_stat_subject=' + _subject + '">' + v.title + '</a></p>',
                        '<p class="u-C88F-goods-swiper-desc">' + (v.extend.maker? v.extend.maker:v.simpleDesc ) + '</p>',
                        '<p class="u-C88F-goods-swiper-price">',
                        '<span class="u-C88F-goods-swiper-retailPrice">&yen;<span class="u-C88F-goods-swiper-retailPrice-val">' + v.notSoldOutGoods.price + '</span></span>',
                        '<a href="javascript:;" target="_self" class="u-C88F-goods-swiper-cart J_C88F_cart PSC_J_normal_statistics_Goods PSC_C_statistics_' + v.id + '" data-img="' + v.notSoldOutGoods.imgUrl + '?imageView&thumbnail=78x78&quality=95" data-skuId="' + v.notSoldOutGoods.skuId + '"></a>',
                        '</p>',
                        '</div>',
                        '<div class="u-C88F-goods-swiper-img">',
                        '<img data-original="' + (needScenePicUrl ? v.scenePicUrl : v.notSoldOutGoods.imgUrl) + '?imageView&thumbnail=410x410&quality=95" class="J_lazyload swiper-lazy">',
                        '</div>',
                        '</div>'
                    ].join('').trim();
                });
                $('.YX-N-M-C88F').find('.m-C88F-goods').empty().append(_html1);
                $('.YX-N-M-C88F').find('.m-C88F-swiper-wrapper').empty().append(_html2);
                that.lazyload();
                that.setSwiper(id);
            });
        }
    };

    $('.YX-N-M-C88F .J_module_info').each(function(i, n) {
        var _id = $(n).find('.goodsId').data('goodsid'),
            needScenePicUrl = $(n).find('.needScenePicUrl').data('needscenepicurl');
        myModule.getGoodsRender($(n).closest('.YX-N-M-C88F'), _id, window.psc_act_id, needScenePicUrl);
    });

    $('.YX-N-M-C88F').on('click', '.J_C88F_cart', function(e) {
        var $target = $(e.target),
            skuId = $target.data('skuid'),
            img = $target.data('img');
        if (window.PSC_YX_API_UID) {
            window.PSC_YX_API.addCart(skuId, img, 1, function(_res) {
                var _code = _res.code;
                if (_code == 200) {
                    window.PSC_YX_API.addToast('添加成功', 300);
                } else {
                    window.PSC_YX_API.addToast('商品已下架！', 300);
                }
            });
        } else {
            $.ajax({
                url: '//you.163.com/act/api1/yxcoupon/ajax/getYXAccount.do',
                type: 'GET',
                dataType: 'jsonp',
                async: false,
                cache: false,
                jsonp: "callback",
                success: function(data) {
                    if (data && data.code && data.code == 200) {
                        if (data.content) {
                            window.PSC_YX_API_UID = data.content.uid;
                            window.PSC_YX_API.addCart(skuId, img, 1, function(_res) {
                                var _code = _res.code;
                                if (_code == 200) {
                                    window.PSC_YX_API.addToast('添加成功', 300);
                                } else {
                                    window.PSC_YX_API.addToast('商品已下架！', 300);
                                }
                            });
                        } else {
                            window.PSC_YX_API.login2();
                        }
                    } else {
                        alert('服务器繁忙，请重新再试');
                    }
                },
                error: function(xhr, textStatus) {
                    if (textStatus === 'timeout') {
                        alert('请求超时，请重新再试');
                    }
                }
            });
        }
    });

    $('body').on('click', '.YX-N-M-C88F .PSC_J_normal_statistics_Goods', function(e) {
        PSC_C_statistics.normalGoods(this);
    });
})();