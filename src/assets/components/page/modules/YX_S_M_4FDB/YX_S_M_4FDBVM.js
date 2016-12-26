define([
	'Vue',
	'mustache',
	'jquery',
	'text!components/page/modules/YX_S_M_4FDB/YX_S_M_4FDB.mustache',
	'common/mixins/pageMixins',
	'common/helper/tpl2vue',
	'common/helper/data2vue',
	'common/helper/tools',
	'common/directive/setAttr'
],function(Vue, mustache, $, tpl, pageMixins, Tpl2Vue, Data2Vue, Tools){
	var _default = {
		contentInfo:{
			bgColor:'#f4f4f4',
			height: '40',
			tip:'注：数据截止时间为2016年12月5日'
		}
	};

	var YX_S_M_4FDB = Vue.extend({
		name: 'YX_S_M_4FDB',
		components: {},
		template: new Tpl2Vue(tpl, _default).render(),
		mixins: [pageMixins],
		data: function() {
			return new Data2Vue({
				data: _default
			}).getResult();
		},
		watch:{
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
			},
			'contentInfo.height.value':{
				'handler':function(value,old){
					if(value){
						var data = {
								'contentInfo': {
									'height': {
										'value': old
									}
								}
							},
							_that = this;
						this.$dispatch('changeDataDefault', this.id, data);	
					}
				}
			},
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
	return YX_S_M_4FDB;
});