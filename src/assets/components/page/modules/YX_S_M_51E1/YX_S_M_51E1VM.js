define([
	'Vue',
	'mustache',
	'jquery',
	'text!components/page/modules/YX_S_M_51E1/YX_S_M_51E1.mustache',
	'common/mixins/pageMixins',
	'common/helper/tpl2vue',
	'common/helper/data2vue',
	'common/helper/tools',
	'common/directive/setAttr'
],function(Vue, mustache, $, tpl, pageMixins, Tpl2Vue, Data2Vue, Tools){
	var _default = {
		contentInfo:{
			tip:'查看更多',
			link:'',
			bgColor:'#f5f5f5'
		}
	};
	var YX_S_M_51E1 = Vue.extend({
		name: 'YX_S_M_51E1',
		components: {},
		template: new Tpl2Vue(tpl, _default).render(),
		mixins: [pageMixins],
		data: function() {
			return new Data2Vue({
				data: _default
			}).getResult();
		},
		watch:{
			'contentInfo.tip.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'tip': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.link.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'link': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
			'contentInfo.bgColor.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'bgColor': {
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
	 return YX_S_M_51E1;
});