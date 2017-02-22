(function() {
    var myModule = {
        lazyload: function() {
            setTimeout(function() {
                $('.YX-N-M-417A .J_lazyload').lazyload({
                    threshold: 50,
                    effect: 'fadeIn'
                });
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
        getGoodsRender: function(element, id, subject, needScenePicUrl) {
            var self = this,
                _html = '';
            self.getAjaxData('https://spread.mail.163.com/mail/goods/getGroup', {
                id: id
            }, function(res) {
                var _goods = res.content.goodsList,
                    _html = '',
                    hasUsed = 0,
                    _subject = subject || $(element).find('.stat_subject').val();
                $.each(_goods, function(k, v) {
                    var sellVolumeId = '';
                    var extend = v.extend ? v.extend : '';
                    sellVolumeId = v.notSoldOutGoods.skuId;
                    if ((v.status == 2) && !v.underShelf) {
                        hasUsed++;
                        _html += [
                            (hasUsed % 3 ? '<div class="u-417A-goods">' : '<div class="u-417A-goods u-417A-goods-s" style="margin-right:0;">'),
                            '<a href="http://you.163.com/item/detail?id=' + v.id + '&_stat_subject=' + _subject + '" target="_blank" class="u-417A-link PSC_J_normal_statistics_Goods">',
                            (needScenePicUrl ? '<img data-original="' + v.scenePicUrl + '?imageView&thumbnail=260x260&quality=95" class="J_lazyload">' : '<img data-original="' + v.primaryPicUrl + '?imageView&thumbnail=260x260&quality=95" class="J_lazyload">'),
                            '</a>',
                            '<div class="m-417A-goods-info">',
                            '<p class="u-417A-goods-t"><a href="http://you.163.com/item/detail?id=' + v.id + '&_stat_subject=' + _subject + '" target="_blank" class="PSC_J_normal_statistics_Goods">' + v.title + '</a></p>',
                            (extend.maker ? '<p class="u-417A-goods-maker">' + extend.maker + '</p>' : '<p class="u-417A-goods-maker">' + v.simpleDesc + '</p>'),
                            '<p class="u-417A-goods-price">',
                            '<span class="u-417A-offPrice">' + v.offPrice + '</span>',
                            (parseFloat(v.offPrice) == parseFloat(v.unitPrice) ? '' : '<span class="u-417A-unitPrice">' + v.unitPrice + '</span>'),
                            '</p>',
                            '<div class="m-417A-btn">',
                            '<a href="http://you.163.com/item/detail?id=' + v.id + '&_stat_subject=' + _subject + '" target="_blank" class="u-417A-btn PSC_J_normal_statistics_Goods">立即购买</a>',
                            '<a href="javascript:;" target="_self" class="u-417A-cart J_417A_cart PSC_J_normal_statistics_Goods psc_static_'+ sellVolumeId +'" data-skuId="' + sellVolumeId + '" data-img="' + v.primaryPicUrl + '"></a>',
                            '</div>',
                            '</div>',
                            '</div>'
                        ].join('');
                    }
                });
                $(element).find('.m-417A-goods').empty().append(_html);
                self.lazyload();
            });

        }
    };

    $('.YX-N-M-417A .J_module_info ').each(function(i, n) {
        var _id = $(n).find('.goodsId').data('goodsid'),
            needScenePicUrl = $(n).find('.needScenePicUrl').data('needscenepicurl');
        myModule.getGoodsRender($(n).closest('.YX-N-M-417A'), _id, window.psc_act_id, needScenePicUrl);
    });

    $('.YX-N-M-417A').on('click', '.J_417A_cart', function(e) {
        var $target = $(e.target),
            skuId = $target.data('skuid'),
            img = $target.data('img');
        if (window.PSC_YX_API_UID) {
            window.PSC_YX_API.addCart(skuId, img, 1, function(_res) {
                var _code = _res.code;
                if (_code == 200) {
                    window.PSC_YX_API.cartPcAnimate(img, 2000);
                } else {
                    alert('商品已下架！');
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
                                    window.PSC_YX_API.cartPcAnimate(img, 2000);
                                } else {
                                    alert('商品已下架！');
                                }
                            });
                        } else {
                            window.PSC_YX_API.login();
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

    $('body').on('click', '.YX-N-M-417A .PSC_J_normal_statistics_Goods', function(e) {
        PSC_C_statistics.normalGoods(this);
    });
})();
