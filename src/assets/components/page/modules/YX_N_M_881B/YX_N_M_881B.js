(function() {
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
				$('.YX-N-M-881B .J_lazyload').lazyload({
					threshold: 50,
					effect: 'fadeIn'
				});
			}, 300);
		},
		fRenderHtml: function(list, element, subject) {
			var that = this,
				_html = '';
			$.each(list, function(i, n) {
				var _detail = n.detail,
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
				if ((i + 1) % 3 == 0) {
					_html += [
						'<li class="m-new-item m-new-even">',
						(_detail.newItemFlag ? '<span class="u-881B-flag">新品</span>' : (extend.flag == 1 ? '<span class="u-881B-flag">明星</span>' : (extend.flag == 2 ? '<span class="u-881B-flag">热销</span>':''))),
						'<a href="http://you.163.com/item/detail?id=' + n.detail.id + '&_stat_subject=' + subject + '" target="_blank" class="u-goods PSC_J_normal_statistics_Goods">',
						'<img data-original="' + n.detail.primaryPicUrl + '?imageView&thumbnail=360x360&quality=95" title="' + n.detail.title + '" class="J_lazyload">',
						'</a>',
						'<div class="m-new-desc">',
						'<p class="u-new-tlt" title="' + n.detail.title + '">' + n.detail.title + '</p>',
						'<p class="u-new-price">',
						'<span class="u-new-now">' + n.detail.offPrice + '</span>',
						'<span class="u-new-ori">' + n.detail.unitPrice + '</span>',
						'</p>',
						'</div>',
						'<div class="m-new-operate">',
						'<a href="http://you.163.com/item/detail?id=' + n.detail.id + '&_stat_subject=' + subject + '" target="_blank" class="u-btn u-btn-detail f-blink PSC_J_normal_statistics_Goods"><i class="u-icon"></i><span class="u-txt">查看详情</span></a>',
						'<a href="javascript:;" class="u-btn u-btn-cart J_btn_cart f-blink PSC_J_normal_statistics_Goods psc_static_'+ sellVolumeId +'" data-skuid="' + sellVolumeId + '" data-img="' + n.detail.primaryPicUrl + '?imageView&thumbnail=140x140&quality=95"><i class="u-icon"></i><span class="u-txt">加入购物车</span></a>',
						'</div>',
						'</li>'
					].join('');
				} else {
					_html += [
						'<li class="m-new-item">',
						'<a href="http://you.163.com/item/detail?id=' + n.detail.id + '&_stat_subject=' + subject + '" target="_blank" class="u-goods PSC_J_normal_statistics_Goods">',
						'<img data-original="' + n.detail.primaryPicUrl + '?imageView&thumbnail=360x360&quality=95" title="' + n.detail.title + '" class="J_lazyload">',
						'</a>',
						'<div class="m-new-desc">',
						'<p class="u-new-tlt" title="' + n.detail.title + '">' + n.detail.title + '</p>',
						'<p class="u-new-price">',
						'<span class="u-new-now">' + n.detail.offPrice + '</span>',
						'<span class="u-new-ori">' + n.detail.unitPrice + '</span>',
						'</p>',
						'</div>',
						'<div class="m-new-operate">',
						'<a href="http://you.163.com/item/detail?id=' + n.detail.id + '&_stat_subject=' + subject + '" target="_blank" class="u-btn u-btn-detail f-blink PSC_J_normal_statistics_Goods"><i class="u-icon"></i><span class="u-txt">查看详情</span></a>',
						'<a href="javascript:;" class="u-btn u-btn-cart J_btn_cart f-blink PSC_J_normal_statistics_Goods psc_static_'+sellVolumeId+'" data-skuid="' + sellVolumeId + '" data-img="' + n.detail.primaryPicUrl + '?imageView&thumbnail=140x140&quality=95"><i class="u-icon"></i><span class="u-txt">加入购物车</span></a>',
						'</div>',
						'</li>'
					].join('');
				}
            }
			});
			$(element).find('ul').empty().append(_html);
		}
	};
	$('.YX-N-M-881B .goodsId').each(function(i, n) {
		var _id = $(n).data('goodsid');
		myModule.fRenderGoods(_id, $(n).closest('.YX-N-M-881B'), window.psc_act_id);
	});
	$('body').on('click', '.YX-N-M-881B .PSC_J_normal_statistics_Goods', function(e) {
		PSC_C_statistics.normalGoods(this);
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

    $('.YX-N-M-881B').on('click', '.J_btn_cart', function(e) {
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
})();