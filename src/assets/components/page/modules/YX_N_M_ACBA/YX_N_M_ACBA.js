(function(){
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
        if(_expandStr){    
	        $.each(_expandStr, function(i, item) {
	            expand['' + _that.getQuery(item, 'name') + ''] = _that.getQuery(item, 'value');
	        });
	    }
        return expand;
    };

    HandleData.prototype.splitExpand = function(expand) {
    	if(expand)
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
                $('.YX-N-M-ACBA .J_lazyload').lazyload({
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
				$('.YX-N-M-ACBA .J_lazyload').lazyload({
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
                var extend = new HandleData().init(_detail.extend ? _detail.extend : '');
				_html += [
					'<div class="u-ACBA-good">',
						'<div class="u-ACBA-img">',
							'<img data-original="'+_detail.primaryPicUrl+'?imageView&quality=60&thumbnail=330x330" class="J_lazyload">',
							(extend.maker ? '<div class="u-ACBA-maker">Adidas制造商</div>' : ''),
							'<div class="m-ACBA-modal">',
								'<div class="u-ACBA-modal"></div>',
								'<div class="u-ACBA-opt">',
									'<a target="_blank" href="http://you.163.com/item/detail?id='+_detail.id+'&_stat_subject='+subject+'" class="u-btn-check PSC_J_normal_statistics_Goods">查看详情</a>',
									'<a href="javascript:;" class="u-btn-cart J_btn_cart PSC_J_normal_statistics_Goods psc_static_'+_detail.primarySkuId+'" data-skuid="'+_detail.primarySkuId+'" data-img="'+_detail.primaryPicUrl+'?imageView&quality=60&thumbnail=330x330">加入购物车</a>',
								'</div>',
							'</div>',
						'</div>',
						'<div class="u-ACBA-intro">',
							'<a target="_blank" href="http://you.163.com/item/detail?id='+_detail.id+'&_stat_subject='+subject+'" class="u-ACBA-name PSC_J_normal_statistics_Goods">'+_detail.title+'</a>',
							'<p class="u-ACBA-info">'+_detail.simpleDesc+'</p>',
							'<p class="u-ACBA-price">'+_detail.unitPrice+'</p>',
						'</div>',
					'</div>'
				].join('');
			});
			$(element).find('.m-ACBA-goodsList').empty().append(_html);
			that.lazyload();
		}
	};
	$('.YX-N-M-ACBA .goodsId').each(function(i, n) {
		var _id = $(n).data('goodsid');
		myModule.fRenderGoods(_id, $(n).closest('.YX-N-M-ACBA'), window.psc_act_id);
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

	$('.YX-N-M-ACBA').on('click', '.J_btn_cart', function(e) {
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
	$('body').on('click', '.YX-N-M-ACBA .PSC_J_normal_statistics_Goods', function(e) {
		PSC_C_statistics.normalGoods(this);
	});
})();