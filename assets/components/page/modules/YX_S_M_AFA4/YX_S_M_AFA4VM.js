define([
	'Vue',
	'mustache',
	'jquery',
	'text!components/page/modules/YX_S_M_AFA4/YX_S_M_AFA4.mustache',
	'common/mixins/pageMixins',
	'common/helper/tpl2vue',
	'common/helper/data2vue',
	'common/helper/tools',
	'common/directive/setAttr'
],function(Vue, mustache, $, tpl, pageMixins, Tpl2Vue, Data2Vue, Tools){
	var _default = {
		contentInfo:{
			title:'办公室必备神器，从此上班不熬夜',
			tip1:'作为一个上班狗，每天面对的最多就是电脑吧。',
			tip2:'时间一长，脖子也疼，腰也酸...',
			tip3:'小编搜罗一圈，仿佛发现了新世界，不能我一个人独享，忍不住赶紧分享给大家！'
		}
	};

	var YX_S_M_AFA4 = Vue.extend({
		name: 'YX_S_M_AFA4',
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
	return YX_S_M_AFA4;
});