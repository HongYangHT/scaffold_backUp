(function() {
	var myModule = {
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
		unExpand: function(str, name) {
			var self = this,
				reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'),
				r = str.match(reg);
			if (r != null) return unescape(r[2]);
			return null;
		},
		addCart: function(element) {
			element.off('click').on('click', function() {
				var _skuid = $(this).attr('data-skuid'),
					_img = $(this).attr('data-img');

				try {
					window.PSC_YX_API.addCart(_skuid, _img, 1, function(_res) {
						var _code = _res.code;
						if (_code == 200) {
							window.PSC_YX_API.cartPcAnimate(_img, 2000);
						} else {
							alert('商品已下架');
							return false;
						}
					});
				} catch (e) {
					alert('商品已下架');
				}
			});
		},
		/**
		 * goods 中的extend格式为 name=tip_key&type=input&value= Carters<br>制造商&cName=气泡文案
		 * _stat_subject 这个由goods的添加字段
		 */
		goodsList: function(element, id, subject) {
			var self = this,
				_html = '';
			self.getAjaxData('http://activity.mail.163.com/hdapi/api2/goods/ajax/getGroup.do', {
				id: id
			}, function(res) {
				var _goods = res.content.goodsList,
					_html = '',
					_subject = $(element).find('.stat_subject').val();
				$.each(_goods, function(k, v) {
					var _detail = v.detail;
					_icon = self.unExpand(_detail.extend, 'value'),
						_class = _icon == ' ' ? 'f-hide' : 'u-tip-icon',
						_unit = _detail.unitPrice == '' ? 　'' : _detail.unitPrice;
					_html += [
						'<li class="f-inline">',
						'<div class="u-item">',
						'<div class="u-item-img">',
						'<div class="u-icon">',
						'<i class="' + _class + '">' + _icon + '</i>',
						'</div>',
						'<a href="http://you.163.com/item/detail?id=' + _detail.id + '&_stat_subject=' + _subject + '" class="PSC_J_normal_statistics_Goods" target="_blank">',
						'<img class="lazy" data-original="' + _detail.primaryPicUrl + '" />',
						'</a>',
						'</div>',
						'<div class="u-item-name">',
						'<span class="f-fontSize-16">' + _detail.title + '</span>',
						'<span class="f-fontSize-14">' + _detail.simpleDesc + '</span>',
						'</div>',
						'<div class="u-item-prize">',
						'<span>',
						'<i class="u-yen">' + _detail.retailPrice + '</i>',
						'<i class="u-del">' + _unit + '</i>',
						'</span>',
						'<button type="button" data-skuid="' + _detail.primarySkuId + '" data-img="' + _detail.primaryPicUrl + '" class="u-btn J-addCart PSC_J_normal_statistics_Goods psc_static_'+ _detail.primarySkuId +'">加入购物车</button>',
						'</div>',
						'</div>',
						'</li>'
					].join('');
				});
				$(element).find('ul').empty().append(_html);
				setTimeout(function() {
					self.addCart($('.J-addCart'));
					$(".YX-N-M-2BE2 img.lazy").lazyload({
						effect: "fadeIn",
						threshold: 500,
					});
				}, 200);
			});
		}
	};

	$('.YX-N-M-2BE2 .goodsId').each(function(i, n) {
		var _id = $(n).data('goodsid');
		myModule.goodsList($(n).closest('.YX-N-M-2BE2'), _id, window.psc_act_id);
	});
	$('body').on('click', '.YX-N-M-2BE2 .PSC_J_normal_statistics_Goods', function(e) {
		PSC_C_statistics.normalGoods(this);
	});
})();