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

    var HandleData = function(data) {
        this.result = data;
    };

    HandleData.prototype.init = function() {
        var _that = this;

        return _that.handleExpand(_that.result);
    };

    HandleData.prototype.handleExpand = function(result) {
        var _that = this;

        var expand = {},
            _expandStr = _that.splitExpand(result);
        if (_expandStr) {
            $.each(_expandStr, function(i, item) {
                expand['' + _that.getQuery(item, 'name') + ''] = _that.getQuery(item, 'value');
            });
        }
        return expand;
    };

    HandleData.prototype.splitExpand = function(expand) {
        if (expand)
            return expand.split('|');
        else return '';
    };

    HandleData.prototype.getQuery = function(str, name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var r = str.match(reg);
        if (r != null) return unescape(r[2]);
        return null;
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
                    $('.YX-N-M-92C9 .J_lazyload').lazyload({
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
                    _subject = subject || $(element).find('.stat_subject').val();
                $.each(_goods, function(k, v) {
                    var _detail = v.detail,
                        sellVolumeId = _detail.primarySkuId;
                    var extend = new HandleData(_detail.extend ? _detail.extend : '').init();
                    for(var i=0, len = _detail.skuList.length;i<len;i++){
                        if(_detail.skuList[i].sellVolume && _detail.skuList[i].id == _detail.primarySkuId){
                            sellVolumeId = _detail.primarySkuId;
                            break;
                        }else if(_detail.skuList[i].sellVolume){
                            sellVolumeId = _detail.skuList[i].id;
                            break;
                        }
                    }
                    if(!_detail.underShelf){
                        _html += [
                            '<li class="u-92C9-item">',
                            '<div class="u-92C9-product">',
                            '<div class="u-92C9-product-hd">',
                            '<a href="http://you.163.com/item/detail?id=' + _detail.id + '&_stat_subject=' + _subject + '" title="' + _detail.title + '" target="_blank" class="PSC_J_normal_statistics_Goods u-92C9-link">',
                            '<img class="u-92C9-img J_lazyload" data-original="' + _detail.primaryPicUrl + '?imageView&quality=95&thumbnail=245x245" alt="韩式帆布电脑双肩包">',
                            '</a>',
                            (_detail.newItemFlag ? '<span class="u-92C9-flag">新品</span>' : ''),
                            '<div class="u-92C9-operate">',
                            '<a href="http://you.163.com/item/detail?id=' + _detail.id + '&_stat_subject=' + _subject + '" target="_blank" class="u-92C9-btn u-92C9-buy J_92C9_buy PSC_J_normal_statistics_Goods">立即购买</a>',
                            '<a href="javascript:;" target="_self" class="u-92C9-btn u-92C9-cart J_92C9_cart" data-skuid="' + sellVolumeId + '" data-img="' + _detail.primaryPicUrl + '?imageView&thumbnail=245x245&quality=95"></a>',
                            '</div>',
                            '</div>',
                            '<div class="u-92C9-product-bd">',
                            '<h4 class="u-92C9-name">',
                            '<a href="http://you.163.com/item/detail?id=' + _detail.id + '&_stat_subject=' + _subject + '" title="' + _detail.title + '" target="_blank" class="PSC_J_normal_statistics_Goods">' + _detail.title + '</a>',
                            '</h4>',
                            (extend.maker ? '<p class="m-92C9-marker"><span class="u-92C9-marker">' + extend.maker + '</span><p>' : '<p class="m-92C9-simpleDesc"><span class="u-92C9-simpleDesc">' + _detail.simpleDesc + '</span></p>'),
                            '<p class="u-92C9-price">',
                            (extend.coupon ? '<a href="'+extend.coupon+'" target="_blank" class="u-92C9-coupon"></a>' : ''),
                            '<span class="u-92C9-retailPrice">' + _detail.offPrice + '</span>',
                            (parseFloat(_detail.offPrice) == parseFloat(_detail.unitPrice) ? '':'<span class="u-92C9-unitPrice">' + _detail.unitPrice + '</span>'),
                            '</p>',
                            '<div class="m-92C9-btn-group">',
                            '<a href="http://you.163.com/item/detail?id=' + _detail.id + '&_stat_subject=' + _subject + '" target="_blank" class="u-92C9-btn-group u-92C9-btn-buy J_92C9_btn_buy PSC_J_normal_statistics_Goods">立即购买</a>',
                            '<a href="javascript:;" target="_self" class="u-92C9-btn-group u-92C9-btn-cart J_92C9_btn_cart PSC_J_normal_statistics_Goods psc_static_'+sellVolumeId+'" data-skuid="' + sellVolumeId + '" data-img="' + _detail.primaryPicUrl + '?imageView&thumbnail=245x245&quality=95"></a>',
                            '</div>',
                            '</div>',
                            '</div>',
                            '</li>',
                        ].join('');
                    }
                });
                $(element).find('ul').empty().append(_html);
                self.lazyload();
            });

        }
    };

    $('.YX-N-M-92C9 .goodsId').each(function(i, n) {
        var _id = $(n).data('goodsid');
        myModule.getGoodsRender($(n).closest('.YX-N-M-92C9'), _id, window.psc_act_id);
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
                    if (UA.versions.mobile || UA.versions.ios || UA.versions.android ||
                        UA.versions.iPhone || UA.versions.iPad) {
                        window.PSC_YX_API.addToast('服务器繁忙，请重新再试', 300);
                    } else {
                        alert('服务器繁忙，请重新再试');
                    }
                }
            },
            error: function(xhr, textStatus) {
                if (textStatus === 'timeout') {
                    if (UA.versions.mobile || UA.versions.ios || UA.versions.android ||
                        UA.versions.iPhone || UA.versions.iPad) {
                        window.PSC_YX_API.addToast('请求超时，请重新再试', 300);
                    } else {
                        alert('请求超时，请重新再试');
                    }
                }
            }
        });
    }

    getActInfo();

    $('.YX-N-M-92C9').on('click', '.J_92C9_cart,.J_92C9_btn_cart', function(e) {
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
                            if (UA.versions.mobile || UA.versions.ios || UA.versions.android ||
                                UA.versions.iPhone || UA.versions.iPad) {
                                window.PSC_YX_API.login2(window.location.href, function() {});
                            } else {
                                window.PSC_YX_API.login();
                            }
                        }
                    } else {
                        if (UA.versions.mobile || UA.versions.ios || UA.versions.android ||
                            UA.versions.iPhone || UA.versions.iPad) {
                            window.PSC_YX_API.addToast('服务器繁忙，请重新再试', 300);
                        } else {
                            alert('服务器繁忙，请重新再试');
                        }
                    }
                },
                error: function(xhr, textStatus) {
                    if (textStatus === 'timeout') {
                        if (UA.versions.mobile || UA.versions.ios || UA.versions.android ||
                            UA.versions.iPhone || UA.versions.iPad) {
                            window.PSC_YX_API.addToast('请求超时，请重新再试', 300);
                        } else {
                            alert('请求超时，请重新再试');
                        }
                    }
                }
            });
        }
    });

    $('body').on('click', '.YX-N-M-92C9 .PSC_J_normal_statistics_Goods', function(e) {
        PSC_C_statistics.normalGoods(this);
    });

})();