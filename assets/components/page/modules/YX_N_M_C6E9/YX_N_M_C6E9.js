(function() {
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
				$('.YX-N-M-C6E9 .J_lazyload').lazyload({
					threshold: 50,
					effect: 'fadeIn'
				});
			}, 300);
		},
		fRenderHtml: function(list, element, subject) {
			var that = this,
				_html = '';
			$.each(list, function(i, n) {
				if ((i + 1) % 2 == 0) {
					_html += [
						'<li class="m-new-item m-new-even">',
							'<a href="http://you.163.com/item/detail?id=' + n.detail.id + '&_stat_subject=' + subject + '" target="_blank" class="u-goods">',
								'<img data-original="' + n.detail.primaryPicUrl + '?imageView&thumbnail=264x264&quality=95" title="' + n.detail.title + '" class="J_lazyload">',
							'</a>',
							'<div class="m-new-desc">',
								'<p class="u-new-tlt" title="' + n.detail.title + '">' + n.detail.title + '</p>',
									'<p class="u-new-price">',
									'<span class="u-new-now">' + n.detail.offPrice + '</span>',
									(parseFloat(n.detail.unitPrice) == parseFloat(n.detail.offPrice) ? '': '<span class="u-new-ori ">' + n.detail.unitPrice + '</span>'),
								'</p>',
							'</div>',
							'<div class="m-new-operate">',
								'<a href="http://you.163.com/item/detail?id=' + n.detail.id + '&_stat_subject=' + subject + '" target="_blank" class="u-btn u-btn-detail f-blink"><i class="u-icon"></i><span class="u-txt">查看详情</span></a>',
								'<a href="javascript:;" class="u-btn u-btn-cart J_btn_cart f-blink" data-skuid="' + n.detail.primarySkuId + '" data-img="' + n.detail.primaryPicUrl + '?imageView&thumbnail=264x264&quality=95"><i class="u-icon"></i><span class="u-txt">加入购物车</span></a>',
							'</div>',
						'</li>'
					].join('');
				} else {
					_html += [
						'<li class="m-new-item">',
							'<a href="http://you.163.com/item/detail?id=' + n.detail.id + '&_stat_subject=' + subject + '" target="_blank" class="u-goods">',
								'<img data-original="' + n.detail.primaryPicUrl + '?imageView&thumbnail=264x264&quality=95" title="' + n.detail.title + '" class="J_lazyload">',
							'</a>',
							'<div class="m-new-desc">',
								'<p class="u-new-tlt" title="' + n.detail.title + '">' + n.detail.title + '</p>',
								'<p class="u-new-price">',
									'<span class="u-new-now">' + n.detail.offPrice + '</span>',
									(parseFloat(n.detail.unitPrice) == parseFloat(n.detail.offPrice) ? '': '<span class="u-new-ori ">' + n.detail.unitPrice + '</span>'),
								'</p>',
							'</div>',
							'<div class="m-new-operate">',
								'<a href="http://you.163.com/item/detail?id=' + n.detail.id + '&_stat_subject=' + subject + '" target="_blank" class="u-btn u-btn-detail f-blink"><i class="u-icon"></i><span class="u-txt">查看详情</span></a>',
								'<a href="javascript:;" class="u-btn u-btn-cart J_btn_cart f-blink" data-skuid="' + n.detail.primarySkuId + '" data-img="' + n.detail.primaryPicUrl + '?imageView&thumbnail=264x264&quality=95"><i class="u-icon"></i><span class="u-txt">加入购物车</span></a>',
							'</div>',
						'</li>'
					].join('');
				}
			});
			$(element).find('ul').empty().append(_html);
		}
	};
	$('.YX-N-M-C6E9 .goodsId').each(function(i, n) {
		var _id = $(n).data('goodsid');
		myModule.fRenderGoods(_id, $(n).closest('.YX-N-M-C6E9'), window.psc_act_id);
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