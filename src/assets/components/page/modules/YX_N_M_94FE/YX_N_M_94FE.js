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

    var myModule = {
        lazyload: function() {
            if (UA.versions.mobile || UA.versions.ios || UA.versions.android ||
                UA.versions.iPhone || UA.versions.iPad) { // 移动端
                PSC_lazyload({
                    inViewTreshhold:100,
                    opacity:true
                });
            } else {
                $('.YX-N-M-94FE .J_lazyload').lazyload({
                    threshold : 50,
                    effect : 'fadeIn'
                }); 
            }
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
                        _html += [
                        	'<div class="u-94FE-goods">',
                                (extend.maker ? '<div class="u-94FE-maker"><span>'+extend.maker+'</span></div>' : '<div class="u-94FE-maker"></div>'),
								'<a href="http://you.163.com/item/detail?id='+_detail.id+'&_stat_subject='+_subject+'" target="_blank" class="u-94FE-link PSC_J_normal_statistics_Goods">',
									(needScenePicUrl ? '<img data-original="'+_detail.scenePicUrl+'?imageView&thumbnail=260x260&quality=95" class="J_lazyload">':'<img data-original="'+_detail.primaryPicUrl+'?imageView&thumbnail=260x260&quality=95" class="J_lazyload">'),
								'</a>',
								'<div class="m-94FE-goods-info">',
									'<p class="u-94FE-goods-t"><a href="http://you.163.com/item/detail?id='+_detail.id+'&_stat_subject='+_subject+'" target="_blank" class="PSC_J_normal_statistics_Goods">'+_detail.title+'</a></p>',
									'<p class="u-94FE-goods-price">',
										'<span class="u-94FE-offPrice">'+_detail.offPrice+'</span>',
										(parseFloat(_detail.offPrice) == parseFloat(_detail.unitPrice) ? '' : '<span class="u-94FE-unitPrice">'+_detail.unitPrice+'</span>'),
									'</p>',
									'<div class="m-94FE-btn">',
										'<a href="http://you.163.com/item/detail?id='+_detail.id+'&_stat_subject='+_subject+'" target="_blank" class="u-94FE-btn PSC_J_normal_statistics_Goods">立即购买</a>',
										'<a href="javascript:;" target="_self" class="u-94FE-cart J_94FE_cart PSC_J_normal_statistics_Goods psc_static_'+sellVolumeId+'" data-skuId="'+sellVolumeId+'" data-img="'+_detail.primaryPicUrl+'"></a>',
									'</div>',
								'</div>',
							'</div>'
                        ].join('').trim();
                    }
                });
                $(element).find('.m-94FE-goods').empty().append(_html);
                self.lazyload();
            });

        }
    };

    $('.YX-N-M-94FE .J_module_info ').each(function(i, n) {
        var _id = $(n).find('.goodsId').data('goodsid'),
        	needScenePicUrl = $(n).find('.needScenePicUrl').data('needscenepicurl');
        myModule.getGoodsRender($(n).closest('.YX-N-M-94FE'), _id, window.psc_act_id, needScenePicUrl);
    });

    $('.YX-N-M-94FE').on('click', '.J_94FE_cart', function(e) {
        var $target = $(e.target),
            skuId = $target.data('skuid'),
            img = $target.data('img');
        if (window.PSC_YX_API_UID) {
            window.PSC_YX_API.addCart(skuId, img, 1, function(_res) {
                var _code = _res.code;
                if (_code == 200) {
                    if (UA.versions.mobile || UA.versions.ios || UA.versions.android ||
                        UA.versions.iPhone || UA.versions.iPad) {
                        window.PSC_YX_API.addToast('成功加入购物车', 300);
                    }else{
                        window.PSC_YX_API.cartPcAnimate(img, 2000);
                    }
                } else {
                    if (UA.versions.mobile || UA.versions.ios || UA.versions.android ||
                        UA.versions.iPhone || UA.versions.iPad) {
                        window.PSC_YX_API.addToast('商品已下架！', 300);
                    } else {
                        alert('商品已下架！');
                    }
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
                                    if (UA.versions.mobile || UA.versions.ios || UA.versions.android ||
                                        UA.versions.iPhone || UA.versions.iPad) {
                                        window.PSC_YX_API.addToast('成功加入购物车', 300);
                                    }else{
                                        window.PSC_YX_API.cartPcAnimate(img, 2000);
                                    }
                                } else {
                                    if (UA.versions.mobile || UA.versions.ios || UA.versions.android ||
                                        UA.versions.iPhone || UA.versions.iPad) {
                                        window.PSC_YX_API.addToast('商品已下架！', 300);
                                    } else {
                                        alert('商品已下架！');
                                    }
                                }
                            });
                        } else {
                            window.PSC_YX_API.login2(window.location.href,function(){
                                window.location.reload();
                            });
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
    $('body').on('click', '.YX-N-M-94FE .PSC_J_normal_statistics_Goods', function(e) {
        PSC_C_statistics.normalGoods(this);
    });
})();