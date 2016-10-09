define([
	'Vue',
	'mustache',
	'text!components/page/modules/yxBackModule/yxBackModule.mustache',
	'common/mixins/pageMixins',
	'common/helper/tpl2vue',
	'common/helper/data2vue',
	'common/directive/setAttr',
	'uuid'
], function(Vue, mustache, tpl, pageMixins, Tpl2Vue, Data2Vue) {
	var _default = {
		icon_page: 'http://mimg.127.net/hz/uploader/20160930/14752001057980223.png',
		icon_line: 'http://mimg.127.net/hz/uploader/20160930/14752001059440244.png',
		good_txt1: 'http://mimg.127.net/hz/uploader/20160930/14752001060130254.png',
		icon_cart: 'http://mimg.127.net/hz/uploader/20160930/14752001057770220.png',
		skuId1: '1006150',
		good_url1: 'http://you.163.com/item/detail?id=1006068&_stat_area=1&_stat_referer=search&_stat_query=%E9%93%B8%E9%93%81%E7%8F%90%E7%90%85%E9%94%8522cm&_stat_count=6&_stat_subject=504',
		good_img1: 'http://mimg.127.net/hz/uploader/20160930/14752001055440194.jpg',
		good_txt2: 'http://mimg.127.net/hz/uploader/20160930/14752001060200255.png',
		skuId2: '1022014',
		good_url2: 'http://you.163.com/item/detail?id=1023006&_stat_area=1&_stat_referer=search&_stat_query=%E7%AE%80%E6%AC%A7%E6%96%B0%E9%AA%A8%E7%93%B7%E9%A4%90%E5%85%B7%E5%A5%97%E8%A3%85&_stat_count=1&_stat_subject=504',
		good_img2: 'http://mimg.127.net/hz/uploader/20160930/14752001055540195.jpg',
		good_txt3: 'http://mimg.127.net/hz/uploader/20160930/14752001060270256.png',
		skuId3: '1019149',
		good_url3: 'http://you.163.com/item/detail?id=1021023&_stat_area=1&_stat_referer=search&_stat_query=%E5%A4%A7%E9%A9%AC%E5%A3%AB%E9%9D%A9%E5%A5%97%E5%88%80&_stat_count=1&_stat_subject=504',
		good_img3: 'http://mimg.127.net/hz/uploader/20160930/14752001055610196.jpg',
		icon_bg: 'http://mimg.127.net/hz/uploader/20160930/14752001057650218.png',
		title_page: 'http://mimg.127.net/hz/uploader/20160930/14752001059640247.png',
		barBgColor: '#d6ddea'
	};

	var YxBackModule = Vue.extend({
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

	return YxBackModule;
});