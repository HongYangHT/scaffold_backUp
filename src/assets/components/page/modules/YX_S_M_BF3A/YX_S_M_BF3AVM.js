define([
	'Vue',
	'mustache',
	'jquery',
	'text!components/page/modules/YX_S_M_BF3A/YX_S_M_BF3A.mustache',
	'common/mixins/pageMixins',
	'common/helper/tpl2vue',
	'common/helper/data2vue',
	'common/helper/tools',
	'common/directive/setAttr'
],function(Vue, mustache, $, tpl, pageMixins, Tpl2Vue, Data2Vue, Tools){
	var _default = {
		H5597Groups:{
			content:'其他数据配置',
			goods_1: 'tab位置一',
			goods_2: 'tab位置二',
			goods_3: 'tab位置三',
			goods_4: 'tab位置四'
		},
		goods_1:{
			show_1:1,
			anchar_1:'',
			linkText_1:'新年大扫除'
		},
		goods_2:{
			show_2:1,
			anchar_2:'',
			linkText_2:'居家焕新颜'
		},
		goods_3:{
			show_3:1,
			anchar_3:'',
			linkText_3:'美味迎新年'
		},
		goods_4:{
			show_4:1,
			anchar_4:'',
			linkText_4:'新年穿新装'
		},
		content:{
			bgImg:'https://mimg.127.net/hz/uploader/20170112/14842002074770032.jpg',
			tab:'25%'
		}
	};

	var YX_S_M_BF3A = Vue.extend({
		name: 'YX_S_M_BF3A',
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
			'content.tab.value': {
				'handler': function(value, old) {
					var data = {
						'content': {
							'tab': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_1.show_1.value': {
				'handler': function(value, old) {
					var tab = this.content.tab,
						data = '';
					if(value){
						tab = 1/(100/parseFloat(tab.value) + 1) >= 0.25 ? (1/(100/parseFloat(tab.value) + 1)*100+'%') : '25%';
						data = {
							'goods_1': {
								'show_1': {
									'value': old
								}
							},
							'content':{
								'tab':{
									value:tab
								}
							}
						};
					}else{
						tab = 1/(100/parseFloat(tab.value) - 1) >= 0.25 ? (1/(100/parseFloat(tab.value) - 1)*100+'%') : '25%';
						data = {
							'goods_1': {
								'show_1': {
									'value': old
								}
							},
							'content':{
								'tab':{
									value:tab
								}
							}
						};
					}
					this.content.tab.value = tab;
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_1.anchar_1.value': {
				'handler': function(value, old) {
					var data = {
						'goods_1': {
							'anchar_1': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_1.linkText_1.value': {
				'handler': function(value, old) {
					var data = {
						'goods_1': {
							'linkText_1': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_2.show_2.value': {
				'handler': function(value, old) {
					var tab = this.content.tab,
						data = '';
					if(value){
						tab = 1/(100/parseFloat(tab.value) + 1) >= 0.25 ? (1/(100/parseFloat(tab.value) + 1)*100+'%') : '25%';
						data = {
							'goods_2': {
								'show_2': {
									'value': old
								}
							},
							'content':{
								'tab':{
									value:tab
								}
							}
						};
					}else{
						tab = 1/(100/parseFloat(tab.value) - 1) >= 0.25 ? (1/(100/parseFloat(tab.value) - 1)*100+'%') : '25%';
						data = {
							'goods_2': {
								'show_2': {
									'value': old
								}
							},
							'content':{
								'tab':{
									value:tab
								}
							}
						};
					}
					this.content.tab.value = tab;
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_2.anchar_2.value': {
				'handler': function(value, old) {
					var data = {
						'goods_2': {
							'anchar_2': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_2.linkText_2.value': {
				'handler': function(value, old) {
					var data = {
						'goods_2': {
							'linkText_2': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_3.show_3.value': {
				'handler': function(value, old) {
					var tab = this.content.tab,
						data = '';
					if(value){
						tab = 1/(100/parseFloat(tab.value) + 1) >= 0.25 ? (1/(100/parseFloat(tab.value) + 1)*100+'%') : '25%';
						data = {
							'goods_3': {
								'show_3': {
									'value': old
								}
							},
							'content':{
								'tab':{
									value:tab
								}
							}
						};
					}else{
						tab = 1/(100/parseFloat(tab.value) - 1) >= 0.25 ? (1/(100/parseFloat(tab.value) - 1)*100+'%') : '25%';
						data = {
							'goods_3': {
								'show_3': {
									'value': old
								}
							},
							'content':{
								'tab':{
									value:tab
								}
							}
						};
					}
					this.content.tab.value = tab;
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_3.anchar_3.value': {
				'handler': function(value, old) {
					var data = {
						'goods_3': {
							'anchar_3': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_3.linkText_3.value': {
				'handler': function(value, old) {
					var data = {
						'goods_3': {
							'linkText_3': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_4.show_4.value': {
				'handler': function(value, old) {
					var tab = this.content.tab,
						data = '';
					if(value){
						tab = 1/(100/parseFloat(tab.value) + 1) >= 0.25 ? (1/(100/parseFloat(tab.value) + 1)*100+'%') : '25%';
						data = {
							'goods_4': {
								'show_4': {
									'value': old
								}
							},
							'content':{
								'tab':{
									value:tab
								}
							}
						};
					}else{
						tab = 1/(100/parseFloat(tab.value) - 1) >= 0.25 ? (1/(100/parseFloat(tab.value) - 1)*100+'%') : '25%';
						data = {
							'goods_4': {
								'show_4': {
									'value': old
								}
							},
							'content':{
								'tab':{
									value:tab
								}
							}
						};
					}
					this.content.tab.value = tab;
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_4.anchar_4.value': {
				'handler': function(value, old) {
					var data = {
						'goods_4': {
							'anchar_4': {
								'value': old
							}
						}
					};
					this.$dispatch('changeDataDefault', this.id, data);
				}
			},
			'goods_4.linkText_4.value': {
				'handler': function(value, old) {
					var data = {
						'goods_4': {
							'linkText_4': {
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
	return YX_S_M_BF3A;
});