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
	/*var _default = {
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
	};*/

	/**
	 * 将数组分组展示功能
	 * 1. 在数据上做修改
	 * 2. 有内容区到编辑区，以组定位，不再需要定位到具体的key,只需要定位到组就可以了
	 * 3. 对于不需要以组功能来展示的数据，我们默认形成一个组，不显示选择
	 * 4. 所能组成组的数据，我们将其看成一个component,而不将其看成一个module
	 */
	var _default = {
		H5597Groups: {
			content: '模块其他数据配置',
			goods_1: '商品位一配置',
			goods_2: '商品位二配置',
			goods_3: '商品位三配置'
		},
		goods_1: {
			good_txt1: 'http://mimg.127.net/hz/uploader/20160930/14752001060130254.png',
			good_url1: 'http://you.163.com/item/detail?id=1006068&_stat_area=1&_stat_referer=search&_stat_query=%E9%93%B8%E9%93%81%E7%8F%90%E7%90%85%E9%94%8522cm&_stat_count=6&_stat_subject=504',
			good_img1: 'http://mimg.127.net/hz/uploader/20160930/14752001055440194.jpg',
			skuId1: '1006150',
			icon_cart: 'http://mimg.127.net/hz/uploader/20160930/14752001057770220.png'
		},
		goods_2: {
			good_txt2: 'http://mimg.127.net/hz/uploader/20160930/14752001060200255.png',
			good_url2: 'http://you.163.com/item/detail?id=1023006&_stat_area=1&_stat_referer=search&_stat_query=%E7%AE%80%E6%AC%A7%E6%96%B0%E9%AA%A8%E7%93%B7%E9%A4%90%E5%85%B7%E5%A5%97%E8%A3%85&_stat_count=1&_stat_subject=504',
			good_img2: 'http://mimg.127.net/hz/uploader/20160930/14752001055540195.jpg',
			skuId2: '1022014',
			icon_cart: 'http://mimg.127.net/hz/uploader/20160930/14752001057770220.png'
		},
		goods_3: {
			good_txt3: 'http://mimg.127.net/hz/uploader/20160930/14752001060270256.png',
			good_url3: 'http://you.163.com/item/detail?id=1021023&_stat_area=1&_stat_referer=search&_stat_query=%E5%A4%A7%E9%A9%AC%E5%A3%AB%E9%9D%A9%E5%A5%97%E5%88%80&_stat_count=1&_stat_subject=504',
			good_img3: 'http://mimg.127.net/hz/uploader/20160930/14752001055610196.jpg',
			skuId3: '1019149',
			icon_cart: 'http://mimg.127.net/hz/uploader/20160930/14752001057770220.png'
		},
		content: {
			icon_page: 'http://mimg.127.net/hz/uploader/20160930/14752001057980223.png',
			icon_line: 'http://mimg.127.net/hz/uploader/20160930/14752001059440244.png',
			icon_bg: 'http://mimg.127.net/hz/uploader/20160930/14752001057650218.png',
			title_page: 'http://mimg.127.net/hz/uploader/20160930/14752001059640247.png',
			barBgColor: '#d6ddea'
		}
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
			'content.icon_page.value': {
				'handler': function(value, old) {
					var data = {
						'content': {
							'icon_page': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'content.icon_line.value': {
				'handler': function(value, old) {
					var data = {
						'content': {
							'icon_line': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'content.icon_bg.value': {
				'handler': function(value, old) {
					var data = {
						'content': {
							'icon_bg': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'content.title_page.value': {
				'handler': function(value, old) {
					var data = {
						'content': {
							'title_page': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'content.barBgColor.value': {
				'handler': function(value, old) {
					var data = {
						'content': {
							'barBgColor': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_1.good_txt1.value': {
				'handler': function(value, old) {
					var data = {
						'goods_1': {
							'good_txt1': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_1.good_url1.value': {
				'handler': function(value, old) {
					var data = {
						'goods_1': {
							'good_url1': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_1.good_img1.value': {
				'handler': function(value, old) {
					var data = {
						'goods_1': {
							'good_img1': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_1.skuId1.value': {
				'handler': function(value, old) {
					var data = {
						'goods_1': {
							'skuId1': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_1.icon_cart.value': {
				'handler': function(value, old) {
					var data = {
						'goods_1': {
							'icon_cart': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_2.good_txt2.value': {
				'handler': function(value, old) {
					var data = {
						'goods_2': {
							'good_txt2': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_2.good_url2.value': {
				'handler': function(value, old) {
					var data = {
						'goods_2': {
							'good_url2': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_2.good_img2.value': {
				'handler': function(value, old) {
					var data = {
						'goods_2': {
							'good_img2': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_2.skuId2.value': {
				'handler': function(value, old) {
					var data = {
						'goods_2': {
							'skuId2': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_2.icon_cart.value': {
				'handler': function(value, old) {
					var data = {
						'goods_2': {
							'icon_cart': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_3.good_txt3.value': {
				'handler': function(value, old) {
					var data = {
						'goods_3': {
							'good_txt3': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_3.good_url3.value': {
				'handler': function(value, old) {
					var data = {
						'goods_3': {
							'good_url3': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_3.good_img3.value': {
				'handler': function(value, old) {
					var data = {
						'goods_3': {
							'good_img3': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_3.skuId3.value': {
				'handler': function(value, old) {
					var data = {
						'goods_3': {
							'skuId3': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_3.icon_cart.value': {
				'handler': function(value, old) {
					var data = {
						'goods_3': {
							'icon_cart': {
								'value': old
							}
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