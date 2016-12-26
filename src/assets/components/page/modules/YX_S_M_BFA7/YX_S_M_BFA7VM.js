define([
	'Vue',
	'mustache',
	'jquery',
	'text!components/page/modules/YX_S_M_BFA7/YX_S_M_BFA7.mustache',
	'common/mixins/pageMixins',
	'common/helper/tpl2vue',
	'common/helper/data2vue',
	'common/helper/tools',
	'common/directive/setAttr'
],function(Vue, mustache, $, tpl, pageMixins, Tpl2Vue, Data2Vue, Tools){
	var _default = {
		contentInfo:{
			title:'相关阅读',
			tip1:'A股整体出现调整，国企改革概念板块表现活跃',
			link1:'http://qian.163.com/',
			tip2:'国企改革概念再升温，二八风格转换尚待确认',
			link2:'http://qian.163.com/',
			tip3:'四季度国企改革突出四重点，国企基金激发新动能',
			link3:'http://qian.163.com/',
			tip4:'海通：国企改革和经济转型望成2017年主旋律',
			link4:'http://qian.163.com/',
			tip5:'',
			link5:'',
			tip6:'',
			link6:''
		}
	};

	var YX_S_M_BFA7 = Vue.extend({
		name: 'YX_S_M_BFA7',
		components: {},
		template: new Tpl2Vue(tpl, _default).render(),
		mixins: [pageMixins],
		data: function() {
			return new Data2Vue({
				data: _default
			}).getResult();
		},
		watch:{
			'contentInfo.title.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'title': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.tip1.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'tip1': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.link1.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'link1': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.tip2.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'tip2': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.link2.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'link2': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.tip3.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'tip3': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.link3.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'link3': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.tip4.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'tip4': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.link4.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'link4': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.tip5.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'tip5': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.link5.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'link5': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.tip6.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'tip6': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.link6.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'link6': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
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
	return YX_S_M_BFA7;
});