(function() {
    var myModule = {
        lazyload: function() {
            setTimeout(function() {
                $('.YX-N-M-C1C6 .J_lazyload').lazyload({
                    threshold: 50,
                    effect: 'fadeIn',
                    opacity:true
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
        getGoodsRender: function(element, id, subject,needScenePicUrl) {
            var self = this,
                _html = '';
            self.getAjaxData('https://spread.mail.163.com/mail/goods/getGroup', {
                id: id
            }, function(res) {
                var _goods = res.content.goodsList,
                    _html = '',
                    _subject = subject || $(element).find('.stat_subject').val();
                $.each(_goods, function(k, v) {
                    var sellVolumeId = '';
                    sellVolumeId = v.notSoldOutGoods.skuId;
                    if ((v.status == 2) && !v.underShelf) {
                        _html += [
                            '<div class="u-C1C6-goods">',
                            '<a href="http://you.163.com/item/detail?id=' + v.id + '&&_stat_subject=' + _subject + '" target="_blank" class="u-C1C6-link">',
                            (needScenePicUrl ? '<img data-original="' + v.scenePicUrl + '?imageView&thumbnail=260x260&quality=95" class="J_lazyload">':'<img data-original="' + v.notSoldOutGoods.imgUrl + '?imageView&thumbnail=260x260&quality=95" class="J_lazyload">'),
                            '</a>',
                            '<div class="m-C1C6-goods-info">',
                            '<p class="u-C1C6-goods-t"><a href="http://you.163.com/item/detail?id=' + v.id + '&&_stat_subject=' + _subject + '" target="_blank">' + v.title + '</a></p>',
                            '<p class="u-C1C6-goods-maker">'+(v.simpleDesc ? v.simpleDesc:v.maker)+'</p>',
                            '<p class="u-C1C6-goods-price">',
                            '<span class="u-C1C6-offPrice">' + v.offPrice + '</span>',
                            (parseFloat(v.offPrice) == parseFloat(v.unitPrice) ? '' : '<span class="u-C1C6-unitPrice">' + v.unitPrice + '</span>'),
                            '</p>',
                            '<div class="m-C1C6-btn">',
                            '<a href="http://you.163.com/item/detail?id=' + v.id + '&_stat_subject=' + _subject + '" target="_blank" class="u-C1C6-btn">立即购买</a>',
                            '<a href="javascript:;" target="_self" class="u-C1C6-cart J_C1C6_cart" data-skuId="' + sellVolumeId + '" data-img="' + v.primaryPicUrl + '"></a>',
                            '</div>',
                            '</div>',
                            '</div>'
                        ].join('');
                    }
                });

                $(element).find('.m-C1C6-goods .u-C1C6-goods').remove();
                $(element).find('.m-C1C6-goods').append(_html);
                self.lazyload();
            });

        }
    };

    $('.YX-N-M-C1C6 .J_module_info ').each(function(i, n) {
        var _id = $(n).find('.goodsId').data('goodsid');
        var needScenePicUrl = $(n).find('.needScenePicUrl').data('needscenepicurl');
        myModule.getGoodsRender($(n).closest('.YX-N-M-C1C6'), _id, window.psc_act_id,needScenePicUrl);
    });

    $('.YX-N-M-C1C6').on('click', '.J_C1C6_cart', function(e) {
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
})();
