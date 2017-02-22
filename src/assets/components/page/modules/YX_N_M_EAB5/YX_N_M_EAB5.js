(function(){
    var myModule = {
        lazyload: function() {
            setTimeout(function() {
                $('.YX-N-M-EAB5 .J_lazyload').lazyload({
                    threshold: 50,
                    effect: 'fadeIn'
                });                
            }, 300);
        },
        fRenderGoods: function(id, element, subject) {
            var that = this;
            $.ajax({
                url: 'http://you.163.com/act/hdapi/api2/goods/ajax/getGroup.do',
                type: 'get',
                dataType: 'jsonp',
                data: {
                    id: id
                },
                async: false,
                cache: false,
                success: function(res) {
                    var _code = +res.code;
                    if (_code == 200) {
                        var _list = res.content.goodsList;
                        that.fRenderHtml(_list, element, subject);
                        that.fLazyload();
                    }
                }
            });
        },
        fLazyload: function() {
            var that = this;
            setTimeout(function() {
                $('.YX-N-M-EAB5 .J_lazyload').lazyload({
                    threshold: 50,
                    effect: 'fadeIn'
                });
            }, 300);
        },
        fRenderHtml: function(list, element, subject) {
            var that = this,
                _html = '';
            $.each(list, function(i, n) {
                var _detail = n.detail;
                _html += [
                    '<div class="u-EAB5-goods">',
                        '<a target="_blank" href="http://you.163.com/item/detail?id='+_detail.id+'&_stat_subject='+subject+'" class="u-EAB5-goods-img PSC_J_normal_statistics_Goods">',
                            '<img data-original="'+_detail.primaryPicUrl+'?imageView&thumbnail=265x265&quality=95" class="J_lazyload">',
                        '</a>',
                        '<div class="u-EAB5-goods-info">',
                            '<p class="u-EAB5-goods-name">'+_detail.title+'</p>',
                            '<p class="u-EAB5-goods-price">',
                                '<span class="u-EAB5-offPrice">'+_detail.offPrice+'</span>',
                                (parseFloat(_detail.unitPrice) == parseFloat(_detail.offPrice) ? '' :'<span class="u-EAB5-unitPrice">'+_detail.unitPrice+'</span>'),
                            '</p>',
                            '<div class="m-EAB5-group-btn">',
                                '<a target="_blank" href="http://you.163.com/item/detail?id='+_detail.id+'&_stat_subject='+subject+'" class="u-EAB5-btn PSC_J_normal_statistics_Goods">立即购买</a>',
                                '<a href="javascript:;" class="u-EAB5-cart J_EAB5_cart PSC_J_normal_statistics_Goods psc_static_'+_detail.primarySkuId+'" data-skuid="'+_detail.primarySkuId+'" data-img="'+_detail.primaryPicUrl+'?imageView&thumbnail=265x265&quality=95"></a>',
                            '</div>',
                        '</div>',
                    '</div>'
                ].join('');
            });
            $(element).find('.m-EAB5-inner').empty().append(_html);
            that.lazyload();
        }
    };
    $('.YX-N-M-EAB5 .goodsId').each(function(i, n) {
        var _id = $(n).data('goodsid');
        myModule.fRenderGoods(_id, $(n).closest('.YX-N-M-EAB5'), window.psc_act_id);
    });
    function getActInfo() {
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

    getActInfo();
    $('.YX-N-M-EAB5').on('click', '.J_EAB5_cart', function(e) {
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
                        if (data.content && data.content.uid) {
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
    $('body').on('click', '.YX-N-M-EAB5 .PSC_J_normal_statistics_Goods', function(e) {
        PSC_C_statistics.normalGoods(this);
    });
})();