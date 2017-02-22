(function(){
     var myModule = {
        lazyload: function() {
            setTimeout(function() {
                $('.YX-N-M-D45D .J_lazyload').lazyload({
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
                    var _detail = v,
                        sellVolumeId = '';
                    var extend = v.extend;
                    for(var i=0, len = _detail.skuList.length;i<len;i++){
                        if(_detail.skuList[i].sellVolume && _detail.skuList[i].id == _detail.primarySkuId){
                            sellVolumeId = _detail.primarySkuId;
                            break;
                        }
                    }
                    if(!sellVolumeId){
                       for(var i=0, len = _detail.skuList.length;i<len;i++){
                            if(_detail.skuList[i].sellVolume && _detail.skuList[i].id == _detail.primarySkuId){
                                sellVolumeId = _detail.primarySkuId;
                                break;
                            }else if(_detail.skuList[i].sellVolume){
                                sellVolumeId = _detail.skuList[i].id;
                                break;
                            }
                        } 
                    }
                    sellVolumeId = sellVolumeId ? sellVolumeId : _detail.primarySkuId;
                    if((_detail.status == 2) && !_detail.underShelf){
                         hasUsed++;
                        _html += [
                        	(hasUsed>3 ? '<div class="u-D45D-goods u-D45D-goods-s">' : '<div class="u-D45D-goods">'),
								'<a href="http://you.163.com/item/detail?id='+_detail.id+'&_stat_subject='+_subject+'" target="_blank" class="u-D45D-img-link PSC_J_normal_statistics_Goods">',
									(needScenePicUrl ? '<img data-original="'+_detail.scenePicUrl+'?imageView&thumbnail=250x250&quality=95" class="J_lazyload">':'<img data-original="'+_detail.primaryPicUrl+'?imageView&thumbnail=250x250&quality=95" class="J_lazyload">'),
								'</a>',
								'<p class="u-D45D-title"><a href="http://you.163.com/item/detail?id='+_detail.id+'&_stat_subject='+_subject+'" target="_blank" class="u-D45D-title-link PSC_J_normal_statistics_Goods">'+_detail.title+'</a></p>',
                                '<p class="u-D45D-desc">'+_detail.simpleDesc+'</p>',
                                '<p class="u-D45D-price">',
                                '<span class="u-D45D-offPrice">'+_detail.offPrice+'</span>',
                                (parseFloat(_detail.offPrice) == parseFloat(_detail.unitPrice) ? '' : '<span class="u-D45D-unitPrice">'+_detail.unitPrice+'</span>'),
                                '</p>',
                                '<div class="m-D45D-btn">',
                                '<a href="http://you.163.com/item/detail?id='+_detail.id+'&_stat_subject='+_subject+'" target="_blank" class="u-D45D-buy PSC_J_normal_statistics_Goods">立即购买</a>',
                                '<a href="javascript:;" target="_self" class="u-D45D-cart J_D45D_cart PSC_J_normal_statistics_Goods psc_static_'+sellVolumeId+'"  data-skuId="'+sellVolumeId+'" data-img="'+_detail.primaryPicUrl+'?imageView&thumbnail=250x250&quality=95"></a>',
                                '</div>',
							'</div>'
                        ].join('').trim();
                    }
                });
                $(element).find('.m-D45D-goods').empty().append(_html);
                self.lazyload();
            });

        }
    };

    $('.YX-N-M-D45D .J_module_info ').each(function(i, n) {
        var _id = $(n).find('.goodsId').data('goodsid'),
        	needScenePicUrl = $(n).find('.needScenePicUrl').data('needscenepicurl');
        myModule.getGoodsRender($(n).closest('.YX-N-M-D45D'), _id, window.psc_act_id, needScenePicUrl);
    });

    $('.YX-N-M-D45D').on('click', '.J_D45D_cart', function(e) {
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
    $('body').on('click', '.YX-N-M-D45D .PSC_J_normal_statistics_Goods', function(e) {
        PSC_C_statistics.normalGoods(this);
    });
})();