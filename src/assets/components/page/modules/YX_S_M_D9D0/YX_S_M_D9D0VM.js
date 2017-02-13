define([
	'Vue',
	'mustache',
	'jquery',
	'text!components/page/modules/YX_S_M_D9D0/YX_S_M_D9D0.mustache',
	'common/mixins/pageMixins',
	'common/helper/tpl2vue',
	'common/helper/data2vue',
	'common/helper/tools',
	'common/directive/setAttr'
],function(Vue, mustache, $, tpl, pageMixins, Tpl2Vue, Data2Vue, Tools){
	var _default = {
		H5597Groups:{
			content:'其他数据配置',
			goods_1: '券位置一',
			goods_2: '券位置二',
			goods_3: '券位置三'
		},
		goods_1:{
			show_1:1,
			couponVal_1:"10元",
			couponDesc_1:'直减券',
			couponBtnText_1:'立即领取',
			couponLink_1:'http://you.163.com',
			couponTip_1:'',
			couponBg_1:'https://mimg.127.net/hz/uploader/20170112/14841917256790022.png'
		},
		goods_2:{
			show_2:1,
			couponVal_2:'免单券',
			couponDesc_2:'超柔天鹅绒连裤袜',
			couponBtnText_2:'立即领取',
			couponLink_2:'http://you.163.com',
			couponTip_2:'限量派发 先到先得',
			couponBg_2:'https://mimg.127.net/hz/uploader/20170112/14841917256790022.png'
		},
		goods_3:{
			show_3:1,
			couponVal_3:'免单券',
			couponDesc_3:'可折叠防水购物袋',
			couponBtnText_3:'立即领取',
			couponLink_3:'http://you.163.com',
			couponTip_3:'限量派发 先到先得',
			couponBg_3:'https://mimg.127.net/hz/uploader/20170112/14841917256790022.png'
		},
		content:{
			bgImg:'https://mimg.127.net/hz/uploader/20170112/14841916867050021.jpg'
		}
	};

	var YX_S_M_D9D0 = Vue.extend({
		name: 'YX_S_M_D9D0',
		components: {},
		template: new Tpl2Vue(tpl, _default).render(),
		mixins: [pageMixins],
		data: function() {
			return new Data2Vue({
				data: _default
			}).getResult();
		},
		watch:{
			'content.bgImg.value': {
				'handler': function(value, old) {
					var data = {
						'content': {
							'bgImg': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_1.show_1.value': {
				'handler': function(value, old) {
					var data = {
						'goods_1': {
							'show_1': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_1.couponVal_1.value': {
				'handler': function(value, old) {
					var data = {
						'goods_1': {
							'couponVal_1': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_1.couponDesc_1.value': {
				'handler': function(value, old) {
					var data = {
						'goods_1': {
							'couponDesc_1': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_1.couponBtnText_1.value': {
				'handler': function(value, old) {
					var data = {
						'goods_1': {
							'couponBtnText_1': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_1.couponLink_1.value': {
				'handler': function(value, old) {
					var data = {
						'goods_1': {
							'couponLink_1': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_1.couponTip_1.value': {
				'handler': function(value, old) {
					var data = {
						'goods_1': {
							'couponTip_1': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_1.couponBg_1.value': {
				'handler': function(value, old) {
					var data = {
						'goods_1': {
							'couponBg_1': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_2.show_2.value': {
				'handler': function(value, old) {
					var data = {
						'goods_2': {
							'show_2': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_2.couponVal_2.value': {
				'handler': function(value, old) {
					var data = {
						'goods_2': {
							'couponVal_2': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_2.couponDesc_2.value': {
				'handler': function(value, old) {
					var data = {
						'goods_2': {
							'couponDesc_2': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_2.couponBtnText_2.value': {
				'handler': function(value, old) {
					var data = {
						'goods_2': {
							'couponBtnText_2': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_2.couponLink_2.value': {
				'handler': function(value, old) {
					var data = {
						'goods_2': {
							'couponLink_2': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_2.couponTip_2.value': {
				'handler': function(value, old) {
					var data = {
						'goods_2': {
							'couponTip_2': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_2.couponBg_2.value': {
				'handler': function(value, old) {
					var data = {
						'goods_2': {
							'couponBg_2': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_3.show_3.value': {
				'handler': function(value, old) {
					var data = {
						'goods_3': {
							'show_3': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_3.couponVal_3.value': {
				'handler': function(value, old) {
					var data = {
						'goods_3': {
							'couponVal_3': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_3.couponDesc_3.value': {
				'handler': function(value, old) {
					var data = {
						'goods_3': {
							'couponDesc_3': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_3.couponBtnText_3.value': {
				'handler': function(value, old) {
					var data = {
						'goods_3': {
							'couponBtnText_3': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_3.couponLink_3.value': {
				'handler': function(value, old) {
					var data = {
						'goods_3': {
							'couponLink_3': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_3.couponTip_3.value': {
				'handler': function(value, old) {
					var data = {
						'goods_3': {
							'couponTip_3': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_3.couponBg_3.value': {
				'handler': function(value, old) {
					var data = {
						'goods_3': {
							'couponBg_3': {
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
		methods: {},
		events: {}
	});
	return YX_S_M_D9D0;
});