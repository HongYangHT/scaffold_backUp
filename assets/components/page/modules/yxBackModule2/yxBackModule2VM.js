define([
	'Vue',
	'mustache',
	'text!components/page/modules/yxBackModule2/yxBackModule2.mustache',
	'common/mixins/pageMixins',
	'common/helper/tpl2vue',
	'common/helper/data2vue',
	'common/directive/setAttr',
	'uuid'
], function(Vue, mustache, tpl, pageMixins, Tpl2Vue, Data2Vue) {
	var _default = {
		icon_page: 'http://mimg.127.net/hz/uploader/20160930/14752001058180226.png',
		icon_line: 'http://mimg.127.net/hz/uploader/20160930/14752001059500245.png',
		good_txt1: 'http://mimg.127.net/hz/uploader/20160930/14752001060750263.png',
		icon_cart: 'http://mimg.127.net/hz/uploader/20160930/14752001057840221.png',
		skuId1: '1026059',
		good_url1: 'http://you.163.com/item/detail?id=1027019&_stat_area=1&_stat_referer=search&_stat_query=%E7%94%B7%E5%BC%8F%E8%B7%83%E5%8A%A8%E4%BC%91%E9%97%B2%E6%9C%8D&_stat_count=3&_stat_subject=504',
		good_img1: 'http://mimg.127.net/hz/uploader/20160930/14752001056250203.jpg',
		good_txt2: 'http://mimg.127.net/hz/uploader/20160930/14752001060820264.png',
		skuId2: '1060010',
		good_url2: 'http://you.163.com/item/detail?id=1060001&_stat_area=1&_stat_referer=search&_stat_query=%E6%97%A0%E5%8E%8B%E5%8A%9Bbra%E5%90%8A%E5%B8%A6&_stat_count=5&_stat_subject=504',
		good_img2: 'http://mimg.127.net/hz/uploader/20160930/14752001056350204.jpg',
		good_txt3: 'http://mimg.127.net/hz/uploader/20160930/14752001060890265.png',
		skuId3: '1029044',
		good_url3: 'http://you.163.com/item/detail?id=1030009&_stat_subject=504',
		good_img3: 'http://mimg.127.net/hz/uploader/20160930/14752001056480205.jpg',
		icon_bg: 'http://mimg.127.net/hz/uploader/20160930/14752001057710219.png',
		title_page: 'http://mimg.127.net/hz/uploader/20160930/14752001059850250.png',
		barBgColor: '#feedef'
	};
	var YxBackModule2 = Vue.extend({
		name: 'yxBackModule',
		components: {},
		template: new Tpl2Vue(tpl, _default).render(),
		data: function(options) {
			// 这里必须每次进来算一遍
			return new Data2Vue({
				data: _default
			}).getResult();
		},
		mixins: [pageMixins],
		watch: {
			'icon_page.value': {
				'handler': function(value, old) {
					var data = {
						'icon_page': {
							'key': this.icon_page.key,
							'name': this.icon_page.name,
							'type': this.icon_page.type,
							'value': old,
							'input': this.icon_page.input
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'icon_line.value': {
				'handler': function(value, old) {
					var data = {
						'icon_line': {
							'key': this.icon_line.key,
							'name': this.icon_line.name,
							'type': this.icon_line.type,
							'value': old,
							'input': this.icon_line.input
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'icon_cart.value': {
				'handler': function(value, old) {
					var data = {
						'icon_cart': {
							'key': this.icon_cart.key,
							'name': this.icon_cart.name,
							'type': this.icon_cart.type,
							'value': old,
							'input': this.icon_cart.input
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'good_txt1.value': {
				'handler': function(value, old) {
					var data = {
						'good_txt1': {
							'key': this.good_txt1.key,
							'name': this.good_txt1.name,
							'type': this.good_txt1.type,
							'value': old,
							'input': this.good_txt1.input
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'skuId1.value': {
				'handler': function(value, old) {
					var data = {
						'skuId1': {
							'key': this.skuId1.key,
							'name': this.skuId1.name,
							'type': this.skuId1.type,
							'value': old,
							'input': this.skuId1.input
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'good_url1.value': {
				'handler': function(value, old) {
					var data = {
						'good_url1': {
							'key': this.good_url1.key,
							'name': this.good_url1.name,
							'type': this.good_url1.type,
							'value': old,
							'input': this.good_url1.input
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'good_img1.value': {
				'handler': function(value, old) {
					var data = {
						'good_img1': {
							'key': this.good_img1.key,
							'name': this.good_img1.name,
							'type': this.good_img1.type,
							'value': old,
							'input': this.good_img1.input
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'good_txt2.value': {
				'handler': function(value, old) {
					var data = {
						'good_txt2': {
							'key': this.good_txt2.key,
							'name': this.good_txt2.name,
							'type': this.good_txt2.type,
							'value': old,
							'input': this.good_txt2.input
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'skuId2.value': {
				'handler': function(value, old) {
					var data = {
						'skuId2': {
							'key': this.skuId2.key,
							'name': this.skuId2.name,
							'type': this.skuId2.type,
							'value': old,
							'input': this.skuId2.input
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'good_url2.value': {
				'handler': function(value, old) {
					var data = {
						'good_url2': {
							'key': this.good_url2.key,
							'name': this.good_url2.name,
							'type': this.good_url2.type,
							'value': old,
							'input': this.good_url2.input
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'good_img2.value': {
				'handler': function(value, old) {
					var data = {
						'good_img2': {
							'key': this.good_img2.key,
							'name': this.good_img2.name,
							'type': this.good_img2.type,
							'value': old,
							'input': this.good_img2.input
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'good_txt3.value': {
				'handler': function(value, old) {
					var data = {
						'good_txt3': {
							'key': this.good_txt3.key,
							'name': this.good_txt3.name,
							'type': this.good_txt3.type,
							'value': old,
							'input': this.good_txt3.input
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'skuId3.value': {
				'handler': function(value, old) {
					var data = {
						'skuId3': {
							'key': this.skuId3.key,
							'name': this.skuId3.name,
							'type': this.skuId3.type,
							'value': old,
							'input': this.skuId3.input
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'good_url3.value': {
				'handler': function(value, old) {
					var data = {
						'good_url3': {
							'key': this.good_url3.key,
							'name': this.good_url3.name,
							'type': this.good_url3.type,
							'value': old,
							'input': this.good_url3.input
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'good_img3.value': {
				'handler': function(value, old) {
					var data = {
						'good_img3': {
							'key': this.good_img3.key,
							'name': this.good_img3.name,
							'type': this.good_img3.type,
							'value': old,
							'input': this.good_img3.input
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'icon_bg.value': {
				'handler': function(value, old) {
					var data = {
						'icon_bg': {
							'key': this.icon_bg.key,
							'name': this.icon_bg.name,
							'type': this.icon_bg.type,
							'value': old,
							'input': this.icon_bg.input
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'title_page.value': {
				'handler': function(value, old) {
					var data = {
						'title_page': {
							'key': this.title_page.key,
							'name': this.title_page.name,
							'type': this.title_page.type,
							'value': old,
							'input': this.title_page.input
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'barBgColor.value': {
				'handler': function(value, old) {
					var data = {
						'barBgColor': {
							'key': this.barBgColor.key,
							'name': this.barBgColor.name,
							'type': this.barBgColor.type,
							'value': old,
							'input': this.barBgColor.input
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			}
		},
		computed: {
			oparate: function() {
				var _oparate = '';
				_oparate = this.id;
				return _oparate;
			}
		},
		methods: {

		},
		events: {

		}
	});

	return YxBackModule2;
});